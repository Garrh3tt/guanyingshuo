"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import SafeImage from "@/components/SafeImage";

interface WatchlistItem {
  id: string;
  movieId: number;
  title: string;
  posterPath: string | null;
  createdAt: string;
}

export default function WatchlistPage() {
  const { data: session, status } = useSession();
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/watchlist")
        .then((res) => res.json())
        .then((data) => setWatchlist(data.watchlist || []))
        .catch(() => {})
        .finally(() => setLoading(false));
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [status]);

  const handleRemove = async (movieId: number) => {
    try {
      await fetch(`/api/watchlist?movieId=${movieId}`, { method: "DELETE" });
      setWatchlist((prev) => prev.filter((item) => item.movieId !== movieId));
    } catch {
      alert("操作失败");
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-brand-card rounded w-48" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="aspect-[2/3] bg-brand-card rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-6">🔒</div>
        <h1 className="text-2xl font-bold text-white mb-4">请先登录</h1>
        <p className="text-gray-400 mb-6">登录后查看您的收藏列表</p>
        <Link
          href="/auth/login"
          className="inline-block px-6 py-3 bg-brand-red text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          去登录
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Breadcrumb items={[{ label: "我的想看" }]} />
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">我的想看</h1>
          <p className="text-gray-400 mt-2">
            共 {watchlist.length} 部电影
          </p>
        </div>
      </div>

      {watchlist.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-6">🎬</div>
          <h2 className="text-xl font-bold text-white mb-2">还没有收藏</h2>
          <p className="text-gray-400 mb-6">
            浏览电影并点击&ldquo;想看&rdquo;按钮来添加收藏
          </p>
          <Link
            href="/movie"
            className="inline-block px-6 py-3 bg-brand-red text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            去发现电影
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {watchlist.map((item) => (
            <div key={item.id} className="group relative">
              <Link href={`/movie/${item.movieId}`}>
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-brand-card">
                  <SafeImage
                    src={
                      item.posterPath
                        ? `https://image.tmdb.org/t/p/w500${item.posterPath}`
                        : "/placeholder-poster.png"
                    }
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-white text-sm font-medium mt-2 truncate">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-xs">
                  {new Date(item.createdAt).toLocaleDateString("zh-CN")}
                </p>
              </Link>
              <button
                onClick={() => handleRemove(item.movieId)}
                className="absolute top-2 right-2 w-8 h-8 bg-black/70 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                title="移除收藏"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
