import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      title: "Medical Report Analysis",
      description: "Upload your medical reports and get AI-powered analysis with detailed explanations in minutes. Our advanced algorithms can detect patterns and provide insights that help you understand your health better.",
      icon: "FileText",
      image: "https://imgs.search.brave.com/Mv0-cF780D0MWp1D4PqbF5iTE_XliafRjxNBKakokgo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9t/ZWRpY2FsLWV4YW1p/bmF0aW9uLXJlcG9y/dC1oaXN0b3J5LWhp/c3RvcnlfNTM4NzYt/MTMyNzYzLmpwZz9z/ZW10PWFpc19oeWJy/aWQmdz03NDA",
      route: "/medical-report-analysis",
      color: "primary",
      stats: "99.7% Accuracy",
      badge: "Most Popular"
    },
    {
      id: 2,
      title: "Smart Medicine Recommendations",
      description: "Get personalized medicine recommendations based on your health profile, current medications, and medical history. Our AI ensures safe and effective treatment options.",
      icon: "Pill",
      image: "https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?w=400&h=300&fit=crop&crop=center",
      route: "/smart-medicine-recommendation",
      color: "secondary",
      stats: "10M+ Interactions",
      badge: "AI Powered"
    },
    {
      id: 3,
      title: "Virtual Health Assistant",
      description: "Chat with our AI health assistant 24/7 for immediate health guidance, symptom checking, and medical advice. Get instant answers to your health questions.",
      icon: "Bot",
      image: "https://imgs.search.brave.com/CumFvftMZCCEnoy8uZtDELeXerBC2Zmwi1YTcc2vC4Y/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aGVhbHRodGVjaGRp/Z2l0YWwuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy9BSS1wb3dl/cmVkLXZpcnR1YWwt/YXNzaXN0YW50cy1p/bi1oZWFsdGhjYXJl/LWJlbmVmaXRzLWFu/ZC1yZWFsLXdvcmxk/LWFwcGxpY2F0aW9u/cy5qcGc",
      route: "/virtual-health-assistant",
      color: "accent",
      stats: "24/7 Available",
      badge: "Always On"
    },
    {
      id: 4,
      title: "Predictive Disease Detection",
      description: "Early detection of potential health risks using advanced AI algorithms that analyze your health data patterns and provide preventive care recommendations.",
      icon: "Activity",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop&crop=center",
      route: "/predictive-disease-detection",
      color: "warning",
      stats: "85% Early Detection",
      badge: "Preventive Care"
    },
    {
      id: 5,
      title: "Health Dashboard",
      description: "Comprehensive health management dashboard with personalized insights, connected device data, medical history, and AI-generated health recommendations.",
      icon: "LayoutDashboard",
      image: "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?w=400&h=300&fit=crop&crop=center",
      route: "/user-dashboard",
      color: "success",
      stats: "Real-time Sync",
      badge: "Comprehensive"
    },
    {
      id: 6,
      title: "Remote Health Monitoring",
      description: "Connect your wearable devices and get continuous health monitoring with real-time alerts, trend analysis, and personalized health insights.",
      icon: "Smartphone",
      image: "https://imgs.search.brave.com/m2bZqrsVJ4GI_Q1cY82iD23xOGsONqGhYj_M4QDOq14/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9rbXMt/aGVhbHRoY2FyZS5j/b20vd3AtY29udGVu/dC91cGxvYWRzLzIw/MjUvMDQvcmVtb3Rl/LXBhdGllbnQtbW9u/aXRvcmluZy1kZXZp/Y2VzLWttcy1oZWFs/dGhjYXJlLTEwLTEw/MjR4NTc1LmpwZw",
      route: "/user-dashboard",
      color: "primary",
      stats: "50+ Devices",
      badge: "Connected Health"
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: {
        bg: "bg-primary/10",
        text: "text-primary",
        border: "border-primary/20",
        button: "bg-primary hover:bg-primary/90"
      },
      secondary: {
        bg: "bg-secondary/10",
        text: "text-secondary",
        border: "border-secondary/20",
        button: "bg-secondary hover:bg-secondary/90"
      },
      accent: {
        bg: "bg-accent/10",
        text: "text-accent",
        border: "border-accent/20",
        button: "bg-accent hover:bg-accent/90"
      },
      success: {
        bg: "bg-success/10",
        text: "text-success",
        border: "border-success/20",
        button: "bg-success hover:bg-success/90"
      },
      warning: {
        bg: "bg-warning/10",
        text: "text-warning",
        border: "border-warning/20",
        button: "bg-warning hover:bg-warning/90"
      }
    };
    return colorMap?.[color] || colorMap?.primary;
  };

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <Icon name="Sparkles" size={20} className="text-primary" />
            <span className="text-primary font-medium">AI-Powered Healthcare</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
            Comprehensive Health Solutions
          </h2>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Experience the future of healthcare with our suite of AI-powered tools designed to 
            predict, prevent, and protect your health through intelligent analysis and personalized care.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features?.map((feature, index) => {
            const colors = getColorClasses(feature?.color);
            
            return (
              <div
                key={feature?.id}
                className="medical-card p-6 conversion-hover group relative overflow-hidden"
              >
                {/* Badge */}
                {feature?.badge && (
                  <div className={`absolute top-4 right-4 px-3 py-1 ${colors?.bg} ${colors?.border} border rounded-full`}>
                    <span className={`text-xs font-medium ${colors?.text}`}>
                      {feature?.badge}
                    </span>
                  </div>
                )}
                {/* Feature Image */}
                <div className="relative overflow-hidden rounded-lg mb-6">
                  <Image
                    src={feature?.image}
                    alt={feature?.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  
                  {/* Icon Overlay */}
                  <div className={`absolute top-4 left-4 w-12 h-12 ${colors?.bg} rounded-full flex items-center justify-center backdrop-blur-sm`}>
                    <Icon name={feature?.icon} size={24} className={colors?.text} />
                  </div>
                </div>
                {/* Content */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors">
                      {feature?.title}
                    </h3>
                    <div className={`px-2 py-1 ${colors?.bg} rounded text-xs font-medium ${colors?.text}`}>
                      {feature?.stats}
                    </div>
                  </div>

                  <p className="text-text-secondary leading-relaxed">
                    {feature?.description}
                  </p>

                  {/* CTA Button */}
                  <Link to={feature?.route} className="block">
                    <Button
                      variant="outline"
                      fullWidth
                      className={`border-2 ${colors?.border} ${colors?.text} hover:${colors?.button} hover:text-white transition-all duration-200`}
                      iconName="ArrowRight"
                      iconPosition="right"
                    >
                      Explore Feature
                    </Button>
                  </Link>
                </div>
                {/* Hover Effect */}
                <div className={`absolute inset-0 ${colors?.bg} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <Link to="/virtual-health-assistant">
              <Button
                variant="default"
                size="lg"
                className="bg-conversion-accent hover:bg-conversion-accent/90 text-white"
                iconName="MessageCircle"
                iconPosition="left"
              >
                Try Virtual Assistant
              </Button>
            </Link>
            <Link to="/user-dashboard">
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary/10"
                iconName="LayoutDashboard"
                iconPosition="left"
              >
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;