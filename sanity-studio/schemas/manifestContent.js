import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'manifestContent',
  title: 'Manifest Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Title of the manifesto',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Rich text content for the manifesto',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Images associated with the manifesto',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: ['active', 'inactive', 'draft'],
      },
      description: 'Current status of the manifesto content',
    }),
    defineField({
      name: 'lastUpdate',
      title: 'Last Update',
      type: 'date',
      description: 'Date of the last update to this content',
    }),
  ],
});
