import { Metadata } from "next"
import MovieSection from "@/components/MovieSection"
import { getMoviesByGenre } from "@/lib/tmdb"

export const metadata: Metadata = {
  title: "动作电影 - 观影说",
  description: "精选动作电影推荐，热血刺激的观影体验",
}

export const dynamic = "force-dynamic"

export default async function ActionMoviesPage() {
  const [action, adventure, war] = await Promise.all([
    getMoviesByGenre(28),
    getMoviesByGenre(12),
    getMoviesByGenre(10752),
  ])

  return (
    <div className="min-h-screen bg-brand-dark">
      <section className="bg-gradient-to-b from-red-900/20 to-brand-dark py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">🎬 动作电影</h1>
          <p className="text-gray-400 text-lg">热血沸腾的动作大片，精彩刺激的视觉盛宴</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <MovieSection title="经典动作" emoji="💪" movies={action.results} />
        <MovieSection title="冒险动作" emoji="🗺️" movies={adventure.results} />
        <MovieSection title="战争动作" emoji="⚔️" movies={war.results} />
      </div>
    </div>
  )
}
