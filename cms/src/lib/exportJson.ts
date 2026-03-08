/**
 * Export Payload CMS data to JSON files matching the existing data/ format.
 *
 * This script can be run standalone (`npm run export`) or called from
 * the afterChange hook for automatic exports on content changes.
 *
 * Output directory: ../../data/ (relative to cms/)
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '@payload-config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Output to the main project's data/ directory
const DATA_DIR = path.resolve(__dirname, '../../../data')
const PRODUCTS_DIR = path.join(DATA_DIR, 'products')
const PAGES_DIR = path.join(DATA_DIR, 'pages')

/**
 * Remove Payload internal fields from documents
 */
function cleanPayloadFields(obj: Record<string, unknown>): Record<string, unknown> {
  const cleaned = { ...obj }
  delete cleaned.id
  delete cleaned.createdAt
  delete cleaned.updatedAt
  delete cleaned.globalType
  return cleaned
}

/**
 * Flatten Payload array fields from [{text: "..."}] to ["..."]
 */
function flattenTextArray(arr: Array<{ text: string; id?: string }> | undefined): string[] {
  if (!arr) return []
  return arr.map((item) => item.text)
}

/**
 * Export all Products as individual JSON files
 */
async function exportProducts(payload: ReturnType<Awaited<ReturnType<typeof getPayload>>>) {
  const { docs } = await payload.find({
    collection: 'products',
    limit: 100,
    sort: 'slug',
  })

  // Ensure products directory exists
  if (!fs.existsSync(PRODUCTS_DIR)) {
    fs.mkdirSync(PRODUCTS_DIR, { recursive: true })
  }

  for (const doc of docs) {
    const product: Record<string, unknown> = {
      slug: doc.slug,
      name: doc.name,
      collection: doc.collection,
      subtitle: doc.subtitle,
      designer: doc.designer,
      price: doc.price,
      priceDisplay: doc.priceDisplay,
      currency: doc.currency,
      taxNote: doc.taxNote,
      freeShipping: doc.freeShipping,
      inStock: doc.inStock,
      ...(doc.comingSoon ? { comingSoon: doc.comingSoon } : {}),
      maxQuantity: doc.maxQuantity,
      featured: doc.featured,
      description: doc.description,
      ...(doc.heroVideo ? { heroVideo: doc.heroVideo } : {}),
      heroTagline: doc.heroTagline,
      heroHeading: doc.heroHeading,
      heroDescription: doc.heroDescription,
      images: {
        hero: (doc.images as Record<string, unknown>)?.hero,
        gallery: ((doc.images as Record<string, unknown>)?.gallery as Array<Record<string, unknown>>)?.map(
          (img) => ({ file: img.file, alt: img.alt })
        ) || [],
        basePath: (doc.images as Record<string, unknown>)?.basePath,
      },
      specs: ((doc.specs as Array<Record<string, unknown>>) || []).map((s) => ({
        label: s.label,
        value: s.value,
      })),
      details: ((doc.details as Array<Record<string, unknown>>) || []).map((d) => ({
        tag: d.tag,
        heading: d.heading,
        text: d.text,
        image: d.image,
        bullets: flattenTextArray(d.bullets as Array<{ text: string; id?: string }>),
        reverse: d.reverse || false,
        ...(d.lottie ? { lottie: d.lottie } : {}),
      })),
      marqueeItems: flattenTextArray(doc.marqueeItems as Array<{ text: string; id?: string }>),
      ...(
        (doc.hotspots as Record<string, unknown>)?.image ||
        ((doc.hotspots as Record<string, unknown>)?.points as unknown[])?.length
          ? {
              hotspots: {
                image: (doc.hotspots as Record<string, unknown>)?.image,
                points: (
                  (doc.hotspots as Record<string, unknown>)?.points as Array<Record<string, unknown>>
                )?.map((p) => ({
                  x: p.x,
                  y: p.y,
                  title: p.title,
                  description: p.description,
                })) || [],
              },
            }
          : {}
      ),
      trustBadges: ((doc.trustBadges as Array<Record<string, unknown>>) || []).map((b) => ({
        icon: b.icon,
        text: b.text,
      })),
    }

    const filePath = path.join(PRODUCTS_DIR, `${doc.slug}.json`)
    fs.writeFileSync(filePath, JSON.stringify(product, null, 2) + '\n', 'utf-8')
    console.log(`  ✓ products/${doc.slug}.json`)
  }
}

/**
 * Export Features as features.json
 */
async function exportFeatures(payload: ReturnType<Awaited<ReturnType<typeof getPayload>>>) {
  const { docs } = await payload.find({
    collection: 'features',
    limit: 100,
    sort: 'sortOrder',
  })

  const features = docs.map((doc, index) => ({
    id: doc.sortOrder || index + 1,
    icon: doc.icon,
    title: doc.title,
    description: doc.description,
    ...(doc.video ? { video: doc.video } : {}),
    ...(doc.poster ? { poster: doc.poster } : {}),
  }))

  writeJson('features.json', features)
}

