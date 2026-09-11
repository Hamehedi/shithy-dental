import Link from "next/link"
import { Reveal } from "@/components/reveal"
import { serviceGroups } from "@/lib/site"

export function ServicesOverview() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <h2 className="max-w-xl text-balance font-serif text-3xl leading-tight text-ink md:text-4xl">
            What we look after
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Link
            href="/services"
            className="border-b border-brass pb-0.5 text-sm text-pine transition-colors hover:text-ink"
          >
            See every treatment
          </Link>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-x-14 gap-y-12 md:grid-cols-2">
        {serviceGroups.map((group, i) => (
          <Reveal key={group.id} delay={i * 0.06}>
            <div className="border-t border-border pt-5">
              <h3 className="font-serif text-2xl text-ink">{group.title}</h3>
              <p className="mt-1 text-sm text-stone">{group.caption}</p>
              <ul className="mt-5 flex flex-wrap gap-x-2 gap-y-2">
                {group.items.map((item, j) => (
                  <li key={item.name} className="text-[0.95rem] text-ink/85">
                    {item.name}
                    {j < group.items.length - 1 && <span className="pl-2 text-stone-soft">·</span>}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
