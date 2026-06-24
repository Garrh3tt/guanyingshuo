"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface WatchlistButtonProps {
  movieId: number;
  title: string;
  posterPath: string | null;
}

export default function WatchlistButton({
  movieId,
  title,
  posterPath,
}: WatchlistButtonProps) {
  const { data: session } = useSession();
  const [inWatchlist, setInWatchlist] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (!session) {
      setLoading(false);
      return;
    }
    fetch(`/api/watchlist/check?movieId=${movieId}`)
      .then((res) => res.json())
      .then((data) => setInWatchlist(data.inWatchlist))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [session, movieId]);

  const handleClick = async () => {
    if (!session) {
      alert("请先登录后再收藏");
      return;
    }
    setActionLoading(true);
    try {
      if (inWatchlist) {
        await fetch(`/api/watchlist?movieId=${movieId}`, { method: "DELETE" });
        setInWatchlist(false);
      } else {
        await fetch("/api/watchlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ movieId, title, posterPath }),
        });
        setInWatchlist(true);
      }
    } catch {
      alert("操作失败，请重试");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <button
        disabled
        className="px-4 py-2 bg-brand-card text-gray-500 rounded-lg text-sm animate-pulse"
      >
        加载中...
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={actionLoading}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
        inWatchlist
          ? "bg-brand-gold text-brand-darker hover:bg-yellow-500"
          : "bg-brand-card text-gray-300 hover:bg-brand-card/80 border border-gray-700"
      }`}
    >
      <span>{inWatchlist ? "⭐" : "☆"}</span>
      <span>{inWatchlist ? "已收藏" : "想看"}</span>
    </button>
  );
}
