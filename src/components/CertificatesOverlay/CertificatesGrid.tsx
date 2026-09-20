"use client";

import { motion } from "motion/react";
import type { Certificate } from "@/data/certificatesData";
import { CertificateCard } from "./CertificateCard";

interface CertificatesGridProps {
  certificates: Certificate[];
  onCertificateClick: (certificate: Certificate) => void;
}

export function CertificatesGrid({ certificates, onCertificateClick }: CertificatesGridProps) {
  if (certificates.length === 0) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="font-inter text-black/50 text-sm font-medium">No certificates found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-[1400px] mx-auto pb-12">
      {certificates.map((cert, index) => (
        <motion.div
          key={cert.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
          className="flex"
        >
          <CertificateCard certificate={cert} onClick={onCertificateClick} />
        </motion.div>
      ))}
    </div>
  );
}
