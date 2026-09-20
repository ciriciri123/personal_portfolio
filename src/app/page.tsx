"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { FolderCard } from "@/components/FolderCard";
import { NavDock } from "@/components/NavDock";
import { CategoryOverlay } from "@/components/CategoryOverlay";
import { ProjectsOverlay } from "@/components/ProjectsOverlay";
import { ResearchOverlay } from "@/components/ResearchOverlay";
import { CertificatesOverlay } from "@/components/CertificatesOverlay";
import { ExperienceOverlay } from "@/components/ExperienceOverlay";
import { CATEGORY_DATA, type CategoryKey } from "@/data/portfolioContent";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Entrance animation variants
  const heroVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" as const } 
    }
  };

  return (
    <main
      className="relative w-screen min-h-screen xl:h-screen xl:overflow-hidden bg-cover bg-center overflow-x-hidden overflow-y-auto pb-32 xl:pb-0"
      style={{
        backgroundImage: "url('/assets/BackgroundPortfolio.webp')",
      }}
    >
      {/* Name Display (hero text) */}
      <motion.div
        className="xl:absolute w-full px-4 xl:w-auto text-center pt-12 xl:pt-0 xl:top-[6%] xl:left-1/2 xl:-translate-x-1/2 flex flex-col items-center"
        initial="hidden"
        animate="visible"
        variants={heroVariants}
      >
        <div className="relative inline-block">
          <span
            className="relative inline-block z-10 font-inter font-semibold text-black leading-none"
            style={{ fontSize: "clamp(72px, 10vw, 140px)", transform: "rotate(-4.52deg)" }}
          >
            Riccy
          </span>
          {/* lime-green highlight bar */}
          <span
            aria-hidden
            className="absolute inset-x-0 top-[10%] z-0"
            style={{ height: "90%", background: "#CCFF00", transform: "rotate(-4.52deg)" }}
          />
        </div>

        <div className="text-right xl:text-left">
          <span
            className="font-inter inline-block font-semibold text-black leading-none xl:ml-80"
            style={{ fontSize: "clamp(64px, 9vw, 128px)", transform: "rotate(2.79deg)" }}
          >
            Riandy
          </span>
        </div>

        <div className="text-center xl:text-left -mt-4 xl:-mt-8">
          <span
            className="font-inter inline-block font-semibold text-black leading-none xl:ml-0"
            style={{ fontSize: "clamp(60px, 8.5vw, 120px)", transform: "rotate(5.24deg)" }}
          >
            Intan
          </span>
        </div>

        <p
          className="font-inter font-normal text-black/80 mt-2 text-center xl:text-left xl:ml-2"
          style={{ fontSize: "clamp(14px, 1.5vw, 22px)" }}
        >
          Personal Portfolio
        </p>
      </motion.div>

      {/* Folder Grid */}
      <div className="mt-16 xl:mt-0 px-4 grid grid-cols-1 md:grid-cols-2 gap-8 xl:block max-w-4xl mx-auto w-full xl:max-w-none">
        
        {/* Projects */}
        <div className="xl:absolute flex justify-center xl:block xl:top-[25%] xl:left-[5%]">
          <FolderCard
            backFolderSrc="/assets/BackFolder_red.svg"
            accentRgb="124,40,39"
            category="Projects"
            onClick={() => setActiveCategory("projects")}
          />
        </div>

        {/* Certificates */}
        <div className="xl:absolute flex justify-center xl:block xl:top-[33%] xl:right-[4%]">
          <FolderCard
            backFolderSrc="/assets/BackFolder_purplesvg.svg"
            accentRgb="70,39,124"
            category="Certificates"
            onClick={() => setActiveCategory("certificates")}
          />
        </div>

        {/* Experience */}
        <div className="xl:absolute flex justify-center xl:block xl:top-[50%] xl:left-[26%]">
          <FolderCard
            backFolderSrc="/assets/BackFolder_yellow.svg"
            accentRgb="231,182,3"
            category="Experience"
            onClick={() => setActiveCategory("experience")}
          />
        </div>

        {/* Research */}
        <div className="xl:absolute flex justify-center xl:block xl:top-[53%] xl:left-[60%]">
          <FolderCard
            backFolderSrc="/assets/BackFolder_green.svg"
            accentRgb="39,124,87"
            category="Research"
            onClick={() => setActiveCategory("research")}
          />
        </div>

      </div>

      <NavDock />

      <CategoryOverlay
        isOpen={activeCategory !== null && activeCategory !== "projects" && activeCategory !== "research" && activeCategory !== "certificates" && activeCategory !== "experience"}
        data={activeCategory && activeCategory !== "projects" && activeCategory !== "research" && activeCategory !== "certificates" && activeCategory !== "experience" ? CATEGORY_DATA[activeCategory] : null}
        onClose={() => setActiveCategory(null)}
      />

      <ProjectsOverlay
        isOpen={activeCategory === "projects"}
        onClose={() => setActiveCategory(null)}
      />

      <ResearchOverlay
        isOpen={activeCategory === "research"}
        onClose={() => setActiveCategory(null)}
      />

      <CertificatesOverlay
        isOpen={activeCategory === "certificates"}
        onClose={() => setActiveCategory(null)}
      />

      <ExperienceOverlay
        isOpen={activeCategory === "experience"}
        onClose={() => setActiveCategory(null)}
      />
    </main>
  );
}
