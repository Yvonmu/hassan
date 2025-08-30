/* eslint-disable @next/next/no-img-element */
"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, Phone, Clock } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"

export default function OfficeLocation() {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
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
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleGetDirections = () => {
    window.open("https://maps.google.com/?q=Djibouti+City+Diplomatic+Quarter", "_blank")
  }

  const handleCallOffice = () => {
    window.open("tel:+25377123456", "_self")
  }

  return (
    <section ref={sectionRef} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">{t("officeLocationTitle")}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t("officeLocationDesc")}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Map */}
          <div className={`${isVisible ? "animate-slide-in-left animate-delay-200" : "opacity-0"}`}>
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-500">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src="/djibouti-city-map-diplomatic-quarter.png"
                    alt={t("officeLocationTitle")}
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  <div className="absolute top-4 left-4 right-4">
                    <Card className="bg-white/90 backdrop-blur-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-semibold text-foreground">{t("addressTitle")}</p>
                            <p className="text-sm text-muted-foreground">{t("addressDetails")}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <Button
                      onClick={handleGetDirections}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-105"
                    >
                      <Navigation className="h-4 w-4 mr-2" />
                      {t("getDirections")}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Location Details */}
          <div className={`space-y-8 ${isVisible ? "animate-slide-in-right animate-delay-300" : "opacity-0"}`}>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">{t("visitOfficeTitle")}</h3>
              <div className="space-y-6">
                {/* Address Card */}
                <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">{t("addressTitle")}</h4>
                        <p className="text-muted-foreground whitespace-pre-line">{t("addressDetails")}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Office Hours Card */}
                <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">{t("officeHoursTitle")}</h4>
                     <div className="space-y-1 text-muted-foreground">
  <p>{t("mondayThursday")}: 8:00 AM - 5:00 PM</p>
  <p>{t("friday")}: 8:00 AM - 12:00 PM</p>
  <p>{t("saturday")}: 9:00 AM - 1:00 PM</p>
  <p>{t("sunday")}: {t("closed")}</p>
</div>

                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Card */}
                <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">{t("contactTitle")}</h4>
                       <div className="space-y-1 text-muted-foreground">
  <p>{t("mondayThursday")}: 8:00 AM - 5:00 PM</p>
  <p>{t("friday")}: 8:00 AM - 12:00 PM</p>
  <p>{t("saturday")}: 9:00 AM - 1:00 PM</p>
  <p>{t("sunday")}: {t("closed")}</p>
</div>

                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleGetDirections}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-105"
              >
                <Navigation className="h-4 w-4 mr-2" />
                {t("getDirections")}
              </Button>
              <Button
                onClick={handleCallOffice}
                variant="outline"
                className="flex-1 transition-all duration-300 hover:scale-105 bg-transparent"
              >
                <Phone className="h-4 w-4 mr-2" />
                {t("callOffice")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
