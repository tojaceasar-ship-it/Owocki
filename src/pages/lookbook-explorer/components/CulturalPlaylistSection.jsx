import React, { useState } from 'react';
import Image from '../../../components/AppImage';

import Button from '../../../components/ui/Button';

const CulturalPlaylistSection = ({ playlists }) => {
  const [currentPlaylist, setCurrentPlaylist] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextPlaylist = () => {
    setCurrentPlaylist((prev) => (prev + 1) % playlists?.length);
  };

  const handlePrevPlaylist = () => {
    setCurrentPlaylist((prev) => (prev - 1 + playlists?.length) % playlists?.length);
  };

  const activePlaylist = playlists?.[currentPlaylist];

  return (
    <section className="py-16 bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-headline font-bold text-4xl text-primary mb-4 glitch-text">
            Cultural Soundtracks
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Every collection has its rhythm - curated playlists that capture the essence of street culture and creative expression
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Playlist Player */}
          <div className="space-y-6">
            <div className="bg-card/80 backdrop-blur-sm rounded-xl p-8 border border-border neon-glow-secondary">
              {/* Playlist Header */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 rounded-lg overflow-hidden">
                  <Image
                    src={activePlaylist?.coverArt}
                    alt={activePlaylist?.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-cta font-bold text-xl text-foreground mb-1">
                    {activePlaylist?.title}
                  </h3>
                  <p className="text-text-secondary text-sm">{activePlaylist?.description}</p>
                  <div className="flex items-center space-x-4 mt-2 text-xs">
                    <span className="text-primary">{activePlaylist?.trackCount} tracks</span>
                    <span className="text-secondary">{activePlaylist?.duration}</span>
                    <span className="text-accent">{activePlaylist?.genre}</span>
                  </div>
                </div>
              </div>

              {/* Player Controls */}
              <div className="flex items-center justify-center space-x-4 mb-6">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePrevPlaylist}
                  className="text-text-secondary hover:text-primary"
                  iconName="SkipBack"
                  iconSize={20}
                />
                
                <Button
                  variant="default"
                  size="icon"
                  onClick={handlePlayPause}
                  className="w-12 h-12 bg-gradient-to-r from-primary to-secondary text-black neon-glow-primary neon-pulse"
                  iconName={isPlaying ? "Pause" : "Play"}
                  iconSize={24}
                />
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNextPlaylist}
                  className="text-text-secondary hover:text-primary"
                  iconName="SkipForward"
                  iconSize={20}
                />
              </div>

              {/* Progress Bar */}
              <div className="space-y-2 mb-6">
                <div className="w-full h-2 bg-surface rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full w-1/3 transition-all duration-300"></div>
                </div>
                <div className="flex justify-between text-xs text-text-secondary">
                  <span>1:23</span>
                  <span>{activePlaylist?.duration}</span>
                </div>
              </div>

              {/* Playlist Navigation */}
              <div className="flex items-center justify-center space-x-2">
                {playlists?.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPlaylist(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentPlaylist 
                        ? 'bg-primary neon-glow-primary' :'bg-surface hover:bg-text-secondary'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Streaming Links */}
            <div className="flex flex-wrap gap-3">
              {activePlaylist?.streamingLinks?.map((link, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="border-border text-text-secondary hover:text-primary hover:border-primary"
                  iconName={link?.icon}
                  iconPosition="left"
                  iconSize={16}
                >
                  {link?.platform}
                </Button>
              ))}
            </div>
          </div>

          {/* Track List */}
          <div className="space-y-4">
            <h4 className="font-cta font-semibold text-lg text-foreground mb-4">
              Featured Tracks
            </h4>
            
            <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
              {activePlaylist?.tracks?.map((track, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-4 bg-card/50 rounded-lg border border-border hover:border-primary/30 transition-all duration-300 spray-paint-hover"
                >
                  <div className="w-10 h-10 rounded-lg overflow-hidden">
                    <Image
                      src={track?.albumArt}
                      alt={track?.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h5 className="font-cta font-medium text-foreground truncate">
                      {track?.title}
                    </h5>
                    <p className="text-text-secondary text-sm truncate">
                      {track?.artist}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-text-secondary">{track?.duration}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 text-text-secondary hover:text-primary"
                      iconName="Play"
                      iconSize={14}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Mood Tags */}
            <div className="pt-4 border-t border-border">
              <p className="text-sm text-text-secondary mb-3">Playlist Mood:</p>
              <div className="flex flex-wrap gap-2">
                {activePlaylist?.moodTags?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-surface/50 border border-border rounded-full text-xs font-cta text-text-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CulturalPlaylistSection;