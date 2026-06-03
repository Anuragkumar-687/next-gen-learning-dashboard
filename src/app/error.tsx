"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCw, Database, KeyRound, ServerCrash } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Error Boundary caught exception:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 py-12 text-foreground">
      <div className="relative max-w-xl w-full border border-red-500/20 bg-card rounded-2xl p-6 md:p-8 shadow-[0_0_50px_rgba(239,68,68,0.05)] overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col items-center text-center">
          {/* Error Icon */}
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 mb-6">
            <ServerCrash className="w-8 h-8" />
          </div>

          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground mb-3">
            Database Connection Failed
          </h2>

          <p className="text-sm text-text-dim max-w-md mb-6 leading-relaxed">
            {error.message || "An unexpected error occurred while fetching course data from Supabase."}
          </p>

          {/* Troubleshooter Steps Card */}
          <div className="w-full text-left bg-white/5 border border-border rounded-xl p-5 mb-8 space-y-4">
            <div className="text-xs font-bold text-blue-400 uppercase tracking-widest flex items-center gap-2">
              <AlertCircle className="w-3.5 h-3.5" /> Troubleshooting Guide
            </div>
            
            <div className="space-y-3.5 text-xs text-text-dim leading-relaxed">
              <div className="flex gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-white/5 font-semibold text-foreground border border-white/5">
                  1
                </div>
                <div>
                  <strong className="text-foreground">Verify Environment Variables:</strong>
                  <p className="mt-0.5 text-text-muted">
                    Ensure <code className="text-red-400 bg-white/5 px-1 py-0.5 rounded">.env.local</code> contains your <code className="text-zinc-300">NEXT_PUBLIC_SUPABASE_URL</code> and <code className="text-zinc-300">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-white/5 font-semibold text-foreground border border-white/5">
                  2
                </div>
                <div>
                  <strong className="text-foreground">Run Database Seed:</strong>
                  <p className="mt-0.5 text-text-muted">
                    Make sure the <code className="text-zinc-300">courses</code> table exists and is seeded. Run the queries inside <code className="text-blue-400 bg-white/5 px-1 py-0.5 rounded">supabase_schema.sql</code> in your Supabase SQL Editor.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-white/5 font-semibold text-foreground border border-white/5">
                  3
                </div>
                <div>
                  <strong className="text-foreground">RLS Policy Setup:</strong>
                  <p className="mt-0.5 text-text-muted">
                    Confirm Row Level Security (RLS) is either disabled for testing or has a public SELECT policy active.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={() => reset()}
              className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-semibold text-sm text-white shadow-lg shadow-blue-500/10 active:scale-95 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" /> Try Again
            </button>
            <a
              href="https://supabase.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border border-border bg-card-hover hover:bg-white/10 font-semibold text-sm text-foreground active:scale-95 transition-all"
            >
              Supabase Console
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
