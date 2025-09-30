import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentAnalyses = ({ onSelectAnalysis }) => {
  const [sortBy, setSortBy] = useState('date');
  const [filterBy, setFilterBy] = useState('all');

  const mockAnalyses = [
    {
      id: 1,
      title: "Complete Blood Count & Lipid Panel",
      date: "2024-09-28",
      type: "Lab Report",
      status: "completed",
      riskLevel: "low",
      keyFindings: ["Cholesterol elevated", "Vitamin D deficient"],
      filesCount: 3,
      healthScore: 78,
      reportTypes: ["Blood Test", "Lipid Panel"]
    },
    {
      id: 2,
      title: "Annual Physical Examination",
      date: "2024-09-15",
      type: "Medical Report",
      status: "completed",
      riskLevel: "low",
      keyFindings: ["Blood pressure normal", "BMI within range"],
      filesCount: 2,
      healthScore: 85,
      reportTypes: ["Physical Exam", "Vital Signs"]
    },
    {
      id: 3,
      title: "Chest X-Ray Analysis",
      date: "2024-09-10",
      type: "Imaging",
      status: "completed",
      riskLevel: "normal",
      keyFindings: ["Clear lung fields", "Normal heart size"],
      filesCount: 1,
      healthScore: 92,
      reportTypes: ["X-Ray", "Radiology"]
    },
    {
      id: 4,
      title: "Diabetes Monitoring Panel",
      date: "2024-08-25",
      type: "Lab Report",
      status: "completed",
      riskLevel: "medium",
      keyFindings: ["HbA1c slightly elevated", "Glucose controlled"],
      filesCount: 2,
      healthScore: 72,
      reportTypes: ["Blood Test", "Glucose"]
    },
    {
      id: 5,
      title: "Cardiac Stress Test",
      date: "2024-08-12",
      type: "Diagnostic",
      status: "completed",
      riskLevel: "low",
      keyFindings: ["Normal cardiac function", "Good exercise tolerance"],
      filesCount: 4,
      healthScore: 88,
      reportTypes: ["ECG", "Stress Test"]
    }
  ];

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'low': return 'text-success bg-success/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'high': return 'text-error bg-error/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Lab Report': return 'TestTube';
      case 'Medical Report': return 'FileText';
      case 'Imaging': return 'Scan';
      case 'Diagnostic': return 'Activity';
      default: return 'FileText';
    }
  };

  const getHealthScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const filteredAnalyses = mockAnalyses?.filter(analysis => {
    if (filterBy === 'all') return true;
    return analysis?.type?.toLowerCase()?.includes(filterBy?.toLowerCase());
  });

  const sortedAnalyses = [...filteredAnalyses]?.sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.date) - new Date(a.date);
      case 'score':
        return b?.healthScore - a?.healthScore;
      case 'risk':
        const riskOrder = { 'high': 3, 'medium': 2, 'low': 1, 'normal': 0 };
        return riskOrder?.[b?.riskLevel] - riskOrder?.[a?.riskLevel];
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">Recent Analyses</h2>
          <p className="text-text-secondary">View and manage your previous medical report analyses</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="date">Sort by Date</option>
            <option value="score">Sort by Health Score</option>
            <option value="risk">Sort by Risk Level</option>
          </select>
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e?.target?.value)}
            className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">All Types</option>
            <option value="lab">Lab Reports</option>
            <option value="medical">Medical Reports</option>
            <option value="imaging">Imaging</option>
            <option value="diagnostic">Diagnostic</option>
          </select>
        </div>
      </div>
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="medical-card p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="FileText" size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary">12</p>
              <p className="text-sm text-text-secondary">Total Analyses</p>
            </div>
          </div>
        </div>
        
        <div className="medical-card p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={20} className="text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary">82</p>
              <p className="text-sm text-text-secondary">Avg Health Score</p>
            </div>
          </div>
        </div>
        
        <div className="medical-card p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="AlertTriangle" size={20} className="text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary">2</p>
              <p className="text-sm text-text-secondary">Needs Attention</p>
            </div>
          </div>
        </div>
        
        <div className="medical-card p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
              <Icon name="Calendar" size={20} className="text-secondary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary">3</p>
              <p className="text-sm text-text-secondary">This Month</p>
            </div>
          </div>
        </div>
      </div>
      {/* Analyses List */}
      <div className="space-y-4">
        {sortedAnalyses?.map((analysis) => (
          <div key={analysis?.id} className="medical-card p-6 conversion-hover cursor-pointer" onClick={() => onSelectAnalysis(analysis)}>
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={getTypeIcon(analysis?.type)} size={24} className="text-primary" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-text-primary">{analysis?.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskColor(analysis?.riskLevel)}`}>
                      {analysis?.riskLevel} risk
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-text-secondary mb-3">
                    <span className="flex items-center space-x-1">
                      <Icon name="Calendar" size={14} />
                      <span>{new Date(analysis.date)?.toLocaleDateString()}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="Files" size={14} />
                      <span>{analysis?.filesCount} files</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="Tag" size={14} />
                      <span>{analysis?.type}</span>
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {analysis?.reportTypes?.map((type, index) => (
                      <span key={index} className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-md">
                        {type}
                      </span>
                    ))}
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-text-primary">Key Findings:</p>
                    <div className="flex flex-wrap gap-2">
                      {analysis?.keyFindings?.map((finding, index) => (
                        <span key={index} className="text-sm text-text-secondary">
                          • {finding}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 flex-shrink-0">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${getHealthScoreColor(analysis?.healthScore)}`}>
                    {analysis?.healthScore}
                  </div>
                  <div className="text-xs text-text-secondary">Health Score</div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Icon name="Download" size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Icon name="Share" size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Icon name="MoreVertical" size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Load More */}
      <div className="text-center">
        <Button variant="outline">
          <Icon name="RotateCcw" size={16} className="mr-2" />
          Load More Analyses
        </Button>
      </div>
      {/* Empty State */}
      {sortedAnalyses?.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
            <Icon name="FileSearch" size={32} className="text-text-secondary" />
          </div>
          <h3 className="text-lg font-medium text-text-primary mb-2">No analyses found</h3>
          <p className="text-text-secondary mb-4">Try adjusting your filters or upload a new medical report</p>
          <Button variant="default">
            <Icon name="Plus" size={16} className="mr-2" />
            Start New Analysis
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecentAnalyses;