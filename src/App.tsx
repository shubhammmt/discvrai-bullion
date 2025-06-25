import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Onboarding from '@/pages/Onboarding';
import HealthAssessment from '@/pages/HealthAssessment';
import HealthResults from '@/pages/HealthResults';
import HealthDashboard from '@/pages/HealthDashboard';
import Feed from '@/pages/Feed';
import Portfolio from '@/pages/Portfolio';
import PortfolioUpdate from '@/pages/PortfolioUpdate';
import PortfolioAnalysis from '@/pages/PortfolioAnalysis';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/health-assessment" element={<HealthAssessment />} />
        <Route path="/health-results" element={<HealthResults />} />
        <Route path="/health-dashboard" element={<HealthDashboard />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/update" element={<PortfolioUpdate />} />
        <Route path="/portfolio/analysis" element={<PortfolioAnalysis />} />
      </Routes>
    </Router>
  );
}

export default App;
