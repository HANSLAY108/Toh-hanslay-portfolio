"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  RotateCw,
  LayoutGrid,
  FolderGit2,
  PenTool,
  Sparkles,
  Mail,
  Settings,
  ChevronDown,
  ExternalLink,
  BookOpen,
  Plus,
  Check,
  Radio,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import "@/app/globals.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [revalidating, setRevalidating] = useState(false);
  const [revalidatedToast, setRevalidatedToast] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // If on login page, don't wrap with studio frame
  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-[#faf8f5]">{children}</div>;
  }

  const collections = [
    { href: "/admin", label: "Overview", icon: LayoutGrid, count: null },
    { href: "/admin/projects", label: "Projects", icon: FolderGit2, count: 14 },
    { href: "/admin/blog", label: "Writing", icon: PenTool, count: 9 },
    { href: "/admin/skills-services", label: "Services & Skills", icon: Sparkles, count: null },
    { href: "/admin/messages", label: "Inquiries", icon: Mail, count: 4, badgeColor: "bg-amber-100 text-amber-800" },
    { href: "/admin/settings", label: "Contact, Footer & SEO", icon: Settings, count: null },
  ];

  const handleRevalidate = async () => {
    setRevalidating(true);
    try {
      await fetch("/api/revalidate?path=/", { method: "POST" });
    } catch {
      // offline/demo fallback
    }
    setTimeout(() => {
      setRevalidating(false);
      setRevalidatedToast(true);
      setTimeout(() => setRevalidatedToast(false), 3500);
    }, 800);
  };

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-[#fcfbfa] flex flex-col text-[#201a16] font-sans text-[13px] antialiased select-none">
      
      {/* ── TOP STUDIO COMMAND BAR ── */}
      <header className="h-12 border-b border-[#e8e2d9] bg-white px-3 sm:px-4 flex items-center justify-between z-30 shrink-0 gap-2">
        {/* Left: Mobile Menu Toggle + Brand Moniker & Search */}
        <div className="flex items-center gap-2 sm:gap-4 flex-1 max-w-xl min-w-0">
          {/* Mobile Sidebar Hamburger Button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-1.5 rounded-lg border border-[#e8e2d9] text-[#7d6657] hover:bg-[#faf8f5] hover:text-[#201a16] transition-colors"
            aria-label="Open Content Collections"
          >
            <Menu className="w-4 h-4" />
          </button>

          <Link
            href="/admin"
            className="font-serif font-semibold tracking-wider text-xs sm:text-sm uppercase text-[#201a16] hover:opacity-80 transition-opacity flex items-center gap-1 shrink-0"
          >
            <span>HANSLAY</span>
            <span className="text-[#a9937c] font-mono font-normal">/</span>
          </Link>

          {/* Search Bar with ⌘K (collapses gracefully on mobile) */}
          <div className="relative flex-1 max-w-md hidden sm:block">
            <Search className="w-3.5 h-3.5 text-[#a9937c] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documents, schemas, media..."
              className="w-full pl-8 pr-10 py-1.5 rounded-lg border border-[#e8e2d9] bg-[#faf8f5] text-xs text-[#201a16] placeholder-[#a9937c] focus:outline-none focus:border-[#201a16] focus:bg-white transition-all font-sans"
            />
            <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-[#a9937c] bg-white border border-[#e8e2d9] rounded px-1.5 py-0.5 pointer-events-none shadow-sm">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right: Mode Switchers, Revalidate Button & User Profile */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Split / Live Preview mode buttons */}
          <div className="hidden md:flex items-center bg-[#faf8f5] p-0.5 rounded-lg border border-[#e8e2d9] text-[11px] font-mono">
            <Link
              href="/admin"
              className="px-2.5 py-1 rounded bg-white shadow-sm font-semibold text-[#201a16] border border-[#e8e2d9]"
            >
              SPLIT
            </Link>
            <Link
              href="/"
              target="_blank"
              className="px-2.5 py-1 text-[#7d6657] hover:text-[#201a16] transition-colors"
            >
              LIVE PREVIEW
            </Link>
          </div>

          {/* Revalidate & Publish Button */}
          <button
            onClick={handleRevalidate}
            disabled={revalidating}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-lg bg-[#201a16] text-[#faf8f5] text-xs font-mono font-medium hover:bg-[#362b25] transition-all disabled:opacity-60 shadow-sm"
          >
            <RotateCw className={cn("w-3 h-3", revalidating && "animate-spin")} />
            <span className="tracking-wide uppercase text-[10px] sm:text-[11px] hidden xs:inline sm:inline">
              {revalidating ? "Revalidating..." : "Revalidate & Publish"}
            </span>
            <span className="xs:hidden">
              {revalidating ? "..." : "Publish"}
            </span>
          </button>

          {/* User Profile Pill */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-1.5 sm:gap-2 pl-1 pr-1.5 sm:pr-2 py-1 rounded-lg hover:bg-[#faf8f5] border border-transparent hover:border-[#e8e2d9] transition-all"
            >
              <div className="w-6 h-6 rounded-full bg-[#ede7e1] text-[#201a16] flex items-center justify-center font-serif font-bold text-xs">
                H
              </div>
              <div className="text-left hidden lg:block">
                <span className="block text-xs font-medium text-[#201a16] leading-none">
                  Hanslay
                </span>
                <span className="block text-[10px] text-[#7d6657] font-mono leading-none mt-0.5">
                  Admin Atelier
                </span>
              </div>
              <ChevronDown className="w-3 h-3 text-[#7d6657]" />
            </button>

            {userDropdownOpen && (
              <div className="absolute right-0 mt-1 w-48 bg-white border border-[#e8e2d9] rounded-xl shadow-card py-1.5 z-50 text-xs">
                <div className="px-3 py-1.5 border-b border-[#f0ece4]">
                  <p className="font-medium text-[#201a16]">Hanslay Atelier</p>
                  <p className="text-[10px] text-[#7d6657] font-mono">hanslay@atelier.dev</p>
                </div>
                <Link
                  href="/"
                  target="_blank"
                  className="flex items-center justify-between px-3 py-2 text-[#634f43] hover:bg-[#faf8f5] hover:text-[#201a16]"
                >
                  <span>View Public Site</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
                <Link
                  href="/admin/settings"
                  onClick={() => setUserDropdownOpen(false)}
                  className="block px-3 py-2 text-[#634f43] hover:bg-[#faf8f5] hover:text-[#201a16]"
                >
                  Studio Settings
                </Link>
                <div className="border-t border-[#f0ece4] mt-1 pt-1">
                  <Link
                    href="/admin/login"
                    className="block px-3 py-2 text-red-600 hover:bg-red-50"
                  >
                    Sign Out
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ── REVALIDATE SUCCESS TOAST ── */}
      {revalidatedToast && (
        <div className="fixed top-14 right-4 sm:right-6 z-50 bg-[#201a16] text-white px-4 py-2.5 rounded-xl shadow-lg border border-[#4e3e35] flex items-center gap-2.5 text-xs animate-in fade-in slide-in-from-top-2">
          <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Check className="w-2.5 h-2.5" />
          </div>
          <span className="font-mono text-[11px]">
            On-Demand ISR Revalidation dispatched across edge nodes
          </span>
        </div>
      )}

      {/* ── MAIN STUDIO BODY (RESPONSIVE) ── */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Mobile Backdrop Overlay */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden"
          />
        )}

        {/* ── COLUMN 1: LEFT SIDEBAR (CONTENT COLLECTIONS) ── */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#e8e2d9] flex flex-col transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 lg:w-60 shrink-0",
            sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
          )}
        >
          {/* Studio Brand Header */}
          <div className="p-4 border-b border-[#f0ece4] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#201a16] text-white flex items-center justify-center font-serif font-bold text-xs">
                H
              </div>
              <div>
                <p className="font-medium text-xs text-[#201a16] leading-none">
                  Hanslay Studio
                </p>
                <p className="text-[10px] text-[#7d6657] font-mono leading-none mt-1">
                  Studio CMS Engine
                </p>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded-md text-[#7d6657] hover:bg-[#faf8f5]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Create New Document Button */}
          <div className="p-3">
            <Link
              href="/admin/projects/new"
              onClick={() => setSidebarOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-[#e8e2d9] bg-[#faf8f5] hover:bg-[#f4f0e8] hover:border-[#ded2c0] text-xs font-medium text-[#201a16] transition-all shadow-sm"
            >
              <Plus className="w-3.5 h-3.5 text-[#7d6657]" />
              <span>Create New Document</span>
            </Link>
          </div>

          {/* Collections Navigation */}
          <div className="flex-1 overflow-y-auto px-2 py-2">
            <div className="px-2 mb-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#9e8677] font-semibold">
                CONTENT COLLECTIONS
              </span>
            </div>

            <nav className="space-y-0.5">
              {collections.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-all group",
                      active
                        ? "bg-[#faf8f5] text-[#201a16] font-medium border border-[#e8e2d9]"
                        : "text-[#634f43] hover:text-[#201a16] hover:bg-[#faf8f5]/60"
                    )}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className={cn("w-3.5 h-3.5 shrink-0", active ? "text-[#201a16]" : "text-[#7d6657]")} />
                      <span className="truncate">{item.label}</span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {item.count !== null && (
                        <span
                          className={cn(
                            "px-1.5 py-0.2 rounded text-[10px] font-mono font-medium",
                            item.badgeColor || "bg-[#f4f0e8] text-[#7d6657]"
                          )}
                        >
                          {item.count}
                        </span>
                      )}
                      {active && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#201a16] ml-1" />
                      )}
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Footer Links */}
          <div className="p-3 border-t border-[#f0ece4] space-y-1 text-xs">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2 px-2 py-1.5 rounded-md text-[#7d6657] hover:text-[#201a16] hover:bg-[#faf8f5] transition-colors"
            >
              <Radio className="w-3.5 h-3.5 text-[#7d6657]" />
              <span className="text-xs">Live Preview</span>
            </Link>
            <Link
              href="/admin/settings"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-2 px-2 py-1.5 rounded-md text-[#7d6657] hover:text-[#201a16] hover:bg-[#faf8f5] transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#7d6657]" />
              <span className="text-xs">Documentation</span>
            </Link>
          </div>
        </aside>

        {/* ── MAIN CONTENT WORKSPACE ── */}
        <main className="flex-1 flex overflow-hidden bg-[#faf8f5] w-full min-w-0">
          {children}
        </main>
      </div>

      {/* ── PERSISTENT BOTTOM STUDIO STATUS BAR ── */}
      <footer className="h-7 border-t border-[#e8e2d9] bg-[#ffffff] px-3 sm:px-4 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#7d6657] shrink-0 z-20 overflow-hidden">
        <div className="flex items-center gap-1.5 sm:gap-2 truncate">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span className="hidden sm:inline">Connected to Studio Content Lake</span>
          <span className="sm:hidden">Studio Lake</span>
          <span className="text-[#ded2c0]">·</span>
          <span><strong className="font-semibold text-[#201a16]">v2025-atelier</strong></span>
          <span className="text-[#ded2c0] hidden md:inline">|</span>
          <span className="text-[#634f43] hidden md:inline">Next.js 14 On-Demand ISR Active</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-2">
          <span className="hidden sm:inline">Last published 2 mins ago</span>
          <span className="text-[#ded2c0] hidden sm:inline">·</span>
          <span>Latency: <strong className="text-[#201a16]">24ms</strong></span>
        </div>
      </footer>
    </div>
  );
}
