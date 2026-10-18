import { CatalogItem, FAQItem, GalleryItem, SiteConfig } from '../types';

export const initialSiteConfig: SiteConfig = {
  brandName: 'Dheluwang Undangan',
  tagline: 'Artisan Physical Wedding Stationery',
  whatsappNumber: '6281234567890',
  whatsappDisplay: '+62 812-3456-7890',
  email: 'dheluwangundangan@gmail.com',
  address: 'Jl. Surya Kencana No. 42, Senopati, Jakarta Selatan (Melayani Pengiriman ke Seluruh Nusantara)',
  operatingHoursWeekday: 'Senin - Sabtu: 08.00 - 20.00 WIB',
  operatingHoursWeekend: 'Minggu & Hari Libur: 09.00 - 17.00 WIB',
  announcementText: '',
  heroHeadline: 'Kemewahan Sentuhan Fisik untuk Hari Paling Bersejarah Anda',
  heroSubheadline: 'Hadirkan kehormatan pertama bagi para tamu istimewa dengan undangan fisik bertekstur premium, kilau hotprint emas murni, dan detail emboss 3D karya tangan pengrajin berpengalaman.',
  heroBadge: '✨ Premium Artisan Wedding Stationery'
};

export const defaultCatalogs: CatalogItem[] = [
  {
    id: 'dheluwang-01',
    title: 'Royal Astakona - Gold Foil Hardcover',
    theme: 'Classic Royal Luxury',
    paper: 'Cotton Paper 600 gsm Import + Hardcover Board 3mm',
    lamination: 'Soft Touch Velvet Doff Anti Gores',
    hotprint: 'Gold Foil Champagne 24K (Cover & Nama Mempelai)',
    emboss: 'Deboss 3D Frame Ornamen Monogram Tradisional Modern',
    priceRange: 'Rp 14.500 - Rp 18.500 / pcs',
    minOrder: '200 pcs',
    imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1000&q=80',
    description: 'Seri terfavorit para pengantin bangsawan modern. Menggabungkan ketebalan hardcover kokoh dengan sentuhan beludru velvet dan kilau foil emas sampanye yang sangat memikat di bawah cahaya.',
    badge: 'Best Seller'
  },
  {
    id: 'dheluwang-02',
    title: 'Kinanti Heritage - Batik Kawung Emas',
    theme: 'Traditional Modern Javanese',
    paper: 'Concorde Textured Ivory 310 gsm + Amplop Jasmine Pearl',
    lamination: 'Doff Halus Matte Premium',
    hotprint: 'Rose Gold Foil pada Tulisan Arab & Nama Panggilan',
    emboss: 'Embos Timbul Presisi Ornamen Kawung & Aksara',
    priceRange: 'Rp 9.500 - Rp 13.000 / pcs',
    minOrder: '150 pcs',
    imageUrl: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=1000&q=80',
    description: 'Filosofi sakral adat Jawa dikemas dengan tata letak kontemporer. Memadukan warna ivory hangat dengan ornamen batik klasik bertinta emas berkilau.',
    badge: 'Etnik Elegan'
  },
  {
    id: 'dheluwang-03',
    title: 'Serenade Botanical - Deckled Edge Cotton',
    theme: 'Rustic & Botanical Garden',
    paper: 'Handmade Deckled Cotton Paper 350 gsm (Tepi Sobek Alami)',
    lamination: 'Natural Uncoated Raw Texture (Serat Kapas Asli)',
    hotprint: 'Matte Pale Gold Foil Calligraphy',
    emboss: 'Blind Deboss Daun Zaitun & Monogram Pasangan',
    priceRange: 'Rp 12.000 - Rp 16.000 / pcs',
    minOrder: '100 pcs',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
    description: 'Bagi pasangan berjiwa puitis dan mengagumi estetika alam. Kertas katun berserat kasar lembut dengan tepian deckle sobek alami, diikat pita sutra chiffon dan stempel lilin (wax seal).',
    badge: 'Trending 2026'
  },
  {
    id: 'dheluwang-04',
    title: 'Aura Vellum - Minimalist Luxe',
    theme: 'Modern Minimalist',
    paper: 'Vellum Transparan Premium 160 gsm + Art Carton 360 gsm',
    lamination: 'Doff Matte Lapisan Pelindung Lembab',
    hotprint: 'Mirror Silver & Champagne Foil',
    emboss: 'Micro Emboss Garis Tipis Arsitektural',
    priceRange: 'Rp 8.500 - Rp 12.000 / pcs',
    minOrder: '150 pcs',
    imageUrl: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1000&q=80',
    description: 'Desain bersih, tipografi modern sans-serif dengan aksen serif elegan. Pembungkus semi-transparan vellum memberikan bayangan visual magis sebelum undangan dibuka.',
    badge: 'Minimalis Mewah'
  },
  {
    id: 'dheluwang-05',
    title: 'Emerald Regency - Pocket Hardcover',
    theme: 'Regency Luxury Emerald',
    paper: 'Linen Jepang Hijau Zamrud 320 gsm + Insert Jasmine White',
    lamination: 'Soft Matte Velvet',
    hotprint: 'Double Hotprint Rich Yellow Gold',
    emboss: 'High Relief 3D Crest Monogram',
    priceRange: 'Rp 16.000 - Rp 21.000 / pcs',
    minOrder: '200 pcs',
    imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80',
    description: 'Nuansa hijau botol zamrud yang anggun dan berwibawa. Tipe amplop kantong tri-fold dengan slot kartu akad, resepsi, dan RSVP tersendiri yang sangat rapi.',
    badge: 'Premium VIP'
  },
  {
    id: 'dheluwang-06',
    title: 'Symphony Rose - Dusty Blush & Gold',
    theme: 'Romantic Pastel',
    paper: 'Fedrigoni Sirio Pearl Rose Gold 300 gsm',
    lamination: 'Silk Doff Ultra Lembut',
    hotprint: 'Copper Rose Gold Hologram',
    emboss: 'Deboss Bunga Peony Lembut',
    priceRange: 'Rp 10.500 - Rp 14.500 / pcs',
    minOrder: '150 pcs',
    imageUrl: 'https://images.unsplash.com/photo-1513279926030-0e1c94ff2219?auto=format&fit=crop&w=1000&q=80',
    description: 'Pilihan manis untuk tema pernikahan pastel, garden party, atau ballroom bernuansa hangat. Berkilau lembut saat terkena pantulan cahaya lampu pesta.',
    badge: 'Favorit Pengantin'
  }
];

