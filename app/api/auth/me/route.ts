import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/requireAuth";

export async function GET() {
  const user = await requireAuth();

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
}
