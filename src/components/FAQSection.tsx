import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  Search, 
  Sparkles, 
  MessageCircle, 
  CheckCircle2 
} from 'lucide-react';
import { FAQItem, SiteConfig } from '../types';

interface FAQSectionProps {
  faqs: FAQItem[];
  config: SiteConfig;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ faqs, config }) => {
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'faq-1': true, // Open first question by default
    'faq-2': false
  });

  const categories = ['Semua', 'Waktu Pengerjaan', 'Bahan & Kualitas', 'Pemesanan & Revisi', 'Pengiriman'];

  const filteredFaqs = faqs.filter((item) => {
    const matchesCategory = activeCategory === 'Semua' || item.category === activeCategory;
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5EEDF] text-[#996515] text-xs font-semibold mb-2">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Pusat Informasi & Tanya Jawab</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C2926]">
          Pertanyaan yang Sering Diajukan
        </h2>
        <p className="text-sm sm:text-base text-[#615549] mt-3">
          Temukan jawaban jelas mengenai estimasi pengerjaan, spesifikasi bahan, garansi cetak, hingga pengiriman fisik undangan ke lokasi Anda.
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="relative max-w-xl mx-auto mb-8">
        <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari pertanyaan (contoh: kapan jadinya, sample kit, minimal order)..."
          className="w-full pl-12 pr-4 py-3.5 rounded-full border border-[#D5C9B3] bg-white text-sm text-[#2C2926] placeholder-stone-400 shadow-xs focus:outline-hidden focus:border-[#996515]"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 font-bold"
          >
            Clear
          </button>
        )}
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition cursor-pointer shrink-0 ${
              activeCategory === cat
                ? 'bg-[#996515] text-white shadow-xs font-semibold'
                : 'bg-white border border-[#E0D5C1] text-[#554A3E] hover:bg-[#F9F5EE]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-stone-200">
            <p className="text-stone-500 text-sm">Tidak ditemukan pertanyaan yang cocok.</p>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = !!openIds[faq.id];
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-[#E8DEC9] overflow-hidden shadow-xs hover:border-[#D4AF37] transition-colors"
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-hidden"
                >
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-[#996515] bg-[#FAF5EB] px-2.5 py-0.5 rounded-full inline-block">
                      {faq.category}
                    </span>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-[#2C2926]">
                      {faq.question}
                    </h3>
                  </div>

                  <div className={`p-2 rounded-full bg-[#F6F0E2] text-[#996515] transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 pt-0 text-sm text-[#4E4338] leading-relaxed border-t border-[#F1E8DA]/60 mt-1 animate-in fade-in duration-200">
                    <p className="pt-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Still Have Questions Box */}
      <div className="mt-14 bg-gradient-to-r from-[#FAF5EB] via-[#FDFBF7] to-[#F7F1E1] border border-[#E8DEC9] rounded-3xl p-8 text-center flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-left space-y-1">
          <h4 className="font-display text-xl font-bold text-[#2C2926]">
            Ada Pertanyaan Khusus Seputar Undangan Anda?
          </h4>
          <p className="text-xs sm:text-sm text-[#665A4D]">
            Tim konsultasi kami dengan senang hati membantu memberikan saran bahan dan estimasi biaya secara gratis.
          </p>
        </div>

        <a
          href={`https://wa.me/${config.whatsappNumber}?text=Halo%20Dheluwang,%20saya%20punya%20pertanyaan%20seputar%20undangan%20fisik`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs tracking-wider uppercase flex items-center gap-2 shadow-md shrink-0 transition"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Tanya via WhatsApp</span>
        </a>
      </div>

    </div>
  );
};