/**
 * Export Testimonials as testimonials.json
 */
async function exportTestimonials(payload: ReturnType<Awaited<ReturnType<typeof getPayload>>>) {
  const { docs } = await payload.find({
    collection: 'testimonials',
    limit: 100,
    sort: 'id',
  })

  const testimonials = docs.map((doc, index) => ({
    id: index + 1,
    product: doc.product,
    stars: doc.stars,
    text: doc.text,
    author: doc.author,
    location: doc.location,
    avatar: doc.avatar || null,
    verified: doc.verified || false,
    purchaseDate: doc.purchaseDate || null,
  }))

  writeJson('testimonials.json', testimonials)
}

/**
 * Export Stats as stats.json
 */
async function exportStats(payload: ReturnType<Awaited<ReturnType<typeof getPayload>>>) {
  const { docs } = await payload.find({
    collection: 'stats',
    limit: 100,
    sort: 'sortOrder',
  })

  const stats = docs.map((doc) => ({
    value: doc.value,
    suffix: doc.suffix,
    label: doc.label,
  }))

  writeJson('stats.json', stats)
}

/**
 * Export FAQ as faq.json (grouped by category)
 */
async function exportFAQ(payload: ReturnType<Awaited<ReturnType<typeof getPayload>>>) {
  const { docs } = await payload.find({
    collection: 'faq',
    limit: 100,
    sort: 'sortOrder',
  })

  // Group by category, maintaining order
  const categoryOrder = ['Produkt', 'Bestellung', 'Versand', 'Rückgabe']
  const grouped: Record<string, Array<{ question: string; answer: string }>> = {}

  for (const doc of docs) {
    const cat = doc.category as string
    if (!grouped[cat]) grouped[cat] = []
    grouped[cat].push({
      question: doc.question as string,
      answer: doc.answer as string,
    })
  }

  const faq = categoryOrder
    .filter((cat) => grouped[cat]?.length)
    .map((category) => ({
      category,
      items: grouped[category],
    }))

  writeJson('faq.json', faq)
}

/**
 * Export Bundles as bundles.json
 */
async function exportBundles(payload: ReturnType<Awaited<ReturnType<typeof getPayload>>>) {
  const { docs } = await payload.find({
    collection: 'bundles',
    limit: 100,
    sort: 'slug',
  })

  const bundles = {
    heading: 'Häufig zusammen gekauft',
    items: docs.map((doc) => ({
      slug: doc.slug,
      name: doc.name,
      description: doc.description,
      price: doc.price,
      priceDisplay: doc.priceDisplay,
      icon: doc.icon,
      forProducts: ((doc.forProducts as Array<Record<string, unknown>>) || []).map(
        (fp) => fp.productSlug as string
      ),
    })),
  }

  writeJson('bundles.json', bundles)
}

/**
 * Export Comparison as comparison.json
 */
async function exportComparison(payload: ReturnType<Awaited<ReturnType<typeof getPayload>>>) {
  const { docs } = await payload.find({
    collection: 'comparison',
    limit: 100,
    sort: 'sortOrder',
  })

  const comparison = {
    heading: 'Welches Gerät passt zu Ihnen?',
    subheading: 'Alle drei Produkte im direkten Vergleich',
    products: ['vitair', 'solitair', 'preventair'],
    features: docs.map((doc) => {
      if (doc.type === 'values') {
        return {
          label: doc.label,
          values: {
            vitair: doc.vitairValue || '',
            solitair: doc.solitairValue || '',
            preventair: doc.preventairValue || '',
          },
        }
      } else {
        return {
          label: doc.label,
          check: {
            vitair: doc.vitairCheck || false,
            solitair: doc.solitairCheck || false,
            preventair: doc.preventairCheck || false,
          },
        }
      }
    }),
  }

  writeJson('comparison.json', comparison)
}

/**
 * Export Affiliate as affiliate.json
 */
async function exportAffiliate(payload: ReturnType<Awaited<ReturnType<typeof getPayload>>>) {
  const { docs } = await payload.find({
    collection: 'affiliate-tiers',
    limit: 100,
    sort: 'sortOrder',
  })

  const affiliate = {
    program: {
      name: 'AIRIMPULS Partnerprogramm',
      cookieDurationDays: 30,
      linkFormat: '?ref=PARTNER_CODE',
      payoutMinimum: 50,
      currency: 'EUR',
    },
    tiers: docs.map((doc) => ({
      id: doc.tierId,
      name: doc.name,
      commission: doc.commission,
      description: doc.description,
      benefits: flattenTextArray(doc.benefits as Array<{ text: string; id?: string }>),
      estimatedEarning: doc.estimatedEarning,
    })),
  }

  writeJson('affiliate.json', affiliate)
}

/**
 * Clean block sections — removes Payload internal fields from blocks
 * Used by both Homepage and Pages exports
 */
