import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'footerTexts',
  title: 'Footer Texts',
  type: 'document',
  fields: [
    defineField({
      name: 'copyright',
      title: 'Copyright Notice',
      type: 'string',
      description: 'Copyright text for the footer',
    }),
    defineField({
      name: 'links',
      title: 'Footer Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'url', type: 'string', title: 'URL' },
          ],
        },
      ],
      description: 'Links to include in the footer',
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'text',
      description: 'Contact details to display in the footer',
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', type: 'string', title: 'Platform' },
            { name: 'url', type: 'string', title: 'URL' },
            { name: 'icon', type: 'string', title: 'Icon (optional)', optional: true },
          ],
        },
      ],
      description: 'Social media links for the footer',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: ['active', 'inactive', 'draft'],
      },
      description: 'Current status of the footer content',
    }),
  ],
});
