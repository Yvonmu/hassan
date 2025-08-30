/* eslint-disable @next/next/no-img-element */
"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Users, Globe, Award, Briefcase, Languages, Handshake } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"

export default function DiplomaticExcellence() {
  const [isVisible, setIsVisible] = useState(false)
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

  const competencies = [
    { name: t("competency1"), value: 95 },
    { name: t("competency2"), value: 92 },
    { name: t("competency3"), value: 88 },
    { name: t("competency4"), value: 90 },
    { name: t("competency5"), value: 85 },
  ]
const activities = [
  {
    icon: Users,
    title: t("activity1_name"),
    description: t("activity1_desc"),
  },
  {
    icon: Globe,
    title: t("activity2_name"),
    description: t("activity2_desc"),
  },
  {
    icon: Award,
    title: t("activity3_name"),
    description: t("activity3_desc"),
  },
  {
    icon: Briefcase,
    title: t("activity4_name"),
    description: t("activity4_desc"),
  },
  {
    icon: Briefcase,
    title: t("activity5_name"),
    description: t("activity5_desc"),
  },
]

const responsibilities = [
  t("strategicPlanning"),
  t("treatyNegotiation"),
  t("crossCulturalCommunication"),
  t("economicPolicyAnalysis"),
  t("crisisManagement"),
  t("diplomaticProtocol"),
];


  return (
    <section id="diplomatic" ref={sectionRef} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">{t("diplomaticExcellenceTitle")}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t("diplomaticExcellenceDesc")}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Professional Activity */}
          <div className={`space-y-8 ${isVisible ? "animate-slide-in-left animate-delay-200" : "opacity-0"}`}>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">{t("professionalActivity")}</h3>
              <div className="grid gap-6">
                {activities.map((activity, index) => (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                          <activity.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">{activity.title}</h4>
                          <p className="text-muted-foreground text-sm">{activity.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Key Responsibilities */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">{t("keyResponsibilities")}</h3>
              <div className="space-y-3">
                {responsibilities.map((responsibility, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <p className="text-muted-foreground">{responsibility}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Core Competencies */}
          <div className={`space-y-8 ${isVisible ? "animate-slide-in-right animate-delay-300" : "opacity-0"}`}>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">{t("coreCompetencies")}</h3>
              <div className="space-y-6">
                {competencies.map((competency, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-foreground">{competency.name}</span>
                      <span className="text-sm text-muted-foreground">{competency.value}%</span>
                    </div>
                    <Progress
                      value={isVisible ? competency.value : 0}
                      className="h-2 transition-all duration-1000 ease-out"
                      style={{ transitionDelay: `${index * 200}ms` }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Profile Image */}
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src="/diplomatic-professional-meeting.png"
                    alt="Diplomatic Excellence"
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-primary text-primary-foreground">
                        <Languages className="h-3 w-3 mr-1" />
                        Multilingual
                      </Badge>
                      <Badge className="bg-secondary text-secondary-foreground">
                        <Handshake className="h-3 w-3 mr-1" />
                        Expert Negotiator
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
