import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const QuickActionsGrid = () => {
  const quickActions = [
    {
      id: 1,
      title: "Analyze Report",
      description: "Upload and analyze medical reports",
      icon: "FileText",
      route: "/medical-report-analysis",
      color: "bg-primary/10 text-primary border-primary/20",
      iconColor: "text-primary"
    },
    {
      id: 2,
      title: "Medicine Recommendations",
      description: "Get AI-powered medicine suggestions",
      icon: "Pill",
      route: "/smart-medicine-recommendation",
      color: "bg-secondary/10 text-secondary border-secondary/20",
      iconColor: "text-secondary"
    },
    {
      id: 3,
      title: "Health Assistant",
      description: "Chat with your AI health companion",
      icon: "Bot",
      route: "/virtual-health-assistant",
      color: "bg-accent/10 text-accent border-accent/20",
      iconColor: "text-accent"
    },
    {
      id: 4,
      title: "Disease Detection",
      description: "Predictive health screening",
      icon: "Activity",
      route: "/predictive-disease-detection",
      color: "bg-warning/10 text-warning border-warning/20",
      iconColor: "text-warning"
    },
    {
      id: 5,
      title: "Book Appointment",
      description: "Schedule with healthcare providers",
      icon: "Calendar",
      route: "#",
      color: "bg-success/10 text-success border-success/20",
      iconColor: "text-success"
    },
    {
      id: 6,
      title: "Health Records",
      description: "View complete medical history",
      icon: "FolderOpen",
      route: "#",
      color: "bg-purple-500/10 text-purple-500 border-purple-500/20",
      iconColor: "text-purple-500"
    }
  ];

  return (
    <div className="medical-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Quick Actions</h2>
        <Icon name="Zap" size={20} className="text-primary" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions?.map((action) => (
          <Link
            key={action?.id}
            to={action?.route}
            className={`p-4 rounded-lg border transition-all duration-200 conversion-hover group ${action?.color}`}
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg bg-white/50 group-hover:bg-white/80 transition-colors`}>
                <Icon name={action?.icon} size={20} className={action?.iconColor} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm mb-1 group-hover:text-text-primary transition-colors">
                  {action?.title}
                </h3>
                <p className="text-xs opacity-80 group-hover:opacity-100 transition-opacity">
                  {action?.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsGrid;