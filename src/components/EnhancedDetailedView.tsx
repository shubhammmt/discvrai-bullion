import React from 'react';
import { Building2, TrendingUp, FileText, Users, Globe, Phone, Calendar, PieChart, BarChart3, LineChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ResearchSharing from './ResearchSharing';
import QuickChart from './QuickChart';

const EnhancedDetailedView = () => {
  return (
    <div className="space-y-6">
      {/* Research Sharing Component */}
      <ResearchSharing />

      {/* Enhanced Chart Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <LineChart className="w-5 h-5 text-blue-600" />
            Advanced Price Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <QuickChart />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-gray-900">$162.80</div>
              <div className="text-xs text-gray-600">Current Price</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-lg font-bold text-blue-600">$195.20</div>
              <div className="text-xs text-gray-600">Resistance</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-600">$145.50</div>
              <div className="text-xs text-gray-600">Support</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-lg font-bold text-orange-600">72.5</div>
              <div className="text-xs text-gray-600">RSI</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Business Segments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Revenue Breakdown & Growth Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Business Segments</h4>
              <div className="space-y-3">
                {[
                  { segment: 'iPhone', revenue: '52%', amount: '$199.6B', growth: '+3.2%', margin: '36%' },
                  { segment: 'Services', revenue: '22%', amount: '$84.3B', growth: '+16.9%', margin: '71%' },
                  { segment: 'Mac', revenue: '11%', amount: '$42.1B', growth: '-27.1%', margin: '32%' },
                  { segment: 'iPad', revenue: '8%', amount: '$30.7B', growth: '-13.4%', margin: '29%' },
                  { segment: 'Wearables', revenue: '7%', amount: '$26.8B', growth: '-3.3%', margin: '34%' }
                ].map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">{item.segment}</span>
                      <span className={`text-sm font-medium ${
                        item.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {item.growth}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <span className="text-gray-500">Revenue:</span>
                        <div className="font-medium">{item.revenue}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Amount:</span>
                        <div className="font-medium">{item.amount}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Margin:</span>
                        <div className="font-medium">{item.margin}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Geographic Revenue</h4>
              <div className="space-y-3">
                {[
                  { region: 'Americas', revenue: '42%', amount: '$161.3B', growth: '+2.4%' },
                  { region: 'Europe', revenue: '25%', amount: '$95.8B', growth: '+1.8%' },
                  { region: 'China', revenue: '19%', amount: '$72.8B', growth: '-13.2%' },
                  { region: 'Japan', revenue: '8%', amount: '$30.7B', growth: '+7.1%' },
                  { region: 'Rest of Asia', revenue: '6%', amount: '$23.0B', growth: '+11.4%' }
                ].map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">{item.region}</span>
                      <span className={`text-sm font-medium ${
                        item.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {item.growth}
                      </span>
                    </div>
                    <div className="text-lg font-bold text-gray-900">{item.revenue}</div>
                    <div className="text-sm text-gray-600">{item.amount}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Statements with 5-year view */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-purple-600" />
            5-Year Financial Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 font-medium text-gray-900">Metric</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-900">2023</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-900">2022</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-900">2021</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-900">2020</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-900">2019</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-900">CAGR</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-2 text-gray-700">Revenue (B)</td>
                  <td className="py-3 px-2 text-right font-medium">$383.3</td>
                  <td className="py-3 px-2 text-right">$394.3</td>
                  <td className="py-3 px-2 text-right">$365.8</td>
                  <td className="py-3 px-2 text-right">$274.5</td>
                  <td className="py-3 px-2 text-right">$260.2</td>
                  <td className="py-3 px-2 text-right text-green-600">+10.2%</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-2 text-gray-700">Net Income (B)</td>
                  <td className="py-3 px-2 text-right font-medium">$97.0</td>
                  <td className="py-3 px-2 text-right">$99.8</td>
                  <td className="py-3 px-2 text-right">$94.7</td>
                  <td className="py-3 px-2 text-right">$57.4</td>
                  <td className="py-3 px-2 text-right">$55.3</td>
                  <td className="py-3 px-2 text-right text-green-600">+15.1%</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-2 text-gray-700">EPS ($)</td>
                  <td className="py-3 px-2 text-right font-medium">$6.16</td>
                  <td className="py-3 px-2 text-right">$6.15</td>
                  <td className="py-3 px-2 text-right">$5.67</td>
                  <td className="py-3 px-2 text-right">$3.28</td>
                  <td className="py-3 px-2 text-right">$2.97</td>
                  <td className="py-3 px-2 text-right text-green-600">+19.9%</td>
                </tr>
                <tr>
                  <td className="py-3 px-2 text-gray-700">Free Cash Flow (B)</td>
                  <td className="py-3 px-2 text-right font-medium">$99.6</td>
                  <td className="py-3 px-2 text-right">$111.4</td>
                  <td className="py-3 px-2 text-right">$92.9</td>
                  <td className="py-3 px-2 text-right">$73.4</td>
                  <td className="py-3 px-2 text-right">$58.9</td>
                  <td className="py-3 px-2 text-right text-green-600">+14.0%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Valuation Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <BarChart3 className="w-5 h-5 text-indigo-600" />
            Valuation & Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { metric: 'P/E Ratio', value: '28.4', comparison: 'vs Sector: 24.2', status: 'premium' },
              { metric: 'PEG Ratio', value: '2.1', comparison: 'vs Sector: 1.8', status: 'premium' },
              { metric: 'P/B Ratio', value: '39.7', comparison: 'vs Sector: 4.2', status: 'premium' },
              { metric: 'EV/EBITDA', value: '22.1', comparison: 'vs Sector: 18.9', status: 'premium' },
              { metric: 'ROE', value: '172.5%', comparison: 'vs Sector: 22.1%', status: 'superior' },
              { metric: 'ROA', value: '22.4%', comparison: 'vs Sector: 8.7%', status: 'superior' },
              { metric: 'Debt/Equity', value: '1.73', comparison: 'vs Sector: 0.82', status: 'higher' },
              { metric: 'Current Ratio', value: '1.04', comparison: 'vs Sector: 1.32', status: 'lower' }
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">{item.metric}</div>
                <div className="text-xl font-bold text-gray-900 mb-1">{item.value}</div>
                <div className="text-xs text-gray-500">{item.comparison}</div>
                <div className={`text-xs font-medium mt-1 ${
                  item.status === 'superior' ? 'text-green-600' :
                  item.status === 'premium' ? 'text-blue-600' :
                  item.status === 'higher' ? 'text-orange-600' : 'text-red-600'
                }`}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Earnings Call Transcript */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-green-600" />
            Latest Earnings Call Highlights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-gray-900 mb-2">CEO Key Points</h4>
              <p className="text-sm text-gray-700">
                "We're excited about our AI capabilities and the potential they unlock across our product ecosystem. 
                Services revenue continues to be a bright spot with strong growth momentum."
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
              <h4 className="font-semibold text-gray-900 mb-2">CFO Financial Outlook</h4>
              <p className="text-sm text-gray-700">
                "We expect continued margin expansion in Services while managing supply chain dynamics effectively. 
                Our strong balance sheet positions us well for strategic investments."
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quarterly Results History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-orange-600" />
            Quarterly Results History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { quarter: 'Q4 2023', eps: '$2.18', revenue: '$119.6B', beat: 'Beat' },
              { quarter: 'Q3 2023', eps: '$1.26', revenue: '$81.8B', beat: 'Beat' },
              { quarter: 'Q2 2023', eps: '$1.52', revenue: '$94.8B', beat: 'Miss' },
              { quarter: 'Q1 2023', eps: '$1.88', revenue: '$117.2B', beat: 'Beat' }
            ].map((result, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm font-medium text-gray-900 mb-2">{result.quarter}</div>
                <div className="space-y-1">
                  <div className="text-xs text-gray-600">EPS: <span className="font-medium">{result.eps}</span></div>
                  <div className="text-xs text-gray-600">Revenue: <span className="font-medium">{result.revenue}</span></div>
                  <div className={`text-xs font-medium ${
                    result.beat === 'Beat' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {result.beat} Estimates
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Shareholding Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <PieChart className="w-5 h-5 text-indigo-600" />
            Key Shareholding & Ownership
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Top Institutional Holders</h4>
              <div className="space-y-2">
                {[
                  { name: 'Vanguard Group', holding: '7.8%', shares: '1.2B', change: '+0.2%' },
                  { name: 'BlackRock', holding: '6.1%', shares: '948M', change: '+0.1%' },
                  { name: 'Berkshire Hathaway', holding: '5.9%', shares: '915M', change: '0.0%' }
                ].map((holder, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <div>
                      <div className="text-sm font-medium">{holder.name}</div>
                      <div className="text-xs text-gray-600">{holder.shares} shares</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{holder.holding}</div>
                      <div className={`text-xs ${
                        holder.change.startsWith('+') ? 'text-green-600' : 
                        holder.change.startsWith('-') ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {holder.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Ownership Structure</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Institutional</span>
                  <span className="font-medium">59.8%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Individual/Retail</span>
                  <span className="font-medium">38.7%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Insider</span>
                  <span className="font-medium">1.5%</span>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Float</span>
                    <span className="font-medium">15.6B shares</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analyst Price Targets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Users className="w-5 h-5 text-orange-600" />
            Analyst Price Targets & Ratings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">$195</div>
              <div className="text-sm text-gray-600">Average Target</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">$220</div>
              <div className="text-sm text-gray-600">High Target</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">$170</div>
              <div className="text-sm text-gray-600">Low Target</div>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { firm: 'Morgan Stanley', rating: 'Buy', target: '$220', date: '2 days ago' },
              { firm: 'Goldman Sachs', rating: 'Hold', target: '$185', date: '1 week ago' },
              { firm: 'JP Morgan', rating: 'Buy', target: '$210', date: '2 weeks ago' }
            ].map((analyst, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-medium text-gray-900">{analyst.firm}</span>
                  <span className="ml-3 text-sm text-gray-600">{analyst.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    analyst.rating === 'Buy' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {analyst.rating}
                  </span>
                  <span className="font-bold text-gray-900">{analyst.target}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedDetailedView;
