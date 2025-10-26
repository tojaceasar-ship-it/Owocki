import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VotingPollCard = ({ poll }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = (optionId) => {
    if (!hasVoted) {
      setSelectedOption(optionId);
      setHasVoted(true);
    }
  };

  const getTotalVotes = () => {
    return poll?.options?.reduce((total, option) => total + option?.votes, 0);
  };

  const getVotePercentage = (votes) => {
    const total = getTotalVotes();
    return total > 0 ? Math.round((votes / total) * 100) : 0;
  };

  const getTimeRemaining = () => {
    const now = new Date();
    const endDate = new Date(poll.endDate);
    const diff = endDate - now;
    
    if (diff <= 0) return 'Poll ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h left`;
    return `${hours}h left`;
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden neon-glow-secondary hover:neon-pulse transition-all duration-300">
      <div className="p-6 border-b border-border">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <Icon name="Vote" size={20} className="text-secondary" />
              <span className="text-xs font-cta font-semibold text-secondary uppercase tracking-wider">
                Community Poll
              </span>
            </div>
            <h3 className="font-headline font-bold text-lg text-foreground mb-2">{poll?.title}</h3>
            <p className="text-text-secondary text-sm leading-relaxed">{poll?.description}</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <span className="text-text-secondary">Total votes: <span className="text-foreground font-cta font-medium">{getTotalVotes()}</span></span>
            <span className="text-text-secondary">Ends: <span className="text-foreground font-cta font-medium">{getTimeRemaining()}</span></span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={16} className="text-primary" />
            <span className="text-primary font-cta font-medium">{poll?.participants} participants</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {poll?.options?.map((option) => {
            const percentage = getVotePercentage(option?.votes);
            const isSelected = selectedOption === option?.id;
            const isWinning = hasVoted && option?.votes === Math.max(...poll?.options?.map(o => o?.votes));

            return (
              <div
                key={option?.id}
                className={`relative border rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                  hasVoted
                    ? isWinning
                      ? 'border-primary/50 bg-primary/10' :'border-border bg-surface/30' :'border-border hover:border-secondary/50 hover:bg-surface/50'
                } ${isSelected ? 'ring-2 ring-secondary/50' : ''}`}
                onClick={() => handleVote(option?.id)}
              >
                {hasVoted && (
                  <div 
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-secondary/20 to-transparent transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  ></div>
                )}
                <div className="relative p-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                      <Image
                        src={option?.image}
                        alt={option?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-cta font-semibold text-foreground">{option?.name}</h4>
                        {hasVoted && (
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-cta font-medium text-foreground">{percentage}%</span>
                            {isWinning && <Icon name="Crown" size={16} className="text-primary" />}
                          </div>
                        )}
                      </div>
                      <p className="text-text-secondary text-sm">{option?.description}</p>
                      {hasVoted && (
                        <div className="mt-2 text-xs text-text-secondary">
                          {option?.votes} votes
                        </div>
                      )}
                    </div>

                    <div className="flex-shrink-0">
                      {hasVoted ? (
                        isSelected ? (
                          <Icon name="CheckCircle" size={20} className="text-secondary" />
                        ) : (
                          <Icon name="Circle" size={20} className="text-text-secondary" />
                        )
                      ) : (
                        <Icon name="Vote" size={20} className="text-text-secondary" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {!hasVoted && (
          <div className="mt-6 pt-4 border-t border-border">
            <Button
              variant="default"
              fullWidth
              className="bg-gradient-to-r from-secondary to-accent text-black font-cta font-bold"
              iconName="Vote"
              iconPosition="left"
              iconSize={16}
              disabled={!selectedOption}
            >
              Cast Your Vote
            </Button>
          </div>
        )}

        {hasVoted && (
          <div className="mt-6 pt-4 border-t border-border">
            <div className="flex items-center justify-center space-x-2 text-sm text-text-secondary">
              <Icon name="CheckCircle" size={16} className="text-secondary" />
              <span>Thank you for voting! Results will be announced soon.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VotingPollCard;