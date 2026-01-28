import { LaunchPromoCard, LaunchPromoBanner, LaunchPromoGrid } from "@/components/bullion/LaunchPromotionCards";
import {
  SmartGoldCard,
  SmartSilverCard,
  WelcomeBonusCard,
  SIPBonusCard,
  DontMissCard,
  WhyDigitalCard,
  SIPEducationCard,
  HeroBannerCard,
  ComparisonCard,
} from "@/components/bullion/AdvertisingCards";
import { ArrowLeft, Download, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "sonner";

const BullionLaunchOffers = () => {
  const cardsRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadAllCards = async () => {
    if (!cardsRef.current) return;

    setIsDownloading(true);
    toast.info("Preparing cards for download...");

    try {
      const cards = cardsRef.current.querySelectorAll('.ad-card');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
      let currentY = margin;

      for (let i = 0; i < cards.length; i++) {
        const card = cards[i] as HTMLElement;
        const canvas = await html2canvas(card, {
          scale: 2,
          backgroundColor: '#ffffff',
          logging: false,
        });

        const imgData = canvas.toDataURL('image/png');
        const imgWidth = pageWidth - (margin * 2);
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Check if we need a new page
        if (currentY + imgHeight > pageHeight - margin) {
          pdf.addPage();
          currentY = margin;
        }

        pdf.addImage(imgData, 'PNG', margin, currentY, imgWidth, imgHeight);
        currentY += imgHeight + 10;
      }

      pdf.save('discvr-bullion-promotional-cards.pdf');
      toast.success("Cards downloaded successfully!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download cards");
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadSingleCard = async (cardId: string) => {
    const card = document.getElementById(cardId);
    if (!card) return;

    try {
      const canvas = await html2canvas(card, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const link = document.createElement('a');
      link.download = `${cardId}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      toast.success("Card downloaded!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download card");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/bullion">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold">Launch Offers & Promotional Cards</h1>
          </div>
          <Button onClick={downloadAllCards} disabled={isDownloading} className="gap-2">
            {isDownloading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            Download All Cards (PDF)
          </Button>
        </div>
      </header>

      <main className="container py-8 space-y-10" ref={cardsRef}>
        {/* Hero Banner */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Hero Banners</h2>
          </div>
          <div id="hero-banner">
            <HeroBannerCard />
          </div>
        </section>

        {/* Launch Promo Banner */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Launch Announcement</h2>
          <div id="launch-banner">
            <LaunchPromoBanner />
          </div>
        </section>

        {/* Smart Investment Cards */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Smart Investment Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div id="smart-gold">
              <SmartGoldCard />
            </div>
            <div id="smart-silver">
              <SmartSilverCard />
            </div>
          </div>
        </section>

        {/* Launching Soon Cards */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Launching Soon Cards</h2>
          <LaunchPromoGrid />
        </section>

        {/* Offer Cards */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Special Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div id="welcome-bonus">
              <WelcomeBonusCard />
            </div>
            <div id="sip-bonus">
              <SIPBonusCard />
            </div>
            <div id="dont-miss">
              <DontMissCard />
            </div>
          </div>
        </section>

        {/* Educational Cards */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Educational Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div id="why-digital">
              <WhyDigitalCard />
            </div>
            <div id="sip-education">
              <SIPEducationCard />
            </div>
          </div>
        </section>

        {/* Comparison Card */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Comparison Card</h2>
          <div id="comparison" className="max-w-2xl">
            <ComparisonCard />
          </div>
        </section>

        {/* Additional Info */}
        <section className="text-center py-8 border-t">
          <p className="text-muted-foreground max-w-xl mx-auto mb-4">
            All promotional cards are ready for advertising. Click "Download All Cards" to get a PDF with all cards, or right-click individual cards to save as images.
          </p>
          <p className="text-sm text-muted-foreground">
            💡 Tip: For social media, download individual cards as high-resolution images.
          </p>
        </section>
      </main>
    </div>
  );
};

export default BullionLaunchOffers;
