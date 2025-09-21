import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trophy, Clock, Star, CheckCircle2, XCircle, ArrowRight, RefreshCw } from 'lucide-react';

interface Question {
  id: number;
  title: string;
  content: string;
  question: string;
  options: string[];
  correctAnswer: number;
  timeLimit: number; // in seconds
}

interface GameResult {
  totalQuestions: number;
  correctAnswers: number;
  totalTime: number;
  score: number;
  badge: string;
  rank: string;
}

const questions: Question[] = [
  {
    id: 1,
    title: "What is Artificial Intelligence?",
    content: "Artificial Intelligence (AI) is the simulation of human intelligence in machines. These machines are programmed to think and learn like humans. AI systems can perform tasks that typically require human intelligence, such as visual perception, speech recognition, decision-making, and language translation.",
    question: "What is the primary goal of Artificial Intelligence?",
    options: [
      "To replace all human jobs",
      "To simulate human intelligence in machines",
      "To create robots only",
      "To make computers faster"
    ],
    correctAnswer: 1,
    timeLimit: 60
  },
  {
    id: 2,
    title: "Machine Learning Basics",
    content: "Machine Learning is a subset of AI that provides systems the ability to automatically learn and improve from experience without being explicitly programmed. It focuses on developing computer programs that can access data and use it to learn for themselves.",
    question: "What is Machine Learning?",
    options: [
      "Programming computers manually",
      "A subset of AI that learns from data",
      "Only used for gaming",
      "A type of hardware"
    ],
    correctAnswer: 1,
    timeLimit: 60
  },
  {
    id: 3,
    title: "Neural Networks",
    content: "Neural networks are computing systems inspired by biological neural networks. They consist of interconnected nodes (neurons) that process information using a connectionist approach. These networks can recognize patterns and make decisions in a way similar to the human brain.",
    question: "What are Neural Networks inspired by?",
    options: [
      "Computer circuits",
      "Mathematical equations",
      "Biological neural networks",
      "Internet connections"
    ],
    correctAnswer: 2,
    timeLimit: 60
  },
  {
    id: 4,
    title: "Deep Learning",
    content: "Deep Learning is a machine learning technique that teaches computers to learn by example. It uses neural networks with many layers (hence 'deep') to model and understand complex patterns. Deep learning is behind many recent AI breakthroughs in image recognition, natural language processing, and game playing.",
    question: "What makes Deep Learning 'deep'?",
    options: [
      "Complex mathematical formulas",
      "Multiple layers of neural networks",
      "Large amounts of data",
      "Expensive hardware requirements"
    ],
    correctAnswer: 1,
    timeLimit: 60
  },
  {
    id: 5,
    title: "Natural Language Processing",
    content: "Natural Language Processing (NLP) is a branch of AI that helps computers understand, interpret, and manipulate human language. NLP bridges the gap between human communication and computer understanding, enabling machines to read text, hear speech, and interpret meaning.",
    question: "What is the main purpose of NLP?",
    options: [
      "To create new programming languages",
      "To help computers understand human language",
      "To translate between computer languages",
      "To improve computer hardware"
    ],
    correctAnswer: 1,
    timeLimit: 60
  },
  {
    id: 6,
    title: "Computer Vision",
    content: "Computer Vision is a field of AI that trains computers to interpret and understand visual information from the world. It seeks to automate tasks that human visual systems can do, such as recognizing objects, faces, or activities in images and videos.",
    question: "What does Computer Vision enable computers to do?",
    options: [
      "Process text faster",
      "Interpret and understand visual information",
      "Connect to the internet",
      "Run multiple programs"
    ],
    correctAnswer: 1,
    timeLimit: 60
  },
  {
    id: 7,
    title: "AI in Healthcare",
    content: "AI is revolutionizing healthcare by enabling more accurate diagnoses, personalized treatments, and efficient drug discovery. AI systems can analyze medical images, predict patient outcomes, and assist doctors in making better decisions for patient care.",
    question: "How is AI transforming healthcare?",
    options: [
      "Only by replacing doctors",
      "By enabling accurate diagnoses and personalized treatments",
      "By making hospitals cheaper",
      "By eliminating the need for medical research"
    ],
    correctAnswer: 1,
    timeLimit: 60
  },
  {
    id: 8,
    title: "AI in Finance",
    content: "In finance, AI is used for fraud detection, algorithmic trading, risk assessment, and customer service. AI systems can analyze vast amounts of financial data in real-time, identify patterns, and make predictions about market trends and investment opportunities.",
    question: "What is AI primarily used for in finance?",
    options: [
      "Only for calculating taxes",
      "Fraud detection and algorithmic trading",
      "Printing money",
      "Building bank branches"
    ],
    correctAnswer: 1,
    timeLimit: 60
  },
  {
    id: 9,
    title: "Supervised Learning",
    content: "Supervised Learning is a type of machine learning where the algorithm learns from labeled training data. The system is provided with input-output pairs and learns to map inputs to correct outputs. Common examples include email spam detection and image classification.",
    question: "What characterizes Supervised Learning?",
    options: [
      "Learning without any data",
      "Learning from labeled training data",
      "Learning only from images",
      "Learning without human supervision"
    ],
    correctAnswer: 1,
    timeLimit: 60
  },
  {
    id: 10,
    title: "Unsupervised Learning",
    content: "Unsupervised Learning finds hidden patterns in data without labeled examples. The algorithm explores data to find structures, clusters, or associations. Common applications include customer segmentation, market basket analysis, and data compression.",
    question: "What does Unsupervised Learning do?",
    options: [
      "Requires constant human supervision",
      "Finds hidden patterns in unlabeled data",
      "Only works with text data",
      "Cannot work without internet"
    ],
    correctAnswer: 1,
    timeLimit: 60
  },
  {
    id: 11,
    title: "Reinforcement Learning",
    content: "Reinforcement Learning is a type of machine learning where an agent learns to make decisions by performing actions in an environment and receiving rewards or penalties. It's similar to how humans learn through trial and error. Famous applications include game-playing AI like AlphaGo.",
    question: "How does Reinforcement Learning work?",
    options: [
      "By memorizing all possible solutions",
      "By learning through trial and error with rewards/penalties",
      "By copying human behavior exactly",
      "By reading instruction manuals"
    ],
    correctAnswer: 1,
    timeLimit: 60
  },
  {
    id: 12,
    title: "AI Ethics",
    content: "AI Ethics involves ensuring that AI systems are fair, transparent, and beneficial to society. Key concerns include bias in AI algorithms, privacy protection, job displacement, and ensuring AI decisions can be explained and understood by humans.",
    question: "What is a key concern in AI Ethics?",
    options: [
      "Making AI systems faster",
      "Ensuring AI systems are fair and transparent",
      "Reducing the cost of AI",
      "Making AI more complex"
    ],
    correctAnswer: 1,
    timeLimit: 60
  },
  {
    id: 13,
    title: "Big Data and AI",
    content: "Big Data refers to extremely large datasets that require special tools and techniques to process. AI and Big Data work together - AI algorithms need large amounts of data to learn effectively, while Big Data needs AI to extract meaningful insights and patterns.",
    question: "How do AI and Big Data work together?",
    options: [
      "They are completely separate technologies",
      "AI needs big data to learn, big data needs AI for insights",
      "Big Data replaces the need for AI",
      "They only work in specific industries"
    ],
    correctAnswer: 1,
    timeLimit: 60
  },
  {
    id: 14,
    title: "Future of AI",
    content: "The future of AI includes Artificial General Intelligence (AGI) - AI systems that can perform any intellectual task that humans can do. Current AI is 'narrow' - designed for specific tasks. The development of AGI could revolutionize every aspect of human life and work.",
    question: "What is Artificial General Intelligence (AGI)?",
    options: [
      "AI that only works on general topics",
      "AI systems that can perform any intellectual task humans can do",
      "AI that is generally better than humans",
      "AI that works without electricity"
    ],
    correctAnswer: 1,
    timeLimit: 60
  },
  {
    id: 15,
    title: "AI Career Opportunities",
    content: "AI offers numerous career opportunities including AI/ML Engineer, Data Scientist, Research Scientist, Product Manager, and AI Ethics Specialist. These roles are in high demand across industries like tech, healthcare, finance, and automotive, offering excellent growth prospects and competitive salaries.",
    question: "Which statement about AI careers is most accurate?",
    options: [
      "AI jobs are only available in tech companies",
      "AI careers offer high demand and competitive salaries across industries",
      "AI jobs require only programming skills",
      "AI careers are temporary trends"
    ],
    correctAnswer: 1,
    timeLimit: 60
  }
];

