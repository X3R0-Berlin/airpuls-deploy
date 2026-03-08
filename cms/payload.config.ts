import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { de } from '@payloadcms/translations/languages/de'
import path from 'path'
import { fileURLToPath } from 'url'

// Collections
import { Users } from './src/collections/Users'
import { Products } from './src/collections/Products'
import { Features } from './src/collections/Features'
import { Testimonials } from './src/collections/Testimonials'
import { Stats } from './src/collections/Stats'
import { FAQ } from './src/collections/FAQ'
import { Bundles } from './src/collections/Bundles'
import { Comparison } from './src/collections/Comparison'
import { Affiliate } from './src/collections/Affiliate'
import { LegalPages } from './src/collections/LegalPages'
import { Pages } from './src/collections/Pages'
import { Media } from './src/collections/Media'

// Globals
import { Brand } from './src/globals/Brand'
import { Homepage } from './src/globals/Homepage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  // Deutsche Admin-Oberfläche
  i18n: {
    supportedLanguages: { de },
    fallbackLanguage: 'de',
  },

  // Admin-Panel Konfiguration
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' — AIRIMPULS CMS',
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Logo: './src/components/Logo#Logo',
        Icon: './src/components/Icon#Icon',
      },
    },
    livePreview: {
      url: 'http://localhost:3000',
      breakpoints: [
        { label: 'Handy', name: 'mobile', width: 375, height: 812 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },

  // Server URL (nur localhost)
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001',

  // CSRF-Schutz
  csrf: [
    process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001',
  ],

  // Cookie-Konfiguration
  cookiePrefix: 'airimpuls-cms',

  // Alle Collections
  collections: [
    Users,
    Products,
    Features,
    Testimonials,
    Stats,
    FAQ,
    Bundles,
    Comparison,
    Affiliate,
    LegalPages,
    Pages,
    Media,
  ],

  // Globale Singletons
  globals: [Brand, Homepage],

  // SQLite-Datenbank (lokale Datei)
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./data/cms.db',
    },
  }),

  // Rich-Text-Editor
  editor: lexicalEditor({}),

  // JWT-Secret
  secret: process.env.PAYLOAD_SECRET || 'CHANGE-THIS-SECRET-IN-PRODUCTION',

  // TypeScript-Ausgabe
  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts'),
  },
})
