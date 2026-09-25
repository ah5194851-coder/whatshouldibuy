import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { SeoHead } from './components/SeoHead';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CompareTray } from './components/CompareTray';
import { SearchModal } from './components/SearchModal';
import { HomePage } from './pages/HomePage';
import { FinderTool } from './components/FinderTool';
import { CategoriesHubPage } from './pages/CategoriesHubPage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ComparePage } from './pages/ComparePage';
import { GuidesPage } from './pages/GuidesPage';
import { GuideDetailPage } from './pages/GuideDetailPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { AdminPage } from './pages/AdminPage';
import { LegalPage } from './pages/LegalPage';
import { SitemapPage } from './pages/SitemapPage';

const AppContent: React.FC = () => {
  const { view } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA] text-[#18181B] selection:bg-[#E4E4E7] selection:text-[#09090B]">
      {/* Dynamic SEO, OpenGraph and Schema.org Structured Data */}
      <SeoHead />

      {/* Strict 3-zone Top Bar Contract */}
      <Navbar />

      {/* Main Page View Content */}
      <main className="flex-1">
        {view.type === 'home' && <HomePage />}
        {view.type === 'finder' && (
          <FinderTool
            initialCategory={view.initialCategory}
            initialQuery={view.initialQuery}
          />
        )}
        {view.type === 'categories' && <CategoriesHubPage />}
        {view.type === 'category' && <CategoryPage slug={view.slug} />}
        {view.type === 'product' && <ProductDetailPage slug={view.slug} />}
        {view.type === 'compare' && <ComparePage />}
        {view.type === 'guides' && <GuidesPage />}
        {view.type === 'guide' && <GuideDetailPage slug={view.slug} />}
        {view.type === 'search' && <SearchResultsPage query={view.query} />}
        {view.type === 'admin' && <AdminPage />}
        {view.type === 'legal' && <LegalPage page={view.page} />}
        {view.type === 'sitemap' && <SitemapPage />}
      </main>

      {/* Floating Compare Tray (Pops up when 1+ products are queued) */}
      <CompareTray />

      {/* Quick Search Modal (Cmd/Ctrl + K or Header Click) */}
      <SearchModal />

      {/* Comprehensive Trust & Editorial Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
