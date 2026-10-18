import React, { useState, useEffect } from 'react';
import { 
  User, 
  MapPin, 
  Truck, 
  FileCheck2, 
  Calendar, 
  Heart, 
  Send, 
  Sparkles, 
  CheckCircle, 
  AlertCircle, 
  Calculator, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck,
  Check,
  Package,
  Layers,
  Copy
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  OrderFormData, 
  CatalogItem, 
  SiteConfig 
} from '../types';
import { 
  courierOptions, 
  paperOptions, 
  finishingOptions, 
  laminationOptions 
} from '../data/defaultData';

interface DataFormSectionProps {
  config: SiteConfig;
  selectedCatalog?: CatalogItem | null;
  onSubmitOrder: (order: OrderFormData) => Promise<string>; // returns created Order ID
}

export const DataFormSection: React.FC<DataFormSectionProps> = ({
  config,
  selectedCatalog,
  onSubmitOrder
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedOrderId, setSubmittedOrderId] = useState<string | null>(null);
  const [isConfirmedModalOpen, setIsConfirmedModalOpen] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Form State
  const [formData, setFormData] = useState<OrderFormData>({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    shippingAddress: '',
    shippingCourier: courierOptions[0].id,
    estimatedWeightKg: '15',
    estimatedShippingCost: 'Rp 270.000',
    designTheme: selectedCatalog ? `${selectedCatalog.title} (${selectedCatalog.theme})` : 'Royal Astakona - Gold Foil Hardcover',
    quantity: '300',
    paperType: selectedCatalog ? selectedCatalog.paper : paperOptions[0],
    finishing: selectedCatalog ? `${selectedCatalog.hotprint}, ${selectedCatalog.emboss}` : finishingOptions[0],
    lamination: selectedCatalog ? selectedCatalog.lamination : laminationOptions[0],
    groomName: '',
    groomParents: '',
    brideName: '',
    brideParents: '',
    akadDateTimeLocation: '',
    resepsiDateTimeLocation: '',
    turutMengundang: '',
    mapsLink: '',
    specialNotes: '',
    totalEstimatedPrice: 'Rp 4.470.000',
    status: 'pending_consultation'
  });

  // Autofill when selectedCatalog changes from Catalog Section
  useEffect(() => {
    if (selectedCatalog) {
      setFormData((prev) => ({
        ...prev,
        designTheme: `${selectedCatalog.title} (${selectedCatalog.theme})`,
        paperType: selectedCatalog.paper,
        finishing: `${selectedCatalog.hotprint}, ${selectedCatalog.emboss}`,
        lamination: selectedCatalog.lamination
      }));
    }
  }, [selectedCatalog]);

  // Recalculate estimated weight & shipping & total price dynamically
  useEffect(() => {
    const qty = parseInt(formData.quantity) || 300;
    
    // Average weight: 50 grams per set for hardcover/thick paper
    const totalGrams = qty * 50;
    const calcKg = Math.max(1, Math.ceil(totalGrams / 1000));

    // Courier calculation
    const courier = courierOptions.find((c) => c.id === formData.shippingCourier) || courierOptions[0];
    let shippingCost = 0;
    if (courier.ratePerKg > 0) {
      const billableKg = courier.minKg ? Math.max(calcKg, courier.minKg) : calcKg;
      shippingCost = billableKg * courier.ratePerKg;
    }

    // Estimated unit price baseline ~ Rp 14.000 / pcs for physical artisan
    const estimatedUnitPrice = 14000;
    const printingTotal = qty * estimatedUnitPrice;
    const grandTotal = printingTotal + shippingCost;

    setFormData((prev) => ({
      ...prev,
      estimatedWeightKg: `${calcKg} kg (${qty} pcs × ~50 gram)`,
      estimatedShippingCost: `Rp ${shippingCost.toLocaleString('id-ID')}`,
      totalEstimatedPrice: `Rp ${grandTotal.toLocaleString('id-ID')}`
    }));
  }, [formData.quantity, formData.shippingCourier]);

  const handleChange = (field: keyof OrderFormData, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  // Validation per step
  const validateStep1 = () => {
    if (!formData.customerName.trim()) {
      alert('Mohon isi Nama Pemesan (Wajib).');
      return false;
    }
    if (!formData.customerPhone.trim()) {
      alert('Mohon isi Nomor WhatsApp / Kontak Aktif (Wajib).');
      return false;
    }
    if (!formData.shippingAddress.trim()) {
      alert('Mohon isi Alamat Lengkap Pengiriman Fisik (Wajib).');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.designTheme.trim()) {
      alert('Mohon tentukan Tema Desain (Wajib).');
      return false;
    }
    if (!formData.quantity || parseInt(formData.quantity) < 50) {
      alert('Mohon tentukan Jumlah Cetak minimal 50 pcs (Wajib).');
      return false;
    }
    if (!formData.paperType.trim()) {
      alert('Mohon pilih Jenis Kertas Undangan (Wajib).');
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (!formData.groomName.trim()) {
      alert('Mohon isi Nama Lengkap & Panggilan Mempelai Pria (Wajib).');
      return false;
    }
    if (!formData.groomParents.trim()) {
      alert('Mohon isi Nama Kedua Orang Tua Pria (Wajib).');
      return false;
    }
    if (!formData.brideName.trim()) {
      alert('Mohon isi Nama Lengkap & Panggilan Mempelai Wanita (Wajib).');
      return false;
    }
    if (!formData.brideParents.trim()) {
      alert('Mohon isi Nama Kedua Orang Tua Wanita (Wajib).');
      return false;
    }
    if (!formData.akadDateTimeLocation.trim()) {
      alert('Mohon isi Tanggal, Waktu & Lokasi Akad/Pemberkatan (Wajib).');
      return false;
    }
    if (!formData.resepsiDateTimeLocation.trim()) {
      alert('Mohon isi Tanggal, Waktu & Lokasi Resepsi (Wajib).');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
      window.scrollTo({ top: 350, behavior: 'smooth' });
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
      window.scrollTo({ top: 350, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 350, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep1() || !validateStep2() || !validateStep3()) return;

    setIsSubmitting(true);
    try {
      const orderId = await onSubmitOrder(formData);
      setSubmittedOrderId(orderId);
      setIsConfirmedModalOpen(true);

      // Trigger festive celebratory confetti
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error('Error submitting order to Firebase:', err);
      alert('Terjadi kendala saat menyimpan pesanan. Silakan periksa koneksi atau hubungi WhatsApp kami.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateWhatsAppMessage = () => {
    return `*KONFIRMASI FORM PEMESANAN UNDANGAN FISIK DHELUWANG*\n\n` +
      `No. Pesanan: #${submittedOrderId || 'BARU'}\n` +
      `*1. Data Pemesan & Pengiriman*\n` +
      `- Nama: ${formData.customerName}\n` +
      `- No. WhatsApp: ${formData.customerPhone}\n` +
      `- Alamat Kirim: ${formData.shippingAddress}\n` +
      `- Ekspedisi: ${courierOptions.find((c) => c.id === formData.shippingCourier)?.name}\n` +
      `- Estimasi Berat: ${formData.estimatedWeightKg}\n\n` +
      `*2. Spesifikasi Undangan*\n` +
      `- Tema Desain: ${formData.designTheme}\n` +
      `- Jumlah Cetak: ${formData.quantity} pcs\n` +
      `- Jenis Kertas: ${formData.paperType}\n` +
      `- Finishing: ${formData.finishing || '-'}\n` +
      `- Laminasi: ${formData.lamination || '-'}\n\n` +
      `*3. Detail Acara*\n` +
      `- Mempelai Pria: ${formData.groomName}\n` +
      `- Orang Tua Pria: ${formData.groomParents}\n` +
      `- Mempelai Wanita: ${formData.brideName}\n` +
      `- Orang Tua Wanita: ${formData.brideParents}\n` +
      `- Akad/Pemberkatan: ${formData.akadDateTimeLocation}\n` +
      `- Resepsi: ${formData.resepsiDateTimeLocation}\n` +
      `- Turut Mengundang: ${formData.turutMengundang || '-'}\n` +
      `- Link Maps: ${formData.mapsLink || '-'}\n` +
      `- Catatan: ${formData.specialNotes || '-'}\n\n` +
      `Total Estimasi: ${formData.totalEstimatedPrice}\n\n` +
      `Mohon dibantu verifikasi draft awal desain dan ketersediaan slot produksinya. Terima kasih!`;
  };

  const handleSendToWhatsApp = () => {
    const text = generateWhatsAppMessage();
    const url = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Title & Introduction */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F5EEDF] text-[#996515] text-xs font-semibold mb-2">
          <FileCheck2 className="w-3.5 h-3.5" />
          <span>Formulir Terstruktur 3 Bagian</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C2926]">
          Formulir Pemesanan Undangan Fisik
        </h2>
        <p className="text-sm sm:text-base text-[#615549] mt-3">
          Dirancang nyaman dan bertahap agar Anda tidak merasa jenuh. Setiap kolom dilengkapi penanda <span className="text-red-700 font-bold bg-red-50 px-2 py-0.5 rounded-sm">Wajib</span> dan <span className="text-stone-600 bg-stone-100 px-2 py-0.5 rounded-sm font-medium">Opsional</span>.
        </p>
      </div>

      {/* Progress Step Bar Indicator */}
      <div className="max-w-3xl mx-auto mb-12">
        <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
          
          {/* Step 1 */}
          <div
            onClick={() => setCurrentStep(1)}
            className={`cursor-pointer p-3 rounded-2xl border transition-all ${
              currentStep === 1
                ? 'bg-[#996515] text-white border-[#996515] shadow-md'
                : currentStep > 1
                ? 'bg-[#F4EDE0] text-[#7A5210] border-[#D5C9B3]'
                : 'bg-white text-stone-400 border-stone-200'
            }`}
          >
            <div className="text-[11px] uppercase tracking-wider font-bold mb-0.5">Bagian 1</div>
            <div className="font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5">
              {currentStep > 1 && <Check className="w-4 h-4 shrink-0" />}
              <span>Data Pemesan & Kirim</span>
            </div>
          </div>

          {/* Step 2 */}
          <div
            onClick={() => {
              if (validateStep1()) setCurrentStep(2);
            }}
            className={`cursor-pointer p-3 rounded-2xl border transition-all ${
              currentStep === 2
                ? 'bg-[#996515] text-white border-[#996515] shadow-md'
                : currentStep > 2
                ? 'bg-[#F4EDE0] text-[#7A5210] border-[#D5C9B3]'
                : 'bg-white text-stone-400 border-stone-200'
            }`}
          >
            <div className="text-[11px] uppercase tracking-wider font-bold mb-0.5">Bagian 2</div>
            <div className="font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5">
              {currentStep > 2 && <Check className="w-4 h-4 shrink-0" />}
              <span>Spesifikasi Undangan</span>
            </div>
          </div>

          {/* Step 3 */}
          <div
            onClick={() => {
              if (validateStep1() && validateStep2()) setCurrentStep(3);
            }}
            className={`cursor-pointer p-3 rounded-2xl border transition-all ${
              currentStep === 3
                ? 'bg-[#996515] text-white border-[#996515] shadow-md'
                : 'bg-white text-stone-400 border-stone-200'
            }`}
          >
            <div className="text-[11px] uppercase tracking-wider font-bold mb-0.5">Bagian 3</div>
            <div className="font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5">
              <span>Detail Acara Cetak</span>
            </div>
          </div>

        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Multi-Step Form Container */}
        <div className="lg:col-span-8 bg-white border border-[#E8DEC9] rounded-3xl p-6 sm:p-10 shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* ========================================================
                BAGIAN 1: DATA PEMESAN & PENGIRIMAN
            ======================================================== */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center justify-between border-b border-[#F0E6D5] pb-4">
                  <div className="flex items-center gap-2.5">
                    <User className="w-5 h-5 text-[#996515]" />
                    <h3 className="font-display text-2xl font-bold text-[#2C2926]">
                      Bagian 1: Data Pemesan & Pengiriman Fisik
                    </h3>
                  </div>
                  <span className="text-xs bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-full font-medium">
                    Langkah 1 dari 3
                  </span>
                </div>

                {/* Nama Pemesan */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="font-semibold text-[#2C2926] text-xs sm:text-sm">
                      Nama Lengkap Pemesan / Calon Pengantin
                    </label>
                    <span className="text-[11px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md">
                      Wajib Diisi
                    </span>
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={(e) => handleChange('customerName', e.target.value)}
                    placeholder="Contoh: Anindya Larasati / Raditya Pratama"
                    className="w-full px-4 py-3 rounded-xl border border-[#D5C9B3] bg-white text-[#2C2926] text-sm focus:border-[#996515] focus:outline-hidden"
                  />
                  <p className="text-[11px] text-stone-500 mt-1">
                    Nama ini akan kami gunakan sebagai identitas utama pemegang surat pemesanan (PO).
                  </p>
                </div>

                {/* WhatsApp & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="font-semibold text-[#2C2926] text-xs sm:text-sm">
                        No. WhatsApp Aktif
                      </label>
                      <span className="text-[11px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md">
                        Wajib Diisi
                      </span>
                    </div>
                    <input
                      type="tel"
                      required
                      value={formData.customerPhone}
                      onChange={(e) => handleChange('customerPhone', e.target.value)}
                      placeholder="08123456789"
                      className="w-full px-4 py-3 rounded-xl border border-[#D5C9B3] bg-white text-[#2C2926] text-sm focus:border-[#996515] focus:outline-hidden"
                    />
                    <p className="text-[11px] text-stone-500 mt-1">
                      Untuk asistensi desain, revisi proofing, dan pengiriman resi.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="font-semibold text-[#2C2926] text-xs sm:text-sm">
                        Alamat Email
                      </label>
                      <span className="text-[11px] font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md">
                        Opsional
                      </span>
                    </div>
                    <input
                      type="email"
                      value={formData.customerEmail}
                      onChange={(e) => handleChange('customerEmail', e.target.value)}
                      placeholder="calonpengantin@gmail.com"
                      className="w-full px-4 py-3 rounded-xl border border-[#D5C9B3] bg-white text-[#2C2926] text-sm focus:border-[#996515] focus:outline-hidden"
                    />
                    <p className="text-[11px] text-stone-500 mt-1">
                      Untuk pengiriman berkas invoice resmi dan arsip softcopy.
                    </p>
                  </div>
                </div>

                {/* Alamat Pengiriman Fisik */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="font-semibold text-[#2C2926] text-xs sm:text-sm">
                      Alamat Lengkap Pengiriman Fisik Undangan
                    </label>
                    <span className="text-[11px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md">
                      Wajib Diisi
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    required
                    value={formData.shippingAddress}
                    onChange={(e) => handleChange('shippingAddress', e.target.value)}
                    placeholder="Sebutkan Jalan, Nomor Rumah, RT/RW, Kelurahan, Kecamatan, Kota/Kabupaten, Provinsi, dan Kode Pos..."
                    className="w-full px-4 py-3 rounded-xl border border-[#D5C9B3] bg-white text-[#2C2926] text-sm focus:border-[#996515] focus:outline-hidden"
                  />
                  <p className="text-[11px] text-stone-500 mt-1">
                    Pastikan detail nomor rumah dan patokan jelas agar paket hardcover fisik sampai dengan mulus.
                  </p>
                </div>

                {/* Pilihan Jasa Kirim & Kalkulator Ongkir */}
                <div className="bg-[#FAF6EC] border border-[#E9DFCE] rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#996515]" />
                      <label className="font-semibold text-[#2C2926] text-xs sm:text-sm">
                        Pilihan Jasa Ekspedisi / Kurir
                      </label>
                    </div>
                    <span className="text-[11px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md">
                      Wajib Diisi
                    </span>
                  </div>

                  <select
                    value={formData.shippingCourier}
                    onChange={(e) => handleChange('shippingCourier', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#D5C9B3] bg-white text-[#2C2926] text-sm focus:border-[#996515] focus:outline-hidden font-medium"
                  >
                    {courierOptions.map((courier) => (
                      <option key={courier.id} value={courier.id}>
                        {courier.name} {courier.ratePerKg > 0 ? `(Tarif est. Rp ${courier.ratePerKg.toLocaleString('id-ID')}/kg)` : ''}
                      </option>
                    ))}
                  </select>

                  {/* Live Weight & Courier Calculator Output */}
                  <div className="pt-2 border-t border-[#E8DEC9] grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-white p-3 rounded-xl border border-[#E5DAC6]">
                      <span className="text-stone-500 block text-[11px]">Kalkulasi Berat Paket:</span>
                      <span className="font-bold text-[#2C2926] text-sm flex items-center gap-1 mt-0.5">
                        <Package className="w-4 h-4 text-[#996515]" />
                        {formData.estimatedWeightKg}
                      </span>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-[#E5DAC6]">
                      <span className="text-stone-500 block text-[11px]">Estimasi Biaya Ongkir:</span>
                      <span className="font-bold text-[#996515] text-sm flex items-center gap-1 mt-0.5">
                        <Calculator className="w-4 h-4 text-[#996515]" />
                        {formData.estimatedShippingCost}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Step 1 Actions */}
                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-8 py-3.5 rounded-xl bg-[#996515] hover:bg-[#805310] text-white font-semibold text-sm flex items-center gap-2 shadow-md transition cursor-pointer"
                  >
                    <span>Lanjut ke Bagian 2 (Spesifikasi Undangan)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ========================================================
                BAGIAN 2: SPESIFIKASI UNDANGAN
            ======================================================== */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center justify-between border-b border-[#F0E6D5] pb-4">
                  <div className="flex items-center gap-2.5">
                    <Layers className="w-5 h-5 text-[#996515]" />
                    <h3 className="font-display text-2xl font-bold text-[#2C2926]">
                      Bagian 2: Spesifikasi Undangan Fisik
                    </h3>
                  </div>
                  <span className="text-xs bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-full font-medium">
                    Langkah 2 dari 3
                  </span>
                </div>

                {/* Pilihan Kategori / Tema Desain */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="font-semibold text-[#2C2926] text-xs sm:text-sm">
                      Pilihan Kategori / Tema Desain
                    </label>
                    <span className="text-[11px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md">
                      Wajib Diisi
                    </span>
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.designTheme}
                    onChange={(e) => handleChange('designTheme', e.target.value)}
                    placeholder="Contoh: Royal Astakona Gold / Seri Rustic Botanical"
                    className="w-full px-4 py-3 rounded-xl border border-[#D5C9B3] bg-white text-[#2C2926] text-sm focus:border-[#996515] focus:outline-hidden"
                  />
                  <p className="text-[11px] text-stone-500 mt-1">
                    Anda juga dapat menuliskan nama seri desain dari halaman Katalog kami.
                  </p>
                </div>

                {/* Jumlah Cetak / Eksemplar */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="font-semibold text-[#2C2926] text-xs sm:text-sm">
                      Jumlah Cetak / Eksemplar Undangan (pcs)
                    </label>
                    <span className="text-[11px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md">
                      Wajib Diisi
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min={50}
                      step={50}
                      required
                      value={formData.quantity}
                      onChange={(e) => handleChange('quantity', e.target.value)}
                      className="w-36 px-4 py-3 rounded-xl border border-[#D5C9B3] bg-white text-[#2C2926] text-sm font-bold focus:border-[#996515] focus:outline-hidden"
                    />
                    {/* Quick Preset Buttons */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                      {['150', '300', '500', '800', '1000'].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => handleChange('quantity', preset)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                            formData.quantity === preset
                              ? 'bg-[#996515] text-white'
                              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                          }`}
                        >
                          {preset} pcs
                        </button>
                      ))}
                    </div>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1">
                    Minimal pemesanan standar 100 pcs untuk softcover dan 150 pcs untuk hardcover.
                  </p>
                </div>

                {/* Pilihan Jenis Kertas */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="font-semibold text-[#2C2926] text-xs sm:text-sm">
                      Pilihan Jenis Kertas Fisik
                    </label>
                    <span className="text-[11px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md">
                      Wajib Diisi
                    </span>
                  </div>
                  <select
                    value={formData.paperType}
                    onChange={(e) => handleChange('paperType', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#D5C9B3] bg-white text-[#2C2926] text-sm focus:border-[#996515] focus:outline-hidden"
                  >
                    {paperOptions.map((paper, idx) => (
                      <option key={idx} value={paper}>
                        {paper}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Pilihan Finishing Tambahan */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="font-semibold text-[#2C2926] text-xs sm:text-sm">
                      Finishing Tambahan (Hotprint Foil, Emboss, Wax Seal)
                    </label>
                    <span className="text-[11px] font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md">
                      Opsional
                    </span>
                  </div>
                  <input
                    type="text"
                    value={formData.finishing}
                    onChange={(e) => handleChange('finishing', e.target.value)}
                    placeholder="Contoh: Hotprint Gold Foil 24K + Embos Timbul Monogram"
                    className="w-full px-4 py-3 rounded-xl border border-[#D5C9B3] bg-white text-[#2C2926] text-sm focus:border-[#996515] focus:outline-hidden"
                  />
                  <p className="text-[11px] text-stone-500 mt-1">
                    Pilihan populer: Foil Emas, Foil Rose Gold, Deboss 3D, Segel Lilin Wax Seal, Pita Sutra.
                  </p>
                </div>

                {/* Pilihan Laminasi */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="font-semibold text-[#2C2926] text-xs sm:text-sm">
                      Pilihan Laminasi Pelindung
                    </label>
                    <span className="text-[11px] font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md">
                      Opsional
                    </span>
                  </div>
                  <select
                    value={formData.lamination}
                    onChange={(e) => handleChange('lamination', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#D5C9B3] bg-white text-[#2C2926] text-sm focus:border-[#996515] focus:outline-hidden"
                  >
                    {laminationOptions.map((lam, idx) => (
                      <option key={idx} value={lam}>
                        {lam}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Step 2 Actions */}
                <div className="pt-4 flex items-center justify-between border-t border-[#F0E6D5]">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-6 py-3.5 rounded-xl border border-[#D5C9B3] text-[#4F4439] hover:bg-[#F9F5EE] font-semibold text-sm flex items-center gap-2 transition cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Kembali ke Bagian 1</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-8 py-3.5 rounded-xl bg-[#996515] hover:bg-[#805310] text-white font-semibold text-sm flex items-center gap-2 shadow-md transition cursor-pointer"
                  >
                    <span>Lanjut ke Bagian 3 (Detail Acara Cetak)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ========================================================
                BAGIAN 3: DETAIL ACARA UNTUK DICETAK
            ======================================================== */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center justify-between border-b border-[#F0E6D5] pb-4">
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-5 h-5 text-[#996515]" />
                    <h3 className="font-display text-2xl font-bold text-[#2C2926]">
                      Bagian 3: Detail Acara untuk Dicetak pada Undangan
                    </h3>
                  </div>
                  <span className="text-xs bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-full font-medium">
                    Langkah 3 dari 3
                  </span>
                </div>

                {/* Mempelai Pria */}
                <div className="bg-[#FAF7F0] p-5 rounded-2xl border border-[#E9DFCE] space-y-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#996515] block">
                    Data Mempelai Pria (Groom)
                  </span>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="font-semibold text-[#2C2926] text-xs sm:text-sm">
                        Nama Lengkap & Panggilan Mempelai Pria
                      </label>
                      <span className="text-[11px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md">
                        Wajib Diisi
                      </span>
                    </div>
                    <input
                      type="text"
                      required
                      value={formData.groomName}
                      onChange={(e) => handleChange('groomName', e.target.value)}
                      placeholder="Contoh: Raditya Pratama, S.T. (Panggilan: Radit)"
                      className="w-full px-4 py-3 rounded-xl border border-[#D5C9B3] bg-white text-[#2C2926] text-sm focus:border-[#996515] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="font-semibold text-[#2C2926] text-xs sm:text-sm">
                        Nama Kedua Orang Tua Mempelai Pria
                      </label>
                      <span className="text-[11px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md">
                        Wajib Diisi
                      </span>
                    </div>
                    <input
                      type="text"
                      required
                      value={formData.groomParents}
                      onChange={(e) => handleChange('groomParents', e.target.value)}
                      placeholder="Putra dari: Bapak Ir. Bambang Soediro & Ibu Hj. Ratna Juwita"
                      className="w-full px-4 py-3 rounded-xl border border-[#D5C9B3] bg-white text-[#2C2926] text-sm focus:border-[#996515] focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Mempelai Wanita */}
                <div className="bg-[#FAF7F0] p-5 rounded-2xl border border-[#E9DFCE] space-y-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#996515] block">
                    Data Mempelai Wanita (Bride)
                  </span>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="font-semibold text-[#2C2926] text-xs sm:text-sm">
                        Nama Lengkap & Panggilan Mempelai Wanita
                      </label>
                      <span className="text-[11px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md">
                        Wajib Diisi
                      </span>
                    </div>
                    <input
                      type="text"
                      required
                      value={formData.brideName}
                      onChange={(e) => handleChange('brideName', e.target.value)}
                      placeholder="Contoh: Anindya Larasati, M.Psi. (Panggilan: Anin)"
                      className="w-full px-4 py-3 rounded-xl border border-[#D5C9B3] bg-white text-[#2C2926] text-sm focus:border-[#996515] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="font-semibold text-[#2C2926] text-xs sm:text-sm">
                        Nama Kedua Orang Tua Mempelai Wanita
                      </label>
                      <span className="text-[11px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md">
                        Wajib Diisi
                      </span>
                    </div>
                    <input
                      type="text"
                      required
                      value={formData.brideParents}
                      onChange={(e) => handleChange('brideParents', e.target.value)}
                      placeholder="Putri dari: Bapak H. Dr. Hendra Wijaya & Ibu Dra. Siti Maryam"
                      className="w-full px-4 py-3 rounded-xl border border-[#D5C9B3] bg-white text-[#2C2926] text-sm focus:border-[#996515] focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Akad & Resepsi */}
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="font-semibold text-[#2C2926] text-xs sm:text-sm">
                        Tanggal, Waktu & Lokasi Akad Nikah / Pemberkatan
                      </label>
                      <span className="text-[11px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md">
                        Wajib Diisi
                      </span>
                    </div>
                    <textarea
                      rows={2}
                      required
                      value={formData.akadDateTimeLocation}
                      onChange={(e) => handleChange('akadDateTimeLocation', e.target.value)}
                      placeholder="Contoh: Sabtu, 24 Oktober 2026 | Pukul 08.00 WIB | Masjid Al-Azhar / Gereja Katedral Jakarta"
                      className="w-full px-4 py-3 rounded-xl border border-[#D5C9B3] bg-white text-[#2C2926] text-sm focus:border-[#996515] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="font-semibold text-[#2C2926] text-xs sm:text-sm">
                        Tanggal, Waktu & Lokasi Resepsi Pernikahan
                      </label>
                      <span className="text-[11px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md">
                        Wajib Diisi
                      </span>
                    </div>
                    <textarea
                      rows={2}
                      required
                      value={formData.resepsiDateTimeLocation}
                      onChange={(e) => handleChange('resepsiDateTimeLocation', e.target.value)}
                      placeholder="Contoh: Sabtu, 24 Oktober 2026 | Sesi 1: 11.00-13.00, Sesi 2: 13.00-15.00 WIB | Grand Ballroom Hotel Mulia Senayan"
                      className="w-full px-4 py-3 rounded-xl border border-[#D5C9B3] bg-white text-[#2C2926] text-sm focus:border-[#996515] focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Turut Mengundang, Maps Link, Catatan Khusus */}
                <div className="space-y-4 pt-2">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="font-semibold text-[#2C2926] text-xs sm:text-sm">
                        Kolom Turut Mengundang
                      </label>
                      <span className="text-[11px] font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md">
                        Opsional
                      </span>
                    </div>
                    <input
                      type="text"
                      value={formData.turutMengundang}
                      onChange={(e) => handleChange('turutMengundang', e.target.value)}
                      placeholder="Daftar nama sesepuh / kakek nenek / keluarga besar yang turut mengundang"
                      className="w-full px-4 py-3 rounded-xl border border-[#D5C9B3] bg-white text-[#2C2926] text-sm focus:border-[#996515] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="font-semibold text-[#2C2926] text-xs sm:text-sm">
                        Tautan Google Maps / Panduan QR Lokasi
                      </label>
                      <span className="text-[11px] font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md">
                        Opsional
                      </span>
                    </div>
                    <input
                      type="url"
                      value={formData.mapsLink}
                      onChange={(e) => handleChange('mapsLink', e.target.value)}
                      placeholder="https://maps.app.goo.gl/..."
                      className="w-full px-4 py-3 rounded-xl border border-[#D5C9B3] bg-white text-[#2C2926] text-sm focus:border-[#996515] focus:outline-hidden"
                    />
                    <p className="text-[11px] text-stone-500 mt-1">
                      Link ini akan kami generate secara otomatis menjadi barcode QR Code elegan pada cetakan undangan fisik.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="font-semibold text-[#2C2926] text-xs sm:text-sm">
                        Catatan Khusus Acara / Request Tambahan
                      </label>
                      <span className="text-[11px] font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md">
                        Opsional
                      </span>
                    </div>
                    <textarea
                      rows={2}
                      value={formData.specialNotes}
                      onChange={(e) => handleChange('specialNotes', e.target.value)}
                      placeholder="Contoh: Dresscode Earth Tone, penambahan ayat suci Al-Qur'an Ar-Rum 21 / 1 Korintus 13, permohonan tanpa amplop fisik, dll."
                      className="w-full px-4 py-3 rounded-xl border border-[#D5C9B3] bg-white text-[#2C2926] text-sm focus:border-[#996515] focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Step 3 Actions */}
                <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#F0E6D5]">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-[#D5C9B3] text-[#4F4439] hover:bg-[#F9F5EE] font-semibold text-sm flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Kembali ke Bagian 2</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-10 py-4 rounded-xl bg-gradient-to-r from-[#996515] via-[#B8860B] to-[#996515] hover:opacity-95 text-white font-bold text-sm tracking-wide shadow-lg shadow-[#996515]/30 flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Menyimpan ke Database Firebase...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Kirim Pemesanan & Dapatkan Rekap Desain</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            )}

          </form>
        </div>

        {/* Right Sticky Order Summary Card */}
        <div className="lg:col-span-4 sticky top-28 space-y-6">
          <div className="bg-[#FAF6EC] border border-[#E8DEC9] rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E9DFCE]">
              <Sparkles className="w-4 h-4 text-[#996515]" />
              <h4 className="font-display text-lg font-bold text-[#2C2926]">
                Ringkasan Pemesanan
              </h4>
            </div>

            <div className="space-y-3 text-xs text-[#524538]">
              <div>
                <span className="text-stone-500 block">Tema Desain:</span>
                <span className="font-bold text-[#2C2926] line-clamp-1">{formData.designTheme}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-stone-500">Jumlah Cetak:</span>
                <span className="font-bold text-[#2C2926]">{formData.quantity} pcs</span>
              </div>

              <div>
                <span className="text-stone-500 block">Jenis Kertas:</span>
                <span className="font-bold text-[#2C2926] line-clamp-1">{formData.paperType}</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#EAE0D0]">
                <span className="text-stone-500">Estimasi Berat:</span>
                <span className="font-bold text-[#2C2926]">{formData.estimatedWeightKg}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-stone-500">Ongkos Kirim:</span>
                <span className="font-bold text-[#996515]">{formData.estimatedShippingCost}</span>
              </div>

              <div className="pt-3 border-t border-[#EAE0D0] flex items-baseline justify-between">
                <span className="text-xs font-bold text-[#2C2926]">Total Estimasi Biaya:</span>
                <span className="font-display text-xl font-bold text-[#996515]">
                  {formData.totalEstimatedPrice}
                </span>
              </div>
            </div>

            {/* Reassurance points */}
            <div className="mt-5 pt-4 border-t border-[#EAE0D0] space-y-2 text-[11px] text-[#695B4E]">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#996515] shrink-0" />
                <span>Revisi teks & layout tak terbatas hingga ACC</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#996515] shrink-0" />
                <span>Garansi 100% cetak ulang fisik jika cacat</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-[#996515] shrink-0" />
                <span>Packing kayu & anti basah ke luar pulau</span>
              </div>
            </div>
          </div>

          {/* Quick Help Box */}
          <div className="bg-white border border-[#E8DEC9] rounded-2xl p-5 text-center text-xs space-y-2">
            <p className="font-semibold text-[#2C2926]">Butuh Bantuan Saat Mengisi?</p>
            <p className="text-stone-500 text-[11px]">
              Hubungi WhatsApp kami untuk konsultasi panduan pengisian gelar adat & penulisan nama orang tua.
            </p>
            <a
              href={`https://wa.me/${config.whatsappNumber}?text=Halo%20Dheluwang,%20saya%20sedang%20mengisi%20Data%20Form%20dan%20ingin%20bertanya`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block pt-1 text-[#996515] font-bold hover:underline"
            >
              Chat WhatsApp Bantuan →
            </a>
          </div>
        </div>

      </div>

      {/* CONFIRMATION & SUCCESS POPUP MODAL */}
      {isConfirmedModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#FDFCF7] border border-[#D5C9B3] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            
            <div className="w-14 h-14 bg-[#F5EEDF] text-[#996515] rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
              <Check className="w-8 h-8" />
            </div>

            <div className="text-center mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#996515] bg-[#F7F2E7] px-3 py-1 rounded-full">
                Pemesanan Berhasil Tersimpan di Database Firebase!
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#2C2926] mt-2">
                Selamat, Data Anda Telah Diterima
              </h3>
              <p className="text-xs sm:text-sm text-[#635546] mt-2">
                ID Pesanan Anda: <strong className="font-mono text-[#996515] font-bold">#{submittedOrderId}</strong>
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#EAE2D2] text-xs text-[#524436] space-y-2 mb-6">
              <p><strong>Nama Pemesan:</strong> {formData.customerName}</p>
              <p><strong>Tema Desain:</strong> {formData.designTheme}</p>
              <p><strong>Jumlah:</strong> {formData.quantity} pcs</p>
              <p><strong>Total Estimasi:</strong> <span className="text-[#996515] font-bold">{formData.totalEstimatedPrice}</span></p>
            </div>

            {/* Action buttons */}
            <div className="space-y-3">
              <button
                onClick={handleSendToWhatsApp}
                className="w-full py-4 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
              >
                <span>Kirim Salinan Pesanan ke WhatsApp Admin</span>
              </button>

              <button
                onClick={() => {
                  setIsConfirmedModalOpen(false);
                  setCurrentStep(1);
                }}
                className="w-full py-3 px-4 rounded-xl border border-stone-300 text-stone-700 font-semibold text-xs transition hover:bg-stone-100 cursor-pointer"
              >
                Tutup Jendela & Selesai
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
