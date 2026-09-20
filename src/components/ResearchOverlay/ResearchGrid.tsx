"use client";

import type { ResearchWork } from "@/data/researchData";
import { ResearchCard } from "./ResearchCard";
import { motion } from "motion/react";

interface ResearchGridProps {
  researchItems: ResearchWork[];
  onItemClick: (research: ResearchWork) => void;
}

export function ResearchGrid({ researchItems, onItemClick }: ResearchGridProps) {
  if (researchItems.length === 0) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="font-inter text-black/50 text-sm">No research items found for this category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[1300px] mx-auto pb-12">
      {researchItems.map((research, index) => (
        <motion.div
          key={research.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
          className="flex"
        >
          <ResearchCard research={research} onClick={onItemClick} />
        </motion.div>
      ))}
    </div>
  );
}
