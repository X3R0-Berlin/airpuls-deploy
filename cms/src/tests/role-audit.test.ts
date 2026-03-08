/**
 * CMS Rollen-Audit-Tests
 *
 * Prüft aus Sicht jeder Experten-Rolle, ob das CMS genau die
 * Collections, Globals und Felder enthält, die jede Rolle braucht.
 *
 * Gleichzeitig wird sichergestellt, dass KEINE ungenutzten
 * Collections, Globals oder Felder existieren.
 */

import { describe, it, expect } from 'vitest'
import type { CollectionConfig, GlobalConfig, Field, Tab, Block } from 'payload'

// === Collections importieren ===
import { Users } from '../collections/Users'
import { Products } from '../collections/Products'
import { Features } from '../collections/Features'
import { Testimonials } from '../collections/Testimonials'
import { Stats } from '../collections/Stats'
import { FAQ } from '../collections/FAQ'
import { Bundles } from '../collections/Bundles'
import { Comparison } from '../collections/Comparison'
import { Affiliate } from '../collections/Affiliate'
import { LegalPages } from '../collections/LegalPages'
import { Pages } from '../collections/Pages'
import { Media } from '../collections/Media'

// === Globals importieren ===
import { Brand } from '../globals/Brand'
import { Homepage } from '../globals/Homepage'

// ──────────────────────────────────────────────────────────────
// Hilfsfunktionen: Felder aus Payload-Konfigurationen extrahieren
// ──────────────────────────────────────────────────────────────

/** Alle benannten Felder (name) rekursiv extrahieren */
function extractFieldNames(fields: Field[]): string[] {
  const names: string[] = []

  for (const field of fields) {
    // Felder mit Name (reguläre Felder)
    if ('name' in field && field.name) {
      names.push(field.name)
    }

    // Container-Felder: Kinder durchsuchen
    if (field.type === 'row' || field.type === 'collapsible') {
      names.push(...extractFieldNames((field as { fields: Field[] }).fields))
    }

    // Tabs: Jedes Tab hat eigene Felder
    if (field.type === 'tabs') {
      const tabField = field as { tabs: Tab[] }
      for (const tab of tabField.tabs) {
        names.push(...extractFieldNames(tab.fields))
      }
    }

    // Group-Felder: Unterfelder extrahieren (als name.subName)
    if (field.type === 'group' && 'fields' in field) {
      const groupField = field as { name: string; fields: Field[] }
      const subNames = extractFieldNames(groupField.fields)
      for (const sub of subNames) {
        names.push(`${groupField.name}.${sub}`)
      }
    }

    // Array-Felder: Unterfelder extrahieren (als name.subName)
    if (field.type === 'array' && 'fields' in field) {
      const arrayField = field as { name: string; fields: Field[] }
      const subNames = extractFieldNames(arrayField.fields)
      for (const sub of subNames) {
        names.push(`${arrayField.name}.${sub}`)
      }
    }
  }

  return names
}

/** Nur Top-Level-Felder (ohne Punkt) extrahieren */
function extractTopLevelFieldNames(fields: Field[]): string[] {
  const names: string[] = []

  for (const field of fields) {
    if ('name' in field && field.name) {
      names.push(field.name)
    }
    if (field.type === 'row' || field.type === 'collapsible') {
      names.push(...extractTopLevelFieldNames((field as { fields: Field[] }).fields))
    }
    if (field.type === 'tabs') {
      const tabField = field as { tabs: Tab[] }
      for (const tab of tabField.tabs) {
        names.push(...extractTopLevelFieldNames(tab.fields))
      }
    }
  }

  return names
}

/** Block-Slugs aus einem Blocks-Feld extrahieren */
function extractBlockSlugs(fields: Field[]): string[] {
  const slugs: string[] = []

  for (const field of fields) {
    if (field.type === 'blocks' && 'blocks' in field) {
      const blocksField = field as { blocks: Block[] }
      for (const block of blocksField.blocks) {
        slugs.push(block.slug)
      }
    }
    if (field.type === 'tabs') {
      const tabField = field as { tabs: Tab[] }
      for (const tab of tabField.tabs) {
        slugs.push(...extractBlockSlugs(tab.fields))
      }
    }
  }

  return slugs
}

