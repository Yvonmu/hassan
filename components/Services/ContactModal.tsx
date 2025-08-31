import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "emergency" | "schedule" | "embassy";
}

export const ContactModal = ({ isOpen, onClose, type }: ContactModalProps) => {
  const { t } = useTranslation();
  const officeHoursDetails = [
    t("officeHoursDetails.0"), // "Monday - Thursday: 8:00 AM - 5:00 PM"
    t("officeHoursDetails.1"), // "Friday: 8:00 AM - 12:00 PM"
    t("officeHoursDetails.2"), // "Saturday: 9:00 AM - 1:00 PM"
    t("officeHoursDetails.3"), // "Sunday: Closed"
  ];

  const getModalContent = () => {
    switch (type) {
      case "emergency":
        return {
          title: t(`emergencyHotline`),
          description: t(`emergencyDescription`),
          content: (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-critical/10 rounded-lg">
                <Phone className="w-5 h-5 text-critical" />
                <div>
                  <p className="font-semibold">{t(`emergencyLine`)}</p>
                  <a
                    href="tel:+250780685486"
                    className="text-critical hover:underline"
                  >
                    +250 (0) 780 685 486
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-semibold">{t(`emergencyEmail`)}</p>
                  <a
                    href="mailto:info@consuldjibouti.com"
                    className="text-primary hover:underline"
                  >
                    info@consuldjibouti.com
                  </a>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {t(`available24h`)}
              </p>
            </div>
          ),
        };
      case "schedule":
        return {
          title: t(`scheduleVisit`),
          description: t(`scheduleDescription`),
          content: (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <div>
                  {officeHoursDetails.map((line, index) => (
                    <p key={index} className="text-sm">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                <Phone className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-semibold">{t(`appointmentLine`)}</p>
                  <a
                    href="tel:++250780685486"
                    className="text-primary hover:underline"
                  >
                    +250 (0) 780 685 486
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-semibold">{t(`email`)}</p>
                  <a
                    href="mailto:info@consuldjibouti.com"
                    className="text-primary hover:underline"
                  >
                    info@consuldjibouti.com
                  </a>
                </div>
              </div>
            </div>
          ),
        };
      case "embassy":
        return {
          title: t(`embassyInfo`),
          description: t(`embassyDescription`),
          content: (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-semibold">{t(`address`)}</p>
                  <p className="text-sm">
                    123 Diplomatic Avenue
                    <br />
                    Kigali, Rwanda
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                <Phone className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-semibold">{t(`mainLine`)}</p>
                  <a
                    href="tel:+250111222333"
                    className="text-primary hover:underline"
                  >
                    +250 111 222 333
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-semibold">{t(`generalEmail`)}</p>
                  <a
                    href="mailto:info@consuldjibouti.com"
                    className="text-primary hover:underline"
                  >
                    info@consuldjibouti.com
                  </a>
                </div>
              </div>
            </div>
          ),
        };
      default:
        return { title: "", description: "", content: null };
    }
  };

  const { title, description, content } = getModalContent();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {content}
        <div className="flex justify-end mt-6">
          <Button onClick={onClose} variant="outline">
            {t("close")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
