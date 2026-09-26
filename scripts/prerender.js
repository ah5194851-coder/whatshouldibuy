import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const publicDir = path.resolve(rootDir, 'public');

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function updateOrInsertMeta(html, selector, newTag, matcher) {
  if (matcher.test(html)) {
    return html.replace(matcher, newTag);
  }
  return html.replace('</head>', `  ${newTag}\n</head>`);
}

function processHtmlTemplate(template, appHtml, meta) {
  let result = template;

  // 1. Title
  const titleTag = `<title>${escapeHtml(meta.title)}</title>`;
  if (/<title>[\s\S]*?<\/title>/i.test(result)) {
    result = result.replace(/<title>[\s\S]*?<\/title>/i, titleTag);
  } else {
    result = result.replace('</head>', `  ${titleTag}\n</head>`);
  }

  // 2. Meta Description
  const descTag = `<meta name="description" content="${escapeHtml(meta.description)}" />`;
  result = updateOrInsertMeta(
    result,
    'description',
    descTag,
    /<meta\s+name=["']description["'][^>]*>/i
  );

  // 3. Canonical Link
  const canonicalTag = `<link rel="canonical" href="${escapeHtml(meta.canonicalUrl)}" />`;
  result = updateOrInsertMeta(
    result,
    'canonical',
    canonicalTag,
    /<link\s+rel=["']canonical["'][^>]*>/i
  );

  // 4. OpenGraph Tags
  const ogTitleTag = `<meta property="og:title" content="${escapeHtml(meta.title)}" />`;
  result = updateOrInsertMeta(
    result,
    'og:title',
    ogTitleTag,
    /<meta\s+property=["']og:title["'][^>]*>/i
  );

  const ogDescTag = `<meta property="og:description" content="${escapeHtml(meta.description)}" />`;
  result = updateOrInsertMeta(
    result,
    'og:description',
    ogDescTag,
    /<meta\s+property=["']og:description["'][^>]*>/i
  );

  const ogTypeTag = `<meta property="og:type" content="${escapeHtml(meta.ogType)}" />`;
  result = updateOrInsertMeta(
    result,
    'og:type',
    ogTypeTag,
    /<meta\s+property=["']og:type["'][^>]*>/i
  );

  const ogUrlTag = `<meta property="og:url" content="${escapeHtml(meta.canonicalUrl)}" />`;
  result = updateOrInsertMeta(
    result,
    'og:url',
    ogUrlTag,
    /<meta\s+property=["']og:url["'][^>]*>/i
  );

  if (meta.ogImage) {
    const ogImgTag = `<meta property="og:image" content="${escapeHtml(meta.ogImage)}" />`;
    result = updateOrInsertMeta(
      result,
      'og:image',
      ogImgTag,
      /<meta\s+property=["']og:image["'][^>]*>/i
    );
  }

  const ogSiteTag = `<meta property="og:site_name" content="What Should I Buy?" />`;
  result = updateOrInsertMeta(
    result,
    'og:site_name',
    ogSiteTag,
    /<meta\s+property=["']og:site_name["'][^>]*>/i
  );

  // 5. Twitter Tags
  const twCardTag = `<meta name="twitter:card" content="${escapeHtml(meta.twitterCard || 'summary_large_image')}" />`;
  result = updateOrInsertMeta(
    result,
    'twitter:card',
    twCardTag,
    /<meta\s+name=["']twitter:card["'][^>]*>/i
  );

  const twTitleTag = `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`;
  result = updateOrInsertMeta(
    result,
    'twitter:title',
    twTitleTag,
    /<meta\s+name=["']twitter:title["'][^>]*>/i
  );

  const twDescTag = `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`;
  result = updateOrInsertMeta(
    result,
    'twitter:description',
    twDescTag,
    /<meta\s+name=["']twitter:description["'][^>]*>/i
  );

  if (meta.ogImage) {
    const twImgTag = `<meta name="twitter:image" content="${escapeHtml(meta.ogImage)}" />`;
    result = updateOrInsertMeta(
      result,
      'twitter:image',
      twImgTag,
      /<meta\s+name=["']twitter:image["'][^>]*>/i
    );
  }

  // 6. Robots Tag
  const robotsContent = meta.isNoIndex
    ? 'noindex, nofollow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  const robotsTag = `<meta name="robots" content="${robotsContent}" />`;
  result = updateOrInsertMeta(
    result,
    'robots',
    robotsTag,
    /<meta\s+name=["']robots["'][^>]*>/i
  );

  // 7. Schema.org JSON-LD structured data
  if (meta.jsonLd) {
    const jsonLdTag = `  <script id="dynamic-jsonld" type="application/ld+json">\n${JSON.stringify(
      meta.jsonLd,
      null,
      2
    )}\n  </script>`;

    if (/<script\s+id=["']dynamic-jsonld["'][^>]*>[\s\S]*?<\/script>/i.test(result)) {
      result = result.replace(
        /<script\s+id=["']dynamic-jsonld["'][^>]*>[\s\S]*?<\/script>/i,
        jsonLdTag
      );
    } else {
      result = result.replace('</head>', `${jsonLdTag}\n</head>`);
    }
  }

  // 8. Inject Prerendered HTML Body
  if (result.includes('<div id="root"></div>')) {
    result = result.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  } else if (result.includes('<div id="root">')) {
    result = result.replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${appHtml}</div>`);
  }

  return result;
}

async function runPrerender() {
  console.log('🚀 Starting Static Site Prerendering for What Should I Buy?...');

  // Check template exists
  const templatePath = path.resolve(distDir, 'index.html');
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Client build not found at ${templatePath}. Run 'vite build' first.`);
  }
  const template = fs.readFileSync(templatePath, 'utf-8');

  // Load server entry
  const ssrBuildDir = path.resolve(rootDir, '.ssr-build');
  const serverEntryPath = path.resolve(ssrBuildDir, 'entry-server.js');
  if (!fs.existsSync(serverEntryPath)) {
    throw new Error(`SSR bundle not found at ${serverEntryPath}. Run 'vite build --ssr' first.`);
  }

  // Dynamic import of the bundled server entry
  const { render, getAllRoutes, SITE_URL } = await import(serverEntryPath);
  console.log(`📡 Base SITE_URL: ${SITE_URL}`);

  const routes = getAllRoutes();
  console.log(`📄 Total routes to prerender: ${routes.length}`);

  let successCount = 0;
  for (const route of routes) {
    try {
      const { html, metadata } = render(route.path);
      const finalHtml = processHtmlTemplate(template, html, metadata);

      const targetPath = path.resolve(distDir, route.outputPath);
      fs.mkdirSync(path.dirname(targetPath), { recursive: true });
      fs.writeFileSync(targetPath, finalHtml, 'utf-8');

      successCount++;
      console.log(`  ✓ Prerendered: ${route.path.padEnd(42)} -> dist/${route.outputPath}`);
    } catch (err) {
      console.error(`  ✗ Error prerendering ${route.path}:`, err);
      throw err;
    }
  }

  // Generate sitemap.xml
  const today = new Date().toISOString().slice(0, 10);
  const sitemapRoutes = routes.filter((r) => r.includeInSitemap);
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapRoutes
  .map(
    (r) => `  <url>
    <loc>${SITE_URL}${r.path === '/' ? '/' : r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  // Write sitemap.xml to both public and dist
  fs.mkdirSync(publicDir, { recursive: true });
  fs.writeFileSync(path.resolve(publicDir, 'sitemap.xml'), sitemapXml, 'utf-8');
  fs.writeFileSync(path.resolve(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');
  console.log(`🗺️  Generated sitemap.xml with ${sitemapRoutes.length} URLs`);

  // Generate robots.txt
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
  fs.writeFileSync(path.resolve(publicDir, 'robots.txt'), robotsTxt, 'utf-8');
  fs.writeFileSync(path.resolve(distDir, 'robots.txt'), robotsTxt, 'utf-8');
  console.log('🤖 Generated robots.txt');

  // Clean up temporary .ssr-build
  if (fs.existsSync(ssrBuildDir)) {
    fs.rmSync(ssrBuildDir, { recursive: true, force: true });
  }

  console.log(`\n🎉 Prerendering complete! ${successCount} static HTML pages rendered successfully.`);
}

runPrerender().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
