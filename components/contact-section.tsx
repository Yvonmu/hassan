"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, User, MessageSquare, Building } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"

export default function ContactSection() {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", email: "", subject: "", message: "" })
    }, 3000)
  }

  const contactInfo = [
    {
      icon: Phone,
      title: t("phone"),
      details: ["+253 77 123 456", "+253 21 456 789"],
      action: () => window.open("tel:+25377123456", "_self"),
    },
    {
      icon: Mail,
      title: t("email"),
      details: ["mailto:info@consuldjibouti.com", "info@consulate.dj"],
      action: () => window.open("mailto:mailto:info@consuldjibouti.com", "_self"),
    },
    {
      icon: MapPin,
      title: t("address"),
 details: [
      t("contact.detailsAddress.0"), // "Consulat général de Djibouti"
      t("contact.detailsAddress.1")  // "Quartier diplomatique, Ville de Djibouti"
    ],      action: () => window.open("https://maps.google.com/?q=Djibouti+City", "_blank"),
    },
    {
      icon: Clock,
      title: t("officeHours"),
      details: [t("mondayThursday"), t("friday")],
      action: null,
    },
  ]

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">{t("contactInformation")}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t("contactDesc")}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className={`space-y-8 ${isVisible ? "animate-slide-in-left animate-delay-200" : "opacity-0"}`}>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">{t("contact.getInTouch")}</h3>
              <div className="grid gap-6">
                {contactInfo.map((info, index) => (
                  <Card
                    key={index}
                    className={`group hover:shadow-lg transition-all duration-300 ${
                      info.action ? "cursor-pointer hover:scale-105" : ""
                    }`}
                    onClick={info.action || undefined}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                          <info.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground mb-2">{info.title}</h4>
                         {Array.isArray(info.details) ? info.details.map((detail, detailIndex) => (
  <p key={detailIndex} className="text-muted-foreground text-sm">
    {detail}
  </p>
)) : (
  <p className="text-muted-foreground text-sm">{info.details}</p>
)}

                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Additional Services */}
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6">
                <h4 className="text-xl font-bold mb-4">{t("emergencyServices")}</h4>
                <p className="mb-4 opacity-90">{t("contact.emergencyDesc")}</p>
                <Button
                  variant="secondary"
                  className="bg-white text-primary hover:bg-gray-100 transition-all duration-300"
                  onClick={() => window.open("tel:+25377123456", "_self")}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  {t("contact.emergencyButton")}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className={`${isVisible ? "animate-slide-in-right animate-delay-300" : "opacity-0"}`}>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-foreground flex items-center">
                  <MessageSquare className="h-6 w-6 mr-2 text-primary" />
                  {t("sendMessage")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="flex items-center">
                          <User className="h-4 w-4 mr-2" />
                          {t("fullName")}
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder={t("fullName")}
                          required
                          className="transition-all duration-300 focus:scale-105"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center">
                          <Mail className="h-4 w-4 mr-2" />
                          {t("emailAddress")}
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder={t("emailAddress")}
                          required
                          className="transition-all duration-300 focus:scale-105"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="flex items-center">
                        <Building className="h-4 w-4 mr-2" />
                        {t("subject")}
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder={t("subject")}
                        required
                        className="transition-all duration-300 focus:scale-105"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">{t("message")}</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder={t("message")}
                        rows={6}
                        required
                        className="transition-all duration-300 focus:scale-105"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-105"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          {t("sending")}
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          {t("sendMessage")}
                        </>
                      )}
                    </Button>
                  </form>
                ) : (
                  <div className="text-center py-12 animate-scale-in">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-foreground mb-2">{t("messageSent")}</h3>
                    <p className="text-muted-foreground">{t("messageSuccessDescription")}</p>
                    <Badge className="mt-4 bg-green-100 text-green-800">{t("responseTime")}</Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
