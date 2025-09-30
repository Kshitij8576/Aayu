import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PersonalizedRecommendations = ({ recommendations, userProfile, onViewRecommendation }) => {
  const getRecommendationIcon = (type) => {
    switch (type) {
      case 'alternative': return 'ArrowRightLeft';
      case 'supplement': return 'Leaf';
      case 'lifestyle': return 'Heart';
      case 'dosage': return 'Calculator';
      default: return 'Lightbulb';
    }
  };

  const getRecommendationColor = (type) => {
    switch (type) {
      case 'alternative': return 'text-secondary bg-secondary/10 border-secondary/20';
      case 'supplement': return 'text-success bg-success/10 border-success/20';
      case 'lifestyle': return 'text-accent bg-accent/10 border-accent/20';
      case 'dosage': return 'text-warning bg-warning/10 border-warning/20';
      default: return 'text-primary bg-primary/10 border-primary/20';
    }
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      high: 'bg-error/10 text-error border-error/20',
      medium: 'bg-warning/10 text-warning border-warning/20',
      low: 'bg-success/10 text-success border-success/20'
    };
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${colors?.[priority] || colors?.medium}`}>
        {priority?.charAt(0)?.toUpperCase() + priority?.slice(1)}Priority
              </span>
    );
  };

  if (!recommendations || recommendations?.length === 0) {
    return (
      <div className="bg-card rounded-xl border border-border p-8 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Lightbulb" size={24} className="text-text-secondary" />
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">No Recommendations Yet</h3>
        <p className="text-text-secondary">Search for medications or complete your health profile to get personalized recommendations.</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-medical">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Sparkles" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">AI-Powered Recommendations</h3>
            <p className="text-sm text-text-secondary">Personalized suggestions based on your health profile</p>
          </div>
        </div>
        
        {userProfile && (
          <div className="text-right">
            <p className="text-xs text-text-secondary">Profile Completeness</p>
            <div className="flex items-center space-x-2 mt-1">
              <div className="w-16 bg-muted rounded-full h-1.5">
                <div 
                  className="bg-primary h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${userProfile?.completeness || 0}%` }}
                />
              </div>
              <span className="text-xs font-medium text-primary">{userProfile?.completeness || 0}%</span>
            </div>
          </div>
        )}
      </div>
      <div className="space-y-4">
        {recommendations?.map((recommendation, index) => (
          <div key={index} className="border border-border rounded-lg p-4 hover:shadow-sm transition-all duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getRecommendationColor(recommendation?.type)}`}>
                  <Icon name={getRecommendationIcon(recommendation?.type)} size={16} />
                </div>
                <div>
                  <h4 className="font-medium text-text-primary">{recommendation?.title}</h4>
                  <p className="text-sm text-text-secondary">{recommendation?.category}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {getPriorityBadge(recommendation?.priority)}
                {recommendation?.aiConfidence && (
                  <span className="text-xs text-text-secondary">
                    {recommendation?.aiConfidence}% confidence
                  </span>
                )}
              </div>
            </div>

            <p className="text-sm text-text-secondary mb-4">{recommendation?.description}</p>

            {recommendation?.benefits && recommendation?.benefits?.length > 0 && (
              <div className="mb-4">
                <h5 className="text-xs font-medium text-text-primary mb-2">Potential Benefits:</h5>
                <div className="flex flex-wrap gap-1">
                  {recommendation?.benefits?.map((benefit, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 bg-success/10 text-success rounded-md">
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {recommendation?.considerations && recommendation?.considerations?.length > 0 && (
              <div className="mb-4">
                <h5 className="text-xs font-medium text-text-primary mb-2">Considerations:</h5>
                <div className="space-y-1">
                  {recommendation?.considerations?.map((consideration, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-text-secondary">
                      <Icon name="AlertCircle" size={12} className="text-warning mt-0.5" />
                      <span>{consideration}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center space-x-4 text-xs text-text-secondary">
                {recommendation?.estimatedSavings && (
                  <div className="flex items-center space-x-1">
                    <Icon name="DollarSign" size={12} className="text-success" />
                    <span>Save ${recommendation?.estimatedSavings}/month</span>
                  </div>
                )}
                {recommendation?.timeToEffect && (
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} />
                    <span>Effect in {recommendation?.timeToEffect}</span>
                  </div>
                )}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewRecommendation(recommendation)}
                iconName="ArrowRight"
                iconPosition="right"
              >
                Learn More
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
        <div className="flex items-start space-x-3">
          <Icon name="Brain" size={16} className="text-primary mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-text-primary mb-1">AI-Powered Analysis</p>
            <p className="text-text-secondary">These recommendations are generated using advanced AI algorithms that analyze your health profile, medical history, and current medications. Always consult with your healthcare provider before making any changes.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedRecommendations;