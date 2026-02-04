"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { CheckCircle, Clock, FastForward, AlertTriangle } from "lucide-react";
import { UpdateSection } from "./UpdateSection";
import { UpdateActions } from "./UpdateActions";
import { AutosaveIndicator } from "./AutosaveIndicator";
import { useRouter } from "next/navigation";

type Props = {
  projectId: string;
};

export function UpdateForm({ projectId }: Props) {
  const [completed, setCompleted] = useState("");
  const [inProgress, setInProgress] = useState("");
  const [comingNext, setComingNext] = useState("");
  const [blockers, setBlockers] = useState("");
  const router = useRouter()

  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // 🔁 Trigger autosave ONLY when content changes
  useEffect(() => {
    if (!dirty) return;
    if (!projectId) return;

    // clear previous debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      try {
        setSaving(true);

        await axios.post(
          `/api/projects/${projectId}/updates/draft`,
          {
            completed,
            inProgress,
            comingNext,
            blockers,
          }
        );

        setDirty(false); // ✅ reset dirty after successful save
      } catch (err) {
        console.error("Autosave failed", err);
      } finally {
        setSaving(false);
      }
    }, 1500); // ⏱️ debounce delay (1.5s)

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [
    completed,
    inProgress,
    comingNext,
    blockers,
    dirty,
    projectId,
  ]);

  const publish = async () => {
  try {
    // 🛑 stop pending autosave
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }

    setSaving(true);

    // 🔐 ensure latest draft is saved
    if (dirty) {
      await axios.post(
        `/api/projects/${projectId}/updates/draft`,
        {
          completed,
          inProgress,
          comingNext,
          blockers,
        }
      );
      setDirty(false);
    }

    // 🚀 publish
    await axios.post(
      `/api/projects/${projectId}/updates/publish`
    );

    // ✅ now navigate
    router.push("/dashboard");
  } catch (err) {
    console.error("Publish failed", err);
  } finally {
    setSaving(false);
  }
};


  return (
    <>
      <form className="space-y-6">
        <UpdateSection
          title="Completed since last update"
          icon={<CheckCircle className="h-5 w-5 text-emerald-500" />}
          value={completed}
          onChange={(v) => {
            setCompleted(v);
            setDirty(true);
          }}
          placeholder="What milestones have you hit?"
        />

        <UpdateSection
          title="In progress"
          icon={<Clock className="h-5 w-5 text-blue-500" />}
          value={inProgress}
          onChange={(v) => {
            setInProgress(v);
            setDirty(true);
          }}
          placeholder="What are you currently working on?"
        />

        <UpdateSection
          title="Coming next"
          icon={<FastForward className="h-5 w-5 text-purple-500" />}
          value={comingNext}
          onChange={(v) => {
            setComingNext(v);
            setDirty(true);
          }}
          placeholder="What’s on the horizon?"
        />

        <UpdateSection
          title="Blockers / Input needed"
          icon={<AlertTriangle className="h-5 w-5 text-amber-500" />}
          value={blockers}
          onChange={(v) => {
            setBlockers(v);
            setDirty(true);
          }}
          placeholder="Any items holding you up?"
          variant="warning"
        />

        <UpdateActions onPublish={publish} saving={saving} />

      </form>

      {(saving || dirty) && (
        <AutosaveIndicator saving={saving} />
      )}
    </>
  );
}
