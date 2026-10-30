/**
 * NASLA DIGITAL — BUSINESS WEBSITE TEMPLATE (v1.0.0)
 * Application Shell & Routing Controller
 * 
 * Template Author: NASLA DIGITAL ("Solusi Digital Untuk Masa Depan")
 */

import React, { useState, useEffect } from 'react';
import { Product } from './types';
import { useWebsiteData } from './hooks/useWebsiteData';
import { useCart } from './hooks/useCart';
import { StorageService } from './services/storage';
import { SITE_CONFIG } from './config/site.config';

// Layout Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';

// Public Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ProductsPage } from './pages/ProductsPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Admin CMS Portal
import { AdminLogin } from './portal/AdminLogin';
import { AdminDashboard } from './portal/AdminDashboard';

export default function App() {
  // Website Data Manager Hook
  const websiteData = useWebsiteData();

  // Shopping Cart Hook
  const cartHook = useCart();

  // Helper to parse route from URL
  const getRouteInfo = () => {
    const path = window.location.pathname.toLowerCase().replace(/^\/+|\/+$/g, '');
    const hash = window.location.hash.toLowerCase().replace(/^#\/?/, '');
    const current = path || hash;

    const isPortal =
      current === 'portal' ||
      current.startsWith('portal/') ||
      current === 'admin' ||
      current.startsWith('admin/');

    let pageName = 'home';
    let isNotFound = false;

    if (isPortal) {
      pageName = 'portal';
    } else if (!current || current === '') {
      pageName = 'home';
    } else if (['about', 'services', 'products', 'blog', 'contact'].includes(current)) {
      pageName = current;
    } else {
      isNotFound = true;
      pageName = '404';
    }

    return { isPortal, pageName, isNotFound };
  };

  const [routeInfo, setRouteInfo] = useState(getRouteInfo);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    const auth = StorageService.getItem<{ loggedIn: boolean }>(
      SITE_CONFIG.STORAGE_KEYS.AUTH_STATE,
      { loggedIn: false }
    );
    return Boolean(auth?.loggedIn);
  });

  // Modals & Drawers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  // Sync route on popstate / hashchange
  useEffect(() => {
    const handleLocationChange = () => {
      setRouteInfo(getRouteInfo());
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const handleNavigate = (page: string) => {
    if (page === 'portal' || page === 'admin') {
      window.history.pushState(null, '', '/portal');
      setRouteInfo({ isPortal: true, pageName: 'portal', isNotFound: false });
    } else {
      const targetUrl = page === 'home' ? '/' : `/${page}`;
      window.history.pushState(null, '', targetUrl);
      setRouteInfo({ isPortal: false, pageName: page, isNotFound: false });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToPublic = () => {
    window.history.pushState(null, '', '/');
    setRouteInfo({ isPortal: false, pageName: 'home', isNotFound: false });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLogout = () => {
    StorageService.removeItem(SITE_CONFIG.STORAGE_KEYS.AUTH_STATE);
    setIsAdminLoggedIn(false);
  };

  // ================= RENDER PORTAL / CMS VIEW =================
  if (routeInfo.isPortal) {
    if (!isAdminLoggedIn) {
      return (
        <AdminLogin
          business={websiteData.business}
          onLoginSuccess={() => setIsAdminLoggedIn(true)}
          onReturnToWebsite={navigateToPublic}
        />
      );
    }

    return (
      <AdminDashboard
        business={websiteData.business}
        heroConfig={websiteData.heroConfig}
        visionMission={websiteData.visionMission}
        services={websiteData.services}
        pricingPlans={websiteData.pricingPlans}
        products={websiteData.products}
        whyChooseUs={websiteData.whyChooseUs}
        processSteps={websiteData.processSteps}
        teamMembers={websiteData.teamMembers}
        milestones={websiteData.milestones}
        testimonials={websiteData.testimonials}
        blogPosts={websiteData.blogPosts}
        faqs={websiteData.faqs}
        onSaveAll={websiteData.updateAllData}
        onLogout={handleAdminLogout}
        onViewWebsite={navigateToPublic}
        onResetToDefault={websiteData.resetToDefault}
        onApplyPreset={websiteData.applyPreset}
      />
    );
  }

  // ================= RENDER PUBLIC WEBSITE =================
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* 1. Header Navigation */}
      <Navbar
        business={websiteData.business}
        cart={cartHook.cart}
        onOpenCart={() => setCartDrawerOpen(true)}
        activePage={routeInfo.pageName}
        onNavigate={handleNavigate}
      />

      {/* 2. Main Page Router Content */}
      <main className="flex-1">
        {routeInfo.isNotFound ? (
          <NotFoundPage onNavigateHome={() => handleNavigate('home')} />
        ) : (
          <>
            {routeInfo.pageName === 'home' && (
              <HomePage
                business={websiteData.business}
                heroConfig={websiteData.heroConfig}
                visionMission={websiteData.visionMission}
                services={websiteData.services}
                pricingPlans={websiteData.pricingPlans}
                products={websiteData.products}
                whyChooseUs={websiteData.whyChooseUs}
                processSteps={websiteData.processSteps}
                testimonials={websiteData.testimonials}
                blogPosts={websiteData.blogPosts}
                faqs={websiteData.faqs}
                milestones={websiteData.milestones}
                onSelectProduct={(prod) => setSelectedProduct(prod)}
                onAddToCart={(prod) => cartHook.addToCart(prod, 1)}
                onAddTestimonial={websiteData.addTestimonial}
                onNavigate={handleNavigate}
              />
            )}

            {routeInfo.pageName === 'about' && (
              <AboutPage
                business={websiteData.business}
                visionMission={websiteData.visionMission}
                teamMembers={websiteData.teamMembers}
                milestones={websiteData.milestones}
                onNavigateContact={() => handleNavigate('contact')}
              />
            )}

            {routeInfo.pageName === 'services' && (
              <ServicesPage
                business={websiteData.business}
                services={websiteData.services}
                pricingPlans={websiteData.pricingPlans}
                faqs={websiteData.faqs}
                onNavigateContact={() => handleNavigate('contact')}
              />
            )}

            {routeInfo.pageName === 'products' && (
              <ProductsPage
                products={websiteData.products}
                business={websiteData.business}
                onSelectProduct={(prod) => setSelectedProduct(prod)}
                onAddToCart={(prod) => cartHook.addToCart(prod, 1)}
                onNavigateContact={() => handleNavigate('contact')}
              />
            )}

            {routeInfo.pageName === 'blog' && (
              <BlogPage
                blogPosts={websiteData.blogPosts}
                business={websiteData.business}
                onNavigateContact={() => handleNavigate('contact')}
              />
            )}

            {routeInfo.pageName === 'contact' && (
              <ContactPage
                business={websiteData.business}
                faqs={websiteData.faqs}
              />
            )}
          </>
        )}
      </main>

      {/* 3. Footer */}
      <Footer
        business={websiteData.business}
        onNavigate={handleNavigate}
      />

      {/* 4. Product Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          business={websiteData.business}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={cartHook.addToCart}
        />
      )}

      {/* 5. Cart Drawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cart={cartHook.cart}
        business={websiteData.business}
        onUpdateQuantity={cartHook.updateQuantity}
        onRemoveItem={cartHook.removeItem}
        onClearCart={cartHook.clearCart}
      />

      {/* 6. Floating WhatsApp FAB */}
      <FloatingWhatsApp business={websiteData.business} />
    </div>
  );
}
