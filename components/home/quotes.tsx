import { Reveal } from "@/components/reveal"
import { testimonials } from "@/lib/site"

export function Quotes() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <Reveal>
        <h2 className="max-w-xl text-balance font-serif text-3xl leading-tight text-ink md:text-4xl">
          In our patients&apos; words
        </h2>
      </Reveal>
      <div className="mt-14 grid gap-x-12 gap-y-14 md:grid-cols-3">
        {testimonials.map((quote, i) => (
          <Reveal key={quote} delay={i * 0.1}>
            <figure className="flex h-full flex-col">
              <span className="font-serif text-5xl leading-none text-brass" aria-hidden="true">
                &ldquo;
              </span>
              <blockquote className="mt-3 text-pretty font-serif text-xl leading-relaxed text-ink">
                {quote}
              </blockquote>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
