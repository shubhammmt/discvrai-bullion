
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Index from '@/pages/Index';
import Feed from '@/pages/Feed';
import Research from '@/pages/Research';
import StockResearch from '@/pages/StockResearch';
import MutualFundResearch from '@/pages/MutualFundResearch';
import InsuranceResearch from '@/pages/InsuranceResearch';
import CreditResearch from '@/pages/CreditResearch';
import CreditCardResearch from '@/pages/CreditCardResearch';
import IPOResearch from '@/pages/IPOResearch';
import SmallcaseResearch from '@/pages/SmallcaseResearch';
import Portfolio from '@/pages/Portfolio';
import PortfolioUpdate from '@/pages/PortfolioUpdate';
import Dashboard from '@/pages/Dashboard';
import Onboarding from '@/pages/Onboarding';
import Organize from '@/pages/Organize';
import AIStrategy from '@/pages/AIStrategy';
import FinancialCopilot from '@/pages/FinancialCopilot';
import IndiaMarketCopilot from '@/pages/IndiaMarketCopilot';
import USMarketHome from '@/pages/USMarketHome';
import AIConversationDemo from '@/pages/AIConversationDemo';
import PitchPresentation from '@/pages/PitchPresentation';
import PitchV1 from '@/pages/PitchV1';
import HealthAssessment from '@/pages/HealthAssessment';
import HealthResults from '@/pages/HealthResults';
import HealthDashboard from '@/pages/HealthDashboard';
import NotFound from '@/pages/NotFound';
import { SubscriptionProvider } from '@/contexts/SubscriptionContext';
import { Toaster } from '@/components/ui/sonner';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SubscriptionProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/research" element={<Research />} />
            <Route path="/research/stock/:symbol" element={<StockResearch />} />
            <Route path="/research/mutual-fund/:fundId" element={<MutualFundResearch />} />
            <Route path="/research/insurance/:productId" element={<InsuranceResearch />} />
            <Route path="/research/credit/:productId" element={<CreditResearch />} />
            <Route path="/research/credit-card/:cardId" element={<CreditCardResearch />} />
            <Route path="/research/ipo/:ipoId" element={<IPOResearch />} />
            <Route path="/research/smallcase/:smallcaseId" element={<SmallcaseResearch />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/update" element={<PortfolioUpdate />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/organize" element={<Organize />} />
            <Route path="/ai-strategy" element={<AIStrategy />} />
            <Route path="/financial-copilot" element={<FinancialCopilot />} />
            <Route path="/india-market" element={<IndiaMarketCopilot />} />
            <Route path="/us-market" element={<USMarketHome />} />
            <Route path="/ai-conversation" element={<AIConversationDemo />} />
            <Route path="/pitch" element={<PitchPresentation />} />
            <Route path="/pitch-v1" element={<PitchV1 />} />
            <Route path="/health-assessment" element={<HealthAssessment />} />
            <Route path="/health-results" element={<HealthResults />} />
            <Route path="/health-dashboard" element={<HealthDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </SubscriptionProvider>
    </QueryClientProvider>
  );
}

export default App;
