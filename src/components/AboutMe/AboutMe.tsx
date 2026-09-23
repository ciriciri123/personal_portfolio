import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import AboutMePopover from "./AboutMePopover";
import { aboutMeData } from "@/data/about";

interface AboutMeProps {
  label: string;
  iconSrc: string;
}

export default function AboutMe({ label, iconSrc }: AboutMeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative flex items-center justify-center" ref={containerRef}>
      <AnimatePresence>
        {isOpen && (
          <AboutMePopover
            title={aboutMeData.title}
            description={aboutMeData.description}
            image="/assets/aboutMe_TextBox.svg"
            onClose={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-label={label}
        aria-expanded={isOpen}
        aria-controls="about-me-popover"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.18, y: -4 }}
        whileTap={{ scale: 0.94 }}
        animate={
          isOpen
            ? { scale: 1.05, y: -2, filter: "brightness(1.1)" }
            : { scale: 1, y: 0, filter: "brightness(1)" }
        }
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        className="flex flex-col items-center gap-1.5 outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-xl bg-transparent border-none cursor-pointer p-0 m-0"
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
      </motion.button>
    </div>
  );
}
