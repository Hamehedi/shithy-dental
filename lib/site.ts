export const site = {
  name: "Dr. Shithy's Dental Care",
  doctor: {
    name: "Dr. Sanjida Nur Khanam Shithy",
    credentials: [
      "BDS (Dhaka University)",
      "Post-Graduate Training — Oral & Maxillofacial Surgery, Dhaka Dental College",
      "Post-Graduate Training — Surgery, Dhaka Dental College",
    ],
  },
  address: {
    lines: [
      "B-1 (Lift-1), Assure South Castle",
      "House 62 & 64, Road 01, Block D",
      "Aftabnagar, Dhaka 1212, Bangladesh",
    ],
    full: "B-1 (Lift-1), Assure South Castle, House 62 & 64, Road 01, Block D, Aftabnagar, Dhaka 1212, Bangladesh",
  },
  phone: { display: "01949756989", intl: "+8801949756989", tel: "+8801949756989" },
  whatsapp: { display: "01622245857", number: "8801622245857" },
  email: "drsanjidashithy@gmail.com",
  hours: { label: "5:00 PM – 10:00 PM", closedDay: "Thursday" },
  facebook: "https://www.facebook.com/profile.php?id=100088053247840",
} as const

export type ServiceItem = { name: string; blurb: string }
export type ServiceGroup = { id: string; title: string; caption: string; items: ServiceItem[] }

export const serviceGroups: ServiceGroup[] = [
  {
    id: "everyday",
    title: "Everyday care",
    caption: "Keeping a healthy mouth healthy.",
    items: [
      { name: "Scaling & Polishing", blurb: "A gentle clean that lifts away buildup and leaves teeth feeling fresh." },
      { name: "General Dental Treatment", blurb: "Routine check-ups and day-to-day care for the whole family." },
    ],
  },
  {
    id: "restorative",
    title: "Restorative",
    caption: "Repairing and rebuilding what needs attention.",
    items: [
      { name: "Dental Fillings", blurb: "Repairing a decayed or chipped tooth so it feels whole again." },
      { name: "Root Canal Treatment", blurb: "Treating a tooth from the inside to relieve pain and save it." },
      { name: "Tooth Extraction", blurb: "Removing a tooth that can no longer be kept, as gently as possible." },
      { name: "Surgical Extraction", blurb: "Careful removal of a tooth that needs a minor surgical approach." },
      { name: "Crowns", blurb: "A custom cap that covers and protects a weakened tooth." },
      { name: "Bridges", blurb: "Closing the gap of a missing tooth using the teeth beside it." },
      { name: "Dentures", blurb: "Removable replacements that restore missing teeth and your bite." },
    ],
  },
  {
    id: "cosmetic",
    title: "Cosmetic & Orthodontic",
    caption: "Refining the look and alignment of your smile.",
    items: [
      { name: "Cosmetic/Aesthetic Dental Treatment", blurb: "Small, considered refinements to the appearance of your smile." },
      { name: "Orthodontic Treatment", blurb: "Gradually straightening and aligning teeth over time." },
    ],
  },
  {
    id: "children",
    title: "Children's",
    caption: "Calm first visits and gentle care.",
    items: [
      { name: "Pediatric Dental Care", blurb: "Friendly, unhurried dental care for children." },
    ],
  },
]

export const allServiceNames: string[] = serviceGroups.flatMap((g) => g.items.map((i) => i.name))

export const testimonials: string[] = [
  "Excellent dental care and very friendly service. Highly recommended!",
  "Excellent & elegant Dental clinic. With best treatment from Dr. Shithy's Dental care.",
  "Very effective & trustworthy..",
]
