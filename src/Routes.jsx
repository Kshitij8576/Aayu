import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import VirtualHealthAssistant from './pages/virtual-health-assistant';
import MedicalReportAnalysis from './pages/medical-report-analysis';
import UserDashboard from './pages/user-dashboard';
import SmartMedicineRecommendation from './pages/smart-medicine-recommendation';
import PredictiveDiseaseDetection from './pages/predictive-disease-detection';
import Homepage from './pages/homepage';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Homepage />} />
        <Route path="/virtual-health-assistant" element={<VirtualHealthAssistant />} />
        <Route path="/medical-report-analysis" element={<MedicalReportAnalysis />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/smart-medicine-recommendation" element={<SmartMedicineRecommendation />} />
        <Route path="/predictive-disease-detection" element={<PredictiveDiseaseDetection />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
