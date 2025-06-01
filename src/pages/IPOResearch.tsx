
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Heart, Share2, Bell, TrendingUp, Calendar, Users } from 'lucide-react';

const IPOResearch = () => {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  const ipoData = {
    companyName: symbol ? `${symbol.toUpperCase()} Ltd.` : 'TechCorp Ltd.',
    symbol: symbol?.toUpperCase() || 'TECH',
    priceRange: '₹280-300',
    lotSize: 50,
    openDate: '2024-01-15',
    closeDate: '2024-01-17',
    listingDate: '2024-01-22',
    issueSize: '₹2,500 Cr'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">IPO Research</h1>
              <p className="text-gray-600 text-sm">AI-powered IPO analysis</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
            >
              <Bell size={16} />
              Set Alert
            </Button>
            <Button 
              variant={isInWatchlist ? "default" : "outline"}
              onClick={() => setIsInWatchlist(!isInWatchlist)}
              className="flex items-center gap-2"
            >
              {isInWatchlist ? <Heart size={16} fill="currentColor" /> : <Plus size={16} />}
              {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
            </Button>
          </div>
        </div>

        {/* IPO Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{ipoData.companyName}</h1>
                <p className="text-gray-600">{ipoData.symbol}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    Open for Subscription
                  </span>
                  <span className="text-sm text-gray-600">
                    {ipoData.openDate} - {ipoData.closeDate}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{ipoData.priceRange}</div>
                <p className="text-gray-600">Price Band</p>
                <div className="mt-2">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Apply Now
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Details */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <div className="text-xl font-bold">{ipoData.issueSize}</div>
              <div className="text-sm text-gray-600">Issue Size</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <div className="text-xl font-bold">{ipoData.lotSize}</div>
              <div className="text-sm text-gray-600">Lot Size</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Calendar className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <div className="text-xl font-bold">{ipoData.listingDate}</div>
              <div className="text-sm text-gray-600">Listing Date</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-orange-600" />
              <div className="text-xl font-bold">8.5/10</div>
              <div className="text-sm text-gray-600">AI Rating</div>
            </CardContent>
          </Card>
        </div>

        {/* AI Analysis */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>AI Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
              <h4 className="font-semibold text-green-800 mb-2">Recommendation: SUBSCRIBE</h4>
              <p className="text-green-700">
                Strong fundamentals with growing market opportunity. Reasonable valuation compared to peers.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <p className="text-sm">Strong revenue growth of 45% CAGR over last 3 years</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <p className="text-sm">Market leader in emerging tech segment</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <p className="text-sm">High valuation compared to traditional players</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Company Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Company Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              TechCorp Ltd. is a leading technology company specializing in AI-driven solutions for enterprises. 
              The company has shown consistent growth and innovation in the rapidly expanding tech sector.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Industry</span>
                  <span className="font-medium">Technology</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Founded</span>
                  <span className="font-medium">2018</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Employees</span>
                  <span className="font-medium">2,500+</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Revenue (FY23)</span>
                  <span className="font-medium">₹1,200 Cr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Net Profit (FY23)</span>
                  <span className="font-medium">₹180 Cr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ROE</span>
                  <span className="font-medium">18.5%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IPOResearch;
