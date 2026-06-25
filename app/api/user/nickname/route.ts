import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { readData, writeData } from "@/lib/storage";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

const USERS_KEY = "users.json";

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "未登录" }, { status: 401 });
  }

  const body = await request.json();
  const { nickname } = body;

  if (!nickname || nickname.trim().length === 0) {
    return NextResponse.json({ error: "昵称不能为空" }, { status: 400 });
  }

  if (nickname.trim().length > 20) {
    return NextResponse.json({ error: "昵称不能超过20个字符" }, { status: 400 });
  }

  const users = (await readData<User[]>(USERS_KEY)) || [];
  const index = users.findIndex((u) => u.email === session.user!.email);

  if (index === -1) {
    return NextResponse.json({ error: "用户不存在" }, { status: 404 });
  }

  users[index].name = nickname.trim();
  await writeData(USERS_KEY, users);

  return NextResponse.json({
    message: "昵称修改成功",
    name: nickname.trim(),
  });
}