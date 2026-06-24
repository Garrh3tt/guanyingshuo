import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-darker border-t border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 网站简介 */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🎬</span>
              <span className="text-xl font-bold text-white">
                观影<span className="text-brand-red">说</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              观影说是一个电影评分与评论聚合平台，为您提供最新的电影资讯、专业的评分和真实的观众评论。
            </p>
          </div>

          {/* 快速链接 */}
          <div>
            <h3 className="text-white font-semibold mb-4">快速链接</h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                首页
              </Link>
              <Link
                href="/movie"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                电影库
              </Link>
              <Link
                href="/ranking"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                排行榜
              </Link>
              <Link
                href="/about"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                关于我们
              </Link>
            </nav>
          </div>

          {/* 数据来源 */}
          <div>
            <h3 className="text-white font-semibold mb-4">数据来源</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-3">
              本站电影数据由 TMDB (The Movie Database) 提供。
            </p>
            <p className="text-gray-500 text-xs leading-relaxed">
              This product uses the TMDB API but is not endorsed or certified by
              TMDB.
            </p>
          </div>
        </div>

        {/* 底部版权 */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} 观影说 guanyingshuo.cc.cd -
            您的电影评论聚合平台
          </p>
          <p className="text-gray-600 text-xs mt-2">
            基于 Next.js + Tailwind CSS + TMDB API 构建
          </p>
        </div>
      </div>
    </footer>
  );
}
