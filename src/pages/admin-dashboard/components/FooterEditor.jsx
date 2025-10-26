import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FooterEditor = () => {
  const [footerContent, setFooterContent] = useState({
    about: {
      title: 'About Fruits From Da Hood',
      description: 'A premium streetwear brand inspired by urban culture and unique fruit characters. Join the movement that celebrates authentic street style.'
    },
    copyright: {
      text: '© 2025 Fruits From Da Hood. All rights reserved.'
    }
  });

  const [socialLinks, setSocialLinks] = useState([
    { id: 1, platform: 'Instagram', url: 'https://instagram.com/fruitsfromdahood', icon: 'Instagram', status: 'active' },
    { id: 2, platform: 'Facebook', url: 'https://facebook.com/fruitsfromdahood', icon: 'Facebook', status: 'active' },
    { id: 3, platform: 'Twitter', url: 'https://twitter.com/fruitsdahood', icon: 'Twitter', status: 'active' },
    { id: 4, platform: 'TikTok', url: 'https://tiktok.com/@fruitsfromdahood', icon: 'Music', status: 'active' }
  ]);

  const [newSocialLink, setNewSocialLink] = useState({ platform: '', url: '', icon: '' });

  const updateFooterContent = (section, field, value) => {
    setFooterContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const addSocialLink = () => {
    if (newSocialLink.platform && newSocialLink.url && newSocialLink.icon) {
      setSocialLinks([...socialLinks, { id: socialLinks.length + 1, ...newSocialLink, status: 'active' }]);
      setNewSocialLink({ platform: '', url: '', icon: '' });
    }
  };

  const updateSocialLink = (id, field, value) => {
    setSocialLinks(socialLinks.map(link => link.id === id ? { ...link, [field]: value } : link));
  };

  const deleteSocialLink = (id) => {
    setSocialLinks(socialLinks.filter(link => link.id !== id));
  };

  return (
    <div className="bg-card/95 backdrop-blur-md border border-border rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-headline font-bold text-xl text-primary">
            Edytor Stopki
          </h2>
          <p className="text-text-secondary font-body text-sm">
            Footer Editor • Zarządzaj treścią stopki i linkami społecznościowymi
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

      {/* Footer Content Editor */}
      <div className="mb-8">
        <h3 className="font-cta font-bold text-lg text-foreground mb-4">Treść Stopki</h3>
        <div className="space-y-6">
          <div className="bg-surface/50 border border-border rounded-lg p-4 spray-paint-hover">
            <h4 className="font-cta font-medium text-foreground mb-2">Sekcja O Nas</h4>
            <Input
              label="Tytuł"
              value={footerContent.about.title}
              onChange={(e) => updateFooterContent('about', 'title', e.target.value)}
              className="mb-4"
            />
            <Input
              label="Opis"
              value={footerContent.about.description}
              onChange={(e) => updateFooterContent('about', 'description', e.target.value)}
              multiline
              rows={3}
            />
          </div>
          <div className="bg-surface/50 border border-border rounded-lg p-4 spray-paint-hover">
            <h4 className="font-cta font-medium text-foreground mb-2">Prawa Autorskie</h4>
            <Input
              label="Tekst"
              value={footerContent.copyright.text}
              onChange={(e) => updateFooterContent('copyright', 'text', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Social Links Editor */}
      <div>
        <h3 className="font-cta font-bold text-lg text-foreground mb-4">Linki Społecznościowe</h3>
        <div className="space-y-4 mb-4">
          {socialLinks.map(link => (
            <div key={link.id} className="bg-surface/50 border border-border rounded-lg p-4 spray-paint-hover flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-grow">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center neon-glow-primary">
                  <Icon name={link.icon} size={20} className="text-white" />
                </div>
                <Input
                  value={link.platform}
                  onChange={(e) => updateSocialLink(link.id, 'platform', e.target.value)}
                  placeholder="Platforma"
                  className="w-1/4"
                />
                <Input
                  value={link.url}
                  onChange={(e) => updateSocialLink(link.id, 'url', e.target.value)}
                  placeholder="URL"
                  className="w-2/4"
                />
                <Input
                  value={link.icon}
                  onChange={(e) => updateSocialLink(link.id, 'icon', e.target.value)}
                  placeholder="Ikona"
                  className="w-1/4"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="Trash2"
                  iconSize={16}
                  className="text-error hover:bg-error/20"
                  onClick={() => deleteSocialLink(link.id)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  iconName={link.status === 'active' ? 'Eye' : 'EyeOff'}
                  iconSize={16}
                  className={link.status === 'active' ? 'text-success hover:bg-success/20' : 'text-text-secondary hover:bg-surface/50'}
                  onClick={() => updateSocialLink(link.id, 'status', link.status === 'active' ? 'inactive' : 'active')}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <Input
            value={newSocialLink.platform}
            onChange={(e) => setNewSocialLink({ ...newSocialLink, platform: e.target.value })}
            placeholder="Nowa platforma"
            className="w-1/4"
          />
          <Input
            value={newSocialLink.url}
            onChange={(e) => setNewSocialLink({ ...newSocialLink, url: e.target.value })}
            placeholder="Nowy URL"
            className="w-2/4"
          />
          <Input
            value={newSocialLink.icon}
            onChange={(e) => setNewSocialLink({ ...newSocialLink, icon: e.target.value })}
            placeholder="Ikona"
            className="w-1/4"
          />
          <Button
            variant="default"
            iconName="Plus"
            iconPosition="left"
            iconSize={16}
            className="bg-primary text-black font-cta font-bold neon-glow-primary"
            onClick={addSocialLink}
          >
            Dodaj
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FooterEditor;
