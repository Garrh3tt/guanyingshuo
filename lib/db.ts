import fs from "fs"
import path from "path"

interface User {
  id: string
  name: string
  email: string
  password: string
  createdAt: string
}

const DB_PATH = path.join(process.cwd(), "data", "users.json")

function ensureDir() {
  const dir = path.dirname(DB_PATH)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

function readUsers(): User[] {
  try {
    ensureDir()
    if (!fs.existsSync(DB_PATH)) {
      fs.writeFileSync(DB_PATH, "[]", "utf-8")
      return []
    }
    const data = fs.readFileSync(DB_PATH, "utf-8")
    return JSON.parse(data)
  } catch {
    return []
  }
}

function writeUsers(users: User[]) {
  ensureDir()
  fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2), "utf-8")
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9)
}

export const db = {
  findUserByEmail(email: string): User | null {
    const users = readUsers()
    return users.find((u) => u.email === email) || null
  },

  findUserById(id: string): User | null {
    const users = readUsers()
    return users.find((u) => u.id === id) || null
  },

  createUser(name: string, email: string, hashedPassword: string): User {
    const users = readUsers()
    const newUser: User = {
      id: generateId(),
      name,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    }
    users.push(newUser)
    writeUsers(users)
    return newUser
  },
}
