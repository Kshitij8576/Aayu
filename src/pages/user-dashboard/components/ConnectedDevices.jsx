import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConnectedDevices = () => {
  const devices = [
    {
      id: 1,
      name: "Apple Watch Series 9",
      type: "Smartwatch",
      status: "connected",
      lastSync: "2 minutes ago",
      batteryLevel: 85,
      icon: "Watch",
      metrics: ["Heart Rate", "Steps", "Sleep"],
      color: "text-success"
    },
    {
      id: 2,
      name: "Fitbit Charge 5",
      type: "Fitness Tracker",
      status: "connected",
      lastSync: "15 minutes ago",
      batteryLevel: 62,
      icon: "Activity",
      metrics: ["Activity", "Stress", "SpO2"],
      color: "text-success"
    },
    {
      id: 3,
      name: "Omron Blood Pressure Monitor",
      type: "Medical Device",
      status: "connected",
      lastSync: "1 hour ago",
      batteryLevel: 45,
      icon: "Heart",
      metrics: ["Blood Pressure", "Pulse"],
      color: "text-success"
    },
    {
      id: 4,
      name: "Smart Scale Pro",
      type: "Body Composition",
      status: "offline",
      lastSync: "2 days ago",
      batteryLevel: 0,
      icon: "Scale",
      metrics: ["Weight", "BMI", "Body Fat"],
      color: "text-error"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'bg-success/10 text-success';
      case 'syncing': return 'bg-warning/10 text-warning';
      case 'offline': return 'bg-error/10 text-error';
      default: return 'bg-muted text-text-secondary';
    }
  };

  const getBatteryColor = (level) => {
    if (level > 50) return 'text-success';
    if (level > 20) return 'text-warning';
    return 'text-error';
  };

  const getBatteryIcon = (level) => {
    if (level > 75) return 'Battery';
    if (level > 50) return 'Battery';
    if (level > 25) return 'Battery';
    return 'BatteryLow';
  };

  return (
    <div className="medical-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Connected Devices</h2>
        <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
          Add Device
        </Button>
      </div>
      <div className="space-y-4">
        {devices?.map((device) => (
          <div key={device?.id} className="p-4 rounded-lg border border-border bg-card hover:shadow-sm transition-all duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${device?.status === 'connected' ? 'bg-success/10' : 'bg-error/10'}`}>
                  <Icon name={device?.icon} size={20} className={device?.color} />
                </div>
                <div>
                  <h3 className="font-medium text-text-primary">{device?.name}</h3>
                  <p className="text-sm text-text-secondary">{device?.type}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(device?.status)}`}>
                {device?.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <Icon name="RefreshCw" size={16} className="text-text-secondary" />
                <span className="text-sm text-text-primary">Last sync: {device?.lastSync}</span>
              </div>
              {device?.batteryLevel > 0 && (
                <div className="flex items-center space-x-2">
                  <Icon name={getBatteryIcon(device?.batteryLevel)} size={16} className={getBatteryColor(device?.batteryLevel)} />
                  <span className={`text-sm ${getBatteryColor(device?.batteryLevel)}`}>
                    {device?.batteryLevel}%
                  </span>
                </div>
              )}
            </div>

            <div className="mb-4">
              <p className="text-xs text-text-secondary mb-2">Tracking Metrics:</p>
              <div className="flex flex-wrap gap-2">
                {device?.metrics?.map((metric, index) => (
                  <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    {metric}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" iconName="Settings">
                  Settings
                </Button>
                <Button variant="ghost" size="sm" iconName="BarChart3">
                  View Data
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                {device?.status === 'offline' ? (
                  <Button variant="outline" size="sm" iconName="RefreshCw">
                    Reconnect
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" iconName="RefreshCw">
                    Sync Now
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-sm text-text-secondary">
            <span className="font-medium text-success">3 devices</span> connected, 
            <span className="font-medium text-error ml-1">1 offline</span>
          </div>
          <button className="text-sm text-primary hover:text-primary/80 font-medium">
            Manage All Devices
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectedDevices;