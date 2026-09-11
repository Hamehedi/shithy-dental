import { site } from "./site"

export function waLink(message: string): string {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`
}

export const waMessages = {
  learnMore: "Hello, I'd like to know more about the treatments at Dr. Shithy's Dental Care.",
  bookAppointment:
    "Hello, I'd like to book an appointment at Dr. Shithy's Dental Care. Preferred day and time: ",
  aboutService: (service: string) =>
    `Hello, I have a question about ${service} at Dr. Shithy's Dental Care.`,
  confirmRequest: (name: string, service: string, date: string, time: string) =>
    `Hello, I'd like to confirm my appointment request: ${name}, ${service}, on ${date} at ${time}.`,
}
