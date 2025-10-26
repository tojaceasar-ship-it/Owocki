import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const GlobalSettings = () => {
  const [settings, setSettings] = useState({
    siteTitle: 'Fruits From Da Hood',
    siteDescription: 'A premium streetwear brand inspired by urban culture and unique fruit characters.',
    seoTitle: 'Fruits From Da Hood | Urban Streetwear',
    seoDescription: 'Discover premium streetwear inspired by urban culture. Shop unique designs and join the Fruits From Da Hood movement.',
    ogImage: 'https://example.com/og-image.jpg',
    favicon: 'https://example.com/favicon.ico'
  });

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-card/95 backdrop-blur-md border border-border rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-headline font-bold text-xl text-primary">
            Ustawienia Globalne
          </h2>
          <p className="text-text-secondary font-body text-sm">
            Global Settings • Zarządzaj tytułami, opisami i metadanymi SEO
          </p>
        </div>
        <Button
          variant="default"
          iconName="Save"
          iconPosition="left"
          iconSize={16}
          className="bg-gradient-to-r from-primary to-secondary text-black font-cta font-bold neon-glow-primary"
        >
          Zapisz Zmiany
        </Button>
      </div>

      <div className="space-y-6">
        <div className="bg-surface/50 border border-border rounded-lg p-4 spray-paint-hover">
          <h3 className="font-cta font-bold text-lg text-foreground mb-4">Podstawowe Ustawienia</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Tytuł Strony"
              value={settings.siteTitle}
              onChange={(e) => updateSetting('siteTitle', e.target.value)}
            />
            <Input
              label="Opis Strony"
              value={settings.siteDescription}
              onChange={(e) => updateSetting('siteDescription', e.target.value)}
              multiline
              rows={3}
            />
          </div>
        </div>

        <div className="bg-surface/50 border border-border rounded-lg p-4 spray-paint-hover">
          <h3 className="font-cta font-bold text-lg text-foreground mb-4">Ustawienia SEO</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Tytuł SEO"
              value={settings.seoTitle}
              onChange={(e) => updateSetting('seoTitle', e.target.value)}
            />
            <Input
              label="Opis SEO"
              value={settings.seoDescription}
              onChange={(e) => updateSetting('seoDescription', e.target.value)}
              multiline
              rows={3}
            />
          </div>
        </div>

        <div className="bg-surface/50 border border-border rounded-lg p-4 spray-paint-hover">
          <h3 className="font-cta font-bold text-lg text-foreground mb-4">Obrazy</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Obraz Open Graph"
              value={settings.ogImage}
              onChange={(e) => updateSetting('ogImage', e.target.value)}
              placeholder="URL do obrazu OG"
            />
            <Input
              label="Favicon"
              value={settings.favicon}
              onChange={(e) => updateSetting('favicon', e.target.value)}
              placeholder="URL do favicon"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalSettings;
