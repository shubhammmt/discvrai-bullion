
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Bot, TrendingUp, Search, ArrowRight, IndianRupee, 
  PieChart, Upload, MessageSquare, Target, 
  BarChart3, AlertTriangle, FileSpreadsheet,
  Camera, Zap, Heart, Shield
} from 'lucide-react';

const IndiaMarketCopilot = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const sampleQueries = [
    "₹100 से कम में बेहतरीन म्यूचुअल फंड ढूंढें",
    "5% से ज्यादा रिटर्न देने वाले डेट फंड",
    "टेक्नोलॉजी सेक्टर के टॉप परफॉर्मिंग फंड",
    "इस महीने आने वाले नए NFO"
  ];

  const portfolioMetrics = [
    { label: "कुल निवेश", value: "₹8,45,000", change: "+2.4%" },
    { label: "अपेक्षित रिटर्न", value: "12.8%", change: "+0.3%" },
    { label: "जोखिम स्कोर", value: "मध्यम", change: "स्थिर" },
    { label: "विविधीकरण", value: "85%", change: "+5%" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl flex items-center justify-center">
              <Bot className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            आपका व्यक्तिगत निवेश सलाहकार
          </h1>
          
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            AI-संचालित पोर्टफोलियो स्वास्थ्य निगरानी, बुद्धिमान स्क्रीनिंग, और व्यक्तिगत निवेश अंतर्दृष्टि - सब सरल हिंदी में
          </p>
        </div>

        {/* Main Interactive Sections */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          
          {/* Portfolio Health Interactive Section */}
          <Card className="p-8 bg-gradient-to-br from-orange-50 to-white border-2 border-orange-100 hover:border-orange-200 transition-all">
            <CardHeader className="p-0 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <PieChart className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl">पोर्टफोलियो स्वास्थ्य जांच</CardTitle>
                  <p className="text-gray-600">अपने निवेश की निगरानी, विश्लेषण और अनुकूलन करें</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              {/* Sample Portfolio Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {portfolioMetrics.map((metric, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border">
                    <p className="text-sm text-gray-600">{metric.label}</p>
                    <p className="text-xl font-bold text-gray-900">{metric.value}</p>
                    <p className="text-sm text-green-600">{metric.change}</p>
                  </div>
                ))}
              </div>

              {/* Upload Options */}
              <div className="bg-white rounded-lg p-6 border-2 border-dashed border-gray-200 mb-6">
                <div className="text-center">
                  <div className="flex justify-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Upload className="w-6 h-6 text-gray-600" />
                    </div>
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <FileSpreadsheet className="w-6 h-6 text-gray-600" />
                    </div>
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Camera className="w-6 h-6 text-gray-600" />
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">Excel, स्क्रीनशॉट या AI चैट के माध्यम से अपना पोर्टफोलियो अपलोड करें</p>
                  <Button onClick={() => navigate('/india-market')} className="bg-orange-600 hover:bg-orange-700">
                    मेरे पोर्टफोलियो की जांच करें
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Intelligent Screening Section */}
          <Card className="p-8 bg-gradient-to-br from-red-50 to-white border-2 border-red-100 hover:border-red-200 transition-all">
            <CardHeader className="p-0 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <Search className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl">स्मार्ट निवेश खोज</CardTitle>
                  <p className="text-gray-600">सरल हिंदी में निवेश ढूंढें - कोई जटिल शब्दावली नहीं</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              {/* Search Interface */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="उदाहरण: '₹100 से कम के अच्छे रेटिंग वाले फंड ढूंढें'"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-4 pr-12 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none"
                  />
                  <Search className="absolute right-4 top-4 w-6 h-6 text-gray-400" />
                </div>
              </div>

              {/* Sample Queries */}
              <div className="space-y-3 mb-6">
                <p className="text-sm font-medium text-gray-700">ये खोजें आज़माएं:</p>
                {sampleQueries.map((query, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(query)}
                    className="block w-full text-left p-3 bg-white rounded-lg border hover:border-red-200 hover:bg-red-50 transition-all text-sm"
                  >
                    "{query}"
                  </button>
                ))}
              </div>

              <Button onClick={() => navigate('/india-market-bot')} className="w-full bg-red-600 hover:bg-red-700">
                स्मार्ट खोज शुरू करें
                <Zap className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow bg-white">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">स्वास्थ्य निगरानी</h3>
            <p className="text-gray-600 text-sm">व्यक्तिगत अलर्ट और सुझावों के साथ रीयल-टाइम पोर्टफोलियो स्वास्थ्य ट्रैकिंग</p>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow bg-white">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">स्मार्ट वॉचलिस्ट</h3>
            <p className="text-gray-600 text-sm">आपकी प्राथमिकताओं और बाजार के अवसरों के आधार पर AI-क्यूरेटेड वॉचलिस्ट</p>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow bg-white">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">जोखिम प्रबंधन</h3>
            <p className="text-gray-600 text-sm">स्वचालित जोखिम मूल्यांकन और पोर्टफोलियो रीबैलेंसिंग सुझाव</p>
          </Card>
        </div>

        {/* AI Assistant CTA */}
        <Card className="bg-gradient-to-r from-orange-900 to-red-900 text-white p-8 text-center">
          <div className="max-w-3xl mx-auto">
            <Bot className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl font-bold mb-4">क्या आप अपने AI निवेश सलाहकार से मिलने के लिए तैयार हैं?</h2>
            <p className="text-xl text-gray-300 mb-8">
              व्यक्तिगत निवेश सलाह, पोर्टफोलियो विश्लेषण, और बाजार की अंतर्दृष्टि प्राप्त करें - सब प्राकृतिक बातचीत के माध्यम से
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                onClick={() => navigate('/india-market')} 
                className="px-8 py-4 bg-white text-orange-900 hover:bg-gray-100"
              >
                <BarChart3 className="mr-2" size={20} />
                मेरे पोर्टफोलियो का विश्लेषण करें
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => navigate('/india-market-bot')} 
                className="px-8 py-4 border-white text-white hover:bg-white hover:text-orange-900"
              >
                <MessageSquare className="mr-2" size={20} />
                AI सलाहकार से चैट करें
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default IndiaMarketCopilot;
