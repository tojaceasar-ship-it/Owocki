import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const AnalyticsPanel = ({ analyticsData }) => {
  const COLORS = ['#FFD700', '#00CED1', '#FF4500', '#32CD32', '#FF6B6B'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card/95 backdrop-blur-md border border-border rounded-lg p-3 shadow-neon">
          <p className="font-cta font-medium text-foreground">{`${label}`}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {`${entry?.dataKey}: ${entry?.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* User Engagement Chart */}
      <div className="bg-card/95 backdrop-blur-md border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-headline font-bold text-lg text-primary">
              Zaangażowanie Użytkowników
            </h3>
            <p className="text-text-secondary font-body text-sm">
              User Engagement • Ostatnie 7 dni
            </p>
          </div>
          <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center neon-glow-primary">
            <Icon name="TrendingUp" size={20} className="text-primary" />
          </div>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analyticsData?.engagement}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis 
                dataKey="day" 
                stroke="#B0B0B0" 
                fontSize={12}
                fontFamily="Inter"
              />
              <YAxis 
                stroke="#B0B0B0" 
                fontSize={12}
                fontFamily="Inter"
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="users" 
                stroke="#FFD700" 
                strokeWidth={3}
                dot={{ fill: '#FFD700', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#FFD700', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Sales Performance */}
      <div className="bg-card/95 backdrop-blur-md border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-headline font-bold text-lg text-primary">
              Wydajność Sprzedaży
            </h3>
            <p className="text-text-secondary font-body text-sm">
              Sales Performance • Miesięczne porównanie
            </p>
          </div>
          <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center neon-glow-secondary">
            <Icon name="DollarSign" size={20} className="text-secondary" />
          </div>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analyticsData?.sales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis 
                dataKey="month" 
                stroke="#B0B0B0" 
                fontSize={12}
                fontFamily="Inter"
              />
              <YAxis 
                stroke="#B0B0B0" 
                fontSize={12}
                fontFamily="Inter"
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="revenue" 
                fill="#00CED1"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Character Popularity */}
      <div className="bg-card/95 backdrop-blur-md border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-headline font-bold text-lg text-primary">
              Popularność Postaci
            </h3>
            <p className="text-text-secondary font-body text-sm">
              Character Popularity • Interakcje społeczności
            </p>
          </div>
          <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center neon-glow-accent">
            <Icon name="Users" size={20} className="text-accent" />
          </div>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={analyticsData?.characters}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="popularity"
                label={({ name, value }) => `${name}: ${value}%`}
                labelLine={false}
                fontSize={12}
                fontFamily="Inter"
              >
                {analyticsData?.characters?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Community Activity */}
      <div className="bg-card/95 backdrop-blur-md border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-headline font-bold text-lg text-primary">
              Aktywność Społeczności
            </h3>
            <p className="text-text-secondary font-body text-sm">
              Community Activity • Posty i interakcje
            </p>
          </div>
          <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
            <Icon name="MessageSquare" size={20} className="text-success" />
          </div>
        </div>
        
        <div className="space-y-4">
          {analyticsData?.communityStats?.map((stat, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-surface/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center`} 
                     style={{ backgroundColor: `${COLORS?.[index]}20`, color: COLORS?.[index] }}>
                  <Icon name={stat?.icon} size={16} />
                </div>
                <div>
                  <p className="font-cta font-medium text-foreground text-sm">{stat?.label}</p>
                  <p className="text-xs text-text-secondary">{stat?.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-cta font-bold text-lg text-foreground">{stat?.value}</p>
                <p className={`text-xs ${stat?.change?.startsWith('+') ? 'text-success' : 'text-error'}`}>
                  {stat?.change}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPanel;