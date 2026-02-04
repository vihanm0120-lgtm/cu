/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { ClientHeader } from "@/components/client-view/ClientHeader";
import { ClientProjectHeader } from "@/components/client-view/ClientProjectHeader";
import { StatusOverviewGrid } from "@/components/client-view/StatusOverviewGrid";
import { NeedsFromYou } from "@/components/client-view/NeedsFromYou";
import { UpdatesTimeline } from "@/components/client-view/UpdatesTimeline";
import { ProjectSidebar } from "@/components/client-view/ProjectSidebar";
import { HelpCard } from "@/components/client-view/HelpCard";
import { useParams } from "next/navigation";

type Project = {
  _id: string;
  name: string;
  status: string;
  launchDate?: string;
  primaryContact?: string;
  updatedAt: string;
};

type Update = {
  _id: string;
  completed?: string;
  inProgress?: string;
  comingNext?: string;
  blockers?: string;
  createdAt: string;
};

export default function ClientProjectPage() {
  const [project, setProject] = useState<Project | null>(null);
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    async function load() {
      try {
        const [projectRes, updatesRes] = await Promise.all([
          axios.get(`/api/public/project/${slug}`),
          axios.get(`/api/public/project/${slug}/updates`),
        ]);

        setProject(projectRes.data.project);
        setUpdates(updatesRes.data.updates || []);
      } catch (err) {
        console.error("Failed to load public project", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading project…
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Project not found or link expired.
      </div>
    );
  }

  const latestUpdate = updates[0];
  console.log(latestUpdate);
  return (
    <div className="min-h-screen bg-background">
      <ClientHeader token={slug} />

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <ClientProjectHeader project={project} />

        {/* Status cards */}
        <StatusOverviewGrid
          completed={latestUpdate?.completed}
          inProgress={latestUpdate?.inProgress}
          comingNext={latestUpdate?.comingNext}
          hasBlockers={latestUpdate?.blockers}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-8">
            <NeedsFromYou blockers={latestUpdate?.blockers} />
            <UpdatesTimeline updates={updates} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ProjectSidebar
              launchDate={project.launchDate}
              contactName={project.primaryContact}
            />
            <HelpCard />
          </div>
        </div>
      </main>
    </div>
  );
}
