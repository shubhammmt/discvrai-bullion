
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingUp, TrendingDown, Users } from 'lucide-react';

interface PeerFund {
  scheme_code: number;
  scheme_name: string;
  nav: number;
  risk_rating: string;
  returns: {
    "6_month": number | null;
    "1_year": number | null;
    "3_year": number | null;
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

interface CategoryAverages {
  "6_month": number;
  "1_year": number;
  "3_year": number;
}

interface PeerComparisonProps {
  currentFund: CurrentFund;
  peerFunds: PeerFund[];
  categoryName: string;
  categoryAverages: CategoryAverages;
}

const PeerComparison: React.FC<PeerComparisonProps> = ({
  currentFund,
  peerFunds,
  categoryName,
  categoryAverages
}) => {
  // Helper function to safely format return values
  const formatReturn = (value: number | null | undefined): string => {
    if (value === null || value === undefined) {
      return 'N/A';
    }
    return `${value.toFixed(2)}%`;
  };

  // Helper function to get return comparison
  const getReturnComparison = (fundReturn: number | null, categoryAverage: number) => {
    if (fundReturn === null || fundReturn === undefined) {
      return { isOutperforming: false, difference: 0 };
    }
    const difference = fundReturn - categoryAverage;
    return {
      isOutperforming: difference > 0,
      difference: Math.abs(difference)
    };
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Users className="w-5 h-5 text-blue-600" />
          Peer Comparison
        </CardTitle>
        <p className="text-sm text-gray-600">
          Compare with similar funds in {categoryName} category
        </p>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-6">
          {/* Current Fund vs Category Average */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-3">Your Fund vs Category Average</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-1">6 Months</div>
                <div className="text-lg font-bold text-blue-600">
                  {formatReturn(currentFund.returns.ret_6month)}
                </div>
                <div className="text-xs text-gray-600">
                  Avg: {formatReturn(categoryAverages["6_month"])}
                </div>
                {(() => {
                  const comparison = getReturnComparison(currentFund.returns.ret_6month, categoryAverages["6_month"]);
                  return (
                    <div className={`text-xs flex items-center justify-center gap-1 mt-1 ${
                      comparison.isOutperforming ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {comparison.isOutperforming ? (
                        <TrendingUp size={12} />
                      ) : (
                        <TrendingDown size={12} />
                      )}
                      {comparison.difference > 0 && `${comparison.difference.toFixed(1)}%`}
                    </div>
                  );
                })()}
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-1">1 Year</div>
                <div className="text-lg font-bold text-blue-600">
                  {formatReturn(currentFund.returns.ret_1year)}
                </div>
                <div className="text-xs text-gray-600">
                  Avg: {formatReturn(categoryAverages["1_year"])}
                </div>
                {(() => {
                  const comparison = getReturnComparison(currentFund.returns.ret_1year, categoryAverages["1_year"]);
                  return (
                    <div className={`text-xs flex items-center justify-center gap-1 mt-1 ${
                      comparison.isOutperforming ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {comparison.isOutperforming ? (
                        <TrendingUp size={12} />
                      ) : (
                        <TrendingDown size={12} />
                      )}
                      {comparison.difference > 0 && `${comparison.difference.toFixed(1)}%`}
                    </div>
                  );
                })()}
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-1">3 Years</div>
                <div className="text-lg font-bold text-blue-600">
                  {formatReturn(currentFund.returns.ret_3year)}
                </div>
                <div className="text-xs text-gray-600">
                  Avg: {formatReturn(categoryAverages["3_year"])}
                </div>
                {(() => {
                  const comparison = getReturnComparison(currentFund.returns.ret_3year, categoryAverages["3_year"]);
                  return (
                    <div className={`text-xs flex items-center justify-center gap-1 mt-1 ${
                      comparison.isOutperforming ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {comparison.isOutperforming ? (
                        <TrendingUp size={12} />
                      ) : (
                        <TrendingDown size={12} />
                      )}
                      {comparison.difference > 0 && `${comparison.difference.toFixed(1)}%`}
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>

          {/* Peer Funds Table */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Similar Funds in Category</h4>
            
            {/* Mobile View */}
            <div className="block sm:hidden space-y-3">
              {peerFunds.slice(0, 5).map((fund, index) => (
                <div key={fund.scheme_code} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium text-gray-900 text-sm pr-2">
                      {fund.scheme_name}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {fund.risk_rating}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">NAV:</span>
                      <span className="font-semibold">₹{fund.nav}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center">
                        <div className="text-gray-600">6M</div>
                        <div className={`font-semibold ${
                          fund.returns["6_month"] && fund.returns["6_month"] >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {formatReturn(fund.returns["6_month"])}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-gray-600">1Y</div>
                        <div className={`font-semibold ${
                          fund.returns["1_year"] && fund.returns["1_year"] >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {formatReturn(fund.returns["1_year"])}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-gray-600">3Y</div>
                        <div className={`font-semibold ${
                          fund.returns["3_year"] && fund.returns["3_year"] >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {formatReturn(fund.returns["3_year"])}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Desktop View */}
            <div className="hidden sm:block rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="text-left font-semibold text-gray-900">Fund Name</TableHead>
                    <TableHead className="text-center font-semibold text-gray-900">NAV</TableHead>
                    <TableHead className="text-center font-semibold text-gray-900">Risk</TableHead>
                    <TableHead className="text-center font-semibold text-gray-900">6M Returns</TableHead>
                    <TableHead className="text-center font-semibold text-gray-900">1Y Returns</TableHead>
                    <TableHead className="text-center font-semibold text-gray-900">3Y Returns</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {peerFunds.slice(0, 8).map((fund, index) => (
                    <TableRow key={fund.scheme_code} className="hover:bg-gray-50/50">
                      <TableCell className="text-left font-medium text-gray-900 py-4 max-w-xs">
                        <div className="truncate" title={fund.scheme_name}>
                          {fund.scheme_name}
                        </div>
                      </TableCell>
                      <TableCell className="text-center text-gray-900 py-4">
                        ₹{fund.nav}
                      </TableCell>
                      <TableCell className="text-center py-4">
                        <Badge variant="secondary" className="text-xs">
                          {fund.risk_rating}
                        </Badge>
                      </TableCell>
                      <TableCell className={`text-center font-semibold py-4 ${
                        fund.returns["6_month"] && fund.returns["6_month"] >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {formatReturn(fund.returns["6_month"])}
                      </TableCell>
                      <TableCell className={`text-center font-semibold py-4 ${
                        fund.returns["1_year"] && fund.returns["1_year"] >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {formatReturn(fund.returns["1_year"])}
                      </TableCell>
                      <TableCell className={`text-center font-semibold py-4 ${
                        fund.returns["3_year"] && fund.returns["3_year"] >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {formatReturn(fund.returns["3_year"])}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Summary</h4>
            <p className="text-sm text-gray-700">
              Based on {peerFunds.length} peer funds in the {categoryName} category. 
              Performance data shows how your selected fund compares against similar investment options.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PeerComparison;
