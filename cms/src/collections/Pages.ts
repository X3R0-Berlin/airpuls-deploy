import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '../access/roles'
import { afterChangeExportHook } from '../hooks/afterChangeExport'

/**
 * Seiten-Builder Collection
 *
 * WordPress-ähnlicher Seiten-Builder für alle Unterseiten.
 * Jede Seite hat:
 * - SEO-Felder (Meta-Titel, Meta-Beschreibung)
 * - Seitenkopf (Überschrift, Beschreibung, Breadcrumb)
 * - Sektionen per Drag & Drop (Blocks-Feld)
 * - Live-Vorschau im Admin-Panel
 *
 * Export: data/pages/{slug}.json
 */
export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Seite',
    plural: 'Seiten',
  },
  hooks: { afterChange: [afterChangeExportHook] },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status'],
    group: 'Inhalte',
    description: 'Unterseiten der Webseite — visueller Seiten-Builder mit Drag & Drop',
    livePreview: {
      url: ({ data }) => {
        const slug = data?.slug || ''
        if (slug === 'produkte') return 'http://localhost:3000/produkte'
        if (slug === 'faq') return 'http://localhost:3000/faq'
        if (slug === 'vergleich') return 'http://localhost:3000/vergleich'
        if (slug === 'partner') return 'http://localhost:3000/partner'
        if (slug === 'kontakt') return 'http://localhost:3000/kontakt'
        return `http://localhost:3000/${slug}`
      },
    },
  },
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    // === Grundeinstellungen ===
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          label: 'Seitentitel',
          type: 'text',
          required: true,
          admin: { width: '50%', description: 'Interner Name und H1-Überschrift' },
        },
        {
          name: 'slug',
          label: 'URL-Pfad',
          type: 'text',
          required: true,
          unique: true,
          index: true,
          admin: { width: '30%', description: 'z.B. "produkte", "faq", "kontakt"' },
        },
        {
          name: 'status',
          label: 'Status',
          type: 'select',
          defaultValue: 'published',
          options: [
            { label: 'Veröffentlicht', value: 'published' },
            { label: 'Entwurf', value: 'draft' },
          ],
          admin: { width: '20%' },
        },
      ],
    },

    // === Tabs für übersichtliche Bearbeitung ===
    {
      type: 'tabs',
      tabs: [
        // ─── Tab: Seitenkopf ──────────────────────────────
        {
          label: 'Seitenkopf',
          description: 'Überschrift, Beschreibung und Darstellung',
          fields: [
            {
              name: 'subtitle',
              label: 'Untertitel',
              type: 'text',
              admin: { description: 'Optionaler Text unter der Überschrift' },
            },
            {
              name: 'description',
              label: 'Einleitungstext',
              type: 'textarea',
              admin: { description: 'Beschreibungstext im Seitenkopf' },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'headerStyle',
                  label: 'Kopf-Stil',
                  type: 'select',
                  defaultValue: 'light',
                  options: [
                    { label: 'Hell', value: 'light' },
                    { label: 'Dunkel', value: 'dark' },
                    { label: 'Akzent', value: 'accent' },
                    { label: 'Kein Kopf', value: 'none' },
                  ],
                  admin: { width: '33%' },
                },
                {
                  name: 'showBreadcrumb',
                  label: 'Breadcrumb anzeigen',
                  type: 'checkbox',
                  defaultValue: true,
                  admin: { width: '33%', description: 'Pfad-Navigation oben auf der Seite' },
                },
                {
                  name: 'headerImage',
                  label: 'Headerbild',
                  type: 'text',
                  admin: { width: '33%', description: 'Optionaler Bildpfad (z.B. "/images/header.webp")' },
                },
              ],
            },
          ],
        },

        // ─── Tab: Sektionen (Seiten-Builder) ──────────────
        {
          label: 'Sektionen',
          description: 'Seiteninhalt per Drag & Drop zusammenstellen',
          fields: [
            {
              name: 'sections',
              label: 'Sektionen',
              type: 'blocks',
              admin: {
                description: 'Seiteninhalt — Blöcke per Drag & Drop anordnen, hinzufügen oder entfernen',
              },
              blocks: [
                // ─── Freitext / Rich Text ───────────────────
                {
                  slug: 'richtext',
                  labels: { singular: 'Freitext', plural: 'Freitext-Sektionen' },
                  imageAltText: 'Freier Textbereich mit Formatierung',
                  fields: [
                    {
                      name: 'content',
                      label: 'Inhalt',
                      type: 'richText',
                      admin: { description: 'Freier Inhalt mit Formatierung (Überschriften, Listen, Links, Bilder etc.)' },
                    },
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'maxWidth',
                          label: 'Maximale Breite',
                          type: 'select',
                          defaultValue: 'prose',
                          options: [
                            { label: 'Schmal (Text)', value: 'prose' },
                            { label: 'Mittel', value: 'medium' },
                            { label: 'Volle Breite', value: 'full' },
                          ],
                          admin: { width: '50%' },
                        },
                        {
                          name: 'backgroundColor',
                          label: 'Hintergrund',
                          type: 'select',
                          defaultValue: 'transparent',
                          options: [
                            { label: 'Transparent', value: 'transparent' },
                            { label: 'Hell', value: 'light' },
                            { label: 'Dunkel', value: 'dark' },
                            { label: 'Creme', value: 'cream' },
                          ],
                          admin: { width: '50%' },
                        },
                      ],
                    },
                  ],
                },

                // ─── Produkt-Übersicht ──────────────────────
                {
                  slug: 'product-grid',
                  labels: { singular: 'Produktraster', plural: 'Produktraster' },
                  imageAltText: 'Rasteransicht aller Produkte',
                  fields: [
                    {
                      name: 'heading',
                      label: 'Überschrift',
                      type: 'text',
                      admin: { description: 'Optionale Überschrift (leer = Standard)' },
                    },
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'columns',
                          label: 'Spalten',
                          type: 'select',
                          defaultValue: '3',
                          options: [
                            { label: '2 Spalten', value: '2' },
                            { label: '3 Spalten', value: '3' },
                            { label: '4 Spalten', value: '4' },
                          ],
                          admin: { width: '33%' },
                        },
                        {
                          name: 'showPrices',
                          label: 'Preise anzeigen',
                          type: 'checkbox',
                          defaultValue: true,
                          admin: { width: '33%' },
                        },
                        {
                          name: 'showDescription',
                          label: 'Beschreibung anzeigen',
                          type: 'checkbox',
                          defaultValue: true,
                          admin: { width: '33%' },
                        },
                      ],
                    },
                  ],
                },

                // ─── FAQ-Bereich ────────────────────────────
                {
                  slug: 'faq-section',
                  labels: { singular: 'FAQ-Bereich', plural: 'FAQ-Bereiche' },
                  imageAltText: 'Aufklappbare häufig gestellte Fragen',
                  fields: [
                    {
                      name: 'heading',
                      label: 'Überschrift',
                      type: 'text',
                      admin: { description: 'Optionale Überschrift (leer = Standard)' },
                    },
                    {
                      name: 'categories',
                      label: 'Kategorien filtern',
                      type: 'text',
                      admin: { description: 'Kommagetrennt z.B. "Produkt,Bestellung" (leer = alle)' },
                    },
                    {
                      name: 'layout',
                      label: 'Layout',
                      type: 'select',
                      defaultValue: 'accordion',
                      options: [
                        { label: 'Akkordeon (zugeklappte Antworten)', value: 'accordion' },
                        { label: 'Offen (alle sichtbar)', value: 'open' },
                      ],
                    },
                  ],
                },

                // ─── Produktvergleich ────────────────────────
                {
                  slug: 'comparison-table',
                  labels: { singular: 'Vergleichstabelle', plural: 'Vergleichstabellen' },
                  imageAltText: 'Vergleichstabelle der Produkte',
                  fields: [
                    {
                      name: 'heading',
                      label: 'Überschrift',
                      type: 'text',
                      admin: { description: 'Optionale Überschrift (leer = Standard)' },
                    },
                    {
                      name: 'subheading',
                      label: 'Unterüberschrift',
                      type: 'text',
                    },
                  ],
                },

                // ─── Partner/Affiliate-Stufen ───────────────
                {
                  slug: 'affiliate-tiers',
                  labels: { singular: 'Partner-Stufen', plural: 'Partner-Stufen' },
                  imageAltText: 'Partnerprogramm Stufen mit Provisionen',
                  fields: [
                    {
                      name: 'heading',
                      label: 'Überschrift',
                      type: 'text',
                      admin: { description: 'Optionale Überschrift (leer = Standard)' },
                    },
                    {
                      name: 'showBenefits',
                      label: 'Vorteile anzeigen',
                      type: 'checkbox',
                      defaultValue: true,
                    },
                  ],
                },

                // ─── Kontaktformular ────────────────────────
                {
                  slug: 'contact-form',
                  labels: { singular: 'Kontaktformular', plural: 'Kontaktformulare' },
                  imageAltText: 'Kontaktformular mit E-Mail, Name und Nachricht',
                  fields: [
                    {
                      name: 'heading',
                      label: 'Überschrift',
                      type: 'text',
                      admin: { description: 'Optionale Überschrift (leer = Standard)' },
                    },
                    {
                      name: 'description',
                      label: 'Beschreibung',
                      type: 'textarea',
                      admin: { description: 'Text über dem Formular' },
                    },
                    {
                      name: 'showContactInfo',
                      label: 'Kontaktdaten anzeigen',
                      type: 'checkbox',
                      defaultValue: true,
                      admin: { description: 'E-Mail, Adresse und Antwortzeit neben dem Formular' },
                    },
                  ],
                },

                // ─── Kundenbewertungen ──────────────────────
                {
                  slug: 'testimonials',
                  labels: { singular: 'Kundenbewertungen', plural: 'Kundenbewertungen' },
                  imageAltText: 'Kundenbewertungen als Karussell',
                  fields: [
                    {
                      name: 'heading',
                      label: 'Überschrift',
                      type: 'text',
                    },
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'maxItems',
                          label: 'Max. Anzahl',
                          type: 'number',
                          admin: { width: '33%', description: 'Leer = alle' },
                        },
                        {
                          name: 'filterProduct',
                          label: 'Produkt filtern',
                          type: 'text',
                          admin: { width: '33%', description: 'Produkt-Slug (leer = alle)' },
                        },
                        {
                          name: 'onlyVerified',
                          label: 'Nur verifizierte',
                          type: 'checkbox',
                          defaultValue: false,
                          admin: { width: '33%' },
                        },
                      ],
                    },
                  ],
                },

                // ─── Kennzahlen-Leiste ──────────────────────
                {
                  slug: 'stats-bar',
                  labels: { singular: 'Kennzahlen-Leiste', plural: 'Kennzahlen-Leisten' },
                  imageAltText: 'Animierte Kennzahlen',
                  fields: [
                    {
                      name: 'backgroundColor',
                      label: 'Hintergrund',
                      type: 'select',
                      defaultValue: 'dark',
                      options: [
                        { label: 'Dunkel', value: 'dark' },
                        { label: 'Hell', value: 'light' },
                        { label: 'Akzent', value: 'accent' },
                      ],
                    },
                  ],
                },

                // ─── Features / Vorteile ────────────────────
                {
                  slug: 'features',
                  labels: { singular: 'Produkt-Vorteile', plural: 'Produkt-Vorteile' },
                  imageAltText: 'Feature-Karten mit Icons',
                  fields: [
                    {
                      name: 'heading',
                      label: 'Überschrift',
                      type: 'text',
                    },
                    {
                      name: 'maxItems',
                      label: 'Max. Anzahl',
                      type: 'number',
                      admin: { description: 'Leer = alle' },
                    },
                  ],
                },

                // ─── Newsletter ─────────────────────────────
                {
                  slug: 'newsletter',
                  labels: { singular: 'Newsletter-Anmeldung', plural: 'Newsletter-Anmeldungen' },
                  imageAltText: 'Newsletter-Anmeldung mit E-Mail-Feld',
                  fields: [
                    {
                      name: 'heading',
                      label: 'Überschrift',
                      type: 'text',
                    },
                    {
                      name: 'description',
                      label: 'Beschreibung',
                      type: 'textarea',
                    },
                  ],
                },

                // ─── Call-to-Action Banner ──────────────────
                {
                  slug: 'cta-banner',
                  labels: { singular: 'CTA-Banner', plural: 'CTA-Banner' },
                  imageAltText: 'Aufruf zum Handeln mit Button',
                  fields: [
                    {
                      name: 'heading',
                      label: 'Überschrift',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'description',
                      label: 'Text',
                      type: 'textarea',
                    },
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'buttonText',
                          label: 'Button-Text',
                          type: 'text',
                          required: true,
                          admin: { width: '33%' },
                        },
                        {
                          name: 'buttonLink',
                          label: 'Button-Link',
                          type: 'text',
                          required: true,
                          admin: { width: '33%', description: 'z.B. "/produkte" oder "https://..."' },
                        },
                        {
                          name: 'style',
                          label: 'Stil',
                          type: 'select',
                          defaultValue: 'accent',
                          options: [
                            { label: 'Akzent (Grün)', value: 'accent' },
                            { label: 'Dunkel', value: 'dark' },
                            { label: 'Hell', value: 'light' },
                          ],
                          admin: { width: '33%' },
                        },
                      ],
                    },
                  ],
                },

                // ─── Bild mit Text ──────────────────────────
                {
                  slug: 'image-text',
                  labels: { singular: 'Bild mit Text', plural: 'Bild-Text-Bereiche' },
                  imageAltText: 'Bild und Text nebeneinander',
                  fields: [
                    {
                      name: 'heading',
                      label: 'Überschrift',
                      type: 'text',
                    },
                    {
                      name: 'text',
                      label: 'Text',
                      type: 'richText',
                      required: true,
                    },
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'image',
                          label: 'Bildpfad',
                          type: 'text',
                          required: true,
                          admin: { width: '50%', description: 'z.B. "/images/about.webp"' },
                        },
                        {
                          name: 'imageAlt',
                          label: 'Bild-Alternativtext',
                          type: 'text',
                          required: true,
                          admin: { width: '50%' },
                        },
                      ],
                    },
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'imagePosition',
                          label: 'Bild-Position',
                          type: 'select',
                          defaultValue: 'right',
                          options: [
                            { label: 'Links', value: 'left' },
                            { label: 'Rechts', value: 'right' },
                          ],
                          admin: { width: '50%' },
                        },
                        {
                          name: 'backgroundColor',
                          label: 'Hintergrund',
                          type: 'select',
                          defaultValue: 'transparent',
                          options: [
                            { label: 'Transparent', value: 'transparent' },
                            { label: 'Hell', value: 'light' },
                            { label: 'Creme', value: 'cream' },
                          ],
                          admin: { width: '50%' },
                        },
                      ],
                    },
                  ],
                },

                // ─── Produktfinder ──────────────────────────
                {
                  slug: 'product-finder',
                  labels: { singular: 'Produktfinder', plural: 'Produktfinder' },
                  imageAltText: 'Interaktiver Fragebogen',
                  fields: [
                    {
                      name: 'heading',
                      label: 'Überschrift',
                      type: 'text',
                      admin: { description: 'Optionale Überschrift (leer = Standard)' },
                    },
                  ],
                },

                // ─── Abstandshalter ─────────────────────────
                {
                  slug: 'spacer',
                  labels: { singular: 'Abstandshalter', plural: 'Abstandshalter' },
                  imageAltText: 'Vertikaler Abstand zwischen Sektionen',
                  fields: [
                    {
                      name: 'size',
                      label: 'Größe',
                      type: 'select',
                      defaultValue: 'medium',
                      options: [
                        { label: 'Klein (24px)', value: 'small' },
                        { label: 'Mittel (48px)', value: 'medium' },
                        { label: 'Groß (96px)', value: 'large' },
                        { label: 'Sehr groß (128px)', value: 'xlarge' },
                      ],
                    },
                  ],
                },

                // ─── Trennlinie ─────────────────────────────
                {
                  slug: 'divider',
                  labels: { singular: 'Trennlinie', plural: 'Trennlinien' },
                  imageAltText: 'Horizontale Trennlinie',
                  fields: [
                    {
                      name: 'style',
                      label: 'Stil',
                      type: 'select',
                      defaultValue: 'line',
                      options: [
                        { label: 'Linie', value: 'line' },
                        { label: 'Gepunktet', value: 'dotted' },
                        { label: 'Verlauf', value: 'gradient' },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },

        // ─── Tab: SEO ─────────────────────────────────────
        {
          label: 'SEO',
          description: 'Suchmaschinenoptimierung und Meta-Tags',
          fields: [
            {
              name: 'metaTitle',
              label: 'Meta-Titel',
              type: 'text',
              admin: { description: 'Titel im Browser-Tab und bei Google (leer = Seitentitel + Markenname)' },
            },
            {
              name: 'metaDescription',
              label: 'Meta-Beschreibung',
              type: 'textarea',
              admin: { description: 'Beschreibung für Suchmaschinen (max. 160 Zeichen empfohlen)' },
            },
            {
              name: 'noIndex',
              label: 'Von Suchmaschinen ausblenden',
              type: 'checkbox',
              defaultValue: false,
              admin: { description: 'Seite wird nicht in Google & Co. angezeigt' },
            },
          ],
        },
      ],
    },
  ],
}
