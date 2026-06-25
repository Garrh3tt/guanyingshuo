import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { reviewDB } from "@/lib/reviews";
import { watchlistDB } from "@/lib/watchlist";
import { historyDB } from "@/lib/history";
import { db } from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "未登录" }, { status: 401 });
  }

  const user = await db.findUserByEmail(session.user.email);
  if (!user) {
    return NextResponse.json({ error: "用户不存在" }, { status: 404 });
  }

  const [reviews, watchlist, history] = await Promise.all([
    reviewDB.getUserReviews(user.id),
    watchlistDB.getUserWatchlist(user.id),
    historyDB.getUserHistory(user.id),
  ]);

  return NextResponse.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    },
    stats: {
      reviewsCount: reviews.length,
      watchlistCount: watchlist.length,
      historyCount: history.length,
    },
    reviews,
    watchlist,
    history,
  });
}