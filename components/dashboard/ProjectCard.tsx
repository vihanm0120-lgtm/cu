"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link2, Pencil, Plus, Eye } from "lucide-react";

const statusMap = {
  on_track: {
    label: "On Track",
    className: "bg-emerald-100 text-emerald-700",
  },
  slight_delay: {
    label: "Slight Delay",
    className: "bg-amber-100 text-amber-700",
  },
  blocked: {
    label: "Blocked",
    className: "bg-red-100 text-red-700",
  },
  archived: {
    label: "Archived",
    className: "bg-slate-200 text-slate-700",
  },
};

type Status = keyof typeof statusMap;

type Props = {
  id: string;
  title: string;
  description: string;
  status: Status;
  updated: string;
};

export function ProjectCard({
  id,
  title,
  description,
  status,
  updated,
}: Props) {
  const router = useRouter();
  const [copying, setCopying] = useState(false);
  const [opening, setOpening] = useState(false);

  const s = statusMap[status];

  const copyShareLink = async () => {
    try {
      setCopying(true);
      const res = await axios.post(
        `/api/projects/${id}/share`
      );
      await navigator.clipboard.writeText(res.data.url);
      alert("Share link copied to clipboard");
    } catch {
      alert("Failed to copy link");
    } finally {
      setCopying(false);
    }
  };

  const viewPublicProject = async () => {
    try {
      setOpening(true);
      const res = await axios.post(
        `/api/projects/${id}/share`
      );
      window.open(res.data.url+'?user=freelancer', "_blank");
    } catch {
      alert("Failed to open public view");
    } finally {
      setOpening(false);
    }
  };

  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between">
      {/* Top */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Badge className={s.className}>
            {s.label}
          </Badge>
          <span className="text-xs text-muted-foreground">
            Updated {updated}
          </span>
        </div>

        <div>
          <h3 className="font-semibold text-lg leading-tight">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-3">
            {description}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 grid grid-cols-4 gap-2">
        <Button
          variant="secondary"
          onClick={() => router.push(`/projects/${id}`)}
        >
          <Pencil className="h-4 w-4 mr-2" />
          Edit
        </Button>

        <Button
          variant="secondary"
          onClick={() =>
            router.push(`/projects/${id}/update`)
          }
        >
          <Plus className="h-4 w-4 mr-2" />
          Update
        </Button>

        <Button
          variant="outline"
          onClick={viewPublicProject}
          disabled={opening}
        >
          <Eye className="h-4 w-4 mr-2" />
          View
        </Button>

        <Button
          variant="outline"
          onClick={copyShareLink}
          disabled={copying}
        >
          <Link2 className="h-4 w-4 mr-2" />
          Copy
        </Button>
      </div>
    </div>
  );
}
