import Link from "next/link";
import { Movie } from "@/lib/types";
import MovieCard from "./MovieCard";

interface MovieSectionProps {
  title: string;
  emoji?: string;
  movies: Movie[];
  moreLink?: string;
}

export default function MovieSection({
  title,
  emoji,
  movies,
  moreLink,
}: MovieSectionProps) {
  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
          {emoji && <span>{emoji}</span>}
          {title}
        </h2>
        {moreLink && (
          <Link
            href={moreLink}
            className="text-brand-red hover:text-red-400 text-sm transition-colors flex items-center gap-1"
          >
            查看更多
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        )}
      </div>

      {/* 横向滚动卡片 */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4">
        {movies.map((movie) => (
          <div key={movie.id} className="shrink-0 w-[150px] sm:w-[180px]">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </section>
  );
}
