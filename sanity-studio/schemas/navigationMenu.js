import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'navigationMenu',
  title: 'Navigation Menu',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Category of navigation items (e.g., Discover, Experience)',
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'url', type: 'string', title: 'URL' },
            { name: 'icon', type: 'string', title: 'Icon' },
            { name: 'description', type: 'string', title: 'Description' },
            { name: 'status', type: 'string', title: 'Status', options: { list: ['active', 'inactive'] } },
          ],
        },
      ],
    }),
  ],
});
