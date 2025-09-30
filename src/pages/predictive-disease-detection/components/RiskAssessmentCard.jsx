import React from 'react';
import Icon from '../../../components/AppIcon';

const RiskAssessmentCard = ({ assessment }) => {
  const getRiskColor = (level) => {
    switch (level) {
      case 'low': return 'text-success bg-success/10 border-success/20';
      case 'moderate': return 'text-warning bg-warning/10 border-warning/20';
      case 'high': return 'text-destructive bg-destructive/10 border-destructive/20';
      default: return 'text-text-secondary bg-muted border-border';
    }
  };

  const getRiskIcon = (level) => {
    switch (level) {
      case 'low': return 'Shield';
      case 'moderate': return 'AlertTriangle';
      case 'high': return 'AlertCircle';
      default: return 'Activity';
    }
  };

  return (
    <div className="medical-card p-6 conversion-hover">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${getRiskColor(assessment?.riskLevel)}`}>
            <Icon name={getRiskIcon(assessment?.riskLevel)} size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary">{assessment?.condition}</h3>
            <p className="text-sm text-text-secondary">{assessment?.category}</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getRiskColor(assessment?.riskLevel)}`}>
          {assessment?.riskLevel?.toUpperCase()} RISK
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-text-secondary">Risk Score</span>
            <span className="text-sm font-medium text-text-primary">{assessment?.score}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                assessment?.riskLevel === 'low' ? 'bg-success' :
                assessment?.riskLevel === 'moderate' ? 'bg-warning' : 'bg-destructive'
              }`}
              style={{ width: `${assessment?.score}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-text-secondary">Age Factor</span>
            <p className="font-medium text-text-primary">{assessment?.ageImpact}</p>
          </div>
          <div>
            <span className="text-text-secondary">Genetic</span>
            <p className="font-medium text-text-primary">{assessment?.geneticFactor}</p>
          </div>
        </div>

        <div className="pt-3 border-t border-border">
          <p className="text-sm text-text-secondary mb-2">Key Risk Factors:</p>
          <div className="flex flex-wrap gap-2">
            {assessment?.riskFactors?.map((factor, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-md"
              >
                {factor}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskAssessmentCard;