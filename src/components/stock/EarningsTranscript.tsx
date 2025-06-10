
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Calendar, TrendingUp } from 'lucide-react';

const EarningsTranscript = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-green-600" />
          Latest Earnings Call Highlights (Q3 FY24)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Calendar size={16} />
            <span>January 12, 2024 | Duration: 45 minutes</span>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
            <h4 className="font-semibold text-gray-900 mb-2">CEO Key Highlights</h4>
            <p className="text-sm text-gray-700 mb-2">
              "This quarter demonstrates our continued market leadership with 12.8% revenue growth. 
              Our AI and cloud transformation services are seeing unprecedented demand."
            </p>
            <ul className="text-sm text-gray-700 list-disc pl-4 space-y-1">
              <li>Signed 5 new large deals worth ₹2,500+ Cr</li>
              <li>AI-powered services revenue up 45% YoY</li>
              <li>Expanding into emerging markets with 3 new centers</li>
            </ul>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
            <h4 className="font-semibold text-gray-900 mb-2">CFO Financial Outlook</h4>
            <p className="text-sm text-gray-700 mb-2">
              "Strong cash generation continues with ₹18,200 Cr free cash flow. 
              We're maintaining our industry-leading margins while investing in future growth."
            </p>
            <ul className="text-sm text-gray-700 list-disc pl-4 space-y-1">
              <li>Operating margin improved to 25.2% (+80 bps)</li>
              <li>Dividend payout ratio maintained at 35%</li>
              <li>Guidance raised for FY24: 14-16% revenue growth</li>
            </ul>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
            <h4 className="font-semibold text-gray-900 mb-2">Key Analyst Questions</h4>
            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium text-gray-800">Q: Impact of AI on traditional services?</p>
                <p className="text-sm text-gray-700">A: AI is augmenting our capabilities, increasing efficiency by 25% while creating new revenue streams.</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Q: Geographic expansion plans?</p>
                <p className="text-sm text-gray-700">A: Focus on Nordic markets and Latin America with 2-3 new delivery centers planned.</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
            <TrendingUp size={16} className="text-blue-600" />
            <span className="text-sm font-medium text-gray-900">Management Sentiment: </span>
            <span className="text-sm text-green-600 font-medium">Highly Optimistic</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EarningsTranscript;
