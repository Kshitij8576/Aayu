import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PreventiveCareSchedule = ({ scheduleData }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('upcoming');

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'urgent': return 'text-destructive bg-destructive/10 border-destructive/20';
      case 'important': return 'text-warning bg-warning/10 border-warning/20';
      case 'routine': return 'text-primary bg-primary/10 border-primary/20';
      default: return 'text-text-secondary bg-muted border-border';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success bg-success/10';
      case 'scheduled': return 'text-primary bg-primary/10';
      case 'overdue': return 'text-destructive bg-destructive/10';
      case 'pending': return 'text-warning bg-warning/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const timeframes = [
    { id: 'upcoming', label: 'Upcoming', icon: 'Calendar' },
    { id: 'overdue', label: 'Overdue', icon: 'AlertCircle' },
    { id: 'completed', label: 'Completed', icon: 'CheckCircle' }
  ];

  const filteredSchedule = scheduleData?.items?.filter(item => {
    if (selectedTimeframe === 'upcoming') return item?.status === 'scheduled' || item?.status === 'pending';
    if (selectedTimeframe === 'overdue') return item?.status === 'overdue';
    if (selectedTimeframe === 'completed') return item?.status === 'completed';
    return true;
  });

  return (
    <div className="medical-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-accent/10 rounded-lg">
            <Icon name="Calendar" size={24} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Preventive Care Schedule</h3>
            <p className="text-sm text-text-secondary">Stay ahead with proactive healthcare</p>
          </div>
        </div>
        <Button variant="outline" size="sm" iconName="Plus">
          Add Screening
        </Button>
      </div>
      {/* Timeframe Tabs */}
      <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg">
        {timeframes?.map((timeframe) => (
          <button
            key={timeframe?.id}
            onClick={() => setSelectedTimeframe(timeframe?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              selectedTimeframe === timeframe?.id
                ? 'bg-surface text-text-primary shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Icon name={timeframe?.icon} size={16} />
            <span>{timeframe?.label}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              selectedTimeframe === timeframe?.id ? 'bg-primary/10 text-primary' : 'bg-muted text-text-secondary'
            }`}>
              {scheduleData?.counts?.[timeframe?.id]}
            </span>
          </button>
        ))}
      </div>
      {/* Schedule Items */}
      <div className="space-y-4">
        {filteredSchedule?.map((item) => (
          <div key={item?.id} className={`p-4 border rounded-lg ${getUrgencyColor(item?.urgency)}`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-surface rounded-lg">
                  <Icon name={item?.icon} size={20} className="text-text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-text-primary">{item?.title}</h4>
                  <p className="text-sm text-text-secondary mb-2">{item?.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-text-secondary">
                    <span className="flex items-center space-x-1">
                      <Icon name="Calendar" size={12} />
                      <span>{item?.dueDate}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="MapPin" size={12} />
                      <span>{item?.location}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} />
                      <span>{item?.duration}</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item?.status)}`}>
                  {item?.status?.toUpperCase()}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(item?.urgency)}`}>
                  {item?.urgency?.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Risk Factors */}
            {item?.riskFactors && (
              <div className="mb-3">
                <p className="text-xs font-medium text-text-primary mb-2">Based on your risk factors:</p>
                <div className="flex flex-wrap gap-2">
                  {item?.riskFactors?.map((factor, index) => (
                    <span key={index} className="px-2 py-1 bg-surface text-text-secondary text-xs rounded-md">
                      {factor}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Preparation Instructions */}
            {item?.preparation && (
              <div className="mb-3 p-3 bg-surface rounded-lg">
                <p className="text-xs font-medium text-text-primary mb-1">Preparation Required:</p>
                <p className="text-xs text-text-secondary">{item?.preparation}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs text-text-secondary">
                {item?.lastCompleted && (
                  <span>Last: {item?.lastCompleted}</span>
                )}
                {item?.frequency && (
                  <span>Frequency: {item?.frequency}</span>
                )}
              </div>
              <div className="flex space-x-2">
                {item?.status === 'scheduled' && (
                  <>
                    <Button variant="outline" size="xs">
                      Reschedule
                    </Button>
                    <Button variant="default" size="xs" className="bg-primary hover:bg-primary/90">
                      View Details
                    </Button>
                  </>
                )}
                {item?.status === 'pending' && (
                  <Button variant="default" size="xs" className="bg-accent hover:bg-accent/90">
                    Schedule Now
                  </Button>
                )}
                {item?.status === 'overdue' && (
                  <Button variant="default" size="xs" className="bg-destructive hover:bg-destructive/90">
                    Schedule Urgent
                  </Button>
                )}
                {item?.status === 'completed' && (
                  <Button variant="outline" size="xs">
                    View Results
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredSchedule?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Calendar" size={48} className="text-text-secondary mb-4 mx-auto" />
          <h4 className="font-medium text-text-primary mb-2">No {selectedTimeframe} screenings</h4>
          <p className="text-sm text-text-secondary">
            {selectedTimeframe === 'upcoming' && "You're all caught up with your preventive care!"}
            {selectedTimeframe === 'overdue' && "Great! No overdue screenings."}
            {selectedTimeframe === 'completed' && "No completed screenings to show."}
          </p>
        </div>
      )}
      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{scheduleData?.stats?.nextScreening}</div>
            <div className="text-sm text-text-secondary">Days to Next</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">{scheduleData?.stats?.completionRate}%</div>
            <div className="text-sm text-text-secondary">Completion Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">{scheduleData?.stats?.riskReduction}%</div>
            <div className="text-sm text-text-secondary">Risk Reduction</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-text-primary">{scheduleData?.stats?.totalScreenings}</div>
            <div className="text-sm text-text-secondary">Total Screenings</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreventiveCareSchedule;