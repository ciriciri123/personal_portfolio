"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import type { Project, ProjectMedia } from "@/data/projectsData";

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

export function ProjectDetail({ project, onBack }: ProjectDetailProps) {
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const activeMedia = project.media?.[activeMediaIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="max-w-[900px] mx-auto pb-24"
    >
      <button
        onClick={onBack}
        className="group flex items-center gap-2 text-black/60 hover:text-black transition-colors mb-8 text-sm font-medium"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-1">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back to Projects
      </button>

      <header className="mb-10">
        <h1 className="font-inter font-bold text-4xl lg:text-5xl text-black/90 leading-tight mb-4">
          {project.title}
        </h1>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-black/60 font-medium">
          <span>{project.type}</span>
          {project.year && <span>&middot;</span>}
          {project.year && <span>{project.year}</span>}
        </div>
      </header>

      {/* Media Gallery */}
      {project.media && project.media.length > 0 && (
        <section className="mb-16">
          <div className="relative w-full aspect-video bg-black/5 rounded-2xl overflow-hidden mb-4 border border-black/10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMediaIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                {activeMedia.type === "video" ? (
                  <video
                    src={activeMedia.src}
                    poster={activeMedia.poster}
                    controls
                    className="w-full h-full object-contain bg-black/90"
                  />
                ) : (
                  <Image
                    src={activeMedia.src}
                    alt={activeMedia.alt || project.title}
                    fill
                    className="object-contain bg-black/90"
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Thumbnails */}
          {project.media.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 snap-x">
              {project.media.map((media: ProjectMedia, idx: number) => (
                <button
                  key={media.id || idx}
                  onClick={() => setActiveMediaIndex(idx)}
                  className={`relative shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 snap-start transition-all ${
                    idx === activeMediaIndex ? "border-[#7C2827] opacity-100" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  {media.type === "video" ? (
                    <video src={media.src} className="w-full h-full object-cover pointer-events-none" />
                  ) : (
                    <Image src={media.src} alt="" fill className="object-cover" />
                  )}
                  {media.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-12">
          {project.description && (
            <section>
              <h2 className="text-xl font-bold text-black/90 mb-4 border-b border-black/10 pb-2">Overview</h2>
              <p className="font-inter text-black/70 leading-relaxed whitespace-pre-wrap">{project.description}</p>
            </section>
          )}

          {project.oneLineProblem && (
            <section>
              <h2 className="text-xl font-bold text-black/90 mb-4 border-b border-black/10 pb-2">Problem / Goal</h2>
              <p className="font-inter text-black/70 leading-relaxed">{project.oneLineProblem}</p>
            </section>
          )}
          
          {project.process && project.process.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-black/90 mb-4 border-b border-black/10 pb-2">Process / Approach</h2>
              <ul className="list-disc list-outside ml-5 space-y-2 text-black/70 leading-relaxed">
                {project.process.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            </section>
          )}

          {project.outcome && project.outcome.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-black/90 mb-4 border-b border-black/10 pb-2">Outcome</h2>
              <ul className="list-disc list-outside ml-5 space-y-2 text-black/70 leading-relaxed font-medium">
                {project.outcome.map((item, idx) => (
                  <li key={idx} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-black/90">$1</strong>') }} />
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-10">
          {project.role && (
            <section>
              <h3 className="text-sm font-bold text-black/50 uppercase tracking-wider mb-3">My Role</h3>
              <p className="font-inter text-black/80 whitespace-pre-wrap leading-relaxed text-[15px]">{project.role}</p>
            </section>
          )}

          {project.technologies && project.technologies.length > 0 && (
            <section>
              <h3 className="text-sm font-bold text-black/50 uppercase tracking-wider mb-3">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="px-3 py-1.5 rounded-md bg-black/5 text-black/70 text-[13px] font-medium border border-black/10">
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          )}

          {project.resources && project.resources.length > 0 && (
            <section>
              <h3 className="text-sm font-bold text-black/50 uppercase tracking-wider mb-3">Resources</h3>
              <div className="flex flex-col gap-3">
                {project.resources.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-3 p-3 rounded-lg border border-black/10 hover:border-[#7C2827] hover:bg-black/5 transition-colors group"
                  >
                    <div className="shrink-0 bg-white shadow-sm p-2 rounded-md group-hover:text-[#7C2827] transition-colors">
                      {link.type === "github" ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                      ) : link.type === "report" ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-black/90 group-hover:text-[#7C2827] transition-colors truncate">{link.label}</p>
                      {link.description && <p className="text-[11px] text-black/50 truncate mt-0.5">{link.description}</p>}
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black/30 group-hover:text-[#7C2827] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </motion.div>
  );
}
