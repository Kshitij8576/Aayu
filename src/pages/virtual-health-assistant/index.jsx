import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ChatMessage from './components/ChatMessage';
import QuickActions from './components/QuickActions';
import ChatInput from './components/ChatInput';
import EmergencyBanner from './components/EmergencyBanner';
import HealthTips from './components/HealthTips';
import ChatHistory from './components/ChatHistory';

const VirtualHealthAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const messagesEndRef = useRef(null);

  // Mock conversation history
  const [conversations, setConversations] = useState([
    {
      id: 1,
      title: "Flu symptoms and treatment",
      lastMessage: "Thank you for the advice about rest and hydration.",
      messageCount: 8,
      updatedAt: new Date(Date.now() - 86400000), // Yesterday
    },
    {
      id: 2,
      title: "Blood pressure medication",
      lastMessage: "I'll discuss these options with my doctor.",
      messageCount: 12,
      updatedAt: new Date(Date.now() - 172800000), // 2 days ago
    },
    {
      id: 3,
      title: "Exercise recommendations",
      lastMessage: "These workout suggestions look great!",
      messageCount: 6,
      updatedAt: new Date(Date.now() - 259200000), // 3 days ago
    }
  ]);

  // Mock initial messages for demonstration
  const initialMessages = [
    {
      id: 1,
      message: "Hello! I'm Aayu, your AI health assistant. I'm here to help you with health questions, symptom assessment, medication information, and general wellness guidance. How can I assist you today?",
      isUser: false,
      timestamp: new Date(Date.now() - 60000)
    }
  ];

  useEffect(() => {
    setMessages(initialMessages);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (messageText) => {
    const userMessage = {
      id: Date.now(),
      message: messageText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(messageText);
      const aiMessage = {
        id: Date.now() + 1,
        message: aiResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userMessage) => {
    const lowerMessage = userMessage?.toLowerCase();
    
    if (lowerMessage?.includes('flu') || lowerMessage?.includes('fever') || lowerMessage?.includes('cold')) {
      return `Based on your symptoms, it sounds like you might be dealing with a viral infection. Here's what I recommend:\n\n• Get plenty of rest (7-9 hours of sleep)\n• Stay hydrated with water, herbal teas, and clear broths\n• Consider over-the-counter fever reducers if needed\n• Gargle with warm salt water for sore throat\n\nIf symptoms worsen or persist beyond 7-10 days, please consult with a healthcare provider. Would you like more specific guidance about any of these recommendations?`;
    }
    
    if (lowerMessage?.includes('blood pressure') || lowerMessage?.includes('hypertension')) {
      return `High blood pressure is a serious condition that requires proper medical management. Here are some general lifestyle approaches that can help:\n\n• Reduce sodium intake (less than 2,300mg daily)\n• Engage in regular physical activity (30 minutes, 5 days/week)\n• Maintain a healthy weight\n• Limit alcohol consumption\n• Manage stress through relaxation techniques\n• Take prescribed medications as directed\n\nIt's crucial to work with your healthcare provider for proper monitoring and treatment. Would you like information about specific dietary changes or exercise recommendations?`;
    }
    
    if (lowerMessage?.includes('medication') || lowerMessage?.includes('medicine') || lowerMessage?.includes('drug')) {
      return `I can provide general information about medications, but please remember that I cannot replace professional medical advice. Here's what I can help with:\n\n• General medication information and common uses\n• Potential side effects to be aware of\n• Drug interaction warnings\n• Proper storage and administration guidelines\n\nAlways consult your healthcare provider or pharmacist for:\n• Dosage adjustments\n• Specific medical advice\n• Prescription changes\n\nWhat specific medication would you like information about?`;
    }
    
    if (lowerMessage?.includes('emergency') || lowerMessage?.includes('urgent') || lowerMessage?.includes('911')) {
      return `If you're experiencing a medical emergency, please call 911 immediately or go to your nearest emergency room. Emergency signs include:\n\n• Chest pain or difficulty breathing\n• Severe bleeding or trauma\n• Loss of consciousness\n• Severe allergic reactions\n• Signs of stroke (face drooping, arm weakness, speech difficulty)\n\nFor non-emergency urgent care needs, consider:\n• Urgent care centers\n• Telehealth consultations\n• Your primary care provider's after-hours line\n\nIs this a medical emergency that requires immediate attention?`;
    }
    
    if (lowerMessage?.includes('appointment') || lowerMessage?.includes('doctor') || lowerMessage?.includes('schedule')) {
      return `I can help you understand when you might need to see a healthcare provider. You should consider scheduling an appointment if:\n\n• Symptoms persist or worsen over time\n• You have concerning new symptoms\n• You need routine preventive care\n• You have questions about existing conditions or medications\n\nFor scheduling, you can:\n• Contact your primary care provider directly\n• Use your healthcare system's patient portal\n• Call your insurance provider for in-network options\n\nWould you like me to help you determine what type of healthcare provider might be most appropriate for your needs?`;
    }
    
    // Default response
    return `Thank you for your question. I'm here to provide general health information and guidance. While I can offer insights on common health topics, symptoms, and wellness practices, please remember that I cannot diagnose conditions or replace professional medical advice.\n\nFor the best assistance, could you please provide more specific details about what you'd like to know? I can help with:\n• Symptom information and when to seek care\n• General medication questions\n• Wellness and prevention tips\n• Health lifestyle recommendations\n\nWhat specific health topic would you like to explore?`;
  };

  const handleQuickAction = (action) => {
    let message = '';
    
    switch (action?.id) {
      case 'symptoms':
        message = "I'd like to check my symptoms and get an assessment.";
        break;
      case 'medication':
        message = "I need information about medications and their effects.";
        break;
      case 'emergency':
        message = "I need help with an urgent medical situation.";
        break;
      case 'appointment':
        message = "I want to book an appointment with a healthcare provider.";
        break;
      default:
        message = action?.title;
    }
    
    handleSendMessage(message);
  };

  const handleEmergencyAction = (action) => {
    if (action === 'call911') {
      // In a real app, this would trigger a call
      alert('In an emergency, dial 911 immediately. This is a demo application.');
    } else if (action === 'findHospital') {
      // In a real app, this would open maps or hospital finder
      alert('Opening hospital locator... This is a demo application.');
    }
  };

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    // In a real app, this would start/stop voice recognition
    if (!isListening) {
      setTimeout(() => setIsListening(false), 3000); // Auto-stop after 3 seconds for demo
    }
  };

  const handleNewChat = () => {
    setMessages(initialMessages);
    setCurrentConversationId(null);
    setShowSidebar(false);
  };

  const handleSelectConversation = (conversationId) => {
    setCurrentConversationId(conversationId);
    // In a real app, this would load the conversation messages
    setMessages([
      ...initialMessages,
      {
        id: Date.now(),
        message: "Loading previous conversation...",
        isUser: false,
        timestamp: new Date()
      }
    ]);
    setShowSidebar(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16 h-screen flex">
        {/* Sidebar for Chat History */}
        <div className={`fixed inset-y-0 left-0 z-40 w-80 bg-surface border-r border-border transform transition-transform duration-300 ease-in-out ${
          showSidebar ? 'translate-x-0' : '-translate-x-full'
        } lg:relative lg:translate-x-0 lg:block`}>
          <div className="pt-16 h-full">
            <ChatHistory
              conversations={conversations}
              onSelectConversation={handleSelectConversation}
              onNewChat={handleNewChat}
              currentConversationId={currentConversationId}
            />
          </div>
        </div>

        {/* Overlay for mobile */}
        {showSidebar && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setShowSidebar(false)}
          />
        )}

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col h-full">
          {/* Chat Header */}
          <div className="bg-surface border-b border-border p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSidebar(!showSidebar)}
                className="lg:hidden w-8 h-8 text-text-secondary hover:text-primary"
              >
                <Icon name="Menu" size={16} />
              </Button>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <Icon name="Bot" size={20} className="text-white" />
                </div>
                <div>
                  <h1 className="font-semibold text-text-primary">Aayu Health Assistant</h1>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-xs text-success">Online • Available 24/7</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 text-text-secondary hover:text-primary"
              >
                <Icon name="MoreVertical" size={16} />
              </Button>
            </div>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              {/* Welcome Section */}
              {messages?.length <= 1 && (
                <div className="p-6 space-y-6">
                  <EmergencyBanner onEmergencyAction={handleEmergencyAction} />
                  
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto">
                      <Icon name="Bot" size={32} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-text-primary mb-2">Welcome to Aayu Health Assistant</h2>
                      <p className="text-text-secondary max-w-2xl mx-auto">
                        Your AI-powered health companion is here to provide personalized health guidance, 
                        symptom assessment, and medical information 24/7. Start by asking a question or 
                        choosing a quick action below.
                      </p>
                    </div>
                  </div>

                  <QuickActions onActionClick={handleQuickAction} />
                </div>
              )}

              {/* Chat Messages */}
              <div className="p-6 space-y-4">
                {messages?.map((message) => (
                  <ChatMessage
                    key={message?.id}
                    message={message?.message}
                    isUser={message?.isUser}
                    timestamp={message?.timestamp}
                  />
                ))}
                
                {isTyping && (
                  <ChatMessage 
                    isTyping={true} 
                    message="" 
                    isUser={false} 
                    timestamp={new Date()} 
                  />
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <ChatInput
            onSendMessage={handleSendMessage}
            disabled={isTyping}
            isListening={isListening}
            onVoiceToggle={handleVoiceToggle}
          />
        </div>

        {/* Right Sidebar - Health Tips */}
        <div className="hidden xl:block w-80 bg-surface border-l border-border">
          <div className="p-6 h-full overflow-y-auto">
            <HealthTips />
            
            {/* Quick Links */}
            <div className="mt-8 space-y-4">
              <h3 className="font-semibold text-text-primary flex items-center space-x-2">
                <Icon name="ExternalLink" size={16} className="text-primary" />
                <span>Quick Access</span>
              </h3>
              
              <div className="space-y-2">
                <Link
                  to="/medical-report-analysis"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <Icon name="FileText" size={16} className="text-primary" />
                  <span className="text-sm text-text-primary">Analyze Medical Report</span>
                </Link>
                
                <Link
                  to="/smart-medicine-recommendation"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <Icon name="Pill" size={16} className="text-secondary" />
                  <span className="text-sm text-text-primary">Medicine Recommendations</span>
                </Link>
                
                <Link
                  to="/user-dashboard"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <Icon name="LayoutDashboard" size={16} className="text-success" />
                  <span className="text-sm text-text-primary">Health Dashboard</span>
                </Link>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 p-4 bg-success/5 border border-success/20 rounded-xl">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Shield" size={16} className="text-success" />
                <span className="text-sm font-medium text-success">Secure & Private</span>
              </div>
              <p className="text-xs text-text-secondary">
                All conversations are encrypted and HIPAA compliant. Your health data is never shared without your consent.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualHealthAssistant;