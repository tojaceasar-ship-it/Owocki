import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const primaryNavItems = [
    { name: 'Character Universe', path: '/character-universe', icon: 'Users' },
    { name: 'Community Gallery', path: '/community-gallery', icon: 'Image' },
    { name: 'Lookbook Explorer', path: '/lookbook-explorer', icon: 'BookOpen' },
    { name: 'Experience Center', path: '/interactive-experience-center', icon: 'Gamepad2' },
  ];

  const secondaryNavItems = [
    { name: 'Creator\'s Lab', path: '/creator-s-lab', icon: 'Palette' },
    { name: 'Cultural Map', path: '/cultural-map', icon: 'Map' },
    { name: 'Dashboard', path: '/personal-dashboard', icon: 'LayoutDashboard' },
    { name: 'Knowledge Hub', path: '/knowledge-hub', icon: 'BookMarked' },
    { name: 'Admin', path: '/admin-dashboard', icon: 'Settings' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const Logo = () => (
    <Link to="/homepage" className="flex items-center space-x-3 group">
      <div className="relative">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center neon-glow-primary group-hover:neon-pulse transition-all duration-300">
          <span className="font-accent text-lg font-bold text-black">F</span>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="font-headline font-bold text-xl text-primary glitch-text group-hover:animate-glitch">
          Fruits From Da Hood
        </span>
        <span className="font-body text-xs text-text-secondary -mt-1">
          Rep Your Neighborhood
        </span>
      </div>
    </Link>
  );

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-neon' 
          : 'bg-background/80 backdrop-blur-sm'
      }`}>
        <div className="concrete-texture absolute inset-0 opacity-5"></div>
        
        <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Logo />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {primaryNavItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`px-4 py-2 rounded-lg font-cta font-medium text-sm transition-all duration-300 spray-paint-hover flex items-center space-x-2 ${
                    isActivePath(item?.path)
                      ? 'bg-primary/20 text-primary neon-glow-primary border border-primary/30' :'text-text-secondary hover:text-primary hover:bg-surface/50 hover:neon-glow-primary'
                  }`}
                >
                  <Icon name={item?.icon} size={16} />
                  <span>{item?.name}</span>
                </Link>
              ))}

              {/* More Menu */}
              <div className="relative group">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-text-secondary hover:text-primary"
                  iconName="MoreHorizontal"
                  iconSize={16}
                >
                  More
                </Button>
                
                <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-lg shadow-neon-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="py-2">
                    {secondaryNavItems?.map((item) => (
                      <Link
                        key={item?.path}
                        to={item?.path}
                        className={`flex items-center space-x-3 px-4 py-2 text-sm font-cta transition-all duration-300 ${
                          isActivePath(item?.path)
                            ? 'bg-primary/20 text-primary border-r-2 border-primary' :'text-text-secondary hover:text-primary hover:bg-surface/50'
                        }`}
                      >
                        <Icon name={item?.icon} size={16} />
                        <span>{item?.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground neon-glow-secondary"
                iconName="Zap"
                iconPosition="left"
                iconSize={16}
              >
                Join Culture
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileMenu}
                className="text-text-secondary hover:text-primary"
                iconName={isMobileMenuOpen ? "X" : "Menu"}
                iconSize={24}
              />
            </div>
          </div>
        </nav>

        {/* Mobile Navigation Menu */}
        <div className={`lg:hidden transition-all duration-300 ${
          isMobileMenuOpen 
            ? 'max-h-screen opacity-100' :'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="bg-card/95 backdrop-blur-md border-t border-border">
            <div className="px-4 py-4 space-y-2">
              {/* Primary Navigation */}
              <div className="space-y-1">
                {primaryNavItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    onClick={closeMobileMenu}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-cta font-medium transition-all duration-300 ${
                      isActivePath(item?.path)
                        ? 'bg-primary/20 text-primary border border-primary/30 neon-glow-primary' :'text-text-secondary hover:text-primary hover:bg-surface/50'
                    }`}
                  >
                    <Icon name={item?.icon} size={20} />
                    <span>{item?.name}</span>
                  </Link>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-border my-4"></div>

              {/* Secondary Navigation */}
              <div className="space-y-1">
                <div className="px-4 py-2">
                  <span className="text-xs font-cta font-semibold text-text-secondary uppercase tracking-wider">
                    More Options
                  </span>
                </div>
                {secondaryNavItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    onClick={closeMobileMenu}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-cta transition-all duration-300 ${
                      isActivePath(item?.path)
                        ? 'bg-primary/20 text-primary border border-primary/30' :'text-text-secondary hover:text-primary hover:bg-surface/50'
                    }`}
                  >
                    <Icon name={item?.icon} size={18} />
                    <span>{item?.name}</span>
                  </Link>
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="pt-4 border-t border-border">
                <Button
                  variant="default"
                  fullWidth
                  className="bg-gradient-to-r from-primary to-secondary text-black font-cta font-bold neon-glow-primary"
                  iconName="Zap"
                  iconPosition="left"
                  iconSize={18}
                  onClick={closeMobileMenu}
                >
                  Join the Culture
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
};

export default Header;