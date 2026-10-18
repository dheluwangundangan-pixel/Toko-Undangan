import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  Smartphone, 
  MessageCircle, 
  Sparkles, 
  CheckCircle, 
  Share2, 
  Copy, 
  Check,
  AlertCircle
} from 'lucide-react';
import { DigitalTheme, SiteConfig } from '../types';

interface DigitalLivePreviewModalProps {
  isOpen: boolean;
  theme: DigitalTheme | null;
  config: SiteConfig;
  onClose: () => void;
  onOrderViaWhatsApp: (theme: DigitalTheme) => void;
}

export const DigitalLivePreviewModal: React.FC<DigitalLivePreviewModalProps> = ({
  isOpen,
  theme,
  config,
  onClose,
  onOrderViaWhatsApp
}) => {
  const [copied, setCopied] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  if (!isOpen || !theme) return null;

  const handleCopyLink = () => {
    if (theme.previewUrl) {
      navigator.clipboard.writeText(theme.previewUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleOpenExternal = () => {
    if (theme.previewUrl) {
      window.open(theme.previewUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#1C1A18] rounded-3xl border border-stone-800 shadow-2xl overflow-hidden my-4 flex flex-col max-h-[92vh]">
        
        {/* Top Control Bar */}
        <div className="px-4 sm:px-6 py-4 bg-[#262320] border-b border-stone-800 flex flex-wrap items-center justify-between gap-3 text-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#996515] flex items-center justify-center text-white shadow-xs">
              <Smartphone className="w-5 h-5 text-[#FFDF73]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-sm sm:text-base font-bold text-white tracking-wide">
                  {theme.name}
                </h3>
                {theme.badge && (
                  <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-[#996515]/30 text-[#FFDF73] text-[10px] font-bold border border-[#996515]/50 uppercase">
                    {theme.badge}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-stone-400">
                {theme.category} • {theme.price}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {theme.previewUrl && (
              <>
                <button
                  onClick={handleCopyLink}
                  title="Salin Link Preview"
                  className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium transition flex items-center gap-1.5 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span className="hidden md:inline">{copied ? 'Tersalin' : 'Salin Link'}</span>
                </button>

                <button
                  onClick={handleOpenExternal}
                  className="px-4 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border border-stone-700"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#FFDF73]" />
                  <span>Buka di Tab Baru</span>
                </button>
              </>
            )}

            <button
              onClick={() => onOrderViaWhatsApp(theme)}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:opacity-90 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Pesan Tema Ini</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white transition cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Phone Mockup Container */}
        <div className="flex-1 bg-[#121110] p-4 sm:p-6 flex flex-col md:flex-row items-center justify-center gap-8 overflow-y-auto">
          
          {/* Simulated Smartphone Frame */}
          <div className="relative w-[320px] sm:w-[360px] h-[640px] bg-black rounded-[48px] p-3 shadow-2xl border-4 border-stone-700 ring-1 ring-stone-900 shrink-0 flex flex-col">
            
            {/* Phone Speaker & Dynamic Island Notch */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-20 flex items-center justify-center">
              <div className="w-10 h-1 bg-stone-800 rounded-full"></div>
            </div>

            {/* Phone Screen Area */}
            <div className="w-full h-full bg-white rounded-[38px] overflow-hidden flex flex-col relative">
              
              {/* Phone Status Bar */}
              <div className="h-7 bg-stone-900 text-white text-[10px] px-6 flex items-center justify-between z-10 shrink-0">
                <span className="font-semibold">09:41</span>
                <div className="flex items-center gap-1 text-[9px]">
                  <span>5G</span>
                  <span>100%</span>
                </div>
              </div>

              {/* URL address bar mockup */}
              <div className="bg-stone-100 px-3 py-1.5 border-b border-stone-200 flex items-center gap-1.5 text-[10px] text-stone-600 shrink-0">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="truncate flex-1 font-mono text-[9px]">
                  {theme.previewUrl || 'https://dheluwang.com/undangan-digital'}
                </span>
                <ExternalLink className="w-3 h-3 text-stone-400 shrink-0 cursor-pointer" onClick={handleOpenExternal} />
              </div>

              {/* Screen Content: iFrame or Fallback */}
              <div className="flex-1 w-full h-full relative bg-stone-100 flex flex-col">
                {theme.previewUrl ? (
                  <>
                    <iframe
                      src={theme.previewUrl}
                      title={`Preview ${theme.name}`}
                      className="w-full h-full border-none"
                      onError={() => setIframeError(true)}
                    />

                    {/* Bottom floating helper banner in smartphone */}
                    <div className="absolute bottom-3 left-3 right-3 bg-black/85 backdrop-blur-md rounded-2xl p-2.5 text-white text-center shadow-lg border border-white/10 z-10">
                      <p className="text-[10px] text-stone-300 mb-1">
                        Tampilan interaktif undangan digital
                      </p>
                      <button
                        onClick={handleOpenExternal}
                        className="w-full py-1.5 rounded-xl bg-[#996515] hover:bg-[#805310] text-white text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Buka Layar Penuh di Tab Baru</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4">
                    <img
                      src={theme.previewThumbnail}
                      alt={theme.name}
                      className="w-full h-56 object-cover rounded-2xl shadow-md"
                    />
                    <div>
                      <h4 className="font-display font-bold text-stone-900 text-sm">
                        {theme.name}
                      </h4>
                      <p className="text-xs text-stone-500 mt-1">
                        {theme.description}
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-[11px] flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Pemilik web dapat memasukkan link website preview pada menu Edit Tema.</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Phone Home Indicator */}
              <div className="h-4 bg-black flex items-center justify-center shrink-0">
                <div className="w-24 h-1 bg-white/40 rounded-full"></div>
              </div>

            </div>
          </div>

          {/* Side Info & Specifications Panel */}
          <div className="max-w-md w-full space-y-5 text-stone-200">
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-[#996515]/30 text-[#FFDF73] text-xs font-bold border border-[#996515]/50 uppercase tracking-widest inline-block">
                Spesifikasi & Keunggulan
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                {theme.name}
              </h2>
              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                {theme.description}
              </p>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-stone-400 block uppercase tracking-wider">
                  Harga Promo Eksklusif
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[#FFDF73]">
                    {theme.price}
                  </span>
                  {theme.originalPrice && (
                    <span className="text-xs line-through text-stone-500">
                      {theme.originalPrice}
                    </span>
                  )}
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                Hemat s/d 40%
              </span>
            </div>

            {/* Feature Checklist */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
                Fitur Lengkap Tema Ini:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-300">
                {theme.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#FFDF73] shrink-0" />
                    <span className="truncate">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Primary Order CTA */}
            <div className="pt-2 space-y-2">
              <button
                onClick={() => onOrderViaWhatsApp(theme)}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20ba59] hover:to-[#0f776a] text-white font-bold text-xs uppercase tracking-wider shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Pesan Tema Ini via WhatsApp Sekarang</span>
              </button>

              {theme.previewUrl && (
                <button
                  onClick={handleOpenExternal}
                  className="w-full py-3 px-6 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer border border-white/10"
                >
                  <ExternalLink className="w-4 h-4 text-[#FFDF73]" />
                  <span>Buka di Browser / Tab Penuh</span>
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
