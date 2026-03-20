jest.setTimeout(30000)

import { describe, test, expect, beforeEach, afterEach } from '@jest/globals'
import { getArticles } from '../lib/data'

describe('Data Layer - Articles', () => {
  const originalEnv = process.env.NEXT_PUBLIC_SITE_URL
  
  beforeEach(() => {
    process.env.NEXT_PUBLIC_SITE_URL = 'http://localhost:3000'
  })
  
  afterEach(() => {
    process.env.NEXT_PUBLIC_SITE_URL = originalEnv
  })
  
  test('getArticles returns fallback data when API fails', async () => {
    // Temporarily override fetch to simulate network error
    const originalFetch = global.fetch
    // @ts-ignore
    global.fetch = () => Promise.reject(new Error('Network error'))
    
    try {
      const articles = await getArticles({})
      expect(Array.isArray(articles)).toBe(true)
      expect(articles.length).toBeGreaterThan(0)
      expect(articles[0]).toHaveProperty('id')
      expect(articles[0]).toHaveProperty('headline')
    } finally {
      // @ts-ignore
      global.fetch = originalFetch
    }
  })
  
  test('getArticles returns real data when API succeeds', async () => {
    // Mock successful API response
    const mockResponse = {
      articles: [
        {
          id: 1,
          slug: 'test-article',
          status: 'new',
          severity: 'medium',
          headline: 'Test Article',
          summary: 'This is a test article',
          tldr: ['Test point 1', 'Test point 2'],
          image_url: null,
          published_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          category: {
            id: 1,
            slug: 'test-category',
            name: 'Test Category',
            description: null,
            icon: '🧪',
            parent_id: null,
          },
          locations: [
            {
              id: 1,
              slug: 'test-location',
              name: 'Test Location',
              location_type: 'country',
              country_id: 1,
              city_id: null,
            },
          ],
        },
      ],
      meta: {
        page: 1,
        limit: 20,
        total: 1,
        total_pages: 1,
      },
    }
    
    // Temporarily override fetch to return mock data
    const originalFetch = global.fetch
    // @ts-ignore
    global.fetch = () => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })
    
    try {
      const articles = await getArticles({})
      expect(articles).toHaveLength(1)
      expect(articles[0].headline).toBe('Test Article')
    } finally {
      // @ts-ignore
      global.fetch = originalFetch
    }
  })
})
