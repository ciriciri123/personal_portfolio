"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "motion/react";
import type { MotionValue } from "motion/react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FolderCardProps {
  /** Path to the coloured BackFolder SVG inside /public */
  backFolderSrc: string;
  /** RGB triplet used for the glass tint, e.g. "124,40,39" */
  accentRgb?: string;
  /** Label rendered in the bottom-left of the folder */
  category: string;
  /** Called when the card is clicked */
  onClick?: () => void;
  /** Accessible description for screen readers */
  ariaLabel?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

/**
 * The folder's visual dimensions (matches BackFolder.svg viewBox ratio: 250 × 200).
 * All child layers are sized relative to this container.
 */
const FOLDER_WIDTH = 240;
const FOLDER_HEIGHT = 192; // 240 × (200/250)

/**
 * Y positions for the document stack (negative = up, since documents sit above
 * the folder's centre and move further upward on hover).
 *
 * RESTING  → documents peek ~30 px above the glass front
 * EXPANDED → documents rise an additional ~65 px
 */
const DOC_Y_RESTING = 0;
const DOC_Y_EXPANDED = -65;

const FRONT_FOLDER_PATH =
  "M0 17C0 7.61116 7.61116 0 17 0H65.9131C70.4485 0 74.7959 1.81233 77.9884 5.0339L90.5116 17.6714C93.7041 20.893 98.0515 22.7053 102.587 22.7053H233C242.389 22.7053 250 30.3165 250 39.7053V135C250 144.389 242.389 152 233 152H17C7.61116 152 0 144.389 0 135V17Z";

// ─── Component ────────────────────────────────────────────────────────────────

