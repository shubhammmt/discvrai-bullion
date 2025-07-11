
import React, { useState, useRef, useEffect } from 'react';
import { StockData } from '@/data/stockMockData';
import StockHeader from './StockHeader';
import StockTabNavigation from './StockTabNavigation';
import InvestmentChecklist from '@/components/stock/overview/InvestmentChecklist';
import InteractivePriceChart from '@/components/stock/chart/InteractivePriceChart';
import CompanyOverviewCards from '@/components/stock/overview/CompanyOverviewCards';
import KeyMetricsTable from '@/components/stock/overview/KeyMetricsTable';
import HistoricalGrowthMetrics from '@/components/stock/overview/HistoricalGrowthMetrics';
import ResearchSharing from '@/components/ResearchSharing';
import TechnicalDashboard from '@/components/stock/technical/TechnicalDashboard';
import AnalystConsensus from '@/components/stock/forecast/AnalystConsensus';
import PeerComparisonTable from '@/components/stock/peers/PeerComparisonTable';
import FinancialStatementsView from '@/components/stock/financials/FinancialStatementsView';
import ShareholdingAnalysis from '@/components/stock/shareholding/ShareholdingAnalysis';
import ProjectionSection from '@/components/stock/projections/ProjectionSection';
import NewsTimeline from '@/components/stock/news/NewsTimeline';

interface StockPageLayoutProps {
  symbol: string;
  stockData: StockData;
}

export type TabType = 'overview' | 'technicals' | 'forecast' | 'peers' | 'financials' | 'shareholdings' | 'projection' | 'news';

const StockPageLayout: React.FC<StockPageLayoutProps> = ({ symbol, stockData }) => {
  const [activeSection, setActiveSection] = useState<TabType>('overview');
  
  // Create refs for each section
  const sectionRefs = {
    overview: useRef<HTMLDivElement>(null),
    technicals: useRef<HTMLDivElement>(null),
    forecast: useRef<HTMLDivElement>(null),
    peers: useRef<HTMLDivElement>(null),
    financials: useRef<HTMLDivElement>(null),
    shareholdings: useRef<HTMLDivElement>(null),
    projection: useRef<HTMLDivElement>(null),
    news: useRef<HTMLDivElement>(null)
  };

  // Intersection Observer to track which section is in view
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50px 0px -50px 0px', // Small margin to avoid rapid switching
      threshold: 0.1
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const intersectingEntries = entries.filter(entry => entry.isIntersecting);
      
      if (intersectingEntries.length > 0) {
        // Find the section that's most prominently visible
        let mostVisible = intersectingEntries[0];
        let maxVisibility = 0;
        
        intersectingEntries.forEach(entry => {
          const rect = entry.boundingClientRect;
          const viewportHeight = window.innerHeight;
          
          // Calculate how much of the section is visible in the viewport
          const visibleTop = Math.max(0, rect.top);
          const visibleBottom = Math.min(viewportHeight, rect.bottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          const visibilityRatio = visibleHeight / viewportHeight;
          
          if (visibilityRatio > maxVisibility) {
            maxVisibility = visibilityRatio;
            mostVisible = entry;
          }
        });
        
        const sectionId = mostVisible.target.id as TabType;
        console.log('Setting active section to:', sectionId, 'visibility:', maxVisibility);
        setActiveSection(sectionId);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (section: TabType) => {
    const element = sectionRefs[section].current;
    if (element) {
      const headerOffset = 140; // Account for sticky header and navigation
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Stock Price Header */}
      <StockHeader stockData={stockData} />
      
      {/* Section Navigation */}
      <StockTabNavigation activeTab={activeSection} onTabChange={scrollToSection} />
      
      {/* Main Content - Single Scrollable Page */}
      <div className="container mx-auto px-4 py-6 lg:px-6">
        <div className="space-y-12">
          
          {/* Overview Section */}
          <section ref={sectionRefs.overview} id="overview" className="scroll-mt-32">
            <div className="space-y-6">
              <InvestmentChecklist />
              <InteractivePriceChart symbol={symbol} />
              <CompanyOverviewCards />
              <HistoricalGrowthMetrics />
              <KeyMetricsTable />
              <ResearchSharing />
            </div>
          </section>

          {/* Technicals Section */}
          <section ref={sectionRefs.technicals} id="technicals" className="scroll-mt-32">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Technical Analysis</h2>
              <p className="text-muted-foreground">Chart patterns, indicators, and technical signals</p>
            </div>
            <TechnicalDashboard />
          </section>

          {/* Forecast Section */}
          <section ref={sectionRefs.forecast} id="forecast" className="scroll-mt-32">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Analyst Forecast</h2>
              <p className="text-muted-foreground">Price targets and analyst recommendations</p>
            </div>
            <AnalystConsensus />
          </section>

          {/* Peers Section */}
          <section ref={sectionRefs.peers} id="peers" className="scroll-mt-32">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Peer Comparison</h2>
              <p className="text-muted-foreground">Compare with industry peers and competitors</p>
            </div>
            <PeerComparisonTable />
          </section>

          {/* Financials Section */}
          <section ref={sectionRefs.financials} id="financials" className="scroll-mt-32">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Financial Statements</h2>
              <p className="text-muted-foreground">Income statement, balance sheet, and cash flow</p>
            </div>
            <FinancialStatementsView />
          </section>

          {/* Shareholdings Section */}
          <section ref={sectionRefs.shareholdings} id="shareholdings" className="scroll-mt-32">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Shareholding Pattern</h2>
              <p className="text-muted-foreground">Institutional and promoter holdings analysis</p>
            </div>
            <ShareholdingAnalysis />
          </section>

          {/* Projection Section */}
          <section ref={sectionRefs.projection} id="projection" className="scroll-mt-32">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Financial Projections</h2>
              <p className="text-muted-foreground">Future earnings and revenue projections</p>
            </div>
            <ProjectionSection />
          </section>

          {/* News Section */}
          <section ref={sectionRefs.news} id="news" className="scroll-mt-32">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">News & Events</h2>
              <p className="text-muted-foreground">Latest news, events, and market updates</p>
            </div>
            <NewsTimeline />
          </section>

        </div>
      </div>
    </div>
  );
};

export default StockPageLayout;
