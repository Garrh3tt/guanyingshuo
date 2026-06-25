import Link from "next/link"
import type { Metadata } from "next"
import Breadcrumb from "@/components/Breadcrumb"

export const metadata: Metadata = {
  title: "收藏与观影 - 观影说帮助中心",
  description: "收藏喜欢的电影，记录您的观影足迹",
}

export default function FavoritesPage() {
  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Gradient Header */}
      <section className="bg-gradient-to-b from-brand-card to-brand-dark py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Breadcrumb
              items={[
                { label: "帮助中心", href: "/help" },
                { label: "收藏与观影" },
              ]}
            />
            <Link
              href="/help"
              className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-4"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              返回帮助中心
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              收藏与观影
            </h1>
            <p className="text-gray-400 text-lg">
              收藏喜欢的电影，记录您的观影足迹
            </p>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Section 1: 收藏电影 */}
          <div className="bg-brand-card rounded-lg p-8 mb-8 border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-brand-red/10 rounded-lg flex items-center justify-center text-brand-red text-sm font-bold">
                1
              </span>
              收藏电影
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-red text-xs">1</span>
                </span>
                <span>
                  进入任意电影的
                  <span className="text-brand-gold font-medium mx-1">详情页</span>
                </span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-red text-xs">2</span>
                </span>
                <span>
                  点击
                  <span className="text-brand-gold font-medium mx-1">想看</span>
                  按钮，即可将该电影加入您的收藏列表
                </span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-red text-xs">3</span>
                </span>
                <span>
                  再次点击
                  <span className="text-brand-gold font-medium mx-1">想看</span>
                  按钮可取消收藏
                </span>
              </li>
            </ul>
          </div>

          {/* Section 2: 管理收藏 */}
          <div className="bg-brand-card rounded-lg p-8 mb-8 border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-brand-red/10 rounded-lg flex items-center justify-center text-brand-red text-sm font-bold">
                2
              </span>
              管理收藏
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-red text-xs">1</span>
                </span>
                <span>
                  进入
                  <Link href="/profile" className="text-brand-gold hover:underline mx-1">
                    个人中心
                  </Link>
                </span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-red text-xs">2</span>
                </span>
                <span>
                  点击
                  <span className="text-brand-gold font-medium mx-1">我的收藏</span>
                  ，浏览所有收藏的电影
                </span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-red text-xs">3</span>
                </span>
                <span>
                  点击收藏列表中的电影可快速跳转到详情页
                </span>
              </li>
            </ul>
          </div>

          {/* Section 3: 观影记录 */}
          <div className="bg-brand-card rounded-lg p-8 mb-8 border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-brand-red/10 rounded-lg flex items-center justify-center text-brand-red text-sm font-bold">
                3
              </span>
              观影记录
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-red text-xs">1</span>
                </span>
                <span>
                  系统会自动记录您浏览过的电影详情页
                </span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-red text-xs">2</span>
                </span>
                <span>
                  观影记录按浏览时间倒序排列，方便回顾
                </span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-red text-xs">3</span>
                </span>
                <span>
                  记录仅对您本人可见，保护您的隐私
                </span>
              </li>
            </ul>
          </div>

          {/* Section 4: 历史回顾 */}
          <div className="bg-brand-card rounded-lg p-8 mb-8 border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-brand-red/10 rounded-lg flex items-center justify-center text-brand-red text-sm font-bold">
                4
              </span>
              历史回顾
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-red text-xs">1</span>
                </span>
                <span>
                  进入
                  <Link href="/profile" className="text-brand-gold hover:underline mx-1">
                    个人中心
                  </Link>
                </span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-red text-xs">2</span>
                </span>
                <span>
                  点击
                  <span className="text-brand-gold font-medium mx-1">我的观影</span>
                  ，查看最近浏览过的电影记录
                </span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-red text-xs">3</span>
                </span>
                <span>
                  点击记录中的电影可快速回到详情页继续浏览
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}