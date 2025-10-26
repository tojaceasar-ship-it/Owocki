import axios from 'axios';

const PRINTFUL_API_KEY = import.meta.env.PRINTFUL_API_KEY || ''; // Ensure this is set in your .env file
const PRINTFUL_API_URL = 'https://api.printful.com';

export const printfulService = {
  async getProducts() {
    try {
      const response = await axios.get(`${PRINTFUL_API_URL}/products`, {
        headers: {
          'Authorization': `Bearer ${PRINTFUL_API_KEY}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching products from Printful:', error);
      throw error;
    }
  },

  async createOrder(orderData) {
    try {
      const response = await axios.post(`${PRINTFUL_API_URL}/orders`, orderData, {
        headers: {
          'Authorization': `Bearer ${PRINTFUL_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating order with Printful:', error);
      throw error;
    }
  },

  async getOrderStatus(orderId) {
    try {
      const response = await axios.get(`${PRINTFUL_API_URL}/orders/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${PRINTFUL_API_KEY}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching order status from Printful:', error);
      throw error;
    }
  }
};
