import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Main hero title',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Hero subtitle or tagline',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Hero section description',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Main hero image (Hassan Adan Hassan photo)',
    }),
    defineField({
      name: 'officialTitle',
      title: 'Official Title',
      type: 'string',
      description: 'Official diplomatic title',
    }),
    defineField({
      name: 'year',
      title: 'Year Appointed',
      type: 'string',
      description: 'Year of appointment',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Consulate location (e.g., Kigali)',
    }),
    defineField({
      name: 'consulName',
      title: 'Consul Name',
      type: 'string',
      description: 'Full name of the consul',
    }),
    defineField({
      name: 'consulTitle',
      title: 'Consul Title',
      type: 'string',
      description: 'Title of the consul (e.g., Honorary Consul)',
    }),
    defineField({
      name: 'consulateFull',
      title: 'Full Consulate Name',
      type: 'string',
      description: 'Full consulate name',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'heroImage',
    },
  },
})


