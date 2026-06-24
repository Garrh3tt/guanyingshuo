import fs from "fs";
import path from "path";

// 使用全局变量确保在 Vercel Serverless 环境中数据持久化（同一实例内）
declare global {
  // eslint-disable-next-line no-var
  var __guanyingshuo_storage__: Record<string, unknown> | undefined;
}

// 优先使用全局存储，避免模块热更新或 Serverless 实例复用时数据丢失
const storage: Record<string, unknown> =
  globalThis.__guanyingshuo_storage__ || {};

// 将存储挂载到全局对象
if (!globalThis.__guanyingshuo_storage__) {
  globalThis.__guanyingshuo_storage__ = storage;
}

// 确定数据目录：Vercel 使用 /tmp，本地使用项目目录下的 data
function getDataDir(): string {
  if (process.env.VERCEL) {
    return "/tmp/guanyingshuo-data";
  }
  return path.join(process.cwd(), "data");
}

// 尝试从文件系统加载数据
function initializeStorage() {
  // 如果已经有数据（全局存储），不再重复初始化
  if (Object.keys(storage).length > 0) {
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
          storage[file] = data;
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
  // 优先从内存存储读取
  if (storage[key]) {
    return storage[key] as T;
  }

  // 尝试从文件系统读取
  try {
    const dataDir = getDataDir();
    const filePath = path.join(dataDir, key);
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      storage[key] = data; // 缓存到内存
      return data as T;
    }
  } catch (e) {
    console.warn(`Failed to read ${key}:`, e);
  }

  return null;
}

export async function writeData(key: string, data: unknown): Promise<void> {
  // 先更新内存
  storage[key] = data;

  // 再保存到文件系统（Vercel 的 /tmp 目录可写）
  try {
    const dataDir = getDataDir();
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const filePath = path.join(dataDir, key);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.warn(`Failed to write ${key}:`, e);
  }
}

export async function deleteData(key: string): Promise<void> {
  delete storage[key];

  try {
    const dataDir = getDataDir();
    const filePath = path.join(dataDir, key);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (e) {
    console.warn(`Failed to delete ${key}:`, e);
  }
}
