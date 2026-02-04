export type ReminderFrequency =
  | "daily"
  | "every_3_days"
  | "weekly"
  | "biweekly"
  | "monthly";

export function getReminderWindow(
  frequency: ReminderFrequency
): Date {
  const now = new Date();

  switch (frequency) {
    case "daily":
      now.setDate(now.getDate() - 1);
      break;

    case "every_3_days":
      now.setDate(now.getDate() - 3);
      break;

    case "weekly":
      now.setDate(now.getDate() - 7);
      break;

    case "biweekly":
      now.setDate(now.getDate() - 14);
      break;

    case "monthly":
      now.setMonth(now.getMonth() - 1);
      break;

    default:
      // fallback = weekly
      now.setDate(now.getDate() - 7);
  }

  return now;
}