export const defaultGallery: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Detail Hotprint Emas 24K pada Hardcover Beludru',
    category: 'Detail Finishing',
    imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=85',
    caption: 'Teknik hot stamping emas presisi tinggi dengan kedalaman plat 2mm menghasilkan kilau mewah anti-pudar.'
  },
  {
    id: 'gal-2',
    title: 'Set Undangan Lengkap dengan Wax Seal & Silk Ribbon',
    category: 'Full Suite',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
    caption: 'Kombinasi stempel segel lilin handcrafted dengan pita sutra chiffon menambah kesan personal dan intim.'
  },
  {
    id: 'gal-3',
    title: 'Deckled Edge Cotton Paper Bertinta Kaligrafi Anggun',
    category: 'Bahan Artisan',
    imageUrl: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=1200&q=85',
    caption: 'Kertas kapas murni buatan tangan dengan pinggiran sobek alami tanpa pemotongan pisau mesin.'
  },
  {
    id: 'gal-4',
    title: 'Kemasan Amplop Pocket Vellum Transparan',
    category: 'Amplop & Sleeve',
    imageUrl: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=85',
    caption: 'Sleeve vellum transparan melindungi kartu utama sekaligus memberikan ilusi visual eksklusif.'
  },
  {
    id: 'gal-5',
    title: 'Sentuhan Tradisional Jawa Modern Berbalut Emas',
    category: 'Heritage Nusantara',
    imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85',
    caption: 'Ornamen gunungan dan sulur dedaunan keraton dalam balutan tipografi modern berkarakter.'
  },
  {
    id: 'gal-6',
    title: 'Deboss 3D Monogram Inisial Mempelai',
    category: 'Detail Finishing',
    imageUrl: 'https://images.unsplash.com/photo-1513279926030-0e1c94ff2219?auto=format&fit=crop&w=1200&q=85',
    caption: 'Efek cekung timbul tanpa tinta (blind deboss) yang memberi tekstur nyata saat diraba jemari.'
  },
  {
    id: 'gal-7',
    title: 'Kartu RSVP & Informasi Souvenir Eksklusif',
    category: 'Kartu Pelengkap',
    imageUrl: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=85',
    caption: 'Kelengkapan kartu penukaran suvenir, kartu akses QR Code, dan ucapan terima kasih serasi.'
  },
  {
    id: 'gal-8',
    title: 'Bahan Kertas Linen Jepang Bertekstur Silang Mewah',
    category: 'Bahan Artisan',
    imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85',
    caption: 'Kertas serat silang impor berdensitas tinggi, menyerap tinta dengan ketajaman warna sempurna.'
  }
];

