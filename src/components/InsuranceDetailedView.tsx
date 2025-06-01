
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, TrendingUp, Users, Calculator, CheckCircle, AlertTriangle } from 'lucide-react';

const InsuranceDetailedView = () => {
  return (
    <div className="space-y-6">
      {/* Coverage Analysis */}
      <Card className="bg-white/70 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-red-600" />
            Coverage Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Life Coverage</span>
                <span className="font-semibold">₹1 Crore</span>
              </div>
              <div className="flex justify-between">
                <span>Accidental Death Benefit</span>
                <span className="font-semibold">₹1 Crore</span>
              </div>
              <div className="flex justify-between">
                <span>Terminal Illness Benefit</span>
                <span className="font-semibold">₹50 Lakhs</span>
              </div>
              <div className="flex justify-between">
                <span>Waiver of Premium</span>
                <span className="font-semibold text-green-600">Included</span>
              </div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Coverage Adequacy</h4>
              <div className="text-2xl font-bold text-red-600 mb-2">85%</div>
              <p className="text-sm text-gray-600">
                Based on your income and dependents, this coverage meets 85% of your insurance needs.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Premium Calculator */}
      <Card className="bg-white/70 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-blue-600" />
            Premium Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Age</label>
                <input 
                  type="number" 
                  defaultValue={30}
                  className="w-full p-3 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Coverage Amount</label>
                <select className="w-full p-3 border rounded-lg">
                  <option>₹50 Lakhs</option>
                  <option>₹1 Crore</option>
                  <option>₹2 Crore</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Policy Term</label>
                <select className="w-full p-3 border rounded-lg">
                  <option>20 Years</option>
                  <option>30 Years</option>
                  <option>40 Years</option>
                </select>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Annual Premium</h4>
                <div className="text-3xl font-bold text-red-600">₹12,000</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Tax Savings</h4>
                <div className="text-xl font-bold text-green-600">₹3,600</div>
                <div className="text-sm text-gray-600">Under Section 80C</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Riders & Add-ons */}
      <Card className="bg-white/70 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle>Available Riders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: 'Critical Illness Rider', premium: '₹2,400/year', coverage: '₹25 Lakhs' },
              { name: 'Accidental Death Benefit', premium: '₹800/year', coverage: '₹1 Crore' },
              { name: 'Disability Income Rider', premium: '₹1,200/year', coverage: '₹10,000/month' },
              { name: 'Premium Waiver Rider', premium: '₹600/year', coverage: 'Full Premium' }
            ].map((rider, index) => (
              <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{rider.name}</div>
                  <div className="text-sm text-gray-600">{rider.coverage}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{rider.premium}</div>
                  <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InsuranceDetailedView;
