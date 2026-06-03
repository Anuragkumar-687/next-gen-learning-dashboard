import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function Loading() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-background text-foreground">
      {/* Mock Sidebar Skeleton (Pulsing) */}
      <aside className="hidden md:flex flex-col border-r border-border bg-[#0B0B0D] h-screen sticky top-0 w-64 p-6 justify-between animate-pulse">
        <div className="space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 bg-white/5 rounded-xl" />
            <div className="h-4 w-24 bg-white/5 rounded" />
          </div>
          {/* Menu Items */}
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 w-full bg-white/5 rounded-xl" />
            ))}
          </div>
        </div>
        {/* Profile */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-white/5" />
          <div className="space-y-1.5 flex-1">
            <div className="h-3 w-16 bg-white/5 rounded" />
            <div className="h-2 w-24 bg-white/5 rounded" />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-8 lg:p-10 max-w-7xl mx-auto w-full">
        {/* Breadcrumb Skeleton */}
        <div className="h-3 w-28 bg-white/5 rounded mb-8 animate-pulse" />

        {/* Bento Grid Skeletons */}
        <LoadingSkeleton />
      </main>
    </div>
  );
}
