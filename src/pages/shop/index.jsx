import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../services/cartSlice';
import { printfulService } from '../../services/printfulService';
import { client } from '../../lib/sanity';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Fetch products from Printful API
        const printfulData = await printfulService.getProducts();
        // Optionally, fetch additional product metadata from Sanity CMS if needed
        const sanityData = await client.fetch('*[_type == "shopProduct" && status == "active"]');
        
        // Combine Printful data with Sanity metadata if necessary
        const combinedProducts = printfulData.result.map(printfulProduct => {
          const sanityProduct = sanityData.find(sp => sp.printfulId === printfulProduct.id.toString());
          return {
            ...printfulProduct,
            metadata: sanityProduct || {},
          };
        });

        setProducts(combinedProducts);
        setLoading(false);
      } catch (err) {
        setError('Error loading products. Please try again later.');
        setLoading(false);
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.retail_price,
      quantity: 1,
    }));
    alert(`${product.name} added to cart!`);
  };

  if (loading) return <div className="text-center py-10">Loading products...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Shop Fruits From Da Hood</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
              <img 
                src={product.thumbnail_url} 
                alt={product.name} 
                className="w-full h-48 object-cover mb-4 rounded-md" 
              />
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-2">Price: ${product.retail_price}</p>
              {product.metadata.category && (
                <p className="text-sm text-gray-500 mb-4">Category: {product.metadata.category}</p>
              )}
              <button 
                onClick={() => handleAddToCart(product)} 
                className="w-full bg-neon-pink text-white py-2 rounded-md hover:bg-neon-pink-dark transition-colors duration-200"
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No products available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default Shop;
