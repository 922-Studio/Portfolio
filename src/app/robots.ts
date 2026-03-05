import type {MetadataRoute} from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {userAgent: '*', allow: '/'},
      {userAgent: 'GPTBot', allow: '/'},
      {userAgent: 'Google-Extended', allow: '/'},
      {userAgent: 'Claude-Web', allow: '/'},
      {userAgent: 'PerplexityBot', allow: '/'},
      {userAgent: 'Amazonbot', allow: '/'},
    ],
    sitemap: 'https://gregor.922-studio.com/sitemap.xml',
  };
}
