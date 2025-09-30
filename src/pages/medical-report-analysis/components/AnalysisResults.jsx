import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AnalysisResults = ({ analysisData, onNewAnalysis }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev?.[sectionId]
    }));
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'detailed', label: 'Detailed Analysis', icon: 'FileText' },
    { id: 'trends', label: 'Trends', icon: 'TrendingUp' },
    { id: 'recommendations', label: 'Recommendations', icon: 'Lightbulb' }
  ];

  const mockAnalysisData = {
    overview: {
      overallHealth: "Good",
      riskLevel: "Low",
      keyFindings: [
        "Blood pressure within normal range",
        "Cholesterol levels slightly elevated",
        "Vitamin D deficiency detected",
        "Kidney function normal"
      ],
      criticalAlerts: []
    },
    vitals: [
      { parameter: "Blood Pressure", value: "118/76 mmHg", status: "normal", range: "< 120/80" },
      { parameter: "Heart Rate", value: "72 bpm", status: "normal", range: "60-100" },
      { parameter: "Total Cholesterol", value: "210 mg/dL", status: "elevated", range: "< 200" },
      { parameter: "HDL Cholesterol", value: "45 mg/dL", status: "low", range: "> 50" },
      { parameter: "Blood Sugar", value: "95 mg/dL", status: "normal", range: "70-100" },
      { parameter: "Vitamin D", value: "18 ng/mL", status: "deficient", range: "30-100" }
    ],
    trends: [
      { parameter: "Cholesterol", trend: "increasing", change: "+15 mg/dL", period: "6 months" },
      { parameter: "Weight", trend: "stable", change: "+2 lbs", period: "3 months" },
      { parameter: "Blood Pressure", trend: "improving", change: "-8 mmHg", period: "6 months" }
    ],
    recommendations: [
      {
        category: "Nutrition",
        priority: "high",
        items: [
          "Reduce saturated fat intake to lower cholesterol",
          "Increase omega-3 rich foods (salmon, walnuts)",
          "Consider vitamin D supplementation"
        ]
      },
      {
        category: "Lifestyle",
        priority: "medium",
        items: [
          "Maintain current exercise routine",
          "Get 15-20 minutes of sunlight daily",
          "Monitor cholesterol levels in 3 months"
        ]
      }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal': return 'text-success bg-success/10';
      case 'elevated': case 'high': return 'text-warning bg-warning/10';
      case 'low': case 'deficient': return 'text-error bg-error/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'normal': return 'CheckCircle';
      case 'elevated': case 'high': return 'AlertTriangle';
      case 'low': case 'deficient': return 'AlertCircle';
      default: return 'Info';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing': return 'TrendingUp';
      case 'decreasing': return 'TrendingDown';
      case 'stable': return 'Minus';
      case 'improving': return 'ArrowUp';
      default: return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'improving': return 'text-success';
      case 'increasing': return 'text-warning';
      case 'decreasing': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Analysis Complete</h2>
          <p className="text-text-secondary">Generated on {new Date()?.toLocaleDateString()}</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Icon name="Download" size={16} className="mr-2" />
            Download PDF
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="Share" size={16} className="mr-2" />
            Share
          </Button>
          <Button variant="default" size="sm" onClick={onNewAnalysis}>
            <Icon name="Plus" size={16} className="mr-2" />
            New Analysis
          </Button>
        </div>
      </div>
      {/* Health Score Card */}
      <div className="medical-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Overall Health Score</h3>
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} className="text-success" />
            <span className="text-sm text-success font-medium">HIPAA Compliant</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-3">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-muted"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - 0.78)}`}
                  className="text-success transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-success">78</span>
              </div>
            </div>
            <p className="font-medium text-text-primary">Health Score</p>
            <p className="text-sm text-text-secondary">Good condition</p>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Risk Level</span>
              <span className="px-2 py-1 bg-success/10 text-success text-xs font-medium rounded-full">Low</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Critical Alerts</span>
              <span className="text-sm font-medium text-text-primary">0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Parameters Analyzed</span>
              <span className="text-sm font-medium text-text-primary">24</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium text-text-primary">Key Findings</h4>
            {mockAnalysisData?.overview?.keyFindings?.slice(0, 3)?.map((finding, index) => (
              <div key={index} className="flex items-start space-x-2">
                <Icon name="CheckCircle" size={14} className="text-success mt-0.5" />
                <span className="text-sm text-text-secondary">{finding}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab?.id
                  ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </nav>
      </div>
      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Vital Parameters */}
            <div className="medical-card p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Vital Parameters</h3>
              <div className="space-y-4">
                {mockAnalysisData?.vitals?.map((vital, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(vital?.status)}`}>
                        <Icon name={getStatusIcon(vital?.status)} size={16} />
                      </div>
                      <div>
                        <p className="font-medium text-text-primary text-sm">{vital?.parameter}</p>
                        <p className="text-xs text-text-secondary">Normal: {vital?.range}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-text-primary">{vital?.value}</p>
                      <p className={`text-xs capitalize ${getStatusColor(vital?.status)?.split(' ')?.[0]}`}>
                        {vital?.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Recommendations */}
            <div className="medical-card p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Recommendations</h3>
              <div className="space-y-4">
                {mockAnalysisData?.recommendations?.map((category, index) => (
                  <div key={index}>
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Target" size={16} className="text-primary" />
                      <h4 className="font-medium text-text-primary">{category?.category}</h4>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        category?.priority === 'high' ? 'bg-error/10 text-error' : 'bg-warning/10 text-warning'
                      }`}>
                        {category?.priority}
                      </span>
                    </div>
                    <div className="space-y-1 ml-6">
                      {category?.items?.slice(0, 2)?.map((item, itemIndex) => (
                        <p key={itemIndex} className="text-sm text-text-secondary">• {item}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'detailed' && (
          <div className="space-y-6">
            <div className="medical-card p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Detailed Medical Analysis</h3>
              <div className="prose max-w-none">
                <p className="text-text-secondary mb-4">
                  Based on the comprehensive analysis of your medical reports, here are the detailed findings:
                </p>
                
                <div className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-medium text-text-primary mb-2">Cardiovascular Health</h4>
                    <p className="text-sm text-text-secondary">
                      Your blood pressure readings show excellent control at 118/76 mmHg, well within the optimal range. 
                      However, total cholesterol at 210 mg/dL indicates mild elevation that warrants attention through dietary modifications.
                    </p>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-medium text-text-primary mb-2">Metabolic Profile</h4>
                    <p className="text-sm text-text-secondary">
                      Blood glucose levels are well-controlled at 95 mg/dL, indicating good metabolic health. 
                      Continue current lifestyle practices to maintain this optimal range.
                    </p>
                  </div>
                  
                  <div className="bg-warning/10 border border-warning/20 p-4 rounded-lg">
                    <h4 className="font-medium text-warning mb-2">Areas Requiring Attention</h4>
                    <p className="text-sm text-text-secondary">
                      Vitamin D deficiency at 18 ng/mL requires immediate supplementation. Low HDL cholesterol at 45 mg/dL 
                      suggests need for increased physical activity and dietary omega-3 fatty acids.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'trends' && (
          <div className="medical-card p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Health Trends Analysis</h3>
            <div className="space-y-4">
              {mockAnalysisData?.trends?.map((trend, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-muted ${getTrendColor(trend?.trend)}`}>
                      <Icon name={getTrendIcon(trend?.trend)} size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">{trend?.parameter}</p>
                      <p className="text-sm text-text-secondary">Over {trend?.period}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${getTrendColor(trend?.trend)}`}>{trend?.change}</p>
                    <p className="text-sm text-text-secondary capitalize">{trend?.trend}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="space-y-6">
            {mockAnalysisData?.recommendations?.map((category, index) => (
              <div key={index} className="medical-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="Target" size={20} className="text-primary" />
                    <h3 className="text-lg font-semibold text-text-primary">{category?.category}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                      category?.priority === 'high' ? 'bg-error/10 text-error' : 'bg-warning/10 text-warning'
                    }`}>
                      {category?.priority} priority
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSection(`rec-${index}`)}
                  >
                    <Icon name={expandedSections?.[`rec-${index}`] ? "ChevronUp" : "ChevronDown"} size={16} />
                  </Button>
                </div>
                
                <div className={`space-y-3 ${expandedSections?.[`rec-${index}`] ? 'block' : 'hidden'}`}>
                  {category?.items?.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                      <Icon name="CheckSquare" size={16} className="text-primary mt-0.5" />
                      <p className="text-sm text-text-secondary">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisResults;