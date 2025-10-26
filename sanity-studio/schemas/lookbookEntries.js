import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'lookbookEntry',
  title: 'Lookbook Entry',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Title of the lookbook entry',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Description of the lookbook entry',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Images for the lookbook entry',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Category of the lookbook (e.g., Seasonal Collection, Behind the Scenes, Styling Guides)',
    }),
    defineField({
      name: 'relatedProducts',
      title: 'Related Products',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'shopProduct' }] }],
      description: 'Products related to this lookbook entry',
    }),
    defineField({
      name: 'socialFeed',
      title: 'Social Feed Integration',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', type: 'string', title: 'Platform (e.g., Instagram, TikTok)' },
            { name: 'postUrl', type: 'url', title: 'Post URL' },
            { name: 'embedCode', type: 'text', title: 'Embed Code (optional)', optional: true },
          ],
        },
      ],
      description: 'Social media posts to feature in the lookbook',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: ['active', 'inactive', 'draft'],
      },
      description: 'Current status of the lookbook entry',
    }),
    defineField({
      name: 'publishedDate',
      title: 'Published Date',
      type: 'date',
      description: 'Date when the lookbook entry was published',
      optional: true,
    }),
  ],
});
