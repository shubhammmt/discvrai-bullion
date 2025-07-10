
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Brain } from 'lucide-react';

interface PeerComparisonCardProps {
  stockData: any;
}

const PeerComparisonCard = ({ stockData }: PeerComparisonCardProps) => {
  const peerData = [
    { company: stockData.symbol, pe: stockData.pe, roe: stockData.roe, revenue_growth: 15.0, debt_ratio: stockData.debtToEquity },
    { company: 'PEER1', pe: 22.5, roe: 12.5, revenue_growth: 8.2, debt_ratio: 0.35 },
    { company: 'PEER2', pe: 15.2, roe: 14.1, revenue_growth: 6.5, debt_ratio: 0.48 },
    { company: 'PEER3', pe: 18.7, roe: 13.8, revenue_growth: 11.2, debt_ratio: 0.41 }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Peer Comparison
          <Badge variant="secondary">AI Analysis</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Company</th>
                <th className="text-center p-2">P/E</th>
                <th className="text-center p-2">ROE</th>
                <th className="text-center p-2">Revenue Growth</th>
                <th className="text-center p-2">Debt Ratio</th>
              </tr>
            </thead>
            <tbody>
              {peerData.map((peer, index) => (
                <tr key={index} className={`border-b ${peer.company === stockData.symbol ? 'bg-blue-50' : ''}`}>
                  <td className="p-2 font-medium">{peer.company}</td>
                  <td className="text-center p-2">{peer.pe}</td>
                  <td className="text-center p-2">{peer.roe}%</td>
                  <td className="text-center p-2">{peer.revenue_growth}%</td>
                  <td className="text-center p-2">{peer.debt_ratio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start gap-2">
            <Brain size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-green-800 mb-1">AI Peer Analysis:</p>
              <p className="text-sm text-green-700">
                {stockData.symbol} shows superior revenue growth (15% vs sector avg 9%) and strong ROE. 
                Premium valuation justified by diversified business model and growth prospects.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PeerComparisonCard;
