import { Metadata } from "next"
import MovieSection from "@/components/MovieSection"
import { getMoviesByGenre } from "@/lib/tmdb"

export const metadata: Metadata = {
  title: "爱情电影 - 观影说",
  description: "精选爱情电影推荐，浪漫动人的情感故事",
}

export const dynamic = "force-dynamic"

export default async function RomanceMoviesPage() {
  const [romance, drama] = await Promise.all([
    getMoviesByGenre(10749),
    getMoviesByGenre(18),
  ])

  return (
    <div className="min-h-screen bg-brand-dark">
      <section className="bg-gradient-to-b from-pink-900/20 to-brand-dark py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">💕 爱情电影</h1>
          <p className="text-gray-400 text-lg">浪漫动人的爱情故事，触动心灵的情感体验</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <MovieSection title="经典爱情" emoji="❤️" movies={romance.results} />
        <MovieSection title="爱情剧情" emoji="🎭" movies={drama.results} />
      </div>
    </div>
  )
}
