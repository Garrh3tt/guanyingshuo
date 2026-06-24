import { Metadata } from "next"
import MovieSection from "@/components/MovieSection"

export const metadata: Metadata = { title: "爱情电影 - 观影说", description: "精选爱情电影推荐，浪漫动人的情感故事" }
export default function RomanceMoviesPage() {
  return (
    <div className="min-h-screen bg-brand-dark">
      <section className="bg-gradient-to-b from-pink-900/20 to-brand-dark py-16"><div className="container mx-auto px-4"><h1 className="text-4xl md:text-5xl font-bold text-white mb-4">💕 爱情电影</h1><p className="text-gray-400 text-lg">浪漫动人的爱情故事，触动心灵的情感体验</p></div></section>
      <MovieSection title="经典爱情" emoji="❤️" genreId={10749} showViewAll={false} />
      <MovieSection title="青春爱情" emoji="🌸" keyword="teen romance" showViewAll={false} />
      <MovieSection title="虐心爱情" emoji="💔" keyword="tragic romance" showViewAll={false} />
    </div>
  )
}
