import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/use-translation";

export const Header = () => {
    const { t } = useTranslation();
  return (
    <header className="text-center py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Badge
          variant="secondary"
          className="mb-6 bg-primary text-primary-foreground px-4 py-2 text-sm font-medium"
        >
          Professional Services
        </Badge>

        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
         {t("consularExcellenceTitle")}
        </h1>

        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
       {t("consularExcellenceDesc")}
        </p>
      </div>
    </header>
  );
};
