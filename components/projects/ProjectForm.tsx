"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProjectFormActions } from "./ProjectFormActions";

type ProjectFormProps = {
  projectId?: string; // present in edit mode
  defaultValues?: {
    name?: string;
    description?: string;
    status?: "on_track" | "slight_delay" | "blocked";
  };
  submitLabel?: string;
};

export function ProjectForm({
  projectId,
  defaultValues,
  submitLabel = "Save Project",
}: ProjectFormProps) {
  const router = useRouter();

  const [name, setName] = useState(defaultValues?.name ?? "");
  const [description, setDescription] = useState(
    defaultValues?.description ?? ""
  );
  const [status, setStatus] = useState<
    "on_track" | "slight_delay" | "blocked"
  >(defaultValues?.status ?? "on_track");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = { name, description, status };

    if (projectId) {
      await axios.patch(`/api/projects/${projectId}`, payload);
    } else {
      await axios.post("/api/projects", payload);
    }

    router.push("/dashboard");
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-2">
            <Label>Project Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Website Redesign 2024"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Short Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Briefly explain the project scope for your client..."
              className="min-h-[120px]"
            />
          </div>

          <div className="space-y-2">
            <Label>Project Status</Label>
            <Select value={status} onValueChange={(value) => setStatus(value as "on_track" | "slight_delay" | "blocked")}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="on_track">🟢 On Track</SelectItem>
                <SelectItem value="slight_delay">🟡 Slight Delay</SelectItem>
                <SelectItem value="blocked">🔴 Blocked</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <ProjectFormActions
            submitLabel={submitLabel}
            onCancel={() => router.back()}
          />
        </CardContent>
      </form>
    </Card>
  );
}
