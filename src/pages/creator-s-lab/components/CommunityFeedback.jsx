import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CommunityFeedback = ({ feedbackData }) => {
  const [newComment, setNewComment] = useState('');
  const [activeTab, setActiveTab] = useState('recent');

  const handleSubmitComment = () => {
    if (newComment?.trim()) {
      // Handle comment submission
      setNewComment('');
    }
  };

  const filterFeedback = (feedback) => {
    switch (activeTab) {
      case 'recent':
        return feedback?.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      case 'popular':
        return feedback?.sort((a, b) => b?.likes - a?.likes);
      case 'suggestions':
        return feedback?.filter(item => item?.type === 'suggestion');
      default:
        return feedback;
    }
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = now - time;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return `${minutes}m ago`;
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'suggestion': return 'Lightbulb';
      case 'question': return 'HelpCircle';
      case 'praise': return 'Heart';
      case 'critique': return 'MessageSquare';
      default: return 'MessageCircle';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'suggestion': return 'text-yellow-400';
      case 'question': return 'text-blue-400';
      case 'praise': return 'text-red-400';
      case 'critique': return 'text-orange-400';
      default: return 'text-text-secondary';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden neon-glow-primary">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Icon name="MessageSquare" size={24} className="text-primary" />
            <div>
              <h3 className="font-headline font-bold text-lg text-foreground">Community Feedback</h3>
              <p className="text-text-secondary text-sm">What the community is saying</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-text-secondary">{feedbackData?.length} comments</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-surface/50 rounded-lg p-1">
          {[
            { id: 'recent', label: 'Recent', icon: 'Clock' },
            { id: 'popular', label: 'Popular', icon: 'TrendingUp' },
            { id: 'suggestions', label: 'Suggestions', icon: 'Lightbulb' }
          ]?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md font-cta font-medium text-sm transition-all duration-300 ${
                activeTab === tab?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-text-secondary hover:text-foreground hover:bg-surface/70'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Comment Input */}
      <div className="p-6 border-b border-border bg-surface/30">
        <div className="flex space-x-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Icon name="User" size={20} className="text-black" />
          </div>
          <div className="flex-1 space-y-3">
            <Input
              type="text"
              placeholder="Share your thoughts on this design process..."
              value={newComment}
              onChange={(e) => setNewComment(e?.target?.value)}
              className="bg-card border-border"
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-text-secondary hover:text-primary"
                  iconName="Image"
                  iconSize={16}
                >
                  Image
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-text-secondary hover:text-secondary"
                  iconName="Paperclip"
                  iconSize={16}
                >
                  Attach
                </Button>
              </div>
              <Button
                variant="default"
                size="sm"
                onClick={handleSubmitComment}
                disabled={!newComment?.trim()}
                className="bg-gradient-to-r from-primary to-secondary text-black font-cta font-bold"
                iconName="Send"
                iconPosition="left"
                iconSize={16}
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Feedback List */}
      <div className="max-h-96 overflow-y-auto">
        <div className="space-y-4 p-6">
          {filterFeedback(feedbackData)?.map((feedback) => (
            <div key={feedback?.id} className="flex space-x-4 p-4 bg-surface/30 rounded-lg border border-border">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-border">
                <Image
                  src={feedback?.avatar}
                  alt={feedback?.username}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-cta font-semibold text-foreground">{feedback?.username}</span>
                    <Icon 
                      name={getTypeIcon(feedback?.type)} 
                      size={14} 
                      className={getTypeColor(feedback?.type)} 
                    />
                    <span className="text-xs text-text-secondary">{getTimeAgo(feedback?.timestamp)}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-text-secondary hover:text-primary"
                    iconName="MoreHorizontal"
                    iconSize={16}
                  />
                </div>
                
                <p className="text-text-secondary text-sm leading-relaxed mb-3">{feedback?.content}</p>
                
                {feedback?.attachment && (
                  <div className="mb-3">
                    <div className="w-32 h-20 rounded-lg overflow-hidden border border-border">
                      <Image
                        src={feedback?.attachment}
                        alt="Feedback attachment"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
                
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-text-secondary hover:text-red-400"
                    iconName="Heart"
                    iconPosition="left"
                    iconSize={14}
                  >
                    {feedback?.likes}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-text-secondary hover:text-primary"
                    iconName="MessageCircle"
                    iconPosition="left"
                    iconSize={14}
                  >
                    Reply
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-text-secondary hover:text-secondary"
                    iconName="Share2"
                    iconPosition="left"
                    iconSize={14}
                  >
                    Share
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Load More */}
      <div className="p-6 border-t border-border">
        <Button
          variant="outline"
          fullWidth
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          iconName="ChevronDown"
          iconPosition="left"
          iconSize={16}
        >
          Load More Comments
        </Button>
      </div>
    </div>
  );
};

export default CommunityFeedback;