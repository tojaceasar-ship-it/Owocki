import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SeasonalCollectionCard = ({ collection, featured = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`group relative overflow-hidden rounded-xl bg-card border border-border transition-all duration-500 spray-paint-hover ${
        featured ? 'lg:col-span-2 lg:row-span-2' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div className="relative h-full min-h-[400px] overflow-hidden">
        <Image
          src={collection?.coverImage}
          alt={collection?.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        
        {/* Neon Glow Effect */}
        <div className={`absolute inset-0 transition-opacity duration-500 ${
          isHovered ? 'opacity-100 neon-glow-primary' : 'opacity-0'
        }`}></div>
      </div>
      {/* Content Overlay */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <div className="px-3 py-1 bg-primary/20 border border-primary/30 rounded-full backdrop-blur-sm">
              <span className="text-xs font-cta font-semibold text-primary uppercase tracking-wider">
                {collection?.season}
              </span>
            </div>
            {collection?.isNew && (
              <div className="px-2 py-1 bg-accent/20 border border-accent/30 rounded-full backdrop-blur-sm">
                <span className="text-xs font-cta font-semibold text-accent">NEW</span>
              </div>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="text-white/70 hover:text-primary bg-black/20 backdrop-blur-sm"
            iconName="Heart"
            iconSize={18}
          />
        </div>

        {/* Main Content */}
        <div className="space-y-4">
          <div>
            <h3 className="font-headline font-bold text-2xl text-white mb-2 glitch-text">
              {collection?.title}
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">
              {collection?.description}
            </p>
          </div>

          {/* Collection Stats */}
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="Image" size={16} className="text-secondary" />
              <span className="text-text-secondary">{collection?.itemCount} pieces</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Music" size={16} className="text-accent" />
              <span className="text-text-secondary">{collection?.playlistTracks} tracks</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-primary" />
              <span className="text-text-secondary">{collection?.readTime}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Link to={`/lookbook-explorer/${collection?.slug}`} className="flex-1">
              <Button
                variant="default"
                fullWidth
                className="bg-gradient-to-r from-primary to-secondary text-black font-cta font-bold neon-glow-primary"
                iconName="BookOpen"
                iconPosition="left"
                iconSize={16}
              >
                Explore Collection
              </Button>
            </Link>
            
            <Button
              variant="outline"
              size="icon"
              className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground neon-glow-secondary"
              iconName="Play"
              iconSize={16}
            />
          </div>
        </div>
      </div>
      {/* Character Mascot */}
      {collection?.characterMascot && (
        <div className="absolute top-4 right-4">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/30 neon-glow-primary">
            <Image
              src={collection?.characterMascot?.avatar}
              alt={collection?.characterMascot?.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SeasonalCollectionCard;