export const defaultFAQs: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Waktu Pengerjaan',
    question: 'Berapa lama estimasi pengerjaan undangan hingga selesai dan siap kirim?',
    answer: 'Total proses berkisar antara 10 hingga 20 hari kerja tergantung tingkat kerumitan finishing (hardcover/foil/emboss). Alurnya terbagi: Pembuatan draft desain (2-3 hari kerja), proses revisi hingga ACC (1-3 hari), pembuatan sample proofing jika diminta (2-3 hari), dan masa produksi masal (7-12 hari kerja). Kami juga menyediakan layanan Rush Order / Express jika waktu pernikahan Anda sudah mendesak.'
  },
  {
    id: 'faq-2',
    category: 'Pemesanan & Revisi',
    question: 'Berapa jumlah minimal pemesanan (minimum order) di Dheluwang?',
    answer: 'Minimal pemesanan standar kami adalah 100 pcs untuk jenis Softcover dan 150 pcs untuk jenis Hardcover. Setiap set undangan sudah dilengkapi dengan kartu ucapan terima kasih (Thank You Card) dan stempel lilin wax seal custom inisial nama Anda.'
  },
  {
    id: 'faq-3',
    category: 'Pemesanan & Revisi',
    question: 'Berapa kali batas revisi desain dan bagaimana mekanismenya?',
    answer: 'Kami memberikan fasilitas REVISI TANPA BATAS (UNLIMITED REVISIONS) untuk teks, tata letak tulisan, penyesuaian font, dan susunan nama hingga Anda dan keluarga benar-benar 100% puas dan menyatakan ACC Final secara tertulis. Selama proses ini, desainer kami akan mendampingi Anda langsung via WhatsApp personal.'
  },
  {
    id: 'faq-4',
    category: 'Bahan & Kualitas',
    question: 'Apakah calon pengantin bisa meminta contoh cetak fisik (Sample Kit / Proofing)?',
    answer: 'Tentu bisa! Kami sangat memahami betapa pentingnya merasakan langsung tekstur kertas dan ketajaman cetak. Anda dapat memesan Sample Kit berisi aneka jenis kertas (Jasmine, Linen, Cotton Deckle, dll) beserta contoh hotprint foil dan emboss sebelum melakukan cetak masal. Biaya sample kit akan dipotongkan ke total order utama Anda.'
  },
  {
    id: 'faq-5',
    category: 'Pengiriman',
    question: 'Bagaimana pengemasan fisik undangan dan apakah aman dikirim ke luar kota/pulau?',
    answer: 'Setiap paket undangan dibungkus per-50 pcs menggunakan plastik kedap air, dilapisi bubble wrap tebal berlapis-lapis, kardus hardbox ganda, dan diberi pelindung sudut (corner protector). Untuk pengiriman antar pulau dan luar negeri, kami melengkapi dengan packing kayu bersertifikat agar aman dari risiko basah maupun tertekuk selama perjalanan ekspedisi.'
  },
  {
    id: 'faq-6',
    category: 'Bahan & Kualitas',
    question: 'Bagaimana jika terdapat kesalahan cetak nama atau gelar pada hasil jadi?',
    answer: 'Sebelum naik mesin cetak masal, kami selalu meminta persetujuan "ACC Final Proofing". Jika kesalahan berasal dari kelalaian pihak Dheluwang (berbeda dari dokumen final yang disetujui), kami memberikan GARANSI CETAK ULANG 100% GRATIS dan pengiriman kilat ke alamat Anda tanpa biaya tambahan.'
  },
  {
    id: 'faq-7',
    category: 'Pengiriman',
    question: 'Ekspedisi apa saja yang digunakan dan bagaimana perhitungan ongkos kirimnya?',
    answer: 'Kami bekerja sama dengan JNE (REG/YES/JTR Cargo), J&T Express, SiCepat, serta Kargo Darat/Udara seperti Indah Logistik dan Lion Parcel untuk pemesanan dalam jumlah banyak (20-50 kg ke atas). Estimasi berat rata-rata 1 set undangan adalah 40-70 gram (tergantung model hardcover/softcover).'
  }
];

