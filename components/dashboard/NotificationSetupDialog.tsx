"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type Props = {
  onEnabled: () => void;
};

export function NotificationSetupDialog({ onEnabled }: Props) {
  const [open, setOpen] = useState(false);
  const [frequency, setFrequency] = useState<string>("weekly");
  const [enabling, setEnabling] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(true);

  const enableNotifications = async () => {
    try {
      setEnabling(true);

      // 👉 Push subscription placeholder
      // You already planned this, we’ll wire it later
      const pushSubscription = null;

      await axios.post("/api/notifications/enable", {
        reminderFrequency: frequency,
        pushSubscription,
      });

      setOpen(false);
      onEnabled();
    } finally {
      setEnabling(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-[#cbb45a] hover:bg-[#ae9638]">
          Enable notifications
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>Enable reminders</DialogTitle>
          <DialogDescription>
            Get notified when your projects need updates.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Frequency */}
          <div className="space-y-2">
            <Label>Reminder frequency</Label>
            <Select value={frequency} onValueChange={setFrequency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="every_3_days">Every 3 days</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="biweekly">Bi-weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              We’ll remind you only if no update was posted in this period.
            </p>
          </div>

          {/* Push toggle */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Push notifications</Label>
              <p className="text-xs text-muted-foreground">
                Recommended for timely reminders
              </p>
            </div>
            <Switch checked={pushEnabled} onCheckedChange={setPushEnabled} />
          </div>

          <Button
            className="w-full"
            onClick={enableNotifications}
            disabled={enabling}
          >
            {enabling ? "Enabling…" : "Enable notifications"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
