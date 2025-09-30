import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MedicationCard = ({ medication, onViewDetails, onAddToTracker }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high': return 'text-error bg-error/10 border-error/20';
      case 'moderate': return 'text-warning bg-warning/10 border-warning/20';
      case 'low': return 'text-success bg-success/10 border-success/20';
      default: return 'text-text-secondary bg-muted border-border';
    }
  };

  const getStrengthBadge = (strength) => {
    if (!strength) return null;
    return (
      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20">
        {strength}
      </span>
    );
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm hover:shadow-medical transition-all duration-200 conversion-hover">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Pill" size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary">{medication?.name}</h3>
              <p className="text-sm text-text-secondary">{medication?.genericName}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {getStrengthBadge(medication?.strength)}
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-accent/10 text-accent border border-accent/20">
              {medication?.form}
            </span>
            {medication?.prescription && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-warning/10 text-warning border border-warning/20">
                <Icon name="FileText" size={12} className="mr-1" />
                Prescription Required
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {medication?.aiRecommended && (
            <div className="flex items-center space-x-1 px-2 py-1 bg-primary/10 rounded-md">
              <Icon name="Sparkles" size={14} className="text-primary" />
              <span className="text-xs font-medium text-primary">AI Recommended</span>
            </div>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} className="text-text-secondary" />
          </button>
        </div>
      </div>
      <div className="space-y-3 mb-4">
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-1">Primary Uses</h4>
          <p className="text-sm text-text-secondary">{medication?.primaryUses}</p>
        </div>

        {medication?.matchScore && (
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-text-primary">Match Score:</span>
            <div className="flex-1 bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${medication?.matchScore}%` }}
              />
            </div>
            <span className="text-sm font-semibold text-primary">{medication?.matchScore}%</span>
          </div>
        )}

        {medication?.sideEffects && medication?.sideEffects?.length > 0 && (
          <div className={`p-3 rounded-lg border ${getSeverityColor(medication?.sideEffectSeverity)}`}>
            <div className="flex items-center space-x-2 mb-1">
              <Icon name="AlertTriangle" size={16} />
              <span className="text-sm font-medium">Common Side Effects</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {medication?.sideEffects?.slice(0, isExpanded ? medication?.sideEffects?.length : 3)?.map((effect, index) => (
                <span key={index} className="text-xs px-2 py-1 bg-background/50 rounded-md">
                  {effect}
                </span>
              ))}
              {!isExpanded && medication?.sideEffects?.length > 3 && (
                <span className="text-xs text-text-secondary">+{medication?.sideEffects?.length - 3} more</span>
              )}
            </div>
          </div>
        )}
      </div>
      {isExpanded && (
        <div className="space-y-4 border-t border-border pt-4">
          {medication?.dosageInfo && (
            <div>
              <h4 className="text-sm font-medium text-text-primary mb-2">Dosage Information</h4>
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-sm text-text-secondary">{medication?.dosageInfo}</p>
              </div>
            </div>
          )}

          {medication?.contraindications && medication?.contraindications?.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-text-primary mb-2">Contraindications</h4>
              <div className="space-y-1">
                {medication?.contraindications?.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm text-text-secondary">
                    <Icon name="X" size={12} className="text-error" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {medication?.interactions && medication?.interactions?.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-text-primary mb-2">Drug Interactions</h4>
              <div className="space-y-2">
                {medication?.interactions?.map((interaction, index) => (
                  <div key={index} className={`p-2 rounded-lg border ${getSeverityColor(interaction?.severity)}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{interaction?.drug}</span>
                      <span className="text-xs px-2 py-1 rounded-md bg-background/50">
                        {interaction?.severity}
                      </span>
                    </div>
                    <p className="text-xs mt-1">{interaction?.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      <div className="flex space-x-3 pt-4 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(medication)}
          iconName="Eye"
          iconPosition="left"
          className="flex-1"
        >
          View Details
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={() => onAddToTracker(medication)}
          iconName="Plus"
          iconPosition="left"
          className="flex-1 bg-primary hover:bg-primary/90"
        >
          Add to Tracker
        </Button>
      </div>
    </div>
  );
};

export default MedicationCard;