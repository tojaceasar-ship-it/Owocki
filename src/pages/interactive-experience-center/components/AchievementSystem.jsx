import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AchievementSystem = ({ userAchievements, onClaimReward }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const achievementCategories = [
    { id: 'all', name: 'All Achievements', icon: 'Trophy' },
    { id: 'quiz', name: 'Quiz Master', icon: 'Brain' },
    { id: 'community', name: 'Community', icon: 'Users' },
    { id: 'creative', name: 'Creative', icon: 'Palette' },
    { id: 'collector', name: 'Collector', icon: 'Star' }
  ];

  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first personality quiz",
      category: "quiz",
      icon: "Play",
      points: 50,
      rarity: "common",
      unlocked: true,
      progress: 100,
      maxProgress: 100,
      reward: "Quiz Master Badge",
      unlockedDate: "2025-09-25"
    },
    {
      id: 2,
      title: "Style Explorer",
      description: "Customize your first product design",
      category: "creative",
      icon: "Paintbrush",
      points: 75,
      rarity: "common",
      unlocked: true,
      progress: 100,
      maxProgress: 100,
      reward: "Designer Badge",
      unlockedDate: "2025-09-26"
    },
    {
      id: 3,
      title: "Community Contributor",
      description: "Share 5 photos in the community gallery",
      category: "community",
      icon: "Camera",
      points: 100,
      rarity: "uncommon",
      unlocked: false,
      progress: 3,
      maxProgress: 5,
      reward: "Community Star Badge"
    },
    {
      id: 4,
      title: "Quiz Perfectionist",
      description: "Complete all personality quizzes with perfect scores",
      category: "quiz",
      icon: "Target",
      points: 200,
      rarity: "rare",
      unlocked: false,
      progress: 1,
      maxProgress: 7,
      reward: "Perfect Score Badge + Exclusive Wallpaper"
    },
    {
      id: 5,
      title: "Design Virtuoso",
      description: "Create and save 10 custom designs",
      category: "creative",
      icon: "Zap",
      points: 150,
      rarity: "uncommon",
      unlocked: false,
      progress: 4,
      maxProgress: 10,
      reward: "Virtuoso Badge + Early Access"
    },
    {
      id: 6,
      title: "Hood Legend",
      description: "Reach level 10 and earn 1000 total points",
      category: "collector",
      icon: "Crown",
      points: 500,
      rarity: "legendary",
      unlocked: false,
      progress: 325,
      maxProgress: 1000,
      reward: "Legend Status + Exclusive Merchandise"
    }
  ];

  const leaderboard = [
    { rank: 1, name: "StreetArtist92", points: 1250, level: 12, avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
    { rank: 2, name: "GraffitiQueen", points: 1180, level: 11, avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
    { rank: 3, name: "HoodDesigner", points: 1050, level: 10, avatar: "https://randomuser.me/api/portraits/men/67.jpg" },
    { rank: 4, name: "You", points: 325, level: 3, avatar: "https://randomuser.me/api/portraits/women/68.jpg", isCurrentUser: true },
    { rank: 5, name: "UrbanCreator", points: 280, level: 3, avatar: "https://randomuser.me/api/portraits/men/45.jpg" }
  ];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'text-gray-400';
      case 'uncommon': return 'text-secondary';
      case 'rare': return 'text-primary';
      case 'legendary': return 'text-accent';
      default: return 'text-gray-400';
    }
  };

  const getRarityBorder = (rarity) => {
    switch (rarity) {
      case 'common': return 'border-gray-400/30';
      case 'uncommon': return 'border-secondary/30';
      case 'rare': return 'border-primary/30';
      case 'legendary': return 'border-accent/30';
      default: return 'border-gray-400/30';
    }
  };

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements?.filter(achievement => achievement?.category === selectedCategory);

  const totalPoints = achievements?.filter(a => a?.unlocked)?.reduce((sum, a) => sum + a?.points, 0);
  const currentLevel = Math.floor(totalPoints / 100) + 1;
  const nextLevelPoints = currentLevel * 100;
  const levelProgress = ((totalPoints % 100) / 100) * 100;

  return (
    <div className="space-y-8">
      {/* User Progress Overview */}
      <div className="bg-card border border-primary/30 rounded-xl p-6 neon-glow-primary">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-headline text-2xl text-primary mb-2">Achievement Progress</h2>
            <p className="text-text-secondary">Level {currentLevel} • {totalPoints} total points</p>
          </div>
          <div className="text-right">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center neon-pulse mb-2">
              <span className="font-headline text-xl font-bold text-black">{currentLevel}</span>
            </div>
            <p className="text-xs text-text-secondary">Current Level</p>
          </div>
        </div>

        {/* Level Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-cta text-sm text-foreground">Progress to Level {currentLevel + 1}</span>
            <span className="font-cta text-sm text-primary">{totalPoints % 100}/{100} points</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-primary to-secondary neon-glow-primary transition-all duration-500"
              style={{ width: `${levelProgress}%` }}
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-headline text-secondary mb-1">
              {achievements?.filter(a => a?.unlocked)?.length}
            </div>
            <div className="text-sm text-text-secondary">Unlocked</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-headline text-accent mb-1">
              {achievements?.length - achievements?.filter(a => a?.unlocked)?.length}
            </div>
            <div className="text-sm text-text-secondary">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-headline text-primary mb-1">{totalPoints}</div>
            <div className="text-sm text-text-secondary">Total Points</div>
          </div>
        </div>
      </div>
      {/* Category Filter & Leaderboard Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {achievementCategories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => setSelectedCategory(category?.id)}
              className={`px-4 py-2 rounded-lg font-cta font-medium text-sm transition-all duration-300 spray-paint-hover flex items-center space-x-2 ${
                selectedCategory === category?.id
                  ? 'bg-primary/20 text-primary neon-glow-primary border border-primary/30' :'text-text-secondary hover:text-primary hover:bg-surface/50'
              }`}
            >
              <Icon name={category?.icon} size={16} />
              <span>{category?.name}</span>
            </button>
          ))}
        </div>
        
        <Button
          variant="outline"
          onClick={() => setShowLeaderboard(!showLeaderboard)}
          className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground neon-glow-secondary"
          iconName="BarChart3"
          iconPosition="left"
        >
          {showLeaderboard ? "Hide" : "Show"} Leaderboard
        </Button>
      </div>
      {/* Leaderboard */}
      {showLeaderboard && (
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-headline text-xl text-foreground mb-6 flex items-center">
            <Icon name="Trophy" size={24} className="text-primary mr-3" />
            Community Leaderboard
          </h3>
          <div className="space-y-3">
            {leaderboard?.map((user) => (
              <div
                key={user?.rank}
                className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-300 ${
                  user?.isCurrentUser
                    ? 'bg-primary/20 border border-primary/30 neon-glow-primary' :'bg-surface/50 hover:bg-surface/70'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-cta font-bold ${
                  user?.rank === 1 ? 'bg-primary text-black' :
                  user?.rank === 2 ? 'bg-secondary text-black' :
                  user?.rank === 3 ? 'bg-accent text-black': 'bg-muted text-text-secondary'
                }`}>
                  {user?.rank}
                </div>
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className={`font-cta font-medium ${user?.isCurrentUser ? 'text-primary' : 'text-foreground'}`}>
                      {user?.name}
                    </span>
                    {user?.isCurrentUser && (
                      <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">You</span>
                    )}
                  </div>
                  <div className="text-sm text-text-secondary">Level {user?.level}</div>
                </div>
                <div className="text-right">
                  <div className="font-cta font-bold text-primary">{user?.points}</div>
                  <div className="text-xs text-text-secondary">points</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAchievements?.map((achievement) => (
          <div
            key={achievement?.id}
            className={`bg-card border rounded-xl p-6 transition-all duration-300 spray-paint-hover ${
              achievement?.unlocked
                ? `${getRarityBorder(achievement?.rarity)} neon-glow-${achievement?.rarity === 'legendary' ? 'accent' : achievement?.rarity === 'rare' ? 'primary' : 'secondary'}`
                : 'border-border opacity-75'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                achievement?.unlocked
                  ? 'bg-gradient-to-br from-primary to-secondary neon-pulse' :'bg-muted'
              }`}>
                <Icon
                  name={achievement?.icon}
                  size={24}
                  className={achievement?.unlocked ? 'text-black' : 'text-text-secondary'}
                />
              </div>
              <div className="text-right">
                <div className={`text-xs font-cta font-medium uppercase tracking-wider ${getRarityColor(achievement?.rarity)}`}>
                  {achievement?.rarity}
                </div>
                <div className="text-sm font-cta font-bold text-primary">+{achievement?.points}</div>
              </div>
            </div>

            <h4 className="font-cta font-bold text-foreground mb-2">{achievement?.title}</h4>
            <p className="text-sm text-text-secondary mb-4">{achievement?.description}</p>

            {/* Progress Bar */}
            {!achievement?.unlocked && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-text-secondary">Progress</span>
                  <span className="text-xs text-primary">{achievement?.progress}/{achievement?.maxProgress}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-secondary to-primary transition-all duration-500"
                    style={{ width: `${(achievement?.progress / achievement?.maxProgress) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Reward Info */}
            <div className="bg-surface/50 rounded-lg p-3 mb-4">
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="Gift" size={16} className="text-secondary" />
                <span className="text-sm font-cta font-medium text-foreground">Reward</span>
              </div>
              <p className="text-xs text-text-secondary">{achievement?.reward}</p>
            </div>

            {/* Action Button */}
            {achievement?.unlocked ? (
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-success">
                  <Icon name="CheckCircle" size={16} />
                  <span>Unlocked on {new Date(achievement.unlockedDate)?.toLocaleDateString()}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={() => onClaimReward(achievement)}
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  iconName="Download"
                  iconPosition="left"
                >
                  Claim Reward
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-sm text-text-secondary mb-2">
                  {achievement?.maxProgress - achievement?.progress} more to unlock
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  fullWidth
                  disabled
                  className="text-text-secondary"
                  iconName="Lock"
                  iconPosition="left"
                >
                  Locked
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementSystem;