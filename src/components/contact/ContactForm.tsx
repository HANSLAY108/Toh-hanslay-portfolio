"use client";

import React, { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Submission failed. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <CheckCircle className="w-14 h-14 text-[#7d6657]" />
        <h3 className="font-serif text-2xl font-medium text-[#201a16]">Message Received</h3>
        <p className="text-[#634f43] max-w-sm">
          Thank you for reaching out. I&apos;ll review your message and respond within 24–48 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm text-[#7d6657] hover:text-[#201a16] transition-colors underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {status === "error" && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3 text-red-900 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[#7d6657] mb-1.5">
            Your Name *
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Aria Chen"
            className="w-full px-4 py-3 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-sm text-[#201a16] placeholder-[#c7b49e] focus:outline-none focus:border-[#201a16] transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[#7d6657] mb-1.5">
            Email Address *
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="aria@studio.io"
            className="w-full px-4 py-3 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-sm text-[#201a16] placeholder-[#c7b49e] focus:outline-none focus:border-[#201a16] transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-[#7d6657] mb-1.5">
          Subject
        </label>
        <input
          type="text"
          value={form.subject}
          onChange={(e) => handleChange("subject", e.target.value)}
          placeholder="AI Architecture Collaboration, Design Commission..."
          className="w-full px-4 py-3 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-sm text-[#201a16] placeholder-[#c7b49e] focus:outline-none focus:border-[#201a16] transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-[#7d6657] mb-1.5">
          Message *
        </label>
        <textarea
          required
          value={form.message}
          onChange={(e) => handleChange("message", e.target.value)}
          rows={7}
          placeholder="Describe your project, challenge, or opportunity in as much detail as you'd like. I read everything carefully."
          className="w-full px-4 py-3 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-sm text-[#201a16] placeholder-[#c7b49e] focus:outline-none focus:border-[#201a16] transition-colors resize-none leading-relaxed"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#201a16] text-[#faf8f5] text-sm font-medium hover:bg-[#362b25] transition-all shadow-subtle hover:shadow-hover disabled:opacity-60"
      >
        <span>{status === "loading" ? "Sending..." : "Send Message"}</span>
        <Send className="w-4 h-4" />
      </button>
    </form>
  );
}
