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

export interface DigitalTheme {
  id: string;
  name: string;
  slug: string;
  category: string; // e.g. 'Adat & Tradisional', 'Minimalis Modern', 'Floral & Rustic', 'Luxury Gold & Midnight', 'Islami Elegan'
  styleCategory?: string;
  previewThumbnail: string;
  additionalImages?: string[];
  previewUrl: string; // Link URL preview yang diisi sendiri oleh pemilik web
  price: string;
  originalPrice?: string;
  accentColor?: string;
  badge?: string;
  description: string;
  features: string[];
}

export interface LoveStoryItem {
  id: string;
  title: string;
  date: string;
  story: string;
  imageUrl?: string;
}

export interface GiftBankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  holderName: string;
}

export interface DigitalInvitationData {
  id: string;
  themeId: string;
  guestName: string; // Dynamic or editable e.g. "Bpk. & Ibu Tamu Terhormat"
  // Cover section
  coverTitle: string;
  coverSubtitle: string;
  coverDate: string;
  coverImage: string;
  musicUrl: string;
  musicTitle: string;
  // Home Section
  groomNickname: string;
  brideNickname: string;
  quoteText: string;
  quoteSource: string;
  // Pembukaan & Salam
  greetingOpening: string;
  // Mempelai Section
  groomFullName: string;
  groomParents: string;
  groomInstagram?: string;
  groomPhoto: string;
  brideFullName: string;
  brideParents: string;
  brideInstagram?: string;
  bridePhoto: string;
  // Event & Countdown
  eventTargetDate: string; // ISO format e.g. 2026-12-12T08:00:00
  // Akad Section
  akadTitle: string;
  akadDate: string;
  akadTime: string;
  akadVenue: string;
  akadAddress: string;
  // Resepsi Section
  resepsiTitle: string;
  resepsiDate: string;
  resepsiTime: string;
  resepsiVenue: string;
  resepsiAddress: string;
  // Google Maps
  googleMapsUrl: string;
  googleMapsEmbedUrl: string;
  // Love Story
  loveStories: LoveStoryItem[];
  // Galeri Foto
  galleryPhotos: string[];
  // Gift Section
  bankAccounts: GiftBankAccount[];
  physicalGiftRecipient: string;
  physicalGiftAddress: string;
  // Penutup
  closingText: string;
  familyMembers: string;
}

export interface DigitalWish {
  id: string;
  name: string;
  attendance: 'hadir' | 'tidak' | 'ragu';
  message: string;
  createdAt: string;
}
