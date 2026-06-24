import HeroBanner from "@/components/HeroBanner";
import MovieSection from "@/components/MovieSection";
import {
  getTrendingMovies,
  getNowPlayingMovies,
  getPopularMovies,
  getUpcomingMovies,
  getTopRatedMovies,
} from "@/lib/tmdb";

export const dynamic = "force-dynamic";

export default async function Home() {
  // 并行获取所有数据
  const [trending, nowPlaying, popular, upcoming, topRated] =
    await Promise.all([
      getTrendingMovies(),
      getNowPlayingMovies(),
      getPopularMovies(),
      getUpcomingMovies(),
      getTopRatedMovies(),
    ]);

  return (
    <div>
      {/* 轮播大图 */}
      <HeroBanner movies={trending.slice(0, 5)} />

      {/* 电影区块 */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <MovieSection
          title="正在热映"
          emoji="🔥"
          movies={nowPlaying.results}
          moreLink="/movie?sort=now_playing"
        />

        <MovieSection
          title="热门电影"
          emoji="🎬"
          movies={popular.results}
          moreLink="/movie"
        />

        <MovieSection
          title="即将上映"
          emoji="📅"
          movies={upcoming.results}
          moreLink="/movie?sort=upcoming"
        />

        <MovieSection
          title="高分佳作"
          emoji="⭐"
          movies={topRated.results}
          moreLink="/ranking"
        />
      </div>
    </div>
  );
}
