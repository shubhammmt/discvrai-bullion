import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import all logo concepts
import logoConcept1 from '@/assets/logo-concept-1-minimalist-d.png';
import logoConcept2 from '@/assets/logo-concept-2-connected-nodes.png';
import logoConcept3 from '@/assets/logo-concept-3-ai-brain-chart.png';
import logoConcept4 from '@/assets/logo-concept-4-discover-eye.png';
import logoConcept5 from '@/assets/logo-concept-5-geometric-mountain.png';
import logoConcept6 from '@/assets/logo-concept-6-data-hexagon.png';
import logoConcept7 from '@/assets/logo-concept-7-shield-growth.png';
import logoConcept8 from '@/assets/logo-concept-8-portfolio-circle.png';
import logoConcept9 from '@/assets/logo-concept-9-digital-compass.png';
import logoConcept10 from '@/assets/logo-concept-10-infinity-growth.png';

const LogoConcepts = () => {
  const navigate = useNavigate();

  const logoOptions = [
    {
      id: 1,
      title: "Minimalist D with Growth",
      description: "Clean geometric 'D' with subtle upward trending lines inside. Deep blue to electric blue gradient. Scalable design perfect for app icons.",
      image: logoConcept1,
      features: ["Clean & Professional", "Scalable Design", "Growth Elements", "Modern Gradients"]
    },
    {
      id: 2,
      title: "Connected Nodes Network",
      description: "Abstract network of interconnected dots forming a 'D'. Represents portfolio aggregation and AI connections with modern tech aesthetic.",
      image: logoConcept2,
      features: ["Tech-Forward", "Network Concept", "AI Representation", "Portfolio Aggregation"]
    },
    {
      id: 3,
      title: "AI Brain + Financial Chart",
      description: "Stylized brain outline with chart lines as neural pathways. Combines AI intelligence with financial growth in contemporary style.",
      image: logoConcept3,
      features: ["AI Intelligence", "Financial Growth", "Neural Pathways", "Contemporary Design"]
    },
    {
      id: 4,
      title: "Discover Eye/Lens",
      description: "Modern eye/lens shape representing discovery. Iris designed as a financial dashboard. Clean, memorable, works at small sizes.",
      image: logoConcept4,
      features: ["Discovery Theme", "Dashboard Elements", "Memorable Design", "Small Size Friendly"]
    },
    {
      id: 5,
      title: "Geometric Mountain/Growth",
      description: "Abstract mountain peaks in geometric style. Represents growth, stability, and reaching goals with modern gradients and timeless shape.",
      image: logoConcept5,
      features: ["Growth & Stability", "Geometric Style", "Aspirational", "Timeless Appeal"]
    },
    {
      id: 6,
      title: "Data Hexagon Pattern",
      description: "Stylized 'D' made of hexagonal patterns representing data and analytics. Clean geometric design with modern tech aesthetic.",
      image: logoConcept6,
      features: ["Data Analytics", "Geometric Patterns", "Tech-Forward", "Modern Design"]
    },
    {
      id: 7,
      title: "Security Shield Growth",
      description: "Abstract shield shape incorporating growth arrow and financial chart elements. Represents security and financial growth with premium appeal.",
      image: logoConcept7,
      features: ["Security Theme", "Premium Appeal", "Growth Elements", "Trustworthy"]
    },
    {
      id: 8,
      title: "Portfolio Diversification",
      description: "Circular design with intersecting lines forming portfolio diversification concept. Clean geometric shapes in sophisticated gradients.",
      image: logoConcept8,
      features: ["Diversification", "Sophisticated", "Clean Geometry", "Professional"]
    },
    {
      id: 9,
      title: "Digital Compass",
      description: "Stylized compass with digital elements pointing toward financial growth. Combines navigation/discovery theme with modern tech aesthetic.",
      image: logoConcept9,
      features: ["Navigation Theme", "Discovery Focus", "Digital Elements", "Purposeful Design"]
    },
    {
      id: 10,
      title: "Infinity Growth Loop",
      description: "Abstract infinity symbol with financial growth elements integrated. Represents continuous financial improvement and AI learning.",
      image: logoConcept10,
      features: ["Continuous Growth", "AI Learning", "Infinity Concept", "Memorable Design"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              Back to Home
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Logo Concepts</h1>
              <p className="text-muted-foreground">Explore different logo directions for DiscvrAI</p>
            </div>
          </div>
        </div>
      </div>

      {/* Logo Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {logoOptions.map((logo) => (
            <Card key={logo.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-6 bg-white rounded-lg shadow-sm">
                  <img 
                    src={logo.image} 
                    alt={logo.title}
                    className="w-24 h-24 mx-auto object-contain"
                  />
                </div>
                <CardTitle className="text-xl">{logo.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {logo.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-foreground">Key Features:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {logo.features.map((feature, index) => (
                      <div 
                        key={index}
                        className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-md text-center"
                      >
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Decision Help Section */}
        <div className="mt-12 bg-card rounded-lg p-8 border border-border">
          <h2 className="text-2xl font-bold text-foreground mb-4">Choosing Your Logo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
            <div>
              <h3 className="font-semibold text-foreground mb-2">For New Generation Appeal:</h3>
              <p className="text-muted-foreground">Consider concepts 2 (Connected Nodes), 3 (AI Brain), 6 (Data Hexagon), or 10 (Infinity Growth) for their modern, tech-forward aesthetic.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">For Seasoned Investors:</h3>
              <p className="text-muted-foreground">Concepts 1 (Minimalist D), 5 (Geometric Mountain), 7 (Security Shield), or 8 (Portfolio Circle) offer professional stability and trust.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Best Balance:</h3>
              <p className="text-muted-foreground">Concepts 4 (Discover Eye) and 9 (Digital Compass) provide discovery themes with professional appeal for both demographics.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Mobile App Icon:</h3>
              <p className="text-muted-foreground">Concepts 1, 4, 6, 7, and 8 are particularly optimized for small sizes and app icons with clear, recognizable shapes.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Premium Appeal:</h3>
              <p className="text-muted-foreground">Concepts 7 (Security Shield), 8 (Portfolio Circle), and 10 (Infinity Growth) convey premium quality and sophistication.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Tech Innovation:</h3>
              <p className="text-muted-foreground">Concepts 2 (Connected Nodes), 3 (AI Brain), 6 (Data Hexagon), and 9 (Digital Compass) emphasize technological advancement.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoConcepts;