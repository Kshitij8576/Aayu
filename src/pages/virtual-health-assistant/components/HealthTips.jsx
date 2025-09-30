import React from 'react';
import Icon from '../../../components/AppIcon';

const HealthTips = () => {
  const healthTips = [
    {
      id: 1,
      category: 'Hydration',
      tip: 'Drink 8-10 glasses of water daily for optimal health',
      icon: 'Droplets',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      id: 2,
      category: 'Exercise',
      tip: 'Aim for 30 minutes of moderate exercise 5 days a week',
      icon: 'Activity',
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      id: 3,
      category: 'Sleep',
      tip: 'Get 7-9 hours of quality sleep each night',
      icon: 'Moon',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      id: 4,
      category: 'Nutrition',
      tip: 'Include 5 servings of fruits and vegetables daily',
      icon: 'Apple',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Icon name="Lightbulb" size={20} className="text-primary" />
        <h3 className="font-semibold text-text-primary">Daily Health Tips</h3>
      </div>
      <div className="space-y-3">
        {healthTips?.map((tip) => (
          <div key={tip?.id} className="medical-card p-4 conversion-hover">
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 rounded-lg ${tip?.bgColor} flex items-center justify-center flex-shrink-0`}>
                <Icon name={tip?.icon} size={18} className={tip?.color} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                    {tip?.category}
                  </span>
                </div>
                <p className="text-sm text-text-primary leading-relaxed">{tip?.tip}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthTips;