import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Play, 
  Pause, 
  X, 
  Plus, 
  Maximize2, 
  Sparkles,
  Camera,
  Check
} from 'lucide-react';
import { GalleryItem } from '../types';

interface GallerySectionProps {
  items: GalleryItem[];
  onAddGalleryItem: (item: Omit<GalleryItem, 'id'>) => Promise<void>;
  isAdminAuthenticated: boolean;
  onRequestAdminAuth: (action: () => void) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ 
  items, 
  onAddGalleryItem,
  isAdminAuthenticated,
  onRequestAdminAuth
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isAutoSlide, setIsAutoSlide] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  // Form state for adding new photo
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Detail Finishing');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);

  // Categories extraction
  const categories = ['Semua', ...Array.from(new Set(items.map((i) => i.category)))];

  const filteredItems = selectedCategory === 'Semua'
    ? items
    : items.filter((i) => i.category === selectedCategory);

  // Auto-slide effect when lightbox is open and auto slide is active
  useEffect(() => {
    let interval: any;
    if (lightboxIndex !== null && isAutoSlide) {
      interval = setInterval(() => {
        setLightboxIndex((prev) => {
          if (prev === null) return 0;
          return (prev + 1) % filteredItems.length;
        });
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [lightboxIndex, isAutoSlide, filteredItems.length]);

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length);
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! + 1) % filteredItems.length);
  };

  const handleDownload = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${filename.replace(/\s+/g, '_').toLowerCase()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      // Fallback: open image in new tab if cross-origin download fails
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.download = filename;
      link.click();
    }
  };

  const handleCreatePhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newImageUrl.trim()) return;

    setIsSubmitting(true);
    try {
      await onAddGalleryItem({
        title: newTitle.trim(),
        category: newCategory,
        imageUrl: newImageUrl.trim(),
        caption: newCaption.trim() || 'Dokumentasi detail fisik undangan pernikahan Dheluwang'
      });
      setAddSuccess(true);
      setTimeout(() => {
        setAddSuccess(false);
        setIsAddModalOpen(false);
        setNewTitle('');
        setNewImageUrl('');
        setNewCaption('');
      }, 1200);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header & Subtitle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#EBE4D5]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5EEDF] text-[#996515] text-xs font-semibold mb-2">
            <Camera className="w-3.5 h-3.5" />
            <span>Dokumentasi Koleksi Fisik Nyata</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C2926]">
            Galeri Mahakarya Dheluwang
          </h2>
          <p className="text-sm sm:text-base text-[#615549] mt-2 max-w-2xl">
            Saksikan keanggunan tekstur kertas, pantulan hotprint emas, dan detail presisi setiap set undangan yang telah kami wujudkan untuk para pengantin.
          </p>
        </div>

        {/* Action: Tambah Foto Baru */}
        <button
          onClick={() => {
            if (!isAdminAuthenticated) {
              onRequestAdminAuth(() => setIsAddModalOpen(true));
              return;
            }
            setIsAddModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2C2926] text-[#E8DCC4] hover:text-white hover:bg-black text-xs font-semibold tracking-wide transition shadow-xs cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 text-[#D4AF37]" />
          <span>Tambah Foto Baru</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all shrink-0 cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#996515] text-white shadow-xs font-semibold'
                : 'bg-white border border-[#E0D5C1] text-[#554A3E] hover:bg-[#F9F5EE]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid Showcase */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredItems.map((item, idx) => (
          <div
            key={item.id}
            className="group relative bg-white rounded-2xl overflow-hidden border border-[#EAE2D2] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            {/* Image Container with Hover Overlay */}
            <div
              className="relative aspect-4/5 overflow-hidden bg-stone-100 cursor-pointer"
              onClick={() => {
                setLightboxIndex(idx);
                setIsAutoSlide(false);
              }}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                loading="lazy"
              />

              {/* Tag Category */}
              <span className="absolute top-3 left-3 bg-[#2C2926]/80 backdrop-blur-xs text-[#F3E5AB] text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                {item.category}
              </span>

              {/* Overlay with Magnify Icon */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <span className="p-3 bg-white/90 rounded-full text-[#2C2926] shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <Maximize2 className="w-5 h-5" />
                </span>
              </div>
            </div>

            {/* Photo Info Caption */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-display text-base font-bold text-[#2C2926] group-hover:text-[#996515] transition-colors line-clamp-1">
                  {item.title}
                </h4>
                <p className="text-xs text-[#6A5D50] mt-1 line-clamp-2">
                  {item.caption}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F1E9DB] flex items-center justify-between">
                <button
                  onClick={() => {
                    setLightboxIndex(idx);
                    setIsAutoSlide(false);
                  }}
                  className="text-xs font-semibold text-[#996515] hover:underline cursor-pointer"
                >
                  Buka Slide Foto →
                </button>
                <button
                  onClick={() => handleDownload(item.imageUrl, item.title)}
                  title="Download Foto Inspirasi"
                  className="p-1.5 text-[#887867] hover:text-[#2C2926] hover:bg-[#F4EDE0] rounded-lg transition cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* POP UP LIGHTBOX MODAL WITH SLIDE KANAN KIRI, AUTO SLIDE, & DOWNLOAD */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200">
          
          {/* Top Bar of Lightbox */}
          <div className="flex items-center justify-between text-white max-w-6xl mx-auto w-full z-10">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold bg-[#D4AF37]/30 text-[#F3E5AB] px-3 py-1 rounded-full border border-[#D4AF37]/40">
                {lightboxIndex + 1} / {filteredItems.length}
              </span>
              <span className="hidden sm:inline text-xs text-stone-300">
                {filteredItems[lightboxIndex].category}
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {/* Auto Slide Toggle */}
              <button
                onClick={() => setIsAutoSlide(!isAutoSlide)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition cursor-pointer ${
                  isAutoSlide
                    ? 'bg-[#D4AF37] text-stone-900 font-bold'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
                title={isAutoSlide ? 'Pause Auto Slide' : 'Mulai Auto Slide'}
              >
                {isAutoSlide ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>Auto Slide: ON</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Auto Slide</span>
                  </>
                )}
              </button>

              {/* Download Button */}
              <button
                onClick={() => handleDownload(filteredItems[lightboxIndex].imageUrl, filteredItems[lightboxIndex].title)}
                className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
                title="Download Foto Resolusi Penuh"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Download</span>
              </button>

              {/* Close Button */}
              <button
                onClick={() => {
                  setLightboxIndex(null);
                  setIsAutoSlide(false);
                }}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer ml-2"
                title="Tutup (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Visual Slide Area with Prev & Next Navigation */}
          <div className="relative flex-1 flex items-center justify-center my-2 max-w-6xl mx-auto w-full overflow-hidden">
            
            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 z-20 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-[#D4AF37] text-white hover:text-black transition-all cursor-pointer shadow-lg backdrop-blur-xs"
              aria-label="Foto Sebelumnya"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Displayed Image */}
            <div className="max-h-[72vh] max-w-full flex items-center justify-center p-2">
              <img
                src={filteredItems[lightboxIndex].imageUrl}
                alt={filteredItems[lightboxIndex].title}
                className="max-h-[70vh] max-w-full object-contain rounded-xl shadow-2xl transition-all duration-300"
              />
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 z-20 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-[#D4AF37] text-white hover:text-black transition-all cursor-pointer shadow-lg backdrop-blur-xs"
              aria-label="Foto Selanjutnya"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          </div>

          {/* Bottom Caption Bar */}
          <div className="max-w-2xl mx-auto w-full text-center text-white bg-black/50 backdrop-blur-xs py-3 px-6 rounded-2xl border border-white/10">
            <h3 className="font-display text-lg sm:text-xl font-bold text-[#F3E5AB]">
              {filteredItems[lightboxIndex].title}
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 mt-1">
              {filteredItems[lightboxIndex].caption}
            </p>
          </div>

        </div>
      )}

      {/* MODAL: TAMBAH FOTO BARU KE GALERI */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FDFCF7] border border-[#D5C9B3] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-1 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-[#996515]" />
              <h3 className="font-display text-2xl font-bold text-[#2C2926]">
                Tambah Foto Galeri
              </h3>
            </div>
            <p className="text-xs text-[#706456] mb-6">
              Tambahkan foto dokumentasi fisik undangan baru untuk memperkaya koleksi portofolio Dheluwang.
            </p>

            {addSuccess ? (
              <div className="py-8 text-center text-[#2E7D32] space-y-2">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-700">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-base">Foto Berhasil Ditambahkan!</h4>
                <p className="text-xs text-stone-600">Foto kini tampil di galeri.</p>
              </div>
            ) : (
              <form onSubmit={handleCreatePhoto} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-[#2C2926] mb-1">
                    Judul Foto <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Contoh: Hardcover Foil Champagne 24K"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C9B3] bg-white text-[#2C2926] focus:outline-hidden focus:border-[#996515]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#2C2926] mb-1">
                    Kategori <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C9B3] bg-white text-[#2C2926] focus:outline-hidden focus:border-[#996515]"
                  >
                    <option value="Detail Finishing">Detail Finishing (Foil / Emboss)</option>
                    <option value="Full Suite">Full Suite (Set Lengkap)</option>
                    <option value="Bahan Artisan">Bahan Artisan & Kertas Katun</option>
                    <option value="Amplop & Sleeve">Amplop, Vellum & Sleeve</option>
                    <option value="Heritage Nusantara">Heritage Nusantara & Adat</option>
                    <option value="Kartu Pelengkap">Kartu Pelengkap & Souvenir</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#2C2926] mb-1">
                    URL Foto (Direct Image Link) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    required
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C9B3] bg-white text-[#2C2926] focus:outline-hidden focus:border-[#996515]"
                  />
                  <p className="text-[10px] text-stone-500 mt-1">
                    Bisa gunakan link gambar dari Unsplash atau link hosting publik gambar Anda.
                  </p>
                </div>

                <div>
                  <label className="block font-semibold text-[#2C2926] mb-1">
                    Keterangan Singkat / Caption
                  </label>
                  <textarea
                    rows={2}
                    value={newCaption}
                    onChange={(e) => setNewCaption(e.target.value)}
                    placeholder="Jelaskan jenis kertas, teknik cetak, atau keunikan desain..."
                    className="w-full px-3.5 py-2 rounded-xl border border-[#D5C9B3] bg-white text-[#2C2926] focus:outline-hidden focus:border-[#996515]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-600 font-semibold cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2.5 rounded-xl bg-[#996515] hover:bg-[#805310] text-white font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    {isSubmitting ? 'Menyimpan...' : 'Simpan Foto'}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
