export function HeroCardSkeleton() {
  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-2 rounded-2xl border border-border bg-card p-6 md:p-8 flex flex-col justify-between min-h-[220px] animate-pulse">
      <div>
        <div className="h-3 w-24 bg-white/5 rounded mb-3" />
        <div className="h-8 w-64 bg-white/5 rounded mb-2" />
        <div className="h-4 w-80 bg-white/5 rounded" />
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-white/5" />
          <div className="space-y-1.5">
            <div className="h-3 w-16 bg-white/5 rounded" />
            <div className="h-4 w-24 bg-white/5 rounded" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-white/5" />
          <div className="space-y-1.5">
            <div className="h-3 w-16 bg-white/5 rounded" />
            <div className="h-4 w-24 bg-white/5 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CourseCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 flex flex-col justify-between h-[180px] animate-pulse">
      <div className="flex items-start justify-between">
        <div className="h-10 w-10 rounded-xl bg-white/5" />
        <div className="h-5 w-14 bg-white/5 rounded-full" />
      </div>
      <div className="mt-4">
        <div className="h-5 w-40 bg-white/5 rounded mb-4" />
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="h-3 w-12 bg-white/5 rounded" />
            <div className="h-3 w-8 bg-white/5 rounded" />
          </div>
          <div className="w-full h-2 bg-white/5 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function ActivityCardSkeleton() {
  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-3 rounded-2xl border border-border bg-card p-6 flex flex-col justify-between animate-pulse">
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-white/5" />
            <div className="h-5 w-32 bg-white/5 rounded" />
          </div>
          <div className="h-3 w-20 bg-white/5 rounded" />
        </div>
        <div className="grid grid-cols-3 gap-4 mb-6 border-b border-border/60 pb-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="h-4 w-4 bg-white/5 rounded-full" />
              <div className="space-y-1">
                <div className="h-2 w-12 bg-white/5 rounded" />
                <div className="h-4 w-16 bg-white/5 rounded" />
              </div>
            </div>
          ))}
        </div>
        <div className="w-full space-y-2 pt-2">
          <div className="h-3 w-32 bg-white/5 rounded mb-2" />
          <div className="h-20 w-full bg-white/5 rounded" />
        </div>
      </div>
    </div>
  );
}

export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-auto">
      <HeroCardSkeleton />
      {/* 4 sample courses loading skeletons */}
      <CourseCardSkeleton />
      <CourseCardSkeleton />
      <CourseCardSkeleton />
      <CourseCardSkeleton />
      <ActivityCardSkeleton />
    </div>
  );
}
