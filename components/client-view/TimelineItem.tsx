import { cn } from "@/lib/utils";
import { CheckCircle, Clock, FastForward, AlertTriangle } from "lucide-react";

type Props = {
  date: string;
  completed?: string;
  inProgress?: string;
  comingNext?: string;
  blockers?: string;
  active?: boolean;
};

export function TimelineItem({
  date,
  completed,
  inProgress,
  comingNext,
  blockers,
  active,
}: Props) {
  return (
    <div className="relative space-y-3">
      {/* Timeline dot */}
      <div
        className={cn(
          "absolute -left-[38px] h-8 w-8 rounded-full border bg-background flex items-center justify-center",
          active && "border-primary"
        )}
      />

      {/* Date */}
      <span className="text-xs uppercase font-semibold text-muted-foreground">
        {date}
      </span>

      {/* Sections */}
      <div className="space-y-3">
        {completed && (
          <div className="flex gap-2">
            <CheckCircle className="h-4 w-4 text-emerald-500 mt-1" />
            <div>
              <p className="font-semibold">Completed</p>
              <p className="text-muted-foreground text-sm">
                {completed}
              </p>
            </div>
          </div>
        )}

        {inProgress && (
          <div className="flex gap-2">
            <Clock className="h-4 w-4 text-blue-500 mt-1" />
            <div>
              <p className="font-semibold">In Progress</p>
              <p className="text-muted-foreground text-sm">
                {inProgress}
              </p>
            </div>
          </div>
        )}

        {comingNext && (
          <div className="flex gap-2">
            <FastForward className="h-4 w-4 text-purple-500 mt-1" />
            <div>
              <p className="font-semibold">Coming Next</p>
              <p className="text-muted-foreground text-sm">
                {comingNext}
              </p>
            </div>
          </div>
        )}

        {blockers && (
          <div className="flex gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500 mt-1" />
            <div>
              <p className="font-semibold text-amber-700">
                Needs Your Input
              </p>
              <p className="text-muted-foreground text-sm">
                {blockers}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
