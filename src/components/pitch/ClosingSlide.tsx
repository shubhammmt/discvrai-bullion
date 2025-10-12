import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, Globe, Linkedin } from 'lucide-react';

interface ClosingSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    mission: string;
    whyNow: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
    ask: {
      amount: string;
      timeline: string;
      opportunity: string;
    };
    contact: {
      name: string;
      email: string;
      phone: string;
      website: string;
      linkedin: string;
    };
  };
}

export const ClosingSlide: React.FC<ClosingSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-primary" />
        <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
        <p className="text-2xl text-muted-foreground mb-6">{slide.subtitle}</p>
        
        <Card className="max-w-3xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <p className="text-xl font-medium leading-relaxed text-foreground/90">
              "{slide.mission}"
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Why Now */}
        <div>
          <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            Perfect Timing
          </h3>
          <div className="space-y-3">
            {slide.whyNow.map((trend, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{trend.icon}</span>
                    <div>
                      <h4 className="font-semibold mb-1">{trend.title}</h4>
                      <p className="text-sm text-muted-foreground">{trend.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* The Ask + Contact */}
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-2xl">🚀</span>
            The Ask
          </h3>
          
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
            <CardContent className="p-6 space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Investment Amount</p>
                <p className="text-2xl font-bold text-green-700 dark:text-green-300">{slide.ask.amount}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Timeline</p>
                <p className="font-semibold">{slide.ask.timeline}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Opportunity</p>
                <p className="font-semibold">{slide.ask.opportunity}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800">
            <CardContent className="p-6 space-y-3">
              <h4 className="font-semibold text-lg mb-3">Get in Touch</h4>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <a href={`mailto:${slide.contact.email}`} className="font-medium text-sm hover:underline">
                      {slide.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <a href={`tel:${slide.contact.phone}`} className="font-medium text-sm hover:underline">
                      {slide.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Globe className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Website</p>
                    <a href={slide.contact.website} target="_blank" rel="noopener noreferrer" className="font-medium text-sm hover:underline">
                      {slide.contact.website}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Linkedin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">LinkedIn</p>
                    <a href={slide.contact.linkedin} target="_blank" rel="noopener noreferrer" className="font-medium text-sm hover:underline">
                      Connect on LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 border-yellow-200 dark:border-yellow-800">
            <CardContent className="p-4 text-center">
              <p className="text-sm font-semibold">
                Let's democratize financial intelligence together 🚀
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
