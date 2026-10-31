import React from 'react';
import {
  BusinessConfig,
  HeroConfig,
  VisionMissionConfig,
  ServiceItem,
  PricingPlan,
  Product,
  WhyChooseUsItem,
  ProcessStep,
  Testimonial,
  BlogPost,
  FAQItem,
  Milestone,
} from '../types';
import { Hero } from '../components/Hero';
import { TrustSection } from '../components/TrustSection';
import { AboutSection } from '../components/AboutSection';
import { PillarsSliderSection } from '../components/PillarsSliderSection';
import { ServicesSection } from '../components/ServicesSection';
import { PortfolioSection } from '../components/PortfolioSection';
import { WhyChooseUsSection } from '../components/WhyChooseUsSection';
import { ProcessSection } from '../components/ProcessSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { BlogSection } from '../components/BlogSection';
import { CTASection } from '../components/CTASection';
import { FAQSection } from '../components/FAQSection';

interface HomePageProps {
  business: BusinessConfig;
  heroConfig: HeroConfig;
  visionMission: VisionMissionConfig;
  services: ServiceItem[];
  pricingPlans: PricingPlan[];
  products: Product[];
  whyChooseUs: WhyChooseUsItem[];
  processSteps: ProcessStep[];
  testimonials: Testimonial[];
  blogPosts: BlogPost[];
  faqs: FAQItem[];
  milestones: Milestone[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onAddTestimonial: (testi: Omit<Testimonial, 'id' | 'date'>) => void;
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  business,
  heroConfig,
  visionMission,
  services,
  pricingPlans,
  products,
  whyChooseUs,
  processSteps,
  testimonials,
  blogPosts,
  faqs,
  milestones,
  onSelectProduct,
  onAddToCart,
  onAddTestimonial,
  onNavigate,
}) => {
  return (
    <div>
      {/* 1. Hero */}
      <Hero
        business={business}
        heroConfig={heroConfig}
        onExploreServices={() => onNavigate('services')}
        onNavigateContact={() => onNavigate('contact')}
      />

      {/* 2. Trust Strip */}
      <TrustSection />

      {/* 3. About Snippet */}
      <AboutSection
        business={business}
        visionMission={visionMission}
        milestones={milestones}
        onNavigateAbout={() => onNavigate('about')}
        showValues={false}
      />

      {/* 4. Pilar Nilai & Komitmen Kerja Kami (Slide / Tampilan Bergeser) */}
      <PillarsSliderSection
        visionMission={visionMission}
        brandName={business.brandName}
        onNavigateContact={() => onNavigate('contact')}
      />

      {/* 5. Services */}
      <ServicesSection
        business={business}
        services={services}
        pricingPlans={pricingPlans}
        showPricing={false}
      />

      {/* 5. Featured Portfolio / Products */}
      <PortfolioSection
        products={products}
        business={business}
        onSelectProduct={onSelectProduct}
        onAddToCart={onAddToCart}
        title="Portofolio & Produk Pilihan"
        subtitle="Lihat proyek-proyek unggulan dan sistem digital yang siap diterapkan untuk bisnis Anda."
      />

      {/* 6. Why Choose Us */}
      <WhyChooseUsSection
        items={whyChooseUs}
        brandName={business.brandName}
      />

      {/* 7. Work Process */}
      <ProcessSection steps={processSteps} />

      {/* 8. Testimonials */}
      <TestimonialsSection
        testimonials={testimonials}
        business={business}
        onAddTestimonial={onAddTestimonial}
      />

      {/* 9. Blog Preview */}
      <BlogSection
        blogPosts={blogPosts}
        business={business}
        onNavigateBlog={() => onNavigate('blog')}
      />

      {/* 10. High-converting CTA Banner */}
      <CTASection
        business={business}
        onNavigateContact={() => onNavigate('contact')}
      />

      {/* 11. FAQ */}
      <FAQSection
        faqs={faqs}
        business={business}
      />
    </div>
  );
};
