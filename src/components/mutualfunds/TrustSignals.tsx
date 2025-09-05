import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Award, 
  Users, 
  TrendingUp,
  Star,
  CheckCircle,
  Globe
} from 'lucide-react';

const TrustSignals = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Software Engineer",
      content: "The AI recommendations helped me achieve 22% returns while my bank FD was giving only 6%. Game changer!",
      rating: 5,
      location: "Bangalore"
    },
    {
      name: "Rajesh Kumar",
      role: "Business Owner", 
      content: "Finally, a platform that combines data science with human expertise. My portfolio is now perfectly balanced.",
      rating: 5,
      location: "Mumbai"
    },
    {
      name: "Anita Patel",
      role: "Doctor",
      content: "As a busy professional, I love how the AI handles the complex analysis while I focus on my career.",
      rating: 5,
      location: "Delhi"
    }
  ];

  const certifications = [
    {
      icon: Shield,
      title: "SEBI Registered",
      description: "Fully compliant with market regulations"
    },
    {
      icon: Award,
      title: "ISO 27001 Certified",
      description: "Bank-grade security standards"
    },
    {
      icon: Globe,
      title: "Global Standards", 
      description: "Following international best practices"
    }
  ];

  const stats = [
    { value: "₹1,200Cr+", label: "Assets Under Analysis", icon: TrendingUp },
    { value: "50,000+", label: "Active Investors", icon: Users },
    { value: "18.5%", label: "Average Returns", icon: Award },
    { value: "98%", label: "User Satisfaction", icon: Star }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Trust Stats */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Trusted by Thousands of Smart Investors</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join a community of investors who've discovered the power of AI-driven insights combined with human expertise.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-border/50 hover:border-primary/20 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <p className="text-2xl md:text-3xl font-bold text-foreground mb-2">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">What Our Users Say</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-border/50 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-sm">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {testimonial.location}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-card rounded-2xl border border-border/50 p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Security & Compliance</h3>
            <p className="text-muted-foreground">Your investments are protected by industry-leading security measures</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <cert.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h4 className="font-semibold mb-2">{cert.title}</h4>
                <p className="text-sm text-muted-foreground">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Trust Elements */}
        <div className="mt-12 text-center">
          <div className="flex justify-center items-center gap-8 flex-wrap">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm text-muted-foreground">100% Transparent Fees</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm text-muted-foreground">No Hidden Charges</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm text-muted-foreground">24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm text-muted-foreground">Instant Portfolio Analysis</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;