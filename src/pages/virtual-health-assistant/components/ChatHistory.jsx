import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatHistory = ({ conversations, onSelectConversation, onNewChat, currentConversationId }) => {
  const formatDate = (date) => {
    const now = new Date();
    const conversationDate = new Date(date);
    const diffTime = Math.abs(now - conversationDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return conversationDate?.toLocaleDateString();
  };

  const truncateTitle = (title, maxLength = 30) => {
    return title?.length > maxLength ? title?.substring(0, maxLength) + '...' : title;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-text-primary">Chat History</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onNewChat}
            className="w-8 h-8 text-text-secondary hover:text-primary"
          >
            <Icon name="Plus" size={16} />
          </Button>
        </div>
        
        <Button
          variant="default"
          fullWidth
          onClick={onNewChat}
          iconName="MessageSquarePlus"
          iconPosition="left"
          className="bg-primary hover:bg-primary/90 text-white"
        >
          New Conversation
        </Button>
      </div>
      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {conversations?.length === 0 ? (
          <div className="p-4 text-center">
            <Icon name="MessageSquare" size={48} className="text-text-secondary mx-auto mb-3 opacity-50" />
            <p className="text-sm text-text-secondary">No conversations yet</p>
            <p className="text-xs text-text-secondary mt-1">Start chatting to see your history</p>
          </div>
        ) : (
          <div className="p-2">
            {conversations?.map((conversation) => (
              <button
                key={conversation?.id}
                onClick={() => onSelectConversation(conversation?.id)}
                className={`w-full text-left p-3 rounded-lg mb-2 transition-colors ${
                  currentConversationId === conversation?.id
                    ? 'bg-primary/10 border border-primary/20' :'hover:bg-muted'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Bot" size={14} className="text-white" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-text-primary mb-1">
                      {truncateTitle(conversation?.title)}
                    </h4>
                    <p className="text-xs text-text-secondary mb-1 line-clamp-2">
                      {conversation?.lastMessage}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-text-secondary">
                        {formatDate(conversation?.updatedAt)}
                      </span>
                      <div className="flex items-center space-x-1">
                        <span className="text-xs text-text-secondary">
                          {conversation?.messageCount}
                        </span>
                        <Icon name="MessageSquare" size={12} className="text-text-secondary" />
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center space-x-2 text-xs text-text-secondary">
          <Icon name="Shield" size={12} className="text-success" />
          <span>All conversations are encrypted and HIPAA compliant</span>
        </div>
      </div>
    </div>
  );
};

export default ChatHistory;