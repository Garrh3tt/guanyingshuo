import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getMovieDetail,
  getMovieCredits,
  getMovieReviews,
  getSimilarMovies,
} from "@/lib/tmdb";
import { getPosterUrl, getBackdropUrl } from "@/lib/constants";
import {
  formatDate,
  formatRuntime,
  formatCurrency,
  getTomatoStatus,
} from "@/lib/utils";
import TomatoScore from "@/components/TomatoScore";
import MovieCard from "@/components/MovieCard";
import ReviewSection from "@/components/ReviewSection";
import WatchlistButton from "@/components/WatchlistButton";
import Breadcrumb from "@/components/Breadcrumb";
import SafeImage from "@/components/SafeImage";
import RecordView from "@/components/RecordView";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface MovieDetailPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: MovieDetailPageProps): Promise<Metadata> {
  try {
    const movie = await getMovieDetail(params.id);
    return {
      title: `${movie.title} - 观影说`,
      description: movie.overview,
      openGraph: {
        images: movie.poster_path
          ? [`https://image.tmdb.org/t/p/w500${movie.poster_path}`]
          : [],
      },
    };
  } catch {
    return { title: "电影详情 - 观影说" };
  }
}

export default async function MovieDetailPage({ params }: MovieDetailPageProps) {
  let movie;
  try {
    movie = await getMovieDetail(params.id);
  } catch {
    notFound();
  }

  const [credits, reviews, similar] = await Promise.all([
    getMovieCredits(params.id),
    getMovieReviews(params.id),
    getSimilarMovies(params.id),
  ]);

  const director = credits.crew.find((c) => c.job === "Director");
  const tomatoStatus = getTomatoStatus(movie.vote_average);

  return (
    <div>
      <RecordView
        movieId={movie.id}
        title={movie.title}
        posterPath={movie.poster_path}
      />
      {/* 英雄区 */}
      <div className="relative h-[400px] sm:h-[500px] md:h-[600px]">
        {/* 背景图 */}
        <SafeImage
          src={getBackdropUrl(movie.backdrop_path, "original")}
          alt={movie.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-darker via-brand-darker/80 to-brand-darker/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-darker via-transparent to-transparent" />

        {/* 返回按钮 */}
        <div className="absolute top-4 left-4 z-10">
          <Link
            href="/movie"
            className="inline-flex items-center gap-2 px-4 py-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors text-sm backdrop-blur-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回
          </Link>
        </div>

        {/* 内容 */}
        <div className="absolute inset-0 flex items-end pb-10">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="flex flex-col md:flex-row gap-8">
              {/* 海报 */}
              <div className="hidden md:block shrink-0 w-[200px] lg:w-[250px]">
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-2xl">
                  <SafeImage
                    src={getPosterUrl(movie.poster_path, "poster_large")}
                    alt={movie.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* 信息 */}
              <div className="flex-1">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
                  {movie.title}
                </h1>
                {movie.original_title !== movie.title && (
                  <p className="text-gray-400 text-lg mb-4">
                    {movie.original_title}
                  </p>
                )}

                {/* 标签 */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-brand-card/80 text-gray-300 rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                  {movie.release_date && (
                    <span className="text-gray-400 text-sm">
                      {movie.release_date.split("-")[0]}
                    </span>
                  )}
                  {movie.runtime > 0 && (
                    <span className="text-gray-400 text-sm">
                      {formatRuntime(movie.runtime)}
                    </span>
                  )}
                </div>

                {/* 评分 */}
                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center gap-3">
                    <TomatoScore score={movie.vote_average} size="lg" />
                    <span className="text-gray-400 text-sm">
                      {tomatoStatus.label}
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="text-brand-gold font-bold text-lg">
                      {movie.vote_average.toFixed(1)}
                    </span>
                    <span className="text-gray-400 ml-1">
                      / 10 ({movie.vote_count.toLocaleString()} 评价)
                    </span>
                  </div>
                </div>

                {/* 标语 */}
                {movie.tagline && (
                  <p className="text-gray-300 italic mb-4">
                    &ldquo;{movie.tagline}&rdquo;
                  </p>
                )}

                {/* 收藏按钮 */}
                <WatchlistButton
                  movieId={movie.id}
                  title={movie.title}
                  posterPath={movie.poster_path}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 详情区域 */}
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
        {/* 面包屑导航 */}
        <Breadcrumb
          items={[
            { label: "电影", href: "/movie" },
            { label: movie.title },
          ]}
        />
        {/* 剧情简介 */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span>📖</span> 剧情简介
          </h2>
          <p className="text-gray-300 leading-relaxed">
            {movie.overview || "暂无简介"}
          </p>
        </section>

        {/* 影片信息 */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span>📋</span> 影片信息
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-brand-card rounded-lg p-6">
            {director && (
              <div>
                <span className="text-gray-500 text-sm">导演</span>
                <p className="text-white">{director.name}</p>
              </div>
            )}
            <div>
              <span className="text-gray-500 text-sm">上映日期</span>
              <p className="text-white">{formatDate(movie.release_date)}</p>
            </div>
            <div>
              <span className="text-gray-500 text-sm">片长</span>
              <p className="text-white">{formatRuntime(movie.runtime)}</p>
            </div>
            <div>
              <span className="text-gray-500 text-sm">状态</span>
              <p className="text-white">{movie.status}</p>
            </div>
            <div>
              <span className="text-gray-500 text-sm">语言</span>
              <p className="text-white">
                {movie.spoken_languages.map((l) => l.name).join(", ") || "未知"}
              </p>
            </div>
            {movie.budget > 0 && (
              <div>
                <span className="text-gray-500 text-sm">预算</span>
                <p className="text-white">{formatCurrency(movie.budget)}</p>
              </div>
            )}
            {movie.revenue > 0 && (
              <div>
                <span className="text-gray-500 text-sm">票房</span>
                <p className="text-white">{formatCurrency(movie.revenue)}</p>
              </div>
            )}
          </div>
        </section>

        {/* 演员表 */}
        {credits.cast.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span>🎭</span> 演员表
            </h2>
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4">
              {credits.cast.slice(0, 20).map((person) => (
                <div
                  key={person.id}
                  className="shrink-0 w-[120px] text-center"
                >
                  <div className="relative w-20 h-20 mx-auto mb-2 rounded-full overflow-hidden bg-brand-card">
                    <SafeImage
                      src={
                        person.profile_path
                          ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                          : "/placeholder-poster.png"
                      }
                      alt={person.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <p className="text-white text-sm font-medium truncate">
                    {person.name}
                  </p>
                  <p className="text-gray-500 text-xs truncate">
                    {person.character}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 评论 */}
        {reviews.results.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span>💬</span> 观众评论
            </h2>
            <div className="space-y-4">
              {reviews.results.slice(0, 5).map((review) => (
                <div
                  key={review.id}
                  className="bg-brand-card rounded-lg p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-brand-red flex items-center justify-center text-white font-bold">
                      {review.author[0]?.toUpperCase() || "U"}
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        {review.author_details.name ||
                          review.author_details.username ||
                          review.author}
                      </p>
                      {review.author_details.rating && (
                        <p className="text-brand-gold text-sm">
                          ⭐ {review.author_details.rating}/10
                        </p>
                      )}
                    </div>
                    <span className="text-gray-500 text-sm ml-auto">
                      {formatDate(review.created_at)}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed line-clamp-6">
                    {review.content}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 用户评论 */}
        <ReviewSection movieId={movie.id} />

        {/* 相似推荐 */}
        {similar.results.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span>🎬</span> 相似推荐
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
              {similar.results.slice(0, 10).map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
