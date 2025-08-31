"use client";

import { useState } from "react";
import {
  FileText,
  Users,
  Phone,
  Clock,
  ExternalLink,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { Header } from "@/components/Services/Header";
import { ActionCard } from "@/components/Services/ActionCard";
import { ServiceCard } from "@/components/Services/ServiceCard";
import { VisaSection } from "@/components/Services/VisaSection";
import { ContactModal } from "@/components/Services/ContactModal";
import { ServiceModal } from "@/components/Services/ServiceModal";
export default function ConsularExcellence() {
  const { t } = useTranslation();
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
              title={t("emergencyHotline")}
              subtitle={t("immediateAssistance")}
              buttonText={t("callNow")}
              icon={<Phone className="w-6 h-6" />}
              onClick={() => handleContactModal("emergency")}
            />
            <ActionCard
              title={t("officeHours")}
              subtitle={t("officeSchedule")}
              buttonText={t("scheduleVisit")}
              icon={<Clock className="w-6 h-6" />}
              onClick={() => handleContactModal("schedule")}
            />
            <ActionCard
              title={t("eVisaPortal")}
              subtitle={t("visaServices")}
              buttonText={t("applyOnline")}
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
              title={t("emergencyAssistance")}
              priority={t("criticalPriority") as "Critical Priority"}
              description={t("emergencyDescription")}
              features={[
                t("availability247"),
                t("crisisManagement"),
                t("medicalSupport"),
                t("legalAssistance"),
              ]}
              icon={<AlertTriangle className="w-6 h-6 text-white" />}
              variant="critical"
              onRequestService={() =>
                handleServiceModal(t("emergencyAssistance"))
              }
            />

            <ServiceCard
              title={t("documentServices")}
              priority={t("highPriority") as "High Priority"}
              description={t("documentDescription")}
              features={[
                t("authentication"),
                t("officialStamps"),
                t("verification"),
                t("fastProcessing"),
              ]}
              icon={<FileText className="w-6 h-6 text-white" />}
              variant="high"
              onRequestService={() => handleServiceModal(t("documentServices"))}
            />

            <ServiceCard
              title={t("communitySupport")}
              priority={t("mediumPriority") as "Medium Priority"}
              description={t("communityDescription")}
              features={[
                t("citizenRegistration"),
                t("supportNetwork"),
                t("communityEvents"),
                t("culturalPrograms"),
              ]}
              icon={<Users className="w-6 h-6 text-white" />}
              variant="medium"
              onRequestService={() => handleServiceModal(t("communitySupport"))}
            />

            <ServiceCard
              title={t("businessDevelopment")}
              priority={t("highPriority") as "High Priority"}
              description={t("businessDescription")}
              features={[
                t("tradeSupport"),
                t("networking"),
                t("investmentInfo"),
                t("economicPartnerships"),
              ]}
              icon={<TrendingUp className="w-6 h-6 text-white" />}
              variant="high"
              onRequestService={() =>
                handleServiceModal(t("businessDevelopment"))
              }
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
  );
}
