import { put, del, list, head } from "@vercel/blob";

// 使用内存缓存减少Blob读取次数
const memoryCache: Record<string, { data: unknown; timestamp: number }> = {};
const CACHE_TTL = 30000; // 30秒缓存

function getCacheKey(key: string): string {
  return `guanyingshuo-${key}`;
}

function isVercelBlobAvailable(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

export async function readData<T>(key: string): Promise<T | null> {
  const cacheKey = getCacheKey(key);

  // 1. 检查内存缓存
  const cached = memoryCache[cacheKey];
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data as T;
  }

  // 2. 尝试从 Vercel Blob 读取
  if (isVercelBlobAvailable()) {
    try {
      const blobInfo = await head(cacheKey);
      if (blobInfo) {
        const response = await fetch(blobInfo.url);
        if (response.ok) {
          const data = await response.json();
          memoryCache[cacheKey] = { data, timestamp: Date.now() };
          return data as T;
        }
      }
    } catch (e) {
      // Blob不存在或读取失败，继续尝试其他方式
      console.warn(`Blob read failed for ${key}:`, e);
    }
  }

  return null;
}

export async function writeData(key: string, data: unknown): Promise<void> {
  const cacheKey = getCacheKey(key);

  // 1. 更新内存缓存
  memoryCache[cacheKey] = { data, timestamp: Date.now() };

  // 2. 写入 Vercel Blob
  if (isVercelBlobAvailable()) {
    try {
      const jsonString = JSON.stringify(data);
      await put(cacheKey, jsonString, {
        access: "public",
        contentType: "application/json",
        allowOverwrite: true,
      });
      return;
    } catch (e) {
      console.error(`Blob write failed for ${key}:`, e);
    }
  }

  throw new Error("No storage backend available. Please set BLOB_READ_WRITE_TOKEN.");
}

export async function deleteData(key: string): Promise<void> {
  const cacheKey = getCacheKey(key);
  delete memoryCache[cacheKey];

  if (isVercelBlobAvailable()) {
    try {
      await del(cacheKey);
    } catch (e) {
      console.warn(`Blob delete failed for ${key}:`, e);
    }
  }
}

// 列出所有存储的键（用于调试）
export async function listKeys(): Promise<string[]> {
  if (isVercelBlobAvailable()) {
    try {
      const { blobs } = await list({ prefix: "guanyingshuo-" });
      return blobs.map((b) => b.pathname.replace("guanyingshuo-", ""));
    } catch (e) {
      console.warn("Blob list failed:", e);
    }
  }
  return Object.keys(memoryCache).map((k) => k.replace("guanyingshuo-", ""));
}
