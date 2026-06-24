import { Metadata } from "next";
import MovieCard from "@/components/MovieCard";
import Pagination from "@/components/Pagination";
import { searchMovies } from "@/lib/tmdb";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "搜索结果 - 观影说",
};

interface SearchPageProps {
  searchParams: {
    q?: string;
    page?: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || "";
  const page = searchParams.page || "1";

  if (!query) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-white mb-8">搜索结果</h1>
        <p className="text-gray-400 text-center py-20">
          请输入关键词开始搜索
        </p>
      </div>
    );
  }

  const results = await searchMovies(query, page);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-white mb-2">搜索结果</h1>
      <p className="text-gray-400 mb-8">
        &ldquo;<span className="text-brand-red">{query}</span>&rdquo; 共找到{" "}
        {results.total_results} 个结果
      </p>

      {results.results.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {results.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          <Pagination
            currentPage={parseInt(page)}
            totalPages={results.total_pages}
            basePath={`/search?q=${encodeURIComponent(query)}`}
          />
        </>
      ) : (
        <div className="text-center py-20">
          <p className="text-6xl mb-4">🔍</p>
          <p className="text-gray-400 text-lg">
            未找到与 &ldquo;{query}&rdquo; 相关的电影
          </p>
          <p className="text-gray-500 text-sm mt-2">
            试试其他关键词，或浏览我们的电影库
          </p>
        </div>
      )}
    </div>
  );
}
