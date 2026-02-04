/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { UpdateForm } from "@/components/updates/UpdateForm";

export function UpdateClient({ projectId }: { projectId: string }) {
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    axios
      .get(`/api/projects/${projectId}`)
      .then((res) => setProject(res.data.project))
      .catch(console.error);
  }, [projectId]);

  if (!project) {
    return (
      <div className="flex items-center justify-center py-20">
        Loading…
      </div>
    );
  }

  return <UpdateForm projectId={projectId} />;
}
