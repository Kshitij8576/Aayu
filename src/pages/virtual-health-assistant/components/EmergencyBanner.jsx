import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmergencyBanner = ({ onEmergencyAction }) => {
  return (
    <div className="bg-gradient-to-r from-destructive/10 to-warning/10 border border-destructive/20 rounded-xl p-4 mb-6">
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center flex-shrink-0">
          <Icon name="AlertTriangle" size={20} className="text-destructive" />
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-destructive mb-1">Medical Emergency?</h3>
          <p className="text-sm text-text-secondary mb-3">
            If you're experiencing a medical emergency, don't wait for AI assistance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onEmergencyAction('call911')}
              iconName="Phone"
              iconPosition="left"
              className="bg-destructive hover:bg-destructive/90"
            >
              Call 911
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEmergencyAction('findHospital')}
              iconName="MapPin"
              iconPosition="left"
              className="border-destructive/30 text-destructive hover:bg-destructive/5"
            >
              Find Hospital
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyBanner;