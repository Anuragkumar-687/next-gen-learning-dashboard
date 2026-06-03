"use client";

import { motion } from "framer-motion";

interface BentoGridProps {
  children: React.ReactNode;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export default function BentoGrid({ children }: BentoGridProps) {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-auto"
      id="dashboard-grid"
      aria-label="Learning dashboard grid"
    >
      {children}
    </motion.section>
  );
}
