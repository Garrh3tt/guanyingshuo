"use client"

import { useState, useEffect, useCallback } from "react"
import { useSession } from "next-auth/react"

interface Review {
  id: string
  userName: string
  rating: number
  content: string
  createdAt: string
}

interface ReviewSectionProps {
  movieId: number
}

export default function ReviewSection({ movieId }: ReviewSectionProps) {
  const { data: session } = useSession()
  const [reviews, setReviews] = useState<Review[]>([])
  const [rating, setRating] = useState({ average: 0, count: 0 })
  const [userRating, setUserRating] = useState(8)
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch(`/api/reviews?movieId=${movieId}`)
      const data = await res.json()
      setReviews(data.reviews || [])
      setRating(data.rating || { average: 0, count: 0 })
    } catch {
      console.error("获取评论失败")
    }
  }, [movieId])

  useEffect(() => {
    fetchReviews()
  }, [fetchReviews])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setLoading(true)
    try {
      const res = await fetch("/api/reviews/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          movieId,
          userName: session?.user?.name || "匿名用户",
          rating: userRating,
          content: content.trim(),
        }),
      })

      if (res.ok) {
        setContent("")
        setShowForm(false)
        fetchReviews()
      }
    } catch {
      console.error("发表评论失败")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <span>💬</span> 观众评论
        {rating.count > 0 && (
          <span className="text-brand-gold text-lg ml-2">
            ★ {rating.average} ({rating.count}条评论)
          </span>
        )}
      </h2>

      {/* 发表评论按钮/表单 */}
      {session ? (
        showForm ? (
          <form onSubmit={handleSubmit} className="bg-brand-card rounded-lg p-6 mb-6">
            <div className="flex items-center gap-4 mb-4">
              <label className="text-gray-300 text-sm">我的评分：</label>
              <div className="flex gap-1">
                {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setUserRating(n)}
                    className={`w-8 h-8 rounded text-sm font-bold transition-colors ${
                      n <= userRating
                        ? "bg-brand-gold text-black"
                        : "bg-brand-dark text-gray-500 hover:text-white"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="写下你对这部电影的看法..."
              className="w-full bg-brand-dark border border-gray-700 rounded-lg p-4 text-white placeholder-gray-500 focus:border-brand-red focus:outline-none resize-none h-32 mb-4"
            />
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="bg-brand-red hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {loading ? "发表中..." : "发表评论"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-white px-4 py-2 transition-colors"
              >
                取消
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setShowForm(true)}
            className="bg-brand-red hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors mb-6"
          >
            ✍️ 发表我的评论
          </button>
        )
      ) : (
        <p className="text-gray-400 mb-6 bg-brand-card rounded-lg p-4">
          <a href="/auth/login" className="text-brand-red hover:underline">登录</a>
          {" "}后即可发表评论
        </p>
      )}

      {/* 评论列表 */}
      {reviews.length === 0 ? (
        <p className="text-gray-500 text-center py-8">暂无评论，快来抢沙发吧！</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-brand-card rounded-lg p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-brand-red to-brand-gold rounded-full flex items-center justify-center text-sm font-bold text-white">
                    {review.userName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-white font-medium">{review.userName}</p>
                    <p className="text-gray-500 text-xs">
                      {new Date(review.createdAt).toLocaleDateString("zh-CN")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-brand-gold/10 px-3 py-1 rounded-full">
                  <span className="text-brand-gold font-bold">★ {review.rating}</span>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">{review.content}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
