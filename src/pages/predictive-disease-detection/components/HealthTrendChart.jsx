import React from 'react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const HealthTrendChart = ({ data, title, metric, color = "#20B2AA" }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-trust">
          <p className="text-sm font-medium text-text-primary">{`${label}`}</p>
          <p className="text-sm text-text-secondary">
            {`${metric}: ${payload?.[0]?.value}${payload?.[0]?.payload?.unit || ''}`}
          </p>
          {payload?.[0]?.payload?.prediction && (
            <p className="text-xs text-primary">Predicted Value</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="medical-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
          <span className="text-sm text-text-secondary">Trend Analysis</span>
        </div>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id={`gradient-${metric}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={color} stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis 
              dataKey="date" 
              stroke="#4A5568"
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="#4A5568"
              fontSize={12}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              fill={`url(#gradient-${metric})`}
              dot={{ fill: color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: color, strokeWidth: 2, fill: '#FFFFFF' }}
            />
            <Line
              type="monotone"
              dataKey="prediction"
              stroke={color}
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              connectNulls={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-xs text-text-secondary">Current</p>
          <p className="text-sm font-semibold text-text-primary">
            {data?.[data?.length - 1]?.value}{data?.[data?.length - 1]?.unit || ''}
          </p>
        </div>
        <div>
          <p className="text-xs text-text-secondary">Trend</p>
          <p className="text-sm font-semibold text-success">Improving</p>
        </div>
        <div>
          <p className="text-xs text-text-secondary">Next Check</p>
          <p className="text-sm font-semibold text-text-primary">7 days</p>
        </div>
      </div>
    </div>
  );
};

export default HealthTrendChart;