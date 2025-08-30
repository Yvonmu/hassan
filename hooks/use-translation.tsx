/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { translations } from "@/lib/translations"

type Language = "en" | "fr"

interface TranslationContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

interface TranslationProviderProps {
  children: ReactNode
  initialLanguage?: Language   // ✅ accept prop
}

// Helper to read cookie value on client (fallback)
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"))
  return match ? match[2] : null
}

export function TranslationProvider({ children, initialLanguage = "en" }: TranslationProviderProps) {
  // Initialize state (priority: prop → cookie → default)
  const [language, setLanguageState] = useState<Language>(() => {
    if (initialLanguage === "fr" || initialLanguage === "en") return initialLanguage
    const saved = getCookie("language")
    return saved === "fr" || saved === "en" ? saved : "en"
  })

  // Save language to cookie when changed
  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    document.cookie = `language=${lang}; path=/; max-age=31536000` // 1 year
  }

  const t = (key: string): string => {
    try {
      const keys = key.split(".")
      let value: any = translations[language]

      for (const k of keys) {
        if (value && typeof value === "object" && k in value) {
          value = value[k]
        } else {
          console.warn(`[v0] Translation key not found: ${key} for language: ${language}`)
          return key
        }
      }

      return typeof value === "string" ? value : key
    } catch (error) {
      console.error(`[v0] Translation error for key: ${key}`, error)
      return key
    }
  }

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider")
  }
  return context
}
