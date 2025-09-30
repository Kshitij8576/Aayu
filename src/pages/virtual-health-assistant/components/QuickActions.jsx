import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onActionClick }) => {
  const quickActions = [
    {
      id: 'symptoms',
      title: 'Check Symptoms',
      description: 'Describe your symptoms for assessment',
      icon: 'Stethoscope',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 'medication',
      title: 'Medication Info',
      description: 'Get information about medicines',
      icon: 'Pill',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      id: 'emergency',
      title: 'Emergency Help',
      description: 'Urgent medical assistance',
      icon: 'AlertTriangle',
      color: 'text-destructive',
      bgColor: 'bg-destructive/10'
    },
    {
      id: 'appointment',
      title: 'Book Appointment',
      description: 'Schedule with healthcare provider',
      icon: 'Calendar',
      color: 'text-success',
      bgColor: 'bg-success/10'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-text-primary mb-2">How can I help you today?</h3>
        <p className="text-sm text-text-secondary">Choose a quick action or type your question below</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {quickActions?.map((action) => (
          <Button
            key={action?.id}
            variant="ghost"
            className="h-auto p-4 text-left justify-start conversion-hover"
            onClick={() => onActionClick(action)}
          >
            <div className="flex items-start space-x-3 w-full">
              <div className={`w-10 h-10 rounded-lg ${action?.bgColor} flex items-center justify-center flex-shrink-0`}>
                <Icon name={action?.icon} size={20} className={action?.color} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-text-primary text-sm">{action?.title}</h4>
                <p className="text-xs text-text-secondary mt-1 line-clamp-2">{action?.description}</p>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;