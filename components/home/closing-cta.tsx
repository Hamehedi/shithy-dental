import Link from "next/link"
import { Reveal } from "@/components/reveal"
import { LineMark } from "@/components/line-mark"
import { waLink, waMessages } from "@/lib/whatsapp"
import { site } from "@/lib/site"

export function ClosingCta() {
  return (
    <section className="border-t border-border bg-card">
      <div className="mx-auto max-w-4xl px-5 py-24 text-center md:px-8 md:py-32">
        <Reveal>
          <LineMark className="mx-auto h-16 w-16 text-pine" />
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mx-auto mt-8 max-w-2xl text-balance font-serif text-4xl leading-tight text-ink md:text-5xl">
            When you&apos;re ready, we&apos;ll find you a time.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-5 max-w-md text-pretty text-stone">
            Send a request and we&apos;ll confirm the details with you. The chamber is open
            {" "}
            {site.hours.label}, every day except {site.hours.closedDay}.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/visit#appointment"
              className="rounded-sm bg-pine px-6 py-3 text-sm text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-pine-deep"
            >
              Request an appointment
            </Link>
            <a
              href={waLink(waMessages.bookAppointment)}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-brass pb-0.5 text-sm text-pine transition-colors hover:text-ink"
            >
              Book on WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
