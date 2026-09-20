"use client";

import Image from "next/image";
import type { Certificate } from "@/data/certificatesData";
import { motion } from "motion/react";

interface CertificateCardProps {
  certificate: Certificate;
  onClick: (certificate: Certificate) => void;
}

export function CertificateCard({ certificate, onClick }: CertificateCardProps) {
  const featuredMedia = certificate.media?.[0];

  return (
    <motion.button
      onClick={() => onClick(certificate)}
      className="group block w-full text-left bg-white rounded-2xl overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-[#46277C]"
      style={{
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.04)"
      }}
      whileHover={{ y: -4, scale: 1.01, boxShadow: "0 12px 30px rgba(0,0,0,0.08)" }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {/* Image area */}
      <div className="relative w-full aspect-[4/3] bg-black/5 overflow-hidden flex items-center justify-center p-4">
        {featuredMedia ? (
          <div className="relative w-full h-full shadow-md rounded-md overflow-hidden bg-white">
            <Image
              src={featuredMedia.src}
              alt={featuredMedia.alt || certificate.title}
              fill
              className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-black/30 font-inter text-sm">
            No preview
          </div>
        )}

        {certificate.media && certificate.media.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-white/90 text-xs font-medium flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            {certificate.media.length} pages
          </div>
        )}
      </div>

      {/* Content area */}
      <div className="p-6">
        <h3 className="font-inter font-bold text-[20px] leading-tight text-black/90 group-hover:text-[#46277C] transition-colors line-clamp-2">
          {certificate.title}
        </h3>
        <p className="font-inter text-sm text-black/60 mt-2 font-medium">
          {certificate.issuer}
        </p>

        {certificate.focus && certificate.focus.length > 0 && (
          <p className="font-inter text-[14px] leading-relaxed text-black/70 mt-3 line-clamp-1">
            {certificate.focus.join(" · ")}
          </p>
        )}

        <div className="mt-5 pt-4 border-t border-black/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className={`font-inter text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md ${
              certificate.type === "Qualification" 
                ? "bg-[#46277C]/10 text-[#46277C]" 
                : "bg-black/5 text-black/60"
            }`}>
              {certificate.type}
            </span>
            {certificate.date && (
              <span className="font-inter text-[13px] font-medium text-black/40">
                {certificate.date}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-[#46277C] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="11" y1="8" x2="11" y2="14"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
          </div>
        </div>
      </div>
    </motion.button>
  );
}
