import fs from "fs"
import path from "path"

interface Review {
  id: string
  movieId: number
  userName: string
  rating: number
  content: string
  createdAt: string
}

const DB_PATH = path.join(process.cwd(), "data", "reviews.json")

function ensureDir() {
  const dir = path.dirname(DB_PATH)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

function readReviews(): Review[] {
  try {
    ensureDir()
    if (!fs.existsSync(DB_PATH)) {
      fs.writeFileSync(DB_PATH, "[]", "utf-8")
      return []
    }
    const data = fs.readFileSync(DB_PATH, "utf-8")
    return JSON.parse(data)
  } catch {
    return []
  }
}

function writeReviews(reviews: Review[]) {
  ensureDir()
  fs.writeFileSync(DB_PATH, JSON.stringify(reviews, null, 2), "utf-8")
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9)
}

export const reviewDB = {
  getMovieReviews(movieId: number): Review[] {
    const reviews = readReviews()
    return reviews
      .filter((r) => r.movieId === movieId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  },

  addReview(movieId: number, userName: string, rating: number, content: string): Review {
    const reviews = readReviews()
    const newReview: Review = {
      id: generateId(),
      movieId,
      userName,
      rating,
      content,
      createdAt: new Date().toISOString(),
    }
    reviews.push(newReview)
    writeReviews(reviews)
    return newReview
  },

  getAverageRating(movieId: number): { average: number; count: number } {
    const reviews = readReviews()
    const movieReviews = reviews.filter((r) => r.movieId === movieId)
    if (movieReviews.length === 0) return { average: 0, count: 0 }
    const sum = movieReviews.reduce((acc, r) => acc + r.rating, 0)
    return {
      average: Math.round((sum / movieReviews.length) * 10) / 10,
      count: movieReviews.length,
    }
  },
}
