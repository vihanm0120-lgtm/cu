import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET!;

export function signToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "30d" });
}
export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as { userId: string };
}


export function setAuthCookie(
  res: NextResponse,
  token: string,
  remember = false
) {
  res.cookies.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: remember ? 60 * 60 * 24 * 30 : undefined, // 30 days
  });
}


export async function clearAuthCookie() {
  (await cookies()).set("auth_token", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });
}
