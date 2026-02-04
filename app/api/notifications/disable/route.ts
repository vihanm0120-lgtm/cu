import { connectDB } from "@/lib/db";
import NotificationSettings from "@/lib/models/NotificationSettings";
import { requireAuth } from "@/lib/requireAuth";
import { NextResponse } from "next/server";

// POST /api/notifications/disable
export async function POST() {
  const user = await requireAuth();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  await NotificationSettings.findOneAndUpdate(
    { userId: user.id },
    { enabled: false }
  );

  return NextResponse.json({ success: true });
}
