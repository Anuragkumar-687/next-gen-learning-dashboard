"use client";

import { motion } from "framer-motion";
import { Activity, Flame, Clock, CheckCircle2 } from "lucide-react";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 18,
    },
  },
};

const hoverTransition = {
  type: "spring",
  stiffness: 300,
  damping: 20,
};

// Generates a mock dataset for a 7x24 grid (7 days a week, 24 weeks ~ 6 months)
const generateMockActivity = () => {
  const levels = [0, 0, 1, 0, 2, 0, 0, 3, 1, 0, 4, 2, 0, 1, 3, 0, 2, 1, 0, 0, 3, 2, 4, 1];
  const grid = [];
  for (let col = 0; col < 24; col++) {
    const column = [];
    for (let row = 0; row < 7; row++) {
      // Create a deterministic but random-looking pattern
      const index = (col * 7 + row) % levels.length;
      let level = levels[index];
      // Inject some extra zeroes for empty space
      if ((col + row) % 5 === 0) level = 0;
      column.push(level);
    }
    grid.push(column);
  }
  return grid;
};

export default function ActivityCard() {
  const grid = generateMockActivity();
  const weekDays = ["Mon", "", "Wed", "", "Fri", "", "Sun"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  // Mapping levels to colors
  const getColorClass = (level: number) => {
    switch (level) {
      case 1:
        return "bg-blue-500/20 border-blue-500/10";
      case 2:
        return "bg-blue-500/40 border-blue-500/20";
      case 3:
        return "bg-blue-500/60 border-blue-500/30";
      case 4:
        return "bg-blue-500 border-blue-600";
      default:
        return "bg-white/5 border-white/5";
    }
  };

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{
        scale: 1.018,
        boxShadow: "0 0 25px rgba(59, 130, 246, 0.12)",
        borderColor: "rgba(59, 130, 246, 0.35)",
        backgroundColor: "var(--card-hover)",
      }}
      transition={hoverTransition}
      className="col-span-1 md:col-span-2 lg:col-span-3 rounded-2xl border border-border bg-card p-6 flex flex-col justify-between transition-colors duration-300 overflow-hidden"
    >
      <div>
        {/* Title / Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
              <Activity className="w-4.5 h-4.5" />
            </div>
            <h3 className="font-bold text-foreground">Learning Activity</h3>
          </div>
          <span className="text-xs text-text-muted">Last 6 months</span>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-6 border-b border-border/60 pb-6">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-400" />
            <div>
              <div className="text-[10px] uppercase tracking-wider text-text-muted">Study Hours</div>
              <div className="text-base font-bold text-foreground">84.5 hrs</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <div>
              <div className="text-[10px] uppercase tracking-wider text-text-muted">Tasks Done</div>
              <div className="text-base font-bold text-foreground">37 lessons</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-400" />
            <div>
              <div className="text-[10px] uppercase tracking-wider text-text-muted">Daily Goal</div>
              <div className="text-base font-bold text-foreground">92% Met</div>
            </div>
          </div>
        </div>

        {/* Heatmap Grid Container */}
        <div className="w-full overflow-x-auto pb-2 scrollbar-thin">
          <div className="min-w-[480px] flex flex-col gap-1.5">
            {/* Months indicators */}
            <div className="flex gap-[18px] text-[10px] text-text-muted pl-8 mb-1">
              {months.map((m, idx) => (
                <span key={idx} className="w-8">
                  {m}
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              {/* Day Labels */}
              <div className="flex flex-col justify-between text-[10px] text-text-muted pr-2 w-6 text-right leading-3 pt-0.5">
                {weekDays.map((d, idx) => (
                  <span key={idx} className="h-3">
                    {d}
                  </span>
                ))}
              </div>

              {/* Columns & Rows */}
              <div className="flex gap-1.5 flex-1">
                {grid.map((column, colIdx) => (
                  <div key={colIdx} className="flex flex-col gap-1.5">
                    {column.map((level, rowIdx) => (
                      <div
                        key={rowIdx}
                        className={`w-3.5 h-3.5 rounded-sm border transition-all duration-200 hover:scale-125 ${getColorClass(
                          level
                        )}`}
                        title={`Activity level: ${level}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-1.5 text-[10px] text-text-muted mt-4">
        <span>Less</span>
        <div className="w-2.5 h-2.5 rounded-sm bg-white/5 border border-white/5" />
        <div className="w-2.5 h-2.5 rounded-sm bg-blue-500/20 border border-blue-500/10" />
        <div className="w-2.5 h-2.5 rounded-sm bg-blue-500/40 border border-blue-500/20" />
        <div className="w-2.5 h-2.5 rounded-sm bg-blue-500/60 border border-blue-500/30" />
        <div className="w-2.5 h-2.5 rounded-sm bg-blue-500 border border-blue-600" />
        <span>More</span>
      </div>
    </motion.article>
  );
}
