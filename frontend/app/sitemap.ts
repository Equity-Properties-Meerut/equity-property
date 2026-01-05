import { MetadataRoute } from 'next'
import { propertiesAPI } from '@/lib/api'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://equitypropertiesmeerut.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/properties`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/testimonials`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${siteUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${siteUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Dynamic property pages
  let propertyPages: MetadataRoute.Sitemap = []
  
  try {
    const response = await propertiesAPI.getAll({ status: 'active', limit: 1000 })
    if (response.success && response.data) {
      propertyPages = response.data.map((property: any) => ({
        url: `${siteUrl}/properties/${property._id}`,
        lastModified: property.updatedAt ? new Date(property.updatedAt) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }))
    }
  } catch (error) {
    console.error('Error fetching properties for sitemap:', error)
  }

  return [...staticPages, ...propertyPages]
}

