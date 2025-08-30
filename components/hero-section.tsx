"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, ExternalLink, Award, Calendar } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"
import Image from "next/image"

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleDownloadCV = () => {
    // Simulate CV download
    const link = document.createElement("a")
    link.href = "/placeholder-aq1yy.png"
    link.download = "Hassan_Adan_Hassan_CV.pdf"
    link.click()
  }

  const handleViewProfile = () => {
    window.open("https://linkedin.com/in/hassan-adan-hassan", "_blank")
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <div className="absolute inset-0 bg-diplomatic-gradient"></div>
      <div className="absolute inset-0 bg-subtle-pattern"></div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`space-y-8 ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-lg">
                {t("heroName")}
                <br />
                <span className="text-rwanda-yellow">{t("heroTitle")}</span>
              </h1>
              <p className="text-xl text-white/90 max-w-lg drop-shadow-md">{t("heroDescription")}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Badge
                variant="secondary"
                className="px-4 py-2 text-sm font-medium bg-djibouti-green text-white border-0"
              >
                <Award className="h-4 w-4 mr-2 animate-pulse" />
                {t("officialTitle")}
              </Badge>
              <Badge
                variant="outline"
                className="px-4 py-2 text-sm font-medium bg-rwanda-yellow text-black border-rwanda-yellow"
              >
                <Calendar className="h-4 w-4 mr-2 animate-bounce" />
                {t("year")}
              </Badge>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleDownloadCV}
                className="bg-djibouti-green hover:bg-djibouti-green/90 text-white px-8 py-3 text-lg font-medium transition-all duration-300 hover:scale-105 hover-lift"
              >
                <Download className="h-5 w-5 mr-2 animate-bounce" />
                {t("downloadCV")}
              </Button>
              <Button
                variant="outline"
                onClick={handleViewProfile}
                className="px-8 py-3 text-lg font-medium transition-all duration-300 hover:scale-105 bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white hover:text-djibouti-blue"
              >
                <ExternalLink className="h-5 w-5 mr-2" />
                {t("viewProfile")}
              </Button>
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div className={`relative ${isVisible ? "animate-slide-in-right animate-delay-200" : "opacity-0"}`}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-rwanda-yellow/30 to-djibouti-green/30 rounded-2xl transform rotate-3 animate-float"></div>
              <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl hover-lift">
      <Image
        src="/hassan.webp"
        alt="Hassan Adan Hassan"
        width={600}   // ✅ set width for optimization
        height={400}  // ✅ set height for optimization
        className="w-full h-auto rounded-lg object-cover"
        priority      // ✅ load fast since it’s likely above the fold
      />
      <div className="absolute top-4 right-4">
        <Badge className="bg-rwanda-blue text-white animate-pulse">
          {t("heroTitle")}
        </Badge>
      </div>
    </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
