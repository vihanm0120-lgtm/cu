/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";

export function ClientProjectHeader({ project }: any) {
  const statusMap: any = {
    on_track: "ON TRACK",
    slight_delay: "SLIGHT DELAY",
    blocked: "BLOCKED",
  };

  return (
    <div className="rounded-xl border bg-card p-8 shadow-sm flex flex-wrap justify-between gap-4">
      <div className="space-y-2">
        <p className="text-xs font-bold text-primary uppercase tracking-wider">
          Client Update
        </p>
        <h1 className="text-4xl font-black">
          {project.title}
        </h1>
        <p className="text-muted-foreground">
          Last updated:{" "}
          {new Date(project.updatedAt).toLocaleString()}
        </p>
      </div>

      <Badge className="h-fit bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full">
        ● {statusMap[project.status]}
      </Badge>
    </div>
  );
}
