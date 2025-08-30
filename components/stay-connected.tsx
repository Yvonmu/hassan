/* eslint-disable @next/next/no-img-element */
"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Play, ExternalLink, Calendar, Users, MapPin, Mail, User, Phone } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"

export default function StayConnected() {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const [playingVideo, setPlayingVideo] = useState<number | null>(null)
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)
  const [registrationData, setRegistrationData] = useState({
    name: "",
    email: "",
    phone: "",
    interests: "",
  })
  const sectionRef = useRef<HTMLDivElement>(null)

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

  const content = [
    {
      title: t("culturalFestivalTitle"),
      description: t("culturalFestivalDesc"),
      image: "/djibouti-cultural-festival-traditional-dance.png",
      type: t("culturalFestivalType"),
      date: t("culturalFestivalDate"),
      location: t("culturalFestivalLocation"),
    },
    {
      title: t("economicSummitTitle"),
      description: t("economicSummitDesc"),
      image: "/business-summit-conference-djibouti.png",
      type: t("economicSummitType"),
      date: t("economicSummitDate"),
      location: t("economicSummitLocation"),
    },
    {
      title: t("marineProjectTitle"),
      description: t("marineProjectDesc"),
      image: "/red-sea-coral-reef-marine-conservation.png",
      type: t("marineProjectType"),
      date: t("marineProjectDate"),
      location: t("marineProjectLocation"),
    },
  ]

  const handlePlayVideo = (index: number) => {
    setPlayingVideo(index)
    setTimeout(() => setPlayingVideo(null), 3000)
  }

  const handleLearnMore = (title: string) => {
    window.open(`https://djibouti.gov.dj/news/${title.toLowerCase().replace(/\s+/g, "-")}`, "_blank")
  }

  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Registration submitted:", registrationData)
    alert(t("joinCommunityButton"))
    setIsRegistrationOpen(false)
    setRegistrationData({ name: "", email: "", phone: "", interests: "" })
  }

  const handleInputChange = (field: string, value: string) => {
    setRegistrationData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSocialMediaFollow = () => {
    window.open("https://twitter.com/DjiboutiGov", "_blank")
  }

  return (
    <section ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t("stayConnectedTitle")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("stayConnectedDesc")}
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.map((item, index) => (
            <Card
              key={index}
              className={`group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 ${
                isVisible ? "animate-scale-in" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    onClick={() => handlePlayVideo(index)}
                    size="lg"
                    className="rounded-full bg-white/90 text-black hover:bg-white hover:scale-110 transition-all duration-300"
                  >
                    <Play className="h-6 w-6 ml-1" />
                  </Button>
                </div>

                {playingVideo === index && (
                  <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                      <p>{t("loadingVideo")}</p>
                    </div>
                  </div>
                )}

                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary text-primary-foreground">{item.type}</Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{item.location}</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleLearnMore(item.title)}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {t("learnMore")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Community Section */}
        <div className={`text-center mt-16 ${isVisible ? "animate-fade-in-up animate-delay-500" : "opacity-0"}`}>
          <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
            <CardContent className="p-12">
              <h3 className="text-3xl font-bold mb-4">{t("joinCommunityTitle")}</h3>
              <p className="text-xl mb-8 opacity-90">{t("joinCommunityDesc")}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Dialog open={isRegistrationOpen} onOpenChange={setIsRegistrationOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="secondary"
                      size="lg"
                      className="bg-white text-primary hover:bg-gray-100 transition-all duration-300 hover:scale-105"
                    >
                      <Users className="h-5 w-5 mr-2" />
                      {t("subscribeButton")}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Mail className="h-5 w-5 text-primary" />
                        {t("dialogTitle")}
                      </DialogTitle>
                      <DialogDescription>{t("dialogDesc")}</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleRegistrationSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {t("fullName")}
                        </Label>
                        <Input
                          id="name"
                          value={registrationData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder={t("fullName")}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          {t("emailAddress")}
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={registrationData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder={t("emailAddress")}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          {t("phoneNumber")}
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={registrationData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder={t("phoneNumber")}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="interests">{t("interests")}</Label>
                        <Textarea
                          id="interests"
                          value={registrationData.interests}
                          onChange={(e) => handleInputChange("interests", e.target.value)}
                          placeholder={t("interestsPlaceholder")}
                          rows={3}
                        />
                      </div>
                      <div className="flex gap-3 pt-4">
                        <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
                          <Users className="h-4 w-4 mr-2" />
                          {t("joinCommunityButton")}
                        </Button>
                        <Button type="button" variant="outline" onClick={() => setIsRegistrationOpen(false)}>
                          {t("cancel")}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>

                <Button
                  onClick={handleSocialMediaFollow}
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-primary transition-all duration-300 hover:scale-105 bg-transparent"
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  {t("followSocial")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
