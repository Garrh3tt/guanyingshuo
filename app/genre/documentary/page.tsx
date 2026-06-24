import { Metadata } from "next"
import MovieSection from "@/components/MovieSection"

export const metadata: Metadata = { title: "纪录片 - 观影说", description: "精选纪录片推荐，真实记录世界的精彩瞬间" }
export default function DocumentaryMoviesPage() {
  return (
    <div className="min-h-screen bg-brand-dark">
      <section className="bg-gradient-to-b from-green-900/20 to-brand-dark py-16"><div className="container mx-auto px-4"><h1 className="text-4xl md:text-5xl font-bold text-white mb-4">📹 纪录片</h1><p className="text-gray-400 text-lg">真实记录世界的精彩瞬间，探索未知的知识宝库</p></div></section>
      <MovieSection title="自然纪录片" emoji="🌍" genreId={99} showViewAll={false} />
      <MovieSection title="历史纪录片" emoji="📜" keyword="history documentary" showViewAll={false} />
      <MovieSection title="人物传记" emoji="👤" keyword="biography documentary" showViewAll={false} />
    </div>
  )
}
