/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { UpdateBreadcrumbs } from "@/components/updates/UpdateBreadcrumbs";
import { UpdatePageHeader } from "@/components/updates/UpdatePageHeader";
import { UpdateClient } from "./update-client";

export default function CreateUpdatePage() {
  const params = useParams();
  const id = params?.id as string;

  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return; 

    const getProject = async () => {
      try {
        const res = await axios.get(`/api/projects/${id}`);
        setProject(res.data.project);
      } catch (err) {
        console.error("Failed to load project", err);
      } finally {
        setLoading(false);
      }
    };

    getProject();
  }, [id]); // ✅ id dependency is REQUIRED

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading…
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Project not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="flex justify-center py-8">
        <div className="w-full max-w-3xl px-6 space-y-6">
          <UpdateBreadcrumbs
            projectId={id}
            projectName={project.name}
          />

          <UpdatePageHeader />

          {/* Client-only logic */}
          <UpdateClient projectId={id} />
        </div>
      </main>
    </div>
  );
}
