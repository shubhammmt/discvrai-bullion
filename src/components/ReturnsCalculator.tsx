
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Calculator, TrendingUp, Target, PiggyBank, Zap, ArrowRight, Info } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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

  // Calculate comparison data with Gold included
  const getComparisonData = () => {
    const ppfReturn = 7.1; // PPF current rate
    const nifty50Return = 12; // Nifty 50 average return
    const savingsReturn = 3; // Savings account rate
    const goldReturn = 8; // Gold historical average return
    
    let ppfAmount = 0;
    let nifty50Amount = 0;
    let savingsAmount = 0;
    let goldAmount = 0;
    let fundAmount = calculatedReturns.maturityAmount;

    if (investmentType === 'sip') {
      const totalInvestment = monthlyAmount * 12 * investmentPeriod;
      
      // PPF calculation
      const ppfMonthlyRate = ppfReturn / 100 / 12;
      const totalMonths = investmentPeriod * 12;
      ppfAmount = monthlyAmount * (((Math.pow(1 + ppfMonthlyRate, totalMonths) - 1) / ppfMonthlyRate) * (1 + ppfMonthlyRate));
      
      // Nifty 50 calculation
      const niftyMonthlyRate = nifty50Return / 100 / 12;
      nifty50Amount = monthlyAmount * (((Math.pow(1 + niftyMonthlyRate, totalMonths) - 1) / niftyMonthlyRate) * (1 + niftyMonthlyRate));

      // Savings account calculation
      const savingsMonthlyRate = savingsReturn / 100 / 12;
      savingsAmount = monthlyAmount * (((Math.pow(1 + savingsMonthlyRate, totalMonths) - 1) / savingsMonthlyRate) * (1 + savingsMonthlyRate));

      // Gold calculation
      const goldMonthlyRate = goldReturn / 100 / 12;
      goldAmount = monthlyAmount * (((Math.pow(1 + goldMonthlyRate, totalMonths) - 1) / goldMonthlyRate) * (1 + goldMonthlyRate));
    } else {
      ppfAmount = lumpAmount * Math.pow(1 + ppfReturn / 100, investmentPeriod);
      nifty50Amount = lumpAmount * Math.pow(1 + nifty50Return / 100, investmentPeriod);
      savingsAmount = lumpAmount * Math.pow(1 + savingsReturn / 100, investmentPeriod);
      goldAmount = lumpAmount * Math.pow(1 + goldReturn / 100, investmentPeriod);
    }

    return [
      { 
        name: 'Savings A/c', 
        value: savingsAmount / 100000, 
        return: savingsReturn,
        color: '#ef4444', // Red
        description: 'Bank Savings Account'
      },
      { 
        name: 'PPF', 
        value: ppfAmount / 100000, 
        return: ppfReturn,
        color: '#f59e0b', // Amber
        description: 'Public Provident Fund'
      },
      { 
        name: 'Gold', 
        value: goldAmount / 100000, 
        return: goldReturn,
        color: '#eab308', // Yellow
        description: 'Gold Investment'
      },
      { 
        name: 'Nifty 50', 
        value: nifty50Amount / 100000, 
        return: nifty50Return,
        color: '#6b7280', // Gray
        description: '15-year average return'
      },
      { 
        name: 'This Fund', 
        value: fundAmount / 100000, 
        return: expectedReturn,
        color: '#10b981', // Green
        description: 'Projected returns'
      }
    ];
  };

  const formatAmount = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)} L`;
    } else {
      return `₹${amount.toFixed(0)}`;
    }
  };

  const comparisonData = getComparisonData();

  return (
    <TooltipProvider>
      <Card className="bg-white/95 backdrop-blur-sm border border-gray-200 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
            <div className="p-2.5 bg-green-600 rounded-xl shadow-sm">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            Investment Calculator
          </CardTitle>
          <p className="text-sm text-gray-600 mt-1">
            See how your money can grow and compare with popular investment options
          </p>
        </CardHeader>
        
        <CardContent className="p-6 pt-0 space-y-6">
          {/* Investment Type Toggle */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
              Investment Style
            </label>
            <div className="bg-gray-100 rounded-xl p-1">
              <div className="grid grid-cols-2 gap-1">
                <button
                  onClick={() => setInvestmentType('sip')}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                    investmentType === 'sip'
                      ? 'bg-white text-green-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <PiggyBank className="w-4 h-4" />
                  Monthly SIP
                </button>
                <button
                  onClick={() => setInvestmentType('lumpsum')}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                    investmentType === 'lumpsum'
                      ? 'bg-white text-green-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Zap className="w-4 h-4" />
                  One-time
                </button>
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left: Controls */}
            <div className="space-y-5">
              
              {/* Investment Amount */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-800">
                  {investmentType === 'sip' ? 'Monthly Amount' : 'Investment Amount'}
                </label>
                
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      ₹{(investmentType === 'sip' ? monthlyAmount : lumpAmount).toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {investmentType === 'sip' ? 'every month' : 'one-time investment'}
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
                    className="w-full"
                  />
                  
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>₹{investmentType === 'sip' ? '500' : '5,000'}</span>
                    <span>₹{investmentType === 'sip' ? '1,00,000' : '10,00,000'}</span>
                  </div>
                </div>
              </div>

              {/* Investment Period */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-800">Time Period</label>
                
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-center gap-4 mb-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setInvestmentPeriod(Math.max(1, investmentPeriod - 1))}
                      className="h-8 w-8 rounded-full"
                    >
                      −
                    </Button>
                    
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{investmentPeriod}</div>
                      <div className="text-sm text-gray-500">Years</div>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setInvestmentPeriod(Math.min(30, investmentPeriod + 1))}
                      className="h-8 w-8 rounded-full"
                    >
                      +
                    </Button>
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>1 Year</span>
                    <span>30 Years</span>
                  </div>
                </div>
              </div>

              {/* Investment Summary */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-800">Your Investment</h3>
                
                <div className="space-y-2">
                  <div className="bg-white rounded-lg p-3 flex justify-between items-center border">
                    <span className="text-sm text-gray-600">Total Invested</span>
                    <span className="text-base font-bold text-gray-900">
                      {formatAmount(calculatedReturns.totalInvestment)}
                    </span>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-3 flex justify-between items-center border border-green-200">
                    <span className="text-sm text-gray-600">Expected Profit</span>
                    <span className="text-base font-bold text-green-600">
                      {formatAmount(calculatedReturns.profit)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Results & Chart */}
            <div className="space-y-5">
              
              {/* Final Value */}
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-5 text-white">
                <div className="text-center">
                  <div className="text-sm opacity-90 mb-1">Final Value After {investmentPeriod} Years</div>
                  <div className="text-3xl font-bold mb-2">
                    {formatAmount(calculatedReturns.maturityAmount)}
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm opacity-90">
                    <ArrowRight size={14} />
                    <span>{calculatedReturns.absoluteReturn.toFixed(1)}% Total Returns</span>
                  </div>
                </div>
              </div>

              {/* Comparison Chart */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-gray-800">Compare With Popular Options</h3>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info size={14} className="text-gray-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Historical returns - past performance doesn't guarantee future results</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                
                <div className="bg-white rounded-xl border p-4">
                  <div className="h-48 mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={comparisonData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                        <XAxis 
                          dataKey="name" 
                          fontSize={11}
                          tick={{ fill: '#6b7280' }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis 
                          fontSize={10}
                          tick={{ fill: '#6b7280' }}
                          width={40}
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
                  
                  {/* Legend with returns - Updated for 5 items */}
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                    {comparisonData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between text-xs p-2 bg-gray-50 rounded col-span-1">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-gray-700">{item.name}</span>
                        </div>
                        <span className="font-medium text-gray-900">{item.return}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-center">
            <p className="text-xs text-amber-800">
              <strong>Disclaimer:</strong> Returns are illustrative and based on assumed rates. 
              Mutual fund investments are subject to market risk. Please read scheme documents carefully.
            </p>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default ReturnsCalculator;
