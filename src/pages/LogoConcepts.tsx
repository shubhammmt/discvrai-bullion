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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h3 className="font-semibold text-foreground mb-2">For New Generation Appeal:</h3>
              <p className="text-muted-foreground">Consider concepts 2 (Connected Nodes) or 3 (AI Brain) for their modern, tech-forward aesthetic that resonates with younger investors.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">For Seasoned Investors:</h3>
              <p className="text-muted-foreground">Concepts 1 (Minimalist D) or 5 (Geometric Mountain) offer professional stability while maintaining modern appeal.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Best Balance:</h3>
              <p className="text-muted-foreground">Concept 4 (Discover Eye) provides discovery theme with professional trust, appealing to both demographics.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Mobile App Icon:</h3>
              <p className="text-muted-foreground">All concepts are designed to work well at small sizes, but concepts 1 and 4 are particularly optimized for app icons.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoConcepts;