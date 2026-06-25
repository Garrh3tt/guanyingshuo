import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { readData, writeData } from "@/lib/storage";
import bcrypt from "bcryptjs";

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
  const { oldPassword, newPassword } = body;

  if (!oldPassword || !newPassword) {
    return NextResponse.json({ error: "请填写所有字段" }, { status: 400 });
  }

  if (newPassword.length < 6) {
    return NextResponse.json({ error: "新密码至少6个字符" }, { status: 400 });
  }

  const users = (await readData<User[]>(USERS_KEY)) || [];
  const index = users.findIndex((u) => u.email === session.user!.email);

  if (index === -1) {
    return NextResponse.json({ error: "用户不存在" }, { status: 404 });
  }

  // 验证旧密码
  const isValid = await bcrypt.compare(oldPassword, users[index].password);
  if (!isValid) {
    return NextResponse.json({ error: "旧密码不正确" }, { status: 400 });
  }

  // 加密新密码
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  users[index].password = hashedPassword;
  await writeData(USERS_KEY, users);

  return NextResponse.json({ message: "密码修改成功" });
}