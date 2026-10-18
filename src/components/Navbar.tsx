import React, { useState } from 'react';
import { Menu, X, Settings, Phone } from 'lucide-react';
import { SiteConfig } from '../types';

interface NavbarProps {
  config: SiteConfig;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenConfig: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  config,
  activeSection,
  onNavigate,
  onOpenConfig
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'galeri', label: 'Galeri' },
    { id: 'katalog', label: 'Katalog' },
    { id: 'kontak', label: 'Kontak' },
    { id: 'faq', label: 'FAQ' },
    { id: 'data-form', label: 'Data Form', isSpecial: true }
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FDFCF7]/95 backdrop-blur-md border-b border-[#EBE4D5] shadow-xs">
      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Paling Kiri: Logo & Tulisan Dheluwang Undangan */}
          <button
            onClick={() => handleNavClick('beranda')}
            className="flex items-center gap-3.5 text-left group cursor-pointer focus:outline-hidden"
          >
            {/* Elegant Monogram Logo */}
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#996515] via-[#D4AF37] to-[#F3E5AB] p-0.5 shadow-md group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-full bg-[#2C2926] flex items-center justify-center text-[#D4AF37]">
                <span className="font-display text-xl font-bold italic tracking-tighter">DU</span>
              </div>
            </div>
            
            <div>
              <span className="block font-display text-2xl font-bold tracking-tight text-[#2C2926] group-hover:text-[#996515] transition-colors">
                {config.brandName}
              </span>
              <span className="block text-[10px] tracking-widest uppercase font-semibold text-[#8C7A6B]">
                {config.tagline}
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all cursor-pointer ${
                  item.isSpecial
                    ? 'bg-[#996515] hover:bg-[#805310] text-white shadow-sm hover:shadow-md ml-2 px-5'
                    : activeSection === item.id
                    ? 'text-[#996515] bg-[#F4EDE0] font-semibold'
                    : 'text-[#4A453F] hover:text-[#996515] hover:bg-[#F9F5EE]'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Firebase Live Connected Badge */}
            <button
              onClick={onOpenConfig}
              title="Firebase Firestore Terhubung: Klik untuk melihat status database"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold hover:bg-emerald-100 transition cursor-pointer ml-1"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-mono text-[11px]">Firebase Active</span>
            </button>

            {/* Config & Guide trigger button */}
            <button
              onClick={onOpenConfig}
              title="Panduan Pemilik & Konfigurasi"
              className="ml-2 p-2 text-[#7A6E63] hover:text-[#996515] hover:bg-[#F4EDE0] rounded-full transition cursor-pointer"
            >
              <Settings className="w-4 h-4" />
            </button>
          </nav>

          {/* Quick Action Button & Mobile Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenConfig}
              className="p-2 text-[#7A6E63] hover:text-[#996515] rounded-full"
              title="Panduan & Konfigurasi"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#2C2926] hover:bg-[#F4EDE0] focus:outline-hidden"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FDFCF7] border-b border-[#EBE4D5] px-4 pt-2 pb-6 space-y-1.5 shadow-xl animate-in slide-in-from-top duration-200">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium flex items-center justify-between ${
                item.isSpecial
                  ? 'bg-[#996515] text-white font-semibold'
                  : activeSection === item.id
                  ? 'bg-[#F4EDE0] text-[#996515] font-semibold'
                  : 'text-[#4A453F] hover:bg-[#F9F5EE]'
              }`}
            >
              <span>{item.label}</span>
              {item.isSpecial && <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">Form Order</span>}
            </button>
          ))}

          <div className="pt-4 border-t border-[#EBE4D5] flex items-center justify-between gap-3">
            <a
              href={`https://wa.me/${config.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 px-4 bg-[#25D366] text-white text-center rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-xs"
            >
              <Phone className="w-4 h-4" />
              WhatsApp Admin
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConfig();
              }}
              className="py-2.5 px-4 border border-[#D5C9B3] text-[#5C5042] rounded-xl text-sm font-medium flex items-center gap-1.5"
            >
              <Settings className="w-4 h-4" />
              Panduan
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
