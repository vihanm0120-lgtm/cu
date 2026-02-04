import { Button } from "@/components/ui/button";
import { FolderPlus } from "lucide-react";
import Link from "next/link";

export function EmptyProjectsState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border bg-card py-20 px-6 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <FolderPlus className="h-8 w-8 text-primary" />
      </div>

      <h2 className="text-xl font-bold">
        Ready to start your first project?
      </h2>

      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        Keep your clients in the loop with simple, beautiful updates.
        Create a project to get started in seconds.
      </p>

      <Button asChild className="mt-6">
        <Link href="/projects/new">+ Create New Project</Link>
      </Button>

      <p className="mt-4 text-xs text-muted-foreground">
        Need help getting started?{" "}
        <span className="text-primary underline cursor-pointer">
          View our quick-start guide
        </span>
      </p>
    </div>
  );
}
