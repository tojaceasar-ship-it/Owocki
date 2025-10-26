import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const QuizResult = ({ result, onRetakeQuiz, onShareResult, onExploreCharacter }) => {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    setIsSharing(true);
    try {
      await onShareResult(result);
    } finally {
      setIsSharing(false);
    }
  };

  const personalityTraits = [
    { name: "Creativity", value: result?.traits?.creativity, color: "primary" },
    { name: "Leadership", value: result?.traits?.leadership, color: "secondary" },
    { name: "Community", value: result?.traits?.community, color: "accent" },
    { name: "Style", value: result?.traits?.style, color: "success" }
  ];

  return (
    <div className="space-y-8">
      {/* Character Result */}
      <div className="bg-card border border-primary/30 rounded-xl p-8 text-center neon-glow-primary">
        <div className="mb-6">
          <div className="w-32 h-32 mx-auto mb-6 relative">
            <Image
              src={result?.character?.image}
              alt={result?.character?.name}
              className="w-full h-full object-cover rounded-full border-4 border-primary neon-glow-primary"
            />
            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center neon-pulse">
              <Icon name="Crown" size={24} className="text-black" />
            </div>
          </div>
          <h2 className="font-headline text-3xl text-primary mb-2">You are {result?.character?.name}!</h2>
          <p className="text-lg text-secondary font-cta font-medium mb-4">{result?.character?.tagline}</p>
          <p className="text-text-secondary max-w-md mx-auto">{result?.character?.description}</p>
        </div>

        {/* Personality Traits */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {personalityTraits?.map((trait) => (
            <div key={trait?.name} className="bg-surface/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-cta text-sm text-foreground">{trait?.name}</span>
                <span className="font-cta text-sm text-primary">{trait?.value}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full bg-gradient-to-r from-${trait?.color} to-${trait?.color}/80 neon-glow-${trait?.color}`}
                  style={{ width: `${trait?.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="default"
            onClick={() => onExploreCharacter(result?.character?.id)}
            className="bg-gradient-to-r from-primary to-secondary text-black font-cta font-bold neon-glow-primary"
            iconName="User"
            iconPosition="left"
          >
            Explore Character
          </Button>
          <Button
            variant="outline"
            onClick={handleShare}
            loading={isSharing}
            className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground neon-glow-secondary"
            iconName="Share2"
            iconPosition="left"
          >
            Share Result
          </Button>
        </div>
      </div>
      {/* Recommended Products */}
      <div className="bg-card border border-border rounded-xl p-8">
        <h3 className="font-headline text-xl text-foreground mb-6 flex items-center">
          <Icon name="ShoppingBag" size={24} className="text-primary mr-3" />
          Perfect Matches for You
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {result?.recommendedProducts?.map((product) => (
            <div key={product?.id} className="bg-surface/50 rounded-lg p-4 spray-paint-hover">
              <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                <Image
                  src={product?.image}
                  alt={product?.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h4 className="font-cta font-medium text-foreground mb-2">{product?.name}</h4>
              <p className="text-sm text-text-secondary mb-3">{product?.description}</p>
              <div className="flex items-center justify-between">
                <span className="font-cta font-bold text-primary">${product?.price}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-secondary hover:text-secondary"
                  iconName="Plus"
                  iconSize={16}
                >
                  Add to Wishlist
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Achievement Unlocked */}
      <div className="bg-gradient-to-r from-accent/20 to-primary/20 border border-accent/30 rounded-xl p-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center neon-pulse">
            <Icon name="Award" size={32} className="text-black" />
          </div>
          <div className="flex-1">
            <h3 className="font-headline text-lg text-accent mb-1">Achievement Unlocked!</h3>
            <p className="text-foreground font-cta font-medium mb-1">Quiz Master</p>
            <p className="text-sm text-text-secondary">You've completed your first personality quiz</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-accent hover:text-accent"
            iconName="ExternalLink"
            iconSize={16}
          >
            View All
          </Button>
        </div>
      </div>
      {/* Retake Quiz */}
      <div className="text-center">
        <Button
          variant="ghost"
          onClick={onRetakeQuiz}
          className="text-text-secondary hover:text-primary"
          iconName="RotateCcw"
          iconPosition="left"
        >
          Retake Quiz
        </Button>
      </div>
    </div>
  );
};

export default QuizResult;