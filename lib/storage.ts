import fs from "fs";
import path from "path";

// 模拟数据库 - 在 Vercel 环境中使用内存存储（重启后丢失）
// 实际项目应使用 Vercel KV 或其他持久化存储
const storage: Record<string, unknown> = {};

// 尝试从文件系统加载数据（仅在本地开发时有效）
function initializeStorage() {
  const LOCAL_DATA_DIR = path.join(process.cwd(), "data");
  if (fs.existsSync(LOCAL_DATA_DIR)) {
    const files = fs.readdirSync(LOCAL_DATA_DIR);
    for (const file of files) {
      if (file.endsWith(".json")) {
        try {
          const filePath = path.join(LOCAL_DATA_DIR, file);
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
  // 在 Vercel 环境中，使用内存存储
  if (storage[key]) {
    return storage[key] as T;
  }
  
  // 本地开发时尝试从文件系统读取
  try {
    const LOCAL_DATA_DIR = path.join(process.cwd(), "data");
    const filePath = path.join(LOCAL_DATA_DIR, key);
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
  // 在 Vercel 环境中，仅使用内存存储
  storage[key] = data;
  
  // 本地开发时也保存到文件系统
  if (process.env.NODE_ENV !== "production") {
    try {
      const LOCAL_DATA_DIR = path.join(process.cwd(), "data");
      if (!fs.existsSync(LOCAL_DATA_DIR)) {
        fs.mkdirSync(LOCAL_DATA_DIR, { recursive: true });
      }
      const filePath = path.join(LOCAL_DATA_DIR, key);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    } catch (e) {
      console.warn(`Failed to write ${key}:`, e);
    }
  }
}

export async function deleteData(key: string): Promise<void> {
  delete storage[key];
  
  // 本地开发时也删除文件
  if (process.env.NODE_ENV !== "production") {
    try {
      const LOCAL_DATA_DIR = path.join(process.cwd(), "data");
      const filePath = path.join(LOCAL_DATA_DIR, key);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (e) {
      console.warn(`Failed to delete ${key}:`, e);
    }
  }
}
