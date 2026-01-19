/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Camera, ExternalLink } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";

interface NaturalWondersRwandaProps {
  data?: {
    wonders?: Array<{
      title: string;
      location: string;
      description: string;
      imageUrl?: string;
      rating: number;
      category: string;
      link: string;
    }>;
  } | null;
}

export default function NaturalWondersRwanda({ data }: NaturalWondersRwandaProps) {
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

const wonders = data?.wonders || [
  {
    title: t("wonders.volcanoesNationalParkTitle"),
    location: t("wonders.volcanoesNationalParkLocation"),
    description: t("wonders.volcanoesNationalParkDescription"),
    image: "/images/Gorillas-in-volcanoes-national-park2-1.jpeg",
    imageUrl: "/images/Gorillas-in-volcanoes-national-park2-1.jpeg",
    rating: 4.9,
    category: t("wonders.nationalPark"),
    link: "https://www.volcanoesnationalparkrwanda.com/",
  },
  {
    title: t("wonders.nyungweForestTitle"),
    location: t("wonders.nyungweForestLocation"),
    description: t("wonders.nyungweForestDescription"),
    image: "/images/nyungwe.jpg",
    rating: 4.8,
    category: t("wonders.rainforest"),
    link: "https://www.nyungweforestnationalpark.org/",
  },
  {
    title: t("wonders.akageraNationalParkTitle"),
    location: t("wonders.akageraNationalParkLocation"),
    description: t("wonders.akageraNationalParkDescription"),
    image: "/images/akagera-safari-companies.jpg",
    rating: 4.7,
    category: t("wonders.safari"),
    link: "https://www.akageranationalpark.org/",
  },
  {
    title: t("wonders.lakeKivuTitle"),
    location: t("wonders.lakeKivuLocation"),
    description: t("wonders.lakeKivuDescription"),
    image: "/images/lake0kivu.jpeg",
    rating: 4.8,
    category: t("wonders.lake"),
    link: "https://visitrwanda.com/destinations/lake-kivu/",
  },
  {
    title: t("wonders.kigaliGenocideMemorialTitle"),
    location: t("wonders.kigaliGenocideMemorialLocation"),
    description: t("wonders.kigaliGenocideMemorialDescription"),
    image: "/images/memorial-genocide.webp",
    rating: 4.9,
    category: t("wonders.historicalSite"),
    link: "https://kgm.rw/",
  },
  {
    title: t("wonders.kigaliCityTitle"),
    location: t("wonders.kigaliCityLocation"),
    description: t("wonders.kigaliCityDescription"),
    image: "/images/kigali.png",
    rating: 4.6,
    category: t("wonders.cityExperience"),
    link: "https://www.kigalicity.gov.rw/",
  },
  {
    title: t("wonders.gishwatiMukuraTitle"),
    location: t("wonders.gishwatiMukuraLocation"),
    description: t("wonders.gishwatiMukuraDescription"),
    image: "/images/gishwati-mukura-national-park.jpeg",
    rating: 4.7,
    category: t("wonders.natureReserve"),
    link: "https://visitrwanda.com/destinations/gishwati-mukura-national-park-2/",
  },
  // New additions:
  {
    title: t("wonders.musanzeCavesTitle"),
    location: t("wonders.musanzeCavesLocation"),
    description: t("wonders.musanzeCavesDescription"),
    image: "/images/musanze-caves1.jpeg",
    rating: 4.5,
    category: t("wonders.geologicalSite"),
    link: "https://www.volcanoesparkrwanda.org/information/the-musanze-cave/",
  },
  {
    title: t("wonders.ethnographicMuseumTitle"),
    location: t("wonders.ethnographicMuseumLocation"),
    description: t("wonders.ethnographicMuseumDescription"),
    image: "/images/ethnographic-museum-huye.jpeg",
    rating: 4.6,
    category: t("wonders.museum"),
    link: "https://visitrwanda.com/interests/ethnographic-museum/",
  },
  {
    title: t("wonders.kingsPalaceNyanzaTitle"),
    location: t("wonders.kingsPalaceNyanzaLocation"),
    description: t("wonders.kingsPalaceNyanzaDescription"),
    image: "/images/kings-palace-nyanza.jpeg",
    rating: 4.4,
    category: t("wonders.historicalSite"),
    link: "https://visitrwanda.com/interests/kings-palace/",
  },
  {
    title: t("wonders.kandtHouseMuseumTitle"),
    location: t("wonders.kandtHouseMuseumLocation"),
    description: t("wonders.kandtHouseMuseumDescription"),
    image: "/images/kandt-house-museum.jpeg",
    rating: 4.3,
    category: t("wonders.museum"),
    link: "https://visitrwanda.com/interests/kandt-house-museum/",
  },
];


  const handleExploreMore = (wonder: string) => {
    // Simulate explore more functionality
    window.open(`${wonder.toLowerCase().replace(/\s+/g, "-")}`, "_blank");
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
            {t("galleryTitleRwanda")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("gallerySubtitleRwanda")}
          </p>
        </div>

        <div className="relative">
          {/* Navigation buttons outside container */}
          <div
            ref={prevRef}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 cursor-pointer p-2 bg-white rounded-full shadow-lg"
          >
            {/* left arrow */} <ArrowLeft />
          </div>
          <div
            ref={nextRef}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 cursor-pointer p-2 bg-white rounded-full shadow-lg"
          >
            {/* right arrow */} <ArrowRight />
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
            onBeforeInit={(swiper: any) => {
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
                      src={wonder.imageUrl || wonder.image || "/placeholder.svg"}
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
                src={wonders[selectedImage].imageUrl || wonders[selectedImage].image || "/placeholder.svg"}
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
     
      <div className="border relative rounded-xl text-center p-4 italic z-20 bg-green/50 text-black mt-6">
        {t("visitRwandaInfo")
          .split("{link}")
          .map((part, idx, arr) => (
            <span key={idx}>
              {part}
              {idx < arr.length - 1 && (
                <Link
                  href="https://www.visitrwanda.com/"
                  className="underline font-bold text-rwanda-green cursor-pointer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  visitrwanda.com
                </Link>
              )}
            </span>
          ))}
      </div>
    </section>
  );
}
