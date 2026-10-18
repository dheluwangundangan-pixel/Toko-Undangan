import React, { useState } from 'react';
import { Menu, X, Settings, Phone, LogOut } from 'lucide-react';
import { SiteConfig } from '../types';

interface NavbarProps {
  config: SiteConfig;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenConfig: () => void;
  isAdminAuthenticated: boolean;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  config,
  activeSection,
  onNavigate,
  onOpenConfig,
  isAdminAuthenticated,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'galeri', label: 'Galeri' },
    { id: 'katalog', label: 'Katalog' },
    { id: 'undangan-digital', label: 'Undangan Digital' },
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

            {/* Owner Admin Badge & Controls - ONLY visible when owner is authenticated */}
            {isAdminAuthenticated && (
              <div className="flex items-center gap-2 ml-2 pl-2 border-l border-[#EBE4D5]">
                <button
                  onClick={onOpenConfig}
                  title="Buka Panel Konfigurasi Pemilik"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#996515] hover:bg-[#805310] text-white text-xs font-semibold transition cursor-pointer shadow-xs"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Panel Pemilik</span>
                </button>
                <button
                  onClick={onLogout}
                  title="Kunci Panel (Logout)"
                  className="p-1.5 rounded-full bg-stone-100 hover:bg-red-50 text-stone-600 hover:text-red-700 transition cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </nav>

          {/* Mobile Right: Hamburger (and Owner shortcut only if authenticated) */}
          <div className="flex items-center gap-2 lg:hidden">
            {isAdminAuthenticated && (
              <button
                onClick={onOpenConfig}
                className="p-2 text-[#996515] bg-[#FAF5EB] rounded-full"
                title="Panel Pemilik"
              >
                <Settings className="w-5 h-5" />
              </button>
            )}
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
              className="w-full py-2.5 px-4 bg-[#25D366] text-white text-center rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-xs"
            >
              <Phone className="w-4 h-4" />
              WhatsApp Admin
            </a>
          </div>

          {/* Owner options on mobile - ONLY visible when authenticated */}
          {isAdminAuthenticated && (
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConfig();
                }}
                className="flex-1 py-2 px-3 bg-[#996515] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Panel Pemilik</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogout();
                }}
                className="py-2 px-3 border border-red-200 text-red-600 bg-red-50 rounded-xl text-xs font-semibold flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Kunci</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
