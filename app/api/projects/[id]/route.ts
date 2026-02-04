import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/lib/models/Project";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await params;

  const project = await Project.findById(id);

  if (!project) {
    return NextResponse.json(
      { error: "Project not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    project: {
      id: project._id.toString(),
      name: project.title,
      description: project.description,
      status: project.status,
    },
  });
}
