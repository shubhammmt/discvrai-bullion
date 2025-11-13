import React from 'react';
import { Card } from '@/components/ui/card';

interface DistributionValueSlideProps {
  slide: any;
}

export const DistributionValueSlide: React.FC<DistributionValueSlideProps> = ({ slide }) => {
  const IconComponent = slide.icon;

  return (
    <div className="h-screen bg-gradient-to-br from-primary/10 via-background to-primary/5 p-12 flex flex-col">
      {/* Header */}
      <div className="text-center mb-6">
        <IconComponent className="w-12 h-12 mx-auto mb-3 text-primary" />
        <h1 className="text-4xl font-bold text-foreground mb-2">{slide.title}</h1>
        <p className="text-lg text-muted-foreground">{slide.subtitle}</p>
      </div>

      {/* Current Products - Compact */}
      <Card className="p-4 mb-6 bg-card/80 backdrop-blur">
        <h3 className="text-lg font-bold text-foreground mb-3">{slide.currentProducts.title}</h3>
        <div className="grid grid-cols-3 gap-4">
          {slide.currentProducts.categories.map((cat: any, index: number) => (
            <div key={index} className="border-l-4 border-primary pl-3">
              <div className="font-semibold text-foreground text-sm mb-1">{cat.name}</div>
              <div className="text-xs text-muted-foreground">{cat.market}</div>
              <div className="text-xs text-primary font-medium mt-1">{cat.audience}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Partner Benefits Grid */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-foreground mb-4">{slide.partnerBenefits.title}</h3>
        <div className="grid grid-cols-3 gap-4">
          {slide.partnerBenefits.benefits.map((benefit: any, index: number) => {
            const BenefitIcon = benefit.icon;
            return (
              <Card key={index} className="p-4 bg-card/80 backdrop-blur">
                <BenefitIcon className="w-8 h-8 text-primary mb-2" />
                <h4 className="font-semibold text-foreground text-sm mb-1">{benefit.benefit}</h4>
                <p className="text-xs text-muted-foreground">{benefit.description}</p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* How It Works - Compact Flow */}
      <Card className="p-4 mb-6 bg-card/80 backdrop-blur">
        <h3 className="text-lg font-bold text-foreground mb-3">{slide.howItWorks.title}</h3>
        <div className="flex items-center justify-between gap-2">
          {slide.howItWorks.steps.map((step: string, index: number) => (
            <React.Fragment key={index}>
              <div className="flex-1 text-center">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm mx-auto mb-2">
                  {index + 1}
                </div>
                <p className="text-xs text-foreground leading-tight">{step}</p>
              </div>
              {index < slide.howItWorks.steps.length - 1 && (
                <div className="text-primary text-xl">→</div>
              )}
            </React.Fragment>
          ))}
        </div>
      </Card>

      {/* CTA */}
      <Card className="p-4 bg-primary/10 border-primary">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-1">{slide.cta.title}</h3>
            <p className="text-sm text-muted-foreground">{slide.cta.subtitle}</p>
          </div>
          <div className="text-right">
            <div className="font-bold text-foreground text-lg">{slide.cta.contact.name}</div>
            <div className="text-sm text-muted-foreground mb-1">{slide.cta.contact.role}</div>
            <div className="text-sm text-primary font-semibold">{slide.cta.contact.email}</div>
            <div className="text-sm text-foreground">{slide.cta.contact.phone}</div>
          </div>
        </div>
      </Card>
    </div>
  );
};
