export interface OrderFormData {
  // Bagian 1: Data Pemesan & Pengiriman
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  shippingAddress: string;
  shippingCourier: string;
  estimatedWeightKg: string;
  estimatedShippingCost: string;

  // Bagian 2: Spesifikasi Undangan
  designTheme: string;
  quantity: string;
  paperType: string;
  finishing?: string;
  lamination?: string;

  // Bagian 3: Detail Acara untuk Dicetak
  groomName: string;
  groomParents: string;
  brideName: string;
  brideParents: string;
  akadDateTimeLocation: string;
  resepsiDateTimeLocation: string;
  turutMengundang?: string;
  mapsLink?: string;
  specialNotes?: string;

  // Metadata
  totalEstimatedPrice: string;
  status: string;
  createdAt?: string;
}

export interface CatalogItem {
  id: string;
  title: string;
  theme: string;
  paper: string;
  lamination: string;
  hotprint: string;
  emboss: string;
  priceRange: string;
  minOrder: string;
  imageUrl: string;
  description: string;
  badge?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  caption: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Waktu Pengerjaan' | 'Bahan & Kualitas' | 'Pemesanan & Revisi' | 'Pengiriman';
}

export interface SiteConfig {
  brandName: string;
  tagline: string;
  whatsappNumber: string; // e.g. "6281234567890"
  whatsappDisplay: string;
  email: string;
  address: string;
  operatingHoursWeekday: string;
  operatingHoursWeekend: string;
  announcementText: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroBadge: string;
}
