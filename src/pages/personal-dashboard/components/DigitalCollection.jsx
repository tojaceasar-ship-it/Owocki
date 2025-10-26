import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DigitalCollection = ({ tradingCards, seasonalContent, exclusiveUnlocks }) => {
  const [activeCollection, setActiveCollection] = useState('cards');

  const collections = [
    { id: 'cards', label: 'Trading Cards', icon: 'CreditCard', count: tradingCards?.length },
    { id: 'seasonal', label: 'Seasonal', icon: 'Calendar', count: seasonalContent?.length },
    { id: 'exclusive', label: 'Exclusive', icon: 'Lock', count: exclusiveUnlocks?.length }
  ];

  const getRarityColor = (rarity) => {
    const colorMap = {
      'common': 'border-text-secondary text-text-secondary',
      'rare': 'border-secondary text-secondary',
      'epic': 'border-primary text-primary',
      'legendary': 'border-accent text-accent'
    };
    return colorMap?.[rarity] || 'border-text-secondary text-text-secondary';
  };

  const getRarityGlow = (rarity) => {
    const glowMap = {
      'common': '',
      'rare': 'neon-glow-secondary',
      'epic': 'neon-glow-primary',
      'legendary': 'neon-glow-accent'
    };
    return glowMap?.[rarity] || '';
  };

  const getCurrentCollection = () => {
    switch (activeCollection) {
      case 'cards':
        return tradingCards;
      case 'seasonal':
        return seasonalContent;
      case 'exclusive':
        return exclusiveUnlocks;
      default:
        return [];
    }
  };

  const currentItems = getCurrentCollection();

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-headline text-xl font-bold text-primary">Digital Collection</h2>
          <p className="text-text-secondary font-cta text-sm">
            Your exclusive digital assets and unlocks
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="Download"
          iconPosition="left"
          iconSize={14}
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        >
          Export
        </Button>
      </div>
      {/* Collection Tabs */}
      <div className="flex space-x-1 mb-6 bg-surface/30 p-1 rounded-lg">
        {collections?.map((collection) => (
          <button
            key={collection?.id}
            onClick={() => setActiveCollection(collection?.id)}
            className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md font-cta font-medium text-sm transition-all duration-300 ${
              activeCollection === collection?.id
                ? 'bg-primary text-primary-foreground neon-glow-primary'
                : 'text-text-secondary hover:text-foreground hover:bg-surface/50'
            }`}
          >
            <Icon name={collection?.icon} size={16} />
            <span className="hidden sm:inline">{collection?.label}</span>
            <span className="bg-surface/50 px-2 py-1 rounded-full text-xs">
              {collection?.count}
            </span>
          </button>
        ))}
      </div>
      {/* Collection Grid */}
      {currentItems?.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-surface/50 rounded-full flex items-center justify-center">
            <Icon name="Package" size={24} className="text-text-secondary" />
          </div>
          <h3 className="font-cta font-semibold text-foreground mb-2">No Items Yet</h3>
          <p className="text-text-secondary text-sm mb-4">
            Complete achievements and participate in events to unlock digital collectibles
          </p>
          <Button
            variant="default"
            iconName="Trophy"
            iconPosition="left"
            iconSize={16}
          >
            View Achievements
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentItems?.map((item) => (
            <div
              key={item?.id}
              className={`group relative aspect-[3/4] bg-gradient-to-br from-surface/50 to-surface/30 border-2 rounded-xl overflow-hidden transition-all duration-300 spray-paint-hover ${getRarityColor(item?.rarity)} ${getRarityGlow(item?.rarity)}`}
            >
              {/* Card Image */}
              <div className="absolute inset-0">
                <Image
                  src={item?.image}
                  alt={item?.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>

              {/* Rarity Indicator */}
              <div className="absolute top-2 right-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center bg-black/50 backdrop-blur-sm ${getRarityColor(item?.rarity)}`}>
                  <Icon 
                    name={item?.rarity === 'legendary' ? 'Crown' : item?.rarity === 'epic' ? 'Star' : item?.rarity === 'rare' ? 'Gem' : 'Circle'} 
                    size={12} 
                  />
                </div>
              </div>

              {/* New Badge */}
              {item?.isNew && (
                <div className="absolute top-2 left-2">
                  <div className="px-2 py-1 bg-accent rounded-full">
                    <span className="text-xs font-cta font-bold text-white">NEW</span>
                  </div>
                </div>
              )}

              {/* Card Info */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="font-cta font-semibold text-white text-sm mb-1 truncate">
                  {item?.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-cta uppercase tracking-wider ${getRarityColor(item?.rarity)}`}>
                    {item?.rarity}
                  </span>
                  {item?.series && (
                    <span className="text-xs text-white/70">
                      {item?.series}
                    </span>
                  )}
                </div>
                {item?.unlockDate && (
                  <div className="flex items-center space-x-1 mt-1">
                    <Icon name="Calendar" size={10} className="text-white/70" />
                    <span className="text-xs text-white/70">
                      {item?.unlockDate}
                    </span>
                  </div>
                )}
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center">
                  <Button
                    variant="default"
                    size="sm"
                    iconName="Eye"
                    iconSize={14}
                    className="mb-2"
                  >
                    View
                  </Button>
                  {item?.shareable && (
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Share2"
                      iconSize={14}
                      className="border-white text-white hover:bg-white hover:text-black"
                    >
                      Share
                    </Button>
                  )}
                </div>
              </div>

              {/* Animated Border for Legendary */}
              {item?.rarity === 'legendary' && (
                <div className="absolute inset-0 rounded-xl border-2 border-accent animate-neon-pulse"></div>
              )}
            </div>
          ))}
        </div>
      )}
      {/* Collection Stats */}
      {currentItems?.length > 0 && (
        <div className="mt-6 p-4 bg-surface/30 border border-border rounded-lg">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-lg font-headline font-bold text-primary">
                {currentItems?.length}
              </div>
              <div className="text-xs font-cta text-text-secondary uppercase tracking-wider">
                Total Items
              </div>
            </div>
            <div>
              <div className="text-lg font-headline font-bold text-accent">
                {currentItems?.filter(item => item?.rarity === 'legendary')?.length}
              </div>
              <div className="text-xs font-cta text-text-secondary uppercase tracking-wider">
                Legendary
              </div>
            </div>
            <div>
              <div className="text-lg font-headline font-bold text-primary">
                {currentItems?.filter(item => item?.rarity === 'epic')?.length}
              </div>
              <div className="text-xs font-cta text-text-secondary uppercase tracking-wider">
                Epic
              </div>
            </div>
            <div>
              <div className="text-lg font-headline font-bold text-secondary">
                {currentItems?.filter(item => item?.isNew)?.length}
              </div>
              <div className="text-xs font-cta text-text-secondary uppercase tracking-wider">
                New Items
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DigitalCollection;