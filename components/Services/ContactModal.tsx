import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "emergency" | "schedule" | "embassy";
}

export const ContactModal = ({ isOpen, onClose, type }: ContactModalProps) => {
  const getModalContent = () => {
    switch (type) {
      case "emergency":
        return {
          title: "Emergency Hotline",
          description: "24/7 emergency assistance for Djiboutian nationals",
          content: (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-critical/10 rounded-lg">
                <Phone className="w-5 h-5 text-critical" />
                <div>
                  <p className="font-semibold">Emergency Line</p>
                  <a href="tel:+250780685486" className="text-critical hover:underline">
                    +250 (0) 780 685 486
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-semibold">Emergency Email</p>
                  <a href="mailto:info@consuldjibouti.com" className="text-primary hover:underline">
                    info@consuldjibouti.com
                  </a>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Available 24/7 for medical emergencies, legal issues, and urgent travel situations.
              </p>
            </div>
          )
        };
      case "schedule":
        return {
          title: "Schedule a Visit",
          description: "Book an appointment during office hours",
          content: (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-semibold">Office Hours</p>
                  <p className="text-sm">Monday - Friday: 10:00 - 16:00</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                <Phone className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-semibold">Appointment Line</p>
                  <a href="tel:+250987654321" className="text-primary hover:underline">
                    +250 987 654 321
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-semibold">Email</p>
                  <a href="mailto:info@consuldjibouti.com" className="text-primary hover:underline">
                    info@consuldjibouti.com
                  </a>
                </div>
              </div>
            </div>
          )
        };
      case "embassy":
        return {
          title: "Embassy Information",
          description: "Contact details and location",
          content: (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-semibold">Address</p>
                  <p className="text-sm">123 Diplomatic Avenue<br />Kigali, Rwanda</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                <Phone className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-semibold">Main Line</p>
                  <a href="tel:+250111222333" className="text-primary hover:underline">
                    +250 111 222 333
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-semibold">General Email</p>
                  <a href="mailto:info@consuldjibouti.com" className="text-primary hover:underline">
                    info@consuldjibouti.com
                  </a>
                </div>
              </div>
            </div>
          )
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
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};