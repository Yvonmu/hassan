/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, ExternalLink, Send } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "@/hooks/use-translation";
import Link from "next/link";
import { toast } from "sonner";
import { sendContactFormAction } from "@/actions/sendContactFormAction";

interface ContactSectionProps {
  globalSettings?: {
    contactInfo?: {
      phone?: string;
      email?: string;
      address?: string;
      officeHours?: string;
    };
  } | null;
}

const ContactSection = ({ globalSettings }: ContactSectionProps) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    subject: "",
    message: "",
    citizenship: "",
    appointmentDate: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await sendContactFormAction(formData);

      toast.success(t("contactF.messageSentTitle"), {
        description: t("contactF.messageSentDesc"),
      });

      setFormData({
        fullName: "",
        emailAddress: "",
        phoneNumber: "",
        subject: "",
        message: "",
        citizenship: "",
        appointmentDate: "",
      });
    } catch (error: any) {
      console.error(error);

      toast.error("Failed to send message", {
        description: error?.message || "Please try again later.",
      });
    }
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-muted/30 to-background" id="appointment">
      <div className="container mx-auto space-y-4">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            {t("contactF.appointments")}
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {t("contactF.scheduleAppointment")}
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            {t("contactF.sectionDescription")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6 animate-fade-in">
            <Card className="border-2 hover:border-primary/20 transition-all duration-300">
              <CardContent className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full">
                    <MapPin className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </div>
                  <CardTitle>{t("contactF.officeLocationTitle")}</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {t("contactF.officeLocationAddress")}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/20 transition-all duration-300">
              <CardContent className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                    <Mail className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle>{t("contactF.emailCommunication")}</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {globalSettings?.contactInfo?.email || "info@consuldjibouti.com"} - {t("contactF.responseTime")}
                </p>
                <p className="text-sm text-muted-foreground">{t("contactF.officialCorrespondence")}</p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/20 transition-all duration-300">
              <CardContent className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                    <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle>{t("contactF.operatingScheduleTitle")}</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{t("contactF.operatingDays")}</p>
                <p className="text-sm text-muted-foreground">{t("contactF.operatingHours")}</p>
                <p className="text-sm text-muted-foreground">{t("contactF.closedHolidays")}</p>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">{t("contactF.quickLinksTitle")}</h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  size="sm"
                  onClick={() =>
                    window.open(
                      "https://www.evisa.gouv.dj/applicant-api/#/",
                      "_blank"
                    )
                  }
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t("contactF.eVisaPortal")}
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  size="sm"
                  onClick={() =>
                    window.open(
                      "https://maps.app.goo.gl/WqxAz7ZhBfGphBdq5",
                      "_blank"
                    )
                  }
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  {t("contactF.viewOnMaps")}
                </Button>
              </div>
            </div>
          </div>

          {/* Contact / Appointment Form */}
          <div className="animate-fade-in grid gap-4">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>{t("contactF.sendMessageTitle")}</CardTitle>
                <p className="text-sm text-muted-foreground">{t("contactF.sendMessageDescription")}</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">{t("contactF.fullName")} *</Label>
                      <Input
                        id="fullName"
                        placeholder={t("contactF.fullNamePlaceholder")}
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        required
                        className="transition-all duration-200 focus:scale-[1.02]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emailAddress">{t("contactF.email")} *</Label>
                      <Input
                        id="emailAddress"
                        type="email"
                        placeholder={t("contactF.emailPlaceholder")}
                        value={formData.emailAddress}
                        onChange={(e) => handleInputChange("emailAddress", e.target.value)}
                        required
                        className="transition-all duration-200 focus:scale-[1.02]"
                      />
                    </div>
                  </div>

                  {/* Phone & Citizenship */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">{t("contactF.phoneNumber")}</Label>
                      <Input
                        id="phoneNumber"
                        placeholder={t("contactF.phoneNumberPlaceholder")}
                        value={formData.phoneNumber}
                        onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                        className="transition-all duration-200 focus:scale-[1.02]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="citizenship">{t("contactF.citizenship")}</Label>
                      <Input
                        id="citizenship"
                        placeholder={t("contactF.citizenshipPlaceholder")}
                        value={formData.citizenship}
                        onChange={(e) => handleInputChange("citizenship", e.target.value)}
                        className="transition-all duration-200 focus:scale-[1.02]"
                      />
                    </div>
                  </div>

                  {/* Subject & Appointment Date */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">{t("contactF.subject")} *</Label>
                      <Input
                        id="subject"
                        placeholder={t("contactF.subjectPlaceholder")}
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        required
                        className="transition-all duration-200 focus:scale-[1.02]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="appointmentDate">{t("contactF.preferredDate")}</Label>
                      <Input
                        id="appointmentDate"
                        type="datetime-local"
                        value={formData.appointmentDate}
                        onChange={(e) => handleInputChange("appointmentDate", e.target.value)}
                        className="transition-all duration-200 focus:scale-[1.02]"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">{t("contactF.message")} *</Label>
                    <Textarea
                      id="message"
                      placeholder={t("contactF.messagePlaceholder")}
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      required
                      rows={4}
                      className="transition-all duration-200 focus:scale-[1.02] resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" className="w-full hover-scale bg-primary hover:bg-primary/90" size="lg">
                    <Send className="w-4 h-4 mr-2" />
                    {t("contactF.sendMessageButton")}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Emergency Services */}
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6">
                <h4 className="text-xl font-bold mb-4">{t("contactF.emergencyServices")}</h4>
                <p className="mb-4 opacity-90">{t("contactF.emergencyText")}</p>
                <Button
                  variant="secondary"
                  className="bg-white text-primary hover:bg-gray-100 transition-all duration-300"
                  onClick={() => window.open(`tel:${globalSettings?.contactInfo?.phone || "+250780685486"}`, "_self")}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  {t("contactF.emergencyButton")}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="border rounded-xl text-center p-4 z-10 italic bg-blue/50 text-black">
          {t("contactF.appointmentNote")}{" "}
          <Link href={`mailto:${globalSettings?.contactInfo?.email || "info@consuldjibouti.com"}`} className="underline font-bold text-primary">
            {globalSettings?.contactInfo?.email || "info@consuldjibouti.com"}
          </Link>
        </div>

        {/* Office Location Map */}
        <div className="mt-16 animate-fade-in relative">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">{t("contactF.officeLocationTitle")}</h3>
          <p className="text-center text-muted-foreground mb-8">{t("contactF.officeVisitNote")}</p>
          <Card className="overflow-hidden border-2 relative h-[50vh]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.5414072591825!2d30.094960176285454!3d-1.9357753366836132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca73a26623bbf%3A0x538d89a55f1c342a!2sADHI!5e0!3m2!1sen!2srw!4v1756604004430!5m2!1sen!2srw"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            ></iframe>

            <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/30 text-center p-4">
              <p className="text-lg font-semibold text-white">{t("contactF.consulOffice")}</p>
              <p className="text-sm text-white">{t("contactF.consulAddress")}</p>
              <Button
                className="mt-4"
                variant="outline"
                size="sm"
                onClick={() =>
                  window.open(
                    "https://maps.app.goo.gl/WqxAz7ZhBfGphBdq5",
                    "_blank"
                  )
                }
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                {t("contactF.openInMaps")}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
