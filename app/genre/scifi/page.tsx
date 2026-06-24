import { Metadata } from "next"
import MovieSection from "@/components/MovieSection"
import { getMoviesByGenre } from "@/lib/tmdb"

export const metadata: Metadata = {
  title: "科幻电影 - 观影说",
  description: "精选科幻电影推荐，探索未来的无限可能",
}

export const dynamic = "force-dynamic"

export default async function SciFiMoviesPage() {
  const [scifi, fantasy] = await Promise.all([
    getMoviesByGenre(878),
    getMoviesByGenre(14),
  ])

  return (
    <div className="min-h-screen bg-brand-dark">
      <section className="bg-gradient-to-b from-blue-900/20 to-brand-dark py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">🚀 科幻电影</h1>
          <p className="text-gray-400 text-lg">探索未知世界的科幻佳作，震撼心灵的视觉奇观</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <MovieSection title="科幻大片" emoji="🌌" movies={scifi.results} />
        <MovieSection title="奇幻电影" emoji="🧙" movies={fantasy.results} />
      </div>
    </div>
  )
}
