import { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于我们 - 观影说",
  description: "了解观影说 - 你的电影评论聚合平台。",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-white mb-8">关于观影说</h1>

      <div className="space-y-8">
        {/* 项目简介 */}
        <section className="bg-brand-card rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span>🎬</span> 项目简介
          </h2>
          <p className="text-gray-300 leading-relaxed">
            观影说是一个电影评分与评论聚合平台，灵感来源于国际知名的烂番茄(Rotten
            Tomatoes)网站。我们致力于为中文用户提供专业、全面的电影评分、影评和电影资讯服务。
          </p>
          <p className="text-gray-300 leading-relaxed mt-3">
            在这里，您可以查看最新的电影排行榜、浏览海量电影库、了解电影详情和演员信息，以及阅读来自全球观众的真实评论。
          </p>
        </section>

        {/* 主要功能 */}
        <section className="bg-brand-card rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span>✨</span> 主要功能
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🍅</span>
              <div>
                <h3 className="text-white font-medium">番茄评分</h3>
                <p className="text-gray-400 text-sm">
                  借鉴烂番茄的经典评分体系，直观展示电影口碑
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">📊</span>
              <div>
                <h3 className="text-white font-medium">排行榜单</h3>
                <p className="text-gray-400 text-sm">
                  热门榜、评分榜、正在热映，一目了然
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🔍</span>
              <div>
                <h3 className="text-white font-medium">搜索发现</h3>
                <p className="text-gray-400 text-sm">
                  强大的搜索功能，快速找到您感兴趣的电影
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">💬</span>
              <div>
                <h3 className="text-white font-medium">影评聚合</h3>
                <p className="text-gray-400 text-sm">
                  汇集全球观众评论，多角度了解电影口碑
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 技术栈 */}
        <section className="bg-brand-card rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span>🛠️</span> 技术栈
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-brand-darker rounded-lg">
              <p className="text-brand-red font-bold text-lg">Next.js</p>
              <p className="text-gray-500 text-xs mt-1">React 框架</p>
            </div>
            <div className="text-center p-4 bg-brand-darker rounded-lg">
              <p className="text-blue-400 font-bold text-lg">TypeScript</p>
              <p className="text-gray-500 text-xs mt-1">类型安全</p>
            </div>
            <div className="text-center p-4 bg-brand-darker rounded-lg">
              <p className="text-cyan-400 font-bold text-lg">Tailwind CSS</p>
              <p className="text-gray-500 text-xs mt-1">样式框架</p>
            </div>
            <div className="text-center p-4 bg-brand-darker rounded-lg">
              <p className="text-green-400 font-bold text-lg">Vercel</p>
              <p className="text-gray-500 text-xs mt-1">部署平台</p>
            </div>
          </div>
        </section>

        {/* 数据来源 */}
        <section className="bg-brand-card rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span>📡</span> 数据来源
          </h2>
          <p className="text-gray-300 leading-relaxed">
            本站所有电影数据（包括电影信息、海报图片、演员资料、评论等）均来自{" "}
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-red hover:underline"
            >
              TMDB (The Movie Database)
            </a>
            。TMDB
            是一个全球知名的影视数据库，提供丰富且准确的电影信息。
          </p>
          <div className="mt-4 p-4 bg-brand-darker rounded-lg">
            <p className="text-gray-400 text-sm">
              This product uses the TMDB API but is not endorsed or certified by
              TMDB.
            </p>
            <p className="text-gray-500 text-xs mt-1">
              本站使用 TMDB API 获取电影数据，但未获得 TMDB 的背书或认证。
            </p>
          </div>
        </section>

        {/* 免责声明 */}
        <section className="bg-brand-card rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span>⚠️</span> 免责声明
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            本网站为课程实验项目，仅供学习和演示用途。所有电影数据、海报图片等版权均归其原始所有者所有。如有任何版权问题，请联系我们进行处理。
          </p>
        </section>
      </div>
    </div>
  );
}
