import { neon } from "@neondatabase/serverless";

// 尝试初始化 Neon Postgres
let sql: ReturnType<typeof neon> | null = null;
let pgAvailable = false;

try {
  const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (databaseUrl) {
    sql = neon(databaseUrl);
    pgAvailable = true;
  }
} catch (e) {
  console.error("Neon Postgres init failed:", e);
}

// 确保表存在
async function ensureTable(): Promise<void> {
  if (!sql) return;
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS kv_store (
        key TEXT PRIMARY KEY,
        value JSONB NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
  } catch (e) {
    console.warn("Ensure table failed:", e);
  }
}

function isPgAvailable(): boolean {
  return pgAvailable && sql !== null;
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
  // 1. 优先从 Postgres 读取（跨实例一致）
  if (isPgAvailable()) {
    try {
      await ensureTable();
      const rows = await sql!`SELECT value FROM kv_store WHERE key = ${key}` as Array<{ value: unknown }>;
      if (rows.length > 0 && rows[0].value !== null) {
        return rows[0].value as T;
      }
    } catch (e) {
      console.warn(`Postgres read failed for ${key}:`, e);
    }
  }

  // 2. 从 globalThis 全局存储读取（Postgres 不可用时的 fallback）
  const globalStore = getGlobalStore();
  if (key in globalStore) {
    return globalStore[key] as T;
  }

  return null;
}

export async function writeData(key: string, data: unknown): Promise<void> {
  // 1. 更新全局存储（至少同一实例内可用）
  getGlobalStore()[key] = data;

  // 2. 写入 Postgres（跨实例持久）
  if (isPgAvailable()) {
    try {
      await ensureTable();
      const jsonData = JSON.stringify(data);
      await sql!`
        INSERT INTO kv_store (key, value, updated_at)
        VALUES (${key}, ${jsonData}::jsonb, CURRENT_TIMESTAMP)
        ON CONFLICT (key)
        DO UPDATE SET value = EXCLUDED.value, updated_at = CURRENT_TIMESTAMP
      `;
      return;
    } catch (e) {
      console.error(`Postgres write failed for ${key}:`, e);
    }
  }

  console.warn(`Using globalThis fallback storage for ${key} (Postgres unavailable)`);
}

export async function deleteData(key: string): Promise<void> {
  delete getGlobalStore()[key];

  if (isPgAvailable()) {
    try {
      await ensureTable();
      await sql!`DELETE FROM kv_store WHERE key = ${key}`;
    } catch (e) {
      console.warn(`Postgres delete failed for ${key}:`, e);
    }
  }
}

// 列出所有存储的键（用于调试）
export async function listKeys(): Promise<string[]> {
  const keys = new Set<string>();

  // 从全局存储
  Object.keys(getGlobalStore()).forEach((k) => keys.add(k));

  // 从 Postgres
  if (isPgAvailable()) {
    try {
      await ensureTable();
      const rows = await sql!`SELECT key FROM kv_store` as Array<{ key: string }>;
      rows.forEach((row) => keys.add(row.key));
    } catch (e) {
      console.warn("Postgres keys failed:", e);
    }
  }

  return Array.from(keys);
}
