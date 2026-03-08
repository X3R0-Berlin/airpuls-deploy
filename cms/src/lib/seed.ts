/**
 * Seed script: imports existing JSON data from ../data/ into Payload CMS.
 *
 * Run with: npm run seed
 *
 * This reads all JSON files from the main project's data/ directory
 * and creates corresponding Payload CMS documents.
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '@payload-config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DATA_DIR = path.resolve(__dirname, '../../../data')
const PRODUCTS_DIR = path.join(DATA_DIR, 'products')

function readJson(filename: string) {
  const filePath = path.join(DATA_DIR, filename)
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
}

function readProductJson(slug: string) {
  const filePath = path.join(PRODUCTS_DIR, `${slug}.json`)
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
}

/**
 * Convert flat string array to Payload array format
 * ["text1", "text2"] → [{text: "text1"}, {text: "text2"}]
 */
function toTextArray(arr: string[]): Array<{ text: string }> {
  return (arr || []).map((text) => ({ text }))
}

async function seed() {
  console.log('\n🌱 Seeding AIRIMPULS CMS...\n')

  const payload = await getPayload({ config })

  // ========================================
  // 1. Create admin user
  // ========================================
  console.log('👤 Creating admin user...')
  try {
    const existingUsers = await payload.find({ collection: 'users', limit: 1 })
    if (existingUsers.docs.length === 0) {
      await payload.create({
        collection: 'users',
        data: {
          email: 'admin@airimpuls.de',
          password: 'airimpuls2024!',
          name: 'Administrator',
          role: 'admin',
        },
      })
      console.log('  ✓ Admin user created (admin@airimpuls.de / airimpuls2024!)')
      console.log('  ⚠️  WICHTIG: Passwort nach dem ersten Login ändern!')
    } else {
      console.log('  → Admin user already exists, skipping')
    }
  } catch (err) {
    console.log('  → Admin user may already exist:', (err as Error).message)
  }

  // ========================================
  // 2. Seed Brand global
  // ========================================
  console.log('\n🏷️  Seeding Brand...')
  const brand = readJson('brand.json')
  await payload.updateGlobal({
    slug: 'brand',
    data: brand,
  })
  console.log('  ✓ Brand global updated')

  // ========================================
  // 3. Seed Products
  // ========================================
  console.log('\n📦 Seeding Products...')
  const productSlugs = fs
    .readdirSync(PRODUCTS_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace('.json', ''))

  for (const slug of productSlugs) {
    const product = readProductJson(slug)

    // Check if product already exists
    const existing = await payload.find({
      collection: 'products',
      where: { slug: { equals: slug } },
      limit: 1,
    })

    const productData = {
      ...product,
      // Convert flat arrays to Payload format
      marqueeItems: toTextArray(product.marqueeItems),
      details: (product.details || []).map((d: Record<string, unknown>) => ({
        ...d,
        bullets: toTextArray(d.bullets as string[]),
      })),
      // Handle optional hotspots
      hotspots: product.hotspots
        ? {
            image: product.hotspots.image,
            points: product.hotspots.points,
          }
        : { image: '', points: [] },
    }

    if (existing.docs.length > 0) {
      await payload.update({
        collection: 'products',
        id: existing.docs[0].id,
        data: productData,
      })
      console.log(`  ✓ ${slug} (updated)`)
    } else {
      await payload.create({
        collection: 'products',
        data: productData,
      })
      console.log(`  ✓ ${slug} (created)`)
    }
  }

  // ========================================
  // 4. Seed Features
  // ========================================
  console.log('\n⭐ Seeding Features...')
  const features: Array<Record<string, unknown>> = readJson('features.json')
  for (const feature of features) {
    await payload.create({
      collection: 'features',
      data: {
        sortOrder: feature.id as number,
        icon: feature.icon as string,
        title: feature.title as string,
        description: feature.description as string,
        video: (feature.video as string) || undefined,
        poster: (feature.poster as string) || undefined,
      },
    })
    console.log(`  ✓ ${feature.title}`)
  }

  // ========================================
  // 5. Seed Testimonials
  // ========================================
  console.log('\n💬 Seeding Testimonials...')
  const testimonials: Array<Record<string, unknown>> = readJson('testimonials.json')
  for (const t of testimonials) {
    await payload.create({
      collection: 'testimonials',
      data: {
        product: t.product as string,
        stars: t.stars as number,
        text: t.text as string,
        author: t.author as string,
        location: t.location as string,
        avatar: (t.avatar as string) || undefined,
        verified: (t.verified as boolean) || false,
        purchaseDate: (t.purchaseDate as string) || undefined,
      },
    })
    console.log(`  ✓ ${t.author}`)
  }

  // ========================================
  // 6. Seed Stats
  // ========================================
  console.log('\n📊 Seeding Stats...')
  const stats: Array<Record<string, unknown>> = readJson('stats.json')
  for (let i = 0; i < stats.length; i++) {
    const s = stats[i]
    await payload.create({
      collection: 'stats',
      data: {
        sortOrder: i + 1,
        value: s.value as number,
        suffix: s.suffix as string,
        label: s.label as string,
      },
    })
    console.log(`  ✓ ${s.label}`)
  }

  // ========================================
  // 7. Seed FAQ
  // ========================================
  console.log('\n❓ Seeding FAQ...')
  const faq: Array<{ category: string; items: Array<{ question: string; answer: string }> }> =
    readJson('faq.json')
  let faqOrder = 1
  for (const category of faq) {
    for (const item of category.items) {
      await payload.create({
        collection: 'faq',
        data: {
          category: category.category,
          sortOrder: faqOrder++,
          question: item.question,
          answer: item.answer,
        },
      })
      console.log(`  ✓ [${category.category}] ${item.question.substring(0, 50)}...`)
    }
  }

  // ========================================
  // 8. Seed Bundles
  // ========================================
  console.log('\n🎁 Seeding Bundles...')
  const bundles: { heading: string; items: Array<Record<string, unknown>> } =
    readJson('bundles.json')
  for (const b of bundles.items) {
    await payload.create({
      collection: 'bundles',
      data: {
        slug: b.slug as string,
        name: b.name as string,
        description: b.description as string,
        price: b.price as number,
        priceDisplay: b.priceDisplay as string,
        icon: b.icon as string,
        forProducts: ((b.forProducts as string[]) || []).map((productSlug) => ({
          productSlug,
        })),
      },
    })
    console.log(`  ✓ ${b.name}`)
  }

  // ========================================
  // 9. Seed Comparison
  // ========================================
  console.log('\n⚖️  Seeding Comparison...')
  const comparison: {
    features: Array<{
      label: string
      values?: Record<string, string>
      check?: Record<string, boolean>
    }>
  } = readJson('comparison.json')
  for (let i = 0; i < comparison.features.length; i++) {
    const f = comparison.features[i]
    const isCheckType = !!f.check
    await payload.create({
      collection: 'comparison',
      data: {
        sortOrder: i + 1,
        label: f.label,
        type: isCheckType ? 'check' : 'values',
        ...(isCheckType
          ? {
              vitairCheck: f.check?.vitair || false,
              solitairCheck: f.check?.solitair || false,
              preventairCheck: f.check?.preventair || false,
            }
          : {
              vitairValue: f.values?.vitair || '',
              solitairValue: f.values?.solitair || '',
              preventairValue: f.values?.preventair || '',
            }),
      },
    })
    console.log(`  ✓ ${f.label}`)
  }

  // ========================================
  // 10. Seed Affiliate
  // ========================================
  console.log('\n🤝 Seeding Affiliate...')
  const affiliate: {
    tiers: Array<Record<string, unknown>>
  } = readJson('affiliate.json')
  for (let i = 0; i < affiliate.tiers.length; i++) {
    const tier = affiliate.tiers[i]
    await payload.create({
      collection: 'affiliate-tiers',
      data: {
        sortOrder: i + 1,
        tierId: tier.id as string,
        name: tier.name as string,
        commission: tier.commission as number,
        description: tier.description as string,
        benefits: toTextArray(tier.benefits as string[]),
        estimatedEarning: tier.estimatedEarning as string,
      },
    })
    console.log(`  ✓ ${tier.name}`)
  }

  // ========================================
  // 11. Seed Homepage (Seiten-Builder)
  // ========================================
  console.log('\n🏠 Seeding Homepage...')
  await payload.updateGlobal({
    slug: 'homepage',
    data: {
      metaTitle: 'AIRIMPULS — Luftenergizer für Ihr Wohlbefinden',
      metaDescription: 'Entdecken Sie die AIRIMPULS Luftenergizer: Vitair, Solitair und Preventair. Premium-Qualität aus Deutschland für bessere Raumluft.',
      sections: [
        { blockType: 'hero', product: 'vitair', showVideo: true },
        { blockType: 'marquee', speed: 'normal' },
        { blockType: 'features' },
        { blockType: 'stats', backgroundColor: 'dark' },
        { blockType: 'product-showcase', product: 'vitair' },
        { blockType: 'detail-sections', product: 'vitair' },
        { blockType: 'lifestyle-gallery' },
        { blockType: 'product-comparison' },
        { blockType: 'product-finder' },
        { blockType: 'testimonials' },
        { blockType: 'affiliate-cta' },
        { blockType: 'newsletter' },
      ],
    },
  })
  console.log('  ✓ Homepage mit Standard-Sektionsreihenfolge erstellt')

  // ========================================
  // 12. Seed Pages (Unterseiten-Builder)
  // ========================================
  console.log('\n📄 Seeding Pages...')

  const pagesToSeed = [
    {
      title: 'Produkte',
      slug: 'produkte',
      subtitle: 'Alle AIRIMPULS Produkte',
      description: 'Entdecke alle AIRIMPULS Luftenergizer — natürliche Energie für dein Zuhause.',
      headerStyle: 'light',
      showBreadcrumb: true,
      metaTitle: 'Produkte | AIRIMPULS',
      metaDescription: 'Entdecke alle AIRIMPULS Produkte — natürliche Energie für dein Zuhause.',
      sections: [
        { blockType: 'product-grid', columns: '3', showPrices: true, showDescription: true },
        { blockType: 'comparison-table' },
        { blockType: 'product-finder' },
        { blockType: 'newsletter' },
      ],
    },
    {
      title: 'Häufig gestellte Fragen',
      slug: 'faq',
      subtitle: 'Wir helfen Ihnen gerne weiter',
      description: 'Hier finden Sie Antworten auf die häufigsten Fragen zu unseren Produkten, Bestellungen und dem Versand.',
      headerStyle: 'light',
      showBreadcrumb: true,
      metaTitle: 'FAQ | AIRIMPULS',
      metaDescription: 'Häufig gestellte Fragen zu Produkten, Bestellung, Versand und Rückgabe.',
      sections: [
        { blockType: 'faq-section', layout: 'accordion' },
        { blockType: 'cta-banner', heading: 'Noch Fragen?', description: 'Kontaktieren Sie uns — wir helfen Ihnen gerne weiter.', buttonText: 'Kontakt aufnehmen', buttonLink: '/kontakt', style: 'accent' },
        { blockType: 'newsletter' },
      ],
    },
    {
      title: 'Produktvergleich',
      slug: 'vergleich',
      subtitle: 'Welches Gerät passt zu Ihnen?',
      description: 'Vergleichen Sie Vitair, Solitair und Preventair — finden Sie das richtige Gerät für Ihre Bedürfnisse.',
      headerStyle: 'light',
      showBreadcrumb: true,
      metaTitle: 'Produktvergleich | AIRIMPULS',
      metaDescription: 'Vergleichen Sie Vitair, Solitair und Preventair — finden Sie das richtige Gerät für Ihre Bedürfnisse.',
      sections: [
        { blockType: 'comparison-table' },
        { blockType: 'product-finder' },
        { blockType: 'testimonials' },
        { blockType: 'newsletter' },
      ],
    },
    {
      title: 'Partnerprogramm',
      slug: 'partner',
      subtitle: 'Werden Sie AIRIMPULS Partner',
      description: 'Verdienen Sie bis zu 10% Provision als Kunde, Therapeut oder Creator.',
      headerStyle: 'accent',
      showBreadcrumb: true,
      metaTitle: 'Partnerprogramm | AIRIMPULS',
      metaDescription: 'Werden Sie AIRIMPULS Partner und verdienen Sie bis zu 10% Provision. Drei Stufen: Kunde, Therapeut, Creator.',
      sections: [
        { blockType: 'affiliate-tiers', showBenefits: true },
        { blockType: 'stats-bar', backgroundColor: 'accent' },
        { blockType: 'testimonials' },
        { blockType: 'cta-banner', heading: 'Jetzt Partner werden', description: 'Registrieren Sie sich kostenlos und starten Sie sofort.', buttonText: 'Anmelden', buttonLink: '/kontakt', style: 'accent' },
        { blockType: 'newsletter' },
      ],
    },
    {
      title: 'Kontakt',
      slug: 'kontakt',
      subtitle: 'Wir sind für Sie da',
      description: 'Haben Sie Fragen zu unseren Produkten oder Ihrer Bestellung? Schreiben Sie uns — wir antworten innerhalb von 24 Stunden.',
      headerStyle: 'light',
      showBreadcrumb: true,
      metaTitle: 'Kontakt | AIRIMPULS',
      metaDescription: 'Kontaktieren Sie AIRIMPULS — wir antworten innerhalb von 24 Stunden auf Ihre Anfrage.',
      sections: [
        { blockType: 'contact-form', showContactInfo: true },
        { blockType: 'faq-section', heading: 'Häufig gestellte Fragen', categories: 'Bestellung,Versand', layout: 'accordion' },
      ],
    },
    {
      title: 'Versand & Lieferung',
      slug: 'versand',
      description: 'Informationen zu Versandkosten, Lieferzeiten und Versandarten.',
      headerStyle: 'light',
      showBreadcrumb: true,
      metaTitle: 'Versand & Lieferung | AIRIMPULS',
      metaDescription: 'Versandkosten, Lieferzeiten und Versandarten für AIRIMPULS Produkte.',
      sections: [
        { blockType: 'richtext', maxWidth: 'prose', backgroundColor: 'transparent' },
        { blockType: 'faq-section', categories: 'Versand', layout: 'accordion' },
        { blockType: 'newsletter' },
      ],
    },
    {
      title: 'Impressum',
      slug: 'impressum',
      headerStyle: 'light',
      showBreadcrumb: true,
      metaTitle: 'Impressum | AIRIMPULS',
      metaDescription: 'Impressum und Anbieterkennzeichnung gemäß § 5 TMG.',
      sections: [
        { blockType: 'richtext', maxWidth: 'prose', backgroundColor: 'transparent' },
      ],
    },
    {
      title: 'Datenschutzerklärung',
      slug: 'datenschutz',
      headerStyle: 'light',
      showBreadcrumb: true,
      metaTitle: 'Datenschutz | AIRIMPULS',
      metaDescription: 'Datenschutzerklärung der AIRIMPULS GmbH.',
      sections: [
        { blockType: 'richtext', maxWidth: 'prose', backgroundColor: 'transparent' },
      ],
    },
    {
      title: 'Allgemeine Geschäftsbedingungen',
      slug: 'agb',
      headerStyle: 'light',
      showBreadcrumb: true,
      metaTitle: 'AGB | AIRIMPULS',
      metaDescription: 'Allgemeine Geschäftsbedingungen der AIRIMPULS GmbH.',
      sections: [
        { blockType: 'richtext', maxWidth: 'prose', backgroundColor: 'transparent' },
      ],
    },
    {
      title: 'Widerrufsbelehrung',
      slug: 'widerruf',
      headerStyle: 'light',
      showBreadcrumb: true,
      metaTitle: 'Widerruf | AIRIMPULS',
      metaDescription: 'Widerrufsbelehrung und Widerrufsformular.',
      sections: [
        { blockType: 'richtext', maxWidth: 'prose', backgroundColor: 'transparent' },
      ],
    },
  ]

  for (const page of pagesToSeed) {
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: page.slug } },
      limit: 1,
    })

    const pageData = {
      title: page.title,
      slug: page.slug,
      status: 'published',
      subtitle: page.subtitle || undefined,
      description: page.description || undefined,
      headerStyle: page.headerStyle || 'light',
      showBreadcrumb: page.showBreadcrumb !== false,
      sections: page.sections,
      metaTitle: page.metaTitle || undefined,
      metaDescription: page.metaDescription || undefined,
      noIndex: false,
    }

    if (existing.docs.length > 0) {
      await payload.update({
        collection: 'pages',
        id: existing.docs[0].id,
        data: pageData,
      })
      console.log(`  ✓ ${page.slug} (updated)`)
    } else {
      await payload.create({
        collection: 'pages',
        data: pageData,
      })
      console.log(`  ✓ ${page.slug} (created)`)
    }
  }

  console.log('\n✅ Seed complete!\n')
  console.log('Login: http://localhost:3001/admin')
  console.log('Email: admin@airimpuls.de')
  console.log('Pass:  airimpuls2024!')
  console.log('\n⚠️  Bitte Passwort nach dem ersten Login ändern!\n')
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Seed failed:', err)
    process.exit(1)
  })
