import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '../access/roles'
import { afterChangeExportHook } from '../hooks/afterChangeExport'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: {
    singular: 'Bewertung',
    plural: 'Bewertungen',
  },
  hooks: { afterChange: [afterChangeExportHook] },
  admin: {
    useAsTitle: 'author',
    defaultColumns: ['author', 'product', 'stars', 'verified'],
    group: 'Inhalte',
    description: 'Kundenbewertungen — werden automatisch exportiert',
    livePreview: {
      url: 'http://localhost:3000/#testimonials',
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
      type: 'row',
      fields: [
        { name: 'author', label: 'Autor', type: 'text', required: true, admin: { width: '40%' } },
        { name: 'product', label: 'Produkt', type: 'text', required: true, admin: { width: '30%', description: 'Produkt-Slug z.B. "vitair"' } },
        { name: 'stars', label: 'Sterne', type: 'number', required: true, min: 1, max: 5, defaultValue: 5, admin: { width: '15%' } },
        { name: 'verified', label: 'Verifiziert', type: 'checkbox', defaultValue: false, admin: { width: '15%' } },
      ],
    },
    { name: 'text', label: 'Bewertungstext', type: 'textarea', required: true },
    {
      type: 'row',
      fields: [
        { name: 'location', label: 'Ort', type: 'text', required: true, admin: { width: '33%' } },
        { name: 'avatar', label: 'Profilbild-Pfad', type: 'text', admin: { width: '34%', description: 'z.B. "/images/testimonials/martina.webp"' } },
        { name: 'purchaseDate', label: 'Kaufdatum', type: 'text', admin: { width: '33%', description: 'Format: "2024-11"' } },
      ],
    },
  ],
}
