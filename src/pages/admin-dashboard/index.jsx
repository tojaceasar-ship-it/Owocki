import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import DashboardHeader from './components/DashboardHeader';
import StatsOverview from './components/StatsOverview';
import QuickActions from './components/QuickActions';
import ContentManagement from './components/ContentManagement';
import AnalyticsPanel from './components/AnalyticsPanel';
import UserManagement from './components/UserManagement';
import SystemSettings from './components/SystemSettings';
import NavigationEditor from './components/NavigationEditor';
import FooterEditor from './components/FooterEditor';
import GlobalSettings from './components/GlobalSettings';
import SectionEditor from './components/SectionEditor';
import WebshopEditor from './components/WebshopEditor';
import { client } from '../../lib/sanity';

const AdminDashboard = () => {
  const [activeView, setActiveView] = useState('overview');
  const [currentUser] = useState({
    name: "Admin Kowalski",
    role: "Super Administrator",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
  });

  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [contentData, setContentData] = useState({ characters: [], communityPosts: [] });
  const [analyticsData, setAnalyticsData] = useState({});
  const [users, setUsers] = useState([]);
  const [systemSettings, setSystemSettings] = useState({});

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        // Fetch stats
        const statsData = await client.fetch('*[_type == "dashboardStats"]');
        if (statsData.length > 0) {
          setStats(statsData[0]);
        }

        // Fetch content data
        const contentData = await client.fetch('*[_type == "adminContent"]');
        if (contentData.length > 0) {
          setContentData({
            characters: contentData[0].characters || [],
            communityPosts: contentData[0].communityPosts || []
          });
        }

        // Fetch analytics data
        const analyticsData = await client.fetch('*[_type == "analyticsData"]');
        if (analyticsData.length > 0) {
          setAnalyticsData(analyticsData[0]);
        }

        // Fetch users data
        const usersData = await client.fetch('*[_type == "adminUsers"]');
        if (usersData.length > 0) {
          setUsers(usersData[0].users || []);
        }

        // Fetch system settings
        const settingsData = await client.fetch('*[_type == "systemSettings"]');
        if (settingsData.length > 0) {
          setSystemSettings(settingsData[0]);
        }
      } catch (error) {
        console.error('Error fetching dashboard data from Sanity:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case 'new-character': setActiveView('content');
        break;
      case 'manage-content': setActiveView('content');
        break;
      case 'community-moderation': setActiveView('users');
        break;
      case 'analytics': setActiveView('analytics');
        break;
      default:
        console.log(`Action: ${actionId}`);
    }
  };

  const handleContentUpdate = (action, id) => {
    console.log(`Content action: ${action} for ID: ${id}`);
    // Handle content updates
  };

  const handleUserAction = (action, userId) => {
    console.log(`User action: ${action} for user: ${userId}`);
    // Handle user actions
  };

  const handleSettingsUpdate = (newSettings) => {
    console.log('Settings updated:', newSettings);
    // Handle settings updates
  };

  const handleNotificationClick = () => {
    console.log('Notifications clicked');
  };

  const handleSettingsClick = () => {
    setActiveView('settings');
  };

  const renderMainContent = () => {
    switch (activeView) {
      case 'overview':
        return (
          <>
            <StatsOverview stats={stats} />
            <QuickActions onActionClick={handleQuickAction} />
            <AnalyticsPanel analyticsData={analyticsData} />
          </>
        );
      case 'content':
        return (
          <ContentManagement 
            contentData={contentData} 
            onContentUpdate={handleContentUpdate} 
          />
        );
      case 'analytics':
        return <AnalyticsPanel analyticsData={analyticsData} />;
      case 'users':
        return (
          <UserManagement 
            users={users} 
            onUserAction={handleUserAction} 
          />
        );
      case 'settings':
        return (
          <SystemSettings 
            settings={systemSettings} 
            onSettingsUpdate={handleSettingsUpdate} 
          />
        );
      case 'navigation':
        return <NavigationEditor />;
      case 'footer':
        return <FooterEditor />;
      case 'global':
        return <GlobalSettings />;
      case 'sections':
        return <SectionEditor />;
      case 'webshop':
        return <WebshopEditor />;
      default:
        return (
          <>
            <StatsOverview stats={stats} />
            <QuickActions onActionClick={handleQuickAction} />
          </>
        );
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Fruits From Da Hood</title>
        <meta name="description" content="Comprehensive admin dashboard for managing street culture platform with character-driven storytelling and community features." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <div className="concrete-texture fixed inset-0 opacity-5 pointer-events-none"></div>
        
        <DashboardHeader 
          user={currentUser}
          onNotificationClick={handleNotificationClick}
          onSettingsClick={handleSettingsClick}
        />

        <div className="relative">
          {/* Navigation Tabs */}
          <div className="bg-card/80 backdrop-blur-md border-b border-border sticky top-16 z-30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex space-x-1 py-4 overflow-x-auto">
                {[
                  { id: 'overview', name: 'Przegląd', subtitle: 'Overview' },
                  { id: 'content', name: 'Treści', subtitle: 'Content' },
                  { id: 'analytics', name: 'Analityka', subtitle: 'Analytics' },
                  { id: 'users', name: 'Użytkownicy', subtitle: 'Users' },
                  { id: 'settings', name: 'Ustawienia', subtitle: 'Settings' },
                  { id: 'navigation', name: 'Nawigacja', subtitle: 'Navigation' },
                  { id: 'footer', name: 'Stopka', subtitle: 'Footer' },
                  { id: 'global', name: 'Globalne', subtitle: 'Global' },
                  { id: 'sections', name: 'Sekcje', subtitle: 'Sections' },
                  { id: 'webshop', name: 'Sklep', subtitle: 'Webshop' }
                ]?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveView(tab?.id)}
                    className={`flex flex-col items-center px-6 py-3 rounded-lg font-cta font-medium text-sm transition-all duration-300 whitespace-nowrap ${
                      activeView === tab?.id
                        ? 'bg-primary/20 text-primary neon-glow-primary border border-primary/30' :'text-text-secondary hover:text-primary hover:bg-surface/50'
                    }`}
                  >
                    <span>{tab?.name}</span>
                    <span className="text-xs opacity-70">{tab?.subtitle}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {renderMainContent()}
          </main>
        </div>

        {/* Footer */}
        <footer className="bg-card/95 backdrop-blur-md border-t border-border mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <span className="font-accent text-sm font-bold text-black">F</span>
                </div>
                <div>
                  <p className="font-headline font-bold text-primary">Admin Command Center</p>
                  <p className="text-xs text-text-secondary">
                    © {new Date()?.getFullYear()} Fruits From Da Hood. Wszystkie prawa zastrzeżone.
                  </p>
                </div>
              </div>
              <div className="text-xs text-text-secondary">
                Wersja 2.1.0 • Ostatnia aktualizacja: 27 stycznia 2025
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default AdminDashboard;