import Link from "next/link";
import Image from "next/image";
import { Movie } from "@/lib/types";
import { getPosterUrl } from "@/lib/constants";
import { getYear } from "@/lib/utils";
import TomatoScore from "./TomatoScore";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`/movie/${movie.id}`} className="movie-card block">
      <div className="bg-brand-card rounded-lg overflow-hidden shadow-lg">
        {/* 海报图片 */}
        <div className="relative aspect-[2/3]">
          <Image
            src={getPosterUrl(movie.poster_path, "poster_medium")}
            alt={movie.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
          />
          {/* 评分角标 */}
          {movie.vote_average > 0 && (
            <div className="absolute top-2 right-2 bg-brand-darker/80 backdrop-blur-sm rounded-md px-2 py-1">
              <TomatoScore score={movie.vote_average} size="sm" />
            </div>
          )}
        </div>

        {/* 电影信息 */}
        <div className="p-3">
          <h3 className="text-white font-medium text-sm line-clamp-1">
            {movie.title}
          </h3>
          <p className="text-gray-500 text-xs mt-1">
            {getYear(movie.release_date)}
          </p>
        </div>
      </div>
    </Link>
  );
}
