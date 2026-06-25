import Link from "next/link"
import type { Metadata } from "next"
import Breadcrumb from "@/components/Breadcrumb"

export const metadata: Metadata = {
  title: "快速入门 - 观影说帮助中心",
  description: "了解观影说的基本功能，开始您的影评之旅",
}

export default function GettingStartedPage() {
  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Gradient Header */}
      <section className="bg-gradient-to-b from-brand-card to-brand-dark py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Breadcrumb
              items={[
                { label: "帮助中心", href: "/help" },
                { label: "快速入门" },
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
              快速入门
            </h1>
            <p className="text-gray-400 text-lg">
              了解观影说的基本功能，开始您的影评之旅
            </p>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Section 1: 注册与登录 */}
          <div className="bg-brand-card rounded-lg p-8 mb-8 border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-brand-red/10 rounded-lg flex items-center justify-center text-brand-red text-sm font-bold">
                1
              </span>
              注册与登录
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-red text-xs">1</span>
                </span>
                <span>
                  点击右上角
                  <span className="text-brand-gold font-medium mx-1">登录</span>
                  按钮，选择
                  <span className="text-brand-gold font-medium mx-1">注册账号</span>
                </span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-red text-xs">2</span>
                </span>
                <span>
                  填写昵称、邮箱地址和密码，点击注册
                </span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-red text-xs">3</span>
                </span>
                <span>
                  注册成功后系统会自动登录，即可开始使用观影说
                </span>
              </li>
            </ul>
          </div>

          {/* Section 2: 浏览电影 */}
          <div className="bg-brand-card rounded-lg p-8 mb-8 border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-brand-red/10 rounded-lg flex items-center justify-center text-brand-red text-sm font-bold">
                2
              </span>
              浏览电影
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-red text-xs">1</span>
                </span>
                <span>
                  在
                  <Link href="/" className="text-brand-gold hover:underline mx-1">
                    首页
                  </Link>
                  查看热门推荐电影，发现精彩内容
                </span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-red text-xs">2</span>
                </span>
                <span>
                  前往
                  <Link href="/movie" className="text-brand-gold hover:underline mx-1">
                    电影库
                  </Link>
                  页面，可按类型、年份、评分等条件筛选电影
                </span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-red text-xs">3</span>
                </span>
                <span>
                  支持按最受欢迎、评分最高、最新上映和票房最高排序
                </span>
              </li>
            </ul>
          </div>

          {/* Section 3: 搜索电影 */}
          <div className="bg-brand-card rounded-lg p-8 mb-8 border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-brand-red/10 rounded-lg flex items-center justify-center text-brand-red text-sm font-bold">
                3
              </span>
              搜索电影
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-red text-xs">1</span>
                </span>
                <span>
                  在顶部导航栏的搜索框中输入电影名称
                </span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-red text-xs">2</span>
                </span>
                <span>
                  支持中英文搜索，输入部分名称即可展示匹配结果
                </span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-red text-xs">3</span>
                </span>
                <span>
                  点击搜索结果中的电影海报，即可查看详情
                </span>
              </li>
            </ul>
          </div>

          {/* Section 4: 查看详情 */}
          <div className="bg-brand-card rounded-lg p-8 mb-8 border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-brand-red/10 rounded-lg flex items-center justify-center text-brand-red text-sm font-bold">
                4
              </span>
              查看详情
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-red text-xs">1</span>
                </span>
                <span>
                  点击任意电影海报或标题，即可进入详情页
                </span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-red text-xs">2</span>
                </span>
                <span>
                  详情页包含剧情简介、演员阵容、评分和用户评论
                </span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-red text-xs">3</span>
                </span>
                <span>
                  在详情页可以发表评论和收藏电影
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}