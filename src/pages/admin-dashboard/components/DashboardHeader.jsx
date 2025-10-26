import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DashboardHeader = ({ user, onNotificationClick, onSettingsClick }) => {
  return (
    <div className="bg-card/95 backdrop-blur-md border-b border-border p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center neon-glow-primary">
            <span className="font-accent text-lg font-bold text-black">A</span>
          </div>
          <div>
            <h1 className="font-headline font-bold text-2xl text-primary glitch-text">
              Admin Command Center
            </h1>
            <p className="text-text-secondary font-body">
              Zarządzaj kulturą ulicy • Manage the street culture
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-3 px-4 py-2 bg-surface/50 rounded-lg border border-border">
            <div className="w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center">
              <Icon name="User" size={16} className="text-black" />
            </div>
            <div>
              <p className="font-cta font-medium text-sm text-foreground">{user?.name}</p>
              <p className="text-xs text-text-secondary">{user?.role}</p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={onNotificationClick}
            className="text-text-secondary hover:text-primary relative"
            iconName="Bell"
            iconSize={20}
          >
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full neon-glow-accent"></div>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onSettingsClick}
            className="text-text-secondary hover:text-primary"
            iconName="Settings"
            iconSize={20}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;