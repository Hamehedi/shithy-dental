"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { DoctorPortrait } from "@/components/doctor-portrait"
import { waLink, waMessages } from "@/lib/whatsapp"
import { site } from "@/lib/site"

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
}

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-end gap-10 px-5 pb-16 pt-14 md:grid-cols-[1.15fr_0.85fr] md:gap-14 md:px-8 md:pb-24 md:pt-20">
        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.p variants={item} className="font-serif text-lg italic text-brass">
            Aftabnagar, Dhaka
          </motion.p>
          <motion.h1
            variants={item}
            className="mt-4 text-balance font-serif text-[2.6rem] leading-[1.02] tracking-tight text-ink sm:text-6xl md:text-[4.2rem]"
          >
            Considered dental care, in a calm private chamber.
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-6 max-w-md text-pretty text-base leading-relaxed text-stone"
          >
            A small, personal practice led by {site.doctor.name}. Unhurried appointments,
            clear explanations, and gentle treatment — from routine check-ups to more involved work.
          </motion.p>
          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/visit#appointment"
              className="rounded-sm bg-pine px-6 py-3 text-sm text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-pine-deep"
            >
              Request an appointment
            </Link>
            <a
              href={waLink(waMessages.learnMore)}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-transparent pb-0.5 text-sm text-ink transition-colors hover:border-brass"
            >
              Or ask a question on WhatsApp
            </a>
          </motion.div>
          <motion.p variants={item} className="mt-10 text-sm text-stone">
            Open {site.hours.label} · Closed {site.hours.closedDay}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <DoctorPortrait className="aspect-[4/5] w-full" />
        </motion.div>
      </div>
    </section>
  )
}
