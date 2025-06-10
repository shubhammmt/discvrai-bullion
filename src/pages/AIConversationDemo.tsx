
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Brain, TrendingUp, AlertCircle, PlusCircle, BarChart3, PieChart, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell } from 'recharts';

const AIConversationDemo = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hi! I noticed you've been researching mutual funds. Would you like me to analyze your current portfolio and suggest optimizations?",
      timestamp: '10:30 AM'
    }
  ]);

  const conversationFlow = [
    {
      userMessage: "Yes, please analyze my portfolio and suggest improvements",
      botResponse: "Perfect! I can see your current portfolio. Let me analyze your asset allocation and performance...",
      action: "portfolio_analysis",
      data: {
        chart: "pie",
        title: "Current Portfolio Allocation",
        data: [
          { name: 'Equity Mutual Funds', value: 45, color: '#3b82f6' },
          { name: 'Debt Funds', value: 25, color: '#10b981' },
          { name: 'Gold ETF', value: 15, color: '#f59e0b' },
          { name: 'Cash', value: 15, color: '#6b7280' }
        ]
      }
    },
    {
      userMessage: "What do you think about my allocation?",
      botResponse: "Your allocation shows room for improvement. Based on your 28-year age and moderate risk profile, I recommend increasing equity exposure. Here's your performance vs benchmark:",
      action: "performance_analysis",
      data: {
        chart: "line",
        title: "Portfolio Performance vs Benchmark",
        data: [
          { month: 'Jan', portfolio: 8.2, benchmark: 9.1 },
          { month: 'Feb', portfolio: 12.5, benchmark: 11.8 },
          { month: 'Mar', portfolio: 15.3, benchmark: 16.2 },
          { month: 'Apr', portfolio: 18.7, benchmark: 19.4 },
          { month: 'May', portfolio: 22.1, benchmark: 23.5 },
          { month: 'Jun', portfolio: 25.8, benchmark: 27.2 }
        ]
      }
    },
    {
      userMessage: "Can you suggest specific funds to add?",
      botResponse: "Based on your portfolio gap analysis, I recommend adding these funds. Shall I help you invest ₹10,000 monthly across these recommendations?",
      action: "fund_recommendations",
      data: {
        recommendations: [
          { name: "HDFC Mid-Cap Opportunities", allocation: "40%", amount: "₹4,000", reason: "Fill mid-cap exposure gap" },
          { name: "Axis Bluechip Fund", allocation: "35%", amount: "₹3,500", reason: "Strong large-cap performer" },
          { name: "SBI Small Cap Fund", allocation: "25%", amount: "₹2,500", reason: "Small-cap growth potential" }
        ]
      }
    },
    {
      userMessage: "Yes, please help me invest. Also set up alerts for any important changes.",
      botResponse: "Excellent! I've initiated your SIP setup and configured smart alerts. Here's what I've set up for you:",
      action: "investment_execution",
      data: {
        alerts: [
          { type: "Portfolio Rebalancing", description: "Alert when allocation deviates >5% from target", icon: BarChart3 },
          { type: "Fund Performance", description: "Notify if any fund underperforms benchmark for 3+ months", icon: TrendingUp },
          { type: "Market Opportunities", description: "Alert during market dips for additional investment", icon: AlertCircle },
          { type: "Goal Tracking", description: "Monthly progress updates on your ₹1Cr retirement goal", icon: Bell }
        ]
      }
    }
  ];

  const addMessage = (type: 'user' | 'bot', content: string, action?: string, data?: any) => {
    const newMessage = {
      id: messages.length + 1,
      type,
      content,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      action,
      data
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const nextStep = () => {
    if (currentStep < conversationFlow.length) {
      const step = conversationFlow[currentStep];
      
      // Add user message
      setTimeout(() => {
        addMessage('user', step.userMessage);
      }, 500);
      
      // Add bot response with data
      setTimeout(() => {
        addMessage('bot', step.botResponse, step.action, step.data);
      }, 1500);
      
      setCurrentStep(prev => prev + 1);
    }
  };

  const renderChart = (data: any) => {
    if (data.chart === 'pie') {
      return (
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={data.data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {data.data.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      );
    }
    
    if (data.chart === 'line') {
      return (
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `${value}%`} />
              <Line type="monotone" dataKey="portfolio" stroke="#3b82f6" strokeWidth={3} name="Your Portfolio" />
              <Line type="monotone" dataKey="benchmark" stroke="#10b981" strokeWidth={3} name="Benchmark" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      );
    }
  };

  const renderMessageContent = (message: any) => {
    if (message.action === 'portfolio_analysis' && message.data) {
      return (
        <div className="space-y-4">
          <p className="text-gray-700">{message.content}</p>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{message.data.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {renderChart(message.data)}
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                {message.data.data.map((item: any, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: item.color }}></div>
                    <span>{item.name}: {item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    if (message.action === 'performance_analysis' && message.data) {
      return (
        <div className="space-y-4">
          <p className="text-gray-700">{message.content}</p>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{message.data.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {renderChart(message.data)}
              <div className="mt-4 text-sm text-gray-600">
                <p>• Your portfolio: +25.8% YTD</p>
                <p>• Benchmark (Nifty 50): +27.2% YTD</p>
                <p>• Underperformance: -1.4%</p>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    if (message.action === 'fund_recommendations' && message.data) {
      return (
        <div className="space-y-4">
          <p className="text-gray-700">{message.content}</p>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recommended SIP Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {message.data.recommendations.map((fund: any, index: number) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{fund.name}</p>
                      <p className="text-sm text-gray-600">{fund.reason}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-blue-600">{fund.amount}</p>
                      <p className="text-sm text-gray-500">{fund.allocation}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm"><strong>Total Monthly SIP:</strong> ₹10,000</p>
                <p className="text-sm text-gray-600">Expected returns: 12-15% annually</p>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    if (message.action === 'investment_execution' && message.data) {
      return (
        <div className="space-y-4">
          <p className="text-gray-700">{message.content}</p>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-green-600" />
                SIP Setup Complete
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p>✅ Monthly SIP of ₹10,000 activated</p>
                <p>✅ Auto-debit set for 5th of every month</p>
                <p>✅ Portfolio rebalancing enabled</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="w-5 h-5 text-orange-600" />
                Smart Alerts Configured
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {message.data.alerts.map((alert: any, index: number) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <alert.icon className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium">{alert.type}</p>
                      <p className="text-sm text-gray-600">{alert.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return <p className="text-gray-700">{message.content}</p>;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
            </div>
            <h1 className="text-xl font-semibold">AI Conversation Demo</h1>
          </div>

          <div className="text-sm text-gray-500">
            Interactive Demo
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        {/* Chat Interface */}
        <Card className="h-[600px] flex flex-col">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-3">
              <Brain className="w-6 h-6" />
              <div>
                <div className="text-lg">DiscvrAI Assistant</div>
                <div className="text-sm opacity-90">Your intelligent finance copilot</div>
              </div>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-3xl rounded-lg p-4 ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white ml-8'
                      : 'bg-white border border-gray-200 mr-8'
                  }`}
                >
                  {message.type === 'bot' ? renderMessageContent(message) : (
                    <p>{message.content}</p>
                  )}
                  <div className={`text-xs mt-2 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                    {message.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
          
          <div className="p-4 border-t bg-gray-50">
            {currentStep < conversationFlow.length ? (
              <Button onClick={nextStep} className="w-full">
                Continue Conversation ({currentStep + 1}/{conversationFlow.length})
              </Button>
            ) : (
              <div className="text-center">
                <p className="text-gray-600 mb-3">Demo Complete! This shows how users interact with our AI for:</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-blue-600" />
                    Portfolio Analysis
                  </div>
                  <div className="flex items-center gap-2">
                    <PlusCircle className="w-4 h-4 text-green-600" />
                    Investment Execution
                  </div>
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-orange-600" />
                    Smart Alerts
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-purple-600" />
                    Performance Tracking
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AIConversationDemo;
