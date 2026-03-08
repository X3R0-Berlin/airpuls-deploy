import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '../access/roles'
import { afterChangeExportHook } from '../hooks/afterChangeExport'

export const FAQ: CollectionConfig = {
  slug: 'faq',
  labels: {
    singular: 'Häufige Frage',
    plural: 'Häufige Fragen (FAQ)',
  },
  hooks: { afterChange: [afterChangeExportHook] },
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['category', 'sortOrder', 'question'],
    group: 'Inhalte',
    description: 'Fragen & Antworten — werden nach Kategorie gruppiert exportiert',
    livePreview: {
      url: 'http://localhost:3000/faq',
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
        {
          name: 'category',
          label: 'Kategorie',
          type: 'select',
          required: true,
          options: [
            { label: 'Produkt', value: 'Produkt' },
            { label: 'Bestellung', value: 'Bestellung' },
            { label: 'Versand', value: 'Versand' },
            { label: 'Rückgabe', value: 'Rückgabe' },
          ],
          admin: { width: '40%' },
        },
        {
          name: 'sortOrder',
          label: 'Reihenfolge',
          type: 'number',
          required: true,
          admin: { width: '20%', description: 'Innerhalb der Kategorie' },
        },
      ],
    },
    {
      name: 'question',
      label: 'Frage',
      type: 'text',
      required: true,
    },
    {
      name: 'answer',
      label: 'Antwort',
      type: 'textarea',
      required: true,
      admin: { description: 'Tipp: {{email}} wird durch die Kontakt-E-Mail ersetzt' },
    },
  ],
}
