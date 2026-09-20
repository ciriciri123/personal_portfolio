"use client";

import Image from "next/image";
import type { Project } from "@/data/projectsData";
import { motion } from "motion/react";

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const featuredMedia = project.media?.[0];
  const isVideo = featuredMedia?.type === "video";

  return (
    <motion.button
      onClick={() => onClick(project)}
      className="group block w-full text-left bg-white rounded-2xl overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-[#7C2827]"
      style={{
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.04)"
      }}
      whileHover={{ y: -4, scale: 1.01, boxShadow: "0 12px 30px rgba(0,0,0,0.08)" }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
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
              alt={featuredMedia.alt || project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-black/30 font-inter text-sm">
            No preview
          </div>
        )}
        
        {project.media && project.media.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-white/90 text-xs font-medium flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            {project.media.length}
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="font-inter font-bold text-[22px] leading-tight text-black/90 group-hover:text-[#7C2827] transition-colors">
          {project.title}
        </h3>
        <p className="font-inter text-sm text-black/50 mt-1.5 font-medium">
          {project.type}
        </p>
        
        <p className="font-inter text-[15px] leading-relaxed text-black/70 mt-3 line-clamp-2">
          {project.oneLineProblem}
        </p>

        {project.outcome && project.outcome.length > 0 && (
          <div className="mt-4 pt-4 border-t border-black/5 flex items-start gap-2 text-sm text-[#7C2827] font-medium">
            <svg className="shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="line-clamp-1">{project.outcome[0]}</span>
          </div>
        )}

        <div className="mt-5 flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5 overflow-hidden flex-1 h-[26px]">
            {project.technologies.slice(0, 3).map((tech) => (
              <span key={tech} className="whitespace-nowrap px-2.5 py-1 rounded-full bg-black/5 text-black/60 text-[11px] font-medium tracking-wide">
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="whitespace-nowrap px-2.5 py-1 rounded-full bg-black/5 text-black/60 text-[11px] font-medium tracking-wide">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-1.5 text-[#7C2827] font-semibold text-[13px] ml-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1">
            View Case Study
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
