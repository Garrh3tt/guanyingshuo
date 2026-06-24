import { Metadata } from "next"
import MovieSection from "@/components/MovieSection"

export const metadata: Metadata = {
  title: "喜剧电影 - 观影说",
  description: "精选喜剧电影推荐，轻松愉快的观影体验",
}

export default function ComedyMoviesPage() {
  return (
    <div className="min-h-screen bg-brand-dark">
      <section className="bg-gradient-to-b from-yellow-900/20 to-brand-dark py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4"> 喜剧电影</h1>
          <p className="text-gray-400 text-lg">开怀大笑的喜剧佳作，轻松愉快的观影时光</p>
        </div>
      </section>

      <MovieSection title="经典喜剧" emoji="🎭" genreId={35} showViewAll={false} />
      <MovieSection title="浪漫喜剧" emoji="💕" keyword="romantic comedy" showViewAll={false} />
      <MovieSection title="黑色幽默" emoji="🖤" keyword="dark comedy" showViewAll={false} />
    </div>
  )
}
