import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const InteractionChecker = ({ onCheckInteractions }) => {
  const [medications, setMedications] = useState(['']);
  const [isChecking, setIsChecking] = useState(false);

  const addMedicationField = () => {
    setMedications([...medications, '']);
  };

  const removeMedicationField = (index) => {
    if (medications?.length > 1) {
      setMedications(medications?.filter((_, i) => i !== index));
    }
  };

  const updateMedication = (index, value) => {
    const updated = [...medications];
    updated[index] = value;
    setMedications(updated);
  };

  const handleCheckInteractions = async () => {
    const validMedications = medications?.filter(med => med?.trim());
    if (validMedications?.length < 2) return;

    setIsChecking(true);
    await onCheckInteractions(validMedications);
    setIsChecking(false);
  };

  const commonMedications = [
    'Aspirin', 'Ibuprofen', 'Acetaminophen', 'Lisinopril', 'Metformin',
    'Atorvastatin', 'Amlodipine', 'Omeprazole', 'Levothyroxine', 'Warfarin'
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-medical">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
          <Icon name="AlertTriangle" size={20} className="text-warning" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Drug Interaction Checker</h3>
          <p className="text-sm text-text-secondary">Check for potential interactions between medications</p>
        </div>
      </div>
      <div className="space-y-4 mb-6">
        {medications?.map((medication, index) => (
          <div key={index} className="flex space-x-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder={`Medication ${index + 1}`}
                value={medication}
                onChange={(e) => updateMedication(index, e?.target?.value)}
                className="w-full"
              />
            </div>
            {medications?.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeMedicationField(index)}
                iconName="X"
                className="text-error hover:text-error hover:bg-error/10"
              />
            )}
          </div>
        ))}

        <div className="flex space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={addMedicationField}
            iconName="Plus"
            iconPosition="left"
            className="flex-1"
          >
            Add Another Medication
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={handleCheckInteractions}
            loading={isChecking}
            iconName="Search"
            iconPosition="left"
            disabled={medications?.filter(med => med?.trim())?.length < 2}
            className="flex-1 bg-warning hover:bg-warning/90"
          >
            Check Interactions
          </Button>
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium text-text-primary mb-3">Quick Add Common Medications</h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {commonMedications?.map((med) => (
            <button
              key={med}
              onClick={() => {
                const emptyIndex = medications?.findIndex(m => !m?.trim());
                if (emptyIndex !== -1) {
                  updateMedication(emptyIndex, med);
                } else {
                  setMedications([...medications, med]);
                }
              }}
              className="text-xs px-3 py-2 bg-muted text-text-secondary rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
            >
              {med}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6 p-4 bg-accent/5 rounded-lg border border-accent/20">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-accent mt-0.5" />
          <div className="text-sm text-text-secondary">
            <p className="font-medium text-text-primary mb-1">Important Notice</p>
            <p>This tool provides general information about drug interactions. Always consult with your healthcare provider or pharmacist before making any changes to your medication regimen.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractionChecker;