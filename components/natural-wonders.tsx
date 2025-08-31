/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Camera,  ExternalLink } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";

export default function NaturalWonders() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const wonders = [
    // {
    //   title: t("lakeAssalTitle"),
    //   location: t("lakeAssalLocation"),
    //   description: t("lakeAssalDescription"),
    //   image: "/images/assal.png",
    //   rating: 4.8,
    //   category: t("naturalWonder"),
    // },
   
    {
      title: `Moucha & Maskali Islands`,
      location: t("ardoukobaVolcanoLocation"),
      description: `The islands of Moucha and Maskali are located in the Gulf of Tadjoura in Djibouti. The two islands are a group of rocky coral reefs that date back to the Upper Pleistocene (140,000 to 100,000 BC).
These small desert islands are a lush oasis filled with mangroves, where the landscapes of underwater trees as well as multi-colored algae and coral gardens are natural scenes of great beauty. The islands' fish-filled waters are home to exceptional marine fauna such as the Red-billed tropicbird, Western reef heron, and the Eurasian spoonbill, as well as whale shark, Round ribbontail ray and various turtles.
The islands of Moucha and Maskali and Mcale are distinguished by their sandy beaches and exceptional landscapes.`,
      image: "/images/Moucha_Island.jpg",
      rating: 4.5,
      category: t("volcanicSite"),
      link: `https://archiqoo.com/unesco/unesco_natural_sub_lists.php?uw_country=djibouti&subsite=moucha_maskali_islands`,
    },

    {
      title: `Lake Assal, on the peaceful lands`,
      location: t("lakeAssalLocation"),
      description: `Lake Assal and its Intangible Heritage From Djibouti City, it takes an hour and a half to reach Lake Assal, a site that attracts geologists and volcanologists from all over the world. Lake Assal is located less than 157m below sea level, making it the highest point…`,
      image: "/images/assal_5672-e1552151713486.jpg",
      rating: 4.8,
      category: t("naturalWonder"),
      link: "https://guide.visitdjibouti.dj/le-lac-assal-sur-les-terres-apaisees/",
    },
    {
      title: `A country where MIXING is the BARYCENTRE`,
      location: `A country where MIXING is the BARYCENTRE Djiboutian culture draws its source from the ancestral nomadic origins of the various ethnic communities that compose it. This culture presents a wide range of folkloric repertoire including songs, poetry and varied dances where epic and lyrical styles embrace and embrace each other. The…`,
      description: t("lacAbbeDescription"),
      image: "/images/culture-9-e1551264296617.jpg",
      rating: 4.9,
      category: t("geologicalSite"),
      link: `https://guide.visitdjibouti.dj/un-pays-ou-le-brassage-est-le-barycentre/`,
    },
    {
      title: `Lake Abbé, lunar landscapes`,
      location: `Lake Abbot, lunar landscapes Don't miss a visit to Lake Abbot and its magical landscapes. When the sun sets behind the limestone chimneys, the landscape takes on the appearance of a fantasy world. These needle-shaped chimneys, from a few meters to more than fifty meters high,…`,
      description: t("dayForestDescription"),
      image: "/images/lacabbe-16.jpg",
      rating: 4.7,
      category: t("nationalPark"),
      link: `https://guide.visitdjibouti.dj/le-lac-abbe-des-paysages-lunaires/`,
    },
    {
      title: `Archaeological Discoveries`,
      location: `Balho in Prehistory For lovers of discovery with the soul of an explorer, you must continue your pilgrimage further to the prehistoric site of Balho, 80 km north of Lake Assal. Some sites are exceptionally rich and contain prehistoric rock art. These remains, still little explored by…`,
      description: t("djiboutiHarborDescription"),
      image: "/images/balho.jpg",
      rating: 4.6,
      category: t("urbanLandmark"),
      link: `https://guide.visitdjibouti.dj/les-decouvertes-archeologiques/`,
    },
     {
      title: `Obock`,
      location: t("lacAbbeLocation"),
      description: `Nearby Obock, the first French settlement in the region, offers a glimpse into colonial history with its old port and traditional architecture, making both towns rich cultural heritage sites along the Red Sea coastline.`,
      image: "/images/obock.jpg",
      rating: 4.9,
      category: t("geologicalSite"),
      link:"https://guide.visitdjibouti.dj/obock/"
    },
    {
      title: `Tadjoura`,
      location: t("dayForestLocation"),
      description: `Explore Tadjoura, one of the oldest towns in Djibouti, known for its whitewashed houses and historic mosques, reflecting centuries of trade and culture.`,
      image: "/images/tadjoura.png",
      rating: 4.7,
      category: t("nationalPark"),
      link:"https://www.britannica.com/place/Djibouti"
    },
    {
      title: `Ghoubbet al-Kharab`,
      location: t("djiboutiHarborLocation"),
      description: `Known as the "Devil's Cauldron," this dramatic bay features steep volcanic cliffs, crystal-clear waters, and exceptional diving opportunities with diverse marine life, including whale sharks.`,
      image: "/images/gouk.png",
      rating: 4.6,
      category: t("urbanLandmark"),
      link:`https://en.wikipedia.org/wiki/Ghoubbet-el-Kharab`
    },
    {
      title: `Day Forest National Park`,
      location: t("mouchaIslandLocation"),
      description: `Djibouti's only national park 
features rare juniper forests and
unique highland ecosystems,
offering hiking trails and wildlife
observation opportunities in cooler
mountain climates.`,
      image: "/images/Day Forest National Park.png",
      rating: 4.8,
      category: t("marineParadise"),
      link:`https://en.wikipedia.org/wiki/Day_Forest_National_Park`
    },
  ];

  const handleExploreMore = (wonder: string) => {
    // Simulate explore more functionality
    window.open(
      `${wonder
        .toLowerCase()
        .replace(/\s+/g, "-")}`,
      "_blank"
    );
  };

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-flag-pattern opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`text-center mb-16 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t("galleryTitle")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("gallerySubtitle")}
          </p>
        </div>

    <div className="relative">
      {/* Navigation buttons outside container */}
      <div
        ref={prevRef}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 cursor-pointer p-2 bg-white rounded-full shadow-lg"
      >
      {/* left arrow */} <ArrowLeft/>
      </div>
      <div
        ref={nextRef}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 cursor-pointer p-2 bg-white rounded-full shadow-lg"
      >
        {/* right arrow */} <ArrowRight/>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper:any) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {wonders.map((wonder, index) => (
          <SwiperSlide key={index}>
      <Card
        className={`group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 hover-lift h-full ${
          isVisible ? "animate-scale-in" : "opacity-0"
        }`}
        style={{ animationDelay: `${index * 200}ms` }}
      >
        {/* Image */}
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={wonder.image || "/placeholder.svg"}
            alt={wonder.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
            onClick={() => handleImageClick(index)}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Top-left badge */}
          <div className="absolute top-4 left-4">
            <Badge className="bg-djibouti-blue text-white animate-pulse">
              {wonder.category}
            </Badge>
          </div>

          {/* Top-right icon */}
          <div className="absolute top-4 right-4">
            <div className="bg-rwanda-green/80 backdrop-blur-sm rounded-full p-2">
              <Camera className="h-4 w-4 text-white animate-bounce" />
            </div>
          </div>

          {/* Title + Button */}
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-bold text-white drop-shadow-md transition-transform duration-300 group-hover:-translate-y-6">
              {wonder.title}
            </h3>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2">
              <Button
                onClick={() => handleExploreMore(wonder.link)}
                size="sm"
                className="w-full bg-rwanda-yellow text-black hover:bg-rwanda-yellow/90 font-semibold"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                {t("exploreMore")}
              </Button>
            </div>
          </div>
        </div>

        {/* Text content */}
        <CardContent className="flex flex-col justify-between h-[160px] overflow-hidden">
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-4">
            {wonder.description}
          </p>
        </CardContent>
      </Card>
    </SwiperSlide>
  ))}
</Swiper>
</div>



        {/* Lightbox */}
        {selectedImage !== null && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in-up"
            onClick={closeLightbox}
          >
            <div className="relative max-w-4xl max-h-full">
              <img
                src={wonders[selectedImage].image || "/placeholder.svg"}
                alt={wonders[selectedImage].title}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors duration-200"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white">
                <h3 className="text-xl font-bold">
                  {wonders[selectedImage].title}
                </h3>
                <p className="text-sm opacity-90">
                  {wonders[selectedImage].description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="border rounded-xl text-center p-4 italic bg-blue/50 text-black">
        &quot;Visit{" "}
        <Link
          href={"https://guide.visitdjibouti.dj/"}
          className="underline font-bold text-primary cursor-pointer"
        >
          visitdjibouti.dj
        </Link>{" "}
        for comprehensive travel information, tour packages, and booking
        assistance for these remarkable destinations..&quot;
      </div>
    </section>
  );
}
