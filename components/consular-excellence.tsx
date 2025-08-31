/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import {
  FileText,
  Users,
  Phone,
  Clock,
  ExternalLink,
  AlertTriangle,
  TrendingUp,
} from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"
import { Header } from "@/components/Services/Header";
import { ActionCard } from "@/components/Services/ActionCard";
import { ServiceCard } from "@/components/Services/ServiceCard";
import { VisaSection } from "@/components/Services/VisaSection";
import { ContactModal } from "@/components/Services/ContactModal";
import { ServiceModal } from "@/components/Services/ServiceModal";
export default function ConsularExcellence() {
  const { t } = useTranslation()
  const [contactModal, setContactModal] = useState<{
    isOpen: boolean;
    type: "emergency" | "schedule" | "embassy";
  }>({ isOpen: false, type: "emergency" });
  
  const [serviceModal, setServiceModal] = useState<{
    isOpen: boolean;
    serviceName: string;
  }>({ isOpen: false, serviceName: "" });

  const handleContactModal = (type: "emergency" | "schedule" | "embassy") => {
    setContactModal({ isOpen: true, type });
  };

  const handleServiceModal = (serviceName: string) => {
    setServiceModal({ isOpen: true, serviceName });
  };

  const handleVisaPortal = () => {
    window.open("https://www.evisa.gouv.dj/applicant-api/#/", "_blank");
  };


  return (
    <div className="min-h-screen bg-background" id="consular">
      <Header />
      
      {/* Action Cards Section */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ActionCard
              title="Emergency Hotline"
              subtitle="Immediate assistance"
              buttonText="Call Now"
              icon={<Phone className="w-6 h-6" />}
              onClick={() => handleContactModal("emergency")}
            />
            <ActionCard
              title="Office Hours"
              subtitle="Monday-Friday: 10:00-16:00"
              buttonText="Schedule Visit"
              icon={<Clock className="w-6 h-6" />}
              onClick={() => handleContactModal("schedule")}
            />
            <ActionCard
              title="eVisa Portal"
              subtitle="Official visa services"
              buttonText="Apply Online"
              icon={<ExternalLink className="w-6 h-6" />}
              onClick={handleVisaPortal}
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  <ServiceCard
    title="Emergency Assistance"
    priority="Critical Priority"
    description="24/7 crisis support for Djiboutian nationals facing medical emergencies, legal difficulties, and urgent travel situations in Rwanda."
    features={[
      "24/7 Availability",
      "Crisis Management", 
      "Medical Support",
      "Legal Assistance"
    ]}
    icon={<AlertTriangle className="w-6 h-6 text-white" />}   // 🔴 custom color
    variant="critical"
    onRequestService={() => handleServiceModal("Emergency Assistance")}
  />

  <ServiceCard
    title="Document Services"
    priority="High Priority"
    description="Professional authentication and verification of documents with official consular attestation and proper protocols."
    features={[
      "Authentication",
      "Official Stamps",
      "Verification", 
      "Fast Processing"
    ]}
    icon={<FileText className="w-6 h-6 text-white" />}   // 🔵 custom color
    variant="high"
    onRequestService={() => handleServiceModal("Document Services")}
  />

  <ServiceCard
    title="Community Support"
    priority="Medium Priority"
    description="Registration services and community building for Djiboutian citizens residing in Rwanda, maintaining comprehensive records."
    features={[
      "Citizen Registration",
      "Support Network",
      "Community Events",
      "Cultural Programs"
    ]}
    icon={<Users className="w-6 h-6 text-white" />}   // 🟢 custom color
    variant="medium"
    onRequestService={() => handleServiceModal("Community Support")}
  />

  <ServiceCard
    title="Business Development"
    priority="High Priority"
    description="Trade facilitation and business networking to strengthen economic partnerships between Djibouti and Rwanda."
    features={[
      "Trade Support",
      "Networking",
      "Investment Info",
      "Economic Partnerships"
    ]}
    icon={<TrendingUp className="w-6 h-6 text-white" />}   // 🟣 custom color
    variant="high"
    onRequestService={() => handleServiceModal("Business Development")}
  />
</div>

        </div>
      </section>

      <VisaSection />

      {/* Modals */}
      <ContactModal
        isOpen={contactModal.isOpen}
        onClose={() => setContactModal({ ...contactModal, isOpen: false })}
        type={contactModal.type}
      />
      
      <ServiceModal
        isOpen={serviceModal.isOpen}
        onClose={() => setServiceModal({ ...serviceModal, isOpen: false })}
        serviceName={serviceModal.serviceName}
      />
    </div>

  )
}
