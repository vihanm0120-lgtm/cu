/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ProjectFormHeader } from "@/components/projects/ProjectFormHeader";
import { ProjectForm } from "@/components/projects/ProjectForm";

export default function EditProjectPage() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    async function load() {
      const res = await axios.get(`/api/projects/${id}`);
      console.log(res.data)
      setProject(res.data.project);
    }

    load();
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="flex justify-center py-10 px-4">
        <div className="w-full max-w-xl space-y-8">
          <ProjectFormHeader />
          <ProjectForm
            projectId={id}
            defaultValues={project}
            submitLabel="Save Changes"
          />
        </div>
      </main>
    </div>
  );
}
