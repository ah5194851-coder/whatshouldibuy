import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FileCode, Copy, Check, ExternalLink } from 'lucide-react';

export const SitemapPage: React.FC = () => {
  const { products, categories, guides, navigate } = useApp();
  const [tab, setTab] = useState<'sitemap' | 'robots' | 'links'>('sitemap');
  const [copied, setCopied] = useState(false);

  const origin = window.location.origin;
  const today = new Date().toISOString().slice(0, 10);

  // Generate XML Sitemap string
  const staticUrls = [
    { loc: `${origin}/`, priority: '1.0', changefreq: 'daily' },
    { loc: `${origin}/finder`, priority: '0.9', changefreq: 'daily' },
    { loc: `${origin}/categories`, priority: '0.8', changefreq: 'weekly' },
    { loc: `${origin}/compare`, priority: '0.8', changefreq: 'daily' },
    { loc: `${origin}/guides`, priority: '0.8', changefreq: 'weekly' },
    { loc: `${origin}/about`, priority: '0.5', changefreq: 'monthly' },
    { loc: `${origin}/affiliate-disclosure`, priority: '0.5', changefreq: 'monthly' },
    { loc: `${origin}/contact`, priority: '0.5', changefreq: 'monthly' },
    { loc: `${origin}/privacy`, priority: '0.3', changefreq: 'monthly' },
    { loc: `${origin}/terms`, priority: '0.3', changefreq: 'monthly' },
    { loc: `${origin}/cookies`, priority: '0.3', changefreq: 'monthly' },
  ];

  const categoryUrls = categories.map((c) => ({
    loc: `${origin}/category/${c.slug}`,
    priority: '0.8',
    changefreq: 'weekly'
  }));

  const guideUrls = guides.map((g) => ({
    loc: `${origin}/guides/${g.slug}`,
    priority: '0.7',
    changefreq: 'monthly'
  }));

  const productUrls = products.map((p) => ({
    loc: `${origin}/product/${p.slug}`,
    priority: '0.7',
    changefreq: 'weekly'
  }));

  const allUrls = [...staticUrls, ...categoryUrls, ...guideUrls, ...productUrls];

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  const robotsContent = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

Sitemap: ${origin}/sitemap.xml`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-8 sm:py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      <div className="border-b border-[#E4E4E7] pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[#71717A] mb-1">
            Technical Search Engine Optimization
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#18181B]">
            XML Sitemap & Crawl Directives
          </h1>
          <p className="text-sm text-[#52525B] mt-1">
            Indexed index of {allUrls.length} canonical URLs, category landing pages, and search robot rules.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setTab('sitemap')}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
              tab === 'sitemap' ? 'bg-[#18181B] text-white' : 'bg-[#F4F4F5] text-[#52525B]'
            }`}
          >
            sitemap.xml
          </button>
          <button
            onClick={() => setTab('robots')}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
              tab === 'robots' ? 'bg-[#18181B] text-white' : 'bg-[#F4F4F5] text-[#52525B]'
            }`}
          >
            robots.txt
          </button>
          <button
            onClick={() => setTab('links')}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
              tab === 'links' ? 'bg-[#18181B] text-white' : 'bg-[#F4F4F5] text-[#52525B]'
            }`}
          >
            URL Directory ({allUrls.length})
          </button>
        </div>
      </div>

      {tab === 'sitemap' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#71717A]">
              Standard XML 0.9 Sitemap Protocol
            </span>
            <button
              onClick={() => handleCopy(xmlContent)}
              className="text-xs font-semibold px-3 py-1.5 rounded border border-[#E4E4E7] hover:bg-[#F4F4F5] flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#16A34A]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy XML'}</span>
            </button>
          </div>

          <pre className="bg-[#18181B] text-[#E4E4E7] p-5 rounded-2xl text-xs font-mono overflow-x-auto max-h-[600px] leading-relaxed">
            {xmlContent}
          </pre>
        </div>
      )}

      {tab === 'robots' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#71717A]">
              Robots Exclusion Standard
            </span>
            <button
              onClick={() => handleCopy(robotsContent)}
              className="text-xs font-semibold px-3 py-1.5 rounded border border-[#E4E4E7] hover:bg-[#F4F4F5] flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#16A34A]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy robots.txt'}</span>
            </button>
          </div>

          <pre className="bg-[#18181B] text-[#E4E4E7] p-5 rounded-2xl text-xs font-mono overflow-x-auto leading-relaxed">
            {robotsContent}
          </pre>
        </div>
      )}

      {tab === 'links' && (
        <div className="bg-white rounded-2xl border border-[#E4E4E7] p-6 space-y-6">
          <h2 className="font-bold text-base text-[#18181B]">Live URL Index</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {allUrls.map((u, i) => (
              <a
                key={i}
                href={u.loc}
                onClick={(e) => {
                  e.preventDefault();
                  const path = u.loc.replace(origin, '');
                  if (path === '/') navigate({ type: 'home' });
                  else if (path === '/finder') navigate({ type: 'finder' });
                  else if (path === '/categories') navigate({ type: 'categories' });
                  else if (path === '/compare') navigate({ type: 'compare' });
                  else if (path === '/guides') navigate({ type: 'guides' });
                  else if (path.startsWith('/category/')) navigate({ type: 'category', slug: path.replace('/category/', '') });
                  else if (path.startsWith('/guides/')) navigate({ type: 'guide', slug: path.replace('/guides/', '') });
                  else if (path.startsWith('/product/')) navigate({ type: 'product', slug: path.replace('/product/', '') });
                  else if (path === '/about') navigate({ type: 'legal', page: 'about' });
                  else if (path === '/contact') navigate({ type: 'legal', page: 'contact' });
                  else if (path === '/privacy') navigate({ type: 'legal', page: 'privacy' });
                  else if (path === '/terms') navigate({ type: 'legal', page: 'terms' });
                  else if (path === '/affiliate-disclosure') navigate({ type: 'legal', page: 'affiliate' });
                }}
                className="p-2.5 rounded-lg border border-[#E4E4E7] hover:border-[#18181B] text-[#18181B] flex items-center justify-between hover:bg-[#FAFAFA] transition-colors"
              >
                <span className="truncate">{u.loc}</span>
                <ExternalLink className="w-3 h-3 text-[#71717A] shrink-0 ml-2" />
              </a>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
