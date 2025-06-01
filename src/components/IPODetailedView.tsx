
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Calendar, DollarSign, Target, AlertTriangle, CheckCircle } from 'lucide-react';

const IPODetailedView = () => {
  return (
    <div className="space-y-6">
      {/* Financial Performance */}
      <Card className="bg-white/70 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Financial Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Revenue Growth</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">FY 2021</span>
                  <span className="font-medium">₹650 Cr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">FY 2022</span>
                  <span className="font-medium">₹850 Cr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">FY 2023</span>
                  <span className="font-medium">₹1,200 Cr</span>
                </div>
                <div className="text-sm text-green-600 font-medium">CAGR: 45%</div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Profitability</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Gross Margin</span>
                  <span className="font-medium">68%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">EBITDA Margin</span>
                  <span className="font-medium">22%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Net Margin</span>
                  <span className="font-medium">15%</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Key Ratios</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">ROE</span>
                  <span className="font-medium">18.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Debt/Equity</span>
                  <span className="font-medium">0.3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Ratio</span>
                  <span className="font-medium">2.1</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Analysis */}
      <Card className="bg-white/70 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            Risk Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-red-600">Key Risks</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <p className="text-sm">High dependence on few large clients (60% revenue)</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <p className="text-sm">Intense competition from established players</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <p className="text-sm">Regulatory changes in tech sector</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-green-600">Strengths</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-sm">Strong IP portfolio with 50+ patents</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-sm">Experienced management team</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-sm">Growing market opportunity ($10B by 2027)</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Peer Comparison */}
      <Card className="bg-white/70 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle>Peer Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Company</th>
                  <th className="text-right py-2">Revenue Growth</th>
                  <th className="text-right py-2">EBITDA Margin</th>
                  <th className="text-right py-2">P/E Ratio</th>
                  <th className="text-right py-2">Market Cap</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b bg-blue-50">
                  <td className="py-2 font-medium">TechCorp (IPO)</td>
                  <td className="text-right py-2">45%</td>
                  <td className="text-right py-2">22%</td>
                  <td className="text-right py-2">25x</td>
                  <td className="text-right py-2">₹7,500 Cr</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">InfoSys</td>
                  <td className="text-right py-2">12%</td>
                  <td className="text-right py-2">24%</td>
                  <td className="text-right py-2">28x</td>
                  <td className="text-right py-2">₹6,20,000 Cr</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">TCS</td>
                  <td className="text-right py-2">8%</td>
                  <td className="text-right py-2">26%</td>
                  <td className="text-right py-2">30x</td>
                  <td className="text-right py-2">₹12,50,000 Cr</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IPODetailedView;
