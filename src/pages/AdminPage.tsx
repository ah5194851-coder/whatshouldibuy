import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';
import heroImg from '../assets/images/hero_product_curation_1790354697983.jpg';
import {
  ShieldCheck,
  Lock,
  Plus,
  Trash2,
  Edit2,
  Download,
  Upload,
  RotateCcw,
  Check,
  X,
  ExternalLink,
  Star
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const {
    products,
    categories,
    guides,
    isAdminLoggedIn,
    adminLogin,
    adminLogout,
    addProduct,
    updateProduct,
    deleteProduct,
    resetToDefaults,
    exportDatabaseJson,
    importDatabaseJson,
    formatPrice
  } = useApp();

  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);

  // Product Edit/Create Modal state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminLogin(passwordInput)) {
      setAuthError(false);
      setPasswordInput('');
    } else {
      setAuthError(true);
    }
  };

  const handleExport = () => {
    const jsonStr = exportDatabaseJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `what-should-i-buy-database-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportSubmit = () => {
    if (!importJsonText.trim()) return;
    const res = importDatabaseJson(importJsonText);
    setImportStatus(res.message);
    if (res.success) {
      setTimeout(() => setImportStatus(null), 4000);
      setImportJsonText('');
    }
  };

  // New blank product template
  const createBlankProduct = (): Product => ({
    id: `prod-${Date.now()}`,
    slug: `product-${Date.now()}`,
    name: 'New Consumer Product',
    brand: 'Acme',
    category: categories[0]?.slug || 'laptops',
    subcategory: 'Standard',
    image: heroImg,
    price: 499,
    originalPrice: 599,
    currency: 'USD',
    rating: 4.7,
    reviewCount: 150,
    productUrl: 'https://example.com',
    affiliateUrl: 'https://amazon.com?tag=whatshouldibuy-20',
    retailers: [
      { name: 'Amazon', price: 499, originalPrice: 599, inStock: true, affiliateUrl: 'https://amazon.com' }
    ],
    specifications: {
      'Dimensions': '12 x 8 x 0.6 inches',
      'Weight': '2.8 lbs',
      'Battery': 'Up to 12 hours'
    },
    features: ['High durability chassis', 'Rapid fast charging'],
    pros: ['Excellent battery life', 'Bright screen'],
    cons: ['Slightly heavy'],
    bestFor: 'General everyday productivity',
    suitabilityNotes: 'Suitable for daily tasks and students.',
    targetPurposes: ['Student + Work', 'Casual / Home'],
    keyStrengths: ['Battery life', 'Lightweight'],
    warranty: '1-Year Limited Warranty',
    lastUpdated: new Date().toISOString().slice(0, 10),
    isFeatured: false
  });

  // Login Barrier
  if (!isAdminLoggedIn) {
    return (
      <div className="py-16 sm:py-24 max-w-md mx-auto px-4">
        <div className="bg-white rounded-2xl border border-[#E4E4E7] p-8 shadow-sm space-y-6 text-center">
          <div className="w-12 h-12 rounded-full bg-[#18181B] text-white flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-[#18181B]">Admin Authentication</h1>
            <p className="text-xs text-[#52525B] mt-1">
              Enter administrator credentials to manage products, categories, guides, and affiliate links.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
            <div>
              <label className="text-xs font-semibold text-[#27272A] block mb-1">
                Admin Passcode
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password (e.g. buyer2026!)"
                className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-[#D4D4D8] focus:border-[#18181B] focus:outline-none"
              />
              <span className="text-[10px] text-[#71717A] mt-1 block">
                Default credentials: <code className="bg-[#F4F4F5] px-1 py-0.5 rounded">buyer2026!</code> or <code className="bg-[#F4F4F5] px-1 py-0.5 rounded">admin123</code>
              </span>
            </div>

            {authError && (
              <p className="text-xs text-[#DC2626] font-medium">
                Incorrect password. Please try again.
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-[#18181B] text-white font-semibold text-xs py-2.5 rounded-lg hover:bg-[#27272A] transition-colors"
            >
              Sign In to Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E4E4E7] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#15803D] uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Administrator Authorized</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#18181B]">
            Product Catalog & Database Manager
          </h1>
          <p className="text-xs text-[#52525B] mt-0.5">
            Total Products: {products.length} · Categories: {categories.length} · Buying Guides: {guides.length}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setEditingProduct(createBlankProduct());
              setIsCreatingNew(true);
            }}
            className="text-xs font-semibold bg-[#18181B] text-white hover:bg-[#27272A] px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>

          <button
            onClick={adminLogout}
            className="text-xs font-medium text-[#71717A] hover:text-[#18181B] px-3 py-2 rounded border border-[#E4E4E7] hover:bg-[#F4F4F5] transition-colors"
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Database Operations Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[#E4E4E7] space-y-2">
          <span className="text-xs font-bold text-[#18181B] block">Export Backup</span>
          <p className="text-[11px] text-[#71717A]">
            Download entire catalog (products, categories, guides) as JSON.
          </p>
          <button
            onClick={handleExport}
            className="text-xs font-semibold px-3 py-1.5 rounded border border-[#E4E4E7] hover:bg-[#F4F4F5] text-[#18181B] flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download JSON Backup</span>
          </button>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E4E4E7] space-y-2">
          <span className="text-xs font-bold text-[#18181B] block">Import Catalog JSON</span>
          <p className="text-[11px] text-[#71717A]">
            Paste JSON database format to restore or bulk insert models.
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder='Paste JSON here...'
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              className="text-xs border border-[#D4D4D8] rounded px-2 py-1 flex-1 focus:outline-none"
            />
            <button
              onClick={handleImportSubmit}
              className="text-xs font-semibold px-2.5 py-1 rounded bg-[#18181B] text-white hover:bg-[#27272A]"
            >
              Import
            </button>
          </div>
          {importStatus && <span className="text-[11px] text-[#16A34A] block">{importStatus}</span>}
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E4E4E7] space-y-2">
          <span className="text-xs font-bold text-[#18181B] block">Reset to Vetted Baseline</span>
          <p className="text-[11px] text-[#71717A]">
            Revert to default factory researched database.
          </p>
          <button
            onClick={() => {
              if (window.confirm('Reset all products and categories to default factory data?')) {
                resetToDefaults();
              }
            }}
            className="text-xs font-medium px-3 py-1.5 rounded border border-[#FECACA] text-[#DC2626] hover:bg-[#FEF2F2] flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Database</span>
          </button>
        </div>
      </div>

      {/* Product List Table */}
      <div className="bg-white rounded-2xl border border-[#E4E4E7] shadow-sm overflow-hidden space-y-3 p-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#F4F4F5]">
          <h2 className="text-base font-bold text-[#18181B]">
            All Managed Products ({products.length})
          </h2>
          <span className="text-xs text-[#71717A]">
            Click Edit to modify specs, pricing, or affiliate links.
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E4E4E7] bg-[#FAFAFA] text-[#71717A]">
                <th className="p-3">Product</th>
                <th className="p-3">Category</th>
                <th className="p-3">Base Price</th>
                <th className="p-3">Featured</th>
                <th className="p-3">Affiliate Link</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4F4F5]">
              {products.map((prod) => (
                <tr key={prod.id} className="hover:bg-[#FAFAFA]">
                  <td className="p-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded border border-[#E4E4E7] overflow-hidden bg-white shrink-0">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-[#18181B]">{prod.name}</div>
                        <div className="text-[10px] text-[#71717A]">{prod.brand}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 capitalize text-[#52525B]">{prod.category}</td>
                  <td className="p-3 font-mono-numbers font-bold text-[#18181B]">
                    {formatPrice(prod.price)}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => updateProduct({ ...prod, isFeatured: !prod.isFeatured })}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        prod.isFeatured
                          ? 'bg-[#18181B] text-white'
                          : 'bg-[#F4F4F5] text-[#71717A]'
                      }`}
                    >
                      {prod.isFeatured ? 'Featured' : 'Standard'}
                    </button>
                  </td>
                  <td className="p-3 max-w-xs truncate text-[11px] text-[#52525B]">
                    <a
                      href={prod.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#18181B] hover:underline flex items-center gap-1"
                    >
                      <span className="truncate">{prod.affiliateUrl}</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditingProduct(prod);
                          setIsCreatingNew(false);
                        }}
                        className="p-1.5 rounded hover:bg-[#E4E4E7] text-[#18181B]"
                        title="Edit product"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete ${prod.name}?`)) {
                            deleteProduct(prod.id);
                          }
                        }}
                        className="p-1.5 rounded hover:bg-[#FEE2E2] text-[#DC2626]"
                        title="Delete product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit/Create Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            
            <div className="p-4 border-b border-[#E4E4E7] flex items-center justify-between">
              <h3 className="font-bold text-base text-[#18181B]">
                {isCreatingNew ? 'Add New Product to Database' : `Edit: ${editingProduct.name}`}
              </h3>
              <button
                onClick={() => setEditingProduct(null)}
                className="text-[#71717A] hover:text-[#18181B] p-1.5 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-[#18181B] block mb-1">Product Name</label>
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full border border-[#D4D4D8] rounded px-3 py-1.5"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#18181B] block mb-1">Brand</label>
                  <input
                    type="text"
                    value={editingProduct.brand}
                    onChange={(e) => setEditingProduct({ ...editingProduct, brand: e.target.value })}
                    className="w-full border border-[#D4D4D8] rounded px-3 py-1.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-bold text-[#18181B] block mb-1">Category</label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full border border-[#D4D4D8] rounded px-2.5 py-1.5"
                  >
                    {categories.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.pluralName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#18181B] block mb-1">Price (USD)</label>
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full border border-[#D4D4D8] rounded px-3 py-1.5 font-mono-numbers"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#18181B] block mb-1">Original / Retail Price</label>
                  <input
                    type="number"
                    value={editingProduct.originalPrice || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, originalPrice: Number(e.target.value) })}
                    className="w-full border border-[#D4D4D8] rounded px-3 py-1.5 font-mono-numbers"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#18181B] block mb-1">Image URL or Local Path</label>
                <input
                  type="text"
                  value={editingProduct.image}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                  className="w-full border border-[#D4D4D8] rounded px-3 py-1.5"
                />
              </div>

              <div>
                <label className="font-bold text-[#18181B] block mb-1">Affiliate URL (Outbound Tracking)</label>
                <input
                  type="text"
                  value={editingProduct.affiliateUrl}
                  onChange={(e) => setEditingProduct({ ...editingProduct, affiliateUrl: e.target.value })}
                  className="w-full border border-[#D4D4D8] rounded px-3 py-1.5"
                />
              </div>

              <div>
                <label className="font-bold text-[#18181B] block mb-1">Best For (Target Audience Summary)</label>
                <input
                  type="text"
                  value={editingProduct.bestFor}
                  onChange={(e) => setEditingProduct({ ...editingProduct, bestFor: e.target.value })}
                  className="w-full border border-[#D4D4D8] rounded px-3 py-1.5"
                />
              </div>

              <div>
                <label className="font-bold text-[#18181B] block mb-1">Suitability Rationale</label>
                <textarea
                  rows={2}
                  value={editingProduct.suitabilityNotes}
                  onChange={(e) => setEditingProduct({ ...editingProduct, suitabilityNotes: e.target.value })}
                  className="w-full border border-[#D4D4D8] rounded px-3 py-1.5"
                />
              </div>

              <div>
                <label className="font-bold text-[#18181B] block mb-1">Pros (Comma-separated)</label>
                <input
                  type="text"
                  value={editingProduct.pros.join(', ')}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      pros: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                    })
                  }
                  className="w-full border border-[#D4D4D8] rounded px-3 py-1.5"
                />
              </div>

              <div>
                <label className="font-bold text-[#18181B] block mb-1">Cons / Trade-Offs (Comma-separated)</label>
                <input
                  type="text"
                  value={editingProduct.cons.join(', ')}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      cons: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                    })
                  }
                  className="w-full border border-[#D4D4D8] rounded px-3 py-1.5"
                />
              </div>

              <div>
                <label className="font-bold text-[#18181B] block mb-1">Warranty Information</label>
                <input
                  type="text"
                  value={editingProduct.warranty}
                  onChange={(e) => setEditingProduct({ ...editingProduct, warranty: e.target.value })}
                  className="w-full border border-[#D4D4D8] rounded px-3 py-1.5"
                />
              </div>
            </div>

            <div className="p-4 border-t border-[#E4E4E7] bg-[#FAFAFA] flex items-center justify-between">
              <button
                onClick={() => setEditingProduct(null)}
                className="text-xs font-semibold px-4 py-2 rounded text-[#52525B] hover:text-[#18181B]"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  if (isCreatingNew) {
                    addProduct(editingProduct);
                  } else {
                    updateProduct(editingProduct);
                  }
                  setEditingProduct(null);
                }}
                className="text-xs font-semibold px-5 py-2 rounded bg-[#18181B] text-white hover:bg-[#27272A] transition-colors"
              >
                Save Product
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
