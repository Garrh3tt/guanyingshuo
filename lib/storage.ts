import { createClient } from "@vercel/edge-config";
import fs from "fs";
import path from "path";

// 使用全局变量确保在 Vercel Serverless 环境中数据持久化（同一实例内）
declare global {
  // eslint-disable-next-line no-var
  var __guanyingshuo_storage__: Record<string, unknown> | undefined;
}

// 优先使用全局存储，避免模块热更新或 Serverless 实例复用时数据丢失
const memoryStorage: Record<string, unknown> =
  globalThis.__guanyingshuo_storage__ || {};

// 将存储挂载到全局对象
if (!globalThis.__guanyingshuo_storage__) {
  globalThis.__guanyingshuo_storage__ = memoryStorage;
}

// Edge Config 客户端
function getEdgeConfig() {
  const edgeConfigUrl = process.env.EDGE_CONFIG;
  if (edgeConfigUrl) {
    return createClient(edgeConfigUrl);
  }
  return null;
}

// 确定数据目录：Vercel 使用 /tmp，本地使用项目目录下的 data
function getDataDir(): string {
  if (process.env.VERCEL) {
    return "/tmp/guanyingshuo-data";
  }
  return path.join(process.cwd(), "data");
}

// 尝试从文件系统加载数据（本地开发用）
function initializeStorage() {
  // 如果已经有数据（全局存储），不再重复初始化
  if (Object.keys(memoryStorage).length > 0) {
    return;
  }

  const dataDir = getDataDir();
  if (fs.existsSync(dataDir)) {
    const files = fs.readdirSync(dataDir);
    for (const file of files) {
      if (file.endsWith(".json")) {
        try {
          const filePath = path.join(dataDir, file);
          const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
          memoryStorage[file] = data;
        } catch (e) {
          console.warn(`Failed to load ${file}:`, e);
        }
      }
    }
  }
}

// 初始化存储
if (typeof window === "undefined") {
  initializeStorage();
}

export async function readData<T>(key: string): Promise<T | null> {
  // 1. 优先从内存存储读取（最快）
  if (memoryStorage[key]) {
    return memoryStorage[key] as T;
  }

  // 2. 尝试从 Edge Config 读取（Vercel 环境）
  const edgeConfig = getEdgeConfig();
  if (edgeConfig) {
    try {
      const data = await edgeConfig.get(key);
      if (data !== undefined) {
        memoryStorage[key] = data; // 缓存到内存
        return data as T;
      }
    } catch (e) {
      console.warn(`Failed to read ${key} from Edge Config:`, e);
    }
  }

  // 3. 尝试从文件系统读取（本地开发）
  try {
    const dataDir = getDataDir();
    const filePath = path.join(dataDir, key);
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      memoryStorage[key] = data; // 缓存到内存
      return data as T;
    }
  } catch (e) {
    console.warn(`Failed to read ${key} from filesystem:`, e);
  }

  return null;
}

export async function writeData(key: string, data: unknown): Promise<void> {
  // 1. 先更新内存
  memoryStorage[key] = data;

  // 2. 尝试保存到 Edge Config（Vercel 环境）
  const edgeConfig = getEdgeConfig();
  if (edgeConfig) {
    try {
      // Edge Config 需要通过 API 更新，这里使用 fetch
      const edgeConfigUrl = process.env.EDGE_CONFIG;
      if (edgeConfigUrl) {
        // 提取 token 和 id
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
              items: [
                {
                  operation: "upsert",
                  key: key,
                  value: data,
                },
              ],
            }),
          });

          if (!response.ok) {
            console.warn(`Edge Config update failed: ${response.status}`);
          } else {
            console.log(`Edge Config updated: ${key}`);
            return; // Edge Config 更新成功，不需要再写文件
          }
        }
      }
    } catch (e) {
      console.warn(`Failed to write ${key} to Edge Config:`, e);
    }
  }

  // 3. 保存到文件系统（本地开发或 Edge Config 失败时）
  try {
    const dataDir = getDataDir();
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const filePath = path.join(dataDir, key);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.warn(`Failed to write ${key} to filesystem:`, e);
  }
}

export async function deleteData(key: string): Promise<void> {
  delete memoryStorage[key];

  // 尝试从 Edge Config 删除
  const edgeConfig = getEdgeConfig();
  if (edgeConfig) {
    try {
      const edgeConfigUrl = process.env.EDGE_CONFIG;
      if (edgeConfigUrl) {
        const url = new URL(edgeConfigUrl);
        const token = url.searchParams.get("token");
        const id = url.pathname.split("/").pop();

        if (token && id) {
          const apiUrl = `https://api.vercel.com/v1/edge-config/${id}/items`;
          await fetch(apiUrl, {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              items: [
                {
                  operation: "delete",
                  key: key,
                },
              ],
            }),
          });
        }
      }
    } catch (e) {
      console.warn(`Failed to delete ${key} from Edge Config:`, e);
    }
  }

  // 删除本地文件
  try {
    const dataDir = getDataDir();
    const filePath = path.join(dataDir, key);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (e) {
    console.warn(`Failed to delete ${key} from filesystem:`, e);
  }
}
