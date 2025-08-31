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

const ContactSection = () => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert({
      title: "Message Sent",
      description: "We'll respond to your inquiry within 24 hours.",
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
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-muted/30 to-background" id="appointment">
      <div className="container mx-auto space-y-4">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Appointments
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Schedule an Appointment{" "}
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Connect with the Honorary Consulate for professional diplomatic
            services, emergency assistance, or general inquiries about
            Djibouti-Rwanda relations.
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
                  <CardTitle>Office Location</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  KG 523 Street, No 2, Nyarutarama, Kigali, Rwanda
                </p>
              </CardContent>
            </Card>


            <Card className="border-2 hover:border-primary/20 transition-all duration-300">
              <CardContent className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                    <Mail className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle>Email Communication</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                 info@consuldjibouti.com 
                  Response within 24h
                </p>
                <p className="text-sm text-muted-foreground">
                  Official Correspondence
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/20 transition-all duration-300">
              <CardContent className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                    <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle>Operating Schedule</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Monday - Friday
                </p>
                <p className="text-sm text-muted-foreground">
                  10:00 AM - 4:00 PM
                </p>
                <p className="text-sm text-muted-foreground">
                  Closed Public Holidays
                </p>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Quick Links</h3>
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
                  Djibouti eVisa Portal
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
                  View on Google Maps
                </Button>
              </div>
            </div>
          </div>

          {/* Contact / Appointment Form */}
          <div className="animate-fade-in grid gap-4">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Send a Message / Request Appointment</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Reach out for consular services, emergency assistance, or
                  diplomatic inquiries. We respond to all messages within 24
                  hours during business days.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={(e) =>
                          handleInputChange("fullName", e.target.value)
                        }
                        required
                        className="transition-all duration-200 focus:scale-[1.02]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emailAddress">Email Address *</Label>
                      <Input
                        id="emailAddress"
                        type="email"
                        placeholder="your.email@domain.com"
                        value={formData.emailAddress}
                        onChange={(e) =>
                          handleInputChange("emailAddress", e.target.value)
                        }
                        required
                        className="transition-all duration-200 focus:scale-[1.02]"
                      />
                    </div>
                  </div>

                  {/* Phone & Citizenship */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <Input
                        id="phoneNumber"
                        placeholder="+250 XXX XXX XXX"
                        value={formData.phoneNumber}
                        onChange={(e) =>
                          handleInputChange("phoneNumber", e.target.value)
                        }
                        className="transition-all duration-200 focus:scale-[1.02]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="citizenship">Citizenship Status</Label>
                      <Input
                        id="citizenship"
                        placeholder="Your nationality"
                        value={formData.citizenship}
                        onChange={(e) =>
                          handleInputChange("citizenship", e.target.value)
                        }
                        className="transition-all duration-200 focus:scale-[1.02]"
                      />
                    </div>
                  </div>

                  {/* Subject & Appointment Date */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        placeholder="Visa inquiry, Emergency, Administration..."
                        value={formData.subject}
                        onChange={(e) =>
                          handleInputChange("subject", e.target.value)
                        }
                        required
                        className="transition-all duration-200 focus:scale-[1.02]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="appointmentDate">
                        Preferred Appointment Date & Time
                      </Label>
                      <Input
                        id="appointmentDate"
                        type="datetime-local"
                        value={formData.appointmentDate}
                        onChange={(e) =>
                          handleInputChange("appointmentDate", e.target.value)
                        }
                        className="transition-all duration-200 focus:scale-[1.02]"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Please describe your inquiry, required services, or specific needs..."
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                      required
                      rows={4}
                      className="transition-all duration-200 focus:scale-[1.02] resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full hover-scale bg-primary hover:bg-primary/90"
                    size="lg"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
            {/* Additional Services */}
         <Card className="bg-primary text-primary-foreground">
  <CardContent className="p-6">
    <h4 className="text-xl font-bold mb-4">
      {t("emergencyServices")}
    </h4>
    <p className="mb-4 opacity-90">
      Emergency situations require immediate telephone contact at  {" "}
      <span className="font-semibold">+250 (0) 780 685 486</span> for fastest response.
    </p>
    <Button
      variant="secondary"
      className="bg-white text-primary hover:bg-gray-100 transition-all duration-300"
      onClick={() => window.open("tel:+250780685486", "_self")}
    >
      <Phone className="h-4 w-4 mr-2" />
      {t("contact.emergencyButton")}
    </Button>
  </CardContent>
</Card>

          </div>
        </div>
        <div className="border rounded-xl text-center p-4 italic bg-blue/50 text-black">
          &quot;All appointment requests are processed via email to{" "}
          <Link
            href={"mailto:info@consuldjibouti.com"}
            className="underline font-bold text-primary"
          >
            info@consuldjibouti.com
          </Link>{" "}
          and confirmations are sent within 24 hours during business days.&quot;
        </div>
        {/* Office Location Map */}
        <div className="mt-16 animate-fade-in relative">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
            Office Location
          </h3>
          <p className="text-center text-muted-foreground mb-8">
            Visit us at our Kigali office for in-person consultations
          </p>
          <Card className="overflow-hidden border-2 relative h-[50vh]">
            {/* Google Map */}
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

            {/* Absolute overlay content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/30 text-center p-4">
              <p className="text-lg font-semibold text-white">
                Consul Location Office
              </p>
              <p className="text-sm text-white">
                KG 523 Street, Nyarutarama, Kigali
              </p>
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
                Open in Maps
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
export default ContactSection;
