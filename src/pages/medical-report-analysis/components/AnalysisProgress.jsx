import React from 'react';
import Icon from '../../../components/AppIcon';

const AnalysisProgress = ({ currentStep, analysisData }) => {
  const analysisSteps = [
    {
      id: 1,
      title: "Document Processing",
      description: "Extracting text and medical data from uploaded files",
      icon: "FileSearch",
      estimatedTime: "30 seconds"
    },
    {
      id: 2,
      title: "Medical Entity Recognition",
      description: "Identifying medical terms, conditions, and measurements",
      icon: "Brain",
      estimatedTime: "45 seconds"
    },
    {
      id: 3,
      title: "Clinical Analysis",
      description: "Analyzing medical patterns and correlations",
      icon: "Activity",
      estimatedTime: "60 seconds"
    },
    {
      id: 4,
      title: "Report Generation",
      description: "Generating comprehensive analysis and recommendations",
      icon: "FileText",
      estimatedTime: "30 seconds"
    },
    {
      id: 5,
      title: "Quality Validation",
      description: "Validating results and ensuring accuracy",
      icon: "CheckCircle",
      estimatedTime: "15 seconds"
    }
  ];

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'active';
    return 'pending';
  };

  const getStepIcon = (step, status) => {
    if (status === 'completed') return 'CheckCircle';
    if (status === 'active') return step?.icon;
    return step?.icon;
  };

  const getStepColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'active': return 'text-primary';
      default: return 'text-text-secondary';
    }
  };

  const getStepBgColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-success/10 border-success/20';
      case 'active': return 'bg-primary/10 border-primary/20';
      default: return 'bg-muted border-border';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <Icon name="Zap" size={32} className="text-primary health-pulse" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary">AI Analysis in Progress</h2>
        <p className="text-text-secondary">
          Our advanced AI is analyzing your medical reports. This process typically takes 2-3 minutes.
        </p>
      </div>
      {/* Progress Steps */}
      <div className="space-y-4">
        {analysisSteps?.map((step, index) => {
          const status = getStepStatus(step?.id);
          const isLast = index === analysisSteps?.length - 1;
          
          return (
            <div key={step?.id} className="relative">
              <div className={`flex items-start space-x-4 p-4 rounded-lg border transition-all duration-300 ${getStepBgColor(status)}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  status === 'completed' ? 'bg-success text-white' :
                  status === 'active'? 'bg-primary text-white' : 'bg-muted text-text-secondary'
                }`}>
                  {status === 'active' ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Icon name={getStepIcon(step, status)} size={20} />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`font-medium ${getStepColor(status)}`}>
                      {step?.title}
                    </h3>
                    <span className="text-xs text-text-secondary">
                      {step?.estimatedTime}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary">
                    {step?.description}
                  </p>
                  
                  {status === 'active' && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs text-text-secondary mb-1">
                        <span>Processing...</span>
                        <span>85%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div className="bg-primary h-1.5 rounded-full transition-all duration-300" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* Connector Line */}
              {!isLast && (
                <div className={`absolute left-8 top-16 w-0.5 h-4 ${
                  status === 'completed' ? 'bg-success' : 'bg-border'
                }`}></div>
              )}
            </div>
          );
        })}
      </div>
      {/* Analysis Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-primary mb-1">
            {analysisData?.documentsProcessed || 3}
          </div>
          <div className="text-xs text-text-secondary">Documents Processed</div>
        </div>
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-secondary mb-1">
            {analysisData?.medicalEntities || 127}
          </div>
          <div className="text-xs text-text-secondary">Medical Entities</div>
        </div>
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-success mb-1">
            {analysisData?.pagesAnalyzed || 15}
          </div>
          <div className="text-xs text-text-secondary">Pages Analyzed</div>
        </div>
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-warning mb-1">
            {analysisData?.insights || 8}
          </div>
          <div className="text-xs text-text-secondary">Key Insights</div>
        </div>
      </div>
      {/* Real-time Updates */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <div>
            <p className="text-sm font-medium text-text-primary">Real-time Analysis Updates</p>
            <p className="text-xs text-text-secondary">
              {currentStep === 1 && "Extracting medical data from your lab reports..."}
              {currentStep === 2 && "Identifying blood test parameters and vital signs..."}
              {currentStep === 3 && "Analyzing trends and comparing with normal ranges..."}
              {currentStep === 4 && "Generating personalized health insights..."}
              {currentStep === 5 && "Finalizing your comprehensive medical analysis..."}
            </p>
          </div>
        </div>
      </div>
      {/* Cancel Option */}
      <div className="text-center">
        <button className="text-sm text-text-secondary hover:text-text-primary transition-colors">
          Cancel Analysis
        </button>
      </div>
    </div>
  );
};

export default AnalysisProgress;