"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  Activity,
  Settings,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "activity", label: "Activity", icon: Activity },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  // On desktop (lg+) the sidebar starts expanded; collapse button toggles it.
  // On tablet (md to lg) the sidebar is always icon-only — no collapse toggle needed.
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* --- DESKTOP & TABLET SIDEBAR --- */}
      <nav
        className={`hidden md:flex flex-col border-r border-border bg-[#0B0B0D] h-screen sticky top-0 transition-all duration-300 z-30
          ${isCollapsed ? "w-20" : "lg:w-64 w-20"}`}
        aria-label="Sidebar Navigation"
      >
        {/* Header Logo */}
        <div className="h-16 flex items-center px-5 border-b border-border/50 justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              <GraduationCap className="w-5 h-5" />
            </div>
            {/* Label: hidden on tablet (md), visible only on desktop (lg) when not collapsed */}
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="hidden lg:block font-bold text-base tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent truncate"
              >
                EduPortal
              </motion.span>
            )}
          </div>

          {/* Collapse toggle — only on desktop (lg+) */}
          <button
            onClick={() => setIsCollapsed((c) => !c)}
            className="hidden lg:flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-card text-text-muted hover:text-foreground hover:bg-card-hover transition-colors shrink-0"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                aria-current={isActive ? "page" : undefined}
                className={`w-full relative flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors group select-none justify-center lg:justify-start ${
                  isCollapsed ? "lg:justify-center" : ""
                } ${isActive ? "text-white" : "text-text-dim hover:text-white"}`}
              >
                {/* Active Indicator using Framer Motion layoutId */}
                {isActive && (
                  <motion.span
                    layoutId="activeHighlightDesktop"
                    className="absolute inset-0 bg-white/5 border border-white/10 rounded-xl pointer-events-none"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}

                <Icon
                  className={`w-5 h-5 shrink-0 ${
                    isActive
                      ? "text-blue-400"
                      : "text-text-muted group-hover:text-foreground transition-colors"
                  }`}
                />

                {/* Label: hidden on tablet (md), visible on desktop (lg) when not collapsed */}
                {!isCollapsed && (
                  <span className="hidden lg:block truncate relative z-10">
                    {item.label}
                  </span>
                )}

                {/* Tooltip for icon-only states (tablet + desktop collapsed) */}
                <div className="absolute left-full ml-3 px-2.5 py-1.5 rounded-md bg-zinc-950 text-white text-xs font-semibold border border-border opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 lg:hidden">
                  {item.label}
                </div>
                {isCollapsed && (
                  <div className="absolute left-full ml-3 px-2.5 py-1.5 rounded-md bg-zinc-950 text-white text-xs font-semibold border border-border opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 hidden lg:block">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* User Profile / Status */}
        <div className="p-4 border-t border-border/50">
          <div className="flex items-center gap-3 justify-center lg:justify-start">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-sm font-bold text-white shrink-0 shadow-inner">
              S
            </div>
            {!isCollapsed && (
              <div className="hidden lg:block overflow-hidden">
                <div className="text-sm font-semibold text-foreground truncate">Student User</div>
                <div className="text-[10px] text-text-muted truncate">student@academy.edu</div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* --- MOBILE BOTTOM NAVIGATION --- */}
      <nav
        className="flex md:hidden fixed bottom-0 left-0 right-0 h-16 border-t border-border bg-[#0B0B0D]/90 backdrop-blur-md justify-around items-center px-4 z-40"
        aria-label="Mobile Navigation"
      >
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              aria-current={isActive ? "page" : undefined}
              className={`flex flex-col items-center justify-center flex-1 h-full py-1 relative ${
                isActive ? "text-white" : "text-text-muted"
              }`}
            >
              {/* Active slide indicator using layoutId */}
              {isActive && (
                <motion.span
                  layoutId="activeHighlightMobile"
                  className="absolute bottom-0 top-0 left-2 right-2 my-2 bg-white/5 border border-white/5 rounded-xl -z-10"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}
              <Icon className={`w-5 h-5 ${isActive ? "text-blue-400" : ""}`} />
              <span className="text-[10px] font-medium mt-1">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
