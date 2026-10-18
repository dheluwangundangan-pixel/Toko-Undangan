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
