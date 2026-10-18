import React, { useState } from 'react';
import { 
  X, 
  Settings, 
  BookOpen, 
  Palette, 
  Code, 
  Save, 
  Check, 
  Copy, 
  Sparkles,
  Layers,
  Image as ImageIcon,
  HelpCircle,
  FileText,
  Database,
  Server,
  RefreshCw,
  ShieldCheck
} from 'lucide-react';
import { SiteConfig } from '../types';
import { firebaseInfo, testConnection } from '../firebase';

interface ConfigGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
  onSaveConfig: (newConfig: SiteConfig) => void;
}

export const ConfigGuideModal: React.FC<ConfigGuideModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig
}) => {
  const [activeTab, setActiveTab] = useState<'config' | 'guide' | 'palette' | 'code' | 'database'>('config');
  const [formData, setFormData] = useState<SiteConfig>({ ...config });
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedCodeKey, setCopiedCodeKey] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ connected: boolean; message: string; databaseId: string; projectId: string } | null>(null);

  if (!isOpen) return null;

  const handleFormChange = (key: keyof SiteConfig, val: string) => {
    setFormData((prev) => ({ ...prev, [key]: val }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 2000);
  };

  const handleTestPing = async () => {
    setIsTesting(true);
    try {
      const res = await testConnection();
      setTestResult(res);
    } catch {
      setTestResult({
        connected: false,
        message: 'Koneksi gagal',
        databaseId: firebaseInfo.databaseId,
        projectId: firebaseInfo.projectId
      });
    } finally {
      setIsTesting(false);
    }
  };

  const copyCode = (key: string, codeString: string) => {
    navigator.clipboard.writeText(codeString);
    setCopiedCodeKey(key);
    setTimeout(() => setCopiedCodeKey(null), 2000);
  };

  const htmlSnippet = `<!-- Struktur HTML Sederhana Undangan Dheluwang -->
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Dheluwang Undangan - Undangan Fisik Elegan</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- Header / Navigasi -->
  <header class="navbar">
    <div class="logo">DU - Dheluwang Undangan</div>
    <nav>
      <a href="#beranda">Beranda</a>
      <a href="#galeri">Galeri</a>
      <a href="#katalog">Katalog</a>
      <a href="#kontak">Kontak</a>
      <a href="#order">Pesan Undangan</a>
    </nav>
  </header>

  <!-- Hero Section -->
  <section class="hero">
    <h1>Abadikan Momen Sakral dengan Undangan Fisik Mewah</h1>
    <p>Sentuhan kertas katun, foil emas 24K, dan stempel lilin wax seal.</p>
    <a href="#order" class="btn-primary">Isi Formulir Pemesanan</a>
  </section>
</body>
</html>`;

  const cssSnippet = `/* Palet Warna Elegan Undangan Pernikahan (style.css) */
:root {
  --bg-ivory: #FDFCF7;       /* Latar Belakang Kertas Mewah */
  --gold-primary: #996515;   /* Warna Aksen Emas Aristokrat */
  --gold-light: #D4AF37;     /* Pantulan Hotprint Emas 24K */
  --text-dark: #2C2926;      /* Warna Tipografi Kontras Tinggi */
  --border-cream: #E8DEC9;   /* Garis Pemisah Halus */
}

body {
  margin: 0;
  background-color: var(--bg-ivory);
  color: var(--text-dark);
  font-family: 'Plus Jakarta Sans', sans-serif;
}

h1, h2, h3, .serif-font {
  font-family: 'Cormorant Garamond', serif;
  letter-spacing: -0.02em;
}

.btn-primary {
  background: linear-gradient(135deg, var(--gold-primary), var(--gold-light));
  color: #ffffff;
  padding: 12px 24px;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 600;
}`;

  const jsSnippet = `// Kalkulator Otomatis Berat & Total Biaya Pemesanan (script.js)
function hitungEstimasi(jumlahPcs, beratPerPcsGram = 50, tarifOngkirPerKg = 18000) {
  const totalGram = jumlahPcs * beratPerPcsGram;
  const totalKg = Math.ceil(totalGram / 1000);
  const totalOngkir = totalKg * tarifOngkirPerKg;
  
  const hargaCetakPerPcs = 14000;
  const totalCetak = jumlahPcs * hargaCetakPerPcs;
  const grandTotal = totalCetak + totalOngkir;

  return {
    beratKg: totalKg,
    biayaOngkir: totalOngkir,
    totalBiaya: grandTotal
  };
}

console.log(hitungEstimasi(300)); 
// Output: { beratKg: 15, biayaOngkir: 270000, totalBiaya: 4470000 }`;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#FDFCF7] border border-[#D5C9B3] rounded-3xl max-w-4xl w-full h-[90vh] flex flex-col shadow-2xl overflow-hidden relative">
        
        {/* Top Header */}
        <div className="p-6 border-b border-[#EBE4D5] flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FAF4E6] text-[#996515] flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold text-[#2C2926]">
                Konfigurasi & Panduan Pemilik Web
              </h3>
              <p className="text-xs text-[#7A6E63]">
                Kelola seluruh data kontak, baca panduan kustomisasi, palet warna, dan kode snippet.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-800 rounded-full hover:bg-stone-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#EBE4D5] bg-[#FAF7F0] px-6 gap-2 shrink-0 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('config')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === 'config'
                ? 'border-[#996515] text-[#996515]'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Pengaturan Data Langsung</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === 'guide'
                ? 'border-[#996515] text-[#996515]'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Panduan Pemilik Web</span>
          </button>

          <button
            onClick={() => setActiveTab('palette')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === 'palette'
                ? 'border-[#996515] text-[#996515]'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Elemen Visual & Color Palette</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === 'code'
                ? 'border-[#996515] text-[#996515]'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Simpel Kode (HTML/CSS/JS)</span>
          </button>

          <button
            onClick={() => setActiveTab('database')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === 'database'
                ? 'border-[#996515] text-[#996515]'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Database className="w-4 h-4 text-emerald-600" />
            <span>Status Firebase</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </button>
        </div>

        {/* Tab Contents Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          
          {/* TAB 1: PENGATURAN DATA LANGSUNG */}
          {activeTab === 'config' && (
            <form onSubmit={handleSave} className="space-y-6 max-w-3xl">
              <div className="bg-amber-50 border border-amber-200 text-amber-900 p-4 rounded-2xl text-xs flex items-center justify-between">
                <span>Perubahan pada formulir di bawah ini akan langsung mengubah data di seluruh tampilan website.</span>
                {savedSuccess && (
                  <span className="bg-green-600 text-white font-bold px-3 py-1 rounded-full text-xs flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Tersimpan!
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-[#2C2926] mb-1">Nama Brand / Toko</label>
                  <input
                    type="text"
                    value={formData.brandName}
                    onChange={(e) => handleFormChange('brandName', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C9B3] bg-white text-sm"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#2C2926] mb-1">Tagline</label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => handleFormChange('tagline', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C9B3] bg-white text-sm"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#2C2926] mb-1">Nomor WhatsApp (Format: 628xxx)</label>
                  <input
                    type="text"
                    value={formData.whatsappNumber}
                    onChange={(e) => handleFormChange('whatsappNumber', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C9B3] bg-white text-sm"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#2C2926] mb-1">Display Nomor WhatsApp</label>
                  <input
                    type="text"
                    value={formData.whatsappDisplay}
                    onChange={(e) => handleFormChange('whatsappDisplay', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C9B3] bg-white text-sm"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#2C2926] mb-1">Alamat Email Resmi</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleFormChange('email', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C9B3] bg-white text-sm"
                  />
                </div>


                <div>
                  <label className="block font-semibold text-[#2C2926] mb-1">Jam Pelayanan Hari Kerja</label>
                  <input
                    type="text"
                    value={formData.operatingHoursWeekday}
                    onChange={(e) => handleFormChange('operatingHoursWeekday', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C9B3] bg-white text-sm"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#2C2926] mb-1">Jam Pelayanan Akhir Pekan</label>
                  <input
                    type="text"
                    value={formData.operatingHoursWeekend}
                    onChange={(e) => handleFormChange('operatingHoursWeekend', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C9B3] bg-white text-sm"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="block font-semibold text-[#2C2926] mb-1">Alamat Lengkap Studio / Workshop</label>
                <textarea
                  rows={2}
                  value={formData.address}
                  onChange={(e) => handleFormChange('address', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C9B3] bg-white text-sm"
                />
              </div>

              <div className="text-xs">
                <label className="block font-semibold text-[#2C2926] mb-1">Headline Utama Hero</label>
                <input
                  type="text"
                  value={formData.heroHeadline}
                  onChange={(e) => handleFormChange('heroHeadline', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C9B3] bg-white text-sm"
                />
              </div>

              <div className="text-xs">
                <label className="block font-semibold text-[#2C2926] mb-1">Sub-headline Utama Hero</label>
                <textarea
                  rows={2}
                  value={formData.heroSubheadline}
                  onChange={(e) => handleFormChange('heroSubheadline', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D5C9B3] bg-white text-sm"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl bg-[#996515] hover:bg-[#805310] text-white font-bold text-xs uppercase tracking-wider shadow-md transition flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan Konfigurasi</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: PANDUAN PEMILIK WEB */}
          {activeTab === 'guide' && (
            <div className="space-y-6 text-sm text-[#453B32]">
              <div className="bg-[#FAF6EC] p-6 rounded-2xl border border-[#E8DEC9] space-y-4">
                <h4 className="font-display text-xl font-bold text-[#2C2926] flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#996515]" />
                  Panduan Lengkap Mengelola Website Dheluwang
                </h4>
                <p className="text-xs text-[#665A4E] leading-relaxed">
                  Struktur kode dan data pada website ini telah dipusatkan secara terstruktur agar pemilik website dapat dengan mudah mengganti teks, foto, background, serta menambah atau mengurangi menu.
                </p>
              </div>

              <div className="space-y-5">
                <div className="border border-[#EAE2D2] rounded-2xl p-5 bg-white">
                  <h5 className="font-bold text-[#2C2926] text-base mb-2">
                    1. Cara Mengganti Background & Tekstur Kertas
                  </h5>
                  <p className="text-xs text-stone-600 leading-relaxed mb-2">
                    Warna dasar website didefinisikan di file <code className="bg-stone-100 px-2 py-0.5 rounded text-amber-900">src/index.css</code> dan <code className="bg-stone-100 px-2 py-0.5 rounded text-amber-900">index.html</code>.
                  </p>
                  <ul className="list-disc pl-5 text-xs text-stone-600 space-y-1">
                    <li>Warna background utama: <strong>#FDFCF7</strong> (Warm Ivory/Kertas Beras Adat).</li>
                    <li>Untuk mengubah ke warna lain (misal putih murni atau blush pastel), cukup ganti kelas <code className="bg-stone-100 px-1 rounded">bg-[#FDFCF7]</code> di file <code className="bg-stone-100 px-1 rounded">index.html</code> atau <code className="bg-stone-100 px-1 rounded">src/index.css</code>.</li>
                  </ul>
                </div>

                <div className="border border-[#EAE2D2] rounded-2xl p-5 bg-white">
                  <h5 className="font-bold text-[#2C2926] text-base mb-2">
                    2. Cara Mengisi & Menambah Foto Galeri atau Katalog
                  </h5>
                  <ul className="list-disc pl-5 text-xs text-stone-600 space-y-1.5">
                    <li>
                      <strong>Melalui Tampilan Web (Tanpa Koding):</strong> Buka menu <em>Galeri</em> lalu klik tombol <em>“Tambah Foto Baru”</em>, atau buka menu <em>Katalog</em> lalu klik tombol <em>“Tambah / Buat Desain Baru”</em>. Masukkan link foto (Unsplash, Cloudinary, Imgur, atau link hosting gambar Anda), judul, dan spesifikasinya.
                    </li>
                    <li>
                      <strong>Melalui File Kode Default:</strong> Anda juga dapat mengedit berkas <code className="bg-stone-100 px-2 py-0.5 rounded text-amber-900">src/data/defaultData.ts</code> pada array <code className="bg-stone-100 px-1 rounded">defaultCatalogs</code> atau <code className="bg-stone-100 px-1 rounded">defaultGallery</code>.
                    </li>
                  </ul>
                </div>

                <div className="border border-[#EAE2D2] rounded-2xl p-5 bg-white">
                  <h5 className="font-bold text-[#2C2926] text-base mb-2">
                    3. Cara Menghapus atau Menambah Section / Halaman Baru
                  </h5>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Setiap halaman dirancang sebagai komponen mandiri di dalam folder <code className="bg-stone-100 px-2 py-0.5 rounded text-amber-900">src/components/</code>:
                  </p>
                  <ul className="list-disc pl-5 text-xs text-stone-600 space-y-1 mt-2">
                    <li><code className="font-bold text-stone-700">HeroSection.tsx</code> & <code className="font-bold text-stone-700">AboutSection.tsx</code> = Halaman Beranda & Biodata</li>
                    <li><code className="font-bold text-stone-700">GallerySection.tsx</code> = Halaman Galeri Foto</li>
                    <li><code className="font-bold text-stone-700">CatalogSection.tsx</code> = Halaman Katalog & Spesifikasi Desain</li>
                    <li><code className="font-bold text-stone-700">ContactSection.tsx</code> = Halaman Kontak, Jam Buka & Note</li>
                    <li><code className="font-bold text-stone-700">FAQSection.tsx</code> = Halaman Pertanyaan yang Sering Diajukan</li>
                    <li><code className="font-bold text-stone-700">DataFormSection.tsx</code> = Halaman 3-Bagian Formulir Order</li>
                  </ul>
                  <p className="text-xs text-stone-600 mt-2">
                    Untuk menambah section baru, buat file baru di folder <code className="bg-stone-100 px-1 rounded">src/components/</code> dan panggil di <code className="bg-stone-100 px-1 rounded">src/App.tsx</code>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PALET WARNA & ELEMEN VISUAL */}
          {activeTab === 'palette' && (
            <div className="space-y-6 text-sm">
              <div className="bg-[#FAF6EC] p-6 rounded-2xl border border-[#E8DEC9]">
                <h4 className="font-display text-xl font-bold text-[#2C2926] mb-2">
                  Rekomendasi Elemen Visual & Color Palette untuk Undangan Fisik Elegan
                </h4>
                <p className="text-xs text-[#615549] leading-relaxed">
                  Untuk calon pengantin berusia 23-35 tahun, paduan warna harus memancarkan kemewahan yang bersahaja (quiet luxury), kehangatan tradisi, dan kemudahan dibaca di layar maupun di media fisik.
                </p>
              </div>

              {/* Color Swatches Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                
                <div className="p-4 rounded-2xl border border-[#EAE2D2] bg-white shadow-xs">
                  <div className="h-16 rounded-xl bg-[#FDFCF7] border border-[#D5C9B3] mb-3 flex items-center justify-center text-xs font-mono font-bold text-stone-700">
                    #FDFCF7
                  </div>
                  <h5 className="font-bold text-[#2C2926]">Warm Royal Ivory (Dasar)</h5>
                  <p className="text-xs text-stone-500 mt-1">
                    Kertas katun / linen bertekstur hangat, lembut di mata dan elegan.
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-[#EAE2D2] bg-white shadow-xs">
                  <div className="h-16 rounded-xl bg-[#996515] mb-3 flex items-center justify-center text-xs font-mono font-bold text-white shadow-inner">
                    #996515
                  </div>
                  <h5 className="font-bold text-[#2C2926]">Antique Ochre Gold (Primer)</h5>
                  <p className="text-xs text-stone-500 mt-1">
                    Warna emas aristokrat berkarakter tegas untuk tombol CTA & judul.
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-[#EAE2D2] bg-white shadow-xs">
                  <div className="h-16 rounded-xl bg-[#D4AF37] mb-3 flex items-center justify-center text-xs font-mono font-bold text-stone-900 shadow-inner">
                    #D4AF37
                  </div>
                  <h5 className="font-bold text-[#2C2926]">Champagne Gold Foil (Aksen)</h5>
                  <p className="text-xs text-stone-500 mt-1">
                    Representasi hotprint emas 24K berkilau untuk badge & ornamen.
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-[#EAE2D2] bg-white shadow-xs">
                  <div className="h-16 rounded-xl bg-[#2C2926] mb-3 flex items-center justify-center text-xs font-mono font-bold text-white">
                    #2C2926
                  </div>
                  <h5 className="font-bold text-[#2C2926]">Espresso Charcoal (Teks)</h5>
                  <p className="text-xs text-stone-500 mt-1">
                    Pengganti warna hitam pekat agar nuansa tetap lembut dan ramah.
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-[#EAE2D2] bg-white shadow-xs">
                  <div className="h-16 rounded-xl bg-[#E8DEC9] mb-3 flex items-center justify-center text-xs font-mono font-bold text-stone-800">
                    #E8DEC9
                  </div>
                  <h5 className="font-bold text-[#2C2926]">Sandstone Linen (Border)</h5>
                  <p className="text-xs text-stone-500 mt-1">
                    Garis pembatas halus menyerupai serat kertas murni berkualitas.
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-[#EAE2D2] bg-white shadow-xs">
                  <div className="h-16 rounded-xl bg-[#25D366] mb-3 flex items-center justify-center text-xs font-mono font-bold text-white">
                    #25D366
                  </div>
                  <h5 className="font-bold text-[#2C2926]">WhatsApp Emerald (Interaksi)</h5>
                  <p className="text-xs text-stone-500 mt-1">
                    Warna resmi WhatsApp untuk konversi pesan instan calon pengantin.
                  </p>
                </div>

              </div>

              {/* Typography Guide */}
              <div className="bg-white p-5 rounded-2xl border border-[#EAE2D2] space-y-3">
                <h5 className="font-bold text-[#2C2926] text-base">
                  Rekomendasi Tipografi (Font Pairing)
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="bg-[#FAF7F0] p-4 rounded-xl">
                    <span className="text-[10px] uppercase font-bold text-[#996515] block mb-1">
                      Header / Judul (Serif Klasik)
                    </span>
                    <p className="font-serif text-2xl font-bold text-[#2C2926]">Cormorant Garamond</p>
                    <p className="text-stone-500 mt-1">
                      Memberikan kesan puitis, agung, dan tak lekang oleh waktu layaknya undangan kerajaan.
                    </p>
                  </div>
                  <div className="bg-[#FAF7F0] p-4 rounded-xl">
                    <span className="text-[10px] uppercase font-bold text-[#996515] block mb-1">
                      Body Text / Formulir (Sans-Serif Bersih)
                    </span>
                    <p className="font-sans text-xl font-bold text-[#2C2926]">Plus Jakarta Sans</p>
                    <p className="text-stone-500 mt-1">
                      Sangat mudah dibaca di layar HP, modern, dan memberikan kenyamanan saat mengisi formulir.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: KODE SNIPPET (HTML/CSS/JS) */}
          {activeTab === 'code' && (
            <div className="space-y-6 text-xs">
              <div className="bg-[#FAF6EC] p-4 rounded-xl border border-[#E8DEC9] text-stone-700">
                Gunakan template kode simpel di bawah ini jika Anda ingin mengintegrasikan bagian website Dheluwang ke platform lain atau melakukan kustomisasi cepat.
              </div>

              {/* HTML Snippet */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#2C2926] font-mono">1. Simpel Kode HTML (index.html)</span>
                  <button
                    onClick={() => copyCode('html', htmlSnippet)}
                    className="flex items-center gap-1 text-[11px] text-[#996515] font-semibold hover:underline cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedCodeKey === 'html' ? 'Tersalin!' : 'Salin Kode HTML'}</span>
                  </button>
                </div>
                <pre className="bg-[#1F1E1D] text-stone-200 p-4 rounded-xl font-mono text-[11px] overflow-x-auto leading-relaxed">
                  {htmlSnippet}
                </pre>
              </div>

              {/* CSS Snippet */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#2C2926] font-mono">2. Simpel Kode CSS (style.css)</span>
                  <button
                    onClick={() => copyCode('css', cssSnippet)}
                    className="flex items-center gap-1 text-[11px] text-[#996515] font-semibold hover:underline cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedCodeKey === 'css' ? 'Tersalin!' : 'Salin Kode CSS'}</span>
                  </button>
                </div>
                <pre className="bg-[#1F1E1D] text-stone-200 p-4 rounded-xl font-mono text-[11px] overflow-x-auto leading-relaxed">
                  {cssSnippet}
                </pre>
              </div>

              {/* JS Snippet */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#2C2926] font-mono">3. Simpel Kode JS (script.js - Kalkulator Pemesanan)</span>
                  <button
                    onClick={() => copyCode('js', jsSnippet)}
                    className="flex items-center gap-1 text-[11px] text-[#996515] font-semibold hover:underline cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedCodeKey === 'js' ? 'Tersalin!' : 'Salin Kode JS'}</span>
                  </button>
                </div>
                <pre className="bg-[#1F1E1D] text-stone-200 p-4 rounded-xl font-mono text-[11px] overflow-x-auto leading-relaxed">
                  {jsSnippet}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 5: DATABASE FIREBASE STATUS */}
          {activeTab === 'database' && (
            <div className="space-y-6 text-xs text-[#383129]">
              
              {/* Connection Status Banner */}
              <div className="bg-gradient-to-r from-emerald-50 via-[#FDFDF9] to-amber-50 border border-emerald-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 shadow-inner">
                    <Database className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display text-xl font-bold text-[#2C2926]">
                        Firebase Firestore Connected
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-bold text-[10px] tracking-wide uppercase flex items-center gap-1">
                        <Check className="w-3 h-3" /> Aktif
                      </span>
                    </div>
                    <p className="text-stone-600 text-xs mt-0.5">
                      Database cloud aktif untuk menyimpan data pemesanan, katalog fisik, dan galeri portofolio.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleTestPing}
                  disabled={isTesting}
                  className="px-4 py-2.5 rounded-xl bg-[#2C2926] hover:bg-black text-[#F3E5AB] font-semibold text-xs flex items-center gap-2 transition cursor-pointer shadow-xs shrink-0"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
                  <span>{isTesting ? 'Memeriksa...' : 'Ping Koneksi Firestore'}</span>
                </button>
              </div>

              {/* Ping Test Result Alert if run */}
              {testResult && (
                <div className={`p-4 rounded-xl border flex items-center gap-3 ${
                  testResult.connected ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-red-50 border-red-300 text-red-800'
                }`}>
                  <Check className="w-5 h-5 shrink-0" />
                  <div>
                    <span className="font-bold block">Status Ping: {testResult.message}</span>
                    <span className="text-[11px] font-mono">
                      Target Database: {testResult.databaseId} | Project: {testResult.projectId}
                    </span>
                  </div>
                </div>
              )}

              {/* Parameters Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-[#E8DEC9] space-y-1">
                  <span className="text-stone-500 text-[11px] block">Firebase Project ID</span>
                  <span className="font-mono font-bold text-[#2C2926] text-sm break-all">
                    {firebaseInfo.projectId}
                  </span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#E8DEC9] space-y-1">
                  <span className="text-stone-500 text-[11px] block">Firestore Database ID</span>
                  <span className="font-mono font-bold text-[#996515] text-sm break-all">
                    {firebaseInfo.databaseId}
                  </span>
                </div>
              </div>

              {/* Collections Table */}
              <div className="bg-white rounded-2xl border border-[#E8DEC9] p-5 space-y-3">
                <h4 className="font-display text-base font-bold text-[#2C2926] flex items-center gap-2">
                  <Server className="w-4 h-4 text-[#996515]" />
                  Struktur Koleksi Data (Firestore Blueprint)
                </h4>
                <div className="divide-y divide-stone-100 text-xs">
                  <div className="py-2.5 flex items-start justify-between gap-4">
                    <div>
                      <span className="font-mono font-bold text-emerald-800">/orders</span>
                      <p className="text-stone-500 text-[11px]">Formulir pemesanan calon pengantin (nama, kontak, alamat, kurir, jumlah, nama pengantin, jadwal akad & resepsi).</p>
                    </div>
                    <span className="font-mono text-[10px] bg-stone-100 px-2 py-1 rounded text-stone-600 shrink-0">Order Schema</span>
                  </div>

                  <div className="py-2.5 flex items-start justify-between gap-4">
                    <div>
                      <span className="font-mono font-bold text-amber-800">/catalogs</span>
                      <p className="text-stone-500 text-[11px]">Daftar desain undangan pernikahan fisik, spesifikasi bahan kertas, laminasi, foil emas, dan harga per pcs.</p>
                    </div>
                    <span className="font-mono text-[10px] bg-stone-100 px-2 py-1 rounded text-stone-600 shrink-0">Catalog Schema</span>
                  </div>

                  <div className="py-2.5 flex items-start justify-between gap-4">
                    <div>
                      <span className="font-mono font-bold text-sky-800">/gallery_items</span>
                      <p className="text-stone-500 text-[11px]">Koleksi dokumentasi foto fisik nyata untuk inspirasi calon pengantin (lightbox modal slider & download).</p>
                    </div>
                    <span className="font-mono text-[10px] bg-stone-100 px-2 py-1 rounded text-stone-600 shrink-0">Gallery Schema</span>
                  </div>

                  <div className="py-2.5 flex items-start justify-between gap-4">
                    <div>
                      <span className="font-mono font-bold text-purple-800">/faqs</span>
                      <p className="text-stone-500 text-[11px]">Pertanyaan seputar estimasi pengerjaan, sample kit proofing fisik, dan garansi cetak ulang.</p>
                    </div>
                    <span className="font-mono text-[10px] bg-stone-100 px-2 py-1 rounded text-stone-600 shrink-0">FAQ Schema</span>
                  </div>
                </div>
              </div>

              {/* Security Rules Status */}
              <div className="bg-[#FAF7F0] rounded-2xl border border-[#E8DEC9] p-4 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold text-[#2C2926]">Firestore Security Rules Terpasang</span>
                    <p className="text-stone-500 text-[11px]">
                      Aturan ABAC aktif melindungi data pribadi calon pengantin dari query scraping liar.
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                  Rules Deployed
                </span>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
