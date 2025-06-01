
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MobileBottomNav from "./components/MobileBottomNav";
import Index from "./pages/Index";
import Onboarding from "./pages/Onboarding";
import Feed from "./pages/Feed";
import Research from "./pages/Research";
import StockResearch from "./pages/StockResearch";
import MutualFundResearch from "./pages/MutualFundResearch";
import IPOResearch from "./pages/IPOResearch";
import Organize from "./pages/Organize";
import Portfolio from "./pages/Portfolio";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="pb-16 md:pb-0">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/research" element={<Research />} />
              <Route path="/research/stock/:symbol" element={<StockResearch />} />
              <Route path="/research/mutual-fund/:fundId" element={<MutualFundResearch />} />
              <Route path="/research/ipo/:symbol" element={<IPOResearch />} />
              <Route path="/organize" element={<Organize />} />
              <Route path="/portfolio" element={<Portfolio />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <MobileBottomNav />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
