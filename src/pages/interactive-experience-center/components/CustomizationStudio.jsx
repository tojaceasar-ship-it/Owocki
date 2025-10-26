import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const CustomizationStudio = ({ onSaveCustomization, onShareDesign }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [customizations, setCustomizations] = useState({
    color: 'black',
    size: 'M',
    design: 'watermelon',
    accessories: [],
    text: ''
  });
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const products = [
    {
      id: 1,
      name: "Classic Hood Hoodie",
      basePrice: 89,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
      category: "hoodies"
    },
    {
      id: 2,
      name: "Street Crew Tee",
      basePrice: 45,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      category: "tees"
    },
    {
      id: 3,
      name: "Urban Snapback",
      basePrice: 35,
      image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop",
      category: "accessories"
    }
  ];

  const colorOptions = [
    { name: 'Black', value: 'black', hex: '#000000' },
    { name: 'White', value: 'white', hex: '#FFFFFF' },
    { name: 'Neon Yellow', value: 'yellow', hex: '#FFD700' },
    { name: 'Electric Teal', value: 'teal', hex: '#00CED1' },
    { name: 'Fire Red', value: 'red', hex: '#FF4500' }
  ];

  const designOptions = [
    { id: 'watermelon', name: 'Watermelon Crew', icon: 'Apple', price: 0 },
    { id: 'orange', name: 'Orange Squad', icon: 'Circle', price: 5 },
    { id: 'grape', name: 'Grape Gang', icon: 'Grape', price: 5 },
    { id: 'banana', name: 'Banana Bunch', icon: 'Banana', price: 5 }
  ];

  const accessoryOptions = [
    { id: 'chain', name: 'Gold Chain', price: 15 },
    { id: 'sunglasses', name: 'Street Shades', price: 10 },
    { id: 'bandana', name: 'Hood Bandana', price: 8 },
    { id: 'graffiti', name: 'Custom Graffiti', price: 20 }
  ];

  const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const handleCustomizationChange = (key, value) => {
    setCustomizations(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleAccessoryToggle = (accessoryId) => {
    setCustomizations(prev => ({
      ...prev,
      accessories: prev?.accessories?.includes(accessoryId)
        ? prev?.accessories?.filter(id => id !== accessoryId)
        : [...prev?.accessories, accessoryId]
    }));
  };

  const calculateTotalPrice = () => {
    if (!selectedProduct) return 0;
    
    let total = selectedProduct?.basePrice;
    
    // Add design price
    const selectedDesign = designOptions?.find(d => d?.id === customizations?.design);
    if (selectedDesign) total += selectedDesign?.price;
    
    // Add accessory prices
    customizations?.accessories?.forEach(accessoryId => {
      const accessory = accessoryOptions?.find(a => a?.id === accessoryId);
      if (accessory) total += accessory?.price;
    });
    
    return total;
  };

  const handleSaveCustomization = () => {
    const customizationData = {
      product: selectedProduct,
      customizations,
      totalPrice: calculateTotalPrice(),
      timestamp: new Date()?.toISOString()
    };
    onSaveCustomization(customizationData);
  };

  return (
    <div className="space-y-8">
      {/* Product Selection */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-headline text-xl text-foreground mb-6 flex items-center">
          <Icon name="Palette" size={24} className="text-primary mr-3" />
          Choose Your Canvas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products?.map((product) => (
            <button
              key={product?.id}
              onClick={() => setSelectedProduct(product)}
              className={`p-4 rounded-lg border text-left transition-all duration-300 spray-paint-hover ${
                selectedProduct?.id === product?.id
                  ? 'border-primary bg-primary/20 neon-glow-primary' :'border-border hover:border-secondary hover:bg-surface/50'
              }`}
            >
              <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                <Image
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-cta font-medium text-foreground mb-1">{product?.name}</h4>
              <p className="text-primary font-cta font-bold">${product?.basePrice}</p>
            </button>
          ))}
        </div>
      </div>
      {selectedProduct && (
        <>
          {/* Customization Options */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Panel - Options */}
            <div className="space-y-6">
              {/* Color Selection */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h4 className="font-cta font-medium text-foreground mb-4 flex items-center">
                  <Icon name="Palette" size={20} className="text-secondary mr-2" />
                  Color
                </h4>
                <div className="flex flex-wrap gap-3">
                  {colorOptions?.map((color) => (
                    <button
                      key={color?.value}
                      onClick={() => handleCustomizationChange('color', color?.value)}
                      className={`w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                        customizations?.color === color?.value
                          ? 'border-primary neon-glow-primary scale-110' :'border-border hover:border-secondary'
                      }`}
                      style={{ backgroundColor: color?.hex }}
                      title={color?.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h4 className="font-cta font-medium text-foreground mb-4 flex items-center">
                  <Icon name="Ruler" size={20} className="text-secondary mr-2" />
                  Size
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {sizeOptions?.map((size) => (
                    <button
                      key={size}
                      onClick={() => handleCustomizationChange('size', size)}
                      className={`p-3 rounded-lg border font-cta font-medium transition-all duration-300 ${
                        customizations?.size === size
                          ? 'border-primary bg-primary/20 text-primary neon-glow-primary' :'border-border text-text-secondary hover:border-secondary hover:text-secondary'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Design Selection */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h4 className="font-cta font-medium text-foreground mb-4 flex items-center">
                  <Icon name="Paintbrush" size={20} className="text-secondary mr-2" />
                  Character Design
                </h4>
                <div className="space-y-2">
                  {designOptions?.map((design) => (
                    <button
                      key={design?.id}
                      onClick={() => handleCustomizationChange('design', design?.id)}
                      className={`w-full p-3 rounded-lg border text-left transition-all duration-300 spray-paint-hover ${
                        customizations?.design === design?.id
                          ? 'border-primary bg-primary/20 neon-glow-primary' :'border-border hover:border-secondary hover:bg-surface/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Icon name={design?.icon} size={20} className="text-secondary" />
                          <span className="font-cta text-foreground">{design?.name}</span>
                        </div>
                        <span className="text-primary font-cta font-bold">
                          {design?.price === 0 ? 'Free' : `+$${design?.price}`}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Accessories */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h4 className="font-cta font-medium text-foreground mb-4 flex items-center">
                  <Icon name="Plus" size={20} className="text-secondary mr-2" />
                  Add-ons
                </h4>
                <div className="space-y-3">
                  {accessoryOptions?.map((accessory) => (
                    <Checkbox
                      key={accessory?.id}
                      label={
                        <div className="flex items-center justify-between w-full">
                          <span>{accessory?.name}</span>
                          <span className="text-primary font-cta font-bold">+${accessory?.price}</span>
                        </div>
                      }
                      checked={customizations?.accessories?.includes(accessory?.id)}
                      onChange={() => handleAccessoryToggle(accessory?.id)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Panel - Preview */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-cta font-medium text-foreground flex items-center">
                  <Icon name="Eye" size={20} className="text-secondary mr-2" />
                  Live Preview
                </h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsPreviewMode(!isPreviewMode)}
                  className="text-text-secondary hover:text-primary"
                  iconName={isPreviewMode ? "Minimize2" : "Maximize2"}
                  iconSize={16}
                >
                  {isPreviewMode ? "Exit" : "Fullscreen"}
                </Button>
              </div>

              <div className="aspect-square bg-surface/50 rounded-lg mb-6 flex items-center justify-center relative overflow-hidden">
                <Image
                  src={selectedProduct?.image}
                  alt="Product Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center space-x-2 mb-2">
                    {customizations?.accessories?.map((accessoryId) => {
                      const accessory = accessoryOptions?.find(a => a?.id === accessoryId);
                      return (
                        <div key={accessoryId} className="px-2 py-1 bg-primary/20 rounded text-xs text-primary">
                          {accessory?.name}
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-white font-cta font-medium">
                    {designOptions?.find(d => d?.id === customizations?.design)?.name} • {customizations?.color} • {customizations?.size}
                  </p>
                </div>
              </div>

              {/* Price Summary */}
              <div className="bg-surface/50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-text-secondary">Base Price</span>
                  <span className="text-foreground">${selectedProduct?.basePrice}</span>
                </div>
                {designOptions?.find(d => d?.id === customizations?.design)?.price > 0 && (
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-text-secondary">Design</span>
                    <span className="text-foreground">+${designOptions?.find(d => d?.id === customizations?.design)?.price}</span>
                  </div>
                )}
                {customizations?.accessories?.map((accessoryId) => {
                  const accessory = accessoryOptions?.find(a => a?.id === accessoryId);
                  return (
                    <div key={accessoryId} className="flex items-center justify-between mb-2">
                      <span className="text-text-secondary">{accessory?.name}</span>
                      <span className="text-foreground">+${accessory?.price}</span>
                    </div>
                  );
                })}
                <div className="border-t border-border pt-2 mt-2">
                  <div className="flex items-center justify-between">
                    <span className="font-cta font-bold text-foreground">Total</span>
                    <span className="font-cta font-bold text-primary text-xl">${calculateTotalPrice()}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  variant="default"
                  fullWidth
                  onClick={handleSaveCustomization}
                  className="bg-gradient-to-r from-primary to-secondary text-black font-cta font-bold neon-glow-primary"
                  iconName="Save"
                  iconPosition="left"
                >
                  Save to Wishlist
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => onShareDesign({ product: selectedProduct, customizations })}
                  className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground neon-glow-secondary"
                  iconName="Share2"
                  iconPosition="left"
                >
                  Share Design
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomizationStudio;