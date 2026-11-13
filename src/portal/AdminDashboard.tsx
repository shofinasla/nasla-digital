import React, { useState, useEffect } from 'react';
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
import { AdminHeader } from './components/AdminHeader';
import { AdminSidebar, AdminTabType } from './components/AdminSidebar';
import { PresetManager } from './components/PresetManager';
import { SiteSettingsPanel } from './components/SiteSettingsPanel';
import { HeroEditor } from './components/HeroEditor';
import { ServicesManager } from './components/ServicesManager';
import { ProductsManager } from './components/ProductsManager';
import { BlogManager } from './components/BlogManager';
import { AboutManager } from './components/AboutManager';
import { TestimonialsManager } from './components/TestimonialsManager';
import { SellerKitPanel } from './components/SellerKitPanel';

interface AdminDashboardProps {
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
  onSaveAll: (data: {
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
  }) => void;
  onLogout: () => void;
  onViewWebsite: () => void;
  onResetToDefault: () => void;
  onApplyPreset: (preset: TemplatePreset) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  business: initialBusiness,
  heroConfig: initialHero,
  visionMission: initialVM,
  services: initialServices,
  pricingPlans: initialPricing,
  products: initialProducts,
  whyChooseUs: initialWhy,
  processSteps: initialProcess,
  teamMembers: initialTeam,
  milestones: initialMilestones,
  testimonials: initialTestimonials,
  blogPosts: initialBlog,
  faqs: initialFaqs,
  onSaveAll,
  onLogout,
  onViewWebsite,
  onResetToDefault,
  onApplyPreset,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTabType>('presets');
  const [savedNotice, setSavedNotice] = useState(false);

  // Local draft states
  const [business, setBusiness] = useState<BusinessConfig>(initialBusiness);
  const [heroConfig, setHeroConfig] = useState<HeroConfig>(initialHero);
  const [visionMission, setVisionMission] = useState<VisionMissionConfig>(initialVM);
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>(initialPricing);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [whyChooseUs, setWhyChooseUs] = useState<WhyChooseUsItem[]>(initialWhy);
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>(initialProcess);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeam);
  const [milestones, setMilestones] = useState<Milestone[]>(initialMilestones);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlog);
  const [faqs, setFaqs] = useState<FAQItem[]>(initialFaqs);

  useEffect(() => {
    setBusiness(initialBusiness);
    setHeroConfig(initialHero);
    setVisionMission(initialVM);
    setServices(initialServices);
    setPricingPlans(initialPricing);
    setProducts(initialProducts);
    setWhyChooseUs(initialWhy);
    setProcessSteps(initialProcess);
    setTeamMembers(initialTeam);
    setMilestones(initialMilestones);
    setTestimonials(initialTestimonials);
    setBlogPosts(initialBlog);
    setFaqs(initialFaqs);
  }, [
    initialBusiness,
    initialHero,
    initialVM,
    initialServices,
    initialPricing,
    initialProducts,
    initialWhy,
    initialProcess,
    initialTeam,
    initialMilestones,
    initialTestimonials,
    initialBlog,
    initialFaqs,
  ]);

  const handleMasterSave = () => {
    onSaveAll({
      business,
      heroConfig,
      visionMission,
      services,
      pricingPlans,
      products,
      whyChooseUs,
      processSteps,
      teamMembers,
      milestones,
      testimonials,
      blogPosts,
      faqs,
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const handlePresetApply = (preset: TemplatePreset) => {
    setBusiness(preset.business);
    setHeroConfig(preset.heroConfig);
    setVisionMission(preset.visionMission);
    setServices(preset.services);
    setPricingPlans(preset.pricingPlans);
    setProducts(preset.products);
    setWhyChooseUs(preset.whyChooseUs);
    setProcessSteps(preset.processSteps);
    setTeamMembers(preset.teamMembers);
    setMilestones(preset.milestones);
    setTestimonials(preset.testimonials);
    setBlogPosts(preset.blogPosts);
    setFaqs(preset.faqs);
    onApplyPreset(preset);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      <AdminHeader
        brandName={business.brandName}
        savedNotice={savedNotice}
        onSave={handleMasterSave}
        onViewWebsite={onViewWebsite}
        onLogout={onLogout}
        onReset={onResetToDefault}
      />

      <div className="flex-1 flex flex-col md:flex-row">
        <AdminSidebar activeTab={activeTab} onSelectTab={setActiveTab} />

        <main className="flex-1 p-6 sm:p-8 overflow-y-auto max-w-5xl">
          {activeTab === 'presets' && <PresetManager onApplyPreset={handlePresetApply} />}
          {activeTab === 'business' && (
            <SiteSettingsPanel business={business} onChange={setBusiness} />
          )}
          {activeTab === 'hero' && <HeroEditor heroConfig={heroConfig} onChange={setHeroConfig} />}
          {activeTab === 'services' && (
            <ServicesManager
              services={services}
              pricingPlans={pricingPlans}
              onUpdateServices={setServices}
              onUpdatePricing={setPricingPlans}
            />
          )}
          {activeTab === 'products' && (
            <ProductsManager products={products} onUpdateProducts={setProducts} />
          )}
          {activeTab === 'blog' && (
            <BlogManager blogPosts={blogPosts} onUpdateBlog={setBlogPosts} />
          )}
          {activeTab === 'about' && (
            <AboutManager
              visionMission={visionMission}
              milestones={milestones}
              teamMembers={teamMembers}
              onUpdateVisionMission={setVisionMission}
              onUpdateMilestones={setMilestones}
              onUpdateTeam={setTeamMembers}
            />
          )}
          {activeTab === 'testimonials' && (
            <TestimonialsManager
              testimonials={testimonials}
              faqs={faqs}
              onUpdateTestimonials={setTestimonials}
              onUpdateFaqs={setFaqs}
            />
          )}
          {activeTab === 'seller-kit' && (
            <SellerKitPanel
              fullDataPayload={{
                business,
                heroConfig,
                visionMission,
                services,
                pricingPlans,
                products,
                whyChooseUs,
                processSteps,
                teamMembers,
                milestones,
                testimonials,
                blogPosts,
                faqs,
              }}
            />
          )}
        </main>
      </div>
    </div>
  );
};
