// GET /api/notifications/status
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/requireAuth";
import NotificationSettings from "@/lib/models/NotificationSettings";
import { connectDB } from "@/lib/db";

export async function GET() {
  const user = await requireAuth();
  if (!user) {
    return NextResponse.json({ enabled: false });
  }

  await connectDB();

  const settings = await NotificationSettings.findOne({
    userId: user.id,
  });

  return NextResponse.json({
    enabled: Boolean(settings?.enabled),
    reminderFrequency: settings?.reminderFrequency || null,
  });
}
