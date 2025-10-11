import React from 'react';
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
import NewsTimeline from '@/components/stock/news/NewsTimeline';
import { useInvestmentHealthRadar } from '@/hooks/useInvestmentHealthRadar';
import { TabType } from './StockPageLayout';

interface StockSectionsProps {
  symbol: string;
  sectionRefs: {
    overview: React.RefObject<HTMLDivElement>;
    technicals: React.RefObject<HTMLDivElement>;
    forecast: React.RefObject<HTMLDivElement>;
    peers: React.RefObject<HTMLDivElement>;
    financials: React.RefObject<HTMLDivElement>;
    shareholdings: React.RefObject<HTMLDivElement>;
    news: React.RefObject<HTMLDivElement>;
  };
}

const StockSections: React.FC<StockSectionsProps> = ({ symbol, sectionRefs }) => {
  // API Hooks
  const { data: healthRadarData, isLoading: isHealthRadarLoading, error: healthRadarError } = useInvestmentHealthRadar(symbol);
  
  return (
    <div className="container mx-auto px-4 py-6 lg:px-6">
      <div className="space-y-12">
        
        {/* Overview Section */}
        <section ref={sectionRefs.overview} id="overview" className="scroll-mt-32">
          <div className="space-y-6">
            <CompanyOverviewCards />
            <InvestmentChecklist 
              symbol={symbol} 
              data={healthRadarData}
              isLoading={isHealthRadarLoading}
              error={healthRadarError}
            />
            <InteractivePriceChart symbol={symbol} />
            <HistoricalGrowthMetrics />
            <KeyMetricsTable />
          </div>
        </section>

        {/* Technicals Section */}
        <section ref={sectionRefs.technicals} id="technicals" className="scroll-mt-32">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Charts & Technical Analysis</h2>
            <p className="text-muted-foreground">Chart patterns, indicators, and technical signals</p>
          </div>
          <TechnicalDashboard />
        </section>

        {/* Forecast Section */}
        <section ref={sectionRefs.forecast} id="forecast" className="scroll-mt-32">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Price Targets</h2>
            <p className="text-muted-foreground">Analyst recommendations and price forecasts</p>
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
            <h2 className="text-2xl font-bold">Financials</h2>
            <p className="text-muted-foreground">Income statement, balance sheet, and cash flow</p>
          </div>
          <FinancialStatementsView />
        </section>

        {/* Shareholdings Section */}
        <section ref={sectionRefs.shareholdings} id="shareholdings" className="scroll-mt-32">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Ownership Structure</h2>
            <p className="text-muted-foreground">Institutional and promoter holdings analysis</p>
          </div>
          <ShareholdingAnalysis />
        </section>

        {/* News Section */}
        <section ref={sectionRefs.news} id="news" className="scroll-mt-32">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">News & Events</h2>
            <p className="text-muted-foreground">Latest news, events, and market updates</p>
          </div>
          <NewsTimeline />
        </section>

        {/* Share Research & Community - Last Component */}
        <div className="pt-6 border-t">
          <ResearchSharing />
        </div>

      </div>
    </div>
  );
};

export default StockSections;
