import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, Clock, CheckCircle } from 'lucide-react';
import { SiteConfig } from '../types';

interface InteractiveWhatsAppButtonProps {
  config: SiteConfig;
}

export const InteractiveWhatsAppButton: React.FC<InteractiveWhatsAppButtonProps> = ({ config }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const quickQuestions = [
    {
      label: '✨ Cek Estimasi Harga & Minimal Order',
      msg: 'Halo Dheluwang Undangan, saya ingin tanya estimasi harga dan minimal pemesanan untuk undangan fisik.'
    },
    {
      label: '🎨 Konsultasi Desain & Bahan Kertas Custom',
      msg: 'Halo Dheluwang, saya ingin konsultasi desain undangan custom dan pilihan bahan kertas (cotton/linen/foil).'
    },
    {
      label: '📦 Cara Memesan Sample Proofing Fisik',
      msg: 'Halo Dheluwang, apakah saya bisa memesan Sample Kit fisik sebelum cetak masal?'
    },
    {
      label: '⚡ Cek Antrean Jadwal Pengerjaan Terdekat',
      msg: 'Halo Admin Dheluwang, saya ingin cek ketersediaan slot produksi undangan untuk bulan ini.'
    }
  ];

  const handleSend = (text: string) => {
    const encoded = encodeURIComponent(text);
    const url = `https://wa.me/${config.whatsappNumber}?text=${encoded}`;
    window.open(url, '_blank');
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;
    handleSend(customMsg.trim());
    setCustomMsg('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Interactive Chat Popup Card */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-white border border-[#E8DEC9] rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="bg-[#2C2926] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#FAF4E6] text-[#996515] flex items-center justify-center font-display font-bold">
                  DU
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#25D366] border-2 border-[#2C2926] rounded-full"></span>
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-[#F3E5AB]">
                  Dheluwang Customer Care
                </h4>
                <p className="text-[10px] text-stone-300 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#25D366]" />
                  <span>Online • Balas Cepat ({config.operatingHoursWeekday})</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-stone-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-[#FBF9F5] space-y-3 max-h-80 overflow-y-auto text-xs">
            {/* Bot Greeting Bubble */}
            <div className="bg-white p-3.5 rounded-2xl rounded-tl-xs border border-[#EAE2D2] shadow-xs space-y-1.5 text-[#3D342B]">
              <p className="font-medium">
                Selamat datang calon pengantin! 👋
              </p>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                Ada yang bisa kami bantu seputar spesifikasi fisik, bahan kertas katun, foil emas, atau estimasi waktu pengerjaan undangan Anda?
              </p>
            </div>

            {/* Quick Option Buttons */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block px-1">
                Pilih Topik Konsultasi Cepat:
              </span>
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    handleSend(q.msg);
                    setIsOpen(false);
                  }}
                  className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-[#F5EEDF] border border-[#E8DEC9] text-[#2C2926] hover:text-[#996515] text-[11px] font-medium transition cursor-pointer shadow-2xs flex items-center justify-between group"
                >
                  <span>{q.label}</span>
                  <span className="text-[#996515] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Message Input Footer */}
          <form onSubmit={handleCustomSubmit} className="p-3 bg-white border-t border-[#EAE2D2] flex items-center gap-2">
            <input
              type="text"
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              placeholder="Ketik pertanyaan Anda..."
              className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:outline-hidden focus:border-[#996515]"
            />
            <button
              type="submit"
              className="p-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl shadow-xs transition cursor-pointer"
              title="Kirim ke WhatsApp"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 px-4 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-xl hover:shadow-2xl transition-all cursor-pointer transform hover:scale-105 active:scale-95"
        aria-label="Konsultasi WhatsApp"
      >
        {/* Pulsing Aura */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-600 border border-white"></span>
        </span>

        <MessageCircle className="w-6 h-6 fill-current text-white shrink-0" />
        <span className="text-xs font-bold tracking-wide hidden sm:inline">
          Konsultasi WhatsApp
        </span>
      </button>

    </div>
  );
};
