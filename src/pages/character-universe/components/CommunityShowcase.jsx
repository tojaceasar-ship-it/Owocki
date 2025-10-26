import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CommunityShowcase = ({ characterId }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const communityContent = [
    {
      id: 1,
      type: 'styling',
      user: {
        name: 'StreetArtist_Maya',
        avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
        level: 'Hood Legend',
        verified: true
      },
      content: {
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
        caption: `Rocking my ${characterId ? 'Watermelon' : 'Apple'} hoodie at the downtown art walk! The quality is insane and got so many compliments 🔥`,
        likes: 247,
        comments: 18,
        shares: 12
      },
      timestamp: '2 hours ago',
      featured: true
    },
    {
      id: 2,
      type: 'fanart',
      user: {
        name: 'DigitalDreamer_Alex',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
        level: 'Creative Soul',
        verified: false
      },
      content: {
        image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400',
        caption: `My digital interpretation of ${characterId ? 'Watermelon' : 'Apple'} in cyberpunk style! Hope the team likes it 💫`,
        likes: 189,
        comments: 24,
        shares: 31
      },
      timestamp: '5 hours ago',
      featured: false
    },
    {
      id: 3,
      type: 'styling',
      user: {
        name: 'FashionForward_Sam',
        avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
        level: 'Style Icon',
        verified: true
      },
      content: {
        image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400',
        caption: 'Layered the signature tee under my vintage jacket. Street meets classic! 🎨',
        likes: 156,
        comments: 9,
        shares: 7
      },
      timestamp: '1 day ago',
      featured: false
    },
    {
      id: 4,
      type: 'fanart',
      user: {
        name: 'GraffitiKing_Rico',
        avatar: 'https://randomuser.me/api/portraits/men/38.jpg',
        level: 'Wall Master',
        verified: true
      },
      content: {
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
        caption: `Painted ${characterId ? 'Watermelon' : 'Apple'} on the community center wall! Kids love it already 🎭`,
        likes: 312,
        comments: 45,
        shares: 28
      },
      timestamp: '2 days ago',
      featured: true
    },
    {
      id: 5,
      type: 'styling',
      user: {
        name: 'UrbanExplorer_Zoe',
        avatar: 'https://randomuser.me/api/portraits/women/19.jpg',
        level: 'Street Scout',
        verified: false
      },
      content: {
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400',
        caption: 'Perfect fit for my city adventures! Comfort meets style perfectly 🌆',
        likes: 98,
        comments: 12,
        shares: 4
      },
      timestamp: '3 days ago',
      featured: false
    },
    {
      id: 6,
      type: 'fanart',
      user: {
        name: 'AnimationAce_Jordan',
        avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
        level: 'Motion Master',
        verified: false
      },
      content: {
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400',
        caption: `Working on an animated short featuring ${characterId ? 'Watermelon' : 'Apple'}! Sneak peek of the storyboard 🎬`,
        likes: 203,
        comments: 31,
        shares: 19
      },
      timestamp: '4 days ago',
      featured: false
    }
  ];

  const filters = [
    { id: 'all', label: 'All Content', icon: 'Grid3x3' },
    { id: 'styling', label: 'Street Style', icon: 'Shirt' },
    { id: 'fanart', label: 'Fan Art', icon: 'Palette' },
    { id: 'featured', label: 'Featured', icon: 'Star' }
  ];

  const filteredContent = communityContent?.filter(item => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'featured') return item?.featured;
    return item?.type === activeFilter;
  });

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <div className="concrete-texture absolute inset-0 opacity-5"></div>
      {/* Header */}
      <div className="relative p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-headline font-bold text-xl text-primary mb-1">
              Community Showcase
            </h3>
            <p className="text-sm text-text-secondary">
              See how the community reps this character
            </p>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
            iconName="Upload"
            iconPosition="left"
            iconSize={14}
          >
            Share Yours
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 overflow-x-auto">
          {filters?.map((filter) => (
            <button
              key={filter?.id}
              onClick={() => setActiveFilter(filter?.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-cta font-medium text-sm transition-all duration-300 whitespace-nowrap ${
                activeFilter === filter?.id
                  ? 'bg-primary/20 text-primary border border-primary/30 neon-glow-primary' :'text-text-secondary hover:text-primary hover:bg-surface/50'
              }`}
            >
              <Icon name={filter?.icon} size={14} />
              <span>{filter?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Content Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredContent?.map((item) => (
            <div
              key={item?.id}
              className="bg-surface/50 border border-border rounded-lg overflow-hidden hover:border-primary hover:neon-glow-primary transition-all duration-300 group"
            >
              {/* User Header */}
              <div className="p-4 border-b border-border/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-border group-hover:border-primary transition-all duration-300">
                        <Image
                          src={item?.user?.avatar}
                          alt={item?.user?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {item?.user?.verified && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                          <Icon name="Check" size={8} className="text-black" />
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-cta font-semibold text-foreground text-sm">
                          {item?.user?.name}
                        </h4>
                        {item?.featured && (
                          <Icon name="Star" size={12} className="text-accent" />
                        )}
                      </div>
                      <p className="text-xs text-text-secondary">
                        {item?.user?.level} • {item?.timestamp}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Icon 
                      name={item?.type === 'styling' ? 'Shirt' : 'Palette'} 
                      size={14} 
                      className={item?.type === 'styling' ? 'text-secondary' : 'text-accent'} 
                    />
                  </div>
                </div>
              </div>

              {/* Content Image */}
              <div className="aspect-square overflow-hidden">
                <Image
                  src={item?.content?.image}
                  alt="Community content"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content Footer */}
              <div className="p-4">
                <p className="text-sm text-text-secondary mb-3 line-clamp-3">
                  {item?.content?.caption}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 text-text-secondary hover:text-accent transition-colors duration-300">
                      <Icon name="Heart" size={16} />
                      <span className="text-sm font-cta">{item?.content?.likes}</span>
                    </button>
                    
                    <button className="flex items-center space-x-1 text-text-secondary hover:text-secondary transition-colors duration-300">
                      <Icon name="MessageCircle" size={16} />
                      <span className="text-sm font-cta">{item?.content?.comments}</span>
                    </button>
                    
                    <button className="flex items-center space-x-1 text-text-secondary hover:text-primary transition-colors duration-300">
                      <Icon name="Share" size={16} />
                      <span className="text-sm font-cta">{item?.content?.shares}</span>
                    </button>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-text-secondary hover:text-primary"
                    iconName="ExternalLink"
                    iconSize={14}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-8 text-center">
          <Button
            variant="outline"
            className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
            iconName="Plus"
            iconPosition="left"
            iconSize={16}
          >
            Load More Content
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommunityShowcase;