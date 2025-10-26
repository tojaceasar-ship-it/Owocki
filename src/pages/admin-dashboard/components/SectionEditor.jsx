import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SectionEditor = () => {
  const [sections, setSections] = useState([
    { id: 1, title: 'Hero Section', page: 'Homepage', status: 'active', order: 1 },
    { id: 2, title: 'Featured Products', page: 'Homepage', status: 'active', order: 2 },
    { id: 3, title: 'Character Spotlight', page: 'Homepage', status: 'active', order: 3 },
    { id: 4, title: 'Newsletter Signup', page: 'Homepage', status: 'inactive', order: 4 },
    { id: 5, title: 'Product Grid', page: 'Shop', status: 'active', order: 1 }
  ]);

  const [newSection, setNewSection] = useState({ title: '', page: '' });

  const addSection = () => {
    if (newSection.title && newSection.page) {
      setSections([...sections, { id: sections.length + 1, ...newSection, status: 'active', order: sections.length + 1 }]);
      setNewSection({ title: '', page: '' });
    }
  };

  const updateSection = (id, field, value) => {
    setSections(sections.map(section => section.id === id ? { ...section, [field]: value } : section));
  };

  const deleteSection = (id) => {
    setSections(sections.filter(section => section.id !== id));
  };

  const duplicateSection = (id) => {
    const sectionToDuplicate = sections.find(section => section.id === id);
    if (sectionToDuplicate) {
      setSections([...sections, { ...sectionToDuplicate, id: sections.length + 1, title: `${sectionToDuplicate.title} (Copy)`, order: sections.length + 1 }]);
    }
  };

  const moveSectionUp = (id) => {
    const index = sections.findIndex(section => section.id === id);
    if (index > 0) {
      const updatedSections = [...sections];
      updatedSections[index].order -= 1;
      updatedSections[index - 1].order += 1;
      setSections(updatedSections.sort((a, b) => a.order - b.order));
    }
  };

  const moveSectionDown = (id) => {
    const index = sections.findIndex(section => section.id === id);
    if (index < sections.length - 1) {
      const updatedSections = [...sections];
      updatedSections[index].order += 1;
      updatedSections[index + 1].order -= 1;
      setSections(updatedSections.sort((a, b) => a.order - b.order));
    }
  };

  return (
    <div className="bg-card/95 backdrop-blur-md border border-border rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-headline font-bold text-xl text-primary">
            Edytor Sekcji
          </h2>
          <p className="text-text-secondary font-body text-sm">
            Section Editor • Zarządzaj sekcjami stron, ich kolejnością i duplikacją
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

      <div className="space-y-4 mb-6">
        {sections.map(section => (
          <div key={section.id} className="bg-surface/50 border border-border rounded-lg p-4 spray-paint-hover flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-grow">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center neon-glow-primary">
                <Icon name="Layout" size={20} className="text-white" />
              </div>
              <Input
                value={section.title}
                onChange={(e) => updateSection(section.id, 'title', e.target.value)}
                placeholder="Tytuł sekcji"
                className="w-1/3"
              />
              <Input
                value={section.page}
                onChange={(e) => updateSection(section.id, 'page', e.target.value)}
                placeholder="Strona"
                className="w-1/3"
              />
              <Input
                value={section.order}
                onChange={(e) => updateSection(section.id, 'order', parseInt(e.target.value) || 0)}
                placeholder="Kolejność"
                type="number"
                className="w-1/6"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                iconName="ArrowUp"
                iconSize={16}
                className="text-text-secondary hover:text-primary"
                onClick={() => moveSectionUp(section.id)}
              />
              <Button
                variant="ghost"
                size="icon"
                iconName="ArrowDown"
                iconSize={16}
                className="text-text-secondary hover:text-primary"
                onClick={() => moveSectionDown(section.id)}
              />
              <Button
                variant="ghost"
                size="icon"
                iconName="Copy"
                iconSize={16}
                className="text-text-secondary hover:text-secondary"
                onClick={() => duplicateSection(section.id)}
              />
              <Button
                variant="ghost"
                size="icon"
                iconName="Trash2"
                iconSize={16}
                className="text-error hover:bg-error/20"
                onClick={() => deleteSection(section.id)}
              />
              <Button
                variant="ghost"
                size="icon"
                iconName={section.status === 'active' ? 'Eye' : 'EyeOff'}
                iconSize={16}
                className={section.status === 'active' ? 'text-success hover:bg-success/20' : 'text-text-secondary hover:bg-surface/50'}
                onClick={() => updateSection(section.id, 'status', section.status === 'active' ? 'inactive' : 'active')}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-4">
        <Input
          value={newSection.title}
          onChange={(e) => setNewSection({ ...newSection, title: e.target.value })}
          placeholder="Nowa sekcja"
          className="w-1/2"
        />
        <Input
          value={newSection.page}
          onChange={(e) => setNewSection({ ...newSection, page: e.target.value })}
          placeholder="Strona"
          className="w-1/2"
        />
        <Button
          variant="default"
          iconName="Plus"
          iconPosition="left"
          iconSize={16}
          className="bg-primary text-black font-cta font-bold neon-glow-primary"
          onClick={addSection}
        >
          Dodaj Sekcję
        </Button>
      </div>
    </div>
  );
};

export default SectionEditor;
