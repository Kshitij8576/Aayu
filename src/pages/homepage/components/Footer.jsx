import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerSections = [
    {
      title: "AI Health Services",
      links: [
        { name: "Medical Report Analysis", path: "/medical-report-analysis" },
        { name: "Smart Medicine Recommendations", path: "/smart-medicine-recommendation" },
        { name: "Virtual Health Assistant", path: "/virtual-health-assistant" },
        { name: "Predictive Disease Detection", path: "/predictive-disease-detection" },
        { name: "Health Dashboard", path: "/user-dashboard" }
      ]
    },
    {
      title: "Healthcare Solutions",
      links: [
        { name: "Remote Patient Monitoring", path: "/user-dashboard" },
        { name: "Appointment Scheduling", path: "/user-dashboard" },
        { name: "Health Risk Assessment", path: "/predictive-disease-detection" },
        { name: "Medication Management", path: "/smart-medicine-recommendation" },
        { name: "Symptom Checker", path: "/virtual-health-assistant" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Aayu", path: "/homepage" },
        { name: "Our Mission", path: "/homepage" },
        { name: "Medical Advisory Board", path: "/homepage" },
        { name: "Research & Development", path: "/homepage" },
        { name: "Careers", path: "/homepage" },
        { name: "Press & Media", path: "/homepage" }
      ]
    },
    {
      title: "Trust & Security",
      links: [
        { name: "HIPAA Compliance", path: "/homepage" },
        { name: "Privacy Policy", path: "/homepage" },
        { name: "Terms of Service", path: "/homepage" },
        { name: "Data Security", path: "/homepage" },
        { name: "Medical Disclaimers", path: "/homepage" },
        { name: "Certifications", path: "/homepage" }
      ]
    }
  ];

  const socialLinks = [
    { name: "Twitter", icon: "Twitter", url: "https://twitter.com/aayuhealth" },
    { name: "LinkedIn", icon: "Linkedin", url: "https://linkedin.com/company/aayu" },
    { name: "Facebook", icon: "Facebook", url: "https://facebook.com/aayuhealth" },
    { name: "Instagram", icon: "Instagram", url: "https://instagram.com/aayuhealth" },
    { name: "YouTube", icon: "Youtube", url: "https://youtube.com/aayuhealth" }
  ];

  const trustBadges = [
    { name: "HIPAA Compliant", icon: "Shield" },
    { name: "FDA Approved", icon: "Award" },
    { name: "ISO 27001", icon: "Lock" },
    { name: "SOC 2 Type II", icon: "CheckCircle" }
  ];

  const contactInfo = [
    { icon: "Mail", text: "support@aayu.health", link: "mailto:support@aayu.health" },
    { icon: "Phone", text: "+1 (555) 123-4567", link: "tel:+15551234567" },
    { icon: "MapPin", text: "San Francisco, CA", link: "#" }
  ];

  return (
    <footer className="bg-text-primary text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-white"
                >
                  <path
                    d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
                    fill="currentColor"
                    className="health-pulse"
                  />
                  <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.6" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold">Aayu</h3>
                <p className="text-sm text-white/70">AI Health Companion</p>
              </div>
            </div>
            
            <p className="text-white/80 leading-relaxed">
              Revolutionizing healthcare through AI-powered medical analysis, predictive diagnostics, 
              and personalized health insights. Making advanced healthcare accessible to everyone.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo?.map((contact, index) => (
                <a
                  key={index}
                  href={contact?.link}
                  className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors"
                >
                  <Icon name={contact?.icon} size={16} />
                  <span className="text-sm">{contact?.text}</span>
                </a>
              ))}
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks?.map((social, index) => (
                <a
                  key={index}
                  href={social?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors"
                  aria-label={social?.name}
                >
                  <Icon name={social?.icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections?.map((section, index) => (
            <div key={index} className="space-y-4">
              <h4 className="text-lg font-semibold text-white">{section?.title}</h4>
              <ul className="space-y-3">
                {section?.links?.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link?.path}
                      className="text-white/70 hover:text-white transition-colors text-sm"
                    >
                      {link?.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {/* Trust Badges Section */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Trusted & Certified</h4>
              <div className="flex flex-wrap gap-6">
                {trustBadges?.map((badge, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon name={badge?.icon} size={16} className="text-success" />
                    <span className="text-sm text-white/80">{badge?.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <div className="text-sm text-white/60 mb-2">Healthcare Partners</div>
              <div className="flex space-x-4 text-xs text-white/50">
                <span>Stanford Medicine</span>
                <span>•</span>
                <span>Mayo Clinic</span>
                <span>•</span>
                <span>Johns Hopkins</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-sm text-white/60">
                © {currentYear} Aayu Health Technologies. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 text-xs text-white/50">
                <Link to="/homepage" className="hover:text-white/70 transition-colors">
                  Privacy Policy
                </Link>
                <span>•</span>
                <Link to="/homepage" className="hover:text-white/70 transition-colors">
                  Terms of Service
                </Link>
                <span>•</span>
                <Link to="/homepage" className="hover:text-white/70 transition-colors">
                  Medical Disclaimers
                </Link>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-xs text-white/50">
              <Icon name="Globe" size={14} />
              <span>Available in English • United States</span>
            </div>
          </div>
        </div>
      </div>
      {/* Medical Disclaimer */}
      <div className="bg-white/5 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-start space-x-3">
            <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5 flex-shrink-0" />
            <p className="text-xs text-white/60 leading-relaxed">
              <strong className="text-white/80">Medical Disclaimer:</strong> The information provided by Aayu is for educational and informational purposes only. 
              It is not intended as a substitute for professional medical advice, diagnosis, or treatment. 
              Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;