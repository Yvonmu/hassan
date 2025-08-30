"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/hooks/use-translation"
import {  ChevronDown, Languages } from "lucide-react"
import Image from "next/image"

export default function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    {
      code: "en",
      label: "English",
      flag: "https://flagcdn.com/us.svg", // US/UK flag for English
    },
    {
      code: "fr",
      label: "Français",
      flag: "https://flagcdn.com/fr.svg", // France flag
    },
  ]

  const handleSelect = (code: string) => {
  setLanguage(code as "en" | "fr")
  setIsOpen(false)
}


  return (
    <div className="relative inline-block text-left">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 h-8 px-2 text-xs"
      >
        <Languages className="h-4 w-4 text-muted-foreground" />
        <span className="capitalize">{language}</span>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className="flex items-center w-full px-3 py-2 text-sm hover:bg-primary/10 transition-colors rounded-md"
            >
              <div className="w-5 h-3 relative mr-2">
                <Image
                  src={lang.flag}
                  alt={`${lang.label} flag`}
                  fill
                  className="object-cover rounded-sm"
                  sizes="20px"
                />
              </div>
              <span className="capitalize">{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
