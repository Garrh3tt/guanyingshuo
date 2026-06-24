import { Metadata } from "next"
import MovieSection from "@/components/MovieSection"
import { getMoviesByGenre } from "@/lib/tmdb"

export const metadata: Metadata = {
  title: "动画电影 - 观影说",
  description: "精选动画电影推荐，充满想象力的视觉盛宴",
}

export const dynamic = "force-dynamic"

export default async function AnimationMoviesPage() {
  const [animation, family] = await Promise.all([
    getMoviesByGenre(16),
    getMoviesByGenre(10751),
  ])

  return (
    <div className="min-h-screen bg-brand-dark">
      <section className="bg-gradient-to-b from-orange-900/20 to-brand-dark py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">🎨 动画电影</h1>
          <p className="text-gray-400 text-lg">充满想象力的动画佳作，适合全年龄段的视觉盛宴</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <MovieSection title="经典动画" emoji="🏆" movies={animation.results} />
        <MovieSection title="家庭动画" emoji="👨‍👩‍👧‍👦" movies={family.results} />
      </div>
    </div>
  )
}
