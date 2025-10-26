import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TutorialCard = ({ tutorial, onPlay, onBookmark, isBookmarked }) => {
  const getDifficultyColor = (level) => {
    switch (level) {
      case 'Beginner': return 'text-success';
      case 'Intermediate': return 'text-warning';
      case 'Advanced': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  const getDifficultyBg = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-success/20 border-success/30';
      case 'Intermediate': return 'bg-warning/20 border-warning/30';
      case 'Advanced': return 'bg-error/20 border-error/30';
      default: return 'bg-surface/20 border-border';
    }
  };

  return (
    <div className="group bg-card border border-border rounded-lg overflow-hidden hover:neon-glow-primary transition-all duration-300 spray-paint-hover">
      <div className="relative overflow-hidden h-48">
        <Image
          src={tutorial?.thumbnail}
          alt={tutorial?.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="default"
            size="lg"
            onClick={() => onPlay(tutorial)}
            className="bg-primary/90 hover:bg-primary text-black neon-glow-primary"
            iconName="Play"
            iconSize={24}
          >
            Watch Tutorial
          </Button>
        </div>

        {/* Duration Badge */}
        <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-md">
          <span className="text-xs font-cta text-white">{tutorial?.duration}</span>
        </div>

        {/* Bookmark Button */}
        <button
          onClick={() => onBookmark(tutorial?.id)}
          className="absolute top-3 right-3 w-8 h-8 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors duration-300"
        >
          <Icon 
            name={isBookmarked ? "Bookmark" : "BookmarkPlus"} 
            size={16} 
            className={isBookmarked ? "text-primary" : "text-white"} 
          />
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className={`px-2 py-1 rounded-md text-xs font-cta border ${getDifficultyBg(tutorial?.difficulty)} ${getDifficultyColor(tutorial?.difficulty)}`}>
            {tutorial?.difficulty}
          </span>
          <div className="flex items-center space-x-1 text-text-secondary">
            <Icon name="Eye" size={14} />
            <span className="text-xs font-cta">{tutorial?.views}</span>
          </div>
        </div>

        <h3 className="font-headline font-bold text-lg text-foreground mb-2 line-clamp-2">
          {tutorial?.title}
        </h3>

        <p className="text-sm text-text-secondary mb-3 line-clamp-2">
          {tutorial?.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <span className="text-xs font-accent text-black">{tutorial?.character?.charAt(0)}</span>
            </div>
            <span className="text-xs font-cta text-text-secondary">{tutorial?.character}</span>
          </div>

          <div className="flex items-center space-x-1 text-text-secondary">
            <Icon name="Clock" size={14} />
            <span className="text-xs font-cta">{tutorial?.publishedAt}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialCard;