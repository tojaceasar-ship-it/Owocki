import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const WishlistMoodboard = ({ wishlistItems, onRemoveItem, onCreateMoodboard }) => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'moodboard'

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-headline text-xl font-bold text-primary">Your Wishlist Moodboard</h2>
          <p className="text-text-secondary font-cta text-sm">
            {wishlistItems?.length} items • Curate your street style
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            iconName="Grid3X3"
            iconSize={16}
            onClick={() => setViewMode('grid')}
          />
          <Button
            variant={viewMode === 'moodboard' ? 'default' : 'ghost'}
            size="sm"
            iconName="Layout"
            iconSize={16}
            onClick={() => setViewMode('moodboard')}
          />
          <Button
            variant="outline"
            size="sm"
            iconName="Plus"
            iconPosition="left"
            iconSize={14}
            className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
            onClick={onCreateMoodboard}
          >
            Create Board
          </Button>
        </div>
      </div>
      {wishlistItems?.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-surface/50 rounded-full flex items-center justify-center">
            <Icon name="Heart" size={24} className="text-text-secondary" />
          </div>
          <h3 className="font-cta font-semibold text-foreground mb-2">Start Your Collection</h3>
          <p className="text-text-secondary text-sm mb-4">
            Add items to your wishlist to create your personal style moodboard
          </p>
          <Button
            variant="default"
            iconName="Plus"
            iconPosition="left"
            iconSize={16}
          >
            Explore Products
          </Button>
        </div>
      ) : (
        <div className={`${
          viewMode === 'grid' ?'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4' :'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
        }`}>
          {wishlistItems?.map((item) => (
            <div
              key={item?.id}
              className={`group relative bg-surface/50 border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-300 spray-paint-hover ${
                viewMode === 'moodboard' ? 'aspect-square' : ''
              }`}
            >
              <div className={`${viewMode === 'grid' ? 'aspect-square' : 'h-48'} overflow-hidden`}>
                <Image
                  src={item?.image}
                  alt={item?.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="X"
                  iconSize={16}
                  className="bg-black/50 backdrop-blur-sm text-white hover:bg-red-500 hover:text-white"
                  onClick={() => onRemoveItem(item?.id)}
                />
              </div>

              <div className="p-3">
                <h3 className="font-cta font-medium text-foreground text-sm mb-1 truncate">
                  {item?.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-cta font-semibold text-sm">
                    ${item?.price}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={12} className="text-text-secondary" />
                    <span className="text-xs text-text-secondary">
                      {item?.addedDate}
                    </span>
                  </div>
                </div>
                {item?.character && (
                  <div className="flex items-center space-x-1 mt-2">
                    <div className="w-4 h-4 rounded-full overflow-hidden">
                      <Image
                        src={item?.character?.image}
                        alt={item?.character?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xs text-text-secondary">
                      {item?.character?.name} Collection
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistMoodboard;