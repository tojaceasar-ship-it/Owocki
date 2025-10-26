import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'knowledgeHubContent',
  title: 'Knowledge Hub Content',
  type: 'document',
  fields: [
    defineField({
      name: 'tutorials',
      title: 'Tutorials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'id', type: 'number', title: 'ID' },
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'description', type: 'text', title: 'Description' },
            { name: 'videoUrl', type: 'url', title: 'Video URL' },
            { name: 'duration', type: 'string', title: 'Duration' },
            { name: 'level', type: 'string', title: 'Level' },
          ],
        },
      ],
      description: 'Tutorial content for the Knowledge Hub',
    }),
    defineField({
      name: 'materialGuides',
      title: 'Material Guides',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'id', type: 'number', title: 'ID' },
            { name: 'material', type: 'string', title: 'Material' },
            { name: 'description', type: 'text', title: 'Description' },
            { name: 'bestFor', type: 'string', title: 'Best For' },
            { name: 'sustainability', type: 'string', title: 'Sustainability Rating' },
            { name: 'imageUrl', type: 'url', title: 'Image URL' },
          ],
        },
      ],
      description: 'Guides on materials used in products',
    }),
    defineField({
      name: 'careInstructions',
      title: 'Care Instructions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'id', type: 'number', title: 'ID' },
            { name: 'itemType', type: 'string', title: 'Item Type' },
            { name: 'instructions', type: 'array', of: [{ type: 'string' }], title: 'Instructions' },
            { name: 'icon', type: 'string', title: 'Icon' },
          ],
        },
      ],
      description: 'Care instructions for different product types',
    }),
    defineField({
      name: 'culturalTimeline',
      title: 'Cultural Timeline',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'id', type: 'number', title: 'ID' },
            { name: 'year', type: 'number', title: 'Year' },
            { name: 'event', type: 'string', title: 'Event' },
            { name: 'description', type: 'text', title: 'Description' },
            { name: 'imageUrl', type: 'url', title: 'Image URL' },
          ],
        },
      ],
      description: 'Timeline of cultural events related to streetwear',
    }),
    defineField({
      name: 'communityTips',
      title: 'Community Tips',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'id', type: 'number', title: 'ID' },
            { name: 'tip', type: 'string', title: 'Tip' },
            { name: 'author', type: 'string', title: 'Author' },
            { name: 'category', type: 'string', title: 'Category' },
            { name: 'likes', type: 'number', title: 'Likes', initialValue: 0 },
          ],
        },
      ],
      description: 'Tips and advice from the community',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: ['active', 'inactive', 'draft'],
      },
      description: 'Current status of the Knowledge Hub content',
    }),
  ],
});
