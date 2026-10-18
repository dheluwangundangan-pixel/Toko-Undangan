import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  ExternalLink, 
  Trash2, 
  Sparkles, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  Tag, 
  Check, 
  Plus, 
  HelpCircle,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { DigitalTheme } from '../types';

interface DigitalThemeEditorModalProps {
  isOpen: boolean;
  theme: DigitalTheme | null;
  onClose: () => void;
  onSave: (updatedTheme: DigitalTheme) => void;
  onDelete?: (themeId: string) => void;
}

const PRESET_MOCKUP_IMAGES = [
  {
    title: 'Adat Jawa Heritage Emas',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Modern Minimalis Sage',
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Warm Rustic Terracotta',
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Midnight Gold Bintang',
    url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Soft Blush Peony Floral',
    url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Islami Kubah Maroko Khidmat',
    url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Botanical Emerald Green',
    url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Classic White & Golden Ribbon',
    url: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80'
  }
];

const CATEGORY_OPTIONS = [
  'Adat & Tradisional',
  'Luxury Gold & Midnight',
  'Minimalis Modern',
  'Floral & Rustic',
  'Islami Elegan',
  'Vintage & Aesthetic',
  'Eksklusif Custom'
];

const DEFAULT_FEATURE_SUGGESTIONS = [
  'Cover Animasi Buka Undangan',
  'Nama Tamu Tanpa Batas (Unlimited)',
  'Live Realtime Countdown Timer',
  'Integrasi Google Maps & Petunjuk Arah',
  'Tombol Simpan Google Calendar',
  'Amplop Digital & QRIS Bank',
  'Pemutar Musik Romantis Autoplay',
  'Buku Tamu & Ucapan Doa Realtime',
  'Galeri Foto Lightbox & Video',
  'Love Story Perjalanan Cinta',
  'Alamat Kirim Hadiah Fisik',
  'Masa Aktif Selamanya'
];

