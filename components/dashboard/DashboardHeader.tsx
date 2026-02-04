"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { NotificationPanel } from "./NotificationPanel";
import { ProfilePanel } from "./ProfilePanel";
import { NotificationSetupDialog } from "./NotificationSetupDialog";

export function DashboardHeader() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    axios
      .get("/api/notifications/status")
      .then((res) => setEnabled(res.data.enabled));
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <div className="font-bold text-lg">Projectly</div>

        <div className="flex items-center gap-3">
          {!enabled ? (
            <NotificationSetupDialog
              onEnabled={() => setEnabled(true)}
            />
          ) : (
            <NotificationPanel />
          )}
          <ProfilePanel />
        </div>
      </div>
    </header>
  );
}
