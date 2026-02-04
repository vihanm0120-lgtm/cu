import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/requireAuth";
import User from "@/lib/models/User";
import { connectDB } from "@/lib/db";

export async function PATCH(req: Request) {
  const user = await requireAuth();
  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { name } = await req.json();
  if (!name || name.length < 2) {
    return NextResponse.json(
      { error: "Invalid name" },
      { status: 400 }
    );
  }

  await connectDB();

  const updated = await User.findByIdAndUpdate(
    user._id,
    { name },
    { new: true }
  );

  return NextResponse.json({
    user: {
      id: updated._id,
      name: updated.name,
      email: updated.email,
    },
  });
}
