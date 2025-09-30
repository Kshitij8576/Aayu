import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: "report_analysis",
      title: "Blood Test Report Analyzed",
      description: "AI detected slight vitamin D deficiency. Recommendations provided.",
      timestamp: "2 hours ago",
      icon: "FileText",
      iconColor: "text-primary",
      status: "completed"
    },
    {
      id: 2,
      type: "health_check",
      title: "Daily Health Check Completed",
      description: "Heart rate: 72 bpm, Blood pressure: 120/80 mmHg",
      timestamp: "5 hours ago",
      icon: "Heart",
      iconColor: "text-success",
      status: "completed"
    },
    {
      id: 3,
      type: "medication",
      title: "Medication Reminder",
      description: "Time to take your evening supplements",
      timestamp: "8 hours ago",
      icon: "Pill",
      iconColor: "text-warning",
      status: "pending"
    },
    {
      id: 4,
      type: "appointment",
      title: "Appointment Scheduled",
      description: "Dr. Sarah Johnson - Cardiology consultation on Jan 15",
      timestamp: "1 day ago",
      icon: "Calendar",
      iconColor: "text-secondary",
      status: "scheduled"
    },
    {
      id: 5,
      type: "device_sync",
      title: "Device Data Synced",
      description: "Fitbit data synchronized successfully",
      timestamp: "1 day ago",
      icon: "Smartphone",
      iconColor: "text-accent",
      status: "completed"
    },
    {
      id: 6,
      type: "ai_insight",
      title: "AI Health Insight",
      description: "Your sleep quality has improved by 15% this week",
      timestamp: "2 days ago",
      icon: "Brain",
      iconColor: "text-primary",
      status: "info"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-success/10 text-success';
      case 'pending': return 'bg-warning/10 text-warning';
      case 'scheduled': return 'bg-secondary/10 text-secondary';
      case 'info': return 'bg-primary/10 text-primary';
      default: return 'bg-muted text-text-secondary';
    }
  };

  return (
    <div className="medical-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Recent Activity</h2>
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={16} className="text-text-secondary" />
          <span className="text-sm text-text-secondary">Last 7 days</span>
        </div>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities?.map((activity, index) => (
          <div key={activity?.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <div className={`p-2 rounded-lg bg-card border ${activity?.iconColor?.replace('text-', 'border-')}/20`}>
              <Icon name={activity?.icon} size={16} className={activity?.iconColor} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-medium text-text-primary truncate">
                  {activity?.title}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity?.status)}`}>
                  {activity?.status}
                </span>
              </div>
              <p className="text-xs text-text-secondary mb-2 line-clamp-2">
                {activity?.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-secondary">{activity?.timestamp}</span>
                {activity?.status === 'pending' && (
                  <button className="text-xs text-primary hover:text-primary/80 font-medium">
                    Take Action
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <button className="w-full text-sm text-primary hover:text-primary/80 font-medium py-2 rounded-lg hover:bg-primary/5 transition-colors">
          View All Activity
        </button>
      </div>
    </div>
  );
};

export default RecentActivityFeed;