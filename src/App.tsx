import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner";
import Index from './pages/Index';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Feed from './pages/Feed';
import FeedV2 from './pages/FeedV2';
import FeedV3 from './pages/FeedV3';
import Research from './pages/Research';
import StockResearch from './pages/StockResearch';
import StockProductPage from './pages/StockProductPage';
import StockProductPageV2 from './pages/StockProductPageV2';
import StockInfoPage from './pages/StockInfoPage';
import MutualFundResearch from './pages/MutualFundResearch';
import IPOResearch from './pages/IPOResearch';
import CreditResearch from './pages/CreditResearch';
import CreditCardResearch from './pages/CreditCardResearch';
import InsuranceResearch from './pages/InsuranceResearch';
import SmallcaseResearch from './pages/SmallcaseResearch';
import MutualFundDetails from './pages/MutualFundDetails';
import MutualFundFeed from './pages/MutualFundFeed';
import Portfolio from './pages/Portfolio';
import PortfolioHome from './pages/PortfolioHome';
import PortfolioGoals from './pages/PortfolioGoals';
import MutualFundsLanding from './pages/MutualFundsLanding';
import MutualFundsPortfolio from './pages/MutualFundsPortfolio';
import PortfolioAnalysis from './pages/PortfolioAnalysis';
import PortfolioUpdate from './pages/PortfolioUpdate';
import Organize from './pages/Organize';
import Market from './pages/Market';
import StockMarketPage from './pages/StockMarketPage';
import NewsFeed from './pages/NewsFeed';
import FinancialProfile from './pages/FinancialProfile';
import Onboarding from './pages/Onboarding';
import HealthAssessment from './pages/HealthAssessment';
import HealthResults from './pages/HealthResults';
import HealthDashboard from './pages/HealthDashboard';
import FinancialScore from './pages/FinancialScore';
import FinancialCopilot from './pages/FinancialCopilot';
import AIConversationDemo from './pages/AIConversationDemo';
import AIStrategy from './pages/AIStrategy';
import USMarketHome from './pages/USMarketHome';
import USMarketBot from './pages/USMarketBot';
import IndiaMarketCopilot from './pages/IndiaMarketCopilot';
import StocksHome from './pages/StocksHome';
import PitchPresentation from './pages/PitchPresentation';
import PitchV1 from './pages/PitchV1';
import PitchV2 from './pages/PitchV2';
import DiscvrContentDeck from './pages/DiscvrContentDeck';
import PitchV3 from './pages/PitchV3';
import PitchV4 from './pages/PitchV4';
import StockPage from './pages/StockPage';
import LogoConcepts from './pages/LogoConcepts';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import DataDeletionPolicy from './pages/DataDeletionPolicy';
import NotFound from './pages/NotFound';
import CMSPitchDeck from './pages/CMSPitchDeck';
import CMSEvidenceDeck from './pages/CMSEvidenceDeck';
import MahindraArmoredDeck from './pages/MahindraArmoredDeck';
import MahindraArmoredSignalsDemo from './pages/MahindraArmoredSignalsDemo';
import MSMELendingCommandCenter from './pages/MSMELendingCommandCenter';
import CVMCommandCenter from './pages/CVMCommandCenter';
import AwnicCommandCenter from './pages/AwnicCommandCenter';
import VedantaDecisionHub from './pages/VedantaDecisionHub';
import GreenkoCommandCenter from './pages/GreenkoCommandCenter';
import HavellsDecisionStudio from './pages/HavellsDecisionStudio';
import DPWorldOrchestration from './pages/DPWorldOrchestration';
import SupplyChainPitch from './pages/SupplyChainPitch';
import SupplyChainDemo from './pages/SupplyChainDemo';
import HavellsSalesOpsPitch from './pages/HavellsSalesOpsPitch';
import HavellsChannelStudio from './pages/HavellsChannelStudio';
import JubilantEnproCommandCenter from './pages/JubilantEnproCommandCenter';
import JubilantEnproPitch from './pages/JubilantEnproPitch';
import DiscvrAILayout from './pages/discvrai/DiscvrAILayout';
import DiscvrHome from './pages/discvrai/DiscvrHome';
import DiscvrFeatures from './pages/discvrai/DiscvrFeatures';
import DiscvrModules from './pages/discvrai/DiscvrModules';
import DiscvrSecurity from './pages/discvrai/DiscvrSecurity';
import DiscvrPricing from './pages/discvrai/DiscvrPricing';
import DiscvrAbout from './pages/discvrai/DiscvrAbout';
import DiscvrContact from './pages/discvrai/DiscvrContact';
import DiscvrCopilot from './pages/discvrai/DiscvrCopilot';
import DiscvrAISite from './pages/DiscvrAISite';
import CMSGuardian from './pages/CMSGuardian';
import CMSTransformation from './pages/CMSTransformation';
import CMSAuditCommandCenter from './pages/CMSAuditCommandCenter';
import AdfCeoSalesDashboard from './pages/AdfCeoSalesDashboard';
import NewsHub from './pages/NewsHub';
import EngineerShowcase from './pages/EngineerShowcase';
import SRCCPitch from './pages/SRCCPitch';
import StartupCoveragePitch from './pages/StartupCoveragePitch';
import ContestSponsorshipPitch from './pages/ContestSponsorshipPitch';
import NewsFirstPitch from './pages/NewsFirstPitch';
import FamilyFriendsPitch from './pages/FamilyFriendsPitch';
import FamilyFriendsOnePager from './pages/FamilyFriendsOnePager';
import PreSeedOnePager from './pages/PreSeedOnePager';
import InvestorOnePager from './pages/InvestorOnePager';
import AIFintechOnePager from './pages/AIFintechOnePager';
import B2BPreIPOPitch from './pages/B2BPreIPOPitch';
import AMCPitch from './pages/AMCPitch';
import AMCEnterprisePitch from './pages/AMCEnterprisePitch';
import EnterprisePitch from './pages/EnterprisePitch';
import EnterpriseDeckLite from './pages/EnterpriseDeckLite';
import ExpoPitch from './pages/ExpoPitch';
import PartnerDistribution from './pages/PartnerDistribution';
import { B2BCapabilities } from './pages/B2BCapabilities';
import InvestorDeck from './pages/InvestorDeck';
import InvestorDeckFull from './pages/InvestorDeckFull';
import Chatbot from './pages/Chatbot';
import CryptoHub from './pages/CryptoHub';
import CryptoAsset from './pages/CryptoAsset';
import MetalsHub from './pages/MetalsHub';
import GoldPrices from './pages/GoldPrices';
import GoldPricesCity from './pages/GoldPricesCity';
import SilverPrices from './pages/SilverPrices';
import PlatinumPrices from './pages/PlatinumPrices';
import WeatherHub from './pages/WeatherHub';
import AIStockScreener from './pages/AIStockScreener';
import EmbedScreener from './pages/EmbedScreener';
import EmbedDocs from './pages/EmbedDocs';
import AIScreenerLanding from './pages/AIScreenerLanding';
import AIQueryLibrary from './pages/AIQueryLibrary';
import AIQueryResult from './pages/AIQueryResult';
import ChatbotDialog, { ChatbotTrigger } from './components/ChatbotDialog';
import GlobalFooter from './components/GlobalFooter';
import { NewsHubPage } from './pages/NewsHubPage';
import { NewsArticlePage } from './pages/NewsArticlePage';
import { NewsAuthorPage } from './pages/NewsAuthorPage';
import { PollsHub } from './pages/PollsHub';
import { QuizzesHub } from './pages/QuizzesHub';
import { Leaderboard } from './pages/Leaderboard';
import ProductFeaturePreview from './pages/ProductFeaturePreview';
import DistributionCaseStudy from './pages/DistributionCaseStudy';
import BullionInvestment from './pages/BullionInvestment';
import DiscvrHomepage from './pages/DiscvrHomepage';
import BullionProfile from './pages/BullionProfile';
import BullionPortfolio from './pages/BullionPortfolio';
import BullionNews from './pages/BullionNews';
import BullionGames from './pages/BullionGames';
 import BullionContestDetail from './pages/BullionContestDetail';
