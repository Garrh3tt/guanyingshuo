import fs from "fs";
import path from "path";

export interface WatchlistItem {
  id: string;
  userId: string;
  movieId: number;
  title: string;
  posterPath: string | null;
  createdAt: string;
}

const DB_PATH = path.join(process.cwd(), "data", "watchlist.json");

function readWatchlist(): WatchlistItem[] {
  try {
    if (!fs.existsSync(DB_PATH)) {
      fs.writeFileSync(DB_PATH, "[]", "utf-8");
      return [];
    }
    const data = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeWatchlist(items: WatchlistItem[]) {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(DB_PATH, JSON.stringify(items, null, 2), "utf-8");
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export const watchlistDB = {
  getUserWatchlist(userId: string): WatchlistItem[] {
    return readWatchlist()
      .filter((item) => item.userId === userId)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  },

  isInWatchlist(userId: string, movieId: number): boolean {
    return readWatchlist().some(
      (item) => item.userId === userId && item.movieId === movieId
    );
  },

  addToWatchlist(
    userId: string,
    movieId: number,
    title: string,
    posterPath: string | null
  ): WatchlistItem {
    const items = readWatchlist();
    const existing = items.find(
      (item) => item.userId === userId && item.movieId === movieId
    );
    if (existing) return existing;

    const newItem: WatchlistItem = {
      id: generateId(),
      userId,
      movieId,
      title,
      posterPath,
      createdAt: new Date().toISOString(),
    };
    items.push(newItem);
    writeWatchlist(items);
    return newItem;
  },

  removeFromWatchlist(userId: string, movieId: number): boolean {
    const items = readWatchlist();
    const filtered = items.filter(
      (item) => !(item.userId === userId && item.movieId === movieId)
    );
    if (filtered.length === items.length) return false;
    writeWatchlist(filtered);
    return true;
  },
};
