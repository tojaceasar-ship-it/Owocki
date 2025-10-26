import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'systemSettings',
  title: 'System Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      description: 'Title of the website',
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description',
      type: 'text',
      description: 'Short description of the website for SEO and metadata',
    }),
    defineField({
      name: 'primaryColor',
      title: 'Primary Color',
      type: 'color',
      description: 'Primary color for the website theme',
    }),
    defineField({
      name: 'secondaryColor',
      title: 'Secondary Color',
      type: 'color',
      description: 'Secondary color for the website theme',
    }),
    defineField({
      name: 'accentColor',
      title: 'Accent Color',
      type: 'color',
      description: 'Accent color for CTAs and highlights',
    }),
    defineField({
      name: 'maintenanceMode',
      title: 'Maintenance Mode',
      type: 'boolean',
      initialValue: false,
      description: 'Enable or disable maintenance mode for the website',
    }),
    defineField({
      name: 'maintenanceMessage',
      title: 'Maintenance Message',
      type: 'text',
      description: 'Message to display when maintenance mode is active',
      hidden: ({ parent }) => !parent?.maintenanceMode,
    }),
    defineField({
      name: 'analyticsEnabled',
      title: 'Analytics Enabled',
      type: 'boolean',
      initialValue: false,
      description: 'Enable or disable website analytics',
    }),
    defineField({
      name: 'cookieConsent',
      title: 'Cookie Consent Settings',
      type: 'object',
      fields: [
        { name: 'enabled', type: 'boolean', title: 'Enabled', initialValue: false },
        { name: 'message', type: 'text', title: 'Message', description: 'Message to display in the cookie consent banner' },
        { name: 'acceptButtonText', type: 'string', title: 'Accept Button Text' },
        { name: 'rejectButtonText', type: 'string', title: 'Reject Button Text' },
      ],
      description: 'Settings for GDPR cookie consent banner',
    }),
    defineField({
      name: 'apiKeys',
      title: 'API Keys',
      type: 'object',
      fields: [
        { name: 'printful', type: 'string', title: 'Printful API Key', description: 'API key for Printful integration (placeholder, to be filled in .env)' },
        { name: 'stripe', type: 'string', title: 'Stripe API Key', description: 'API key for Stripe integration (placeholder, to be filled in .env)' },
        { name: 'paypal', type: 'string', title: 'PayPal API Key', description: 'API key for PayPal integration (placeholder, to be filled in .env)' },
      ],
      description: 'Placeholder for API keys (actual keys should be set in .env file)',
    }),
  ],
});
