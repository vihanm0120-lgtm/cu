import { Info } from "lucide-react";

export function ProjectProTip() {
  return (
    <div className="flex gap-4 rounded-xl border border-primary/20 bg-primary/5 p-4">
      <Info className="h-5 w-5 text-primary mt-0.5" />
      <div>
        <p className="text-sm font-medium text-primary">
          Pro Tip
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Once created, you can invite your client via a secure magic
          link. No password required for them.
        </p>
      </div>
    </div>
  );
}
