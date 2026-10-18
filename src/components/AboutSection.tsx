import React from 'react';
import { Feather, Gem, Clock, ShieldCheck, Heart, Sparkles, Layers, PenTool, CheckCircle, Quote } from 'lucide-react';

interface AboutSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate }) => {
  const whyChooseUs = [
    {
      icon: <Gem className="w-6 h-6 text-[#996515]" />,
      title: 'Kertas Artisan & Impor Pilihan',
      desc: 'Kami menggunakan kertas katun berserat alami (cotton paper), textured linen Jepang, concorde ivory, hingga board hardcover tebal 3mm yang kokoh dan berwibawa.'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-[#996515]" />,
      title: 'Finishing Mewah Berkualitas Tinggi',
      desc: 'Sentuhan hotprint gold foil champagne 24K berkilau tajam, deboss/emboss 3D presisi tinggi, dan stempel segel lilin (wax seal) buatan tangan yang memancarkan pesona aristokrat.'
    },
    {
      icon: <PenTool className="w-6 h-6 text-[#996515]" />,
      title: 'Pendampingan Desain & Revisi Fleksibel',
      desc: 'Setiap pasangan didampingi desainer grafis personal. Kami berikan revisi teks, tata letak, dan font tanpa batas hingga Anda dan keluarga benar-benar merasa tenang dan puas.'
    },
    {
      icon: <Layers className="w-6 h-6 text-[#996515]" />,
      title: 'Layanan Sample Proofing Nyata',
      desc: 'Tidak perlu ragu menebak hasil akhir. Kami menyediakan sample kit dan proofing cetak fisik sehingga Anda dapat meraba tekstur dan ketajaman warna sebelum produksi masal.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#996515]" />,
      title: 'Garansi 100% Cetak Ulang & Tepat Waktu',
      desc: 'Komitmen waktu adalah janji sakral kami. Apabila ada kesalahan cetak dari pihak kami atau keterlambatan dari jadwal yang disepakati, kami cetak ulang gratis tanpa debat.'
    }
  ];

  const orderSteps = [
    {
      step: '01',
      title: 'Konsultasi & Pengisian Form',
      desc: 'Pilih model di katalog dan isi formulir pemesanan online dengan detail data acara, perkiraan kuantitas, dan alamat pengiriman.'
    },
    {
      step: '02',
      title: 'Penyusunan Desain Digital',
      desc: 'Desainer kami merancang layout undangan lengkap dengan font, ornamen, dan ordo nama keluarga dalam waktu 2-3 hari kerja.'
    },
    {
      step: '03',
      title: 'Revisi & ACC Final Desain',
      desc: 'Koreksi penulisan nama, gelar, jam acara, dan denah lokasi. Setelah semua sempurna, Anda memberikan persetujuan ACC Final.'
    },
    {
      step: '04',
      title: 'Sample Proofing Fisik',
      desc: 'Kami buatkan cetak dummy atau kirimkan sample kit fisik untuk memastikan warna tinta, foil emas, dan ketebalan kertas sesuai harapan.'
    },
    {
      step: '05',
      title: 'Produksi Masal & Finishing',
      desc: 'Proses cetak offset presisi, pelapisan laminasi doff, hotprint foil, emboss, perakitan hardcover, dan pemasangan aksesoris tali/pita.'
    },
    {
      step: '06',
      title: 'Quality Control & Pengiriman Aman',
      desc: 'Pengecekan kualitas per lembar, pembungkusan anti-air bertingkat, perlindungan hardbox, dan pengiriman berasuransi ke depan pintu Anda.'
    }
  ];

  const testimonials = [
    {
      quote: 'Kertas katun dengan tepi sobek alaminya sangat mahal kelihatannya! Semua tamu VIP dan keluarga besar memuji undangannya saat kami antar langsung. Benar-benar sesuai ekspektasi.',
      name: 'Raditya & Anindya',
      city: 'Jakarta Selatan',
      design: 'Serenade Botanical Cotton + Wax Seal'
    },
    {
      quote: 'Pelayanan admin Dheluwang sangat sabar waktu kami ada revisi susunan gelar adat Jawa tiga kali. Hasil foil emasnya rapi banget dan tebal hardcover-nya mantap.',
      name: 'Dimas Bagaskara & Sekar',
      city: 'Yogyakarta',
      design: 'Kinanti Heritage Gold Stamped'
    },
    {
      quote: 'Pengiriman ke Balikpapan sangat aman, packing kayunya rapi dan tidak ada satu pun yang lecet atau basah. Sangat recommended buat yang cari undangan fisik premium!',
      name: 'Ferry & Dr. Nadia',
      city: 'Balikpapan, Kaltim',
      design: 'Royal Astakona Velvet Hardcover'
    }
  ];

  return (
    <div className="space-y-24 py-16">
      
      {/* Section 1: Biodata & Filosofi Dheluwang */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF6EE] border border-[#E8DEC9] rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 translate-x-12 -translate-y-12 w-64 h-64 bg-[#EADBB8]/40 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-4 text-center lg:text-left">
              <span className="text-xs font-bold tracking-widest uppercase text-[#996515] block mb-2">
                Filosofi Kami
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#2C2926] leading-snug">
                Tentang Dheluwang Undangan
              </h2>
              <div className="w-16 h-1 bg-[#D4AF37] mx-auto lg:mx-0 mt-4 rounded-full" />
            </div>

            <div className="lg:col-span-8 text-[#4E443B] space-y-4 text-base sm:text-lg leading-relaxed">
              <p>
                Kata <strong className="text-[#2C2926] font-semibold">“Dheluwang”</strong> (Dluwang) berakar dari warisan leluhur nusantara—lembaran kertas tradisional adiluhung yang dahulu digunakan oleh para pujangga dan keraton untuk menuliskan titah sakral serta serat berharga.
              </p>
              <p>
                Di era digital yang serba cepat ini, kami percaya bahwa <em className="text-[#996515] font-serif italic text-xl">undangan fisik menyimpan jiwa dan kehormatan yang tak tergantikan</em>. Menyerahkan undangan fisik yang berbobot tebal, bertekstur anggun, dan beraroma kertas pilihan adalah bentuk penghormatan paling tulus dari kedua mempelai kepada keluarga, kerabat, dan para tamu agung.
              </p>
              <p className="text-sm text-[#736556] pt-2">
                Didirikan oleh tim pengrajin grafis dan percetakan berpengalaman lebih dari 8 tahun, Dheluwang mendedikasikan diri untuk merajut estetika visual pernikahan impian Anda menjadi wujud nyata yang dikenang selamanya.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Section 2: Mengapa Pilih Kami */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-widest uppercase text-[#996515] block mb-2">
            Keunggulan Eksklusif
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C2926]">
            Mengapa Calon Pengantin Memilih Dheluwang?
          </h2>
          <p className="text-sm sm:text-base text-[#615549] mt-3">
            Standar keindahan dan ketelitian tertinggi untuk momen terpenting sekali seumur hidup Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {whyChooseUs.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#EAE2D2] rounded-2xl p-7 shadow-xs hover:shadow-md hover:border-[#D4AF37] transition-all group"
            >
              <div className="w-13 h-13 rounded-2xl bg-[#F7F2E7] group-hover:bg-[#EEDBB2] flex items-center justify-center transition-colors mb-5">
                {item.icon}
              </div>
              <h3 className="font-display text-xl font-bold text-[#2C2926] mb-2.5">
                {item.title}
              </h3>
              <p className="text-sm text-[#5B5045] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}

          {/* Quick Consultation Highlight Card */}
          <div className="bg-gradient-to-br from-[#2C2926] to-[#403B36] text-white rounded-2xl p-7 shadow-md flex flex-col justify-between">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#F3E5AB] text-xs font-semibold uppercase tracking-wider mb-4">
                Punya Konsep Sendiri?
              </span>
              <h3 className="font-display text-2xl font-bold text-white mb-2">
                Custom Made Bespoke Stationery
              </h3>
              <p className="text-xs text-[#DDD3C6] leading-relaxed">
                Punya gambar referensi dari Pinterest, ornamen adat daerah, atau ingin mencocokkan palet warna busana pernikahan Anda? Tim kami siap mewujudkannya.
              </p>
            </div>
            <button
              onClick={() => onNavigate('kontak')}
              className="mt-6 w-full py-3 px-4 rounded-xl bg-[#D4AF37] hover:bg-[#B8860B] text-[#2C2926] font-bold text-xs uppercase tracking-wider transition cursor-pointer text-center"
            >
              Konsultasi Konsep Pribadi
            </button>
          </div>
        </div>
      </section>

      {/* Section 3: Alur Pemesanan & Pengerjaan */}
      <section className="bg-[#FAF7F0] py-16 border-y border-[#EBE4D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold tracking-widest uppercase text-[#996515] block mb-2">
              Proses Pengerjaan Transparan
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C2926]">
              Alur Mudah Pemesanan Undangan Fisik
            </h2>
            <p className="text-sm sm:text-base text-[#615549] mt-3">
              Dari pengisian formulir hingga undangan sampai di tangan Anda dengan aman dan rapi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orderSteps.map((step) => (
              <div
                key={step.step}
                className="bg-white rounded-2xl p-6 border border-[#E9E1D2] shadow-xs relative"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display text-3xl font-bold text-[#D4AF37]">
                    {step.step}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#FAF5EB] flex items-center justify-center text-[#996515]">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-base font-bold text-[#2C2926] mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#615549] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate('data-form')}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#996515] hover:bg-[#805310] text-white font-semibold text-sm shadow-md transition cursor-pointer"
            >
              <span>Mulai Tahap 1: Isi Data Form Pemesanan Sekarang</span>
            </button>
          </div>

        </div>
      </section>

      {/* Section 4: Testimoni Calon Pengantin */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-widest uppercase text-[#996515] block mb-2">
            Kisah Bahagia
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#2C2926]">
            Kata Pasangan yang Telah Mempercayakan Harinya
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testi, i) => (
            <div
              key={i}
              className="bg-white border border-[#EAE2D2] rounded-2xl p-7 shadow-xs flex flex-col justify-between relative"
            >
              <Quote className="w-8 h-8 text-[#E2D2B8] mb-3" />
              <p className="text-sm text-[#4A4036] italic leading-relaxed mb-6">
                "{testi.quote}"
              </p>
              <div className="border-t border-[#F0E8DC] pt-4">
                <h4 className="font-display text-lg font-bold text-[#2C2926]">
                  {testi.name}
                </h4>
                <p className="text-xs text-[#8A7969]">{testi.city}</p>
                <span className="inline-block mt-2 text-[11px] font-medium text-[#996515] bg-[#F7F2E7] px-2.5 py-0.5 rounded-full">
                  {testi.design}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
