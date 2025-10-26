import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: 'your-project-id', // Replace with actual project ID in .env file
  dataset: 'production',
  apiVersion: '2023-10-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.VITE_SANITY_TOKEN // Ensure this is set in your .env file
});
