import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PersonalizedRecommendations = ({ recommendations, onAddToWishlist, onViewItem }) => {
  const [activeTab, setActiveTab] = useState('characters');

  const tabs = [
    { id: 'characters', label: 'Characters', icon: 'Users' },
    { id: 'products', label: 'Products', icon: 'ShoppingBag' },
    { id: 'content', label: 'Content', icon: 'BookOpen' },
    { id: 'community', label: 'Community', icon: 'MessageSquare' }
  ];

  const getRecommendationReason = (reason) => {
    const reasonMap = {
      'personality_match': 'Based on your personality',
      'character_preference': 'You love this character',
      'style_history': 'Matches your style',
      'community_trending': 'Trending in community',
      'wishlist_similar': 'Similar to your wishlist',
      'achievement_unlock': 'Achievement reward'
    };
    return reasonMap?.[reason] || 'Recommended for you';
  };

  const getRecommendationIcon = (reason) => {
    const iconMap = {
      'personality_match': 'Brain',
      'character_preference': 'Heart',
      'style_history': 'Palette',
      'community_trending': 'TrendingUp',
      'wishlist_similar': 'Shuffle',
      'achievement_unlock': 'Trophy'
    };
    return iconMap?.[reason] || 'Sparkles';
  };

  const currentRecommendations = recommendations?.[activeTab] || [];

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-headline text-xl font-bold text-primary">Personalized for You</h2>
          <p className="text-text-secondary font-cta text-sm">
            Curated based on your style and preferences
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="Shuffle"
          iconPosition="left"
          iconSize={14}
          className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
        >
          Refresh
        </Button>
      </div>
      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-surface/30 p-1 rounded-lg">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md font-cta font-medium text-sm transition-all duration-300 ${
              activeTab === tab?.id
                ? 'bg-primary text-primary-foreground neon-glow-primary'
                : 'text-text-secondary hover:text-foreground hover:bg-surface/50'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span className="hidden sm:inline">{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Recommendations Content */}
      <div className="space-y-4">
        {currentRecommendations?.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-surface/50 rounded-full flex items-center justify-center">
              <Icon name="Sparkles" size={24} className="text-text-secondary" />
            </div>
            <h3 className="font-cta font-semibold text-foreground mb-2">No Recommendations Yet</h3>
            <p className="text-text-secondary text-sm">
              Explore more content to get personalized recommendations
            </p>
          </div>
        ) : (
          currentRecommendations?.map((item) => (
            <div
              key={item?.id}
              className="flex items-center space-x-4 p-4 bg-surface/30 border border-border rounded-lg hover:border-primary/30 transition-all duration-300 spray-paint-hover"
            >
              <div className="w-16 h-16 rounded-lg overflow-hidden border border-border flex-shrink-0">
                <Image
                  src={item?.image}
                  alt={item?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-cta font-medium text-foreground text-sm mb-1">
                      {item?.name}
                    </h3>
                    <p className="text-text-secondary text-xs mb-2 line-clamp-2">
                      {item?.description}
                    </p>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Icon 
                          name={getRecommendationIcon(item?.reason)} 
                          size={12} 
                          className="text-primary" 
                        />
                        <span className="text-xs font-cta text-primary">
                          {getRecommendationReason(item?.reason)}
                        </span>
                      </div>
                      {item?.matchPercentage && (
                        <span className="text-xs text-text-secondary">
                          {item?.matchPercentage}% match
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {item?.price && (
                    <div className="text-right ml-4">
                      <div className="text-sm font-cta font-semibold text-primary">
                        ${item?.price}
                      </div>
                      {item?.originalPrice && (
                        <div className="text-xs text-text-secondary line-through">
                          ${item?.originalPrice}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-2 mt-3">
                  <Button
                    variant="default"
                    size="sm"
                    iconName="Eye"
                    iconPosition="left"
                    iconSize={14}
                    onClick={() => onViewItem(item)}
                  >
                    View
                  </Button>
                  
                  {activeTab === 'products' && (
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Heart"
                      iconPosition="left"
                      iconSize={14}
                      className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                      onClick={() => onAddToWishlist(item)}
                    >
                      Wishlist
                    </Button>
                  )}
                  
                  {activeTab === 'characters' && (
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="UserPlus"
                      iconPosition="left"
                      iconSize={14}
                      className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
                    >
                      Follow
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {currentRecommendations?.length > 0 && (
        <div className="text-center mt-6">
          <Button
            variant="ghost"
            iconName="ArrowRight"
            iconPosition="right"
            iconSize={16}
            className="text-primary hover:text-primary"
          >
            View All {tabs?.find(t => t?.id === activeTab)?.label}
          </Button>
        </div>
      )}
    </div>
  );
};

export default PersonalizedRecommendations;