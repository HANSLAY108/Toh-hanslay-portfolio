"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RotateCw } from "lucide-react";
import { ProjectEditorForm } from "@/components/admin/ProjectEditorForm";
import { Project } from "@/types/database";

type SaveStatus = "idle" | "saving" | "success" | "error";

export default function EditProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<Project | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function loadProject() {
      try {
        const res = await fetch(`/api/projects/${params.id}`);
        if (!res.ok) throw new Error("Project not found");
        const data: { project: Project } = await res.json();
        setProject(data.project);
      } catch (err) {
        setErrorMsg(err instanceof Error ? err.message : "Failed to load project");
      } finally {
        setLoading(false);
      }
    }
    loadProject();
  }, [params.id]);

  const handleSave = async (payload: Partial<Project>) => {
    setSaveStatus("saving");
    setErrorMsg("");

    try {
      const res = await fetch(`/api/projects/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Save failed");
      }

      setSaveStatus("success");
      setTimeout(() => {
        setSaveStatus("idle");
        router.push("/admin/projects");
        router.refresh();
      }, 900);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Save failed");
      setSaveStatus("error");
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[40vh]">
        <div className="space-y-3 text-center">
          <RotateCw className="w-5 h-5 animate-spin text-[#7d6657] mx-auto" />
          <p className="text-xs font-mono text-[#7d6657]">Loading case study…</p>
        </div>
      </div>
    );
  }

  return (
    <ProjectEditorForm
      mode="edit"
      initialData={project || undefined}
      onSave={handleSave}
      saving={saveStatus === "saving"}
      saveStatus={saveStatus}
      errorMsg={errorMsg}
    />
  );
}
