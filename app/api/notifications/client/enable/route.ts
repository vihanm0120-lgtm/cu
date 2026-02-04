import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import NotificationSettings from "@/lib/models/NotificationSettings";

export async function POST(req: Request) {
  const { token, pushSubscription } = await req.json();

  if (!token || !pushSubscription) {
    return NextResponse.json(
      { error: "Missing data" },
      { status: 400 }
    );
  }

  await connectDB();

  await NotificationSettings.findOneAndUpdate(
    { publicToken: token, role: "client" },
    {
      publicToken: token,
      role: "client",
      enabled: true,
      pushSubscription,
    },
    { upsert: true }
  );

  return NextResponse.json({ success: true });
}
