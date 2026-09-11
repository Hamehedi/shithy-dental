import { Hero } from "@/components/home/hero"
import { IntroStatement } from "@/components/home/intro-statement"
import { ServicesOverview } from "@/components/home/services-overview"
import { DoctorIntro } from "@/components/home/doctor-intro"
import { Quotes } from "@/components/home/quotes"
import { ClosingCta } from "@/components/home/closing-cta"

export default function HomePage() {
  return (
    <>
      <Hero />
      <IntroStatement />
      <ServicesOverview />
      <DoctorIntro />
      <Quotes />
      <ClosingCta />
    </>
  )
}
