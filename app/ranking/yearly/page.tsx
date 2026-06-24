import { Metadata } from "next"
import MovieSection from "@/components/MovieSection"
import { getTopRatedMovies, getPopularMovies } from "@/lib/tmdb"

export const metadata: Metadata = {
  title: "2026年度电影榜单 - 观影说",
  description: "2026年最值得看的电影推荐",
}

export const dynamic = "force-dynamic"

export default async function YearlyRankingPage() {
  const [topRated, popular] = await Promise.all([
    getTopRatedMovies(),
    getPopularMovies(),
  ])

  return (
    <div className="min-h-screen bg-brand-dark">
      <section className="bg-gradient-to-b from-brand-gold/10 to-brand-dark py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">🏆 2026年度电影榜单</h1>
          <p className="text-gray-400 text-lg">年度最佳电影精选，不容错过的佳作</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <MovieSection title="年度高分精选" emoji="🥇" movies={topRated.results} />
        <MovieSection title="年度热门电影" emoji="🔥" movies={popular.results} />
      </div>
    </div>
  )
}