/** Tab-Labels aus einer Collection extrahieren */
function extractTabLabels(fields: Field[]): string[] {
  const labels: string[] = []

  for (const field of fields) {
    if (field.type === 'tabs') {
      const tabField = field as { tabs: Tab[] }
      for (const tab of tabField.tabs) {
        if ('label' in tab && typeof tab.label === 'string') {
          labels.push(tab.label)
        }
      }
    }
  }

  return labels
}

// ──────────────────────────────────────────────────────────────
// Konfigurationsmaps
// ──────────────────────────────────────────────────────────────

const allCollections: Record<string, CollectionConfig> = {
  users: Users,
  products: Products,
  features: Features,
  testimonials: Testimonials,
  stats: Stats,
  faq: FAQ,
  bundles: Bundles,
  comparison: Comparison,
  'affiliate-tiers': Affiliate,
  'legal-pages': LegalPages,
  pages: Pages,
  media: Media,
}

const allGlobals: Record<string, GlobalConfig> = {
  brand: Brand,
  homepage: Homepage,
}

// ──────────────────────────────────────────────────────────────
// Rollen-Definitionen: Welche Rolle braucht welche Collections/Felder
// ──────────────────────────────────────────────────────────────

interface RoleDefinition {
  name: string
  kuerzel: string
  collections: Record<string, string[]> // slug → benötigte Top-Level-Felder
  globals: Record<string, string[]>      // slug → benötigte Top-Level-Felder
  pageBlocks?: string[]                  // Block-Slugs in Pages (falls relevant)
  homepageBlocks?: string[]              // Block-Slugs in Homepage (falls relevant)
}

const roles: RoleDefinition[] = [
  // ─── 1. Content-Redakteur ──────────────────────────────────
  {
    name: 'Content-Redakteur',
    kuerzel: 'redakteur',
    collections: {
      pages: [
        'title', 'slug', 'status',
        'subtitle', 'description', 'headerStyle', 'showBreadcrumb', 'headerImage',
        'sections',
        'metaTitle', 'metaDescription', 'noIndex',
      ],
      faq: ['category', 'sortOrder', 'question', 'answer'],
      features: ['sortOrder', 'icon', 'title', 'description', 'video', 'poster'],
      'legal-pages': ['slug', 'title', 'content'],
    },
    globals: {},
    pageBlocks: [
      'richtext', 'product-grid', 'faq-section', 'comparison-table',
      'affiliate-tiers', 'contact-form', 'testimonials', 'stats-bar',
      'features', 'newsletter', 'cta-banner', 'image-text',
      'product-finder', 'spacer', 'divider',
    ],
  },

  // ─── 2. Produkt-Manager ────────────────────────────────────
  {
    name: 'Produkt-Manager',
    kuerzel: 'produkt',
    collections: {
      products: [
        'name', 'slug', 'collection', 'subtitle', 'designer', 'description',
        'price', 'priceDisplay', 'currency', 'taxNote', 'freeShipping',
        'inStock', 'comingSoon', 'featured', 'maxQuantity',
        'heroTagline', 'heroHeading', 'heroDescription', 'heroVideo',
        'images',
        'details',
        'specs',
        'marqueeItems', 'trustBadges', 'hotspots',
      ],
      bundles: ['slug', 'name', 'description', 'price', 'priceDisplay', 'icon', 'forProducts'],
      comparison: [
        'sortOrder', 'label', 'type',
        'vitairValue', 'solitairValue', 'preventairValue',
        'vitairCheck', 'solitairCheck', 'preventairCheck',
      ],
    },
    globals: {},
  },

  // ─── 3. Marketing-Manager ─────────────────────────────────
  {
    name: 'Marketing-Manager',
    kuerzel: 'marketing',
    collections: {
      testimonials: ['author', 'product', 'stars', 'verified', 'text', 'location', 'avatar', 'purchaseDate'],
      stats: ['sortOrder', 'value', 'suffix', 'label'],
    },
    globals: {
      homepage: ['metaTitle', 'metaDescription', 'sections'],
    },
    homepageBlocks: [
      'hero', 'marquee', 'features', 'stats', 'product-showcase',
      'detail-sections', 'lifestyle-gallery', 'product-comparison',
      'product-finder', 'testimonials', 'affiliate-cta', 'newsletter', 'richtext',
    ],
  },

  // ─── 4. Partner-Manager ────────────────────────────────────
  {
    name: 'Partner-Manager',
    kuerzel: 'partner',
    collections: {
      'affiliate-tiers': [
        'sortOrder', 'tierId', 'name', 'commission',
        'description', 'benefits', 'estimatedEarning',
      ],
    },
    globals: {},
  },

  // ─── 5. SEO-Manager ────────────────────────────────────────
  {
    name: 'SEO-Manager',
    kuerzel: 'seo',
    collections: {
      pages: ['slug', 'metaTitle', 'metaDescription', 'noIndex'],
    },
    globals: {
      homepage: ['metaTitle', 'metaDescription'],
      brand: ['seo'],
    },
  },

  // ─── 6. Marken-Manager ─────────────────────────────────────
  {
    name: 'Marken-Manager',
    kuerzel: 'marke',
    collections: {
      users: ['name', 'role'],
      media: ['alt'],
    },
    globals: {
      brand: [
        'name', 'logoParts', 'tagline', 'companyLegal', 'language',
        'logoImage', 'logoInverse', 'logoIcon',
        'currency', 'colors', 'fonts', 'social', 'seo',
      ],
    },
  },
]