import BullionGoals from './pages/BullionGoals';
import BullionGoalNew from './pages/BullionGoalNew';
import BullionPremium from './pages/BullionPremium';
import BullionArticlePage from './pages/BullionArticlePage';
import BullionLearn from './pages/BullionLearn';
import BullionTax from './pages/BullionTax';
import BullionTrends from './pages/BullionTrends';
import BullionCalculators from './pages/BullionCalculators';
import BullionLoans from './pages/BullionLoans';
import BullionNotifications from './pages/BullionNotifications';
import BullionNotificationsPRD from './pages/BullionNotificationsPRD';
import BullionCalculatorsPRD from './pages/BullionCalculatorsPRD';
import BullionLaunchOffers from './pages/BullionLaunchOffers';
import BullionDesignSystem from './pages/BullionDesignSystem';
import KYCFailurePage from './pages/bullion/KYCFailurePage';
import OrderFailurePage from './pages/bullion/OrderFailurePage';
import NirmalBangProposal from './pages/NirmalBangProposal';
import NirmalBangLeadDeck from './pages/NirmalBangLeadDeck';
import JindalProposal from './pages/JindalProposal';
import MasterTrustProposal from './pages/MasterTrustProposal';
import YatharthPitch from './pages/YatharthPitch';
import XaltProposal from './pages/XaltProposal';
import ManufacturingPitch from './pages/ManufacturingPitch';
import ManufacturingPitchNew from './pages/ManufacturingPitchNew';
import AptechProposal from './pages/AptechProposal';
import AptechPostSales from './pages/AptechPostSales';
import REAProposal from './pages/REAProposal';
import AptechCounsellor from './pages/AptechCounsellor';
import AptechNurtureDemo from './pages/AptechNurtureDemo';
import AptechPostSalesDemo from './pages/AptechPostSalesDemo';
import DeepDiveProposal from './pages/DeepDiveProposal';
import ParisRegionPitch from './pages/ParisRegionPitch';
import CMSDemo from './pages/CMSDemo';
import CMSDynamicDemo from './pages/CMSDynamicDemo';
import AptechExecutionPlan from './pages/AptechExecutionPlan';
import AdfMisDashboard from './pages/AdfMisDashboard';
import EnterpriseBrochure from './pages/EnterpriseBrochure';
import DeepIndustriesProposal from './pages/DeepIndustriesProposal';
import NbfcProposal from './pages/NbfcProposal';
import AdfStrategicDashboard from './pages/AdfStrategicDashboard';
import NbfcNbaDemo from './pages/NbfcNbaDemo';
import NbfcCollectionsDemo from './pages/NbfcCollectionsDemo';
import NbfcKycDemo from './pages/NbfcKycDemo';
import NbfcAltCreditDemo from './pages/NbfcAltCreditDemo';
import SIPManagement from './pages/SIPManagement';
import PlantOpsLayout from './pages/plantops/PlantOpsLayout';
import PlantOpsDashboard from './pages/plantops/PlantOpsDashboard';
import ManpowerEntryPage from './pages/plantops/ManpowerEntry';
import WastageEntryPage from './pages/plantops/WastageEntry';
import ExcelUploadPage from './pages/plantops/ExcelUpload';
import MasterDataPage from './pages/plantops/MasterData';
import MonthlyReportsPage from './pages/plantops/MonthlyReports';
import AlertsAndDigests from './pages/AlertsAndDigests';
import Rebalancing from './pages/Rebalancing';
import ConversionMetrics from './pages/ConversionMetrics';
import MFAnalyticsDashboard from './pages/MFAnalyticsDashboard';
import AIAICProposal from './pages/AIAICProposal';
import TredsFinopsDemo from './pages/TredsFinopsDemo';
import CMSDataLake from './pages/CMSDataLake';
import CMSReconCenter from './pages/CMSReconCenter';
import RajaRailwaysDeck from './pages/RajaRailwaysDeck';
import RajaRailwaysDemo from './pages/RajaRailwaysDemo';
import AmitM1xchangeDeck from './pages/AmitM1xchangeDeck';
import EmamiRealtyDeck from './pages/EmamiRealtyDeck';
import AdaniGreensLogistics from './pages/AdaniGreensLogistics';
import AdaniGreensPitch from './pages/AdaniGreensPitch';
import BajajElectricalsDashboard from './pages/BajajElectricalsDashboard';
import WorkspaceDemo from './pages/WorkspaceDemo';
import DiageoPitch from './pages/DiageoPitch';
import EcubePitch from './pages/EcubePitch';
import HelpDeskDI from './pages/HelpDeskDI';
import PitchDeckDI from './pages/PitchDeckDI';
import DSRPage from './pages/DSRPage';
import P2PRfqDeck from './pages/P2PRfqDeck';
import DamCapitalDeck from './pages/DamCapitalDeck';
import MISDashboard from './pages/MISDashboard';
import DiageoIndiaDeck from './pages/DiageoIndiaDeck';
import ChitaleBandhuDeck from './pages/ChitaleBandhuDeck';
import AdaniGroupDeck from './pages/AdaniGroupDeck';
import RelianceEPDeck from './pages/RelianceEPDeck';
import RelianceEPCommandCenter from './pages/RelianceEPCommandCenter';
import AsianEnergyDeck from './pages/AsianEnergyDeck';
import SchlumbergerDeck from './pages/SchlumbergerDeck';
import WalchandnagarDeck from './pages/WalchandnagarDeck';
import GenericEnterpriseDeck from './pages/GenericEnterpriseDeck';
import AdvisorPitch from './pages/AdvisorPitch';
import RAKSapPitch from './pages/RAKSapPitch';
import BajajFinservDeck from './pages/BajajFinservDeck';
import DiscvrPlatformDeck from './pages/DiscvrPlatformDeck';
import AdfCeoSales12MDashboard from './pages/AdfCeoSales12MDashboard';
import AdfDistributorDashboard from './pages/AdfDistributorDashboard';
import CMSAuditCommand from './pages/CMSAuditCommand';
import CMSOverageAlerts from './pages/CMSOverageAlerts';
import CMSVaultOps from './pages/CMSVaultOps';
import CMSIndentEngine from './pages/CMSIndentEngine';
import CMSAIRiskRadar from './pages/CMSAIRiskRadar';
import SchlumbergerOps from './pages/SchlumbergerOps';
import SBIHub from './pages/sbi/SBIHub';
import ICICIHub from './pages/icici/ICICIHub';
import ICICIDeck from './pages/icici/ICICIDeck';
import ICICICopilot from './pages/icici/ICICICopilot';
import ICICIPitchAssistant from './pages/icici/ICICIPitchAssistant';
import ICICIManager from './pages/icici/ICICIManager';
import ICICIAdmin from './pages/icici/ICICIAdmin';
import SBIDeck from './pages/sbi/SBIDeck';
import SBIAcquisition from './pages/sbi/SBIAcquisition';
import SBIPersonalization from './pages/sbi/SBIPersonalization';
import SBIFraud from './pages/sbi/SBIFraud';
import SBILifecycle from './pages/sbi/SBILifecycle';
import PetroleumLayout from './pages/petroleum/Layout';
import PetroleumExec from './pages/petroleum/Exec';
import PetroleumRetail from './pages/petroleum/Retail';
import PetroleumDispatch from './pages/petroleum/Dispatch';
import PetroleumLPG from './pages/petroleum/LPG';
import PetroleumLubricants from './pages/petroleum/Lubricants';
import PetroleumB2B from './pages/petroleum/B2B';
import PetroleumLeakage from './pages/petroleum/Leakage';
import PetroleumRhythm from './pages/petroleum/Rhythm';
import PetroleumCopilot from './pages/petroleum/Copilot';
import PetroleumWalkthrough from './pages/petroleum/Walkthrough';
import UPMetroHub from './pages/upmetro/UPMetroHub';
import UPMetroDeck from './pages/upmetro/UPMetroDeck';
import { UPMetroLayout } from './pages/upmetro/ui';
import UPMetroCommand from './pages/upmetro/UPMetroCommand';
import UPMetroAssetMap from './pages/upmetro/UPMetroAssetMap';
import UPMetroIncidents from './pages/upmetro/UPMetroIncidents';
import UPMetroAccess from './pages/upmetro/UPMetroAccess';
import UPMetroRecovery from './pages/upmetro/UPMetroRecovery';
import UPMetroCompliance from './pages/upmetro/UPMetroCompliance';
import RAKHub from './pages/rak/RAKHub';
import RAKDeck from './pages/rak/RAKDeck';
import { RAKLayout } from './pages/rak/ui';
import RAKCockpit from './pages/rak/RAKCockpit';
import RAKKiln from './pages/rak/RAKKiln';
import RAKCopilot from './pages/rak/RAKCopilot';
import RAKArchitecture from './pages/rak/RAKArchitecture';
import AWNICHub from './pages/awnic/AWNICHub';
import AWNICDeck from './pages/awnic/AWNICDeck';
import AWNICRenewalDeck from './pages/awnic/AWNICRenewalDeck';
import DeloitteSessionDeck from './pages/deloitte/DeloitteSessionDeck';
import { AWNICLayout } from './pages/awnic/ui';
import AWNICCockpit from './pages/awnic/AWNICCockpit';
import AWNICAcquisition from './pages/awnic/AWNICAcquisition';
import AWNICRecovery from './pages/awnic/AWNICRecovery';
import AWNICRetention from './pages/awnic/AWNICRetention';
import AWNICCrossSell from './pages/awnic/AWNICCrossSell';
import AWNICAgent from './pages/awnic/AWNICAgent';
import AWNICExperiment from './pages/awnic/AWNICExperiment';
import AWNICIntegration from './pages/awnic/AWNICIntegration';
import BajajCapitalHub from './pages/bajajcapital/BajajCapitalHub';
import BajajCapitalDeck from './pages/bajajcapital/BajajCapitalDeck';
import { BajajCapitalLayout } from './pages/bajajcapital/ui';
import BajajCapitalRMCockpit from './pages/bajajcapital/BajajCapitalRMCockpit';
import BajajCapitalOps from './pages/bajajcapital/BajajCapitalOps';
import BajajCapitalRetirement from './pages/bajajcapital/BajajCapitalRetirement';
import BajajCapitalArchitecture from './pages/bajajcapital/BajajCapitalArchitecture';
import JaiKhuranaHub from './pages/jaikhurana/JaiKhuranaHub';
import JaiKhuranaDeck from './pages/jaikhurana/JaiKhuranaDeck';
import { JaiKhuranaLayout } from './pages/jaikhurana/ui';
import JaiKhuranaExec from './pages/jaikhurana/JaiKhuranaExec';
import JaiKhuranaFreight from './pages/jaikhurana/JaiKhuranaFreight';
import JaiKhuranaLeakage from './pages/jaikhurana/JaiKhuranaLeakage';
import JaiKhuranaVendor from './pages/jaikhurana/JaiKhuranaVendor';
import JaiKhuranaRopeway from './pages/jaikhurana/JaiKhuranaRopeway';
import JaiKhuranaAssurance from './pages/jaikhurana/JaiKhuranaAssurance';
import OnePlantTriangulationDeck from './pages/OnePlantTriangulationDeck';
import OnePlantTriangulationProofDeck from './pages/OnePlantTriangulationProofDeck';
import { HelmetProvider } from 'react-helmet-async';

