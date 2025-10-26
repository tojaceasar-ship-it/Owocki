import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { printfulService } from '../../services/printfulService';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Cart from './cart';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [view, setView] = useState('shop'); // 'shop' lub 'cart'

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await printfulService.getProducts();
        setProducts(data.result || []);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { 
          id: product.id, 
          name: product.name, 
          price: product.retail_price, 
          thumbnail: product.thumbnail_url, 
          quantity: 1 
        }];
      }
    });
    alert(`${product.name} dodany do koszyka!`);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen p-5 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="text-center"
        >
          <Icon name="Loader2" size={48} />
          <p>Loading products...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black text-white min-h-screen p-5 flex items-center justify-center">
        <div className="text-center">
          <Icon name="AlertCircle" size={48} className="text-red-500 mx-auto" />
          <p className="mt-2 text-xl">{error}</p>
        </div>
      </div>
    );
  }

  if (view === 'cart') {
    return <Cart cartItems={cartItems} setCartItems={setCartItems} />;
  }

  return (
    <div className="bg-black text-white min-h-screen p-5 md:p-10">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-6xl font-bold text-center mb-10 neon-glow-primary"
      >
        Shop Fruits From Da Hood
      </motion.h1>
      <div className="flex justify-end mb-6 max-w-7xl mx-auto">
        <Button
          onClick={() => setView('cart')}
          className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2"
        >
          <Icon name="ShoppingCart" size={20} />
          Koszyk ({getCartItemCount()})
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {products.length > 0 ? (
          products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img 
                src={product.thumbnail_url} 
                alt={product.name} 
                className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105" 
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-lg mb-4">Price: ${product.retail_price}</p>
                <Button 
                  onClick={() => addToCart(product)}
                  className="w-full bg-primary text-black font-bold py-2 rounded-lg hover:bg-primary/90 transition-colors duration-200"
                >
                  Dodaj do Koszyka
                </Button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <Icon name="ShoppingBag" size={48} className="mx-auto text-gray-500" />
            <p className="mt-2 text-xl">No products available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
