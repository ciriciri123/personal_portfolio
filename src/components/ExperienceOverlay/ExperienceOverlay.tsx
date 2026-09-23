"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { EXPERIENCE_DATA, type ExperienceItem } from "@/data/experienceData";
import { ExperienceTimeline } from "./ExperienceTimeline";
import { ExperienceDetail } from "./ExperienceDetail";

interface ExperienceOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES: { label: string; value: "leadership" | "work" }[] = [
  { label: "Work Experience", value: "work" },
  { label: "Leadership Experience", value: "leadership" }
];

export function ExperienceOverlay({ isOpen, onClose }: ExperienceOverlayProps) {
  const shouldReduce = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const [selectedFilter, setSelectedFilter] = useState<"leadership" | "work">("work");
  const [activeExperience, setActiveExperience] = useState<ExperienceItem | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const t = setTimeout(() => closeButtonRef.current?.focus(), 50);
      return () => clearTimeout(t);
    } else {
      document.body.style.overflow = "";
      setTimeout(() => {
        setActiveExperience(null);
        setSelectedFilter("work");
      }, 300);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (activeExperience) {
          setActiveExperience(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose, activeExperience]);

  const filteredExperiences = EXPERIENCE_DATA.filter(e => e.kind === selectedFilter);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[150]"
            style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={() => { if (!activeExperience) onClose(); }}
            aria-hidden
          />

          <motion.div
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="experience-overlay-title"
            className="fixed inset-x-0 bottom-0 z-[151] mx-auto overflow-hidden flex flex-col"
            style={{
              maxWidth: "min(1440px, 100%)",
              width: "100%",
              height: "clamp(88vh, 92vh, 100dvh)",
              borderTopLeftRadius: 32,
              borderTopRightRadius: 32,
            }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={
              shouldReduce
                ? { duration: 0.2 }
                : { type: "spring", stiffness: 280, damping: 30, mass: 0.8 }
            }
          >
            {/* Background SVG — mobile (iPhone) */}
            <div className="absolute inset-0 z-0 md:hidden">
              <Image
                src="/assets/FolderBackground_yellow_iphone.svg"
                alt=""
                fill
                style={{ objectFit: "cover", objectPosition: "top center" }}
                priority
              />
            </div>
            {/* Background SVG — desktop */}
            <div className="absolute inset-0 z-0 hidden md:block">
              <Image
                src="/assets/FolderBackground_yellow.svg"
                alt=""
                fill
                style={{ objectFit: "cover", objectPosition: "top center" }}
                priority
              />
            </div>

            {/* Header */}
            <header className="relative z-10 flex flex-col px-8 pt-8 pb-4 shrink-0">
              <div className="flex items-start justify-between">
                <div>
                  <h2
                    id="experience-overlay-title"
                    className="font-inter font-bold text-white leading-none drop-shadow-sm ml-1 capitalize"
                    style={{ fontSize: "clamp(25px, 5vw, 64px)" }}
                  >
                    Experience
                  </h2>
                </div>

                <button
                  ref={closeButtonRef}
                  onClick={onClose}
                  aria-label="Close overlay"
                  className="flex items-center justify-center text-white font-medium rounded-full transition-all hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white/70 outline-none backdrop-blur-sm"
                  style={{
                    width: 44,
                    height: 44,
                    background: "rgba(255,255,255,0.15)",
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              {/* Filters */}
              <AnimatePresence>
                {!activeExperience && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 ml-1 flex gap-2 overflow-x-auto pb-2 scrollbar-hide no-scrollbar"
                  >
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.value}
                        onClick={() => setSelectedFilter(cat.value as "leadership" | "work")}
                        className={`shrink-0 px-4 py-2 rounded-full font-inter text-sm font-semibold transition-all border outline-none focus-visible:ring-2 focus-visible:ring-white/50 tracking-wider ${selectedFilter === cat.value
                            ? "bg-[#E7B603] text-white border-transparent shadow-md"
                            : "bg-white/10 text-white/80 border-white/20 hover:bg-white/20 hover:text-white"
                          }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </header>

            {/* Scrollable Content */}
            <div
              className="relative z-10 mx-6 mb-6 flex-1 overflow-hidden rounded-[24px] border border-black/5 shadow-inner bg-[#F8F9FA]"
            >
              <div className="h-full overflow-y-auto px-6 py-8 md:px-10 md:py-12">
                <AnimatePresence mode="wait">
                  {activeExperience ? (
                    <ExperienceDetail
                      key="detail"
                      experience={activeExperience}
                      onBack={() => setActiveExperience(null)}
                    />
                  ) : (
                    <motion.div
                      key="timeline"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ExperienceTimeline
                        experiences={filteredExperiences}
                        onExperienceClick={setActiveExperience}
                        groupByOrg={selectedFilter === "leadership"}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
