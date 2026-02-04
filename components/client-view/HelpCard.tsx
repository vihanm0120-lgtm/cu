import { Info } from "lucide-react";

export function HelpCard() {
  return (
    <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
      <h3 className="font-bold text-primary flex items-center gap-2">
        <Info className="h-4 w-4" />
        Help & Support
      </h3>

      <p className="text-sm text-muted-foreground mt-2">
        If you have questions about these updates, please
        reply to the latest email notification or contact
        the project owner directly.
      </p>
    </div>
  );
}
