# Fruits From Da Hood - Premium Streetwear Brand

Welcome to **Fruits From Da Hood**, a premium streetwear brand that embodies urban culture with unique fruit character designs. Our site, `fruitsfromdahood.pl`, offers exclusive drops, a custom e-commerce store, and a vibrant community experience.

## Overview

- **Brand DNA**: Urban + block nostalgia with a 90s vibe.
- **Characters**: ArbuZiom, Malina Queen, Cytrynson, Pomelo Pablo, Winogronix.
- **Visuals**: Dark mode with neon graffiti accents and minimalistic premium streetwear design.
- **Slogans**: *Zero GMO, 100% ulicy* ; *Born on the block, raised in style*.

This project is built with a modern tech stack to ensure performance, scalability, and ease of content management.

## Tech Stack

- **Frontend**: Vite (React) with TailwindCSS and Framer Motion for animations.
- **E-commerce**: Custom store integrated with Printful API for order fulfillment, Stripe/PayPal for payments.
- **CMS**: Sanity for managing content (characters, products, lookbook, etc.).
- **Hosting**: Vercel for deployment and hosting.
- **Analytics**: Configurable for GA4 or Plausible.

## Project Structure

- `src/pages/`: Contains all the main pages like Homepage, Shop, Character Universe, etc.
- `src/components/`: Reusable UI components with graffiti-inspired styling.
- `src/services/`: API integration for Printful, payment gateways, and state management.
- `src/lib/`: Configuration for Sanity CMS and other utilities.
- `sanity-studio/`: Sanity Studio setup for content management.

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- Vercel CLI (for deployment)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/tojaceasar-ship-it/Owocki.git
   cd Owocki
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables (see `.env.example` for required keys):
   ```bash
   cp .env.example .env
   ```
   Edit `.env` to add your API keys for Printful, Stripe, PayPal, and Sanity project details.

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Deployment Guide

### 1. Vercel Deployment (Hosting)

Vercel is used for hosting the frontend and ensuring optimal performance with automatic scaling and image optimization.

- **Steps to Deploy on Vercel**:
  1. Install Vercel CLI if not already installed:
     ```bash
     npm install -g vercel
     ```
  2. Login to Vercel:
     ```bash
     vercel login
     ```
  3. Deploy the project:
     ```bash
     vercel
     ```
     Follow the prompts to configure your project. Ensure the `distDir` in `vercel.json` is set to `dist` for Vite builds.
  4. Set environment variables in Vercel dashboard:
     - Go to your project on Vercel.
     - Navigate to `Settings` > `Environment Variables`.
     - Add the keys from your `.env` file (e.g., Printful API key, Stripe key, etc.).
  5. Vercel will automatically build and deploy. Your site will be live at `fruitsfromdahood.pl` if the domain is configured.

- **Domain Configuration**:
  - In Vercel dashboard, go to `Domains` and add `fruitsfromdahood.pl`.
  - Update DNS records with your domain provider to point to Vercel's nameservers as instructed.

- **Performance Optimization**:
  - `vercel.json` is configured with caching headers for assets (1-year cache) and image optimization settings for faster load times.

### 2. Printful API Integration (E-commerce)

Printful handles product fulfillment and shipping for our custom store.

- **Setup**:
  1. Sign up for a Printful account at [printful.com](https://www.printful.com).
  2. Obtain your Printful API key from the Printful dashboard under `Settings` > `API`.
  3. Add the API key to your `.env` file or Vercel environment variables as `PRINTFUL_API_KEY`.
  4. In Printful dashboard, set up your store products, pricing, and shipping rates.
  5. Configure webhook URL in Printful (`Settings` > `Webhooks`) to point to your site's endpoint (e.g., `https://fruitsfromdahood.pl/api/printful-webhook`) for order status updates.

- **Testing**:
  - Use Printful's sandbox mode for testing orders before going live.
  - Verify that products sync correctly to your shop page and orders are created in Printful after checkout.

### 3. Sanity CMS (Content Management)

Sanity CMS is used for managing all site content, including characters, products, and lookbook entries.

- **Setup**:
  1. Navigate to the `sanity-studio` folder:
     ```bash
     cd sanity-studio
     npm install
     ```
  2. Initialize Sanity Studio if not already set up:
     ```bash
     sanity init
     ```
     Follow prompts to create a new project or link to an existing one. Ensure schemas in `sanity-studio/schemas/` are used.
  3. Add your Sanity `projectId` and `dataset` to `.env` or Vercel environment variables.
  4. Deploy Sanity Studio to a hosting service like [sanity.io](https://www.sanity.io) or self-host:
     ```bash
     sanity deploy
     ```
     Choose a hostname (e.g., `fruitsfromdahood-studio.sanity.studio`).
  5. Access Sanity Studio to manage content at the deployed URL.

- **CORS Configuration**:
  - In Sanity dashboard (`manage.sanity.io`), go to your project settings and add `https://fruitsfromdahood.pl` to allowed CORS origins to enable frontend API access.

### 4. Payment Gateways (Stripe & PayPal)

Stripe and PayPal are integrated for secure payment processing.

- **Stripe Setup**:
  1. Sign up at [stripe.com](https://stripe.com) and get your API keys from the dashboard (`Developers` > `API keys`).
  2. Add `STRIPE_API_KEY` to your `.env` file or Vercel environment variables.
  3. Configure webhook in Stripe (`Developers` > `Webhooks`) to notify your site of payment events (e.g., `https://fruitsfromdahood.pl/api/stripe-webhook`).
  4. Test payments using Stripe's test mode with test card numbers (e.g., 4242 4242 4242 4242).

- **PayPal Setup**:
  1. Sign up at [developer.paypal.com](https://developer.paypal.com) and create a sandbox app to get `PAYPAL_CLIENT_ID` and `PAYPAL_SECRET`.
  2. Add these to your `.env` file or Vercel environment variables.
  3. Switch to live credentials when ready to accept real payments.
  4. Configure return and cancel URLs in PayPal app settings to match your site (e.g., `https://fruitsfromdahood.pl/payment-success` and `https://fruitsfromdahood.pl/payment-cancel`).

- **Testing**:
  - Use Stripe test cards and PayPal sandbox accounts to simulate transactions.
  - Verify that successful payments trigger order creation in Printful.

## Development

- **Running Tests**:
  ```bash
  npm run test
  # or
  yarn test
  ```
  Tests are set up with Jest for route validation and CMS content rendering.

- **Linting**:
  ```bash
  npm run lint
  # or
  yarn lint
  ```
  Ensure code quality with ESLint configurations.

## Contributing

We welcome contributions to enhance `fruitsfromdahood.pl`. Please follow these steps:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For inquiries, reach out to the Fruits From Da Hood team at contact@fruitsfromdahood.pl.
