import { NextResponse } from "next/server";
import Project from "@/lib/models/Project";
import { connectDB } from "@/lib/db";
import { requireAuth } from "@/lib/requireAuth";
export async function GET(_: Request, { params }: { params: Promise<{ token: string }> }) {
  //const user = await requireAuth()
  await connectDB();
     const { token } = await params;

  const access = await Project.findOne({
    publicToken: token,
  });

  if (!access) {
    return NextResponse.json(
      { error: "Invalid or expired link" },
      { status: 404 }
    );
  }

  const project = access

  return NextResponse.json({
    project: {
      id: project._id,
      title: project.title,
      description: project.description,
      status: project.status,
      updatedAt: project.updatedAt,
      launchDate: project.createdAt ?? null,
      primaryContact: null,
    },
  });
}
