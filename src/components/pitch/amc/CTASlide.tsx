import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, Linkedin } from 'lucide-react';

interface CTASlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    options: Array<{
      title: string;
      description: string;
      timeline: string;
    }>;
    contact: {
      name: string;
      email: string;
      phone: string;
      linkedin: string;
    };
  };
}

export const CTASlide: React.FC<CTASlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="h-screen flex flex-col justify-center p-12 bg-gradient-to-br from-background to-muted/20">
      <div className="text-center mb-6">
        <IconComponent className="w-12 h-12 mx-auto mb-3 text-primary" />
        <h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
        <p className="text-lg text-muted-foreground">{slide.subtitle}</p>
      </div>
      
      <div className="grid grid-cols-3 gap-4 max-w-5xl mx-auto mb-8">
        {slide.options.map((option, index) => (
          <Card key={index} className="border-2 hover:border-primary transition-all">
            <CardContent className="p-5 space-y-2">
              <div className="text-2xl font-bold text-primary">{index + 1}</div>
              <h3 className="text-lg font-bold">{option.title}</h3>
              <p className="text-sm text-muted-foreground">{option.description}</p>
              <div className="pt-2 border-t">
                <span className="text-xs text-muted-foreground">Timeline: </span>
                <span className="text-sm font-semibold">{option.timeline}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card className="max-w-2xl mx-auto border-2 border-primary">
        <CardContent className="p-5">
          <h3 className="text-xl font-bold mb-4 text-center text-primary">{slide.contact.name}</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-3 justify-center">
              <Mail className="w-4 h-4 text-primary" />
              <a href={`mailto:${slide.contact.email}`} className="hover:text-primary transition-colors">
                {slide.contact.email}
              </a>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <Phone className="w-4 h-4 text-primary" />
              <a href={`tel:${slide.contact.phone}`} className="hover:text-primary transition-colors">
                {slide.contact.phone}
              </a>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <Linkedin className="w-4 h-4 text-primary" />
              <a href={slide.contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                LinkedIn Profile
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
