import type { Metadata } from "next"
import { Reveal } from "@/components/reveal"
import { AppointmentForm } from "@/components/appointment-form"
import { site } from "@/lib/site"
import { waLink, waMessages } from "@/lib/whatsapp"

export const metadata: Metadata = {
  title: "Visit & Appointments — Dr. Shithy's Dental Care",
  description:
    "Find Dr. Shithy's Dental Care in Aftabnagar, Dhaka. Opening hours, directions, phone, WhatsApp, email, and an online appointment request. Open 5–10 PM, closed Thursday.",
}

const days = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  "Assure South Castle, Aftabnagar, Dhaka",
)}&output=embed`

export default function VisitPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pb-8 pt-16 md:px-8 md:pb-14 md:pt-24">
        <Reveal>
          <p className="font-serif text-lg italic text-brass">Come see us</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-3 max-w-3xl text-balance font-serif text-[2.6rem] leading-[1.04] tracking-tight text-ink md:text-6xl">
            Visit the chamber in Aftabnagar.
          </h1>
        </Reveal>
      </section>

      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-2 md:gap-16 md:px-8">
        {/* Left column: details */}
        <div className="flex flex-col gap-12">
          <Reveal>
            <div>
              <h2 className="text-[0.7rem] uppercase tracking-[0.2em] text-stone">Where</h2>
              <address className="mt-3 not-italic font-serif text-2xl leading-snug text-ink">
                {site.address.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div>
              <h2 className="text-[0.7rem] uppercase tracking-[0.2em] text-stone">Hours</h2>
              <table className="mt-4 w-full max-w-sm border-collapse text-sm">
                <caption className="sr-only">Opening hours by day of the week</caption>
                <tbody>
                  {days.map((day) => {
                    const closed = day === site.hours.closedDay
                    return (
                      <tr key={day} className="border-b border-border/70">
                        <th scope="row" className="py-2.5 text-left font-normal text-ink">
                          {day}
                        </th>
                        <td
                          className={`py-2.5 text-right ${
                            closed ? "text-destructive" : "text-stone"
                          }`}
                        >
                          {closed ? "Closed" : site.hours.label}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <h2 className="text-[0.7rem] uppercase tracking-[0.2em] text-stone">Reach us</h2>
              <ul className="mt-4 flex flex-col gap-3 text-ink">
                <li>
                  <a href={`tel:${site.phone.tel}`} className="group inline-flex items-baseline gap-3">
                    <span className="text-sm text-stone">Phone</span>
                    <span className="border-b border-transparent transition-colors group-hover:border-brass">
                      {site.phone.display}
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={waLink(waMessages.learnMore)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-baseline gap-3"
                  >
                    <span className="text-sm text-stone">WhatsApp</span>
                    <span className="border-b border-transparent transition-colors group-hover:border-brass">
                      {site.whatsapp.display}
                    </span>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.email}`} className="group inline-flex items-baseline gap-3">
                    <span className="text-sm text-stone">Email</span>
                    <span className="break-all border-b border-transparent transition-colors group-hover:border-brass">
                      {site.email}
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="overflow-hidden rounded-sm border border-border">
              <iframe
                title="Map to Dr. Shithy's Dental Care, Aftabnagar, Dhaka"
                src={mapSrc}
                width="100%"
                height="300"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block w-full grayscale-[0.2]"
              />
            </div>
          </Reveal>
        </div>

        {/* Right column: form */}
        <div id="appointment" className="scroll-mt-28">
          <Reveal delay={0.1}>
            <AppointmentForm />
          </Reveal>
        </div>
      </div>

      <div className="h-16 md:h-24" />
    </>
  )
}
