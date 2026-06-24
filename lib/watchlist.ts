import { readData, writeData } from "@/lib/storage";

export interface WatchlistItem {
  id: string;
  userId: string;
  movieId: number;
  title: string;
  posterPath: string | null;
  createdAt: string;
}

const WATCHLIST_KEY = "watchlist.json";

async function readWatchlist(): Promise<WatchlistItem[]> {
  return (await readData<WatchlistItem[]>(WATCHLIST_KEY)) || [];
}

async function writeWatchlist(items: WatchlistItem[]) {
  await writeData(WATCHLIST_KEY, items);
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export const watchlistDB = {
  async getUserWatchlist(userId: string): Promise<WatchlistItem[]> {
    const items = await readWatchlist();
    return items
      .filter((item) => item.userId === userId)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  },

  async isInWatchlist(userId: string, movieId: number): Promise<boolean> {
    const items = await readWatchlist();
    return items.some(
      (item) => item.userId === userId && item.movieId === movieId
    );
  },

  async addToWatchlist(
    userId: string,
    movieId: number,
    title: string,
    posterPath: string | null
  ): Promise<WatchlistItem> {
    const items = await readWatchlist();
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
    await writeWatchlist(items);
    return newItem;
  },

  async removeFromWatchlist(
    userId: string,
    movieId: number
  ): Promise<boolean> {
    const items = await readWatchlist();
    const filtered = items.filter(
      (item) => !(item.userId === userId && item.movieId === movieId)
    );
    if (filtered.length === items.length) return false;
    await writeWatchlist(filtered);
    return true;
  },
};
