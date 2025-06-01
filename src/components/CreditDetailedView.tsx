
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, TrendingUp, Shield, AlertCircle, CheckCircle, CreditCard } from 'lucide-react';

const CreditDetailedView = () => {
  return (
    <div className="space-y-6">
      {/* Interest Rate Analysis */}
      <Card className="bg-white/70 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Interest Rate Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">10.5%</div>
              <div className="text-sm text-gray-600">Current Rate</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">12.2%</div>
              <div className="text-sm text-gray-600">Market Average</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">1.7%</div>
              <div className="text-sm text-gray-600">Below Average</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* EMI Calculator */}
      <Card className="bg-white/70 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-blue-600" />
            EMI Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Loan Amount</label>
                <input 
                  type="number" 
                  defaultValue={500000}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Tenure (Years)</label>
                <input 
                  type="number" 
                  defaultValue={5}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Enter tenure"
                />
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Calculated EMI</h4>
              <div className="text-3xl font-bold text-blue-600 mb-2">₹10,729</div>
              <div className="text-sm text-gray-600 space-y-1">
                <div>Total Interest: ₹1,43,740</div>
                <div>Total Amount: ₹6,43,740</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparison with Other Banks */}
      <Card className="bg-white/70 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle>Comparison with Other Lenders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { bank: 'HDFC Bank', rate: '10.5%', processing: '1.5%', score: 9.2 },
              { bank: 'SBI', rate: '11.0%', processing: '1.0%', score: 8.8 },
              { bank: 'ICICI Bank', rate: '10.8%', processing: '2.0%', score: 8.5 },
              { bank: 'Axis Bank', rate: '11.2%', processing: '1.8%', score: 8.3 }
            ].map((lender, index) => (
              <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                <div className="font-medium">{lender.bank}</div>
                <div className="text-sm text-gray-600">{lender.rate} | {lender.processing}</div>
                <div className="font-semibold text-blue-600">{lender.score}/10</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreditDetailedView;
