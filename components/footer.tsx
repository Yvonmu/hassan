"use client"

import { Button } from "@/components/ui/button"
import { Globe, Twitter, Linkedin, Mail, Phone, MapPin, ExternalLink, ArrowUp } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"

export default function Footer() {
  const { t } = useTranslation()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSocialClick = (platform: string) => {
    const urls = {
      twitter: "https://twitter.com/hassan_diplomatic",
      linkedin: "https://linkedin.com/in/hassan-adan-hassan",
      email: "mailto:hassan@diplomatic.dj",
    }

    if (platform === "email") {
      window.open(urls[platform], "_self")
    } else {
      window.open(urls[platform as keyof typeof urls], "_blank")
    }
  }

  const quickLinks = [
    { name: t("diplomaticServices"), href: "diplomatic" },
    { name: t("consularServices"), href: "consular" },
    { name: t("gallery"), href: "gallery" },
    { name: t("contact"), href: "contact" },
  ]

  const services = [
    t("visaProcessing"),
    t("passportServices"),
    t("citizenSupport"),
    t("emergencyAssistance"),
    t("businessFacilitation"),
    t("culturalExchange"),
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleExternalLink = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

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
                {t("heroName")} {t("heroLastName")}
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">{t("footerBrandDescription")}</p>
            <div className="flex space-x-3">
              <Button
                onClick={() => handleSocialClick("twitter")}
                variant="outline"
                size="sm"
                className="hover:bg-djibouti-blue hover:text-white transition-all duration-300 hover-lift"
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => handleSocialClick("linkedin")}
                variant="outline"
                size="sm"
                className="hover:bg-rwanda-blue hover:text-white transition-all duration-300 hover-lift"
              >
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => handleSocialClick("email")}
                variant="outline"
                size="sm"
                className="hover:bg-rwanda-green hover:text-white transition-all duration-300 hover-lift"
              >
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground border-b-2 border-djibouti-blue pb-2">{t("quickLinks")}</h3>
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
            <h3 className="font-semibold text-foreground border-b-2 border-rwanda-green pb-2">{t("ourServices")}</h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index} className="text-muted-foreground text-sm flex items-center">
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
                onClick={() => window.open("tel:+25377123456", "_self")}
                className="flex items-center space-x-3 text-sm hover:text-djibouti-blue transition-colors group w-full text-left"
              >
                <Phone className="h-4 w-4 text-djibouti-blue group-hover:animate-bounce" />
                <span className="text-muted-foreground">+253 77 123 456</span>
              </button>
              <button
                onClick={() => handleSocialClick("email")}
                className="flex items-center space-x-3 text-sm hover:text-rwanda-green transition-colors group w-full text-left"
              >
                <Mail className="h-4 w-4 text-rwanda-green group-hover:animate-bounce" />
                <span className="text-muted-foreground">hassan@diplomatic.dj</span>
              </button>
              <button
                onClick={() => handleExternalLink("https://maps.google.com/?q=Diplomatic+Quarter+Djibouti+City")}
                className="flex items-start space-x-3 text-sm hover:text-rwanda-blue transition-colors group w-full text-left"
              >
                <MapPin className="h-4 w-4 text-rwanda-blue mt-0.5 group-hover:animate-bounce" />
                <span className="text-muted-foreground">
                  {t("diplomaticQuarter")}
                  <br />
                  {t("djiboutiCity")}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">{t("copyright")}</div>
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
  )
}
