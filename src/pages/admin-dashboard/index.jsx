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

const AdminDashboard = () => {
  const [activeView, setActiveView] = useState('overview');
  const [currentUser] = useState({
    name: "Admin Kowalski",
    role: "Super Administrator",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
  });

  // Mock data for dashboard
  const [dashboardStats] = useState({
    activeUsers: "2,847",
    todaySales: "15,420",
    newOrders: 127,
    engagement: 89
  });

  const [contentData] = useState({
    characters: [
      {
        id: 1,
        name: "Watermelon Willie",
        emoji: "🍉",
        description: "Główny bohater z czerwoną bluzą i złotym łańcuchem",
        status: "Aktywny",
        lastUpdate: "2025-01-20"
      },
      {
        id: 2,
        name: "Apple Annie",
        emoji: "🍎",
        description: "Streetowa artystka z talentem do graffiti",
        status: "W trakcie edycji",
        lastUpdate: "2025-01-18"
      },
      {
        id: 3,
        name: "Banana Bob",
        emoji: "🍌",
        description: "DJ i producent muzyczny z dzielnicy",
        status: "Nowy",
        lastUpdate: "2025-01-15"
      }
    ],
    communityPosts: [
      {
        id: 1,
        author: "StreetArtist_PL",
        content: "Nowy mural z Watermelon Willie na Pradze! Kto widział? 🎨",
        timestamp: "2 godziny temu",
        status: "approved",
        likes: 45,
        comments: 12,
        shares: 8
      },
      {
        id: 2,
        author: "HoodStyler",
        content: "Moja kolekcja Fruits From Da Hood rośnie! Które postaci lubicie najbardziej?",
        timestamp: "4 godziny temu",
        status: "pending",
        likes: 23,
        comments: 7,
        shares: 3
      },
      {
        id: 3,
        author: "CultureVulture",
        content: "Czy planujecie współpracę z lokalnymi artystami? Mam kilka pomysłów!",
        timestamp: "6 godzin temu",
        status: "approved",
        likes: 67,
        comments: 19,
        shares: 15
      }
    ]
  });

  const [analyticsData] = useState({
    engagement: [
      { day: 'Pon', users: 1200 },
      { day: 'Wt', users: 1450 },
      { day: 'Śr', users: 1680 },
      { day: 'Czw', users: 1890 },
      { day: 'Pt', users: 2100 },
      { day: 'Sob', users: 2400 },
      { day: 'Nd', users: 2200 }
    ],
    sales: [
      { month: 'Sty', revenue: 12000 },
      { month: 'Lut', revenue: 15000 },
      { month: 'Mar', revenue: 18000 },
      { month: 'Kwi', revenue: 22000 },
      { month: 'Maj', revenue: 25000 },
      { month: 'Cze', revenue: 28000 }
    ],
    characters: [
      { name: 'Watermelon Willie', popularity: 35 },
      { name: 'Apple Annie', popularity: 25 },
      { name: 'Banana Bob', popularity: 20 },
      { name: 'Orange Oscar', popularity: 12 },
      { name: 'Grape Gary', popularity: 8 }
    ],
    communityStats: [
      {
        label: 'Nowe Posty',
        description: 'Posts today',
        value: '47',
        change: '+12%',
        icon: 'FileText'
      },
      {
        label: 'Komentarze',
        description: 'Comments today',
        value: '156',
        change: '+8%',
        icon: 'MessageSquare'
      },
      {
        label: 'Polubienia',
        description: 'Likes today',
        value: '892',
        change: '+15%',
        icon: 'Heart'
      },
      {
        label: 'Udostępnienia',
        description: 'Shares today',
        value: '234',
        change: '+22%',
        icon: 'Share2'
      }
    ]
  });

  const [users] = useState([
    {
      id: 1,
      name: "Jakub Nowak",
      email: "jakub.nowak@example.com",
      role: "moderator",
      status: "active",
      joinDate: "2024-12-15",
      lastActive: "2 godziny temu",
      points: 1250,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      stats: { posts: 23, likes: 145, comments: 67, level: 5 }
    },
    {
      id: 2,
      name: "Anna Kowalczyk",
      email: "anna.kowalczyk@example.com",
      role: "creator",
      status: "active",
      joinDate: "2024-11-20",
      lastActive: "1 dzień temu",
      points: 2100,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      stats: { posts: 45, likes: 289, comments: 123, level: 7 }
    },
    {
      id: 3,
      name: "Michał Wiśniewski",
      email: "michal.wisniewski@example.com",
      role: "user",
      status: "inactive",
      joinDate: "2024-10-05",
      lastActive: "1 tydzień temu",
      points: 450,
      avatar: null,
      stats: { posts: 8, likes: 34, comments: 12, level: 2 }
    }
  ]);

  const [systemSettings] = useState({
    general: {
      platformName: "Fruits From Da Hood",
      tagline: "Rep Your Neighborhood",
      defaultLanguage: "pl",
      timezone: "Europe/Warsaw",
      maintenanceMode: false,
      publicRegistration: true,
      contentModeration: true
    },
    security: {
      maxLoginAttempts: 5,
      lockoutDuration: 15,
      requireTwoFactor: true,
      strongPasswords: true,
      activityLogging: true
    },
    notifications: {
      newRegistrations: true,
      newPosts: true,
      reports: true,
      communityActivity: false,
      systemUpdates: true,
      adminEmail: "admin@fruitshood.com"
    },
    integrations: {
      instagram: { connected: true },
      email: { connected: true },
      googleAnalytics: "GA-XXXX-XXXX",
      stripePublicKey: "pk_test_XXXX"
    }
  });

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
            <StatsOverview stats={dashboardStats} />
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
            <StatsOverview stats={dashboardStats} />
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