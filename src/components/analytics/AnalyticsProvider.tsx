"use client";

import React, { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { trackPortfolioEvent } from "@/lib/analytics";

export function AnalyticsProvider() {
  useEffect(() => {
    const handleCustomAnalyticsEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{
        event?: string;
        location?: string;
        subject?: string;
        locale?: string;
        url?: string;
        project?: string;
      }>;
      const detail = customEvent.detail;
      if (!detail || !detail.event) return;

      const { event, ...rest } = detail;
      const cleanProps: Record<string, string | number | boolean | null> = {};
      Object.entries(rest).forEach(([key, val]) => {
        if (
          typeof val === "string" ||
          typeof val === "number" ||
          typeof val === "boolean" ||
          val === null
        ) {
          cleanProps[key] = val;
        }
      });

      trackPortfolioEvent(event, cleanProps);
    };

    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const trackedEl = target.closest<HTMLElement>("[data-analytics-event]");
      if (!trackedEl) return;

      const eventName = trackedEl.getAttribute("data-analytics-event");
      if (!eventName) return;

      // Avoid double-tracking if it's handled by CalBookingButton custom event
      if (eventName === "booking_click" && trackedEl.tagName === "BUTTON") {
        return;
      }

      const location = trackedEl.getAttribute("data-analytics-location") || undefined;
      const label =
        trackedEl.getAttribute("data-analytics-label") ||
        trackedEl.textContent?.trim().slice(0, 64) ||
        undefined;
      const project = trackedEl.getAttribute("data-analytics-project") || undefined;
      const href = trackedEl.getAttribute("href") || undefined;

      trackPortfolioEvent(eventName, {
        ...(location ? { location } : {}),
        ...(label ? { label } : {}),
        ...(project ? { project } : {}),
        ...(href ? { href } : {}),
      });
    };

    window.addEventListener("portfolio:analytics", handleCustomAnalyticsEvent);
    document.addEventListener("click", handleDocumentClick, { capture: true });

    return () => {
      window.removeEventListener("portfolio:analytics", handleCustomAnalyticsEvent);
      document.removeEventListener("click", handleDocumentClick, { capture: true });
    };
  }, []);

  return <Analytics />;
}

