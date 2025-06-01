
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, PieChart, Target, Users, Shield, DollarSign } from 'lucide-react';

const MutualFundDetailedView = () => {
  return (
    <div className="space-y-6">
      {/* Portfolio Holdings */}
      <Card className="bg-white/70 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="w-5 h-5 text-blue-600" />
            Portfolio Holdings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Top Holdings</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Reliance Industries</span>
                  <span className="text-sm font-medium">8.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">HDFC Bank</span>
                  <span className="text-sm font-medium">7.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Infosys</span>
                  <span className="text-sm font-medium">6.8%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">TCS</span>
                  <span className="text-sm font-medium">6.1%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">ICICI Bank</span>
                  <span className="text-sm font-medium">5.9%</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Sector Allocation</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Financial Services</span>
                  <span className="text-sm font-medium">32%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Information Technology</span>
                  <span className="text-sm font-medium">24%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Oil & Gas</span>
                  <span className="text-sm font-medium">15%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Consumer Goods</span>
                  <span className="text-sm font-medium">12%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Healthcare</span>
                  <span className="text-sm font-medium">8%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Analysis */}
      <Card className="bg-white/70 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Performance Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Returns Comparison</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">1 Year</span>
                  <div className="text-right">
                    <div className="text-sm font-medium">Fund: 18.5%</div>
                    <div className="text-xs text-gray-500">Benchmark: 15.2%</div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">3 Years</span>
                  <div className="text-right">
                    <div className="text-sm font-medium">Fund: 12.5%</div>
                    <div className="text-xs text-gray-500">Benchmark: 10.1%</div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">5 Years</span>
                  <div className="text-right">
                    <div className="text-sm font-medium">Fund: 14.8%</div>
                    <div className="text-xs text-gray-500">Benchmark: 12.3%</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Risk Metrics</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Alpha</span>
                  <span className="text-sm font-medium">2.8%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Beta</span>
                  <span className="text-sm font-medium">0.95</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sharpe Ratio</span>
                  <span className="text-sm font-medium">1.25</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Standard Deviation</span>
                  <span className="text-sm font-medium">16.2%</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Fund Details</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Min Investment</span>
                  <span className="text-sm font-medium">₹500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">SIP Min</span>
                  <span className="text-sm font-medium">₹500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Exit Load</span>
                  <span className="text-sm font-medium">1% (1 year)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fund Manager</span>
                  <span className="text-sm font-medium">Prashant Jain</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fund Manager Analysis */}
      <Card className="bg-white/70 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" />
            Fund Manager Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Experience</h4>
              <p className="text-sm text-gray-700 mb-3">
                Prashant Jain has over 25 years of experience in equity research and fund management. 
                Previously managed large cap funds with consistent outperformance.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Experience</span>
                  <span className="text-sm font-medium">25+ years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Managing this fund since</span>
                  <span className="text-sm font-medium">2018</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Investment Philosophy</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                  Focus on quality companies with sustainable competitive advantages
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                  Long-term value creation approach
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                  Bottom-up stock selection process
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MutualFundDetailedView;
