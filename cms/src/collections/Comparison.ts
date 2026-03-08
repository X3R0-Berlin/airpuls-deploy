import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '../access/roles'
import { afterChangeExportHook } from '../hooks/afterChangeExport'

export const Comparison: CollectionConfig = {
  slug: 'comparison',
  labels: {
    singular: 'Vergleichszeile',
    plural: 'Produktvergleich',
  },
  hooks: { afterChange: [afterChangeExportHook] },
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['sortOrder', 'label', 'type'],
    group: 'Shop',
    description: 'Vergleichstabelle der Produkte — wird automatisch exportiert',
    livePreview: {
      url: 'http://localhost:3000/vergleich',
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
          name: 'label',
          label: 'Eigenschaft',
          type: 'text',
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'type',
          label: 'Typ',
          type: 'select',
          required: true,
          options: [
            { label: 'Textwerte', value: 'values' },
            { label: 'Häkchen (Ja/Nein)', value: 'check' },
          ],
          admin: { width: '30%' },
        },
      ],
    },
    // Textwerte (wenn Typ = "Textwerte")
    {
      type: 'row',
      admin: {
        condition: (data: Record<string, unknown>) => data?.type === 'values',
      },
      fields: [
        {
          name: 'vitairValue',
          label: 'Vitair',
          type: 'text',
          admin: {
            width: '33%',
            condition: (data: Record<string, unknown>) => data?.type === 'values',
          },
        },
        {
          name: 'solitairValue',
          label: 'Solitair',
          type: 'text',
          admin: {
            width: '33%',
            condition: (data: Record<string, unknown>) => data?.type === 'values',
          },
        },
        {
          name: 'preventairValue',
          label: 'Preventair',
          type: 'text',
          admin: {
            width: '33%',
            condition: (data: Record<string, unknown>) => data?.type === 'values',
          },
        },
      ],
    },
    // Häkchen (wenn Typ = "Häkchen")
    {
      type: 'row',
      admin: {
        condition: (data: Record<string, unknown>) => data?.type === 'check',
      },
      fields: [
        {
          name: 'vitairCheck',
          label: 'Vitair',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            width: '33%',
            condition: (data: Record<string, unknown>) => data?.type === 'check',
          },
        },
        {
          name: 'solitairCheck',
          label: 'Solitair',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            width: '33%',
            condition: (data: Record<string, unknown>) => data?.type === 'check',
          },
        },
        {
          name: 'preventairCheck',
          label: 'Preventair',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            width: '33%',
            condition: (data: Record<string, unknown>) => data?.type === 'check',
          },
        },
      ],
    },
  ],
}
