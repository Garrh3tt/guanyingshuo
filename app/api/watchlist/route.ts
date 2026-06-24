import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { watchlistDB } from "@/lib/watchlist";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "未登录" }, { status: 401 });
  }

  const { db } = await import("@/lib/db");
  const user = db.findUserByEmail(session.user.email);
  if (!user) {
    return NextResponse.json({ error: "用户不存在" }, { status: 404 });
  }

  const watchlist = watchlistDB.getUserWatchlist(user.id);
  return NextResponse.json({ watchlist });
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "未登录" }, { status: 401 });
  }

  const { db } = await import("@/lib/db");
  const user = db.findUserByEmail(session.user.email);
  if (!user) {
    return NextResponse.json({ error: "用户不存在" }, { status: 404 });
  }

  const body = await request.json();
  const { movieId, title, posterPath } = body;

  if (!movieId || !title) {
    return NextResponse.json({ error: "参数缺失" }, { status: 400 });
  }

  const item = watchlistDB.addToWatchlist(user.id, movieId, title, posterPath);
  return NextResponse.json({ item, message: "已添加到想看" });
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "未登录" }, { status: 401 });
  }

  const { db } = await import("@/lib/db");
  const user = db.findUserByEmail(session.user.email);
  if (!user) {
    return NextResponse.json({ error: "用户不存在" }, { status: 404 });
  }

  const { searchParams } = new URL(request.url);
  const movieId = searchParams.get("movieId");

  if (!movieId) {
    return NextResponse.json({ error: "参数缺失" }, { status: 400 });
  }

  const removed = watchlistDB.removeFromWatchlist(user.id, Number(movieId));
  return NextResponse.json({ removed, message: removed ? "已移除" : "未找到" });
}
