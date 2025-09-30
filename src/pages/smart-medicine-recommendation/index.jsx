import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MedicationSearchBar from './components/MedicationSearchBar';
import MedicationCard from './components/MedicationCard';
import InteractionChecker from './components/InteractionChecker';
import PersonalizedRecommendations from './components/PersonalizedRecommendations';
import MedicationTracker from './components/MedicationTracker';
import CostComparison from './components/CostComparison';

const SmartMedicineRecommendation = () => {
  const [activeTab, setActiveTab] = useState('search');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [interactionResults, setInteractionResults] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  // Mock data for demonstration
  const mockMedications = [
    {
      id: 1,
      name: "Lisinopril",
      genericName: "Lisinopril",
      strength: "10mg",
      form: "Tablet",
      prescription: true,
      aiRecommended: true,
      primaryUses: "High blood pressure, heart failure, and kidney protection in diabetic patients",
      matchScore: 92,
      sideEffects: ["Dry cough", "Dizziness", "Headache", "Fatigue", "Nausea"],
      sideEffectSeverity: "low",
      dosageInfo: "Take once daily, preferably at the same time each day. Can be taken with or without food.",
      contraindications: ["Pregnancy", "History of angioedema", "Bilateral renal artery stenosis"],
      interactions: [
        {
          drug: "Potassium supplements",
          severity: "moderate",
          description: "May increase risk of hyperkalemia"
        },
        {
          drug: "NSAIDs",
          severity: "moderate", 
          description: "May reduce effectiveness and increase kidney damage risk"
        }
      ]
    },
    {
      id: 2,
      name: "Metformin",
      genericName: "Metformin HCl",
      strength: "500mg",
      form: "Extended Release Tablet",
      prescription: true,
      aiRecommended: true,
      primaryUses: "Type 2 diabetes management, insulin resistance, and PCOS treatment",
      matchScore: 88,
      sideEffects: ["Nausea", "Diarrhea", "Stomach upset", "Metallic taste", "Loss of appetite"],
      sideEffectSeverity: "moderate",
      dosageInfo: "Take with meals to reduce stomach upset. Start with low dose and gradually increase.",
      contraindications: ["Kidney disease", "Liver disease", "Heart failure", "Alcohol abuse"],
      interactions: [
        {
          drug: "Contrast dye",
          severity: "high",
          description: "Stop before procedures using contrast dye to prevent kidney damage"
        }
      ]
    },
    {
      id: 3,
      name: "Atorvastatin",
      genericName: "Atorvastatin Calcium",
      strength: "20mg",
      form: "Tablet",
      prescription: true,
      aiRecommended: false,
      primaryUses: "High cholesterol, cardiovascular disease prevention, and stroke risk reduction",
      matchScore: 75,
      sideEffects: ["Muscle pain", "Headache", "Nausea", "Diarrhea", "Joint pain"],
      sideEffectSeverity: "low",
      dosageInfo: "Take once daily, preferably in the evening. Can be taken with or without food.",
      contraindications: ["Active liver disease", "Pregnancy", "Breastfeeding"],
      interactions: [
        {
          drug: "Grapefruit juice",
          severity: "moderate",
          description: "May increase drug levels and risk of side effects"
        }
      ]
    }
  ];

  const mockRecommendations = [
    {
      type: "alternative",
      title: "Generic Alternative Available",
      category: "Cost Savings",
      priority: "high",
      description: "Switch to generic Lisinopril to save up to 80% on your prescription costs while maintaining the same effectiveness.",
      benefits: ["Significant cost savings", "Same active ingredient", "FDA approved"],
      considerations: ["Different manufacturer", "May look different"],
      estimatedSavings: 45,
      timeToEffect: "Immediate",
      aiConfidence: 95
    },
    {
      type: "supplement",
      title: "Omega-3 Fatty Acids",
      category: "Heart Health Support",
      priority: "medium",
      description: "Consider adding Omega-3 supplements to support cardiovascular health alongside your current medications.",
      benefits: ["Heart health support", "Anti-inflammatory", "May reduce triglycerides"],
      considerations: ["Consult doctor before starting", "May interact with blood thinners"],
      estimatedSavings: null,
      timeToEffect: "4-6 weeks",
      aiConfidence: 78
    },
    {
      type: "lifestyle",
      title: "DASH Diet Implementation",
      category: "Lifestyle Modification",
      priority: "high",
      description: "Adopting the DASH diet can enhance the effectiveness of your blood pressure medications.",
      benefits: ["Lower blood pressure", "Reduced medication needs", "Overall health improvement"],
      considerations: ["Requires dietary changes", "May need nutritionist consultation"],
      estimatedSavings: null,
      timeToEffect: "2-4 weeks",
      aiConfidence: 89
    }
  ];

  const mockTrackedMedications = [
    {
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      adherenceRate: 94,
      schedule: {
        times: ["08:00", "20:00"]
      },
      pillsRemaining: 23,
      refillDate: "2025-01-15",
      monthlyCost: 12,
      recentActivity: [
        { type: "taken", description: "Morning dose taken", time: "2 hours ago" },
        { type: "taken", description: "Evening dose taken", time: "Yesterday 8:00 PM" },
        { type: "missed", description: "Morning dose missed", time: "2 days ago" }
      ],
      sideEffectsTracked: [
        { name: "Dry cough", severity: "mild" },
        { name: "Dizziness", severity: "mild" }
      ]
    },
    {
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      adherenceRate: 87,
      schedule: {
        times: ["08:00", "18:00"]
      },
      pillsRemaining: 45,
      refillDate: "2025-01-20",
      monthlyCost: 8,
      recentActivity: [
        { type: "taken", description: "Morning dose taken", time: "3 hours ago" },
        { type: "taken", description: "Evening dose taken", time: "Yesterday 6:00 PM" }
      ],
      sideEffectsTracked: [
        { name: "Nausea", severity: "moderate" }
      ]
    }
  ];

  const mockCostComparison = [
    {
      name: "Lisinopril (Generic)",
      pharmacy: "CVS Pharmacy",
      type: "generic",
      originalPrice: 45.99,
      finalPrice: 12.99,
      quantity: 30,
      daysSupply: 30,
      distance: 0.8,
      inStock: true,
      pickupTime: "15 minutes",
      delivery: true,
      insuranceCoverage: [
        { provider: "Blue Cross Blue Shield", covered: true, copay: 10 }
      ]
    },
    {
      name: "Lisinopril (Brand - Prinivil)",
      pharmacy: "Walgreens",
      type: "brand",
      originalPrice: 89.99,
      finalPrice: 67.99,
      quantity: 30,
      daysSupply: 30,
      distance: 1.2,
      inStock: true,
      pickupTime: "30 minutes",
      delivery: false,
      insuranceCoverage: [
        { provider: "Blue Cross Blue Shield", covered: true, copay: 25 }
      ]
    },
    {
      name: "Lisinopril (Generic)",
      pharmacy: "Costco Pharmacy",
      type: "generic",
      originalPrice: 45.99,
      finalPrice: 8.99,
      quantity: 90,
      daysSupply: 90,
      distance: 3.5,
      inStock: true,
      pickupTime: "1 hour",
      delivery: false,
      insuranceCoverage: [
        { provider: "Blue Cross Blue Shield", covered: true, copay: 10 }
      ]
    }
  ];

  const mockUserInsurance = {
    provider: "Blue Cross Blue Shield",
    planType: "PPO",
    deductible: 1500,
    deductibleRemaining: 800
  };

  const mockUserProfile = {
    completeness: 78,
    conditions: ["Hypertension", "Type 2 Diabetes"],
    allergies: ["Penicillin", "Sulfa drugs"],
    currentMedications: ["Lisinopril", "Metformin"]
  };

  useEffect(() => {
    setUserProfile(mockUserProfile);
  }, []);

  const handleSearch = async (query, type) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSearchResults(mockMedications);
      setIsLoading(false);
    }, 1500);
  };

  const handleCheckInteractions = async (medications) => {
    // Simulate interaction checking
    const mockInteractions = [
      {
        drug1: medications?.[0],
        drug2: medications?.[1],
        severity: "moderate",
        description: "May increase risk of hypoglycemia when used together",
        recommendation: "Monitor blood sugar levels closely and adjust dosing as needed"
      }
    ];
    setInteractionResults(mockInteractions);
  };

  const handleViewMedicationDetails = (medication) => {
    console.log("Viewing details for:", medication?.name);
  };

  const handleAddToTracker = (medication) => {
    console.log("Adding to tracker:", medication?.name);
  };

  const handleViewRecommendation = (recommendation) => {
    console.log("Viewing recommendation:", recommendation?.title);
  };

  const handleUpdateMedication = (medication) => {
    console.log("Updating medication:", medication?.name);
  };

  const handleRemoveMedication = (medication) => {
    console.log("Removing medication:", medication?.name);
  };

  const handleSelectCostOption = (option) => {
    console.log("Selected cost option:", option?.name);
  };

  const tabs = [
    { id: 'search', name: 'Medicine Search', icon: 'Search' },
    { id: 'interactions', name: 'Interaction Checker', icon: 'AlertTriangle' },
    { id: 'recommendations', name: 'AI Recommendations', icon: 'Sparkles' },
    { id: 'tracker', name: 'My Medications', icon: 'Calendar' },
    { id: 'costs', name: 'Cost Comparison', icon: 'DollarSign' }
  ];

  return (
    <>
      <Helmet>
        <title>Smart Medicine Recommendation - AI-Powered Medication Management | Aayu</title>
        <meta name="description" content="Get personalized medication recommendations, check drug interactions, compare costs, and track your prescriptions with Aayu's AI-powered medicine recommendation engine." />
        <meta name="keywords" content="medication recommendations, drug interactions, prescription tracking, medicine costs, AI healthcare, medication management" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <Icon name="Pill" size={32} className="text-primary" />
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
                  Smart Medicine Recommendation
                </h1>
                <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
                  AI-powered medication management that helps you find the right medicines, check interactions, compare costs, and track your prescriptions safely and effectively.
                </p>
                
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  <div className="flex items-center space-x-2 px-4 py-2 bg-success/10 rounded-full">
                    <Icon name="Shield" size={16} className="text-success" />
                    <span className="text-sm font-medium text-success">FDA Database</span>
                  </div>
                  <div className="flex items-center space-x-2 px-4 py-2 bg-primary/10 rounded-full">
                    <Icon name="Brain" size={16} className="text-primary" />
                    <span className="text-sm font-medium text-primary">AI-Powered</span>
                  </div>
                  <div className="flex items-center space-x-2 px-4 py-2 bg-warning/10 rounded-full">
                    <Icon name="AlertTriangle" size={16} className="text-warning" />
                    <span className="text-sm font-medium text-warning">Interaction Alerts</span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                <div className="text-center p-6 bg-card rounded-xl border border-border shadow-sm">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Icon name="Database" size={20} className="text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary mb-1">50,000+</h3>
                  <p className="text-sm text-text-secondary">Medications in Database</p>
                </div>
                
                <div className="text-center p-6 bg-card rounded-xl border border-border shadow-sm">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Icon name="Users" size={20} className="text-secondary" />
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary mb-1">1M+</h3>
                  <p className="text-sm text-text-secondary">Users Helped</p>
                </div>
                
                <div className="text-center p-6 bg-card rounded-xl border border-border shadow-sm">
                  <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Icon name="TrendingDown" size={20} className="text-success" />
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary mb-1">60%</h3>
                  <p className="text-sm text-text-secondary">Average Cost Savings</p>
                </div>
                
                <div className="text-center p-6 bg-card rounded-xl border border-border shadow-sm">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Icon name="Clock" size={20} className="text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary mb-1">24/7</h3>
                  <p className="text-sm text-text-secondary">AI Support Available</p>
                </div>
              </div>
            </div>
          </section>

          {/* Navigation Tabs */}
          <section className="bg-card border-b border-border sticky top-16 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex space-x-1 overflow-x-auto py-4">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                      activeTab === tab?.id
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {activeTab === 'search' && (
                <div className="space-y-8">
                  <MedicationSearchBar onSearch={handleSearch} isLoading={isLoading} />
                  
                  {searchResults?.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-semibold text-text-primary">Search Results</h2>
                        <span className="text-sm text-text-secondary">{searchResults?.length} medications found</span>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {searchResults?.map((medication) => (
                          <MedicationCard
                            key={medication?.id}
                            medication={medication}
                            onViewDetails={handleViewMedicationDetails}
                            onAddToTracker={handleAddToTracker}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'interactions' && (
                <div className="space-y-8">
                  <InteractionChecker onCheckInteractions={handleCheckInteractions} />
                  
                  {interactionResults && (
                    <div className="bg-card rounded-xl border border-border p-6 shadow-medical">
                      <h3 className="text-lg font-semibold text-text-primary mb-4">Interaction Results</h3>
                      <div className="space-y-4">
                        {interactionResults?.map((interaction, index) => (
                          <div key={index} className="p-4 bg-warning/5 rounded-lg border border-warning/20">
                            <div className="flex items-center space-x-3 mb-2">
                              <Icon name="AlertTriangle" size={20} className="text-warning" />
                              <h4 className="font-medium text-text-primary">
                                {interaction?.drug1} + {interaction?.drug2}
                              </h4>
                              <span className="px-2 py-1 bg-warning/10 text-warning text-xs rounded-md font-medium">
                                {interaction?.severity}
                              </span>
                            </div>
                            <p className="text-sm text-text-secondary mb-2">{interaction?.description}</p>
                            <p className="text-sm text-text-primary font-medium">
                              Recommendation: {interaction?.recommendation}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'recommendations' && (
                <PersonalizedRecommendations
                  recommendations={mockRecommendations}
                  userProfile={userProfile}
                  onViewRecommendation={handleViewRecommendation}
                />
              )}

              {activeTab === 'tracker' && (
                <MedicationTracker
                  trackedMedications={mockTrackedMedications}
                  onUpdateMedication={handleUpdateMedication}
                  onRemoveMedication={handleRemoveMedication}
                />
              )}

              {activeTab === 'costs' && (
                <CostComparison
                  medicationOptions={mockCostComparison}
                  userInsurance={mockUserInsurance}
                  onSelectOption={handleSelectCostOption}
                />
              )}
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-primary to-secondary py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Optimize Your Medication Management?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Join thousands of users who trust Aayu for smarter, safer medication decisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="secondary"
                  size="lg"
                  iconName="UserPlus"
                  iconPosition="left"
                  className="bg-white text-primary hover:bg-white/90"
                >
                  Create Free Account
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  iconName="MessageCircle"
                  iconPosition="left"
                  className="border-white text-white hover:bg-white/10"
                >
                  Talk to Pharmacist
                </Button>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-text-primary text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <Icon name="Sparkles" size={16} className="text-white" />
                  </div>
                  <span className="text-xl font-bold">Aayu</span>
                </div>
                <p className="text-white/70 text-sm">
                  AI-powered healthcare platform revolutionizing patient care through intelligent medical analysis.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Features</h3>
                <ul className="space-y-2 text-sm text-white/70">
                  <li>Medicine Search</li>
                  <li>Interaction Checker</li>
                  <li>Cost Comparison</li>
                  <li>Prescription Tracking</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Support</h3>
                <ul className="space-y-2 text-sm text-white/70">
                  <li>Help Center</li>
                  <li>Contact Us</li>
                  <li>Privacy Policy</li>
                  <li>Terms of Service</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Connect</h3>
                <div className="flex space-x-3">
                  <button className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                    <Icon name="Twitter" size={16} />
                  </button>
                  <button className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                    <Icon name="Facebook" size={16} />
                  </button>
                  <button className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                    <Icon name="Linkedin" size={16} />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/70">
              <p>&copy; {new Date()?.getFullYear()} Aayu. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default SmartMedicineRecommendation;