import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'homepageContent',
  title: 'Homepage Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Main title for the homepage',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Main description for the homepage',
    }),
    defineField({
      name: 'heroSlides',
      title: 'Hero Slides',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'id', type: 'number', title: 'ID' },
            { name: 'character', type: 'string', title: 'Character' },
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'subtitle', type: 'string', title: 'Subtitle' },
            { name: 'description', type: 'text', title: 'Description' },
            { name: 'imageUrl', type: 'url', title: 'Image URL' },
            { name: 'cta', type: 'string', title: 'Call to Action' },
            { name: 'ctaLink', type: 'string', title: 'CTA Link' },
            { name: 'bgGradient', type: 'string', title: 'Background Gradient' },
          ],
        },
      ],
      description: 'Slides for the hero section on the homepage',
    }),
  ],
});
