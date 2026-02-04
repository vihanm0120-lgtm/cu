/* eslint-disable @typescript-eslint/no-explicit-any */
import webpush from "web-push";

webpush.setVapidDetails(
  "mailto:vihanganethusara00@gmail.com",
  process.env.VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function sendPush(
  subscription: any,
  payload: { title: string; body: string; url?: string }
) {
  await webpush.sendNotification(
    subscription,
    JSON.stringify(payload)
  );
}
