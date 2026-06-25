import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "请填写所有字段" },
        { status: 400 }
      )
    }

    // 检查用户是否已存在
    const existingUser = await db.findUserByEmail(email)

    if (existingUser) {
      return NextResponse.json(
        { error: "该邮箱已被注册" },
        { status: 400 }
      )
    }

    // 密码加密
    const hashedPassword = await bcrypt.hash(password, 12)

    // 创建用户
    const user = await db.createUser(name, email, hashedPassword)

    return NextResponse.json(
      { message: "注册成功", userId: user.id },
      { status: 201 }
    )
  } catch (error) {
    console.error("注册错误:", error)
    const errorMessage = error instanceof Error ? error.message : "注册失败，请稍后重试"
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
