import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { ContactModal } from "./ContactModal";
import { useState } from "react";

export const VisaSection = () => {
  const [showEmbassyModal, setShowEmbassyModal] = useState(false);
 const handleVisaPortal = () => {
    window.open("https://www.evisa.gouv.dj/applicant-api/#/", "_blank");
  };
  const handleEmbassyPortal = () => {
    window.open("https://www.visahq.com/djibouti/embassy/ethiopia/", "_blank");
  };

  

  return (
    <>
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <Card className="text-center border-2 bg-primary/20">
            <CardContent className="p-8">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-primary rounded-full text-primary-foreground">
                  <ExternalLink className="w-6 h-6" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-foreground mb-4">
                Visa & Immigration Services
              </h2>

              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                For visa applications, passport renewals, and official
                immigration documentation, please use the official Djibouti
                eVisa portal or contact the Embassy directly.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleVisaPortal}
                  className="bg-primary hover:bg-primary text-primary-foreground px-8"
                >
                  Visit eVisa Portal
                </Button>
                <Button
                  onClick={handleEmbassyPortal}
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8"
                >
                  Embassy Information
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <ContactModal
        isOpen={showEmbassyModal}
        onClose={() => setShowEmbassyModal(false)}
        type="embassy"
      />
    </>
  );
};
