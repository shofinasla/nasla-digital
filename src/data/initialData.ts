/**
 * Default Initial Demo Data for NASLA DIGITAL Business Website Template
 * All data here is structured as clean generic demo placeholders.
 */

import { presetDigitalAgency, templatePresets } from './presets';
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
} from '../types';

export const initialBusinessConfig: BusinessConfig = presetDigitalAgency.business;
export const initialHeroConfig: HeroConfig = presetDigitalAgency.heroConfig;
export const initialVisionMissionConfig: VisionMissionConfig = presetDigitalAgency.visionMission;
export const initialServices: ServiceItem[] = presetDigitalAgency.services;
export const initialPricingPlans: PricingPlan[] = presetDigitalAgency.pricingPlans;
export const initialProducts: Product[] = presetDigitalAgency.products;
export const initialWhyChooseUs: WhyChooseUsItem[] = presetDigitalAgency.whyChooseUs;
export const initialProcessSteps: ProcessStep[] = presetDigitalAgency.processSteps;
export const initialTeamMembers: TeamMember[] = presetDigitalAgency.teamMembers;
export const initialMilestones: Milestone[] = presetDigitalAgency.milestones;
export const initialTestimonials: Testimonial[] = presetDigitalAgency.testimonials;
export const initialBlogPosts: BlogPost[] = presetDigitalAgency.blogPosts;
export const initialFAQs: FAQItem[] = presetDigitalAgency.faqs;

export { templatePresets };
