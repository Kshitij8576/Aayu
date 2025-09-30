import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HealthGoalsProgress = () => {
  const goals = [
    {
      id: 1,
      title: "Daily Steps",
      target: 10000,
      current: 7850,
      unit: "steps",
      icon: "Footprints",
      color: "text-primary",
      bgColor: "bg-primary/10",
      progressColor: "bg-primary",
      deadline: "Daily",
      streak: 12
    },
    {
      id: 2,
      title: "Weight Loss",
      target: 75,
      current: 78.5,
      unit: "kg",
      icon: "TrendingDown",
      color: "text-warning",
      bgColor: "bg-warning/10",
      progressColor: "bg-warning",
      deadline: "Mar 2025",
      streak: 0,
      isReverse: true
    },
    {
      id: 3,
      title: "Sleep Duration",
      target: 8,
      current: 7.2,
      unit: "hours",
      icon: "Moon",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      progressColor: "bg-secondary",
      deadline: "Daily",
      streak: 5
    },
    {
      id: 4,
      title: "Water Intake",
      target: 2.5,
      current: 1.8,
      unit: "liters",
      icon: "Droplets",
      color: "text-accent",
      bgColor: "bg-accent/10",
      progressColor: "bg-accent",
      deadline: "Daily",
      streak: 8
    },
    {
      id: 5,
      title: "Exercise Minutes",
      target: 150,
      current: 120,
      unit: "min/week",
      icon: "Dumbbell",
      color: "text-success",
      bgColor: "bg-success/10",
      progressColor: "bg-success",
      deadline: "Weekly",
      streak: 3
    },
    {
      id: 6,
      title: "Meditation",
      target: 20,
      current: 15,
      unit: "min/day",
      icon: "Brain",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      progressColor: "bg-purple-500",
      deadline: "Daily",
      streak: 7
    }
  ];

  const calculateProgress = (goal) => {
    if (goal?.isReverse) {
      // For weight loss, progress is based on how much has been lost
      const totalToLose = 83.5 - goal?.target; // Starting weight - target
      const currentLoss = 83.5 - goal?.current; // Starting weight - current
      return Math.min((currentLoss / totalToLose) * 100, 100);
    }
    return Math.min((goal?.current / goal?.target) * 100, 100);
  };

  const getProgressStatus = (progress) => {
    if (progress >= 100) return { text: "Completed", color: "text-success" };
    if (progress >= 80) return { text: "Almost there", color: "text-success" };
    if (progress >= 50) return { text: "On track", color: "text-warning" };
    return { text: "Needs attention", color: "text-error" };
  };

  return (
    <div className="medical-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Health Goals Progress</h2>
        <Button variant="outline" size="sm" iconName="Target" iconPosition="left">
          Set New Goal
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goals?.map((goal) => {
          const progress = calculateProgress(goal);
          const status = getProgressStatus(progress);
          
          return (
            <div key={goal?.id} className={`p-4 rounded-lg border ${goal?.bgColor} border-opacity-20`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-white/50`}>
                    <Icon name={goal?.icon} size={18} className={goal?.color} />
                  </div>
                  <div>
                    <h3 className="font-medium text-text-primary text-sm">{goal?.title}</h3>
                    <p className="text-xs text-text-secondary">{goal?.deadline}</p>
                  </div>
                </div>
                {goal?.streak > 0 && (
                  <div className="flex items-center space-x-1">
                    <Icon name="Flame" size={14} className="text-orange-500" />
                    <span className="text-xs font-medium text-orange-500">{goal?.streak}</span>
                  </div>
                )}
              </div>
              <div className="mb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-semibold text-text-primary">
                    {goal?.current} {goal?.unit}
                  </span>
                  <span className="text-sm text-text-secondary">
                    / {goal?.target} {goal?.unit}
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${goal?.progressColor}`}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-medium ${status?.color}`}>
                    {status?.text}
                  </span>
                  <span className="text-xs text-text-secondary">
                    {Math.round(progress)}%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-white/20">
                <Button variant="ghost" size="sm" className="text-xs">
                  View Details
                </Button>
                <Button variant="ghost" size="sm" className="text-xs">
                  Update Progress
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-3 rounded-lg bg-success/10">
            <div className="text-lg font-bold text-success">4</div>
            <div className="text-xs text-text-secondary">Goals on track</div>
          </div>
          <div className="p-3 rounded-lg bg-warning/10">
            <div className="text-lg font-bold text-warning">2</div>
            <div className="text-xs text-text-secondary">Need attention</div>
          </div>
          <div className="p-3 rounded-lg bg-primary/10">
            <div className="text-lg font-bold text-primary">28</div>
            <div className="text-xs text-text-secondary">Day streak</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthGoalsProgress;