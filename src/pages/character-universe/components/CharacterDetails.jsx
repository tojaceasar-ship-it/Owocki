import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

const CharacterDetails = ({ character }) => {
  const [activeTab, setActiveTab] = useState('story');
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
    setSelectedImage(0);
  }, [character?.id]);

  if (!character) {
    return (
      <div className="bg-card border border-border rounded-2xl p-8 text-center">
        <Icon name="User" size={48} className="text-text-secondary mx-auto mb-4" />
        <p className="text-text-secondary">No character selected</p>
      </div>
    );
  }

  const tabs = [
    { id: 'story', label: 'Story', icon: 'Book' },
    { id: 'products', label: `Products (${character?.products?.length || 0})`, icon: 'ShoppingBag' },
    { id: 'traits', label: 'Personality', icon: 'Star' }
  ];

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <div className="concrete-texture absolute inset-0 opacity-5 rounded-2xl"></div>
      {/* Character Header */}
      <div className="relative p-8 bg-gradient-to-br from-primary/10 to-secondary/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Character Image */}
          <div className="md:col-span-1">
            <div className="aspect-square rounded-2xl overflow-hidden border-4 border-border bg-surface">
              {!imageError && character?.image ? (
                <img
                  src={character?.image}
                  alt={character?.name}
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-surface">
                  <Icon name="User" size={64} className="text-text-secondary" />
                </div>
              )}
            </div>
          </div>
          
          {/* Character Info */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="font-headline font-bold text-4xl text-primary glitch-text">
                  {character?.name}
                </h1>
                {character?.products?.length > 0 && (
                  <div className="w-3 h-3 bg-accent rounded-full neon-glow-accent"></div>
                )}
              </div>
              <p className="text-xl text-secondary font-cta font-semibold mb-4">
                {character?.title || 'Street Character'}
              </p>
              <p className="text-text-secondary leading-relaxed max-w-2xl">
                {character?.backstory || 'No backstory available.'}
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-surface/50 border border-border rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="ShoppingBag" size={16} className="text-primary" />
                  <span className="text-sm text-text-secondary">Products</span>
                </div>
                <span className="font-cta font-bold text-lg text-foreground">
                  {character?.products?.length || 0}
                </span>
              </div>
              
              <div className="bg-surface/50 border border-border rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="Star" size={16} className="text-secondary" />
                  <span className="text-sm text-text-secondary">Traits</span>
                </div>
                <span className="font-cta font-bold text-lg text-foreground">
                  {character?.personality_traits?.length || 0}
                </span>
              </div>
              
              <div className="bg-surface/50 border border-border rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="Calendar" size={16} className="text-accent" />
                  <span className="text-sm text-text-secondary">Created</span>
                </div>
                <span className="font-cta font-bold text-sm text-foreground">
                  {character?.created_at ? new Date(character.created_at)?.toLocaleDateString() : 'Unknown'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Character Details Tabs */}
      <div className="relative">
        {/* Tab Navigation */}
        <div className="flex border-b border-border bg-surface/30">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex-1 px-6 py-4 text-center transition-all duration-300 ${
                activeTab === tab?.id
                  ? 'bg-primary/10 text-primary border-b-2 border-primary neon-glow-primary' :'text-text-secondary hover:text-foreground hover:bg-surface/50'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Icon name={tab?.icon} size={16} />
                <span className="font-cta font-semibold text-sm">{tab?.label}</span>
              </div>
            </button>
          ))}
        </div>
        
        {/* Tab Content */}
        <div className="p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'story' && (
              <motion.div
                key="story"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-headline font-bold text-xl text-primary mb-4">
                    Character Story
                  </h3>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-text-secondary leading-relaxed">
                      {character?.backstory || 'No detailed story available for this character.'}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'products' && (
              <motion.div
                key="products"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-headline font-bold text-xl text-primary mb-4">
                    Character Products ({character?.products?.length || 0})
                  </h3>
                  
                  {character?.products?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {character?.products?.map((product, index) => (
                        <div
                          key={product?.id || index}
                          className="bg-surface/50 border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300"
                        >
                          <div className="aspect-square mb-4 rounded-lg overflow-hidden bg-background">
                            {product?.image ? (
                              <img
                                src={product?.image}
                                alt={product?.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Icon name="Package" size={32} className="text-text-secondary" />
                              </div>
                            )}
                          </div>
                          
                          <h4 className="font-cta font-bold text-foreground mb-2">
                            {product?.name}
                          </h4>
                          
                          <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                            {product?.description || 'No description available.'}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <span className="font-cta font-bold text-primary">
                              {product?.price ? `${product?.price} ${product?.currency || 'PLN'}` : 'Price not set'}
                            </span>
                            
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
                              iconName="ShoppingCart"
                              iconPosition="left"
                              iconSize={14}
                            >
                              Add to Cart
                            </Button>
                          </div>
                          
                          {/* Color/Size variants if available */}
                          {(product?.color_variants?.length > 0 || product?.size_variants?.length > 0) && (
                            <div className="mt-4 pt-4 border-t border-border">
                              <div className="text-xs text-text-secondary">
                                {product?.color_variants?.length > 0 && (
                                  <span>Colors: {product?.color_variants?.join(', ')}</span>
                                )}
                                {product?.size_variants?.length > 0 && (
                                  <span className={product?.color_variants?.length > 0 ? 'ml-2' : ''}>
                                    Sizes: {product?.size_variants?.join(', ')}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Icon name="Package" size={48} className="text-text-secondary mx-auto mb-4" />
                      <p className="text-text-secondary">No products available for this character.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
            
            {activeTab === 'traits' && (
              <motion.div
                key="traits"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-headline font-bold text-xl text-primary mb-4">
                    Personality Traits
                  </h3>
                  
                  {character?.personality_traits?.length > 0 ? (
                    <div className="flex flex-wrap gap-3">
                      {character?.personality_traits?.map((trait, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 bg-gradient-to-r from-primary/20 to-secondary/10 border border-primary/30 rounded-full"
                        >
                          <span className="text-sm font-cta font-semibold text-primary">
                            {trait}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Icon name="Star" size={48} className="text-text-secondary mx-auto mb-4" />
                      <p className="text-text-secondary">No personality traits defined for this character.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;