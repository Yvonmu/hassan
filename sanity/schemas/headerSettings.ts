import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'headerSettings',
  title: 'Header Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'missionText',
      title: 'Mission Text',
      type: 'string',
      description: 'Text shown in top bar (e.g., "Diplomatic Mission")',
    }),
    defineField({
      name: 'navigationItems',
      title: 'Navigation Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'sectionId', type: 'string', title: 'Section ID' },
            { name: 'order', type: 'number', title: 'Order' },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'Header Settings',
    },
  },
})
