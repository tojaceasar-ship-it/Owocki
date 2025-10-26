import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SystemSettings = ({ settings, onSettingsUpdate }) => {
  const [activeSection, setActiveSection] = useState('general');
  const [localSettings, setLocalSettings] = useState(settings);

  const sections = [
    { id: 'general', name: 'Ogólne', subtitle: 'General', icon: 'Settings' },
    { id: 'security', name: 'Bezpieczeństwo', subtitle: 'Security', icon: 'Shield' },
    { id: 'notifications', name: 'Powiadomienia', subtitle: 'Notifications', icon: 'Bell' },
    { id: 'integrations', name: 'Integracje', subtitle: 'Integrations', icon: 'Zap' }
  ];

  const languageOptions = [
    { value: 'pl', label: 'Polski' },
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' }
  ];

  const timezoneOptions = [
    { value: 'Europe/Warsaw', label: 'Europa/Warszawa (CET)' },
    { value: 'America/New_York', label: 'Ameryka/Nowy_Jork (EST)' },
    { value: 'Asia/Tokyo', label: 'Azja/Tokio (JST)' },
    { value: 'UTC', label: 'UTC' }
  ];

  const handleSettingChange = (section, key, value) => {
    setLocalSettings(prev => ({
      ...prev,
      [section]: {
        ...prev?.[section],
        [key]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    onSettingsUpdate(localSettings);
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Nazwa Platformy"
          description="Platform Name"
          value={localSettings?.general?.platformName}
          onChange={(e) => handleSettingChange('general', 'platformName', e?.target?.value)}
        />
        <Input
          label="Tagline"
          description="Platform tagline"
          value={localSettings?.general?.tagline}
          onChange={(e) => handleSettingChange('general', 'tagline', e?.target?.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Domyślny Język"
          description="Default Language"
          options={languageOptions}
          value={localSettings?.general?.defaultLanguage}
          onChange={(value) => handleSettingChange('general', 'defaultLanguage', value)}
        />
        <Select
          label="Strefa Czasowa"
          description="Timezone"
          options={timezoneOptions}
          value={localSettings?.general?.timezone}
          onChange={(value) => handleSettingChange('general', 'timezone', value)}
        />
      </div>

      <div className="space-y-4">
        <Checkbox
          label="Tryb Konserwacji"
          description="Maintenance Mode - Wyłącz dostęp dla użytkowników"
          checked={localSettings?.general?.maintenanceMode}
          onChange={(e) => handleSettingChange('general', 'maintenanceMode', e?.target?.checked)}
        />
        <Checkbox
          label="Rejestracja Publiczna"
          description="Public Registration - Pozwól na rejestrację nowych użytkowników"
          checked={localSettings?.general?.publicRegistration}
          onChange={(e) => handleSettingChange('general', 'publicRegistration', e?.target?.checked)}
        />
        <Checkbox
          label="Moderacja Treści"
          description="Content Moderation - Wymagaj zatwierdzenia nowych postów"
          checked={localSettings?.general?.contentModeration}
          onChange={(e) => handleSettingChange('general', 'contentModeration', e?.target?.checked)}
        />
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Maksymalna Liczba Prób Logowania"
          description="Max Login Attempts"
          type="number"
          value={localSettings?.security?.maxLoginAttempts}
          onChange={(e) => handleSettingChange('security', 'maxLoginAttempts', parseInt(e?.target?.value))}
        />
        <Input
          label="Czas Blokady (minuty)"
          description="Lockout Duration (minutes)"
          type="number"
          value={localSettings?.security?.lockoutDuration}
          onChange={(e) => handleSettingChange('security', 'lockoutDuration', parseInt(e?.target?.value))}
        />
      </div>

      <div className="space-y-4">
        <Checkbox
          label="Dwuetapowa Weryfikacja"
          description="Two-Factor Authentication - Wymagaj 2FA dla administratorów"
          checked={localSettings?.security?.requireTwoFactor}
          onChange={(e) => handleSettingChange('security', 'requireTwoFactor', e?.target?.checked)}
        />
        <Checkbox
          label="Silne Hasła"
          description="Strong Passwords - Wymagaj złożonych haseł"
          checked={localSettings?.security?.strongPasswords}
          onChange={(e) => handleSettingChange('security', 'strongPasswords', e?.target?.checked)}
        />
        <Checkbox
          label="Logowanie Aktywności"
          description="Activity Logging - Zapisuj działania użytkowników"
          checked={localSettings?.security?.activityLogging}
          onChange={(e) => handleSettingChange('security', 'activityLogging', e?.target?.checked)}
        />
      </div>

      <div className="bg-surface/30 border border-border rounded-lg p-4">
        <h4 className="font-cta font-bold text-foreground mb-2 flex items-center">
          <Icon name="AlertTriangle" size={16} className="text-warning mr-2" />
          Ostatnie Zdarzenia Bezpieczeństwa
        </h4>
        <div className="space-y-2 text-sm text-text-secondary">
          <p>• 3 nieudane próby logowania z IP: 192.168.1.100</p>
          <p>• Nowy administrator dodany: jan.kowalski@example.com</p>
          <p>• Zmiana hasła: admin@fruitshood.com</p>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="font-cta font-bold text-foreground">Powiadomienia Email</h4>
        <Checkbox
          label="Nowe Rejestracje"
          description="Powiadom o nowych użytkownikach"
          checked={localSettings?.notifications?.newRegistrations}
          onChange={(e) => handleSettingChange('notifications', 'newRegistrations', e?.target?.checked)}
        />
        <Checkbox
          label="Nowe Posty"
          description="Powiadom o nowych postach społeczności"
          checked={localSettings?.notifications?.newPosts}
          onChange={(e) => handleSettingChange('notifications', 'newPosts', e?.target?.checked)}
        />
        <Checkbox
          label="Zgłoszenia"
          description="Powiadom o zgłoszeniach moderacyjnych"
          checked={localSettings?.notifications?.reports}
          onChange={(e) => handleSettingChange('notifications', 'reports', e?.target?.checked)}
        />
      </div>

      <div className="space-y-4">
        <h4 className="font-cta font-bold text-foreground">Powiadomienia Push</h4>
        <Checkbox
          label="Aktywność Społeczności"
          description="Push notifications dla aktywności"
          checked={localSettings?.notifications?.communityActivity}
          onChange={(e) => handleSettingChange('notifications', 'communityActivity', e?.target?.checked)}
        />
        <Checkbox
          label="Aktualizacje Systemu"
          description="Powiadom o aktualizacjach platformy"
          checked={localSettings?.notifications?.systemUpdates}
          onChange={(e) => handleSettingChange('notifications', 'systemUpdates', e?.target?.checked)}
        />
      </div>

      <Input
        label="Email Administratora"
        description="Administrator Email"
        type="email"
        value={localSettings?.notifications?.adminEmail}
        onChange={(e) => handleSettingChange('notifications', 'adminEmail', e?.target?.value)}
      />
    </div>
  );

  const renderIntegrationsSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface/30 border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                <Icon name="Instagram" size={20} className="text-primary" />
              </div>
              <div>
                <h4 className="font-cta font-bold text-foreground">Instagram</h4>
                <p className="text-xs text-text-secondary">Social media integration</p>
              </div>
            </div>
            <div className={`w-3 h-3 rounded-full ${localSettings?.integrations?.instagram?.connected ? 'bg-success' : 'bg-error'}`}></div>
          </div>
          <Button
            variant={localSettings?.integrations?.instagram?.connected ? "outline" : "default"}
            size="sm"
            fullWidth
            iconName={localSettings?.integrations?.instagram?.connected ? "Unlink" : "Link"}
            iconPosition="left"
            iconSize={14}
          >
            {localSettings?.integrations?.instagram?.connected ? "Rozłącz" : "Połącz"}
          </Button>
        </div>

        <div className="bg-surface/30 border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                <Icon name="Mail" size={20} className="text-secondary" />
              </div>
              <div>
                <h4 className="font-cta font-bold text-foreground">Email Service</h4>
                <p className="text-xs text-text-secondary">SMTP configuration</p>
              </div>
            </div>
            <div className={`w-3 h-3 rounded-full ${localSettings?.integrations?.email?.connected ? 'bg-success' : 'bg-error'}`}></div>
          </div>
          <Button
            variant={localSettings?.integrations?.email?.connected ? "outline" : "default"}
            size="sm"
            fullWidth
            iconName="Settings"
            iconPosition="left"
            iconSize={14}
          >
            Konfiguruj
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-cta font-bold text-foreground">API Keys</h4>
        <Input
          label="Google Analytics ID"
          description="Tracking ID dla analityki"
          value={localSettings?.integrations?.googleAnalytics}
          onChange={(e) => handleSettingChange('integrations', 'googleAnalytics', e?.target?.value)}
          type="password"
        />
        <Input
          label="Stripe Public Key"
          description="Klucz publiczny dla płatności"
          value={localSettings?.integrations?.stripePublicKey}
          onChange={(e) => handleSettingChange('integrations', 'stripePublicKey', e?.target?.value)}
          type="password"
        />
      </div>
    </div>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'general':
        return renderGeneralSettings();
      case 'security':
        return renderSecuritySettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'integrations':
        return renderIntegrationsSettings();
      default:
        return null;
    }
  };

  return (
    <div className="bg-card/95 backdrop-blur-md border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-headline font-bold text-xl text-primary">
            Ustawienia Systemu
          </h2>
          <p className="text-text-secondary font-body text-sm">
            System Settings • Konfiguracja platformy
          </p>
        </div>
        <Button
          variant="default"
          iconName="Save"
          iconPosition="left"
          iconSize={16}
          className="bg-gradient-to-r from-primary to-secondary text-black font-cta font-bold neon-glow-primary"
          onClick={handleSaveSettings}
        >
          Zapisz Zmiany
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="space-y-2">
          {sections?.map((section) => (
            <button
              key={section?.id}
              onClick={() => setActiveSection(section?.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-cta font-medium text-left transition-all duration-300 ${
                activeSection === section?.id
                  ? 'bg-primary/20 text-primary neon-glow-primary border border-primary/30' :'text-text-secondary hover:text-primary hover:bg-surface/50'
              }`}
            >
              <Icon name={section?.icon} size={18} />
              <div>
                <div className="text-sm">{section?.name}</div>
                <div className="text-xs opacity-70">{section?.subtitle}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-surface/30 border border-border rounded-lg p-6">
            {renderSectionContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;