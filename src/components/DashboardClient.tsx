"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "./Sidebar";
import BentoGrid from "./BentoGrid";
import HeroCard from "./HeroCard";
import CourseCard from "./CourseCard";
import ActivityCard from "./ActivityCard";
import { Course } from "@/types/course";
import { BookOpen, Activity, Settings } from "lucide-react";

interface DashboardClientProps {
  initialCourses: Course[];
}

// Shared tab panel transition for entering/exiting views
const tabVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 24 },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.15, ease: "easeIn" },
  },
};

export default function DashboardClient({ initialCourses }: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-background text-foreground pb-16 md:pb-0">
      {/* Sidebar navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main panel content */}
      <main
        className="flex-1 p-6 md:p-8 lg:p-10 w-full overflow-y-auto"
        id="main-content"
      >
        {/* Breadcrumb */}
        <header className="mb-8 max-w-7xl mx-auto">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-xs font-semibold text-text-muted uppercase tracking-wider">
              <li>EduPortal</li>
              <li aria-hidden="true">/</li>
              <li className="text-blue-400 capitalize">{activeTab}</li>
            </ol>
          </nav>
        </header>

        {/* Tab panels — AnimatePresence enables exit animations between tab switches */}
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === "dashboard" && (
              <motion.section
                key="dashboard"
                variants={tabVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                aria-labelledby="dashboard-heading"
              >
                {/* h1 lives inside HeroCard for the main page heading */}
                <BentoGrid>
                  <HeroCard studentName="Alex" streakCount={14} />

                  {initialCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}

                  <ActivityCard />
                </BentoGrid>
              </motion.section>
            )}

            {activeTab === "courses" && (
              <motion.section
                key="courses"
                variants={tabVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                aria-labelledby="courses-title"
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h2
                    id="courses-title"
                    className="text-2xl font-bold text-foreground"
                  >
                    Your Registered Courses
                  </h2>
                </div>
                <BentoGrid>
                  {initialCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </BentoGrid>
              </motion.section>
            )}

            {activeTab === "activity" && (
              <motion.section
                key="activity"
                variants={tabVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                aria-labelledby="activity-title"
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                    <Activity className="w-5 h-5" />
                  </div>
                  <h2
                    id="activity-title"
                    className="text-2xl font-bold text-foreground"
                  >
                    Study Progress Heatmap
                  </h2>
                </div>
                <ActivityCard />
              </motion.section>
            )}

            {activeTab === "settings" && (
              <motion.section
                key="settings"
                variants={tabVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                aria-labelledby="settings-title"
                className="max-w-lg relative overflow-hidden bg-card border border-border p-6 md:p-8 rounded-2xl"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                    <Settings className="w-5 h-5" />
                  </div>
                  <h2
                    id="settings-title"
                    className="text-xl font-bold text-foreground"
                  >
                    Profile Settings
                  </h2>
                </div>
                <p className="text-sm text-text-dim mb-6">
                  Configure your personal details, email notifications, and
                  manage connected credentials.
                </p>
                <div className="space-y-4">
                  {[
                    { label: "Full Name", value: "Alex Student" },
                    { label: "Email Address", value: "student@academy.edu" },
                    { label: "Role", value: "Frontend Development Intern" },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <label className="block text-[10px] text-text-muted mb-1.5 font-bold uppercase tracking-wider">
                        {label}
                      </label>
                      <input
                        type="text"
                        disabled
                        value={value}
                        className="w-full bg-white/5 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
