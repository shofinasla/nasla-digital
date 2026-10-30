import { Product, ProductVariant, CartItem, BusinessConfig, ServiceItem, PricingPlan } from '../types';

/**
 * Normalizes phone number into international WhatsApp format (e.g. 0812 -> 62812)
 */
export function formatPhoneNumberForWa(phone: string): string {
  let cleaned = (phone || '').replace(/[^0-9]/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.substring(1);
  }
  if (!cleaned.startsWith('62')) {
    cleaned = '62' + cleaned;
  }
  return cleaned || '6281234567890';
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Builds direct WhatsApp order URL for a single product/service
 */
export function buildSingleProductWaUrl(
  business: BusinessConfig,
  product: Product,
  quantity: number = 1,
  variant?: ProductVariant,
  customerName: string = '',
  customerCompany: string = '',
  note: string = ''
): string {
  const unitPrice = product.price + (variant ? variant.priceDelta : 0);
  const totalPrice = unitPrice * quantity;

  let message = `*Halo Tim ${business.brandName}! 👋*\n`;
  message += `Saya tertarik dengan produk/proyek berikut dari website Anda:\n\n`;
  message += `📦 *Detail Pesanan / Layanan:*\n`;
  message += `• Nama: *${product.name}*\n`;
  message += `• Kategori: ${product.category}\n`;
  if (variant) {
    message += `• Pilihan Varian: ${variant.name}\n`;
  }
  message += `• Kuantitas/Paket: ${quantity}\n`;
  message += `• Estimasi Biaya: *${formatRupiah(totalPrice)}*\n\n`;

  if (customerName.trim()) {
    message += `👤 *Data Calon Klien:*\n`;
    message += `• Nama: ${customerName}\n`;
    if (customerCompany.trim()) {
      message += `• Perusahaan / Usaha: ${customerCompany}\n`;
    }
  }

  if (note.trim()) {
    message += `📝 *Kebutuhan Khusus / Catatan:* ${note}\n`;
  }

  message += `\nMohon informasi ketersediaan jadwal, detail spesifikasi, dan langkah selanjutnya ya. Terima kasih! 🙏`;

  const cleanPhone = formatPhoneNumberForWa(business.whatsappNumber);
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Builds WhatsApp inquiry URL for a specific Service
 */
export function buildServiceWaUrl(
  business: BusinessConfig,
  service: ServiceItem,
  customerName: string = '',
  note: string = ''
): string {
  let message = `*Halo Tim Konsultan ${business.brandName}! 👋*\n`;
  message += `Saya ingin berkonsultasi mengenai layanan:\n\n`;
  message += `🚀 *Layanan yang Diminati:* *${service.title}*\n`;
  message += `• Kategori: ${service.category}\n`;
  if (service.priceFormatted) {
    message += `• Kisaran Biaya: ${service.priceFormatted}\n`;
  }

  if (customerName.trim()) {
    message += `\n👤 *Nama Pengirim:* ${customerName}\n`;
  }

  if (note.trim()) {
    message += `📝 *Catatan / Kebutuhan Bisnis:* ${note}\n`;
  } else {
    message += `\nMohon info mengenai proses pengerjaan, estimasi waktu, dan proposal penawarannya ya. Terima kasih! 🙏`;
  }

  const cleanPhone = formatPhoneNumberForWa(business.whatsappNumber);
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Builds WhatsApp inquiry URL for a specific Pricing Plan
 */
export function buildPricingPlanWaUrl(
  business: BusinessConfig,
  plan: PricingPlan,
  customerName: string = ''
): string {
  let message = `*Halo Tim ${business.brandName}! 👋*\n`;
  message += `Saya ingin memilih dan memesan paket layanan:\n\n`;
  message += `💎 *Paket Pilihan:* *${plan.name}*\n`;
  message += `• Investasi: *${formatRupiah(plan.price)} ${plan.period}*\n`;
  message += `• Ringkasan: ${plan.tagline}\n\n`;

  if (customerName.trim()) {
    message += `👤 *Nama Pemesan:* ${customerName}\n\n`;
  }

  message += `Mohon dibantu untuk proses onboarding dan jadwal pengerjaan perdananya. Terima kasih banyak! 🙏`;

  const cleanPhone = formatPhoneNumberForWa(business.whatsappNumber);
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Builds direct WhatsApp checkout URL for multiple items in cart
 */
export function buildCartCheckoutWaUrl(
  business: BusinessConfig,
  items: CartItem[],
  customer: {
    name: string;
    phone: string;
    address: string;
    company?: string;
    paymentMethod?: string;
    notes?: string;
  }
): string {
  const subtotal = items.reduce((sum, item) => {
    const itemPrice = item.product.price + (item.selectedVariant ? item.selectedVariant.priceDelta : 0);
    return sum + itemPrice * item.quantity;
  }, 0);

  let message = `*FORMULIR PEMESANAN WEBSITE - ${business.brandName.toUpperCase()}* 🛒\n\n`;
  message += `Halo Admin, saya ingin melakukan pemesanan / penawaran untuk item berikut:\n\n`;

  message += `📋 *DAFTAR ITEM (${items.length} Item):*\n`;
  items.forEach((item, index) => {
    const itemPrice = item.product.price + (item.selectedVariant ? item.selectedVariant.priceDelta : 0);
    const lineTotal = itemPrice * item.quantity;
    const variantStr = item.selectedVariant ? ` (${item.selectedVariant.name})` : '';
    message += `${index + 1}. *${item.product.name}${variantStr}*\n`;
    message += `   └ Jumlah: ${item.quantity} × ${formatRupiah(itemPrice)} = ${formatRupiah(lineTotal)}\n`;
  });

  message += `\n💰 *Total Estimasi Biaya:* *${formatRupiah(subtotal)}*\n\n`;

  message += `📍 *Data Klien / Pemesan:*\n`;
  message += `• Nama: ${customer.name || '-'}\n`;
  message += `• No. WhatsApp: ${customer.phone || '-'}\n`;
  if (customer.company) {
    message += `• Perusahaan/Usaha: ${customer.company}\n`;
  }
  message += `• Alamat / Lokasi: ${customer.address || '-'}\n`;
  if (customer.paymentMethod) {
    message += `• Metode Pembayaran Disukai: ${customer.paymentMethod}\n`;
  }
  if (customer.notes) {
    message += `• Catatan Khusus: ${customer.notes}\n`;
  }

  message += `\nMohon dikonfirmasi ketersediaan dan diterbitkan invoice resminya ya Admin. Terima kasih! 🙏`;

  const cleanPhone = formatPhoneNumberForWa(business.whatsappNumber);
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Builds direct WhatsApp general contact inquiry URL
 */
export function buildGeneralContactWaUrl(
  business: BusinessConfig,
  data: {
    name: string;
    topic: string;
    companyOrBrand?: string;
    emailOrPhone?: string;
    budgetRange?: string;
    messageText: string;
  }
): string {
  let message = `*PESAN KONTAK DARI WEBSITE RESMI ${business.brandName.toUpperCase()}*\n\n`;
  message += `Halo Tim Konsultan ${business.brandName},\n\n`;
  message += `• *Nama Pengirim:* ${data.name || 'Pengunjung Website'}\n`;
  message += `• *Topik/Layanan:* ${data.topic || 'Konsultasi Umum'}\n`;
  if (data.companyOrBrand) {
    message += `• *Nama Bisnis/Perusahaan:* ${data.companyOrBrand}\n`;
  }
  if (data.emailOrPhone) {
    message += `• *Kontak Pengirim:* ${data.emailOrPhone}\n`;
  }
  if (data.budgetRange) {
    message += `• *Estimasi Budget:* ${data.budgetRange}\n`;
  }
  message += `\n💬 *Rincian Pesan / Kebutuhan:*\n"${data.messageText}"\n\n`;
  message += `Mohon informasikan ketersediaan jadwal diskusi lebih lanjut. Terima kasih! 🙏`;

  const cleanPhone = formatPhoneNumberForWa(business.whatsappNumber);
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
