import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '../access/roles'
import { afterChangeExportHook } from '../hooks/afterChangeExport'

export const Products: CollectionConfig = {
  slug: 'products',
  labels: {
    singular: 'Produkt',
    plural: 'Produkte',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'price', 'inStock', 'featured'],
    group: 'Inhalte',
    description: 'AIRIMPULS Produkte — werden automatisch als JSON exportiert',
    livePreview: {
      url: ({ data }) => `http://localhost:3000/produkt/${data?.slug || ''}`,
    },
  },
  hooks: {
    afterChange: [afterChangeExportHook],
  },
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // === Tab: Grunddaten ===
        {
          label: 'Grunddaten',
          description: 'Produktname, Preis und Verfügbarkeit',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'name',
                  label: 'Produktname',
                  type: 'text',
                  required: true,
                  admin: { width: '50%' },
                },
                {
                  name: 'slug',
                  label: 'URL-Slug',
                  type: 'text',
                  required: true,
                  unique: true,
                  index: true,
                  admin: {
                    width: '50%',
                    description: 'Wird als URL und Dateiname verwendet (z.B. "vitair")',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'collection',
                  label: 'Kollektion',
                  type: 'text',
                  defaultValue: 'AIRIMPULS Collection',
                  admin: { width: '50%' },
                },
                {
                  name: 'subtitle',
                  label: 'Untertitel',
                  type: 'text',
                  required: true,
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'designer',
              label: 'Designer',
              type: 'text',
              defaultValue: 'Jörg Klemm',
            },
            {
              name: 'description',
              label: 'Beschreibung',
              type: 'textarea',
              required: true,
              admin: { description: 'Kurze Produktbeschreibung für die Übersichtsseite' },
            },
            // Preise
            {
              type: 'collapsible',
              label: 'Preise & Versand',
              admin: { initCollapsed: false },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'price',
                      label: 'Preis (in Cent)',
                      type: 'number',
                      required: true,
                      min: 0,
                      admin: { width: '33%', description: 'z.B. 164900 = 1.649,00 €' },
                    },
                    {
                      name: 'priceDisplay',
                      label: 'Preisanzeige',
                      type: 'text',
                      required: true,
                      admin: { width: '33%', description: 'Formatiert, z.B. "1.649,00"' },
                    },
                    {
                      name: 'currency',
                      label: 'Währung',
                      type: 'text',
                      defaultValue: 'EUR',
                      admin: { width: '33%' },
                    },
                  ],
                },
                {
                  name: 'taxNote',
                  label: 'Steuerhinweis',
                  type: 'text',
                  defaultValue: 'inkl. MwSt. zzgl. Versandkosten',
                },
                {
                  name: 'freeShipping',
                  label: 'Kostenloser Versand',
                  type: 'checkbox',
                  defaultValue: true,
                },
              ],
            },
            // Verfügbarkeit
            {
              type: 'collapsible',
              label: 'Verfügbarkeit',
              admin: { initCollapsed: false },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'inStock', label: 'Auf Lager', type: 'checkbox', defaultValue: false, admin: { width: '25%' } },
                    { name: 'comingSoon', label: 'Demnächst verfügbar', type: 'checkbox', defaultValue: false, admin: { width: '25%' } },
                    { name: 'featured', label: 'Hervorgehoben', type: 'checkbox', defaultValue: false, admin: { width: '25%', description: 'Auf der Startseite anzeigen' } },
                    { name: 'maxQuantity', label: 'Max. Bestellmenge', type: 'number', defaultValue: 10, min: 0, admin: { width: '25%' } },
                  ],
                },
              ],
            },
          ],
        },
        // === Tab: Hero-Bereich ===
        {
          label: 'Hero-Bereich',
          description: 'Überschrift, Video und Einleitung auf der Produktseite',
          fields: [
            { name: 'heroTagline', label: 'Tagline', type: 'text', admin: { description: 'Kleiner Text über der Überschrift' } },
            { name: 'heroHeading', label: 'Überschrift', type: 'text', required: true, admin: { description: 'HTML erlaubt: <br/> für Zeilenumbruch, <em> für Kursiv' } },
            { name: 'heroDescription', label: 'Beschreibungstext', type: 'textarea' },
            { name: 'heroVideo', label: 'Video-Dateiname', type: 'text', admin: { description: 'z.B. "hero.mp4" (liegt im Produktordner)' } },
          ],
        },
        // === Tab: Bilder ===
        {
          label: 'Bilder',
          description: 'Hero-Bild und Produktgalerie',
          fields: [
            {
              name: 'images',
              label: 'Bilder',
              type: 'group',
              fields: [
                { name: 'basePath', label: 'Bildordner-Pfad', type: 'text', required: true, admin: { description: 'z.B. "/images/products/vitair"' } },
                { name: 'hero', label: 'Hero-Bild', type: 'text', required: true, admin: { description: 'Dateiname des Hauptbilds (z.B. "rotlicht.webp")' } },
                {
                  name: 'gallery',
                  label: 'Galerie',
                  type: 'array',
                  labels: { singular: 'Bild', plural: 'Bilder' },
                  admin: { description: 'Produktbilder für die Galerie-Ansicht' },
                  fields: [
                    { name: 'file', label: 'Dateiname', type: 'text', required: true },
                    { name: 'alt', label: 'Alternativtext', type: 'text', required: true, admin: { description: 'Beschreibung des Bildes für Barrierefreiheit' } },
                  ],
                },
              ],
            },
          ],
        },
        // === Tab: Detailsektionen ===
        {
          label: 'Detailsektionen',
          description: 'Abschnitte mit Text, Bild und Aufzählungspunkten',
          fields: [
            {
              name: 'details',
              label: 'Sektionen',
              type: 'array',
              labels: { singular: 'Sektion', plural: 'Sektionen' },
              admin: { description: 'Jede Sektion zeigt einen Aspekt des Produkts', initCollapsed: true },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'tag', label: 'Kategorie-Tag', type: 'text', required: true, admin: { width: '50%' } },
                    { name: 'heading', label: 'Überschrift', type: 'text', required: true, admin: { width: '50%' } },
                  ],
                },
                { name: 'text', label: 'Beschreibungstext', type: 'textarea', required: true },
                { name: 'image', label: 'Bild-Dateiname', type: 'text', required: true, admin: { description: 'z.B. "detail.webp"' } },
                {
                  name: 'bullets',
                  label: 'Aufzählungspunkte',
                  type: 'array',
                  labels: { singular: 'Punkt', plural: 'Punkte' },
                  fields: [
                    { name: 'text', label: 'Text', type: 'text', required: true },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'reverse', label: 'Bild links / Text rechts', type: 'checkbox', defaultValue: false, admin: { width: '50%' } },
                    { name: 'lottie', label: 'Lottie-Animation', type: 'text', admin: { width: '50%', description: 'Pfad zur Lottie-JSON (optional)' } },
                  ],
                },
              ],
            },
          ],
        },
        // === Tab: Spezifikationen ===
        {
          label: 'Spezifikationen',
          description: 'Technische Daten des Produkts',
          fields: [
            {
              name: 'specs',
              label: 'Technische Daten',
              type: 'array',
              labels: { singular: 'Spezifikation', plural: 'Spezifikationen' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'label', label: 'Bezeichnung', type: 'text', required: true, admin: { width: '50%' } },
                    { name: 'value', label: 'Wert', type: 'text', required: true, admin: { width: '50%' } },
                  ],
                },
              ],
            },
          ],
        },
        // === Tab: Extras ===
        {
          label: 'Extras',
          description: 'Laufband, Vertrauens-Badges und Hotspots',
          fields: [
            {
              name: 'marqueeItems',
              label: 'Laufband-Texte',
              type: 'array',
              labels: { singular: 'Text', plural: 'Texte' },
              admin: { description: 'Texte im animierten Laufband' },
              fields: [
                { name: 'text', label: 'Text', type: 'text', required: true },
              ],
            },
            {
              name: 'trustBadges',
              label: 'Vertrauens-Badges',
              type: 'array',
              labels: { singular: 'Badge', plural: 'Badges' },
              admin: { description: 'Icons mit Text unter dem Kaufbereich' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'icon', label: 'Icon', type: 'text', required: true, admin: { width: '30%', description: 'Lucide-Icon z.B. "shield", "truck"' } },
                    { name: 'text', label: 'Text', type: 'text', required: true, admin: { width: '70%' } },
                  ],
                },
              ],
            },
            {
              name: 'hotspots',
              label: 'Interaktive Hotspots',
              type: 'group',
              admin: { description: 'Klickbare Punkte auf dem Produktbild (optional)' },
              fields: [
                { name: 'image', label: 'Bild-Dateiname', type: 'text', admin: { description: 'Bild für die Hotspot-Ansicht' } },
                {
                  name: 'points',
                  label: 'Hotspot-Punkte',
                  type: 'array',
                  labels: { singular: 'Punkt', plural: 'Punkte' },
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        { name: 'x', label: 'X (%)', type: 'number', required: true, min: 0, max: 100, admin: { width: '25%' } },
                        { name: 'y', label: 'Y (%)', type: 'number', required: true, min: 0, max: 100, admin: { width: '25%' } },
                        { name: 'title', label: 'Titel', type: 'text', required: true, admin: { width: '50%' } },
                      ],
                    },
                    { name: 'description', label: 'Beschreibung', type: 'textarea', required: true },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
