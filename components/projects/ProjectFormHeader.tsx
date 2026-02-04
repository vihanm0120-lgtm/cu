"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function ProjectFormHeader() {
  const router = useRouter();

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-black tracking-tight">
          Create Project
        </h1>
        <p className="text-muted-foreground">
          Set up a new workspace to share updates with your client.
        </p>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
    </div>
  );
}
