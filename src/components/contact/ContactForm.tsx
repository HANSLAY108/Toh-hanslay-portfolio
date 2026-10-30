"use client";

import React, { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { Locale } from "@/types/database";
import { getDictionary } from "@/lib/i18n/dictionaries";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactForm({ locale = "en" }: { locale?: Locale }) {
  const dict = getDictionary(locale);
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
        if (typeof window !== "undefined") {
          window.dispatchEvent(
            new CustomEvent("portfolio:analytics", {
              detail: {
                event: "contact_form_submit",
                locale,
                subject: form.subject || "Portfolio Inquiry",
              },
            })
          );
        }
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
        <h3 className="font-serif text-2xl font-medium text-[#201a16]">
          {dict.contact.form.successTitle}
        </h3>
        <p className="text-[#634f43] max-w-sm">
          {dict.contact.form.successBody}
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm text-[#7d6657] hover:text-[#201a16] transition-colors underline"
        >
          {dict.contact.form.sendAnother}
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
            {dict.contact.form.nameLabel} *
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder={dict.contact.form.namePlaceholder}
            className="w-full px-4 py-3 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-sm text-[#201a16] placeholder-[#c7b49e] focus:outline-none focus:border-[#201a16] transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-[#7d6657] mb-1.5">
            {dict.contact.form.emailLabel} *
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder={dict.contact.form.emailPlaceholder}
            className="w-full px-4 py-3 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-sm text-[#201a16] placeholder-[#c7b49e] focus:outline-none focus:border-[#201a16] transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-[#7d6657] mb-1.5">
          {dict.contact.form.subjectLabel}
        </label>
        <input
          type="text"
          value={form.subject}
          onChange={(e) => handleChange("subject", e.target.value)}
          placeholder={dict.contact.form.subjectPlaceholder}
          className="w-full px-4 py-3 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-sm text-[#201a16] placeholder-[#c7b49e] focus:outline-none focus:border-[#201a16] transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-[#7d6657] mb-1.5">
          {dict.contact.form.messageLabel} *
        </label>
        <textarea
          required
          value={form.message}
          onChange={(e) => handleChange("message", e.target.value)}
          rows={7}
          placeholder={dict.contact.form.messagePlaceholder}
          className="w-full px-4 py-3 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-sm text-[#201a16] placeholder-[#c7b49e] focus:outline-none focus:border-[#201a16] transition-colors resize-none leading-relaxed"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#201a16] text-[#faf8f5] text-sm font-medium hover:bg-[#362b25] transition-all shadow-subtle hover:shadow-hover disabled:opacity-60"
      >
        <span>
          {status === "loading"
            ? dict.contact.form.submitting
            : dict.contact.form.submit}
        </span>
        <Send className="w-4 h-4" />
      </button>
    </form>
  );
}