// ══════════════════════════════════════════════════════════════
// TESTS
// ══════════════════════════════════════════════════════════════

// ──────────────────────────────────────────────────────────────
// 1. Vollständigkeit: Alle Collections/Globals sind abgedeckt
// ──────────────────────────────────────────────────────────────

describe('Vollständigkeit: Jede Collection/Global gehört zu mindestens einer Rolle', () => {
  const allAssignedCollections = new Set<string>()
  const allAssignedGlobals = new Set<string>()

  for (const role of roles) {
    for (const slug of Object.keys(role.collections)) {
      allAssignedCollections.add(slug)
    }
    for (const slug of Object.keys(role.globals)) {
      allAssignedGlobals.add(slug)
    }
  }

  it('alle Collections sind mindestens einer Rolle zugewiesen', () => {
    const unassigned = Object.keys(allCollections).filter(
      (slug) => !allAssignedCollections.has(slug)
    )
    expect(unassigned, `Nicht zugewiesene Collections: ${unassigned.join(', ')}`).toEqual([])
  })

  it('alle Globals sind mindestens einer Rolle zugewiesen', () => {
    const unassigned = Object.keys(allGlobals).filter(
      (slug) => !allAssignedGlobals.has(slug)
    )
    expect(unassigned, `Nicht zugewiesene Globals: ${unassigned.join(', ')}`).toEqual([])
  })
})

// ──────────────────────────────────────────────────────────────
// 2. Feld-Vollständigkeit: Keine ungenutzten Top-Level-Felder
// ──────────────────────────────────────────────────────────────

