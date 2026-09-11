import { Reveal } from "@/components/reveal"
import { LineMark } from "@/components/line-mark"

export function IntroStatement() {
  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-10 md:grid-cols-[auto_1fr] md:gap-16">
          <Reveal>
            <LineMark className="h-14 w-14 text-pine" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-3xl text-balance font-serif text-2xl leading-[1.35] text-ink sm:text-3xl md:text-[2.4rem] md:leading-[1.3]">
              We keep the practice small on purpose. That means you are seen, listened to, and
              treated at a human pace — with care that is careful, and explanations you can actually
              follow.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
