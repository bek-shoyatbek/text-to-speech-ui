// scripts/generate-sitemap.ts

import { writeFileSync } from 'fs';
import { format } from 'date-fns';

const domain = 'https://free-text-to-speech.vercel.app';

const pages = [
  {
    path: '/',
    priority: '1.0',
    changefreq: 'daily',
  },
  {
    path: '/features',
    priority: '0.8',
    changefreq: 'weekly',
  },
  {
    path: '/how-it-works',
    priority: '0.8',
    changefreq: 'weekly',
  },
  {
    path: '/privacy-policy',
    priority: '0.5',
    changefreq: 'monthly',
  },
  {
    path: '/terms',
    priority: '0.5',
    changefreq: 'monthly',
  },
];

const generateSitemap = () => {
  const currentDate = format(new Date(), 'yyyy-MM-dd');
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(page => `
    <url>
      <loc>${domain}${page.path}</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>${page.changefreq}</changefreq>
      <priority>${page.priority}</priority>
    </url>
  `).join('')}
</urlset>`;

  writeFileSync('public/sitemap.xml', sitemap);
  console.log('Sitemap generated successfully!');
};

generateSitemap();