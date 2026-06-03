"use client";

import { motion } from "framer-motion";
import { Flame, Calendar, Award } from "lucide-react";

interface HeroCardProps {
  studentName?: string;
  streakCount?: number;
}

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

export default function HeroCard({
  studentName = "Alex",
  streakCount = 14,
}: HeroCardProps) {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{
        scale: 1.018,
        boxShadow: "0 0 25px rgba(139, 92, 246, 0.12)",
        borderColor: "rgba(139, 92, 246, 0.35)",
        backgroundColor: "var(--card-hover)",
      }}
      transition={hoverTransition}
      className="col-span-1 md:col-span-2 lg:col-span-2 relative overflow-hidden rounded-2xl border border-border bg-card p-6 md:p-8 flex flex-col justify-between min-h-[220px] transition-colors duration-300"
    >
      {/* Decorative gradient background */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-bl from-blue-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Top Section */}
      <div className="relative z-10">
        <div className="flex items-center gap-2 text-xs text-text-dim/80 mb-3">
          <Calendar className="w-3.5 h-3.5" />
          <span>{today}</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          Welcome Back, {studentName}
        </h1>
        <p className="text-sm text-text-dim mt-2 max-w-md">
          You're doing great! Keep up the momentum and crush your coding goals today.
        </p>
      </div>

      {/* Bottom Section: Streak & Achievements */}
      <div className="relative z-10 mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
        {/* Streak Counter */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/15 border border-orange-500/20 text-orange-500">
            <Flame className="w-5 h-5 fill-current" />
          </div>
          <div>
            <div className="text-xs text-text-muted">Learning Streak</div>
            <div className="text-base font-bold text-foreground">
              {streakCount} Days Active
            </div>
          </div>
        </div>

        {/* Level Info */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 border border-blue-500/20 text-blue-500">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-text-muted">Current Goal</div>
            <div className="text-base font-semibold text-foreground">
              80% Weekly Avg
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
