import { Metadata } from "next";
import Link from "next/link";
import MovieCard from "@/components/MovieCard";
import Pagination from "@/components/Pagination";
import { discoverMovies, getPopularMovies, getNowPlayingMovies, getUpcomingMovies } from "@/lib/tmdb";
import { GENRES_LIST, SORT_OPTIONS } from "@/lib/constants";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "电影库 - 观影说",
  description: "浏览海量电影，按类型、评分、上映日期等筛选。",
};

interface MoviePageProps {
  searchParams: {
    page?: string;
    genre?: string;
    sort?: string;
  };
}

export default async function MoviePage({ searchParams }: MoviePageProps) {
  const page = searchParams.page || "1";
  const genre = searchParams.genre;
  const sort = searchParams.sort;

  let movies;
  let totalPages = 1;

  // 根据分类获取电影
  if (sort === "now_playing") {
    const data = await getNowPlayingMovies(page);
    movies = data.results;
    totalPages = data.total_pages;
  } else if (sort === "upcoming") {
    const data = await getUpcomingMovies(page);
    movies = data.results;
    totalPages = data.total_pages;
  } else if (genre && genre !== "0") {
    const params: Record<string, string> = {
      with_genres: genre,
      page,
    };
    if (sort && SORT_OPTIONS.some((o) => o.value === sort)) {
      params.sort_by = sort;
    }
    const data = await discoverMovies(params);
    movies = data.results;
    totalPages = data.total_pages;
  } else {
    const data = await getPopularMovies(page);
    movies = data.results;
    totalPages = data.total_pages;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-white mb-8">电影库</h1>

      {/* 筛选栏 */}
      <div className="mb-8 space-y-4">
        {/* 类型筛选 */}
        <div className="flex flex-wrap gap-2">
          {GENRES_LIST.map((g) => (
            <Link
              key={g.id}
              href={`/movie?genre=${g.id}${sort ? `&sort=${sort}` : ""}`}
              className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
                (genre === undefined && g.id === 0) ||
                genre === g.id.toString()
                  ? "bg-brand-red text-white"
                  : "bg-brand-card text-gray-300 hover:bg-gray-700"
              }`}
            >
              {g.name}
            </Link>
          ))}
        </div>

        {/* 排序方式 */}
        <div className="flex flex-wrap gap-2">
          {SORT_OPTIONS.map((option) => (
            <Link
              key={option.value}
              href={`/movie?${genre && genre !== "0" ? `genre=${genre}&` : ""}sort=${option.value}`}
              className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
                sort === option.value
                  ? "bg-brand-gold text-black"
                  : "bg-brand-card text-gray-300 hover:bg-gray-700"
              }`}
            >
              {option.label}
            </Link>
          ))}
        </div>
      </div>

      {/* 电影网格 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* 分页 */}
      <Pagination
        currentPage={parseInt(page)}
        totalPages={totalPages}
        basePath="/movie"
      />
    </div>
  );
}
