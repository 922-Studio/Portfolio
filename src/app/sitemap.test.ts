import { describe, it, expect } from 'vitest'
import sitemap from './sitemap'

const BASE = 'https://gregor.922-studio.com'

describe('sitemap', () => {
  it('returns exactly two entries', () => {
    expect(sitemap()).toHaveLength(2)
  })

  it('includes the /en URL', () => {
    const urls = sitemap().map((e) => e.url)
    expect(urls).toContain(`${BASE}/en`)
  })

  it('includes the /de URL', () => {
    const urls = sitemap().map((e) => e.url)
    expect(urls).toContain(`${BASE}/de`)
  })

  it('sets lastModified to a Date instance', () => {
    for (const entry of sitemap()) {
      expect(entry.lastModified).toBeInstanceOf(Date)
    }
  })

  it('includes hreflang alternates on the /en entry', () => {
    const enEntry = sitemap().find((e) => e.url === `${BASE}/en`)
    expect(enEntry?.alternates?.languages).toEqual({
      en: `${BASE}/en`,
      de: `${BASE}/de`,
    })
  })

  it('includes hreflang alternates on the /de entry', () => {
    const deEntry = sitemap().find((e) => e.url === `${BASE}/de`)
    expect(deEntry?.alternates?.languages).toEqual({
      en: `${BASE}/en`,
      de: `${BASE}/de`,
    })
  })
})