export default function FolderCard({
  backFolderSrc,
  accentRgb,
  category,
  onClick,
  ariaLabel,
}: FolderCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rgb = accentRgb ?? "124,40,39";

  // Raw hover progress: 0 = resting, 1 = expanded
  const hoverProgress = useMotionValue(0);

  // Spring-based progress gives the organic overshoot / deceleration feel
  const springProgress = useSpring(hoverProgress, {
    stiffness: 260,
    damping: 22,
    mass: 0.8,
  });

  // Map spring progress → translateY for the document stack
  const docY = useTransform(
    springProgress,
    [0, 1],
    [DOC_Y_RESTING, DOC_Y_EXPANDED]
  );

  // Dynamic spread and tilt for papers
  const p1Rotation = useTransform(springProgress, [0, 1], [-6, -12]);
  const p1X = useTransform(springProgress, [0, 1], [-18, -32]);

  const p2Rotation = useTransform(springProgress, [0, 1], [4, 12]);
  const p2X = useTransform(springProgress, [0, 1], [14, 28]);

  const p3Rotation = useTransform(springProgress, [0, 1], [-1, 2]);
  const p3X = useTransform(springProgress, [0, 1], [0, 0]);

  // Subtle card lift on hover
  const cardScale = useTransform(springProgress, [0, 1], [1, 1.025]);
  const cardShadow = useTransform(
    springProgress,
    [0, 1],
    [
      "0 8px 32px rgba(0,0,0,0.18)",
      "0 24px 56px rgba(0,0,0,0.28)",
    ]
  );

  const handleMouseEnter = () => hoverProgress.set(1);
  const handleMouseLeave = () => hoverProgress.set(0);

  return (
    <motion.div
      ref={containerRef}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel ?? `Open ${category} folder`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
      style={{
        width: FOLDER_WIDTH,
        height: FOLDER_HEIGHT + 80, // extra top space for documents to emerge into
        position: "relative",
        cursor: "pointer",
        userSelect: "none",
        scale: cardScale,
        filter: cardShadow,
        // Respect reduced-motion preference
        ["--motion-reduce" as string]: "paused",
      }}
      className="outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-2xl"
    >
      {/* ── Layer 1: Back Folder (static, bottom of stack) ──────────────────── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: FOLDER_WIDTH,
          height: FOLDER_HEIGHT,
          zIndex: 1,
        }}
      >
        <Image
          src={backFolderSrc}
          alt=""
          aria-hidden
          fill
          style={{ objectFit: "fill" }}
          priority
        />
      </div>

      {/* ── Layer 2: Document Stack (animated) ──────────────────────────────── */}
      {/*
        The documents sit "inside" the folder: their lower half is hidden by
        the glass front panel (z-index 3). overflow:hidden on the glass wrapper
        clips the bottom portion. The documents emerge upward on hover.
      */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          // Anchor at a fixed horizontal/vertical position within the folder
          bottom: FOLDER_HEIGHT * 0.03, // start slightly above folder centre
          left: "50%",
          x: "-50%",
          y: docY,
          width: FOLDER_WIDTH * 0.88,
          height: 190, // preserves Paper.svg proportions
          zIndex: 2,
          willChange: "transform",
        }}
      >
        {/*
          Three paper layers: each is the same asset, slightly offset and
          rotated to produce a realistic stacked appearance.
        */}
        <DocumentPaper rotation={p1Rotation} xOffset={p1X} zIndex={0} opacity={1} />
        <DocumentPaper rotation={p2Rotation} xOffset={p2X} zIndex={1} opacity={1} />
        <DocumentPaper rotation={p3Rotation} xOffset={p3X} zIndex={2} opacity={1} />
      </motion.div>

      {/* ── Layer 3: Glass Front Panel (static) ─────────────────────────────── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: 250,
          height: 152,
          zIndex: 3,
          transform: `scale(${FOLDER_WIDTH / 250})`,
          transformOrigin: "bottom left",
        }}
      >
        {/* Glassmorphism Background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(
              160deg,
              rgba(${rgb},0.38) 0%,
              rgba(${rgb},0.55) 60%,
              rgba(${rgb},0.68) 100%
            )`,
            backdropFilter: "blur(8px) saturate(1.4)",
            WebkitBackdropFilter: "blur(8px) saturate(1.4)",
            clipPath: `path("${FRONT_FOLDER_PATH}")`,
          }}
        />

        {/* Glass diagonal highlight streak */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(120deg, rgba(255,255,255,0.15) 20%, transparent 55%)",
            clipPath: `path("${FRONT_FOLDER_PATH}")`,
            pointerEvents: "none",
          }}
        />

        {/* Subtle inner highlight overlay */}
        <svg
          viewBox="0 0 250 152"
          fill="none"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          <defs>
            <clipPath id="frontHighlightClip">
              <path d={FRONT_FOLDER_PATH} />
            </clipPath>
          </defs>
          <path
            d={FRONT_FOLDER_PATH}
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="2"
            clipPath="url(#frontHighlightClip)"
          />
        </svg>
      </div>

      {/* ── Layer 4: Category Label ──────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          bottom: 18,
          left: 20,
          zIndex: 5,
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontFamily: "inherit",
            fontSize: 18,
            fontWeight: 700,
            color: "rgba(255,255,255,0.95)",
            letterSpacing: "-0.01em",
            textShadow: "0 1px 8px rgba(0,0,0,0.35)",
          }}
        >
          {category}
        </span>
      </div>
    </motion.div>
  );
}

// ─── Sub-component: Single Document Paper ─────────────────────────────────────

interface DocumentPaperProps {
  rotation: MotionValue<number>;
  xOffset: MotionValue<number>;
  zIndex: number;
  opacity: number;
}

function DocumentPaper({ rotation, xOffset, zIndex, opacity }: DocumentPaperProps) {
  const transform = useMotionTemplate`translateX(calc(-50% + ${xOffset}px)) rotate(${rotation}deg)`;

  return (
    <motion.div
      style={{
        position: "absolute",
        top: 0,
        left: "50%",
        width: "100%",
        height: "100%",
        transform,
        transformOrigin: "bottom center",
        zIndex,
        opacity,
      }}
    >
      <Image
        src="/assets/Paper.svg"
        alt=""
        aria-hidden
        fill
        style={{ objectFit: "contain", objectPosition: "bottom" }}
      />
    </motion.div>
  );
}
