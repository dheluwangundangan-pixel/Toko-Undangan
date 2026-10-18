import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Heart, 
  Calendar, 
  Clock, 
  MapPin, 
  ExternalLink, 
  Copy, 
  Check, 
  Volume2, 
  VolumeX, 
  Send, 
  Gift, 
  Users, 
  Sparkles, 
  Instagram, 
  MailOpen,
  ChevronDown
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DigitalInvitationData, DigitalWish, DigitalTheme } from '../types';

interface DigitalInvitationViewProps {
  data: DigitalInvitationData;
  theme?: DigitalTheme;
  wishes: DigitalWish[];
  onAddWish: (wish: Omit<DigitalWish, 'id' | 'createdAt'>) => void;
  onClose: () => void;
  onOpenEditor?: () => void;
  isStandalone?: boolean;
}

// Sub-component for Slow Zoom In & Out on Scroll
const ScrollZoomSection: React.FC<{
  id?: string;
  className?: string;
  children: React.ReactNode;
}> = ({ id, className = '', children }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      id={id}
      className={`${className} transform transition-all duration-1000 ease-out will-change-transform ${
        isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-92 opacity-35 translate-y-4'
      }`}
    >
      {children}
    </div>
  );
};

export const DigitalInvitationView: React.FC<DigitalInvitationViewProps> = ({
  data,
  theme,
  wishes,
  onAddWish,
  onClose,
  onOpenEditor,
  isStandalone = false
}) => {
  // Slide-up Cover Animation State
  const [isCoverSlideUp, setIsCoverSlideUp] = useState(false);
  const [isCoverFullyGone, setIsCoverFullyGone] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Active guest name
  const [guestName, setGuestName] = useState(data.guestName || 'Bapak/Ibu/Saudara/i Terhormat');

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Lightbox modal for gallery
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null);

  // Copy notification state
  const [copiedBankId, setCopiedBankId] = useState<string | null>(null);
  const [copiedAddress, setCopiedAddress] = useState(false);

  // Wishes Form state
  const [wishName, setWishName] = useState('');
  const [wishAttendance, setWishAttendance] = useState<'hadir' | 'tidak' | 'ragu'>('hadir');
  const [wishMessage, setWishMessage] = useState('');
  const [wishSentSuccess, setWishSentSuccess] = useState(false);

  // Active section tracker for bottom quick-nav
  const [activeNav, setActiveNav] = useState('home');

  // Read guest parameter from URL if provided (e.g. ?to=Nama+Tamu)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const toParam = params.get('to') || params.get('u');
    if (toParam) {
      setGuestName(decodeURIComponent(toParam));
    }
  }, []);

  // Calculate countdown
  useEffect(() => {
    const target = new Date(data.eventTargetDate).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60));
      const minutes = Math.floor((difference % (1000 * 60)) / 1000);
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [data.eventTargetDate]);

  // Audio setup
  useEffect(() => {
    if (data.musicUrl) {
      audioRef.current = new Audio(data.musicUrl);
      audioRef.current.loop = true;
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [data.musicUrl]);

  // Toggle Background Music
  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlayingMusic) {
      audioRef.current.pause();
      setIsPlayingMusic(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlayingMusic(true);
      }).catch((e) => {
        console.log('Audio autoplay prevented:', e);
      });
    }
  };

  // Handle Open Invitation: Triggers Slide-Up Animation, Confetti, and Music
  const handleOpenInvitation = () => {
    setIsCoverSlideUp(true);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback
    }

    // Play romantic acoustic music
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlayingMusic(true);
      }).catch(() => {
        setIsPlayingMusic(false);
      });
    }

    // After slide up animation finishes (1000ms), mark as fully gone for clean interaction
    setTimeout(() => {
      setIsCoverFullyGone(true);
      const element = document.getElementById('digital-home');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1050);
  };

  // Copy to clipboard helper
  const handleCopy = (text: string, type: 'bank' | 'address', bankId?: string) => {
    navigator.clipboard.writeText(text);
    if (type === 'bank' && bankId) {
      setCopiedBankId(bankId);
      setTimeout(() => setCopiedBankId(null), 2500);
    } else {
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2500);
    }
  };

  // Submit wish
  const handleSubmitWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishName.trim() || !wishMessage.trim()) return;

    onAddWish({
      name: wishName.trim(),
      attendance: wishAttendance,
      message: wishMessage.trim()
    });

    setWishSentSuccess(true);
    setWishName('');
    setWishMessage('');
    setTimeout(() => setWishSentSuccess(false), 3000);
  };

  // Helper to generate Google Calendar Link
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`Pernikahan ${data.groomNickname} & ${data.brideNickname}`);
    const details = encodeURIComponent(`Pernikahan Suci ${data.groomFullName} & ${data.brideFullName}.\nLokasi: ${data.akadVenue} / ${data.resepsiVenue}`);
    const location = encodeURIComponent(`${data.akadVenue}, ${data.akadAddress}`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#141210] overflow-y-auto flex justify-center text-[#2C2926] font-sans selection:bg-[#B8860B]/20">
      
      {/* Top Floating Controls */}
      <div className="fixed top-4 left-4 right-4 z-40 max-w-lg mx-auto flex items-center justify-between pointer-events-none px-2">
        <div className="pointer-events-auto flex items-center gap-2">
          {onOpenEditor && isCoverSlideUp && (
            <button
              onClick={onOpenEditor}
              className="px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#2C2926] text-xs font-bold border border-[#D5C9B3] hover:bg-white shadow-lg transition flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
              <span>Edit Data</span>
            </button>
          )}
        </div>

        <div className="pointer-events-auto flex items-center gap-2">
          {/* Music Toggle */}
          {isCoverSlideUp && (
            <button
              onClick={toggleMusic}
              className={`p-2.5 rounded-full bg-white/90 backdrop-blur-md border border-[#D5C9B3] text-[#2C2926] shadow-lg transition cursor-pointer ${
                isPlayingMusic ? 'rotate-180 duration-1000' : ''
              }`}
              title={isPlayingMusic ? 'Heningkan Musik' : 'Putar Musik'}
            >
              {isPlayingMusic ? <Volume2 className="w-4 h-4 text-[#B8860B]" /> : <VolumeX className="w-4 h-4 text-stone-500" />}
            </button>
          )}

          {/* Close Modal Button */}
          {!isStandalone && (
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-black/70 hover:bg-black text-white shadow-lg backdrop-blur-md transition cursor-pointer"
              title="Tutup Preview"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Wrapper (Simulates smartphone width 480px) */}
      <div className="w-full max-w-md min-h-screen bg-[#FDFCF7] relative shadow-2xl overflow-x-hidden pb-24">

        {/* =========================================================================
            SECTION 1: COVER SCREEN WITH CINEMATIC SLIDE-UP ANIMATION
        ========================================================================== */}
        {!isCoverFullyGone && (
          <div 
            className={`fixed inset-0 z-50 max-w-md mx-auto bg-[#1A1816] flex flex-col justify-between text-white p-8 overflow-hidden transform transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isCoverSlideUp ? '-translate-y-full pointer-events-none' : 'translate-y-0'
            }`}
          >
            {/* Background Image with warm gradient overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src={data.coverImage}
                alt="Cover"
                className="w-full h-full object-cover opacity-35 scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-[#141210]/60 to-[#141210]/80"></div>
            </div>

            {/* Top Close trigger on cover */}
            {!isStandalone && (
              <div className="relative z-10 flex justify-end">
                <button
                  onClick={onClose}
                  className="p-2 text-stone-300 hover:text-white rounded-full bg-white/10 backdrop-blur-md cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Middle Content */}
            <div className="relative z-10 text-center my-auto space-y-4">
              <div className="inline-block p-1 rounded-full bg-gradient-to-tr from-[#B8860B] to-[#F3E5AB]">
                <div className="w-16 h-16 rounded-full bg-[#231F1C] flex items-center justify-center text-[#D4AF37] font-display text-2xl font-bold tracking-wider">
                  {data.groomNickname[0]}&{data.brideNickname[0]}
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-medium">
                  {data.coverTitle}
                </p>
                <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-wide text-white">
                  {data.groomNickname} & {data.brideNickname}
                </h1>
                <p className="text-xs text-stone-300 tracking-wider">
                  {data.coverDate}
                </p>
              </div>

              {/* Guest Recipient Box */}
              <div className="mt-8 pt-4 pb-4 px-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 max-w-xs mx-auto">
                <p className="text-[11px] text-[#E8DCC4] uppercase tracking-wider mb-1">
                  Kepada Yth. Bapak/Ibu/Saudara/i:
                </p>
                <h4 className="font-display text-lg font-bold text-white tracking-wide">
                  {guestName}
                </h4>
                <p className="text-[10px] text-stone-300 mt-1 italic">
                  *Mohon maaf apabila ada kesalahan penulisan nama/gelar
                </p>
              </div>

              {/* Buka Undangan Button (Triggers Slide-Up) */}
              <div className="pt-4">
                <button
                  onClick={handleOpenInvitation}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#996515] text-[#1A1816] font-bold text-xs uppercase tracking-widest shadow-xl hover:shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer animate-pulse"
                >
                  <MailOpen className="w-4 h-4 text-[#1A1816]" />
                  <span>Buka Undangan</span>
                </button>
              </div>
            </div>

            {/* Bottom Credits */}
            <div className="relative z-10 text-center text-[10px] text-stone-400">
              {data.coverSubtitle}
            </div>
          </div>
        )}

        {/* =========================================================================
            SECTION 2: HOME SECTION (Hero Pembuka) with Scroll Zoom
        ========================================================================== */}
        <ScrollZoomSection id="digital-home" className="relative text-center pt-20 pb-16 px-6 overflow-hidden">
          <div className="space-y-6">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#996515] bg-[#FAF5EB] px-3.5 py-1 rounded-full border border-[#E8DEC9]">
              The Sacred Matrimony
            </span>

            {/* Couple Hero Photo */}
            <div className="relative w-48 h-64 mx-auto rounded-3xl overflow-hidden shadow-2xl p-1 bg-gradient-to-b from-[#D4AF37] to-transparent">
              <img
                src={data.coverImage}
                alt={`${data.groomNickname} & ${data.brideNickname}`}
                className="w-full h-full object-cover rounded-3xl"
              />
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-[#7A6E63] font-medium">
                Pernikahan Suci
              </p>
              <h2 className="font-display text-4xl font-bold text-[#2C2926] mt-1">
                {data.groomNickname} & {data.brideNickname}
              </h2>
              <p className="text-xs text-[#996515] font-semibold tracking-wider mt-1">
                {data.akadDate}
              </p>
            </div>

            {/* Holy Verse Quote */}
            <div className="max-w-xs mx-auto p-5 rounded-2xl bg-white border border-[#EBE4D5] shadow-xs space-y-2">
              <p className="text-xs text-[#453E38] italic leading-relaxed">
                "{data.quoteText}"
              </p>
              <p className="text-[10px] font-bold text-[#996515] uppercase tracking-wider">
                — {data.quoteSource}
              </p>
            </div>
          </div>
        </ScrollZoomSection>

        {/* =========================================================================
            SECTION 3: PEMBUKAAN & SALAM with Scroll Zoom
        ========================================================================== */}
        <ScrollZoomSection className="py-12 px-6 text-center bg-[#FAF7F0] border-y border-[#EBE4D5]">
          <div className="max-w-xs mx-auto space-y-3">
            <div className="w-8 h-8 mx-auto text-[#B8860B]">
              <Heart className="w-8 h-8 mx-auto" />
            </div>
            <h3 className="font-display text-xl font-bold text-[#2C2926]">
              Salam & Doa Restu
            </h3>
            <p className="text-xs text-[#524941] leading-relaxed">
              {data.greetingOpening}
            </p>
          </div>
        </ScrollZoomSection>

        {/* =========================================================================
            SECTION 4: MEMPELAI SECTION with Scroll Zoom
        ========================================================================== */}
        <ScrollZoomSection id="digital-mempelai" className="py-16 px-6 text-center space-y-12">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#996515]">
              Kedua Mempelai
            </span>
            <h3 className="font-display text-3xl font-bold text-[#2C2926] mt-1">
              Maha Suci Allah
            </h3>
            <p className="text-xs text-[#6B5E50] max-w-xs mx-auto mt-1">
              Yang telah mempertemukan dua insan untuk melengkapi separuh agamanya
            </p>
          </div>

          {/* Mempelai Pria */}
          <div className="space-y-4 max-w-xs mx-auto bg-white p-6 rounded-3xl border border-[#EAE2D2] shadow-sm">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden p-1 bg-gradient-to-tr from-[#996515] to-[#D4AF37] shadow-md">
              <img
                src={data.groomPhoto}
                alt={data.groomFullName}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <h4 className="font-display text-xl font-bold text-[#2C2926]">
                {data.groomFullName}
              </h4>
              <p className="text-xs text-[#996515] font-semibold mt-0.5">
                — Mempelai Pria —
              </p>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                {data.groomParents}
              </p>
              {data.groomInstagram && (
                <a
                  href={`https://instagram.com/${data.groomInstagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-[11px] font-medium hover:bg-stone-200 mt-3 transition"
                >
                  <Instagram className="w-3.5 h-3.5 text-pink-600" />
                  <span>@{data.groomInstagram}</span>
                </a>
              )}
            </div>
          </div>

          <div className="font-display text-2xl font-bold text-[#D4AF37]">
            &
          </div>

          {/* Mempelai Wanita */}
          <div className="space-y-4 max-w-xs mx-auto bg-white p-6 rounded-3xl border border-[#EAE2D2] shadow-sm">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden p-1 bg-gradient-to-tr from-[#996515] to-[#D4AF37] shadow-md">
              <img
                src={data.bridePhoto}
                alt={data.brideFullName}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <h4 className="font-display text-xl font-bold text-[#2C2926]">
                {data.brideFullName}
              </h4>
              <p className="text-xs text-[#996515] font-semibold mt-0.5">
                — Mempelai Wanita —
              </p>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                {data.brideParents}
              </p>
              {data.brideInstagram && (
                <a
                  href={`https://instagram.com/${data.brideInstagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-[11px] font-medium hover:bg-stone-200 mt-3 transition"
                >
                  <Instagram className="w-3.5 h-3.5 text-pink-600" />
                  <span>@{data.brideInstagram}</span>
                </a>
              )}
            </div>
          </div>
        </ScrollZoomSection>

        {/* =========================================================================
            SECTION 5: COUNTDOWN SECTION with Scroll Zoom
        ========================================================================== */}
        <ScrollZoomSection className="py-14 px-6 bg-gradient-to-b from-[#2C2926] to-[#1E1B19] text-white text-center rounded-3xl mx-4 shadow-xl">
          <div className="space-y-2 mb-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
              Menghitung Hari
            </span>
            <h3 className="font-display text-2xl font-bold text-white">
              Menuju Hari Bahagia
            </h3>
            <p className="text-xs text-stone-300">
              {data.akadDate}
            </p>
          </div>

          {/* 4-Box Countdown Timer */}
          <div className="grid grid-cols-4 gap-2.5 max-w-xs mx-auto">
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-3 text-center">
              <span className="font-display text-2xl font-bold text-[#D4AF37] block">
                {timeLeft.days}
              </span>
              <span className="text-[10px] text-stone-300 uppercase tracking-wider">Hari</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-3 text-center">
              <span className="font-display text-2xl font-bold text-[#D4AF37] block">
                {timeLeft.hours}
              </span>
              <span className="text-[10px] text-stone-300 uppercase tracking-wider">Jam</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-3 text-center">
              <span className="font-display text-2xl font-bold text-[#D4AF37] block">
                {timeLeft.minutes}
              </span>
              <span className="text-[10px] text-stone-300 uppercase tracking-wider">Menit</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-3 text-center">
              <span className="font-display text-2xl font-bold text-[#D4AF37] block">
                {timeLeft.seconds}
              </span>
              <span className="text-[10px] text-stone-300 uppercase tracking-wider">Detik</span>
            </div>
          </div>

          {/* Add to Google Calendar Action */}
          <div className="mt-8">
            <a
              href={getGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FAF5EB] text-[#2C2926] hover:bg-white text-xs font-bold transition shadow-md"
            >
              <Calendar className="w-4 h-4 text-[#B8860B]" />
              <span>Simpan ke Google Calendar</span>
            </a>
          </div>
        </ScrollZoomSection>

        {/* =========================================================================
            SECTION 6: WAKTU & TEMPAT ACARA with Scroll Zoom
        ========================================================================== */}
        <ScrollZoomSection id="digital-acara" className="py-16 px-6 text-center space-y-8">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#996515]">
              Rangkaian Acara
            </span>
            <h3 className="font-display text-3xl font-bold text-[#2C2926] mt-1">
              Waktu & Tempat
            </h3>
            <p className="text-xs text-[#6B5E50] max-w-xs mx-auto mt-1">
              Insya Allah acara pernikahan kami akan diselenggarakan pada:
            </p>
          </div>

          {/* Card Akad Nikah */}
          <div className="bg-white rounded-3xl p-6 border border-[#EAE2D2] shadow-sm max-w-xs mx-auto space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF5EB] text-[#996515] flex items-center justify-center mx-auto">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display text-2xl font-bold text-[#2C2926]">
                {data.akadTitle}
              </h4>
              <p className="text-xs font-semibold text-[#996515] mt-1">
                {data.akadDate}
              </p>
              <p className="text-xs text-stone-600 flex items-center justify-center gap-1.5 mt-1">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                <span>{data.akadTime}</span>
              </p>
            </div>
            <div className="pt-2 border-t border-stone-100">
              <p className="font-bold text-xs text-[#2C2926]">
                {data.akadVenue}
              </p>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                {data.akadAddress}
              </p>
            </div>
          </div>

          {/* Card Resepsi */}
          <div className="bg-white rounded-3xl p-6 border border-[#EAE2D2] shadow-sm max-w-xs mx-auto space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF5EB] text-[#996515] flex items-center justify-center mx-auto">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display text-2xl font-bold text-[#2C2926]">
                {data.resepsiTitle}
              </h4>
              <p className="text-xs font-semibold text-[#996515] mt-1">
                {data.resepsiDate}
              </p>
              <p className="text-xs text-stone-600 flex items-center justify-center gap-1.5 mt-1">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                <span>{data.resepsiTime}</span>
              </p>
            </div>
            <div className="pt-2 border-t border-stone-100">
              <p className="font-bold text-xs text-[#2C2926]">
                {data.resepsiVenue}
              </p>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                {data.resepsiAddress}
              </p>
            </div>
          </div>

          {/* SECTION 7: MAPS GOOGLE */}
          <div className="bg-white rounded-3xl p-4 border border-[#EAE2D2] shadow-sm max-w-xs mx-auto space-y-3">
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#2C2926]">
              <MapPin className="w-4 h-4 text-red-500" />
              <span>Peta Lokasi Gedung</span>
            </div>

            <div className="w-full h-44 rounded-2xl overflow-hidden border border-stone-200">
              <iframe
                title="Google Maps Lokasi Pernikahan"
                src={data.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
              ></iframe>
            </div>

            <a
              href={data.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-[#2C2926] hover:bg-black text-[#F3E5AB] text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-xs"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Buka Petunjuk Arah Google Maps</span>
            </a>
          </div>
        </ScrollZoomSection>

        {/* =========================================================================
            SECTION 8: LOVE STORY SECTION with Scroll Zoom
        ========================================================================== */}
        <ScrollZoomSection className="py-16 px-6 bg-[#FAF7F0] border-y border-[#EBE4D5]">
          <div className="text-center mb-10">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#996515]">
              Kisah Perjalanan
            </span>
            <h3 className="font-display text-3xl font-bold text-[#2C2926] mt-1">
              Love Story
            </h3>
            <p className="text-xs text-[#6B5E50] max-w-xs mx-auto mt-1">
              Bagaimana semesta merajut kisah dua hati hingga melangkah ke pelaminan
            </p>
          </div>

          {/* Timeline */}
          <div className="max-w-xs mx-auto relative pl-6 border-l-2 border-[#D5C9B3] space-y-8">
            {data.loveStories.map((story) => (
              <div key={story.id} className="relative group">
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-[#FAF7F0] border-4 border-[#B8860B]"></div>
                
                <div className="bg-white p-4 rounded-2xl border border-[#EBE4D5] shadow-xs space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#996515] bg-[#FAF5EB] px-2 py-0.5 rounded">
                    {story.date}
                  </span>
                  <h4 className="font-display text-base font-bold text-[#2C2926]">
                    {story.title}
                  </h4>
                  {story.imageUrl && (
                    <img
                      src={story.imageUrl}
                      alt={story.title}
                      className="w-full h-32 object-cover rounded-xl"
                    />
                  )}
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {story.story}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollZoomSection>

        {/* =========================================================================
            SECTION 9: GALERI SECTION with Scroll Zoom
        ========================================================================== */}
        <ScrollZoomSection id="digital-galeri" className="py-16 px-6 text-center space-y-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#996515]">
              Momen Bahagia
            </span>
            <h3 className="font-display text-3xl font-bold text-[#2C2926] mt-1">
              Galeri Foto
            </h3>
            <p className="text-xs text-[#6B5E50] max-w-xs mx-auto mt-1">
              Kenangan manis dalam bingkai cinta yang abadi
            </p>
          </div>

          {/* Masonry / Grid Gallery */}
          <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
            {data.galleryPhotos.map((photoUrl, idx) => (
              <div
                key={idx}
                onClick={() => setActiveLightboxImage(photoUrl)}
                className={`rounded-2xl overflow-hidden shadow-sm cursor-pointer hover:opacity-95 transition ${
                  idx % 3 === 0 ? 'col-span-2 h-48' : 'h-36'
                }`}
              >
                <img
                  src={photoUrl}
                  alt={`Galeri ${idx + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </ScrollZoomSection>

        {/* =========================================================================
            SECTION 10: GIFT SECTION with Scroll Zoom
        ========================================================================== */}
        <ScrollZoomSection id="digital-gift" className="py-16 px-6 bg-[#FAF7F0] border-y border-[#EBE4D5] text-center space-y-8">
          <div>
            <div className="w-10 h-10 rounded-full bg-[#FAF5EB] text-[#996515] flex items-center justify-center mx-auto mb-2">
              <Gift className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#996515]">
              Tanda Kasih
            </span>
            <h3 className="font-display text-3xl font-bold text-[#2C2926] mt-1">
              Wedding Gift
            </h3>
            <p className="text-xs text-[#6B5E50] max-w-xs mx-auto mt-1 leading-relaxed">
              Doa restu Anda merupakan karunia terindah bagi kami. Namun apabila ingin memberikan tanda kasih secara digital, Anda dapat mentransfer melalui rekening berikut:
            </p>
          </div>

          {/* Bank Accounts */}
          <div className="space-y-4 max-w-xs mx-auto">
            {data.bankAccounts.map((bank) => (
              <div key={bank.id} className="bg-white p-5 rounded-3xl border border-[#EAE2D2] shadow-xs text-left space-y-3">
                <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <span className="font-bold text-xs text-[#2C2926]">{bank.bankName}</span>
                  <span className="text-[10px] text-[#996515] font-semibold bg-[#FAF5EB] px-2 py-0.5 rounded">
                    Transfer Bank
                  </span>
                </div>
                <div>
                  <p className="text-[11px] text-stone-500">Nomor Rekening:</p>
                  <p className="font-mono text-base font-bold text-[#2C2926] tracking-wider">
                    {bank.accountNumber}
                  </p>
                  <p className="text-xs text-stone-600 mt-0.5">a.n. {bank.holderName}</p>
                </div>
                <button
                  onClick={() => handleCopy(bank.accountNumber, 'bank', bank.id)}
                  className="w-full py-2 px-3 rounded-xl bg-stone-100 hover:bg-[#FAF5EB] text-stone-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  {copiedBankId === bank.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-600" />
                      <span className="text-green-700 font-bold">Nomor Rekening Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-stone-600" />
                      <span>Salin Nomor Rekening</span>
                    </>
                  )}
                </button>
              </div>
            ))}

            {/* Physical Gift Delivery Address */}
            <div className="bg-white p-5 rounded-3xl border border-[#EAE2D2] shadow-xs text-left space-y-3">
              <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                <span className="font-bold text-xs text-[#2C2926]">Kirim Kado Fisik</span>
                <span className="text-[10px] text-[#996515] font-semibold bg-[#FAF5EB] px-2 py-0.5 rounded">
                  Alamat Paket
                </span>
              </div>
              <div>
                <p className="text-[11px] text-stone-500">Penerima Paket:</p>
                <p className="font-bold text-xs text-[#2C2926]">{data.physicalGiftRecipient}</p>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  {data.physicalGiftAddress}
                </p>
              </div>
              <button
                onClick={() => handleCopy(data.physicalGiftAddress, 'address')}
                className="w-full py-2 px-3 rounded-xl bg-stone-100 hover:bg-[#FAF5EB] text-stone-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                {copiedAddress ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-600" />
                    <span className="text-green-700 font-bold">Alamat Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-stone-600" />
                    <span>Salin Alamat Lengkap</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </ScrollZoomSection>

        {/* =========================================================================
            SECTION 11: WISHES SECTION with Scroll Zoom
        ========================================================================== */}
        <ScrollZoomSection id="digital-wishes" className="py-16 px-6 text-center space-y-8">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#996515]">
              Buku Tamu & RSVP
            </span>
            <h3 className="font-display text-3xl font-bold text-[#2C2926] mt-1">
              Untaian Doa Restu
            </h3>
            <p className="text-xs text-[#6B5E50] max-w-xs mx-auto mt-1">
              Kirimkan ucapan dan konfirmasi kehadiran Anda untuk hari bahagia kami
            </p>
          </div>

          {/* Form Kirim Doa */}
          <form onSubmit={handleSubmitWish} className="bg-white p-5 rounded-3xl border border-[#EAE2D2] shadow-sm max-w-xs mx-auto text-left space-y-3">
            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1">
                Nama Anda / Keluarga
              </label>
              <input
                type="text"
                required
                value={wishName}
                onChange={(e) => setWishName(e.target.value)}
                placeholder="Contoh: Dimas & Keluarga"
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:border-[#996515] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1">
                Konfirmasi Kehadiran
              </label>
              <div className="grid grid-cols-3 gap-1.5 text-xs">
                <button
                  type="button"
                  onClick={() => setWishAttendance('hadir')}
                  className={`py-2 rounded-xl border font-semibold text-center transition cursor-pointer text-[11px] ${
                    wishAttendance === 'hadir'
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  Hadir
                </button>
                <button
                  type="button"
                  onClick={() => setWishAttendance('tidak')}
                  className={`py-2 rounded-xl border font-semibold text-center transition cursor-pointer text-[11px] ${
                    wishAttendance === 'tidak'
                      ? 'bg-rose-600 text-white border-rose-600'
                      : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  Maaf Tidak
                </button>
                <button
                  type="button"
                  onClick={() => setWishAttendance('ragu')}
                  className={`py-2 rounded-xl border font-semibold text-center transition cursor-pointer text-[11px] ${
                    wishAttendance === 'ragu'
                      ? 'bg-amber-600 text-white border-amber-600'
                      : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  Ragu-ragu
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1">
                Pesan & Untaian Doa
              </label>
              <textarea
                rows={3}
                required
                value={wishMessage}
                onChange={(e) => setWishMessage(e.target.value)}
                placeholder="Tuliskan doa restu yang tulus..."
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:border-[#996515] focus:outline-hidden resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#996515] to-[#B8860B] hover:from-[#85530D] hover:to-[#9E7108] text-white font-bold text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Kirim Doa Restu</span>
            </button>

            {wishSentSuccess && (
              <p className="text-[11px] text-emerald-700 font-bold text-center bg-emerald-50 py-1.5 rounded-lg border border-emerald-200">
                Terima kasih! Doa restu Anda telah terkirim.
              </p>
            )}
          </form>

          {/* List Wishes */}
          <div className="max-w-xs mx-auto space-y-3 text-left">
            <h4 className="text-xs font-bold text-[#2C2926] px-1 flex items-center justify-between">
              <span>Ucapan Masuk ({wishes.length})</span>
              <span className="text-[10px] text-stone-400">Terbaru di atas</span>
            </h4>

            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {wishes.map((wish) => (
                <div key={wish.id} className="bg-white p-3.5 rounded-2xl border border-stone-150 shadow-2xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#2C2926]">{wish.name}</span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      wish.attendance === 'hadir'
                        ? 'bg-emerald-100 text-emerald-800'
                        : wish.attendance === 'tidak'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {wish.attendance === 'hadir' ? 'Hadir' : wish.attendance === 'tidak' ? 'Tidak Hadir' : 'Ragu'}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {wish.message}
                  </p>
                  <p className="text-[9px] text-stone-400 pt-0.5">
                    {wish.createdAt}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollZoomSection>

        {/* =========================================================================
            SECTION 12: SECTION PENUTUP with Scroll Zoom
        ========================================================================== */}
        <ScrollZoomSection className="py-16 px-6 bg-[#FAF7F0] border-t border-[#EBE4D5] text-center space-y-4">
          <div className="max-w-xs mx-auto space-y-3">
            <h3 className="font-display text-2xl font-bold text-[#2C2926]">
              Terima Kasih
            </h3>
            <p className="text-xs text-[#594F45] leading-relaxed">
              {data.closingText}
            </p>
            <div className="pt-4">
              <p className="font-display text-base font-bold text-[#996515]">
                Kami yang berbahagia,
              </p>
              <h4 className="font-display text-2xl font-bold text-[#2C2926] mt-1">
                {data.groomNickname} & {data.brideNickname}
              </h4>
              <p className="text-[11px] text-stone-500 mt-1">
                Beserta segenap keluarga besar
              </p>
              <p className="text-[10px] text-[#8A7969] mt-0.5">
                {data.familyMembers}
              </p>
            </div>
          </div>
        </ScrollZoomSection>

        {/* =========================================================================
            SECTION 13: FOOTER
        ========================================================================== */}
        <footer className="py-8 px-6 bg-[#1A1816] text-[#A6998A] text-center text-xs space-y-1">
          <p className="font-display text-sm font-bold text-white tracking-wider">
            Dheluwang Digital Invitation
          </p>
          <p className="text-[10px] text-stone-400">
            Exclusive Digital Wedding Stationery Edition © 2026
          </p>
        </footer>

        {/* Quick Bottom Navigation Bar */}
        {isCoverSlideUp && (
          <div className="fixed bottom-3 left-0 right-0 z-40 max-w-xs mx-auto flex items-center justify-around bg-[#2C2926]/90 backdrop-blur-md text-[#E8DCC4] py-2 px-3 rounded-full shadow-2xl border border-white/10 text-[10px]">
            <button
              onClick={() => {
                document.getElementById('digital-home')?.scrollIntoView({ behavior: 'smooth' });
                setActiveNav('home');
              }}
              className={`px-2.5 py-1 rounded-full transition cursor-pointer ${
                activeNav === 'home' ? 'bg-[#996515] text-white font-bold' : 'hover:text-white'
              }`}
            >
              Beranda
            </button>
            <button
              onClick={() => {
                document.getElementById('digital-mempelai')?.scrollIntoView({ behavior: 'smooth' });
                setActiveNav('mempelai');
              }}
              className={`px-2.5 py-1 rounded-full transition cursor-pointer ${
                activeNav === 'mempelai' ? 'bg-[#996515] text-white font-bold' : 'hover:text-white'
              }`}
            >
              Mempelai
            </button>
            <button
              onClick={() => {
                document.getElementById('digital-acara')?.scrollIntoView({ behavior: 'smooth' });
                setActiveNav('acara');
              }}
              className={`px-2.5 py-1 rounded-full transition cursor-pointer ${
                activeNav === 'acara' ? 'bg-[#996515] text-white font-bold' : 'hover:text-white'
              }`}
            >
              Acara
            </button>
            <button
              onClick={() => {
                document.getElementById('digital-galeri')?.scrollIntoView({ behavior: 'smooth' });
                setActiveNav('galeri');
              }}
              className={`px-2.5 py-1 rounded-full transition cursor-pointer ${
                activeNav === 'galeri' ? 'bg-[#996515] text-white font-bold' : 'hover:text-white'
              }`}
            >
              Galeri
            </button>
            <button
              onClick={() => {
                document.getElementById('digital-wishes')?.scrollIntoView({ behavior: 'smooth' });
                setActiveNav('wishes');
              }}
              className={`px-2.5 py-1 rounded-full transition cursor-pointer ${
                activeNav === 'wishes' ? 'bg-[#996515] text-white font-bold' : 'hover:text-white'
              }`}
            >
              Doa
            </button>
          </div>
        )}

      </div>

      {/* Lightbox Zoom Modal for Gallery */}
      {activeLightboxImage && (
        <div
          onClick={() => setActiveLightboxImage(null)}
          className="fixed inset-0 z-60 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-lg w-full max-h-[85vh]">
            <img
              src={activeLightboxImage}
              alt="Zoomed Photo"
              className="w-full h-auto max-h-[85vh] object-contain rounded-2xl shadow-2xl"
            />
            <button
              onClick={() => setActiveLightboxImage(null)}
              className="absolute top-3 right-3 p-2 bg-black/60 rounded-full text-white hover:bg-black"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
