"use client"

import { motion } from "framer-motion"

/**
 * The practice mark: a tooth-shaped seal that cradles a confident serif "S"
 * (for Shithy), with a single brass smile arc resting at the base. The tooth
 * is the container rather than a cartoon — one boutique emblem, drawn as a
 * restrained line-art reveal.
 */
export function LineMark({
  className,
  animate = true,
}: {
  className?: string
  animate?: boolean
}) {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.6, ease: [0.22, 1, 0.36, 1] as const },
        opacity: { duration: 0.3 },
      },
    },
  }

  const drawS = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as const, delay: 0.7 },
        opacity: { duration: 0.3, delay: 0.7 },
      },
    },
  }

  const drawSmile = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const, delay: 1.5 },
        opacity: { duration: 0.3, delay: 1.5 },
      },
    },
  }

  return (
    <motion.svg
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      aria-hidden="true"
      initial={animate ? "hidden" : "visible"}
      whileInView={animate ? "visible" : undefined}
      animate={animate ? undefined : "visible"}
      viewport={{ once: true, amount: 0.6 }}
    >
      {/* tooth-shaped seal — the container */}
      <motion.path
        d="M50 12 C33 12 22 23 22 41 C22 58 25 76 31 88 C34 94 41 93 43 82 C44.5 73 47 68 50 68 C53 68 55.5 73 57 82 C59 93 66 94 69 88 C75 76 78 58 78 41 C78 23 67 12 50 12 Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
        variants={draw}
      />
      {/* confident serif S nested in the crown */}
      <motion.path
        d="M60.5 33 C60.5 26.5 47 25.5 44.2 31.5 C41.6 37 49.5 39.6 54 41.7 C59.4 44.1 61.2 49.4 56 54 C51 58.4 41.8 56.6 40 51"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        variants={drawS}
      />
      {/* brass smile arc resting at the base */}
      <motion.path
        d="M41 61 C46 66.5 54 66.5 59 61"
        stroke="var(--brass)"
        strokeWidth="3"
        strokeLinecap="round"
        variants={drawSmile}
      />
    </motion.svg>
  )
}
