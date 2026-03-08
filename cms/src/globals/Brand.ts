import type { GlobalConfig } from 'payload'
import { isAdminOrEditor } from '../access/roles'
import { afterChangeGlobalExportHook } from '../hooks/afterChangeExport'

export const Brand: GlobalConfig = {
  slug: 'brand',
  label: 'Markenidentität',
  hooks: { afterChange: [afterChangeGlobalExportHook] },
  admin: {
    description: 'Zentrale Markeneinstellungen — Logo, Farben, Schriften, SEO',
    group: 'Einstellungen',
  },
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: [
    // === Allgemein ===
    {
      type: 'collapsible',
      label: 'Allgemein',
      admin: { initCollapsed: false },
      fields: [
        { name: 'name', label: 'Markenname', type: 'text', required: true, defaultValue: 'AIRIMPULS' },
        {
          name: 'logoParts',
          label: 'Logo-Teile',
          type: 'group',
          admin: { description: 'Textteile des Logos (für farbige Darstellung)' },
          fields: [
            { name: 'main', label: 'Hauptteil', type: 'text', required: true, defaultValue: 'AIR' },
            { name: 'accent', label: 'Akzent-Teil', type: 'text', required: true, defaultValue: 'IMPULS' },
          ],
        },
        { name: 'tagline', label: 'Slogan', type: 'text', required: true },
        { name: 'companyLegal', label: 'Firmenbezeichnung (rechtlich)', type: 'text', required: true },
        { name: 'language', label: 'Sprache', type: 'text', defaultValue: 'de' },
      ],
    },
    // === Logos ===
    {
      type: 'collapsible',
      label: 'Logo-Dateien',
      admin: { initCollapsed: true },
      fields: [
        { name: 'logoImage', label: 'Logo (Standard)', type: 'text', defaultValue: '/images/Airimpuls_Logo.svg', admin: { description: 'SVG-Pfad zum Hauptlogo' } },
        { name: 'logoInverse', label: 'Logo (Invertiert)', type: 'text', defaultValue: '/images/Airimpuls_Logo_Inverse.svg' },
        { name: 'logoIcon', label: 'Logo (Icon)', type: 'text', defaultValue: '/images/Airimpuls_Logo_Icon.svg' },
      ],
    },
    // === Währung ===
    {
      name: 'currency',
      label: 'Währung',
      type: 'group',
      fields: [
        { name: 'code', label: 'Währungscode', type: 'text', defaultValue: 'EUR' },
        { name: 'symbol', label: 'Symbol', type: 'text', defaultValue: '€' },
        { name: 'locale', label: 'Locale', type: 'text', defaultValue: 'de-DE' },
      ],
    },
    // === Farben ===
    {
      name: 'colors',
      label: 'Markenfarben',
      type: 'group',
      admin: { description: 'CSS-Farbwerte für das gesamte Design' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'bgDark', label: 'Hintergrund (Dunkel)', type: 'text', defaultValue: '#121416', admin: { width: '33%' } },
            { name: 'bgLight', label: 'Hintergrund (Hell)', type: 'text', defaultValue: '#F8F9FA', admin: { width: '33%' } },
            { name: 'bgCream', label: 'Hintergrund (Creme)', type: 'text', defaultValue: '#EEF0F2', admin: { width: '33%' } },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'textDark', label: 'Text (Dunkel)', type: 'text', defaultValue: '#222222', admin: { width: '33%' } },
            { name: 'textLight', label: 'Text (Hell)', type: 'text', defaultValue: '#F8F9FA', admin: { width: '33%' } },
            { name: 'textMuted', label: 'Text (Gedämpft)', type: 'text', defaultValue: '#5f6773', admin: { width: '33%' } },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'accent', label: 'Akzentfarbe', type: 'text', defaultValue: '#357868', admin: { width: '33%' } },
            { name: 'accentGlow', label: 'Akzent-Glow', type: 'text', defaultValue: '#2f7566', admin: { width: '33%' } },
            { name: 'gold', label: 'Gold/CTA', type: 'text', defaultValue: '#E25A43', admin: { width: '33%' } },
          ],
        },
      ],
    },
    // === Schriften ===
    {
      name: 'fonts',
      label: 'Schriften',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'serif', label: 'Serifenschrift', type: 'text', defaultValue: 'Cormorant Garamond', admin: { width: '50%' } },
            { name: 'sans', label: 'Sans-Serif-Schrift', type: 'text', defaultValue: 'DM Sans', admin: { width: '50%' } },
          ],
        },
      ],
    },
    // === Social & SEO ===
    {
      name: 'social',
      label: 'Kontakt',
      type: 'group',
      fields: [
        { name: 'email', label: 'Kontakt-E-Mail', type: 'email', required: true },
      ],
    },
    {
      name: 'seo',
      label: 'SEO-Einstellungen',
      type: 'group',
      admin: { description: 'Standardwerte für Suchmaschinenoptimierung' },
      fields: [
        { name: 'titleTemplate', label: 'Titel-Template', type: 'text', required: true, admin: { description: 'z.B. "%s | AIRIMPULS"' } },
        { name: 'defaultDescription', label: 'Standard-Beschreibung', type: 'textarea', required: true, admin: { description: 'Meta-Description wenn keine spezifische vorhanden' } },
      ],
    },
  ],
}
