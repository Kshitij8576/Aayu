import React from 'react';
import Icon from '../../../components/AppIcon';

const ChatMessage = ({ message, isUser, timestamp, isTyping = false }) => {
  const formatTime = (date) => {
    return new Date(date)?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isTyping) {
    return (
      <div className="flex items-start space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
          <Icon name="Bot" size={20} className="text-white" />
        </div>
        <div className="flex-1">
          <div className="bg-card border border-border rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-start space-x-3 mb-6 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser 
          ? 'bg-conversion-accent text-white' :'bg-gradient-to-br from-primary to-secondary text-white'
      }`}>
        <Icon name={isUser ? "User" : "Bot"} size={20} />
      </div>
      
      <div className="flex-1 max-w-xs sm:max-w-md lg:max-w-lg">
        <div className={`rounded-2xl px-4 py-3 shadow-sm ${
          isUser 
            ? 'bg-conversion-accent text-white rounded-tr-md' :'bg-card border border-border rounded-tl-md'
        }`}>
          <p className={`text-sm leading-relaxed ${isUser ? 'text-white' : 'text-text-primary'}`}>
            {message}
          </p>
        </div>
        
        <div className={`flex items-center mt-1 space-x-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
          <span className="text-xs text-text-secondary">{formatTime(timestamp)}</span>
          {isUser && (
            <Icon name="Check" size={12} className="text-success" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;