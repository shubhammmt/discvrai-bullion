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
  Brain
} from 'lucide-react';

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
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-primary/20 shadow-2xl">
            <CardHeader className="text-center bg-gradient-to-r from-primary/10 to-secondary/10">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Award className="w-8 h-8 text-primary" />
                <CardTitle className="text-3xl font-bold">CFA Challenge Complete!</CardTitle>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{score}</div>
                  <div className="text-sm text-muted-foreground">Total Points</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary">{percentage}%</div>
                  <div className="text-sm text-muted-foreground">Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">{formatTime(timeElapsed)}</div>
                  <div className="text-sm text-muted-foreground">Time Taken</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <Badge variant={percentage >= 70 ? "default" : "secondary"} className="text-lg px-4 py-2">
                  {percentage >= 90 ? "CFA Expert!" : 
                   percentage >= 70 ? "Strong Candidate" : 
                   "Needs More Study"}
                </Badge>
              </div>
              
              <div className="space-y-4 mb-6">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Performance Breakdown
                </h3>
                {questions.map((q, index) => {
                  const userAnswer = userAnswers[index];
                  const correct = q.type === 'calculation'
                    ? Math.abs(Number(userAnswer) - Number(q.correctAnswer)) < 0.1
                    : userAnswer === q.correctAnswer;
                  
                  return (
                    <div key={q.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        {getCategoryIcon(q.category)}
                        <div>
                          <div className="font-medium">{q.category}</div>
                          <div className="text-sm text-muted-foreground">{q.level} • {q.points} points</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {correct ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                        <Badge variant={correct ? "default" : "secondary"}>
                          {correct ? `+${q.points}` : '0'}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-center">
                <Button onClick={resetChallenge} size="lg" className="px-8">
                  Take Challenge Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Card className="mb-6 border-2 border-primary/20 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-primary" />
                <div>
                  <CardTitle className="text-2xl font-bold">CFA Equity Research Challenge</CardTitle>
                  <p className="text-muted-foreground">Master the fundamentals of equity analysis</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{score}</div>
                <div className="text-sm text-muted-foreground">Points</div>
              </div>
            </div>
            
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress: {currentQuestion + 1} of {questions.length}</span>
                <span>Time: {formatTime(timeElapsed)}</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardHeader>
        </Card>

        {/* Question Card */}
        <Card className="border-2 border-primary/20 shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-secondary/10 to-accent/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getCategoryIcon(question.category)}
                <Badge variant="outline">{question.category}</Badge>
                <Badge variant={question.level === 'CFA I' ? 'default' : 'secondary'}>
                  {question.level}
                </Badge>
              </div>
              <Badge variant="outline" className="text-primary font-semibold">
                {question.points} points
              </Badge>
            </div>
            
            {question.context && (
              <div className="mt-3 p-3 bg-muted/50 rounded-lg border-l-4 border-primary">
                <p className="text-sm text-muted-foreground">
                  <strong>Context:</strong> {question.context}
                </p>
              </div>
            )}
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">{question.question}</h2>
              
              {question.formula && (
                <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    Formula: <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">{question.formula}</code>
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
                        className="w-full text-left justify-start h-auto p-4"
                        onClick={() => setSelectedAnswer(option)}
                      >
                        <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                        {option}
                      </Button>
                    ))}
                  </div>
                )}

                {question.type === 'calculation' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calculator className="w-5 h-5 text-primary" />
                      <label className="font-medium">Enter your calculation result:</label>
                    </div>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Enter numerical answer (e.g., 1.17)"
                      value={calculationInput}
                      onChange={(e) => setCalculationInput(e.target.value)}
                      className="text-lg font-mono"
                    />
                    <p className="text-sm text-muted-foreground">
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
                  className="w-full mt-6"
                  size="lg"
                >
                  Submit Answer
                </Button>
              </div>
            )}

            {showResult && (
              <div className={`p-6 rounded-lg border-2 ${
                isCorrect 
                  ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800' 
                  : 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800'
              }`}>
                <div className="flex items-center gap-3 mb-4">
                  {isCorrect ? (
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  ) : (
                    <XCircle className="w-8 h-8 text-red-600" />
                  )}
                  <div>
                    <h3 className={`text-xl font-bold ${
                      isCorrect ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
                    }`}>
                      {isCorrect ? 'Correct!' : 'Incorrect'}
                    </h3>
                    <p className={`${
                      isCorrect ? 'text-green-600 dark:text-green-300' : 'text-red-600 dark:text-red-300'
                    }`}>
                      {isCorrect ? `+${question.points} points` : '0 points'}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="font-medium mb-2">Correct Answer:</p>
                  <p className="text-lg font-mono bg-background/50 p-2 rounded">
                    {question.correctAnswer}
                  </p>
                </div>

                <div className="mb-6">
                  <p className="font-medium mb-2">Explanation:</p>
                  <p className="text-sm leading-relaxed">{question.explanation}</p>
                </div>

                <Button onClick={nextQuestion} className="w-full" size="lg">
                  {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Results'}
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