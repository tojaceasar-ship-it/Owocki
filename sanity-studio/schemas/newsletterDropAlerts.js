import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'newsletterDropAlert',
  title: 'Newsletter/Drop Alert',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Title of the newsletter or drop alert',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Description or message for the newsletter or alert',
    }),
    defineField({
      name: 'signupFormText',
      title: 'Signup Form Text',
      type: 'string',
      description: 'Text for the signup form button or field',
    }),
    defineField({
      name: 'alertMessage',
      title: 'Alert Message',
      type: 'string',
      description: 'Specific alert message for drops or urgent updates',
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: false,
      description: 'Whether the newsletter or alert is currently active',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: ['active', 'inactive', 'scheduled'],
      },
      description: 'Current status of the newsletter or alert',
    }),
    defineField({
      name: 'scheduledDate',
      title: 'Scheduled Date',
      type: 'datetime',
      description: 'Date and time when the alert is scheduled to go live (if applicable)',
      optional: true,
    }),
  ],
});
