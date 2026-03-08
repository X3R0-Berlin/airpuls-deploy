import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '../access/roles'

export const LegalPages: CollectionConfig = {
  slug: 'legal-pages',
  labels: {
    singular: 'Rechtliche Seite',
    plural: 'Rechtliche Seiten',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['slug', 'title'],
    group: 'System',
    description: 'Impressum, Datenschutz, AGB und weitere Pflichtseiten',
    livePreview: {
      url: ({ data }) => `http://localhost:3000/${data?.slug || 'impressum'}`,
    },
  },
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    {
      name: 'slug',
      label: 'Seitentyp',
      type: 'select',
      required: true,
      unique: true,
      options: [
        { label: 'Impressum', value: 'impressum' },
        { label: 'Datenschutzerklärung', value: 'datenschutz' },
        { label: 'Allgemeine Geschäftsbedingungen', value: 'agb' },
        { label: 'Versandinformationen', value: 'versand' },
        { label: 'Widerrufsbelehrung', value: 'widerruf' },
      ],
    },
    {
      name: 'title',
      label: 'Seitentitel',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      label: 'Inhalt',
      type: 'richText',
      required: true,
      admin: { description: 'Seiteninhalt mit Formatierung (Überschriften, Listen, Links etc.)' },
    },
  ],
}
