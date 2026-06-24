"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useEffect } from "react"

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center">
        <div className="text-white text-lg">加载中...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-brand-dark py-10">
      <div className="max-w-4xl mx-auto px-4">
        {/* 用户信息卡片 */}
        <div className="bg-brand-card rounded-xl p-8 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-brand-red to-brand-gold rounded-full flex items-center justify-center text-3xl font-bold text-white">
              {session.user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{session.user?.name}</h1>
              <p className="text-gray-400">{session.user?.email}</p>
              <p className="text-gray-500 text-sm mt-1">
                注册时间：{new Date().toLocaleDateString("zh-CN")}
              </p>
            </div>
          </div>
        </div>

        {/* 功能菜单 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-brand-card rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span>🎬</span> 我的观影
            </h2>
            <p className="text-gray-400 mb-4">查看您的观影记录和评分历史</p>
            <div className="text-center py-8 text-gray-500">
              <p className="text-4xl mb-2">📝</p>
              <p>暂无观影记录</p>
              <Link href="/movie" className="text-brand-red hover:text-red-400 mt-2 inline-block">
                去发现电影 →
              </Link>
            </div>
          </div>

          <div className="bg-brand-card rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span>⭐</span> 我的收藏
            </h2>
            <p className="text-gray-400 mb-4">管理您收藏的电影列表</p>
            <div className="text-center py-8 text-gray-500">
              <p className="text-4xl mb-2">❤️</p>
              <p>暂无收藏</p>
              <Link href="/ranking" className="text-brand-red hover:text-red-400 mt-2 inline-block">
                浏览排行榜 →
              </Link>
            </div>
          </div>

          <div className="bg-brand-card rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span>💬</span> 我的评论
            </h2>
            <p className="text-gray-400 mb-4">查看您发表的电影评论</p>
            <div className="text-center py-8 text-gray-500">
              <p className="text-4xl mb-2">💭</p>
              <p>暂无评论</p>
            </div>
          </div>

          <div className="bg-brand-card rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span>⚙️</span> 账号设置
            </h2>
            <p className="text-gray-400 mb-4">管理您的账号信息和偏好设置</p>
            <div className="space-y-3 pt-2">
              <button className="w-full text-left px-4 py-2 bg-brand-dark rounded-lg text-gray-300 hover:text-white transition-colors">
                修改昵称
              </button>
              <button className="w-full text-left px-4 py-2 bg-brand-dark rounded-lg text-gray-300 hover:text-white transition-colors">
                修改密码
              </button>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full text-left px-4 py-2 bg-red-900/20 rounded-lg text-red-400 hover:text-red-300 transition-colors"
              >
                退出登录
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
