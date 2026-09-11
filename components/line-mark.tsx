"use client"

import { motion } from "framer-motion"

/**
 * The practice mark: a fine-line tooth silhouette cradling a serif "S"
 * whose lower sweep resolves into a calm smile arc, with a single brass
 * point. Drawn as a line-art reveal — restrained, not a cartoon.
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
      transition: { pathLength: { duration: 1.6, ease: [0.22, 1, 0.36, 1] as const }, opacity: { duration: 0.3 } },
    },
  }

  const drawLate = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.1, ease: [0.22, 1, 0.36, 1] as const, delay: 0.9 },
        opacity: { duration: 0.3, delay: 0.9 },
      },
    },
  }

  return (
    <motion.svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
      initial={animate ? "hidden" : "visible"}
      whileInView={animate ? "visible" : undefined}
      animate={animate ? undefined : "visible"}
      viewport={{ once: true, amount: 0.6 }}
    >
      {/* tooth silhouette */}
      <motion.path
        d="M32 9 C23 9 17 15 17 25 C17 34 18 44 21 51 C22 54 25 54 26 49 C27 44 29 41 32 41 C35 41 37 44 38 49 C39 54 42 54 43 51 C46 44 47 34 47 25 C47 15 41 9 32 9 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={draw}
      />
      {/* serif S nested inside the crown */}
      <motion.path
        d="M37 19.5 C37 16 28.5 15.5 27.5 18.8 C26.6 21.8 31 23 33.3 23.9 C35.8 24.9 37.8 26.4 36.6 29"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        variants={draw}
      />
      {/* smile arc — the lower resolve of the S */}
      <motion.path
        d="M24.5 33.5 C27.5 37.5 36.5 37.5 39.5 33.5"
        stroke="var(--brass)"
        strokeWidth="1.75"
        strokeLinecap="round"
        variants={drawLate}
      />
      {/* brass point */}
      <motion.circle
        cx="32"
        cy="13"
        r="2.1"
        fill="var(--brass)"
        initial={animate ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
        whileInView={animate ? { scale: 1, opacity: 1 } : undefined}
        transition={{ delay: 1.6, duration: 0.4, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.6 }}
      />
    </motion.svg>
  )
}
