"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Props = {
  projectId: string;
  projectName: string;
};

export function UpdateBreadcrumbs({
  projectId,
  projectName,
}: Props) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Link
        href="/dashboard"
        className="text-muted-foreground hover:text-primary"
      >
        Projects
      </Link>

      <ChevronRight className="h-4 w-4 text-muted-foreground" />

      <Link
        href={`/projects/${projectId}`}
        className="text-muted-foreground hover:text-primary"
      >
        {projectName}
      </Link>

      <ChevronRight className="h-4 w-4 text-muted-foreground" />

      <span className="font-medium text-foreground">
        New Update
      </span>
    </div>
  );
}
