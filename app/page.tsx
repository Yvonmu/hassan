import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import DiplomaticExcellence from "@/components/diplomatic-excellence"
import ConsularExcellence from "@/components/consular-excellence"
import NaturalWonders from "@/components/natural-wonders"
import StayConnected from "@/components/stay-connected"
import SocialFeeds from "@/components/social-feeds"
import ContactSection from "@/components/contact-section"
import OfficeLocation from "@/components/office-location"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <DiplomaticExcellence />
      <ConsularExcellence />
      <NaturalWonders />
      <StayConnected />
      <SocialFeeds />
      <ContactSection />
      <OfficeLocation />
      <Footer />
    </main>
  )
}
