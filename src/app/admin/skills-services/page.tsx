"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Save, ChevronDown, ChevronUp, Check, RotateCw, Pencil } from "lucide-react";
import { initialSkills, initialServices } from "@/lib/mock-data";
import { Skill, Service } from "@/types/database";
import { SkillLogo } from "@/components/ui/SkillLogo";

const SKILL_CATEGORIES = [
  "Core & Systems Architecture",
  "Artificial Intelligence & ML",
  "Design & Creative Direction",
  "Cloud & Tooling",
];

export default function AdminSkillsServicesPage() {
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [services, setServices] = useState<Service[]>(initialServices);
  const [activeTab, setActiveTab] = useState<"skills" | "services">("skills");
  const [newSkill, setNewSkill] = useState({
    category: SKILL_CATEGORIES[0],
    name: "",
    proficiency_notes: "",
  });
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/skills-services")
      .then((res) => res.json())
      .then((data) => {
        if (data?.skills) setSkills(data.skills);
        if (data?.services) setServices(data.services);
      })
      .catch(() => {});
  }, []);

  const persistAll = async (nextSkills: Skill[], nextServices: Service[]) => {
    setSaving(true);
    try {
      await fetch("/api/skills-services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills: nextSkills, services: nextServices }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } finally {
      setSaving(false);
    }
  };

  const addSkill = async () => {
    if (!newSkill.name.trim()) return;
    const skill: Skill = {
      id: Date.now().toString(),
      category: newSkill.category,
      name: newSkill.name.trim(),
      proficiency_notes: newSkill.proficiency_notes.trim(),
      order_index: skills.length + 1,
    };
    const nextSkills = [...skills, skill];
    setSkills(nextSkills);
    setNewSkill((prev) => ({ ...prev, name: "", proficiency_notes: "" }));
    await persistAll(nextSkills, services);
  };

  const deleteSkill = async (id: string) => {
    const nextSkills = skills.filter((s) => s.id !== id);
    setSkills(nextSkills);
    await persistAll(nextSkills, services);
  };

  const updateSkill = (id: string, patch: Partial<Skill>) => {
    setSkills((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  };

  const addService = () => {
    const newSvc: Service = {
      id: Date.now().toString(),
      title: "New Advisory Discipline",
      description: "Describe the scope and technical focus of this offering...",
      deliverables: ["Architecture blueprint", "Production implementation"],
      order_index: services.length + 1,
      active: true,
    };
    const nextServices = [...services, newSvc];
    setServices(nextServices);
    setExpandedService(newSvc.id);
  };

  const deleteService = async (id: string) => {
    if (confirm("Delete this service offering?")) {
      const nextServices = services.filter((s) => s.id !== id);
      setServices(nextServices);
      await persistAll(skills, nextServices);
    }
  };

  const handleSave = async () => {
    await persistAll(skills, services);
  };

  const groupedSkills = SKILL_CATEGORIES.map((cat) => ({
    category: cat,
    skills: skills.filter((s) => s.category === cat),
  }));

  return (
    <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto w-full max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
            Admin / Content Collections
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#201a16] mt-1">
            Skills Matrix &amp; Services
          </h1>
          <p className="text-xs text-[#634f43] mt-1">
            Manage your multi-disciplinary competency taxonomy and client advisory offerings. Changes reflect on the About page.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#201a16] text-white text-xs font-mono font-medium hover:bg-[#362b25] transition-all disabled:opacity-50 shrink-0 shadow-sm"
        >
          {saving ? (
            <RotateCw className="w-3.5 h-3.5 animate-spin" />
          ) : saved ? (
            <Check className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Save className="w-3.5 h-3.5" />
          )}
          <span>{saving ? "Saving..." : saved ? "Synced to Frontend ✓" : "Save Changes"}</span>
        </button>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-2 border-b border-[#e8e2d9] pb-0">
        {(["skills", "services"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 sm:px-5 py-2.5 -mb-px text-xs font-mono uppercase tracking-wider font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? "border-[#201a16] text-[#201a16]"
                : "border-transparent text-[#7d6657] hover:text-[#201a16]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Skills Tab */}
      {activeTab === "skills" && (
        <div className="space-y-6">
          {groupedSkills.map(({ category, skills: catSkills }) => (
            <div key={category} className="bg-white border border-[#e8e2d9] rounded-2xl overflow-hidden shadow-xs">
              <div className="px-5 py-3 bg-[#faf8f5] border-b border-[#e8e2d9]">
                <h3 className="text-xs font-mono uppercase tracking-wider font-semibold text-[#7d6657]">
                  {category}
                </h3>
              </div>
              <div className="divide-y divide-[#f4f0e8]">
                {catSkills.map((skill) => {
                  const isEditing = editingSkillId === skill.id;
                  return (
                    <div key={skill.id} className="px-5 py-3 group space-y-2">
                      {isEditing ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                          <input
                            type="text"
                            value={skill.name}
                            onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
                            className="px-3 py-1.5 rounded-lg border border-[#e8e2d9] bg-[#faf8f5] text-xs font-medium text-[#201a16] focus:outline-none focus:border-[#201a16]"
                            placeholder="Skill Name"
                          />
                          <select
                            value={skill.category}
                            onChange={(e) => updateSkill(skill.id, { category: e.target.value })}
                            className="px-3 py-1.5 rounded-lg border border-[#e8e2d9] bg-[#faf8f5] text-xs text-[#201a16] focus:outline-none focus:border-[#201a16]"
                          >
                            {SKILL_CATEGORIES.map((c) => (
                              <option key={c}>{c}</option>
                            ))}
                          </select>
                          <input
                            type="text"
                            value={skill.proficiency_notes || ""}
                            onChange={(e) =>
                              updateSkill(skill.id, { proficiency_notes: e.target.value })
                            }
                            className="sm:col-span-2 px-3 py-1.5 rounded-lg border border-[#e8e2d9] bg-[#faf8f5] text-xs text-[#201a16] focus:outline-none focus:border-[#201a16]"
                            placeholder="Proficiency notes"
                          />
                          <div className="sm:col-span-2 flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={async () => {
                                setEditingSkillId(null);
                                await persistAll(skills, services);
                              }}
                              className="px-3 py-1 rounded-lg bg-[#201a16] text-white text-xs font-mono"
                            >
                              Done &amp; Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <SkillLogo name={skill.name} category={skill.category} />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-[#201a16]">{skill.name}</p>
                            {skill.proficiency_notes && (
                              <p className="text-[11px] text-[#7d6657] mt-0.5 line-clamp-1">
                                {skill.proficiency_notes}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => setEditingSkillId(skill.id)}
                              title="Edit Skill"
                              className="p-1.5 rounded-lg text-[#7d6657] hover:text-[#201a16] hover:bg-[#faf8f5] transition-all"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteSkill(skill.id)}
                              title="Delete Skill"
                              className="p-1.5 rounded-lg text-[#c7b49e] hover:text-red-500 hover:bg-red-50 transition-all"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Add New Skill */}
          <div className="bg-white border border-[#e8e2d9] rounded-2xl p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono uppercase tracking-wider font-semibold text-[#201a16]">
                Add New Competency
              </h3>
              <span className="text-[10px] font-mono text-[#7d6657]">
                Language/framework logo auto-detected
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <select
                value={newSkill.category}
                onChange={(e) => setNewSkill((s) => ({ ...s, category: e.target.value }))}
                className="px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs text-[#201a16] focus:outline-none focus:border-[#201a16] col-span-1 sm:col-span-2"
              >
                {SKILL_CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <div className="flex items-center gap-2.5">
                <SkillLogo
                  name={newSkill.name || "Code"}
                  category={newSkill.category}
                />
                <input
                  type="text"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill((s) => ({ ...s, name: e.target.value }))}
                  placeholder="Skill name (e.g. Python, Go, React, Figma)"
                  className="flex-1 px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs text-[#201a16] focus:outline-none focus:border-[#201a16]"
                />
              </div>
              <input
                type="text"
                value={newSkill.proficiency_notes}
                onChange={(e) => setNewSkill((s) => ({ ...s, proficiency_notes: e.target.value }))}
                placeholder="Proficiency notes (optional)"
                className="px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs text-[#201a16] focus:outline-none focus:border-[#201a16]"
              />
            </div>
            <button
              onClick={addSkill}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#faf8f5] border border-[#e8e2d9] text-xs font-mono font-medium text-[#201a16] hover:bg-[#f4f0e8]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Competency</span>
            </button>
          </div>
        </div>
      )}

      {/* Services Tab */}
      {activeTab === "services" && (
        <div className="space-y-4">
          {services.map((service) => (
            <div key={service.id} className="bg-white border border-[#e8e2d9] rounded-2xl overflow-hidden shadow-xs">
              <div className="w-full flex items-center justify-between px-5 py-4 hover:bg-[#faf8f5] transition-colors">
                <button
                  onClick={() =>
                    setExpandedService(expandedService === service.id ? null : service.id)
                  }
                  className="flex-1 flex items-center justify-between text-left"
                >
                  <span className="font-serif text-sm font-medium text-[#201a16]">
                    {service.title}
                  </span>
                  {expandedService === service.id ? (
                    <ChevronUp className="w-4 h-4 text-[#7d6657]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#7d6657]" />
                  )}
                </button>
                <button
                  onClick={() => deleteService(service.id)}
                  title="Delete Service"
                  className="ml-3 p-1.5 rounded-lg text-[#c7b49e] hover:text-red-500 hover:bg-red-50"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              {expandedService === service.id && (
                <div className="px-5 pb-5 space-y-3 border-t border-[#f4f0e8]">
                  <div className="pt-4">
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657] mb-1.5">
                      Service Title
                    </label>
                    <input
                      type="text"
                      value={service.title}
                      onChange={(e) => {
                        setServices((prev) =>
                          prev.map((s) =>
                            s.id === service.id ? { ...s, title: e.target.value } : s
                          )
                        );
                      }}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs font-medium text-[#201a16] focus:outline-none focus:border-[#201a16]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657] mb-1.5">
                      Description
                    </label>
                    <textarea
                      value={service.description}
                      rows={2}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs text-[#201a16] focus:outline-none focus:border-[#201a16] resize-none leading-relaxed"
                      onChange={(e) => {
                        setServices((prev) =>
                          prev.map((s) =>
                            s.id === service.id ? { ...s, description: e.target.value } : s
                          )
                        );
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#7d6657] mb-1.5">
                      Key Deliverables (one per line)
                    </label>
                    <textarea
                      value={service.deliverables.join("\n")}
                      rows={4}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs font-mono text-[#201a16] focus:outline-none focus:border-[#201a16] resize-none leading-relaxed"
                      onChange={(e) => {
                        const deliverables = e.target.value.split("\n");
                        setServices((prev) =>
                          prev.map((s) =>
                            s.id === service.id ? { ...s, deliverables } : s
                          )
                        );
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addService}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#e8e2d9] text-xs font-mono font-medium text-[#201a16] hover:bg-[#faf8f5] shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Service Discipline</span>
          </button>
        </div>
      )}
    </div>
  );
}
