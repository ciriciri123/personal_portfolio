"use client";

import type { Project } from "@/data/projectsData";
import { ProjectCard } from "./ProjectCard";
import { motion } from "motion/react";

interface ProjectsGridProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

export function ProjectsGrid({ projects, onProjectClick }: ProjectsGridProps) {
  if (projects.length === 0) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="font-inter text-black/50 text-sm">No projects found for this category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-[1200px] mx-auto pb-12">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
        >
          <ProjectCard project={project} onClick={onProjectClick} />
        </motion.div>
      ))}
    </div>
  );
}
