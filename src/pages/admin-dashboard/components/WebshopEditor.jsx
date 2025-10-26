import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { printfulService } from '../../../services/printfulService';

const WebshopEditor = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([
    { id: 1, name: 'T-Shirts', slug: 't-shirts', status: 'active' },
    { id: 2, name: 'Hoodies', slug: 'hoodies', status: 'active' },
    { id: 3, name: 'Accessories', slug: 'accessories', status: 'active' },
    { id: 4, name: 'Limited Drops', slug: 'limited', status: 'active' }
  ]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '', stock: '' });
  const [newCategory, setNewCategory] = useState({ name: '', slug: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await printfulService.getProducts();
        setProducts(data.result || []);
      } catch (err) {
        setError('Failed to load products from Printful.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.category && newProduct.stock) {
      setProducts([...products, { id: products.length + 1, ...newProduct, price: parseFloat(newProduct.price), stock: parseInt(newProduct.stock), status: 'active' }]);
      setNewProduct({ name: '', price: '', category: '', stock: '' });
      // TODO: Sync with Printful API if possible
    }
  };

  const addCategory = () => {
    if (newCategory.name && newCategory.slug) {
      setCategories([...categories, { id: categories.length + 1, ...newCategory, status: 'active' }]);
      setNewCategory({ name: '', slug: '' });
    }
  };

  const updateProduct = (id, field, value) => {
    setProducts(products.map(item => item.id === id ? { ...item, [field]: value } : item));
    // TODO: Sync with Printful API if possible
  };

  const updateCategory = (id, field, value) => {
    setCategories(categories.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter(category => category.id !== id));
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-card/95 backdrop-blur-md border border-border rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-headline font-bold text-xl text-primary">
            Edytor Sklepu
          </h2>
          <p className="text-text-secondary font-body text-sm">
            Webshop Editor • Zarządzaj produktami i kategoriami sklepu
          </p>
        </div>
        <Button
          variant="default"
          iconName="Save"
          iconPosition="left"
          iconSize={16}
          className="bg-gradient-to-r from-primary to-secondary text-black font-cta font-bold neon-glow-primary"
        >
          Zapisz Zmiany
        </Button>
      </div>

      {/* Products Editor */}
      <div className="mb-8">
        <h3 className="font-cta font-bold text-lg text-foreground mb-4">Produkty</h3>
        <div className="space-y-4 mb-4">
          {products.map(product => (
            <div key={product.id} className="bg-surface/50 border border-border rounded-lg p-4 spray-paint-hover flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-grow">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center neon-glow-primary">
                  <Icon name="Package" size={20} className="text-white" />
                </div>
                <Input
                  value={product.name}
                  onChange={(e) => updateProduct(product.id, 'name', e.target.value)}
                  placeholder="Nazwa produktu"
                  className="w-2/5"
                />
                <Input
                  value={product.price}
                  onChange={(e) => updateProduct(product.id, 'price', parseFloat(e.target.value) || 0)}
                  placeholder="Cena"
                  type="number"
                  className="w-1/5"
                />
                <Input
                  value={product.category}
                  onChange={(e) => updateProduct(product.id, 'category', e.target.value)}
                  placeholder="Kategoria"
                  className="w-1/5"
                />
                <Input
                  value={product.stock}
                  onChange={(e) => updateProduct(product.id, 'stock', parseInt(e.target.value) || 0)}
                  placeholder="Stan magazynowy"
                  type="number"
                  className="w-1/5"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="Trash2"
                  iconSize={16}
                  className="text-error hover:bg-error/20"
                  onClick={() => deleteProduct(product.id)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  iconName={product.status === 'active' ? 'Eye' : 'EyeOff'}
                  iconSize={16}
                  className={product.status === 'active' ? 'text-success hover:bg-success/20' : 'text-text-secondary hover:bg-surface/50'}
                  onClick={() => updateProduct(product.id, 'status', product.status === 'active' ? 'inactive' : 'active')}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-4 mb-6">
          <Input
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            placeholder="Nowy produkt"
            className="w-2/5"
          />
          <Input
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            placeholder="Cena"
            type="number"
            className="w-1/5"
          />
          <Input
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            placeholder="Kategoria"
            className="w-1/5"
          />
          <Input
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
            placeholder="Stan magazynowy"
            type="number"
            className="w-1/5"
          />
          <Button
            variant="default"
            iconName="Plus"
            iconPosition="left"
            iconSize={16}
            className="bg-primary text-black font-cta font-bold neon-glow-primary"
            onClick={addProduct}
          >
            Dodaj Produkt
          </Button>
        </div>
      </div>

      {/* Categories Editor */}
      <div>
        <h3 className="font-cta font-bold text-lg text-foreground mb-4">Kategorie</h3>
        <div className="space-y-4 mb-4">
          {categories.map(category => (
            <div key={category.id} className="bg-surface/50 border border-border rounded-lg p-4 spray-paint-hover flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-grow">
                <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center neon-glow-secondary">
                  <Icon name="Folder" size={20} className="text-white" />
                </div>
                <Input
                  value={category.name}
                  onChange={(e) => updateCategory(category.id, 'name', e.target.value)}
                  placeholder="Nazwa kategorii"
                  className="w-1/2"
                />
                <Input
                  value={category.slug}
                  onChange={(e) => updateCategory(category.id, 'slug', e.target.value)}
                  placeholder="Slug"
                  className="w-1/2"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="Trash2"
                  iconSize={16}
                  className="text-error hover:bg-error/20"
                  onClick={() => deleteCategory(category.id)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  iconName={category.status === 'active' ? 'Eye' : 'EyeOff'}
                  iconSize={16}
                  className={category.status === 'active' ? 'text-success hover:bg-success/20' : 'text-text-secondary hover:bg-surface/50'}
                  onClick={() => updateCategory(category.id, 'status', category.status === 'active' ? 'inactive' : 'active')}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <Input
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            placeholder="Nowa kategoria"
            className="w-1/2"
          />
          <Input
            value={newCategory.slug}
            onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
            placeholder="Slug"
            className="w-1/2"
          />
          <Button
            variant="default"
            iconName="Plus"
            iconPosition="left"
            iconSize={16}
            className="bg-primary text-black font-cta font-bold neon-glow-primary"
            onClick={addCategory}
          >
            Dodaj Kategorię
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WebshopEditor;
