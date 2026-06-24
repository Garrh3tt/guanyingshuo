import { readData, writeData } from "@/lib/storage";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

const USERS_KEY = "users.json";

async function readUsers(): Promise<User[]> {
  return (await readData<User[]>(USERS_KEY)) || [];
}

async function writeUsers(users: User[]) {
  await writeData(USERS_KEY, users);
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
}

export const db = {
  async findUserByEmail(email: string): Promise<User | null> {
    const users = await readUsers();
    return users.find((u) => u.email === email) || null;
  },

  async findUserById(id: string): Promise<User | null> {
    const users = await readUsers();
    return users.find((u) => u.id === id) || null;
  },

  async createUser(
    name: string,
    email: string,
    hashedPassword: string
  ): Promise<User> {
    const users = await readUsers();
    const newUser: User = {
      id: generateId(),
      name,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    await writeUsers(users);
    return newUser;
  },
};
