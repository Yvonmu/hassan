import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'stayConnected',
  title: 'Stay Connected',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Section Description',
      type: 'text',
    }),
    defineField({
      name: 'content',
      title: 'Content Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Item Title' },
            { name: 'description', type: 'text', title: 'Description' },
            { name: 'image', type: 'image', title: 'Image', options: { hotspot: true } },
            { name: 'imageUrl', type: 'string', title: 'Image URL', description: 'Direct image URL path (e.g., /images/photo.jpg)' },
            { name: 'type', type: 'string', title: 'Type' },
            { name: 'date', type: 'string', title: 'Date' },
            { name: 'location', type: 'string', title: 'Location' },
            { name: 'buttonLink', type: 'string', title: 'Button Link Text' },
            { name: 'link', type: 'url', title: 'External Link' },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
