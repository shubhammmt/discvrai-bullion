
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, TrendingUp, ArrowUpDown } from 'lucide-react';

interface PeerFund {
  scheme_code: number;
  scheme_name: string;
  nav: number;
  risk_rating: string;
  returns: {
    "6_month": number;
    "1_year": number;
    "3_year": number;
  };
}

interface PeerComparisonProps {
  currentFund: {
    name: string;
    nav: number;
    returns: {
      ret_6month: number;
      ret_1year: number;
      ret_3year: number;
    };
  };
  peerFunds: PeerFund[];
  categoryName: string;
  categoryAverages: {
    "6_month": number;
    "1_year": number;
    "3_year": number;
  };
}

type SortField = '6_month' | '1_year' | '3_year' | 'nav';
type SortOrder = 'asc' | 'desc';

const PeerComparison = ({ currentFund, peerFunds, categoryName, categoryAverages }: PeerComparisonProps) => {
  const [sortField, setSortField] = useState<SortField>('3_year');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  // Add current fund to comparison
  const allFunds = [
    {
      scheme_code: 0,
      scheme_name: currentFund.name,
      nav: currentFund.nav,
      risk_rating: "Very High",
      returns: {
        "6_month": currentFund.returns.ret_6month,
        "1_year": currentFund.returns.ret_1year,
        "3_year": currentFund.returns.ret_3year,
      },
      isCurrentFund: true
    },
    ...peerFunds.slice(0, 9).map(fund => ({ ...fund, isCurrentFund: false }))
  ];

  const sortedFunds = [...allFunds].sort((a, b) => {
    let aValue, bValue;
    
    if (sortField === 'nav') {
      aValue = a.nav;
      bValue = b.nav;
    } else {
      aValue = a.returns[sortField];
      bValue = b.returns[sortField];
    }
    
    if (sortOrder === 'desc') {
      return bValue - aValue;
    } else {
      return aValue - bValue;
    }
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-600';
    if (rank <= 3) return 'text-green-600';
    if (rank <= 5) return 'text-blue-600';
    return 'text-gray-600';
  };

  const currentFundRank3Y = sortedFunds.findIndex(fund => fund.isCurrentFund) + 1;

  return (
    <Card className="bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Users className="w-5 h-5 text-purple-600" />
          Peer Comparison
        </CardTitle>
        <p className="text-sm text-gray-600">
          Performance vs other {categoryName} funds
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Performance Summary */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className={`text-2xl font-bold ${getRankColor(currentFundRank3Y)}`}>
                  #{currentFundRank3Y}
                </div>
                <div className="text-sm text-gray-600">3Y Rank</div>
                <div className="text-xs text-gray-500">out of {allFunds.length}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {((currentFund.returns.ret_3year - categoryAverages["3_year"]) > 0 ? '+' : '')}
                  {(currentFund.returns.ret_3year - categoryAverages["3_year"]).toFixed(2)}%
                </div>
                <div className="text-sm text-gray-600">vs Category Avg</div>
                <div className="text-xs text-gray-500">3 Years</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {currentFund.returns.ret_3year.toFixed(2)}%
                </div>
                <div className="text-sm text-gray-600">3Y Returns</div>
                <div className="text-xs text-gray-500">Annualized</div>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-left font-semibold text-gray-900">Fund Name</TableHead>
                  <TableHead 
                    className="text-center font-semibold text-gray-900 cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('nav')}
                  >
                    <div className="flex items-center justify-center gap-1">
                      NAV
                      <ArrowUpDown size={12} />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="text-center font-semibold text-gray-900 cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('6_month')}
                  >
                    <div className="flex items-center justify-center gap-1">
                      6M Returns
                      <ArrowUpDown size={12} />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="text-center font-semibold text-gray-900 cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('1_year')}
                  >
                    <div className="flex items-center justify-center gap-1">
                      1Y Returns
                      <ArrowUpDown size={12} />
                    </div>
                  </TableHead>
                  <TableHead 
                    className="text-center font-semibold text-gray-900 cursor-pointer hover:bg-gray-50"
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
                {sortedFunds.map((fund, index) => (
                  <TableRow 
                    key={fund.scheme_code} 
                    className={`hover:bg-gray-50/50 ${fund.isCurrentFund ? 'bg-blue-50/50 border-l-4 border-l-blue-500' : ''}`}
                  >
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 text-sm">
                            {fund.isCurrentFund ? 'This Fund' : fund.scheme_name.substring(0, 40) + (fund.scheme_name.length > 40 ? '...' : '')}
                          </div>
                          {fund.isCurrentFund && (
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800 mt-1 text-xs">
                              Current Selection
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center py-4">
                      <span className="font-medium text-gray-900">₹{fund.nav.toFixed(2)}</span>
                    </TableCell>
                    <TableCell className="text-center py-4">
                      <span className={`font-semibold ${fund.returns["6_month"] >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {fund.returns["6_month"] > 0 ? '+' : ''}{fund.returns["6_month"].toFixed(2)}%
                      </span>
                    </TableCell>
                    <TableCell className="text-center py-4">
                      <span className={`font-semibold ${fund.returns["1_year"] >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {fund.returns["1_year"] > 0 ? '+' : ''}{fund.returns["1_year"].toFixed(2)}%
                      </span>
                    </TableCell>
                    <TableCell className="text-center py-4">
                      <span className={`font-semibold ${fund.returns["3_year"] >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {fund.returns["3_year"] > 0 ? '+' : ''}{fund.returns["3_year"].toFixed(2)}%
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Performance Insights */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-amber-800 mb-2">Performance Insights</h4>
                <div className="space-y-1 text-sm text-amber-700">
                  <p>• This fund ranks #{currentFundRank3Y} out of {allFunds.length} funds in 3-year returns</p>
                  <p>• {currentFund.returns.ret_3year > categoryAverages["3_year"] ? 'Outperforming' : 'Underperforming'} category average by {Math.abs(currentFund.returns.ret_3year - categoryAverages["3_year"]).toFixed(2)}%</p>
                  <p>• Category average 3Y return: {categoryAverages["3_year"].toFixed(2)}%</p>
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
