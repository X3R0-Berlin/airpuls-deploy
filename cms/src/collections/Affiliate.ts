import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '../access/roles'
import { afterChangeExportHook } from '../hooks/afterChangeExport'

export const Affiliate: CollectionConfig = {
  slug: 'affiliate-tiers',
  labels: {
    singular: 'Partner-Stufe',
    plural: 'Partnerprogramm',
  },
  hooks: { afterChange: [afterChangeExportHook] },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['sortOrder', 'name', 'commission'],
    group: 'Shop',
    description: 'Partnerprogramm-Stufen mit Provisionen — wird automatisch exportiert',
    livePreview: {
      url: 'http://localhost:3000/partner',
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
          admin: { width: '15%' },
        },
        {
          name: 'tierId',
          label: 'Stufen-ID',
          type: 'text',
          required: true,
          unique: true,
          admin: { width: '25%', description: 'z.B. "kunde", "therapeut"' },
        },
        {
          name: 'name',
          label: 'Stufenname',
          type: 'text',
          required: true,
          admin: { width: '35%' },
        },
        {
          name: 'commission',
          label: 'Provision (%)',
          type: 'number',
          required: true,
          min: 0,
          max: 100,
          admin: { width: '25%' },
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
      name: 'benefits',
      label: 'Vorteile',
      type: 'array',
      labels: { singular: 'Vorteil', plural: 'Vorteile' },
      fields: [
        { name: 'text', label: 'Vorteilstext', type: 'text', required: true },
      ],
    },
    {
      name: 'estimatedEarning',
      label: 'Geschätzter Verdienst',
      type: 'text',
      required: true,
      admin: { description: 'z.B. "bis zu 500 € pro Monat"' },
    },
  ],
}
