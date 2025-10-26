import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const UserManagement = ({ users, onUserAction }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const roleOptions = [
    { value: 'all', label: 'Wszystkie Role' },
    { value: 'admin', label: 'Administrator' },
    { value: 'moderator', label: 'Moderator' },
    { value: 'creator', label: 'Twórca' },
    { value: 'user', label: 'Użytkownik' }
  ];

  const statusOptions = [
    { value: 'all', label: 'Wszystkie Statusy' },
    { value: 'active', label: 'Aktywny' },
    { value: 'inactive', label: 'Nieaktywny' },
    { value: 'banned', label: 'Zablokowany' },
    { value: 'pending', label: 'Oczekujący' }
  ];

  const getRoleColor = (role) => {
    const colors = {
      admin: 'text-primary bg-primary/20 border-primary/30',
      moderator: 'text-secondary bg-secondary/20 border-secondary/30',
      creator: 'text-accent bg-accent/20 border-accent/30',
      user: 'text-text-secondary bg-surface/50 border-border'
    };
    return colors?.[role] || colors?.user;
  };

  const getStatusColor = (status) => {
    const colors = {
      active: 'text-success bg-success/20',
      inactive: 'text-text-secondary bg-surface/50',
      banned: 'text-error bg-error/20',
      pending: 'text-warning bg-warning/20'
    };
    return colors?.[status] || colors?.inactive;
  };

  const filteredUsers = users?.filter(user => {
    const matchesSearch = user?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         user?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesRole = roleFilter === 'all' || user?.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user?.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="bg-card/95 backdrop-blur-md border border-border rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-headline font-bold text-xl text-primary">
            Zarządzanie Użytkownikami
          </h2>
          <p className="text-text-secondary font-body text-sm">
            User Management • {filteredUsers?.length} z {users?.length} użytkowników
          </p>
        </div>
        <Button
          variant="default"
          iconName="UserPlus"
          iconPosition="left"
          iconSize={16}
          className="bg-gradient-to-r from-primary to-secondary text-black font-cta font-bold neon-glow-primary"
          onClick={() => onUserAction('invite-user')}
        >
          Zaproś Użytkownika
        </Button>
      </div>
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Input
          type="search"
          placeholder="Szukaj użytkowników..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
        />
        <Select
          placeholder="Filtruj po roli"
          options={roleOptions}
          value={roleFilter}
          onChange={setRoleFilter}
        />
        <Select
          placeholder="Filtruj po statusie"
          options={statusOptions}
          value={statusFilter}
          onChange={setStatusFilter}
        />
      </div>
      {/* Users List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredUsers?.map((user) => (
          <div key={user?.id} className="bg-surface/50 border border-border rounded-lg p-4 spray-paint-hover">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center">
                    {user?.avatar ? (
                      <img 
                        src={user?.avatar} 
                        alt={user?.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <Icon name="User" size={20} className="text-black" />
                    )}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${getStatusColor(user?.status)}`}></div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-1">
                    <h3 className="font-cta font-bold text-foreground">{user?.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-cta border ${getRoleColor(user?.role)}`}>
                      {user?.role}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-cta ${getStatusColor(user?.status)}`}>
                      {user?.status}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary mb-2">{user?.email}</p>
                  <div className="flex items-center space-x-4 text-xs text-text-secondary">
                    <span>📅 Dołączył: {user?.joinDate}</span>
                    <span>🎯 Ostatnia aktywność: {user?.lastActive}</span>
                    <span>📊 Punkty: {user?.points}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="MessageSquare"
                  iconSize={16}
                  className="text-text-secondary hover:text-primary"
                  onClick={() => onUserAction('message', user?.id)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="Edit3"
                  iconSize={16}
                  className="text-text-secondary hover:text-secondary"
                  onClick={() => onUserAction('edit', user?.id)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="Shield"
                  iconSize={16}
                  className="text-text-secondary hover:text-accent"
                  onClick={() => onUserAction('moderate', user?.id)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="MoreVertical"
                  iconSize={16}
                  className="text-text-secondary hover:text-foreground"
                />
              </div>
            </div>

            {/* User Stats */}
            <div className="mt-4 pt-4 border-t border-border">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="font-cta font-bold text-lg text-primary">{user?.stats?.posts}</p>
                  <p className="text-xs text-text-secondary">Posty</p>
                </div>
                <div className="text-center">
                  <p className="font-cta font-bold text-lg text-secondary">{user?.stats?.likes}</p>
                  <p className="text-xs text-text-secondary">Polubienia</p>
                </div>
                <div className="text-center">
                  <p className="font-cta font-bold text-lg text-accent">{user?.stats?.comments}</p>
                  <p className="text-xs text-text-secondary">Komentarze</p>
                </div>
                <div className="text-center">
                  <p className="font-cta font-bold text-lg text-success">{user?.stats?.level}</p>
                  <p className="text-xs text-text-secondary">Poziom</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredUsers?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Users" size={48} className="text-text-secondary mx-auto mb-4" />
          <p className="text-text-secondary font-body">
            Nie znaleziono użytkowników spełniających kryteria wyszukiwania
          </p>
        </div>
      )}
    </div>
  );
};

export default UserManagement;