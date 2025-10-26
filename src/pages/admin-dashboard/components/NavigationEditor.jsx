import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { client } from '../../../lib/sanity';

const NavigationEditor = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [footerItems, setFooterItems] = useState([]);
  const [newMenuItem, setNewMenuItem] = useState({ label: '', url: '' });
  const [newFooterItem, setNewFooterItem] = useState({ label: '', url: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNavigationData = async () => {
      try {
        const menuData = await client.fetch('*[_type == "navigationMenu"]');
        const footerData = await client.fetch('*[_type == "navigationFooter"]');
        setMenuItems(menuData.length > 0 ? menuData[0].items.map((item, index) => ({ id: index + 1, label: item.label, url: item.url, status: item.status })) : []);
        setFooterItems(footerData.length > 0 ? footerData[0].items.map((item, index) => ({ id: index + 1, label: item.label, url: item.url, status: item.status })) : []);
      } catch (error) {
        console.error('Error fetching navigation data from Sanity:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNavigationData();
  }, []);

  const addMenuItem = () => {
    if (newMenuItem.label && newMenuItem.url) {
      setMenuItems([...menuItems, { id: menuItems.length + 1, ...newMenuItem, status: 'active' }]);
      setNewMenuItem({ label: '', url: '' });
      // TODO: Update Sanity CMS with new item
    }
  };

  const addFooterItem = () => {
    if (newFooterItem.label && newFooterItem.url) {
      setFooterItems([...footerItems, { id: footerItems.length + 1, ...newFooterItem, status: 'active' }]);
      setNewFooterItem({ label: '', url: '' });
      // TODO: Update Sanity CMS with new item
    }
  };

  const updateMenuItem = (id, field, value) => {
    setMenuItems(menuItems.map(item => item.id === id ? { ...item, [field]: value } : item));
    // TODO: Update Sanity CMS with changes
  };

  const updateFooterItem = (id, field, value) => {
    setFooterItems(footerItems.map(item => item.id === id ? { ...item, [field]: value } : item));
    // TODO: Update Sanity CMS with changes
  };

  const deleteMenuItem = (id) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
    // TODO: Update Sanity CMS with deletion
  };

  const deleteFooterItem = (id) => {
    setFooterItems(footerItems.filter(item => item.id !== id));
  };

  if (loading) {
    return <div>Loading navigation data...</div>;
  }

  return (
    <div className="bg-card/95 backdrop-blur-md border border-border rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-headline font-bold text-xl text-primary">
            Edytor Nawigacji
          </h2>
          <p className="text-text-secondary font-body text-sm">
            Navigation Editor • Zarządzaj linkami menu i stopki
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

      {/* Menu Navigation Editor */}
      <div className="mb-8">
        <h3 className="font-cta font-bold text-lg text-foreground mb-4">Menu Nawigacyjne</h3>
        <div className="space-y-4 mb-4">
          {menuItems.map(item => (
            <div key={item.id} className="bg-surface/50 border border-border rounded-lg p-4 spray-paint-hover flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-grow">
                <Input
                  value={item.label}
                  onChange={(e) => updateMenuItem(item.id, 'label', e.target.value)}
                  placeholder="Etykieta"
                  className="w-1/3"
                />
                <Input
                  value={item.url}
                  onChange={(e) => updateMenuItem(item.id, 'url', e.target.value)}
                  placeholder="URL"
                  className="w-2/3"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="Trash2"
                  iconSize={16}
                  className="text-error hover:bg-error/20"
                  onClick={() => deleteMenuItem(item.id)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  iconName={item.status === 'active' ? 'Eye' : 'EyeOff'}
                  iconSize={16}
                  className={item.status === 'active' ? 'text-success hover:bg-success/20' : 'text-text-secondary hover:bg-surface/50'}
                  onClick={() => updateMenuItem(item.id, 'status', item.status === 'active' ? 'inactive' : 'active')}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-4 mb-6">
          <Input
            value={newMenuItem.label}
            onChange={(e) => setNewMenuItem({ ...newMenuItem, label: e.target.value })}
            placeholder="Nowa etykieta"
            className="w-1/3"
          />
          <Input
            value={newMenuItem.url}
            onChange={(e) => setNewMenuItem({ ...newMenuItem, url: e.target.value })}
            placeholder="Nowy URL"
            className="w-2/3"
          />
          <Button
            variant="default"
            iconName="Plus"
            iconPosition="left"
            iconSize={16}
            className="bg-primary text-black font-cta font-bold neon-glow-primary"
            onClick={addMenuItem}
          >
            Dodaj
          </Button>
        </div>
      </div>

      {/* Footer Navigation Editor */}
      <div>
        <h3 className="font-cta font-bold text-lg text-foreground mb-4">Nawigacja w Stopce</h3>
        <div className="space-y-4 mb-4">
          {footerItems.map(item => (
            <div key={item.id} className="bg-surface/50 border border-border rounded-lg p-4 spray-paint-hover flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-grow">
                <Input
                  value={item.label}
                  onChange={(e) => updateFooterItem(item.id, 'label', e.target.value)}
                  placeholder="Etykieta"
                  className="w-1/3"
                />
                <Input
                  value={item.url}
                  onChange={(e) => updateFooterItem(item.id, 'url', e.target.value)}
                  placeholder="URL"
                  className="w-2/3"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="Trash2"
                  iconSize={16}
                  className="text-error hover:bg-error/20"
                  onClick={() => deleteFooterItem(item.id)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  iconName={item.status === 'active' ? 'Eye' : 'EyeOff'}
                  iconSize={16}
                  className={item.status === 'active' ? 'text-success hover:bg-success/20' : 'text-text-secondary hover:bg-surface/50'}
                  onClick={() => updateFooterItem(item.id, 'status', item.status === 'active' ? 'inactive' : 'active')}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <Input
            value={newFooterItem.label}
            onChange={(e) => setNewFooterItem({ ...newFooterItem, label: e.target.value })}
            placeholder="Nowa etykieta"
            className="w-1/3"
          />
          <Input
            value={newFooterItem.url}
            onChange={(e) => setNewFooterItem({ ...newFooterItem, url: e.target.value })}
            placeholder="Nowy URL"
            className="w-2/3"
          />
          <Button
            variant="default"
            iconName="Plus"
            iconPosition="left"
            iconSize={16}
            className="bg-primary text-black font-cta font-bold neon-glow-primary"
            onClick={addFooterItem}
          >
            Dodaj
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NavigationEditor;
