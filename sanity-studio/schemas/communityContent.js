import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'communityContent',
  title: 'Community Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Title of the community post or content',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Rich text content of the community post',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'userData' }],
      description: 'Author of the community content',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Images associated with the community content',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Category of the content (e.g., Gallery, Challenge, Showcase)',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Tags for categorizing the content',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: ['active', 'inactive', 'pending review', 'flagged'],
      },
      description: 'Current status of the community content',
    }),
    defineField({
      name: 'publishedDate',
      title: 'Published Date',
      type: 'datetime',
      description: 'Date and time when the content was published',
    }),
    defineField({
      name: 'likes',
      title: 'Likes',
      type: 'number',
      initialValue: 0,
      description: 'Number of likes on the content',
    }),
    defineField({
      name: 'comments',
      title: 'Comments',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'author', type: 'reference', to: [{ type: 'userData' }], title: 'Author' },
            { name: 'content', type: 'text', title: 'Content' },
            { name: 'timestamp', type: 'datetime', title: 'Timestamp' },
          ],
        },
      ],
      description: 'Comments on the community content',
    }),
  ],
});
