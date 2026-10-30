"use client";

import { track } from "@vercel/analytics";

export type PortfolioAnalyticsEvent =
  | "cta_click"
  | "booking_click"
  | "contact_form_submit"
  | "project_live_demo_click"
  | "project_github_click"
  | "role_filter_change"
  | "language_switch";

export function trackPortfolioEvent(
  event: PortfolioAnalyticsEvent | string,
  properties?: Record<string, string | number | boolean | null>
) {
  try {
    track(event, properties);
  } catch {
    // Analytics should never block UI interactions
  }
}

