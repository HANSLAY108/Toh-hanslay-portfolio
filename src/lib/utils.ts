import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  } catch {
    return dateString;
  }
}

const PLACEHOLDER_PATHS = new Set([
  "/hanslay-portrait.png",
  "/projects/ai-workflow.png",
  "/projects/neural-audio.png",
  "/projects/fintech-ledger.png",
  "/projects/design-system.png",
  "/blog/latency-agents.png",
  "/blog/aesthetic-conviction.png",
  "/blog/state-machines.png",
  "/og-image.png",
]);

export function hasValidImage(url?: string | null): boolean {
  if (!url || typeof url !== "string") return false;
  const trimmed = url.trim();
  if (!trimmed) return false;
  if (PLACEHOLDER_PATHS.has(trimmed)) return false;
  return true;
}
