import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const StreetArtGallery = ({ artworks, onArtworkSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // grid, list

  const categories = [
    { id: 'all', name: 'All Art', icon: 'Palette', count: artworks?.length },
    { id: 'mural', name: 'Murals', icon: 'Image', count: artworks?.filter(a => a?.category === 'mural')?.length },
    { id: 'graffiti', name: 'Graffiti', icon: 'Spray', count: artworks?.filter(a => a?.category === 'graffiti')?.length },
    { id: 'sculpture', name: 'Sculptures', icon: 'Box', count: artworks?.filter(a => a?.category === 'sculpture')?.length },
    { id: 'installation', name: 'Installations', icon: 'Layers', count: artworks?.filter(a => a?.category === 'installation')?.length }
  ];

  const filteredArtworks = selectedCategory === 'all' 
    ? artworks 
    : artworks?.filter(artwork => artwork?.category === selectedCategory);

  const getCategoryColor = (category) => {
    switch (category) {
      case 'mural': return 'text-primary';
      case 'graffiti': return 'text-secondary';
      case 'sculpture': return 'text-accent';
      case 'installation': return 'text-warning';
      default: return 'text-text-secondary';
    }
  };

  const getCategoryBg = (category) => {
    switch (category) {
      case 'mural': return 'bg-primary/20 border-primary/30';
      case 'graffiti': return 'bg-secondary/20 border-secondary/30';
      case 'sculpture': return 'bg-accent/20 border-accent/30';
      case 'installation': return 'bg-warning/20 border-warning/30';
      default: return 'bg-surface/20 border-border';
    }
  };

  return (
    <div className="bg-card/50 backdrop-blur-md border border-border rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-secondary to-primary rounded-lg flex items-center justify-center neon-glow-secondary">
              <Icon name="Palette" size={20} className="text-black" />
            </div>
            <div>
              <h2 className="font-headline font-bold text-xl text-foreground">Street Art Gallery</h2>
              <p className="text-text-secondary text-sm">Urban creativity showcase</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'neon-glow-primary' : ''}
              iconName="Grid3X3"
              iconSize={14}
            >
              Grid
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'neon-glow-primary' : ''}
              iconName="List"
              iconSize={14}
            >
              List
            </Button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories?.map((category) => (
            <Button
              key={category?.id}
              variant={selectedCategory === category?.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category?.id)}
              className={`${
                selectedCategory === category?.id 
                  ? 'bg-primary text-primary-foreground neon-glow-primary' 
                  : 'border-border hover:bg-primary/10'
              }`}
            >
              <Icon name={category?.icon} size={14} className="mr-2" />
              <span>{category?.name}</span>
              <span className="ml-2 text-xs opacity-70">({category?.count})</span>
            </Button>
          ))}
        </div>
      </div>
      {/* Gallery Content */}
      <div className="p-4">
        {filteredArtworks?.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="Palette" size={48} className="mx-auto text-text-secondary/50 mb-4" />
            <h3 className="font-cta font-semibold text-text-secondary mb-2">No artworks found</h3>
            <p className="text-text-secondary/70 text-sm">Try selecting a different category</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredArtworks?.map((artwork) => (
              <div
                key={artwork?.id}
                onClick={() => onArtworkSelect(artwork)}
                className="group cursor-pointer bg-surface/50 border border-border rounded-lg overflow-hidden transition-all duration-300 hover:bg-surface hover:border-primary/50 spray-paint-hover"
              >
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={artwork?.image}
                    alt={artwork?.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-cta font-semibold text-foreground truncate flex-1">
                      {artwork?.title}
                    </h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getCategoryBg(artwork?.category)}`}>
                      {artwork?.category?.toUpperCase()}
                    </span>
                  </div>
                  
                  <p className="text-text-secondary text-sm mb-3 line-clamp-2">
                    {artwork?.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-text-secondary">
                    <div className="flex items-center space-x-1">
                      <Icon name="User" size={12} />
                      <span>{artwork?.artist}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="MapPin" size={12} />
                      <span>{artwork?.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-3 text-xs text-text-secondary">
                      <div className="flex items-center space-x-1">
                        <Icon name="Heart" size={12} />
                        <span>{artwork?.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Eye" size={12} />
                        <span>{artwork?.views}</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="xs"
                      className="border-primary/30 text-primary hover:bg-primary/10"
                      iconName="ExternalLink"
                      iconSize={12}
                    >
                      View
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredArtworks?.map((artwork) => (
              <div
                key={artwork?.id}
                onClick={() => onArtworkSelect(artwork)}
                className="flex items-start space-x-4 p-4 bg-surface/50 border border-border rounded-lg cursor-pointer transition-all duration-300 hover:bg-surface hover:border-primary/50 spray-paint-hover"
              >
                <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={artwork?.image}
                    alt={artwork?.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-cta font-semibold text-foreground truncate">
                      {artwork?.title}
                    </h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getCategoryBg(artwork?.category)}`}>
                      {artwork?.category?.toUpperCase()}
                    </span>
                  </div>
                  
                  <p className="text-text-secondary text-sm mb-3 line-clamp-2">
                    {artwork?.description}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-xs text-text-secondary">
                    <div className="flex items-center space-x-1">
                      <Icon name="User" size={12} />
                      <span>{artwork?.artist}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="MapPin" size={12} />
                      <span>{artwork?.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Calendar" size={12} />
                      <span>{artwork?.year}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end space-y-2">
                  <div className="flex items-center space-x-3 text-xs text-text-secondary">
                    <div className="flex items-center space-x-1">
                      <Icon name="Heart" size={12} />
                      <span>{artwork?.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Eye" size={12} />
                      <span>{artwork?.views}</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="xs"
                    className="border-primary/30 text-primary hover:bg-primary/10"
                    iconName="ExternalLink"
                    iconSize={12}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StreetArtGallery;