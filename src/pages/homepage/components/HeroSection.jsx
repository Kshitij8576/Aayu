import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Your AI-Powered Health Companion",
      subtitle: "Making advanced healthcare accessible to everyone",
      description: "Experience the future of healthcare with AI-driven medical analysis, predictive diagnostics, and personalized health insights. Take control of your health journey with confidence.",
      cta: "Start Health Analysis",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop&crop=center"
    },
    {
      title: "Predict, Prevent, Protect Your Health",
      subtitle: "Advanced AI technology meets compassionate care",
      description: "Our cutting-edge AI analyzes your health data to provide early disease detection, personalized medicine recommendations, and comprehensive health monitoring.",
      cta: "Explore AI Features",
      image: "https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?w=800&h=600&fit=crop&crop=center"
    },
    {
      title: "HIPAA Compliant & Secure",
      subtitle: "Your health data is protected with military-grade security",
      description: "Trust in our platform with end-to-end encryption, HIPAA compliance, and partnerships with leading medical institutions worldwide.",
      cta: "Learn About Security",
      image: "https://images.pixabay.com/photo/2017/10/04/09/56/laboratory-2815641_1280.jpg?w=800&h=600&fit=crop&crop=center"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides?.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides?.length) % heroSlides?.length);
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary/5 via-surface to-secondary/5 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2320B2AA' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Content Section */}
          <div className="space-y-8">
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center space-x-2 px-3 py-1 bg-success/10 rounded-full border border-success/20">
                <Icon name="Shield" size={16} className="text-success" />
                <span className="text-sm font-medium text-success">HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                <Icon name="Award" size={16} className="text-primary" />
                <span className="text-sm font-medium text-primary">FDA Approved</span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-1 bg-secondary/10 rounded-full border border-secondary/20">
                <Icon name="Users" size={16} className="text-secondary" />
                <span className="text-sm font-medium text-secondary">500K+ Users</span>
              </div>
            </div>

            {/* Main Content */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight">
                {heroSlides?.[currentSlide]?.title}
              </h1>
              <h2 className="text-xl md:text-2xl text-primary font-semibold">
                {heroSlides?.[currentSlide]?.subtitle}
              </h2>
              <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
                {heroSlides?.[currentSlide]?.description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/virtual-health-assistant">
                <Button 
                  variant="default" 
                  size="lg"
                  className="bg-conversion-accent hover:bg-conversion-accent/90 text-white conversion-hover w-full sm:w-auto"
                  iconName="Sparkles"
                  iconPosition="left"
                >
                  {heroSlides?.[currentSlide]?.cta}
                </Button>
              </Link>
              <Link to="/medical-report-analysis">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-primary text-primary hover:bg-primary/10 w-full sm:w-auto"
                  iconName="FileText"
                  iconPosition="left"
                >
                  Upload Medical Report
                </Button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">99.7%</div>
                <div className="text-sm text-text-secondary">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">24/7</div>
                <div className="text-sm text-text-secondary">AI Assistant</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">5 Min</div>
                <div className="text-sm text-text-secondary">Report Analysis</div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-trust">
              <Image
                src={heroSlides?.[currentSlide]?.image}
                alt="AI Healthcare Technology"
                className="w-full h-[600px] object-cover"
              />
              
              {/* Overlay with Navigation */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent">
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
                  <div className="flex space-x-2">
                    {heroSlides?.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          index === currentSlide ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={prevSlide}
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                    >
                      <Icon name="ChevronLeft" size={20} />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                    >
                      <Icon name="ChevronRight" size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Health Metrics */}
            <div className="absolute -top-4 -right-4 bg-surface border border-border rounded-xl p-4 shadow-medical">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                  <Icon name="Heart" size={24} className="text-success health-pulse" />
                </div>
                <div>
                  <div className="text-sm font-medium text-text-primary">Health Score</div>
                  <div className="text-2xl font-bold text-success">94/100</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-surface border border-border rounded-xl p-4 shadow-medical">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="Brain" size={24} className="text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium text-text-primary">AI Analysis</div>
                  <div className="text-lg font-bold text-primary">Active</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;