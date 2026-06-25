"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  const errorMessages: Record<string, string> = {
    CredentialsSignin: "邮箱或密码错误",
    Default: "登录失败，请重试",
    AccessDenied: "访问被拒绝",
    Configuration: "配置错误",
  }

  const errorMessage = error
    ? errorMessages[error] || "登录出现错误"
    : "登录出现错误"

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="bg-brand-card rounded-lg p-8 shadow-xl">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-white mb-2">登录失败</h1>
          <p className="text-gray-400 mb-6">{errorMessage}</p>
          <div className="space-y-3">
            <Link
              href="/auth/login"
              className="block w-full bg-brand-red hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              重新登录
            </Link>
            <Link
              href="/"
              className="block w-full bg-brand-card border border-gray-700 hover:bg-brand-card/80 text-gray-300 font-semibold py-3 rounded-lg transition-colors"
            >
              返回首页
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
