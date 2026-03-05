import type {MetadataRoute} from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gregor.922-studio.com';

  return [
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          de: `${baseUrl}/de`,
        },
      },
    },
    {
      url: `${baseUrl}/de`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          de: `${baseUrl}/de`,
        },
      },
    },
  ];
}
