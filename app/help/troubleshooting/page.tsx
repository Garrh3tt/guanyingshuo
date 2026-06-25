import Link from "next/link"
import type { Metadata } from "next"
import Breadcrumb from "@/components/Breadcrumb"

export const metadata: Metadata = {
  title: "故障排除 - 观影说帮助中心",
  description: "常见问题的解决方案和错误排查指南",
}

export default function TroubleshootingPage() {
  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Gradient Header */}
      <section className="bg-gradient-to-b from-brand-card to-brand-dark py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Breadcrumb
              items={[
                { label: "帮助中心", href: "/help" },
                { label: "故障排除" },
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
              故障排除
            </h1>
            <p className="text-gray-400 text-lg">
              常见问题的解决方案和错误排查指南
            </p>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Section 1: 登录失败 */}
          <div className="bg-brand-card rounded-lg p-8 mb-8 border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-brand-red/10 rounded-lg flex items-center justify-center text-brand-red text-sm font-bold">
                1
              </span>
              登录失败
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <span>
                  请检查邮箱地址和密码是否输入正确，注意区分大小写
                </span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <span>
                  如果忘记密码，可以尝试使用其他邮箱重新注册
                </span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <span>
                  仍无法解决？尝试清除浏览器缓存后重试
                </span>
              </li>
            </ul>
          </div>

          {/* Section 2: 图片加载问题 */}
          <div className="bg-brand-card rounded-lg p-8 mb-8 border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-brand-red/10 rounded-lg flex items-center justify-center text-brand-red text-sm font-bold">
                2
              </span>
              图片加载问题
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <span>
                  电影海报和图片来自
                  <span className="text-brand-gold font-medium mx-1">TMDB</span>
                  （The Movie Database）
                </span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <span>
                  图片加载速度受网络环境影响，部分地区可能加载较慢
                </span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <span>
                  建议保持良好的网络连接，必要时可刷新页面重试
                </span>
              </li>
            </ul>
          </div>

          {/* Section 3: 数据不显示 */}
          <div className="bg-brand-card rounded-lg p-8 mb-8 border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-brand-red/10 rounded-lg flex items-center justify-center text-brand-red text-sm font-bold">
                3
              </span>
              数据不显示
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <span>
                  尝试
                  <span className="text-brand-gold font-medium mx-1">刷新页面</span>
                  ，大多数临时问题可以通过刷新解决
                </span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <span>
                  等待几秒后重试，数据加载可能需要短暂的处理时间
                </span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <span>
                  如持续异常，请通过
                  <Link href="/contact" className="text-brand-gold hover:underline mx-1">
                    联系我们
                  </Link>
                  页面提交反馈
                </span>
              </li>
            </ul>
          </div>

          {/* Section 4: 其他问题 */}
          <div className="bg-brand-card rounded-lg p-8 mb-8 border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-brand-red/10 rounded-lg flex items-center justify-center text-brand-red text-sm font-bold">
                4
              </span>
              其他问题
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <span>
                  如遇到页面加载异常，建议先检查网络连接是否正常
                </span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <span>
                  功能使用方面的疑问，请查阅帮助中心其他分类文档
                </span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-brand-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <span>
                  其他无法解决的问题，欢迎通过
                  <Link href="/contact" className="text-brand-gold hover:underline mx-1">
                    联系我们
                  </Link>
                  页面提交反馈，我们将尽快回复
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}