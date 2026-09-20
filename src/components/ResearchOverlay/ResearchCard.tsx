"use client";

import Image from "next/image";
import type { ResearchWork } from "@/data/researchData";
import { motion } from "motion/react";

interface ResearchCardProps {
  research: ResearchWork;
  onClick: (research: ResearchWork) => void;
}

export function ResearchCard({ research, onClick }: ResearchCardProps) {
  const featuredMedia = research.media?.[0];
  const isVideo = featuredMedia?.type === "video";

  return (
    <motion.button
      onClick={() => onClick(research)}
      className="group block w-full text-left bg-white rounded-2xl overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-[#277C57]"
      style={{
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.04)"
      }}
      whileHover={{ y: -4, scale: 1.01, boxShadow: "0 12px 30px rgba(0,0,0,0.08)" }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {/* Image area — same vertical layout as ProjectCard */}
      <div className="relative w-full aspect-[4/3] bg-black/5 overflow-hidden">
        {featuredMedia ? (
          isVideo ? (
            <video
              src={featuredMedia.src}
              poster={featuredMedia.poster}
              muted
              playsInline
              loop
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <Image
              src={featuredMedia.src}
              alt={featuredMedia.alt || research.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-black/30 font-inter text-sm">
            No preview
          </div>
        )}

        {research.media && research.media.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-white/90 text-xs font-medium flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            {research.media.length}
          </div>
        )}
      </div>

      {/* Content area — same structure as ProjectCard */}
      <div className="p-6">
        <h3 className="font-inter font-bold text-[22px] leading-tight text-black/90 group-hover:text-[#277C57] transition-colors">
          {research.title}
        </h3>
        <p className="font-inter text-sm text-black/50 mt-1.5 font-medium">
          {research.area}
        </p>

        <p className="font-inter text-[15px] leading-relaxed text-black/70 mt-3 line-clamp-2">
          {research.objective}
        </p>

        {research.findings && (
          <div className="mt-4 pt-4 border-t border-black/5 flex items-start gap-2 text-sm text-[#277C57] font-medium">
            <svg className="shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="line-clamp-1">{research.findings}</span>
          </div>
        )}

        <div className="mt-5 flex items-center justify-between">
          <span className="font-inter text-xs text-black/50 font-medium bg-black/5 px-2.5 py-1 rounded-full">
            {research.status}
          </span>

          <div className="flex items-center gap-1.5 text-[#277C57] font-semibold text-[13px] ml-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1">
            Read Paper
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>
      </div>
    </motion.button>
  );
}
