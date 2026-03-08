import type { GlobalConfig } from 'payload'
import { isAdminOrEditor } from '../access/roles'
import { afterChangeGlobalExportHook } from '../hooks/afterChangeExport'

/**
 * Homepage-Seiten-Builder
 *
 * Ermöglicht Marketern die Startseite visuell zusammenzustellen:
 * - Sektionen per Drag & Drop anordnen
 * - Sektionen ein-/ausblenden
 * - Überschriften und Beschreibungen individuell anpassen
 *
 * Export: data/homepage.json
 */
export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Startseite',
  hooks: { afterChange: [afterChangeGlobalExportHook] },
  admin: {
    description: 'Startseite zusammenstellen — Sektionen per Drag & Drop anordnen, ein-/ausblenden und konfigurieren',
    group: 'Inhalte',
    livePreview: {
      url: 'http://localhost:3000',
    },
  },
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: [
    // === Allgemeine SEO-Einstellungen für die Startseite ===
    {
      type: 'collapsible',
      label: 'SEO & Meta',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'metaTitle',
          label: 'Seitentitel',
          type: 'text',
          admin: { description: 'Titel im Browser-Tab und bei Google (Standard: Markenname)' },
        },
        {
          name: 'metaDescription',
          label: 'Meta-Beschreibung',
          type: 'textarea',
          admin: { description: 'Beschreibung für Suchmaschinen (max. 160 Zeichen)' },
        },
      ],
    },

    // === Seiten-Builder: Sektionen als Blocks ===
    {
      name: 'sections',
      label: 'Sektionen',
      type: 'blocks',
      minRows: 1,
      admin: {
        description: 'Sektionen der Startseite — Reihenfolge per Drag & Drop ändern, einzelne Sektionen hinzufügen oder entfernen',
      },
      blocks: [
        // ─── Hero-Bereich ─────────────────────────────────
        {
          slug: 'hero',
          labels: { singular: 'Hero-Bereich', plural: 'Hero-Bereiche' },
          imageAltText: 'Großer Einstiegsbereich mit Produktvideo und Call-to-Action',
          fields: [
            {
              name: 'product',
              label: 'Hauptprodukt',
              type: 'text',
              defaultValue: 'vitair',
              admin: { description: 'Produkt-Slug des Hero-Produkts (z.B. "vitair")' },
            },
            {
              name: 'showVideo',
              label: 'Video anzeigen',
              type: 'checkbox',
              defaultValue: true,
              admin: { description: 'Produktvideo im Hintergrund abspielen' },
            },
          ],
        },

        // ─── Laufband/Marquee ─────────────────────────────
        {
          slug: 'marquee',
          labels: { singular: 'Laufband', plural: 'Laufbänder' },
          imageAltText: 'Scrollendes Textband mit Produktmerkmalen',
          fields: [
            {
              name: 'speed',
              label: 'Geschwindigkeit',
              type: 'select',
              defaultValue: 'normal',
              options: [
                { label: 'Langsam', value: 'slow' },
                { label: 'Normal', value: 'normal' },
                { label: 'Schnell', value: 'fast' },
              ],
              admin: { description: 'Scroll-Geschwindigkeit des Laufbands' },
            },
          ],
        },

        // ─── Features/Vorteile ────────────────────────────
        {
          slug: 'features',
          labels: { singular: 'Produkt-Vorteile', plural: 'Produkt-Vorteile' },
          imageAltText: 'Vorteile des Produkts als Karten mit Icons',
          fields: [
            {
              name: 'heading',
              label: 'Überschrift',
              type: 'text',
              admin: { description: 'Optionale Überschrift über den Feature-Karten (leer = Standard)' },
            },
            {
              name: 'maxItems',
              label: 'Maximale Anzahl',
              type: 'number',
              admin: { description: 'Anzahl der angezeigten Features (leer = alle)' },
            },
          ],
        },

        // ─── Statistik-Leiste ─────────────────────────────
        {
          slug: 'stats',
          labels: { singular: 'Kennzahlen-Leiste', plural: 'Kennzahlen-Leisten' },
          imageAltText: 'Animierte Kennzahlen (z.B. 25+ Jahre, 10.000+ Kunden)',
          fields: [
            {
              name: 'backgroundColor',
              label: 'Hintergrundfarbe',
              type: 'select',
              defaultValue: 'dark',
              options: [
                { label: 'Dunkel', value: 'dark' },
                { label: 'Hell', value: 'light' },
                { label: 'Akzent', value: 'accent' },
              ],
              admin: { description: 'Farbschema der Statistik-Leiste' },
            },
          ],
        },

        // ─── Produkt-Showcase ─────────────────────────────
        {
          slug: 'product-showcase',
          labels: { singular: 'Produkt-Highlight', plural: 'Produkt-Highlights' },
          imageAltText: 'Detaillierte Produktvorstellung mit Bild und Beschreibung',
          fields: [
            {
              name: 'product',
              label: 'Produkt',
              type: 'text',
              defaultValue: 'vitair',
              admin: { description: 'Produkt-Slug für den Showcase (z.B. "vitair")' },
            },
          ],
        },

        // ─── Detail-Sektionen ─────────────────────────────
        {
          slug: 'detail-sections',
          labels: { singular: 'Detail-Sektionen', plural: 'Detail-Sektionen' },
          imageAltText: 'Produkt-Details mit Bild-Text-Wechsel (alternierend links/rechts)',
          fields: [
            {
              name: 'product',
              label: 'Produkt',
              type: 'text',
              defaultValue: 'vitair',
              admin: { description: 'Produkt-Slug für die Detail-Sektionen' },
            },
            {
              name: 'maxSections',
              label: 'Maximale Anzahl',
              type: 'number',
              admin: { description: 'Anzahl der angezeigten Detail-Abschnitte (leer = alle)' },
            },
          ],
        },

        // ─── Lifestyle-Galerie ────────────────────────────
        {
          slug: 'lifestyle-gallery',
          labels: { singular: 'Lifestyle-Galerie', plural: 'Lifestyle-Galerien' },
          imageAltText: 'Bildergalerie mit Lifestyle-Fotos des Produkts im Einsatz',
          fields: [
            {
              name: 'heading',
              label: 'Überschrift',
              type: 'text',
              admin: { description: 'Optionale Überschrift (leer = Standard)' },
            },
          ],
        },

        // ─── Produktvergleich ─────────────────────────────
        {
          slug: 'product-comparison',
          labels: { singular: 'Produktvergleich', plural: 'Produktvergleiche' },
          imageAltText: 'Vergleichstabelle aller Produkte nebeneinander',
          fields: [
            {
              name: 'heading',
              label: 'Überschrift',
              type: 'text',
              admin: { description: 'Optionale Überschrift (leer = Standard aus Vergleichs-Collection)' },
            },
            {
              name: 'subheading',
              label: 'Unterüberschrift',
              type: 'text',
              admin: { description: 'Optionale Unterüberschrift' },
            },
          ],
        },

        // ─── Produktfinder ────────────────────────────────
        {
          slug: 'product-finder',
          labels: { singular: 'Produktfinder', plural: 'Produktfinder' },
          imageAltText: 'Interaktiver Fragebogen zur Produktempfehlung',
          fields: [
            {
              name: 'heading',
              label: 'Überschrift',
              type: 'text',
              admin: { description: 'Optionale Überschrift (leer = Standard)' },
            },
          ],
        },

        // ─── Kundenbewertungen ────────────────────────────
        {
          slug: 'testimonials',
          labels: { singular: 'Kundenbewertungen', plural: 'Kundenbewertungen' },
          imageAltText: 'Kundenbewertungen als Karussell mit Sternen und Zitaten',
          fields: [
            {
              name: 'heading',
              label: 'Überschrift',
              type: 'text',
              admin: { description: 'Optionale Überschrift (leer = Standard)' },
            },
            {
              name: 'maxItems',
              label: 'Maximale Anzahl',
              type: 'number',
              admin: { description: 'Anzahl der angezeigten Bewertungen (leer = alle)' },
            },
            {
              name: 'onlyVerified',
              label: 'Nur verifizierte',
              type: 'checkbox',
              defaultValue: false,
              admin: { description: 'Nur verifizierte Bewertungen anzeigen' },
            },
          ],
        },

        // ─── Partner-CTA ──────────────────────────────────
        {
          slug: 'affiliate-cta',
          labels: { singular: 'Partner-Aufruf', plural: 'Partner-Aufrufe' },
          imageAltText: 'Call-to-Action Banner für das Partnerprogramm',
          fields: [
            {
              name: 'heading',
              label: 'Überschrift',
              type: 'text',
              admin: { description: 'Optionale Überschrift (leer = Standard)' },
            },
            {
              name: 'buttonText',
              label: 'Button-Text',
              type: 'text',
              admin: { description: 'Text auf dem CTA-Button (leer = Standard)' },
            },
          ],
        },

        // ─── Newsletter ──────────────────────────────────
        {
          slug: 'newsletter',
          labels: { singular: 'Newsletter-Anmeldung', plural: 'Newsletter-Anmeldungen' },
          imageAltText: 'E-Mail-Anmeldung für den Newsletter',
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
              admin: { description: 'Optionaler Text unter der Überschrift' },
            },
          ],
        },

        // ─── Freitext-Sektion ─────────────────────────────
        {
          slug: 'richtext',
          labels: { singular: 'Freitext-Sektion', plural: 'Freitext-Sektionen' },
          imageAltText: 'Freier Text-Bereich mit Formatierung',
          fields: [
            {
              name: 'content',
              label: 'Inhalt',
              type: 'richText',
              required: true,
              admin: { description: 'Freier Inhalt mit Formatierung (Überschriften, Listen, Links etc.)' },
            },
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
              admin: { description: 'Breite des Textbereichs' },
            },
            {
              name: 'backgroundColor',
              label: 'Hintergrundfarbe',
              type: 'select',
              defaultValue: 'transparent',
              options: [
                { label: 'Transparent', value: 'transparent' },
                { label: 'Hell', value: 'light' },
                { label: 'Dunkel', value: 'dark' },
                { label: 'Creme', value: 'cream' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
