import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import FileUploadZone from './components/FileUploadZone';
import AnalysisProgress from './components/AnalysisProgress';
import AnalysisResults from './components/AnalysisResults';
import RecentAnalyses from './components/RecentAnalyses';

const MedicalReportAnalysis = () => {
  const [currentStep, setCurrentStep] = useState('upload'); // upload, progress, results, history
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(1);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [analysisData, setAnalysisData] = useState(null);

  // Simulate file upload progress
  useEffect(() => {
    if (isUploading && uploadProgress < 100) {
      const timer = setTimeout(() => {
        setUploadProgress(prev => Math.min(prev + 10, 100));
      }, 200);
      return () => clearTimeout(timer);
    } else if (uploadProgress === 100 && isUploading) {
      setTimeout(() => {
        setCurrentStep('progress');
        setIsUploading(false);
      }, 1000);
    }
  }, [uploadProgress, isUploading]);

  // Simulate analysis progress
  useEffect(() => {
    if (currentStep === 'progress') {
      const timer = setTimeout(() => {
        if (analysisStep < 5) {
          setAnalysisStep(prev => prev + 1);
        } else {
          setCurrentStep('results');
          setAnalysisData({
            documentsProcessed: selectedFiles?.length,
            medicalEntities: 127,
            pagesAnalyzed: 15,
            insights: 8
          });
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, analysisStep, selectedFiles?.length]);

  const handleFileSelect = (files) => {
    setSelectedFiles(files);
    if (files?.length > 0) {
      setIsUploading(true);
      setUploadProgress(0);
    }
  };

  const handleStartNewAnalysis = () => {
    setCurrentStep('upload');
    setUploadProgress(0);
    setIsUploading(false);
    setAnalysisStep(1);
    setSelectedFiles([]);
    setAnalysisData(null);
  };

  const handleSelectAnalysis = (analysis) => {
    setAnalysisData(analysis);
    setCurrentStep('results');
  };

  const features = [
    {
      icon: "Shield",
      title: "HIPAA Compliant",
      description: "End-to-end encryption ensures your medical data remains secure and private"
    },
    {
      icon: "Zap",
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms analyze your reports in minutes"
    },
    {
      icon: "FileSearch",
      title: "Comprehensive Reports",
      description: "Detailed analysis with medical terminology explanations and recommendations"
    },
    {
      icon: "TrendingUp",
      title: "Trend Analysis",
      description: "Track your health metrics over time and identify patterns"
    }
  ];

  const supportedReports = [
    { type: "Blood Tests", icon: "TestTube", description: "CBC, lipid panels, metabolic panels" },
    { type: "Imaging Reports", icon: "Scan", description: "X-rays, MRI, CT scans, ultrasounds" },
    { type: "Lab Results", icon: "Microscope", description: "Pathology, microbiology, chemistry" },
    { type: "Diagnostic Reports", icon: "Activity", description: "ECG, stress tests, pulmonary function" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 via-secondary/5 to-background py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full">
                <Icon name="Sparkles" size={16} className="text-primary" />
                <span className="text-sm font-medium text-primary">AI-Powered Medical Analysis</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary">
                Medical Report Analysis Center
              </h1>
              
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Upload your medical reports and get instant AI-powered analysis with detailed explanations, 
                health insights, and personalized recommendations from our advanced healthcare AI.
              </p>
              
              <div className="flex items-center justify-center space-x-6 text-sm text-text-secondary">
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={16} className="text-success" />
                  <span>HIPAA Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} className="text-primary" />
                  <span>2-3 Minutes Analysis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <span>99.7% Accuracy</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="border-b border-border bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8">
              <button
                onClick={() => setCurrentStep('upload')}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  currentStep === 'upload' || currentStep === 'progress' || currentStep === 'results' ?'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon name="Upload" size={16} />
                <span>New Analysis</span>
              </button>
              <button
                onClick={() => setCurrentStep('history')}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  currentStep === 'history' ?'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon name="History" size={16} />
                <span>Recent Analyses</span>
              </button>
            </nav>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {currentStep === 'upload' && (
              <div className="max-w-4xl mx-auto space-y-12">
                <FileUploadZone
                  onFileSelect={handleFileSelect}
                  uploadProgress={uploadProgress}
                  isUploading={isUploading}
                />
                
                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {features?.map((feature, index) => (
                    <div key={index} className="medical-card p-6 text-center medical-focus">
                      <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <Icon name={feature?.icon} size={24} className="text-primary" />
                      </div>
                      <h3 className="font-semibold text-text-primary mb-2">{feature?.title}</h3>
                      <p className="text-sm text-text-secondary">{feature?.description}</p>
                    </div>
                  ))}
                </div>

                {/* Supported Reports */}
                <div className="medical-card p-8">
                  <h2 className="text-2xl font-bold text-text-primary mb-6 text-center">
                    Supported Medical Reports
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {supportedReports?.map((report, index) => (
                      <div key={index} className="text-center space-y-3">
                        <div className="w-16 h-16 mx-auto bg-secondary/10 rounded-xl flex items-center justify-center">
                          <Icon name={report?.icon} size={32} className="text-secondary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-text-primary mb-1">{report?.type}</h3>
                          <p className="text-sm text-text-secondary">{report?.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 'progress' && (
              <div className="max-w-4xl mx-auto">
                <AnalysisProgress
                  currentStep={analysisStep}
                  analysisData={analysisData}
                />
              </div>
            )}

            {currentStep === 'results' && (
              <div className="max-w-6xl mx-auto">
                <AnalysisResults
                  analysisData={analysisData}
                  onNewAnalysis={handleStartNewAnalysis}
                />
              </div>
            )}

            {currentStep === 'history' && (
              <div className="max-w-6xl mx-auto">
                <RecentAnalyses onSelectAnalysis={handleSelectAnalysis} />
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        {currentStep === 'upload' && (
          <section className="bg-primary/5 py-16">
            <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-text-primary mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-text-secondary mb-8">
                Upload your first medical report and experience the power of AI-driven health analysis.
              </p>
              <div className="flex items-center justify-center space-x-4">
                <Button variant="default" size="lg" className="bg-conversion-accent hover:bg-conversion-accent/90">
                  <Icon name="Upload" size={20} className="mr-2" />
                  Upload Medical Report
                </Button>
                <Button variant="outline" size="lg">
                  <Icon name="Play" size={20} className="mr-2" />
                  Watch Demo
                </Button>
              </div>
            </div>
          </section>
        )}
      </main>
      {/* Footer */}
      <footer className="bg-text-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Activity" size={20} className="text-white" />
                </div>
                <span className="text-xl font-bold">Aayu</span>
              </div>
              <p className="text-gray-300 text-sm">
                AI-powered healthcare platform revolutionizing patient care through intelligent medical analysis.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="/medical-report-analysis" className="hover:text-white transition-colors">Medical Analysis</a></li>
                <li><a href="/smart-medicine-recommendation" className="hover:text-white transition-colors">Medicine Recommendations</a></li>
                <li><a href="/virtual-health-assistant" className="hover:text-white transition-colors">Health Assistant</a></li>
                <li><a href="/predictive-disease-detection" className="hover:text-white transition-colors">Disease Detection</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Security</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={16} className="text-success" />
                  <span className="text-sm text-gray-300">HIPAA Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Lock" size={16} className="text-success" />
                  <span className="text-sm text-gray-300">End-to-End Encrypted</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <span className="text-sm text-gray-300">SOC 2 Certified</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-sm text-gray-300">
              © {new Date()?.getFullYear()} Aayu. All rights reserved. | AI Health Companion
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MedicalReportAnalysis;