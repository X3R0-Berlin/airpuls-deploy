import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '../access/roles'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Medium',
    plural: 'Medien',
  },
  admin: {
    group: 'System',
    description: 'Bilder und Videos hochladen und verwalten',
  },
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  upload: {
    staticDir: '../media',
    mimeTypes: ['image/*', 'video/*'],
  },
  fields: [
    {
      name: 'alt',
      label: 'Alternativtext',
      type: 'text',
      required: true,
      admin: { description: 'Beschreibung des Bildes für Barrierefreiheit und SEO' },
    },
  ],
}
