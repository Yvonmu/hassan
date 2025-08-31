/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, BookCheck } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import Image from "next/image";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="home"
      className="relative md:min-h-screen h-full flex items-center justify-center pt-16 overflow-hidden"
    >
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/images/header.svg"
          alt=""
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div
            className={`space-y-12 ${
              isVisible ? "animate-slide-in-left" : "opacity-0"
            }`}
          >
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight drop-shadow-lg">
                {t("heroName")}
                <br />
                <span className="text-rwanda-blue">{t("heroTitle")}</span>
              </h1>
              <p className="text-xl text-foreground/90 max-w-lg drop-shadow-md">
                {t("heroDescription")}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => {
                  const element = document.getElementById("appointment");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="bg-foreground hover:bg-djibouti-blue/90 text-white px-8 py-3 text-lg font-medium transition-all duration-300 hover:scale-105 hover-lift"
              >
                <BookCheck className="h-5 w-5 mr-2" />
                {t("bookAppointment")}
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  const element = document.getElementById("consular");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="font-medium transition-all duration-300 hover:scale-105 hover:text-rwanda-green"
              >
                <Phone className="h-5 w-5 mr-2" />
                {t("consularServices")}
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex flex-col">
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight drop-shadow-lg">
                  {t("officialTitle")}
                </h1>
                <p>{t("diplomaticStatus")}</p>
              </div>
              <div className="flex flex-col">
                <h1 className="text-3xl lg:text-4xl font-bold text-[#E8B364] leading-tight drop-shadow-lg">
                  Kigali
                </h1>
                <p>{t("consulateLocation")}</p>
              </div>
              <div className="flex flex-col">
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight drop-shadow-lg">
                  {t("year")}
                </h1>
                <p>{t("appointedSince")}</p>
              </div>
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div
            className={`h-full min-h-[50vh] z-10 w-auto ${
              isVisible
                ? "animate-slide-in-right animate-delay-200"
                : "opacity-0"
            }`}
          >
            {/* Floating Background */}
            {/* <div className="absolute inset-0 bg-gradient-to-r from-rwanda-yellow/30 to-djibouti-green/30 rounded-2xl transform rotate-3 animate-float"></div> */}

            {/* Image Card */}
            <div className=" h-full md:w-3/4 w-full bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl hover-lift">
              <div className="relative p-2">
                {/* Image */}
                <Image
                  src="/images/hassan.png"
                  alt="Hassan Adan Hassan"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-lg object-cover"
                  priority
                />

                {/* Badge on top-right */}
                <div className="absolute top-4 right-4">
                  <Badge className="bg-rwanda-blue text-white">
                    {t("heroTitle")}
                  </Badge>
                </div>
              </div>
              <div className="relative">
                {/* Centered overlay partially on image */}
                <div className="absolute -top-20 left-1/2 flex flex-col gap-2 items-center -translate-x-1/2 bg-white/90 backdrop-blur-3xl w-3/4 text-center p-4 rounded-2xl text-">
                  <h1 className="text-2xl font-bold">Hassan Adan Hassan</h1>
                   <Badge>{t("consulTitle")}</Badge>
  <h3>{t("consulateFull")}</h3>
  <p>{t("location")}</p>
                  <div className="flex justify-center gap-2">
                    <div className="w-12 h-8 rounded-sm overflow-hidden shadow-sm relative">
                      <Image
                        src="/dj.png"
                        alt="Djibouti Flag"
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div className="w-12 h-8 rounded-sm overflow-hidden shadow-sm relative">
                      <Image
                        src="/rw.png"
                        alt="Rwanda Flag"
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
