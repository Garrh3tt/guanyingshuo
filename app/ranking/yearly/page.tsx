import { Metadata } from "next"
import MovieSection from "@/components/MovieSection"

export const metadata: Metadata = { title: "2026年度电影榜单 - 观影说", description: "2026年最值得看的电影推荐" }

export default function YearlyRankingPage() {
  return (
    <div className="min-h-screen bg-brand-dark">
      <section className="bg-gradient-to-b from-brand-gold/10 to-brand-dark py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4"> 2026年度电影榜单</h1>
          <p className="text-gray-400 text-lg">年度最佳电影精选，不容错过的佳作</p>
        </div>
      </section>

      <MovieSection title="年度十佳" emoji="🥇" keyword="top 10 2026" showViewAll={false} />
      <MovieSection title="最佳导演" emoji="🎬" keyword="best director 2026" showViewAll={false} />
      <MovieSection title="最佳演员" emoji="🌟" keyword="best actor 2026" showViewAll={false} />
      <MovieSection title="最佳剧本" emoji="✍️" keyword="best screenplay 2026" showViewAll={false} />
      <MovieSection title="观众最爱" emoji="❤️" keyword="audience favorite 2026" showViewAll={false} />
    </div>
  )
}
