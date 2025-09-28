import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Linkedin } from 'lucide-react';

interface CTASlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
    description: string;
    contact: {
      email: string;
      phone: string;
      linkedin: string;
    };
    cta: string;
  };
}

export const CTASlide: React.FC<CTASlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-blue-600" />
        <h2 className="text-4xl font-bold text-gray-900 mb-2">{slide.title}</h2>
        <p className="text-xl text-gray-600 mb-8">{slide.subtitle}</p>
      </div>
      
      <Card className="p-8 mb-8 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent>
          <p className="text-xl text-center text-gray-700 leading-relaxed mb-8">{slide.description}</p>
          
          <div className="text-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
              {slide.cta}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 text-center hover:shadow-lg transition-shadow">
          <CardContent className="space-y-3">
            <Mail className="w-8 h-8 mx-auto text-blue-600" />
            <h3 className="font-semibold text-gray-900">Email</h3>
            <p className="text-gray-600 text-sm">{slide.contact.email}</p>
          </CardContent>
        </Card>
        
        <Card className="p-6 text-center hover:shadow-lg transition-shadow">
          <CardContent className="space-y-3">
            <Phone className="w-8 h-8 mx-auto text-blue-600" />
            <h3 className="font-semibold text-gray-900">Phone</h3>
            <p className="text-gray-600 text-sm">{slide.contact.phone}</p>
          </CardContent>
        </Card>
        
        <Card className="p-6 text-center hover:shadow-lg transition-shadow">
          <CardContent className="space-y-3">
            <Linkedin className="w-8 h-8 mx-auto text-blue-600" />
            <h3 className="font-semibold text-gray-900">LinkedIn</h3>
            <p className="text-gray-600 text-sm">{slide.contact.linkedin}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};