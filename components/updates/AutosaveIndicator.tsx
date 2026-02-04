import { Save, CheckCircle } from "lucide-react";

type Props = {
  saving: boolean;
};

export function AutosaveIndicator({ saving }: Props) {
  return (
    <div className="fixed bottom-6 right-6 hidden lg:flex items-center gap-3 bg-background border rounded-full p-3 shadow-lg">
      <div className="bg-primary/10 p-2 rounded-full">
        {saving ? (
          <Save className="h-5 w-5 text-primary animate-pulse" />
        ) : (
          <CheckCircle className="h-5 w-5 text-emerald-600" />
        )}
      </div>

      <div className="pr-2">
        <p className="text-xs font-bold">
          {saving ? "Autosaving…" : "All changes saved"}
        </p>
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
          {saving ? "Syncing updates..." : "Up to date"}
        </p>
      </div>
    </div>
  );
}
