import { NextResponse } from "next/server"
import { reviewDB } from "@/lib/reviews"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const movieId = searchParams.get("movieId")

  if (!movieId) {
    return NextResponse.json({ error: "缺少 movieId 参数" }, { status: 400 })
  }

  const reviews = reviewDB.getMovieReviews(Number(movieId))
  const rating = reviewDB.getAverageRating(Number(movieId))

  return NextResponse.json({ reviews, rating })
}
