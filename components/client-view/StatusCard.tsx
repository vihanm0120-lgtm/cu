import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Props = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  highlight?: boolean;
  warning?: boolean;
};

export function StatusCard({
  icon,
  title,
  subtitle,
  highlight,
  warning,
}: Props) {
  return (
    <Card
      className={cn(
        "p-6 space-y-3",
        highlight && "ring-1 ring-primary/30",
        warning && "border-amber-200 bg-amber-50/30"
      )}
    >
      <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-muted">
        {icon}
      </div>
      <div>
        <h3 className="font-bold">{title}</h3>
        <p className="text-sm text-muted-foreground">
          {subtitle}
        </p>
      </div>
    </Card>
  );
}
