export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export const IMAGE_SIZES = {
  poster_small: "w185",
  poster_medium: "w342",
  poster_large: "w500",
  backdrop: "w1280",
  backdrop_small: "w780",
  profile: "w185",
  original: "original",
} as const;

export function getPosterUrl(path: string | null, size: keyof typeof IMAGE_SIZES = "poster_medium"): string {
  if (!path) return "/placeholder-poster.png";
  return `${IMAGE_BASE_URL}/${IMAGE_SIZES[size]}${path}`;
}

export function getBackdropUrl(path: string | null, size: keyof typeof IMAGE_SIZES = "backdrop"): string {
  if (!path) return "/placeholder-poster.png";
  return `${IMAGE_BASE_URL}/${IMAGE_SIZES[size]}${path}`;
}

export function getProfileUrl(path: string | null): string {
  if (!path) return "/placeholder-poster.png";
  return `${IMAGE_BASE_URL}/${IMAGE_SIZES.profile}${path}`;
}

// 电影类型映射 (TMDB genre IDs)
export const GENRE_MAP: Record<number, string> = {
  28: "动作",
  12: "冒险",
  16: "动画",
  35: "喜剧",
  80: "犯罪",
  99: "纪录",
  18: "剧情",
  10751: "家庭",
  14: "奇幻",
  36: "历史",
  27: "恐怖",
  10402: "音乐",
  9648: "悬疑",
  10749: "爱情",
  878: "科幻",
  10770: "电视电影",
  53: "惊悚",
  10752: "战争",
  37: "西部",
};

export const GENRES_LIST = [
  { id: 0, name: "全部" },
  { id: 28, name: "动作" },
  { id: 35, name: "喜剧" },
  { id: 18, name: "剧情" },
  { id: 878, name: "科幻" },
  { id: 16, name: "动画" },
  { id: 27, name: "恐怖" },
  { id: 53, name: "惊悚" },
  { id: 10749, name: "爱情" },
  { id: 80, name: "犯罪" },
  { id: 12, name: "冒险" },
  { id: 14, name: "奇幻" },
];

export const SORT_OPTIONS = [
  { value: "popularity.desc", label: "最受欢迎" },
  { value: "vote_average.desc", label: "评分最高" },
  { value: "primary_release_date.desc", label: "最新上映" },
  { value: "revenue.desc", label: "票房最高" },
];
