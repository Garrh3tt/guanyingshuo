import { Metadata } from "next"
import MovieSection from "@/components/MovieSection"
import { getMoviesByGenre } from "@/lib/tmdb"

export const metadata: Metadata = {
  title: "纪录片 - 观影说",
  description: "精选纪录片推荐，真实记录世界的精彩瞬间",
}

export const dynamic = "force-dynamic"

export default async function DocumentaryMoviesPage() {
  const [documentary, history] = await Promise.all([
    getMoviesByGenre(99),
    getMoviesByGenre(36),
  ])

  return (
    <div className="min-h-screen bg-brand-dark">
      <section className="bg-gradient-to-b from-green-900/20 to-brand-dark py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">📹 纪录片</h1>
          <p className="text-gray-400 text-lg">真实记录世界的精彩瞬间，探索未知的知识宝库</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <MovieSection title="自然纪录片" emoji="🌍" movies={documentary.results} />
        <MovieSection title="历史纪录" emoji="📜" movies={history.results} />
      </div>
    </div>
  )
}