const queryClient = new QueryClient();

const AppContent = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const location = useLocation();
  
  // Hide footer and chatbot on pitch deck pages, one-pagers, investor deck, and proposals
  const isPitchPage = location.pathname.includes('-pitch') || 
                      location.pathname.includes('-1pager') || 
                      location.pathname.includes('/proposal/') ||
                      location.pathname === '/investor-deck' ||
                      location.pathname === '/investor-deck-full' ||
                      location.pathname === '/partner-distribution' ||
                      location.pathname === '/b2b-capabilities' ||
                       location.pathname === '/aptech-counsellor' ||
                       location.pathname === '/aptech-nurture-demo' ||
                       location.pathname === '/aptech-postsales-demo' ||
                       location.pathname === '/pitch/paris-region' ||
                       location.pathname === '/demo/cms' ||
                       location.pathname === '/demo/cms-dynamic' ||
                       location.pathname === '/proposal/aptech-execution' ||
                       location.pathname === '/dashboard/adf-mis' ||
                       location.pathname === '/brochure/enterprise' ||
                       location.pathname === '/proposal/deep-industries' ||
                       location.pathname === '/proposal/nbfc' ||
                       location.pathname === '/dashboard/adf-strategic' ||
                       location.pathname === '/demo/nbfc-nba' ||
                       location.pathname === '/demo/nbfc-collections' ||
                       location.pathname === '/demo/nbfc-kyc' ||
                       location.pathname === '/demo/nbfc-alt-credit' ||
                       location.pathname === '/dashboard/adf-ceo-sales' ||
                       location.pathname === '/dashboard/adf-ceo-sales-12m' ||
                       location.pathname === '/dashboard/adf-distributor' ||
                       location.pathname.startsWith('/embed/') ||
                       location.pathname === '/demo/treds-finops' ||
                       location.pathname === '/pitch/raja-railways' ||
                       location.pathname === '/demo/raja-railways' ||
                       location.pathname === '/pitch/amit-m1xchange' ||
                       location.pathname === '/pitch/emami-realty' ||
                       location.pathname === '/dashboard/adani-greens' ||
                       location.pathname === '/pitch/adani-greens' ||
                       location.pathname === '/dashboard/bajaj-electricals' ||
                       location.pathname === '/workspace-demo' ||
                       location.pathname === '/pitch/diageo' ||
                       location.pathname === '/pitch/ecube' ||
                       location.pathname === '/help-desk-DI' ||
                       location.pathname === '/Pitch-deck' ||
                       location.pathname === '/DSR' ||
                       location.pathname === '/p2p-rfq' ||
                       location.pathname === '/dam-capital-deck' ||
                       location.pathname === '/mis-dashboard' ||
                       location.pathname === '/pitch/diageo-india' ||
                        location.pathname === '/pitch/chitale-bandhu' ||
                        location.pathname === '/pitch/adani-group' ||
                  location.pathname === '/pitch/reliance-ep' ||
                  location.pathname === '/demo/reliance-ep' ||
                  location.pathname === '/pitch/asian-energy' ||
                        location.pathname === '/pitch/schlumberger' ||
                        location.pathname === '/pitch/walchandnagar' ||
                         location.pathname === '/pitch/enterprise' ||
                         location.pathname === '/pitch/enterprise/gov' ||
                         location.pathname === '/pitch/enterprise-lite' ||
                         location.pathname === '/pitch/bajaj-finserv' ||
                         location.pathname === '/pitch/discvrai-platform' ||
                          location.pathname === '/cms-data-lake' ||
                           location.pathname === '/cms-recon-center' ||
                            location.pathname === '/cms-audit-command' ||
                            location.pathname === '/cms-audit-2' ||
                            location.pathname === '/cms-audit' ||
                            location.pathname === '/cms-evidence-deck' ||
                            location.pathname === '/cms-overage-alerts' ||
                            location.pathname === '/cms-vault-ops' ||
                            location.pathname === '/cms-indent-engine' ||
                            location.pathname === '/cms-ai-risk-radar' ||
                            location.pathname === '/cms-transformation' ||
                           location.pathname === '/demo/schlumberger-ops' ||
                            location.pathname === '/demo/awnic' ||
                           location.pathname === '/vedanta-decision-hub' ||
                           location.pathname === '/greenko-command-center' ||
                           location.pathname === '/havells-decision-studio' ||
                           location.pathname === '/dpworld-orchestration' ||
                           location.pathname === '/supply-chain-demo' ||
                           location.pathname === '/havells-pitch' ||
                           location.pathname === '/havells-channel-studio' ||
                           location.pathname === '/jubilant-enpro' ||
                           location.pathname === '/jubilant-enpro-pitch' ||
                           location.pathname === '/alerts' ||
                           location.pathname === '/alerts/inbox' ||
                           location.pathname === '/rebalancing' ||
                           location.pathname === '/admin/conversion-metrics' ||
                           location.pathname === '/sbi-card' ||
                           location.pathname === '/pitch/sbi-card' ||
                           location.pathname.startsWith('/sbi-card/') ||
                           location.pathname === '/icici-lombard' ||
                           location.pathname === '/pitch/icici-lombard' ||
                           location.pathname.startsWith('/icici-lombard/') ||
                           location.pathname.startsWith('/petroleum') ||
                           location.pathname === '/upmetro' ||
                           location.pathname === '/pitch/upmetro' ||
                           location.pathname.startsWith('/upmetro/') ||
                           location.pathname === '/rak' ||
                           location.pathname === '/pitch/rak' ||
                           location.pathname.startsWith('/rak/') ||
                           location.pathname === '/awnic' ||
                           location.pathname === '/pitch/awnic' ||
                           location.pathname === '/pitch/awnic-renewal' ||
                           location.pathname.startsWith('/awnic/') ||
                           location.pathname === '/bajajcapital' ||
                           location.pathname === '/pitch/bajajcapital' ||
                           location.pathname.startsWith('/bajajcapital/') ||
                           location.pathname === '/jaikhurana' ||
                           location.pathname === '/pitch/jaikhurana' ||
                           location.pathname.startsWith('/jaikhurana/') ||
                           location.pathname.startsWith('/discvrai') ||
                           location.pathname === '/pitch/discvr-content' ||
                           location.pathname === '/pitch/deloitte' ||
                           location.pathname === '/discvrai-site';
  return (
    <>
      <Routes>
        <Route path="/" element={<SIPManagement />} />
        <Route path="/plant-ops" element={<PlantOpsLayout />}>
          <Route index element={<PlantOpsDashboard />} />
          <Route path="manpower" element={<ManpowerEntryPage />} />
          <Route path="wastage" element={<WastageEntryPage />} />
          <Route path="upload" element={<ExcelUploadPage />} />
          <Route path="master" element={<MasterDataPage />} />
          <Route path="reports" element={<MonthlyReportsPage />} />
        </Route>
        <Route path="/welcome" element={<Index />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/feed-v2" element={<FeedV2 />} />
          <Route path="/feed-v3" element={<FeedV3 />} />
          <Route path="/research" element={<Research />} />
          <Route path="/research/stock/:symbol" element={<StockResearch />} />
          <Route path="/research/mutual-fund/:symbol" element={<MutualFundResearch />} />
          <Route path="/research/ipo/:symbol" element={<IPOResearch />} />
          <Route path="/research/credit/:type" element={<CreditResearch />} />
          <Route path="/research/credit-card/:cardId" element={<CreditCardResearch />} />
          <Route path="/research/insurance/:type" element={<InsuranceResearch />} />
          <Route path="/research/smallcase/:caseId" element={<SmallcaseResearch />} />
          <Route path="/mutual-fund/:symbol" element={<MutualFundDetails />} />
          <Route path="/mutual-fund-feed" element={<MutualFundFeed />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio-home" element={<PortfolioHome />} />
          <Route path="/portfolio/goals" element={<PortfolioGoals />} />
          <Route path="/mutual-funds" element={<MutualFundsLanding />} />
          <Route path="/mutual-funds-portfolio" element={<MutualFundsPortfolio />} />
          <Route path="/portfolio-analysis" element={<PortfolioAnalysis />} />
          <Route path="/portfolio-update" element={<PortfolioUpdate />} />
          <Route path="/organize" element={<Organize />} />
          <Route path="/market" element={<Market />} />
          <Route path="/stock-market" element={<StockMarketPage />} />
          <Route path="/stock/:symbol" element={<StockProductPage />} />
          <Route path="/stock-v2/:symbol" element={<StockProductPageV2 />} />
          <Route path="/stock-v3/:symbol" element={<StockPage />} />
          <Route path="/stock-info/:symbol" element={<StockInfoPage />} />
          <Route path="/news" element={<NewsHubPage />} />
          <Route path="/news/article/:slug" element={<NewsArticlePage />} />
          <Route path="/news/author/:authorId" element={<NewsAuthorPage />} />
          <Route path="/polls" element={<PollsHub />} />
          <Route path="/quizzes" element={<QuizzesHub />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/news-old" element={<NewsFeed />} />
          <Route path="/financial-profile" element={<FinancialProfile />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/health-assessment" element={<HealthAssessment />} />
          <Route path="/health-results" element={<HealthResults />} />
          <Route path="/health-dashboard" element={<HealthDashboard />} />
          <Route path="/financial-score" element={<FinancialScore />} />
          <Route path="/financial-copilot" element={<FinancialCopilot />} />
          <Route path="/ai-conversation" element={<AIConversationDemo />} />
          <Route path="/ai-strategy" element={<AIStrategy />} />
          <Route path="/us-market" element={<USMarketHome />} />
          <Route path="/us-market-bot" element={<USMarketBot />} />
          <Route path="/india-market-copilot" element={<IndiaMarketCopilot />} />
          <Route path="/stocks" element={<StocksHome />} />
          <Route path="/pitch" element={<PitchPresentation />} />
          <Route path="/pitch-v1" element={<PitchV1 />} />
          <Route path="/pitch-v2" element={<PitchV2 />} />
          <Route path="/pitch-v3" element={<PitchV3 />} />
          <Route path="/pitch-v4" element={<PitchV4 />} />
          <Route path="/logo-concepts" element={<LogoConcepts />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/data-deletion-policy" element={<DataDeletionPolicy />} />
          <Route path="/news-hub" element={<NewsHub />} />
          <Route path="/engineer-showcase" element={<EngineerShowcase />} />
          <Route path="/srcc-pitch" element={<SRCCPitch />} />
          <Route path="/startup-coverage-pitch" element={<StartupCoveragePitch />} />
          <Route path="/contest-sponsorship-pitch" element={<ContestSponsorshipPitch />} />
          <Route path="/news-first-pitch" element={<NewsFirstPitch />} />
          <Route path="/family-friends-pitch" element={<FamilyFriendsPitch />} />
          <Route path="/family-friends-1pager" element={<FamilyFriendsOnePager />} />
          <Route path="/preseed-1pager" element={<PreSeedOnePager />} />
          <Route path="/investor-1pager" element={<InvestorOnePager />} />
          <Route path="/ai-fintech-1pager" element={<AIFintechOnePager />} />
          <Route path="/b2b-preipo-pitch" element={<B2BPreIPOPitch />} />
          <Route path="/amc-pitch" element={<AMCPitch />} />
          <Route path="/amc-enterprise-pitch" element={<AMCEnterprisePitch />} />
          <Route path="/enterprise-pitch" element={<EnterprisePitch />} />
          <Route path="/expo-pitch" element={<ExpoPitch />} />
          <Route path="/partner-distribution" element={<PartnerDistribution />} />
          <Route path="/b2b-capabilities" element={<B2BCapabilities />} />
          <Route path="/investor-deck" element={<InvestorDeck />} />
          <Route path="/investor-deck-full" element={<InvestorDeckFull />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/crypto" element={<CryptoHub />} />
          <Route path="/crypto/:symbol" element={<CryptoAsset />} />
        <Route path="/metals" element={<MetalsHub />} />
        <Route path="/discvr" element={<DiscvrHomepage />} />
        <Route path="/discvrai-site" element={<DiscvrAISite />} />
        <Route path="/bullion" element={<BullionInvestment />} />
        <Route path="/bullion/trade" element={<BullionInvestment />} />
        <Route path="/bullion/profile" element={<BullionProfile />} />
        <Route path="/bullion/portfolio" element={<BullionPortfolio />} />
        <Route path="/bullion/news" element={<BullionNews />} />
        <Route path="/bullion/games" element={<BullionGames />} />
         <Route path="/bullion/contests/:id" element={<BullionContestDetail />} />
        <Route path="/bullion/goals" element={<BullionGoals />} />
        <Route path="/bullion/goals/new" element={<BullionGoalNew />} />
        <Route path="/bullion/loans" element={<BullionLoans />} />
        <Route path="/bullion/premium" element={<BullionPremium />} />
        <Route path="/bullion/premium/article/:slug" element={<BullionArticlePage />} />
        <Route path="/bullion/learn" element={<BullionPremium />} />
        <Route path="/bullion/tax" element={<BullionTax />} />
        <Route path="/bullion/kyc-failure" element={<KYCFailurePage />} />
        <Route path="/bullion/order-failure" element={<OrderFailurePage />} />
        <Route path="/bullion/trends" element={<BullionTrends />} />
        <Route path="/bullion/calculators" element={<BullionCalculators />} />
        <Route path="/bullion/calculators/prd" element={<BullionCalculatorsPRD />} />
        <Route path="/bullion/notifications" element={<BullionNotifications />} />
        <Route path="/bullion/notifications/prd" element={<BullionNotificationsPRD />} />
        <Route path="/bullion/launch-offers" element={<BullionLaunchOffers />} />
        <Route path="/bullion/design-system" element={<BullionDesignSystem />} />
        <Route path="/metals/gold" element={<GoldPrices />} />
        <Route path="/metals/gold/:city" element={<GoldPricesCity />} />
        <Route path="/metals/silver" element={<SilverPrices />} />
        <Route path="/metals/platinum" element={<PlatinumPrices />} />
          <Route path="/weather" element={<WeatherHub />} />
          <Route path="/ai" element={<AIScreenerLanding />} />
          <Route path="/ai/chat" element={<AIStockScreener />} />
          <Route path="/ai/queries" element={<AIQueryLibrary />} />
          <Route path="/ai/queries/:queryId" element={<AIQueryResult />} />
          <Route path="/product-features-preview" element={<ProductFeaturePreview />} />
          <Route path="/distribution-case-study" element={<DistributionCaseStudy />} />
          <Route path="/proposal/nirmalbang" element={<NirmalBangProposal />} />
          <Route path="/proposal/nirmalbang-leads" element={<NirmalBangLeadDeck />} />
          <Route path="/proposal/jindal" element={<JindalProposal />} />
          <Route path="/proposal/mastertrust" element={<MasterTrustProposal />} />
          <Route path="/proposal/yatharth" element={<YatharthPitch />} />
          <Route path="/proposal/xalt" element={<XaltProposal />} />
          <Route path="/manufacturing-pitch" element={<ManufacturingPitch />} />
          <Route path="/manufacturing-pitch-new" element={<ManufacturingPitchNew />} />
          <Route path="/proposal/aptech" element={<AptechProposal />} />
          <Route path="/proposal/aptech-postsales" element={<AptechPostSales />} />
          <Route path="/proposal/rea" element={<REAProposal />} />
          <Route path="/proposal/deep-dive" element={<DeepDiveProposal />} />
          <Route path="/aptech-counsellor" element={<AptechCounsellor />} />
          <Route path="/aptech-nurture-demo" element={<AptechNurtureDemo />} />
          <Route path="/aptech-postsales-demo" element={<AptechPostSalesDemo />} />
          <Route path="/pitch/paris-region" element={<ParisRegionPitch />} />
          <Route path="/demo/cms" element={<CMSDemo />} />
          <Route path="/demo/cms-dynamic" element={<CMSDynamicDemo />} />
          <Route path="/proposal/aptech-execution" element={<AptechExecutionPlan />} />
          <Route path="/dashboard/adf-mis" element={<AdfMisDashboard />} />
           <Route path="/brochure/enterprise" element={<EnterpriseBrochure />} />
           <Route path="/proposal/deep-industries" element={<DeepIndustriesProposal />} />
           <Route path="/proposal/nbfc" element={<NbfcProposal />} />
           <Route path="/dashboard/adf-strategic" element={<AdfStrategicDashboard />} />
           <Route path="/demo/nbfc-nba" element={<NbfcNbaDemo />} />
           <Route path="/demo/nbfc-collections" element={<NbfcCollectionsDemo />} />
           <Route path="/demo/nbfc-kyc" element={<NbfcKycDemo />} />
            <Route path="/demo/nbfc-alt-credit" element={<NbfcAltCreditDemo />} />
            <Route path="/dashboard/adf-ceo-sales" element={<AdfCeoSalesDashboard />} />
            <Route path="/dashboard/adf-ceo-sales-12m" element={<AdfCeoSales12MDashboard />} />
            <Route path="/dashboard/adf-distributor" element={<AdfDistributorDashboard />} />
             <Route path="/sip-management" element={<SIPManagement />} />
             <Route path="/dashboard/mf-analytics" element={<MFAnalyticsDashboard />} />
             <Route path="/proposal/aiaic" element={<AIAICProposal />} />
           <Route path="/embed/screener" element={<EmbedScreener />} />
            <Route path="/embed/docs" element={<EmbedDocs />} />
            <Route path="/demo/treds-finops" element={<TredsFinopsDemo />} />
            <Route path="/pitch/raja-railways" element={<RajaRailwaysDeck />} />
            <Route path="/demo/raja-railways" element={<RajaRailwaysDemo />} />
            <Route path="/pitch/amit-m1xchange" element={<AmitM1xchangeDeck />} />
             <Route path="/pitch/emami-realty" element={<EmamiRealtyDeck />} />
              <Route path="/dashboard/adani-greens" element={<AdaniGreensLogistics />} />
              <Route path="/pitch/adani-greens" element={<AdaniGreensPitch />} />
               <Route path="/dashboard/bajaj-electricals" element={<BajajElectricalsDashboard />} />
                <Route path="/workspace-demo" element={<WorkspaceDemo />} />
                <Route path="/pitch/diageo" element={<DiageoPitch />} />
                <Route path="/pitch/ecube" element={<EcubePitch />} />
                <Route path="/help-desk-DI" element={<HelpDeskDI />} />
                <Route path="/Pitch-deck" element={<PitchDeckDI />} />
                <Route path="/DSR" element={<DSRPage />} />
                 <Route path="/p2p-rfq" element={<P2PRfqDeck />} />
                 <Route path="/dam-capital-deck" element={<DamCapitalDeck />} />
                 <Route path="/mis-dashboard" element={<MISDashboard />} />
                 <Route path="/pitch/diageo-india" element={<DiageoIndiaDeck />} />
                  <Route path="/pitch/chitale-bandhu" element={<ChitaleBandhuDeck />} />
                  <Route path="/pitch/adani-group" element={<AdaniGroupDeck />} />
                   <Route path="/pitch/reliance-ep" element={<RelianceEPDeck />} />
                   <Route path="/demo/reliance-ep" element={<RelianceEPCommandCenter />} />
                  <Route path="/pitch/asian-energy" element={<AsianEnergyDeck />} />
                  <Route path="/pitch/schlumberger" element={<SchlumbergerDeck />} />
                  <Route path="/pitch/walchandnagar" element={<WalchandnagarDeck />} />
                  <Route path="/pitch/enterprise" element={<GenericEnterpriseDeck />} />
                  <Route path="/pitch/advisor" element={<AdvisorPitch />} />
                  <Route path="/pitch/rak-sap" element={<RAKSapPitch />} />
                   <Route path="/pitch/enterprise-lite" element={<EnterpriseDeckLite />} />
                   <Route path="/pitch/bajaj-finserv" element={<BajajFinservDeck />} />
                   <Route path="/pitch/discvrai-platform" element={<DiscvrPlatformDeck />} />
                    <Route path="/cms-data-lake" element={<CMSDataLake />} />
                    <Route path="/cms-recon-center" element={<CMSReconCenter />} />
                    <Route path="/cms-audit-command" element={<CMSAuditCommand />} />
                    <Route path="/cms-overage-alerts" element={<CMSOverageAlerts />} />
                    <Route path="/cms-vault-ops" element={<CMSVaultOps />} />
                    <Route path="/cms-indent-engine" element={<CMSIndentEngine />} />
                    <Route path="/cms-ai-risk-radar" element={<CMSAIRiskRadar />} />
                    <Route path="/cms-audit-2" element={<CMSGuardian />} />
                    <Route path="/cms-audit" element={<CMSAuditCommandCenter />} />
                    <Route path="/demo/schlumberger-ops" element={<SchlumbergerOps />} />
                    <Route path="/CMS-pitch-deck" element={<CMSPitchDeck />} />
                     <Route path="/cms-evidence-deck" element={<CMSEvidenceDeck />} />
                     <Route path="/cms-transformation" element={<CMSTransformation />} />
                    <Route path="/sbi-card" element={<SBIHub />} />
                    <Route path="/pitch/sbi-card" element={<SBIDeck />} />
                    <Route path="/sbi-card/acquisition" element={<SBIAcquisition />} />
                    <Route path="/sbi-card/personalization" element={<SBIPersonalization />} />
                    <Route path="/sbi-card/fraud" element={<SBIFraud />} />
                    <Route path="/sbi-card/lifecycle" element={<SBILifecycle />} />
                    <Route path="/icici-lombard" element={<ICICIHub />} />
                    <Route path="/pitch/icici-lombard" element={<ICICIDeck />} />
                    <Route path="/icici-lombard/copilot" element={<ICICICopilot />} />
                    <Route path="/icici-lombard/pitch-assistant" element={<ICICIPitchAssistant />} />
                    <Route path="/icici-lombard/manager" element={<ICICIManager />} />
                    <Route path="/icici-lombard/admin" element={<ICICIAdmin />} />
                    <Route path="/petroleum" element={<PetroleumLayout />}>
                      <Route index element={<PetroleumExec />} />
                      <Route path="retail" element={<PetroleumRetail />} />
                      <Route path="dispatch" element={<PetroleumDispatch />} />
                      <Route path="lpg" element={<PetroleumLPG />} />
                      <Route path="lubricants" element={<PetroleumLubricants />} />
                      <Route path="b2b" element={<PetroleumB2B />} />
                      <Route path="leakage" element={<PetroleumLeakage />} />
                      <Route path="rhythm" element={<PetroleumRhythm />} />
                      <Route path="copilot" element={<PetroleumCopilot />} />
                      <Route path="walkthrough" element={<PetroleumWalkthrough />} />
                    </Route>
                    <Route path="/awnic" element={<AWNICHub />} />
                    <Route path="/pitch/awnic" element={<AWNICDeck />} />
                    <Route path="/pitch/awnic-renewal" element={<AWNICRenewalDeck />} />
                    <Route path="/pitch/deloitte" element={<DeloitteSessionDeck />} />
                    <Route path="/awnic" element={<AWNICLayout />}>
                      <Route path="cockpit" element={<AWNICCockpit />} />
                      <Route path="acquisition" element={<AWNICAcquisition />} />
                      <Route path="recovery" element={<AWNICRecovery />} />
                      <Route path="retention" element={<AWNICRetention />} />
                      <Route path="crosssell" element={<AWNICCrossSell />} />
                      <Route path="agent" element={<AWNICAgent />} />
                      <Route path="experiment" element={<AWNICExperiment />} />
                      <Route path="integration" element={<AWNICIntegration />} />
                    </Route>
                    <Route path="/upmetro" element={<UPMetroHub />} />
                    <Route path="/pitch/upmetro" element={<UPMetroDeck />} />
                    <Route path="/upmetro" element={<UPMetroLayout />}>
                      <Route path="command" element={<UPMetroCommand />} />
                      <Route path="assets" element={<UPMetroAssetMap />} />
                      <Route path="incidents" element={<UPMetroIncidents />} />
                      <Route path="access" element={<UPMetroAccess />} />
                      <Route path="recovery" element={<UPMetroRecovery />} />
                      <Route path="compliance" element={<UPMetroCompliance />} />
                    </Route>
                    <Route path="/rak" element={<RAKHub />} />
                    <Route path="/pitch/rak" element={<RAKDeck />} />
                    <Route path="/rak" element={<RAKLayout />}>
                      <Route path="cockpit" element={<RAKCockpit />} />
                      <Route path="kiln" element={<RAKKiln />} />
                      <Route path="copilot" element={<RAKCopilot />} />
                      <Route path="architecture" element={<RAKArchitecture />} />
                    </Route>
                    <Route path="/bajajcapital" element={<BajajCapitalHub />} />
                    <Route path="/pitch/bajajcapital" element={<BajajCapitalDeck />} />
                    <Route path="/bajajcapital" element={<BajajCapitalLayout />}>
                      <Route path="cockpit" element={<BajajCapitalRMCockpit />} />
                      <Route path="ops" element={<BajajCapitalOps />} />
                      <Route path="retirement" element={<BajajCapitalRetirement />} />
                       <Route path="architecture" element={<BajajCapitalArchitecture />} />
                     </Route>
                      <Route path="/deck/one-plant-triangulation" element={<OnePlantTriangulationDeck />} />
                      <Route path="/deck/one-plant-triangulation-proof" element={<OnePlantTriangulationProofDeck />} />
                      <Route path="/jaikhurana" element={<JaiKhuranaHub />} />
                     <Route path="/pitch/jaikhurana" element={<JaiKhuranaDeck />} />
                     <Route path="/jaikhurana" element={<JaiKhuranaLayout />}>
                       <Route path="exec" element={<JaiKhuranaExec />} />
                       <Route path="freight" element={<JaiKhuranaFreight />} />
                       <Route path="leakage" element={<JaiKhuranaLeakage />} />
                       <Route path="vendor" element={<JaiKhuranaVendor />} />
                       <Route path="ropeway" element={<JaiKhuranaRopeway />} />
                       <Route path="assurance" element={<JaiKhuranaAssurance />} />
                     </Route>
                    <Route path="/pitch/mahindra-armored" element={<MahindraArmoredDeck />} />
                    <Route path="/demo/mahindra-armored-signals" element={<MahindraArmoredSignalsDemo />} />
                    <Route path="/demo/msme-lending" element={<MSMELendingCommandCenter />} />
                     <Route path="/demo/cvm-command" element={<CVMCommandCenter />} />
                     <Route path="/demo/awnic" element={<AwnicCommandCenter />} />
                     <Route path="/vedanta-decision-hub" element={<VedantaDecisionHub />} />
                    <Route path="/greenko-command-center" element={<GreenkoCommandCenter />} />
                    <Route path="/havells-decision-studio" element={<HavellsDecisionStudio />} />
                    <Route path="/dpworld-orchestration" element={<DPWorldOrchestration />} />
                    <Route path="/supply-chain-pitch" element={<SupplyChainPitch />} />
                    <Route path="/supply-chain-demo" element={<SupplyChainDemo />} />
                    <Route path="/havells-pitch" element={<HavellsSalesOpsPitch />} />
                   <Route path="/havells-channel-studio" element={<HavellsChannelStudio />} />
                   <Route path="/jubilant-enpro" element={<JubilantEnproCommandCenter />} />
                   <Route path="/jubilant-enpro-pitch" element={<JubilantEnproPitch />} />
                  <Route path="/alerts" element={<AlertsAndDigests />} />
                  <Route path="/alerts/inbox" element={<AlertsAndDigests />} />
                  <Route path="/rebalancing" element={<Navigate to="/sip-management?tab=rebalance" replace />} />
                  <Route path="/admin/conversion-metrics" element={<ConversionMetrics />} />
                     <Route path="/discvrai/copilot" element={<DiscvrCopilot />} />
                     <Route path="/discvrai" element={<DiscvrAILayout />}>
                       <Route index element={<DiscvrHome />} />
                       <Route path="features" element={<DiscvrFeatures />} />
                       <Route path="modules" element={<DiscvrModules />} />
                       <Route path="security" element={<DiscvrSecurity />} />
                       <Route path="pricing" element={<DiscvrPricing />} />
                       <Route path="about" element={<DiscvrAbout />} />
                       <Route path="contact" element={<DiscvrContact />} />
                     </Route>
          <Route path="/pitch/discvr-content" element={<DiscvrContentDeck />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        {/* Global Chatbot Dialog - Hidden on pitch pages */}
        {!isPitchPage && (
          <>
            <ChatbotDialog 
              isOpen={isChatbotOpen} 
              onClose={() => setIsChatbotOpen(false)} 
            />
            <ChatbotTrigger onClick={() => setIsChatbotOpen(true)} />
          </>
        )}
        
        {/* Global Footer - Hidden on pitch pages */}
        {!isPitchPage && <GlobalFooter />}
    </>
  );
};

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AppContent />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
