import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CharacterRecommendations = ({ currentCharacter, characters, onCharacterSelect }) => {
  const getRecommendations = () => {
    if (!currentCharacter) return characters?.slice(0, 3);
    
    // Filter out current character and get similar ones based on traits
    const otherCharacters = characters?.filter(char => char?.id !== currentCharacter?.id);
    
    // Simple recommendation logic based on shared traits
    const recommended = otherCharacters?.map(char => ({
        ...char,
        similarity: currentCharacter?.traits?.filter(trait => 
          char?.traits?.includes(trait)
        )?.length
      }))?.sort((a, b) => b?.similarity - a?.similarity)?.slice(0, 3);
    
    return recommended;
  };

  const recommendations = getRecommendations();

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <div className="concrete-texture absolute inset-0 opacity-5"></div>
      {/* Header */}
      <div className="relative p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-headline font-bold text-xl text-primary mb-1">
              You Might Also Like
            </h3>
            <p className="text-sm text-text-secondary">
              {currentCharacter 
                ? `Characters similar to ${currentCharacter?.name?.split(' ')?.[0]}`
                : 'Discover more characters from the hood'
              }
            </p>
          </div>
          
          <Icon name="Sparkles" size={24} className="text-secondary neon-glow-secondary" />
        </div>
      </div>
      {/* Recommendations Grid */}
      <div className="p-6">
        <div className="space-y-4">
          {recommendations?.map((character, index) => (
            <div
              key={character?.id}
              className="group bg-surface/50 border border-border rounded-lg p-4 transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:neon-glow-primary cursor-pointer"
              onClick={() => onCharacterSelect(character?.id)}
            >
              <div className="flex items-center space-x-4">
                {/* Character Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-border group-hover:border-primary transition-all duration-300">
                    <Image
                      src={character?.avatar}
                      alt={character?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Recommendation Rank */}
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center neon-glow-primary">
                    <span className="font-headline font-bold text-black text-xs">
                      {index + 1}
                    </span>
                  </div>
                </div>

                {/* Character Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-cta font-semibold text-foreground group-hover:text-primary transition-colors duration-300 truncate">
                      {character?.name}
                    </h4>
                    
                    {currentCharacter && character?.similarity > 0 && (
                      <div className="flex items-center space-x-1 text-xs text-secondary">
                        <Icon name="Users" size={12} />
                        <span>{character?.similarity} shared traits</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm text-secondary font-cta mb-2">
                    {character?.title}
                  </p>
                  
                  <p className="text-xs text-text-secondary line-clamp-2">
                    {character?.description}
                  </p>
                </div>

                {/* Action Button */}
                <div className="flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-text-secondary group-hover:text-primary group-hover:bg-primary/20"
                    iconName="ArrowRight"
                    iconSize={16}
                  />
                </div>
              </div>

              {/* Character Stats Preview */}
              <div className="mt-4 pt-4 border-t border-border/50">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-sm font-headline font-bold text-primary">
                      {character?.stats?.style}
                    </div>
                    <div className="text-xs text-text-secondary font-cta">Style</div>
                  </div>
                  <div>
                    <div className="text-sm font-headline font-bold text-secondary">
                      {character?.stats?.attitude}
                    </div>
                    <div className="text-xs text-text-secondary font-cta">Attitude</div>
                  </div>
                  <div>
                    <div className="text-sm font-headline font-bold text-accent">
                      {character?.stats?.street}
                    </div>
                    <div className="text-xs text-text-secondary font-cta">Street</div>
                  </div>
                </div>
              </div>

              {/* Shared Traits (if any) */}
              {currentCharacter && character?.similarity > 0 && (
                <div className="mt-3 pt-3 border-t border-border/50">
                  <div className="flex flex-wrap gap-1">
                    {currentCharacter?.traits?.filter(trait => character?.traits?.includes(trait))?.slice(0, 3)?.map((trait, traitIndex) => (
                        <span
                          key={traitIndex}
                          className="px-2 py-1 bg-primary/20 border border-primary/30 rounded text-xs font-cta text-primary"
                        >
                          {trait}
                        </span>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-6 pt-6 border-t border-border">
          <Button
            variant="outline"
            fullWidth
            className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
            iconName="Grid3x3"
            iconPosition="left"
            iconSize={16}
          >
            Explore All Characters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CharacterRecommendations;