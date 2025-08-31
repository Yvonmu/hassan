import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import DiplomaticExcellence from "@/components/diplomatic-excellence"
import ConsularExcellence from "@/components/consular-excellence"
import NaturalWonders from "@/components/natural-wonders"
import StayConnected from "@/components/stay-connected"
// import SocialFeeds from "@/components/social-feeds"
// import ContactSection from "@/components/contact-section"
import ContactSection1 from "@/components/ContactSection"
// import OfficeLocation from "@/components/office-location"
import Footer from "@/components/footer"
import { SocialFeedsSection } from "@/components/SocialFeedsSection"
import JurisdictionSection from "@/components/Jurisdiction"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <DiplomaticExcellence />
      <ConsularExcellence />
      <JurisdictionSection/>
      <NaturalWonders />
      <StayConnected />
      <SocialFeedsSection/>
      <ContactSection1/>
      <Footer />
    </main>
  )
}
