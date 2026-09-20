"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import Image from "next/image";
import type { CategoryData } from "@/data/portfolioContent";
import { CategoryItemGrid } from "./CategoryItemGrid";

interface CategoryOverlayProps {
  isOpen: boolean;
  data: CategoryData | null;
  onClose: () => void;
}

export default function CategoryOverlay({ isOpen, data, onClose }: CategoryOverlayProps) {
  const shouldReduce = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  // Lock body scroll + move focus into the panel while open
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      const t = setTimeout(() => closeButtonRef.current?.focus(), 50);
      return () => clearTimeout(t);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Escape key closes the overlay
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && data && (
        <>
          {/* ── Backdrop ───────────────────────────────────────────── */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[150]"
            style={{ background: "rgba(0,0,0,0.3)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" as const }}
            onClick={onClose}
            aria-hidden
          />

          {/* ── Panel (slides up from bottom) ─────────────────────── */}
          <motion.div
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="category-overlay-title"
            className="fixed inset-x-0 bottom-0 z-[151] mx-auto overflow-hidden"
            style={{
              maxWidth: "min(1380px, 100%)",
              width: "100%",
              height: "clamp(88vh, 88vh, 100dvh)",
              borderTopLeftRadius: 28,
              borderTopRightRadius: 28,
            }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={
              shouldReduce
                ? { duration: 0.2 }
                : { type: "spring", stiffness: 300, damping: 32, mass: 0.9 }
            }
          >
            {/* ── Layer 1: Folder SVG background (fills entire panel) ── */}
            <div className="absolute inset-0 z-0">
              <Image
                src={data.backgroundSvg}
                alt=""
                aria-hidden
                fill
                style={{ objectFit: "fill" }}
                priority
              />
            </div>

            {/* ── Layer 2: Header — label + close button ─────────────── */}
            <div className="relative z-10 flex items-center justify-between px-7 pt-6 pb-3 shrink-0">
              <h2
                id="category-overlay-title"
                className="font-inter font-semibold text-white leading-tight drop-shadow-md ml-10  p-0 mb-0 h-30"
                style={{ fontSize: "clamp(34px, 4vw, 54px)", maxWidth: "30%" }}
              >
                {data.label}
              </h2>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                aria-label="Close overlay"
                className="flex items-center justify-center text-white font-semibold text-base rounded-full transition-colors hover:bg-white/30 focus-visible:ring-2 focus-visible:ring-white/70 outline-none"
                style={{
                  width: 40,
                  height: 40,
                  background: "rgba(255,255,255,0.20)",
                  flexShrink: 0,
                }}
              >
                ✕
              </button>
            </div>

            {/* ── Layer 3: Neutral scrollable content card ───────────── */}
            <div className="relative z-10 mx-9 mb-4 mt-2 flex-1 overflow-hidden rounded-2xl border border-black/10"
              style={{
                background: "rgba(240,240,240,0.96)",
                height: "calc(100% - 90px)",
              }}
            >
              <div className="h-full overflow-y-auto px-6 py-6">
                <CategoryItemGrid items={data.items} />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
