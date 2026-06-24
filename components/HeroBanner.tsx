"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import Link from "next/link";
import { Movie } from "@/lib/types";
import { getBackdropUrl } from "@/lib/constants";
import { truncateText } from "@/lib/utils";
import TomatoScore from "./TomatoScore";
import SafeImage from "./SafeImage";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface HeroBannerProps {
  movies: Movie[];
}

export default function HeroBanner({ movies }: HeroBannerProps) {
  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        effect="fade"
        className="hero-swiper h-[300px] sm:h-[400px] md:h-[500px]"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="relative h-full">
              {/* 背景图 */}
              <SafeImage
                src={getBackdropUrl(movie.backdrop_path, "original")}
                alt={movie.title}
                fill
                className="object-cover"
                priority
              />
              {/* 渐变遮罩 */}
              <div className="absolute inset-0 bg-gradient-to-r from-brand-darker via-brand-darker/70 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-darker via-transparent to-transparent" />

              {/* 内容 */}
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-4 w-full">
                  <div className="max-w-xl">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
                      {movie.title}
                    </h2>
                    <p className="text-gray-300 text-sm sm:text-base mb-4 line-clamp-3">
                      {truncateText(movie.overview, 150)}
                    </p>
                    <div className="flex items-center gap-4 mb-6">
                      <TomatoScore score={movie.vote_average} size="lg" />
                      <span className="text-gray-400 text-sm">
                        {movie.vote_count.toLocaleString()} 人评价
                      </span>
                    </div>
                    <Link
                      href={`/movie/${movie.id}`}
                      className="inline-block bg-brand-red text-white px-6 py-2.5 rounded-lg font-medium hover:bg-red-700 transition-colors"
                    >
                      查看详情
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
