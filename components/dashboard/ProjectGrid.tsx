"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { ProjectCard } from "./ProjectCard";
import { Info } from "lucide-react";
import { EmptyProjectsState } from "./EmptyProjectsState";

type Project = {
  _id: string;
  title: string;
  description?: string;
  status: "on_track" | "slight_delay" | "blocked";
  updatedAt: string;
};

export function ProjectGrid() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/projects")
      .then((res) => setProjects(res.data.projects))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading projects…</p>;
  }

  if (projects.length === 0) {
    return <EmptyProjectsState />;
  }

  return (
    <div className="space-y-6">
      {/* Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project._id}
            id={project._id}
            title={project.title}
            description={project.description || ""}
            status={project.status}
            updated={new Date(project.updatedAt).toLocaleDateString()}
          />
        ))}
      </div>

      {/* Info Banner */}
      <div className="flex items-start gap-3 rounded-lg border bg-muted/40 p-4 text-sm">
        <Info className="h-5 w-5 text-primary mt-0.5" />
        <p className="text-muted-foreground">
          <span className="font-medium text-foreground">
            Sharing is easy.
          </span>{" "}
          Clients don’t need an account. Just copy the shareable link and send it
          via email, Slack, or WhatsApp.
        </p>
      </div>
    </div>
  );
}
