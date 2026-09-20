"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import type { ExperienceItem } from "@/data/experienceData";
import { ExperienceTimelineItem } from "./ExperienceTimelineItem";

interface ExperienceTimelineProps {
  experiences: ExperienceItem[];
  onExperienceClick: (experience: ExperienceItem) => void;
  groupByOrg?: boolean;
}

/**
 * Normalises the org name so AIESEC sub-programmes
 * (IGV, LC5LC, etc.) fall under a single "AIESEC in BINUS" group.
 */
function normaliseOrg(org: string): string {
  if (org.toLowerCase().startsWith("aiesec in binus")) return "AIESEC in BINUS";
  return org;
}

interface OrgGroup {
  organization: string;
  items: ExperienceItem[];
}

function groupByOrganization(items: ExperienceItem[]): OrgGroup[] {
  const map = new Map<string, ExperienceItem[]>();
  const order: string[] = [];

  for (const item of items) {
    const key = normaliseOrg(item.organization);
    if (!map.has(key)) {
      map.set(key, []);
      order.push(key);
    }
    map.get(key)!.push(item);
  }

  return order.map((org) => ({ organization: org, items: map.get(org)! }));
}

export function ExperienceTimeline({ experiences, onExperienceClick, groupByOrg = false }: ExperienceTimelineProps) {
  const groups = useMemo(() => (groupByOrg ? groupByOrganization(experiences) : null), [experiences, groupByOrg]);

  if (experiences.length === 0) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="font-inter text-black/50 text-sm font-medium">No experience found.</p>
      </div>
    );
  }

  /* ── Grouped layout (Leadership) ────────────────────────────── */
  if (groups) {
    let globalIndex = 0;
    return (
      <div className="max-w-[1000px] mx-auto pb-12 pt-4 relative space-y-14">
        {groups.map((group, groupIdx) => (
          <motion.section
            key={group.organization}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: groupIdx * 0.12, ease: "easeOut" }}
          >
            {/* Institution header */}
            <div className="flex items-center gap-4 mb-6 md:pl-[170px] pl-8">
              <div className="w-3 h-3 rounded-full bg-[#E7B603] shrink-0" />
              <h3 className="font-inter font-bold text-xl md:text-2xl text-black/85 leading-tight">
                {group.organization}
              </h3>
              <div className="flex-1 h-px bg-black/8" />
            </div>

            {/* Vertical timeline line for the group */}
            <div className="relative">
              {/* The continuous vertical line */}
              <div className="hidden md:block absolute left-[156px] top-0 bottom-0 w-px bg-black/10" />
              <div className="md:hidden absolute left-[15px] top-0 bottom-0 w-px bg-black/10" />

              <div className="space-y-8">
                {group.items.map((exp) => {
                  const idx = globalIndex++;
                  return (
                    <ExperienceTimelineItem
                      key={exp.id}
                      experience={exp}
                      onClick={onExperienceClick}
                      index={idx}
                      hideOrganization
                    />
                  );
                })}
              </div>
            </div>
          </motion.section>
        ))}
      </div>
    );
  }

  /* ── Flat layout (Work) ─────────────────────────────────────── */
  return (
    <div className="max-w-[1000px] mx-auto pb-12 pt-4 relative">
      {/* Continuous vertical line */}
      <div className="hidden md:block absolute left-[156px] top-0 bottom-0 w-px bg-black/10" />
      <div className="md:hidden absolute left-[15px] top-0 bottom-0 w-px bg-black/10" />

      <div className="space-y-12">
        {experiences.map((exp, index) => (
          <ExperienceTimelineItem
            key={exp.id}
            experience={exp}
            onClick={onExperienceClick}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
