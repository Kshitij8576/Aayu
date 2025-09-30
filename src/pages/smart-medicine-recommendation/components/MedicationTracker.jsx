import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MedicationTracker = ({ trackedMedications, onUpdateMedication, onRemoveMedication }) => {
  const [expandedCard, setExpandedCard] = useState(null);

  const getAdherenceColor = (percentage) => {
    if (percentage >= 90) return 'text-success bg-success/10 border-success/20';
    if (percentage >= 70) return 'text-warning bg-warning/10 border-warning/20';
    return 'text-error bg-error/10 border-error/20';
  };

  const getNextDoseTime = (schedule) => {
    const now = new Date();
    const times = schedule?.times || [];
    
    for (const time of times) {
      const [hours, minutes] = time?.split(':')?.map(Number);
      const nextDose = new Date(now);
      nextDose?.setHours(hours, minutes, 0, 0);
      
      if (nextDose > now) {
        return nextDose?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
    }
    
    // If no dose today, return first dose tomorrow
    if (times?.length > 0) {
      const [hours, minutes] = times?.[0]?.split(':')?.map(Number);
      const tomorrow = new Date(now);
      tomorrow?.setDate(tomorrow?.getDate() + 1);
      tomorrow?.setHours(hours, minutes, 0, 0);
      return `Tomorrow ${tomorrow?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    return 'Not scheduled';
  };

  const getDaysRemaining = (refillDate) => {
    if (!refillDate) return null;
    const today = new Date();
    const refill = new Date(refillDate);
    const diffTime = refill - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (!trackedMedications || trackedMedications?.length === 0) {
    return (
      <div className="bg-card rounded-xl border border-border p-8 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Calendar" size={24} className="text-text-secondary" />
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">No Medications Tracked</h3>
        <p className="text-text-secondary mb-4">Add medications to your tracker to monitor adherence and get refill reminders.</p>
        <Button variant="outline" iconName="Plus" iconPosition="left">
          Add First Medication
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-medical">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Calendar" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Medication Tracker</h3>
            <p className="text-sm text-text-secondary">Monitor adherence and manage your prescriptions</p>
          </div>
        </div>
        
        <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
          Add Medication
        </Button>
      </div>
      <div className="space-y-4">
        {trackedMedications?.map((medication, index) => {
          const isExpanded = expandedCard === index;
          const daysRemaining = getDaysRemaining(medication?.refillDate);
          
          return (
            <div key={index} className="border border-border rounded-lg p-4 hover:shadow-sm transition-all duration-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Pill" size={18} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary">{medication?.name}</h4>
                    <p className="text-sm text-text-secondary">{medication?.dosage} • {medication?.frequency}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {medication?.adherenceRate && (
                    <div className={`px-2 py-1 rounded-md text-xs font-medium border ${getAdherenceColor(medication?.adherenceRate)}`}>
                      {medication?.adherenceRate}% adherence
                    </div>
                  )}
                  <button
                    onClick={() => setExpandedCard(isExpanded ? null : index)}
                    className="p-1 rounded-md hover:bg-muted transition-colors"
                  >
                    <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} className="text-text-secondary" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-text-secondary mb-1">Next Dose</p>
                  <p className="text-sm font-medium text-text-primary">{getNextDoseTime(medication?.schedule)}</p>
                </div>
                
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-text-secondary mb-1">Pills Left</p>
                  <p className="text-sm font-medium text-text-primary">{medication?.pillsRemaining || 'N/A'}</p>
                </div>
                
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-text-secondary mb-1">Refill Due</p>
                  <p className={`text-sm font-medium ${daysRemaining && daysRemaining <= 7 ? 'text-warning' : 'text-text-primary'}`}>
                    {daysRemaining ? `${daysRemaining} days` : 'Not set'}
                  </p>
                </div>
                
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-text-secondary mb-1">Cost/Month</p>
                  <p className="text-sm font-medium text-text-primary">${medication?.monthlyCost || 'N/A'}</p>
                </div>
              </div>
              {isExpanded && (
                <div className="space-y-4 border-t border-border pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-sm font-medium text-text-primary mb-2">Schedule</h5>
                      <div className="space-y-2">
                        {medication?.schedule?.times?.map((time, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
                            <span className="text-sm text-text-secondary">{time}</span>
                            <div className="flex items-center space-x-2">
                              <Icon name="Check" size={14} className="text-success" />
                              <span className="text-xs text-success">Taken</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium text-text-primary mb-2">Recent Activity</h5>
                      <div className="space-y-2">
                        {medication?.recentActivity?.map((activity, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-sm">
                            <Icon 
                              name={activity?.type === 'taken' ? 'Check' : activity?.type === 'missed' ? 'X' : 'Clock'} 
                              size={12} 
                              className={activity?.type === 'taken' ? 'text-success' : activity?.type === 'missed' ? 'text-error' : 'text-warning'} 
                            />
                            <span className="text-text-secondary">{activity?.description}</span>
                            <span className="text-xs text-text-secondary ml-auto">{activity?.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {medication?.sideEffectsTracked && medication?.sideEffectsTracked?.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium text-text-primary mb-2">Side Effects Tracking</h5>
                      <div className="flex flex-wrap gap-2">
                        {medication?.sideEffectsTracked?.map((effect, idx) => (
                          <span key={idx} className={`text-xs px-2 py-1 rounded-md border ${
                            effect?.severity === 'mild' ? 'bg-success/10 text-success border-success/20' :
                            effect?.severity === 'moderate'? 'bg-warning/10 text-warning border-warning/20' : 'bg-error/10 text-error border-error/20'
                          }`}>
                            {effect?.name} ({effect?.severity})
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              <div className="flex space-x-2 pt-3 border-t border-border">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdateMedication(medication)}
                  iconName="Edit"
                  iconPosition="left"
                  className="flex-1"
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Bell"
                  iconPosition="left"
                  className="flex-1"
                >
                  Set Reminder
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveMedication(medication)}
                  iconName="Trash2"
                  className="text-error hover:text-error hover:bg-error/10"
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 p-4 bg-accent/5 rounded-lg border border-accent/20">
        <div className="flex items-start space-x-3">
          <Icon name="Smartphone" size={16} className="text-accent mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-text-primary mb-1">Smart Reminders</p>
            <p className="text-text-secondary">Enable push notifications to never miss a dose. Our AI learns your routine and sends reminders at optimal times.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicationTracker;