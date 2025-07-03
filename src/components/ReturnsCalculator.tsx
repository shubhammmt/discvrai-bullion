
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Calculator, TrendingUp } from 'lucide-react';
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
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('10Y');
  const [calculatedReturns, setCalculatedReturns] = useState({
    totalInvestment: 0,
    maturityAmount: 0,
    profit: 0,
    absoluteReturn: 0
  });

  const timePeriods = [
    { label: '1Y', years: 1 },
    { label: '3Y', years: 3 },
    { label: '5Y', years: 5 },
    { label: '10Y', years: 10 },
    { label: '15Y', years: 15 },
    { label: '20Y', years: 20 }
  ];

  const calculateReturns = (period = investmentPeriod) => {
    let totalInvestment = 0;
    let maturityAmount = 0;

    if (investmentType === 'sip') {
      totalInvestment = monthlyAmount * 12 * period;
      const monthlyRate = expectedReturn / 100 / 12;
      const totalMonths = period * 12;
      
      // SIP formula: M = P × [{(1 + i)^n - 1} / i] × (1 + i)
      maturityAmount = monthlyAmount * (((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate));
    } else {
      totalInvestment = lumpAmount;
      // Compound interest formula: A = P(1 + r)^t
      maturityAmount = lumpAmount * Math.pow(1 + expectedReturn / 100, period);
    }

    const profit = maturityAmount - totalInvestment;
    const absoluteReturn = (profit / totalInvestment) * 100;

    return {
      totalInvestment,
      maturityAmount,
      profit,
      absoluteReturn
    };
  };

  useEffect(() => {
    const returns = calculateReturns();
    setCalculatedReturns(returns);
  }, [investmentType, monthlyAmount, lumpAmount, investmentPeriod, expectedReturn]);

  // Calculate comparison data for chart with distinct colors
  const getComparisonData = (period = investmentPeriod) => {
    const bankReturn = 4; // Bank FD rate
    const goldReturn = 8; // Gold average return
    
    let bankAmount = 0;
    let goldAmount = 0;
    let fundAmount = 0;

    if (investmentType === 'sip') {
      const totalInvestment = monthlyAmount * 12 * period;
      
      // Bank
      const bankMonthlyRate = bankReturn / 100 / 12;
      const totalMonths = period * 12;
      bankAmount = monthlyAmount * (((Math.pow(1 + bankMonthlyRate, totalMonths) - 1) / bankMonthlyRate) * (1 + bankMonthlyRate));
      
      // Gold
      const goldMonthlyRate = goldReturn / 100 / 12;
      goldAmount = monthlyAmount * (((Math.pow(1 + goldMonthlyRate, totalMonths) - 1) / goldMonthlyRate) * (1 + goldMonthlyRate));
      
      // Fund
      const fundMonthlyRate = expectedReturn / 100 / 12;
      fundAmount = monthlyAmount * (((Math.pow(1 + fundMonthlyRate, totalMonths) - 1) / fundMonthlyRate) * (1 + fundMonthlyRate));
    } else {
      const investment = lumpAmount;
      bankAmount = investment * Math.pow(1 + bankReturn / 100, period);
      goldAmount = investment * Math.pow(1 + goldReturn / 100, period);
      fundAmount = investment * Math.pow(1 + expectedReturn / 100, period);
    }

    return [
      { 
        name: 'Bank', 
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
        name: 'Benchmark', 
        value: (bankAmount + goldAmount) / 2 / 100000, 
        return: benchmarkReturn,
        color: '#6b7280' // Gray
      },
      { 
        name: 'This Fund', 
        value: fundAmount / 100000, 
        return: expectedReturn,
        color: '#10b981' // Emerald
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

  const handleTimePeriodChange = (period: string) => {
    setSelectedTimePeriod(period);
    const selectedPeriod = timePeriods.find(tp => tp.label === period);
    if (selectedPeriod) {
      setInvestmentPeriod(selectedPeriod.years);
    }
  };

  const currentPeriod = timePeriods.find(tp => tp.label === selectedTimePeriod)?.years || investmentPeriod;
  const comparisonData = getComparisonData(currentPeriod);

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-white/20">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-blue-600" />
          Returns Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Investment Type Toggle */}
        <div>
          <label className="block text-sm font-medium mb-2">Investment type</label>
          <div className="flex border rounded-lg overflow-hidden bg-gray-50">
            <button
              onClick={() => setInvestmentType('sip')}
              className={`flex-1 py-2 px-4 text-sm font-medium transition-colors ${
                investmentType === 'sip'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-transparent text-gray-700 hover:bg-gray-100'
              }`}
            >
              Monthly SIP
            </button>
            <button
              onClick={() => setInvestmentType('lumpsum')}
              className={`flex-1 py-2 px-4 text-sm font-medium transition-colors ${
                investmentType === 'lumpsum'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-transparent text-gray-700 hover:bg-gray-100'
              }`}
            >
              Lumpsum
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          {/* Input Section */}
          <div className="space-y-4">
            {/* Investment Amount */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {investmentType === 'sip' ? 'Monthly investment' : 'Investment amount'}
              </label>
              <div className="space-y-2">
                <div className="text-xl font-bold text-gray-900">
                  ₹{investmentType === 'sip' ? monthlyAmount.toLocaleString() : lumpAmount.toLocaleString()}
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
              </div>
            </div>

            {/* Investment Summary */}
            <div className="space-y-2 bg-gray-50 rounded-lg p-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Total investment</span>
                <span className="font-semibold">{formatAmount(calculatedReturns.totalInvestment)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Profit</span>
                <span className="font-semibold text-green-600">{formatAmount(calculatedReturns.profit)}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total corpus</span>
                  <span className="text-lg font-bold">{formatAmount(calculatedReturns.maturityAmount)}</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="flex items-center gap-1 text-green-600 text-sm">
                    <TrendingUp size={14} />
                    Absolute return
                  </span>
                  <span className="text-green-600 font-semibold text-sm">
                    {calculatedReturns.absoluteReturn.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="space-y-3">
            {/* Comparison Chart */}
            <div className="h-40 bg-gray-50 rounded-lg p-3">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData}>
                  <XAxis 
                    dataKey="name" 
                    fontSize={11}
                    tick={{ fill: '#6b7280' }}
                  />
                  <YAxis 
                    fontSize={11}
                    tick={{ fill: '#6b7280' }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {comparisonData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Time Period Selection */}
            <div className="flex justify-center gap-1">
              {timePeriods.map((period) => (
                <Button
                  key={period.label}
                  variant={selectedTimePeriod === period.label ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleTimePeriodChange(period.label)}
                  className="h-7 px-3 text-xs"
                >
                  {period.label}
                </Button>
              ))}
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-1 text-xs">
              {comparisonData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-2 h-2 rounded" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-600 truncate">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-xs text-gray-500 bg-yellow-50 p-2 rounded-lg border border-yellow-200">
          <strong>Disclaimer:</strong> These calculations are based on assumed returns and are for illustrative purposes only. 
          Actual returns may vary based on market conditions.
        </div>
      </CardContent>
    </Card>
  );
};

export default ReturnsCalculator;
