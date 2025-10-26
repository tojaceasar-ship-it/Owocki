import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';

// Import schemas (to be defined)
// import schemas from './schemas';

export default defineConfig({
  name: 'fruits-from-da-hood',
  title: 'Fruits From Da Hood Admin Panel',
  projectId: 'your-project-id', // Replace with actual project ID from .env
  dataset: 'production',
  plugins: [
    deskTool(),
    visionTool(),
  ],
  // schema: {
  //   types: schemas,
  // },
  // Additional configuration for authentication and roles can be added here
});
