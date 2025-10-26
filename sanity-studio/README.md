# Sanity Studio Setup for Fruits From Da Hood

This directory contains the setup for Sanity Studio, the admin panel for managing all content and settings for the `fruitsfromdahood.pl` streetwear brand website. The goal is to provide full editability of every aspect of the site as per the project requirements.

## Overview

Sanity Studio is a customizable content management system (CMS) that allows administrators to create, edit, and manage content for the website. This setup will include schemas for all content types, configurations for user roles, and integration with the frontend application.

## Installation

1. **Initialize Sanity Studio**:
   - Run `npx sanity init` in this directory to initialize a new Sanity Studio project.
   - Follow the prompts to configure the project with your Sanity account credentials.
   - Ensure the `projectId` and `dataset` match those in `src/lib/sanity.js` of the frontend application.

2. **Install Dependencies**:
   - After initialization, run `npm install` to install the necessary dependencies for Sanity Studio.

## Schema Definitions

Schemas for all content types are defined in the `schemas` directory. These schemas cover:

- **Navigation Menu**: Manage site navigation structure.
- **Homepage Content**: Manage hero slides and other homepage content.
- **Character Profiles**: Manage character data for the 'Characters Section'.
- **Shop Products**: Manage product listings integrated with Printful API.
- **Lookbook Entries**: Manage lifestyle gallery and social media feed content.
- **Manifest Content**: Manage content for the brand manifesto page.
- **Newsletter/Drop Alerts**: Manage signup forms and alert content.
- **Footer Texts**: Manage editable footer content.
- **User Data**: Manage user profiles and dashboard data.
- **System Settings**: Manage platform-wide settings and configurations.
- **Community Content**: Manage community posts and tips.
- **Knowledge Hub Content**: Manage educational content for tutorials, guides, and timelines.

Detailed field definitions for each schema are outlined in `src/lib/sanity-schemas.md` of the frontend project.

## Configuration

1. **Sanity Configuration**:
   - Edit `sanity.config.js` to set up the project ID, dataset, and plugins.
   - Configure authentication and roles to control access levels for different admin users.

2. **Plugins**:
   - Install and configure plugins like `@sanity/vision` for GROQ query testing and other useful extensions to enhance the Studio experience.

## Integration with Frontend

- Ensure the frontend queries in components match the schema names and field structures defined in Sanity Studio.
- Update environment variables in `.env` files with the correct Sanity project ID and token for authenticated API access.

## Deployment

- Deploy Sanity Studio to a hosting service like Vercel or Netlify, or host it alongside the main application on Vercel.
- Use `sanity deploy` to deploy the Studio to Sanity's hosted service if preferred.
- Provide access to admin users with appropriate permissions set in the Sanity dashboard.

## Testing and Validation

- Test each content type by creating, editing, and deleting entries in Sanity Studio to ensure they reflect correctly on the frontend.
- Validate that all content areas (navigation, homepage, characters, etc.) are editable and that changes propagate to the live site.

## Next Steps

- Define all schemas as outlined in `src/lib/sanity-schemas.md`.
- Set up user roles and permissions.
- Test integration with the frontend to ensure all content is CMS-driven.
- Document usage instructions for content editors.

For any issues or further customization, refer to the Sanity documentation at [https://www.sanity.io/docs](https://www.sanity.io/docs) or contact the development team.
