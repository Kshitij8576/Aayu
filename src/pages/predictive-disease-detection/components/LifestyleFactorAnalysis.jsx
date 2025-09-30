import React from 'react';
import Icon from '../../../components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const LifestyleFactorAnalysis = ({ lifestyleData }) => {
  const impactColors = {
    positive: '#48BB78',
    negative: '#E53E3E',
    neutral: '#4A5568'
  };

  const getImpactIcon = (impact) => {
    switch (impact) {
      case 'positive': return 'TrendingUp';
      case 'negative': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'positive': return 'text-success bg-success/10';
      case 'negative': return 'text-destructive bg-destructive/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-trust">
          <p className="text-sm font-medium text-text-primary">{label}</p>
          <p className="text-sm text-text-secondary">
            Impact Score: {payload?.[0]?.value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="medical-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-secondary/10 rounded-lg">
            <Icon name="Activity" size={24} className="text-secondary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Lifestyle Impact Analysis</h3>
            <p className="text-sm text-text-secondary">How your lifestyle affects disease risk</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lifestyle Factors */}
        <div>
          <h4 className="font-medium text-text-primary mb-4">Risk Factors</h4>
          <div className="space-y-3">
            {lifestyleData?.factors?.map((factor, index) => (
              <div key={index} className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${getImpactColor(factor?.impact)}`}>
                      <Icon name={getImpactIcon(factor?.impact)} size={16} />
                    </div>
                    <div>
                      <h5 className="font-medium text-text-primary">{factor?.name}</h5>
                      <p className="text-sm text-text-secondary">{factor?.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-text-primary">
                      {factor?.impact === 'positive' ? '+' : factor?.impact === 'negative' ? '-' : ''}
                      {Math.abs(factor?.score)}%
                    </div>
                    <div className="text-xs text-text-secondary">Impact</div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-text-secondary">Current Level</span>
                    <span className="text-sm font-medium text-text-primary">{factor?.currentLevel}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        factor?.impact === 'positive' ? 'bg-success' :
                        factor?.impact === 'negative' ? 'bg-destructive' : 'bg-text-secondary'
                      }`}
                      style={{ width: `${factor?.level}%` }}
                    />
                  </div>
                </div>

                <div className="text-sm text-text-secondary">
                  <p className="mb-2">{factor?.description}</p>
                  <div className="flex items-center space-x-4 text-xs">
                    <span>Target: {factor?.target}</span>
                    <span>Improvement: {factor?.improvement}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Visualization */}
        <div>
          <h4 className="font-medium text-text-primary mb-4">Impact Distribution</h4>
          
          {/* Bar Chart */}
          <div className="h-64 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={lifestyleData?.impactChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis 
                  dataKey="factor" 
                  stroke="#4A5568"
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis stroke="#4A5568" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="impact" 
                  fill="#20B2AA"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Risk Category Breakdown */}
          <div className="space-y-4">
            <h5 className="font-medium text-text-primary">Risk Categories</h5>
            {lifestyleData?.categories?.map((category, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category?.color }} />
                  <span className="text-sm font-medium text-text-primary">{category?.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-text-primary">{category?.percentage}%</div>
                  <div className="text-xs text-text-secondary">{category?.count} factors</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Recommendations */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="font-medium text-text-primary mb-4">Personalized Recommendations</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lifestyleData?.recommendations?.map((rec, index) => (
            <div key={index} className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon name={rec?.icon} size={16} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h5 className="font-medium text-text-primary mb-1">{rec?.title}</h5>
                  <p className="text-sm text-text-secondary mb-2">{rec?.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-text-secondary">
                    <span>Priority: {rec?.priority}</span>
                    <span>Impact: {rec?.expectedImpact}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LifestyleFactorAnalysis;