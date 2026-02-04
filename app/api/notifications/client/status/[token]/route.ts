import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import NotificationSettings from "@/lib/models/NotificationSettings";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  await connectDB();
   const { token } = await params;

  const settings = await NotificationSettings.findOne({
    publicToken: token,
    role: "client",
    enabled: true,
  });

  return NextResponse.json({
    enabled: Boolean(settings),
  });
}
