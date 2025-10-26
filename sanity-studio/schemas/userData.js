import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'userData',
  title: 'User Data',
  type: 'document',
  fields: [
    defineField({
      name: 'username',
      title: 'Username',
      type: 'string',
      description: 'Unique username for the user',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      description: 'User\'s email address',
    }),
    defineField({
      name: 'profilePicture',
      title: 'Profile Picture',
      type: 'image',
      options: { hotspot: true },
      description: 'User\'s profile picture',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      description: 'Short biography or description of the user',
    }),
    defineField({
      name: 'personalityProfile',
      title: 'Personality Profile',
      type: 'object',
      fields: [
        { name: 'type', type: 'string', title: 'Personality Type' },
        { name: 'description', type: 'text', title: 'Description' },
        { name: 'matchedCharacter', type: 'string', title: 'Matched Character' },
      ],
      description: 'User\'s personality profile data',
    }),
    defineField({
      name: 'wishlist',
      title: 'Wishlist',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'shopProduct' }] }],
      description: 'Products in the user\'s wishlist',
    }),
    defineField({
      name: 'achievements',
      title: 'Achievements',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'description', type: 'string', title: 'Description' },
            { name: 'dateEarned', type: 'date', title: 'Date Earned' },
            { name: 'icon', type: 'string', title: 'Icon' },
          ],
        },
      ],
      description: 'Achievements earned by the user',
    }),
    defineField({
      name: 'activityFeed',
      title: 'Activity Feed',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'action', type: 'string', title: 'Action' },
            { name: 'target', type: 'string', title: 'Target' },
            { name: 'timestamp', type: 'datetime', title: 'Timestamp' },
          ],
        },
      ],
      description: 'Recent activities of the user',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: ['active', 'inactive', 'suspended'],
      },
      description: 'Current status of the user account',
    }),
  ],
});
