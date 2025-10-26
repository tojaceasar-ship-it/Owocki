import axios from 'axios';

// Printful API base URL
const PRINTFUL_API_URL = 'https://api.printful.com';

// Placeholder for API key - this should be set in .env and not hard-coded
const PRINTFUL_API_KEY = process.env.PRINTFUL_API_KEY || 'placeholder-api-key';

// Axios instance with Printful API configuration
const printfulClient = axios.create({
  baseURL: PRINTFUL_API_URL,
  headers: {
    'Authorization': `Bearer ${PRINTFUL_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

// Service object for Printful API interactions
export const printfulService = {
  // Fetch all products from Printful
  async getProducts() {
    try {
      const response = await printfulClient.get('/store/products');
      return response.data;
    } catch (error) {
      console.error('Error fetching products from Printful:', error);
      throw new Error('Failed to fetch products from Printful');
    }
  },

  // Fetch a single product by ID
  async getProductById(id) {
    try {
      const response = await printfulClient.get(`/store/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product ${id} from Printful:`, error);
      throw new Error(`Failed to fetch product ${id} from Printful`);
    }
  },

  // Create an order in Printful
  async createOrder(orderData) {
    try {
      const response = await printfulClient.post('/orders', orderData);
      return response.data;
    } catch (error) {
      console.error('Error creating order in Printful:', error);
      throw new Error('Failed to create order in Printful');
    }
  },

  // Get order status by ID
  async getOrderStatus(orderId) {
    try {
      const response = await printfulClient.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching order status for ${orderId} from Printful:`, error);
      throw new Error(`Failed to fetch order status for ${orderId} from Printful`);
    }
  },

  // Webhook handler for Printful updates (to be called by API route)
  handleWebhook(webhookData) {
    // Process webhook data (e.g., update order status in local database)
    console.log('Received Printful webhook:', webhookData);
    // Implementation depends on how order status updates are managed in the app
    return { status: 'Webhook received' };
  },
};

export default printfulService;
