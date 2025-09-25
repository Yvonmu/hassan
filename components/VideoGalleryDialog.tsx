"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export default function VideoGalleryDialog() {
  const [open, setOpen] = useState(false);

  // Example YouTube video links
  const videos = [
    {
      url: "https://www.youtube.com/embed/RBfH-0b7DIo",
      title: "Découvrons le Djibouti, une terre aux opportunités énormes",
    },
    {
      url: "https://www.youtube.com/embed/pCdHQ3tdKbA",
      title: "LA GRANDE EDITION || LE 17 SEPTEMBRE 2025",
    },
    {
      url: "https://www.youtube.com/embed/VXTzJbpeUo4",
      title:
        "#TheRealTalk: Hassan Adan Hassan in a conversation on mass housing",
    },
  ];

  return (
    <div className="flex justify-center items-center">
      <Dialog open={open} onOpenChange={setOpen}>
        {/* Trigger button */}
        <DialogTrigger asChild>
          <Button className="bg-djibouti-green text-white px-6 py-3 text-lg font-medium hover:bg-red-700 transition-all duration-300 rounded-2xl flex items-center gap-2 relative z-10 animate-pulse">
            <Play className="w-5 h-5" />
            Watch Videos
          </Button>
        </DialogTrigger>

        {/* Dialog content */}
        <DialogContent className="max-w-5xl bg-white rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-800">
              Video Gallery
            </DialogTitle>
          </DialogHeader>

          {/* Grid of YouTube videos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {videos.map((video, index) => (
              <div
                key={index}
                className="aspect-video rounded-xl overflow-hidden shadow-lg border"
              >
                <iframe
                  src={video.url}
                  title={video.title}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
