import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationCenter = () => {
  const [filter, setFilter] = useState('all');

  const notifications = [
    {
      id: 1,
      type: "medication",
      title: "Medication Reminder",
      message: "Time to take your evening Vitamin D supplement",
      timestamp: "5 minutes ago",
      priority: "high",
      read: false,
      actionRequired: true,
      icon: "Pill",
      color: "text-warning"
    },
    {
      id: 2,
      type: "appointment",
      title: "Appointment Confirmation",
      message: "Your appointment with Dr. Sarah Johnson has been confirmed for Jan 15, 10:30 AM",
      timestamp: "2 hours ago",
      priority: "medium",
      read: false,
      actionRequired: false,
      icon: "Calendar",
      color: "text-primary"
    },
    {
      id: 3,
      type: "health_alert",
      title: "Health Alert",
      message: "Your blood pressure reading was slightly elevated. Consider consulting your doctor.",
      timestamp: "4 hours ago",
      priority: "high",
      read: false,
      actionRequired: true,
      icon: "AlertTriangle",
      color: "text-error"
    },
    {
      id: 4,
      type: "device_sync",
      title: "Device Sync Complete",
      message: "Your Apple Watch data has been successfully synchronized",
      timestamp: "6 hours ago",
      priority: "low",
      read: true,
      actionRequired: false,
      icon: "CheckCircle",
      color: "text-success"
    },
    {
      id: 5,
      type: "ai_insight",
      title: "AI Health Insight",
      message: "Based on your recent activity, consider increasing your daily water intake by 20%",
      timestamp: "1 day ago",
      priority: "medium",
      read: true,
      actionRequired: false,
      icon: "Brain",
      color: "text-secondary"
    },
    {
      id: 6,
      type: "goal_achievement",
      title: "Goal Achievement",
      message: "Congratulations! You've reached your daily step goal of 10,000 steps",
      timestamp: "1 day ago",
      priority: "low",
      read: true,
      actionRequired: false,
      icon: "Trophy",
      color: "text-success"
    },
    {
      id: 7,
      type: "report_ready",
      title: "Report Analysis Complete",
      message: "Your blood test analysis is ready for review with detailed AI insights",
      timestamp: "2 days ago",
      priority: "medium",
      read: false,
      actionRequired: true,
      icon: "FileText",
      color: "text-primary"
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All', count: notifications?.length },
    { value: 'unread', label: 'Unread', count: notifications?.filter(n => !n?.read)?.length },
    { value: 'action_required', label: 'Action Required', count: notifications?.filter(n => n?.actionRequired)?.length },
    { value: 'high_priority', label: 'High Priority', count: notifications?.filter(n => n?.priority === 'high')?.length }
  ];

  const filteredNotifications = notifications?.filter(notification => {
    switch (filter) {
      case 'unread': return !notification?.read;
      case 'action_required': return notification?.actionRequired;
      case 'high_priority': return notification?.priority === 'high';
      default: return true;
    }
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-error';
      case 'medium': return 'border-l-warning';
      case 'low': return 'border-l-success';
      default: return 'border-l-border';
    }
  };

  const markAsRead = (id) => {
    // In a real app, this would update the notification status
    console.log(`Marking notification ${id} as read`);
  };

  const markAllAsRead = () => {
    // In a real app, this would mark all notifications as read
    console.log('Marking all notifications as read');
  };

  return (
    <div className="medical-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Notification Center</h2>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={markAllAsRead}>
            Mark All Read
          </Button>
          <Button variant="outline" size="sm" iconName="Settings">
            Settings
          </Button>
        </div>
      </div>
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filterOptions?.map((option) => (
          <button
            key={option?.value}
            onClick={() => setFilter(option?.value)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === option?.value
                ? 'bg-primary text-white' :'bg-muted text-text-secondary hover:bg-primary/10 hover:text-primary'
            }`}
          >
            {option?.label}
            {option?.count > 0 && (
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                filter === option?.value ? 'bg-white/20' : 'bg-primary/10 text-primary'
              }`}>
                {option?.count}
              </span>
            )}
          </button>
        ))}
      </div>
      {/* Notifications List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredNotifications?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Bell" size={48} className="text-text-secondary mx-auto mb-4" />
            <p className="text-text-secondary">No notifications found</p>
          </div>
        ) : (
          filteredNotifications?.map((notification) => (
            <div
              key={notification?.id}
              className={`p-4 rounded-lg border-l-4 ${getPriorityColor(notification?.priority)} ${
                notification?.read ? 'bg-card' : 'bg-primary/5'
              } hover:shadow-sm transition-all duration-200`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${notification?.read ? 'bg-muted' : 'bg-white'}`}>
                    <Icon name={notification?.icon} size={16} className={notification?.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-sm font-medium ${notification?.read ? 'text-text-secondary' : 'text-text-primary'}`}>
                      {notification?.title}
                    </h3>
                    <p className={`text-xs mt-1 ${notification?.read ? 'text-text-secondary' : 'text-text-primary'}`}>
                      {notification?.message}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {!notification?.read && (
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  )}
                  <button
                    onClick={() => markAsRead(notification?.id)}
                    className="text-text-secondary hover:text-text-primary"
                  >
                    <Icon name="MoreHorizontal" size={16} />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-text-secondary">{notification?.timestamp}</span>
                <div className="flex items-center space-x-2">
                  {notification?.actionRequired && (
                    <Button variant="outline" size="sm" className="text-xs">
                      Take Action
                    </Button>
                  )}
                  {notification?.priority === 'high' && (
                    <span className="px-2 py-1 bg-error/10 text-error text-xs rounded-full font-medium">
                      High Priority
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-3 rounded-lg bg-primary/10">
            <div className="text-lg font-bold text-primary">
              {notifications?.filter(n => !n?.read)?.length}
            </div>
            <div className="text-xs text-text-secondary">Unread</div>
          </div>
          <div className="p-3 rounded-lg bg-warning/10">
            <div className="text-lg font-bold text-warning">
              {notifications?.filter(n => n?.actionRequired)?.length}
            </div>
            <div className="text-xs text-text-secondary">Action Required</div>
          </div>
          <div className="p-3 rounded-lg bg-error/10">
            <div className="text-lg font-bold text-error">
              {notifications?.filter(n => n?.priority === 'high')?.length}
            </div>
            <div className="text-xs text-text-secondary">High Priority</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;