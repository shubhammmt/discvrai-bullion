import { ProductFeature } from '@/types/news';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProductFeatureCardProps {
  feature: ProductFeature;
}

export const ProductFeatureCard = ({ feature }: ProductFeatureCardProps) => {
  const navigate = useNavigate();
  
  const IconComponent = feature.icon === 'sparkles' ? Sparkles : Sparkles;

  return (
    <Card 
      className={`relative overflow-hidden border-2 ${feature.gradient} hover:shadow-lg transition-all cursor-pointer group`}
      onClick={() => navigate(feature.route)}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      <div className="relative p-5">
        {/* Header with badge and icon */}
        <div className="flex items-center justify-between mb-3">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
            <Sparkles className="w-3 h-3 mr-1" />
            Product Feature
          </Badge>
          <div className="p-2 rounded-lg bg-background/80 backdrop-blur-sm">
            <IconComponent className="w-5 h-5 text-primary" />
          </div>
        </div>

        {/* Title */}
        <h4 className="font-semibold text-base mb-2 group-hover:text-primary transition-colors">
          {feature.title}
        </h4>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {feature.description}
        </p>

        {/* Benefit/Stat */}
        <div className="mb-4 p-3 rounded-lg bg-background/60 backdrop-blur-sm border border-primary/10">
          <p className="text-sm font-medium text-primary">
            {feature.benefit}
          </p>
          {feature.statLabel && feature.statValue && (
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xs text-muted-foreground">{feature.statLabel}:</span>
              <span className="text-sm font-semibold">{feature.statValue}</span>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <Button 
          className="w-full group-hover:shadow-md transition-all"
          onClick={(e) => {
            e.stopPropagation();
            navigate(feature.route);
          }}
        >
          {feature.ctaText}
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </Card>
  );
};