describe('Keine ungenutzten Felder: Jedes Top-Level-Feld gehört zu mindestens einer Rolle', () => {
  // Alle von Rollen referenzierten Felder sammeln
  const assignedFieldsByCollection = new Map<string, Set<string>>()
  const assignedFieldsByGlobal = new Map<string, Set<string>>()

  for (const role of roles) {
    for (const [slug, fields] of Object.entries(role.collections)) {
      if (!assignedFieldsByCollection.has(slug)) {
        assignedFieldsByCollection.set(slug, new Set())
      }
      for (const field of fields) {
        assignedFieldsByCollection.get(slug)!.add(field)
      }
    }
    for (const [slug, fields] of Object.entries(role.globals)) {
      if (!assignedFieldsByGlobal.has(slug)) {
        assignedFieldsByGlobal.set(slug, new Set())
      }
      for (const field of fields) {
        assignedFieldsByGlobal.get(slug)!.add(field)
      }
    }
  }

  // Collections prüfen
  for (const [slug, config] of Object.entries(allCollections)) {
    it(`Collection "${slug}": keine ungenutzten Felder`, () => {
      const actual = extractTopLevelFieldNames(config.fields)
      const assigned = assignedFieldsByCollection.get(slug) ?? new Set()

      // Payload-interne Felder ausschließen (email bei Users wird durch auth:true generiert)
      const systemFields = slug === 'users' ? ['email'] : []
      const unassigned = actual.filter(
        (f) => !assigned.has(f) && !systemFields.includes(f)
      )
      expect(
        unassigned,
        `Collection "${slug}" hat ungenutzte Felder: ${unassigned.join(', ')}`
      ).toEqual([])
    })
  }

  // Globals prüfen
  for (const [slug, config] of Object.entries(allGlobals)) {
    it(`Global "${slug}": keine ungenutzten Felder`, () => {
      const actual = extractTopLevelFieldNames(config.fields)
      const assigned = assignedFieldsByGlobal.get(slug) ?? new Set()
      const unassigned = actual.filter((f) => !assigned.has(f))
      expect(
        unassigned,
        `Global "${slug}" hat ungenutzte Felder: ${unassigned.join(', ')}`
      ).toEqual([])
    })
  }
})

// ──────────────────────────────────────────────────────────────
// 3. Pro Rolle: Existenz der benötigten Collections & Felder
// ──────────────────────────────────────────────────────────────

for (const role of roles) {
  describe(`Rolle: ${role.name} (${role.kuerzel})`, () => {
    // Collections prüfen
    for (const [slug, requiredFields] of Object.entries(role.collections)) {
      describe(`Collection "${slug}"`, () => {
        it('existiert in der Payload-Konfiguration', () => {
          expect(
            allCollections[slug],
            `Collection "${slug}" fehlt! Die Rolle "${role.name}" benötigt sie.`
          ).toBeDefined()
        })

        it('hat den korrekten Slug', () => {
          expect(allCollections[slug]?.slug).toBe(slug)
        })

        for (const fieldName of requiredFields) {
          it(`hat das Feld "${fieldName}"`, () => {
            const config = allCollections[slug]
            expect(config, `Collection "${slug}" existiert nicht`).toBeDefined()

            const existingFields = extractTopLevelFieldNames(config.fields)
            expect(
              existingFields,
              `Feld "${fieldName}" fehlt in Collection "${slug}". Vorhandene Felder: ${existingFields.join(', ')}`
            ).toContain(fieldName)
          })
        }
      })
    }

    // Globals prüfen
    for (const [slug, requiredFields] of Object.entries(role.globals)) {
      describe(`Global "${slug}"`, () => {
        it('existiert in der Payload-Konfiguration', () => {
          expect(
            allGlobals[slug],
            `Global "${slug}" fehlt! Die Rolle "${role.name}" benötigt sie.`
          ).toBeDefined()
        })

        it('hat den korrekten Slug', () => {
          expect(allGlobals[slug]?.slug).toBe(slug)
        })

        for (const fieldName of requiredFields) {
          it(`hat das Feld "${fieldName}"`, () => {
            const config = allGlobals[slug]
            expect(config, `Global "${slug}" existiert nicht`).toBeDefined()

            const existingFields = extractTopLevelFieldNames(config.fields)
            expect(
              existingFields,
              `Feld "${fieldName}" fehlt in Global "${slug}". Vorhandene Felder: ${existingFields.join(', ')}`
            ).toContain(fieldName)
          })
        }
      })
    }

    // Pages-Block-Typen prüfen (nur für Content-Redakteur)
    if (role.pageBlocks) {
      describe('Pages-Builder Block-Typen', () => {
        const pageConfig = allCollections['pages']
        const existingBlocks = pageConfig ? extractBlockSlugs(pageConfig.fields) : []

        for (const blockSlug of role.pageBlocks!) {
          it(`Block "${blockSlug}" existiert im Seiten-Builder`, () => {
            expect(
              existingBlocks,
              `Block "${blockSlug}" fehlt im Pages-Builder. Vorhandene Blöcke: ${existingBlocks.join(', ')}`
            ).toContain(blockSlug)
          })
        }

        it('hat keine überflüssigen Block-Typen', () => {
          const unnecessary = existingBlocks.filter(
            (b) => !role.pageBlocks!.includes(b)
          )
          expect(
            unnecessary,
            `Überflüssige Block-Typen in Pages: ${unnecessary.join(', ')}`
          ).toEqual([])
        })
      })
    }

    // Homepage-Block-Typen prüfen (nur für Marketing-Manager)
    if (role.homepageBlocks) {
      describe('Homepage-Builder Block-Typen', () => {
        const homepageConfig = allGlobals['homepage']
        const existingBlocks = homepageConfig ? extractBlockSlugs(homepageConfig.fields) : []

        for (const blockSlug of role.homepageBlocks!) {
          it(`Block "${blockSlug}" existiert im Startseiten-Builder`, () => {
            expect(
              existingBlocks,
              `Block "${blockSlug}" fehlt im Homepage-Builder. Vorhandene Blöcke: ${existingBlocks.join(', ')}`
            ).toContain(blockSlug)
          })
        }

        it('hat keine überflüssigen Block-Typen', () => {
          const unnecessary = existingBlocks.filter(
            (b) => !role.homepageBlocks!.includes(b)
          )
          expect(
            unnecessary,
            `Überflüssige Block-Typen in Homepage: ${unnecessary.join(', ')}`
          ).toEqual([])
        })
      })
    }
  })
}

