
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Brain } from 'lucide-react';

interface FinancialStatementsCardProps {
  symbol: string;
}

const FinancialStatementsCard = ({ symbol }: FinancialStatementsCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Financial Statements
          <Badge variant="secondary">AI Enhanced</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Particulars (₹ Cr)</th>
                <th className="text-center p-2">FY24</th>
                <th className="text-center p-2">FY23</th>
                <th className="text-center p-2">FY22</th>
                <th className="text-center p-2">Growth</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2 font-medium">Revenue</td>
                <td className="text-center p-2">62,588</td>
                <td className="text-center p-2">55,421</td>
                <td className="text-center p-2">49,234</td>
                <td className="text-center p-2 text-green-600">+12.9%</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-medium">EBITDA</td>
                <td className="text-center p-2">18,092</td>
                <td className="text-center p-2">16,234</td>
                <td className="text-center p-2">14,567</td>
                <td className="text-center p-2 text-green-600">+11.4%</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-medium">Net Profit</td>
                <td className="text-center p-2">11,504</td>
                <td className="text-center p-2">10,123</td>
                <td className="text-center p-2">8,945</td>
                <td className="text-center p-2 text-green-600">+13.6%</td>
              </tr>
              {expanded && (
                <>
                  <tr className="border-b">
                    <td className="p-2 font-medium">Total Assets</td>
                    <td className="text-center p-2">3,45,678</td>
                    <td className="text-center p-2">3,12,456</td>
                    <td className="text-center p-2">2,89,234</td>
                    <td className="text-center p-2 text-green-600">+10.6%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-medium">Total Debt</td>
                    <td className="text-center p-2">89,234</td>
                    <td className="text-center p-2">92,567</td>
                    <td className="text-center p-2">98,123</td>
                    <td className="text-center p-2 text-green-600">-3.6%</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-center">
          <Button variant="outline" onClick={() => setExpanded(!expanded)}>
            {expanded ? 'Show Less' : 'Show More Details'}
          </Button>
        </div>

        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start gap-2">
            <Brain size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-green-800 mb-1">AI Financial Analysis:</p>
              <p className="text-sm text-green-700">
                Consistent revenue growth with improving margins. Strong balance sheet with reducing debt levels. 
                Cash flow generation remains robust supporting expansion plans.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialStatementsCard;
