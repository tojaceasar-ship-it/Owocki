import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../services/cartSlice';
import { paymentService } from '../../services/paymentService';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty. Add items before checking out.');
      return;
    }

    try {
      // Prepare order data for Printful and payment processing
      const orderData = {
        recipient: {
          name: 'Customer Name', // This should be collected from a form in a real implementation
          address1: 'Customer Address', // This should be collected from a form
          city: 'Customer City',
          state_code: 'CA',
          country_code: 'US',
          zip: '90210',
        },
        items: cartItems.map(item => ({
          external_id: item.id.toString(),
          name: item.name,
          retail_price: item.price,
          quantity: item.quantity,
          // Additional Printful-specific fields would be added here
        })),
      };

      // Initiate payment process (Stripe/PayPal integration)
      const paymentResult = await paymentService.initiatePayment({
        amount: calculateTotal(),
        currency: 'USD',
        description: 'Order from Fruits From Da Hood',
        // In a real implementation, collect customer payment details here
      });

      if (paymentResult.success) {
        // If payment is successful, create order in Printful
        const orderResult = await paymentService.createPrintfulOrder(orderData);
        if (orderResult.success) {
          alert('Order placed successfully! Thank you for your purchase.');
          // Clear cart after successful order
          cartItems.forEach(item => dispatch(removeFromCart(item.id)));
        } else {
          alert('Payment successful, but order creation failed. We will contact you shortly.');
          console.error('Order creation failed:', orderResult.error);
        }
      } else {
        alert('Payment failed. Please try again.');
        console.error('Payment failed:', paymentResult.error);
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('An error occurred during checkout. Please try again.');
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-6">Your Cart is Empty</h1>
        <p className="text-gray-600">Add some fresh streetwear to your cart!</p>
        <a href="/shop" className="inline-block bg-neon-pink text-white py-2 px-4 rounded-md mt-4 hover:bg-neon-pink-dark transition-colors duration-200">Shop Now</a>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Product</th>
              <th className="text-left">Price</th>
              <th className="text-left">Quantity</th>
              <th className="text-left">Total</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="py-2">{item.name}</td>
                <td className="py-2">${item.price.toFixed(2)}</td>
                <td className="py-2">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                    className="w-16 border rounded-md p-1"
                  />
                </td>
                <td className="py-2">${(item.price * item.quantity).toFixed(2)}</td>
                <td className="py-2">
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Total: ${calculateTotal()}</h2>
        <button
          onClick={handleCheckout}
          className="bg-neon-pink text-white py-2 px-6 rounded-md hover:bg-neon-pink-dark transition-colors duration-200"
        >
          Checkout
        </button>
      </div>
      <a href="/shop" className="inline-block text-neon-pink hover:underline">Continue Shopping</a>
    </div>
  );
};

export default Cart;

