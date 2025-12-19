import React, { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Shield, 
  Target, 
  Users, 
  Building2, 
  ArrowRight,
  Download,
  CheckCircle2,
  Quote,
  Zap,
  BarChart3,
  PieChart
} from 'lucide-react';
import { useReactToPrint } from 'react-to-print';

const DistributionCaseStudy = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: 'DISCVR-Distribution-Expense-Management-Case-Study',
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Print Button - Fixed */}
      <div className="fixed top-4 right-4 z-50 print:hidden">
        <Button 
          onClick={() => handlePrint()}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
        >
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
      </div>

      {/* Printable Content */}
      <div ref={contentRef} className="max-w-5xl mx-auto p-8 bg-white print:p-6">
        
        {/* Header */}
        <div className="text-center mb-12 pb-8 border-b-2 border-blue-100">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              DISCVR.AI
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            Distribution Expense Management Platform
          </h1>
          <p className="text-lg text-slate-600">Commission Intelligence & Optimization</p>
        </div>

        {/* Case Study Title */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 mb-10 text-white text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <BarChart3 className="w-6 h-6" />
            <span className="text-sm font-medium uppercase tracking-wider opacity-90">Case Study</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Turning Commission from an Expense into an Engine
          </h2>
        </div>

        {/* Client Profile */}
        <Card className="mb-8 border-2 border-blue-100 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Client Profile</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-50 rounded-lg p-4 text-center">
                <p className="text-sm text-slate-500 mb-1">Company</p>
                <p className="text-lg font-bold text-slate-900">Apex Asset Management</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4 text-center">
                <p className="text-sm text-slate-500 mb-1">AUM</p>
                <p className="text-lg font-bold text-blue-600">₹15,000 Cr</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4 text-center">
                <p className="text-sm text-slate-500 mb-1">Distributors</p>
                <p className="text-lg font-bold text-slate-900">4,500+</p>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Target className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-amber-800 mb-1">Challenge</p>
                  <p className="text-amber-700 text-sm">
                    Despite paying competitive commissions (0.80% - 1.10% trail), net inflows were stagnant. 
                    A high percentage of payouts were going to "Cost Center" distributors who churned assets 
                    every 2 years, effectively bleeding the AMC's revenue.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Header */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">The Transformation Dashboard</h3>
          <p className="text-slate-600">Data snapshot 12 months post-deployment of our Commission Intelligence Platform</p>
        </div>

        {/* Section 1: Financial Efficiency */}
        <Card className="mb-8 border-2 border-emerald-100 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-emerald-100 text-sm">Section 1</span>
                <h4 className="text-xl font-bold text-white">Financial Efficiency Metrics</h4>
              </div>
            </div>
          </div>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left p-4 font-semibold text-slate-700 border-b">Metric</th>
                    <th className="text-left p-4 font-semibold text-slate-700 border-b">Definition</th>
                    <th className="text-center p-4 font-semibold text-slate-700 border-b">Pre</th>
                    <th className="text-center p-4 font-semibold text-slate-700 border-b">Post</th>
                    <th className="text-center p-4 font-semibold text-slate-700 border-b">Impact</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-4 font-medium text-slate-900">Commission Efficiency Ratio</td>
                    <td className="p-4 text-sm text-slate-600">New AUM generated per ₹1 of commission increase</td>
                    <td className="p-4 text-center text-red-600 font-semibold">0.8x</td>
                    <td className="p-4 text-center text-emerald-600 font-bold">1.4x</td>
                    <td className="p-4 text-center">
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">High Value</span>
                    </td>
                  </tr>
                  <tr className="border-b bg-slate-50/50">
                    <td className="p-4 font-medium text-slate-900">Effective Trail Rate</td>
                    <td className="p-4 text-sm text-slate-600">Weighted avg. commission paid across all AUM</td>
                    <td className="p-4 text-center text-slate-700 font-semibold">0.95%</td>
                    <td className="p-4 text-center text-emerald-600 font-bold">0.88%</td>
                    <td className="p-4 text-center">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">7 bps Savings</span>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium text-slate-900">CAC (Cost of Acquisition)</td>
                    <td className="p-4 text-sm text-slate-600">Upfront cost to acquire ₹100 of AUM</td>
                    <td className="p-4 text-center text-red-600 font-semibold">₹1.80</td>
                    <td className="p-4 text-center text-emerald-600 font-bold">₹1.25</td>
                    <td className="p-4 text-center">
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">30% Reduction</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-slate-900">Net Revenue Retention</td>
                    <td className="p-4 text-sm text-slate-600">Revenue retained from existing book</td>
                    <td className="p-4 text-center text-amber-600 font-semibold">88%</td>
                    <td className="p-4 text-center text-emerald-600 font-bold">96%</td>
                    <td className="p-4 text-center">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Stabilized</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-t">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-700">
                  <span className="font-semibold text-emerald-700">Analysis:</span> By identifying and capping payouts for high-churn distributors, 
                  Apex saved 7 basis points on their entire AUM annually—translating to <span className="font-bold text-emerald-700">~₹10.5 Crores</span> in 
                  direct bottom-line savings, reinvested to reward top performers.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Quality of Business */}
        <Card className="mb-8 border-2 border-purple-100 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-violet-500 p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-purple-100 text-sm">Section 2</span>
                <h4 className="text-xl font-bold text-white">Quality of Business (The "Stickiness" Factor)</h4>
              </div>
            </div>
          </div>
          <CardContent className="p-0">
            <div className="p-4 bg-purple-50 border-b">
              <p className="text-purple-800 font-medium text-center italic">Did we attract better money?</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left p-4 font-semibold text-slate-700 border-b">Metric</th>
                    <th className="text-left p-4 font-semibold text-slate-700 border-b">Definition</th>
                    <th className="text-center p-4 font-semibold text-slate-700 border-b">Pre</th>
                    <th className="text-center p-4 font-semibold text-slate-700 border-b">Post</th>
                    <th className="text-center p-4 font-semibold text-slate-700 border-b">Impact</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-4 font-medium text-slate-900">SIP Persistency (13th Month)</td>
                    <td className="p-4 text-sm text-slate-600">% of SIPs that survive {'>'} 1 year</td>
                    <td className="p-4 text-center text-slate-600 font-semibold">68%</td>
                    <td className="p-4 text-center text-purple-600 font-bold">82%</td>
                    <td className="p-4 text-center">
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">Top Quartile</span>
                    </td>
                  </tr>
                  <tr className="border-b bg-slate-50/50">
                    <td className="p-4 font-medium text-slate-900">Net-to-Gross Sales Ratio</td>
                    <td className="p-4 text-sm text-slate-600">How much inflow actually stays</td>
                    <td className="p-4 text-center text-red-600 font-semibold">35%</td>
                    <td className="p-4 text-center text-purple-600 font-bold">55%</td>
                    <td className="p-4 text-center">
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">+20% Efficiency</span>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium text-slate-900">Distributor Churn Rate</td>
                    <td className="p-4 text-sm text-slate-600">% of active distributors who stopped selling</td>
                    <td className="p-4 text-center text-red-600 font-semibold">18%</td>
                    <td className="p-4 text-center text-purple-600 font-bold">9%</td>
                    <td className="p-4 text-center">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Higher Loyalty</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-slate-900">B-30 Penetration</td>
                    <td className="p-4 text-sm text-slate-600">Assets from beyond top 30 cities</td>
                    <td className="p-4 text-center text-slate-600 font-semibold">12%</td>
                    <td className="p-4 text-center text-purple-600 font-bold">19%</td>
                    <td className="p-4 text-center">
                      <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">Regulatory Win</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-purple-50 to-violet-50 border-t">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-700">
                  <span className="font-semibold text-purple-700">Strategy Used:</span> Apex introduced a "Tenure Bonus": Instead of hiking upfront fees, 
                  they added a <span className="font-bold">0.10% trail booster</span> for assets held {'>'}3 years. This aligned distributor incentives with the AMC's long-term health.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Operational Velocity */}
        <Card className="mb-8 border-2 border-orange-100 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-orange-100 text-sm">Section 3</span>
                <h4 className="text-xl font-bold text-white">Operational Velocity</h4>
              </div>
            </div>
          </div>
          <CardContent className="p-0">
            <div className="p-4 bg-orange-50 border-b">
              <p className="text-orange-800 font-medium text-center italic">Time saved for the Sales & Finance Teams</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left p-4 font-semibold text-slate-700 border-b">Metric</th>
                    <th className="text-center p-4 font-semibold text-slate-700 border-b">Pre-Implementation</th>
                    <th className="text-center p-4 font-semibold text-slate-700 border-b">Post-Implementation</th>
                    <th className="text-center p-4 font-semibold text-slate-700 border-b">Impact</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-4 font-medium text-slate-900">Monthly Payout Cycle</td>
                    <td className="p-4 text-center text-red-600">5 Days <span className="text-xs text-slate-500">(Manual Excel)</span></td>
                    <td className="p-4 text-center text-orange-600 font-bold">4 Hours <span className="text-xs text-slate-500">(Automated)</span></td>
                    <td className="p-4 text-center">
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">90% Faster</span>
                    </td>
                  </tr>
                  <tr className="border-b bg-slate-50/50">
                    <td className="p-4 font-medium text-slate-900">Dispute Resolution Time</td>
                    <td className="p-4 text-center text-red-600">7 Days <span className="text-xs text-slate-500">(avg. turnaround)</span></td>
                    <td className="p-4 text-center text-orange-600 font-bold">Same-Day <span className="text-xs text-slate-500">(Self-serve)</span></td>
                    <td className="p-4 text-center">
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">Happier Partners</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-slate-900">Incentive Plan Launch</td>
                    <td className="p-4 text-center text-red-600">3 Weeks <span className="text-xs text-slate-500">(configure & deploy)</span></td>
                    <td className="p-4 text-center text-orange-600 font-bold">1 Day <span className="text-xs text-slate-500">(No-code)</span></td>
                    <td className="p-4 text-center">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Agility</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Quote Section */}
        <Card className="mb-8 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-sm">
          <CardContent className="p-8">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Quote className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <blockquote className="text-center">
              <p className="text-lg md:text-xl text-slate-700 italic leading-relaxed mb-6">
                "Before this platform, we were flying blind—paying the same commission to a partner who brought sticky 10-year money 
                as we did to one who churned us in 6 months. Now, we don't just pay commissions; <span className="font-semibold text-blue-700">we invest in behavior</span>. 
                Our payout bill is leaner, but our partners are happier because the good ones are earning <span className="font-semibold text-emerald-600">20% more</span>."
              </p>
              <footer className="text-slate-600">
                <cite className="not-italic">
                  <span className="font-bold text-slate-900">— CFO</span>, Apex Asset Management
                </cite>
              </footer>
            </blockquote>
          </CardContent>
        </Card>

        {/* How to Present */}
        <Card className="mb-8 border-2 border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                <PieChart className="w-5 h-5 text-slate-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">How to Present This</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-emerald-700 font-bold">1</span>
                </div>
                <div>
                  <p className="font-semibold text-emerald-800 mb-1">Don't hide the "Savings"</p>
                  <p className="text-sm text-emerald-700">CFOs love the "7 bps savings" metric. It pays for your software 10x over.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-700 font-bold">2</span>
                </div>
                <div>
                  <p className="font-semibold text-blue-800 mb-1">Highlight the "Win-Win"</p>
                  <p className="text-sm text-blue-700">Emphasize that while overall cost went down, top performers earned more. This proves you aren't just a cost-cutting tool, but a performance tool.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg border border-purple-100">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-700 font-bold">3</span>
                </div>
                <div>
                  <p className="font-semibold text-purple-800 mb-1">Visual Proof</p>
                  <p className="text-sm text-purple-700">When showing this page, have a screenshot of your "Distributor Segmentation Matrix" (Stars vs. Dogs) ready to show how you achieved these numbers.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center pt-8 border-t-2 border-blue-100">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              DISCVR.AI
            </span>
          </div>
          <p className="text-slate-600 text-sm mb-2">Distribution Expense Management Platform</p>
          <p className="text-slate-500 text-xs">Commission Intelligence • Performance Analytics • Automated Payouts</p>
        </div>
      </div>
    </div>
  );
};

export default DistributionCaseStudy;
