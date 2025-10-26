# Fruits From Da Hood

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Vercel](https://img.shields.io/badge/hosted_by-Vercel-black.svg)](https://vercel.com)

Premium streetwear brand with authentic urban culture roots. This project delivers a complete, production-ready e-commerce website for **Fruits From Da Hood**, featuring a custom store integrated with Printful API for order fulfillment, Sanity CMS for content management, and Stripe/PayPal for payments.

## Brand DNA
- **Urban + Block Nostalgia**: 90s vibe with a modern twist.
- **Characters**: ArbuZiom, Malina Queen, Cytrynson, Pomelo Pablo, Winogronix.
- **Visuals**: Dark mode with neon graffiti accents and premium streetwear minimalism.
- **Slogans**: *Zero GMO, 100% ulicy*; *Born on the block, raised in style*.

## Features
- **Landing Page**: Animated graffiti hero with fruit character illustrations.
- **Shop**: Custom Next.js store with Printful API integration for products and order fulfillment.
- **Characters Section**: CMS-driven profiles for each fruit character.
- **Manifest**: Brand story page.
- **Lookbook**: Lifestyle gallery and social feed.
- **Newsletter/Drop Alerts**: Graffiti-style signup form.
- **SEO & Performance**: Optimized meta tags, OG images, and Lighthouse score 95+.
- **CMS**: Sanity for managing all content.

## Tech Stack
- **Frontend**: Vite with React, TailwindCSS, Framer Motion.
- **E-commerce**: Custom store with Printful API, Stripe, and PayPal.
- **CMS**: Sanity.
- **Hosting**: Vercel.

## Setup Instructions

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- Vercel account for deployment
- Sanity account for CMS
- Printful account for e-commerce
- Stripe and PayPal accounts for payment processing

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/fruits-from-da-hood.git
   cd fruits-from-da-hood
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Set up environment variables (see `.env.example` for required variables):
   ```bash
   cp .env.example .env
   # Edit .env to add your Sanity project ID, token, Printful API key, Stripe and PayPal credentials
   ```

### Local Development
1. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
2. Open your browser and navigate to `http://localhost:5173` to see the site.

### Deployment Instructions

#### Deploying to Vercel
1. **Create a Vercel Project**:
   - Log in to your Vercel account.
   - Click on 'New Project' and import your repository from GitHub/GitLab/Bitbucket.
2. **Configure Environment Variables**:
   - In the Vercel dashboard, go to your project settings.
   - Under 'Environment Variables', add the following keys from your `.env` file:
     - `VITE_SANITY_PROJECT_ID`: Your Sanity project ID.
     - `VITE_SANITY_TOKEN`: Your Sanity API token.
     - `PRINTFUL_API_KEY`: Your Printful API key.
     - `STRIPE_PUBLIC_KEY`: Your Stripe public key.
     - `PAYPAL_CLIENT_ID`: Your PayPal client ID.
3. **Deploy**:
   - Vercel will automatically build and deploy your project on every push to the main branch.
   - Once deployed, you'll get a URL like `https://fruits-from-da-hood.vercel.app`.

#### Setting Up Sanity CMS
1. **Create a Sanity Project**:
   - Log in to [Sanity.io](https://www.sanity.io) and create a new project.
   - Note down the Project ID and create an API token with 'Editor' permissions.
2. **Update Environment Variables**:
   - Add the Sanity Project ID and Token to your `.env` file or Vercel environment variables.
3. **Define Schemas**:
   - Use the Sanity Studio to define schemas for homepage content, navigation, characters, manifest, lookbook, and other CMS-driven content.
   - Ensure schemas match the queries in the codebase (e.g., `*[_type == "homepage"]`).

#### Integrating Printful API for E-commerce
1. **Create a Printful Account**:
   - Sign up at [Printful](https://www.printful.com) and create a store.
   - Obtain your API key from the Printful dashboard under 'Settings' > 'API'.
2. **Update Environment Variables**:
   - Add the Printful API key to your `.env` file or Vercel environment variables as `PRINTFUL_API_KEY`.
3. **Sync Products**:
   - Products will be fetched dynamically from Printful API as implemented in the shop page.
   - Orders created through the site will be sent to Printful for fulfillment.

#### Setting Up Payment Gateways (Stripe/PayPal)
1. **Stripe Setup**:
   - Sign up at [Stripe](https://stripe.com) and create an account.
   - Obtain your public and secret keys from the Stripe dashboard.
   - Add these keys to your `.env` file or Vercel environment variables as `STRIPE_PUBLIC_KEY` and `STRIPE_SECRET_KEY`.
2. **PayPal Setup**:
   - Sign up at [PayPal Developer](https://developer.paypal.com) and create a sandbox account for testing.
   - Obtain your client ID and secret from the PayPal dashboard.
   - Add these to your `.env` file or Vercel environment variables as `PAYPAL_CLIENT_ID` and `PAYPAL_SECRET`.
3. **Integration**:
   - Payment processing logic is implemented in `src/services/paymentService.js`. Ensure the correct keys are used for transactions.

## Running Tests
To ensure everything works correctly before deployment:
```bash
npm run test
# or
yarn test
```

## Contributing
Contributions are welcome! Please fork the repository, make your changes, and submit a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
