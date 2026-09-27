import { INITIAL_PRODUCTS } from '../data/products';
import { INITIAL_CATEGORIES } from '../data/categories';
import { INITIAL_GUIDES } from '../data/guides';
import { SITE_URL, SITE_NAME } from '../config/site';
import {
  buildProductTitle,
  buildProductDescription,
  buildCategoryTitle,
  buildCategoryDescription,
  buildGuideTitle,
  buildGuideDescription,
} from '../utils/seoHelpers';

export interface PageMetadata {
  title: string;
  description: string;
  canonicalUrl: string;
  ogType: 'website' | 'article' | 'product';
  ogImage: string;
  twitterCard: 'summary_large_image';
  jsonLd: Record<string, any> | Record<string, any>[];
  isNoIndex?: boolean;
}

export function getPageMetadata(route: string): PageMetadata {
  const cleanRoute = (route || '/').toLowerCase().trim().replace(/\/+$/, '') || '/';
  const defaultOgImage = `${SITE_URL}/hero-curation.jpg`;

  // 1. Home
  if (cleanRoute === '/' || cleanRoute === '/index.html') {
    const title = `${SITE_NAME} (2026) – Product Finder & Comparison Tool`;
    const description =
      'Find the best laptop for students, best phone under $500, travel headphones, and creator gear in 2026. Compare verified lab specs, pros, cons & live prices.';
    return {
      title,
      description,
      canonicalUrl: `${SITE_URL}/`,
      ogType: 'website',
      ogImage: defaultOgImage,
      twitterCard: 'summary_large_image',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          'name': SITE_NAME,
          'url': SITE_URL,
          'description': description,
          'potentialAction': {
            '@type': 'SearchAction',
            'target': `${SITE_URL}/search?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
          },
        },
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'mainEntity': [
            {
              '@type': 'Question',
              'name': 'What is What Should I Buy?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'What Should I Buy is an independent consumer research and product decision platform. We evaluate laptops, smartphones, headphones, cameras, and home appliances using hands-on lab measurements, transparent trade-offs, and live multi-currency retailer price tracking.',
              },
            },
            {
              '@type': 'Question',
              'name': 'Which laptop should I buy for college in 2026?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'For 90% of students, the Apple MacBook Air M3 (16GB RAM) or Lenovo Yoga Slim 7x is recommended for 14+ hour battery endurance, lightweight portability, and quiet operation in classrooms. For engineering students requiring Windows CAD software, Intel Core Ultra or AMD Ryzen ultrabooks are optimal.',
              },
            },
            {
              '@type': 'Question',
              'name': 'How do you test and evaluate products without sponsored bias?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'We do not accept paid manufacturer placements or sponsored rankings. Every product is evaluated against verified battery drain under real workloads, display color accuracy, thermals, and material durability with mandatory pros and cons.',
              },
            },
            {
              '@type': 'Question',
              'name': 'How does the side-by-side comparison matrix work?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'You can select up to 4 products across any category to view verified hardware specifications, battery runtime tests, retailer price differences, and key deciding differences in a side-by-side grid.',
              },
            },
          ],
        },
      ],
    };
  }

  // 2. Finder
  if (cleanRoute === '/finder') {
    const title = `Product Recommendation Finder (2026) – ${SITE_NAME}`;
    const description =
      'Use our interactive decision engine to find what to buy in 2026. Set your budget limit, use case, and priority features for vetted product matches.';
    return {
      title,
      description,
      canonicalUrl: `${SITE_URL}/finder`,
      ogType: 'website',
      ogImage: defaultOgImage,
      twitterCard: 'summary_large_image',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          'name': `${SITE_NAME} Finder Engine`,
          'url': `${SITE_URL}/finder`,
          'applicationCategory': 'ShoppingApplication',
          'description': description,
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'USD',
          },
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
                'text': 'Our matching engine evaluates your selected category, strict budget ceiling, intended use case, and priority hardware features (battery, weight, color accuracy) against verified laboratory benchmarks to calculate a transparent suitability percentage.',
              },
            },
            {
              '@type': 'Question',
              'name': 'Can I filter for budget products under $500 or $800?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes. Use the interactive budget slider or quick presets (Under $300, Under $600, Under $1,000) to find vetted top-value options that meet your needs without overpaying.',
              },
            },
          ],
        },
      ],
    };
  }

  // 3. Compare
  if (cleanRoute === '/compare') {
    const title = `Side-by-Side Product Comparison (2026) – ${SITE_NAME}`;
    const description =
      'Compare specifications, real battery endurance, pros, cons, and live store prices across up to 4 consumer products head-to-head in our 2026 decision matrix.';
    return {
      title,
      description,
      canonicalUrl: `${SITE_URL}/compare`,
      ogType: 'website',
      ogImage: defaultOgImage,
      twitterCard: 'summary_large_image',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          'name': title,
          'description': description,
          'url': `${SITE_URL}/compare`,
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
                'text': 'Click "Add to Compare" on any 2 to 4 products in our catalog. The decision matrix will align their verified hardware specifications, battery runtime, weight, pros, cons, and retailer prices in a direct side-by-side comparison table.',
              },
            },
            {
              '@type': 'Question',
              'name': 'How are specifications and battery life verified?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'We do not rely on manufacturer spec sheets alone. Our editorial team validates display nit brightness with colorimeters, tests battery drain under calibrated 200-nit web browsing workloads, and inspects build materials.',
              },
            },
            {
              '@type': 'Question',
              'name': 'Can I compare products from different categories?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes. While comparing products within the same category (e.g. MacBook Air vs Lenovo Yoga) provides the most detailed spec-by-spec rows, you can add any items from across our 13 categories to assess budgets and trade-offs.',
              },
            },
          ],
        },
      ],
    };
  }

  // 4. Categories Hub
  if (cleanRoute === '/categories') {
    const title = `Consumer Product Categories (2026 Buying Guides) – ${SITE_NAME}`;
    const description =
      'Explore 13 vetted product categories: Laptops, Smartphones, Headphones, Cameras, TVs, Gaming, Audio, Kitchen, and Home Appliances with 2026 buying guides.';
    return {
      title,
      description,
      canonicalUrl: `${SITE_URL}/categories`,
      ogType: 'website',
      ogImage: defaultOgImage,
      twitterCard: 'summary_large_image',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        'name': title,
        'description': description,
        'url': `${SITE_URL}/categories`,
      },
    };
  }

  // 5. Guides Hub
  if (cleanRoute === '/guides') {
    const title = `In-Depth Buying Guides & Benchmarks (2026) – ${SITE_NAME}`;
    const description =
      'Independent research and testing guides for college laptops, creator cameras, travel headphones, and gaming TVs. Find what fits your needs.';
    return {
      title,
      description,
      canonicalUrl: `${SITE_URL}/guides`,
      ogType: 'website',
      ogImage: defaultOgImage,
      twitterCard: 'summary_large_image',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        'name': title,
        'description': description,
        'url': `${SITE_URL}/guides`,
      },
    };
  }

  // 6. Individual Product (/product/:slug)
  if (cleanRoute.startsWith('/product/')) {
    const slug = cleanRoute.replace('/product/', '').replace(/\/$/, '');
    const product = INITIAL_PRODUCTS.find((p) => p.slug === slug);
    if (product) {
      const title = buildProductTitle(product);
      const description = buildProductDescription(product);
      const canonicalUrl = `${SITE_URL}/product/${product.slug}`;
      const imageUrl = product.image.startsWith('http') ? product.image : `${SITE_URL}${product.image}`;

      const productSchema: Record<string, any> = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': product.name,
        'image': imageUrl,
        'description': description,
        'brand': {
          '@type': 'Brand',
          'name': product.brand,
        },
        'category': product.category,
        'offers': {
          '@type': 'AggregateOffer',
          'priceCurrency': 'USD',
          'lowPrice': product.price,
          'highPrice': product.originalPrice || product.price,
          'offerCount': product.retailers.length,
          'offers': product.retailers.map((r) => ({
            '@type': 'Offer',
            'name': r.name,
            'price': r.price,
            'priceCurrency': 'USD',
            'availability': r.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
            'url': r.affiliateUrl,
          })),
        },
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': product.rating,
          'bestRating': 5,
          'worstRating': 1,
          'ratingCount': product.reviewCount,
        },
        'positiveNotes': {
          '@type': 'ItemList',
          'itemListElement': product.pros.map((p, idx) => ({
            '@type': 'ListItem',
            'position': idx + 1,
            'name': p,
          })),
        },
        'negativeNotes': {
          '@type': 'ItemList',
          'itemListElement': product.cons.map((c, idx) => ({
            '@type': 'ListItem',
            'position': idx + 1,
            'name': c,
          })),
        },
        'additionalProperty': Object.entries(product.specifications || {}).map(([key, value]) => ({
          '@type': 'PropertyValue',
          'name': key,
          'value': value,
        })),
      };

      const breadcrumbSchema: Record<string, any> = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': `${SITE_URL}/`,
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': product.category,
            'item': `${SITE_URL}/category/${product.category}`,
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': product.name,
            'item': canonicalUrl,
          },
        ],
      };

      return {
        title,
        description,
        canonicalUrl,
        ogType: 'product',
        ogImage: imageUrl,
        twitterCard: 'summary_large_image',
        jsonLd: [productSchema, breadcrumbSchema],
      };
    }
  }

  // 7. Individual Category (/category/:slug or /:slug)
  const categorySlug = cleanRoute.startsWith('/category/')
    ? cleanRoute.replace('/category/', '').replace(/\/$/, '')
    : cleanRoute.replace(/^\/+/, '');

  const category = INITIAL_CATEGORIES.find((c) => c.slug === categorySlug);
  if (category) {
    const catProducts = INITIAL_PRODUCTS.filter((p) => p.category === category.slug);
    const title = buildCategoryTitle(category);
    const description = buildCategoryDescription(category, catProducts);
    const canonicalUrl = `${SITE_URL}/category/${category.slug}`;
    const imageUrl = category.image.startsWith('http') ? category.image : `${SITE_URL}${category.image}`;

    const collectionSchema: Record<string, any> = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      'name': `Best ${category.pluralName} (2026 Buying Guide)`,
      'description': description,
      'url': canonicalUrl,
      'mainEntity': {
        '@type': 'ItemList',
        'numberOfItems': catProducts.length,
        'itemListElement': catProducts.map((p, idx) => ({
          '@type': 'ListItem',
          'position': idx + 1,
          'name': p.name,
          'url': `${SITE_URL}/product/${p.slug}`,
          'image': p.image.startsWith('http') ? p.image : `${SITE_URL}${p.image}`,
        })),
      },
    };

    const breadcrumbSchema: Record<string, any> = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': `${SITE_URL}/`,
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': 'Categories',
          'item': `${SITE_URL}/categories`,
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'name': category.name,
          'item': canonicalUrl,
        },
      ],
    };

    const schemas: Record<string, any>[] = [collectionSchema, breadcrumbSchema];

    if (category.howToSteps && category.howToSteps.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        'name': `How to Choose the Best ${category.name} in 2026`,
        'description': category.aeoDirectDefinition || category.description,
        'step': category.howToSteps.map((step, idx) => ({
          '@type': 'HowToStep',
          'position': idx + 1,
          'name': step.name,
          'text': step.text,
          'url': `${canonicalUrl}#step-${idx + 1}`,
        })),
      });
    }

    if (category.faqs && category.faqs.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': category.faqs.map((f) => ({
          '@type': 'Question',
          'name': f.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': f.answer,
          },
        })),
      });
    }

    return {
      title,
      description,
      canonicalUrl,
      ogType: 'website',
      ogImage: imageUrl,
      twitterCard: 'summary_large_image',
      jsonLd: schemas,
    };
  }

  // 8. Individual Buying Guide (/guides/:slug)
  if (cleanRoute.startsWith('/guides/')) {
    const slug = cleanRoute.replace('/guides/', '').replace(/\/$/, '');
    const guide = INITIAL_GUIDES.find((g) => g.slug === slug);
    if (guide) {
      const title = buildGuideTitle(guide);
      const description = buildGuideDescription(guide, INITIAL_PRODUCTS);
      const canonicalUrl = `${SITE_URL}/guides/${guide.slug}`;

      let imageUrl = defaultOgImage;
      if (guide.topPickIds && guide.topPickIds.length > 0) {
        const topProd = INITIAL_PRODUCTS.find((p) => p.id === guide.topPickIds[0].productId);
        if (topProd?.image) {
          imageUrl = topProd.image.startsWith('http') ? topProd.image : `${SITE_URL}${topProd.image}`;
        }
      }

      const articleSchema: Record<string, any> = {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        'headline': guide.title,
        'description': description,
        'image': imageUrl,
        'author': {
          '@type': 'Person',
          'name': guide.author,
          'jobTitle': guide.authorRole,
        },
        'publisher': {
          '@type': 'Organization',
          'name': SITE_NAME,
          'url': SITE_URL,
        },
        'datePublished': guide.publishedDate,
        'dateModified': guide.publishedDate,
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': canonicalUrl,
        },
        'about': guide.categorySlug,
      };

      const breadcrumbSchema: Record<string, any> = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': `${SITE_URL}/`,
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Guides',
            'item': `${SITE_URL}/guides`,
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': guide.title,
            'item': canonicalUrl,
          },
        ],
      };

      const schemas: Record<string, any>[] = [articleSchema, breadcrumbSchema];

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
            'url': `${canonicalUrl}#step-${idx + 1}`,
          })),
        });
      }

      if (guide.faqs && guide.faqs.length > 0) {
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'mainEntity': guide.faqs.map((f) => ({
            '@type': 'Question',
            'name': f.question,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': f.answer,
            },
          })),
        });
      }

      return {
        title,
        description,
        canonicalUrl,
        ogType: 'article',
        ogImage: imageUrl,
        twitterCard: 'summary_large_image',
        jsonLd: schemas,
      };
    }
  }

  // 9. Legal & Editorial Pages
  const legalPages: Record<string, { title: string; desc: string; path: string }> = {
    '/about': {
      title: `About Our Editorial Standards – ${SITE_NAME}`,
      desc: 'Read our independent testing methodology, lab protocols, conflict of interest policy, and consumer protection mission.',
      path: '/about',
    },
    '/affiliate-disclosure': {
      title: `Affiliate Disclosure & Transparency – ${SITE_NAME}`,
      desc: 'How What Should I Buy? earns affiliate commissions without compromising editorial integrity, product testing, or honest consumer advice.',
      path: '/affiliate-disclosure',
    },
    '/contact': {
      title: `Contact Our Editorial Team – ${SITE_NAME}`,
      desc: 'Have questions about our testing methodology, product suggestions, or partnership inquiries? Get in touch with our consumer review team.',
      path: '/contact',
    },
    '/privacy': {
      title: `Privacy Policy & Data Protection – ${SITE_NAME}`,
      desc: 'Read our privacy policy regarding data protection, analytics, and cookie practices. We prioritize consumer privacy and transparency.',
      path: '/privacy',
    },
    '/terms': {
      title: `Terms of Service – ${SITE_NAME}`,
      desc: 'Review the terms and conditions governing the use of What Should I Buy? and our free consumer product recommendation and comparison tools.',
      path: '/terms',
    },
    '/cookies': {
      title: `Cookie Policy – ${SITE_NAME}`,
      desc: 'Learn how What Should I Buy? uses cookies and browser storage to remember currency preferences and comparison lists.',
      path: '/cookies',
    },
    '/sitemap': {
      title: `HTML Sitemap & Directory – ${SITE_NAME}`,
      desc: 'Direct navigation index of all vetted product categories, buying guides, product comparison sheets, and consumer legal standards.',
      path: '/sitemap',
    },
  };

  if (legalPages[cleanRoute]) {
    const page = legalPages[cleanRoute];
    return {
      title: page.title,
      description: page.desc,
      canonicalUrl: `${SITE_URL}${page.path}`,
      ogType: 'website',
      ogImage: defaultOgImage,
      twitterCard: 'summary_large_image',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'name': page.title,
        'description': page.desc,
        'url': `${SITE_URL}${page.path}`,
      },
    };
  }

  // 10. 404 Not Found
  return {
    title: `Page Not Found (404) – ${SITE_NAME}`,
    description:
      'The requested page could not be found. Explore tested product guides, finder tools, and reviews on What Should I Buy?',
    canonicalUrl: `${SITE_URL}/404`,
    ogType: 'website',
    ogImage: defaultOgImage,
    twitterCard: 'summary_large_image',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': 'Page Not Found (404)',
      'url': `${SITE_URL}/404`,
    },
    isNoIndex: true,
  };
}
