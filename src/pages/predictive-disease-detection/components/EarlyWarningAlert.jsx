import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EarlyWarningAlert = ({ alert }) => {
  const getAlertStyle = (severity) => {
    switch (severity) {
      case 'critical':
        return {
          container: 'bg-destructive/10 border-destructive/30 border-l-4 border-l-destructive',
          icon: 'text-destructive',
          title: 'text-destructive',
          iconName: 'AlertCircle'
        };
      case 'warning':
        return {
          container: 'bg-warning/10 border-warning/30 border-l-4 border-l-warning',
          icon: 'text-warning',
          title: 'text-warning',
          iconName: 'AlertTriangle'
        };
      case 'info':
        return {
          container: 'bg-primary/10 border-primary/30 border-l-4 border-l-primary',
          icon: 'text-primary',
          title: 'text-primary',
          iconName: 'Info'
        };
      default:
        return {
          container: 'bg-muted border-border border-l-4 border-l-text-secondary',
          icon: 'text-text-secondary',
          title: 'text-text-primary',
          iconName: 'Bell'
        };
    }
  };

  const style = getAlertStyle(alert?.severity);

  return (
    <div className={`medical-card p-4 ${style?.container}`}>
      <div className="flex items-start space-x-3">
        <div className={`p-2 rounded-lg bg-surface ${style?.icon}`}>
          <Icon name={style?.iconName} size={20} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h4 className={`font-semibold ${style?.title}`}>{alert?.title}</h4>
            <span className="text-xs text-text-secondary">{alert?.timestamp}</span>
          </div>
          
          <p className="text-sm text-text-secondary mb-3 leading-relaxed">
            {alert?.description}
          </p>

          {alert?.recommendations && (
            <div className="mb-4">
              <p className="text-xs font-medium text-text-primary mb-2">Recommended Actions:</p>
              <ul className="space-y-1">
                {alert?.recommendations?.map((rec, index) => (
                  <li key={index} className="flex items-start space-x-2 text-xs text-text-secondary">
                    <Icon name="ChevronRight" size={12} className="mt-0.5 text-primary" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-xs text-text-secondary">
              <span className="flex items-center space-x-1">
                <Icon name="TrendingUp" size={12} />
                <span>Risk: {alert?.riskIncrease}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Icon name="Clock" size={12} />
                <span>Timeline: {alert?.timeline}</span>
              </span>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="xs">
                Dismiss
              </Button>
              <Button variant="default" size="xs" className="bg-primary hover:bg-primary/90">
                Take Action
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarlyWarningAlert;