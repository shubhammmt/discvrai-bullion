import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  TrendingUp, 
  Calculator, 
  Target, 
  Award, 
  BookOpen, 
  BarChart3,
  DollarSign,
  PieChart,
  LineChart,
  CheckCircle,
  XCircle,
  Brain,
  Trophy,
  Star,
  Zap
} from 'lucide-react';
import cfaHeroImage from '@/assets/cfa-equity-hero.jpg';
import financialAnalysisImage from '@/assets/financial-analysis.jpg';
import equityTradingImage from '@/assets/equity-trading.jpg';

interface Question {
  id: number;
  category: string;
  level: 'CFA I' | 'CFA II';
  question: string;
  type: 'multiple-choice' | 'calculation' | 'scenario';
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  formula?: string;
  context?: string;
  points: number;
}

const questions: Question[] = [
  {
    id: 1,
    category: "Financial Statement Analysis",
    level: "CFA I",
    question: "ABC Corp has Current Assets of $500M, Current Liabilities of $300M, and Inventory of $150M. What is the Quick Ratio?",
    type: "calculation",
    correctAnswer: 1.17,
    explanation: "Quick Ratio = (Current Assets - Inventory) / Current Liabilities = ($500M - $150M) / $300M = 1.17",
    formula: "Quick Ratio = (Current Assets - Inventory) / Current Liabilities",
    points: 10
  },
  {
    id: 2,
    category: "Equity Valuation",
    level: "CFA II",
    question: "Which valuation method is most appropriate for a mature, dividend-paying utility company?",
    type: "multiple-choice",
    options: [
      "Discounted Cash Flow (DCF)",
      "Dividend Discount Model (DDM)",
      "Price-to-Earnings (P/E) Multiple",
      "Asset-based Valuation"
    ],
    correctAnswer: "Dividend Discount Model (DDM)",
    explanation: "For mature, dividend-paying companies with stable cash flows like utilities, DDM is most appropriate as it values the company based on expected future dividends.",
    points: 15
  },
  {
    id: 3,
    category: "Industry Analysis",
    level: "CFA I",
    question: "In Porter's Five Forces framework, which factor would most negatively impact profitability in the smartphone industry?",
    type: "multiple-choice",
    options: [
      "Low threat of new entrants",
      "High bargaining power of suppliers",
      "Intense rivalry among competitors",
      "Low threat of substitutes"
    ],
    correctAnswer: "Intense rivalry among competitors",
    explanation: "The smartphone industry has intense competition among major players (Apple, Samsung, Google, etc.), which drives down prices and margins.",
    points: 10
  },
  {
    id: 4,
    category: "Financial Ratios",
    level: "CFA I",
    question: "XYZ Company has ROE of 15%, Debt-to-Equity ratio of 0.5, and Tax Rate of 25%. If ROA is 12%, what is the Interest Coverage Ratio?",
    type: "calculation",
    correctAnswer: 6.0,
    explanation: "Using DuPont: ROE = ROA × Equity Multiplier × (1 - Tax Rate). Working backwards: Interest Coverage = EBIT/Interest = 6.0",
    formula: "ROE = (Net Income/Sales) × (Sales/Assets) × (Assets/Equity)",
    points: 20
  },
  {
    id: 5,
    category: "Equity Valuation",
    level: "CFA II",
    question: "TechCorp is expected to grow at 25% for 3 years, then 15% for 2 years, then 5% perpetually. Current EPS is $2.00. Using a 12% discount rate, what's the intrinsic value per share?",
    type: "calculation",
    correctAnswer: 85.5,
    explanation: "Multi-stage DDM calculation: Year 1-3 at 25% growth, Year 4-5 at 15%, then 5% terminal growth. PV of all future dividends = $85.50",
    formula: "P0 = Σ(D_t/(1+r)^t) + P_n/(1+r)^n",
    context: "Assume 40% payout ratio and dividends grow at same rate as earnings",
    points: 25
  },
  {
    id: 6,
    category: "Market Efficiency",
    level: "CFA I",
    question: "If markets are semi-strong form efficient, which statement is TRUE?",
    type: "multiple-choice",
    options: [
      "Technical analysis can generate excess returns",
      "Fundamental analysis cannot generate excess returns",
      "Insider trading can generate excess returns",
      "No strategy can generate excess returns"
    ],
    correctAnswer: "Insider trading can generate excess returns",
    explanation: "In semi-strong form efficiency, all public information is reflected in prices, so only private (insider) information can generate excess returns.",
    points: 10
  },
  {
    id: 7,
    category: "Risk Analysis",
    level: "CFA II",
    question: "Stock A has a beta of 1.5, risk-free rate is 3%, and market return is 10%. What is Stock A's required return using CAPM?",
    type: "calculation",
    correctAnswer: 13.5,
    explanation: "Required Return = Risk-free Rate + Beta × (Market Return - Risk-free Rate) = 3% + 1.5 × (10% - 3%) = 13.5%",
    formula: "R_i = R_f + β_i(R_m - R_f)",
    points: 15
  },
  {
    id: 8,
    category: "Growth Models",
    level: "CFA II",
    question: "A company with sustainable growth rate of 8% wants to grow at 12%. What must it do?",
    type: "multiple-choice",
    options: [
      "Increase dividend payout ratio",
      "Decrease financial leverage",
      "Issue new equity or increase leverage",
      "Reduce profit margins"
    ],
    correctAnswer: "Issue new equity or increase leverage",
    explanation: "Sustainable growth = ROE × Retention Ratio. To exceed this, the company needs external financing (equity or debt).",
    points: 15
  }
];

