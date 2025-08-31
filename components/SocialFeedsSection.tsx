import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Twitter, Building2 } from "lucide-react";

export const SocialFeedsSection = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-background to-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Live Social Feeds
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Follow real-time updates and breaking news from official government sources and verified accounts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="hover-scale animate-fade-in border-2 hover:border-primary/20 transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <Twitter className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-lg">Twitter Updates</CardTitle>
                  <p className="text-sm text-muted-foreground">Real-time news and updates</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between border rounded-full p-4 items-center">
                  <span className="text-sm text-muted-foreground">Live Feed</span>
                  <Button size="sm" variant="outline" className="hover:bg-blue-50 dark:hover:bg-blue-900/20">
                    Follow
                  </Button>
                </div>
                <div className="h-24 bg-muted/50 rounded-lg flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">Latest embassy updates and announcements</p>
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
                  <CardTitle className="text-lg">Government News</CardTitle>
                  <p className="text-sm text-muted-foreground">Official announcements</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between border rounded-full p-4 items-center">
                  <span className="text-sm text-muted-foreground">Official</span>
                  <Button size="sm" variant="outline" className="hover:bg-green-50 dark:hover:bg-green-900/20">
                    Follow
                  </Button>
                </div>
                <div className="h-24 bg-muted/50 rounded-lg flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">Government policies and diplomatic updates</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center animate-fade-in">
          <p className="text-sm text-muted-foreground max-w-4xl mx-auto">
            These sources provide reliable, up-to-date information about Djibouti&apos;s political landscape, 
            economic developments, cultural events, and international relations. Stay informed about 
            developments that may affect consular services, business opportunities, and bilateral 
            cooperation between Djibouti and Rwanda.
          </p>
        </div>
      </div>
    </section>
  );
};