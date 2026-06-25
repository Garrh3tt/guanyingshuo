"use client"

import { useEffect } from "react"
import { useSession } from "next-auth/react"

interface RecordViewProps {
  movieId: number
  title: string
  posterPath: string | null
}

export default function RecordView({ movieId, title, posterPath }: RecordViewProps) {
  const { data: session } = useSession()

  useEffect(() => {
    if (!session?.user) return

    const recorded = sessionStorage.getItem(`viewed_${movieId}`)
    if (recorded) return

    fetch("/api/history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movieId, title, posterPath }),
    }).catch(() => {
      // 静默失败，不影响用户体验
    })

    sessionStorage.setItem(`viewed_${movieId}`, "1")
  }, [movieId, title, posterPath, session])

  return null
}