export const courierOptions = [
  { id: 'jne_reg', name: 'JNE Reguler (Estimasi 2-3 hari)', ratePerKg: 18000 },
  { id: 'jne_yes', name: 'JNE YES Kilat (Estimasi 1 hari kerja)', ratePerKg: 32000 },
  { id: 'jnt_ez', name: 'J&T Express (Estimasi 2-3 hari)', ratePerKg: 19000 },
  { id: 'sicepat', name: 'SiCepat Reguler (Estimasi 2-3 hari)', ratePerKg: 18500 },
  { id: 'cargo_jtr', name: 'JNE JTR Cargo Trucking (Khusus >10 kg, Hemat)', ratePerKg: 8500, minKg: 10 },
  { id: 'indah_cargo', name: 'Indah Logistik Cargo (Khusus >15 kg, Sangat Hemat)', ratePerKg: 7500, minKg: 15 },
  { id: 'ambil_studio', name: 'Ambil Sendiri di Studio Dheluwang (Gratis)', ratePerKg: 0 }
];

export const paperOptions = [
  'Cotton Paper 600 gsm Import (Mewah, Tebal & Tepi Kasar Elegan)',
  'Hardcover Board Tebal 3mm + Lapisan Velvet Doff',
  'Linen Jepang 320 gsm (Serat Silang Berkarakter)',
  'Jasmine Shimmer Pearl 310 gsm (Kilau Mutiara Mewah)',
  'Concorde / Textured Ivory 300 gsm (Klasik Hangat)',
  'Art Carton 360 gsm Premium Doff',
  'Vellum Transparan 160 gsm + Insert Kertas Katun'
];

export const finishingOptions = [
  'Hotprint Foil Gold Champagne 24K',
  'Hotprint Rose Gold Metalik',
  'Hotprint Silver / Hologram',
  'Embos / Debos 3D Monogram Timbul',
  'Stempel Lilin Handmade (Wax Seal Custom Inisial)',
  'Pita Sutra Chiffon Handcrafted',
  'Tepi Kertas Sobek Alami (Deckled Edge)',
  'Amplop Kantong Tri-fold Eksklusif'
];

export const laminationOptions = [
  'Soft Touch Velvet Matte (Sensasi Sentuhan Beludru Lembut)',
  'Doff Matte Halus Anti Gores',
  'Glossy Kilap Tinggi',
  'Uncoated Natural (Tekstur Serat Kertas Murni)'
];

