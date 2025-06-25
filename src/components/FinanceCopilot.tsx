
import React, { useState, useEffect } from 'react';
import { MessageCircle, Send, X, Brain, Target, TrendingUp, Shield, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { AssessmentData, calculateHealthScore, HealthScoreData } from '@/utils/healthScore';
import HealthScoreCard from '@/components/HealthScoreCard';

type Message = {
  id: number;
  type: 'bot' | 'user';
  content: string;
  actions?: Array<{ label: string; action: () => void }>;
  data?: any;
};

interface FinanceCopilotProps {
  isOpen?: boolean;
  onToggle?: (open: boolean) => void;
}

const FinanceCopilot = ({ isOpen: externalIsOpen, onToggle }: FinanceCopilotProps) => {
  const navigate = useNavigate();
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const [healthAssessment, setHealthAssessment] = useState<{
    isActive: boolean;
    currentStep: number;
    data: Partial<AssessmentData>;
  }>({
    isActive: false,
    currentStep: 0,
    data: {}
  });

  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  const healthQuestions = [
    {
      field: 'age',
      question: "Let's start with the basics. What's your age?",
      type: 'number',
      placeholder: '28'
    },
    {
      field: 'income',
      question: "What's your annual income in rupees?",
      type: 'number',
      placeholder: '800000'
    },
    {
      field: 'savings',
      question: "How much do you currently have in savings?",
      type: 'number',
      placeholder: '50000'
    },
    {
      field: 'investments',
      question: "What's the current value of your investments?",
      type: 'number',
      placeholder: '100000'
    },
    {
      field: 'insurance',
      question: "Do you have life and health insurance? If yes, what's your total coverage amount?",
      type: 'insurance',
      placeholder: 'Tell me about your insurance'
    },
    {
      field: 'debt',
      question: "Do you have any debt? If yes, what's your total debt amount and monthly EMI?",
      type: 'debt',
      placeholder: 'Tell me about your debt'
    },
    {
      field: 'goals',
      question: "What are your main financial goals? (Emergency fund, Retirement, Home purchase)",
      type: 'goals',
      placeholder: 'Describe your goals'
    },
    {
      field: 'riskTolerance',
      question: "Finally, what's your risk tolerance for investments?",
      type: 'risk',
      actions: [
        { label: "Conservative - Safety first", action: () => updateHealthData('riskTolerance', 'conservative') },
        { label: "Moderate - Balanced approach", action: () => updateHealthData('riskTolerance', 'moderate') },
        { label: "Aggressive - Higher returns", action: () => updateHealthData('riskTolerance', 'aggressive') }
      ]
    }
  ];

  // Initialize welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: 1,
        type: 'bot',
        content: "Hi! I'm DiscvrAI, your financial health assistant. I can conduct a complete financial health assessment, help you set goals, or build portfolios. What would you like to work on today?",
        actions: [
          { label: "Complete Health Assessment", action: () => startHealthAssessment() },
          { label: "Set Financial Goals", action: () => handleQuickAction("I want to set financial goals") },
          { label: "Build Portfolio", action: () => handleQuickAction("Help me build a portfolio") }
        ]
      }]);
    }
  }, []);

  const startHealthAssessment = () => {
    console.log('Starting health assessment...');
    setHealthAssessment({
      isActive: true,
      currentStep: 0,
      data: {}
    });
    
    addMessage('bot', healthQuestions[0].question, 'health_question', {
      step: 0,
      totalSteps: healthQuestions.length,
      question: healthQuestions[0],
      progress: (1 / healthQuestions.length) * 100
    });
  };

  const updateHealthData = (field: string, value: any) => {
    console.log('Updating health data:', field, value);
    const updatedData = { ...healthAssessment.data, [field]: value };
    setHealthAssessment(prev => ({
      ...prev,
      data: updatedData
    }));

    const nextStep = healthAssessment.currentStep + 1;
    
    if (nextStep < healthQuestions.length) {
      setHealthAssessment(prev => ({ ...prev, currentStep: nextStep }));
      
      setTimeout(() => {
        const nextQuestion = healthQuestions[nextStep];
        addMessage('bot', nextQuestion.question, 'health_question', {
          step: nextStep,
          totalSteps: healthQuestions.length,
          question: nextQuestion,
          progress: ((nextStep + 1) / healthQuestions.length) * 100
        });
      }, 500);
    } else {
      // Assessment complete, calculate score
      completeHealthAssessment(updatedData);
    }
  };

  const completeHealthAssessment = (data: Partial<AssessmentData>) => {
    console.log('Completing health assessment with data:', data);
    // Fill in default values for missing data
    const completeData: AssessmentData = {
      age: data.age || 28,
      income: data.income || 800000,
      savings: data.savings || 50000,
      investments: data.investments || 100000,
      insurance: data.insurance || { life: false, health: false, amount: 0 },
      debt: data.debt || { total: 0, emi: 0 },
      goals: data.goals || { emergency: false, retirement: false, home: false },
      riskTolerance: data.riskTolerance || 'moderate'
    };

    // Use the legacy calculateHealthScore function for backwards compatibility
    const healthScore = calculateHealthScoreOld(completeData);
    
    setHealthAssessment({ isActive: false, currentStep: 0, data: {} });
    
    setTimeout(() => {
      addMessage('bot', "🎉 Assessment complete! Here's your Financial Health Score:", 'health_results', {
        score: healthScore,
        assessmentData: completeData
      });
    }, 500);

    // Save to localStorage for later access
    localStorage.setItem('healthScore', JSON.stringify(healthScore));
    localStorage.setItem('assessmentData', JSON.stringify(completeData));
  };

  const handleHealthResponse = (userInput: string) => {
    const currentQuestion = healthQuestions[healthAssessment.currentStep];
    let processedValue: any = userInput;

    // Process the input based on question type
    switch (currentQuestion.type) {
      case 'number':
        processedValue = parseInt(userInput.replace(/[^\d]/g, '')) || 0;
        break;
      case 'insurance':
        // Parse insurance info from text
        const hasLife = userInput.toLowerCase().includes('life');
        const hasHealth = userInput.toLowerCase().includes('health');
        const amountMatch = userInput.match(/[\d,]+/);
        const amount = amountMatch ? parseInt(amountMatch[0].replace(/,/g, '')) : 0;
        processedValue = { life: hasLife, health: hasHealth, amount };
        break;
      case 'debt':
        // Parse debt info from text
        const debtMatch = userInput.match(/[\d,]+/g);
        const total = debtMatch && debtMatch[0] ? parseInt(debtMatch[0].replace(/,/g, '')) : 0;
        const emi = debtMatch && debtMatch[1] ? parseInt(debtMatch[1].replace(/,/g, '')) : 0;
        processedValue = { total, emi };
        break;
      case 'goals':
        // Parse goals from text
        const emergency = userInput.toLowerCase().includes('emergency');
        const retirement = userInput.toLowerCase().includes('retirement');
        const home = userInput.toLowerCase().includes('home');
        processedValue = { emergency, retirement, home };
        break;
    }

    updateHealthData(currentQuestion.field, processedValue);
  };

  useEffect(() => {
    if (externalIsOpen !== undefined && externalIsOpen) {
      setInternalIsOpen(true);
    }
  }, [externalIsOpen]);

  const handleToggle = () => {
    const newState = !isOpen;
    setInternalIsOpen(newState);
    if (onToggle) {
      onToggle(newState);
    }
  };

  const handleQuickAction = (actionMessage: string) => {
    console.log('Quick action:', actionMessage);
    const newUserMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: actionMessage
    };
    
    const botResponse = getBotResponse(actionMessage);
    
    setMessages(prev => [...prev, newUserMessage, botResponse]);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const newUserMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: message
    };
    
    setMessages(prev => [...prev, newUserMessage]);

    // Handle health assessment responses
    if (healthAssessment.isActive) {
      handleHealthResponse(message);
    } else {
      const botResponse = getBotResponse(message);
      setMessages(prev => [...prev, botResponse]);
    }
    
    setMessage('');
  };

  const addMessage = (type: 'bot' | 'user', content: string, action?: string, data?: any) => {
    const newMessage: Message = {
      id: Date.now() + Math.random(),
      type,
      content,
      data
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const getBotResponse = (userMessage: string): Message => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('goal') || msg.includes('save') || msg.includes('retirement') || msg.includes('home')) {
      return {
        id: Date.now() + 1,
        type: 'bot',
        content: "Great! I can help you set up your financial goals. Goals help me create personalized investment strategies and track your progress. What are you saving for?",
        actions: [
          { label: "Complete Goal Setup", action: () => {
            console.log('Navigating to onboarding...');
            navigate('/onboarding');
          }},
          { label: "Home Purchase", action: () => handleQuickAction("I want to save for a home purchase") },
          { label: "Retirement", action: () => handleQuickAction("I want to plan for retirement") },
          { label: "Emergency Fund", action: () => handleQuickAction("I need an emergency fund") }
        ]
      };
    } 
    
    if (msg.includes('portfolio') || msg.includes('invest') || msg.includes('stock') || msg.includes('mutual fund')) {
      return {
        id: Date.now() + 1,
        type: 'bot',
        content: "Perfect! I can help you build a smart portfolio. First, I'll need to understand your goals and risk comfort to recommend the right investments for you.",
        actions: [
          { label: "Start Portfolio Building", action: () => {
            console.log('Navigating to onboarding...');
            navigate('/onboarding');
          }},
          { label: "View Current Portfolio", action: () => {
            console.log('Navigating to portfolio...');
            navigate('/portfolio');
          }}
        ]
      };
    }
    
    if (msg.includes('health') || msg.includes('assess') || msg.includes('score')) {
      return {
        id: Date.now() + 1,
        type: 'bot',
        content: "I'll assess your complete financial health across 4 key areas: Wealth Building, Protection Planning, Debt Optimization, and Goal Achievement. This takes just 2 minutes!",
        actions: [
          { label: "Start Health Assessment", action: () => startHealthAssessment() }
        ]
      };
    }

    return {
      id: Date.now() + 1,
      type: 'bot',
      content: "I can help you with financial goals, portfolio building, or health assessment. What specific aspect of your finances would you like to work on?",
      actions: [
        { label: "Health Assessment", action: () => startHealthAssessment() },
        { label: "Set Goals", action: () => handleQuickAction("I want to set financial goals") },
        { label: "Build Portfolio", action: () => handleQuickAction("Help me build a portfolio") }
      ]
    };
  };

  const renderMessageContent = (message: Message) => {
    if (message.data?.score) {
      return (
        <div className="space-y-4">
          <p className="text-gray-700">{message.content}</p>
          <HealthScoreCard score={message.data.score} showDetails={true} />
          <div className="space-y-2">
            <h4 className="font-semibold">Recommendations:</h4>
            {message.data.score.recommendations.map((rec: string, index: number) => (
              <div key={index} className="flex items-start gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <span>{rec}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={() => {
              console.log('Navigating to health dashboard...');
              navigate('/health-dashboard');
            }}>
              View Dashboard
            </Button>
            <Button size="sm" variant="outline" onClick={() => {
              console.log('Navigating to feed...');
              navigate('/feed');
            }}>
              Get Recommendations
            </Button>
          </div>
        </div>
      );
    }

    if (message.data?.question) {
      return (
        <div className="space-y-3">
          <p className="text-gray-700">{message.content}</p>
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Step {message.data.step + 1} of {message.data.totalSteps}</span>
              <span>{Math.round(message.data.progress)}% complete</span>
            </div>
            <Progress value={message.data.progress} className="h-2" />
          </div>
          {message.data.question.actions && (
            <div className="space-y-2">
              {message.data.question.actions.map((action: any, index: number) => (
                <Button
                  key={index}
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    console.log('Question action clicked:', action.label);
                    action.action();
                  }}
                  className="w-full text-xs"
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      );
    }

    return <p className="text-gray-700">{message.content}</p>;
  };

  return (
    <>
      {/* Floating Copilot Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={handleToggle}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg animate-pulse"
          >
            <Brain size={24} />
          </Button>
          <div className="absolute -top-12 right-0 bg-black text-white text-xs px-2 py-1 rounded opacity-75">
            Complete health assessment in 2 mins
          </div>
        </div>
      )}

      {/* Chat Interface */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[600px] z-40 flex flex-col shadow-2xl">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain size={20} />
                <div>
                  <span className="font-semibold">DiscvrAI Health Assistant</span>
                  <p className="text-xs opacity-90">Complete financial health assessment</p>
                </div>
              </div>
              <Button
                onClick={handleToggle}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <X size={16} />
              </Button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className="space-y-2">
                <div
                  className={`${
                    msg.type === 'user' 
                      ? 'ml-8 bg-blue-100 text-blue-900' 
                      : 'mr-8 bg-gray-100 text-gray-900'
                  } p-3 rounded-lg text-sm`}
                >
                  {msg.type === 'bot' ? renderMessageContent(msg) : msg.content}
                </div>
                {msg.actions && msg.type === 'bot' && !msg.data?.question && (
                  <div className="mr-8 space-y-2">
                    {msg.actions.map((action, index) => (
                      <Button
                        key={index}
                        onClick={() => {
                          console.log('Action button clicked:', action.label);
                          action.action();
                        }}
                        size="sm"
                        variant="outline"
                        className="w-full text-xs h-8"
                      >
                        {action.label}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={healthAssessment.isActive ? "Type your answer..." : "Ask about goals, portfolio..."}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="sm">
              <Send size={16} />
            </Button>
          </div>
        </Card>
      )}
    </>
  );
};

export default FinanceCopilot;
