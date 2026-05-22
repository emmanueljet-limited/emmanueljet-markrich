import { MetadataRoute } from 'next';

import { siteConfig } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.url;
  
  return {
    rules: {
      userAgent: '*',
      allow: [
        '/',
        '/*.png?*$',
				'/*.jpg?*$',
				'/*.svg?*$',
				'/*.ico?*$'
      ],
      disallow: [
        '/404',
        '/500'
      ]
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
