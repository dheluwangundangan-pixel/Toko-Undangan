import React, { useState } from 'react';
import { 
  Phone, 
  Clock, 
  MapPin, 
  Mail, 
  AlertCircle, 
  Send, 
  Sparkles, 
  MessageSquare, 
  ShieldCheck,
  Check
} from 'lucide-react';
import { SiteConfig } from '../types';

interface ContactSectionProps {
  config: SiteConfig;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ config }) => {
  const [senderName, setSenderName] = useState('');
  const [weddingDate, setWeddingDate] = useState('');
  const [estimatedQty, setEstimatedQty] = useState('300');
  const [inquiryText, setInquiryText] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim()) return;

    const message = `Halo Dheluwang Undangan, perkenalkan saya *${senderName}*.\n` +
      `Rencana Tanggal Pernikahan: *${weddingDate || 'Masih diskusi'}*\n` +
      `Estimasi Jumlah Undangan: *${estimatedQty} pcs*\n` +
      `Pesan/Pertanyaan: ${inquiryText || 'Ingin konsultasi seputar bahan dan desain undangan fisik.'}`;

    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/${config.whatsappNumber}?text=${encoded}`;
    
    setSentSuccess(true);
    setTimeout(() => {
      window.open(waUrl, '_blank');
      setSentSuccess(false);
    }, 600);
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5EEDF] text-[#996515] text-xs font-semibold mb-2">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Layanan Konsultasi Personal</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C2926]">
          Hubungi Tim Dheluwang Undangan
        </h2>
        <p className="text-sm sm:text-base text-[#615549] mt-3">
          Kami siap mendengarkan rencana hari bahagia Anda dan memberikan solusi terbaik untuk undangan pernikahan fisik yang Anda impikan.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Contact Cards, Operational Hours & Notes */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* WhatsApp Direct Card */}
          <div className="bg-gradient-to-br from-[#2C2926] to-[#3B352E] text-white rounded-3xl p-7 shadow-lg border border-[#D4AF37]/30">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                Hotline Konsultasi Cepat
              </span>
              <div className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
            </div>

            <h3 className="font-display text-2xl font-bold text-white mb-1">
              WhatsApp Customer Care
            </h3>
            <p className="text-xl font-mono text-[#F3E5AB] font-bold mb-4">
              {config.whatsappDisplay}
            </p>
            <p className="text-xs text-[#D8CFBF] leading-relaxed mb-6">
              Respon cepat untuk tanya harga, cek antrean produksi, permintaan sample kit fisik, dan konsultasi desain custom.
            </p>

            <a
              href={`https://wa.me/${config.whatsappNumber}?text=Halo%20Dheluwang%20Undangan,%20saya%20ingin%20konsultasi%20pembuatan%20undangan%20fisik`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition"
            >
              <Phone className="w-4 h-4" />
              Chat WhatsApp Sekarang
            </a>
          </div>

          {/* Jam Pelayanan Card */}
          <div className="bg-white border border-[#E8DEC9] rounded-3xl p-6 shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#F6F0E2] text-[#996515] flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display text-lg font-bold text-[#2C2926]">
                  Jam Pelayanan & Fast Response
                </h4>
                <p className="text-xs text-stone-500">Waktu Indonesia Barat (WIB)</p>
              </div>
            </div>

            <div className="space-y-3 text-xs border-t border-[#F1E8DA] pt-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-[#5B5044]">Hari Kerja (Weekday):</span>
                <span className="font-bold text-[#2C2926] bg-[#FAF5EB] px-2.5 py-1 rounded-md">
                  {config.operatingHoursWeekday}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-[#5B5044]">Akhir Pekan (Weekend):</span>
                <span className="font-bold text-[#2C2926] bg-[#FAF5EB] px-2.5 py-1 rounded-md">
                  {config.operatingHoursWeekend}
                </span>
              </div>
              <p className="text-[11px] text-stone-500 pt-1 italic">
                *Pesan di luar jam kerja tetap dapat dikirimkan dan akan dibalas pada prioritas pertama di pagi hari.
              </p>
            </div>
          </div>

          {/* Lokasi Studio & Workshop */}
          <div className="bg-white border border-[#E8DEC9] rounded-3xl p-6 shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#F6F0E2] text-[#996515] flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display text-lg font-bold text-[#2C2926]">
                  Studio & Workshop
                </h4>
                <p className="text-xs text-stone-500">Kunjungan fisik dengan reservasi</p>
              </div>
            </div>

            <p className="text-xs text-[#52463B] leading-relaxed mb-4">
              {config.address}
            </p>

            <div className="flex items-center gap-2 text-xs text-[#827466]">
              <Mail className="w-4 h-4 text-[#996515]" />
              <span>{config.email}</span>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-[#FAF6EC] border border-[#EADBB8] rounded-2xl p-5 text-xs text-[#5A4E3F] space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#996515]">
              <AlertCircle className="w-4 h-4" />
              <span>Catatan Penting Pelayanan (Note):</span>
            </div>
            <ul className="list-disc pl-5 space-y-1.5 text-[11px] leading-relaxed">
              <li>Semua konsultasi awal dan penaksiran estimasi biaya bersifat <strong>100% GRATIS</strong> tanpa ikatan.</li>
              <li>Untuk pertemuan langsung di Studio Dheluwang, mohon membuat janji minimal H-1 agar desainer kami dapat menyiapkan sampel fisik sesuai tema yang Anda minati.</li>
              <li>Pengiriman sample kit fisik dapat dikirimkan ke seluruh kota di Indonesia melalui ekspedisi kilat 1-2 hari sampai.</li>
            </ul>
          </div>

        </div>

        {/* Right Column: Direct Quick Inquiry Form */}
        <div className="lg:col-span-7 bg-white border border-[#E8DEC9] rounded-3xl p-7 sm:p-10 shadow-md">
          <div className="flex items-center gap-2.5 mb-2">
            <Sparkles className="w-5 h-5 text-[#996515]" />
            <h3 className="font-display text-2xl font-bold text-[#2C2926]">
              Kirim Pesan Konsultasi Kilat
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#665A4C] mb-8">
            Isi formulir singkat di bawah ini untuk langsung terhubung dengan tim spesialis undangan Dheluwang via WhatsApp.
          </p>

          <form onSubmit={handleSendInquiry} className="space-y-4 text-xs">
            
            <div>
              <label className="block font-semibold text-[#2C2926] mb-1.5">
                Nama Anda / Calon Mempelai <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Contoh: Sarah & Dimas"
                className="w-full px-4 py-3 rounded-xl border border-[#D5C9B3] bg-white text-[#2C2926] focus:border-[#996515] focus:outline-hidden text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-[#2C2926] mb-1.5">
                  Rencana Tanggal Acara Pernikahan
                </label>
                <input
                  type="date"
                  value={weddingDate}
                  onChange={(e) => setWeddingDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#D5C9B3] bg-white text-[#2C2926] focus:border-[#996515] focus:outline-hidden text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#2C2926] mb-1.5">
                  Perkiraan Kuantitas Undangan (pcs)
                </label>
                <select
                  value={estimatedQty}
                  onChange={(e) => setEstimatedQty(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#D5C9B3] bg-white text-[#2C2926] focus:border-[#996515] focus:outline-hidden text-sm"
                >
                  <option value="100 - 200">100 - 200 pcs (Intimate Wedding)</option>
                  <option value="300 - 500">300 - 500 pcs (Paling Populer)</option>
                  <option value="500 - 800">500 - 800 pcs</option>
                  <option value="1000+">1000+ pcs (Grand Ballroom)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#2C2926] mb-1.5">
                Pesan / Pertanyaan / Konsep yang Diinginkan
              </label>
              <textarea
                rows={4}
                value={inquiryText}
                onChange={(e) => setInquiryText(e.target.value)}
                placeholder="Ceritakan detail tema, bahan yang diminati (misal: hardcover beludru, kertas katun sobek, atau gold foil), atau pertanyaan seputar waktu pengerjaan..."
                className="w-full px-4 py-3 rounded-xl border border-[#D5C9B3] bg-white text-[#2C2926] focus:border-[#996515] focus:outline-hidden text-sm"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#996515] to-[#B8860B] hover:from-[#805310] hover:to-[#996515] text-white font-bold text-sm tracking-wide shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                {sentSuccess ? (
                  <>
                    <Check className="w-5 h-5 text-white" />
                    <span>Membuka WhatsApp...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Kirim & Mulai Konsultasi WhatsApp</span>
                  </>
                )}
              </button>
            </div>

            <div className="pt-4 flex items-center justify-center gap-2 text-stone-500 text-[11px]">
              <ShieldCheck className="w-4 h-4 text-[#996515]" />
              <span>Data Anda terjaga aman dan hanya digunakan untuk keperluan konsultasi.</span>
            </div>

          </form>

        </div>

      </div>

    </div>
  );
};