// ──────────────────────────────────────────────────────────────
// 4. Produkte: Alle 6 Tabs vorhanden
// ──────────────────────────────────────────────────────────────

describe('Produkt-Manager: Produkte-Collection hat alle 6 Tabs', () => {
  const expectedTabs = [
    'Grunddaten',
    'Hero-Bereich',
    'Bilder',
    'Detailsektionen',
    'Spezifikationen',
    'Extras',
  ]

  const actualTabs = extractTabLabels(Products.fields)

  for (const tab of expectedTabs) {
    it(`Tab "${tab}" existiert`, () => {
      expect(actualTabs).toContain(tab)
    })
  }

  it('hat genau 6 Tabs (keine überflüssigen)', () => {
    expect(actualTabs).toHaveLength(6)
  })
})

// ──────────────────────────────────────────────────────────────
// 5. Pages-Collection: Alle 3 Tabs vorhanden
// ──────────────────────────────────────────────────────────────

describe('Content-Redakteur: Pages-Collection hat alle 3 Tabs', () => {
  const expectedTabs = ['Seitenkopf', 'Sektionen', 'SEO']
  const actualTabs = extractTabLabels(Pages.fields)

  for (const tab of expectedTabs) {
    it(`Tab "${tab}" existiert`, () => {
      expect(actualTabs).toContain(tab)
    })
  }

  it('hat genau 3 Tabs (keine überflüssigen)', () => {
    expect(actualTabs).toHaveLength(3)
  })
})

// ──────────────────────────────────────────────────────────────
// 6. Sicherheit: Access-Control ist konfiguriert
// ──────────────────────────────────────────────────────────────

describe('Sicherheit: Alle Collections haben Access-Control', () => {
  for (const [slug, config] of Object.entries(allCollections)) {
    it(`Collection "${slug}" hat read-Access definiert`, () => {
      expect(config.access?.read).toBeDefined()
    })

    // Users hat spezielle auth-basierte Zugriffskontrolle
    if (slug !== 'media') {
      it(`Collection "${slug}" hat create/update-Access definiert`, () => {
        if (slug === 'users') {
          // Users hat create + delete nur für admins
          expect(config.access?.create).toBeDefined()
          expect(config.access?.delete).toBeDefined()
        } else {
          expect(config.access?.create).toBeDefined()
          expect(config.access?.update).toBeDefined()
        }
      })
    }
  }

  for (const [slug, config] of Object.entries(allGlobals)) {
    it(`Global "${slug}" hat read- und update-Access definiert`, () => {
      expect(config.access?.read).toBeDefined()
      expect(config.access?.update).toBeDefined()
    })
  }
})

