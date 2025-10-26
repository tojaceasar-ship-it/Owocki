import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const InteractivePolls = ({ onVoteSubmit, onCreatePoll }) => {
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPoll, setNewPoll] = useState({
    question: '',
    options: ['', ''],
    category: 'design',
    image: null
  });

  const polls = [
    {
      id: 1,
      question: "Which fruit character should get the next limited edition hoodie?",
      category: "design",
      author: "Fruits Team",
      authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
      createdAt: "2025-09-26T10:00:00Z",
      endsAt: "2025-09-30T23:59:59Z",
      totalVotes: 1247,
      hasVoted: false,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=300&fit=crop",
      options: [
        { id: 'a', text: 'Orange Squad Leader', votes: 423, percentage: 34 },
        { id: 'b', text: 'Grape Gang Boss', votes: 356, percentage: 29 },
        { id: 'c', text: 'Banana Bunch Chief', votes: 289, percentage: 23 },
        { id: 'd', text: 'Apple Crew Captain', votes: 179, percentage: 14 }
      ]
    },
    {
      id: 2,
      question: "What color scheme should dominate our next collection?",
      category: "style",
      author: "StreetDesigner",
      authorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
      createdAt: "2025-09-25T15:30:00Z",
      endsAt: "2025-09-28T23:59:59Z",
      totalVotes: 892,
      hasVoted: true,
      userVote: 'b',
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=300&fit=crop",
      options: [
        { id: 'a', text: 'Neon Nights (Electric Blues & Purples)', votes: 267, percentage: 30 },
        { id: 'b', text: 'Fire Streets (Reds & Oranges)', votes: 312, percentage: 35 },
        { id: 'c', text: 'Gold Rush (Yellows & Golds)', votes: 223, percentage: 25 },
        { id: 'd', text: 'Forest Vibes (Greens & Earth Tones)', votes: 90, percentage: 10 }
      ]
    },
    {
      id: 3,
      question: "Which collaboration would you be most excited about?",
      category: "community",
      author: "CommunityManager",
      authorAvatar: "https://randomuser.me/api/portraits/men/67.jpg",
      createdAt: "2025-09-24T09:15:00Z",
      endsAt: "2025-10-01T23:59:59Z",
      totalVotes: 2156,
      hasVoted: false,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=300&fit=crop",
      options: [
        { id: 'a', text: 'Local Street Artists Collective', votes: 647, percentage: 30 },
        { id: 'b', text: 'Underground Hip-Hop Artists', votes: 539, percentage: 25 },
        { id: 'c', text: 'Skateboard Culture Icons', votes: 431, percentage: 20 },
        { id: 'd', text: 'Graffiti Legends', votes: 539, percentage: 25 }
      ]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Polls', icon: 'Vote' },
    { id: 'design', name: 'Design', icon: 'Palette' },
    { id: 'style', name: 'Style', icon: 'Shirt' },
    { id: 'community', name: 'Community', icon: 'Users' }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredPolls = selectedCategory === 'all' 
    ? polls 
    : polls?.filter(poll => poll?.category === selectedCategory);

  const handleVote = (pollId, optionId) => {
    onVoteSubmit(pollId, optionId);
    // Update local state to reflect the vote
    setSelectedPoll(null);
  };

  const handleCreatePoll = () => {
    if (newPoll?.question && newPoll?.options?.every(opt => opt?.trim())) {
      onCreatePoll(newPoll);
      setNewPoll({ question: '', options: ['', ''], category: 'design', image: null });
      setShowCreateForm(false);
    }
  };

  const addOption = () => {
    if (newPoll?.options?.length < 6) {
      setNewPoll(prev => ({
        ...prev,
        options: [...prev?.options, '']
      }));
    }
  };

  const removeOption = (index) => {
    if (newPoll?.options?.length > 2) {
      setNewPoll(prev => ({
        ...prev,
        options: prev?.options?.filter((_, i) => i !== index)
      }));
    }
  };

  const updateOption = (index, value) => {
    setNewPoll(prev => ({
      ...prev,
      options: prev?.options?.map((opt, i) => i === index ? value : opt)
    }));
  };

  const getTimeRemaining = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end - now;
    
    if (diff <= 0) return 'Ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h left`;
    return `${hours}h left`;
  };

  return (
    <div className="space-y-8">
      {/* Header with Create Poll Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-headline text-2xl text-primary mb-2">Community Polls</h2>
          <p className="text-text-secondary">Shape the future of Fruits From Da Hood</p>
        </div>
        <Button
          variant="default"
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-gradient-to-r from-primary to-secondary text-black font-cta font-bold neon-glow-primary"
          iconName="Plus"
          iconPosition="left"
        >
          Create Poll
        </Button>
      </div>
      {/* Create Poll Form */}
      {showCreateForm && (
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-headline text-xl text-foreground mb-6 flex items-center">
            <Icon name="Plus" size={24} className="text-primary mr-3" />
            Create New Poll
          </h3>
          
          <div className="space-y-6">
            <div>
              <label className="block font-cta font-medium text-foreground mb-2">Question</label>
              <input
                type="text"
                value={newPoll?.question}
                onChange={(e) => setNewPoll(prev => ({ ...prev, question: e?.target?.value }))}
                placeholder="What would you like to ask the community?"
                className="w-full p-3 bg-surface border border-border rounded-lg text-foreground placeholder-text-secondary focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-cta font-medium text-foreground mb-2">Category</label>
              <select
                value={newPoll?.category}
                onChange={(e) => setNewPoll(prev => ({ ...prev, category: e?.target?.value }))}
                className="w-full p-3 bg-surface border border-border rounded-lg text-foreground focus:border-primary focus:outline-none"
              >
                <option value="design">Design</option>
                <option value="style">Style</option>
                <option value="community">Community</option>
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-cta font-medium text-foreground">Options</label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={addOption}
                  disabled={newPoll?.options?.length >= 6}
                  className="text-secondary hover:text-secondary"
                  iconName="Plus"
                  iconSize={16}
                >
                  Add Option
                </Button>
              </div>
              <div className="space-y-3">
                {newPoll?.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => updateOption(index, e?.target?.value)}
                      placeholder={`Option ${index + 1}`}
                      className="flex-1 p-3 bg-surface border border-border rounded-lg text-foreground placeholder-text-secondary focus:border-primary focus:outline-none"
                    />
                    {newPoll?.options?.length > 2 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeOption(index)}
                        className="text-error hover:text-error"
                        iconName="X"
                        iconSize={16}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-4">
              <Button
                variant="default"
                onClick={handleCreatePoll}
                disabled={!newPoll?.question || !newPoll?.options?.every(opt => opt?.trim())}
                className="bg-gradient-to-r from-primary to-secondary text-black font-cta font-bold neon-glow-primary"
                iconName="Send"
                iconPosition="left"
              >
                Create Poll
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowCreateForm(false)}
                className="border-border text-text-secondary hover:text-foreground"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories?.map((category) => (
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
      {/* Polls Grid */}
      <div className="space-y-6">
        {filteredPolls?.map((poll) => (
          <div key={poll?.id} className="bg-card border border-border rounded-xl overflow-hidden spray-paint-hover">
            {/* Poll Header */}
            <div className="p-6 pb-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={poll?.authorAvatar}
                    alt={poll?.author}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-cta font-medium text-foreground">{poll?.author}</h4>
                    <p className="text-sm text-text-secondary">
                      {new Date(poll.createdAt)?.toLocaleDateString()} • {getTimeRemaining(poll?.endsAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-cta font-medium ${
                    poll?.category === 'design' ? 'bg-primary/20 text-primary' :
                    poll?.category === 'style'? 'bg-secondary/20 text-secondary' : 'bg-accent/20 text-accent'
                  }`}>
                    {poll?.category}
                  </span>
                  <div className="flex items-center space-x-1 text-text-secondary">
                    <Icon name="Users" size={16} />
                    <span className="text-sm">{poll?.totalVotes}</span>
                  </div>
                </div>
              </div>

              <h3 className="font-headline text-lg text-foreground mb-4">{poll?.question}</h3>

              {poll?.image && (
                <div className="mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={poll?.image}
                    alt="Poll image"
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}
            </div>

            {/* Poll Options */}
            <div className="px-6 pb-6">
              <div className="space-y-3">
                {poll?.options?.map((option) => (
                  <button
                    key={option?.id}
                    onClick={() => !poll?.hasVoted && handleVote(poll?.id, option?.id)}
                    disabled={poll?.hasVoted}
                    className={`w-full p-4 rounded-lg border text-left transition-all duration-300 relative overflow-hidden ${
                      poll?.hasVoted
                        ? poll?.userVote === option?.id
                          ? 'border-primary bg-primary/20 neon-glow-primary' :'border-border bg-surface/50' :'border-border hover:border-secondary hover:bg-surface/50 spray-paint-hover'
                    }`}
                  >
                    {poll?.hasVoted && (
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent transition-all duration-500"
                        style={{ width: `${option?.percentage}%` }}
                      />
                    )}
                    <div className="relative flex items-center justify-between">
                      <span className="font-cta text-foreground">{option?.text}</span>
                      <div className="flex items-center space-x-2">
                        {poll?.hasVoted && (
                          <span className="text-sm text-primary font-cta font-bold">
                            {option?.percentage}%
                          </span>
                        )}
                        {poll?.hasVoted && poll?.userVote === option?.id && (
                          <Icon name="Check" size={16} className="text-primary" />
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {poll?.hasVoted && (
                <div className="mt-4 p-3 bg-success/20 border border-success/30 rounded-lg">
                  <div className="flex items-center space-x-2 text-success">
                    <Icon name="CheckCircle" size={16} />
                    <span className="text-sm font-cta font-medium">Thanks for voting! Results are live.</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {filteredPolls?.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Vote" size={32} className="text-text-secondary" />
          </div>
          <h3 className="font-headline text-lg text-foreground mb-2">No polls found</h3>
          <p className="text-text-secondary mb-4">Be the first to create a poll in this category!</p>
          <Button
            variant="outline"
            onClick={() => setShowCreateForm(true)}
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            iconName="Plus"
            iconPosition="left"
          >
            Create First Poll
          </Button>
        </div>
      )}
    </div>
  );
};

export default InteractivePolls;