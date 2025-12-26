import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Award, Shield, Wallet } from "lucide-react";

const MetalsHub = () => {
  const metals = [
    {
      name: "Gold",
      slug: "gold",
      description: "Track 22kt and 24kt gold prices across India",
      icon: Award,
      color: "from-yellow-500 to-amber-600"
    },
    {
      name: "Silver",
      slug: "silver",
      description: "Live silver rates for 10g, 100g, and 1kg",
      icon: Shield,
      color: "from-gray-400 to-gray-600"
    },
    {
      name: "Platinum",
      slug: "platinum",
      description: "Platinum prices per 1g, 10g, and 100g",
      icon: TrendingUp,
      color: "from-blue-400 to-blue-600"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Precious Metals Prices in India
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real-time gold, silver, and platinum prices across all major cities in India
            </p>
            
            {/* Invest CTA */}
            <Link to="/bullion">
              <Button size="lg" className="mt-6 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white">
                <Wallet className="w-5 h-5 mr-2" />
                Buy Digital Gold & Silver
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {metals.map((metal) => {
              const Icon = metal.icon;
              return (
                <Link key={metal.slug} to={`/metals/${metal.slug}`}>
                  <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${metal.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{metal.name}</h3>
                    <p className="text-muted-foreground mb-4">{metal.description}</p>
                    <Button variant="outline" className="w-full">
                      View {metal.name} Prices
                    </Button>
                  </Card>
                </Link>
              );
            })}
          </div>

          <div className="bg-card rounded-lg p-8 border">
            <h2 className="text-2xl font-bold mb-6">Why Track Precious Metals?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Investment Opportunities</h3>
                <p className="text-muted-foreground">
                  Stay informed about market trends and make better investment decisions
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">City-Specific Pricing</h3>
                <p className="text-muted-foreground">
                  Compare prices across different cities to get the best rates
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Historical Data</h3>
                <p className="text-muted-foreground">
                  Analyze price trends over time with our historical charts
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Price Alerts</h3>
                <p className="text-muted-foreground">
                  Get notified when prices hit your target levels
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetalsHub;
