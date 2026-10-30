"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ProjectEditorForm } from "@/components/admin/ProjectEditorForm";
import { Project } from "@/types/database";

export default function NewProjectPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSave = async (payload: Partial<Project>) => {
    setSaving(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save project");
      }

      router.push("/admin/projects");
      router.refresh();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to save project");
      setSaving(false);
    }
  };

  return (
    <ProjectEditorForm
      mode="create"
      onSave={handleSave}
      saving={saving}
      errorMsg={errorMsg}
    />
  );
}
