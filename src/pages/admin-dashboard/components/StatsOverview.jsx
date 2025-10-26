import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsOverview = ({ stats }) => {
  const statCards = [
    {
      title: 'Aktywni Użytkownicy',
      subtitle: 'Active Users',
      value: stats?.activeUsers,
      change: '+12.5%',
      icon: 'Users',
      color: 'primary',
      trend: 'up'
    },
    {
      title: 'Sprzedaż Dziś',
      subtitle: 'Sales Today',
      value: `$${stats?.todaySales}`,
      change: '+8.2%',
      icon: 'DollarSign',
      color: 'secondary',
      trend: 'up'
    },
    {
      title: 'Nowe Zamówienia',
      subtitle: 'New Orders',
      value: stats?.newOrders,
      change: '+15.3%',
      icon: 'ShoppingBag',
      color: 'accent',
      trend: 'up'
    },
    {
      title: 'Zaangażowanie',
      subtitle: 'Community Engagement',
      value: `${stats?.engagement}%`,
      change: '+5.7%',
      icon: 'Heart',
      color: 'success',
      trend: 'up'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      primary: 'text-primary neon-glow-primary',
      secondary: 'text-secondary neon-glow-secondary',
      accent: 'text-accent neon-glow-accent',
      success: 'text-success'
    };
    return colors?.[color] || colors?.primary;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards?.map((stat, index) => (
        <div
          key={index}
          className="bg-card/95 backdrop-blur-md border border-border rounded-lg p-6 spray-paint-hover transition-all duration-300 hover:neon-glow-primary"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(stat?.color)}`}>
              <Icon name={stat?.icon} size={24} />
            </div>
            <div className={`flex items-center space-x-1 text-sm ${stat?.trend === 'up' ? 'text-success' : 'text-error'}`}>
              <Icon name={stat?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={16} />
              <span className="font-cta font-medium">{stat?.change}</span>
            </div>
          </div>
          
          <div>
            <h3 className="font-cta font-bold text-2xl text-foreground mb-1">
              {stat?.value}
            </h3>
            <p className="font-body text-sm text-primary font-medium">
              {stat?.title}
            </p>
            <p className="font-body text-xs text-text-secondary">
              {stat?.subtitle}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;