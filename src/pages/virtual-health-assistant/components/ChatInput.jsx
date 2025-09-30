import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatInput = ({ onSendMessage, disabled = false, isListening = false, onVoiceToggle }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim() && !disabled) {
      onSendMessage(message?.trim());
      setMessage('');
      if (textareaRef?.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  const handleTextareaChange = (e) => {
    setMessage(e?.target?.value);
    
    // Auto-resize textarea
    const textarea = e?.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea?.scrollHeight, 120) + 'px';
  };

  const suggestedQuestions = [
    "What are the symptoms of flu?",
    "How to reduce high blood pressure?",
    "When should I see a doctor?",
    "What medications interact with aspirin?"
  ];

  return (
    <div className="border-t border-border bg-surface p-4">
      {/* Suggested Questions */}
      <div className="mb-4">
        <p className="text-xs text-text-secondary mb-2">Suggested questions:</p>
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions?.slice(0, 2)?.map((question, index) => (
            <button
              key={index}
              onClick={() => setMessage(question)}
              className="text-xs px-3 py-1 bg-muted hover:bg-muted/80 text-text-secondary hover:text-text-primary rounded-full transition-colors"
            >
              {question}
            </button>
          ))}
        </div>
      </div>
      {/* Chat Input Form */}
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            onKeyPress={handleKeyPress}
            placeholder="Type your health question here..."
            disabled={disabled}
            className="w-full min-h-[44px] max-h-[120px] px-4 py-3 pr-12 bg-input border border-border rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm placeholder:text-text-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            rows={1}
          />
          
          {/* Voice Input Button */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onVoiceToggle}
            className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 ${
              isListening ? 'text-destructive animate-pulse' : 'text-text-secondary hover:text-primary'
            }`}
          >
            <Icon name={isListening ? "MicOff" : "Mic"} size={16} />
          </Button>
        </div>

        {/* Send Button */}
        <Button
          type="submit"
          variant="default"
          size="icon"
          disabled={!message?.trim() || disabled}
          className="w-11 h-11 bg-primary hover:bg-primary/90 text-white rounded-full flex-shrink-0"
        >
          <Icon name="Send" size={18} />
        </Button>
      </form>
      {/* Disclaimer */}
      <div className="mt-3 flex items-start space-x-2">
        <Icon name="Info" size={14} className="text-warning mt-0.5 flex-shrink-0" />
        <p className="text-xs text-text-secondary">
          This AI assistant provides general health information only. Always consult healthcare professionals for medical advice.
        </p>
      </div>
    </div>
  );
};

export default ChatInput;