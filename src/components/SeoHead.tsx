import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { SITE_URL } from '../config/site';
import {
  buildProductTitle,
  buildProductDescription,
  buildCategoryTitle,
  buildCategoryDescription,
  buildGuideTitle,
  buildGuideDescription,
} from '../utils/seoHelpers';

interface SeoProps {
  title?: string;
  description?: string;
  ogType?: 'website' | 'article' | 'product';
  ogImage?: string;
  jsonLd?: Record<string, any> | Record<string, any>[];
  canonicalPath?: string;
}

export const SeoHead: React.FC<SeoProps> = ({
  title,
  description,
  ogType,
  ogImage,
  jsonLd,
  canonicalPath,
}) => {
  const { view, products, getProductBySlug, getCategoryBySlug, getGuideBySlug } = useApp();

  let finalTitle = title;
  let finalDescription = description;
  let finalOgType: 'website' | 'article' | 'product' = ogType || 'website';
  let finalOgImage = ogImage;
  let finalJsonLd = jsonLd;
  let currentPath = canonicalPath || (typeof window !== 'undefined' ? window.location.pathname : '/');
  let isNoIndex = false;

  const origin = typeof window !== 'undefined' ? window.location.origin : SITE_URL;

  // Resolve dynamic metadata based on current view if not explicitly overridden via props
  if (!finalTitle || !finalDescription) {
    if (view.type === 'home') {
      finalTitle = finalTitle || 'What Should I Buy? (2026) – Product Finder & Comparison Tool';
      finalDescription =
        finalDescription ||
        'Find the best laptop for students, best phone under $500, travel headphones, and creator gear in 2026. Compare verified lab specs, pros, cons & live prices.';
      currentPath = '/';
      finalOgType = 'website';

      const homeWebSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        'name': 'What Should I Buy?',
        'url': origin,
        'applicationCategory': 'ShoppingApplication',
        'operatingSystem': 'All',
        'description': finalDescription,
        'potentialAction': {
          '@type': 'SearchAction',
          'target': `${origin}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string'
        },
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD'
        }
      };

      const homeFaqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'What is What Should I Buy?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'What Should I Buy is an independent consumer research and product decision platform. We evaluate laptops, smartphones, headphones, cameras, and home appliances using hands-on lab measurements, transparent trade-offs, and live multi-currency retailer price tracking.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Which laptop should I buy for college in 2026?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'For 90% of students, the Apple MacBook Air M3 (16GB RAM) or Lenovo Yoga Slim 7x is recommended for 14+ hour battery endurance, lightweight portability, and quiet operation in classrooms. For engineering students requiring Windows CAD software, Intel Core Ultra or AMD Ryzen ultrabooks are optimal.'
            }
          },
          {
            '@type': 'Question',
            'name': 'How do you test and evaluate products without sponsored bias?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'We do not accept paid manufacturer placements or sponsored rankings. Every product is evaluated against verified battery drain under real workloads, display color accuracy, thermals, and material durability with mandatory pros and cons.'
            }
          },
          {
            '@type': 'Question',
            'name': 'How does the side-by-side comparison matrix work?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'You can select up to 4 products across any category to view verified hardware specifications, battery runtime tests, retailer price differences, and key deciding differences in a side-by-side grid.'
            }
          }
        ]
      };

      finalJsonLd = finalJsonLd || [homeWebSchema, homeFaqSchema];
    } else if (view.type === 'finder') {
      finalTitle = finalTitle || 'Product Recommendation Finder (2026) – What Should I Buy?';
      finalDescription =
        finalDescription ||
        'Use our interactive decision engine to find what to buy in 2026. Set your budget limit, use case, and priority features for vetted product matches.';
      currentPath = '/finder';
      finalOgType = 'website';
      finalJsonLd = finalJsonLd || [
        {
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          'name': 'What Should I Buy? Finder Engine',
          'url': `${origin}/finder`,
          'applicationCategory': 'ShoppingApplication',
          'description': finalDescription,
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'USD'
          }
        },
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'mainEntity': [
            {
              '@type': 'Question',
              'name': 'How does the Product Recommendation Finder choose matches?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Our matching engine evaluates your selected category, strict budget ceiling, intended use case, and priority hardware features (battery, weight, color accuracy) against verified laboratory benchmarks to calculate a transparent suitability percentage.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Can I filter for budget products under $500 or $800?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes. Use the interactive budget slider or quick presets (Under $300, Under $600, Under $1,000) to find vetted top-value options that meet your needs without overpaying.'
              }
            }
          ]
        }
      ];
    } else if (view.type === 'categories') {
      finalTitle = finalTitle || 'Consumer Product Categories (2026 Buying Guides) – What Should I Buy?';
      finalDescription =
        finalDescription ||
        'Explore 13 vetted product categories: Laptops, Smartphones, Headphones, Cameras, TVs, Gaming, Audio, Kitchen, and Home Appliances with 2026 buying guides.';
      currentPath = '/categories';
      finalOgType = 'website';
    } else if (view.type === 'category') {
      const cat = getCategoryBySlug(view.slug);
      if (cat) {
        const catProducts = products.filter(p => p.category === cat.slug);
        finalTitle = finalTitle || buildCategoryTitle(cat);
        finalDescription = finalDescription || buildCategoryDescription(cat, catProducts);
        currentPath = `/category/${cat.slug}`;
        finalOgType = 'website';
        finalOgImage = finalOgImage || cat.image;

        // Structured Data: CollectionPage + ItemList of top products + HowTo + FAQPage
        const schemas: Record<string, any>[] = [
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            'name': `Best ${cat.pluralName} (2026 Buying Guide)`,
            'description': finalDescription,
            'url': `${origin}/category/${cat.slug}`,
            'mainEntity': {
              '@type': 'ItemList',
              'numberOfItems': catProducts.length,
              'itemListElement': catProducts.map((p, idx) => ({
                '@type': 'ListItem',
                'position': idx + 1,
                'name': p.name,
                'url': `${origin}/product/${p.slug}`,
                'image': p.image
              }))
            }
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': [
              {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Home',
                'item': origin
              },
              {
                '@type': 'ListItem',
                'position': 2,
                'name': 'Categories',
                'item': `${origin}/categories`
              },
              {
                '@type': 'ListItem',
                'position': 3,
                'name': cat.name,
                'item': `${origin}/category/${cat.slug}`
              }
            ]
          }
        ];

        if (cat.howToSteps && cat.howToSteps.length > 0) {
          schemas.push({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            'name': `How to Choose the Best ${cat.name} in 2026`,
            'description': cat.aeoDirectDefinition || cat.description,
            'step': cat.howToSteps.map((step, idx) => ({
              '@type': 'HowToStep',
              'position': idx + 1,
              'name': step.name,
              'text': step.text,
              'url': `${origin}/category/${cat.slug}#step-${idx + 1}`
            }))
          });
        }

        if (cat.faqs && cat.faqs.length > 0) {
          schemas.push({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            'mainEntity': cat.faqs.map(f => ({
              '@type': 'Question',
              'name': f.question,
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': f.answer
              }
            }))
          });
        }

        finalJsonLd = finalJsonLd || schemas;
      }
    } else if (view.type === 'product') {
      const prod = getProductBySlug(view.slug);
      if (prod) {
        finalTitle = finalTitle || buildProductTitle(prod);
        finalDescription = finalDescription || buildProductDescription(prod);
        currentPath = `/product/${prod.slug}`;
        finalOgType = 'product';
        finalOgImage = finalOgImage || prod.image;

        // Rich Product Schema with AggregateOffer, AggregateRating, Positive/Negative Notes, Properties
        const productSchema: Record<string, any> = {
          '@context': 'https://schema.org',
          '@type': 'Product',
          'name': prod.name,
          'image': prod.image,
          'description': finalDescription,
          'brand': {
            '@type': 'Brand',
            'name': prod.brand
          },
          'category': prod.category,
          'offers': {
            '@type': 'AggregateOffer',
            'priceCurrency': 'USD',
            'lowPrice': prod.price,
            'highPrice': prod.originalPrice || prod.price,
            'offerCount': prod.retailers.length,
            'offers': prod.retailers.map(r => ({
              '@type': 'Offer',
              'name': r.name,
              'price': r.price,
              'priceCurrency': 'USD',
              'availability': r.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
              'url': r.affiliateUrl
            }))
          },
          'aggregateRating': {
            '@type': 'AggregateRating',
            'ratingValue': prod.rating,
            'bestRating': 5,
            'worstRating': 1,
            'ratingCount': prod.reviewCount
          },
          'positiveNotes': {
            '@type': 'ItemList',
            'itemListElement': prod.pros.map((p, idx) => ({
              '@type': 'ListItem',
              'position': idx + 1,
              'name': p
            }))
          },
          'negativeNotes': {
            '@type': 'ItemList',
            'itemListElement': prod.cons.map((c, idx) => ({
              '@type': 'ListItem',
              'position': idx + 1,
              'name': c
            }))
          },
          'additionalProperty': Object.entries(prod.specifications || {}).map(([key, value]) => ({
            '@type': 'PropertyValue',
            'name': key,
            'value': value
          }))
        };

        const breadcrumbsSchema: Record<string, any> = {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Home',
              'item': origin
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': prod.category,
              'item': `${origin}/category/${prod.category}`
            },
            {
              '@type': 'ListItem',
              'position': 3,
              'name': prod.name,
              'item': `${origin}/product/${prod.slug}`
            }
          ]
        };

        finalJsonLd = finalJsonLd || [productSchema, breadcrumbsSchema];
      }
    } else if (view.type === 'compare') {
      finalTitle = finalTitle || 'Side-by-Side Product Comparison (2026) – What Should I Buy?';
      finalDescription =
        finalDescription ||
        'Compare specifications, real battery endurance, pros, cons, and live store prices across up to 4 consumer products head-to-head in our 2026 decision matrix.';
      currentPath = '/compare';
      finalOgType = 'website';
      finalJsonLd = finalJsonLd || [
        {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          'name': finalTitle,
          'description': finalDescription,
          'url': `${origin}/compare`
        },
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'mainEntity': [
            {
              '@type': 'Question',
              'name': 'How do I compare products side-by-side on What Should I Buy?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Click "Add to Compare" on any 2 to 4 products in our catalog. The decision matrix will align their verified hardware specifications, battery runtime, weight, pros, cons, and retailer prices in a direct side-by-side comparison table.'
              }
            },
            {
              '@type': 'Question',
              'name': 'How are specifications and battery life verified?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'We do not rely on manufacturer spec sheets alone. Our editorial team validates display nit brightness with colorimeters, tests battery drain under calibrated 200-nit web browsing workloads, and inspects build materials.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Can I compare products from different categories?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes. While comparing products within the same category (e.g. MacBook Air vs Lenovo Yoga) provides the most detailed spec-by-spec rows, you can add any items from across our 13 categories to assess budgets and trade-offs.'
              }
            }
          ]
        }
      ];
    } else if (view.type === 'guides') {
      finalTitle = finalTitle || 'In-Depth Buying Guides & Benchmarks (2026) – What Should I Buy?';
      finalDescription =
        finalDescription ||
        'Independent research and testing guides for college laptops, creator cameras, travel headphones, and gaming TVs. Find what fits your needs.';
      currentPath = '/guides';
      finalOgType = 'website';
    } else if (view.type === 'guide') {
      const guide = getGuideBySlug(view.slug);
      if (guide) {
        finalTitle = finalTitle || buildGuideTitle(guide);
        finalDescription = finalDescription || buildGuideDescription(guide, products);
        currentPath = `/guides/${guide.slug}`;
        finalOgType = 'article';

        // Attempt to find top pick image for og:image
        if (guide.topPickIds && guide.topPickIds.length > 0) {
          const topPickProduct = products.find(p => p.id === guide.topPickIds[0].productId);
          if (topPickProduct?.image) {
            finalOgImage = finalOgImage || topPickProduct.image;
          }
        }

        const articleSchema: Record<string, any> = {
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          'headline': guide.title,
          'description': finalDescription,
          'image': finalOgImage,
          'author': {
            '@type': 'Person',
            'name': guide.author,
            'jobTitle': guide.authorRole
          },
          'publisher': {
            '@type': 'Organization',
            'name': 'What Should I Buy?',
            'url': origin
          },
          'datePublished': guide.publishedDate,
          'dateModified': guide.publishedDate,
          'mainEntityOfPage': {
            '@type': 'WebPage',
            '@id': `${origin}/guides/${guide.slug}`
          },
          'about': guide.categorySlug
        };

        const breadcrumbsSchema: Record<string, any> = {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Home',
              'item': origin
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': 'Guides',
              'item': `${origin}/guides`
            },
            {
              '@type': 'ListItem',
              'position': 3,
              'name': guide.title,
              'item': `${origin}/guides/${guide.slug}`
            }
          ]
        };

        const schemas: Record<string, any>[] = [articleSchema, breadcrumbsSchema];

        if (guide.howToSteps && guide.howToSteps.length > 0) {
          schemas.push({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            'name': `How to Choose: ${guide.title}`,
            'description': guide.aeoTakeaway || guide.summary,
            'step': guide.howToSteps.map((step, idx) => ({
              '@type': 'HowToStep',
              'position': idx + 1,
              'name': step.name,
              'text': step.text,
              'url': `${origin}/guides/${guide.slug}#step-${idx + 1}`
            }))
          });
        }

        if (guide.faqs && guide.faqs.length > 0) {
          schemas.push({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            'mainEntity': guide.faqs.map(f => ({
              '@type': 'Question',
              'name': f.question,
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': f.answer
              }
            }))
          });
        }

        finalJsonLd = finalJsonLd || schemas;
      }
    } else if (view.type === 'search') {
      const q = view.query.trim();
      finalTitle = finalTitle || `"${q.slice(0, 26)}" Search Results – What Should I Buy?`;
      finalDescription =
        finalDescription ||
        `Browse tested products, comparison matrices, and editorial buying guides matching "${q.slice(0, 32)}". Find what fits your budget.`;
      currentPath = `/search?q=${encodeURIComponent(view.query)}`;
      isNoIndex = true; // Best practice for dynamic internal search pages
    } else if (view.type === 'admin') {
      finalTitle = 'Catalog Admin Dashboard – What Should I Buy?';
      finalDescription = 'Product database catalog management, price updates, and affiliate link configuration.';
      currentPath = '/admin';
      isNoIndex = true;
    } else if (view.type === 'legal') {
      const legalMetadata: Record<string, { title: string; desc: string }> = {
        about: {
          title: 'About Our Editorial Standards – What Should I Buy?',
          desc: 'Read our independent testing methodology, lab protocols, conflict of interest policy, and consumer protection mission.'
        },
        affiliate: {
          title: 'Affiliate Disclosure & Transparency – What Should I Buy?',
          desc: 'How What Should I Buy? earns affiliate commissions without compromising editorial integrity, product testing, or honest consumer advice.'
        },
        contact: {
          title: 'Contact Our Editorial Team – What Should I Buy?',
          desc: 'Have questions about our testing methodology, product suggestions, or partnership inquiries? Get in touch with our consumer review team.'
        },
        privacy: {
          title: 'Privacy Policy & Data Protection – What Should I Buy?',
          desc: 'Read our privacy policy regarding data protection, analytics, and cookie practices. We prioritize consumer privacy and transparency.'
        },
        terms: {
          title: 'Terms of Service – What Should I Buy?',
          desc: 'Review the terms and conditions governing the use of What Should I Buy? and our free consumer product recommendation and comparison tools.'
        },
        cookies: {
          title: 'Cookie Policy – What Should I Buy?',
          desc: 'Learn how What Should I Buy? uses cookies and browser storage to remember currency preferences and comparison lists.'
        }
      };

      const meta = legalMetadata[view.page] || {
        title: 'Editorial Standards & Policies – What Should I Buy?',
        desc: 'Official editorial standards, legal terms, and consumer protection policies for What Should I Buy?'
      };

      finalTitle = finalTitle || meta.title;
      finalDescription = finalDescription || meta.desc;
      currentPath = view.page === 'affiliate' ? '/affiliate-disclosure' : `/${view.page}`;
    } else if (view.type === 'sitemap') {
      finalTitle = finalTitle || 'HTML Sitemap & Directory – What Should I Buy?';
      finalDescription =
        finalDescription ||
        'Direct navigation index of all vetted product categories, buying guides, product comparison sheets, and consumer legal standards.';
      currentPath = '/sitemap.xml';
    } else if (view.type === '404') {
      finalTitle = finalTitle || 'Page Not Found (404) – What Should I Buy?';
      finalDescription =
        finalDescription ||
        'The requested page could not be found. Explore tested product guides, finder tools, and reviews on What Should I Buy?';
      currentPath = '/404';
      isNoIndex = true;
    }
  }

  // Effect to synchronize DOM head elements
  useEffect(() => {
    // 1. Document Title
    if (finalTitle) {
      document.title = finalTitle;
    }

    // 2. Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    if (finalDescription) {
      metaDesc.setAttribute('content', finalDescription);
    }

    // 3. Canonical URL
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    const cleanCanonical = currentPath.startsWith('http')
      ? currentPath
      : `${origin}${currentPath.startsWith('/') ? '' : '/'}${currentPath}`;
    linkCanonical.setAttribute('href', cleanCanonical);

    // 4. OpenGraph Tags
    const setMetaProperty = (property: string, content: string | undefined) => {
      if (!content) return;
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMetaProperty('og:title', finalTitle);
    setMetaProperty('og:description', finalDescription);
    setMetaProperty('og:type', finalOgType);
    setMetaProperty('og:url', cleanCanonical);
    setMetaProperty('og:site_name', 'What Should I Buy?');
    if (finalOgImage) {
      const fullImageUrl = finalOgImage.startsWith('http') ? finalOgImage : `${origin}${finalOgImage}`;
      setMetaProperty('og:image', fullImageUrl);
    }

    // 5. Twitter / X Card Tags
    const setMetaName = (name: string, content: string | undefined) => {
      if (!content) return;
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMetaName('twitter:card', 'summary_large_image');
    setMetaName('twitter:title', finalTitle);
    setMetaName('twitter:description', finalDescription);
    if (finalOgImage) {
      const fullImageUrl = finalOgImage.startsWith('http') ? finalOgImage : `${origin}${finalOgImage}`;
      setMetaName('twitter:image', fullImageUrl);
    }

    // 6. Robots Tag for search/admin indexing control
    let robotsTag = document.querySelector('meta[name="robots"]');
    if (!robotsTag) {
      robotsTag = document.createElement('meta');
      robotsTag.setAttribute('name', 'robots');
      document.head.appendChild(robotsTag);
    }
    if (isNoIndex) {
      robotsTag.setAttribute('content', 'noindex, follow');
    } else {
      robotsTag.setAttribute(
        'content',
        'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
      );
    }

    // 7. Schema.org JSON-LD structured data
    let scriptTag = document.getElementById('dynamic-jsonld') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'dynamic-jsonld';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    if (finalJsonLd) {
      scriptTag.textContent = JSON.stringify(finalJsonLd, null, 2);
    } else {
      scriptTag.textContent = '';
    }
  }, [
    finalTitle,
    finalDescription,
    currentPath,
    finalOgType,
    finalOgImage,
    finalJsonLd,
    isNoIndex,
    origin,
  ]);

  return null;
};
