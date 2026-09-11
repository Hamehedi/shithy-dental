"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { LineMark } from "./line-mark"
import { waLink, waMessages } from "@/lib/whatsapp"

const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/visit", label: "Visit" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-bone/90 backdrop-blur-sm border-b border-border" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 md:px-8">
        <Link href="/" className="group flex items-center gap-3" aria-label="Dr. Shithy's Dental Care — home">
          <LineMark className="h-9 w-9 text-pine" animate={false} />
          <span className="flex flex-col leading-none">
            <span className="font-serif text-lg tracking-tight text-ink">Dr. Shithy&apos;s</span>
            <span className="text-[0.68rem] uppercase tracking-[0.22em] text-stone">Dental Care</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-1 text-sm transition-colors ${
                  active ? "text-ink" : "text-stone hover:text-ink"
                }`}
              >
                {item.label}
                {active && <span className="absolute -bottom-0.5 left-0 h-px w-full bg-brass" />}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={waLink(waMessages.learnMore)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-stone transition-colors hover:text-pine"
          >
            WhatsApp
          </a>
          <Link
            href="/visit#appointment"
            className="rounded-sm bg-pine px-4 py-2 text-sm text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-pine-deep"
          >
            Request appointment
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center md:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <span className="relative block h-3 w-5">
            <span
              className={`absolute left-0 block h-px w-5 bg-ink transition-transform duration-300 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-px w-5 bg-ink transition-opacity duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-5 bg-ink transition-transform duration-300 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-bone px-5 pb-6 pt-2 md:hidden">
          <nav className="flex flex-col" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-border/60 py-3 font-serif text-xl text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-5 flex flex-col gap-3">
            <Link
              href="/visit#appointment"
              className="rounded-sm bg-pine px-4 py-3 text-center text-sm text-primary-foreground"
            >
              Request appointment
            </Link>
            <a
              href={waLink(waMessages.learnMore)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm border border-pine px-4 py-3 text-center text-sm text-pine"
            >
              Message on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
