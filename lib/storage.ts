import { createClient, type EdgeConfigClient } from "@vercel/edge-config";

// 内存缓存减少Edge Config读取次数
const memoryCache: Record<string, { data: unknown; timestamp: number }> = {};
const CACHE_TTL = 15000; // 15秒缓存

let edgeConfigClient: EdgeConfigClient | null = null;

function getEdgeConfigClient(): EdgeConfigClient | null {
  if (edgeConfigClient) return edgeConfigClient;

  const edgeConfigUrl = process.env.EDGE_CONFIG;
  if (edgeConfigUrl) {
    try {
      edgeConfigClient = createClient(edgeConfigUrl);
      return edgeConfigClient;
    } catch (e) {
      console.error("Failed to create Edge Config client:", e);
    }
  }
  return null;
}

function isEdgeConfigAvailable(): boolean {
  return !!process.env.EDGE_CONFIG;
}

export async function readData<T>(key: string): Promise<T | null> {
  // 1. 检查内存缓存
  const cached = memoryCache[key];
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data as T;
  }

  // 2. 尝试从 Edge Config 读取
  if (isEdgeConfigAvailable()) {
    try {
      const client = getEdgeConfigClient();
      if (client) {
        const data = await client.get(key);
        if (data !== undefined) {
          memoryCache[key] = { data, timestamp: Date.now() };
          return data as T;
        }
      }
    } catch (e) {
      console.warn(`Edge Config read failed for ${key}:`, e);
    }
  }

  return null;
}

export async function writeData(key: string, data: unknown): Promise<void> {
  // 1. 更新内存缓存
  memoryCache[key] = { data, timestamp: Date.now() };

  // 2. 写入 Edge Config (通过 Vercel API)
  if (isEdgeConfigAvailable()) {
    try {
      const edgeConfigUrl = process.env.EDGE_CONFIG;
      if (edgeConfigUrl) {
        const url = new URL(edgeConfigUrl);
        const token = url.searchParams.get("token");
        const id = url.pathname.split("/").pop();

        if (token && id) {
          const apiUrl = `https://api.vercel.com/v1/edge-config/${id}/items`;
          const response = await fetch(apiUrl, {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              items: [{ operation: "upsert", key, value: data }],
            }),
          });

          if (response.ok) {
            return;
          } else {
            const errorText = await response.text();
            console.warn(`Edge Config API error: ${response.status} ${errorText}`);
          }
        }
      }
    } catch (e) {
      console.error(`Edge Config write failed for ${key}:`, e);
    }
  }

  // 如果没有可用的存储后端，抛出错误
  throw new Error(
    "No storage backend available. Please set EDGE_CONFIG environment variable."
  );
}

export async function deleteData(key: string): Promise<void> {
  delete memoryCache[key];

  if (isEdgeConfigAvailable()) {
    try {
      const edgeConfigUrl = process.env.EDGE_CONFIG;
      if (edgeConfigUrl) {
        const url = new URL(edgeConfigUrl);
        const token = url.searchParams.get("token");
        const id = url.pathname.split("/").pop();

        if (token && id) {
          const apiUrl = `https://api.vercel.com/v1/edge-config/${id}/items`;
          const response = await fetch(apiUrl, {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              items: [{ operation: "delete", key }],
            }),
          });

          if (!response.ok) {
            console.warn(`Edge Config delete failed: ${response.status}`);
          }
        }
      }
    } catch (e) {
      console.warn(`Edge Config delete failed for ${key}:`, e);
    }
  }
}

// 列出所有存储的键（用于调试）
export async function listKeys(): Promise<string[]> {
  if (isEdgeConfigAvailable()) {
    try {
      const client = getEdgeConfigClient();
      if (client) {
        const allData = await client.getAll();
        return Object.keys(allData || {});
      }
    } catch (e) {
      console.warn("Edge Config list failed:", e);
    }
  }
  return Object.keys(memoryCache);
}
