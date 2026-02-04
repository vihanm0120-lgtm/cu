"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function NotificationPanel() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent className="w-[360px]">
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-4 text-sm">
          <p className="text-muted-foreground">
            Notifications are enabled.
          </p>

          <p className="text-xs text-muted-foreground">
            You’ll be notified when action is required.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
