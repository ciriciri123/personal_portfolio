"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { RESEARCH_DATA, type ResearchWork, type ResearchCategory } from "@/data/researchData";
import { ResearchGrid } from "./ResearchGrid";
import { ResearchDetail } from "./ResearchDetail";

interface ResearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES: { label: string; value: ResearchCategory | "All" }[] = [
  { label: "All", value: "All" },
  { label: "Machine Learning & AI", value: "Machine Learning & AI" },
  { label: "Biomedical / Life Science", value: "Biomedical / Life Science" }
];

export function ResearchOverlay({ isOpen, onClose }: ResearchOverlayProps) {
  const shouldReduce = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  
  const [selectedFilter, setSelectedFilter] = useState<ResearchCategory | "All">("All");
  const [activeResearch, setActiveResearch] = useState<ResearchWork | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const t = setTimeout(() => closeButtonRef.current?.focus(), 50);
      return () => clearTimeout(t);
    } else {
      document.body.style.overflow = "";
      setTimeout(() => {
        setActiveResearch(null);
        setSelectedFilter("All");
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
        if (activeResearch) {
          setActiveResearch(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose, activeResearch]);

  const filteredResearch = selectedFilter === "All" 
    ? RESEARCH_DATA 
    : RESEARCH_DATA.filter(r => r.category === selectedFilter);

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
            onClick={() => { if (!activeResearch) onClose(); }}
            aria-hidden
          />

          <motion.div
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="research-overlay-title"
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
            {/* Background SVG */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/assets/FolderBackground_green.svg"
                alt=""
                fill
                style={{ objectFit: "fill" }}
                priority
              />
            </div>

            {/* Header */}
            <header className="relative z-10 flex flex-col px-8 pt-8 pb-4 shrink-0">
              <div className="flex items-start justify-between">
                <div>
                  <h2
                    id="research-overlay-title"
                    className="font-inter font-bold text-white leading-none drop-shadow-sm ml-1"
                    style={{ fontSize: "clamp(40px, 5vw, 64px)" }}
                  >
                    RESEARCH
                  </h2>
                  <p className="text-white/80 font-inter font-medium mt-2 ml-2 text-sm sm:text-base tracking-wide">
                    A collection of questions I've explored through research.
                  </p>
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
                {!activeResearch && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 ml-1 flex gap-2 overflow-x-auto pb-2 scrollbar-hide no-scrollbar"
                  >
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.value}
                        onClick={() => setSelectedFilter(cat.value)}
                        className={`shrink-0 px-4 py-2 rounded-full font-inter text-sm font-semibold transition-all border outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
                          selectedFilter === cat.value
                            ? "bg-[#277C57] text-white border-transparent shadow-md"
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
                  {activeResearch ? (
                    <ResearchDetail 
                      key="detail" 
                      research={activeResearch} 
                      onBack={() => setActiveResearch(null)} 
                    />
                  ) : (
                    <motion.div
                      key="grid"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ResearchGrid 
                        researchItems={filteredResearch} 
                        onItemClick={setActiveResearch} 
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
