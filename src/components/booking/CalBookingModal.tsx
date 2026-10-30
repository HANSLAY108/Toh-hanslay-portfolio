"use client";

import React, { useState, useEffect } from "react";
import { Calendar, X, ExternalLink } from "lucide-react";

export function normalizeCalUrl(rawUrl?: string): {
  directUrl: string;
  embedUrl: string;
} {
  const fallback =
    process.env.NEXT_PUBLIC_CAL_COM_URL || "https://cal.com/hanslay/30min";
  const source = (rawUrl || "").trim() || fallback;

  let directUrl = source;
  if (!/^https?:\/\//i.test(directUrl)) {
    directUrl = `https://cal.com/${directUrl.replace(/^\/+/, "")}`;
  }

  try {
    const parsed = new URL(directUrl);
    parsed.searchParams.set("embed", "true");
    parsed.searchParams.set("theme", "light");
    return {
      directUrl,
      embedUrl: parsed.toString(),
    };
  } catch {
    return {
      directUrl: "https://cal.com/hanslay/30min",
      embedUrl: "https://cal.com/hanslay/30min?embed=true&theme=light",
    };
  }
}

interface CalBookingButtonProps {
  calUrl?: string;
  label?: string;
  variant?: "primary" | "outline" | "dark" | "nav";
  className?: string;
  locationTag?: string;
}

export function CalBookingButton({
  calUrl,
  label = "Book a call",
  variant = "primary",
  className = "",
  locationTag = "site",
}: CalBookingButtonProps) {
  const [open, setOpen] = useState(false);
  const { directUrl, embedUrl } = normalizeCalUrl(calUrl);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const handleOpen = () => {
    setOpen(true);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("portfolio:analytics", {
          detail: {
            event: "booking_click",
            location: locationTag,
            calUrl: directUrl,
          },
        })
      );
    }
  };

  const baseStyles =
    variant === "nav"
      ? "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#e8e2d9] bg-[#faf8f5] text-[#201a16] text-xs font-medium hover:bg-[#f4f0e8] hover:border-[#d5cbbe] transition-all"
      : variant === "dark"
      ? "inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[#4e3e35] bg-[#362b25] text-[#faf8f5] text-sm font-medium hover:bg-[#4e3e35] hover:-translate-y-0.5 transition-all"
      : variant === "outline"
      ? "inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#e8e2d9] bg-white text-[#201a16] text-sm font-medium hover:bg-[#faf8f5] transition-all"
      : "inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#201a16] text-[#faf8f5] text-sm font-medium hover:bg-[#362b25] transition-all shadow-subtle";

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        data-analytics-event="booking_click"
        data-analytics-location={locationTag}
        className={`${baseStyles} ${className}`}
      >
        <Calendar className="w-3.5 h-3.5 text-[#7d6657] shrink-0" />
        <span>{label}</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/55 backdrop-blur-xs"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl bg-[#faf8f5] border border-[#e8e2d9] rounded-2xl shadow-hover overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-white border-b border-[#e8e2d9]">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-[#7d6657]" />
                <div>
                  <h3 className="font-serif text-base font-medium text-[#201a16]">
                    {label}
                  </h3>
                  <p className="text-[11px] font-mono text-[#7d6657]">
                    Cal.com Live Scheduling
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={directUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#e8e2d9] bg-[#faf8f5] text-xs font-mono text-[#634f43] hover:text-[#201a16] transition-colors"
                >
                  <span>Open in New Tab</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-lg border border-[#e8e2d9] text-[#634f43] hover:text-[#201a16] hover:bg-[#faf8f5]"
                  aria-label="Close booking modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Embedded Cal.com Iframe */}
            <div className="flex-1 bg-white min-h-[540px] overflow-y-auto">
              <iframe
                src={embedUrl}
                title="Cal.com Scheduling Widget"
                className="w-full h-[560px] border-0"
                allow="camera; microphone; autoplay; fullscreen"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function CalInlineEmbed({
  calUrl,
  title = "Schedule a Discovery Call",
  subtitle = "Prefer a live conversation? Pick a time slot directly on my calendar via Cal.com.",
}: {
  calUrl?: string;
  title?: string;
  subtitle?: string;
}) {
  const { directUrl, embedUrl } = normalizeCalUrl(calUrl);

  return (
    <div className="bg-[#faf8f5] border border-[#e8e2d9] rounded-2xl overflow-hidden">
      <div className="p-6 md:p-8 border-b border-[#e8e2d9] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#7d6657]" />
            <h2 className="font-serif text-xl font-medium text-[#201a16]">
              {title}
            </h2>
          </div>
          <p className="text-xs text-[#634f43]">{subtitle}</p>
        </div>

        <a
          href={directUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-analytics-event="booking_click"
          data-analytics-location="contact_inline_external"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#e8e2d9] text-xs font-mono text-[#201a16] hover:border-[#201a16] transition-colors shrink-0"
        >
          <span>Cal.com</span>
          <ExternalLink className="w-3 h-3 text-[#7d6657]" />
        </a>
      </div>

      <div className="bg-white">
        <iframe
          src={embedUrl}
          title="Cal.com Inline Scheduler"
          className="w-full h-[540px] border-0"
          loading="lazy"
          allow="camera; microphone; autoplay; fullscreen"
        />
      </div>
    </div>
  );
}

