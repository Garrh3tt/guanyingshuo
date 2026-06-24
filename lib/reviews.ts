import { readData, writeData } from "@/lib/storage";

export interface Review {
  id: string;
  movieId: number;
  userName: string;
  rating: number;
  content: string;
  createdAt: string;
}

const REVIEWS_KEY = "reviews.json";

async function readReviews(): Promise<Review[]> {
  return (await readData<Review[]>(REVIEWS_KEY)) || [];
}

async function writeReviews(reviews: Review[]) {
  await writeData(REVIEWS_KEY, reviews);
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export const reviewDB = {
  async getMovieReviews(movieId: number): Promise<Review[]> {
    const reviews = await readReviews();
    return reviews
      .filter((r) => r.movieId === movieId)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  },

  async addReview(
    movieId: number,
    userName: string,
    rating: number,
    content: string
  ): Promise<Review> {
    const reviews = await readReviews();
    const newReview: Review = {
      id: generateId(),
      movieId,
      userName,
      rating,
      content,
      createdAt: new Date().toISOString(),
    };
    reviews.push(newReview);
    await writeReviews(reviews);
    return newReview;
  },

  async getAverageRating(
    movieId: number
  ): Promise<{ average: number; count: number }> {
    const reviews = await readReviews();
    const movieReviews = reviews.filter((r) => r.movieId === movieId);
    if (movieReviews.length === 0) return { average: 0, count: 0 };
    const sum = movieReviews.reduce((acc, r) => acc + r.rating, 0);
    return {
      average: Math.round((sum / movieReviews.length) * 10) / 10,
      count: movieReviews.length,
    };
  },
};
