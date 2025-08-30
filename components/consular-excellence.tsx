/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import {
  FileText,
  Shield,
  Users,
  Plane,
  Heart,
  Building,
  Phone,
  Mail,
  Clock,
  MapPin,
  CheckCircle,
  Star,
} from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"

export default function ConsularExcellence() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedService, setSelectedService] = useState<any>(null)
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

  const services = [
    {
      icon: FileText,
      title: t("visaServices"),
      description: t("visaServicesDesc"),
      features: [
        t("touristVisas"),
        t("businessVisas"),
        t("transitVisas"),
        t("multipleEntry"),
      ],
      color: "bg-blue-500",
      detailedInfo: {
        processingTime: t("processingTime3to5"),
        requirements: [
          t("validPassport"),
          t("completedApplicationForm"),
          t("passportPhotos"),
          t("supportingDocuments"),
        ],
        fees: t("feesFrom50USD"),
        additionalServices: [
          t("expressProcessing"),
          t("documentVerification"),
          t("translationServices"),
        ],
      },
    },
    {
      icon: Shield,
      title: t("passportServices"),
      description: t("passportIssuance"),
      features: [
        t("newPassports"),
        t("renewals"),
        t("emergencyDocuments"),
        t("lostStolenReports"),
      ],
      color: "bg-green-500",
      detailedInfo: {
        processingTime: t("processingTime7to10"),
        requirements: [
          t("birthCertificate"),
          t("nationalID"),
          t("passportPhotos"),
          t("applicationForm"),
        ],
        fees: t("feesFrom120USD"),
        additionalServices: [
          t("emergencyIssuance"),
          t("expeditedProcessing"),
          t("courierDelivery"),
        ],
      },
    },
    {
      icon: Users,
      title: t("citizenServices"),
      description: t("citizenServicesDesc"),
      features: [
        t("legalAssistance"),
        t("welfareSupport"),
        t("registration"),
        t("notarization"),
      ],
      color: "bg-purple-500",
      detailedInfo: {
        processingTime: t("sameDayService"),
        requirements: [
          t("validID"),
          t("proofOfCitizenship"),
          t("relevantDocuments"),
        ],
        fees: t("feesVaries"),
        additionalServices: [
          t("emergencySupport24_7"),
          t("legalReferrals"),
          t("translationServices"),
        ],
      },
    },
    {
      icon: Plane,
      title: t("travelAssistance"),
      description: t("travelAssistanceDesc"),
      features: [
        t("emergencyTravel"),
        t("repatriation"),
        t("medicalEvacuation"),
        t("support24_7"),
      ],
      color: "bg-orange-500",
      detailedInfo: {
        processingTime: t("immediateResponse"),
        requirements: [
          t("emergencyContact"),
          t("medicalDocumentation"),
          t("travelInsurance"),
        ],
        fees: t("governmentCovered"),
        additionalServices: [
          t("medicalCoordination"),
          t("familyNotification"),
          t("insuranceLiaison"),
        ],
      },
    },
    {
      icon: Heart,
      title: t("welfareSupport"),
      description: t("welfareSupportDesc"),
      features: [
        t("emergencyAid"),
        t("medicalSupport"),
        t("familyReunification"),
        t("crisisResponse"),
      ],
      color: "bg-red-500",
      detailedInfo: {
        processingTime: t("processingTime24_48h"),
        requirements: [
          t("proofOfNeed"),
          t("documentationCircumstances"),
          t("contactInformation"),
        ],
        fees: t("freeOfCharge"),
        additionalServices: [
          t("counselingServices"),
          t("financialAssistance"),
          t("temporaryAccommodation"),
        ],
      },
    },
    {
      icon: Building,
      title: t("businessSupport"),
      description: t("businessSupportDesc"),
      features: [
        t("tradeCertificates"),
        t("businessVisas"),
        t("investmentSupport"),
        t("commercialInfo"),
      ],
      color: "bg-indigo-500",
      detailedInfo: {
        processingTime: t("processingTime5to7"),
        requirements: [
          t("businessRegistration"),
          t("tradeDocuments"),
          t("financialStatements"),
        ],
        fees: t("feesFrom75USD"),
        additionalServices: [
          t("investmentGuidance"),
          t("tradeMissions"),
          t("businessNetworking"),
        ],
      },
    },
  ]

  const handleServiceInquiry = (service: any) => {
    setSelectedService(service)
  }

  const handleEmergencyContact = () => {
    window.open("tel:+25377123456", "_self")
  }

  return (
    <section id="consular" ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            {t("consularExcellenceTitle")}
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            {t("consularExcellenceDesc")}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`group hover:shadow-xl transition-all duration-500 hover:scale-105 border-2 hover:border-primary/20 ${
                isVisible ? "animate-scale-in" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="text-center pb-4">
                <div
                  className={`w-16 h-16 ${service.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg`}
                >
                  <service.icon className="h-8 w-8 text-white animate-pulse group-hover:animate-bounce" />
                </div>
                <CardTitle className="text-lg sm:text-xl font-bold text-foreground">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-center text-sm sm:text-base">{service.description}</p>
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-primary animate-pulse" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="w-full h-32 rounded-lg overflow-hidden mb-4">
                  <img
                    src={`/abstract-geometric-shapes.png?key=nl68i&height=128&width=300&query=${service.title.toLowerCase()} diplomatic office professional service`}
                    alt={`${service.title} service`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <Button
                  onClick={() => handleServiceInquiry(service)}
                  className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-105"
                >
                  {t("learnMore")}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Information */}
      <div
          className={`grid sm:grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 ${isVisible ? "animate-fade-in-up animate-delay-500" : "opacity-0"}`}
        >
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-6 lg:p-8">
              <h3 className="text-xl lg:text-2xl font-bold mb-6">{t("emergencyContact")}</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 animate-bounce" />
                  <span className="text-sm lg:text-base">{t("phone")}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 animate-bounce" />
                  <span className="text-sm lg:text-base">emergency@consulate.dj</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 animate-bounce" />
                  <span className="text-sm lg:text-base">{t("support24_7")}</span>
                </div>
              </div>
              <Button
                onClick={handleEmergencyContact}
                variant="secondary"
                className="w-full mt-6 bg-white text-primary hover:bg-gray-100 transition-all duration-300 hover:scale-105"
              >
                {t("callEmergencyLine")}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 lg:p-8">
              <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-6">{t("officeHours")}</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm lg:text-base">{t("mondayThursday")}</span>
                  <span className="text-muted-foreground text-sm lg:text-base">{t("mondayThursdayHours")}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm lg:text-base">{t("friday")}</span>
                  <span className="text-muted-foreground text-sm lg:text-base">{t("fridayHours")}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm lg:text-base">{t("saturday")}</span>
                  <span className="text-muted-foreground text-sm lg:text-base">{t("saturdayHours")}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm lg:text-base">{t("sunday")}</span>
                  <span className="text-muted-foreground text-sm lg:text-base">{t("closed")}</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="h-4 w-4 text-primary animate-pulse" />
                  <span>{t("consulateAddress")}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

   <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
    {selectedService && (
      <>
        <DialogHeader>
          <div className="flex items-center space-x-3 mb-4">
            <div className={`w-12 h-12 ${selectedService.color} rounded-full flex items-center justify-center`}>
              <selectedService.icon className="h-6 w-6 text-white" />
            </div>
            <DialogTitle className="text-2xl font-bold">{selectedService.title}</DialogTitle>
          </div>
          <DialogDescription className="text-base">{selectedService.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-lg mb-3 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-primary" />
                {t("processingTime")}
              </h4>
              <p className="text-muted-foreground">{selectedService.detailedInfo.processingTime}</p>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-3 flex items-center">
                <Star className="h-5 w-5 mr-2 text-primary" />
                {t("fees")}
              </h4>
              <p className="text-muted-foreground">{selectedService.detailedInfo.fees}</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-3">{t("requirements")}</h4>
            <ul className="space-y-2">
              {selectedService.detailedInfo.requirements.map((req: string, index: number) => (
                <li key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-3">{t("additionalServices")}</h4>
            <ul className="space-y-2">
              {selectedService.detailedInfo.additionalServices.map((service: string, index: number) => (
                <li key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button className="flex-1 bg-primary hover:bg-primary/90">{t("scheduleAppointment")}</Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              {t("downloadForms")}
            </Button>
          </div>
        </div>
      </>
    )}
  </DialogContent>
</Dialog>

    </section>
  )
}