// ──────────────────────────────────────────────────────────────
// 7. Export-Hooks: Daten-Collections haben afterChange-Hooks
// ──────────────────────────────────────────────────────────────

describe('Export-Hooks: Alle Daten-Collections exportieren nach Änderung', () => {
  // Collections die KEINEN Export-Hook brauchen
  // - users/media: System-Collections ohne JSON-Export
  // - legal-pages: Rechtliche Seiten werden direkt aus der DB gerendert
  const noExportNeeded = ['users', 'media', 'legal-pages']

  for (const [slug, config] of Object.entries(allCollections)) {
    if (!noExportNeeded.includes(slug)) {
      it(`Collection "${slug}" hat afterChange-Hook`, () => {
        expect(
          config.hooks?.afterChange?.length,
          `Collection "${slug}" braucht einen afterChange-Hook für JSON-Export`
        ).toBeGreaterThan(0)
      })
    }
  }

  for (const [slug, config] of Object.entries(allGlobals)) {
    it(`Global "${slug}" hat afterChange-Hook`, () => {
      expect(
        config.hooks?.afterChange?.length,
        `Global "${slug}" braucht einen afterChange-Hook für JSON-Export`
      ).toBeGreaterThan(0)
    })
  }
})

// ──────────────────────────────────────────────────────────────
// 8. Admin-Gruppen: Korrekte Zuordnung
// ──────────────────────────────────────────────────────────────

describe('Admin-Gruppen: Collections sind korrekt gruppiert', () => {
  const expectedGroups: Record<string, string> = {
    users: 'System',
    media: 'System',
    'legal-pages': 'System',
    products: 'Inhalte',
    features: 'Inhalte',
    testimonials: 'Inhalte',
    stats: 'Inhalte',
    faq: 'Inhalte',
    pages: 'Inhalte',
    bundles: 'Shop',
    comparison: 'Shop',
    'affiliate-tiers': 'Shop',
  }

  for (const [slug, expectedGroup] of Object.entries(expectedGroups)) {
    it(`Collection "${slug}" ist in Gruppe "${expectedGroup}"`, () => {
      const config = allCollections[slug]
      expect(config?.admin?.group).toBe(expectedGroup)
    })
  }

  const expectedGlobalGroups: Record<string, string> = {
    brand: 'Einstellungen',
    homepage: 'Inhalte',
  }

  for (const [slug, expectedGroup] of Object.entries(expectedGlobalGroups)) {
    it(`Global "${slug}" ist in Gruppe "${expectedGroup}"`, () => {
      const config = allGlobals[slug]
      expect(config?.admin?.group).toBe(expectedGroup)
    })
  }
})

// ──────────────────────────────────────────────────────────────
// 9. Zusammenfassung: Gesamtstruktur
// ──────────────────────────────────────────────────────────────

describe('CMS-Gesamtstruktur', () => {
  it('hat genau 12 Collections', () => {
    expect(Object.keys(allCollections)).toHaveLength(12)
  })

  it('hat genau 2 Globals', () => {
    expect(Object.keys(allGlobals)).toHaveLength(2)
  })

  it('hat genau 6 Experten-Rollen definiert', () => {
    expect(roles).toHaveLength(6)
  })

  it('jede Rolle hat ein eindeutiges Kürzel', () => {
    const kuerzel = roles.map((r) => r.kuerzel)
    const unique = new Set(kuerzel)
    expect(unique.size).toBe(kuerzel.length)
  })

  it('15 Block-Typen im Pages-Builder', () => {
    const blocks = extractBlockSlugs(Pages.fields)
    expect(blocks).toHaveLength(15)
  })

  it('13 Block-Typen im Homepage-Builder', () => {
    const blocks = extractBlockSlugs(Homepage.fields)
    expect(blocks).toHaveLength(13)
  })
})
