/* eslint-disable @next/next/no-img-element */
"use client";

import {
  Globe,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ArrowUp,
} from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "./ui/card";
import Link from "next/link";

export default function Footer() {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSocialClick = (platform: string) => {
    const urls = {
      twitter: "https://twitter.com/hassan_diplomatic",
      linkedin: "https://linkedin.com/in/hassan-adan-hassan",
      email: "mailto:info@consuldjibouti.com",
    };

    if (platform === "email") {
      window.open(urls[platform], "_self");
    } else {
      window.open(urls[platform as keyof typeof urls], "_blank");
    }
  };

  const quickLinks = [
    { name: t("diplomaticServices"), href: "diplomatic" },
    { name: t("consularServices"), href: "consular" },
    { name: t("gallery"), href: "gallery" },
    { name: t("contact"), href: "contact" },
  ];

  const services = [
    // t("visaProcessing"),
    // t("passportServices"),
    t("citizenSupport"),
    t("emergencyAssistance"),
    t("businessFacilitation"),
    t("culturalExchange"),
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleExternalLink = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <footer className="bg-card border-t border-border relative overflow-hidden">
      <div className="absolute inset-0 bg-subtle-pattern"></div>
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Globe className="h-8 w-8 text-djibouti-blue animate-spin-slow" />
              <span className="font-bold text-xl text-foreground">
                {t("heroName")}
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t("footerBrandDescription")}
            </p>
            <div className="flex justify- gap-2">
              <div className="w-10 h-6 rounded-sm overflow-hidden shadow-sm relative">
                <Image
                  src="/dj.png"
                  alt="Djibouti Flag"
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <div className="w-10 h-6 rounded-sm overflow-hidden shadow-sm relative">
                <Image
                  src="/rw.png"
                  alt="Rwanda Flag"
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground border-b-2 border-djibouti-blue pb-2">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-muted-foreground hover:text-djibouti-blue transition-colors duration-200 text-sm flex items-center group"
                  >
                    <span>{link.name}</span>
                    <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground border-b-2 border-rwanda-green pb-2">
              {t("ourServices")}
            </h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li
                  key={index}
                  className="text-muted-foreground text-sm flex items-center"
                >
                  <div className="w-1.5 h-1.5 bg-rwanda-yellow rounded-full mr-2 animate-pulse"></div>
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground border-b-2 border-rwanda-blue pb-2">
              {t("contactInformation")}
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => window.open("tel:+250780685486", "_self")}
                className="flex items-center space-x-3 text-sm hover:text-djibouti-blue transition-colors group w-full text-left"
              >
                <Phone className="h-4 w-4 text-djibouti-blue group-hover:animate-bounce" />
                <span className="text-muted-foreground">
                  +250 (0) 780 685 486
                </span>
              </button>
              <button
                onClick={() => handleSocialClick("email")}
                className="flex items-center space-x-3 text-sm hover:text-rwanda-green transition-colors group w-full text-left"
              >
                <Mail className="h-4 w-4 text-rwanda-green group-hover:animate-bounce" />
                <span className="text-muted-foreground">
                  info@consuldjibouti.com
                </span>
              </button>
              <button
                onClick={() =>
                  handleExternalLink(
                    "https://maps.app.goo.gl/WqxAz7ZhBfGphBdq5"
                  )
                }
                className="flex items-start space-x-3 text-sm hover:text-rwanda-blue transition-colors group w-full text-left"
              >
                <MapPin className="h-4 w-4 text-rwanda-blue mt-0.5 group-hover:animate-bounce" />
                <span className="text-muted-foreground">
                  KG 523 Street, Nyarutarama, Kigali
                </span>
              </button>
            </div>
          </div>
        </div>
       <div className="border-t border-border flex flex-col gap-4 mt-12 pt-8">
      <h1 className="text-3xl text-center">{t("officialResourcesTitle")}</h1>
      <p className="text-center">{t("officialResourcesDescription")}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Card className="border hover:shadow-lg transition-all duration-300">
          <CardHeader className="font-bold text-xl">{t("executiveBranch")}</CardHeader>
          <CardContent className="p-4 flex flex-col items-start justify-between h-full">
            <Link href={"http://presidence.dj/"} className="flex gap-2 text-sm items-center">
              <img src="/icons/tick.svg" alt="" className="h-2.5 w-2.5" />{" "}
              <p>{t("presidencyOfDjibouti")}</p>
            </Link>
            <Link href={"http://primature.gouv.dj/"} className="flex gap-2 text-sm items-center">
              <img src="/icons/tick.svg" alt="" className="h-2.5 w-2.5" />{" "}
              <p>{t("primeMinistersOffice")}</p>
            </Link>
            <Link href={"http://presidence.dj/composition"} className="flex gap-2 text-sm items-center">
              <img src="/icons/tick.svg" alt="" className="h-2.5 w-2.5" />{" "}
              <p>{t("completeGovernmentDirectory")}</p>
            </Link>
          </CardContent>
        </Card>

        <Card className="border hover:shadow-lg transition-all duration-300">
          <CardHeader className="font-bold text-xl">{t("keyMinistries")}</CardHeader>
          <CardContent className="p-4 flex flex-col items-start justify-between h-full">
            <Link href={"http://diplomatie.gouv.dj/"} className="flex gap-2 text-sm items-center">
              <img src="/icons/tick.svg" alt="" className="h-2.5 w-2.5" />{" "}
              <p>{t("foreignAffairs")}</p>
            </Link>
            <Link href={"http://ministere-finances.dj/"} className="flex gap-2 text-sm items-center">
              <img src="/icons/tick.svg" alt="" className="h-2.5 w-2.5" />{" "}
              <p>{t("economyFinance")}</p>
            </Link>
            <Link href={"http://justice.gouv.dj/"} className="flex gap-2 text-sm items-center">
              <img src="/icons/tick.svg" alt="" className="h-2.5 w-2.5" />{" "}
              <p>{t("ministryOfJustice")}</p>
            </Link>
          </CardContent>
        </Card>

        <Card className="border hover:shadow-lg transition-all duration-300">
          <CardHeader className="font-bold text-xl">{t("publicServices")}</CardHeader>
          <CardContent className="p-4 flex flex-col items-start justify-between h-full">
            <Link href={"http://logement.gouv.dj/"} className="flex gap-2 text-sm items-center">
              <img src="/icons/tick.svg" alt="" className="h-2.5 w-2.5" />{" "}
              <p>{t("housingUrbanismEnvironment")}</p>
            </Link>
            <Link href={"https://web.facebook.com/p/Minist%C3%A8re-de-la-Communication-Charg%C3%A9-des-Postes-et-des-T%C3%A9l%C3%A9communications-100069088184641/?_rdc=1&_rdr#"} className="flex gap-2 text-sm items-center">
              <img src="/icons/tick.svg" alt="" className="h-2.5 w-2.5" />{" "}
              <p>{t("ministryOfCommunication")}</p>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="border rounded-xl p-4 italic z-10 bg-blue/50 text-center mt-4 text-rwanda-blue">
        {t("diplomaticRelationsQuote")}
      </div>
    </div>
        {/* Bottom Section */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              {t("copyright")}
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={scrollToTop}
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-djibouti-blue transition-colors duration-200 group hover-lift"
              >
                <span>{t("backToTop")}</span>
                <ArrowUp className="h-4 w-4 group-hover:-translate-y-1 transition-transform duration-200" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
