import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface AboutMePopoverProps {
  title: string;
  description: string;
  image: string;
  onClose: () => void;
}

export default function AboutMePopover({
  title,
  description,
  image,
  onClose,
}: AboutMePopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const updateScrollState = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    
    // Add a small threshold to avoid precision issues
    setCanScrollUp(scrollTop > 1);
    setCanScrollDown(Math.ceil(scrollTop + clientHeight) < scrollHeight - 1);
  };

  useEffect(() => {
    updateScrollState();
    // Add resize listener in case container size changes
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, [description]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      ref={popoverRef}
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.82, y: 18 }}
      animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 10 }}
      transition={{
        type: prefersReducedMotion ? "tween" : "spring",
        stiffness: 420,
        damping: 24,
        mass: 0.8,
        duration: prefersReducedMotion ? 0.2 : undefined,
      }}
      className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-[234px] sm:w-[280px] aspect-[234/244] origin-bottom z-50 flex items-center justify-center"
      role="dialog"
      aria-labelledby="about-me-title"
      aria-modal="true"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full drop-shadow-lg">
        <Image
          src={image}
          alt=""
          fill
          priority
          className="object-contain"
        />
      </div>

      {/* Content Area */}
      <div className="relative z-10 w-[85%] h-[75%] mb-4 flex flex-col pt-4 px-4 pb-2">
        <h2
          id="about-me-title"
          className="font-inter font-semibold text-lg text-black/90 mb-2 shrink-0"
        >
          {title}
        </h2>
        
        {/* Scrollable area wrapper */}
        <div className="relative flex-1 overflow-hidden">
          
          {/* Top Fade Mask */}
          <div 
            className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-[#F2F2F2] to-transparent pointer-events-none z-20 transition-opacity duration-300"
            style={{ opacity: canScrollUp ? 1 : 0 }}
            aria-hidden="true"
          />

          <div 
            ref={scrollRef}
            onScroll={updateScrollState}
            className="h-full overflow-y-auto pr-2 scrollbar-none [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            <p className="font-inter text-xs text-black/80 leading-relaxed whitespace-pre-wrap pb-4">
              {description}
            </p>
          </div>

          {/* Bottom Fade Mask */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#F2F2F2] via-[#F2F2F2]/80 to-transparent pointer-events-none z-20 transition-opacity duration-300 flex justify-center items-end pb-1"
            style={{ opacity: canScrollDown ? 1 : 0 }}
            aria-hidden="true"
          >
            {/* Scroll Affordance Indicator inside the bottom fade mask */}
            <motion.div
              animate={canScrollDown && !prefersReducedMotion ? { y: [0, 3, 0] } : { y: 0 }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5, 
                ease: "easeInOut" 
              }}
              className="text-black/30"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