export const defaultDigitalThemes: import('../types').DigitalTheme[] = [
  {
    id: 'theme-surya-kencana',
    name: 'Surya Kencana - Royal Javanese Heritage',
    slug: 'surya-kencana',
    category: 'Adat & Tradisional',
    previewThumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80'
    ],
    previewUrl: 'https://ais-pre-lwpz7o2kv7gcyn4helkmr7-403071665571.asia-northeast1.run.app?theme=surya-kencana',
    price: 'Rp 149.000',
    originalPrice: 'Rp 250.000',
    accentColor: '#B8860B',
    badge: 'Best Seller Adat',
    description: 'Kemewahan ornamen ukiran emas keraton berpadu motif batik klasik, sangat anggun untuk pernikahan bernuansa adat Jawa atau nusantara modern.',
    features: [
      'Cover Animasi Buka Undangan',
      'Tamu Undangan Tanpa Batas (Unlimited)',
      'Live Realtime Countdown Timer',
      'Integrasi Google Maps Akurat',
      'Amplop Digital & QRIS Bank',
      'Pemutar Musik Bebas Pilih',
      'Buku Tamu & Ucapan Doa',
      'Masa Aktif Selamanya'
    ]
  },
  {
    id: 'theme-lumina-minimal',
    name: 'Lumina Pure - Aesthetic Minimalist',
    slug: 'lumina-minimal',
    category: 'Minimalis Modern',
    previewThumbnail: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80'
    ],
    previewUrl: 'https://ais-pre-lwpz7o2kv7gcyn4helkmr7-403071665571.asia-northeast1.run.app?theme=lumina-minimal',
    price: 'Rp 129.000',
    originalPrice: 'Rp 199.000',
    accentColor: '#5B7065',
    badge: 'Paling Populer',
    description: 'Desain bersih dengan sentuhan warna hijau sage lembut, tata letak luas, dan tipografi modern kontemporer yang sangat nyaman di mata.',
    features: [
      'Cover Modern Tipografi Bersih',
      'Fitur RSVP Konfirmasi Kehadiran',
      'Galeri Foto Lightbox Interaktif',
      'Garis Waktu Kisah Cinta (Love Story)',
      'Tombol Simpan Google Calendar',
      'Amplop Rekening Multi-Bank',
      'Navigasi Melayang Responsif',
      'Revisi Bebas hingga Puas'
    ]
  },
  {
    id: 'theme-terracotta-boho',
    name: 'Sora Terracotta - Warm Rustic Botanical',
    slug: 'terracotta-boho',
    category: 'Floral & Rustic',
    previewThumbnail: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80'
    ],
    previewUrl: 'https://ais-pre-lwpz7o2kv7gcyn4helkmr7-403071665571.asia-northeast1.run.app?theme=terracotta-boho',
    price: 'Rp 139.000',
    originalPrice: 'Rp 220.000',
    accentColor: '#A0522D',
    badge: 'Favorit Outdoor',
    description: 'Nuansa hangat terakota tanah liat dipadukan ilustrasi bunga kering pampas dan dedaunan bohemian, sempurna untuk pesta outdoor atau intimate wedding.',
    features: [
      'Cover Bohemian Estetik',
      'Peta Google Maps Embed & Arah',
      'Galeri Foto Grid Masonry',
      'Format Kirim Kado Fisik & Paket',
      'Pemutar Musik Latar Belakang',
      'Form Ucapan & Doa Tamu',
      'Responsive Mobile & Tablet',
      'Proses Kilat 1x24 Jam'
    ]
  },
  {
    id: 'theme-midnight-star',
    name: 'Nocturne Velvet - Midnight Gold Luxury',
    slug: 'midnight-star',
    category: 'Luxury Gold & Midnight',
    previewThumbnail: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80'
    ],
    previewUrl: 'https://ais-pre-lwpz7o2kv7gcyn4helkmr7-403071665571.asia-northeast1.run.app?theme=midnight-star',
    price: 'Rp 169.000',
    originalPrice: 'Rp 280.000',
    accentColor: '#1A365D',
    badge: 'Edisi Premium',
    description: 'Kombinasi eksklusif warna biru malam gelap dengan aksen serpihan emas 24K dan tipografi megah, memberikan nuansa ballroom bintang lima.',
    features: [
      'Mode Gelap Eksklusif Bintang',
      'Animasi Transisi Halus Mewah',
      'Hitung Mundur Waktu Nyata',
      'Multi Rekening & QRIS Code',
      'Tautan Kalender Google Otomatis',
      'Profil Mempelai Lengkap & Sosmed',
      'Custom Audio Lagu Romantis',
      'Dukungan Admin Prioritas'
    ]
  },
  {
    id: 'theme-amora-blush',
    name: 'Amora Peony - Soft Romantic Floral',
    slug: 'amora-blush',
    category: 'Floral & Rustic',
    previewThumbnail: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80'
    ],
    previewUrl: 'https://ais-pre-lwpz7o2kv7gcyn4helkmr7-403071665571.asia-northeast1.run.app?theme=amora-blush',
    price: 'Rp 139.000',
    originalPrice: 'Rp 210.000',
    accentColor: '#C08081',
    badge: 'Romantis Manis',
    description: 'Rona merah muda pastel lembut berpadu ilustrasi kelopak bunga peony air yang bermekaran, menghadirkan aura kasih sayang yang manis dan abadi.',
    features: [
      'Ilustrasi Cat Air Bunga Peony',
      'Cover Personal Nama Tamu',
      'Kolom Ucapan Doa Restu',
      'Galeri Foto dengan Zoom Modal',
      'Amplop Digital BCA/Mandiri/BRI',
      'Petunjuk Lokasi Google Maps',
      'Countdown Menuju Hari H',
      'Aktif Selamanya'
    ]
  },
  {
    id: 'theme-medina-alnoor',
    name: 'Al-Noor Signature - Islamic Moroccan Grace',
    slug: 'medina-alnoor',
    category: 'Islami Elegan',
    previewThumbnail: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80'
    ],
    previewUrl: 'https://ais-pre-lwpz7o2kv7gcyn4helkmr7-403071665571.asia-northeast1.run.app?theme=medina-alnoor',
    price: 'Rp 149.000',
    originalPrice: 'Rp 240.000',
    accentColor: '#2D5A27',
    badge: 'Nuansa Sakral',
    description: 'Desain islami yang teduh dengan ornamen kubah maroko, kaligrafi bismillah anggun, dan penataan ayat suci Al-Qur’an yang sangat khidmat.',
    features: [
      'Ornamen Islami Geometris Mewah',
      'Kaligrafi & Ayat Suci Pilihan',
      'Jadwal Akad & Resepsi Terpisah',
      'Petunjuk Arah Google Maps Akurat',
      'Buku Tamu Online Realtime',
      'Amplop Digital Tanpa Potongan',
      'Cover Interaktif Nama Tamu',
      'Garansi Data Aman & Cepat'
    ]
  },
  {
    id: 'theme-sunda-siger',
    name: 'Sunda Siger Mahligai - Parahyangan Glamour',
    slug: 'sunda-siger',
    category: 'Adat & Tradisional',
    previewThumbnail: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80'
    ],
    previewUrl: 'https://ais-pre-lwpz7o2kv7gcyn4helkmr7-403071665571.asia-northeast1.run.app?theme=sunda-siger',
    price: 'Rp 149.000',
    originalPrice: 'Rp 250.000',
    accentColor: '#B8860B',
    badge: 'Adat Parahyangan',
    description: 'Mahakarya ornamen siger perak & emas berpadu untaian melati ronce khas pengantin Sunda, menghadirkan kemewahan tradisi yang tak lekang oleh waktu.',
    features: [
      'Cover Siger Sunda Beranimasi',
      'Lagu Kecapi Suling Romantis',
      'Buku Tamu & RSVP Realtime',
      'Integrasi Google Maps Presisi',
      'Amplop Digital & QRIS Bank',
      'Unlimited Nama Tamu Undangan',
      'Galeri Foto Sinematik',
      'Masa Aktif Selamanya'
    ]
  },
  {
    id: 'theme-emerald-royale',
    name: 'The Royal Emerald - Deep Green & Gold Foil',
    slug: 'emerald-royale',
    category: 'Luxury Gold & Midnight',
    previewThumbnail: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80'
    ],
    previewUrl: 'https://ais-pre-lwpz7o2kv7gcyn4helkmr7-403071665571.asia-northeast1.run.app?theme=emerald-royale',
    price: 'Rp 159.000',
    originalPrice: 'Rp 260.000',
    accentColor: '#134E4A',
    badge: 'Edisi Sultan',
    description: 'Perpaduan megah hijau zamrud gelap (deep emerald) dengan aksen bingkai emas timbul, sangat serasi untuk pesta ballroom megah dan intimate dinner.',
    features: [
      'Palet Warna Hijau Zamrud & Emas',
      'Cover Interaktif Nama Tamu',
      'Countdown Timer Waktu Nyata',
      'Integrasi Navigasi Google Maps',
      'Amplop Rekening Multi-Bank & QRIS',
      'Galeri Foto Lightbox Zoom',
      'Bebas Revisi Data Acara',
      'Dukungan Admin Ramah'
    ]
  }
];

