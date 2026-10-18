/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { doc, setDoc, getDoc, collection } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType, testConnection } from './firebase';
import { 
  CatalogItem, 
  GalleryItem, 
  FAQItem, 
  OrderFormData, 
  SiteConfig 
} from './types';
import { 
  initialSiteConfig, 
  defaultCatalogs, 
  defaultGallery, 
  defaultFAQs 
} from './data/defaultData';

import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { GallerySection } from './components/GallerySection';
import { CatalogSection } from './components/CatalogSection';
import { ContactSection } from './components/ContactSection';
import { FAQSection } from './components/FAQSection';
import { DataFormSection } from './components/DataFormSection';
import { ConfigGuideModal } from './components/ConfigGuideModal';
import { InteractiveWhatsAppButton } from './components/InteractiveWhatsAppButton';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('beranda');
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    const saved = localStorage.getItem('dheluwang_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        parsed.announcementText = '';
        return { ...initialSiteConfig, ...parsed, announcementText: '' };
      } catch {
        return initialSiteConfig;
      }
    }
    return initialSiteConfig;
  });

  const [catalogs, setCatalogs] = useState<CatalogItem[]>(() => {
    const saved = localStorage.getItem('dheluwang_catalogs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return defaultCatalogs;
      }
    }
    return defaultCatalogs;
  });

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('dheluwang_gallery');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return defaultGallery;
      }
    }
    return defaultGallery;
  });

  const [faqs] = useState<FAQItem[]>(defaultFAQs);
  const [selectedCatalogForOrder, setSelectedCatalogForOrder] = useState<CatalogItem | null>(null);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState<boolean>(false);

  // Test Firebase connection on boot
  useEffect(() => {
    testConnection();
  }, []);

  // Scroll to top upon navigating sections
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler when user clicks "Pilih Desain Ini untuk Pemesanan" in Catalog
  const handleSelectCatalogForOrder = (catalog: CatalogItem) => {
    setSelectedCatalogForOrder(catalog);
    setActiveSection('data-form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Save new or edited catalog item to Firestore & local state
  const handleSaveCatalog = async (item: CatalogItem) => {
    const path = `catalogs/${item.id}`;
    try {
      await setDoc(doc(db, 'catalogs', item.id), {
        title: item.title.slice(0, 150),
        theme: item.theme.slice(0, 80),
        paper: item.paper.slice(0, 150),
        lamination: (item.lamination || 'Doff').slice(0, 100),
        hotprint: (item.hotprint || 'Gold Foil').slice(0, 100),
        emboss: (item.emboss || 'Deboss 3D').slice(0, 100),
        priceRange: item.priceRange.slice(0, 80),
        minOrder: (item.minOrder || '150 pcs').slice(0, 50),
        imageUrl: item.imageUrl.slice(0, 1000),
        description: (item.description || '').slice(0, 500)
      });
    } catch (error) {
      console.warn('Note: Storing to Firestore encountered:', error);
      // Even if offline/permission, we gracefully handle or bubble through skill error format
    }

    // Update local state & storage
    setCatalogs((prev) => {
      const existsIndex = prev.findIndex((c) => c.id === item.id);
      let updated: CatalogItem[];
      if (existsIndex >= 0) {
        updated = [...prev];
        updated[existsIndex] = item;
      } else {
        updated = [item, ...prev];
      }
      localStorage.setItem('dheluwang_catalogs', JSON.stringify(updated));
      return updated;
    });
  };

  // Add new gallery photo to Firestore & local state
  const handleAddGalleryItem = async (newItem: Omit<GalleryItem, 'id'>) => {
    const generatedId = `gal-${Date.now()}`;
    const fullItem: GalleryItem = { ...newItem, id: generatedId };

    const path = `gallery_items/${generatedId}`;
    try {
      await setDoc(doc(db, 'gallery_items', generatedId), {
        title: fullItem.title.slice(0, 150),
        category: fullItem.category.slice(0, 80),
        imageUrl: fullItem.imageUrl.slice(0, 1000),
        caption: (fullItem.caption || '').slice(0, 300)
      });
    } catch (error) {
      console.warn('Note: Storing gallery item to Firestore encountered:', error);
    }

    setGalleryItems((prev) => {
      const updated = [fullItem, ...prev];
      localStorage.setItem('dheluwang_gallery', JSON.stringify(updated));
      return updated;
    });
  };

  // Submit Order from Data Form into Firebase Firestore
  const handleSubmitOrder = async (orderData: OrderFormData): Promise<string> => {
    const cleanId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const path = `orders/${cleanId}`;

    const sanitizedPayload = {
      customerName: (orderData.customerName || '').slice(0, 150),
      customerPhone: (orderData.customerPhone || '').slice(0, 30),
      customerEmail: (orderData.customerEmail || '').slice(0, 150),
      shippingAddress: (orderData.shippingAddress || '').slice(0, 500),
      shippingCourier: (orderData.shippingCourier || '').slice(0, 100),
      estimatedWeightKg: (orderData.estimatedWeightKg || '').slice(0, 30),
      estimatedShippingCost: (orderData.estimatedShippingCost || '').slice(0, 50),
      designTheme: (orderData.designTheme || '').slice(0, 150),
      quantity: (orderData.quantity || '300').slice(0, 20),
      paperType: (orderData.paperType || '').slice(0, 100),
      finishing: (orderData.finishing || '').slice(0, 150),
      lamination: (orderData.lamination || '').slice(0, 80),
      groomName: (orderData.groomName || '').slice(0, 200),
      groomParents: (orderData.groomParents || '').slice(0, 250),
      brideName: (orderData.brideName || '').slice(0, 200),
      brideParents: (orderData.brideParents || '').slice(0, 250),
      akadDateTimeLocation: (orderData.akadDateTimeLocation || '').slice(0, 350),
      resepsiDateTimeLocation: (orderData.resepsiDateTimeLocation || '').slice(0, 350),
      turutMengundang: (orderData.turutMengundang || '').slice(0, 500),
      mapsLink: (orderData.mapsLink || '').slice(0, 300),
      specialNotes: (orderData.specialNotes || '').slice(0, 1000),
      totalEstimatedPrice: (orderData.totalEstimatedPrice || '').slice(0, 50),
      status: 'pending_consultation',
      createdAt: new Date().toISOString()
    };

    try {
      await setDoc(doc(db, 'orders', cleanId), sanitizedPayload);
      console.log('Pesanan berhasil tersimpan di Firestore dengan ID:', cleanId);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }

    return cleanId;
  };

  const handleSaveConfig = (newConfig: SiteConfig) => {
    setSiteConfig(newConfig);
    localStorage.setItem('dheluwang_config', JSON.stringify(newConfig));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFCF7] text-[#2C2926]">
      
      {/* Header & Sticky Navbar */}
      <Navbar
        config={siteConfig}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenConfig={() => setIsConfigModalOpen(true)}
      />

      {/* Main Content Area Routed by activeSection */}
      <main className="flex-1">
        {/* BERANDA (Home: Hero + About & Philosophy + Why Us + Workflow + Testimonials) */}
        {activeSection === 'beranda' && (
          <div>
            <HeroSection config={siteConfig} onNavigate={handleNavigate} />
            <AboutSection onNavigate={handleNavigate} />
          </div>
        )}

        {/* GALERI (Gallery: Photo collection, Lightbox slide kiri-kanan, Auto slide, Download, Add photo) */}
        {activeSection === 'galeri' && (
          <GallerySection
            items={galleryItems}
            onAddGalleryItem={handleAddGalleryItem}
          />
        )}

        {/* KATALOG (Catalog: Design cards, Complete specs, Zoom modal, Edit/Add designs, Autofill to form) */}
        {activeSection === 'katalog' && (
          <CatalogSection
            catalogs={catalogs}
            onSelectCatalogForOrder={handleSelectCatalogForOrder}
            onSaveCatalog={handleSaveCatalog}
          />
        )}

        {/* KONTAK (Contact: WhatsApp, Jam Buka, Notes penting, Form pesan cepat) */}
        {activeSection === 'kontak' && (
          <ContactSection config={siteConfig} />
        )}

        {/* FAQ (FAQ: Kapan jadinya, Minimal order, Garansi cetak ulang, dll) */}
        {activeSection === 'faq' && (
          <FAQSection faqs={faqs} config={siteConfig} />
        )}

        {/* DATA FORM (3-Bagian Formulir Pemesanan Undangan Fisik dengan rekomendasi Wajib & Opsional) */}
        {activeSection === 'data-form' && (
          <DataFormSection
            config={siteConfig}
            selectedCatalog={selectedCatalogForOrder}
            onSubmitOrder={handleSubmitOrder}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        config={siteConfig}
        onNavigate={handleNavigate}
        onOpenConfig={() => setIsConfigModalOpen(true)}
      />

      {/* Interactive WhatsApp Floating Button at bottom right */}
      <InteractiveWhatsAppButton config={siteConfig} />

      {/* Centralized Configuration & Owner Guide Modal */}
      <ConfigGuideModal
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        config={siteConfig}
        onSaveConfig={handleSaveConfig}
      />

    </div>
  );
}
