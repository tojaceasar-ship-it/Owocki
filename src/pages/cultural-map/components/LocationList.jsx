import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const LocationList = ({ locations, selectedLocation, onLocationSelect, onFilterChange, activeFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filters = [
    { id: 'all', name: 'All Locations', icon: 'MapPin', count: locations?.length },
    { id: 'art', name: 'Street Art', icon: 'Palette', count: locations?.filter(l => l?.type === 'art')?.length },
    { id: 'event', name: 'Events', icon: 'Calendar', count: locations?.filter(l => l?.type === 'event')?.length },
    { id: 'store', name: 'Brand Presence', icon: 'Store', count: locations?.filter(l => l?.type === 'store')?.length }
  ];

  const filteredLocations = locations?.filter(location => {
    const matchesFilter = activeFilter === 'all' || location?.type === activeFilter;
    const matchesSearch = location?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         location?.address?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getLocationIcon = (type) => {
    switch (type) {
      case 'art': return 'Palette';
      case 'event': return 'Calendar';
      case 'store': return 'Store';
      default: return 'MapPin';
    }
  };

  const getLocationColor = (type) => {
    switch (type) {
      case 'art': return 'text-secondary';
      case 'event': return 'text-accent';
      case 'store': return 'text-primary';
      default: return 'text-text-secondary';
    }
  };

  return (
    <div className="h-full flex flex-col bg-card/50 backdrop-blur-md border border-border rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center neon-glow-primary">
            <Icon name="Map" size={20} className="text-black" />
          </div>
          <div>
            <h2 className="font-headline font-bold text-xl text-foreground">Cultural Locations</h2>
            <p className="text-text-secondary text-sm">Explore street culture hotspots</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
          <input
            type="text"
            placeholder="Search locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-lg text-foreground placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-2 gap-2">
          {filters?.map((filter) => (
            <Button
              key={filter?.id}
              variant={activeFilter === filter?.id ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterChange(filter?.id)}
              className={`justify-start ${
                activeFilter === filter?.id 
                  ? 'bg-primary text-primary-foreground neon-glow-primary' 
                  : 'border-border hover:bg-primary/10'
              }`}
            >
              <Icon name={filter?.icon} size={14} className="mr-2" />
              <span className="flex-1 text-left">{filter?.name}</span>
              <span className="text-xs opacity-70">({filter?.count})</span>
            </Button>
          ))}
        </div>
      </div>
      {/* Location List */}
      <div className="flex-1 overflow-y-auto">
        {filteredLocations?.length === 0 ? (
          <div className="p-6 text-center">
            <Icon name="MapPin" size={48} className="mx-auto text-text-secondary/50 mb-4" />
            <h3 className="font-cta font-semibold text-text-secondary mb-2">No locations found</h3>
            <p className="text-text-secondary/70 text-sm">Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {filteredLocations?.map((location) => (
              <div
                key={location?.id}
                onClick={() => onLocationSelect(location)}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 spray-paint-hover ${
                  selectedLocation?.id === location?.id
                    ? 'bg-primary/20 border-primary neon-glow-primary' :'bg-surface/50 border-border hover:bg-surface hover:border-primary/50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      location?.type === 'art' ?'bg-secondary/20 neon-glow-secondary'
                        : location?.type === 'event' ?'bg-accent/20 neon-glow-accent' :'bg-primary/20 neon-glow-primary'
                    }`}>
                      <Icon 
                        name={getLocationIcon(location?.type)} 
                        size={18} 
                        className={getLocationColor(location?.type)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-cta font-semibold text-foreground truncate">
                        {location?.name}
                      </h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        location?.type === 'event' ?'bg-accent/20 text-accent'
                          : location?.type === 'art' ?'bg-secondary/20 text-secondary' :'bg-primary/20 text-primary'
                      }`}>
                        {location?.type?.toUpperCase()}
                      </span>
                    </div>
                    
                    <p className="text-text-secondary text-sm mb-2 line-clamp-2">
                      {location?.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-text-secondary">
                      <div className="flex items-center space-x-1">
                        <Icon name="MapPin" size={12} />
                        <span className="truncate">{location?.address}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Users" size={12} />
                        <span>{location?.visitors}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location Image */}
                {location?.image && (
                  <div className="mt-3 rounded-lg overflow-hidden">
                    <Image
                      src={location?.image}
                      alt={location?.name}
                      className="w-full h-24 object-cover"
                    />
                  </div>
                )}

                {/* Quick Actions */}
                <div className="flex items-center space-x-2 mt-3">
                  <Button
                    variant="outline"
                    size="xs"
                    className="border-primary/30 text-primary hover:bg-primary/10"
                    iconName="Navigation"
                    iconSize={12}
                  >
                    Directions
                  </Button>
                  <Button
                    variant="outline"
                    size="xs"
                    className="border-secondary/30 text-secondary hover:bg-secondary/10"
                    iconName="Camera"
                    iconSize={12}
                  >
                    Check In
                  </Button>
                  {location?.type === 'event' && (
                    <Button
                      variant="outline"
                      size="xs"
                      className="border-accent/30 text-accent hover:bg-accent/10"
                      iconName="Calendar"
                      iconSize={12}
                    >
                      RSVP
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationList;