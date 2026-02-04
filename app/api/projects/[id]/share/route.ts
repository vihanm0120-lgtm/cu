import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/lib/models/Project";
import crypto from "crypto";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }>  }
) {
  await connectDB();
  const { id } = await params;

  const project = await Project.findById(id

  );

  if (!project) {
    return NextResponse.json(
      { error: "Project not found" },
      { status: 404 }
    );
  }

  // Generate token once
  if (!project.publicToken) {
    project.publicToken = crypto.randomBytes(24).toString("hex");
    await project.save();

  }

  return NextResponse.json({
    token: project.publicToken,
    url: `${process.env.NEXT_PUBLIC_APP_URL}/public/projects/${project.publicToken}`,
  });
}
