import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CostComparison = ({ medicationOptions, userInsurance, onSelectOption }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showInsuranceDetails, setShowInsuranceDetails] = useState(false);

  const calculateSavings = (originalPrice, currentPrice) => {
    const savings = originalPrice - currentPrice;
    const percentage = ((savings / originalPrice) * 100)?.toFixed(0);
    return { amount: savings, percentage };
  };

  const getInsuranceCoverage = (medication) => {
    if (!userInsurance || !medication?.insuranceCoverage) return null;
    
    const coverage = medication?.insuranceCoverage?.find(
      c => c?.provider === userInsurance?.provider
    );
    
    return coverage || { covered: false, copay: medication?.retailPrice };
  };

  const getBestValueBadge = (option, allOptions) => {
    const lowestPrice = Math.min(...allOptions?.map(opt => opt?.finalPrice));
    if (option?.finalPrice === lowestPrice) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-success/10 text-success border border-success/20">
          <Icon name="Award" size={12} className="mr-1" />
          Best Value
        </span>
      );
    }
    return null;
  };

  if (!medicationOptions || medicationOptions?.length === 0) {
    return (
      <div className="bg-card rounded-xl border border-border p-8 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="DollarSign" size={24} className="text-text-secondary" />
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">No Cost Comparison Available</h3>
        <p className="text-text-secondary">Search for medications to compare prices and find the best deals.</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-medical">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="DollarSign" size={20} className="text-success" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Cost Comparison</h3>
            <p className="text-sm text-text-secondary">Compare prices and find the best deals</p>
          </div>
        </div>
        
        {userInsurance && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowInsuranceDetails(!showInsuranceDetails)}
            iconName="Shield"
            iconPosition="left"
          >
            {userInsurance?.provider}
          </Button>
        )}
      </div>
      {showInsuranceDetails && userInsurance && (
        <div className="mb-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <div className="flex items-center space-x-3 mb-3">
            <Icon name="Shield" size={16} className="text-primary" />
            <h4 className="font-medium text-text-primary">Insurance Information</h4>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-text-secondary">Provider</p>
              <p className="font-medium text-text-primary">{userInsurance?.provider}</p>
            </div>
            <div>
              <p className="text-text-secondary">Plan Type</p>
              <p className="font-medium text-text-primary">{userInsurance?.planType}</p>
            </div>
            <div>
              <p className="text-text-secondary">Deductible</p>
              <p className="font-medium text-text-primary">${userInsurance?.deductible}</p>
            </div>
            <div>
              <p className="text-text-secondary">Remaining</p>
              <p className="font-medium text-text-primary">${userInsurance?.deductibleRemaining}</p>
            </div>
          </div>
        </div>
      )}
      <div className="space-y-4">
        {medicationOptions?.map((option, index) => {
          const insuranceCoverage = getInsuranceCoverage(option);
          const savings = option?.originalPrice ? calculateSavings(option?.originalPrice, option?.finalPrice) : null;
          const isSelected = selectedOption === index;
          
          return (
            <div 
              key={index} 
              className={`border rounded-lg p-4 transition-all duration-200 cursor-pointer ${
                isSelected 
                  ? 'border-primary bg-primary/5 shadow-sm' 
                  : 'border-border hover:border-primary/50 hover:shadow-sm'
              }`}
              onClick={() => setSelectedOption(index)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    option?.type === 'generic' ? 'bg-success/10' : 
                    option?.type === 'brand' ? 'bg-secondary/10' : 'bg-warning/10'
                  }`}>
                    <Icon 
                      name={option?.type === 'generic' ? 'Pill' : option?.type === 'brand' ? 'Award' : 'Building'} 
                      size={18} 
                      className={
                        option?.type === 'generic' ? 'text-success' : 
                        option?.type === 'brand' ? 'text-secondary' : 'text-warning'
                      } 
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary">{option?.name}</h4>
                    <p className="text-sm text-text-secondary">{option?.pharmacy} • {option?.type}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-lg font-bold text-text-primary">${option?.finalPrice}</span>
                    {getBestValueBadge(option, medicationOptions)}
                  </div>
                  {option?.originalPrice && option?.originalPrice !== option?.finalPrice && (
                    <p className="text-sm text-text-secondary line-through">${option?.originalPrice}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center p-2 bg-muted/30 rounded-md">
                  <p className="text-xs text-text-secondary mb-1">Quantity</p>
                  <p className="text-sm font-medium text-text-primary">{option?.quantity} pills</p>
                </div>
                
                <div className="text-center p-2 bg-muted/30 rounded-md">
                  <p className="text-xs text-text-secondary mb-1">Per Pill</p>
                  <p className="text-sm font-medium text-text-primary">${(option?.finalPrice / option?.quantity)?.toFixed(2)}</p>
                </div>
                
                <div className="text-center p-2 bg-muted/30 rounded-md">
                  <p className="text-xs text-text-secondary mb-1">Supply</p>
                  <p className="text-sm font-medium text-text-primary">{option?.daysSupply} days</p>
                </div>
                
                <div className="text-center p-2 bg-muted/30 rounded-md">
                  <p className="text-xs text-text-secondary mb-1">Distance</p>
                  <p className="text-sm font-medium text-text-primary">{option?.distance} mi</p>
                </div>
              </div>
              {insuranceCoverage && (
                <div className="mb-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon name="Shield" size={14} className="text-primary" />
                      <span className="text-sm font-medium text-text-primary">Insurance Coverage</span>
                    </div>
                    <div className="text-right">
                      {insuranceCoverage?.covered ? (
                        <div>
                          <p className="text-sm font-medium text-success">Covered</p>
                          <p className="text-xs text-text-secondary">Copay: ${insuranceCoverage?.copay}</p>
                        </div>
                      ) : (
                        <p className="text-sm font-medium text-error">Not Covered</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {savings && savings?.amount > 0 && (
                <div className="mb-4 p-3 bg-success/5 rounded-lg border border-success/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon name="TrendingDown" size={14} className="text-success" />
                      <span className="text-sm font-medium text-success">You Save</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-success">${savings?.amount?.toFixed(2)}</p>
                      <p className="text-xs text-success">({savings?.percentage}% off)</p>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center space-x-4 text-xs text-text-secondary">
                  {option?.inStock && (
                    <div className="flex items-center space-x-1">
                      <Icon name="Check" size={12} className="text-success" />
                      <span>In Stock</span>
                    </div>
                  )}
                  {option?.pickupTime && (
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} />
                      <span>Ready in {option?.pickupTime}</span>
                    </div>
                  )}
                  {option?.delivery && (
                    <div className="flex items-center space-x-1">
                      <Icon name="Truck" size={12} />
                      <span>Delivery available</span>
                    </div>
                  )}
                </div>
                
                <Button
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  onClick={(e) => {
                    e?.stopPropagation();
                    onSelectOption(option);
                  }}
                  iconName={isSelected ? "Check" : "ShoppingCart"}
                  iconPosition="left"
                  className={isSelected ? "bg-primary hover:bg-primary/90" : ""}
                >
                  {isSelected ? "Selected" : "Select"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 p-4 bg-warning/5 rounded-lg border border-warning/20">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-warning mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-text-primary mb-1">Price Comparison Notice</p>
            <p className="text-text-secondary">Prices shown are estimates and may vary. Contact the pharmacy directly to confirm current pricing and availability. Insurance coverage may affect final costs.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostComparison;