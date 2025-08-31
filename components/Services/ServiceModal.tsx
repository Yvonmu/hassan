import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useTranslation } from "@/hooks/use-translation";

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
}

export const ServiceModal = ({ isOpen, onClose, serviceName }: ServiceModalProps) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert({
      title: t("serviceRequestSubmitted"),
description: `${t("serviceRequestDescription")} ${serviceName}`,
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
<DialogTitle>{t("requestService")}: {serviceName}</DialogTitle>
          <DialogDescription>
            {t("serviceFormDescription")}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t("fullName")}</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">{t("emailAddress")}</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">{t("phoneNumber")}</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">{t("message")}</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder={t("messagePlaceholder")}
              required
            />
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              {t("cancel")}
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary">
              {t("submitRequest")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
