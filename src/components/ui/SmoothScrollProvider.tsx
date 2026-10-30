"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    let rafId: number | null = null;

    const updateScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
      setScrollProgress(progress);
      setShowBackToTop(scrollTop > 450);
    };

    const onScroll = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateScroll);
    };

    // Smooth scroll for any in-page anchor links
    const onAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onAnchorClick);
    updateScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onAnchorClick);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Editorial Top Scroll Progress Indicator */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent pointer-events-none"
      >
        <div
          className="h-full bg-[#7d6657] transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {children}

      {/* Floating Smooth Back-to-Top Button */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll back to top"
        className={`fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-[#201a16] text-[#faf8f5] border border-[#362b25] shadow-md flex items-center justify-center hover:bg-[#362b25] hover:-translate-y-0.5 transition-all duration-300 ${
          showBackToTop
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <ArrowUp className="w-4 h-4" />
      </button>
    </>
  );
}

