import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/requireAuth";
import Update from "@/lib/models/Update";
import { connectDB } from "@/lib/db";


export async function POST(req: Request,{ params }: { params: Promise<{ id: string }> }) {
  const user = await requireAuth();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const body = await req.json();
   const { id } = await params;

  let update = await Update.findOne({
    projectId: id,
    isDraft: true,
  });

  if (!update) {
    update = await Update.create({
      projectId: id,
      completed: body.completed ?? "",
      inProgress: body.inProgress ?? "",
      comingNext: body.comingNext ?? "",
      blockers: body.blockers ?? "",
      isDraft: true,
      createdBy: user.id,
    });
  } else {
    update.completed = body.completed ?? update.completed;
    update.inProgress = body.inProgress ?? update.inProgress;
    update.comingNext = body.comingNext ?? update.comingNext;
    update.blockers = body.blockers ?? update.blockers;
    await update.save();
  }

  return NextResponse.json({ update });
}
