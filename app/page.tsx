import Head from "next/head";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import DiplomaticExcellence from "@/components/diplomatic-excellence";
import ConsularExcellence from "@/components/consular-excellence";
import NaturalWonders from "@/components/natural-wonders";
import StayConnected from "@/components/stay-connected";
import ContactSection1 from "@/components/ContactSection";
import Footer from "@/components/footer";
import { SocialFeedsSection } from "@/components/SocialFeedsSection";
import JurisdictionSection from "@/components/Jurisdiction";
import NaturalWondersRwanda from "@/components/natural-wondersRwanda";

export default function Home() {
  const siteUrl = "https://djibouticonsul.rw";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Consulate",
    "name": "Honorary Consulate of Djibouti in Rwanda",
    "description":
      "Official diplomatic and consular services of the Republic of Djibouti in Kigali, Rwanda. Providing emergency assistance, citizen support, and fostering Djibouti-Rwanda relations.",
    "image": `${siteUrl}/images/djibouti-consulate.jpg`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "KG 523 Street, Nyarutarama",
      "addressLocality": "Kigali",
      "addressCountry": "Rwanda"
    },
    "telephone": "+250780685486",
    "email": "info@consuldjibouti.com",
    "url": siteUrl
  };

  return (
    <>
      <Head>
        <title>Honorary Consulate of Djibouti in Rwanda | Official Services</title>
        <meta
          name="description"
          content="Official consular services of Djibouti in Rwanda. Book appointments, register Djibouti citizens in Rwanda, and access diplomatic services."
        />
        <meta
          name="keywords"
          content="Djibouti Consulate Rwanda, Djibouti Embassy Ethiopia, Hassan Adan Hassan, Djibouti Visa Rwanda, Consular Services Kigali"
        />
        <meta name="author" content="Honorary Consulate of Djibouti in Rwanda" />
        <link rel="canonical" href={siteUrl} />

        {/* Open Graph for social sharing */}
        <meta property="og:title" content="Honorary Consulate of Djibouti in Rwanda" />
        <meta
          property="og:description"
          content="Connecting Djibouti and Rwanda through dedicated diplomatic services and citizen support."
        />
        <meta property="og:image" content={`${siteUrl}/images/og-image.jpg`} />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Djibouti Consulate Rwanda" />
        <meta
          name="twitter:description"
          content="Official Honorary Consulate of Djibouti in Kigali, Rwanda."
        />
        <meta name="twitter:image" content={`${siteUrl}/images/twitter-card.jpg`} />

        {/* Structured Data for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <main className="min-h-screen bg-background">
        <Header />
        <HeroSection />
        <DiplomaticExcellence />
        <ConsularExcellence />
        <JurisdictionSection />
        <NaturalWonders />
        <NaturalWondersRwanda />
        <StayConnected />
        <SocialFeedsSection />
        <ContactSection1 />
        <Footer />
      </main>
    </>
  );
}
