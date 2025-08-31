"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone, Mail } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"
import LanguageSwitcher from "@/components/language-switcher"
import Image from "next/image"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMenuOpen(false)
    }
  }

  return (
    <>
      <div className="bg-primary text-primary-foreground py-2 px-4">
        <div className="container mx-auto hidden md:flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 animate-bounce hover:animate-pulse" />
              <a href={`tel:${t("phone")}`} className="hover:underline">
                {t("phone")}
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 animate-bounce hover:animate-pulse" />
              <a href={`mailto:${t("email")}`} className="hover:underline">
                {t("email")}
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs opacity-75">Diplomatic Mission</span>
          </div>
        </div>
      </div>

    <header
  className={`fixed left-0 right-0 z-50 transition-all duration-300 
    ${isScrolled 
      ? "top-0 bg-background/95 backdrop-blur-sm shadow-lg" 
      : "top-8 bg-white"}`
  }
>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
          <div className="w-14 h-10 rounded-sm overflow-hidden shadow-sm relative">
  <Image
    src="/dj.png"
    alt="Djibouti Flag"
    fill
    className="object-cover"
    sizes="56px"
  />
</div>
              {/* <div className="flex items-center space-x-2">
                <Globe className="h-8 w-8 text-primary animate-spin-slow hover:animate-pulse" />
                <span className="font-bold text-lg sm:text-xl text-foreground">{t("heroName")}</span>
              </div> */}
            </div>

            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <button
                onClick={() => scrollToSection("home")}
                className="text-foreground hover:text-primary transition-colors duration-200 hover:scale-105 transform"
              >
                {t("home")}
              </button>
              <button
                onClick={() => scrollToSection("diplomatic")}
                className="text-foreground hover:text-primary transition-colors duration-200 hover:scale-105 transform"
              >
                {t("diplomaticExcellence")}
              </button>
              <button
                onClick={() => scrollToSection("consular")}
                className="text-foreground hover:text-primary transition-colors duration-200 hover:scale-105 transform"
              >
                {t("consularServices")}
              </button>
              <button
                onClick={() => scrollToSection("gallery")}
                className="text-foreground hover:text-primary transition-colors duration-200 hover:scale-105 transform"
              >
                {t("gallery")}
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-foreground hover:text-primary transition-colors duration-200 hover:scale-105 transform"
              >
                {t("contact")}
              </button>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <LanguageSwitcher />
       <div className="w-14 h-10 rounded-sm overflow-hidden shadow-sm relative">
  <Image
    src="/rw.png"
    alt="Rwanda Flag"
    fill
    className="object-cover"
    sizes="56px"
  />
</div>
            </div>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden bg-card border-t border-border animate-fade-in-up shadow-lg">
              <nav className="flex flex-col space-y-4 p-4">
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-left text-foreground hover:text-primary transition-colors duration-200 py-2 hover:bg-muted rounded-md px-2"
                >
                  {t("home")}
                </button>
                <button
                  onClick={() => scrollToSection("diplomatic")}
                  className="text-left text-foreground hover:text-primary transition-colors duration-200 py-2 hover:bg-muted rounded-md px-2"
                >
                  {t("diplomaticExcellence")}
                </button>
                <button
                  onClick={() => scrollToSection("consular")}
                  className="text-left text-foreground hover:text-primary transition-colors duration-200 py-2 hover:bg-muted rounded-md px-2"
                >
                  {t("consularServices")}
                </button>
                <button
                  onClick={() => scrollToSection("gallery")}
                  className="text-left text-foreground hover:text-primary transition-colors duration-200 py-2 hover:bg-muted rounded-md px-2"
                >
                  {t("gallery")}
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-left text-foreground hover:text-primary transition-colors duration-200 py-2 hover:bg-muted rounded-md px-2"
                >
                  {t("contact")}
                </button>
                <div className="border-t border-border pt-4 mt-4 space-y-2">
                  <div className="px-2 pt-2">
                    <LanguageSwitcher />
                  </div>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  )
}
