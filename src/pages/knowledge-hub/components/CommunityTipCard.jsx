import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CommunityTipCard = ({ tip, onLike, onShare, onReport }) => {
  const [isLiked, setIsLiked] = useState(tip?.isLiked || false);
  const [likeCount, setLikeCount] = useState(tip?.likes || 0);

  const handleLike = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikeCount(prev => newLikedState ? prev + 1 : prev - 1);
    onLike(tip?.id, newLikedState);
  };

  const getVerificationBadge = (level) => {
    switch (level) {
      case 'verified': return { icon: 'CheckCircle', color: 'text-success', bg: 'bg-success/20' };
      case 'expert': return { icon: 'Crown', color: 'text-primary', bg: 'bg-primary/20' };
      case 'community': return { icon: 'Users', color: 'text-secondary', bg: 'bg-secondary/20' };
      default: return null;
    }
  };

  const verification = getVerificationBadge(tip?.author?.verification);

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:neon-glow-primary transition-all duration-300 spray-paint-hover">
      <div className="p-4">
        {/* Author Info */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Image
                src={tip?.author?.avatar}
                alt={tip?.author?.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              {verification && (
                <div className={`absolute -bottom-1 -right-1 w-5 h-5 ${verification?.bg} rounded-full flex items-center justify-center border-2 border-card`}>
                  <Icon name={verification?.icon} size={10} className={verification?.color} />
                </div>
              )}
            </div>
            <div>
              <h4 className="font-cta font-semibold text-foreground text-sm">
                {tip?.author?.name}
              </h4>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-text-secondary">{tip?.author?.level}</span>
                <span className="text-xs text-text-secondary">•</span>
                <span className="text-xs text-text-secondary">{tip?.timeAgo}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              className="text-text-secondary hover:text-primary w-8 h-8"
              iconName="MoreHorizontal"
              iconSize={14}
            />
          </div>
        </div>

        {/* Tip Content */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className="px-2 py-1 bg-primary/20 border border-primary/30 rounded-md">
              <span className="text-xs font-cta text-primary">{tip?.category}</span>
            </div>
            {tip?.difficulty && (
              <div className="px-2 py-1 bg-surface/50 rounded-md">
                <span className="text-xs font-cta text-text-secondary">{tip?.difficulty}</span>
              </div>
            )}
          </div>

          <h3 className="font-headline font-bold text-lg text-foreground mb-2">
            {tip?.title}
          </h3>

          <p className="text-sm text-text-secondary mb-3 leading-relaxed">
            {tip?.content}
          </p>

          {tip?.tags && tip?.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {tip?.tags?.map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-surface/30 rounded-md text-xs font-cta text-text-secondary">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {tip?.images && tip?.images?.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mb-3">
              {tip?.images?.slice(0, 4)?.map((image, index) => (
                <div key={index} className="relative overflow-hidden rounded-lg h-24">
                  <Image
                    src={image}
                    alt={`Tip illustration ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  {tip?.images?.length > 4 && index === 3 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white font-cta font-bold">+{tip?.images?.length - 4}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 transition-colors duration-300 ${
                isLiked ? 'text-error' : 'text-text-secondary hover:text-error'
              }`}
            >
              <Icon name={isLiked ? "Heart" : "Heart"} size={16} className={isLiked ? "fill-current" : ""} />
              <span className="text-sm font-cta">{likeCount}</span>
            </button>

            <button
              onClick={() => onShare(tip)}
              className="flex items-center space-x-1 text-text-secondary hover:text-secondary transition-colors duration-300"
            >
              <Icon name="Share" size={16} />
              <span className="text-sm font-cta">{tip?.shares || 0}</span>
            </button>

            <button className="flex items-center space-x-1 text-text-secondary hover:text-primary transition-colors duration-300">
              <Icon name="MessageCircle" size={16} />
              <span className="text-sm font-cta">{tip?.comments || 0}</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-text-secondary hover:text-primary"
              iconName="Bookmark"
              iconSize={14}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityTipCard;