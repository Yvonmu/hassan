import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'jurisdictionSection',
  title: 'Jurisdiction Section',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Section Label',
      type: 'string',
    }),
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
      name: 'infoText',
      title: 'Information Text',
      type: 'text',
      description: 'The yellow info box text',
    }),
    defineField({
      name: 'visaPassportInfo',
      title: 'Visa/Passport Information',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
