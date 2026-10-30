import React from "react";
import Link from "next/link";
import { ArrowUpRight, Lock } from "lucide-react";

interface FooterProps {
  fullName?: string;
  footerText?: string;
  location?: string;
  footerVersion?: string;
  footerCopyright?: string;
  footerTechStack?: string;
  socials?: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    readcv?: string;
  };
}

export function Footer({
  fullName = "Hanslay",
  footerText = "Architecting autonomous AI engines, resilient full-stack systems, and minimalist typographic identities with uncompromising craft.",
  location = "SF & Remote • Pacific Standard Time",
  footerVersion = "v2.4",
  footerCopyright = "All rights reserved. Editorial Minimalist Architecture.",
  footerTechStack = "Next.js 14 · Supabase · Tailwind",
  socials = {
    github: "https://github.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    readcv: "https://read.cv",
  },
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#faf8f5] border-t border-[#e8e2d9] transition-colors">
      <div className="max-w-6xl mx-auto px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Column 1: Editorial Vision */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-medium tracking-tight text-[#201a16]">
                {fullName}
              </span>
              {footerVersion && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#f4f0e8] border border-[#e8e2d9] text-[#7d6657] font-mono">
                  {footerVersion}
                </span>
              )}
            </div>
            <p className="text-sm text-[#634f43] leading-relaxed max-w-sm">
              {footerText}
            </p>
            {location && (
              <div className="pt-2 text-xs font-mono text-[#7d6657] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#7d6657]" />
                <span>{location}</span>
              </div>
            )}
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#7d6657]">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/projects" className="text-[#4e3e35] hover:text-[#201a16] transition-colors">
                  Selected Work &amp; Case Studies
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[#4e3e35] hover:text-[#201a16] transition-colors">
                  Engineering Philosophy &amp; CV
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-[#4e3e35] hover:text-[#201a16] transition-colors">
                  Technical Writing &amp; Research
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#4e3e35] hover:text-[#201a16] transition-colors">
                  Initiate a Conversation
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Socials & External */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#7d6657]">
              Connect &amp; Signals
            </h4>
            <div className="flex flex-col space-y-2 text-sm">
              {socials.github && (
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-between text-[#4e3e35] hover:text-[#201a16] transition-colors"
                >
                  <span>GitHub — Code Repositories</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#7d6657] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}
              {socials.twitter && (
                <a
                  href={socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-between text-[#4e3e35] hover:text-[#201a16] transition-colors"
                >
                  <span>X / Twitter — Thoughts &amp; Releases</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#7d6657] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}
              {socials.linkedin && (
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-between text-[#4e3e35] hover:text-[#201a16] transition-colors"
                >
                  <span>LinkedIn — Professional Network</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#7d6657] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}
              {socials.readcv && (
                <a
                  href={socials.readcv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-between text-[#4e3e35] hover:text-[#201a16] transition-colors"
                >
                  <span>Read.cv — Design Portfolio</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#7d6657] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[#e8e2d9] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7d6657]">
          <div>
            &copy; {currentYear} {fullName}. {footerCopyright}
          </div>
          <div className="flex items-center gap-6">
            {footerTechStack && <span>{footerTechStack}</span>}
            <Link
              href="/admin"
              className="inline-flex items-center gap-1 text-[#7d6657] hover:text-[#201a16] transition-colors"
              title="Admin Portal"
            >
              <Lock className="w-3 h-3" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
