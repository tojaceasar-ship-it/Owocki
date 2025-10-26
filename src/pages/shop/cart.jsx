import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { paymentService } from '../../services/paymentService';
import { printfulService } from '../../services/printfulService';

const Cart = ({ cartItems, setCartItems }) => {
  const [checkoutStatus, setCheckoutStatus] = useState('idle');

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    ));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = async () => {
    setCheckoutStatus('processing');
    try {
      // Przygotowanie danych zamówienia dla Printful
      const orderData = {
        recipient: {
          name: 'Test User',
          address1: 'Test Address',
          city: 'Test City',
          state_code: 'CA',
          country_code: 'US',
          zip: '90210'
        },
        items: cartItems.map(item => ({
          id: item.id,
          quantity: item.quantity
        }))
      };

      // Utworzenie zamówienia w Printful
      const printfulOrder = await printfulService.createOrder(orderData);

      // Przygotowanie danych płatności (przykład dla Stripe)
      const paymentData = {
        amount: parseInt(calculateTotal() * 100), // w centach
        currency: 'usd',
        source: 'tok_visa' // Token testowy dla Stripe, w produkcji należy użyć prawdziwego tokena
      };

      // Przetwarzanie płatności przez Stripe
      const paymentResult = await paymentService.processStripePayment(paymentData);

      if (paymentResult.status === 'succeeded') {
        setCheckoutStatus('success');
        setCartItems([]); // Wyczyść koszyk po udanej płatności
      } else {
        setCheckoutStatus('error');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      setCheckoutStatus('error');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-black text-white min-h-screen p-5 flex items-center justify-center">
        <div className="text-center">
          <Icon name="ShoppingCart" size={48} className="mx-auto text-gray-500" />
          <p className="mt-2 text-xl">Twój koszyk jest pusty.</p>
          <Button href="/shop" className="mt-4">Wróć do sklepu</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen p-5 md:p-10">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-6xl font-bold text-center mb-10 neon-glow-primary"
      >
        Twój Koszyk
      </motion.h1>
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 gap-4">
          {cartItems.map(item => (
            <div key={item.id} className="bg-gray-900 border border-gray-700 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src={item.thumbnail} alt={item.name} className="w-20 h-20 object-cover rounded" />
                <div>
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-lg">Cena: ${item.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                  className="w-16 p-2 bg-gray-800 rounded text-center"
                  min="1"
                />
                <Button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Usuń
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 bg-gray-900 border border-gray-700 rounded-lg">
          <h3 className="text-2xl font-bold">Razem: ${calculateTotal()}</h3>
          {checkoutStatus === 'processing' && (
            <p className="text-yellow-400">Przetwarzanie płatności...</p>
          )}
          {checkoutStatus === 'success' && (
            <p className="text-green-400">Płatność zakończona sukcesem! Zamówienie zostało złożone.</p>
          )}
          {checkoutStatus === 'error' && (
            <p className="text-red-400">Błąd podczas przetwarzania płatności. Spróbuj ponownie.</p>
          )}
          <Button
            onClick={handleCheckout}
            disabled={checkoutStatus === 'processing'}
            className="w-full mt-4 bg-primary text-black font-bold py-3 rounded-lg hover:bg-primary/90"
          >
            Złóż Zamówienie
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
