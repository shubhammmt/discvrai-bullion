
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, ArrowUpDown, TrendingUp } from 'lucide-react';

interface PeerFund {
  scheme_code: number;
  scheme_name: string;
  nav: number;
  risk_rating: string;
  returns: {
    '6_month': number;
    '1_year': number;
    '3_year': number;
  };
}

interface CurrentFund {
  name: string;
  nav: number;
  returns: {
    ret_6month: number;
    ret_1year: number;
    ret_3year: number;
  };
}

interface PeerComparisonProps {
  currentFund: CurrentFund;
  peerFunds: PeerFund[];
  categoryName: string;
  categoryAverages: {
    '6_month': number;
    '1_year': number;
    '3_year': number;
  };
}

const PeerComparison: React.FC<PeerComparisonProps> = ({
  currentFund,
  peerFunds,
  categoryName,
  categoryAverages
}) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  // Combine current fund with peer funds for comparison
  const allFunds = [
    {
      scheme_code: 0, // Dummy code for current fund
      scheme_name: currentFund.name,
      nav: currentFund.nav,
      risk_rating: 'Very High',
      returns: {
        '6_month': currentFund.returns.ret_6month,
        '1_year': currentFund.returns.ret_1year,
        '3_year': currentFund.returns.ret_3year,
      },
      isCurrentFund: true
    },
    ...peerFunds.slice(0, 9).map(fund => ({ ...fund, isCurrentFund: false }))
  ];

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'desc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

  const sortedFunds = React.useMemo(() => {
    if (!sortConfig) {
      return allFunds;
    }

    return [...allFunds].sort((a, b) => {
      let aValue: number;
      let bValue: number;

      if (sortConfig.key === 'nav') {
        aValue = a.nav;
        bValue = b.nav;
      } else if (sortConfig.key === '6_month') {
        aValue = a.returns['6_month'];
        bValue = b.returns['6_month'];
      } else if (sortConfig.key === '1_year') {
        aValue = a.returns['1_year'];
        bValue = b.returns['1_year'];
      } else if (sortConfig.key === '3_year') {
        aValue = a.returns['3_year'];
        bValue = b.returns['3_year'];
      } else {
        return 0;
      }

      if (sortConfig.direction === 'asc') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });
  }, [allFunds, sortConfig]);

  // Calculate insights
  const currentFund3YearReturn = currentFund.returns.ret_3year;
  const category3YearAverage = categoryAverages['3_year'];
  const fundsWithBetter3YearReturns = peerFunds.filter(fund => fund.returns['3_year'] > currentFund3YearReturn).length;
  const totalPeers = peerFunds.length;
  const ranking = fundsWithBetter3YearReturns + 1;
  const underperformanceVsCategory = Math.abs(currentFund3YearReturn - category3YearAverage);

  return (
    <Card className="bg-white/80 backdrop-blur-sm w-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <Users className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 flex-shrink-0" />
          <span className="break-words">Peer Comparison ({categoryName})</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 px-3 sm:px-6">
        <div className="space-y-4 sm:space-y-6">
          {/* Mobile Card Layout */}
          <div className="block sm:hidden space-y-3">
            {sortedFunds.map((fund) => (
              <div 
                key={fund.scheme_code}
                className={`p-4 rounded-lg border ${
                  fund.isCurrentFund ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-medium text-sm leading-tight ${
                      fund.isCurrentFund ? 'text-blue-800' : 'text-gray-900'
                    }`}>
                      {fund.scheme_name}
                    </h3>
                    {fund.isCurrentFund && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs mt-1">
                        This Fund
                      </Badge>
                    )}
                  </div>
                  <div className="text-right ml-2">
                    <div className="text-xs text-gray-500">NAV</div>
                    <div className={`font-semibold text-sm ${
                      fund.isCurrentFund ? 'text-blue-800' : 'text-gray-900'
                    }`}>
                      ₹{fund.nav.toFixed(2)}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">6M</div>
                    <div className={`font-semibold text-xs ${
                      fund.returns['6_month'] >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {fund.returns['6_month'] > 0 ? '+' : ''}{fund.returns['6_month'].toFixed(1)}%
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">1Y</div>
                    <div className={`font-semibold text-xs ${
                      fund.returns['1_year'] >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {fund.returns['1_year'] > 0 ? '+' : ''}{fund.returns['1_year'].toFixed(1)}%
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">3Y</div>
                    <div className={`font-semibold text-xs ${
                      fund.returns['3_year'] >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {fund.returns['3_year'] > 0 ? '+' : ''}{fund.returns['3_year'].toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table Layout */}
          <div className="hidden sm:block">
            <div className="rounded-md border overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="text-left font-semibold text-gray-900 min-w-[200px]">Fund Name</TableHead>
                      <TableHead 
                        className="text-center font-semibold text-gray-900 cursor-pointer hover:bg-gray-50 min-w-[100px]"
                        onClick={() => handleSort('nav')}
                      >
                        <div className="flex items-center justify-center gap-1">
                          NAV (₹)
                          <ArrowUpDown size={12} />
                        </div>
                      </TableHead>
                      <TableHead 
                        className="text-center font-semibold text-gray-900 cursor-pointer hover:bg-gray-50 min-w-[100px]"
                        onClick={() => handleSort('6_month')}
                      >
                        <div className="flex items-center justify-center gap-1">
                          6M Returns
                          <ArrowUpDown size={12} />
                        </div>
                      </TableHead>
                      <TableHead 
                        className="text-center font-semibold text-gray-900 cursor-pointer hover:bg-gray-50 min-w-[100px]"
                        onClick={() => handleSort('1_year')}
                      >
                        <div className="flex items-center justify-center gap-1">
                          1Y Returns
                          <ArrowUpDown size={12} />
                        </div>
                      </TableHead>
                      <TableHead 
                        className="text-center font-semibold text-gray-900 cursor-pointer hover:bg-gray-50 min-w-[100px]"
                        onClick={() => handleSort('3_year')}
                      >
                        <div className="flex items-center justify-center gap-1">
                          3Y Returns
                          <ArrowUpDown size={12} />
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedFunds.map((fund) => (
                      <TableRow 
                        key={fund.scheme_code} 
                        className={`hover:bg-gray-50/50 ${
                          fund.isCurrentFund ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                        }`}
                      >
                        <TableCell className="text-left py-4">
                          <div className="flex items-center gap-2">
                            <span className={`font-medium ${fund.isCurrentFund ? 'text-blue-800' : 'text-gray-900'}`}>
                              {fund.scheme_name}
                            </span>
                            {fund.isCurrentFund && (
                              <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                                This Fund
                              </Badge>
                            )}
                          </div>
                          {fund.isCurrentFund && (
                            <div className="text-xs text-blue-600 mt-1">Current Selection</div>
                          )}
                        </TableCell>
                        <TableCell className="text-center py-4">
                          <span className={`font-semibold ${fund.isCurrentFund ? 'text-blue-800' : 'text-gray-900'}`}>
                            ₹{fund.nav.toFixed(2)}
                          </span>
                        </TableCell>
                        <TableCell className="text-center py-4">
                          <span className={`font-semibold ${
                            fund.returns['6_month'] >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {fund.returns['6_month'] > 0 ? '+' : ''}{fund.returns['6_month'].toFixed(2)}%
                          </span>
                        </TableCell>
                        <TableCell className="text-center py-4">
                          <span className={`font-semibold ${
                            fund.returns['1_year'] >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {fund.returns['1_year'] > 0 ? '+' : ''}{fund.returns['1_year'].toFixed(2)}%
                          </span>
                        </TableCell>
                        <TableCell className="text-center py-4">
                          <span className={`font-semibold ${
                            fund.returns['3_year'] >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {fund.returns['3_year'] > 0 ? '+' : ''}{fund.returns['3_year'].toFixed(2)}%
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>

          {/* Performance Insights - Responsive */}
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-4 sm:p-6 border border-orange-200">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-4 h-4 text-orange-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-orange-800 mb-3">Performance Insights</h3>
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-orange-600 rounded-full flex-shrink-0 mt-1.5"></div>
                    <span className="text-orange-800 leading-relaxed">
                      This fund ranks <strong>#{ranking}</strong> out of <strong>{totalPeers + 1}</strong> funds in 3-year returns
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-orange-600 rounded-full flex-shrink-0 mt-1.5"></div>
                    <span className="text-orange-800 leading-relaxed">
                      {currentFund3YearReturn < category3YearAverage ? 'Underperforming' : 'Outperforming'} category average by <strong>{underperformanceVsCategory.toFixed(2)}%</strong>
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-orange-600 rounded-full flex-shrink-0 mt-1.5"></div>
                    <span className="text-orange-800 leading-relaxed">
                      Category average 3Y return: <strong>{category3YearAverage.toFixed(2)}%</strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PeerComparison;