function cleanBlockSections(sections: Array<Record<string, unknown>> | undefined): Array<Record<string, unknown>> {
  if (!sections) return []
  return sections.map((section) => {
    const cleaned: Record<string, unknown> = { blockType: section.blockType }

    for (const [key, value] of Object.entries(section)) {
      if (['id', 'blockType', 'blockName'].includes(key)) continue
      if (value !== null && value !== undefined && value !== '') {
        cleaned[key] = value
      }
    }

    return cleaned
  })
}

/**
 * Export Homepage global as homepage.json
 */
async function exportHomepage(payload: ReturnType<Awaited<ReturnType<typeof getPayload>>>) {
  const homepage = await payload.findGlobal({ slug: 'homepage' })

  const homepageData: Record<string, unknown> = {
    ...(homepage.metaTitle ? { metaTitle: homepage.metaTitle } : {}),
    ...(homepage.metaDescription ? { metaDescription: homepage.metaDescription } : {}),
    sections: cleanBlockSections(homepage.sections as Array<Record<string, unknown>>),
  }

  writeJson('homepage.json', homepageData)
}

/**
 * Export Pages as individual JSON files: data/pages/{slug}.json
 */
async function exportPages(payload: ReturnType<Awaited<ReturnType<typeof getPayload>>>) {
  const { docs } = await payload.find({
    collection: 'pages',
    limit: 100,
    sort: 'slug',
  })

  // Ensure pages directory exists
  if (!fs.existsSync(PAGES_DIR)) {
    fs.mkdirSync(PAGES_DIR, { recursive: true })
  }

  for (const doc of docs) {
    const page: Record<string, unknown> = {
      slug: doc.slug,
      title: doc.title,
      status: doc.status || 'published',
      ...(doc.subtitle ? { subtitle: doc.subtitle } : {}),
      ...(doc.description ? { description: doc.description } : {}),
      headerStyle: doc.headerStyle || 'light',
      showBreadcrumb: doc.showBreadcrumb !== false,
      ...(doc.headerImage ? { headerImage: doc.headerImage } : {}),
      sections: cleanBlockSections(doc.sections as Array<Record<string, unknown>>),
      seo: {
        ...(doc.metaTitle ? { metaTitle: doc.metaTitle } : {}),
        ...(doc.metaDescription ? { metaDescription: doc.metaDescription } : {}),
        noIndex: doc.noIndex || false,
      },
    }

    const filePath = path.join(PAGES_DIR, `${doc.slug}.json`)
    fs.writeFileSync(filePath, JSON.stringify(page, null, 2) + '\n', 'utf-8')
    console.log(`  ✓ pages/${doc.slug}.json`)
  }
}

/**
 * Export Brand global as brand.json
 */
async function exportBrand(payload: ReturnType<Awaited<ReturnType<typeof getPayload>>>) {
  const brand = await payload.findGlobal({ slug: 'brand' })

  const brandData = cleanPayloadFields(brand as unknown as Record<string, unknown>)

  // Clean nested groups
  if (brandData.logoParts && typeof brandData.logoParts === 'object') {
    brandData.logoParts = cleanPayloadFields(brandData.logoParts as Record<string, unknown>)
  }
  if (brandData.currency && typeof brandData.currency === 'object') {
    brandData.currency = cleanPayloadFields(brandData.currency as Record<string, unknown>)
  }
  if (brandData.colors && typeof brandData.colors === 'object') {
    brandData.colors = cleanPayloadFields(brandData.colors as Record<string, unknown>)
  }
  if (brandData.fonts && typeof brandData.fonts === 'object') {
    brandData.fonts = cleanPayloadFields(brandData.fonts as Record<string, unknown>)
  }
  if (brandData.social && typeof brandData.social === 'object') {
    brandData.social = cleanPayloadFields(brandData.social as Record<string, unknown>)
  }
  if (brandData.seo && typeof brandData.seo === 'object') {
    brandData.seo = cleanPayloadFields(brandData.seo as Record<string, unknown>)
  }

  writeJson('brand.json', brandData)
}

/**
 * Helper to write JSON file
 */
function writeJson(filename: string, data: unknown) {
  const filePath = path.join(DATA_DIR, filename)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8')
  console.log(`  ✓ ${filename}`)
}

/**
 * Export all collections to JSON
 */
export async function exportAllJson(
  payloadInstance?: ReturnType<Awaited<ReturnType<typeof getPayload>>>
) {
  const payload = payloadInstance || (await getPayload({ config }))

  console.log('\n📦 Exporting CMS data to JSON...\n')
  console.log(`  Output: ${DATA_DIR}\n`)

  // Ensure data directory exists
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }

  await exportProducts(payload)
  await exportFeatures(payload)
  await exportTestimonials(payload)
  await exportStats(payload)
  await exportFAQ(payload)
  await exportBundles(payload)
  await exportComparison(payload)
  await exportAffiliate(payload)
  await exportBrand(payload)
  await exportHomepage(payload)
  await exportPages(payload)

  console.log('\n✅ Export complete!\n')
}

// Run standalone
const isMainModule = process.argv[1]?.includes('exportJson')
if (isMainModule) {
  exportAllJson()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('Export failed:', err)
      process.exit(1)
    })
}
