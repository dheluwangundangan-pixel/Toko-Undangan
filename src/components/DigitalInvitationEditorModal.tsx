import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  RotateCcw, 
  Check, 
  Eye, 
  Sparkles, 
  Calendar, 
  CreditCard, 
  Image as ImageIcon,
  User,
  Plus,
  Trash2,
  Layers,
  Lock
} from 'lucide-react';
import { DigitalInvitationData, DigitalTheme } from '../types';
import { defaultDigitalInvitationsByTheme } from '../data/defaultData';

interface DigitalInvitationEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  themes: DigitalTheme[];
  selectedTheme: DigitalTheme;
  onSelectThemeToEdit: (theme: DigitalTheme) => void;
  data: DigitalInvitationData;
  onSaveData: (updated: DigitalInvitationData) => void;
  onOpenPreview: () => void;
}

export const DigitalInvitationEditorModal: React.FC<DigitalInvitationEditorModalProps> = ({
  isOpen,
  onClose,
  themes,
  selectedTheme,
  onSelectThemeToEdit,
  data,
  onSaveData,
  onOpenPreview
}) => {
  const [formData, setFormData] = useState<DigitalInvitationData>({ ...data });
  const [activeTab, setActiveTab] = useState<'mempelai' | 'acara' | 'cerita_galeri' | 'kado_musik'>('mempelai');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync state whenever data changes (e.g. when owner switches theme)
  useEffect(() => {
    setFormData({ ...data });
  }, [data.id, data.themeId]);

  if (!isOpen) return null;

  const handleChange = (field: keyof DigitalInvitationData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBankChange = (index: number, field: 'bankName' | 'accountNumber' | 'holderName', value: string) => {
    const updated = [...formData.bankAccounts];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, bankAccounts: updated }));
  };

  const handleAddBank = () => {
    const newBank = {
      id: `bank-${Date.now()}`,
      bankName: 'Bank BCA',
      accountNumber: '1234567890',
      holderName: `${formData.groomNickname} / ${formData.brideNickname}`
    };
    setFormData((prev) => ({ ...prev, bankAccounts: [...prev.bankAccounts, newBank] }));
  };

  const handleRemoveBank = (index: number) => {
    const updated = formData.bankAccounts.filter((_, idx) => idx !== index);
    setFormData((prev) => ({ ...prev, bankAccounts: updated }));
  };

  const handleGalleryChange = (index: number, val: string) => {
    const updated = [...formData.galleryPhotos];
    updated[index] = val;
    setFormData((prev) => ({ ...prev, galleryPhotos: updated }));
  };

  const handleAddGalleryPhoto = () => {
    setFormData((prev) => ({
      ...prev,
      galleryPhotos: [
        ...prev.galleryPhotos,
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80'
      ]
    }));
  };

  const handleRemoveGalleryPhoto = (index: number) => {
    const updated = formData.galleryPhotos.filter((_, idx) => idx !== index);
    setFormData((prev) => ({ ...prev, galleryPhotos: updated }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveData(formData);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 2000);
  };

  const handleResetToDefault = () => {
    if (window.confirm(`Kembalikan data tema "${selectedTheme.name}" ke pengaturan contoh bawaan?`)) {
      const defaultDataForTheme = defaultDigitalInvitationsByTheme[selectedTheme.id] || data;
      setFormData({ ...defaultDataForTheme });
      onSaveData({ ...defaultDataForTheme });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#FDFCF7] border border-[#D5C9B3] rounded-3xl max-w-3xl w-full h-[90vh] flex flex-col shadow-2xl overflow-hidden relative">
        
        {/* Top Header */}
        <div className="p-5 sm:p-6 border-b border-[#EBE4D5] flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FAF4E6] text-[#996515] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#2C2926]">
                  Editor Undangan Digital
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>Akses Terverifikasi</span>
                </span>
              </div>
              <p className="text-xs text-[#7A6E63] mt-0.5">
                Kustomisasi teks pengantin, jadwal, peta, kado, dan galeri untuk tema <strong className="text-[#996515]">{selectedTheme.name}</strong>.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenPreview}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-[#996515] border border-amber-200 text-xs font-bold transition cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview Live</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-800 rounded-full hover:bg-stone-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Theme Switcher Bar */}
        <div className="bg-[#FAF7F0] px-5 py-2.5 border-b border-[#EBE4D5] flex items-center justify-between gap-3 overflow-x-auto scrollbar-none shrink-0">
          <span className="text-[11px] font-bold text-stone-600 shrink-0 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-[#996515]" />
            <span>Pilih Tema Diedit:</span>
          </span>
          <div className="flex items-center gap-1.5 shrink-0">
            {themes.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => onSelectThemeToEdit(t)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  selectedTheme.id === t.id
                    ? 'bg-[#996515] text-white shadow-xs font-bold'
                    : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: t.accentColor }}></span>
                <span>{t.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#EBE4D5] bg-white px-4 sm:px-6 gap-2 shrink-0 overflow-x-auto scrollbar-none text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('mempelai')}
            className={`py-3 px-3.5 border-b-2 transition flex items-center gap-1.5 cursor-pointer shrink-0 ${
              activeTab === 'mempelai'
                ? 'border-[#996515] text-[#996515]'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profil Mempelai</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('acara')}
            className={`py-3 px-3.5 border-b-2 transition flex items-center gap-1.5 cursor-pointer shrink-0 ${
              activeTab === 'acara'
                ? 'border-[#996515] text-[#996515]'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Akad, Resepsi & Maps</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('cerita_galeri')}
            className={`py-3 px-3.5 border-b-2 transition flex items-center gap-1.5 cursor-pointer shrink-0 ${
              activeTab === 'cerita_galeri'
                ? 'border-[#996515] text-[#996515]'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Galeri & Love Story</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('kado_musik')}
            className={`py-3 px-3.5 border-b-2 transition flex items-center gap-1.5 cursor-pointer shrink-0 ${
              activeTab === 'kado_musik'
                ? 'border-[#996515] text-[#996515]'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Amplop Kado & Musik</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          
          {/* TAB 1: PROFIL MEMPELAI */}
          {activeTab === 'mempelai' && (
            <div className="space-y-5 text-xs text-[#2C2926]">
              {/* Couple Nicknames */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-4 rounded-2xl border border-[#E8DEC9]">
                <div>
                  <label className="block font-bold mb-1">Nama Panggilan Pria</label>
                  <input
                    type="text"
                    required
                    value={formData.groomNickname}
                    onChange={(e) => handleChange('groomNickname', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:border-[#996515] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Nama Panggilan Wanita</label>
                  <input
                    type="text"
                    required
                    value={formData.brideNickname}
                    onChange={(e) => handleChange('brideNickname', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:border-[#996515] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Groom Full Data */}
              <div className="bg-white p-4 rounded-2xl border border-[#E8DEC9] space-y-3">
                <span className="font-bold text-sm text-[#996515] block">Data Mempelai Pria</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold mb-1">Nama Lengkap & Gelar</label>
                    <input
                      type="text"
                      required
                      value={formData.groomFullName}
                      onChange={(e) => handleChange('groomFullName', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Instagram (@username)</label>
                    <input
                      type="text"
                      value={formData.groomInstagram || ''}
                      onChange={(e) => handleChange('groomInstagram', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Keterangan Orang Tua (Putra dari)</label>
                  <input
                    type="text"
                    value={formData.groomParents}
                    onChange={(e) => handleChange('groomParents', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Foto Mempelai Pria (URL)</label>
                  <input
                    type="text"
                    value={formData.groomPhoto}
                    onChange={(e) => handleChange('groomPhoto', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs"
                  />
                </div>
              </div>

              {/* Bride Full Data */}
              <div className="bg-white p-4 rounded-2xl border border-[#E8DEC9] space-y-3">
                <span className="font-bold text-sm text-[#996515] block">Data Mempelai Wanita</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold mb-1">Nama Lengkap & Gelar</label>
                    <input
                      type="text"
                      required
                      value={formData.brideFullName}
                      onChange={(e) => handleChange('brideFullName', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Instagram (@username)</label>
                    <input
                      type="text"
                      value={formData.brideInstagram || ''}
                      onChange={(e) => handleChange('brideInstagram', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Keterangan Orang Tua (Putri dari)</label>
                  <input
                    type="text"
                    value={formData.brideParents}
                    onChange={(e) => handleChange('brideParents', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Foto Mempelai Wanita (URL)</label>
                  <input
                    type="text"
                    value={formData.bridePhoto}
                    onChange={(e) => handleChange('bridePhoto', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs"
                  />
                </div>
              </div>

              {/* Cover Image & Quotes */}
              <div className="bg-white p-4 rounded-2xl border border-[#E8DEC9] space-y-3">
                <div>
                  <label className="block font-bold mb-1">Foto Utama Cover & Hero (URL)</label>
                  <input
                    type="text"
                    value={formData.coverImage}
                    onChange={(e) => handleChange('coverImage', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Kutipan Ayat Suci / Kalimat Mutiara</label>
                  <textarea
                    rows={2}
                    value={formData.quoteText}
                    onChange={(e) => handleChange('quoteText', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Sumber Kutipan (misal: QS. Ar-Rum: 21)"
                  value={formData.quoteSource}
                  onChange={(e) => handleChange('quoteSource', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs"
                />
              </div>
            </div>
          )}

          {/* TAB 2: AKAD, RESEPSI & MAPS */}
          {activeTab === 'acara' && (
            <div className="space-y-5 text-xs text-[#2C2926]">
              {/* Akad Nikah */}
              <div className="bg-white p-4 rounded-2xl border border-[#E8DEC9] space-y-3">
                <span className="font-bold text-sm text-[#996515] block">Jadwal Akad Nikah</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold mb-1">Hari & Tanggal Akad</label>
                    <input
                      type="text"
                      value={formData.akadDate}
                      onChange={(e) => handleChange('akadDate', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Waktu Pelaksanaan</label>
                    <input
                      type="text"
                      value={formData.akadTime}
                      onChange={(e) => handleChange('akadTime', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Nama Tempat / Masjid</label>
                  <input
                    type="text"
                    value={formData.akadVenue}
                    onChange={(e) => handleChange('akadVenue', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Alamat Lengkap Akad</label>
                  <textarea
                    rows={2}
                    value={formData.akadAddress}
                    onChange={(e) => handleChange('akadAddress', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs"
                  />
                </div>
              </div>

              {/* Resepsi Pernikahan */}
              <div className="bg-white p-4 rounded-2xl border border-[#E8DEC9] space-y-3">
                <span className="font-bold text-sm text-[#996515] block">Jadwal Resepsi Pernikahan</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold mb-1">Hari & Tanggal Resepsi</label>
                    <input
                      type="text"
                      value={formData.resepsiDate}
                      onChange={(e) => handleChange('resepsiDate', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Waktu Pelaksanaan</label>
                    <input
                      type="text"
                      value={formData.resepsiTime}
                      onChange={(e) => handleChange('resepsiTime', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Nama Gedung / Ballroom</label>
                  <input
                    type="text"
                    value={formData.resepsiVenue}
                    onChange={(e) => handleChange('resepsiVenue', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Alamat Lengkap Resepsi</label>
                  <textarea
                    rows={2}
                    value={formData.resepsiAddress}
                    onChange={(e) => handleChange('resepsiAddress', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs"
                  />
                </div>
              </div>

              {/* Google Maps Embed & Link */}
              <div className="bg-white p-4 rounded-2xl border border-[#E8DEC9] space-y-3">
                <span className="font-bold text-sm text-[#996515] block">Tautan Google Maps</span>
                <div>
                  <label className="block font-semibold mb-1">URL Buka Google Maps (Link Luar)</label>
                  <input
                    type="text"
                    value={formData.googleMapsUrl}
                    onChange={(e) => handleChange('googleMapsUrl', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Google Maps Embed iframe URL</label>
                  <input
                    type="text"
                    value={formData.googleMapsEmbedUrl}
                    onChange={(e) => handleChange('googleMapsEmbedUrl', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: GALERI & LOVE STORY */}
          {activeTab === 'cerita_galeri' && (
            <div className="space-y-5 text-xs text-[#2C2926]">
              {/* Photo Gallery List */}
              <div className="bg-white p-4 rounded-2xl border border-[#E8DEC9] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#996515]">Daftar URL Foto Galeri ({formData.galleryPhotos.length})</span>
                  <button
                    type="button"
                    onClick={handleAddGalleryPhoto}
                    className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Foto</span>
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.galleryPhotos.map((url, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-stone-400 w-5">{idx + 1}.</span>
                      <input
                        type="text"
                        value={url}
                        onChange={(e) => handleGalleryChange(idx, e.target.value)}
                        className="flex-1 px-3 py-2 rounded-xl border border-stone-200 text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveGalleryPhoto(idx)}
                        className="p-2 text-stone-400 hover:text-red-600 cursor-pointer"
                        title="Hapus Foto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Love Story Moments */}
              <div className="bg-white p-4 rounded-2xl border border-[#E8DEC9] space-y-4">
                <span className="font-bold text-sm text-[#996515] block">Kisah Perjalanan Cinta (Love Story)</span>
                {formData.loveStories.map((story, idx) => (
                  <div key={story.id} className="p-3.5 rounded-xl border border-stone-100 bg-[#FAF7F0] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#2C2926]">Momen #{idx + 1}</span>
                      <input
                        type="text"
                        value={story.date}
                        onChange={(e) => {
                          const updated = [...formData.loveStories];
                          updated[idx] = { ...updated[idx], date: e.target.value };
                          handleChange('loveStories', updated);
                        }}
                        placeholder="Waktu (e.g. Oktober 2019)"
                        className="px-2.5 py-1 rounded-lg border border-stone-200 bg-white text-xs w-36"
                      />
                    </div>
                    <input
                      type="text"
                      value={story.title}
                      onChange={(e) => {
                        const updated = [...formData.loveStories];
                        updated[idx] = { ...updated[idx], title: e.target.value };
                        handleChange('loveStories', updated);
                      }}
                      placeholder="Judul Momen (e.g. Pertemuan Pertama)"
                      className="w-full px-3 py-1.5 rounded-lg border border-stone-200 bg-white text-xs font-semibold"
                    />
                    <textarea
                      rows={2}
                      value={story.story}
                      onChange={(e) => {
                        const updated = [...formData.loveStories];
                        updated[idx] = { ...updated[idx], story: e.target.value };
                        handleChange('loveStories', updated);
                      }}
                      placeholder="Cerita singkat momen ini..."
                      className="w-full px-3 py-1.5 rounded-lg border border-stone-200 bg-white text-xs"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: KADO & MUSIK */}
          {activeTab === 'kado_musik' && (
            <div className="space-y-5 text-xs text-[#2C2926]">
              {/* Music Setting */}
              <div className="bg-white p-4 rounded-2xl border border-[#E8DEC9] space-y-3">
                <span className="font-bold text-sm text-[#996515] block">Musik Latar Belakang (Background Audio)</span>
                <div>
                  <label className="block font-semibold mb-1">Judul Musik</label>
                  <input
                    type="text"
                    value={formData.musicTitle}
                    onChange={(e) => handleChange('musicTitle', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Audio MP3 URL Direct Link</label>
                  <input
                    type="text"
                    value={formData.musicUrl}
                    onChange={(e) => handleChange('musicUrl', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-mono"
                  />
                </div>
              </div>

              {/* Bank Accounts */}
              <div className="bg-white p-4 rounded-2xl border border-[#E8DEC9] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#996515]">Nomor Rekening Amplop Digital</span>
                  <button
                    type="button"
                    onClick={handleAddBank}
                    className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Bank</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {formData.bankAccounts.map((bank, idx) => (
                    <div key={bank.id} className="p-3.5 rounded-xl border border-stone-200 bg-[#FAF7F0] space-y-2 relative">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div>
                          <label className="block font-semibold mb-1">Nama Bank</label>
                          <input
                            type="text"
                            value={bank.bankName}
                            onChange={(e) => handleBankChange(idx, 'bankName', e.target.value)}
                            placeholder="e.g. BCA"
                            className="w-full px-3 py-1.5 rounded-lg border border-stone-200 bg-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold mb-1">Nomor Rekening</label>
                          <input
                            type="text"
                            value={bank.accountNumber}
                            onChange={(e) => handleBankChange(idx, 'accountNumber', e.target.value)}
                            placeholder="e.g. 8830912834"
                            className="w-full px-3 py-1.5 rounded-lg border border-stone-200 bg-white text-xs font-mono"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold mb-1">Atas Nama (Holder)</label>
                          <input
                            type="text"
                            value={bank.holderName}
                            onChange={(e) => handleBankChange(idx, 'holderName', e.target.value)}
                            placeholder="e.g. Nama Pengantin"
                            className="w-full px-3 py-1.5 rounded-lg border border-stone-200 bg-white text-xs"
                          />
                        </div>
                      </div>
                      {formData.bankAccounts.length > 1 && (
                        <div className="flex justify-end pt-1">
                          <button
                            type="button"
                            onClick={() => handleRemoveBank(idx)}
                            className="text-stone-400 hover:text-red-600 text-[11px] flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Hapus Rekening</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Physical Gift Address */}
              <div className="bg-white p-4 rounded-2xl border border-[#E8DEC9] space-y-3">
                <span className="font-bold text-sm text-[#996515] block">Alamat Pengiriman Kado Fisik</span>
                <div>
                  <label className="block font-semibold mb-1">Nama Penerima & No. Kontak</label>
                  <input
                    type="text"
                    value={formData.physicalGiftRecipient}
                    onChange={(e) => handleChange('physicalGiftRecipient', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Alamat Lengkap Pengiriman</label>
                  <textarea
                    rows={2}
                    value={formData.physicalGiftAddress}
                    onChange={(e) => handleChange('physicalGiftAddress', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-4 border-t border-[#EBE4D5] flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleResetToDefault}
              className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-600 hover:text-stone-900 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Tema Ini ke Bawaan</span>
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={onOpenPreview}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl border border-[#996515] text-[#996515] hover:bg-amber-50 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Lihat Hasil Live</span>
              </button>

              <button
                type="submit"
                className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#996515] to-[#B8860B] hover:from-[#85530D] hover:to-[#9E7108] text-white font-bold text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                {saveSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-green-300" />
                    <span>Tersimpan!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Simpan Perubahan Tema</span>
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
