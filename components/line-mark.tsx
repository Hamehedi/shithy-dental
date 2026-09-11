"use client"

import { motion } from "framer-motion"

/**
 * An abstract custom mark for the practice: a fine-line arch (the calm
 * "chamber") cradling a rising stroke, with a single brass point. Drawn as a
 * line-art reveal — no tooth icons, no medical crosses.
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
      {/* outer arch */}
      <motion.path
        d="M8 54 C8 24 24 10 32 10 C40 10 56 24 56 54"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        variants={draw}
      />
      {/* inner rising stroke */}
      <motion.path
        d="M22 54 C22 38 26 26 32 20 C38 26 42 38 42 54"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        variants={draw}
      />
      {/* brass point */}
      <motion.circle
        cx="32"
        cy="14"
        r="2.4"
        fill="var(--brass)"
        initial={animate ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
        whileInView={animate ? { scale: 1, opacity: 1 } : undefined}
        transition={{ delay: 1.4, duration: 0.4, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.6 }}
      />
    </motion.svg>
  )
}
