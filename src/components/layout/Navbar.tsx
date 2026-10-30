"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, ChevronRight, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { Locale } from "@/types/database";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { CalBookingButton } from "@/components/booking/CalBookingModal";

interface NavbarProps {
  availableForWork?: boolean;
  fullName?: string;
  calUrl?: string;
  locale?: Locale;
}

export function Navbar({
  availableForWork = true,
  fullName = "Hanslay",
  calUrl,
  locale: propLocale,
}: NavbarProps) {
  const pathname = usePathname() || "/";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const detectedLocale: Locale =
    propLocale ||
    (pathname === "/fr" || pathname.startsWith("/fr/") ? "fr" : "en");
  const dict = getDictionary(detectedLocale);
  const basePath = `/${detectedLocale}`;

  const strippedPath =
    pathname.replace(/^\/(en|fr)(?=\/|$)/, "") || "/";

  const getLocalizedHref = (targetLocale: Locale) => {
    const suffix = strippedPath === "/" ? "" : strippedPath;
    return `/${targetLocale}${suffix}`;
  };

  const navLinks = [
    { href: `${basePath}`, match: "/", label: dict.nav.home, index: "01" },
    {
      href: `${basePath}/projects`,
      match: "/projects",
      label: dict.nav.projects,
      index: "02",
    },
    {
      href: `${basePath}/about`,
      match: "/about",
      label: dict.nav.about,
      index: "03",
    },
    {
      href: `${basePath}/blog`,
      match: "/blog",
      label: dict.nav.blog,
      index: "04",
    },
    {
      href: `${basePath}/contact`,
      match: "/contact",
      label: dict.nav.contact,
      index: "05",
    },
  ];

  // Close mobile menu automatically on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Track scroll for subtle shadow elevation & close on Escape
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const isActive = (match: string) => {
    if (match === "/") return strippedPath === "/";
    return strippedPath === match || strippedPath.startsWith(`${match}/`);
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#e8e2d9] transition-shadow duration-300",
          scrolled && "shadow-subtle"
        )}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-3">
          {/* Brand / Logo */}
          <Link
            href={basePath}
            onClick={() => setMobileMenuOpen(false)}
            className="group flex items-center gap-2.5 sm:gap-3 min-w-0"
          >
            <div className="w-8 h-8 rounded-full bg-[#201a16] text-[#faf8f5] flex items-center justify-center font-serif text-sm font-semibold tracking-wider group-hover:scale-105 transition-transform shrink-0">
              {fullName.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-serif text-lg sm:text-xl tracking-tight text-[#201a16] font-medium truncate">
                {fullName}
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-widest uppercase text-[#7d6657] font-sans -mt-1 truncate">
                Systems &amp; Aesthetic
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5">
            {navLinks.slice(1).map((link) => {
              const active = isActive(link.match);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3.5 lg:px-4 py-2 rounded-full text-sm font-sans tracking-wide transition-all duration-200",
                    active
                      ? "bg-[#f4f0e8] text-[#201a16] font-medium"
                      : "text-[#634f43] hover:text-[#201a16] hover:bg-[#faf8f5]"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTA / Language Switcher / Cal.com Booking */}
          <div className="hidden md:flex items-center gap-2.5 lg:gap-3 shrink-0">
            {/* Language Switcher EN / FR */}
            <div
              className="inline-flex items-center rounded-full border border-[#e8e2d9] bg-[#faf8f5] p-0.5 text-[11px] font-mono"
              aria-label={dict.nav.languageLabel}
            >
              <Link
                href={getLocalizedHref("en")}
                className={cn(
                  "px-2.5 py-1 rounded-full transition-colors",
                  detectedLocale === "en"
                    ? "bg-[#201a16] text-[#faf8f5] font-medium"
                    : "text-[#7d6657] hover:text-[#201a16]"
                )}
              >
                EN
              </Link>
              <Link
                href={getLocalizedHref("fr")}
                className={cn(
                  "px-2.5 py-1 rounded-full transition-colors",
                  detectedLocale === "fr"
                    ? "bg-[#201a16] text-[#faf8f5] font-medium"
                    : "text-[#7d6657] hover:text-[#201a16]"
                )}
              >
                FR
              </Link>
            </div>

            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f4f0e8] border border-[#e8e2d9] text-xs font-medium text-[#4e3e35]">
              <span
                className={cn(
                  "w-2 h-2 rounded-full",
                  availableForWork
                    ? "bg-[#7d6657] animate-pulse"
                    : "bg-[#ded2c0]"
                )}
              />
              <span>{availableForWork ? dict.nav.available : "Booked"}</span>
            </div>

            <CalBookingButton
              calUrl={calUrl}
              label={dict.nav.bookCall}
              variant="nav"
              locationTag="navbar_desktop"
            />

            <Link
              href={`${basePath}/contact`}
              data-analytics-event="cta_click"
              data-analytics-location="navbar_desktop"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#201a16] text-[#faf8f5] text-xs font-medium tracking-wide hover:bg-[#362b25] transition-all shadow-subtle hover:shadow-card"
            >
              <span>{dict.nav.letsTalk}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Controls: Language Toggle + Hamburger Button */}
          <div className="flex md:hidden items-center gap-2 shrink-0">
            <div className="inline-flex items-center rounded-full border border-[#e8e2d9] bg-[#faf8f5] p-0.5 text-[10px] font-mono">
              <Link
                href={getLocalizedHref("en")}
                className={cn(
                  "px-2 py-0.5 rounded-full transition-colors",
                  detectedLocale === "en"
                    ? "bg-[#201a16] text-[#faf8f5]"
                    : "text-[#7d6657]"
                )}
              >
                EN
              </Link>
              <Link
                href={getLocalizedHref("fr")}
                className={cn(
                  "px-2 py-0.5 rounded-full transition-colors",
                  detectedLocale === "fr"
                    ? "bg-[#201a16] text-[#faf8f5]"
                    : "text-[#7d6657]"
                )}
              >
                FR
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className={cn(
                "w-10 h-10 rounded-xl border flex items-center justify-center transition-all",
                mobileMenuOpen
                  ? "bg-[#201a16] text-[#faf8f5] border-[#201a16]"
                  : "bg-[#faf8f5] text-[#201a16] border-[#e8e2d9] hover:bg-[#f4f0e8]"
              )}
              aria-label={
                mobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Backdrop Overlay */}
      <div
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
        className={cn(
          "fixed inset-0 top-16 sm:top-20 z-40 bg-black/30 backdrop-blur-xs md:hidden transition-opacity duration-300",
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      />

      {/* Mobile Slide-Down Drawer Panel */}
      <div
        className={cn(
          "fixed inset-x-0 top-16 sm:top-20 z-50 md:hidden bg-white border-b border-[#e8e2d9] shadow-hover overflow-y-auto max-h-[calc(100dvh-4rem)] transition-all duration-300 ease-out origin-top",
          mobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-3 pointer-events-none"
        )}
      >
        <div className="px-4 sm:px-6 py-5 space-y-5">
          {/* Navigation Links */}
          <nav className="flex flex-col divide-y divide-[#f4f0e8]">
            {navLinks.map((link) => {
              const active = isActive(link.match);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between py-3.5 px-3 rounded-xl transition-colors",
                    active
                      ? "bg-[#f4f0e8] text-[#201a16] font-medium"
                      : "text-[#4e3e35] hover:bg-[#faf8f5] hover:text-[#201a16]"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono text-[#a9937c]">
                      {link.index}
                    </span>
                    <span className="font-serif text-lg">{link.label}</span>
                  </div>
                  <ChevronRight
                    className={cn(
                      "w-4 h-4 transition-transform",
                      active
                        ? "text-[#201a16] translate-x-0.5"
                        : "text-[#c7b49e]"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Bottom CTA & Availability Section */}
          <div className="pt-4 border-t border-[#e8e2d9] space-y-3">
            <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-[#faf8f5] border border-[#e8e2d9] text-xs text-[#4e3e35]">
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-[#7d6657]" />
                <span className="font-mono text-[11px]">
                  {detectedLocale === "fr" ? "Français (FR)" : "English (EN)"}
                </span>
              </div>
              <span className="text-[10px] font-mono uppercase text-[#7d6657]">
                {availableForWork ? dict.nav.available : "Booked"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <CalBookingButton
                calUrl={calUrl}
                label={dict.nav.bookCall}
                variant="outline"
                locationTag="navbar_mobile"
                className="w-full justify-center py-3 rounded-xl"
              />

              <Link
                href={`${basePath}/contact`}
                onClick={() => setMobileMenuOpen(false)}
                data-analytics-event="cta_click"
                data-analytics-location="navbar_mobile"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#201a16] text-[#faf8f5] text-sm font-medium tracking-wide hover:bg-[#362b25] transition-colors shadow-subtle"
              >
                <span>{dict.nav.letsTalk}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
