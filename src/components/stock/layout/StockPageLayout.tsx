import React, { useState } from 'react';
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
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <InvestmentChecklist />
            <InteractivePriceChart symbol={symbol} />
            <CompanyOverviewCards />
            <HistoricalGrowthMetrics />
            <KeyMetricsTable />
            <ResearchSharing />
          </div>
        );
      case 'technicals':
        return <TechnicalDashboard />;
      case 'forecast':
        return <AnalystConsensus />;
      case 'peers':
        return <PeerComparisonTable />;
      case 'financials':
        return <FinancialStatementsView />;
      case 'shareholdings':
        return <ShareholdingAnalysis />;
      case 'projection':
        return <ProjectionSection />;
      case 'news':
        return <NewsTimeline />;
      default:
        return (
          <div className="space-y-6">
            <InvestmentChecklist />
            <InteractivePriceChart symbol={symbol} />
            <CompanyOverviewCards />
            <HistoricalGrowthMetrics />
            <KeyMetricsTable />
            <ResearchSharing />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Stock Price Header */}
      <StockHeader stockData={stockData} />
      
      {/* Tab Navigation */}
      <StockTabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 lg:px-6">
        <div className="animate-fade-in">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default StockPageLayout;