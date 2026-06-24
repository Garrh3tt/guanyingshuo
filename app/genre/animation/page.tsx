import { Metadata } from "next"
import MovieSection from "@/components/MovieSection"

export const metadata: Metadata = { title: "动画电影 - 观影说", description: "精选动画电影推荐，充满想象力的视觉盛宴" }
export default function AnimationMoviesPage() {
  return (
    <div className="min-h-screen bg-brand-dark">
      <section className="bg-gradient-to-b from-orange-900/20 to-brand-dark py-16"><div className="container mx-auto px-4"><h1 className="text-4xl md:text-5xl font-bold text-white mb-4">🎨 动画电影</h1><p className="text-gray-400 text-lg">充满想象力的动画佳作，适合全年龄段的视觉盛宴</p></div></section>
      <MovieSection title="经典动画" emoji="🏆" genreId={16} showViewAll={false} />
      <MovieSection title="3D动画" emoji="🎬" keyword="3d animation" showViewAll={false} />
      <MovieSection title="日本动漫" emoji="🇵" keyword="anime" showViewAll={false} />
    </div>
  )
}
