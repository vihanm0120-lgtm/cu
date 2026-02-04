"use client";

import { CloudCheck, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function UpdatePageHeader() {
  const router = useRouter();

  return (
    <div className="flex flex-wrap justify-between items-end gap-4">
      <div>
        <h1 className="text-4xl font-black tracking-tight">
          Create New Update
        </h1>
        <p className="text-muted-foreground mt-1">
          Send a structured progress report to your client.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground italic">
          <CloudCheck className="h-4 w-4" />
          Autosaving…
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
    </div>
  );
}
