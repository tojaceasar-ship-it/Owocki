import React from 'react';

import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PersonalityProfile = ({ personalityData, preferredCharacters }) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-headline text-xl font-bold text-primary">Your Street Personality</h2>
        <Button
          variant="outline"
          size="sm"
          iconName="RefreshCw"
          iconPosition="left"
          iconSize={14}
          className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
        >
          Retake Quiz
        </Button>
      </div>
      {/* Main Personality Result */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary neon-glow-primary">
            <Image
              src={personalityData?.character?.image}
              alt={personalityData?.character?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-headline text-lg font-bold text-primary">
              You're a {personalityData?.type}
            </h3>
            <p className="text-text-secondary font-cta text-sm mb-2">
              {personalityData?.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {personalityData?.traits?.map((trait, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-surface/50 border border-border rounded-full text-xs font-cta text-text-secondary"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Preferred Characters */}
      <div>
        <h3 className="font-cta font-semibold text-foreground mb-4">Your Character Connections</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {preferredCharacters?.map((character) => (
            <div
              key={character?.id}
              className="bg-surface/50 border border-border rounded-lg p-3 text-center hover:border-primary/50 transition-all duration-300 spray-paint-hover"
            >
              <div className="w-12 h-12 mx-auto mb-2 rounded-full overflow-hidden border border-primary/30">
                <Image
                  src={character?.image}
                  alt={character?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-sm font-cta font-medium text-foreground mb-1">
                {character?.name}
              </div>
              <div className="text-xs text-text-secondary">
                {character?.compatibility}% match
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalityProfile;