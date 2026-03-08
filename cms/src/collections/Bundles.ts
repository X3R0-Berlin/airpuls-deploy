import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '../access/roles'
import { afterChangeExportHook } from '../hooks/afterChangeExport'

export const Bundles: CollectionConfig = {
  slug: 'bundles',
  labels: {
    singular: 'Zubehör-Paket',
    plural: 'Zubehör-Pakete',
  },
  hooks: { afterChange: [afterChangeExportHook] },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'price'],
    group: 'Shop',
    description: 'Zusätzliche Produkt-Pakete — werden automatisch exportiert',
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
          name: 'slug',
          label: 'URL-Slug',
          type: 'text',
          required: true,
          unique: true,
          admin: { width: '30%', description: 'z.B. "katalysator-set"' },
        },
        {
          name: 'name',
          label: 'Name',
          type: 'text',
          required: true,
          admin: { width: '70%' },
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
          name: 'price',
          label: 'Preis (Cent)',
          type: 'number',
          required: true,
          min: 0,
          admin: { width: '25%', description: 'z.B. 14900 = 149,00 €' },
        },
        {
          name: 'priceDisplay',
          label: 'Preisanzeige',
          type: 'text',
          required: true,
          admin: { width: '25%', description: 'z.B. "149,00"' },
        },
        {
          name: 'icon',
          label: 'Icon',
          type: 'text',
          required: true,
          admin: { width: '33%', description: 'Lucide-Icon z.B. "disc"' },
        },
      ],
    },
    {
      name: 'forProducts',
      label: 'Verfügbar für Produkte',
      type: 'array',
      labels: { singular: 'Produkt', plural: 'Produkte' },
      admin: { description: 'Welche Produkte können dieses Zubehör nutzen?' },
      fields: [
        {
          name: 'productSlug',
          label: 'Produkt-Slug',
          type: 'text',
          required: true,
          admin: { description: 'z.B. "vitair"' },
        },
      ],
    },
  ],
}
