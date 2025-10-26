import axios from 'axios';
import { printfulService } from './printfulService';

// Placeholder API keys - these should be set in .env and not hard-coded
const STRIPE_API_KEY = process.env.STRIPE_API_KEY || 'placeholder-stripe-key';
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID || 'placeholder-paypal-client-id';
const PAYPAL_SECRET = process.env.PAYPAL_SECRET || 'placeholder-paypal-secret';

// Stripe API configuration
const stripeClient = axios.create({
  baseURL: 'https://api.stripe.com/v1',
  headers: {
    'Authorization': `Bearer ${STRIPE_API_KEY}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

// PayPal API configuration
const paypalClient = axios.create({
  baseURL: 'https://api-m.sandbox.paypal.com', // Use sandbox for testing, switch to live for production
  headers: {
    'Content-Type': 'application/json',
  },
  auth: {
    username: PAYPAL_CLIENT_ID,
    password: PAYPAL_SECRET,
  },
});

// Payment service object
export const paymentService = {
  // Initiate payment with Stripe
  async initiateStripePayment(paymentData) {
    try {
      const params = new URLSearchParams();
      params.append('amount', Math.round(paymentData.amount * 100)); // Convert to cents
      params.append('currency', paymentData.currency || 'usd');
      params.append('description', paymentData.description || 'Payment for order');
      params.append('source', 'tok_visa'); // Test token, replace with actual token from frontend in production

      const response = await stripeClient.post('/charges', params.toString());
      return {
        success: response.data.status === 'succeeded',
        data: response.data,
      };
    } catch (error) {
      console.error('Error processing Stripe payment:', error);
      return {
        success: false,
        error: error.message || 'Failed to process Stripe payment',
      };
    }
  },

  // Initiate payment with PayPal
  async initiatePayPalPayment(paymentData) {
    try {
      const response = await paypalClient.post('/v2/checkout/orders', {
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: paymentData.currency || 'USD',
            value: paymentData.amount.toFixed(2),
          },
          description: paymentData.description || 'Payment for order',
        }],
        application_context: {
          return_url: 'http://localhost:5173/payment-success', // Replace with actual return URL
          cancel_url: 'http://localhost:5173/payment-cancel', // Replace with actual cancel URL
        },
      });

      return {
        success: response.data.status === 'CREATED',
        data: response.data,
        approvalUrl: response.data.links.find(link => link.rel === 'approve').href,
      };
    } catch (error) {
      console.error('Error processing PayPal payment:', error);
      return {
        success: false,
        error: error.message || 'Failed to process PayPal payment',
      };
    }
  },

  // Generic payment initiation method to choose provider
  async initiatePayment(paymentData, provider = 'stripe') {
    if (provider === 'stripe') {
      return await this.initiateStripePayment(paymentData);
    } else if (provider === 'paypal') {
      return await this.initiatePayPalPayment(paymentData);
    } else {
      return {
        success: false,
        error: 'Unsupported payment provider',
      };
    }
  },

  // Create order in Printful after successful payment
  async createPrintfulOrder(orderData) {
    try {
      const response = await printfulService.createOrder(orderData);
      return {
        success: true,
        data: response,
      };
    } catch (error) {
      console.error('Error creating Printful order:', error);
      return {
        success: false,
        error: error.message || 'Failed to create Printful order',
      };
    }
  },

  // Check order status in Printful
  async checkOrderStatus(orderId) {
    try {
      const response = await printfulService.getOrderStatus(orderId);
      return {
        success: true,
        data: response,
      };
    } catch (error) {
      console.error('Error checking Printful order status:', error);
      return {
        success: false,
        error: error.message || 'Failed to check Printful order status',
      };
    }
  },
};

export default paymentService;
