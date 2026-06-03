"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { Course } from "@/types/course";

interface CourseCardProps {
  course: Course;
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

export default function CourseCard({ course }: CourseCardProps) {
  const { title, progress, icon_name } = course;

  // Dynamically resolve Lucide Icon
  // If icon_name is not found, fallback to BookOpen
  const LucideIcon = (Icons as any)[icon_name] || Icons.BookOpen;

  // Select a subtle gradient border/bg color based on progress range
  const getGradientClass = (prog: number) => {
    if (prog >= 80) return "from-emerald-500/10 via-transparent to-transparent";
    if (prog >= 40) return "from-blue-500/10 via-transparent to-transparent";
    return "from-amber-500/10 via-transparent to-transparent";
  };

  const getProgressColor = (prog: number) => {
    if (prog >= 80) return "bg-emerald-500 shadow-emerald-500/20";
    if (prog >= 40) return "bg-blue-500 shadow-blue-500/20";
    return "bg-amber-500 shadow-amber-500/20";
  };

  const getHoverStyles = (prog: number) => {
    if (prog >= 80) {
      return {
        scale: 1.018,
        boxShadow: "0 0 25px rgba(16, 185, 129, 0.12)",
        borderColor: "rgba(16, 185, 129, 0.35)",
        backgroundColor: "var(--card-hover)",
      };
    }
    if (prog >= 40) {
      return {
        scale: 1.018,
        boxShadow: "0 0 25px rgba(59, 130, 246, 0.12)",
        borderColor: "rgba(59, 130, 246, 0.35)",
        backgroundColor: "var(--card-hover)",
      };
    }
    return {
      scale: 1.018,
      boxShadow: "0 0 25px rgba(245, 158, 11, 0.12)",
      borderColor: "rgba(245, 158, 11, 0.35)",
      backgroundColor: "var(--card-hover)",
    };
  };

  return (
    <motion.article
      variants={cardVariants}
      whileHover={getHoverStyles(progress)}
      transition={hoverTransition}
      className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 flex flex-col justify-between h-[180px] transition-colors duration-300"
    >
      {/* Decorative gradient flare */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${getGradientClass(
          progress
        )} pointer-events-none`}
      />

      {/* Card Header (Icon & Action) */}
      <div className="flex items-start justify-between relative z-10">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-text-dim">
          <LucideIcon className="w-5 h-5" />
        </div>
        <span className="text-xs font-semibold text-text-muted bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
          Course
        </span>
      </div>

      {/* Card Body & Progress */}
      <div className="relative z-10 mt-4">
        <h3 className="font-bold text-foreground line-clamp-1 mb-3 text-base">
          {title}
        </h3>

        {/* Progress Bar & Number */}
        <div>
          <div className="flex justify-between items-center mb-1.5 text-xs text-text-dim">
            <span>Progress</span>
            <span className="font-semibold text-foreground">{progress}%</span>
          </div>

          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
            {/* Animated progress bar using Framer Motion */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
              className={`h-full rounded-full shadow-sm ${getProgressColor(
                progress
              )}`}
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
}