export const defaultDigitalInvitationData: import('../types').DigitalInvitationData = {
  id: 'dheluwang-digital-demo',
  themeId: 'theme-royal-gold',
  guestName: 'Bapak / Ibu / Saudara(i) Terhormat',
  
  // Cover
  coverTitle: 'The Wedding of',
  coverSubtitle: 'Dheluwang Digital Signature Edition',
  coverDate: 'Sabtu, 12 Desember 2026',
  coverImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
  musicUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-love-story-piano-112191.mp3',
  musicTitle: 'Romantic Love Story - Acoustic Piano',
  
  // Home
  groomNickname: 'Rian',
  brideNickname: 'Nisa',
  quoteText: 'Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.',
  quoteSource: 'QS. Ar-Rum: 21',
  
  // Opening & Salam
  greetingOpening: 'Assalamu’alaikum Warahmatullahi Wabarakatuh. Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta’ala, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu pada pernikahan kami:',
  
  // Mempelai
  groomFullName: 'Muhammad Rian Ardiansyah, S.T.',
  groomParents: 'Putra pertama dari Bpk. Ir. H. Bambang Hartono & Ibu Hj. Siti Nurhaliza',
  groomInstagram: 'rian.ardiansyah',
  groomPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  
  brideFullName: 'Annisa Nur Lathifah, M.Ds.',
  brideParents: 'Putri kedua dari Bpk. Drs. H. Suryo Prabowo & Ibu Hj. Endang Rahmawati',
  brideInstagram: 'annisa.lathifah',
  bridePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  
  // Event & Countdown (Set to futuristic date for demo)
  eventTargetDate: '2026-12-12T08:00:00',
  
  // Akad
  akadTitle: 'Akad Nikah',
  akadDate: 'Sabtu, 12 Desember 2026',
  akadTime: '08.00 - 10.00 WIB',
  akadVenue: 'Masjid Agung Al-Azhar Kebayoran',
  akadAddress: 'Jl. Sisingamangaraja No. 1, Selong, Kebayoran Baru, Jakarta Selatan',
  
  // Resepsi
  resepsiTitle: 'Resepsi Pernikahan',
  resepsiDate: 'Sabtu, 12 Desember 2026',
  resepsiTime: '11.00 - 14.00 WIB',
  resepsiVenue: 'The Glass House Grand Ballroom',
  resepsiAddress: 'Jl. Surya Kencana No. 42, Senopati, Kebayoran Baru, Jakarta Selatan',
  
  // Google Maps
  googleMapsUrl: 'https://maps.google.com/?q=Jakarta+Selatan',
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2731835787617!2d106.7972749!3d-6.2276709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f14ec7b94a2b%3A0x673c6806947bc63!2sSenopati%2C%20Kby.%20Baru%2C%20Kota%20Jakarta%20Selatan!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid',
  
  // Love Story
  loveStories: [
    {
      id: 'story-1',
      title: 'Pertemuan Pertama di Kampus',
      date: 'Oktober 2019',
      story: 'Takdir mempertemukan kami pertama kali di perpustakaan pusat kampus. Sebuah perbincangan singkat tentang buku desain yang berlanjut menjadi diskusi hangat setiap senja.',
      imageUrl: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'story-2',
      title: 'Momen Lamaran Sakral',
      date: 'Februari 2025',
      story: 'Dengan restu kedua orang tua dan niat tulus beribadah seumur hidup, Rian mengutarakan niat suci melamar Nisa dalam pertemuan keluarga yang penuh haru dan kebahagiaan.',
      imageUrl: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'story-3',
      title: 'Menuju Babak Baru Kehidupan',
      date: 'Desember 2026',
      story: 'Kini, dengan penuh rasa syukur, kami siap melangkah bersama mengarungi samudra rumah tangga, saling melengkapi dan menyayangi dalam ikatan suci pernikahan.',
      imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80'
    }
  ],
  
  // Galeri
  galleryPhotos: [
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=80'
  ],
  
  // Gift Section
  bankAccounts: [
    {
      id: 'bank-1',
      bankName: 'BCA (Bank Central Asia)',
      accountNumber: '8830912834',
      holderName: 'Muhammad Rian Ardiansyah'
    },
    {
      id: 'bank-2',
      bankName: 'Bank Mandiri',
      accountNumber: '1370018273645',
      holderName: 'Annisa Nur Lathifah'
    }
  ],
  physicalGiftRecipient: 'Annisa Nur Lathifah / Rian Ardiansyah (0812-3456-7890)',
  physicalGiftAddress: 'Apartemen Residence Senopati Tower B No. 1204, Jl. Senopati Raya, Kebayoran Baru, Jakarta Selatan, 12190',
  
  // Penutup
  closingText: 'Merupakan suatu kehormatan dan kebahagiaan yang tak terhingga bagi kami sekeluarga apabila Bapak/Ibu/Saudara/i berkenan hadir serta melimpahkan untaian doa restu bagi awal perjalanan suci kami berdua.',
  familyMembers: 'Keluarga Besar Bpk. Ir. H. Bambang Hartono & Bpk. Drs. H. Suryo Prabowo'
};

