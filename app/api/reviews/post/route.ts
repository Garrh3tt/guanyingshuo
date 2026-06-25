import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { reviewDB } from "@/lib/reviews";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { movieId, userName, rating, content } = await req.json();

    if (!movieId || !userName || !rating || !content) {
      return NextResponse.json(
        { error: "请填写所有字段" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 10) {
      return NextResponse.json(
        { error: "评分范围为 1-10" },
        { status: 400 }
      );
    }

    const userId = session?.user?.id || "anonymous";
    const review = await reviewDB.addReview(Number(movieId), userId, userName, Number(rating), content);

    return NextResponse.json({ review }, { status: 201 });
  } catch (error) {
    console.error("评论错误:", error);
    return NextResponse.json(
      { error: "发表评论失败" },
      { status: 500 }
    );
  }
}