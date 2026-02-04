import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/lib/models/User";
import { connectDB } from "./db";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function requireAuth() {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
    };

    await connectDB();

    const user = await User.findById(decoded.userId).lean();
    if (!user) return null;

    return user;
  } catch {
    return null;
  }
}
