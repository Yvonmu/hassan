"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Twitter, Building2 } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import Link from "next/link";
import VideoGalleryDialog from "./VideoGalleryDialog";

export const SocialFeedsSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-background to-muted/30">
      <div className="max-w-6xl mx-auto flex flex-col gap-4">
        <div className="text-center animate-fade-in">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {t("socialFeedsTitle")}
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            {t("socialFeedsDescription")}
          </p>
        </div>
        <VideoGalleryDialog />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="hover-scale animate-fade-in border-2 hover:border-primary/20 transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <Twitter className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-lg">
                    {t("twitterUpdatesTitle")}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {t("twitterUpdatesDesc")}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between border rounded-full p-4 items-center">
                  <span className="text-sm text-muted-foreground">
                    {t("liveFeedLabel")}
                  </span>
                  <Link
                    href={"https://x.com/consuldjibrw?s=21"}
                    className="hover:bg-green-50 border-2 rounded-2xl border-primary bg-white p-1 px-4 dark:hover:bg-green-900/20"
                  >
                    {t("followButton")}
                  </Link>
                </div>
                <div className="h-24 bg-muted/50 rounded-lg flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">
                    {t("twitterLatestUpdates")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-scale animate-fade-in border-2 hover:border-primary/20 transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <Building2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <CardTitle className="text-lg">
                    {t("governmentNewsTitle")}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {t("governmentNewsDesc")}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between border rounded-full p-4 items-center">
                  <span className="text-sm text-muted-foreground">
                    {t("officialLabel")}
                  </span>
                  <Link
                    href={"https://x.com/EybeAbdi"}
                    className="hover:bg-green-50 border-2 rounded-2xl border-primary bg-white p-1 px-4 dark:hover:bg-green-900/20"
                  >
                    {t("followButton")}
                  </Link>
                </div>
                <div className="h-24 bg-muted/50 rounded-lg flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">
                    {t("governmentUpdates")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center animate-fade-in">
          <p className="text-sm text-muted-foreground max-w-4xl mx-auto">
            {t("socialFeedsFooter")}
          </p>
        </div>
      </div>
    </section>
  );
};
