/**
 * NASLA DIGITAL — Official Website Configuration
 * Tagline: "Solusi Digital Untuk Masa Depan"
 * Domain: www.nasla.digital
 */

export const SITE_CONFIG = {
  templateName: 'NASLA DIGITAL — Solusi Digital Untuk Masa Depan',
  templateVersion: '1.0.0',
  templateAuthor: 'NASLA DIGITAL',
  authorTagline: 'Solusi Digital Untuk Masa Depan',
  authorWebsite: 'https://www.nasla.digital',
  siteUrl: 'https://www.nasla.digital',
  domain: 'www.nasla.digital',
  apexDomain: 'nasla.digital',
  logoUrl: '/logo.png',

  // Cloudflare Workers deployment configuration
  cloudflare: {
    accountId: '23285908b710e298116f9ce010a44035',
    zoneId: 'd1b484ce93921036c690d193c4edccfb',
    zoneName: 'nasla.digital',
    customDomain: 'www.nasla.digital',
    projectName: 'nasla-digital',
  },

  // DEMO ADMIN CREDENTIALS FOR CMS
  DEMO_ADMIN_EMAIL: 'admin@nasla.digital',
  DEMO_ADMIN_USERNAME: 'admin',
  DEMO_ADMIN_PASSWORD: 'demo-admin',
  
  // Storage Keys Namespacing
  STORAGE_KEYS: {
    SITE_DATA: 'nasla_digital_official_site_data_v3',
    CART_ITEMS: 'nasla_digital_official_cart_items_v2',
    AUTH_STATE: 'nasla_digital_official_auth_state_v2',
    ACTIVE_THEME: 'nasla_digital_official_theme_state_v2',
  },
};
