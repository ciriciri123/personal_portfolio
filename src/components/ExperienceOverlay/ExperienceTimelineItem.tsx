"use client";

import { motion } from "motion/react";
import type { ExperienceItem } from "@/data/experienceData";

interface ExperienceTimelineItemProps {
  experience: ExperienceItem;
  onClick: (experience: ExperienceItem) => void;
  index: number;
  hideOrganization?: boolean;
}

export function ExperienceTimelineItem({ experience, onClick, index, hideOrganization }: ExperienceTimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
      className="relative pl-8 md:pl-0"
    >
      {/* Timeline dot */}
      <div className="absolute left-0 md:left-[150px] top-6 w-[9px] h-[9px] rounded-full bg-white border-[2px] border-black/30 translate-x-[11px] md:translate-x-[2px] z-10"></div>

      <div className="flex flex-col md:flex-row gap-4 md:gap-12 relative z-0 group">
        
        {/* Date / Duration Sidebar */}
        <div className="md:w-[130px] shrink-0 pt-4 md:text-right">
          <span className="font-inter text-sm font-bold text-black/50 group-hover:text-[#E7B603] transition-colors">
            {experience.duration}
          </span>
        </div>

        {/* Card Content */}
        <button
          onClick={() => onClick(experience)}
          className="flex-1 text-left bg-white rounded-2xl p-6 md:p-8 outline-none focus-visible:ring-2 focus-visible:ring-[#E7B603] transition-all hover:bg-[#FAFAFA]"
          style={{
            border: "1px solid rgba(0,0,0,0.06)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.03)"
          }}
        >
          <h3 className="font-inter font-bold text-[20px] md:text-[22px] leading-tight text-black/90 group-hover:text-[#E7B603] transition-colors">
            {experience.role}
          </h3>
          
          {!hideOrganization && (
            <p className="font-inter text-base text-black/60 mt-1.5 font-medium">
              {experience.organization}
            </p>
          )}

          {experience.scope && experience.scope.length > 0 && (
            <div className="mt-5 space-y-2">
              <p className="text-xs font-bold text-black/40 uppercase tracking-widest">Scope</p>
              <ul className="text-[14px] leading-relaxed text-black/70 space-y-1">
                {experience.scope.slice(0, 3).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="shrink-0 text-[#E7B603] mt-[5px]">•</span>
                    <span>{item}</span>
                  </li>
                ))}
                {experience.scope.length > 3 && (
                  <li className="text-black/40 text-xs italic mt-1">...and more details in expanded view</li>
                )}
              </ul>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between">
            <span className="font-inter text-[11px] font-bold text-black/50 bg-black/5 px-2.5 py-1 rounded-md uppercase tracking-wider">
              {experience.kind === "leadership" ? "Leadership" : "Work"}
            </span>

            <div className="flex items-center gap-1.5 text-[#E7B603] font-semibold text-[13px] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
              View Experience
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </div>
        </button>

      </div>
    </motion.div>
  );
}
