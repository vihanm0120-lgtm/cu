import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/requireAuth";
import { connectDB } from "@/lib/db";
import Update from "@/lib/models/Update";
import Project from "@/lib/models/Project";
import NotificationSettings from "@/lib/models/NotificationSettings";
import { sendPush } from "@/lib/push";

export async function POST(
  _: Request,
  { params }: { params: { id: string } }
) {
  const user = await requireAuth();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const {id} = await params;

  //console.info(id)
  const project = await Project.findById(id);
  if (!project) {
    return NextResponse.json(
      { error: "Project not found" },
      { status: 404 }
    );
  }


//  console.info(project)

//  console.info(user)

  // 🔐 Ownership check (freelancer)
  if (project.userId.toString() !== user._id.toString()) {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }

  // 📝 Publish draft
  const update = await Update.findOne({
    projectId: project._id,
    isDraft: true,
  });

  if (!update) {
    return NextResponse.json(
      { error: "No draft found" },
      { status: 400 }
    );
  }

  update.isDraft = false;
  await update.save();

  // 🔔 CLIENT NOTIFICATION (PUBLIC TOKEN BASED)
  if (project.publicToken) {
    const clientSettings = await NotificationSettings.findOne({
      role: "client",
      publicToken: project.publicToken,
      enabled: true,
    });

    if (clientSettings?.pushSubscription) {
      await sendPush(clientSettings.pushSubscription, {
        title: `New project update"`,
        body: `${project.title} has a new update`,
        url: `/public/project/${project.publicToken}`,
      });
    }
  }

  return NextResponse.json({ success: true });
}
