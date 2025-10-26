import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggleCollapse }) => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  const navigationSections = [
    {
      title: 'Discover',
      items: [
        { name: 'Homepage', path: '/homepage', icon: 'Home', description: 'Welcome to the hood' },
        { name: 'Character Universe', path: '/character-universe', icon: 'Users', description: 'Meet the crew' },
        { name: 'Community Gallery', path: '/community-gallery', icon: 'Image', description: 'Street style showcase' },
        { name: 'Lookbook Explorer', path: '/lookbook-explorer', icon: 'BookOpen', description: 'Style inspiration' },
      ]
    },
    {
      title: 'Experience',
      items: [
        { name: 'Interactive Center', path: '/interactive-experience-center', icon: 'Gamepad2', description: 'Immersive experiences' },
        { name: 'Creator\'s Lab', path: '/creator-s-lab', icon: 'Palette', description: 'Design with us' },
        { name: 'Cultural Map', path: '/cultural-map', icon: 'Map', description: 'Explore the culture' },
      ]
    },
    {
      title: 'Personal',
      items: [
        { name: 'Dashboard', path: '/personal-dashboard', icon: 'LayoutDashboard', description: 'Your space' },
        { name: 'Knowledge Hub', path: '/knowledge-hub', icon: 'BookMarked', description: 'Learn & grow' },
      ]
    },
    {
      title: 'Admin',
      items: [
        { name: 'Admin Dashboard', path: '/admin-dashboard', icon: 'Settings', description: 'System control' },
      ]
    }
  ];

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const shouldShowExpanded = isCollapsed ? isHovered : true;

  return (
    <>
      <aside 
        className={`fixed left-0 top-16 bottom-0 z-40 bg-card/95 backdrop-blur-md border-r border-border transition-all duration-300 ${
          shouldShowExpanded ? 'w-64' : 'w-16'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="concrete-texture absolute inset-0 opacity-5"></div>
        
        <div className="relative h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              {shouldShowExpanded && (
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center neon-glow-primary">
                    <span className="font-accent text-sm font-bold text-black">F</span>
                  </div>
                  <div>
                    <h2 className="font-headline font-bold text-sm text-primary">Navigation</h2>
                    <p className="text-xs text-text-secondary">Explore the hood</p>
                  </div>
                </div>
              )}
              
              {onToggleCollapse && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onToggleCollapse}
                  className={`text-text-secondary hover:text-primary ${!shouldShowExpanded ? 'mx-auto' : ''}`}
                  iconName={isCollapsed ? "ChevronRight" : "ChevronLeft"}
                  iconSize={16}
                />
              )}
            </div>
          </div>

          {/* Navigation Content */}
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-6">
              {navigationSections?.map((section) => (
                <div key={section?.title} className="px-3">
                  {shouldShowExpanded && (
                    <h3 className="px-3 mb-3 text-xs font-cta font-semibold text-text-secondary uppercase tracking-wider">
                      {section?.title}
                    </h3>
                  )}
                  
                  <div className="space-y-1">
                    {section?.items?.map((item) => (
                      <Link
                        key={item?.path}
                        to={item?.path}
                        className={`group flex items-center px-3 py-2 rounded-lg font-cta font-medium text-sm transition-all duration-300 spray-paint-hover ${
                          isActivePath(item?.path)
                            ? 'bg-primary/20 text-primary neon-glow-primary border border-primary/30' :'text-text-secondary hover:text-primary hover:bg-surface/50 hover:neon-glow-primary'
                        }`}
                        title={!shouldShowExpanded ? item?.name : ''}
                      >
                        <Icon 
                          name={item?.icon} 
                          size={18} 
                          className={`flex-shrink-0 ${shouldShowExpanded ? 'mr-3' : 'mx-auto'}`}
                        />
                        
                        {shouldShowExpanded && (
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="truncate">{item?.name}</span>
                              {isActivePath(item?.path) && (
                                <div className="w-2 h-2 bg-primary rounded-full neon-glow-primary animate-neon-pulse"></div>
                              )}
                            </div>
                            <p className="text-xs text-text-secondary/70 truncate mt-0.5">
                              {item?.description}
                            </p>
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-border">
            {shouldShowExpanded ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-surface/50 rounded-lg">
                  <div className="w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} className="text-black" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-cta font-medium text-sm text-foreground truncate">Street Creator</p>
                    <p className="text-xs text-text-secondary truncate">Level 5 • Hood Legend</p>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground neon-glow-secondary"
                  iconName="Zap"
                  iconPosition="left"
                  iconSize={14}
                >
                  Join Culture
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-2">
                <div className="w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} className="text-black" />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-secondary hover:text-secondary neon-glow-secondary"
                  iconName="Zap"
                  iconSize={16}
                  title="Join Culture"
                />
              </div>
            )}
          </div>
        </div>
      </aside>
      {/* Main content offset */}
      <div className={`transition-all duration-300 ${shouldShowExpanded ? 'ml-64' : 'ml-16'}`}>
        {/* This div ensures main content doesn't overlap with sidebar */}
      </div>
    </>
  );
};

export default Sidebar;