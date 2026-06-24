import { Metadata } from "next"
import MovieSection from "@/components/MovieSection"

export const metadata: Metadata = {
  title: "动作电影 - 观影说",
  description: "精选动作电影推荐，热血刺激的观影体验",
}

export default function ActionMoviesPage() {
  return (
    <div className="min-h-screen bg-brand-dark">
      <section className="bg-gradient-to-b from-red-900/20 to-brand-dark py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">🎬 动作电影</h1>
          <p className="text-gray-400 text-lg">热血沸腾的动作大片，精彩刺激的视觉盛宴</p>
        </div>
      </section>

      <MovieSection 
        title="经典动作" 
        emoji="💪" 
        genreId={28} 
        showViewAll={false}
      />
      
      <MovieSection 
        title="超级英雄" 
        emoji="🦸" 
        keyword="superhero"
        showViewAll={false}
      />
      
      <MovieSection 
        title="战争动作" 
        emoji="️" 
        keyword="war action"
        showViewAll={false}
      />
    </div>
  )
}
