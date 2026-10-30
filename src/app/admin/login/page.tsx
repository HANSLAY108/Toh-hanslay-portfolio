"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("hanslay@atelier.dev");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    if (!supabase) {
      // Local/offline demo fallback: grant owner session directly
      router.push("/admin");
      return;
    }

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push("/admin");
  };

  const handleDemoAccess = () => {
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl border border-[#e8e2d9] p-8 md:p-10 shadow-card">
        {/* Header */}
        <div className="text-center space-y-3 mb-8">
          <div className="w-12 h-12 rounded-full bg-[#201a16] text-white mx-auto flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <span className="editorial-tag text-xs">Owner Authentication</span>
          <h1 className="font-serif text-3xl font-medium tracking-tight text-[#201a16]">
            Atelier Dashboard
          </h1>
          <p className="text-sm text-[#634f43]">
            Enter your credentials to manage projects, technical writing, and portfolio architecture.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3 text-red-900 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#7d6657] mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-sm text-[#201a16] focus:outline-none focus:border-[#201a16] transition-colors"
              placeholder="owner@atelier.dev"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#7d6657] mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-sm text-[#201a16] focus:outline-none focus:border-[#201a16] transition-colors"
              placeholder="••••••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-[#201a16] text-[#faf8f5] text-sm font-medium tracking-wide hover:bg-[#362b25] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{loading ? "Authenticating..." : "Sign In to Admin"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Offline / Demo Notice */}
        <div className="mt-8 pt-6 border-t border-[#e8e2d9] text-center space-y-3">
          <p className="text-xs text-[#7d6657]">
            Running locally or setting up Supabase?
          </p>
          <button
            onClick={handleDemoAccess}
            type="button"
            className="w-full py-2.5 px-3 rounded-xl border border-[#e8e2d9] bg-[#faf8f5] text-xs font-medium text-[#201a16] hover:bg-[#f4f0e8] transition-colors flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#7d6657]" />
            <span>Enter as Authenticated Owner (Direct Access)</span>
          </button>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-xs text-[#7d6657] hover:text-[#201a16] transition-colors"
          >
            &larr; Return to Public Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
