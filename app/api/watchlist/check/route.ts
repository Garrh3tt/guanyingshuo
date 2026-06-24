import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { watchlistDB } from "@/lib/watchlist";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ inWatchlist: false });
  }

  const user = await db.findUserByEmail(session.user.email);
  if (!user) {
    return NextResponse.json({ inWatchlist: false });
  }

  const { searchParams } = new URL(request.url);
  const movieId = searchParams.get("movieId");
  if (!movieId) {
    return NextResponse.json({ inWatchlist: false });
  }

  const inWatchlist = await watchlistDB.isInWatchlist(user.id, Number(movieId));
  return NextResponse.json({ inWatchlist });
}
