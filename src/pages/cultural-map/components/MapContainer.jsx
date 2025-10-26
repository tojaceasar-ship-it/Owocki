import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapContainer = ({ selectedLocation, onLocationSelect, locations, mapCenter }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [mapStyle, setMapStyle] = useState('roadmap');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const mapStyles = [
    { id: 'roadmap', name: 'Street View', icon: 'Map' },
    { id: 'satellite', name: 'Satellite', icon: 'Satellite' },
    { id: 'terrain', name: 'Terrain', icon: 'Mountain' }
  ];

  const getMapUrl = () => {
    const { lat, lng } = mapCenter;
    return `https://www.google.com/maps?q=${lat},${lng}&z=12&t=${mapStyle}&output=embed`;
  };

  return (
    <div className="relative h-full bg-surface rounded-xl overflow-hidden border border-border neon-glow-primary">
      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
        {mapStyles?.map((style) => (
          <Button
            key={style?.id}
            variant={mapStyle === style?.id ? "default" : "outline"}
            size="sm"
            onClick={() => setMapStyle(style?.id)}
            className={`backdrop-blur-md ${
              mapStyle === style?.id 
                ? 'bg-primary text-primary-foreground neon-glow-primary' 
                : 'bg-surface/80 border-border hover:bg-primary/20'
            }`}
            iconName={style?.icon}
            iconSize={16}
          >
            {style?.name}
          </Button>
        ))}
      </div>
      {/* Location Info Panel */}
      {selectedLocation && (
        <div className="absolute bottom-4 left-4 right-4 z-10 bg-card/95 backdrop-blur-md border border-border rounded-lg p-4 neon-glow-secondary">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name={selectedLocation?.icon} size={20} className="text-primary" />
                <h3 className="font-headline font-bold text-lg text-foreground">
                  {selectedLocation?.name}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-cta font-medium ${
                  selectedLocation?.type === 'event' ?'bg-accent/20 text-accent border border-accent/30'
                    : selectedLocation?.type === 'art' ?'bg-secondary/20 text-secondary border border-secondary/30' :'bg-primary/20 text-primary border border-primary/30'
                }`}>
                  {selectedLocation?.type?.toUpperCase()}
                </span>
              </div>
              <p className="text-text-secondary text-sm mb-3">{selectedLocation?.description}</p>
              <div className="flex items-center space-x-4 text-xs text-text-secondary">
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={14} />
                  <span>{selectedLocation?.address}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={14} />
                  <span>{selectedLocation?.visitors} visitors</span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onLocationSelect(null)}
              className="text-text-secondary hover:text-foreground"
              iconName="X"
              iconSize={16}
            />
          </div>
        </div>
      )}
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-surface/80 backdrop-blur-sm flex items-center justify-center z-20">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
            <p className="font-cta text-text-secondary">Loading street culture map...</p>
          </div>
        </div>
      )}
      {/* Google Maps Embed */}
      <iframe
        width="100%"
        height="100%"
        loading="lazy"
        title="Cultural Map - Street Art & Brand Locations"
        referrerPolicy="no-referrer-when-downgrade"
        src={getMapUrl()}
        className="w-full h-full"
        style={{ border: 0 }}
      />
      {/* Map Overlay Markers */}
      <div className="absolute inset-0 pointer-events-none">
        {locations?.map((location, index) => (
          <div
            key={location?.id}
            className={`absolute w-4 h-4 rounded-full border-2 border-white shadow-lg pointer-events-auto cursor-pointer transition-all duration-300 ${
              location?.type === 'event' ?'bg-accent neon-glow-accent'
                : location?.type === 'art' ?'bg-secondary neon-glow-secondary' :'bg-primary neon-glow-primary'
            } ${selectedLocation?.id === location?.id ? 'scale-150 z-10' : 'hover:scale-125'}`}
            style={{
              left: `${20 + (index % 5) * 15}%`,
              top: `${20 + Math.floor(index / 5) * 15}%`
            }}
            onClick={() => onLocationSelect(location)}
          />
        ))}
      </div>
    </div>
  );
};

export default MapContainer;