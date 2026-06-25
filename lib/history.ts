import { readData, writeData } from "@/lib/storage";

export interface HistoryItem {
  id: string;
  userId: string;
  movieId: number;
  title: string;
  posterPath: string | null;
  viewedAt: string;
}

const HISTORY_KEY = "history.json";

async function readHistory(): Promise<HistoryItem[]> {
  return (await readData<HistoryItem[]>(HISTORY_KEY)) || [];
}

async function writeHistory(items: HistoryItem[]) {
  await writeData(HISTORY_KEY, items);
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export const historyDB = {
  async getUserHistory(userId: string): Promise<HistoryItem[]> {
    const items = await readHistory();
    return items
      .filter((item) => item.userId === userId)
      .sort(
        (a, b) =>
          new Date(b.viewedAt).getTime() - new Date(a.viewedAt).getTime()
      );
  },

  async recordView(
    userId: string,
    movieId: number,
    title: string,
    posterPath: string | null
  ): Promise<void> {
    const items = await readHistory();
    // 移除同一电影的旧记录（确保最新一条在最前）
    const filtered = items.filter(
      (item) => !(item.userId === userId && item.movieId === movieId)
    );
    const newItem: HistoryItem = {
      id: generateId(),
      userId,
      movieId,
      title,
      posterPath,
      viewedAt: new Date().toISOString(),
    };
    filtered.unshift(newItem);
    // 只保留最近100条
    const trimmed = filtered.slice(0, 100);
    await writeHistory(trimmed);
  },
};