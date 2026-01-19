import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'consularExcellence',
  title: 'Consular Excellence',
  type: 'document',
  fields: [
    defineField({
      name: 'actionCards',
      title: 'Action Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'subtitle', type: 'string', title: 'Subtitle' },
            { name: 'buttonText', type: 'string', title: 'Button Text' },
            { name: 'type', type: 'string', title: 'Type', options: {
              list: [
                { title: 'Emergency', value: 'emergency' },
                { title: 'Schedule', value: 'schedule' },
                { title: 'Visa Portal', value: 'visa' },
              ],
            }},
            { name: 'visaPortalUrl', type: 'url', title: 'Visa Portal URL (if type is visa)' },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'Consular Excellence',
    },
  },
})
