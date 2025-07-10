
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileSpreadsheet, TrendingUp, TrendingDown, Download, Brain } from 'lucide-react';

interface FinancialStatementsCardProps {
  symbol: string;
}

const FinancialStatementsCard = ({ symbol }: FinancialStatementsCardProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState('quarterly');

  // Mock financial data - in real implementation, this would come from APIs
  const incomeStatement = [
    { item: 'Revenue', q3_24: '15,647', q2_24: '14,235', q1_24: '13,892', q4_23: '16,234' },
    { item: 'EBITDA', q3_24: '4,523', q2_24: '4,156', q1_24: '3,987', q4_23: '4,789' },
    { item: 'Net Profit', q3_24: '2,876', q2_24: '2,567', q1_24: '2,234', q4_23: '2,987' },
    { item: 'EPS (₹)', q3_24: '43.2', q2_24: '38.6', q1_24: '33.6', q4_23: '44.9' }
  ];

  const balanceSheet = [
    { item: 'Total Assets', q3_24: '89,456', q2_24: '87,234', q1_24: '85,123', q4_23: '88,567' },
    { item: 'Total Debt', q3_24: '23,456', q2_24: '24,123', q1_24: '25,678', q4_23: '26,234' },
    { item: 'Equity', q3_24: '45,678', q2_24: '44,234', q1_24: '42,567', q4_23: '43,789' },
    { item: 'Book Value/Share', q3_24: '687', q2_24: '665', q1_24: '640', q4_23: '658' }
  ];

  const cashFlow = [
    { item: 'Operating CF', q3_24: '3,456', q2_24: '3,123', q1_24: '2,987', q4_23: '3,567' },
    { item: 'Investing CF', q3_24: '-1,234', q2_24: '-1,456', q1_24: '-1,123', q4_23: '-1,789' },
    { item: 'Financing CF', q3_24: '-567', q2_24: '-234', q1_24: '-456', q4_23: '-678' },
    { item: 'Free Cash Flow', q3_24: '2,222', q2_24: '1,667', q1_24: '1,864', q4_23: '1,778' }
  ];

  const renderTable = (data: any[]) => (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="text-left p-3 font-medium">Item</th>
            <th className="text-right p-3 font-medium">Q3'24</th>
            <th className="text-right p-3 font-medium">Q2'24</th>
            <th className="text-right p-3 font-medium">Q1'24</th>
            <th className="text-right p-3 font-medium">Q4'23</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="p-3 font-medium">{row.item}</td>
              <td className="text-right p-3">{row.q3_24}</td>
              <td className="text-right p-3">{row.q2_24}</td>
              <td className="text-right p-3">{row.q1_24}</td>
              <td className="text-right p-3">{row.q4_23}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5" />
            <CardTitle>Financial Statements</CardTitle>
            <Badge variant="secondary">Detailed View</Badge>
          </div>
          <Button variant="outline" size="sm">
            <Download size={16} className="mr-2" />
            Export CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod} className="mb-4">
          <TabsList>
            <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
            <TabsTrigger value="annual">Annual</TabsTrigger>
          </TabsList>
        </Tabs>

        <Tabs defaultValue="income" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="income">Income Statement</TabsTrigger>
            <TabsTrigger value="balance">Balance Sheet</TabsTrigger>
            <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
          </TabsList>
          
          <TabsContent value="income" className="mt-4">
            {renderTable(incomeStatement)}
          </TabsContent>
          
          <TabsContent value="balance" className="mt-4">
            {renderTable(balanceSheet)}
          </TabsContent>
          
          <TabsContent value="cashflow" className="mt-4">
            {renderTable(cashFlow)}
          </TabsContent>
        </Tabs>

        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-2">
            <Brain size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-blue-800 mb-1">AI Financial Analysis:</p>
              <p className="text-sm text-blue-700">
                Revenue shows consistent growth trajectory with improving margins. 
                Strong balance sheet with manageable debt levels. Operating cash flow remains robust.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialStatementsCard;
