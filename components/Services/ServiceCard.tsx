/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  title: string;
  priority: "Critical Priority" | "High Priority" | "Medium Priority";
  description: string;
  features: string[];
  icon: React.ReactNode;
  variant?: "critical" | "high" | "medium";
  onRequestService: () => void;
}

const priorityGradients: Record<"critical" | "high" | "medium", string> = {
  critical: "bg-gradient-to-br from-[#EF4444] to-[#EC4899]",
  high: "bg-gradient-to-br from-[#3B82F6] to-[#06B6D4]",
  medium: "bg-gradient-to-br from-[#22C55E] to-[#10B981]",
};

const badgeColors: Record<"critical" | "high" | "medium", string> = {
  critical: "bordeer-[#EC4899] text-[#EC4899]",
  high: "border-[#06B6D4] text-[#06B6D4]",
  medium: "border-[#10B981] text-[#10B981]",
};

export const ServiceCard = ({
  title,
  priority,
  description,
  features,
  icon,
  variant = "high",
  onRequestService,
}: ServiceCardProps) => {
  const variantKey =
    priority === "Critical Priority"
      ? "critical"
      : priority === "High Priority"
      ? "high"
      : "medium";

  return (
    <Card className="relative overflow-hidden border-2 hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        {/* Icon + Title */}
        <div className="flex items-start gap-4">
          {/* Icon container with gradient */}
          <div
            className={`p-3 rounded-lg shadow-md flex items-center justify-center ${priorityGradients[variantKey]}`}
          >
            {/* Force icon to a contrasting color */}
            <div className="text-black">{icon}</div>
          </div>

          <div className="flex-1">
            <div className="flex flex-col gap-2 mb-2">
              <h3 className="text-xl font-semibold text-foreground">{title}</h3>
              <Badge variant="outline" className={`${badgeColors[variantKey]}`}>
                {priority}
              </Badge>
            </div>
           
          </div>
        </div>
 <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              {description}
            </p>
        {/* Features */}
        {/* Features with custom blue bullets */}
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-center gap-2 text-sm text-foreground"
            >
              {/* Custom blue bullet */}
              <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-primary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Action */}
        <Button
          onClick={onRequestService}
          className="w-full bg-primary hover:bg-primary text-primary-foreground"
        >
          Request Service
        </Button>
      </CardContent>
    </Card>
  );
};
