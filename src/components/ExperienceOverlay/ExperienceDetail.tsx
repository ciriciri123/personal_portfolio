"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import type { ExperienceItem, ExperienceMedia } from "@/data/experienceData";

interface ExperienceDetailProps {
  experience: ExperienceItem;
  onBack: () => void;
}

export function ExperienceDetail({ experience, onBack }: ExperienceDetailProps) {
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const activeMedia = experience.media?.[activeMediaIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="max-w-[1000px] mx-auto pb-24"
    >
      <button
        onClick={onBack}
        className="group flex items-center gap-2 text-black/60 hover:text-black transition-colors mb-8 text-sm font-medium"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-1">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back to Experience
      </button>

      <header className="mb-10">
        <h1 className="font-inter font-bold text-3xl lg:text-5xl text-black/90 leading-tight mb-4">
          {experience.role}
        </h1>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-black/60 font-medium text-sm md:text-base">
          <span className="font-semibold text-black/80">{experience.organization}</span>
          <span>&middot;</span>
          <span>{experience.duration}</span>
          <span>&middot;</span>
          <span className="font-inter text-[11px] font-bold text-[#E7B603] bg-[#E7B603]/10 px-2.5 py-1 rounded-md uppercase tracking-wider">
            {experience.kind === "leadership" ? "Leadership" : "Work"}
          </span>
        </div>
      </header>

      {/* Media Gallery */}
      {experience.media && experience.media.length > 0 && (
        <section className="mb-12">
          <div className="relative w-full aspect-video bg-black/5 rounded-2xl overflow-hidden mb-4 border border-black/10">
            <AnimatePresence mode="wait">
              {activeMedia && (
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
                    alt={activeMedia.alt || experience.role}
                    fill
                    className="object-contain bg-black/90"
                  />
                )}
              </motion.div>
              )}
            </AnimatePresence>
            
            {activeMedia?.caption && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md px-4 py-2 rounded-lg text-white/95 text-xs font-medium text-center shadow-xl z-10">
                {activeMedia.caption}
              </div>
            )}
          </div>
          
          {/* Thumbnails */}
          {experience.media.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 snap-x">
              {experience.media.map((media: ExperienceMedia, idx: number) => (
                <button
                  key={media.id || idx}
                  onClick={() => setActiveMediaIndex(idx)}
                  className={`relative shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 snap-start transition-all ${
                    idx === activeMediaIndex ? "border-[#E7B603] opacity-100" : "border-transparent opacity-60 hover:opacity-100"
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

      {/* Grid Layout for Editorial Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Main Content */}
        <div className="md:col-span-2 space-y-10">
          
          {experience.scope && experience.scope.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-black/90 mb-4 border-b border-black/10 pb-2">Scope</h2>
              <ul className="list-disc list-outside ml-5 space-y-2 text-[15px] text-black/70 leading-relaxed font-medium">
                {experience.scope.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {experience.responsibilities && experience.responsibilities.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-black/90 mb-4 border-b border-black/10 pb-2">What I Did</h2>
              <ul className="list-disc list-outside ml-5 space-y-2 text-[15px] text-black/70 leading-relaxed">
                {experience.responsibilities.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {experience.challenge && (
            <section>
              <h2 className="text-lg font-bold text-black/90 mb-4 border-b border-black/10 pb-2">Challenge & Context</h2>
              <p className="font-inter text-[15px] text-black/70 leading-relaxed whitespace-pre-wrap">
                {experience.challenge}
              </p>
            </section>
          )}

          {experience.actions && experience.actions.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-black/90 mb-4 border-b border-black/10 pb-2">Key Actions</h2>
              <ul className="list-disc list-outside ml-5 space-y-2 text-[15px] text-black/70 leading-relaxed">
                {experience.actions.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>
          )}
          
          {experience.contributions && experience.contributions.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-black/90 mb-4 border-b border-black/10 pb-2">Key Contributions</h2>
              <ul className="list-disc list-outside ml-5 space-y-2 text-[15px] text-black/70 leading-relaxed">
                {experience.contributions.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {experience.outcome && experience.outcome.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-black/90 mb-4 border-b border-black/10 pb-2">Outcome</h2>
              <ul className="list-disc list-outside ml-5 space-y-2 text-[15px] text-[#E7B603] font-medium leading-relaxed">
                {experience.outcome.map((item, idx) => (
                  <li key={idx}><span className="text-black/80 font-normal">{item}</span></li>
                ))}
              </ul>
            </section>
          )}

          {experience.reflection && (
            <section>
              <h2 className="text-lg font-bold text-black/90 mb-4 border-b border-black/10 pb-2">Reflection</h2>
              <p className="font-inter text-[15px] text-black/70 leading-relaxed whitespace-pre-wrap italic bg-black/5 p-4 rounded-xl border border-black/10">
                "{experience.reflection}"
              </p>
            </section>
          )}

        </div>

        {/* Sidebar Metadata & Resources */}
        <aside className="space-y-8">
          
          <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm space-y-8">
            
            {experience.skills && experience.skills.length > 0 && (
              <section>
                <h3 className="text-[11px] font-bold text-black/40 uppercase tracking-widest mb-4">Skills & Focus</h3>
                <div className="flex flex-wrap gap-2">
                  {experience.skills.map((skill, idx) => (
                    <span key={idx} className="bg-black/5 text-black/70 px-3 py-1.5 rounded-lg text-[13px] font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {experience.resources && experience.resources.length > 0 && (
              <section>
                <h3 className="text-[11px] font-bold text-black/40 uppercase tracking-widest mb-4">Related Resources</h3>
                <div className="flex flex-col gap-3">
                  {experience.resources.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="group flex flex-col p-3 rounded-xl border border-black/10 hover:border-[#E7B603]/50 hover:bg-[#E7B603]/5 transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <div className="shrink-0 mt-0.5 text-black/40 group-hover:text-[#E7B603] transition-colors">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-semibold text-black/80 group-hover:text-[#E7B603] transition-colors line-clamp-2 leading-tight pr-4">
                            {link.label}
                            {link.external && (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="inline-block ml-1 text-black/30 group-hover:text-[#E7B603] transition-colors"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                            )}
                          </p>
                        </div>
                      </div>
                      {link.description && (
                        <p className="text-[12px] text-black/50 mt-2 font-medium leading-snug">
                          {link.description}
                        </p>
                      )}
                    </a>
                  ))}
                </div>
              </section>
            )}
          </div>
          
        </aside>

      </div>
    </motion.div>
  );
}