const CFAEquityChallenge = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [calculationInput, setCalculationInput] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(new Array(questions.length).fill(false));
  const [userAnswers, setUserAnswers] = useState<(string | number)[]>(new Array(questions.length).fill(''));
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = () => {
    const question = questions[currentQuestion];
    const userAnswer = question.type === 'calculation' 
      ? parseFloat(calculationInput) 
      : selectedAnswer;

    const isCorrect = question.type === 'calculation'
      ? Math.abs(parseFloat(calculationInput) - Number(question.correctAnswer)) < 0.1
      : selectedAnswer === question.correctAnswer;

    if (isCorrect) {
      setScore(score + question.points);
    }

    setUserAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[currentQuestion] = userAnswer;
      return newAnswers;
    });

    setAnsweredQuestions(prev => {
      const newAnswered = [...prev];
      newAnswered[currentQuestion] = true;
      return newAnswered;
    });

    setShowResult(true);
  };

  const nextQuestion = () => {
    setShowResult(false);
    setSelectedAnswer('');
    setCalculationInput('');
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const resetChallenge = () => {
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setCalculationInput('');
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions(new Array(questions.length).fill(false));
    setUserAnswers(new Array(questions.length).fill(''));
    setTimeElapsed(0);
  };

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + (showResult ? 1 : 0)) / questions.length) * 100;
  const isCorrect = question.type === 'calculation'
    ? Math.abs(parseFloat(calculationInput) - Number(question.correctAnswer)) < 0.1
    : selectedAnswer === question.correctAnswer;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Financial Statement Analysis': return <BarChart3 className="w-4 h-4" />;
      case 'Equity Valuation': return <Calculator className="w-4 h-4" />;
      case 'Industry Analysis': return <PieChart className="w-4 h-4" />;
      case 'Financial Ratios': return <LineChart className="w-4 h-4" />;
      case 'Market Efficiency': return <TrendingUp className="w-4 h-4" />;
      case 'Risk Analysis': return <Target className="w-4 h-4" />;
      case 'Growth Models': return <DollarSign className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  if (currentQuestion >= questions.length && showResult) {
    const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
    const percentage = Math.round((score / totalPoints) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-blue-500/30 shadow-2xl bg-slate-800/50 backdrop-blur">
            <CardHeader className="text-center bg-gradient-to-r from-blue-600/20 to-purple-600/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
              <div className="relative">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Trophy className="w-8 h-8 text-yellow-400" />
                  <CardTitle className="text-3xl font-bold text-white">CFA Challenge Complete!</CardTitle>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400">{score}</div>
                    <div className="text-sm text-slate-300">Total Points</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400">{percentage}%</div>
                    <div className="text-sm text-slate-300">Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400">{formatTime(timeElapsed)}</div>
                    <div className="text-sm text-slate-300">Time Taken</div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 bg-slate-800/30">
              <div className="text-center mb-6">
                <Badge 
                  variant={percentage >= 70 ? "default" : "secondary"} 
                  className={`text-lg px-4 py-2 ${
                    percentage >= 90 ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' :
                    percentage >= 70 ? 'bg-green-500/20 text-green-300 border-green-500/30' :
                    'bg-slate-500/20 text-slate-300 border-slate-500/30'
                  }`}
                >
                  {percentage >= 90 ? (
                    <><Trophy className="w-4 h-4 mr-2" />CFA Expert!</>
                  ) : percentage >= 70 ? (
                    <><Star className="w-4 h-4 mr-2" />Strong Candidate</>
                  ) : (
                    <><BookOpen className="w-4 h-4 mr-2" />Needs More Study</>
                  )}
                </Badge>
              </div>
              
              <div className="space-y-4 mb-6">
                <h3 className="text-xl font-semibold flex items-center gap-2 text-white">
                  <Brain className="w-5 h-5 text-blue-400" />
                  Performance Breakdown
                </h3>
                {questions.map((q, index) => {
                  const userAnswer = userAnswers[index];
                  const correct = q.type === 'calculation'
                    ? Math.abs(Number(userAnswer) - Number(q.correctAnswer)) < 0.1
                    : userAnswer === q.correctAnswer;
                  
                  return (
                    <div key={q.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-600/50 bg-slate-700/30">
                      <div className="flex items-center gap-3">
                        <div className="text-blue-400">{getCategoryIcon(q.category)}</div>
                        <div>
                          <div className="font-medium text-white">{q.category}</div>
                          <div className="text-sm text-slate-400">{q.level} • {q.points} points</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {correct ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-400" />
                        )}
                        <Badge 
                          variant={correct ? "default" : "secondary"}
                          className={correct ? 
                            'bg-green-500/20 text-green-300 border-green-500/30' : 
                            'bg-slate-500/20 text-slate-400 border-slate-500/30'
                          }
                        >
                          {correct ? `+${q.points}` : '0'}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col gap-4 items-center">
                <Button 
                  onClick={resetChallenge} 
                  size="lg" 
                  className="px-8 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Take Challenge Again
                </Button>
                
                <div className="text-center space-y-2">
                  <p className="text-slate-300 text-sm">Want more challenges?</p>
                  <div className="flex gap-2 flex-wrap justify-center">
                    <Button variant="outline" size="sm" className="border-blue-500/30 text-blue-300 hover:bg-blue-500/20">
                      Fixed Income Challenge
                    </Button>
                    <Button variant="outline" size="sm" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/20">
                      Derivatives Challenge
                    </Button>
                    <Button variant="outline" size="sm" className="border-green-500/30 text-green-300 hover:bg-green-500/20">
                      Portfolio Management
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div 
          className="relative mb-6 rounded-2xl overflow-hidden border-2 border-blue-500/30 shadow-2xl"
          style={{
            backgroundImage: `url(${cfaHeroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-800/80 to-slate-900/90"></div>
          <Card className="relative bg-transparent border-0 shadow-none">
            <CardHeader className="relative z-10 text-center py-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <TrendingUp className="w-10 h-10 text-blue-400" />
                <div className="text-center">
                  <CardTitle className="text-4xl font-bold text-white mb-2">CFA Equity Research Challenge</CardTitle>
                  <p className="text-slate-300 text-lg">Master the fundamentals of equity analysis</p>
                </div>
              </div>
              
              <div className="flex justify-center gap-8 mt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">{score}</div>
                  <div className="text-sm text-slate-300">Points</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">{formatTime(timeElapsed)}</div>
                  <div className="text-sm text-slate-300">Time</div>
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <div className="flex justify-between text-sm text-slate-300">
                  <span>Progress: {currentQuestion + 1} of {questions.length}</span>
                  <span className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    Question {currentQuestion + 1}
                  </span>
                </div>
                <Progress value={progress} className="h-3 bg-slate-700" />
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Question Card */}
        <Card className="border-2 border-blue-500/30 shadow-2xl bg-slate-800/50 backdrop-blur">
          <CardHeader className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <img 
                src={currentQuestion % 2 === 0 ? financialAnalysisImage : equityTradingImage} 
                alt="Financial background" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="text-blue-400">{getCategoryIcon(question.category)}</div>
                  <Badge variant="outline" className="border-slate-500/50 text-slate-200 bg-slate-700/50">
                    {question.category}
                  </Badge>
                  <Badge 
                    variant={question.level === 'CFA I' ? 'default' : 'secondary'}
                    className={question.level === 'CFA I' ? 
                      'bg-blue-500/20 text-blue-300 border-blue-500/30' : 
                      'bg-purple-500/20 text-purple-300 border-purple-500/30'
                    }
                  >
                    {question.level}
                  </Badge>
                </div>
                <Badge variant="outline" className="border-yellow-500/50 text-yellow-300 font-semibold bg-yellow-500/10">
                  <Star className="w-3 h-3 mr-1" />
                  {question.points} points
                </Badge>
              </div>
            
              {question.context && (
                <div className="mt-3 p-3 bg-slate-700/50 rounded-lg border-l-4 border-blue-500">
                  <p className="text-sm text-slate-300">
                    <strong className="text-blue-300">Context:</strong> {question.context}
                  </p>
                </div>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="p-6 bg-slate-800/30">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4 text-white">{question.question}</h2>
              
              {question.formula && (
                <div className="mb-4 p-3 bg-blue-900/30 rounded-lg border border-blue-500/30">
                  <p className="text-sm font-medium text-blue-200">
                    <Calculator className="w-4 h-4 inline mr-2" />
                    Formula: <code className="bg-blue-800/50 px-2 py-1 rounded text-blue-100 font-mono">{question.formula}</code>
                  </p>
                </div>
              )}
            </div>

            {!showResult && (
              <div className="space-y-4">
                {question.type === 'multiple-choice' && question.options && (
                  <div className="space-y-3">
                    {question.options.map((option, index) => (
                      <Button
                        key={index}
                        variant={selectedAnswer === option ? "default" : "outline"}
                        className={`w-full text-left justify-start h-auto p-4 transition-all ${
                          selectedAnswer === option 
                            ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-500' 
                            : 'bg-slate-700/50 hover:bg-slate-600/50 text-slate-200 border-slate-600/50 hover:border-slate-500'
                        }`}
                        onClick={() => setSelectedAnswer(option)}
                      >
                        <span className="font-medium mr-3 text-blue-300">{String.fromCharCode(65 + index)}.</span>
                        {option}
                      </Button>
                    ))}
                  </div>
                )}

                {question.type === 'calculation' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calculator className="w-5 h-5 text-blue-400" />
                      <label className="font-medium text-white">Enter your calculation result:</label>
                    </div>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Enter numerical answer (e.g., 1.17)"
                      value={calculationInput}
                      onChange={(e) => setCalculationInput(e.target.value)}
                      className="text-lg font-mono bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-blue-500"
                    />
                    <p className="text-sm text-slate-400">
                      Round to 2 decimal places where applicable
                    </p>
                  </div>
                )}

                <Button
                  onClick={handleAnswer}
                  disabled={
                    (question.type === 'multiple-choice' && !selectedAnswer) ||
                    (question.type === 'calculation' && !calculationInput)
                  }
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white disabled:bg-slate-600 disabled:text-slate-400"
                  size="lg"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Submit Answer
                </Button>
              </div>
            )}

            {showResult && (
              <div className={`p-6 rounded-lg border-2 ${
                isCorrect 
                  ? 'bg-green-900/30 border-green-500/50' 
                  : 'bg-red-900/30 border-red-500/50'
              }`}>
                <div className="flex items-center gap-3 mb-4">
                  {isCorrect ? (
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  ) : (
                    <XCircle className="w-8 h-8 text-red-400" />
                  )}
                  <div>
                    <h3 className={`text-xl font-bold ${
                      isCorrect ? 'text-green-300' : 'text-red-300'
                    }`}>
                      {isCorrect ? 'Correct!' : 'Incorrect'}
                    </h3>
                    <p className={`${
                      isCorrect ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {isCorrect ? `+${question.points} points` : '0 points'}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="font-medium mb-2 text-white">Correct Answer:</p>
                  <p className="text-lg font-mono bg-slate-800/50 p-3 rounded border border-slate-600/50 text-blue-300">
                    {question.correctAnswer}
                  </p>
                </div>

                <div className="mb-6">
                  <p className="font-medium mb-2 text-white">Explanation:</p>
                  <p className="text-sm leading-relaxed text-slate-300">{question.explanation}</p>
                </div>

                <Button 
                  onClick={nextQuestion} 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white" 
                  size="lg"
                >
                  {currentQuestion < questions.length - 1 ? (
                    <>Next Question <TrendingUp className="w-4 h-4 ml-2" /></>
                  ) : (
                    <>View Results <Award className="w-4 h-4 ml-2" /></>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CFAEquityChallenge;