import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'characterProfile',
  title: 'Character Profile',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Name of the character',
    }),
    defineField({
      name: 'emoji',
      title: 'Emoji',
      type: 'string',
      description: 'Emoji representing the character',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Detailed description of the character',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Image of the character',
    }),
    defineField({
      name: 'slogan',
      title: 'Slogan',
      type: 'string',
      description: 'Character\'s slogan or catchphrase',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: ['active', 'inactive', 'in progress'],
      },
      description: 'Current status of the character profile',
    }),
    defineField({
      name: 'lastUpdate',
      title: 'Last Update',
      type: 'date',
      description: 'Date of the last update to this profile',
    }),
  ],
});
