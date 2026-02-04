/* eslint-disable @typescript-eslint/no-require-imports */
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Project from "@/lib/models/Project";
import Update from "@/lib/models/Update";

// ✅ Standalone PDFKit (NO Helvetica error)
const PDFDocument = require("pdfkit/js/pdfkit.standalone");

export async function GET(
  _: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  await connectDB();
  const { token } = await params;

  const project = await Project.findOne({ publicToken: token }).lean();
  if (!project) {
    return new NextResponse("Invalid or expired link", { status: 404 });
  }

  const updates = await Update.find({
    projectId: project._id,
    isDraft: false,
  })
    .sort({ createdAt: -1 })
    .lean();

  const doc = new PDFDocument({ margin: 50 });
  const chunks: Buffer[] = [];

  doc.on("data", (chunk: Buffer) => chunks.push(chunk));
  doc.on("end", () => {});

  // Header
  doc.fontSize(20).text(project.title);
  doc.moveDown(0.5);
  doc.fontSize(10).fillColor("gray").text("Public Project Report");
  doc.moveDown(1);

  updates.forEach((u, i) => {
    doc
      .fillColor("black")
      .fontSize(12)
      .text(`Update ${updates.length - i}`, { underline: true });

    if (u.completed) {
      doc.moveDown(0.3).fontSize(10).text(`✔ Completed:\n${u.completed}`);
    }
    if (u.inProgress) {
      doc.moveDown(0.3).fontSize(10).text(`⏳ In Progress:\n${u.inProgress}`);
    }
    if (u.comingNext) {
      doc.moveDown(0.3).fontSize(10).text(`➡ Coming Next:\n${u.comingNext}`);
    }
    if (u.blockers) {
      doc.moveDown(0.3).fontSize(10).text(`⚠ Blockers:\n${u.blockers}`);
    }

    doc.moveDown(1);
  });

  doc.end();

  const pdfBuffer = Buffer.concat(chunks);

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${project.title}.pdf"`,
    },
  });
}
