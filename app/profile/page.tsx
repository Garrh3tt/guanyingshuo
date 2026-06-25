"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useEffect, useState } from "react"
import Breadcrumb from "@/components/Breadcrumb"
import SafeImage from "@/components/SafeImage"

interface UserProfile {
  user: { id: string; name: string; email: string; createdAt: string }
  stats: { reviewsCount: number; watchlistCount: number; historyCount: number }
  reviews: { id: string; movieId: number; userName: string; rating: number; content: string; createdAt: string }[]
  watchlist: { id: string; movieId: number; title: string; posterPath: string | null; createdAt: string }[]
  history: { id: string; movieId: number; title: string; posterPath: string | null; viewedAt: string }[]
}

export default function ProfilePage() {
  const { data: session, status, update } = useSession()
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<string | null>(null)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // 修改昵称弹窗
  const [showNicknameModal, setShowNicknameModal] = useState(false)
  const [nickname, setNickname] = useState("")
  const [nicknameLoading, setNicknameLoading] = useState(false)

  // 修改密码弹窗
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordLoading, setPasswordLoading] = useState(false)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login")
    }
  }, [status, router])

  useEffect(() => {
    if (status !== "authenticated") return
    setLoading(true)
    fetch("/api/user/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.error("Profile fetch error:", data.error)
        } else {
          setProfile(data)
        }
      })
      .catch((err) => console.error("Profile fetch error:", err))
      .finally(() => setLoading(false))
  }, [status])

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
  }

  const formatDateTime = (dateStr: string) => {
    const d = new Date(dateStr)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`
  }

  // 修改昵称
  const handleChangeNickname = async () => {
    if (!nickname.trim()) {
      setError("昵称不能为空")
      return
    }
    if (nickname.trim().length > 20) {
      setError("昵称不能超过20个字符")
      return
    }
    setNicknameLoading(true)
    setError("")
    setSuccess("")
    try {
      const res = await fetch("/api/user/nickname", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname: nickname.trim() }),
      })
      const data = await res.json()
      if (res.ok) {
        setSuccess("昵称修改成功")
        setShowNicknameModal(false)
        update({ name: nickname.trim() })
        setProfile((prev) => prev ? { ...prev, user: { ...prev.user, name: nickname.trim() } } : prev)
      } else {
        setError(data.error || "修改失败")
      }
    } catch {
      setError("网络错误")
    } finally {
      setNicknameLoading(false)
    }
  }

  // 修改密码
  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("请填写所有字段")
      return
    }
    if (newPassword.length < 6) {
      setError("新密码至少6个字符")
      return
    }
    if (newPassword !== confirmPassword) {
      setError("两次输入的密码不一致")
      return
    }
    setPasswordLoading(true)
    setError("")
    setSuccess("")
    try {
      const res = await fetch("/api/user/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldPassword, newPassword }),
      })
      const data = await res.json()
      if (res.ok) {
        setSuccess("密码修改成功，请重新登录")
        setShowPasswordModal(false)
        setOldPassword("")
        setNewPassword("")
        setConfirmPassword("")
      } else {
        setError(data.error || "修改失败")
      }
    } catch {
      setError("网络错误")
    } finally {
      setPasswordLoading(false)
    }
  }

  if (status === "loading" || (status === "authenticated" && loading && !profile)) {
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
      <div className="max-w-5xl mx-auto px-4">
        <Breadcrumb items={[{ label: "个人中心" }]} />

        {/* 提示消息 */}
        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-800 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-900/30 border border-green-800 rounded-lg text-green-400 text-sm">
            {success}
          </div>
        )}

        {/* 用户信息卡片 */}
        <div className="bg-brand-card rounded-xl p-8 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-brand-red to-brand-gold rounded-full flex items-center justify-center text-3xl font-bold text-white">
              {session.user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{profile?.user.name || session.user?.name}</h1>
              <p className="text-gray-400">{session.user?.email}</p>
              <p className="text-gray-500 text-sm mt-1">
                注册时间：{profile?.user.createdAt ? formatDate(profile.user.createdAt) : new Date().toLocaleDateString("zh-CN")}
              </p>
              {profile && (
                <div className="flex gap-4 mt-2 text-sm text-gray-400">
                  <span>🎬 观影 {profile.stats.historyCount} 部</span>
                  <span>⭐ 收藏 {profile.stats.watchlistCount} 部</span>
                  <span>💬 评论 {profile.stats.reviewsCount} 条</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 标签切换 */}
        {profile && (
          <div className="flex gap-1 mb-6 overflow-x-auto">
            {[
              { key: "history", label: "🎬 我的观影" },
              { key: "watchlist", label: "⭐ 我的收藏" },
              { key: "reviews", label: "💬 我的评论" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key)
                  setError("")
                  setSuccess("")
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.key
                    ? "bg-brand-red text-white"
                    : "bg-brand-card text-gray-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* 内容区域 */}
        <div className="bg-brand-card rounded-xl p-6 mb-8 min-h-[300px]">
          {!profile ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-4xl mb-2">📊</p>
              <p>暂无数据</p>
              <Link href="/movie" className="text-brand-red hover:text-red-400 mt-2 inline-block">
                去发现电影 →
              </Link>
            </div>
          ) : !activeTab ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-4xl mb-2">👆</p>
              <p>请选择上方的标签查看数据</p>
            </div>
          ) : activeTab === "history" ? (
            <div>
              <h3 className="text-lg font-bold text-white mb-4">🎬 我的观影记录</h3>
              {profile.history.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-4xl mb-2">📝</p>
                  <p>暂无观影记录</p>
                  <Link href="/movie" className="text-brand-red hover:text-red-400 mt-2 inline-block">
                    去发现电影 →
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {profile.history.map((item) => (
                    <Link
                      key={item.id}
                      href={`/movie/${item.movieId}`}
                      className="group"
                    >
                      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-brand-dark">
                        {item.posterPath ? (
                          <SafeImage
                            src={`https://image.tmdb.org/t/p/w342${item.posterPath}`}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                            {item.title.charAt(0)}
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="absolute bottom-0 p-2">
                            <p className="text-white text-xs truncate">{item.title}</p>
                            <p className="text-gray-400 text-xs">{formatDate(item.viewedAt)}</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-400 text-xs mt-1 truncate">{item.title}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : activeTab === "watchlist" ? (
            <div>
              <h3 className="text-lg font-bold text-white mb-4">⭐ 我的收藏</h3>
              {profile.watchlist.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-4xl mb-2">❤️</p>
                  <p>暂无收藏</p>
                  <Link href="/movie" className="text-brand-red hover:text-red-400 mt-2 inline-block">
                    去发现电影 →
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {profile.watchlist.map((item) => (
                    <Link
                      key={item.id}
                      href={`/movie/${item.movieId}`}
                      className="group"
                    >
                      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-brand-dark">
                        {item.posterPath ? (
                          <SafeImage
                            src={`https://image.tmdb.org/t/p/w342${item.posterPath}`}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                            {item.title.charAt(0)}
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="absolute bottom-0 p-2">
                            <p className="text-white text-xs truncate">{item.title}</p>
                            <p className="text-gray-400 text-xs">{formatDate(item.createdAt)}</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-400 text-xs mt-1 truncate">{item.title}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : activeTab === "reviews" ? (
            <div>
              <h3 className="text-lg font-bold text-white mb-4">💬 我的评论</h3>
              {profile.reviews.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-4xl mb-2">💭</p>
                  <p>暂无评论</p>
                  <Link href="/movie" className="text-brand-red hover:text-red-400 mt-2 inline-block">
                    去发表评论 →
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {profile.reviews.map((review) => (
                    <div key={review.id} className="bg-brand-dark rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Link
                          href={`/movie/${review.movieId}`}
                          className="text-brand-red hover:text-red-400 font-medium text-sm"
                        >
                          电影 #{review.movieId}
                        </Link>
                        <span className="text-gray-500 text-xs">{formatDateTime(review.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-brand-gold text-sm font-bold">{review.rating}/10</span>
                        <div className="flex">
                          {Array.from({ length: 10 }, (_, i) => (
                            <span
                              key={i}
                              className={`text-sm ${i < review.rating ? "text-brand-gold" : "text-gray-700"}`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">{review.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : null}
        </div>

        {/* 功能菜单 - 账号设置 */}
        <div className="bg-brand-card rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span>⚙️</span> 账号设置
          </h2>
          <div className="space-y-3">
            <button
              onClick={() => {
                setShowNicknameModal(true)
                setNickname(profile?.user.name || session.user?.name || "")
                setError("")
                setSuccess("")
              }}
              className="w-full text-left px-4 py-3 bg-brand-dark rounded-lg text-gray-300 hover:text-white transition-colors"
            >
              修改昵称
            </button>
            <button
              onClick={() => {
                setShowPasswordModal(true)
                setOldPassword("")
                setNewPassword("")
                setConfirmPassword("")
                setError("")
                setSuccess("")
              }}
              className="w-full text-left px-4 py-3 bg-brand-dark rounded-lg text-gray-300 hover:text-white transition-colors"
            >
              修改密码
            </button>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full text-left px-4 py-3 bg-red-900/20 rounded-lg text-red-400 hover:text-red-300 transition-colors"
            >
              退出登录
            </button>
          </div>
        </div>
      </div>

      {/* 修改昵称弹窗 */}
      {showNicknameModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setShowNicknameModal(false)}>
          <div className="bg-brand-card rounded-xl p-6 w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-white mb-4">修改昵称</h3>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="请输入新昵称"
              className="w-full px-4 py-3 bg-brand-dark text-white rounded-lg border border-gray-700 focus:border-brand-red focus:outline-none mb-4"
              maxLength={20}
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowNicknameModal(false)}
                className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleChangeNickname}
                disabled={nicknameLoading}
                className="flex-1 px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {nicknameLoading ? "修改中..." : "确认修改"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 修改密码弹窗 */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setShowPasswordModal(false)}>
          <div className="bg-brand-card rounded-xl p-6 w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-white mb-4">修改密码</h3>
            <div className="space-y-3 mb-4">
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="当前密码"
                className="w-full px-4 py-3 bg-brand-dark text-white rounded-lg border border-gray-700 focus:border-brand-red focus:outline-none"
              />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="新密码（至少6个字符）"
                className="w-full px-4 py-3 bg-brand-dark text-white rounded-lg border border-gray-700 focus:border-brand-red focus:outline-none"
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="确认新密码"
                className="w-full px-4 py-3 bg-brand-dark text-white rounded-lg border border-gray-700 focus:border-brand-red focus:outline-none"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleChangePassword}
                disabled={passwordLoading}
                className="flex-1 px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {passwordLoading ? "修改中..." : "确认修改"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}