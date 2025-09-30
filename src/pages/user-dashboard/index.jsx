import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import all dashboard components
import HealthSummaryCard from './components/HealthSummaryCard';
import QuickActionsGrid from './components/QuickActionsGrid';
import RecentActivityFeed from './components/RecentActivityFeed';
import UpcomingAppointments from './components/UpcomingAppointments';
import ConnectedDevices from './components/ConnectedDevices';
import HealthGoalsProgress from './components/HealthGoalsProgress';
import FamilyHealthManager from './components/FamilyHealthManager';
import NotificationCenter from './components/NotificationCenter';

const UserDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('overview');

  // Mock user data
  const userData = {
    name: "John Doe",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    memberSince: "March 2024",
    plan: "Premium"
  };

  // Mock health summary data
  const healthSummaryData = {
    healthScore: 85,
    riskLevel: "Low",
    lastCheckup: "Dec 15, 2024",
    vitals: [
      { label: "Heart Rate", value: "72 bpm", trend: "stable", change: "Normal" },
      { label: "Blood Pressure", value: "120/80", trend: "down", change: "-2 mmHg" },
      { label: "Weight", value: "78.5 kg", trend: "down", change: "-0.5 kg" },
      { label: "BMI", value: "24.2", trend: "stable", change: "Normal" }
    ]
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime?.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'health', label: 'Health Data', icon: 'Activity' },
    { id: 'family', label: 'Family', icon: 'Users' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>User Dashboard - Aayu | AI Health Companion</title>
        <meta name="description" content="Comprehensive health dashboard with AI-powered insights, connected devices, and personalized health management." />
      </Helmet>
      <Header />
      <main className="pt-16">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-muted">
                  <img 
                    src={userData?.avatar} 
                    alt={userData?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-text-primary">
                    {getGreeting()}, {userData?.name?.split(' ')?.[0]}!
                  </h1>
                  <p className="text-text-secondary">
                    {currentTime?.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-sm text-text-secondary">
                      Member since {userData?.memberSince}
                    </span>
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                      {userData?.plan}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm" iconName="Download">
                  Export Data
                </Button>
                <Button variant="default" size="sm" iconName="Plus">
                  Add Health Data
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-surface border-b border-border sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-1 overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Health Summary */}
              <HealthSummaryCard {...healthSummaryData} />

              {/* Quick Actions */}
              <QuickActionsGrid />

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <RecentActivityFeed />
                <UpcomingAppointments />
              </div>

              {/* Connected Devices */}
              <ConnectedDevices />
            </div>
          )}

          {activeTab === 'health' && (
            <div className="space-y-8">
              {/* Health Summary */}
              <HealthSummaryCard {...healthSummaryData} />
              
              {/* Health Goals Progress */}
              <HealthGoalsProgress />
              
              {/* Connected Devices */}
              <ConnectedDevices />
            </div>
          )}

          {activeTab === 'family' && (
            <div className="space-y-8">
              {/* Family Health Manager */}
              <FamilyHealthManager />
              
              {/* Quick Actions for Family */}
              <QuickActionsGrid />
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-8">
              {/* Notification Center */}
              <NotificationCenter />
              
              {/* Recent Activity */}
              <RecentActivityFeed />
            </div>
          )}
        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            variant="default"
            size="icon"
            className="w-14 h-14 rounded-full shadow-trust bg-primary hover:bg-primary/90 text-white"
            iconName="MessageCircle"
          />
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-surface border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-success" />
                <span className="text-sm text-success font-medium">HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Lock" size={16} className="text-primary" />
                <span className="text-sm text-primary font-medium">End-to-End Encrypted</span>
              </div>
            </div>
            <div className="text-sm text-text-secondary">
              © {new Date()?.getFullYear()} Aayu. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserDashboard;