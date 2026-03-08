import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminFieldLevel } from '../access/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Benutzer',
    plural: 'Benutzer',
  },
  auth: true,
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'role', 'name'],
    group: 'System',
    description: 'CMS-Benutzer und Zugangsverwaltung',
  },
  access: {
    create: isAdmin,
    delete: isAdmin,
    read: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      if (user) return { id: { equals: user.id } }
      return false
    },
    update: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      if (user) return { id: { equals: user.id } }
      return false
    },
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      label: 'Rolle',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Administrator', value: 'admin' },
        { label: 'Redakteur', value: 'editor' },
      ],
      access: {
        update: isAdminFieldLevel,
      },
      admin: {
        description: 'Administratoren können Benutzer verwalten. Redakteure können nur Inhalte bearbeiten.',
      },
    },
  ],
}
