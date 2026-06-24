import { Metadata } from "next"
import MovieSection from "@/components/MovieSection"

export const metadata: Metadata = { title: "科幻电影 - 观影说", description: "精选科幻电影推荐，探索未来的无限可能" }
export default function SciFiMoviesPage() {
  return (
    <div className="min-h-screen bg-brand-dark">
      <section className="bg-gradient-to-b from-blue-900/20 to-brand-dark py-16"><div className="container mx-auto px-4"><h1 className="text-4xl md:text-5xl font-bold text-white mb-4">🚀 科幻电影</h1><p className="text-gray-400 text-lg">探索未知世界的科幻佳作，震撼心灵的视觉奇观</p></div></section>
      <MovieSection title="太空科幻" emoji="🌌" genreId={878} showViewAll={false} />
      <MovieSection title="人工智能" emoji="🤖" keyword="artificial intelligence" showViewAll={false} />
      <MovieSection title="时间旅行" emoji="" keyword="time travel" showViewAll={false} />
    </div>
  )
}
