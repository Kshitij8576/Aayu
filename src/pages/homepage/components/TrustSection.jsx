import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustSection = () => {
  const trustMetrics = [
    {
      icon: "Users",
      value: "500K+",
      label: "Active Users",
      description: "Healthcare professionals and patients trust our platform"
    },
    {
      icon: "Award",
      value: "99.7%",
      label: "Accuracy Rate",
      description: "Clinically validated AI algorithms with proven results"
    },
    {
      icon: "Shield",
      value: "100%",
      label: "HIPAA Compliant",
      description: "Military-grade security for your health data"
    },
    {
      icon: "Clock",
      value: "24/7",
      label: "AI Support",
      description: "Round-the-clock health assistance and monitoring"
    }
  ];

  const certifications = [
    {
      name: "HIPAA Compliant",
      icon: "Shield",
      description: "Health Insurance Portability and Accountability Act certified"
    },
    {
      name: "FDA Approved",
      icon: "Award",
      description: "Food and Drug Administration approved medical AI"
    },
    {
      name: "ISO 27001",
      icon: "Lock",
      description: "International security management standard certified"
    },
    {
      name: "SOC 2 Type II",
      icon: "CheckCircle",
      description: "Service Organization Control 2 compliance verified"
    }
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Medical Officer, Stanford Health",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
      quote: "Aayu\'s AI analysis has revolutionized how we approach preventive care. The accuracy and insights provided have helped us detect early-stage conditions that might have been missed otherwise.",
      rating: 5
    },
    {
      name: "Dr. Michael Rodriguez",
      role: "Cardiologist, Mayo Clinic",
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face",
      quote: "The predictive capabilities of Aayu\'s platform have been instrumental in our cardiac care program. We\'ve seen a 40% improvement in early intervention success rates.",
      rating: 5
    },
    {
      name: "Dr. Emily Watson",
      role: "Director of Digital Health, Johns Hopkins",
      avatar: "https://images.unsplash.com/photo-1594824475317-8b7b0c3b5e5a?w=100&h=100&fit=crop&crop=face",
      quote: "As a healthcare leader, I'm impressed by Aayu's commitment to data security and clinical accuracy. It's a game-changer for patient engagement and outcomes.",
      rating: 5
    }
  ];

  const partnerships = [
    {
      name: "Stanford Medicine",
      logo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=200&h=100&fit=crop&crop=center"
    },
    {
      name: "Mayo Clinic",
      logo: "https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?w=200&h=100&fit=crop&crop=center"
    },
    {
      name: "Johns Hopkins",
      logo: "https://images.pixabay.com/photo/2017/10/04/09/56/laboratory-2815641_1280.jpg?w=200&h=100&fit=crop&crop=center"
    },
    {
      name: "Cleveland Clinic",
      logo: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=100&fit=crop&crop=center"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-success/10 rounded-full mb-6">
            <Icon name="Shield" size={20} className="text-success" />
            <span className="text-success font-medium">Trusted by Healthcare Leaders</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
            Medical-Grade Trust & Security
          </h2>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Built with the highest standards of medical compliance, security, and clinical accuracy. 
            Trusted by leading healthcare institutions and medical professionals worldwide.
          </p>
        </div>

        {/* Trust Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {trustMetrics?.map((metric, index) => (
            <div key={index} className="text-center medical-card p-6 conversion-hover">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name={metric?.icon} size={32} className="text-primary" />
              </div>
              <div className="text-3xl font-bold text-text-primary mb-2">{metric?.value}</div>
              <div className="text-lg font-semibold text-text-primary mb-2">{metric?.label}</div>
              <p className="text-sm text-text-secondary">{metric?.description}</p>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-text-primary text-center mb-12">
            Certifications & Compliance
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications?.map((cert, index) => (
              <div key={index} className="medical-card p-6 text-center conversion-hover">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={cert?.icon} size={24} className="text-success" />
                </div>
                <h4 className="font-bold text-text-primary mb-2">{cert?.name}</h4>
                <p className="text-sm text-text-secondary">{cert?.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Medical Professional Testimonials */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-text-primary text-center mb-12">
            Endorsed by Medical Professionals
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials?.map((testimonial, index) => (
              <div key={index} className="medical-card p-6 conversion-hover">
                {/* Rating Stars */}
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial?.rating)]?.map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="text-warning fill-current" />
                  ))}
                </div>
                
                {/* Quote */}
                <blockquote className="text-text-secondary mb-6 leading-relaxed">
                  "{testimonial?.quote}"
                </blockquote>
                
                {/* Author */}
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Image
                      src={testimonial?.avatar}
                      alt={testimonial?.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="CheckCircle" size={12} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-text-primary">{testimonial?.name}</div>
                    <div className="text-sm text-text-secondary">{testimonial?.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Healthcare Partnerships */}
        <div>
          <h3 className="text-2xl font-bold text-text-primary text-center mb-12">
            Trusted Healthcare Partners
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {partnerships?.map((partner, index) => (
              <div key={index} className="medical-card p-6 text-center conversion-hover group">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <Image
                    src={partner?.logo}
                    alt={partner?.name}
                    className="w-full h-20 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>
                <h4 className="font-semibold text-text-primary">{partner?.name}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* Security Statement */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-3 px-6 py-4 bg-surface border border-border rounded-xl shadow-medical">
            <Icon name="Lock" size={24} className="text-primary" />
            <div className="text-left">
              <div className="font-semibold text-text-primary">Your Data is Protected</div>
              <div className="text-sm text-text-secondary">End-to-end encryption • Zero-knowledge architecture • HIPAA compliant</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;