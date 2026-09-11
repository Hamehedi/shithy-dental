import { Reveal } from "@/components/reveal"
import { site } from "@/lib/site"

export function DoctorIntro() {
  return (
    <section className="bg-pine text-bone">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <Reveal>
            <p className="font-serif text-lg italic text-bone/60">The dentist you&apos;ll see</p>
            <h2 className="mt-3 text-balance font-serif text-4xl leading-tight md:text-5xl">
              {site.doctor.name}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-xl text-pretty text-lg leading-relaxed text-bone/85">
              Every appointment is with Dr. Shithy herself — the same familiar face each visit.
              You&apos;ll always know who is caring for you and why.
            </p>
            <ul className="mt-8 flex flex-col gap-3 border-t border-bone/15 pt-6">
              {site.doctor.credentials.map((c) => (
                <li key={c} className="flex gap-3 text-sm text-bone/80">
                  <span className="mt-2 h-px w-5 shrink-0 bg-brass" aria-hidden="true" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