const AITutorialGame: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [questionStartTime, setQuestionStartTime] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    if (gameStarted && !gameEnded && !showAnswer) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameStarted, gameEnded, showAnswer, currentQuestion]);

  const startGame = () => {
    setGameStarted(true);
    setQuestionStartTime(Date.now());
    setTimeLeft(questions[0].timeLimit);
  };

  const handleTimeUp = () => {
    const timeSpent = questions[currentQuestion].timeLimit - timeLeft;
    setTotalTime(prev => prev + timeSpent);
    setAnswers(prev => [...prev, -1]); // -1 indicates timeout
    setShowAnswer(true);
  };

  const selectAnswer = (answerIndex: number) => {
    if (showAnswer) return;
    setSelectedAnswer(answerIndex);
  };

  const submitAnswer = () => {
    if (selectedAnswer === null) return;
    
    const timeSpent = questions[currentQuestion].timeLimit - timeLeft;
    setTotalTime(prev => prev + timeSpent);
    setAnswers(prev => [...prev, selectedAnswer]);
    setShowAnswer(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
      setTimeLeft(questions[currentQuestion + 1].timeLimit);
      setQuestionStartTime(Date.now());
    } else {
      setGameEnded(true);
    }
  };

  const calculateResults = (): GameResult => {
    const correctAnswers = answers.reduce((count, answer, index) => {
      return answer === questions[index].correctAnswer ? count + 1 : count;
    }, 0);
    
    const accuracy = (correctAnswers / questions.length) * 100;
    const avgTimePerQuestion = totalTime / questions.length;
    
    // Scoring: 70% accuracy + 30% speed bonus
    const accuracyScore = accuracy * 0.7;
    const speedBonus = Math.max(0, (60 - avgTimePerQuestion) / 60) * 30;
    const finalScore = Math.round(accuracyScore + speedBonus);
    
    let badge = "Beginner";
    let rank = "Explorer";
    
    if (finalScore >= 90) {
      badge = "AI Master";
      rank = "Grandmaster";
    } else if (finalScore >= 80) {
      badge = "AI Expert";
      rank = "Expert";
    } else if (finalScore >= 70) {
      badge = "AI Specialist";
      rank = "Specialist";
    } else if (finalScore >= 60) {
      badge = "AI Enthusiast";
      rank = "Practitioner";
    }
    
    return {
      totalQuestions: questions.length,
      correctAnswers,
      totalTime,
      score: finalScore,
      badge,
      rank
    };
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setTimeLeft(60);
    setGameStarted(false);
    setGameEnded(false);
    setAnswers([]);
    setTotalTime(0);
    setShowAnswer(false);
  };

  const results = gameEnded ? calculateResults() : null;

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardContent className="p-8 text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Star className="w-8 h-8 text-primary" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">AI Mastery Challenge</h1>
              <p className="text-muted-foreground text-lg">Test your AI knowledge in 15 bite-sized questions</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-secondary/50 p-4 rounded-lg">
                <Clock className="w-6 h-6 text-primary mb-2 mx-auto" />
                <div className="font-semibold">1 minute per question</div>
                <div className="text-muted-foreground">Race against time</div>
              </div>
              <div className="bg-secondary/50 p-4 rounded-lg">
                <Trophy className="w-6 h-6 text-primary mb-2 mx-auto" />
                <div className="font-semibold">Earn badges</div>
                <div className="text-muted-foreground">Unlock achievements</div>
              </div>
              <div className="bg-secondary/50 p-4 rounded-lg">
                <Star className="w-6 h-6 text-primary mb-2 mx-auto" />
                <div className="font-semibold">Leaderboard rank</div>
                <div className="text-muted-foreground">Compete globally</div>
              </div>
            </div>
            <Button onClick={startGame} size="lg" className="w-full max-w-xs">
              Start Challenge
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (gameEnded && results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardContent className="p-8 text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <Trophy className="w-10 h-10 text-primary" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Challenge Complete!</h1>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {results.badge}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-6 text-center">
              <div className="bg-secondary/50 p-6 rounded-lg">
                <div className="text-3xl font-bold text-primary">{results.score}</div>
                <div className="text-sm text-muted-foreground">Final Score</div>
              </div>
              <div className="bg-secondary/50 p-6 rounded-lg">
                <div className="text-3xl font-bold text-foreground">{results.correctAnswers}/{results.totalQuestions}</div>
                <div className="text-sm text-muted-foreground">Correct Answers</div>
              </div>
            </div>

            <div className="bg-secondary/30 p-4 rounded-lg">
              <div className="text-lg font-semibold text-foreground mb-2">Your Rank: {results.rank}</div>
              <div className="text-sm text-muted-foreground">
                Total Time: {Math.round(results.totalTime / 60)}m {results.totalTime % 60}s
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={resetGame} variant="outline" className="flex-1">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              <Button className="flex-1">
                Share Results
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline" className="text-sm">
              Question {currentQuestion + 1} of {questions.length}
            </Badge>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4" />
              <span className={`font-mono ${timeLeft <= 10 ? 'text-destructive' : 'text-foreground'}`}>
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </span>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card>
          <CardContent className="p-6 space-y-6">
            {/* Question Content */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">{question.title}</h2>
              <div className="bg-secondary/30 p-4 rounded-lg mb-6">
                <p className="text-foreground leading-relaxed">{question.content}</p>
              </div>
            </div>

            {/* Question */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">{question.question}</h3>
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => selectAnswer(index)}
                    disabled={showAnswer}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      selectedAnswer === index
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-card hover:border-primary/50'
                    } ${
                      showAnswer
                        ? index === question.correctAnswer
                          ? 'border-green-500 bg-green-500/10'
                          : selectedAnswer === index && index !== question.correctAnswer
                          ? 'border-red-500 bg-red-500/10'
                          : 'opacity-50'
                        : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-foreground">{option}</span>
                      {showAnswer && (
                        <div>
                          {index === question.correctAnswer && (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          )}
                          {selectedAnswer === index && index !== question.correctAnswer && (
                            <XCircle className="w-5 h-5 text-red-500" />
                          )}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                {showAnswer ? (
                  answers[currentQuestion] === question.correctAnswer ? (
                    <span className="text-green-600 font-medium">Correct! 🎉</span>
                  ) : answers[currentQuestion] === -1 ? (
                    <span className="text-orange-600 font-medium">Time's up! ⏰</span>
                  ) : (
                    <span className="text-red-600 font-medium">Incorrect 😔</span>
                  )
                ) : (
                  `Select an answer to continue`
                )}
              </div>
              
              <div>
                {!showAnswer ? (
                  <Button 
                    onClick={submitAnswer} 
                    disabled={selectedAnswer === null}
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <Button onClick={nextQuestion}>
                    {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Results'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AITutorialGame;