export const DigitalThemeEditorModal: React.FC<DigitalThemeEditorModalProps> = ({
  isOpen,
  theme,
  onClose,
  onSave,
  onDelete
}) => {
  const [formData, setFormData] = useState<DigitalTheme>({
    id: `theme-${Date.now()}`,
    name: '',
    slug: '',
    category: 'Adat & Tradisional',
    styleCategory: 'Adat & Tradisional',
    previewThumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    additionalImages: [],
    previewUrl: '',
    price: 'Rp 149.000',
    originalPrice: 'Rp 250.000',
    accentColor: '#996515',
    badge: 'Best Seller',
    description: '',
    features: [
      'Cover Animasi Buka Undangan',
      'Nama Tamu Tanpa Batas (Unlimited)',
      'Live Realtime Countdown Timer',
      'Integrasi Google Maps & Petunjuk Arah',
      'Amplop Digital & QRIS Bank',
      'Pemutar Musik Romantis Bebas Pilih',
      'Buku Tamu & Ucapan Doa',
      'Masa Aktif Selamanya'
    ]
  });

  const [newFeatureText, setNewFeatureText] = useState('');
  const [newAdditionalImageUrl, setNewAdditionalImageUrl] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showPresetPicker, setShowPresetPicker] = useState(false);

  useEffect(() => {
    if (theme) {
      setFormData({
        ...theme,
        additionalImages: theme.additionalImages || [],
        features: theme.features && theme.features.length > 0 ? theme.features : DEFAULT_FEATURE_SUGGESTIONS.slice(0, 6)
      });
    } else {
      setFormData({
        id: `theme-${Date.now()}`,
        name: '',
        slug: `tema-${Date.now()}`,
        category: 'Adat & Tradisional',
        styleCategory: 'Adat & Tradisional',
        previewThumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
        additionalImages: [],
        previewUrl: '',
        price: 'Rp 149.000',
        originalPrice: 'Rp 250.000',
        accentColor: '#996515',
        badge: 'Tema Baru',
        description: 'Desain website undangan digital anggun beranimasi halus, responsif di semua ponsel.',
        features: [
          'Cover Animasi Buka Undangan',
          'Nama Tamu Tanpa Batas (Unlimited)',
          'Live Realtime Countdown Timer',
          'Integrasi Google Maps & Petunjuk Arah',
          'Amplop Digital & QRIS Bank',
          'Pemutar Musik Romantis Bebas Pilih',
          'Buku Tamu & Ucapan Doa',
          'Masa Aktif Selamanya'
        ]
      });
    }
  }, [theme, isOpen]);

  if (!isOpen) return null;

  const handleFieldChange = (field: keyof DigitalTheme, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      ...(field === 'category' ? { styleCategory: value } : {})
    }));
  };

  const handleAddFeature = () => {
    if (!newFeatureText.trim()) return;
    if (!formData.features.includes(newFeatureText.trim())) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeatureText.trim()]
      }));
    }
    setNewFeatureText('');
  };

  const handleRemoveFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, idx) => idx !== index)
    }));
  };

  const handleAddAdditionalImage = () => {
    if (!newAdditionalImageUrl.trim()) return;
    const current = formData.additionalImages || [];
    setFormData((prev) => ({
      ...prev,
      additionalImages: [...current, newAdditionalImageUrl.trim()]
    }));
    setNewAdditionalImageUrl('');
  };

  const handleRemoveAdditionalImage = (index: number) => {
    const current = formData.additionalImages || [];
    setFormData((prev) => ({
      ...prev,
      additionalImages: current.filter((_, idx) => idx !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Mohon isi nama tema undangan');
      return;
    }

    const payload: DigitalTheme = {
      ...formData,
      slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    };

    onSave(payload);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1200);
  };

  const handleTestLink = () => {
    if (!formData.previewUrl) {
      alert('Mohon masukkan URL preview terlebih dahulu untuk diuji');
      return;
    }
    window.open(formData.previewUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-6">
        
        {/* Modal Header */}
        <div className="px-6 py-5 bg-[#FAF5EB] border-b border-[#E8DEC9] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#996515] text-white flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5 text-[#FFDF73]" />
            </div>
            <div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-[#2C2926]">
                {theme ? 'Kustomisasi Tema Undangan Digital' : 'Tambah Tema Undangan Digital Baru'}
              </h3>
              <p className="text-xs text-[#7A6B5D]">
                Atur link preview, gambar thumbnail tema, harga, dan fitur (diisi sendiri oleh pemilik)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-800 rounded-full hover:bg-stone-200/50 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* SECTION 1: LINK PREVIEW INTEGRASI (DIISI SENDIRI) */}
          <div className="bg-[#FFFDF9] border-2 border-[#996515]/30 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[#996515] flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-[#996515]" />
                <span>Link Preview Undangan Digital (Diisi Sendiri) *</span>
              </label>
              {formData.previewUrl && (
                <button
                  type="button"
                  onClick={handleTestLink}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FAF4E6] text-[#996515] hover:bg-[#F3E8CF] text-xs font-bold transition cursor-pointer border border-[#E8DEC9]"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Uji Coba Tautan</span>
                </button>
              )}
            </div>

            <p className="text-xs text-stone-500">
              Masukkan tautan/URL website undangan digital Anda sendiri (misal link website client, link demo Canva, link Vercel, dsb). Calon pengantin akan diarahkan ke link ini saat menekan tombol "Live Preview".
            </p>

            <div className="flex gap-2">
              <input
                type="url"
                value={formData.previewUrl}
                onChange={(e) => handleFieldChange('previewUrl', e.target.value)}
                placeholder="https://contoh-undangan-kamu.com atau https://dheluwang.com/demo/jawa"
                className="flex-1 px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#996515] text-sm bg-white"
                required
              />
            </div>
          </div>

          {/* SECTION 2: GAMBAR TEMA & MOCKUP */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#996515]" />
                <span>Gambar Utama Tema / Mockup Smartphone *</span>
              </label>
              <button
                type="button"
                onClick={() => setShowPresetPicker(!showPresetPicker)}
                className="text-xs text-[#996515] hover:underline font-semibold"
              >
                {showPresetPicker ? 'Tutup Pilihan Preset' : 'Pilih dari Preset Siap Pakai'}
              </button>
            </div>

            {/* Preset Selector */}
            {showPresetPicker && (
              <div className="p-3 bg-stone-50 border border-stone-200 rounded-2xl space-y-2">
                <p className="text-[11px] text-stone-500">
                  Klik salah satu gambar estetik di bawah untuk langsung menggunakannya sebagai thumbnail:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {PRESET_MOCKUP_IMAGES.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        handleFieldChange('previewThumbnail', preset.url);
                        setShowPresetPicker(false);
                      }}
                      className="group relative rounded-xl overflow-hidden border-2 hover:border-[#996515] transition text-left cursor-pointer"
                    >
                      <img src={preset.url} alt={preset.title} className="w-full h-16 object-cover" />
                      <div className="absolute inset-0 bg-black/40 p-1 flex items-end">
                        <span className="text-[9px] text-white font-medium line-clamp-1">
                          {preset.title}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input URL Gambar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              <div className="sm:col-span-2 space-y-2">
                <input
                  type="url"
                  value={formData.previewThumbnail}
                  onChange={(e) => handleFieldChange('previewThumbnail', e.target.value)}
                  placeholder="https://images.unsplash.com/... atau URL gambar mockup tema"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#996515] text-sm"
                  required
                />
                <p className="text-[11px] text-stone-400">
                  Gunakan URL gambar beresolusi tinggi (disarankan rasio foto tegak/portrait atau mockup ponsel).
                </p>
              </div>

              {/* Preview Box */}
              <div className="h-28 rounded-xl overflow-hidden border border-stone-300 bg-stone-100 flex items-center justify-center relative">
                {formData.previewThumbnail ? (
                  <img
                    src={formData.previewThumbnail}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80';
                    }}
                  />
                ) : (
                  <span className="text-xs text-stone-400">Preview Gambar</span>
                )}
              </div>
            </div>

            {/* Kumpulan Gambar Tambahan (Gallery Previews) */}
            <div className="pt-2 border-t border-stone-100 space-y-2">
              <label className="text-xs font-semibold text-stone-600 block">
                Kumpulan Gambar Halaman Lainnya (Opsional - Galeri Foto Tema):
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={newAdditionalImageUrl}
                  onChange={(e) => setNewAdditionalImageUrl(e.target.value)}
                  placeholder="URL gambar detail (misal: halaman cover, doa, rsvp)"
                  className="flex-1 px-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#996515]"
                />
                <button
                  type="button"
                  onClick={handleAddAdditionalImage}
                  className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-black text-white text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Foto</span>
                </button>
              </div>

              {formData.additionalImages && formData.additionalImages.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {formData.additionalImages.map((img, idx) => (
                    <div key={idx} className="relative group w-14 h-14 rounded-lg overflow-hidden border border-stone-300">
                      <img src={img} alt={`Detail ${idx + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveAdditionalImage(idx)}
                        className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* SECTION 3: INFORMASI UMUM TEMA */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-1">
                Nama Tema Undangan *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleFieldChange('name', e.target.value)}
                placeholder="Contoh: Surya Kencana - Royal Javanese Heritage"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#996515] text-sm"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-1">
                Kategori Gaya *
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleFieldChange('category', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#996515] text-sm bg-white"
              >
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-1">
                Harga Promo (Ditampilkan) *
              </label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) => handleFieldChange('price', e.target.value)}
                placeholder="Contoh: Rp 149.000"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#996515] text-sm"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-1">
                Harga Normal (Coretan)
              </label>
              <input
                type="text"
                value={formData.originalPrice || ''}
                onChange={(e) => handleFieldChange('originalPrice', e.target.value)}
                placeholder="Contoh: Rp 250.000"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#996515] text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-1">
                Badge Khusus (Label Promosi)
              </label>
              <input
                type="text"
                value={formData.badge || ''}
                onChange={(e) => handleFieldChange('badge', e.target.value)}
                placeholder="Contoh: Best Seller, Favorit Pengantin, Promo Terbatas, Adat Jawa"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#996515] text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-1">
                Deskripsi Nuansa Tema
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleFieldChange('description', e.target.value)}
                rows={2}
                placeholder="Jelaskan keanggunan, warna dominan, dan kesesuaian tema ini untuk calon pengantin..."
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#996515] text-sm resize-none"
              />
            </div>
          </div>

          {/* SECTION 4: FITUR-FITUR TEMA */}
          <div className="space-y-3 pt-2 border-t border-stone-200">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#996515]" />
              <span>Fitur yang Termasuk dalam Tema Ini</span>
            </label>

            <div className="flex gap-2">
              <input
                type="text"
                value={newFeatureText}
                onChange={(e) => setNewFeatureText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddFeature();
                  }
                }}
                placeholder="Ketik nama fitur (misal: Cover Tirai Slide, Unlimited Nama Tamu)"
                className="flex-1 px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#996515] text-xs"
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-black text-white text-xs font-bold transition flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah</span>
              </button>
            </div>

            {/* List of current features */}
            <div className="flex flex-wrap gap-2 pt-1">
              {formData.features.map((feat, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF5EB] border border-[#E8DEC9] text-[#996515] text-xs font-medium"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#996515]" />
                  <span>{feat}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(idx)}
                    className="hover:text-red-600 transition ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
            {theme && onDelete && (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm(`Yakin ingin menghapus tema "${formData.name}" dari katalog?`)) {
                    onDelete(formData.id);
                    onClose();
                  }
                }}
                className="px-4 py-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Hapus Tema</span>
              </button>
            )}

            <div className="flex items-center gap-3 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-stone-300 text-stone-600 hover:bg-stone-100 text-xs font-bold transition cursor-pointer"
              >
                Batal
              </button>

              <button
                type="submit"
                className="px-7 py-2.5 rounded-xl bg-[#996515] hover:bg-[#805310] text-white text-xs font-bold uppercase tracking-wider shadow-md transition flex items-center gap-2 cursor-pointer"
              >
                {saveSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-[#FFDF73]" />
                    <span>Tersimpan!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Simpan Perubahan</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
