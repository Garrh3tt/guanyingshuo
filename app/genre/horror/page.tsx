import { Metadata } from "next"
import MovieSection from "@/components/MovieSection"

export const metadata: Metadata = { title: "恐怖电影 - 观影说", description: "精选恐怖电影推荐，惊悚刺激的观影体验" }
export default function HorrorMoviesPage() {
  return (
    <div className="min-h-screen bg-brand-dark">
      <section className="bg-gradient-to-b from-purple-900/20 to-brand-dark py-16"><div className="container mx-auto px-4"><h1 className="text-4xl md:text-5xl font-bold text-white mb-4">👻 恐怖电影</h1><p className="text-gray-400 text-lg">惊悚刺激的恐怖佳作，挑战心理极限的观影体验</p></div></section>
      <MovieSection title="经典恐怖" emoji="🎃" genreId={27} showViewAll={false} />
      <MovieSection title="悬疑惊悚" emoji="🔍" keyword="thriller mystery" showViewAll={false} />
      <MovieSection title="超自然恐怖" emoji="👹" keyword="supernatural horror" showViewAll={false} />
    </div>
  )
}
