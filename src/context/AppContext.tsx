import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Category, BuyingGuide, CurrencyCode } from '../types';
import { INITIAL_PRODUCTS } from '../data/products';
import { INITIAL_CATEGORIES } from '../data/categories';
import { INITIAL_GUIDES } from '../data/guides';
import { formatPrice as formatPriceUtil, convertPrice as convertPriceUtil } from '../utils/currency';

export type ViewState =
  | { type: 'home' }
  | { type: 'finder'; initialCategory?: string; initialQuery?: string }
  | { type: 'categories' }
  | { type: 'category'; slug: string }
  | { type: 'product'; slug: string }
  | { type: 'compare' }
  | { type: 'guides' }
  | { type: 'guide'; slug: string }
  | { type: 'search'; query: string }
  | { type: 'admin' }
  | { type: 'legal'; page: 'about' | 'contact' | 'privacy' | 'terms' | 'affiliate' | 'cookies' }
  | { type: 'sitemap' };

interface AppContextType {
  products: Product[];
  categories: Category[];
  guides: BuyingGuide[];
  currency: CurrencyCode;
  setCurrency: (curr: CurrencyCode) => void;
  formatPrice: (amountUSD: number) => string;
  convertPrice: (amountUSD: number) => number;
  compareList: string[];
  addToCompare: (productId: string) => boolean;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  isInCompare: (productId: string) => boolean;
  view: ViewState;
  navigate: (view: ViewState) => void;
  quickSearchOpen: boolean;
  setQuickSearchOpen: (open: boolean) => void;
  isAdminLoggedIn: boolean;
  adminLogin: (pass: string) => boolean;
  adminLogout: () => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  resetToDefaults: () => void;
  exportDatabaseJson: () => string;
  importDatabaseJson: (json: string) => { success: boolean; message: string };
  getProductById: (id: string) => Product | undefined;
  getProductBySlug: (slug: string) => Product | undefined;
  getCategoryBySlug: (slug: string) => Category | undefined;
  getGuideBySlug: (slug: string) => BuyingGuide | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products storage
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('wsib_products_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_PRODUCTS;
  });

  // Categories storage
  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem('wsib_categories_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_CATEGORIES;
  });

  // Guides storage
  const [guides, setGuides] = useState<BuyingGuide[]>(() => {
    try {
      const saved = localStorage.getItem('wsib_guides_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_GUIDES;
  });

  // Currency
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    try {
      const saved = localStorage.getItem('wsib_currency');
      if (saved && ['USD', 'GBP', 'EUR', 'CAD', 'AUD'].includes(saved)) {
        return saved as CurrencyCode;
      }
    } catch {
      // fallback
    }
    return 'USD';
  });

  const setCurrency = (curr: CurrencyCode) => {
    setCurrencyState(curr);
    try {
      localStorage.setItem('wsib_currency', curr);
    } catch {
      // ignore
    }
  };

  // Compare list
  const [compareList, setCompareList] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('wsib_compare_list');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('wsib_compare_list', JSON.stringify(compareList));
    } catch {
      // ignore
    }
  }, [compareList]);

  // Admin auth
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem('wsib_admin_session') === 'true';
    } catch {
      return false;
    }
  });

  // Helper to parse path into ViewState
  const parsePathToViewState = (pathname: string, search: string): ViewState => {
    const path = pathname.toLowerCase();
    if (path.startsWith('/finder')) return { type: 'finder' };
    if (path.startsWith('/compare')) return { type: 'compare' };
    if (path.startsWith('/categories')) return { type: 'categories' };
    if (path.startsWith('/admin')) return { type: 'admin' };
    if (path.startsWith('/search')) {
      const params = new URLSearchParams(search);
      const q = params.get('q') || '';
      return { type: 'search', query: q };
    }
    if (path.startsWith('/guides/')) {
      const slug = path.replace('/guides/', '').replace(/\/$/, '');
      if (slug) return { type: 'guide', slug };
    }
    if (path.startsWith('/guides')) return { type: 'guides' };
    if (path.startsWith('/product/')) {
      const slug = path.replace('/product/', '').replace(/\/$/, '');
      if (slug) return { type: 'product', slug };
    }
    if (path.startsWith('/category/')) {
      const slug = path.replace('/category/', '').replace(/\/$/, '');
      if (slug) return { type: 'category', slug };
    }
    // Also support direct category URLs e.g. /laptops, /smartphones, /headphones, /tvs, etc.
    const directCategorySlugs = [
      'laptops', 'smartphones', 'headphones', 'tvs', 'cameras',
      'gaming', 'smartwatches', 'home-appliances', 'kitchen', 'fitness',
      'office', 'audio', 'accessories'
    ];
    const cleanSegment = path.replace(/^\/+|\/+$/g, '');
    if (directCategorySlugs.includes(cleanSegment)) {
      return { type: 'category', slug: cleanSegment };
    }

    if (path.startsWith('/about')) return { type: 'legal', page: 'about' };
    if (path.startsWith('/contact')) return { type: 'legal', page: 'contact' };
    if (path.startsWith('/privacy')) return { type: 'legal', page: 'privacy' };
    if (path.startsWith('/terms')) return { type: 'legal', page: 'terms' };
    if (path.startsWith('/affiliate-disclosure')) return { type: 'legal', page: 'affiliate' };
    if (path.startsWith('/cookies')) return { type: 'legal', page: 'cookies' };
    if (path.startsWith('/sitemap')) return { type: 'sitemap' };
    return { type: 'home' };
  };

  // View state & URL routing
  const [view, setViewState] = useState<ViewState>(() => {
    return parsePathToViewState(window.location.pathname, window.location.search);
  });

  const [quickSearchOpen, setQuickSearchOpen] = useState(false);

  // Sync route on popstate
  useEffect(() => {
    const handlePopState = () => {
      setViewState(parsePathToViewState(window.location.pathname, window.location.search));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (newView: ViewState) => {
    setViewState(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    let url = '/';
    if (newView.type === 'finder') url = '/finder';
    else if (newView.type === 'compare') url = '/compare';
    else if (newView.type === 'categories') url = '/categories';
    else if (newView.type === 'category') url = `/category/${newView.slug}`;
    else if (newView.type === 'product') url = `/product/${newView.slug}`;
    else if (newView.type === 'guides') url = '/guides';
    else if (newView.type === 'guide') url = `/guides/${newView.slug}`;
    else if (newView.type === 'search') url = `/search?q=${encodeURIComponent(newView.query)}`;
    else if (newView.type === 'admin') url = '/admin';
    else if (newView.type === 'legal') {
      if (newView.page === 'affiliate') url = '/affiliate-disclosure';
      else url = `/${newView.page}`;
    } else if (newView.type === 'sitemap') url = '/sitemap.xml';

    const currentFullUrl = window.location.pathname + window.location.search;
    if (currentFullUrl !== url) {
      window.history.pushState({}, '', url);
    }
  };

  const addToCompare = (productId: string): boolean => {
    if (compareList.includes(productId)) return true;
    if (compareList.length >= 4) {
      return false; // Reached maximum limit of 4
    }
    setCompareList([...compareList, productId]);
    return true;
  };

  const removeFromCompare = (productId: string) => {
    setCompareList(compareList.filter(id => id !== productId));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const isInCompare = (productId: string) => {
    return compareList.includes(productId);
  };

  const adminLogin = (pass: string): boolean => {
    // Basic secure administrator pass
    if (pass === 'buyer2026!' || pass === 'admin123') {
      setIsAdminLoggedIn(true);
      try {
        localStorage.setItem('wsib_admin_session', 'true');
      } catch {
        // ignore
      }
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    try {
      localStorage.removeItem('wsib_admin_session');
    } catch {
      // ignore
    }
  };

  const addProduct = (newProduct: Product) => {
    const updated = [newProduct, ...products];
    setProducts(updated);
    try {
      localStorage.setItem('wsib_products_v1', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const updateProduct = (updatedProduct: Product) => {
    const updated = products.map(p => p.id === updatedProduct.id ? updatedProduct : p);
    setProducts(updated);
    try {
      localStorage.setItem('wsib_products_v1', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    try {
      localStorage.setItem('wsib_products_v1', JSON.stringify(updated));
    } catch {
      // ignore
    }
    // Also remove from compare if present
    removeFromCompare(id);
  };

  const resetToDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    setCategories(INITIAL_CATEGORIES);
    setGuides(INITIAL_GUIDES);
    try {
      localStorage.removeItem('wsib_products_v1');
      localStorage.removeItem('wsib_categories_v1');
      localStorage.removeItem('wsib_guides_v1');
    } catch {
      // ignore
    }
  };

  const exportDatabaseJson = (): string => {
    return JSON.stringify({
      version: '1.0',
      exportedAt: new Date().toISOString(),
      products,
      categories,
      guides
    }, null, 2);
  };

  const importDatabaseJson = (jsonString: string): { success: boolean; message: string } => {
    try {
      const data = JSON.parse(jsonString);
      if (Array.isArray(data.products)) {
        setProducts(data.products);
        localStorage.setItem('wsib_products_v1', JSON.stringify(data.products));
      }
      if (Array.isArray(data.categories)) {
        setCategories(data.categories);
        localStorage.setItem('wsib_categories_v1', JSON.stringify(data.categories));
      }
      if (Array.isArray(data.guides)) {
        setGuides(data.guides);
        localStorage.setItem('wsib_guides_v1', JSON.stringify(data.guides));
      }
      return { success: true, message: `Successfully imported ${data.products?.length || 0} products and ${data.categories?.length || 0} categories.` };
    } catch (err: any) {
      return { success: false, message: `Failed to import JSON: ${err?.message || 'Invalid format'}` };
    }
  };

  const getProductById = (id: string) => products.find(p => p.id === id);
  const getProductBySlug = (slug: string) => products.find(p => p.slug === slug);
  const getCategoryBySlug = (slug: string) => categories.find(c => c.slug === slug);
  const getGuideBySlug = (slug: string) => guides.find(g => g.slug === slug);

  return (
    <AppContext.Provider
      value={{
        products,
        categories,
        guides,
        currency,
        setCurrency,
        formatPrice: (amt) => formatPriceUtil(amt, currency),
        convertPrice: (amt) => convertPriceUtil(amt, currency),
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        view,
        navigate,
        quickSearchOpen,
        setQuickSearchOpen,
        isAdminLoggedIn,
        adminLogin,
        adminLogout,
        addProduct,
        updateProduct,
        deleteProduct,
        resetToDefaults,
        exportDatabaseJson,
        importDatabaseJson,
        getProductById,
        getProductBySlug,
        getCategoryBySlug,
        getGuideBySlug,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
