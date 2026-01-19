// TypeScript types for Sanity CMS data

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImage = any

export interface HeroSection {
  _id?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  heroImage?: SanityImage;
  officialTitle?: string;
  year?: string;
  location?: string;
  consulName?: string;
  consulTitle?: string;
  consulateFull?: string;
}

export interface GlobalSettings {
  _id?: string;
  siteName?: string;
  contactInfo?: {
    phone?: string;
    email?: string;
    address?: string;
    officeHours?: string;
  };
  footer?: {
    brandDescription?: string;
    quickLinks?: Array<{ name: string; href: string }>;
    services?: string[];
    copyright?: string;
  };
  socialMedia?: {
    twitter?: string;
    linkedin?: string;
    facebook?: string;
  };
}

export interface SEOMetadata {
  _id?: string;
  page?: string;
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: SanityImage;
  ogTitle?: string;
  ogDescription?: string;
  canonicalUrl?: string;
}

export interface DiplomaticExcellence {
  _id?: string;
  title?: string;
  description?: string;
  competencies?: Array<{ name: string; value: number }>;
  activities?: Array<{ title: string; description: string; icon: string }>;
  responsibilities?: string[];
}

export interface JurisdictionSection {
  _id?: string;
  label?: string;
  title?: string;
  description?: string;
  infoText?: string;
  visaPassportInfo?: string;
}

export interface NaturalWonders {
  _id?: string;
  wonders?: Array<{
    title: string;
    location: string;
    description: string;
    imageUrl?: string;
    rating: number;
    category: string;
    link: string;
  }>;
}

export interface NaturalWondersRwanda {
  _id?: string;
  wonders?: Array<{
    title: string;
    location: string;
    description: string;
    imageUrl?: string;
    rating: number;
    category: string;
    link: string;
  }>;
}

export interface StayConnected {
  _id?: string;
  title?: string;
  description?: string;
  content?: Array<{
    title: string;
    description: string;
    imageUrl?: string;
    type: string;
    date: string;
    location: string;
    buttonLink: string;
    link: string;
  }>;
}

export interface SocialFeedsSection {
  _id?: string;
  title?: string;
  description?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  facebookUrl?: string;
  youtubeUrl?: string;
}

export interface ConsularExcellence {
  _id?: string;
  actionCards?: Array<{
    title: string;
    subtitle: string;
    buttonText: string;
    type: 'emergency' | 'schedule' | 'visa';
    visaPortalUrl?: string;
  }>;
}

export interface HeaderSettings {
  _id?: string;
  missionText?: string;
  navigationItems?: Array<{ label: string; sectionId: string; order: number }>;
}
