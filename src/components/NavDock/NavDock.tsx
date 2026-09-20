"use client";

import Image from "next/image";
import { motion } from "motion/react";

interface NavItem {
  label: string;
  iconSrc: string;
  href: string;
  download?: string; // filename for download links
}

const NAV_ITEMS: NavItem[] = [
  { label: "About me",  iconSrc: "/assets/aboutMeIcon.svg",    href: "/about" },
  { label: "CV",         iconSrc: "/assets/cv_icon.svg",        href: "/assets/CV/Riccy Riandy Intan_CV_ATS.pdf", download: "Riccy_Riandy_Intan_CV.pdf" },
  { label: "GitHub",     iconSrc: "/assets/github_logo.svg",    href: "https://github.com/ciriciri123" },
  { label: "Mail me",    iconSrc: "/assets/mail_logo.svg",      href: "mailto:riccyriandy@gmail.com" },
  { label: "LinkedIn",   iconSrc: "/assets/linkedin_logo.svg",  href: "https://www.linkedin.com/in/riccy-riandy-intan-b8b461325" },
];

export default function NavDock() {
  return (
    <nav
      aria-label="Main navigation"
      className="fixed bottom-0 md:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6 md:gap-10 py-3 px-6 md:px-8 rounded-t-3xl md:rounded-full bg-white/18 backdrop-blur-xl saturate-150 border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.12)] z-[100]"
    >
      {NAV_ITEMS.map((item) => (
        <DockItem key={item.label} {...item} />
      ))}
    </nav>
  );
}

function DockItem({ label, iconSrc, href, download }: NavItem) {
  const isExternal = href.startsWith("http");
  const isMailto = href.startsWith("mailto:");

  return (
    <motion.a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      download={download || undefined}
      aria-label={label}
      whileHover={{ scale: 1.18, y: -4 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className="flex flex-col items-center gap-1.5 no-underline outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-xl"
    >
      <div className="relative w-10 h-10 md:w-[52px] md:h-[52px]">
        <Image
          src={iconSrc}
          alt=""
          aria-hidden
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
      <span className="font-inter font-medium text-[10px] md:text-xs text-black/75 tracking-[0.01em] whitespace-nowrap">
        {label}
      </span>
    </motion.a>
  );
}

