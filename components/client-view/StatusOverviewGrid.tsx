import { StatusCard } from "./StatusCard";
import {
  CheckCircle,
  PlayCircle,
  Calendar,
  AlertTriangle,
} from "lucide-react";

type Props = {
  completed?: string;
  inProgress?: string;
  comingNext?: string;
  hasBlockers?: string;
};

export function StatusOverviewGrid({
  completed,
  inProgress,
  comingNext,
  hasBlockers,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatusCard
        icon={<CheckCircle className="text-emerald-500" />}
        title="Completed"
        subtitle={completed ? completed : "No recent completions"}
      />

      <StatusCard
        icon={<PlayCircle className="text-primary" />}
        title="In Progress"
        subtitle={inProgress ? inProgress : "No active work"}
        highlight={Boolean(inProgress)}
      />

      <StatusCard
        icon={<Calendar className="text-muted-foreground" />}
        title="Coming Next"
        subtitle={comingNext ? comingNext : "Nothing planned"}
      />

      <StatusCard
        icon={<AlertTriangle className="text-amber-500" />}
        title="Action Required"
        subtitle={hasBlockers ? hasBlockers : "No action required"}
        
      />
    </div>
  );
}
