import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import RiskAssessmentCard from './components/RiskAssessmentCard';
import HealthTrendChart from './components/HealthTrendChart';
import EarlyWarningAlert from './components/EarlyWarningAlert';
import GeneticAnalysisPanel from './components/GeneticAnalysisPanel';
import LifestyleFactorAnalysis from './components/LifestyleFactorAnalysis';
import PreventiveCareSchedule from './components/PreventiveCareSchedule';

const PredictiveDiseaseDetection = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Mock data for risk assessments
  const riskAssessments = [
    {
      id: 1,
      condition: "Type 2 Diabetes",
      category: "Metabolic Disorder",
      riskLevel: "moderate",
      score: 35,
      ageImpact: "Moderate",
      geneticFactor: "Low",
      riskFactors: ["BMI > 25", "Sedentary lifestyle", "Family history"]
    },
    {
      id: 2,
      condition: "Cardiovascular Disease",
      category: "Heart Condition",
      riskLevel: "low",
      score: 18,
      ageImpact: "Low",
      geneticFactor: "Very Low",
      riskFactors: ["Cholesterol", "Blood pressure"]
    },
    {
      id: 3,
      condition: "Hypertension",
      category: "Cardiovascular",
      riskLevel: "high",
      score: 72,
      ageImpact: "High",
      geneticFactor: "Moderate",
      riskFactors: ["Age", "Stress", "Salt intake", "Weight"]
    }
  ];

  // Mock data for health trends
  const healthTrendData = [
    { date: "Jan", value: 120, unit: " mg/dL", prediction: null },
    { date: "Feb", value: 118, unit: " mg/dL", prediction: null },
    { date: "Mar", value: 115, unit: " mg/dL", prediction: null },
    { date: "Apr", value: 112, unit: " mg/dL", prediction: null },
    { date: "May", value: 110, unit: " mg/dL", prediction: null },
    { date: "Jun", value: 108, unit: " mg/dL", prediction: 105 },
    { date: "Jul", value: null, unit: " mg/dL", prediction: 103 }
  ];

  // Mock data for early warning alerts
  const earlyWarningAlerts = [
    {
      id: 1,
      severity: "warning",
      title: "Blood Pressure Trend Alert",
      description: "Your blood pressure readings have shown an upward trend over the past 2 weeks. This could indicate increased cardiovascular risk if not addressed.",
      timestamp: "2 hours ago",
      riskIncrease: "+15%",
      timeline: "2-4 weeks",
      recommendations: [
        "Reduce sodium intake to less than 2,300mg daily",
        "Increase physical activity to 30 minutes daily",
        "Schedule appointment with cardiologist",
        "Monitor blood pressure twice daily"
      ]
    },
    {
      id: 2,
      severity: "info",
      title: "Preventive Screening Due",
      description: "Based on your age and risk factors, you're due for a colonoscopy screening. Early detection can prevent 90% of colorectal cancers.",
      timestamp: "1 day ago",
      riskIncrease: "N/A",
      timeline: "Schedule within 30 days",
      recommendations: [
        "Contact your healthcare provider",
        "Review preparation instructions",
        "Consider family history factors"
      ]
    }
  ];

  // Mock data for genetic analysis
  const geneticData = {
    totalGenes: 47,
    variantsFound: 12,
    overallRisk: 23,
    genes: [
      {
        id: 1,
        name: "BRCA1",
        function: "DNA repair and tumor suppression",
        riskLevel: "low",
        variantCount: 2,
        confidence: 95,
        detailedFunction: "The BRCA1 gene provides instructions for making a protein that acts as a tumor suppressor. Tumor suppressor proteins help prevent cells from growing and dividing too rapidly or in an uncontrolled way.",
        variants: [
          {
            position: "c.5266dupC",
            change: "Frameshift mutation",
            impact: "likely_benign",
            frequency: "0.001%",
            studies: "1,247"
          }
        ],
        clinicalSignificance: "This variant is classified as likely benign based on current evidence. Regular monitoring is recommended but no immediate action required.",
        associatedConditions: ["Breast Cancer", "Ovarian Cancer"]
      },
      {
        id: 2,
        name: "APOE",
        function: "Lipid metabolism and transport",
        riskLevel: "moderate",
        variantCount: 1,
        confidence: 88,
        detailedFunction: "The APOE gene provides instructions for making apolipoprotein E, which combines with fats (lipids) in the body to form molecules called lipoproteins.",
        variants: [
          {
            position: "rs429358",
            change: "C>T substitution",
            impact: "uncertain",
            frequency: "13.7%",
            studies: "2,891"
          }
        ],
        clinicalSignificance: "This variant may influence Alzheimer's disease risk and cardiovascular health. Lifestyle modifications can help mitigate potential risks.",
        associatedConditions: ["Alzheimer\'s Disease", "Cardiovascular Disease"]
      }
    ]
  };

  // Mock data for lifestyle factors
  const lifestyleData = {
    factors: [
      {
        name: "Physical Activity",
        category: "Exercise",
        impact: "positive",
        score: 25,
        level: 75,
        currentLevel: "Moderate",
        target: "150 min/week",
        improvement: "Increase by 30 min",
        description: "Regular exercise significantly reduces disease risk and improves overall health outcomes."
      },
      {
        name: "Smoking",
        category: "Substance Use",
        impact: "negative",
        score: 45,
        level: 80,
        currentLevel: "Former smoker",
        target: "Complete cessation",
        improvement: "Maintain abstinence",
        description: "Smoking history increases risk for multiple conditions including cancer and heart disease."
      },
      {
        name: "Diet Quality",
        category: "Nutrition",
        impact: "positive",
        score: 20,
        level: 60,
        currentLevel: "Good",
        target: "Mediterranean diet",
        improvement: "Add more vegetables",
        description: "A balanced diet rich in fruits, vegetables, and whole grains supports optimal health."
      }
    ],
    impactChart: [
      { factor: "Exercise", impact: 25 },
      { factor: "Diet", impact: 20 },
      { factor: "Sleep", impact: 15 },
      { factor: "Stress", impact: -30 },
      { factor: "Smoking", impact: -45 }
    ],
    categories: [
      { name: "Protective Factors", percentage: 45, count: 3, color: "#48BB78" },
      { name: "Risk Factors", percentage: 35, count: 2, color: "#E53E3E" },
      { name: "Neutral Factors", percentage: 20, count: 1, color: "#4A5568" }
    ],
    recommendations: [
      {
        icon: "Activity",
        title: "Increase Cardio Exercise",
        description: "Add 2 more cardio sessions per week to reduce cardiovascular risk by 15%",
        priority: "High",
        expectedImpact: "15% risk reduction"
      },
      {
        icon: "Apple",
        title: "Mediterranean Diet",
        description: "Transition to Mediterranean diet pattern to improve metabolic health",
        priority: "Medium",
        expectedImpact: "10% risk reduction"
      }
    ]
  };

  // Mock data for preventive care schedule
  const scheduleData = {
    counts: {
      upcoming: 3,
      overdue: 1,
      completed: 8
    },
    stats: {
      nextScreening: 14,
      completionRate: 85,
      riskReduction: 32,
      totalScreenings: 12
    },
    items: [
      {
        id: 1,
        title: "Annual Physical Exam",
        description: "Comprehensive health assessment including vital signs, blood work, and preventive screenings",
        dueDate: "Dec 15, 2024",
        location: "Primary Care Clinic",
        duration: "60 minutes",
        status: "scheduled",
        urgency: "routine",
        icon: "Stethoscope",
        riskFactors: ["Age", "Family history"],
        preparation: "Fast for 12 hours before blood work",
        frequency: "Annual",
        lastCompleted: "Dec 12, 2023"
      },
      {
        id: 2,
        title: "Mammography Screening",
        description: "Breast cancer screening for early detection",
        dueDate: "Nov 30, 2024",
        location: "Radiology Center",
        duration: "30 minutes",
        status: "pending",
        urgency: "important",
        icon: "Scan",
        riskFactors: ["Age > 40", "Family history"],
        preparation: "Avoid deodorant and lotions on exam day",
        frequency: "Annual"
      },
      {
        id: 3,
        title: "Colonoscopy",
        description: "Colorectal cancer screening procedure",
        dueDate: "Oct 15, 2024",
        location: "Gastroenterology Clinic",
        duration: "45 minutes",
        status: "overdue",
        urgency: "urgent",
        icon: "Search",
        riskFactors: ["Age > 50", "Family history"],
        preparation: "Complete bowel preparation as instructed",
        frequency: "Every 10 years"
      }
    ]
  };

  const tabs = [
    { id: 'overview', label: 'Risk Overview', icon: 'BarChart3' },
    { id: 'trends', label: 'Health Trends', icon: 'TrendingUp' },
    { id: 'alerts', label: 'Early Warnings', icon: 'AlertTriangle' },
    { id: 'genetic', label: 'Genetic Analysis', icon: 'Dna' },
    { id: 'lifestyle', label: 'Lifestyle Impact', icon: 'Activity' },
    { id: 'preventive', label: 'Preventive Care', icon: 'Calendar' }
  ];

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 3000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-primary/10 rounded-2xl">
                <Icon name="Activity" size={48} className="text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              Predictive Disease Detection Lab
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
              Advanced AI-powered early detection and health risk assessment. Stay ahead of potential health issues with personalized predictions and preventive care recommendations.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                variant="default"
                size="lg"
                onClick={handleStartAnalysis}
                loading={isAnalyzing}
                iconName="Zap"
                className="bg-primary hover:bg-primary/90 text-white px-8"
              >
                {isAnalyzing ? 'Analyzing Health Data...' : 'Start Risk Analysis'}
              </Button>
              <Link to="/user-dashboard">
                <Button variant="outline" size="lg" iconName="LayoutDashboard">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">95%</div>
              <div className="text-sm text-text-secondary">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success mb-1">47</div>
              <div className="text-sm text-text-secondary">Genes Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary mb-1">12</div>
              <div className="text-sm text-text-secondary">Disease Models</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent mb-1">24/7</div>
              <div className="text-sm text-text-secondary">Monitoring</div>
            </div>
          </div>
        </div>
      </section>
      {/* Navigation Tabs */}
      <section className="bg-surface border-b border-border sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto py-4">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab?.id
                    ? 'bg-primary text-white shadow-medical'
                    : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Risk Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">Your Health Risk Assessment</h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Comprehensive analysis of your disease risk factors based on genetics, lifestyle, and medical history.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {riskAssessments?.map((assessment) => (
                <RiskAssessmentCard key={assessment?.id} assessment={assessment} />
              ))}
            </div>

            {/* Overall Risk Summary */}
            <div className="medical-card p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-6">Overall Health Risk Profile</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-success/10 rounded-lg">
                  <div className="text-3xl font-bold text-success mb-2">Low</div>
                  <div className="text-sm text-text-secondary">Cardiovascular Risk</div>
                  <div className="text-xs text-success mt-1">18% probability</div>
                </div>
                <div className="text-center p-4 bg-warning/10 rounded-lg">
                  <div className="text-3xl font-bold text-warning mb-2">Moderate</div>
                  <div className="text-sm text-text-secondary">Diabetes Risk</div>
                  <div className="text-xs text-warning mt-1">35% probability</div>
                </div>
                <div className="text-center p-4 bg-destructive/10 rounded-lg">
                  <div className="text-3xl font-bold text-destructive mb-2">High</div>
                  <div className="text-sm text-text-secondary">Hypertension Risk</div>
                  <div className="text-xs text-destructive mt-1">72% probability</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Health Trends Tab */}
        {activeTab === 'trends' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">Health Trend Analysis</h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Track your health metrics over time and view AI-powered predictions for future health outcomes.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <HealthTrendChart
                data={healthTrendData}
                title="Blood Glucose Levels"
                metric="Glucose"
                color="#20B2AA"
              />
              <HealthTrendChart
                data={[
                  { date: "Jan", value: 140, unit: "/90", prediction: null },
                  { date: "Feb", value: 138, unit: "/88", prediction: null },
                  { date: "Mar", value: 135, unit: "/85", prediction: null },
                  { date: "Apr", value: 132, unit: "/82", prediction: null },
                  { date: "May", value: 130, unit: "/80", prediction: null },
                  { date: "Jun", value: 128, unit: "/78", prediction: 125 },
                  { date: "Jul", value: null, unit: "/75", prediction: 122 }
                ]}
                title="Blood Pressure Trends"
                metric="BP"
                color="#4A90E2"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <HealthTrendChart
                data={[
                  { date: "Jan", value: 28.5, unit: " kg/m²", prediction: null },
                  { date: "Feb", value: 28.2, unit: " kg/m²", prediction: null },
                  { date: "Mar", value: 27.8, unit: " kg/m²", prediction: null },
                  { date: "Apr", value: 27.5, unit: " kg/m²", prediction: null },
                  { date: "May", value: 27.2, unit: " kg/m²", prediction: null },
                  { date: "Jun", value: 26.8, unit: " kg/m²", prediction: 26.5 },
                  { date: "Jul", value: null, unit: " kg/m²", prediction: 26.2 }
                ]}
                title="BMI Progression"
                metric="BMI"
                color="#00D4AA"
              />
              <HealthTrendChart
                data={[
                  { date: "Jan", value: 7.2, unit: "%", prediction: null },
                  { date: "Feb", value: 7.0, unit: "%", prediction: null },
                  { date: "Mar", value: 6.8, unit: "%", prediction: null },
                  { date: "Apr", value: 6.6, unit: "%", prediction: null },
                  { date: "May", value: 6.4, unit: "%", prediction: null },
                  { date: "Jun", value: 6.2, unit: "%", prediction: 6.0 },
                  { date: "Jul", value: null, unit: "%", prediction: 5.8 }
                ]}
                title="HbA1c Levels"
                metric="HbA1c"
                color="#E67E22"
              />
            </div>
          </div>
        )}

        {/* Early Warnings Tab */}
        {activeTab === 'alerts' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">Early Warning System</h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                AI-powered alerts and recommendations to help you stay ahead of potential health issues.
              </p>
            </div>

            <div className="space-y-6">
              {earlyWarningAlerts?.map((alert) => (
                <EarlyWarningAlert key={alert?.id} alert={alert} />
              ))}
            </div>

            {/* Alert Settings */}
            <div className="medical-card p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Alert Preferences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-text-primary mb-3">Notification Types</h4>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded border-border" />
                      <span className="text-sm text-text-secondary">Critical health alerts</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded border-border" />
                      <span className="text-sm text-text-secondary">Preventive care reminders</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-border" />
                      <span className="text-sm text-text-secondary">Lifestyle recommendations</span>
                    </label>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-text-primary mb-3">Delivery Methods</h4>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded border-border" />
                      <span className="text-sm text-text-secondary">Email notifications</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-border" />
                      <span className="text-sm text-text-secondary">SMS alerts</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded border-border" />
                      <span className="text-sm text-text-secondary">In-app notifications</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Genetic Analysis Tab */}
        {activeTab === 'genetic' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">Genetic Risk Analysis</h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Comprehensive genetic testing results and hereditary disease risk assessment based on your DNA profile.
              </p>
            </div>

            <GeneticAnalysisPanel geneticData={geneticData} />
          </div>
        )}

        {/* Lifestyle Impact Tab */}
        {activeTab === 'lifestyle' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">Lifestyle Impact Analysis</h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Understand how your daily habits and lifestyle choices affect your disease risk and overall health outcomes.
              </p>
            </div>

            <LifestyleFactorAnalysis lifestyleData={lifestyleData} />
          </div>
        )}

        {/* Preventive Care Tab */}
        {activeTab === 'preventive' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">Preventive Care Schedule</h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Stay on top of your preventive healthcare with personalized screening recommendations and scheduling.
              </p>
            </div>

            <PreventiveCareSchedule scheduleData={scheduleData} />
          </div>
        )}
      </main>
      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-secondary py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Take Control of Your Health Future
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Don't wait for symptoms to appear. Start your predictive health journey today and prevent diseases before they develop.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/user-dashboard">
              <Button variant="secondary" size="lg" iconName="BarChart3" className="bg-white text-primary hover:bg-white/90">
                View Full Dashboard
              </Button>
            </Link>
            <Link to="/virtual-health-assistant">
              <Button variant="outline" size="lg" iconName="MessageCircle" className="border-white text-white hover:bg-white/10">
                Ask Health Assistant
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-text-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Activity" size={20} className="text-white" />
                </div>
                <span className="text-xl font-bold">Aayu</span>
              </div>
              <p className="text-white/70 text-sm">
                AI-powered healthcare platform revolutionizing patient care through intelligent medical analysis.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">AI Services</h4>
              <div className="space-y-2 text-sm text-white/70">
                <Link to="/medical-report-analysis" className="block hover:text-white">Medical Analysis</Link>
                <Link to="/smart-medicine-recommendation" className="block hover:text-white">Medicine Recommendations</Link>
                <Link to="/virtual-health-assistant" className="block hover:text-white">Health Assistant</Link>
                <Link to="/predictive-disease-detection" className="block hover:text-white">Disease Detection</Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <div className="space-y-2 text-sm text-white/70">
                <Link to="/user-dashboard" className="block hover:text-white">Dashboard</Link>
                <Link to="/homepage" className="block hover:text-white">Home</Link>
                <a href="#" className="block hover:text-white">Privacy Policy</a>
                <a href="#" className="block hover:text-white">Terms of Service</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-white/70">
                <p>support@aayu.health</p>
                <p>1-800-AAYU-CARE</p>
                <div className="flex space-x-4 mt-4">
                  <Icon name="Shield" size={16} className="text-success" />
                  <span className="text-xs">HIPAA Compliant</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/70">
            <p>&copy; {new Date()?.getFullYear()} Aayu AI Health Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PredictiveDiseaseDetection;