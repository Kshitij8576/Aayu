import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const HealthToolsSection = () => {
  const [activeTab, setActiveTab] = useState('symptom-checker');
  const [symptomInput, setSymptomInput] = useState('');
  const [riskAge, setRiskAge] = useState('');
  const [riskGender, setRiskGender] = useState('');
  const [bmiHeight, setBmiHeight] = useState('');
  const [bmiWeight, setBmiWeight] = useState('');

  const tools = [
    {
      id: 'symptom-checker',
      title: 'AI Symptom Checker',
      description: 'Describe your symptoms and get AI-powered preliminary assessment',
      icon: 'Stethoscope',
      color: 'primary'
    },
    {
      id: 'health-risk',
      title: 'Health Risk Assessment',
      description: 'Evaluate your health risks based on lifestyle and medical history',
      icon: 'Activity',
      color: 'warning'
    },
    {
      id: 'bmi-calculator',
      title: 'BMI Calculator',
      description: 'Calculate your Body Mass Index and get health recommendations',
      icon: 'Calculator',
      color: 'success'
    },
    {
      id: 'medication-checker',
      title: 'Medication Interaction',
      description: 'Check for potential interactions between medications',
      icon: 'Pill',
      color: 'secondary'
    }
  ];

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: 'text-primary bg-primary/10 border-primary/20',
      warning: 'text-warning bg-warning/10 border-warning/20',
      success: 'text-success bg-success/10 border-success/20',
      secondary: 'text-secondary bg-secondary/10 border-secondary/20'
    };
    return colorMap?.[color] || colorMap?.primary;
  };

  const calculateBMI = () => {
    if (bmiHeight && bmiWeight) {
      const heightInMeters = parseFloat(bmiHeight) / 100;
      const weightInKg = parseFloat(bmiWeight);
      const bmi = (weightInKg / (heightInMeters * heightInMeters))?.toFixed(1);
      
      let category = '';
      if (bmi < 18.5) category = 'Underweight';
      else if (bmi < 25) category = 'Normal weight';
      else if (bmi < 30) category = 'Overweight';
      else category = 'Obese';
      
      return { bmi, category };
    }
    return null;
  };

  const bmiResult = calculateBMI();

  const renderToolContent = () => {
    switch (activeTab) {
      case 'symptom-checker':
        return (
          <div className="space-y-6">
            <div>
              <Input
                label="Describe your symptoms"
                type="text"
                placeholder="e.g., headache, fever, fatigue..."
                value={symptomInput}
                onChange={(e) => setSymptomInput(e?.target?.value)}
                description="Be as specific as possible about your symptoms"
              />
            </div>
            {symptomInput && (
              <div className="medical-card p-4 bg-primary/5 border border-primary/20">
                <div className="flex items-start space-x-3">
                  <Icon name="Bot" size={20} className="text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-text-primary mb-2">AI Preliminary Assessment</h4>
                    <p className="text-text-secondary text-sm mb-3">
                      Based on your symptoms, here are some possible considerations. Please consult with a healthcare professional for proper diagnosis.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Icon name="AlertCircle" size={16} className="text-warning" />
                        <span className="text-sm">Consider rest and hydration</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="Clock" size={16} className="text-primary" />
                        <span className="text-sm">Monitor symptoms for 24-48 hours</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <Link to="/virtual-health-assistant">
              <Button
                variant="default"
                className="bg-primary hover:bg-primary/90 text-white"
                iconName="MessageCircle"
                iconPosition="left"
                fullWidth
              >
                Get Detailed AI Analysis
              </Button>
            </Link>
          </div>
        );

      case 'health-risk':
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Age"
                type="number"
                placeholder="Enter your age"
                value={riskAge}
                onChange={(e) => setRiskAge(e?.target?.value)}
              />
              <Select
                label="Gender"
                options={genderOptions}
                value={riskGender}
                onChange={setRiskGender}
                placeholder="Select gender"
              />
            </div>
            {riskAge && riskGender && (
              <div className="medical-card p-4 bg-warning/5 border border-warning/20">
                <div className="flex items-start space-x-3">
                  <Icon name="TrendingUp" size={20} className="text-warning mt-1" />
                  <div>
                    <h4 className="font-semibold text-text-primary mb-2">Risk Assessment Preview</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Cardiovascular Risk:</span>
                        <span className="text-success font-medium">Low</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Diabetes Risk:</span>
                        <span className="text-warning font-medium">Moderate</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Overall Health Score:</span>
                        <span className="text-primary font-medium">Good</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <Link to="/predictive-disease-detection">
              <Button
                variant="default"
                className="bg-warning hover:bg-warning/90 text-white"
                iconName="Activity"
                iconPosition="left"
                fullWidth
              >
                Complete Full Risk Assessment
              </Button>
            </Link>
          </div>
        );

      case 'bmi-calculator':
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Height (cm)"
                type="number"
                placeholder="e.g., 170"
                value={bmiHeight}
                onChange={(e) => setBmiHeight(e?.target?.value)}
              />
              <Input
                label="Weight (kg)"
                type="number"
                placeholder="e.g., 70"
                value={bmiWeight}
                onChange={(e) => setBmiWeight(e?.target?.value)}
              />
            </div>
            {bmiResult && (
              <div className="medical-card p-4 bg-success/5 border border-success/20">
                <div className="flex items-start space-x-3">
                  <Icon name="Calculator" size={20} className="text-success mt-1" />
                  <div className="w-full">
                    <h4 className="font-semibold text-text-primary mb-3">Your BMI Result</h4>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-bold text-success">{bmiResult?.bmi}</span>
                      <span className="px-3 py-1 bg-success/10 rounded-full text-success font-medium">
                        {bmiResult?.category}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 mb-2">
                      <div 
                        className="bg-success h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((parseFloat(bmiResult?.bmi) / 40) * 100, 100)}%` }}
                      />
                    </div>
                    <p className="text-sm text-text-secondary">
                      Your BMI indicates {bmiResult?.category?.toLowerCase()}. Consult with healthcare professionals for personalized advice.
                    </p>
                  </div>
                </div>
              </div>
            )}
            <Link to="/user-dashboard">
              <Button
                variant="default"
                className="bg-success hover:bg-success/90 text-white"
                iconName="TrendingUp"
                iconPosition="left"
                fullWidth
              >
                Track Health Progress
              </Button>
            </Link>
          </div>
        );

      case 'medication-checker':
        return (
          <div className="space-y-6">
            <div className="text-center py-8">
              <Icon name="Pill" size={48} className="text-secondary mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-text-primary mb-2">
                Medication Interaction Checker
              </h4>
              <p className="text-text-secondary mb-6">
                Check for potential interactions between your medications and supplements
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-sm text-text-secondary">
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <span>FDA approved drug database</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-text-secondary">
                  <Icon name="Shield" size={16} className="text-primary" />
                  <span>Secure and confidential</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-text-secondary">
                  <Icon name="Clock" size={16} className="text-warning" />
                  <span>Real-time interaction analysis</span>
                </div>
              </div>
            </div>
            
            <Link to="/smart-medicine-recommendation">
              <Button
                variant="default"
                className="bg-secondary hover:bg-secondary/90 text-white"
                iconName="Search"
                iconPosition="left"
                fullWidth
              >
                Check Medication Interactions
              </Button>
            </Link>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-accent/10 rounded-full mb-6">
            <Icon name="Zap" size={20} className="text-accent" />
            <span className="text-accent font-medium">Interactive Health Tools</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
            Try Our AI Health Tools
          </h2>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Get instant health insights with our interactive AI-powered tools. 
            Experience the power of intelligent healthcare analysis in real-time.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tool Tabs */}
          <div className="lg:col-span-1">
            <div className="space-y-3">
              {tools?.map((tool) => (
                <button
                  key={tool?.id}
                  onClick={() => setActiveTab(tool?.id)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 conversion-hover ${
                    activeTab === tool?.id
                      ? `${getColorClasses(tool?.color)} border-current`
                      : 'bg-surface border-border hover:border-primary/20 hover:bg-primary/5'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      activeTab === tool?.id ? 'bg-current/10' : 'bg-muted'
                    }`}>
                      <Icon 
                        name={tool?.icon} 
                        size={20} 
                        className={activeTab === tool?.id ? 'text-current' : 'text-text-secondary'} 
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold mb-1 ${
                        activeTab === tool?.id ? 'text-current' : 'text-text-primary'
                      }`}>
                        {tool?.title}
                      </h3>
                      <p className="text-sm text-text-secondary">
                        {tool?.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Tool Content */}
          <div className="lg:col-span-2">
            <div className="medical-card p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  getColorClasses(tools?.find(t => t?.id === activeTab)?.color || 'primary')
                }`}>
                  <Icon 
                    name={tools?.find(t => t?.id === activeTab)?.icon || 'Stethoscope'} 
                    size={24} 
                    className="text-current"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary">
                    {tools?.find(t => t?.id === activeTab)?.title}
                  </h3>
                  <p className="text-text-secondary">
                    {tools?.find(t => t?.id === activeTab)?.description}
                  </p>
                </div>
              </div>

              {renderToolContent()}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="medical-card p-8 max-w-2xl mx-auto">
            <Icon name="Sparkles" size={48} className="text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Ready for Advanced AI Analysis?
            </h3>
            <p className="text-text-secondary mb-6">
              Get comprehensive health insights with our full suite of AI-powered medical analysis tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/virtual-health-assistant">
                <Button
                  variant="default"
                  size="lg"
                  className="bg-conversion-accent hover:bg-conversion-accent/90 text-white"
                  iconName="Bot"
                  iconPosition="left"
                >
                  Start AI Consultation
                </Button>
              </Link>
              <Link to="/medical-report-analysis">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary hover:bg-primary/10"
                  iconName="Upload"
                  iconPosition="left"
                >
                  Upload Medical Report
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthToolsSection;