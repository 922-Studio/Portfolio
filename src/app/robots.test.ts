import { describe, it, expect } from 'vitest'
import robots from './robots'

describe('robots', () => {
  it('allows all user agents to crawl /', () => {
    const result = robots()
    const allRule = result.rules.find((r) => r.userAgent === '*')
    expect(allRule?.allow).toBe('/')
  })

  it('explicitly allows GPTBot', () => {
    const result = robots()
    const agents = result.rules.map((r) => r.userAgent)
    expect(agents).toContain('GPTBot')
  })

  it('explicitly allows Claude-Web', () => {
    const result = robots()
    const agents = result.rules.map((r) => r.userAgent)
    expect(agents).toContain('Claude-Web')
  })

  it('explicitly allows Google-Extended', () => {
    const result = robots()
    const agents = result.rules.map((r) => r.userAgent)
    expect(agents).toContain('Google-Extended')
  })

  it('explicitly allows PerplexityBot', () => {
    const result = robots()
    const agents = result.rules.map((r) => r.userAgent)
    expect(agents).toContain('PerplexityBot')
  })

  it('sets the sitemap URL', () => {
    const result = robots()
    expect(result.sitemap).toBe('https://gregor.922-studio.com/sitemap.xml')
  })

  it('grants / access to every listed rule', () => {
    const result = robots()
    for (const rule of result.rules) {
      expect(rule.allow).toBe('/')
    }
  })
})
