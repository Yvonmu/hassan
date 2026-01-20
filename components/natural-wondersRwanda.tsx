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
import { urlFor } from "@/lib/sanity";

interface NaturalWondersRwandaProps {
  data?: {
    wonders?: Array<{
      title: string;
      location: string;
      description: string;
      image?: unknown;
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

  // Default wonders array with images
  const defaultWonders = [
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
          imageUrl: "/images/nyungwe.jpg",
          rating: 4.8,
          category: t("wonders.rainforest"),
          link: "https://www.nyungweforestnationalpark.org/",
        },
        {
          title: t("wonders.akageraNationalParkTitle"),
          location: t("wonders.akageraNationalParkLocation"),
          description: t("wonders.akageraNationalParkDescription"),
          image: "/images/akagera-safari-companies.jpg",
          imageUrl: "/images/akagera-safari-companies.jpg",
          rating: 4.7,
          category: t("wonders.safari"),
          link: "https://www.akageranationalpark.org/",
        },
        {
          title: t("wonders.lakeKivuTitle"),
          location: t("wonders.lakeKivuLocation"),
          description: t("wonders.lakeKivuDescription"),
          image: "/images/lake0kivu.jpeg",
          imageUrl: "/images/lake0kivu.jpeg",
          rating: 4.8,
          category: t("wonders.lake"),
          link: "https://visitrwanda.com/destinations/lake-kivu/",
        },
        {
          title: t("wonders.kigaliGenocideMemorialTitle"),
          location: t("wonders.kigaliGenocideMemorialLocation"),
          description: t("wonders.kigaliGenocideMemorialDescription"),
          image: "/images/memorial-genocide.webp",
          imageUrl: "/images/memorial-genocide.webp",
          rating: 4.9,
          category: t("wonders.historicalSite"),
          link: "https://kgm.rw/",
        },
        {
          title: t("wonders.kigaliCityTitle"),
          location: t("wonders.kigaliCityLocation"),
          description: t("wonders.kigaliCityDescription"),
          image: "/images/kigali.png",
          imageUrl: "/images/kigali.png",
          rating: 4.6,
          category: t("wonders.cityExperience"),
          link: "https://www.kigalicity.gov.rw/",
        },
        {
          title: t("wonders.gishwatiMukuraTitle"),
          location: t("wonders.gishwatiMukuraLocation"),
          description: t("wonders.gishwatiMukuraDescription"),
          image: "/images/gishwati-mukura-national-park.jpeg",
          imageUrl: "/images/gishwati-mukura-national-park.jpeg",
          rating: 4.7,
          category: t("wonders.natureReserve"),
          link: "https://visitrwanda.com/destinations/gishwati-mukura-national-park-2/",
        },
        {
          title: t("wonders.musanzeCavesTitle"),
          location: t("wonders.musanzeCavesLocation"),
          description: t("wonders.musanzeCavesDescription"),
          image: "/images/musanze-caves1.jpeg",
          imageUrl: "/images/musanze-caves1.jpeg",
          rating: 4.5,
          category: t("wonders.geologicalSite"),
          link: "https://www.volcanoesparkrwanda.org/information/the-musanze-cave/",
        },
        {
          title: t("wonders.ethnographicMuseumTitle"),
          location: t("wonders.ethnographicMuseumLocation"),
          description: t("wonders.ethnographicMuseumDescription"),
          image: "/images/ethnographic-museum-huye.jpeg",
          imageUrl: "/images/ethnographic-museum-huye.jpeg",
          rating: 4.6,
          category: t("wonders.museum"),
          link: "https://visitrwanda.com/interests/ethnographic-museum/",
        },
        {
          title: t("wonders.kingsPalaceNyanzaTitle"),
          location: t("wonders.kingsPalaceNyanzaLocation"),
          description: t("wonders.kingsPalaceNyanzaDescription"),
          image: "/images/kings-palace-nyanza.jpeg",
          imageUrl: "/images/kings-palace-nyanza.jpeg",
          rating: 4.4,
          category: t("wonders.historicalSite"),
          link: "https://visitrwanda.com/interests/kings-palace/",
        },
        {
          title: t("wonders.kandtHouseMuseumTitle"),
          location: t("wonders.kandtHouseMuseumLocation"),
          description: t("wonders.kandtHouseMuseumDescription"),
          image: "/images/kandt-house-museum.jpeg",
          imageUrl: "/images/kandt-house-museum.jpeg",
          rating: 4.3,
          category: t("wonders.museum"),
          link: "https://visitrwanda.com/interests/kandt-house-museum/",
        },
  ];

  // Process wonders data to ensure all have imageUrl
  const processWonders = (wondersData?: Array<any>) => {
    // If no Sanity data, return defaults
    if (!wondersData || wondersData.length === 0) {
      return defaultWonders;
    }

    // Merge Sanity data with defaults, using default images when Sanity doesn't have them
    return wondersData.map((wonder) => {
      // Find matching default wonder by title
      const defaultWonder = defaultWonders.find(
        (dw) => dw.title.toLowerCase() === wonder.title?.toLowerCase()
      );

      let imageUrl = wonder.imageUrl;
      let image = wonder.image;

      // If imageUrl is null or placeholder, try to get it from image field or use default
      const isPlaceholder = !imageUrl || imageUrl === "/placeholder.svg" || imageUrl === "placeholder.svg" || imageUrl === null;
      
      if (isPlaceholder) {
        // First try: If image is a string path, use it directly
        if (wonder.image && typeof wonder.image === 'string') {
          imageUrl = wonder.image;
          image = wonder.image;
        }
        // Second try: If image is a Sanity image object, convert it to URL
        else if (wonder.image && typeof wonder.image === 'object' && wonder.image !== null) {
          try {
            const sanityImage = wonder.image as any;
            if (sanityImage.asset || sanityImage._ref || sanityImage._type === 'image') {
              imageUrl = urlFor(wonder.image).width(800).height(600).url();
              image = wonder.image; // Keep the original object
            }
          } catch (e) {
            console.error('Error generating image URL for', wonder.title, ':', e);
          }
        }
        
        // Third try: Use default wonder's image if it exists
        if ((!imageUrl || imageUrl === null) && defaultWonder) {
          imageUrl = defaultWonder.imageUrl;
          image = defaultWonder.image;
        }
        
        // Final fallback: placeholder
        if (!imageUrl || imageUrl === null) {
          imageUrl = "/placeholder.svg";
          image = "/placeholder.svg";
        }
      }

      return {
        ...wonder,
        imageUrl: imageUrl,
        image: image || imageUrl,
      };
    });
  };

  
const wonders = processWonders(data?.wonders);

  const handleExploreMore = (wonder: string) => {
    // Simulate explore more functionality
    window.open(`${wonder.toLowerCase().replace(/\s+/g, "-")}`, "_blank");
  };

  const handleImageClick = (index: number) => {
    console.log("Image clicked, index:", index);
    console.log("Wonder data:", wonders[index]);
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
                      src={
                        (() => {
                          console.log("Card image render for:", wonder.title, "imageUrl:", wonder.imageUrl, "image:", wonder.image);
                          // Priority 1: Use imageUrl if it exists and is not empty
                          if (wonder.imageUrl) {
                            return wonder.imageUrl;
                          }
                          // Priority 2: If image is a string path, use it directly
                          if (wonder.image && typeof wonder.image === 'string') {
                            return wonder.image;
                          }
                          // Priority 3: If image is a Sanity image object, use urlFor
                          if (wonder.image && typeof wonder.image === 'object') {
                            try {
                              return urlFor(wonder.image).width(800).height(600).url();
                            } catch (e) {
                              console.error('Error generating image URL:', e);
                              return "/placeholder.svg";
                            }
                          }
                          // Fallback: placeholder
                          return "/placeholder.svg";
                        })()
                      }
                      alt={wonder.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
                      onClick={() => handleImageClick(index)}
                      onError={(e) => {
                        // If image fails to load, use placeholder
                        const target = e.target as HTMLImageElement;
                        if (target.src !== window.location.origin + "/placeholder.svg") {
                          target.src = "/placeholder.svg";
                        }
                      }}
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
                src={
                  (() => {
                    const img = wonders[selectedImage];
                    // Priority 1: Use imageUrl if it exists and is not empty
                    if (img.imageUrl) {
                      return img.imageUrl;
                    }
                    // Priority 2: If image is a string path, use it directly
                    if (img.image && typeof img.image === 'string') {
                      return img.image;
                    }
                    // Priority 3: If image is a Sanity image object, use urlFor
                    if (img.image && typeof img.image === 'object') {
                      try {
                        return urlFor(img.image).width(1200).height(800).url();
                      } catch (e) {
                        console.error('Error generating image URL:', e);
                        return "/placeholder.svg";
                      }
                    }
                    // Fallback: placeholder
                    return "/placeholder.svg";
                  })()
                }
                alt={wonders[selectedImage].title}
                className="max-w-full max-h-full object-contain rounded-lg"
                onError={(e) => {
                  // If image fails to load, use placeholder
                  const target = e.target as HTMLImageElement;
                  if (target.src !== window.location.origin + "/placeholder.svg") {
                    target.src = "/placeholder.svg";
                  }
                }}
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
