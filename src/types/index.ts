export type IconNameType =
  | 'code'
  | 'globe'
  | 'sparkles'
  | 'shield'
  | 'zap'
  | 'trending-up'
  | 'users'
  | 'award'
  | 'phone'
  | 'check-circle'
  | 'layers'
  | 'bar-chart'
  | 'palette'
  | 'shopping-bag'
  | 'cpu'
  | 'rocket'
  | 'search'
  | 'clock'
  | 'briefcase';

export interface TrustStat {
  id: string;
  label: string;
  value: string;
  subtext?: string;
  iconName?: IconNameType;
}

export interface HeroConfig {
  kickerText: string;
  headline: string;
  headlineHighlight: string;
  subheadline: string;
  ctaPrimaryText: string;
  ctaPrimaryTarget: string; // e.g. '#services' or '/services'
  ctaSecondaryText: string;
  ctaSecondaryTarget: string; // e.g. '#contact' or '/contact'
  badgeText: string;
  stats: TrustStat[];
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  iconName: IconNameType;
  priceStartFrom?: number;
  priceFormatted?: string;
  deliverables: string[];
  popular?: boolean;
  featuredBadge?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  price: number;
  period: string; // e.g. '/proyek' or '/bulan'
  isPopular?: boolean;
  features: string[];
  notIncluded?: string[];
  buttonText: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  priceDelta: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  isBestSeller?: boolean;
  isPromo?: boolean;
  highlights: string[];
  variants?: ProductVariant[];
  iconType: 'code' | 'craft' | 'shop' | 'briefcase' | 'cpu' | 'layers' | 'palette';
  gradientTheme?: string;
  clientName?: string;
  completionTime?: string;
  demoUrl?: string;
  tags?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorRole: string;
  publishDate: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageAlt?: string;
  initials: string;
  linkedinUrl?: string;
}

export interface WhyChooseUsItem {
  id: string;
  title: string;
  desc: string;
  iconName: IconNameType;
  badge?: string;
}

export interface ProcessStep {
  id: string;
  stepNumber: string;
  title: string;
  description: string;
  keyOutput: string;
}

export interface CoreValue {
  id: string;
  title: string;
  desc: string;
  iconName: IconNameType;
}

export interface VisionMissionConfig {
  visionTitle: string;
  visionText: string;
  missionTitle: string;
  missions: string[];
  valuesHeading: string;
  valuesSubheading: string;
  values: CoreValue[];
}

export interface BusinessConfig {
  brandName: string; // "NASLA DIGITAL"
  tagline: string; // "Solusi Digital Untuk Masa Depan"
  logoUrl?: string; // e.g. "/logo.png"
  websiteUrl?: string; // e.g. "https://www.nasla.digital"
  slogan: string;
  description: string;
  ownerName: string;
  establishedYear: number;
  legalEntity: string; // "PT / CV / Lembaga Resmi"
  licenseNumber: string; // NIB / Izin Usaha
  taxNumber?: string;
  address: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
    gmapsUrl: string;
  };
  whatsappNumber: string; // e.g. "6281234567890"
  secondaryWhatsApp?: string;
  email: string;
  phone: string;
  instagram: string;
  tiktok: string;
  linkedin: string;
  youtube?: string;
  operatingHours: {
    days: string;
    hours: string;
    weekendHours: string;
  };
  bankAccount: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
  notes?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  comment: string;
  rating: number;
  serviceOrProduct: string;
  date: string;
  verified: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'layanan' | 'pemesanan' | 'pembayaran' | 'teknis' | 'garansi';
}

export interface Milestone {
  id: string;
  year: string;
  title: string;
  description: string;
}

export interface TemplatePreset {
  id: string;
  name: string;
  category: string;
  description: string;
  badge: string;
  business: BusinessConfig;
  heroConfig: HeroConfig;
  visionMission: VisionMissionConfig;
  services: ServiceItem[];
  pricingPlans: PricingPlan[];
  products: Product[];
  whyChooseUs: WhyChooseUsItem[];
  processSteps: ProcessStep[];
  teamMembers: TeamMember[];
  milestones: Milestone[];
  testimonials: Testimonial[];
  blogPosts: BlogPost[];
  faqs: FAQItem[];
}
