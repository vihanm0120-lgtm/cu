import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/requireAuth";
import Update from "@/lib/models/Update";
import { connectDB } from "@/lib/db";

type Params = { params: { id: string } };

export async function POST(_: Request, { params }: Params) {
  const user = await requireAuth();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const update = await Update.findOne({
    projectId: params.id,
    isDraft: true,
  });

  if (!update) {
    return NextResponse.json(
      { error: "No draft to publish" },
      { status: 400 }
    );
  }

  update.isDraft = false;
  update.publishedAt = new Date();
  await update.save();

  return NextResponse.json({ success: true });
}
