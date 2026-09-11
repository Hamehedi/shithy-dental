import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fraunces, Instrument_Sans } from 'next/font/google'
import './globals.css'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Dr. Shithy's Dental Care — Private Dental Chamber, Aftabnagar, Dhaka",
  description:
    'A calm private dental chamber in Aftabnagar, Dhaka led by Dr. Sanjida Nur Khanam Shithy. Scaling, fillings, root canal, crowns, orthodontics, pediatric and cosmetic dental care. Open 5–10 PM, closed Thursday.',
  keywords: [
    'dentist Aftabnagar',
    'dental care Dhaka',
    "Dr. Shithy's Dental Care",
    'root canal Dhaka',
    'orthodontic treatment Dhaka',
  ],
  generator: 'v0.app',
  openGraph: {
    title: "Dr. Shithy's Dental Care",
    description:
      'A calm private dental chamber in Aftabnagar, Dhaka led by Dr. Sanjida Nur Khanam Shithy.',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#1e3a32',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`light bg-background ${fraunces.variable} ${instrumentSans.variable}`}
    >
      <body className="font-sans antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
