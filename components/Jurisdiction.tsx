/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  Send,
  Info,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "@/hooks/use-translation";
import Link from "next/link";

const JurisdictionSection = () => {
  const { t } = useTranslation();

  return (
    <section
      className="py-16 px-4 bg-gradient-to-br from-muted/30 to-background"
      id="appointment"
    >
      <div className="container mx-auto space-y-4">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            {t("embassyLabel")}
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {t("jurisdictionTitle")}
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            {t("jurisdictionDescription")}
          </p>
        </div>
         <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 bg-yellow-200/50 text-foreground">
              <CardContent className="">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                    <Info className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground">
                      {t("visaPassportInfoStart")}{" "}
                      <Link
                        href={"https://www.evisa.gouv.dj/applicant-api/#/"}
                        className="text-primary underline hover:text-primary/90 hover:no-underline hover:cursor-pointer"
                      >
                        {t("applyDjiboutiEVisaOnline")}
                      </Link>{" "}
                      {t("visaPassportInfoEnd")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6 animate-fade-in">
            <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex flex-col items-start space-x-4">
                  <h3 className="text-2xl font-bold text-foreground mb-6">
                    {t("operationalDetailsTitle")}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <p className="text-muted-foreground">
                        {t("jurisdiction")}: {t("republicRwanda")}
                      </p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <p className="text-muted-foreground">
                        {t("supervisingAuthority")}: {t("embassyDjiboutiEthiopia")}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <p className="text-muted-foreground">
                        {t("operatingHours")}: {t("mondayToFriday")} 10:00-16:00
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <p className="text-muted-foreground">
                        {t("closedPublicHolidays")}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            
          </div>

          {/* Contact / Appointment Form */}
          <div className="animate-fade-in grid gap-4">
           
            <Card className="overflow-hidden border-2 relative h-[30vh]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.76460971822!2d38.7777185!3d8.993794700000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b84559dd44d43%3A0xd3516fb9342d63ea!2sEmbassy%20of%20Djibouti!5e0!3m2!1sen!2srw!4v1756608283729!5m2!1sen!2srw"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              ></iframe>
            </Card>
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">{t("quickLinks")}</h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  size="sm"
                  onClick={() => window.open("tel:+251116613200", "_blank")}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  +251 11 661 3200
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  size="sm"
                  onClick={() =>
                    window.open(
                      "https://www.google.com/maps/search/Embassy+of+Djibouti+Addis+Ababa",
                      "_blank"
                    )
                  }
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  {t("viewOnGoogleMapsEmbassyDjibouti")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JurisdictionSection;
