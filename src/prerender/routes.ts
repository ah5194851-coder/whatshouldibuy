import { INITIAL_PRODUCTS } from '../data/products';
import { INITIAL_CATEGORIES } from '../data/categories';
import { INITIAL_GUIDES } from '../data/guides';

export interface RouteConfig {
  path: string;
  outputPath: string; // relative to dist/, e.g. "index.html", "product/laptop-slug/index.html", "404.html"
  priority: string;
  changefreq: string;
  includeInSitemap: boolean;
}

export function getAllRoutes(): RouteConfig[] {
  const routes: RouteConfig[] = [];

  // Home
  routes.push({
    path: '/',
    outputPath: 'index.html',
    priority: '1.0',
    changefreq: 'daily',
    includeInSitemap: true,
  });

  // Tools & Hubs
  routes.push({
    path: '/finder',
    outputPath: 'finder/index.html',
    priority: '0.9',
    changefreq: 'daily',
    includeInSitemap: true,
  });

  routes.push({
    path: '/compare',
    outputPath: 'compare/index.html',
    priority: '0.8',
    changefreq: 'daily',
    includeInSitemap: true,
  });

  routes.push({
    path: '/categories',
    outputPath: 'categories/index.html',
    priority: '0.8',
    changefreq: 'weekly',
    includeInSitemap: true,
  });

  routes.push({
    path: '/guides',
    outputPath: 'guides/index.html',
    priority: '0.8',
    changefreq: 'weekly',
    includeInSitemap: true,
  });

  // Categories (/category/:slug)
  for (const cat of INITIAL_CATEGORIES) {
    routes.push({
      path: `/category/${cat.slug}`,
      outputPath: `category/${cat.slug}/index.html`,
      priority: '0.8',
      changefreq: 'weekly',
      includeInSitemap: true,
    });

    // Also direct category slug alias e.g. /laptops
    routes.push({
      path: `/${cat.slug}`,
      outputPath: `${cat.slug}/index.html`,
      priority: '0.7',
      changefreq: 'weekly',
      includeInSitemap: false, // canonical points to /category/:slug
    });
  }

  // Buying Guides (/guides/:slug)
  for (const guide of INITIAL_GUIDES) {
    routes.push({
      path: `/guides/${guide.slug}`,
      outputPath: `guides/${guide.slug}/index.html`,
      priority: '0.8',
      changefreq: 'monthly',
      includeInSitemap: true,
    });
  }

  // Products (/product/:slug)
  for (const prod of INITIAL_PRODUCTS) {
    routes.push({
      path: `/product/${prod.slug}`,
      outputPath: `product/${prod.slug}/index.html`,
      priority: '0.7',
      changefreq: 'weekly',
      includeInSitemap: true,
    });
  }

  // Legal & Editorial
  const legalList = [
    { path: '/about', prio: '0.5' },
    { path: '/affiliate-disclosure', prio: '0.5' },
    { path: '/contact', prio: '0.5' },
    { path: '/privacy', prio: '0.3' },
    { path: '/terms', prio: '0.3' },
    { path: '/cookies', prio: '0.3' },
    { path: '/sitemap', prio: '0.4' },
  ];

  for (const item of legalList) {
    routes.push({
      path: item.path,
      outputPath: `${item.path.slice(1)}/index.html`,
      priority: item.prio,
      changefreq: 'monthly',
      includeInSitemap: true,
    });
  }

  // 404 Error Page
  routes.push({
    path: '/404',
    outputPath: '404.html',
    priority: '0.1',
    changefreq: 'yearly',
    includeInSitemap: false,
  });

  return routes;
}
