// app/api/cron/freelancer-reminders/route.ts
import { NextResponse } from "next/server";
import { runFreelancerReminders } from "@/jobs/freelancerReminders";

export async function GET() {
  // 🔐 optional: protect with secret header
  await runFreelancerReminders();
  return NextResponse.json({ success: true });
}
