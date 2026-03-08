import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '../access/roles'
import { afterChangeExportHook } from '../hooks/afterChangeExport'

export const Features: CollectionConfig = {
  slug: 'features',
  labels: {
    singular: 'Feature',
    plural: 'Features',
  },
  hooks: { afterChange: [afterChangeExportHook] },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['sortOrder', 'title', 'icon'],
    group: 'Inhalte',
    description: 'Produkt-Vorteile auf der Startseite — werden automatisch exportiert',
    livePreview: {
      url: 'http://localhost:3000/#features',
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
          admin: { width: '20%', description: '1, 2, 3, ...' },
        },
        {
          name: 'icon',
          label: 'Icon',
          type: 'text',
          required: true,
          admin: { width: '30%', description: 'Lucide-Icon: sun, moon, sparkles, heart' },
        },
        {
          name: 'title',
          label: 'Titel',
          type: 'text',
          required: true,
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'description',
      label: 'Beschreibung',
      type: 'textarea',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'video',
          label: 'Video-Pfad',
          type: 'text',
          admin: { width: '50%', description: 'z.B. "/videos/energie.webm" (optional)' },
        },
        {
          name: 'poster',
          label: 'Vorschaubild',
          type: 'text',
          admin: { width: '50%', description: 'z.B. "/images/features/energie.webp" (optional)' },
        },
      ],
    },
  ],
}
