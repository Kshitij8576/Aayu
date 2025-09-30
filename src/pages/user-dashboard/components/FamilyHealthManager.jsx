import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FamilyHealthManager = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  const familyMembers = [
    {
      id: 1,
      name: "John Doe",
      relation: "Self",
      age: 34,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      healthScore: 85,
      lastCheckup: "Dec 15, 2024",
      upcomingAppointments: 2,
      medications: 1,
      alerts: 0,
      status: "healthy"
    },
    {
      id: 2,
      name: "Sarah Doe",
      relation: "Spouse",
      age: 32,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      healthScore: 92,
      lastCheckup: "Nov 28, 2024",
      upcomingAppointments: 1,
      medications: 0,
      alerts: 0,
      status: "excellent"
    },
    {
      id: 3,
      name: "Emma Doe",
      relation: "Daughter",
      age: 8,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
      healthScore: 88,
      lastCheckup: "Jan 5, 2025",
      upcomingAppointments: 0,
      medications: 0,
      alerts: 1,
      status: "healthy"
    },
    {
      id: 4,
      name: "Robert Doe Sr.",
      relation: "Father",
      age: 68,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      healthScore: 72,
      lastCheckup: "Oct 20, 2024",
      upcomingAppointments: 3,
      medications: 4,
      alerts: 2,
      status: "monitoring"
    }
  ];

  const getHealthScoreColor = (score) => {
    if (score >= 85) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-error';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'bg-success/10 text-success';
      case 'healthy': return 'bg-primary/10 text-primary';
      case 'monitoring': return 'bg-warning/10 text-warning';
      case 'attention': return 'bg-error/10 text-error';
      default: return 'bg-muted text-text-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'excellent': return 'CheckCircle';
      case 'healthy': return 'Heart';
      case 'monitoring': return 'AlertTriangle';
      case 'attention': return 'AlertCircle';
      default: return 'User';
    }
  };

  return (
    <div className="medical-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Family Health Manager</h2>
        <Button variant="outline" size="sm" iconName="UserPlus" iconPosition="left">
          Add Member
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {familyMembers?.map((member) => (
          <div 
            key={member?.id} 
            className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer conversion-hover ${
              selectedMember === member?.id 
                ? 'border-primary bg-primary/5' :'border-border bg-card hover:border-primary/30'
            }`}
            onClick={() => setSelectedMember(selectedMember === member?.id ? null : member?.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                    <img 
                      src={member?.avatar} 
                      alt={member?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center ${getStatusColor(member?.status)}`}>
                    <Icon name={getStatusIcon(member?.status)} size={12} />
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-text-primary">{member?.name}</h3>
                  <p className="text-sm text-text-secondary">{member?.relation} • {member?.age} years</p>
                </div>
              </div>
              {member?.alerts > 0 && (
                <div className="flex items-center space-x-1 bg-error/10 text-error px-2 py-1 rounded-full">
                  <Icon name="Bell" size={12} />
                  <span className="text-xs font-medium">{member?.alerts}</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className={`text-lg font-bold ${getHealthScoreColor(member?.healthScore)}`}>
                  {member?.healthScore}
                </div>
                <div className="text-xs text-text-secondary">Health Score</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-text-primary">{member?.upcomingAppointments}</div>
                <div className="text-xs text-text-secondary">Appointments</div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Last Checkup:</span>
                <span className="text-text-primary">{member?.lastCheckup}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Medications:</span>
                <span className="text-text-primary">{member?.medications} active</span>
              </div>
            </div>

            {selectedMember === member?.id && (
              <div className="pt-4 border-t border-border">
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="ghost" size="sm" iconName="FileText">
                    View Records
                  </Button>
                  <Button variant="ghost" size="sm" iconName="Calendar">
                    Appointments
                  </Button>
                  <Button variant="ghost" size="sm" iconName="Pill">
                    Medications
                  </Button>
                  <Button variant="ghost" size="sm" iconName="Activity">
                    Health Data
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div className="p-3 rounded-lg bg-primary/10">
            <div className="text-lg font-bold text-primary">4</div>
            <div className="text-xs text-text-secondary">Family Members</div>
          </div>
          <div className="p-3 rounded-lg bg-success/10">
            <div className="text-lg font-bold text-success">6</div>
            <div className="text-xs text-text-secondary">Upcoming Appointments</div>
          </div>
          <div className="p-3 rounded-lg bg-warning/10">
            <div className="text-lg font-bold text-warning">5</div>
            <div className="text-xs text-text-secondary">Active Medications</div>
          </div>
          <div className="p-3 rounded-lg bg-error/10">
            <div className="text-lg font-bold text-error">3</div>
            <div className="text-xs text-text-secondary">Health Alerts</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyHealthManager;