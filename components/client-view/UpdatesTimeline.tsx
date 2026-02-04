/* eslint-disable @typescript-eslint/no-explicit-any */
import { TimelineItem } from "./TimelineItem";

export function UpdatesTimeline({ updates }: { updates: any[] }) {
  if (!updates.length) {
    return (
      <section>
        <h2 className="text-xl font-bold mb-4">Project Updates</h2>
        <p className="text-muted-foreground">
          No updates have been shared yet.
        </p>
      </section>
    );
  }

  return (
    <section>
      <h2 className="text-xl font-bold mb-6">Project Updates</h2>

      <div className="space-y-10 border-l pl-8">
        {updates.map((u, index) => (
          <TimelineItem
            key={u._id}
            date={new Date(u.createdAt).toLocaleString(undefined, {
              dateStyle: "medium",
              timeStyle: "short",
            })}
            completed={u.completed}
            inProgress={u.inProgress}
            comingNext={u.comingNext}
            blockers={u.blockers}
            active={index === 0} // latest update highlighted
          />
        ))}
      </div>
    </section>
  );
}
