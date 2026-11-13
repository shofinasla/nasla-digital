import { useState, useCallback } from 'react';
import {
  BusinessConfig,
  HeroConfig,
  VisionMissionConfig,
  ServiceItem,
  PricingPlan,
  Product,
  WhyChooseUsItem,
  ProcessStep,
  TeamMember,
  Milestone,
  Testimonial,
  BlogPost,
  FAQItem,
  TemplatePreset,
} from '../types';
import {
  initialBusinessConfig,
  initialHeroConfig,
  initialVisionMissionConfig,
  initialServices,
  initialPricingPlans,
  initialProducts,
  initialWhyChooseUs,
  initialProcessSteps,
  initialTeamMembers,
  initialMilestones,
  initialTestimonials,
  initialBlogPosts,
  initialFAQs,
} from '../data/initialData';
import { StorageService } from '../services/storage';
import { SITE_CONFIG } from '../config/site.config';

interface FullWebsiteData {
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

const defaultFullData: FullWebsiteData = {
  business: initialBusinessConfig,
  heroConfig: initialHeroConfig,
  visionMission: initialVisionMissionConfig,
  services: initialServices,
  pricingPlans: initialPricingPlans,
  products: initialProducts,
  whyChooseUs: initialWhyChooseUs,
  processSteps: initialProcessSteps,
  teamMembers: initialTeamMembers,
  milestones: initialMilestones,
  testimonials: initialTestimonials,
  blogPosts: initialBlogPosts,
  faqs: initialFAQs,
};

export function useWebsiteData() {
  const [data, setData] = useState<FullWebsiteData>(() => {
    // Purge legacy cached site_data keys (e.g. v3) so stale presets never override official build
    if (typeof window !== 'undefined') {
      [
        'nasla_digital_official_site_data_v1',
        'nasla_digital_official_site_data_v2',
        'nasla_digital_official_site_data_v3',
      ].forEach((legacyKey) => StorageService.removeItem(legacyKey));
    }

    const saved = StorageService.getItem<FullWebsiteData | null>(
      SITE_CONFIG.STORAGE_KEYS.SITE_DATA,
      null
    );

    if (!saved) {
      return defaultFullData;
    }

    // Ensure all default testimonials are present even if localStorage had older data
    if (Array.isArray(saved.testimonials)) {
      const existingIds = new Set(saved.testimonials.map((t) => t.id));
      const missingDefaults = defaultFullData.testimonials.filter(
        (t) => !existingIds.has(t.id)
      );
      if (missingDefaults.length > 0) {
        return {
          ...saved,
          testimonials: [...saved.testimonials, ...missingDefaults],
        };
      }
    }

    return saved;
  });

  const updateAllData = useCallback((newData: FullWebsiteData) => {
    StorageService.setItem(SITE_CONFIG.STORAGE_KEYS.SITE_DATA, newData);
    setData(newData);
  }, []);

  const applyPreset = useCallback((preset: TemplatePreset) => {
    const presetData: FullWebsiteData = {
      business: preset.business,
      heroConfig: preset.heroConfig,
      visionMission: preset.visionMission,
      services: preset.services,
      pricingPlans: preset.pricingPlans,
      products: preset.products,
      whyChooseUs: preset.whyChooseUs,
      processSteps: preset.processSteps,
      teamMembers: preset.teamMembers,
      milestones: preset.milestones,
      testimonials: preset.testimonials,
      blogPosts: preset.blogPosts,
      faqs: preset.faqs,
    };
    StorageService.setItem(SITE_CONFIG.STORAGE_KEYS.SITE_DATA, presetData);
    setData(presetData);
  }, []);

  const resetToDefault = useCallback(() => {
    StorageService.resetAllTemplateData();
    setData(defaultFullData);
  }, []);

  const addTestimonial = useCallback((testiData: Omit<Testimonial, 'id' | 'date'>) => {
    const today = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const newTestimonial: Testimonial = {
      ...testiData,
      id: `testi-${Date.now()}`,
      date: today,
    };
    setData((prev) => {
      const updated: FullWebsiteData = {
        ...prev,
        testimonials: [newTestimonial, ...prev.testimonials],
      };
      StorageService.setItem(SITE_CONFIG.STORAGE_KEYS.SITE_DATA, updated);
      return updated;
    });
  }, []);

  return {
    ...data,
    updateAllData,
    applyPreset,
    resetToDefault,
    addTestimonial,
  };
}
