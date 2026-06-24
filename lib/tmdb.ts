import { Movie, MovieDetail, Credits, Review, TMDBResponse, Genre } from "./types";

const BASE_URL = process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3";
const API_KEY = process.env.TMDB_API_KEY;

async function fetchTMDB<T>(
  endpoint: string,
  params?: Record<string, string>
): Promise<T> {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set("api_key", API_KEY!);
  url.searchParams.set("language", "zh-CN");
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }

  const res = await fetch(url.toString(), {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`TMDB API 请求失败: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

// 本周趋势电影
export async function getTrendingMovies(): Promise<Movie[]> {
  const data = await fetchTMDB<TMDBResponse<Movie>>("/trending/movie/week");
  return data.results;
}

// 正在热映
export async function getNowPlayingMovies(page = "1"): Promise<TMDBResponse<Movie>> {
  return fetchTMDB<TMDBResponse<Movie>>("/movie/now_playing", { page });
}

// 热门电影
export async function getPopularMovies(page = "1"): Promise<TMDBResponse<Movie>> {
  return fetchTMDB<TMDBResponse<Movie>>("/movie/popular", { page });
}

// 即将上映
export async function getUpcomingMovies(page = "1"): Promise<TMDBResponse<Movie>> {
  return fetchTMDB<TMDBResponse<Movie>>("/movie/upcoming", { page });
}

// 评分最高
export async function getTopRatedMovies(page = "1"): Promise<TMDBResponse<Movie>> {
  return fetchTMDB<TMDBResponse<Movie>>("/movie/top_rated", { page });
}

// 电影详情
export async function getMovieDetail(id: string): Promise<MovieDetail> {
  return fetchTMDB<MovieDetail>(`/movie/${id}`);
}

// 电影演员表
export async function getMovieCredits(id: string): Promise<Credits> {
  return fetchTMDB<Credits>(`/movie/${id}/credits`);
}

// 电影评论
export async function getMovieReviews(
  id: string,
  page = "1"
): Promise<TMDBResponse<Review>> {
  return fetchTMDB<TMDBResponse<Review>>(`/movie/${id}/reviews`, { page });
}

// 相似电影
export async function getSimilarMovies(id: string): Promise<TMDBResponse<Movie>> {
  return fetchTMDB<TMDBResponse<Movie>>(`/movie/${id}/similar`);
}

// 搜索电影
export async function searchMovies(
  query: string,
  page = "1"
): Promise<TMDBResponse<Movie>> {
  return fetchTMDB<TMDBResponse<Movie>>("/search/movie", { query, page });
}

// 发现电影 (按类型筛选)
export async function discoverMovies(
  params: Record<string, string> = {}
): Promise<TMDBResponse<Movie>> {
  return fetchTMDB<TMDBResponse<Movie>>("/discover/movie", {
    sort_by: "popularity.desc",
    ...params,
  });
}

// 获取电影类型列表
export async function getGenres(): Promise<{ genres: Genre[] }> {
  return fetchTMDB<{ genres: Genre[] }>("/genre/movie/list");
}
