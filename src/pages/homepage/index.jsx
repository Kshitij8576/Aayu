import React from 'react';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import TrustSection from './components/TrustSection';
import HealthToolsSection from './components/HealthToolsSection';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';

const Homepage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <HeroSection />
        <FeaturesSection />
        <TrustSection />
        <HealthToolsSection />
        <NewsletterSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Homepage;