export const defaultDigitalWishes: import('../types').DigitalWish[] = [
  {
    id: 'wish-1',
    name: 'Dimas Prasetyo & Keluarga',
    attendance: 'hadir',
    message: 'Barakallahu lakuma wa baraka alaikuma wa jama’a bainakuma fii khair. Selamat untuk Mas Rian dan Mbak Nisa! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah sampai ke surga-Nya.',
    createdAt: '1 jam yang lalu'
  },
  {
    id: 'wish-2',
    name: 'dr. Sarah Angelina',
    attendance: 'hadir',
    message: 'Happy wedding Nisa cantiiik dan Mas Rian! Ikut bahagia banget melihat perjalanan kalian dari zaman kuliah sampai ke pelaminan. Lancar sampai hari H yaa!',
    createdAt: '3 jam yang lalu'
  },
  {
    id: 'wish-3',
    name: 'Bpk. Hendra Gunawan (Alumni Teknik)',
    attendance: 'hadir',
    message: 'Selamat menempuh hidup baru Rian. Semoga senantiasa rukun, diberkahi rezeki melimpah, dan segera diberikan momongan yang sholeh/sholehah.',
    createdAt: '5 jam yang lalu'
  },
  {
    id: 'wish-4',
    name: 'Fauzan & Nadia (Semarang)',
    attendance: 'tidak',
    message: 'Mohon maaf belum bisa hadir langsung karena dinas di luar kota, namun doa kami dari jauh senantiasa menyertai kalian berdua. Sakinah mawaddah warahmah selalu!',
    createdAt: '1 hari yang lalu'
  }
];

