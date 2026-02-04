"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { useSearchParams } from "next/navigation";

type Props = {
  projectTitle?: string;
  token: string;
};

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const raw = window.atob(base64);
  return Uint8Array.from([...raw].map((c) => c.charCodeAt(0)));
}

export function ClientHeader({ projectTitle, token }: Props) {
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const userType = searchParams.get("user");

  // 🚫 Freelancer preview → hide notifications
  const isFreelancerView = userType === "freelancer";

  // 🔄 Check status (ONLY for real clients)
  useEffect(() => {
    if (isFreelancerView) return;

    axios
      .get(`/api/notifications/client/status/${token}`)
      .then((res) => setEnabled(res.data.enabled))
      .catch(console.error);
  }, [token, isFreelancerView]);

  // 🧠 Register service worker once (ONLY for clients)
  useEffect(() => {
    if (isFreelancerView) return;

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .catch(console.error);
    }
  }, [isFreelancerView]);

  const enableNotifications = async () => {
    try {
      setLoading(true);

      if (!("Notification" in window)) {
        alert("Notifications not supported");
        return;
      }

      const permission = await Notification.requestPermission();
      if (permission !== "granted") return;

      const registration = await navigator.serviceWorker.ready;

      const subscription =
        await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(
            process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
          ),
        });

      await axios.post("/api/notifications/client/enable", {
        token,
        pushSubscription: subscription,
      });

      setEnabled(true);
    } catch (err) {
      console.error("Enable notification failed", err);
      alert("Failed to enable notifications");
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2 font-bold">
          <div className="h-6 w-6 bg-primary rounded-sm" />
          {projectTitle || "Projectly"}
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden md:block text-xs uppercase tracking-wider text-muted-foreground">
            Public Project View
          </span>

          {/* 🔕 Hide notifications for freelancer preview */}
          {!isFreelancerView && (
            !enabled ? (
              <Button
                size="sm"
                onClick={enableNotifications}
                disabled={loading}
              >
                {loading ? "Enabling..." : "Enable notifications"}
              </Button>
            ) : (
              <Bell className="h-5 w-5 text-primary" />
            )
          )}
        </div>
      </div>
    </header>
  );
}
