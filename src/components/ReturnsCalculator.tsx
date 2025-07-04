import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Calculator, TrendingUp, Target, PiggyBank, Zap, ArrowRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

interface ReturnsCalculatorProps {
  fundName: string;
  expectedReturn: number; // Annual return percentage
  benchmarkReturn?: number;
}

const ReturnsCalculator = ({ fundName, expectedReturn, benchmarkReturn = 7 }: ReturnsCalculatorProps) => {
  const [investmentType, setInvestmentType] = useState<'sip' | 'lumpsum'>('sip');
  const [monthlyAmount, setMonthlyAmount] = useState(10000);
  const [lumpAmount, setLumpAmount] = useState(100000);
  const [investmentPeriod, setInvestmentPeriod] = useState(10);
  const [calculatedReturns, setCalculatedReturns] = useState({
    totalInvestment: 0,
    maturityAmount: 0,
    profit: 0,
    absoluteReturn: 0
  });

  const calculateReturns = () => {
    let totalInvestment = 0;
    let maturityAmount = 0;

    if (investmentType === 'sip') {
      totalInvestment = monthlyAmount * 12 * investmentPeriod;
      const monthlyRate = expectedReturn / 100 / 12;
      const totalMonths = investmentPeriod * 12;
      
      // SIP formula: M = P × [{(1 + i)^n - 1} / i] × (1 + i)
      maturityAmount = monthlyAmount * (((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate));
    } else {
      totalInvestment = lumpAmount;
      // Compound interest formula: A = P(1 + r)^t
      maturityAmount = lumpAmount * Math.pow(1 + expectedReturn / 100, investmentPeriod);
    }

    const profit = maturityAmount - totalInvestment;
    const absoluteReturn = (profit / totalInvestment) * 100;

    setCalculatedReturns({
      totalInvestment,
      maturityAmount,
      profit,
      absoluteReturn
    });
  };

  useEffect(() => {
    calculateReturns();
  }, [investmentType, monthlyAmount, lumpAmount, investmentPeriod, expectedReturn]);

  // Calculate comparison data for chart with distinct colors
  const getComparisonData = () => {
    const bankReturn = 4; // Bank FD rate
    const goldReturn = 8; // Gold average return
    
    let bankAmount = 0;
    let goldAmount = 0;
    let fundAmount = calculatedReturns.maturityAmount;

    if (investmentType === 'sip') {
      const totalInvestment = monthlyAmount * 12 * investmentPeriod;
      
      // Bank
      const bankMonthlyRate = bankReturn / 100 / 12;
      const totalMonths = investmentPeriod * 12;
      bankAmount = monthlyAmount * (((Math.pow(1 + bankMonthlyRate, totalMonths) - 1) / bankMonthlyRate) * (1 + bankMonthlyRate));
      
      // Gold
      const goldMonthlyRate = goldReturn / 100 / 12;
      goldAmount = monthlyAmount * (((Math.pow(1 + goldMonthlyRate, totalMonths) - 1) / goldMonthlyRate) * (1 + goldMonthlyRate));
    } else {
      bankAmount = lumpAmount * Math.pow(1 + bankReturn / 100, investmentPeriod);
      goldAmount = lumpAmount * Math.pow(1 + goldReturn / 100, investmentPeriod);
    }

    return [
      { 
        name: 'Bank FD', 
        value: bankAmount / 100000, 
        return: bankReturn,
        color: '#ef4444' // Red
      },
      { 
        name: 'Gold', 
        value: goldAmount / 100000, 
        return: goldReturn,
        color: '#f59e0b' // Amber
      },
      { 
        name: 'Category Avg', 
        value: (bankAmount + goldAmount) / 2 / 100000, 
        return: benchmarkReturn,
        color: '#6b7280' // Gray
      },
      { 
        name: 'This Fund', 
        value: fundAmount / 100000, 
        return: expectedReturn,
        color: '#3b82f6' // Blue
      }
    ];
  };

  const formatAmount = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`;
    } else {
      return `₹${amount.toFixed(0)}`;
    }
  };

  const comparisonData = getComparisonData();

  return (
    <div className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50 rounded-2xl" />
      
      <Card className="relative bg-white/95 backdrop-blur-sm border border-gray-100 shadow-lg rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
            <div className="p-2.5 bg-blue-600 rounded-xl shadow-sm">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            Returns Calculator
          </CardTitle>
          <p className="text-sm text-gray-600 mt-1">
            Calculate your potential returns and compare with other investments
          </p>
        </CardHeader>
        
        <CardContent className="p-6 pt-0 space-y-5">
          {/* Investment Type Toggle */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
              <Target className="w-4 h-4 text-blue-600" />
              Choose Investment Style
            </label>
            <div className="relative bg-gray-50 rounded-2xl p-1.5 border border-gray-200">
              <div className="grid grid-cols-2 gap-1">
                <button
                  onClick={() => setInvestmentType('sip')}
                  className={`relative flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                    investmentType === 'sip'
                      ? 'bg-white text-blue-700 shadow-md border border-blue-100'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <PiggyBank className="w-4 h-4" />
                  Monthly SIP
                </button>
                <button
                  onClick={() => setInvestmentType('lumpsum')}
                  className={`relative flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                    investmentType === 'lumpsum'
                      ? 'bg-white text-blue-700 shadow-md border border-blue-100'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Zap className="w-4 h-4" />
                  Lumpsum
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            
            {/* Left Column - Input Controls & Investment Summary */}
            <div className="space-y-4">
              
              {/* Investment Amount */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-800">
                  {investmentType === 'sip' ? 'Monthly Investment' : 'One-time Investment'}
                </label>
                
                <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                  <div className="text-center mb-3">
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      ₹{(investmentType === 'sip' ? monthlyAmount : lumpAmount).toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {investmentType === 'sip' ? 'per month' : 'one-time'}
                    </div>
                  </div>
                  
                  <Slider
                    value={[investmentType === 'sip' ? monthlyAmount : lumpAmount]}
                    onValueChange={(value) => {
                      if (investmentType === 'sip') {
                        setMonthlyAmount(value[0]);
                      } else {
                        setLumpAmount(value[0]);
                      }
                    }}
                    max={investmentType === 'sip' ? 100000 : 1000000}
                    min={investmentType === 'sip' ? 500 : 5000}
                    step={investmentType === 'sip' ? 500 : 5000}
                    className="w-full mb-2"
                  />
                  
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>₹{investmentType === 'sip' ? '500' : '5,000'}</span>
                    <span>₹{investmentType === 'sip' ? '1,00,000' : '10,00,000'}</span>
                  </div>
                </div>
              </div>

              {/* Investment Period */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-800">Investment Duration</label>
                
                <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setInvestmentPeriod(Math.max(1, investmentPeriod - 1))}
                      className="h-10 w-10 rounded-full border-2 hover:bg-gray-50 hover:shadow-sm transition-all"
                    >
                      −
                    </Button>
                    
                    <div className="text-center min-w-[80px]">
                      <div className="text-2xl font-bold text-gray-900">{investmentPeriod}</div>
                      <div className="text-sm text-gray-500">Years</div>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setInvestmentPeriod(Math.min(30, investmentPeriod + 1))}
                      className="h-10 w-10 rounded-full border-2 hover:bg-gray-50 hover:shadow-sm transition-all"
                    >
                      +
                    </Button>
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>1 Year</span>
                    <span>30 Years</span>
                  </div>
                </div>
              </div>

              {/* Basic Investment Summary - Only Total Investment and Profit */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-800">Investment Summary</h3>
                
                <div className="space-y-2">
                  {/* Total Investment */}
                  <div className="bg-white rounded-lg p-3 flex justify-between items-center border border-gray-200 shadow-sm">
                    <span className="text-sm text-gray-600">Total Investment</span>
                    <span className="text-base font-bold text-gray-900">
                      {formatAmount(calculatedReturns.totalInvestment)}
                    </span>
                  </div>
                  
                  {/* Profit */}
                  <div className="bg-green-50 rounded-lg p-3 flex justify-between items-center border border-green-100">
                    <span className="text-sm text-gray-600">Expected Profit</span>
                    <span className="text-base font-bold text-green-600">
                      {formatAmount(calculatedReturns.profit)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Chart and Final Corpus */}
            <div className="space-y-4 flex flex-col">
              
              {/* Comparison Chart - Increased height */}
              <div className="space-y-3 flex-1">
                <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  Performance Comparison
                </h3>
                
                <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm h-full flex flex-col">
                  <div className="flex-1 mb-3" style={{ minHeight: '200px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={comparisonData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                        <YAxis 
                          fontSize={10}
                          tick={{ fill: '#6b7280' }}
                          width={30}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                          {comparisonData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  {/* Legend */}
                  <div className="grid grid-cols-2 gap-2">
                    {comparisonData.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full flex-shrink-0" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-xs text-gray-600 truncate">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Final Corpus - Aligned with Investment Summary */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 text-white shadow-md">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm opacity-90">Final Corpus</span>
                  <span className="text-2xl font-bold">
                    {formatAmount(calculatedReturns.maturityAmount)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-sm opacity-90">
                    <ArrowRight size={12} />
                    Absolute Return
                  </span>
                  <span className="text-lg font-semibold">
                    {calculatedReturns.absoluteReturn.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
            <div className="flex items-start gap-3">
              <div className="p-1 bg-amber-200 rounded-full flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 bg-amber-600 rounded-full" />
              </div>
              <div>
                <p className="text-xs text-amber-800 leading-relaxed">
                  <strong>Important:</strong> These calculations are based on assumed returns for illustrative purposes only. 
                  Actual returns may vary significantly based on market conditions, fund performance, and other factors.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReturnsCalculator;
