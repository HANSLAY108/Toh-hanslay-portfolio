import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <span className="font-mono text-8xl font-medium text-[#e8e2d9]">404</span>
      <h1 className="font-serif text-3xl md:text-4xl font-medium text-[#201a16] mt-6 mb-3">
        Page Not Found
      </h1>
      <p className="text-[#634f43] max-w-sm leading-relaxed mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved. Return to the portfolio.
      </p>
      <div className="flex gap-3">
        <Link
          href="/"
          className="px-6 py-2.5 rounded-full bg-[#201a16] text-[#faf8f5] text-sm font-medium hover:bg-[#362b25] transition-colors"
        >
          Back to Home
        </Link>
        <Link
          href="/projects"
          className="px-6 py-2.5 rounded-full border border-[#e8e2d9] text-sm font-medium text-[#201a16] hover:bg-[#faf8f5] transition-colors"
        >
          View Projects
        </Link>
      </div>
    </div>
  );
}