export const defaultDigitalInvitationsByTheme: Record<string, import('../types').DigitalInvitationData> = {
  'theme-royal-gold': {
    ...defaultDigitalInvitationData,
    id: 'invitation-royal-gold',
    themeId: 'theme-royal-gold',
    coverTitle: 'The Royal Matrimony',
    coverSubtitle: 'Dheluwang Royal Gold Edition',
    groomNickname: 'Rian',
    brideNickname: 'Nisa',
    groomFullName: 'Muhammad Rian Ardiansyah, S.T.',
    brideFullName: 'Annisa Nur Lathifah, M.Ds.',
    akadVenue: 'Masjid Agung Al-Azhar Kebayoran',
    resepsiVenue: 'The Glass House Grand Ballroom'
  },
  'theme-minimalist-sage': {
    ...defaultDigitalInvitationData,
    id: 'invitation-minimalist-sage',
    themeId: 'theme-minimalist-sage',
    coverTitle: 'Together Forever',
    coverSubtitle: 'Dheluwang Modern Sage Edition',
    coverImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    groomNickname: 'Arya',
    brideNickname: 'Sarah',
    groomFullName: 'Arya Danu Kusuma, B.Eng.',
    brideFullName: 'Sarah Azzahra, S.I.Kom.',
    groomParents: 'Putra kedua dari Bpk. H. Hendro Kusumo & Ibu Hj. Marwah',
    brideParents: 'Putri pertama dari Bpk. Ir. Gunawan & Ibu Ratna Dewi',
    akadVenue: 'Plataran Dharmawangsa',
    resepsiVenue: 'Hutan Kota by Plataran Senayan'
  },
  'theme-rustic-terracotta': {
    ...defaultDigitalInvitationData,
    id: 'invitation-rustic-terracotta',
    themeId: 'theme-rustic-terracotta',
    coverTitle: 'Warm Bohemian Union',
    coverSubtitle: 'Dheluwang Warm Terracotta Edition',
    coverImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    groomNickname: 'Bima',
    brideNickname: 'Dara',
    groomFullName: 'Bima Satria Wicaksono, M.M.',
    brideFullName: 'Dara Anindita Prameswari, S.Sn.',
    groomParents: 'Putra pertama dari Bpk. Sutrisno & Ibu Sri Wahyuni',
    brideParents: 'Putri bungsu dari Bpk. Dedi Suryadi & Ibu Heni Rosita',
    akadVenue: 'Pendopo Kemang Urban Rustic',
    resepsiVenue: 'Taman Kajoe Outdoor Pavilion'
  },
  'theme-midnight-navy': {
    ...defaultDigitalInvitationData,
    id: 'invitation-midnight-navy',
    themeId: 'theme-midnight-navy',
    coverTitle: 'Celestial Starlight Wedding',
    coverSubtitle: 'Dheluwang Midnight Navy Edition',
    coverImage: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
    groomNickname: 'Rayhan',
    brideNickname: 'Maya',
    groomFullName: 'Rayhan Zulkarnain, S.Ked.',
    brideFullName: 'dr. Maya Kartika Putri',
    groomParents: 'Putra tunggal dari Dr. H. Faisal Rahman & Ibu drg. Yuliana',
    brideParents: 'Putri pertama dari Bpk. Anton Nugroho & Ibu Maya Syafira',
    akadVenue: 'Grand Ballroom Fairmont Hotel',
    resepsiVenue: 'Fairmont Hotel Ballroom Jakarta'
  },
  'theme-botanical-garden': {
    ...defaultDigitalInvitationData,
    id: 'invitation-botanical-garden',
    themeId: 'theme-botanical-garden',
    coverTitle: 'The Botanical Matrimony',
    coverSubtitle: 'Dheluwang Emerald Botanical Edition',
    coverImage: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80',
    groomNickname: 'Fajar',
    brideNickname: 'Alana',
    groomFullName: 'Fajar Pratama, S.Si.',
    brideFullName: 'Alana Kirana Dewi, S.H.',
    groomParents: 'Putra kedua dari Bpk. Joko Supriyanto & Ibu Nani Suryati',
    brideParents: 'Putri sulung dari Bpk. H. Rahmat Hidayat & Ibu Hj. Maryam',
    akadVenue: 'Pine Hill Outdoor Sanctuary',
    resepsiVenue: 'Gedong Putih Pine Glasshouse'
  }
};

