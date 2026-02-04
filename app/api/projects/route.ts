import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/requireAuth";
import Project from "@/lib/models/Project";
import { connectDB } from "@/lib/db";
import crypto from "crypto";

export async function GET() {
  const user = await requireAuth();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const projects = await Project.find({
    userId: user._id,
    isArchived: false,
  })
    .sort({ updatedAt: -1 })
    .lean();

  return NextResponse.json({ projects });
}


export async function POST(req: Request) {
  const user = await requireAuth();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, description, status } = await req.json();

  if (!name || name.length < 2) {
    return NextResponse.json(
      { error: "Project name is required" },
      { status: 400 }
    );
  }

  await connectDB();

  const project = await Project.create({
    userId: user._id,
    title: name,
    description,
    status,
    publicSlug: crypto.randomBytes(6).toString("hex"),
  });

  return NextResponse.json({ project });
}