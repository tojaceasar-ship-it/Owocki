import React, { useState } from 'react';
import Image from '../../../components/AppImage';

import Button from '../../../components/ui/Button';

const ShoppableLookbookSection = ({ lookbookItems }) => {
  const [selectedLook, setSelectedLook] = useState(0);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const currentLook = lookbookItems?.[selectedLook];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline font-bold text-4xl text-primary mb-4 glitch-text">
            Shoppable Lookbook
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            From inspiration to your wardrobe - shop the complete looks that define authentic street luxury
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Look Navigation */}
          <div className="space-y-4">
            <h3 className="font-cta font-semibold text-lg text-foreground mb-4">
              Featured Looks
            </h3>
            
            {lookbookItems?.map((look, index) => (
              <div
                key={index}
                onClick={() => setSelectedLook(index)}
                className={`cursor-pointer p-4 rounded-lg border transition-all duration-300 spray-paint-hover ${
                  selectedLook === index
                    ? 'border-primary bg-primary/10 neon-glow-primary' :'border-border bg-card/50 hover:border-primary/50'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden">
                    <Image
                      src={look?.thumbnail}
                      alt={look?.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-cta font-medium text-foreground mb-1">
                      {look?.title}
                    </h4>
                    <p className="text-text-secondary text-sm mb-2">{look?.description}</p>
                    <div className="flex items-center space-x-3 text-xs">
                      <span className="text-primary">{look?.products?.length} pieces</span>
                      <span className="text-secondary">${look?.totalPrice}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Look Display */}
          <div className="lg:col-span-2">
            <div className="relative bg-card rounded-xl overflow-hidden border border-border">
              {/* Main Image */}
              <div className="relative h-96 lg:h-[600px] overflow-hidden">
                <Image
                  src={currentLook?.mainImage}
                  alt={currentLook?.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Product Hotspots */}
                {currentLook?.products?.map((product, index) => (
                  <div
                    key={index}
                    className="absolute cursor-pointer group"
                    style={{ 
                      left: `${product?.position?.x}%`, 
                      top: `${product?.position?.y}%` 
                    }}
                    onMouseEnter={() => setHoveredProduct(index)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    {/* Hotspot Dot */}
                    <div className="w-4 h-4 bg-primary rounded-full neon-glow-primary animate-neon-pulse border-2 border-white/50">
                      <div className="w-full h-full bg-primary rounded-full animate-ping opacity-75"></div>
                    </div>
                    
                    {/* Product Info Popup */}
                    {hoveredProduct === index && (
                      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-64 bg-card/95 backdrop-blur-sm border border-border rounded-lg p-4 shadow-neon-lg z-10">
                        <div className="flex items-start space-x-3">
                          <div className="w-12 h-12 rounded-lg overflow-hidden">
                            <Image
                              src={product?.image}
                              alt={product?.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h5 className="font-cta font-medium text-foreground text-sm mb-1">
                              {product?.name}
                            </h5>
                            <p className="text-text-secondary text-xs mb-2">{product?.category}</p>
                            <div className="flex items-center justify-between">
                              <span className="font-cta font-semibold text-primary">
                                ${product?.price}
                              </span>
                              <Button
                                variant="default"
                                size="xs"
                                className="bg-gradient-to-r from-primary to-secondary text-black"
                                iconName="ShoppingCart"
                                iconSize={12}
                              >
                                Add
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Look Details */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-headline font-bold text-2xl text-foreground mb-2">
                      {currentLook?.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      {currentLook?.fullDescription}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-text-secondary text-sm mb-1">Complete Look</p>
                    <p className="font-cta font-bold text-2xl text-primary">
                      ${currentLook?.totalPrice}
                    </p>
                  </div>
                </div>

                {/* Style Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {currentLook?.styleTags?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-surface/50 border border-border rounded-full text-xs font-cta text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-4">
                  <Button
                    variant="default"
                    className="flex-1 bg-gradient-to-r from-primary to-secondary text-black font-cta font-bold neon-glow-primary"
                    iconName="ShoppingBag"
                    iconPosition="left"
                    iconSize={18}
                  >
                    Shop Complete Look
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
                    iconName="Heart"
                    iconSize={18}
                  />
                  
                  <Button
                    variant="outline"
                    className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                    iconName="Share2"
                    iconSize={18}
                  />
                </div>
              </div>
            </div>

            {/* Individual Products */}
            <div className="mt-8">
              <h4 className="font-cta font-semibold text-lg text-foreground mb-4">
                Individual Pieces
              </h4>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {currentLook?.products?.map((product, index) => (
                  <div
                    key={index}
                    className="bg-card/50 rounded-lg p-4 border border-border hover:border-primary/30 transition-all duration-300 spray-paint-hover"
                  >
                    <div className="w-full h-32 rounded-lg overflow-hidden mb-3">
                      <Image
                        src={product?.image}
                        alt={product?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <h5 className="font-cta font-medium text-foreground text-sm mb-1 truncate">
                      {product?.name}
                    </h5>
                    <p className="text-text-secondary text-xs mb-2">{product?.category}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="font-cta font-semibold text-primary">
                        ${product?.price}
                      </span>
                      <Button
                        variant="outline"
                        size="xs"
                        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        iconName="Plus"
                        iconSize={12}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoppableLookbookSection;