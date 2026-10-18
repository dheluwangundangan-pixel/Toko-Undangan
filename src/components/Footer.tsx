import React from 'react';
import { Sparkles, Phone, Mail, MapPin, Heart, ShieldCheck } from 'lucide-react';
import { SiteConfig } from '../types';

interface FooterProps {
  config: SiteConfig;
  onNavigate: (sectionId: string) => void;
  onOpenConfig: () => void;
}

export const Footer: React.FC<FooterProps> = ({ config, onNavigate, onOpenConfig }) => {
  return (
    <footer className="bg-[#231F1C] text-[#E8DCC4] border-t border-[#3D352D] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#996515] to-[#D4AF37] p-0.5">
                <div className="w-full h-full rounded-full bg-[#231F1C] flex items-center justify-center text-[#D4AF37] font-display font-bold">
                  DU
                </div>
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-white tracking-wide">
                  {config.brandName}
                </h3>
                <p className="text-[10px] tracking-widest uppercase text-[#A39281]">
                  {config.tagline}
                </p>
              </div>
            </div>

            <p className="text-xs text-[#BCB0A2] leading-relaxed max-w-sm">
              Produsen cetak undangan pernikahan fisik elegan, unik, dan berkualitas tinggi. Menghadirkan sentuhan kertas katun bertekstur, kilau hotprint emas 24K murni, dan segel lilin wax seal untuk para calon pengantin terhormat.
            </p>

            <div className="pt-2 text-xs text-[#D4AF37] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>Garansi 100% Cetak Ulang & Tepat Waktu</span>
            </div>
          </div>

          {/* Navigasi Cepat */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="font-display text-base font-bold text-white uppercase tracking-wider text-[#F3E5AB]">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('beranda')}
                  className="hover:text-[#D4AF37] transition cursor-pointer"
                >
                  Beranda & Filosofi
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('galeri')}
                  className="hover:text-[#D4AF37] transition cursor-pointer"
                >
                  Galeri Foto Dokumentasi Fisik
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('katalog')}
                  className="hover:text-[#D4AF37] transition cursor-pointer"
                >
                  Katalog & Spesifikasi Bahan
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('kontak')}
                  className="hover:text-[#D4AF37] transition cursor-pointer"
                >
                  Kontak Studio & Jam Pelayanan
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-[#D4AF37] transition cursor-pointer"
                >
                  FAQ & Estimasi Pengerjaan
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('data-form')}
                  className="text-[#D4AF37] font-semibold hover:underline cursor-pointer"
                >
                  Formulir Pemesanan (Data Form) →
                </button>
              </li>
            </ul>
          </div>

          {/* Jam Pelayanan & Kontak */}
          <div className="lg:col-span-4 space-y-3 text-xs">
            <h4 className="font-display text-base font-bold text-white uppercase tracking-wider text-[#F3E5AB]">
              Hubungi Kami
            </h4>
            
            <div className="space-y-2 text-[#C4B7A7]">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>{config.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>WhatsApp: {config.whatsappDisplay}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Email: {config.email}</span>
              </p>
              <p className="text-[11px] text-[#8C7C6D] pt-1">
                {config.operatingHoursWeekday} • {config.operatingHoursWeekend}
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenConfig}
                className="text-[11px] text-[#A69786] hover:text-white underline cursor-pointer"
              >
                Buka Konfigurasi & Panduan Pemilik Web
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C7D6E] gap-4">
          <p>© 2026 {config.brandName}. Hak Cipta Dilindungi Undang-Undang.</p>
          <p className="flex items-center gap-1.5">
            Dibuat dengan sepenuh hati untuk pernikahan impian Indonesia
          </p>
        </div>

      </div>
    </footer>
  );
};
