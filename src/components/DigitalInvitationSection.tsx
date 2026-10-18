import React, { useState } from 'react';
import { 
  Sparkles, 
  Eye, 
  ExternalLink, 
  Edit3, 
  Plus, 
  CheckCircle, 
  MessageCircle, 
  Search, 
  Smartphone, 
  Copy, 
  Check, 
  Music, 
  MapPin, 
  Calendar, 
  CreditCard, 
  Users, 
  Heart, 
  Image as ImageIcon, 
  ChevronRight, 
  Clock, 
  Share2, 
  ShieldCheck, 
  Lock,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { DigitalTheme, SiteConfig } from '../types';
import { DigitalThemeEditorModal } from './DigitalThemeEditorModal';
import { DigitalLivePreviewModal } from './DigitalLivePreviewModal';

interface DigitalInvitationSectionProps {
  themes: DigitalTheme[];
  onSaveTheme: (updatedTheme: DigitalTheme) => void;
  onDeleteTheme?: (themeId: string) => void;
  isAdminAuthenticated: boolean;
  onRequestAdminAuth: (action: () => void) => void;
  config: SiteConfig;
  onSelectForOrder?: () => void;
}

export const DigitalInvitationSection: React.FC<DigitalInvitationSectionProps> = ({
  themes,
  onSaveTheme,
  onDeleteTheme,
  isAdminAuthenticated,
  onRequestAdminAuth,
  config,
  onSelectForOrder
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Theme active preview image selection per card (for multi-image browsing)
  const [activeImageByThemeId, setActiveImageByThemeId] = useState<Record<string, string>>({});

  // Modals state
  const [editingTheme, setEditingTheme] = useState<DigitalTheme | null>(null);
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
  const [previewTheme, setPreviewTheme] = useState<DigitalTheme | null>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  // Interactive Guest Link Simulator State
  const [simGuestName, setSimGuestName] = useState('Bpk. Ir. H. Ahmad Subagio & Keluarga');
  const [copiedSimLink, setCopiedSimLink] = useState(false);
  const [copiedSimWhatsAppText, setCopiedSimWhatsAppText] = useState(false);

  const categories = [
    'Semua',
    'Adat & Tradisional',
    'Luxury Gold & Midnight',
    'Minimalis Modern',
    'Floral & Rustic',
    'Islami Elegan',
    'Vintage & Aesthetic'
  ];

  // Filtering themes
  const filteredThemes = themes.filter((t) => {
    const matchesCategory = selectedCategory === 'Semua' || t.category === selectedCategory || t.styleCategory === selectedCategory;
    const matchesSearch = 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.badge && t.badge.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Admin: Open Edit Theme
  const handleEditClick = (themeItem: DigitalTheme) => {
    if (isAdminAuthenticated) {
      setEditingTheme(themeItem);
      setIsEditorModalOpen(true);
    } else {
      onRequestAdminAuth(() => {
        setEditingTheme(themeItem);
        setIsEditorModalOpen(true);
      });
    }
  };

  // Admin: Open Add New Theme
  const handleAddNewClick = () => {
    if (isAdminAuthenticated) {
      setEditingTheme(null);
      setIsEditorModalOpen(true);
    } else {
      onRequestAdminAuth(() => {
        setEditingTheme(null);
        setIsEditorModalOpen(true);
      });
    }
  };

  // Open Preview Modal or Direct Link
  const handleOpenPreview = (themeItem: DigitalTheme) => {
    setPreviewTheme(themeItem);
    setIsPreviewModalOpen(true);
  };

  // Order via WhatsApp Handler
  const handleOrderViaWhatsApp = (themeItem: DigitalTheme) => {
    const phone = config.whatsappNumber || '6281234567890';
    const message = encodeURIComponent(
      `Halo *${config.brandName}*, saya ingin memesan *Undangan Digital* dengan tema:\n` +
      `💍 *Tema*: ${themeItem.name}\n` +
      `🏷️ *Harga*: ${themeItem.price}\n` +
      `🌐 *Link Demo*: ${themeItem.previewUrl || '-'}\n\n` +
      `Mohon informasi langkah pemesanan dan pengisian data mempelai. Terima kasih!`
    );
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  // Switch image on card thumbnail click
  const handleSelectThumbnailImage = (themeId: string, imgUrl: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageByThemeId((prev) => ({
      ...prev,
      [themeId]: imgUrl
    }));
  };

  // Sample Guest Link Generation for interactive simulator
  const sampleBaseUrl = themes[0]?.previewUrl || 'https://dheluwang.com/undangan/wedding-demo';
  const simulatedUrl = `${sampleBaseUrl}${sampleBaseUrl.includes('?') ? '&' : '?'}to=${encodeURIComponent(simGuestName)}`;
  const simulatedWaInvitation = 
`Kepada Yth.
${simGuestName}

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami.

Detail informasi acara, lokasi maps, dan doa restu dapat diakses melalui tautan undangan digital kami berikut:
${simulatedUrl}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.

Terima kasih.
Hormat kami,
Kedua Mempelai & Keluarga Besar`;

  const handleCopySimUrl = () => {
    navigator.clipboard.writeText(simulatedUrl);
    setCopiedSimLink(true);
    setTimeout(() => setCopiedSimLink(false), 2000);
  };

  const handleCopySimWaText = () => {
    navigator.clipboard.writeText(simulatedWaInvitation);
    setCopiedSimWhatsAppText(true);
    setTimeout(() => setCopiedSimWhatsAppText(false), 2000);
  };

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      
      {/* 1. SECTION HERO & INTRO */}
      <section className="text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF4E6] border border-[#E8DEC9] text-[#996515] text-xs font-bold uppercase tracking-widest shadow-2xs">
          <Sparkles className="w-4 h-4 text-[#B8860B]" />
          <span>Katalog Resmi Undangan Pernikahan Digital</span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C2926] tracking-tight leading-tight">
          Koleksi Desain Undangan Digital Interaktif
        </h1>

        <p className="text-sm sm:text-base text-[#615549] leading-relaxed max-w-3xl mx-auto">
          Pilihan tema website undangan digital paling elegan dengan animasi cover buka undangan, nama tamu tak terbatas, musik romantis otomatis, navigasi Google Maps akurat, hitung mundur, amplop digital, dan buku tamu realtime.
        </p>

        {/* 4 Value Proposition Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 text-left">
          <div className="p-3.5 bg-white rounded-2xl border border-[#E8DEC9] shadow-2xs space-y-1">
            <span className="text-xs font-bold text-[#996515] block">Tamu Tanpa Batas</span>
            <p className="text-[11px] text-stone-500">Buat link khusus nama setiap tamu sepuasnya tanpa biaya tambahan.</p>
          </div>
          <div className="p-3.5 bg-white rounded-2xl border border-[#E8DEC9] shadow-2xs space-y-1">
            <span className="text-xs font-bold text-[#996515] block">100% Mobile Friendly</span>
            <p className="text-[11px] text-stone-500">Tampilan sempurna dan super cepat di iPhone, Android, dan PC.</p>
          </div>
          <div className="p-3.5 bg-white rounded-2xl border border-[#E8DEC9] shadow-2xs space-y-1">
            <span className="text-xs font-bold text-[#996515] block">Amplop Digital & QRIS</span>
            <p className="text-[11px] text-stone-500">Terima kado pernikahan langsung ke rekening pribadi tanpa potongan.</p>
          </div>
          <div className="p-3.5 bg-white rounded-2xl border border-[#E8DEC9] shadow-2xs space-y-1">
            <span className="text-xs font-bold text-[#996515] block">Proses Cepat 1x24 Jam</span>
            <p className="text-[11px] text-stone-500">Pengerjaan kilat dengan jaminan revisi sampai Anda benar-benar puas.</p>
          </div>
        </div>

        {/* Admin Quick Action Button (If authenticated) */}
        {isAdminAuthenticated && (
          <div className="pt-2 flex justify-center">
            <button
              onClick={handleAddNewClick}
              className="px-5 py-2.5 rounded-full bg-[#FAF5EB] hover:bg-[#F3E8CF] text-[#996515] border border-[#E8DEC9] text-xs font-bold transition flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#996515]" />
              <span>+ Tambah Desain Tema Baru (Khusus Pemilik)</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            </button>
          </div>
        )}
      </section>

      {/* 2. FILTER & SEARCH BAR */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Categories Tab Scroll */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#996515] text-white shadow-xs'
                    : 'bg-white border border-[#E0D5C1] text-[#554A3E] hover:bg-[#FAF7F0]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari tema, warna, atau gaya..."
              className="w-full pl-9 pr-4 py-2 rounded-full border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#996515] bg-white"
            />
          </div>

        </div>
      </section>

      {/* 3. GRID KUMPULAN GAMBAR TEMA & KARTU PREVIEW */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-[#2C2926]">
            Daftar Desain Tema Tersedia ({filteredThemes.length})
          </h2>
          {isAdminAuthenticated && (
            <button
              onClick={handleAddNewClick}
              className="text-xs font-bold text-[#996515] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Desain Baru</span>
            </button>
          )}
        </div>

        {filteredThemes.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 space-y-4">
            <Sparkles className="w-8 h-8 text-stone-400 mx-auto" />
            <p className="text-sm font-semibold text-stone-700">Tidak ada tema yang cocok dengan pencarian Anda.</p>
            <button
              onClick={() => { setSelectedCategory('Semua'); setSearchQuery(''); }}
              className="text-xs text-[#996515] font-bold underline"
            >
              Reset Filter & Pencarian
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredThemes.map((themeItem) => {
              // Current active displayed image (main thumbnail or clicked thumbnail)
              const currentDisplayImage = activeImageByThemeId[themeItem.id] || themeItem.previewThumbnail;
              const allImages = [
                themeItem.previewThumbnail,
                ...(themeItem.additionalImages || [])
              ];

              return (
                <div
                  key={themeItem.id}
                  className="bg-white rounded-3xl border border-[#EAE2D2] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  {/* Mockup Preview Area */}
                  <div className="relative h-72 sm:h-80 overflow-hidden bg-stone-900 flex flex-col justify-between">
                    <img
                      src={currentDisplayImage}
                      alt={themeItem.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"></div>

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                      <div className="flex items-center gap-2">
                        {themeItem.badge && (
                          <span className="px-3 py-1 rounded-full bg-[#FAF5EB] text-[#996515] font-bold text-[10px] tracking-wider uppercase border border-[#E8DEC9] shadow-xs">
                            {themeItem.badge}
                          </span>
                        )}
                        <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-medium text-[10px] tracking-wider uppercase border border-white/20">
                          {themeItem.category}
                        </span>
                      </div>

                      {/* Admin Edit Shortcut Button on Image */}
                      <button
                        onClick={() => handleEditClick(themeItem)}
                        title="Edit Link Preview & Data Tema Ini (Khusus Pemilik)"
                        className="p-2 rounded-full bg-white/90 hover:bg-white text-stone-800 hover:text-[#996515] shadow-md transition cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Multi-Image Thumbnails Selector (Kumpulan Gambar Tema) */}
                    {allImages.length > 1 && (
                      <div className="absolute top-14 left-4 z-10 flex flex-col gap-1.5 bg-black/40 p-1.5 rounded-xl backdrop-blur-xs border border-white/10">
                        {allImages.slice(0, 4).map((img, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => handleSelectThumbnailImage(themeItem.id, img, e)}
                            className={`w-7 h-7 rounded-md overflow-hidden border transition cursor-pointer ${
                              currentDisplayImage === img ? 'border-[#FFDF73] scale-110 shadow-xs' : 'border-white/40 opacity-70 hover:opacity-100'
                            }`}
                          >
                            <img src={img} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Bottom Title & Price Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 text-white space-y-1 z-10">
                      <div className="flex items-baseline justify-between">
                        <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold">
                          {themeItem.category}
                        </span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-lg font-bold text-[#FFDF73]">
                            {themeItem.price}
                          </span>
                          {themeItem.originalPrice && (
                            <span className="text-[11px] line-through text-stone-400">
                              {themeItem.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>

                      <h3 className="font-display text-xl font-bold tracking-wide leading-tight">
                        {themeItem.name}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                    <div className="space-y-4">
                      <p className="text-xs text-[#5E5245] leading-relaxed line-clamp-2">
                        {themeItem.description}
                      </p>

                      {/* Feature Highlights Checklist */}
                      <div className="pt-3 border-t border-stone-100 space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                          Termasuk dalam Tema Ini:
                        </span>
                        <div className="grid grid-cols-2 gap-2 text-[11px] text-[#4A423B]">
                          {themeItem.features.slice(0, 6).map((feat, idx) => (
                            <div key={idx} className="flex items-center gap-1.5">
                              <CheckCircle className="w-3.5 h-3.5 text-[#996515] shrink-0" />
                              <span className="truncate">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Actions: Live Preview, WhatsApp Order, and Owner Edit */}
                    <div className="pt-4 border-t border-stone-100 space-y-2">
                      <div className="flex items-center gap-2">
                        {/* Live Preview Button */}
                        <button
                          onClick={() => handleOpenPreview(themeItem)}
                          className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#996515] to-[#B8860B] hover:from-[#85530D] hover:to-[#9E7108] text-white font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Live Preview</span>
                          <ExternalLink className="w-3 h-3 text-[#FFDF73]" />
                        </button>

                        {/* Protected Owner Customization Button */}
                        <button
                          onClick={() => handleEditClick(themeItem)}
                          title="Edit Link Preview & Kustomisasi Tema (Khusus Pemilik)"
                          className="p-3 rounded-xl border border-stone-300 hover:border-[#996515] text-stone-700 hover:text-[#996515] bg-[#FAF7F0] transition flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Edit3 className="w-4 h-4" />
                          {!isAdminAuthenticated && <Lock className="w-3 h-3 text-stone-400" />}
                        </button>
                      </div>

                      {/* Direct WhatsApp Order Button */}
                      <button
                        onClick={() => handleOrderViaWhatsApp(themeItem)}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] border border-[#25D366]/30 font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                        <span>Pesan Tema Ini via WhatsApp</span>
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 4. ALL-IN-ONE FEATURES CHECKLIST (Standar Fitur Undangan Digital Lengkap) */}
      <section className="bg-gradient-to-br from-[#2C2926] to-[#1A1816] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto space-y-10">
          
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">
              Standar Fitur Eksklusif
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold">
              Apa Saja yang Didapatkan di Setiap Undangan Digital Dheluwang?
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 max-w-2xl mx-auto">
              Seluruh tema kami telah dilengkapi dengan 12 modul interaktif terlengkap tanpa biaya tersembunyi.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[#996515] flex items-center justify-center text-[#FFDF73]">
                <Users className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-[#D4AF37]">1. Custom Nama Tamu Tanpa Batas</h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Tiap tamu menerima link unik dengan nama personal mereka di cover undangan (contoh: Kepada Yth. Bpk. Joko Widodo).
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[#996515] flex items-center justify-center text-[#FFDF73]">
                <Smartphone className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-[#D4AF37]">2. Cover Interaktif Tirai Buka Undangan</h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Efek pembukaan cover eksklusif yang menyapa nama tamu dan memutar lagu romantis secara otomatis saat ditekan.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[#996515] flex items-center justify-center text-[#FFDF73]">
                <Music className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-[#D4AF37]">3. Background Musik Romantis Bebas Pilih</h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Bisa menggunakan lagu favorit Anda (instrumental piano, pop akustik, rohani/islami) dilengkapi tombol play & pause.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[#996515] flex items-center justify-center text-[#FFDF73]">
                <Clock className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-[#D4AF37]">4. Live Realtime Countdown Timer</h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Hitung mundur waktu nyata (Hari, Jam, Menit, Detik) menuju prosesi akad nikah dan resepsi pernikahan.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[#996515] flex items-center justify-center text-[#FFDF73]">
                <MapPin className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-[#D4AF37]">5. Navigasi Google Maps Presisi</h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Peta lokasi interaktif beserta tombol langsung membuka Google Maps & Waze untuk memandu rute para tamu.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[#996515] flex items-center justify-center text-[#FFDF73]">
                <Calendar className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-[#D4AF37]">6. Simpan ke Google Calendar</h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Tamu dapat menyimpan jadwal acara pernikahan Anda ke kalender ponsel mereka hanya dengan 1 kali klik.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[#996515] flex items-center justify-center text-[#FFDF73]">
                <Heart className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-[#D4AF37]">7. Profil Mempelai & Love Story</h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Foto profil anggun mempelai pria dan wanita, biodata keluarga, sosial media, serta garis waktu kisah cinta.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[#996515] flex items-center justify-center text-[#FFDF73]">
                <ImageIcon className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-[#D4AF37]">8. Galeri Foto HD & Video Sinematik</h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Grid foto prawedding beresolusi tinggi dengan fitur perbesar (lightbox zoom) dan embed video YouTube.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[#996515] flex items-center justify-center text-[#FFDF73]">
                <CreditCard className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-[#D4AF37]">9. Amplop Digital & QRIS Bebas Potongan</h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Rekening BCA, Mandiri, BRI, BNI atau QRIS dengan tombol "Salin Nomor Rekening" otomatis dan alamat kirim kado.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[#996515] flex items-center justify-center text-[#FFDF73]">
                <MessageCircle className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-[#D4AF37]">10. RSVP & Buku Tamu Realtime</h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Form konfirmasi kehadiran tamu (Hadir / Tidak / Ragu) beserta doa restu yang langsung tayang seketika.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[#996515] flex items-center justify-center text-[#FFDF73]">
                <Share2 className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-[#D4AF37]">11. Generator Sebar WhatsApp Otomatis</h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Format teks undangan WhatsApp rapi dan sopan yang siap disalin dan dikirimkan ke kontak tamu satu per satu.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[#996515] flex items-center justify-center text-[#FFDF73]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-[#D4AF37]">12. Garansi Revisi & Masa Aktif Selamanya</h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Bebas revisi data acara hingga hari H dan website undangan tetap dapat diakses sebagai kenang-kenangan manis.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. PRICING PACKAGES (Paket Undangan Digital) */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#996515] font-bold">
            Pilihan Paket Terjangkau
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#2C2926]">
            Paket Harga Undangan Digital
          </h2>
          <p className="text-xs sm:text-sm text-[#615549]">
            Pilih paket yang paling sesuai dengan kebutuhan pernikahan impian Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Paket Silver */}
          <div className="bg-white rounded-3xl border border-stone-200 p-8 space-y-6 flex flex-col justify-between shadow-2xs hover:shadow-md transition">
            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-600 text-xs font-bold uppercase tracking-wider inline-block">
                Paket Silver (Hemat)
              </span>
              <div>
                <span className="text-3xl font-bold text-stone-900">Rp 99.000</span>
                <span className="text-xs text-stone-400 block line-through">Rp 150.000</span>
              </div>
              <p className="text-xs text-stone-600">
                Pilihan tepat untuk intimate wedding atau acara keluarga sederhana.
              </p>
              <ul className="space-y-2.5 text-xs text-stone-700 pt-2 border-t border-stone-100">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Cover Tirai Buka Undangan</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Maksimal 5 Foto Galeri</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Google Maps & Countdown</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> 1 Rekening Amplop Digital</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Masa Aktif 6 Bulan</li>
              </ul>
            </div>

            <button
              onClick={() => {
                const phone = config.whatsappNumber || '6281234567890';
                window.open(`https://wa.me/${phone}?text=${encodeURIComponent(`Halo ${config.brandName}, saya ingin memesan Undangan Digital *Paket Silver* (Rp 99.000).`)}`, '_blank');
              }}
              className="w-full py-3 rounded-xl border border-stone-300 hover:border-[#996515] text-stone-800 hover:text-[#996515] font-bold text-xs uppercase tracking-wider transition cursor-pointer"
            >
              Pilih Paket Silver
            </button>
          </div>

          {/* Paket Gold - BEST SELLER */}
          <div className="bg-[#FAF5EB] rounded-3xl border-2 border-[#996515] p-8 space-y-6 flex flex-col justify-between shadow-xl relative scale-105">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#996515] text-white text-[11px] font-bold uppercase tracking-widest shadow-sm">
              Paling Diminati (Best Seller)
            </div>

            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full bg-[#996515]/20 text-[#996515] text-xs font-bold uppercase tracking-wider inline-block">
                Paket Gold (Lengkap)
              </span>
              <div>
                <span className="text-3xl font-bold text-[#996515]">Rp 149.000</span>
                <span className="text-xs text-stone-400 block line-through">Rp 250.000</span>
              </div>
              <p className="text-xs text-stone-700">
                Fitur lengkap favorit calon pengantin dengan custom nama tamu tak terbatas.
              </p>
              <ul className="space-y-2.5 text-xs text-stone-800 pt-2 border-t border-[#E8DEC9]">
                <li className="flex items-center gap-2 font-semibold"><CheckCircle className="w-4 h-4 text-[#996515] shrink-0" /> <strong>Semua Fitur di Paket Silver</strong></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#996515] shrink-0" /> <strong>Nama Tamu Unlimited</strong> (Generator Link)</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#996515] shrink-0" /> Unlimited Foto Galeri + Video YouTube</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#996515] shrink-0" /> Multi Rekening & QRIS Tanpa Potongan</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#996515] shrink-0" /> Buku Tamu & RSVP Doa Restu Realtime</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#996515] shrink-0" /> Background Musik Bebas Pilih</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#996515] shrink-0" /> <strong>Masa Aktif Selamanya (Lifetime)</strong></li>
              </ul>
            </div>

            <button
              onClick={() => {
                const phone = config.whatsappNumber || '6281234567890';
                window.open(`https://wa.me/${phone}?text=${encodeURIComponent(`Halo ${config.brandName}, saya ingin memesan Undangan Digital *Paket Gold Bestseller* (Rp 149.000).`)}`, '_blank');
              }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#996515] to-[#B8860B] hover:from-[#85530D] hover:to-[#9E7108] text-white font-bold text-xs uppercase tracking-wider shadow-md transition cursor-pointer"
            >
              Pilih Paket Gold (Rekomendasi)
            </button>
          </div>

          {/* Paket Platinum VIP */}
          <div className="bg-white rounded-3xl border border-stone-200 p-8 space-y-6 flex flex-col justify-between shadow-2xs hover:shadow-md transition">
            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full bg-stone-900 text-white text-xs font-bold uppercase tracking-wider inline-block">
                Paket Platinum VIP (Custom)
              </span>
              <div>
                <span className="text-3xl font-bold text-stone-900">Rp 249.000</span>
                <span className="text-xs text-stone-400 block line-through">Rp 399.000</span>
              </div>
              <p className="text-xs text-stone-600">
                Layanan prioritas eksklusif dengan domain khusus (.com / .my.id).
              </p>
              <ul className="space-y-2.5 text-xs text-stone-700 pt-2 border-t border-stone-100">
                <li className="flex items-center gap-2 font-semibold"><CheckCircle className="w-4 h-4 text-stone-900 shrink-0" /> <strong>Semua Fitur di Paket Gold</strong></li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> <strong>Custom Domain Pribadi</strong> (nama-pasangan.com)</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Pengerjaan Super Kilat 12 Jam</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Kustomisasi Warna & Ornamen Khusus</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600 shrink-0" /> Konsultasi Desainer Privat 1-on-1</li>
              </ul>
            </div>

            <button
              onClick={() => {
                const phone = config.whatsappNumber || '6281234567890';
                window.open(`https://wa.me/${phone}?text=${encodeURIComponent(`Halo ${config.brandName}, saya ingin memesan Undangan Digital *Paket Platinum VIP Custom* (Rp 249.000).`)}`, '_blank');
              }}
              className="w-full py-3 rounded-xl bg-stone-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer"
            >
              Pilih Paket Platinum VIP
            </button>
          </div>

        </div>
      </section>

      {/* 6. ALUR PEMESANAN (4 Langkah Cepat) */}
      <section className="bg-white rounded-3xl border border-[#EAE2D2] p-8 sm:p-12 space-y-8 shadow-xs">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#996515] font-bold">
            Praktis & Bebas Ribet
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#2C2926]">
            Cara Pemesanan 4 Langkah Mudah
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            Hanya butuh beberapa menit untuk menyiapkan undangan digital pernikahan Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-3 relative">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF5EB] border border-[#E8DEC9] text-[#996515] font-display text-xl font-bold flex items-center justify-center">
              1
            </div>
            <h4 className="font-bold text-sm text-[#2C2926]">Pilih Desain Tema</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Jelajahi katalog di atas dan klik <strong>Live Preview</strong> untuk mencoba demo interaktifnya secara langsung.
            </p>
          </div>

          <div className="space-y-3 relative">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF5EB] border border-[#E8DEC9] text-[#996515] font-display text-xl font-bold flex items-center justify-center">
              2
            </div>
            <h4 className="font-bold text-sm text-[#2C2926]">Kirim Data & Foto</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Kirimkan nama kedua mempelai, jadwal akad/resepsi, lokasi acara Google Maps, foto prawedding, dan lagu pilihan.
            </p>
          </div>

          <div className="space-y-3 relative">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF5EB] border border-[#E8DEC9] text-[#996515] font-display text-xl font-bold flex items-center justify-center">
              3
            </div>
            <h4 className="font-bold text-sm text-[#2C2926]">Proses Kilat & Revisi</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Tim desainer kami menyiapkan website undangan Anda dalam 1x24 jam. Anda dapat merevisi sampai sesuai harapan.
            </p>
          </div>

          <div className="space-y-3 relative">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF5EB] border border-[#E8DEC9] text-[#996515] font-display text-xl font-bold flex items-center justify-center">
              4
            </div>
            <h4 className="font-bold text-sm text-[#2C2926]">Siap Disebar ke Tamu</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Website undangan Anda aktif dan siap dikirimkan ke ribuan kontak tamu keluarga dan kerabat via WhatsApp!
            </p>
          </div>
        </div>
      </section>

      {/* 7. INTERACTIVE GUEST LINK SIMULATOR (Edukasi Sebar Undangan) */}
      <section className="bg-[#FAF5EB] rounded-3xl border border-[#E8DEC9] p-6 sm:p-10 space-y-6">
        <div className="max-w-3xl mx-auto space-y-3 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E8DEC9] text-[#996515] text-[11px] font-bold uppercase tracking-wider">
            <Share2 className="w-3.5 h-3.5" />
            <span>Simulasi Generator Nama Tamu</span>
          </div>
          <h3 className="font-display text-2xl font-bold text-[#2C2926]">
            Coba Cara Kerja Personalisasi Nama Tamu
          </h3>
          <p className="text-xs sm:text-sm text-stone-600">
            Setiap tamu yang membuka undangan akan melihat nama mereka secara khusus di halaman pembuka. Coba ketikkan nama tamu Anda di bawah:
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-stone-200 p-5 space-y-4 shadow-2xs">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-1">
              Ketik Contoh Nama Tamu Anda:
            </label>
            <input
              type="text"
              value={simGuestName}
              onChange={(e) => setSimGuestName(e.target.value)}
              placeholder="Contoh: Bpk. H. Bambang & Keluarga"
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#996515]"
            />
          </div>

          {/* Generated Link Display */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold text-stone-500 block">
              Tautan Undangan Khusus untuk Tamu Ini:
            </span>
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between gap-2 overflow-hidden">
              <span className="text-xs font-mono text-stone-700 truncate">
                {simulatedUrl}
              </span>
              <button
                onClick={handleCopySimUrl}
                className="px-3 py-1.5 rounded-lg bg-[#996515] hover:bg-[#805310] text-white text-xs font-bold transition flex items-center gap-1 shrink-0 cursor-pointer"
              >
                {copiedSimLink ? <Check className="w-3.5 h-3.5 text-[#FFDF73]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSimLink ? 'Tersalin!' : 'Salin Link'}</span>
              </button>
            </div>
          </div>

          {/* WhatsApp Text Preview */}
          <div className="space-y-1.5 pt-2 border-t border-stone-100">
            <span className="text-[11px] font-semibold text-stone-500 block">
              Contoh Format Pesan WhatsApp yang Siap Dikirim:
            </span>
            <pre className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-[11px] text-stone-600 font-sans whitespace-pre-wrap leading-relaxed max-h-36 overflow-y-auto">
              {simulatedWaInvitation}
            </pre>
            <button
              onClick={handleCopySimWaText}
              className="text-xs text-[#996515] font-bold hover:underline flex items-center gap-1 cursor-pointer pt-1"
            >
              {copiedSimWhatsAppText ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSimWhatsAppText ? 'Format Teks WhatsApp Berhasil Disalin!' : 'Salin Seluruh Teks Pesan WhatsApp'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 8. FAQ SEPUTAR UNDANGAN DIGITAL */}
      <section className="space-y-6 max-w-4xl mx-auto">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#996515] font-bold">
            Pertanyaan Populer
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#2C2926]">
            FAQ Seputar Undangan Digital
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-2">
            <h4 className="font-bold text-sm text-[#2C2926] flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#996515] shrink-0" />
              <span>Berapa lama proses pengerjaannya?</span>
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Setelah Anda mengisi data mempelai dan mengirimkan foto, proses pengerjaan rata-rata selesai dalam 1x24 jam (atau 12 jam pada paket Platinum).
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-2">
            <h4 className="font-bold text-sm text-[#2C2926] flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#996515] shrink-0" />
              <span>Apakah nama tamu bisa diganti-ganti sendiri?</span>
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Bisa! Kami sediakan link generator otomatis sehingga Anda dapat memasukkan ribuan nama tamu yang berbeda secara mandiri kapan saja.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-2">
            <h4 className="font-bold text-sm text-[#2C2926] flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#996515] shrink-0" />
              <span>Apakah amplop digital ada potongan biaya?</span>
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Tidak ada potongan sepeser pun. Uang hadiah dari para tamu dikirim langsung ke rekening bank atau dompet digital (QRIS) milik Anda sendiri.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-2">
            <h4 className="font-bold text-sm text-[#2C2926] flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#996515] shrink-0" />
              <span>Bagaimana jika ada perubahan jadwal atau tempat?</span>
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Anda cukup mengabari kami melalui WhatsApp, tim Dheluwang akan langsung memperbarui data di website undangan Anda secara gratis.
            </p>
          </div>
        </div>
      </section>

      {/* 9. BOTTOM CONSULTATION BANNER */}
      <section className="bg-gradient-to-r from-[#996515] to-[#B8860B] rounded-3xl p-8 sm:p-10 text-white shadow-lg text-center space-y-4">
        <h3 className="font-display text-2xl sm:text-3xl font-bold">
          Ingin Konsultasi Desain atau Custom Khusus?
        </h3>
        <p className="text-xs sm:text-sm text-stone-100 max-w-xl mx-auto">
          Hubungi tim ramah kami via WhatsApp untuk melihat portofolio klien terbaru, panduan data, atau penyesuaian tema impian Anda.
        </p>
        <div className="pt-2">
          <button
            onClick={() => {
              const phone = config.whatsappNumber || '6281234567890';
              window.open(`https://wa.me/${phone}?text=${encodeURIComponent(`Halo ${config.brandName}, saya ingin konsultasi seputar pembuatan Undangan Digital.`)}`, '_blank');
            }}
            className="px-8 py-3.5 rounded-full bg-white text-[#996515] hover:bg-stone-50 font-bold text-xs uppercase tracking-wider shadow-md transition inline-flex items-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>Chat WhatsApp dengan Desainer Kami</span>
          </button>
        </div>
      </section>

      {/* MODAL 1: OWNER THEME CUSTOMIZER & LINK EDITOR (Diisi Sendiri) */}
      <DigitalThemeEditorModal
        isOpen={isEditorModalOpen}
        theme={editingTheme}
        onClose={() => setIsEditorModalOpen(false)}
        onSave={(updated) => {
          onSaveTheme(updated);
          setIsEditorModalOpen(false);
        }}
        onDelete={onDeleteTheme}
      />

      {/* MODAL 2: PHONE MOCKUP LIVE PREVIEW MODAL */}
      <DigitalLivePreviewModal
        isOpen={isPreviewModalOpen}
        theme={previewTheme}
        config={config}
        onClose={() => setIsPreviewModalOpen(false)}
        onOrderViaWhatsApp={handleOrderViaWhatsApp}
      />

    </div>
  );
};
