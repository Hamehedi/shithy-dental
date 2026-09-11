import Link from "next/link"
import { LineMark } from "./line-mark"
import { site } from "@/lib/site"
import { waLink, waMessages } from "@/lib/whatsapp"

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-pine text-bone">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <LineMark className="h-10 w-10 text-bone" animate={false} />
              <span className="font-serif text-2xl">Dr. Shithy&apos;s Dental Care</span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-bone/70">
              A private dental chamber in Aftabnagar, Dhaka. Unhurried, personal care led by
              {" "}
              {site.doctor.name}.
            </p>
          </div>

          <div>
            <h3 className="text-[0.7rem] uppercase tracking-[0.2em] text-bone/50">Explore</h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              <li><Link href="/" className="text-bone/80 transition-colors hover:text-bone">Home</Link></li>
              <li><Link href="/services" className="text-bone/80 transition-colors hover:text-bone">Services</Link></li>
              <li><Link href="/visit" className="text-bone/80 transition-colors hover:text-bone">Visit &amp; appointment</Link></li>
              <li>
                <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="text-bone/80 transition-colors hover:text-bone">
                  Facebook
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[0.7rem] uppercase tracking-[0.2em] text-bone/50">Reach us</h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              <li>
                <a href={`tel:${site.phone.tel}`} className="text-bone/80 transition-colors hover:text-bone">
                  {site.phone.display}
                </a>
              </li>
              <li>
                <a href={waLink(waMessages.learnMore)} target="_blank" rel="noopener noreferrer" className="text-bone/80 transition-colors hover:text-bone">
                  WhatsApp {site.whatsapp.display}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="break-all text-bone/80 transition-colors hover:text-bone">
                  {site.email}
                </a>
              </li>
              <li className="pt-2 text-bone/60">
                {site.hours.label}
                <br />
                Closed {site.hours.closedDay}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-bone/15 pt-6 text-xs text-bone/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Dr. Shithy&apos;s Dental Care. All rights reserved.</p>
          <p>{site.address.lines.join(", ")}</p>
        </div>
      </div>
    </footer>
  )
}
