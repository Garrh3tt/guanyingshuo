"use client";

import { useState } from "react";

interface SafeImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export default function SafeImage({
  src,
  alt,
  fill,
  width,
  height,
  className = "",
  priority,
}: SafeImageProps) {
  const [error, setError] = useState(false);

  // 如果加载失败或使用的是占位图，显示备用样式
  if (error || src === "/placeholder-poster.png") {
    return (
      <div
        className={`bg-brand-card flex items-center justify-center text-gray-500 ${className}`}
        style={fill ? { position: "absolute", inset: 0 } : { width, height }}
      >
        <span className="text-2xl">🎬</span>
      </div>
    );
  }

  // 使用原生 img 标签绕过 Vercel Image Optimization
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={src}
      alt={alt}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      className={className}
      style={fill ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" } : undefined}
      loading={priority ? "eager" : "lazy"}
      onError={() => setError(true)}
    />
  );
}
