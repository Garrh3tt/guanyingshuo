import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "帮助中心 - 观影说",
  description: "观影说帮助中心，解答常见问题",
}

export default function HelpCenterPage() {
  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-brand-card to-brand-dark py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
            帮助中心
          </h1>
          <p className="text-gray-400 text-center max-w-2xl mx-auto">
            找到您需要的答案，快速解决问题
          </p>
        </div>
      </section>

      {/* Help Topics */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Topic 1 */}
            <Link href="/help/getting-started" className="group">
              <div className="bg-brand-card rounded-lg p-6 hover:bg-brand-card/80 transition-colors border border-gray-800 hover:border-brand-red">
                <div className="w-12 h-12 bg-brand-red/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-brand-gold transition-colors">
                  快速入门
                </h3>
                <p className="text-gray-400 text-sm">
                  了解如何使用观影说的基本功能，开始您的影评之旅
                </p>
              </div>
            </Link>

            {/* Topic 2 */}
            <Link href="/help/account" className="group">
              <div className="bg-brand-card rounded-lg p-6 hover:bg-brand-card/80 transition-colors border border-gray-800 hover:border-brand-red">
                <div className="w-12 h-12 bg-brand-red/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">👤</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-brand-gold transition-colors">
                  账号管理
                </h3>
                <p className="text-gray-400 text-sm">
                  注册、登录、修改密码等账号相关操作指南
                </p>
              </div>
            </Link>

            {/* Topic 3 */}
            <Link href="/help/reviews" className="group">
              <div className="bg-brand-card rounded-lg p-6 hover:bg-brand-card/80 transition-colors border border-gray-800 hover:border-brand-red">
                <div className="w-12 h-12 bg-brand-red/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">✍️</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-brand-gold transition-colors">
                  发表影评
                </h3>
                <p className="text-gray-400 text-sm">
                  如何撰写精彩的影评，分享您的观影感受
                </p>
              </div>
            </Link>

            {/* Topic 4 */}
            <Link href="/help/search" className="group">
              <div className="bg-brand-card rounded-lg p-6 hover:bg-brand-card/80 transition-colors border border-gray-800 hover:border-brand-red">
                <div className="w-12 h-12 bg-brand-red/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-brand-gold transition-colors">
                  搜索技巧
                </h3>
                <p className="text-gray-400 text-sm">
                  高效搜索电影的实用技巧和高级筛选方法
                </p>
              </div>
            </Link>

            {/* Topic 5 */}
            <Link href="/help/ratings" className="group">
              <div className="bg-brand-card rounded-lg p-6 hover:bg-brand-card/80 transition-colors border border-gray-800 hover:border-brand-red">
                <div className="w-12 h-12 bg-brand-red/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">⭐</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-brand-gold transition-colors">
                  评分系统
                </h3>
                <p className="text-gray-400 text-sm">
                  了解番茄评分系统和用户评分的计算方式
                </p>
              </div>
            </Link>

            {/* Topic 6 */}
            <Link href="/help/troubleshooting" className="group">
              <div className="bg-brand-card rounded-lg p-6 hover:bg-brand-card/80 transition-colors border border-gray-800 hover:border-brand-red">
                <div className="w-12 h-12 bg-brand-red/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">️</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-brand-gold transition-colors">
                  故障排除
                </h3>
                <p className="text-gray-400 text-sm">
                  常见问题的解决方案和错误排查指南
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 bg-brand-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            需要更多帮助？
          </h2>
          <p className="text-gray-400 mb-8">
            如果以上文档无法解决您的问题，欢迎联系我们
          </p>
          <Link
            href="/contact"
            className="inline-block bg-brand-red hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            联系我们
          </Link>
        </div>
      </section>
    </div>
  )
}
