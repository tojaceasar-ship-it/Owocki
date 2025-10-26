import sanityClient from '@sanity/client';

// Sanity client configuration
export const client = sanityClient({
  projectId: 'your-project-id', // Replace with actual project ID in .env file
  dataset: 'production',
  apiVersion: '2023-10-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.VITE_SANITY_TOKEN // Ensure this is set in your .env file
});

// Note: Schemas for all content types are defined in a separate Sanity Studio setup.
// This includes schemas for navigation, homepage content, characters, shop products,
// lookbook entries, manifest, newsletter alerts, footer texts, user data, system settings,
// and all other editable content to ensure full editability via the admin panel.
