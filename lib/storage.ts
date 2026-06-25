import { get, put, del, list } from "@vercel/blob";

// 内存缓存减少读取次数
const memoryCache: Record<string, { data: unknown; timestamp: number }> = {};
const CACHE_TTL = 5000; // 5秒缓存

// 存储 put() 返回的 blob URL，用于后续直接 fetch 读取最新数据
const blobUrlCache: Record<string, string> = {};

function isBlobAvailable(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN || !!process.env.VERCEL_OIDC_TOKEN;
}

// Helper function to read stream to text
async function streamToText(stream: ReadableStream<Uint8Array>): Promise<string> {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) chunks.push(value);
  }

  const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }

  return new TextDecoder().decode(result);
}

export async function readData<T>(key: string): Promise<T | null> {
  // 1. 检查内存缓存
  const cached = memoryCache[key];
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data as T;
  }

  // 2. 尝试从 Vercel Blob 读取
  if (isBlobAvailable()) {
    try {
      // 优先使用已知的 blob URL 直接 fetch（绕过 SDK 缓存）
      const knownUrl = blobUrlCache[key];
      if (knownUrl) {
        const resp = await fetch(knownUrl, { cache: "no-store" });
        if (resp.ok) {
          const text = await resp.text();
          const data = JSON.parse(text);
          memoryCache[key] = { data, timestamp: Date.now() };
          return data as T;
        }
      }

      // 通过 list() 查找最新的 blob URL
      const { blobs } = await list({ prefix: key });
      const matchedBlob = blobs.find((b) => b.pathname === key);
      if (matchedBlob) {
        blobUrlCache[key] = matchedBlob.url;
        const resp = await fetch(matchedBlob.url, { cache: "no-store" });
        if (resp.ok) {
          const text = await resp.text();
          const data = JSON.parse(text);
          memoryCache[key] = { data, timestamp: Date.now() };
          return data as T;
        }
      }

      // fallback: 使用 get() 方法
      const blob = await get(key, { access: "public" });
      if (blob && blob.stream) {
        const text = await streamToText(blob.stream);
        const data = JSON.parse(text);
        memoryCache[key] = { data, timestamp: Date.now() };
        return data as T;
      }
    } catch (e) {
      console.warn(`Blob read failed for ${key}:`, e);
    }
  }

  return null;
}

export async function writeData(key: string, data: unknown): Promise<void> {
  // 1. 更新内存缓存
  memoryCache[key] = { data, timestamp: Date.now() };

  // 2. 写入 Vercel Blob（禁用缓存，确保立即可读）
  if (isBlobAvailable()) {
    try {
      const jsonString = JSON.stringify(data);
      const blob = await put(key, jsonString, {
        access: "public",
        contentType: "application/json",
        addRandomSuffix: false,
        allowOverwrite: true,
        cacheControlMaxAge: 0,
      });
      // 保存 put() 返回的 URL，新创建的 blob 立即可用
      blobUrlCache[key] = blob.url;
      return;
    } catch (e) {
      console.error(`Blob write failed for ${key}:`, e);
    }
  }

  // 如果没有可用的存储后端，抛出错误
  throw new Error(
    "No storage backend available. Please set BLOB_READ_WRITE_TOKEN environment variable."
  );
}

export async function deleteData(key: string): Promise<void> {
  delete memoryCache[key];
  delete blobUrlCache[key];

  if (isBlobAvailable()) {
    try {
      // del 可以接受 pathname 或 url
      const url = blobUrlCache[key];
      if (url) {
        await del(url);
      } else {
        await del(key);
      }
    } catch (e) {
      console.warn(`Blob delete failed for ${key}:`, e);
    }
  }
}

// 列出所有存储的键（用于调试）
export async function listKeys(): Promise<string[]> {
  if (isBlobAvailable()) {
    try {
      const { blobs } = await list();
      return blobs.map((b) => b.pathname);
    } catch (e) {
      console.warn("Blob list failed:", e);
    }
  }
  return Object.keys(memoryCache);
}
