import { MetadataRoute } from 'next'

// Fetch all domains from the registry API
async function getAllDomains(): Promise<string[]> {
  try {
    const res = await fetch('https://api.dockai.co/v1/domains', {
      next: { revalidate: 86400 }, // Cache for 24 hours
    })
    if (!res.ok) return []
    const data = await res.json()
    return data.domains || []
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://dockai.co'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/providers`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  // Fetch dynamic entity pages
  const domains = await getAllDomains()
  const entityPages: MetadataRoute.Sitemap = domains.map(domain => ({
    url: `${baseUrl}/e/${encodeURIComponent(domain)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...entityPages]
}
