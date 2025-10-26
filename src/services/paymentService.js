import axios from 'axios';

const STRIPE_SECRET_KEY = import.meta.env.VITE_STRIPE_SECRET_KEY || ''; // Ensure this is set in your .env file
const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID || ''; // Ensure this is set in your .env file
const PAYPAL_SECRET = import.meta.env.VITE_PAYPAL_SECRET || ''; // Ensure this is set in your .env file
const STRIPE_API_URL = 'https://api.stripe.com/v1';
const PAYPAL_API_URL = 'https://api.sandbox.paypal.com'; // Use sandbox for testing

export const paymentService = {
  async processStripePayment(paymentData) {
    try {
      const response = await axios.post(`${STRIPE_API_URL}/charges`, paymentData, {
        headers: {
          'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error processing payment with Stripe:', error);
      throw error;
    }
  },

  async processPayPalPayment(paymentData) {
    try {
      // PayPal requires a token for authentication
      const authResponse = await axios.post(`${PAYPAL_API_URL}/v1/oauth2/token`, 
        'grant_type=client_credentials', {
        headers: {
          'Authorization': `Basic ${btoa(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`)}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      const accessToken = authResponse.data.access_token;

      const response = await axios.post(`${PAYPAL_API_URL}/v2/checkout/orders`, paymentData, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error processing payment with PayPal:', error);
      throw error;
    }
  }
};
