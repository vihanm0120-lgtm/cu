import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export function PageHeader() {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Your Projects
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage and share live updates with your clients.
        </p>
      </div>

      <Button className="h-9">
        <Plus className="mr-2 h-4 w-4" />
          <Link href="/projects/new">New Project</Link>
      </Button>
    </div>
  );
}
