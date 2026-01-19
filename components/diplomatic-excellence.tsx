/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Globe,
  Award,
  Briefcase,
  Languages,
  Handshake,
  AlertCircle,
} from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

interface DiplomaticExcellenceProps {
  data?: {
    title?: string;
    description?: string;
    competencies?: Array<{ name: string; value: number }>;
    activities?: Array<{ title: string; description: string; icon: string }>;
    responsibilities?: string[];
  } | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const iconMap: Record<string, React.ComponentType<any>> = {
  Users,
  Globe,
  Award,
  Briefcase,
  Languages,
  Handshake,
};

export default function DiplomaticExcellence({ data }: DiplomaticExcellenceProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const competencies = data?.competencies || [
    { name: t("competency1"), value: 95 },
    { name: t("competency2"), value: 92 },
    { name: t("competency3"), value: 88 },
    { name: t("competency4"), value: 90 },
    { name: t("competency5"), value: 85 },
  ];
  
  const activities = data?.activities?.map(activity => ({
    icon: iconMap[activity.icon] || Briefcase,
    title: activity.title,
    description: activity.description,
  })) || [
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
  ];

  const responsibilities = data?.responsibilities || [
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
        <div
          className={`text-center mb-16 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t("diplomaticExcellenceTitle")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("diplomaticExcellenceDesc")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16 h-full">
          {/* Professional Activity */}
          <div
            className={`space-y-8 h-full ${
              isVisible
                ? "animate-slide-in-left animate-delay-200"
                : "opacity-0"
            }`}
          >
            <div className="grid gap-8 h-full">
              <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent>
                  <div className="flex items-start space-x-4">
                    <div className="grid gap-4">
                      <h3 className="text-2xl font-bold text-foreground mb-6">
                        {t("professionalActivity")}
                      </h3>
                      <p className="text-muted-foreground">
                        {t("professionalActivityDesc")}
                      </p>

                      <div className="flex gap-2">
                        <img src="/icons/tick.svg" alt="" />
                        <p>{t("appointedArticle2")}</p>
                      </div>
                      <div className="flex gap-2">
                        <img src="/icons/tick.svg" alt="" />
                        <p>{t("voluntaryService")}</p>
                      </div>
                      <div className="flex gap-2">
                        <img src="/icons/tick.svg" alt="" />
                        <p>{t("emergencySupport")}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="flex flex-col justify-between">
               
                <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 bg-yellow-200/50 text-foreground">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                        <AlertCircle className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-foreground">{t("visaDisclaimer")}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          <div className="grid gap-8">
             <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center justify-center gap-4">
                      {/* <div className="flex items-center justify-center w-[20vh] h-[20vh] ">
                        <img
                          src="/hassan.webp"
                          alt={t("consulImageAlt")}
                          className="w-full object-cover h-full rounded-2xl"
                        />
                      </div> */}
                      <div className="flex items-center justify-center flex-col">
                        <h3 className="text-2xl font-bold text-foreground ">
                          Hassan Adan Hassan
                        </h3>
                        <Badge>{t("consulTitle")}</Badge>
                      </div>
                      <div className="space-y-3">
                        <p className="text-muted-foreground">
                          {t("consulDescription")}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
            {/* Core Competencies */}
            <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex flex-col items-start space-x-4">
                  <h3 className="text-2xl font-bold text-foreground mb-6">
                    {t("keyResponsibilities")}
                  </h3>
                  <div className="space-y-3">
                    {responsibilities.map((responsibility, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <p className="text-muted-foreground">
                          {responsibility}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
