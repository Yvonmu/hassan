import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'naturalWonders',
  title: 'Natural Wonders (Djibouti)',
  type: 'document',
  fields: [
    defineField({
      name: 'wonders',
      title: 'Wonders List',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Wonder Title' },
            { name: 'location', type: 'string', title: 'Location' },
            { name: 'description', type: 'text', title: 'Description' },
            { name: 'image', type: 'image', title: 'Image', options: { hotspot: true } },
            { name: 'imageUrl', type: 'string', title: 'Image URL', description: 'Direct image URL path (e.g., /images/photo.jpg)' },
            { name: 'rating', type: 'number', title: 'Rating' },
            { name: 'category', type: 'string', title: 'Category' },
            { name: 'link', type: 'url', title: 'External Link' },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'Natural Wonders Djibouti',
    },
  },
})
