import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const GalleryGrid = ({ posts, onLike, onShare, onViewPost }) => {
  const [hoveredPost, setHoveredPost] = useState(null);

  const getCharacterColor = (character) => {
    const colors = {
      watermelon: 'text-red-400',
      banana: 'text-yellow-400',
      apple: 'text-green-400',
      orange: 'text-orange-400',
      grape: 'text-purple-400',
      strawberry: 'text-pink-400',
      pineapple: 'text-yellow-300'
    };
    return colors?.[character] || 'text-primary';
  };

  const getAchievementIcon = (level) => {
    const icons = {
      legend: 'Crown',
      creator: 'Camera',
      ambassador: 'Star',
      contributor: 'Paintbrush',
      member: 'User'
    };
    return icons?.[level] || 'User';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const posted = new Date(timestamp);
    const diffInHours = Math.floor((now - posted) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return `${Math.floor(diffInDays / 7)}w ago`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {posts?.map((post) => (
        <div
          key={post?.id}
          className="group relative bg-card/80 backdrop-blur-sm border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 spray-paint-hover"
          onMouseEnter={() => setHoveredPost(post?.id)}
          onMouseLeave={() => setHoveredPost(null)}
        >
          <div className="concrete-texture absolute inset-0 opacity-5"></div>
          
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={post?.image}
              alt={post?.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            
            {/* Overlay on Hover */}
            {hoveredPost === post?.id && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:text-primary neon-glow-primary"
                    iconName="Heart"
                    iconSize={20}
                    onClick={() => onLike(post?.id)}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:text-secondary neon-glow-secondary"
                    iconName="Share"
                    iconSize={20}
                    onClick={() => onShare(post)}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:text-accent neon-glow-accent"
                    iconName="Eye"
                    iconSize={20}
                    onClick={() => onViewPost(post?.id)}
                  />
                </div>
              </div>
            )}

            {/* Character Badge */}
            <div className="absolute top-3 left-3">
              <div className="flex items-center space-x-1 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-full border border-border">
                <Icon 
                  name="Users" 
                  size={12} 
                  className={getCharacterColor(post?.character)}
                />
                <span className="font-cta text-xs text-white capitalize">
                  {post?.character}
                </span>
              </div>
            </div>

            {/* Achievement Badge */}
            {post?.userLevel !== 'member' && (
              <div className="absolute top-3 right-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center border-2 border-background neon-glow-primary">
                  <Icon 
                    name={getAchievementIcon(post?.userLevel)} 
                    size={12} 
                    className="text-black"
                  />
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="absolute bottom-3 right-3 flex items-center space-x-2">
              <div className="flex items-center space-x-1 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-full">
                <Icon name="Heart" size={12} className="text-red-400" />
                <span className="font-cta text-xs text-white">{post?.likes}</span>
              </div>
              {post?.comments > 0 && (
                <div className="flex items-center space-x-1 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-full">
                  <Icon name="MessageCircle" size={12} className="text-blue-400" />
                  <span className="font-cta text-xs text-white">{post?.comments}</span>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="relative p-4">
            {/* User Info */}
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-border">
                <Image
                  src={post?.userAvatar}
                  alt={post?.username}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h3 className="font-cta font-semibold text-sm text-foreground truncate">
                    {post?.username}
                  </h3>
                  {post?.isVerified && (
                    <Icon name="BadgeCheck" size={14} className="text-primary" />
                  )}
                </div>
                <p className="font-body text-xs text-text-secondary">
                  {formatTimeAgo(post?.timestamp)}
                </p>
              </div>
            </div>

            {/* Post Title & Description */}
            <h4 className="font-cta font-semibold text-sm text-foreground mb-2 line-clamp-1">
              {post?.title}
            </h4>
            <p className="font-body text-xs text-text-secondary line-clamp-2 mb-3">
              {post?.description}
            </p>

            {/* Tags */}
            {post?.tags && post?.tags?.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {post?.tags?.slice(0, 3)?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-surface/50 rounded-full font-cta text-xs text-text-secondary border border-border"
                  >
                    #{tag}
                  </span>
                ))}
                {post?.tags?.length > 3 && (
                  <span className="px-2 py-1 bg-surface/50 rounded-full font-cta text-xs text-text-secondary border border-border">
                    +{post?.tags?.length - 3}
                  </span>
                )}
              </div>
            )}

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => onLike(post?.id)}
                  className={`flex items-center space-x-1 transition-all duration-300 ${
                    post?.isLiked 
                      ? 'text-red-400' :'text-text-secondary hover:text-red-400'
                  }`}
                >
                  <Icon name="Heart" size={16} />
                  <span className="font-cta text-xs">{post?.likes}</span>
                </button>
                
                <button
                  onClick={() => onViewPost(post?.id)}
                  className="flex items-center space-x-1 text-text-secondary hover:text-blue-400 transition-colors duration-300"
                >
                  <Icon name="MessageCircle" size={16} />
                  <span className="font-cta text-xs">{post?.comments}</span>
                </button>
              </div>

              <button
                onClick={() => onShare(post)}
                className="text-text-secondary hover:text-primary transition-colors duration-300"
              >
                <Icon name="Share" size={16} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;