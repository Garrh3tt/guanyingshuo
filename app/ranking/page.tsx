import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getPopularMovies, getTopRatedMovies, getNowPlayingMovies } from "@/lib/tmdb";
import { getPosterUrl } from "@/lib/constants";
import { getYear } from "@/lib/utils";
import TomatoScore from "@/components/TomatoScore";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "排行榜 - 观影说",
  description: "查看最新电影排行榜，包括热门电影、评分最高电影和正在热映电影。",
};

interface RankingPageProps {
  searchParams: {
    tab?: string;
  };
}

export default async function RankingPage({ searchParams }: RankingPageProps) {
  const tab = searchParams.tab || "popular";

  const [popular, topRated, nowPlaying] = await Promise.all([
    getPopularMovies(),
    getTopRatedMovies(),
    getNowPlayingMovies(),
  ]);

  const tabs = [
    { id: "popular", label: "热门榜", emoji: "🔥" },
    { id: "top_rated", label: "评分榜", emoji: "⭐" },
    { id: "now_playing", label: "正在热映", emoji: "🎬" },
  ];

  const getMoviesByTab = (t: string) => {
    switch (t) {
      case "top_rated":
        return topRated.results;
      case "now_playing":
        return nowPlaying.results;
      default:
        return popular.results;
    }
  };

  const movies = getMoviesByTab(tab);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-white mb-8">排行榜</h1>

      {/* 标签切换 */}
      <div className="flex gap-2 mb-8">
        {tabs.map((t) => (
          <Link
            key={t.id}
            href={`/ranking?tab=${t.id}`}
            className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
              tab === t.id
                ? "bg-brand-red text-white"
                : "bg-brand-card text-gray-300 hover:bg-gray-700"
            }`}
          >
            {t.emoji} {t.label}
          </Link>
        ))}
      </div>

      {/* 排行列表 */}
      <div className="space-y-3">
        {movies.map((movie, index) => (
          <Link
            key={movie.id}
            href={`/movie/${movie.id}`}
            className="flex items-center gap-4 bg-brand-card rounded-lg p-4 hover:bg-gray-800 transition-colors group"
          >
            {/* 排名 */}
            <div
              className={`shrink-0 w-10 h-10 flex items-center justify-center rounded-lg font-bold text-lg ${
                index < 3
                  ? "bg-brand-red text-white"
                  : "bg-brand-darker text-gray-400"
              }`}
            >
              {index + 1}
            </div>

            {/* 海报 */}
            <div className="relative shrink-0 w-16 h-24 rounded overflow-hidden">
              <Image
                src={getPosterUrl(movie.poster_path, "poster_small")}
                alt={movie.title}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>

            {/* 信息 */}
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-medium group-hover:text-brand-red transition-colors truncate">
                {movie.title}
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                {getYear(movie.release_date)}
              </p>
            </div>

            {/* 评分 */}
            <div className="shrink-0">
              <TomatoScore score={movie.vote_average} size="md" />
              <p className="text-gray-500 text-xs text-center mt-1">
                {movie.vote_count.toLocaleString()} 评价
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
