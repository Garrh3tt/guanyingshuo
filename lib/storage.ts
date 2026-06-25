import { Redis } from "@upstash/redis";

// 尝试初始化 Upstash Redis
let redis: Redis | null = null;
try {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    redis = new Redis({ url, token });
  }
} catch (e) {
  console.error("Redis init failed:", e);
}

function isRedisAvailable(): boolean {
  return redis !== null;
}

// globalThis 全局存储作为 fallback（同一 Vercel 实例内持久）
interface GlobalStore {
  _storage?: Record<string, unknown>;
}
declare const globalThis: GlobalStore;

function getGlobalStore(): Record<string, unknown> {
  if (!globalThis._storage) {
    globalThis._storage = {};
  }
  return globalThis._storage;
}

export async function readData<T>(key: string): Promise<T | null> {
  // 1. 优先从 Redis 读取（跨实例一致）
  if (isRedisAvailable()) {
    try {
      const data = await redis!.get<T>(key);
      if (data !== null && data !== undefined) {
        return data;
      }
    } catch (e) {
      console.warn(`Redis read failed for ${key}:`, e);
    }
  }

  // 2. 从 globalThis 全局存储读取（Redis 不可用时的 fallback）
  const globalStore = getGlobalStore();
  if (key in globalStore) {
    return globalStore[key] as T;
  }

  return null;
}

export async function writeData(key: string, data: unknown): Promise<void> {
  // 1. 更新全局存储（至少同一实例内可用）
  getGlobalStore()[key] = data;

  // 2. 写入 Redis（跨实例持久）
  if (isRedisAvailable()) {
    try {
      await redis!.set(key, data);
      return;
    } catch (e) {
      console.error(`Redis write failed for ${key}:`, e);
    }
  }

  console.warn(`Using globalThis fallback storage for ${key} (Redis unavailable)`);
}

export async function deleteData(key: string): Promise<void> {
  delete getGlobalStore()[key];

  if (isRedisAvailable()) {
    try {
      await redis!.del(key);
    } catch (e) {
      console.warn(`Redis delete failed for ${key}:`, e);
    }
  }
}

// 列出所有存储的键（用于调试）
export async function listKeys(): Promise<string[]> {
  const keys = new Set<string>();

  // 从全局存储
  Object.keys(getGlobalStore()).forEach((k) => keys.add(k));

  // 从 Redis
  if (isRedisAvailable()) {
    try {
      // Redis 没有 list all keys 的 REST API，使用全局存储的键
      // 实际上 KEYS * 在 Upstash Redis 中可用
      const redisKeys = await redis!.keys("*");
      redisKeys.forEach((k) => keys.add(k));
    } catch (e) {
      console.warn("Redis keys failed:", e);
    }
  }

  return Array.from(keys);
}
