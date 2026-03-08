import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '../access/roles'
import { afterChangeExportHook } from '../hooks/afterChangeExport'

export const Stats: CollectionConfig = {
  slug: 'stats',
  labels: {
    singular: 'Statistik',
    plural: 'Statistiken',
  },
  hooks: { afterChange: [afterChangeExportHook] },
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['sortOrder', 'value', 'suffix', 'label'],
    group: 'Inhalte',
    description: 'Kennzahlen auf der Startseite (z.B. "25+ Jahre Erfahrung")',
    livePreview: {
      url: 'http://localhost:3000/#stats',
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
          name: 'sortOrder',
          label: 'Reihenfolge',
          type: 'number',
          required: true,
          admin: { width: '20%' },
        },
        {
          name: 'value',
          label: 'Zahlenwert',
          type: 'number',
          required: true,
          admin: { width: '20%' },
        },
        {
          name: 'suffix',
          label: 'Suffix',
          type: 'text',
          required: true,
          admin: { width: '20%', description: 'z.B. "+", "%"' },
        },
        {
          name: 'label',
          label: 'Bezeichnung',
          type: 'text',
          required: true,
          admin: { width: '40%' },
        },
      ],
    },
  ],
}
