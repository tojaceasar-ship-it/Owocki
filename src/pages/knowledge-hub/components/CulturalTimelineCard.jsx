import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const CulturalTimelineCard = ({ event, isActive, onClick }) => {
  return (
    <div 
      className={`group cursor-pointer transition-all duration-300 ${
        isActive ? 'scale-105' : 'hover:scale-102'
      }`}
      onClick={() => onClick(event)}
    >
      <div className={`bg-card border rounded-lg overflow-hidden transition-all duration-300 ${
        isActive 
          ? 'border-primary neon-glow-primary' :'border-border hover:border-secondary hover:neon-glow-secondary'
      }`}>
        <div className="relative overflow-hidden h-32">
          <Image
            src={event?.image}
            alt={event?.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          <div className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm px-2 py-1 rounded-md">
            <span className="text-xs font-cta font-bold text-black">{event?.year}</span>
          </div>

          {event?.isInfluential && (
            <div className="absolute top-3 right-3 w-6 h-6 bg-secondary/90 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Icon name="Star" size={12} className="text-black" />
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-primary' : 'bg-secondary'}`}></div>
            <span className="text-xs font-cta text-text-secondary uppercase tracking-wider">
              {event?.category}
            </span>
          </div>

          <h3 className={`font-headline font-bold text-sm mb-2 line-clamp-2 transition-colors duration-300 ${
            isActive ? 'text-primary' : 'text-foreground group-hover:text-secondary'
          }`}>
            {event?.title}
          </h3>

          <p className="text-xs text-text-secondary line-clamp-2 mb-3">
            {event?.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={12} className="text-text-secondary" />
              <span className="text-xs font-cta text-text-secondary">{event?.location}</span>
            </div>
            
            {event?.relatedCharacters && event?.relatedCharacters?.length > 0 && (
              <div className="flex items-center space-x-1">
                {event?.relatedCharacters?.slice(0, 2)?.map((character, index) => (
                  <div key={index} className="w-4 h-4 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <span className="text-xs font-accent text-black">{character?.charAt(0)}</span>
                  </div>
                ))}
                {event?.relatedCharacters?.length > 2 && (
                  <span className="text-xs font-cta text-text-secondary">+{event?.relatedCharacters?.length - 2}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CulturalTimelineCard;