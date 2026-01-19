import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'diplomaticExcellence',
  title: 'Diplomatic Excellence',
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
      name: 'competencies',
      title: 'Competencies',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Competency Name' },
            { name: 'value', type: 'number', title: 'Percentage Value' },
          ],
        },
      ],
    }),
    defineField({
      name: 'activities',
      title: 'Activities',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Activity Title' },
            { name: 'description', type: 'text', title: 'Activity Description' },
            { name: 'icon', type: 'string', title: 'Icon Name (Users, Globe, Award, Briefcase)' },
          ],
        },
      ],
    }),
    defineField({
      name: 'responsibilities',
      title: 'Responsibilities',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
