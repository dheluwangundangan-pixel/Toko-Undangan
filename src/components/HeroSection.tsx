import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, HeartHandshake, Award, CheckCircle2 } from 'lucide-react';
import { SiteConfig } from '../types';

interface HeroSectionProps {
  config: SiteConfig;
  onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ config, onNavigate }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-[#EBE4D5]/60 bg-gradient-to-b from-[#F9F6EE] via-[#FDFCF7] to-[#F7F3E9]">
      {/* Background Subtle Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#EADBBA]/30 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copywriting & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Elegant Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F2E8D3] border border-[#DDC9A5] text-[#7A5210] text-xs font-semibold tracking-wider uppercase shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
              <span>{config.heroBadge}</span>
            </div>

            {/* Headline yang memikat */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#231F1C] leading-[1.12]">
              {config.heroHeadline}
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-[#554C43] leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              {config.heroSubheadline}
            </p>

            {/* CTA Buttons Utama */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => onNavigate('data-form')}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-gradient-to-r from-[#996515] to-[#B8860B] hover:from-[#85530D] hover:to-[#9E7108] text-white font-semibold text-base shadow-lg shadow-[#996515]/20 hover:shadow-xl transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
              >
                <span>Isi Formulir Pemesanan</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('katalog')}
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white border border-[#D5C9B3] hover:border-[#996515] text-[#42382E] hover:text-[#996515] font-semibold text-base shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Lihat Katalog & Spesifikasi</span>
              </button>
            </div>

            {/* Key Value Points */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-[#5E5245] font-medium border-t border-[#EBE4D5]/70">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#996515] shrink-0" />
                <span>Bahan Kertas Impor & Katun</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#996515] shrink-0" />
                <span>Foil Emas 24K & Emboss 3D</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#996515] shrink-0" />
                <span>Revisi Desain Fleksibel</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Mockup Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Visual Image Card */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white group">
                <img
                  src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1000&q=85"
                  alt="Dheluwang Undangan Pernikahan Fisik Elegan"
                  className="w-full h-[430px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#F3E5AB]">
                    Koleksi Mahakarya 2026
                  </span>
                  <h3 className="font-display text-2xl font-bold mt-1 text-white">
                    Royal Hardcover Gold Stamped
                  </h3>
                  <p className="text-xs text-white/90 mt-1 line-clamp-2">
                    Sentuhan kertas beludru soft touch dengan pantulan foil emas murni dan segel lilin wax seal personal.
                  </p>
                </div>
              </div>

              {/* Floating Testimonial / Assurance Pill */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white rounded-2xl p-4 shadow-xl border border-[#E8DEC9] flex items-center gap-3.5 max-w-xs animate-bounce-slow">
                <div className="w-10 h-10 rounded-full bg-[#F6EEDC] text-[#996515] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-1 text-amber-500 text-xs">
                    {'★'.repeat(5)}
                    <span className="text-slate-800 font-bold ml-1">5.0</span>
                  </div>
                  <p className="text-xs font-semibold text-[#2C2926]">1.500+ Calon Pengantin Puas</p>
                  <p className="text-[11px] text-[#7A6E63]">Garansi cetak ulang & tepat waktu</p>
                </div>
              </div>

              {/* Floating Free Sample Proofing Badge */}
              <div className="absolute -top-4 -right-2 sm:-right-4 bg-[#2C2926] text-[#F3E5AB] rounded-xl px-4 py-2.5 shadow-lg border border-[#D4AF37]/40 text-xs font-medium flex items-center gap-2">
                <Award className="w-4 h-4 text-[#D4AF37]" />
                <span>Free Sample Proofing Fisik</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
