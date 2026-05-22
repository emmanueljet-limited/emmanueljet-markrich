const APP_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://markrich.emmanueljet.com';

export const siteConfig = {
  name: 'MarkRich',
  alternateName: 'emmanueljet markrich',
  url: APP_URL,
  title: 'emmanueljet markrich - clean markdown to rich text',
  titleTemplate: '%s | MarkRich',
  description: 'Pure, semantic rich-text copying without style-bloat. Parse Markdown into perfectly clean, semantic Rich Text optimized for Google Docs, Word, Outlook, & Notion.',
  ogImage: `${APP_URL}/og-image.jpg`,
  keywords: [
    'markrich',
    'emmanueljet',
    'copy rich text',
    'clean rich text',
    'markdown parser',
    'markdown to word',
    'markdown to rich text',
    'markdown to google docs',
    'semantic html clipboard',
    'Emmanuel Joseph (JET)',
  ],
  author: {
    name: 'emmanueljet',
    fullName: 'Emmanuel Joseph (JET)',
    twitter: '@emmanueljet_',
    url: 'https://emmanueljet.com',
  },
  org: {
    name: 'emmanueljet',
    legalName: 'emmanueljet limited',
    url: 'https://emmanueljet.com',
    socials: [
      'https://linkedin.com/company/emmanueljet-limited',
      'https://github.com/emmanueljet-limited',
      'https://x.com/emmanueljet_'
    ]
  },
  features: [
    "Clean Markdown to Rich Text conversion",
    "Strips inline styles and unneeded classes",
    "Optimized for Google Docs, Word, Outlook, and Notion",
    "100% Client-side processing for privacy"
  ]
};

export const orgSchema = {
  "@type": "Organization",
  "legalName": siteConfig.org.legalName,
  "name": siteConfig.org.name,
  "url": siteConfig.org.url,
  "sameAs": siteConfig.org.socials
};

export const personSchema = {
  "@type": "Person",
  "honorificPrefix": "Mr.",
  "givenName": "Emmanuel",
  "familyName": "Joseph",
  "additionalName": "Temitayo",
  "alternateName": "JET",
  "gender": "GenderType::Male",
  "jobTitle": "Software Engineer",
  "email": "mailto:hello@emmanueljet.com",
  "nationality": {
    "@type": "Country",
    "name": "Nigeria",
    "alternateName": "NG"
  },
  "name": siteConfig.author.fullName,
  "url": siteConfig.author.url,
  "sameAs": [
    "https://linkedin.com/in/emmanuelJet",
    "https://github.com/emmanuelJet",
    "https://x.com/emmanuelJet_"
  ]
};

export const applicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": siteConfig.name,
  "url": siteConfig.url,
  "description": siteConfig.description,
  "image": siteConfig.ogImage,
  "alternateName": siteConfig.alternateName,
  "headline": "Clean Markdown to Rich Text conversion",
  "applicationCategory": "UtilityApplication",
  "datePublished": "2026-05-22T00:00:00.000Z",
  "softwareVersion": "1.0.0",
  "countryOfOrigin": "Nigeria",
  "operatingSystem": "Any",
  "inLanguage": "en",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "creator": personSchema,
  "maintainer": orgSchema,
  "publisher": orgSchema,
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "524"
  },
  "featureList": siteConfig.features,
};
