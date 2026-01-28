import { LaunchPromoCard, LaunchPromoBanner, LaunchPromoGrid } from "@/components/bullion/LaunchPromotionCards";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const BullionLaunchOffers = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center gap-4">
          <Link to="/bullion">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">Launch Offers</h1>
        </div>
      </header>

      <main className="container py-8 space-y-10">
        {/* Hero Banner */}
        <LaunchPromoBanner />

        {/* Individual Cards Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Exclusive Launch Deals</h2>
          <LaunchPromoGrid />
        </section>

        {/* Additional Info */}
        <section className="text-center py-8">
          <p className="text-muted-foreground max-w-xl mx-auto">
            Be among the first to invest in Digital Gold & Silver. Limited time offers available only during our launch period!
          </p>
        </section>
      </main>
    </div>
  );
};

export default BullionLaunchOffers;
