import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GeneticAnalysisPanel = ({ geneticData }) => {
  const [selectedGene, setSelectedGene] = useState(null);

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high': return 'text-destructive bg-destructive/10';
      case 'moderate': return 'text-warning bg-warning/10';
      case 'low': return 'text-success bg-success/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const getVariantImpact = (impact) => {
    switch (impact) {
      case 'pathogenic': return 'text-destructive';
      case 'likely_pathogenic': return 'text-warning';
      case 'uncertain': return 'text-text-secondary';
      case 'likely_benign': return 'text-success';
      case 'benign': return 'text-success';
      default: return 'text-text-secondary';
    }
  };

  return (
    <div className="medical-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon name="Dna" size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Genetic Analysis</h3>
            <p className="text-sm text-text-secondary">Hereditary risk assessment</p>
          </div>
        </div>
        <Button variant="outline" size="sm" iconName="Download">
          Export Report
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gene List */}
        <div>
          <h4 className="font-medium text-text-primary mb-4">Analyzed Genes</h4>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {geneticData?.genes?.map((gene) => (
              <div
                key={gene?.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedGene?.id === gene?.id
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
                onClick={() => setSelectedGene(gene)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-text-primary">{gene?.name}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${getRiskColor(gene?.riskLevel)}`}>
                      {gene?.riskLevel}
                    </span>
                  </div>
                  <Icon name="ChevronRight" size={16} className="text-text-secondary" />
                </div>
                <p className="text-sm text-text-secondary mb-2">{gene?.function}</p>
                <div className="flex items-center space-x-4 text-xs text-text-secondary">
                  <span>Variants: {gene?.variantCount}</span>
                  <span>Confidence: {gene?.confidence}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gene Details */}
        <div>
          {selectedGene ? (
            <div>
              <h4 className="font-medium text-text-primary mb-4">
                {selectedGene?.name} Details
              </h4>
              
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h5 className="font-medium text-text-primary mb-2">Gene Function</h5>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {selectedGene?.detailedFunction}
                  </p>
                </div>

                <div>
                  <h5 className="font-medium text-text-primary mb-3">Variants Found</h5>
                  <div className="space-y-3">
                    {selectedGene?.variants?.map((variant, index) => (
                      <div key={index} className="p-3 border border-border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-text-primary">{variant?.position}</span>
                          <span className={`text-xs font-medium ${getVariantImpact(variant?.impact)}`}>
                            {variant?.impact?.replace('_', ' ')?.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-text-secondary mb-2">{variant?.change}</p>
                        <div className="flex items-center space-x-4 text-xs text-text-secondary">
                          <span>Frequency: {variant?.frequency}</span>
                          <span>Studies: {variant?.studies}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <h5 className="font-medium text-primary mb-2">Clinical Significance</h5>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {selectedGene?.clinicalSignificance}
                  </p>
                </div>

                <div>
                  <h5 className="font-medium text-text-primary mb-2">Associated Conditions</h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedGene?.associatedConditions?.map((condition, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-secondary/10 text-secondary text-sm rounded-full"
                      >
                        {condition}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-96 text-center">
              <Icon name="Dna" size={48} className="text-text-secondary mb-4" />
              <h4 className="font-medium text-text-primary mb-2">Select a Gene</h4>
              <p className="text-sm text-text-secondary">
                Click on a gene from the list to view detailed analysis
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-text-primary">{geneticData?.totalGenes}</div>
            <div className="text-sm text-text-secondary">Genes Analyzed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">{geneticData?.variantsFound}</div>
            <div className="text-sm text-text-secondary">Variants Identified</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{geneticData?.overallRisk}%</div>
            <div className="text-sm text-text-secondary">Overall Genetic Risk</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneticAnalysisPanel;