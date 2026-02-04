"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export function ProfilePanel() {
  const { user, logout, refreshUser } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) setName(user.name);
  }, [user]);

  if (!user) return null;

  const initials = user.name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const handleSave = async () => {
    try {
      setSaving(true);
      await axios.patch("/api/profile", { name });
      await refreshUser();
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <Sheet>
      <SheetTrigger asChild className="rounded-full">
        <button className="rounded-full focus:outline-none focus:ring-2 focus:ring-primary">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-gradient-to-br from-primary to-indigo-500 text-white font-bold ">
              {initials}
            </AvatarFallback>
          </Avatar>
        </button>
      </SheetTrigger>

      <SheetContent className="w-[380px] px-8 py-6">
  <SheetHeader className="space-y-1">
    <SheetTitle>Your Profile</SheetTitle>
    <SheetDescription>
      Manage your personal information
    </SheetDescription>
  </SheetHeader>

  <div className="mt-8 space-y-8">
    {/* Avatar Preview */}
    <div className="flex items-center gap-4">
      <Avatar className="h-14 w-14">
        <AvatarFallback className="bg-gradient-to-br from-primary to-indigo-500 text-white text-xl font-bold">
          {initials}
        </AvatarFallback>
      </Avatar>

      <div>
        <p className="font-semibold">{user.name}</p>
        <p className="text-sm text-muted-foreground">
          {user.email}
        </p>
      </div>
    </div>

    <Separator />

    <div className="space-y-5">
      <div className="space-y-1">
        <Label>Full Name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="space-y-1">
        <Label>Email</Label>
        <Input value={user.email} disabled />
      </div>
    </div>

    <Button className="w-full" onClick={handleSave} disabled={saving}>
      {saving ? "Saving..." : "Save Changes"}
    </Button>

    <Separator />

    <Button
      variant="destructive"
      className="w-full"
      onClick={handleLogout}
    >
      Log out
    </Button>
  </div>
</SheetContent>

    </Sheet>
  );
}
