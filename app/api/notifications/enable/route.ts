// POST /api/notifications/enable
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/requireAuth";
import NotificationSettings from "@/lib/models/NotificationSettings";
import { connectDB } from "@/lib/db";

export async function POST(req: Request) {
  const user = await requireAuth();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { reminderFrequency, pushSubscription } = await req.json();

  await connectDB();

  await NotificationSettings.findOneAndUpdate(
    { userId: user.id },
    {
      enabled: true,
      reminderFrequency: reminderFrequency ?? null,
      pushSubscription,
    },
    { upsert: true }
  );

  return NextResponse.json({ success: true });
}
