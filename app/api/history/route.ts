import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { historyDB } from "@/lib/history";
import { db } from "@/lib/db";

// 获取当前用户的观影历史
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "未登录" }, { status: 401 });
  }

  const user = await db.findUserByEmail(session.user.email);
  if (!user) {
    return NextResponse.json({ error: "用户不存在" }, { status: 404 });
  }

  const history = await historyDB.getUserHistory(user.id);
  return NextResponse.json({ history });
}

// 记录观影
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "未登录" }, { status: 401 });
  }

  const user = await db.findUserByEmail(session.user.email);
  if (!user) {
    return NextResponse.json({ error: "用户不存在" }, { status: 404 });
  }

  const body = await request.json();
  const { movieId, title, posterPath } = body;

  if (!movieId || !title) {
    return NextResponse.json({ error: "参数缺失" }, { status: 400 });
  }

  await historyDB.recordView(user.id, movieId, title, posterPath || null);
  return NextResponse.json({ message: "记录成功" });
}