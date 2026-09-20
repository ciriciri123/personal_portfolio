"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import type { Certificate, CertificateMedia } from "@/data/certificatesData";

interface CertificateDetailProps {
  certificate: Certificate;
  onBack: () => void;
}

export function CertificateDetail({ certificate, onBack }: CertificateDetailProps) {
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const activeMedia = certificate.media?.[activeMediaIndex];

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
        Back to Certificates
      </button>

      <header className="mb-10">
        <h1 className="font-inter font-bold text-3xl lg:text-5xl text-black/90 leading-tight mb-4">
          {certificate.title}
        </h1>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-black/60 font-medium text-sm md:text-base">
          <span className="font-semibold text-black/80">{certificate.issuer}</span>
          {certificate.date && <span>&middot;</span>}
          {certificate.date && <span>{certificate.date}</span>}
          <span>&middot;</span>
          <span className={`font-inter text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md ${
            certificate.type === "Qualification" 
              ? "bg-[#46277C]/10 text-[#46277C]" 
              : "bg-black/5 text-black/60"
          }`}>
            {certificate.type}
          </span>
        </div>
      </header>

      {/* Media Gallery */}
      {certificate.media && certificate.media.length > 0 && (
        <section className="mb-12">
          <div className="relative w-full min-h-[400px] md:min-h-[600px] bg-black/5 rounded-2xl overflow-hidden mb-4 border border-black/10 flex items-center justify-center p-4 md:p-8 shadow-inner">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMediaIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full min-h-[350px] md:min-h-[550px] shadow-lg rounded-xl overflow-hidden bg-white"
              >
                {activeMedia.type === "pdf" ? (
                  <iframe
                    src={activeMedia.src}
                    className="w-full h-full min-h-[550px] border-none"
                    title={activeMedia.alt || certificate.title}
                  />
                ) : (
                  <Image
                    src={activeMedia.src}
                    alt={activeMedia.alt || certificate.title}
                    fill
                    className="object-contain"
                  />
                )}
              </motion.div>
            </AnimatePresence>
            
            {activeMedia.caption && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md px-4 py-2 rounded-lg text-white/95 text-xs font-medium text-center shadow-xl z-10">
                {activeMedia.caption}
              </div>
            )}
          </div>
          
          {/* Thumbnails for multi-page certificates */}
          {certificate.media.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-4 pt-2 snap-x justify-center">
              {certificate.media.map((media: CertificateMedia, idx: number) => (
                <button
                  key={media.id || idx}
                  onClick={() => setActiveMediaIndex(idx)}
                  className={`relative shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 snap-start transition-all bg-white shadow-sm ${
                    idx === activeMediaIndex ? "border-[#46277C] opacity-100 ring-2 ring-[#46277C]/20 ring-offset-1" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  {media.type === "pdf" ? (
                    <div className="w-full h-full flex flex-col items-center justify-center text-black/40 bg-black/5">
                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                       <span className="text-[9px] mt-1 font-bold">Page {idx + 1}</span>
                    </div>
                  ) : (
                    <Image src={media.src} alt="" fill className="object-cover" />
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
          
          {certificate.description && (
            <section>
              <h2 className="text-lg font-bold text-black/90 mb-4 border-b border-black/10 pb-2">Overview</h2>
              <p className="font-inter text-[15px] text-black/70 leading-relaxed whitespace-pre-wrap">
                {certificate.description}
              </p>
            </section>
          )}

          {certificate.focus && certificate.focus.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-black/90 mb-4 border-b border-black/10 pb-2">Focus & Relevance</h2>
              <ul className="list-disc list-outside ml-5 space-y-2 text-[15px] text-black/70 leading-relaxed font-medium">
                {certificate.focus.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>
          )}

        </div>

        {/* Sidebar Metadata & Resources */}
        <aside className="space-y-8">
          
          <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm space-y-8">
            
            {certificate.verificationUrl && (
              <section>
                <a
                  href={certificate.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-[#46277C] hover:bg-[#3b2168] text-white rounded-xl font-semibold text-[14px] transition-colors shadow-md"
                >
                  Verify Credential
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </section>
            )}

            {certificate.resources && certificate.resources.length > 0 && (
              <section>
                <h3 className="text-[11px] font-bold text-black/40 uppercase tracking-widest mb-4">Related Resources</h3>
                <div className="flex flex-col gap-3">
                  {certificate.resources.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="group flex flex-col p-3 rounded-xl border border-black/10 hover:border-[#46277C]/50 hover:bg-[#46277C]/5 transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <div className="shrink-0 mt-0.5 text-black/40 group-hover:text-[#46277C] transition-colors">
                          {link.type === "credential" || link.type === "verification" ? (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                          ) : link.type === "document" ? (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                          ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-semibold text-black/80 group-hover:text-[#46277C] transition-colors line-clamp-2 leading-tight pr-4">
                            {link.label}
                            {link.external && (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="inline-block ml-1 text-black/30 group-hover:text-[#46277C] transition-colors"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
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
