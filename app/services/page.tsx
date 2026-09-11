import type { Metadata } from "next"
import Link from "next/link"
import { Reveal } from "@/components/reveal"
import { serviceGroups } from "@/lib/site"
import { waLink, waMessages } from "@/lib/whatsapp"

export const metadata: Metadata = {
  title: "Services — Dr. Shithy's Dental Care",
  description:
    "Everyday care, restorative work, cosmetic and orthodontic treatment, and children's dental care at Dr. Shithy's Dental Care in Aftabnagar, Dhaka.",
}

export default function ServicesPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pb-8 pt-16 md:px-8 md:pb-12 md:pt-24">
        <Reveal>
          <p className="font-serif text-lg italic text-brass">What we offer</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-3 max-w-3xl text-balance font-serif text-[2.6rem] leading-[1.04] tracking-tight text-ink md:text-6xl">
            Every treatment, in plain language.
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-xl text-pretty leading-relaxed text-stone">
            From a routine clean to more involved work, here is everything we look after — grouped so
            you can find what you need. Not sure which applies to you? Ask, and we&apos;ll guide you.
          </p>
        </Reveal>
      </section>

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        {serviceGroups.map((group, gi) => (
          <section
            key={group.id}
            className="grid gap-8 border-t border-border py-14 md:grid-cols-[0.8fr_1.2fr] md:gap-12 md:py-20"
          >
            <Reveal>
              <div className="md:sticky md:top-28">
                <h2 className="font-serif text-3xl leading-tight text-ink md:text-4xl">
                  {group.title}
                </h2>
                <p className="mt-2 max-w-xs text-sm text-stone">{group.caption}</p>
              </div>
            </Reveal>

            <ul className="flex flex-col">
              {group.items.map((item, i) => (
                <Reveal as="li" key={item.name} delay={i * 0.05}>
                  <div className="group flex flex-col gap-2 border-b border-border/70 py-6 first:pt-0">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-serif text-xl text-ink">{item.name}</h3>
                      <a
                        href={waLink(waMessages.aboutService(item.name))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 border-b border-transparent pb-0.5 text-xs text-stone transition-colors hover:border-brass hover:text-pine"
                      >
                        Ask about this
                      </a>
                    </div>
                    <p className="max-w-lg text-[0.95rem] leading-relaxed text-ink/75">
                      {item.blurb}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <section className="border-t border-border bg-pine text-bone">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-16 md:flex-row md:items-center md:justify-between md:px-8 md:py-20">
          <h2 className="max-w-lg text-balance font-serif text-3xl leading-tight md:text-4xl">
            Talk it through before you decide.
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/visit#appointment"
              className="rounded-sm bg-bone px-6 py-3 text-sm text-pine transition-all duration-300 hover:-translate-y-0.5 hover:bg-bone-deep"
            >
              Request an appointment
            </Link>
            <a
              href={waLink(waMessages.learnMore)}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-bone/40 pb-0.5 text-sm text-bone transition-colors hover:border-brass"
            >
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
