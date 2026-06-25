import Link from "next/link"
import type { Metadata } from "next"
import Breadcrumb from "@/components/Breadcrumb"

export const metadata: Metadata = {
  title: "账号管理 - 观影说帮助中心",
  description: "注册、登录、修改密码等账号相关操作指南",
}

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Gradient Header */}
      <section className="bg-gradient-to-b from-brand-card to-brand-dark py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Breadcrumb
              items={[
                { label: "帮助中心", href: "/help" },
                { label: "账号管理" },
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
              账号管理
            </h1>
            <p className="text-gray-400 text-lg">
              注册、登录、修改密码等账号相关操作指南
            </p>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Section 1: 登录 */}
          <div className="bg-brand-card rounded-lg p-8 mb-8 border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-brand-red/10 rounded-lg flex items-center justify-center text-brand-red text-sm font-bold">
                1
              </span>
              登录
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-red text-xs">1</span>
                </span>
                <span>
                  点击导航栏右上角的
                  <span className="text-brand-gold font-medium mx-1">登录</span>
                  按钮
                </span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-red text-xs">2</span>
                </span>
                <span>
                  输入注册时使用的邮箱地址和密码
                </span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-red text-xs">3</span>
                </span>
                <span>
                  点击登录按钮即可进入个人中心
                </span>
              </li>
            </ul>
          </div>

          {/* Section 2: 注册 */}
          <div className="bg-brand-card rounded-lg p-8 mb-8 border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-brand-red/10 rounded-lg flex items-center justify-center text-brand-red text-sm font-bold">
                2
              </span>
              注册
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-red text-xs">1</span>
                </span>
                <span>
                  在登录页面点击
                  <span className="text-brand-gold font-medium mx-1">注册账号</span>
                  切换到注册表单
                </span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-red text-xs">2</span>
                </span>
                <span>
                  填写昵称、邮箱地址和密码（密码需至少6位）
                </span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-red text-xs">3</span>
                </span>
                <span>
                  注册成功后系统会自动登录，无需再次输入密码
                </span>
              </li>
            </ul>
          </div>

          {/* Section 3: 修改昵称 */}
          <div className="bg-brand-card rounded-lg p-8 mb-8 border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-brand-red/10 rounded-lg flex items-center justify-center text-brand-red text-sm font-bold">
                3
              </span>
              修改昵称
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-red text-xs">1</span>
                </span>
                <span>
                  登录后进入
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
                  <span className="text-brand-gold font-medium mx-1">账号设置</span>
                </span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-red text-xs">3</span>
                </span>
                <span>
                  点击
                  <span className="text-brand-gold font-medium mx-1">修改昵称</span>
                  ，输入新的昵称后保存即可
                </span>
              </li>
            </ul>
          </div>

          {/* Section 4: 修改密码 */}
          <div className="bg-brand-card rounded-lg p-8 mb-8 border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-brand-red/10 rounded-lg flex items-center justify-center text-brand-red text-sm font-bold">
                4
              </span>
              修改密码
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-red text-xs">1</span>
                </span>
                <span>
                  进入个人中心后点击
                  <span className="text-brand-gold font-medium mx-1">账号设置</span>
                </span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-red text-xs">2</span>
                </span>
                <span>
                  点击
                  <span className="text-brand-gold font-medium mx-1">修改密码</span>
                </span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-red text-xs">3</span>
                </span>
                <span>
                  输入当前密码进行验证，再输入新密码确认修改
                </span>
              </li>
            </ul>
          </div>

          {/* Section 5: 退出登录 */}
          <div className="bg-brand-card rounded-lg p-8 mb-8 border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-brand-red/10 rounded-lg flex items-center justify-center text-brand-red text-sm font-bold">
                5
              </span>
              退出登录
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-red text-xs">1</span>
                </span>
                <span>
                  在个人中心的
                  <span className="text-brand-gold font-medium mx-1">账号设置</span>
                  页面
                </span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-red text-xs">2</span>
                </span>
                <span>
                  点击页面底部的
                  <span className="text-brand-gold font-medium mx-1">退出登录</span>
                  按钮
                </span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <span className="w-6 h-6 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-red text-xs">3</span>
                </span>
                <span>
                  确认后即可退出当前账号，返回未登录状态
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}