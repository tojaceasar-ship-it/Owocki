import React, { useState } from 'react';

import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CharacterCard = ({ character, isActive, onClick, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`relative group cursor-pointer transition-all duration-500 ${
        isActive ? 'scale-105 z-10' : 'hover:scale-102'
      } ${className}`}
      onClick={() => onClick(character?.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Character Card Container */}
      <div className={`relative bg-card border-2 rounded-2xl overflow-hidden transition-all duration-500 ${
        isActive 
          ? 'border-primary neon-glow-primary shadow-2xl' 
          : 'border-border hover:border-secondary hover:neon-glow-secondary'
      }`}>
        {/* Background Pattern */}
        <div className="concrete-texture absolute inset-0 opacity-10"></div>
        
        {/* Character Image */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={character?.image}
            alt={character?.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          
          {/* Character Stats Badge */}
          <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-primary/30">
            <div className="flex items-center space-x-2">
              <Icon name="Star" size={14} className="text-primary" />
              <span className="text-xs font-cta font-semibold text-primary">
                Level {character?.level}
              </span>
            </div>
          </div>
          
          {/* New Character Badge */}
          {character?.isNew && (
            <div className="absolute top-4 left-4 bg-accent rounded-full px-3 py-1 neon-glow-accent">
              <span className="text-xs font-cta font-bold text-white">NEW</span>
            </div>
          )}
        </div>

        {/* Character Info */}
        <div className="relative p-6">
          {/* Character Name & Title */}
          <div className="mb-4">
            <h3 className="font-headline font-bold text-xl text-primary mb-1 glitch-text">
              {character?.name}
            </h3>
            <p className="text-sm text-secondary font-cta font-medium">
              {character?.title}
            </p>
            <p className="text-xs text-text-secondary mt-1">
              {character?.neighborhood}
            </p>
          </div>

          {/* Character Traits */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {character?.traits?.slice(0, 3)?.map((trait, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-surface/50 border border-border rounded-md text-xs font-cta text-text-secondary"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>

          {/* Character Description */}
          <p className="text-sm text-text-secondary mb-4 line-clamp-3">
            {character?.description}
          </p>

          {/* Character Stats */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center">
              <div className="text-lg font-headline font-bold text-primary">
                {character?.stats?.style}
              </div>
              <div className="text-xs text-text-secondary font-cta">Style</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-headline font-bold text-secondary">
                {character?.stats?.attitude}
              </div>
              <div className="text-xs text-text-secondary font-cta">Attitude</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-headline font-bold text-accent">
                {character?.stats?.street}
              </div>
              <div className="text-xs text-text-secondary font-cta">Street</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button
              variant="default"
              size="sm"
              className="flex-1 bg-gradient-to-r from-primary to-secondary text-black font-cta font-bold neon-glow-primary"
              iconName="User"
              iconPosition="left"
              iconSize={14}
            >
              Meet {character?.name?.split(' ')?.[0]}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
              iconName="Heart"
              iconSize={14}
            />
          </div>
        </div>

        {/* Hover Effect Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent pointer-events-none transition-opacity duration-300"></div>
        )}
      </div>
      {/* Active Character Indicator */}
      {isActive && (
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
          <div className="w-4 h-4 bg-primary rounded-full neon-glow-primary animate-neon-pulse"></div>
        </div>
      )}
    </div>
  );
};

export default CharacterCard;