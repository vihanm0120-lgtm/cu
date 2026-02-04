import { NextResponse } from "next/server";
import {connectDB} from "@/lib/db";
import PublicAccess from "@/lib/models/PublicAccess";
import Update from "@/lib/models/Update";
import Project from "@/lib/models/Project";


export async function GET(_: Request, { params }: { params: Promise<{ token: string }> }) {
  await connectDB();
  const { token } = await params;

  const access = await Project.findOne({
    publicToken: token,
  });

  if (!access) {
    return NextResponse.json(
      { error: "Invalid link" },
      { status: 404 }
    );
  }

  const updates = await Update.find({
    projectId: access._id,
    isDraft: false,
  })
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json({ updates });
}
