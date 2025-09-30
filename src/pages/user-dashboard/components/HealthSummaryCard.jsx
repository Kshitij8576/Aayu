import React from 'react';
import Icon from '../../../components/AppIcon';

const HealthSummaryCard = ({ healthScore, riskLevel, lastCheckup, vitals }) => {
  const getScoreColor = (score) => {
    if (score >= 85) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-error';
  };

  const getScoreBg = (score) => {
    if (score >= 85) return 'bg-success/10 border-success/20';
    if (score >= 70) return 'bg-warning/10 border-warning/20';
    return 'bg-error/10 border-error/20';
  };

  const getRiskColor = (risk) => {
    switch (risk?.toLowerCase()) {
      case 'low': return 'text-success bg-success/10';
      case 'moderate': return 'text-warning bg-warning/10';
      case 'high': return 'text-error bg-error/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  return (
    <div className="medical-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Health Summary</h2>
        <div className="flex items-center space-x-2">
          <Icon name="Activity" size={20} className="text-primary" />
          <span className="text-sm text-text-secondary">Last updated: Today</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Health Score */}
        <div className={`p-4 rounded-lg border ${getScoreBg(healthScore)}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-secondary">Health Score</span>
            <Icon name="TrendingUp" size={16} className={getScoreColor(healthScore)} />
          </div>
          <div className={`text-2xl font-bold ${getScoreColor(healthScore)}`}>
            {healthScore}/100
          </div>
          <div className="text-xs text-text-secondary mt-1">+5 from last week</div>
        </div>

        {/* Risk Level */}
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-secondary">Risk Level</span>
            <Icon name="Shield" size={16} className="text-primary" />
          </div>
          <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(riskLevel)}`}>
            {riskLevel}
          </div>
          <div className="text-xs text-text-secondary mt-2">Based on AI analysis</div>
        </div>

        {/* Last Checkup */}
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-secondary">Last Checkup</span>
            <Icon name="Calendar" size={16} className="text-primary" />
          </div>
          <div className="text-lg font-semibold text-text-primary">{lastCheckup}</div>
          <div className="text-xs text-text-secondary mt-1">Next due: Jan 15, 2025</div>
        </div>

        {/* Active Monitoring */}
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-secondary">Devices</span>
            <Icon name="Smartphone" size={16} className="text-success" />
          </div>
          <div className="text-lg font-semibold text-text-primary">3 Connected</div>
          <div className="text-xs text-success mt-1">All synced</div>
        </div>
      </div>
      {/* Vital Signs */}
      <div className="border-t border-border pt-4">
        <h3 className="text-sm font-medium text-text-secondary mb-3">Latest Vitals</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {vitals?.map((vital, index) => (
            <div key={index} className="text-center">
              <div className="text-lg font-semibold text-text-primary">{vital?.value}</div>
              <div className="text-xs text-text-secondary">{vital?.label}</div>
              <div className={`text-xs mt-1 ${vital?.trend === 'up' ? 'text-success' : vital?.trend === 'down' ? 'text-error' : 'text-text-secondary'}`}>
                {vital?.trend === 'up' && '↑'} {vital?.trend === 'down' && '↓'} {vital?.change}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthSummaryCard;