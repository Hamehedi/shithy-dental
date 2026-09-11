import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { allServiceNames, site } from "@/lib/site"

export const runtime = "nodejs"

type Payload = {
  name?: string
  phone?: string
  date?: string
  time?: string
  service?: string
  message?: string
}

function timeWithinHours(time: string): boolean {
  // Chamber open 5:00 PM – 10:00 PM => 17:00 to 22:00 inclusive.
  const match = /^(\d{2}):(\d{2})$/.exec(time)
  if (!match) return false
  const minutes = Number(match[1]) * 60 + Number(match[2])
  return minutes >= 17 * 60 && minutes <= 22 * 60
}

function isThursday(dateStr: string): boolean {
  // Interpret the date at noon local to avoid timezone edge cases.
  const d = new Date(`${dateStr}T12:00:00`)
  if (Number.isNaN(d.getTime())) return false
  return d.getDay() === 4 // Sunday = 0 ... Thursday = 4
}

export async function POST(request: Request) {
  let body: Payload
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 })
  }

  const name = body.name?.trim() ?? ""
  const phone = body.phone?.trim() ?? ""
  const date = body.date?.trim() ?? ""
  const time = body.time?.trim() ?? ""
  const service = body.service?.trim() ?? ""
  const message = body.message?.trim() ?? ""

  // Server-side validation (never trust the client alone).
  const fieldErrors: Record<string, string> = {}
  if (!name) fieldErrors.name = "Please tell us your name."
  if (!phone) fieldErrors.phone = "Please share a phone number."
  if (!date) fieldErrors.date = "Please choose a preferred date."
  if (!time) fieldErrors.time = "Please choose a preferred time."
  if (!service || !allServiceNames.includes(service)) {
    fieldErrors.service = "Please choose a service from the list."
  }
  if (date && isThursday(date)) {
    fieldErrors.date = `The chamber is closed on ${site.hours.closedDay}. Please pick another day.`
  }
  if (time && !timeWithinHours(time)) {
    fieldErrors.time = `Please choose a time within our hours, ${site.hours.label}.`
  }

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json({ ok: false, fieldErrors }, { status: 422 })
  }

  // Attempt to send the notification email. A failure here must NOT block the
  // patient — we log it server-side and still return success.
  const gmailAddress = process.env.GMAIL_ADDRESS
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD

  if (gmailAddress && gmailAppPassword) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: gmailAddress, pass: gmailAppPassword },
      })

      const lines = [
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Preferred date: ${date}`,
        `Preferred time: ${time}`,
        `Service: ${service}`,
        `Message: ${message || "(none)"}`,
      ]

      await transporter.sendMail({
        from: `"Dr. Shithy's Dental Care" <${gmailAddress}>`,
        to: gmailAddress, // always the address stored in GMAIL_ADDRESS
        replyTo: gmailAddress,
        subject: "New appointment request",
        text: lines.join("\n"),
      })
    } catch (error) {
      console.error("[v0] Appointment email failed to send:", error)
    }
  } else {
    console.error(
      "[v0] GMAIL_ADDRESS / GMAIL_APP_PASSWORD not set — skipping email, request still accepted.",
    )
  }

  return NextResponse.json({ ok: true })
}
