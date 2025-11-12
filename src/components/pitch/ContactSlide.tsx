import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, Linkedin, User } from 'lucide-react';

interface ContactSlideProps {
  slide: {
    title: string;
    subtitle: string;
    icon: React.ComponentType<any>;
  };
}

export const ContactSlide: React.FC<ContactSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  const contactDetails = {
    name: 'Shubham Srivastava',
    title: 'Founder, DISCVR.AI',
    email: 'shubham@discvr.ai',
    phone: '+91 98739 61591',
    linkedin: 'shubham@discvr.ai'
  };

  const cta = "Let's build India's zero-CAC financial intelligence platform together.";

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center">
          <IconComponent className="w-20 h-20 mx-auto mb-6 text-primary" />
          <h2 className="text-5xl font-bold text-foreground mb-4">{slide.title}</h2>
          <p className="text-2xl text-muted-foreground">{slide.subtitle}</p>
        </div>

        {/* Contact Card */}
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-8">
            {/* Name & Title */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-1">{contactDetails.name}</h3>
              <p className="text-lg text-muted-foreground">{contactDetails.title}</p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              <a 
                href={`mailto:${contactDetails.email}`}
                className="flex items-center gap-4 p-4 bg-background/50 rounded-lg hover:bg-background/80 transition-colors group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-lg font-semibold text-foreground">{contactDetails.email}</p>
                </div>
              </a>

              <a 
                href={`tel:${contactDetails.phone}`}
                className="flex items-center gap-4 p-4 bg-background/50 rounded-lg hover:bg-background/80 transition-colors group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="text-lg font-semibold text-foreground">{contactDetails.phone}</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 bg-background/50 rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Linkedin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">LinkedIn</p>
                  <p className="text-lg font-semibold text-foreground">{contactDetails.linkedin}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-6">
            <p className="text-center text-xl font-semibold">{cta}</p>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <p className="text-center text-sm text-muted-foreground">
          Thank you for your time and consideration
        </p>
      </div>
    </div>
  );
};
