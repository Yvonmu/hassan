import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ActionCardProps {
  title: string;
  subtitle: string;
  buttonText: string;
  icon: React.ReactNode;
  onClick: () => void;
}

export const ActionCard = ({ title, subtitle, buttonText, icon, onClick }: ActionCardProps) => {
  return (
    <Card className="text-center hover:shadow-lg transition-all duration-300 border-2">
      <CardContent className="p-6">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-primary rounded-full text-primary-foreground">
            {icon}
          </div>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4">{subtitle}</p>
        <Button 
          onClick={onClick}
          className="bg-primary hover:bg-primary text-primary-foreground px-6"
          size="sm"
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};