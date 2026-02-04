// jobs/freelancerReminders.ts
import { getReminderWindow } from "@/lib/getReminderWindow";
import NotificationSettings from "@/lib/models/NotificationSettings";
import Project from "@/lib/models/Project";
import Update from "@/lib/models/Update";
import { sendPush } from "@/lib/push";

export async function runFreelancerReminders() {
  const users = await NotificationSettings.find({
    enabled: true,
    reminderFrequency: { $ne: null },
  });

  for (const settings of users) {
    const window = getReminderWindow(settings.reminderFrequency);
    const projects = await Project.find({ userId: settings.userId });

    const stale = [];

    for (const project of projects) {
      const lastUpdate = await Update.findOne({
        projectId: project._id,
        isDraft: false,
      }).sort({ createdAt: -1 });

      if (!lastUpdate || lastUpdate.createdAt < window) {
        stale.push(project);
      }
    }

    if (stale.length > 0) {
      await sendPush(settings.pushSubscription, {
        title: "Project updates pending",
        body: `${stale.length} projects need an update`,
        url: "/dashboard",
      });
    }
  }
}
