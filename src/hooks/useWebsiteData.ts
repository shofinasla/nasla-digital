import { useState, useEffect, useCallback } from 'react';
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
    const saved = StorageService.getItem<FullWebsiteData>(
      SITE_CONFIG.STORAGE_KEYS.SITE_DATA,
      defaultFullData
    );

    // Ensure all default testimonials are present even if localStorage had older data
    if (saved && Array.isArray(saved.testimonials)) {
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

  // Sync to LocalStorage on changes
  useEffect(() => {
    StorageService.setItem(SITE_CONFIG.STORAGE_KEYS.SITE_DATA, data);
  }, [data]);

  const updateAllData = useCallback((newData: FullWebsiteData) => {
    setData(newData);
  }, []);

  const applyPreset = useCallback((preset: TemplatePreset) => {
    setData({
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
    });
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
    setData((prev) => ({
      ...prev,
      testimonials: [newTestimonial, ...prev.testimonials],
    }));
  }, []);

  return {
    ...data,
    updateAllData,
    applyPreset,
    resetToDefault,
    addTestimonial,
  };
}
