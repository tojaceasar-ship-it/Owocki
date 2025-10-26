import React from 'react';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onActionClick }) => {
  const actions = [
    {
      id: 'new-character',
      title: 'Nowa Postać',
      subtitle: 'Add New Character',
      icon: 'Plus',
      color: 'primary',
      description: 'Stwórz nowego owocowego bohatera'
    },
    {
      id: 'manage-content',
      title: 'Zarządzaj Treścią',
      subtitle: 'Manage Content',
      icon: 'Edit3',
      color: 'secondary',
      description: 'Edytuj historie i opisy postaci'
    },
    {
      id: 'community-moderation',
      title: 'Moderacja',
      subtitle: 'Community Moderation',
      icon: 'Shield',
      color: 'accent',
      description: 'Sprawdź zgłoszenia społeczności'
    },
    {
      id: 'analytics',
      title: 'Analityka',
      subtitle: 'View Analytics',
      icon: 'BarChart3',
      color: 'success',
      description: 'Przejrzyj statystyki platformy'
    }
  ];

  return (
    <div className="bg-card/95 backdrop-blur-md border border-border rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-headline font-bold text-xl text-primary">
            Szybkie Akcje
          </h2>
          <p className="text-text-secondary font-body text-sm">
            Quick Actions • Najczęściej używane funkcje
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions?.map((action) => (
          <Button
            key={action?.id}
            variant="outline"
            className={`h-auto p-4 flex flex-col items-start space-y-3 text-left border-${action?.color}/30 hover:bg-${action?.color}/10 hover:border-${action?.color} transition-all duration-300 spray-paint-hover`}
            onClick={() => onActionClick(action?.id)}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${action?.color}/20 text-${action?.color} neon-glow-${action?.color}`}>
              <Button
                variant="ghost"
                size="icon"
                iconName={action?.icon}
                iconSize={20}
                className="p-0 h-auto w-auto"
              />
            </div>
            <div className="space-y-1">
              <h3 className="font-cta font-bold text-sm text-foreground">
                {action?.title}
              </h3>
              <p className="text-xs text-text-secondary font-body">
                {action?.subtitle}
              </p>
              <p className="text-xs text-text-secondary/70 font-body">
                {action?.description}
              </p>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;