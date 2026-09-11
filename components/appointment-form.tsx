"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { serviceGroups, site } from "@/lib/site"
import { waLink, waMessages } from "@/lib/whatsapp"

type FieldErrors = Partial<Record<"name" | "phone" | "date" | "time" | "service", string>>

type FormState = {
  name: string
  phone: string
  date: string
  time: string
  service: string
  message: string
}

const empty: FormState = { name: "", phone: "", date: "", time: "", service: "", message: "" }

function isThursday(dateStr: string): boolean {
  if (!dateStr) return false
  const d = new Date(`${dateStr}T12:00:00`)
  if (Number.isNaN(d.getTime())) return false
  return d.getDay() === 4
}

function timeWithinHours(time: string): boolean {
  const match = /^(\d{2}):(\d{2})$/.exec(time)
  if (!match) return false
  const minutes = Number(match[1]) * 60 + Number(match[2])
  return minutes >= 17 * 60 && minutes <= 22 * 60
}

function prettyDate(dateStr: string): string {
  const d = new Date(`${dateStr}T12:00:00`)
  if (Number.isNaN(d.getTime())) return dateStr
  return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
}

function prettyTime(time: string): string {
  const match = /^(\d{2}):(\d{2})$/.exec(time)
  if (!match) return time
  let h = Number(match[1])
  const m = match[2]
  const suffix = h >= 12 ? "PM" : "AM"
  h = h % 12 || 12
  return `${h}:${m} ${suffix}`
}

const fieldBase =
  "w-full rounded-sm border border-input bg-card px-4 py-3 text-ink outline-none transition-colors placeholder:text-stone-soft focus:border-pine"

export function AppointmentForm() {
  const [form, setForm] = useState<FormState>(empty)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle")
  const [submitted, setSubmitted] = useState<FormState | null>(null)

  const thursdayNotice = useMemo(() => isThursday(form.date), [form.date])

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  function validate(): FieldErrors {
    const next: FieldErrors = {}
    if (!form.name.trim()) next.name = "Please tell us your name."
    if (!form.phone.trim()) next.phone = "Please share a phone number."
    if (!form.date) next.date = "Please choose a preferred date."
    else if (isThursday(form.date))
      next.date = `We're closed on ${site.hours.closedDay} — please pick another day.`
    if (!form.time) next.time = "Please choose a preferred time."
    else if (!timeWithinHours(form.time))
      next.time = `Please choose a time within ${site.hours.label}.`
    if (!form.service) next.service = "Please choose a service."
    return next
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const found = validate()
    if (Object.keys(found).length > 0) {
      setErrors(found)
      return
    }
    setStatus("submitting")
    try {
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (res.status === 422) {
        const data = await res.json()
        setErrors(data.fieldErrors ?? {})
        setStatus("idle")
        return
      }
      // On any non-validation outcome we still show success — the backend
      // never blocks the patient on email failures.
      setSubmitted(form)
      setStatus("done")
    } catch {
      // Network hiccup: still let them confirm via WhatsApp.
      setSubmitted(form)
      setStatus("done")
    }
  }

  function reset() {
    setForm(empty)
    setErrors({})
    setSubmitted(null)
    setStatus("idle")
  }

  return (
    <div className="rounded-sm border border-border bg-card p-6 md:p-8">
      <AnimatePresence mode="wait">
        {status === "done" && submitted ? (
          <motion.div
            key="confirmation"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-serif text-lg italic text-brass">Request received</p>
            <h3 className="mt-2 font-serif text-3xl leading-tight text-ink">
              Thank you, {submitted.name.split(" ")[0]}.
            </h3>
            <p className="mt-4 max-w-md leading-relaxed text-stone">
              We&apos;ve noted your request for{" "}
              <span className="text-ink">{submitted.service}</span> on{" "}
              <span className="text-ink">{prettyDate(submitted.date)}</span> at{" "}
              <span className="text-ink">{prettyTime(submitted.time)}</span>. To confirm it right
              away, send us a quick message on WhatsApp — just tap send.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={waLink(
                  waMessages.confirmRequest(
                    submitted.name,
                    submitted.service,
                    prettyDate(submitted.date),
                    prettyTime(submitted.time),
                  ),
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm bg-pine px-6 py-3 text-sm text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-pine-deep"
              >
                Confirm on WhatsApp
              </a>
              <button
                type="button"
                onClick={reset}
                className="border-b border-transparent pb-0.5 text-sm text-stone transition-colors hover:border-brass hover:text-pine"
              >
                Send another request
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="font-serif text-2xl text-ink">Request an appointment</h3>
            <p className="mt-1 text-sm text-stone">
              Share a few details and we&apos;ll confirm a time with you.
            </p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="block text-sm text-ink">
                  Your name
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className={`mt-2 ${fieldBase}`}
                  placeholder="Full name"
                  autoComplete="name"
                />
                {errors.name && <p className="mt-1.5 text-sm text-destructive">{errors.name}</p>}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="phone" className="block text-sm text-ink">
                  Phone number
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className={`mt-2 ${fieldBase}`}
                  placeholder="e.g. 01XXXXXXXXX"
                  autoComplete="tel"
                />
                {errors.phone && <p className="mt-1.5 text-sm text-destructive">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="date" className="block text-sm text-ink">
                  Preferred date
                </label>
                <input
                  id="date"
                  type="date"
                  value={form.date}
                  onChange={(e) => update("date", e.target.value)}
                  className={`mt-2 ${fieldBase}`}
                />
                {errors.date && <p className="mt-1.5 text-sm text-destructive">{errors.date}</p>}
              </div>

              <div>
                <label htmlFor="time" className="block text-sm text-ink">
                  Preferred time
                </label>
                <input
                  id="time"
                  type="time"
                  min="17:00"
                  max="22:00"
                  value={form.time}
                  onChange={(e) => update("time", e.target.value)}
                  className={`mt-2 ${fieldBase}`}
                />
                {errors.time && <p className="mt-1.5 text-sm text-destructive">{errors.time}</p>}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="service" className="block text-sm text-ink">
                  Service needed
                </label>
                <select
                  id="service"
                  value={form.service}
                  onChange={(e) => update("service", e.target.value)}
                  className={`mt-2 ${fieldBase} appearance-none`}
                >
                  <option value="" disabled>
                    Choose a service
                  </option>
                  {serviceGroups.map((group) => (
                    <optgroup key={group.id} label={group.title}>
                      {group.items.map((item) => (
                        <option key={item.name} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                {errors.service && (
                  <p className="mt-1.5 text-sm text-destructive">{errors.service}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm text-ink">
                  Anything else? <span className="text-stone-soft">(optional)</span>
                </label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  rows={3}
                  className={`mt-2 ${fieldBase} resize-none`}
                  placeholder="A note about what you'd like to discuss"
                />
              </div>
            </div>

            <AnimatePresence>
              {thursdayNotice && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-5 overflow-hidden rounded-sm border border-brass/40 bg-brass/10 px-4 py-3 text-sm text-ink"
                >
                  The chamber is closed on {site.hours.closedDay}. Please choose another day and
                  we&apos;ll be glad to see you.
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-7 w-full rounded-sm bg-pine px-6 py-3.5 text-sm text-primary-foreground transition-all duration-300 hover:bg-pine-deep disabled:opacity-60 sm:w-auto"
            >
              {status === "submitting" ? "Sending…" : "Send request"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
