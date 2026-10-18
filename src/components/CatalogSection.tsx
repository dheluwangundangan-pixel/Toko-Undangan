import React, { useState } from 'react';
import { 
  Plus, 
  Edit3, 
  ZoomIn, 
  Sparkles, 
  Layers, 
  Tag, 
  Check, 
  X, 
  ArrowRight,
  Shield,
  FileText
} from 'lucide-react';
import { CatalogItem } from '../types';

interface CatalogSectionProps {
  catalogs: CatalogItem[];
  onSelectCatalogForOrder: (catalog: CatalogItem) => void;
  onSaveCatalog: (catalog: CatalogItem) => Promise<void>;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  catalogs,
  onSelectCatalogForOrder,
  onSaveCatalog
}) => {
  const [selectedThemeFilter, setSelectedThemeFilter] = useState<string>('Semua');
  const [zoomItem, setZoomItem] = useState<CatalogItem | null>(null);
  const [editItem, setEditItem] = useState<CatalogItem | null>(null);
  const [isNewItemModal, setIsNewItemModal] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Form edit/create state
  const [formState, setFormState] = useState<Partial<CatalogItem>>({
    title: '',
    theme: 'Classic Royal Luxury',
    paper: '',
    lamination: 'Doff Matte Halus',
    hotprint: 'Gold Foil 24K',
    emboss: 'Deboss 3D Ornamen Timbul',
    priceRange: 'Rp 12.000 - Rp 16.000 / pcs',
    minOrder: '150 pcs',
    imageUrl: '',
    description: '',
    badge: ''
  });

  const themes = ['Semua', ...Array.from(new Set(catalogs.map((c) => c.theme)))];

  const filteredCatalogs = selectedThemeFilter === 'Semua'
    ? catalogs
    : catalogs.filter((c) => c.theme === selectedThemeFilter);

  const openCreateModal = () => {
    setFormState({
      id: `dheluwang-${Date.now()}`,
      title: '',
      theme: 'Classic Royal Luxury',
      paper: 'Cotton Paper 500 gsm Import',
      lamination: 'Soft Touch Velvet Doff',
      hotprint: 'Gold Foil Champagne 24K',
      emboss: 'Deboss 3D Frame Monogram',
      priceRange: 'Rp 12.500 - Rp 17.000 / pcs',
      minOrder: '150 pcs',
      imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1000&q=80',
      description: 'Desain undangan fisik mewah dengan sentuhan artisan eksklusif.',
      badge: 'Desain Baru'
    });
    setIsNewItemModal(true);
    setEditItem(null);
  };

  const openEditModal = (item: CatalogItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setFormState({ ...item });
    setEditItem(item);
    setIsNewItemModal(false);
  };

  const handleSaveForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title || !formState.imageUrl) return;

    setIsSaving(true);
    try {
      const itemToSave: CatalogItem = {
        id: formState.id || `dheluwang-${Date.now()}`,
        title: formState.title!,
        theme: formState.theme || 'Custom Theme',
        paper: formState.paper || 'Textured Linen',
        lamination: formState.lamination || 'Doff Matte',
        hotprint: formState.hotprint || 'Gold Foil 24K',
        emboss: formState.emboss || 'Deboss 3D',
        priceRange: formState.priceRange || 'Rp 12.000 - Rp 15.000 / pcs',
        minOrder: formState.minOrder || '150 pcs',
        imageUrl: formState.imageUrl!,
        description: formState.description || 'Desain undangan fisik elegan Dheluwang.',
        badge: formState.badge || ''
      };

      await onSaveCatalog(itemToSave);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        setIsNewItemModal(false);
        setEditItem(null);
      }, 1200);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Catalog Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#EBE4D5]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5EEDF] text-[#996515] text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Spesifikasi Fisik & Finishing Lengkap</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C2926]">
            Katalog Undangan Dheluwang
          </h2>
          <p className="text-sm sm:text-base text-[#615549] mt-2 max-w-2xl">
            Pilih seri desain yang selaras dengan karakter hari pernikahan Anda. Klik foto untuk melihat zoom detail atau tombol pesan untuk langsung mengisi formulir data.
          </p>
        </div>

        {/* Action: Tambah Desain Baru */}
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#996515] hover:bg-[#805310] text-white text-xs font-semibold tracking-wide transition shadow-sm cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah / Buat Desain Baru</span>
        </button>
      </div>

      {/* Theme Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8">
        {themes.map((theme) => (
          <button
            key={theme}
            onClick={() => setSelectedThemeFilter(theme)}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all shrink-0 cursor-pointer ${
              selectedThemeFilter === theme
                ? 'bg-[#2C2926] text-[#F3E5AB] font-semibold shadow-xs'
                : 'bg-white border border-[#E0D5C1] text-[#554A3E] hover:bg-[#F9F5EE]'
            }`}
          >
            {theme}
          </button>
        ))}
      </div>

      {/* Catalog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCatalogs.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl overflow-hidden border border-[#E8DEC9] shadow-xs hover:shadow-xl hover:border-[#D4AF37] transition-all duration-300 flex flex-col group"
          >
            {/* Image Preview with Zoom trigger */}
            <div
              className="relative aspect-4/3 overflow-hidden bg-stone-100 cursor-pointer"
              onClick={() => setZoomItem(item)}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {item.badge && (
                <span className="absolute top-4 left-4 bg-[#996515] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                  {item.badge}
                </span>
              )}

              {/* Quick Zoom Pill */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  onClick={(e) => openEditModal(item, e)}
                  title="Edit Spesifikasi Desain Ini"
                  className="p-2 bg-white/90 hover:bg-white text-stone-700 hover:text-[#996515] rounded-full shadow-md backdrop-blur-xs transition cursor-pointer"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <div className="p-2 bg-white/90 text-stone-700 rounded-full shadow-md backdrop-blur-xs">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 text-white">
                <span className="text-[11px] text-[#F3E5AB] font-semibold tracking-wider uppercase block">
                  {item.theme}
                </span>
                <h3 className="font-display text-xl font-bold text-white">
                  {item.title}
                </h3>
              </div>
            </div>

            {/* Complete Specifications Grid */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
              
              <p className="text-xs text-[#5E5144] leading-relaxed line-clamp-2">
                {item.description}
              </p>

              {/* Spec Badges List */}
              <div className="space-y-2 text-xs border-t border-[#F1E8DA] pt-4">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[#807264] font-medium shrink-0">Bahan Kertas:</span>
                  <span className="text-[#2C2926] font-semibold text-right">{item.paper}</span>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[#807264] font-medium shrink-0">Laminasi:</span>
                  <span className="text-[#2C2926] font-semibold text-right">{item.lamination}</span>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[#807264] font-medium shrink-0">Hotprint Foil:</span>
                  <span className="text-[#996515] font-semibold text-right">{item.hotprint}</span>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[#807264] font-medium shrink-0">Embos/Debos:</span>
                  <span className="text-[#2C2926] font-semibold text-right">{item.emboss}</span>
                </div>
              </div>

              {/* Price & Action Row */}
              <div className="border-t border-[#F1E8DA] pt-4">
                <div className="flex items-baseline justify-between mb-3">
                  <div>
                    <span className="text-[11px] text-[#7A6B5D] block">Estimasi Harga:</span>
                    <span className="font-display text-lg font-bold text-[#996515]">
                      {item.priceRange}
                    </span>
                  </div>
                  <span className="text-[11px] bg-[#FAF5EC] border border-[#E9DFCF] text-[#635548] px-2.5 py-1 rounded-full font-medium">
                    Min. {item.minOrder}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setZoomItem(item)}
                    className="py-2.5 px-3 rounded-xl border border-[#D5C9B3] text-[#4A4138] hover:bg-[#F9F6F0] text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>Zoom Gambar</span>
                  </button>

                  <button
                    onClick={() => onSelectCatalogForOrder(item)}
                    className="py-2.5 px-3 rounded-xl bg-[#996515] hover:bg-[#805310] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition cursor-pointer"
                  >
                    <span>Pilih Desain Ini</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* POP UP ZOOM MODAL DETAIL */}
      {zoomItem && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative flex flex-col md:flex-row max-h-[90vh]">
            
            <button
              onClick={() => setZoomItem(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 hover:bg-black text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Big Zoom Image */}
            <div className="md:w-3/5 bg-stone-900 flex items-center justify-center overflow-hidden">
              <img
                src={zoomItem.imageUrl}
                alt={zoomItem.title}
                className="w-full h-full max-h-[60vh] md:max-h-[85vh] object-contain"
              />
            </div>

            {/* Right Detailed Specs View */}
            <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-4">
                <div className="inline-block px-3 py-1 rounded-full bg-[#FAF3E4] text-[#996515] text-xs font-bold uppercase tracking-wider">
                  {zoomItem.theme}
                </div>
                <h3 className="font-display text-2xl font-bold text-[#2C2926]">
                  {zoomItem.title}
                </h3>
                <p className="text-xs text-[#5C5043] leading-relaxed">
                  {zoomItem.description}
                </p>

                <div className="bg-[#FBF9F5] p-4 rounded-2xl border border-[#ECE2D2] space-y-2 text-xs">
                  <h4 className="font-bold text-[#2C2926] text-xs uppercase tracking-wider mb-2">
                    Spesifikasi Lengkap:
                  </h4>
                  <div className="space-y-1.5">
                    <p><strong className="text-stone-600">Bahan:</strong> {zoomItem.paper}</p>
                    <p><strong className="text-stone-600">Laminasi:</strong> {zoomItem.lamination}</p>
                    <p><strong className="text-stone-600">Hotprint:</strong> {zoomItem.hotprint}</p>
                    <p><strong className="text-stone-600">Embos/Debos:</strong> {zoomItem.emboss}</p>
                    <p><strong className="text-stone-600">Min. Order:</strong> {zoomItem.minOrder}</p>
                    <p><strong className="text-stone-600">Estimasi Harga:</strong> <span className="text-[#996515] font-bold">{zoomItem.priceRange}</span></p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#EAE2D2] mt-6">
                <button
                  onClick={() => {
                    const target = zoomItem;
                    setZoomItem(null);
                    onSelectCatalogForOrder(target);
                  }}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#996515] hover:bg-[#805310] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
                >
                  <span>Pilih Desain Ini & Isi Data Form</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* MODAL: TAMBAH / EDIT DESAIN KATALOG */}
      {(isNewItemModal || editItem) && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FDFCF7] border border-[#D5C9B3] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <button
              onClick={() => {
                setIsNewItemModal(false);
                setEditItem(null);
              }}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-1 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-[#996515]" />
              <h3 className="font-display text-2xl font-bold text-[#2C2926]">
                {editItem ? 'Edit Spesifikasi Desain' : 'Tambah Desain Baru ke Katalog'}
              </h3>
            </div>
            <p className="text-xs text-[#706456] mb-6">
              Kustomisasi tema, bahan, foil, emboss, dan harga per pcs sesuka Anda. Data tersimpan langsung.
            </p>

            {saveSuccess ? (
              <div className="py-8 text-center text-[#2E7D32] space-y-2">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-700">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-base">Perubahan Berhasil Disimpan!</h4>
                <p className="text-xs text-stone-600">Katalog telah diperbarui.</p>
              </div>
            ) : (
              <form onSubmit={handleSaveForm} className="space-y-4 text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-[#2C2926] mb-1">
                      Judul Desain <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.title}
                      onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                      placeholder="Contoh: Royal Astakona Gold"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C9B3] bg-white text-[#2C2926]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#2C2926] mb-1">
                      Tema Desain <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.theme}
                      onChange={(e) => setFormState({ ...formState, theme: e.target.value })}
                      placeholder="Classic Royal / Minimalist / Botanical"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C9B3] bg-white text-[#2C2926]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-[#2C2926] mb-1">
                      Spesifikasi Bahan Kertas <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.paper}
                      onChange={(e) => setFormState({ ...formState, paper: e.target.value })}
                      placeholder="Cotton 600gsm / Linen / Board 3mm"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C9B3] bg-white text-[#2C2926]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#2C2926] mb-1">
                      Laminasi
                    </label>
                    <input
                      type="text"
                      value={formState.lamination}
                      onChange={(e) => setFormState({ ...formState, lamination: e.target.value })}
                      placeholder="Soft Touch Velvet / Doff Halus"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C9B3] bg-white text-[#2C2926]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-[#2C2926] mb-1">
                      Hotprint / Foil
                    </label>
                    <input
                      type="text"
                      value={formState.hotprint}
                      onChange={(e) => setFormState({ ...formState, hotprint: e.target.value })}
                      placeholder="Gold Foil Champagne 24K / Rose Gold"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C9B3] bg-white text-[#2C2926]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#2C2926] mb-1">
                      Embos / Debos
                    </label>
                    <input
                      type="text"
                      value={formState.emboss}
                      onChange={(e) => setFormState({ ...formState, emboss: e.target.value })}
                      placeholder="Deboss 3D Frame Monogram"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C9B3] bg-white text-[#2C2926]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-[#2C2926] mb-1">
                      Rentang Harga / pcs <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.priceRange}
                      onChange={(e) => setFormState({ ...formState, priceRange: e.target.value })}
                      placeholder="Rp 12.000 - Rp 16.000 / pcs"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C9B3] bg-white text-[#2C2926]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#2C2926] mb-1">
                      Minimal Order
                    </label>
                    <input
                      type="text"
                      value={formState.minOrder}
                      onChange={(e) => setFormState({ ...formState, minOrder: e.target.value })}
                      placeholder="150 pcs"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C9B3] bg-white text-[#2C2926]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#2C2926] mb-1">
                    URL Foto Resolusi Tinggi <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    required
                    value={formState.imageUrl}
                    onChange={(e) => setFormState({ ...formState, imageUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C9B3] bg-white text-[#2C2926]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#2C2926] mb-1">
                    Deskripsi & Keistimewaan Desain
                  </label>
                  <textarea
                    rows={2}
                    value={formState.description}
                    onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                    placeholder="Tuliskan daya tarik khusus atau filosofi desain ini..."
                    className="w-full px-3.5 py-2 rounded-xl border border-[#D5C9B3] bg-white text-[#2C2926]"
                  />
                </div>

                <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#EAE2D2]">
                  <button
                    type="button"
                    onClick={() => {
                      setIsNewItemModal(false);
                      setEditItem(null);
                    }}
                    className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-600 font-semibold cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-6 py-2.5 rounded-xl bg-[#996515] hover:bg-[#805310] text-white font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    {isSaving ? 'Menyimpan...' : 'Simpan Desain'}
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
