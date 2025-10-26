import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ContentManagement = ({ contentData, onContentUpdate }) => {
  const [activeTab, setActiveTab] = useState('characters');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'characters', name: 'Postacie', subtitle: 'Characters', icon: 'Users' },
    { id: 'community', name: 'Społeczność', subtitle: 'Community', icon: 'MessageSquare' },
    { id: 'products', name: 'Produkty', subtitle: 'Products', icon: 'Package' },
    { id: 'content', name: 'Treści', subtitle: 'Content', icon: 'FileText' }
  ];

  const renderCharacterContent = () => (
    <div className="space-y-4">
      {contentData?.characters?.map((character) => (
        <div key={character?.id} className="bg-surface/50 border border-border rounded-lg p-4 spray-paint-hover">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-lg">{character?.emoji}</span>
              </div>
              <div>
                <h3 className="font-cta font-bold text-foreground">{character?.name}</h3>
                <p className="text-sm text-text-secondary">{character?.description}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-xs text-primary">Status: {character?.status}</span>
                  <span className="text-xs text-text-secondary">Ostatnia aktualizacja: {character?.lastUpdate}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                iconName="Edit3"
                iconSize={16}
                className="text-text-secondary hover:text-primary"
                onClick={() => onContentUpdate('edit-character', character?.id)}
              />
              <Button
                variant="ghost"
                size="icon"
                iconName="Eye"
                iconSize={16}
                className="text-text-secondary hover:text-secondary"
                onClick={() => onContentUpdate('preview-character', character?.id)}
              />
              <Button
                variant="ghost"
                size="icon"
                iconName="MoreVertical"
                iconSize={16}
                className="text-text-secondary hover:text-accent"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCommunityContent = () => (
    <div className="space-y-4">
      {contentData?.communityPosts?.map((post) => (
        <div key={post?.id} className="bg-surface/50 border border-border rounded-lg p-4 spray-paint-hover">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center">
                <Icon name="User" size={16} className="text-black" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-cta font-medium text-foreground">{post?.author}</h4>
                  <span className="text-xs text-text-secondary">{post?.timestamp}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-cta ${
                    post?.status === 'approved' ? 'bg-success/20 text-success' :
                    post?.status === 'pending'? 'bg-warning/20 text-warning' : 'bg-error/20 text-error'
                  }`}>
                    {post?.status}
                  </span>
                </div>
                <p className="text-sm text-text-secondary mb-2">{post?.content}</p>
                <div className="flex items-center space-x-4 text-xs text-text-secondary">
                  <span>❤️ {post?.likes}</span>
                  <span>💬 {post?.comments}</span>
                  <span>📤 {post?.shares}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                iconName="Check"
                iconSize={16}
                className="text-success hover:bg-success/20"
                onClick={() => onContentUpdate('approve-post', post?.id)}
              />
              <Button
                variant="ghost"
                size="icon"
                iconName="X"
                iconSize={16}
                className="text-error hover:bg-error/20"
                onClick={() => onContentUpdate('reject-post', post?.id)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'characters':
        return renderCharacterContent();
      case 'community':
        return renderCommunityContent();
      case 'products':
        return <div className="text-center py-8 text-text-secondary">Zarządzanie produktami w trakcie rozwoju</div>;
      case 'content':
        return <div className="text-center py-8 text-text-secondary">Zarządzanie treściami w trakcie rozwoju</div>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-card/95 backdrop-blur-md border border-border rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-headline font-bold text-xl text-primary">
            Zarządzanie Treścią
          </h2>
          <p className="text-text-secondary font-body text-sm">
            Content Management • Edytuj i moderuj zawartość platformy
          </p>
        </div>
        <Button
          variant="default"
          iconName="Plus"
          iconPosition="left"
          iconSize={16}
          className="bg-gradient-to-r from-primary to-secondary text-black font-cta font-bold neon-glow-primary"
          onClick={() => onContentUpdate('create-new', activeTab)}
        >
          Dodaj Nowy
        </Button>
      </div>
      {/* Search Bar */}
      <div className="mb-6">
        <Input
          type="search"
          placeholder="Szukaj treści..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
          className="max-w-md"
        />
      </div>
      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-surface/30 p-1 rounded-lg">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-cta font-medium text-sm transition-all duration-300 ${
              activeTab === tab?.id
                ? 'bg-primary/20 text-primary neon-glow-primary border border-primary/30' :'text-text-secondary hover:text-primary hover:bg-surface/50'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <div className="text-left">
              <div>{tab?.name}</div>
              <div className="text-xs opacity-70">{tab?.subtitle}</div>
            </div>
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="max-h-96 overflow-y-auto">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ContentManagement;