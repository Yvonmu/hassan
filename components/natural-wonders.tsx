/* eslint-disable @next/next/no-img-element */
"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Camera, Star, ExternalLink } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"

export default function NaturalWonders() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const wonders = [
    {
      title: t("lakeAssalTitle"),
      location: t("lakeAssalLocation"),
      description: t("lakeAssalDescription"),
      image: "/lake-assal-salt-lake-djibouti-desert.png",
      rating: 4.8,
      category: t("naturalWonder"),
    },
    {
      title: t("lacAbbeTitle"),
      location: t("lacAbbeLocation"),
      description: t("lacAbbeDescription"),
      image: "/lac-abbe-limestone-chimneys-djibouti.png",
      rating: 4.9,
      category: t("geologicalSite"),
    },
    {
      title: t("dayForestTitle"),
      location: t("dayForestLocation"),
      description: t("dayForestDescription"),
      image: "/day-forest-national-park-djibouti-juniper-trees.png",
      rating: 4.7,
      category: t("nationalPark"),
    },
    {
      title: t("djiboutiHarborTitle"),
      location: t("djiboutiHarborLocation"),
      description: t("djiboutiHarborDescription"),
      image: "/djibouti-harbor-port-ships-blue-water.png",
      rating: 4.6,
      category: t("urbanLandmark"),
    },
    {
      title: t("mouchaIslandTitle"),
      location: t("mouchaIslandLocation"),
      description: t("mouchaIslandDescription"),
      image: "/tropical-island-coral-reef-clear-blue-water.png",
      rating: 4.8,
      category: t("marineParadise"),
    },
    {
      title: t("ardoukobaVolcanoTitle"),
      location: t("ardoukobaVolcanoLocation"),
      description: t("ardoukobaVolcanoDescription"),
      image: "/volcanic-crater-desert-landscape.png",
      rating: 4.5,
      category: t("volcanicSite"),
    },
  ]

  const handleExploreMore = (wonder: string) => {
    // Simulate explore more functionality
    window.open(`https://tourism.dj/destinations/${wonder.toLowerCase().replace(/\s+/g, "-")}`, "_blank")
  }

  const handleImageClick = (index: number) => {
    setSelectedImage(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  return (
    <section id="gallery" ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-flag-pattern opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">{t("galleryTitle")}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t("gallerySubtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wonders.map((wonder, index) => (
            <Card
              key={index}
              className={`group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 hover-lift ${
                isVisible ? "animate-scale-in" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={wonder.image || "/placeholder.svg"}
                  alt={wonder.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
                  onClick={() => handleImageClick(index)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 left-4">
                  <Badge className="bg-djibouti-blue text-white animate-pulse">{wonder.category}</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-rwanda-green/80 backdrop-blur-sm rounded-full p-2">
                    <Camera className="h-4 w-4 text-white animate-bounce" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    onClick={() => handleExploreMore(wonder.title)}
                    size="sm"
                    className="w-full bg-rwanda-yellow text-black hover:bg-rwanda-yellow/90 font-semibold"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {t("exploreMore")}
                  </Button>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-foreground">{wonder.title}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-rwanda-yellow fill-current animate-pulse" />
                      <span className="text-sm font-medium">{wonder.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <MapPin className="h-4 w-4 text-djibouti-green" />
                    <span className="text-sm">{wonder.location}</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{wonder.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in-up"
            onClick={closeLightbox}
          >
            <div className="relative max-w-4xl max-h-full">
              <img
                src={wonders[selectedImage].image || "/placeholder.svg"}
                alt={wonders[selectedImage].title}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors duration-200"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white">
                <h3 className="text-xl font-bold">{wonders[selectedImage].title}</h3>
                <p className="text-sm opacity-90">{wonders[selectedImage].description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
