import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [interests, setInterests] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const healthTopics = [
    { id: 'ai-health', label: 'AI Health Insights', icon: 'Brain' },
    { id: 'preventive-care', label: 'Preventive Care', icon: 'Shield' },
    { id: 'chronic-conditions', label: 'Chronic Conditions', icon: 'Activity' },
    { id: 'mental-health', label: 'Mental Health', icon: 'Heart' },
    { id: 'nutrition', label: 'Nutrition & Wellness', icon: 'Apple' },
    { id: 'medical-research', label: 'Medical Research', icon: 'Microscope' }
  ];

  const handleInterestToggle = (interestId) => {
    setInterests(prev => 
      prev?.includes(interestId)
        ? prev?.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const handleSubscribe = (e) => {
    e?.preventDefault();
    if (email && agreedToTerms) {
      setIsSubscribed(true);
      // Here you would typically send the data to your backend
      console.log('Newsletter subscription:', { email, name, interests });
    }
  };

  if (isSubscribed) {
    return (
      <section className="py-20 bg-gradient-to-br from-success/5 via-surface to-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="medical-card p-12">
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="CheckCircle" size={40} className="text-success" />
            </div>
            
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Welcome to Aayu Health Insights!
            </h2>
            
            <p className="text-xl text-text-secondary mb-8">
              Thank you for subscribing! You'll receive your first AI-powered health newsletter within 24 hours.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <Icon name="Mail" size={24} className="text-primary mx-auto mb-2" />
                <div className="font-semibold text-text-primary">Weekly Insights</div>
                <div className="text-sm text-text-secondary">Personalized health tips</div>
              </div>
              <div className="text-center">
                <Icon name="TrendingUp" size={24} className="text-secondary mx-auto mb-2" />
                <div className="font-semibold text-text-primary">Health Trends</div>
                <div className="text-sm text-text-secondary">Latest medical research</div>
              </div>
              <div className="text-center">
                <Icon name="Bell" size={24} className="text-warning mx-auto mb-2" />
                <div className="font-semibold text-text-primary">Early Access</div>
                <div className="text-sm text-text-secondary">New AI features first</div>
              </div>
            </div>
            
            <Button
              variant="default"
              className="bg-primary hover:bg-primary/90 text-white"
              iconName="ArrowRight"
              iconPosition="right"
              onClick={() => setIsSubscribed(false)}
            >
              Continue Exploring Aayu
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-surface to-secondary/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Section */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
                <Icon name="Mail" size={20} className="text-primary" />
                <span className="text-primary font-medium">Health Newsletter</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
                Stay Ahead of Your Health
              </h2>
              
              <p className="text-xl text-text-secondary leading-relaxed mb-8">
                Get personalized AI-powered health insights, latest medical research, and preventive care tips 
                delivered to your inbox. Join 50,000+ health-conscious individuals who trust Aayu.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Icon name="CheckCircle" size={20} className="text-success" />
                <span className="text-text-primary">Weekly AI-generated health insights based on latest research</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="CheckCircle" size={20} className="text-success" />
                <span className="text-text-primary">Personalized preventive care recommendations</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="CheckCircle" size={20} className="text-success" />
                <span className="text-text-primary">Early access to new AI health features</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="CheckCircle" size={20} className="text-success" />
                <span className="text-text-primary">Expert interviews and medical breakthroughs</span>
              </div>
            </div>

            {/* Social Proof */}
            <div className="flex items-center space-x-6 pt-6 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50K+</div>
                <div className="text-sm text-text-secondary">Subscribers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">4.9★</div>
                <div className="text-sm text-text-secondary">Newsletter Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">95%</div>
                <div className="text-sm text-text-secondary">Open Rate</div>
              </div>
            </div>
          </div>

          {/* Subscription Form */}
          <div className="medical-card p-8">
            <form onSubmit={handleSubscribe} className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-text-primary mb-4">
                  Subscribe to Health Insights
                </h3>
                <p className="text-text-secondary mb-6">
                  Customize your newsletter to receive content that matters most to you.
                </p>
              </div>

              {/* Basic Info */}
              <div className="space-y-4">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e?.target?.value)}
                  required
                />
                
                <Input
                  label="First Name (Optional)"
                  type="text"
                  placeholder="Your first name"
                  value={name}
                  onChange={(e) => setName(e?.target?.value)}
                />
              </div>

              {/* Health Interests */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-4">
                  Health Topics of Interest
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {healthTopics?.map((topic) => (
                    <button
                      key={topic?.id}
                      type="button"
                      onClick={() => handleInterestToggle(topic?.id)}
                      className={`flex items-center space-x-2 p-3 rounded-lg border-2 transition-all text-left ${
                        interests?.includes(topic?.id)
                          ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/20 hover:bg-primary/5'
                      }`}
                    >
                      <Icon 
                        name={topic?.icon} 
                        size={16} 
                        className={interests?.includes(topic?.id) ? 'text-primary' : 'text-text-secondary'} 
                      />
                      <span className="text-sm font-medium">{topic?.label}</span>
                      {interests?.includes(topic?.id) && (
                        <Icon name="Check" size={14} className="text-primary ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="space-y-4">
                <Checkbox
                  label="I agree to receive health newsletters and updates from Aayu"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e?.target?.checked)}
                  required
                />
                
                <p className="text-xs text-text-secondary">
                  By subscribing, you agree to our Privacy Policy and Terms of Service. 
                  You can unsubscribe at any time. We respect your privacy and will never share your data.
                </p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="default"
                size="lg"
                fullWidth
                className="bg-conversion-accent hover:bg-conversion-accent/90 text-white"
                iconName="Mail"
                iconPosition="left"
                disabled={!email || !agreedToTerms}
              >
                Subscribe to Health Insights
              </Button>
            </form>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center space-x-6 mt-6 pt-6 border-t border-border">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-success" />
                <span className="text-xs text-text-secondary">HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Lock" size={16} className="text-primary" />
                <span className="text-xs text-text-secondary">Secure & Private</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="X" size={16} className="text-warning" />
                <span className="text-xs text-text-secondary">No Spam</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;