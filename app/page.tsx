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
import { 
  getSEOMetadata, 
  getHeroSection, 
  getGlobalSettings,
  getDiplomaticExcellence,
  getJurisdictionSection,
  getNaturalWonders,
  getNaturalWondersRwanda,
  getStayConnected,
  getSocialFeedsSection,
  getConsularExcellence,
  getHeaderSettings,
} from "@/lib/sanity.server";
import { urlFor } from "@/lib/sanity";
import type { Metadata } from "next";
import { unstable_noStore as noStore } from 'next/cache';

// Generate metadata from Sanity CMS
export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getSEOMetadata('home');
  const siteUrl = "https://djibouticonsul.rw";

  // Fallback to default values if Sanity data is not available
  const title = seoData?.title || "Honorary Consulate of Djibouti in Rwanda | Official Services";
  const description = seoData?.description || "Official consular services of Djibouti in Rwanda. Book appointments, register Djibouti citizens in Rwanda, and access diplomatic services.";
  const ogImage = seoData?.ogImage ? urlFor(seoData.ogImage).width(1200).height(630).url() : `${siteUrl}/images/og-image.jpg`;
  const ogTitle = seoData?.ogTitle || title;
  const ogDescription = seoData?.ogDescription || description;
  const canonicalUrl = seoData?.canonicalUrl || siteUrl;
  const keywords = seoData?.keywords ? seoData.keywords.join(', ') : "Djibouti Consulate Rwanda, Djibouti Embassy Ethiopia, Hassan Adan Hassan, Djibouti Visa Rwanda, Consular Services Kigali";

  return {
    title,
    description,
    keywords,
    authors: [{ name: "Honorary Consulate of Djibouti in Rwanda" }],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonicalUrl,
      siteName: "Djibouti Consulate Rwanda",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [ogImage],
    },
  };
}

export default async function Home() {
  // Disable static caching - always fetch fresh data
  noStore();
  
  const siteUrl = "https://djibouticonsul.rw";
  
  // Fetch data from Sanity CMS (fresh on every request)
  const [
    heroData,
    globalSettings,
    diplomaticExcellence,
    jurisdictionSection,
    naturalWonders,
    naturalWondersRwanda,
    stayConnected,
    socialFeedsSection,
    consularExcellence,
    headerSettings,
  ] = await Promise.all([
    getHeroSection(),
    getGlobalSettings(),
    getDiplomaticExcellence(),
    getJurisdictionSection(),
    getNaturalWonders(),
    getNaturalWondersRwanda(),
    getStayConnected(),
    getSocialFeedsSection(),
    getConsularExcellence(),
    getHeaderSettings(),
  ]);

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
      {/* Structured Data for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="min-h-screen bg-background">
        <Header headerSettings={headerSettings} globalSettings={globalSettings} />
        <HeroSection heroData={heroData} />
        <DiplomaticExcellence data={diplomaticExcellence} />
        <ConsularExcellence data={consularExcellence} />
        <JurisdictionSection data={jurisdictionSection} />
        <NaturalWonders data={naturalWonders} />
        <NaturalWondersRwanda data={naturalWondersRwanda} />
        
        <StayConnected data={stayConnected} />
        <SocialFeedsSection data={socialFeedsSection} />
        <ContactSection1 globalSettings={globalSettings} />
        <Footer globalSettings={globalSettings} />
      </main>
    </>
  );
}
