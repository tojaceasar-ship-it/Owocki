import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const CommunityPhotos = ({ photos, onPhotoSubmit }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);

  const handlePhotoSubmit = (photoData) => {
    onPhotoSubmit(photoData);
    setShowSubmissionForm(false);
  };

  return (
    <div className="bg-card/50 backdrop-blur-md border border-border rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center neon-glow-secondary">
              <Icon name="Camera" size={20} className="text-black" />
            </div>
            <div>
              <h2 className="font-headline font-bold text-xl text-foreground">Community Captures</h2>
              <p className="text-text-secondary text-sm">Street culture through your lens</p>
            </div>
          </div>
          
          <Button
            variant="default"
            size="sm"
            onClick={() => setShowSubmissionForm(true)}
            className="bg-gradient-to-r from-primary to-secondary text-black font-cta font-bold neon-glow-primary"
            iconName="Plus"
            iconPosition="left"
            iconSize={16}
          >
            Share Photo
          </Button>
        </div>
      </div>
      {/* Photo Grid */}
      <div className="p-4">
        {photos?.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="Camera" size={48} className="mx-auto text-text-secondary/50 mb-4" />
            <h3 className="font-cta font-semibold text-text-secondary mb-2">No photos yet</h3>
            <p className="text-text-secondary/70 text-sm mb-4">Be the first to share your street culture experience</p>
            <Button
              variant="outline"
              onClick={() => setShowSubmissionForm(true)}
              className="border-primary text-primary hover:bg-primary/10"
              iconName="Camera"
              iconPosition="left"
              iconSize={16}
            >
              Upload First Photo
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {photos?.map((photo) => (
              <div
                key={photo?.id}
                onClick={() => setSelectedPhoto(photo)}
                className="relative group cursor-pointer rounded-lg overflow-hidden aspect-square bg-surface border border-border hover:border-primary/50 transition-all duration-300 spray-paint-hover"
              >
                <Image
                  src={photo?.image}
                  alt={photo?.caption}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end">
                  <div className="p-3 w-full">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-6 h-6 rounded-full overflow-hidden">
                        <Image
                          src={photo?.user?.avatar}
                          alt={photo?.user?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-white text-xs font-cta font-medium">
                        {photo?.user?.name}
                      </span>
                    </div>
                    <p className="text-white text-xs line-clamp-2">{photo?.caption}</p>
                    <div className="flex items-center space-x-3 mt-2 text-xs text-white/70">
                      <div className="flex items-center space-x-1">
                        <Icon name="Heart" size={12} />
                        <span>{photo?.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="MapPin" size={12} />
                        <span>{photo?.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Photo Detail Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <Image
                    src={selectedPhoto?.user?.avatar}
                    alt={selectedPhoto?.user?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-cta font-semibold text-foreground">{selectedPhoto?.user?.name}</h3>
                  <p className="text-text-secondary text-xs">{selectedPhoto?.location}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedPhoto(null)}
                className="text-text-secondary hover:text-foreground"
                iconName="X"
                iconSize={20}
              />
            </div>
            
            <div className="aspect-square overflow-hidden">
              <Image
                src={selectedPhoto?.image}
                alt={selectedPhoto?.caption}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-4">
              <p className="text-foreground mb-3">{selectedPhoto?.caption}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-text-secondary">
                  <div className="flex items-center space-x-1">
                    <Icon name="Heart" size={16} />
                    <span>{selectedPhoto?.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="MessageCircle" size={16} />
                    <span>{selectedPhoto?.comments}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={16} />
                    <span>{selectedPhoto?.timestamp}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary/30 text-primary hover:bg-primary/10"
                    iconName="Heart"
                    iconSize={14}
                  >
                    Like
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-secondary/30 text-secondary hover:bg-secondary/10"
                    iconName="Share"
                    iconSize={14}
                  >
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Photo Submission Form */}
      {showSubmissionForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl max-w-md w-full">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-headline font-bold text-lg text-foreground">Share Your Culture</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSubmissionForm(false)}
                className="text-text-secondary hover:text-foreground"
                iconName="X"
                iconSize={20}
              />
            </div>
            
            <div className="p-4 space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Icon name="Upload" size={32} className="mx-auto text-text-secondary mb-2" />
                <p className="text-text-secondary text-sm mb-2">Drop your photo here or click to browse</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary text-primary hover:bg-primary/10"
                  iconName="Camera"
                  iconPosition="left"
                  iconSize={14}
                >
                  Choose Photo
                </Button>
              </div>
              
              <div>
                <label className="block text-sm font-cta font-medium text-foreground mb-2">
                  Caption
                </label>
                <textarea
                  placeholder="Tell us about this moment..."
                  className="w-full p-3 bg-surface border border-border rounded-lg text-foreground placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 resize-none"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-cta font-medium text-foreground mb-2">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Where was this taken?"
                  className="w-full p-3 bg-surface border border-border rounded-lg text-foreground placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                />
              </div>
              
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => setShowSubmissionForm(false)}
                  className="border-border text-text-secondary hover:bg-surface"
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  fullWidth
                  onClick={() => handlePhotoSubmit({})}
                  className="bg-gradient-to-r from-primary to-secondary text-black font-cta font-bold neon-glow-primary"
                  iconName="Upload"
                  iconPosition="left"
                  iconSize={16}
                >
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityPhotos;