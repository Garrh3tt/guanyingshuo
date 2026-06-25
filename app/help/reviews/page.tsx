import Link from "next/link"
import type { Metadata } from "next"
import Breadcrumb from "@/components/Breadcrumb"

export const metadata: Metadata = {
  title: "发表影评 - 观影说帮助中心",
  description: "如何撰写精彩的影评，分享您的观影感受",
}

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Gradient Header */}
      <section className="bg-gradient-to-b from-brand-card to-brand-dark py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Breadcrumb
              items={[
                { label: "帮助中心", href: "/help" },
                { label: "发表影评" },
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
              发表影评
            </h1>
            <p className="text-gray-400 text-lg">
              如何撰写精彩的影评，分享您的观影感受
            </p>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Section 1: 发表评论 */}
          <div className="bg-brand-card rounded-lg p-8 mb-8 border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-brand-red/10 rounded-lg flex items-center justify-center text-brand-red text-sm font-bold">
                1
              </span>
              发表评论
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
                  在
                  <span className="text-brand-gold font-medium mx-1">发表我的评论</span>
                  区域选择评分（1-10分），点击星星即可评分
                </span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-red text-xs">3</span>
                </span>
                <span>
                  在文本框中写下您的评论内容，点击提交即可发布
                </span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-red text-xs">4</span>
                </span>
                <span>
                  注意：已发表的评论暂不支持修改，请确认内容后发布
                </span>
              </li>
            </ul>
          </div>

          {/* Section 2: 查看评论 */}
          <div className="bg-brand-card rounded-lg p-8 mb-8 border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-brand-red/10 rounded-lg flex items-center justify-center text-brand-red text-sm font-bold">
                2
              </span>
              查看评论
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-red text-xs">1</span>
                </span>
                <span>
                  在电影详情页的下方，可以查看该电影的所有用户评论
                </span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-red text-xs">2</span>
                </span>
                <span>
                  每一条评论都显示评分、评论内容和发表时间
                </span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-red text-xs">3</span>
                </span>
                <span>
                  评论按发表时间倒序排列，最新评论显示在最上方
                </span>
              </li>
            </ul>
          </div>

          {/* Section 3: 管理评论 */}
          <div className="bg-brand-card rounded-lg p-8 mb-8 border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-brand-red/10 rounded-lg flex items-center justify-center text-brand-red text-sm font-bold">
                3
              </span>
              管理评论
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
                  <span className="text-brand-gold font-medium mx-1">我的评论</span>
                  ，查看所有发表过的评论
                </span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-red text-xs">3</span>
                </span>
                <span>
                  可在此页面删除已发表的评论（删除后不可恢复）
                </span>
              </li>
            </ul>
          </div>

          {/* Section 4: 评分规则 */}
          <div className="bg-brand-card rounded-lg p-8 mb-8 border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-brand-red/10 rounded-lg flex items-center justify-center text-brand-red text-sm font-bold">
                4
              </span>
              评分规则
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-red text-xs">1</span>
                </span>
                <span>
                  评分采用
                  <span className="text-brand-gold font-medium mx-1">1-10分制</span>
                  ，10分为最高分
                </span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-red text-xs">2</span>
                </span>
                <span>
                  系统会计算所有用户的平均分，展示在电影详情页
                </span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-red text-xs">3</span>
                </span>
                <span>
                  每个用户对同一部电影只能评分一次，请慎重选择
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}