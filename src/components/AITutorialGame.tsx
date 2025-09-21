import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, Trophy, Star, Brain, Target, Award, HelpCircle, CheckCircle, XCircle, Lightbulb, Bot, Moon, Sun, ArrowRight, RefreshCw } from 'lucide-react';

// Import images
import aiBrainImage from '@/assets/ai-brain-tutorial.jpg';
import machineLearningImage from '@/assets/machine-learning-tutorial.jpg';
import computerVisionImage from '@/assets/computer-vision-tutorial.jpg';
import nlpImage from '@/assets/nlp-tutorial.jpg';
import aiFinanceImage from '@/assets/ai-finance-tutorial.jpg';

interface Question {
  id: number;
  title: string;
  content: string;
  example: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  image: string;
  timeLimit: number;
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
    example: "Example: Netflix's recommendation system uses AI to analyze your viewing history and suggest movies you might like, just like how a friend would recommend based on knowing your preferences.",
    question: "What is the primary goal of Artificial Intelligence?",
    options: [
      "To replace all human jobs",
      "To simulate human intelligence in machines",
      "To create robots only",
      "To make computers faster"
    ],
    correctAnswer: 1,
    explanation: "✅ Correct! AI's primary goal is to simulate human intelligence in machines. While AI can automate some tasks, its main purpose is to enable machines to think, learn, and make decisions like humans. This doesn't mean replacing humans entirely, but rather augmenting human capabilities.",
    image: aiBrainImage,
    timeLimit: 60
  },
  {
    id: 2,
    title: "Machine Learning Basics",
    content: "Machine Learning is a subset of AI that provides systems the ability to automatically learn and improve from experience without being explicitly programmed. It focuses on developing computer programs that can access data and use it to learn for themselves.",
    example: "Example: Spam email detection gets better over time by learning from millions of emails marked as spam or not spam, without anyone programming specific rules for each type of spam.",
    question: "What is Machine Learning?",
    options: [
      "Programming computers manually",
      "A subset of AI that learns from data",
      "Only used for gaming",
      "A type of hardware"
    ],
    correctAnswer: 1,
    explanation: "✅ Correct! Machine Learning is indeed a subset of AI that learns from data. Unlike traditional programming where we write specific instructions, ML algorithms improve their performance automatically as they process more data. This is what makes ML so powerful for tasks like recommendation systems, image recognition, and predictive analytics.",
    image: machineLearningImage,
    timeLimit: 60
  },
  {
    id: 3,
    title: "Neural Networks",
    content: "Neural networks are computing systems inspired by biological neural networks. They consist of interconnected nodes (neurons) that process information using a connectionist approach. These networks can recognize patterns and make decisions in a way similar to the human brain.",
    example: "Example: Just like your brain has billions of neurons connected together to recognize a friend's face, artificial neural networks have interconnected nodes that work together to recognize patterns in data.",
    question: "What are Neural Networks inspired by?",
    options: [
      "Computer circuits",
      "Mathematical equations",
      "Biological neural networks",
      "Internet connections"
    ],
    correctAnswer: 2,
    explanation: "✅ Correct! Neural networks are inspired by biological neural networks (the human brain). The structure mimics how neurons in our brain are interconnected and communicate through synapses. This biological inspiration led to breakthrough AI technologies like deep learning.",
    image: aiBrainImage,
    timeLimit: 60
  },
  {
    id: 4,
    title: "Deep Learning",
    content: "Deep Learning is a machine learning technique that teaches computers to learn by example. It uses neural networks with many layers (hence 'deep') to model and understand complex patterns. Deep learning is behind many recent AI breakthroughs in image recognition, natural language processing, and game playing.",
    example: "Example: When you upload a photo to Facebook and it automatically suggests tagging your friends, that's deep learning with multiple layers analyzing facial features, comparing them to known faces, and making suggestions.",
    question: "What makes Deep Learning 'deep'?",
    options: [
      "Complex mathematical formulas",
      "Multiple layers of neural networks",
      "Large amounts of data",
      "Expensive hardware requirements"
    ],
    correctAnswer: 1,
    explanation: "✅ Correct! Deep Learning is called 'deep' because it uses neural networks with multiple layers (sometimes hundreds of layers). Each layer learns increasingly complex features - early layers might detect edges, middle layers detect shapes, and deeper layers recognize complete objects.",
    image: machineLearningImage,
    timeLimit: 60
  },
  {
    id: 5,
    title: "Natural Language Processing",
    content: "Natural Language Processing (NLP) is a branch of AI that helps computers understand, interpret, and manipulate human language. NLP bridges the gap between human communication and computer understanding, enabling machines to read text, hear speech, and interpret meaning.",
    example: "Example: When you ask Siri 'What's the weather like tomorrow?', NLP helps Siri understand that you're asking about future weather conditions, not current weather or weather in general.",
    question: "What is the main purpose of NLP?",
    options: [
      "To create new programming languages",
      "To help computers understand human language",
      "To translate between computer languages",
      "To improve computer hardware"
    ],
    correctAnswer: 1,
    explanation: "✅ Correct! NLP's main purpose is to help computers understand human language. This includes processing text, understanding context, sentiment analysis, language translation, and speech recognition. It's what makes chatbots, voice assistants, and language translators possible.",
    image: nlpImage,
    timeLimit: 60
  },
  {
    id: 6,
    title: "Computer Vision",
    content: "Computer Vision is a field of AI that trains computers to interpret and understand visual information from the world. It seeks to automate tasks that human visual systems can do, such as recognizing objects, faces, or activities in images and videos.",
    example: "Example: Tesla's self-driving cars use computer vision to 'see' the road, identify pedestrians, read traffic signs, and detect other vehicles - essentially giving the car eyes that can understand what they see.",
    question: "What does Computer Vision enable computers to do?",
    options: [
      "Process text faster",
      "Interpret and understand visual information",
      "Connect to the internet",
      "Run multiple programs"
    ],
    correctAnswer: 1,
    explanation: "✅ Correct! Computer Vision enables computers to interpret and understand visual information, just like human vision. This technology powers facial recognition, medical image analysis, autonomous vehicles, and quality control in manufacturing.",
    image: computerVisionImage,
    timeLimit: 60
  },
  {
    id: 7,
    title: "AI in Healthcare",
    content: "AI is revolutionizing healthcare by enabling more accurate diagnoses, personalized treatments, and efficient drug discovery. AI systems can analyze medical images, predict patient outcomes, and assist doctors in making better decisions for patient care.",
    example: "Example: AI can analyze thousands of X-rays in minutes to detect early signs of lung cancer that human doctors might miss, potentially saving lives through early detection and treatment.",
    question: "How is AI transforming healthcare?",
    options: [
      "Only by replacing doctors",
      "By enabling accurate diagnoses and personalized treatments",
      "By making hospitals cheaper",
      "By eliminating the need for medical research"
    ],
    correctAnswer: 1,
    explanation: "✅ Correct! AI transforms healthcare by enabling more accurate diagnoses, personalized treatments, and drug discovery. AI assists doctors rather than replacing them, helping them make better decisions with data-driven insights and pattern recognition that humans might miss.",
    image: aiBrainImage,
    timeLimit: 60
  },
  {
    id: 8,
    title: "AI in Finance",
    content: "In finance, AI is used for fraud detection, algorithmic trading, risk assessment, and customer service. AI systems can analyze vast amounts of financial data in real-time, identify patterns, and make predictions about market trends and investment opportunities.",
    example: "Example: Your bank's fraud detection system uses AI to instantly analyze your transaction patterns and flag suspicious activity, like a purchase in a foreign country when you've never traveled there before.",
    question: "What is AI primarily used for in finance?",
    options: [
      "Only for calculating taxes",
      "Fraud detection and algorithmic trading",
      "Printing money",
      "Building bank branches"
    ],
    correctAnswer: 1,
    explanation: "✅ Correct! AI in finance is primarily used for fraud detection, algorithmic trading, risk assessment, and customer service. AI can process vast amounts of financial data in real-time to identify patterns, detect anomalies, and make predictions that help financial institutions serve customers better and manage risks.",
    image: aiFinanceImage,
    timeLimit: 60
  },
  {
    id: 9,
    title: "Supervised Learning",
    content: "Supervised Learning is a type of machine learning where the algorithm learns from labeled training data. The system is provided with input-output pairs and learns to map inputs to correct outputs. Common examples include email spam detection and image classification.",
    example: "Example: Teaching AI to recognize cats in photos by showing it thousands of images labeled 'cat' or 'not cat' - like having a teacher show students examples with the correct answers.",
    question: "What characterizes Supervised Learning?",
    options: [
      "Learning without any data",
      "Learning from labeled training data",
      "Learning only from images",
      "Learning without human supervision"
    ],
    correctAnswer: 1,
    explanation: "✅ Correct! Supervised Learning is characterized by learning from labeled training data. The algorithm learns by examining input-output pairs where the correct answer is provided during training. This is like learning with a teacher who provides the right answers.",
    image: machineLearningImage,
    timeLimit: 60
  },
  {
    id: 10,
    title: "Unsupervised Learning",
    content: "Unsupervised Learning finds hidden patterns in data without labeled examples. The algorithm explores data to find structures, clusters, or associations. Common applications include customer segmentation, market basket analysis, and data compression.",
    example: "Example: Amazon analyzing customer purchase data to discover that people who buy coffee also tend to buy sugar and cream, without anyone telling it to look for that pattern - it discovered the connection on its own.",
    question: "What does Unsupervised Learning do?",
    options: [
      "Requires constant human supervision",
      "Finds hidden patterns in unlabeled data",
      "Only works with text data",
      "Cannot work without internet"
    ],
    correctAnswer: 1,
    explanation: "✅ Correct! Unsupervised Learning finds hidden patterns in unlabeled data. Unlike supervised learning, there's no 'teacher' providing correct answers. The algorithm must discover patterns, clusters, and relationships in data on its own, like finding customer segments or detecting anomalies.",
    image: machineLearningImage,
    timeLimit: 60
  },
  {
    id: 11,
    title: "Reinforcement Learning",
    content: "Reinforcement Learning is a type of machine learning where an agent learns to make decisions by performing actions in an environment and receiving rewards or penalties. It's similar to how humans learn through trial and error. Famous applications include game-playing AI like AlphaGo.",
    example: "Example: Teaching AI to play chess by letting it play millions of games, rewarding wins and penalizing losses - like learning to ride a bicycle through practice, falling down, and getting back up.",
    question: "How does Reinforcement Learning work?",
    options: [
      "By memorizing all possible solutions",
      "By learning through trial and error with rewards/penalties",
      "By copying human behavior exactly",
      "By reading instruction manuals"
    ],
    correctAnswer: 1,
    explanation: "✅ Correct! Reinforcement Learning works through trial and error with rewards and penalties. The AI agent takes actions, receives feedback (rewards or penalties), and learns to maximize rewards over time. This is how AlphaGo learned to master the game of Go and how AI learns to play video games.",
    image: aiBrainImage,
    timeLimit: 60
  },
  {
    id: 12,
    title: "AI Ethics",
    content: "AI Ethics involves ensuring that AI systems are fair, transparent, and beneficial to society. Key concerns include bias in AI algorithms, privacy protection, job displacement, and ensuring AI decisions can be explained and understood by humans.",
    example: "Example: Ensuring that an AI hiring system doesn't discriminate against candidates based on gender or race, and that loan approval algorithms treat all applicants fairly regardless of their background.",
    question: "What is a key concern in AI Ethics?",
    options: [
      "Making AI systems faster",
      "Ensuring AI systems are fair and transparent",
      "Reducing the cost of AI",
      "Making AI more complex"
    ],
    correctAnswer: 1,
    explanation: "✅ Correct! Ensuring AI systems are fair and transparent is a key concern in AI Ethics. This includes preventing bias, protecting privacy, ensuring accountability, and making sure AI benefits all of society rather than creating unfair advantages or discrimination.",
    image: aiBrainImage,
    timeLimit: 60
  },
  {
    id: 13,
    title: "Big Data and AI",
    content: "Big Data refers to extremely large datasets that require special tools and techniques to process. AI and Big Data work together - AI algorithms need large amounts of data to learn effectively, while Big Data needs AI to extract meaningful insights and patterns.",
    example: "Example: Google processes billions of search queries daily (Big Data) and uses AI to understand what users are looking for and provide relevant results - neither would be effective without the other.",
    question: "How do AI and Big Data work together?",
    options: [
      "They are completely separate technologies",
      "AI needs big data to learn, big data needs AI for insights",
      "Big Data replaces the need for AI",
      "They only work in specific industries"
    ],
    correctAnswer: 1,
    explanation: "✅ Correct! AI and Big Data work together symbiotically - AI algorithms need large amounts of data to learn effectively and make accurate predictions, while Big Data needs AI to extract meaningful insights and patterns from vast amounts of information that would be impossible for humans to analyze manually.",
    image: machineLearningImage,
    timeLimit: 60
  },
  {
    id: 14,
    title: "Future of AI",
    content: "The future of AI includes Artificial General Intelligence (AGI) - AI systems that can perform any intellectual task that humans can do. Current AI is 'narrow' - designed for specific tasks. The development of AGI could revolutionize every aspect of human life and work.",
    example: "Example: Today's AI can beat humans at chess or recognize faces, but can't do both tasks with the same system. AGI would be like having a digital Einstein that could excel at chess, recognize faces, write poetry, and solve scientific problems all with one system.",
    question: "What is Artificial General Intelligence (AGI)?",
    options: [
      "AI that only works on general topics",
      "AI systems that can perform any intellectual task humans can do",
      "AI that is generally better than humans",
      "AI that works without electricity"
    ],
    correctAnswer: 1,
    explanation: "✅ Correct! Artificial General Intelligence (AGI) refers to AI systems that can perform any intellectual task that humans can do. Unlike current 'narrow' AI that excels at specific tasks, AGI would have human-level cognitive abilities across all domains of knowledge and reasoning.",
    image: aiBrainImage,
    timeLimit: 60
  },
  {
    id: 15,
    title: "AI Career Opportunities",
    content: "AI offers numerous career opportunities including AI/ML Engineer, Data Scientist, Research Scientist, Product Manager, and AI Ethics Specialist. These roles are in high demand across industries like tech, healthcare, finance, and automotive, offering excellent growth prospects and competitive salaries.",
    example: "Example: An AI Engineer at a startup might develop recommendation algorithms earning ₹25 LPA, while a Data Scientist at a bank might build fraud detection systems earning ₹30 LPA - both using AI skills in different industries.",
    question: "Which statement about AI careers is most accurate?",
    options: [
      "AI jobs are only available in tech companies",
      "AI careers offer high demand and competitive salaries across industries",
      "AI jobs require only programming skills",
      "AI careers are temporary trends"
    ],
    correctAnswer: 1,
    explanation: "✅ Correct! AI careers offer high demand and competitive salaries across many industries, not just tech. From healthcare to finance to entertainment, every industry is adopting AI. These roles require a mix of technical skills, domain knowledge, and problem-solving abilities, making them both challenging and rewarding.",
    image: aiBrainImage,
    timeLimit: 60
  }
];

const AITutorialGame: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [questionStartTime, setQuestionStartTime] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showAIHelp, setShowAIHelp] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

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
      setShowAIHelp(false);
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
      badge = "AI Master 🧠";
      rank = "Grandmaster";
    } else if (finalScore >= 80) {
      badge = "AI Expert 🎓";
      rank = "Expert";
    } else if (finalScore >= 70) {
      badge = "AI Specialist ⚡";
      rank = "Specialist";
    } else if (finalScore >= 60) {
      badge = "AI Enthusiast 🚀";
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
    setShowAIHelp(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const getAIHelp = () => {
    setShowAIHelp(true);
  };

  const results = gameEnded ? calculateResults() : null;
  const question = questions[currentQuestion];

  if (!gameStarted) {
    return (
      <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'ai-surface' : 'bg-gradient-to-br from-background via-background to-primary/5'} flex items-center justify-center p-4`}>
        <Card className={`w-full max-w-4xl ${isDarkMode ? 'ai-surface-elevated ai-border-glow' : ''}`}>
          <CardContent className="p-8 text-center space-y-8">
            <div className="flex justify-between items-center">
              <div className="flex justify-center flex-1">
                <div className={`w-20 h-20 ${isDarkMode ? 'ai-gradient' : 'bg-primary/10'} rounded-full flex items-center justify-center ${isDarkMode ? 'ai-glow' : ''}`}>
                  <Brain className={`w-10 h-10 ${isDarkMode ? 'text-white' : 'text-primary'}`} />
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className={isDarkMode ? 'text-white hover:bg-white/10' : ''}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>

            <div>
              <h1 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'ai-text-gradient' : 'text-foreground'}`}>
                AI Mastery Challenge
              </h1>
              <p className={`text-xl ${isDarkMode ? 'text-ai-text-secondary' : 'text-muted-foreground'}`}>
                Master AI concepts through 15 interactive questions with real-world examples
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`${isDarkMode ? 'ai-gradient-subtle ai-border-glow' : 'bg-secondary/50'} p-6 rounded-lg transition-all hover:scale-105`}>
                <Clock className={`w-8 h-8 ${isDarkMode ? 'text-ai-primary' : 'text-primary'} mb-3 mx-auto`} />
                <div className={`font-semibold text-lg ${isDarkMode ? 'text-ai-text-primary' : ''}`}>1 minute per question</div>
                <div className={`${isDarkMode ? 'text-ai-text-secondary' : 'text-muted-foreground'}`}>Race against time</div>
              </div>
              <div className={`${isDarkMode ? 'ai-gradient-subtle ai-border-glow' : 'bg-secondary/50'} p-6 rounded-lg transition-all hover:scale-105`}>
                <Trophy className={`w-8 h-8 ${isDarkMode ? 'text-ai-accent' : 'text-primary'} mb-3 mx-auto`} />
                <div className={`font-semibold text-lg ${isDarkMode ? 'text-ai-text-primary' : ''}`}>Earn AI badges</div>
                <div className={`${isDarkMode ? 'text-ai-text-secondary' : 'text-muted-foreground'}`}>Unlock achievements</div>
              </div>
              <div className={`${isDarkMode ? 'ai-gradient-subtle ai-border-glow' : 'bg-secondary/50'} p-6 rounded-lg transition-all hover:scale-105`}>
                <Star className={`w-8 h-8 ${isDarkMode ? 'text-ai-info' : 'text-primary'} mb-3 mx-auto`} />
                <div className={`font-semibold text-lg ${isDarkMode ? 'text-ai-text-primary' : ''}`}>Detailed explanations</div>
                <div className={`${isDarkMode ? 'text-ai-text-secondary' : 'text-muted-foreground'}`}>Learn from every answer</div>
              </div>
            </div>

            <Button 
              onClick={startGame} 
              size="lg" 
              className={`w-full max-w-sm text-lg py-6 ${isDarkMode ? 'ai-gradient ai-glow hover:ai-glow-intense' : ''}`}
            >
              <Brain className="w-5 h-5 mr-3" />
              Start AI Challenge
              <ArrowRight className="w-5 h-5 ml-3" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (gameEnded && results) {
    return (
      <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'ai-surface' : 'bg-gradient-to-br from-background via-background to-primary/5'} flex items-center justify-center p-4`}>
        <Card className={`w-full max-w-4xl ${isDarkMode ? 'ai-surface-elevated ai-border-glow' : ''}`}>
          <CardContent className="p-8 text-center space-y-8">
            <div className="flex justify-between items-center">
              <div className="flex justify-center flex-1">
                <div className={`w-24 h-24 ${isDarkMode ? 'ai-gradient' : 'bg-primary/10'} rounded-full flex items-center justify-center ${isDarkMode ? 'ai-glow-intense' : ''}`}>
                  <Trophy className={`w-12 h-12 ${isDarkMode ? 'text-white' : 'text-primary'}`} />
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className={isDarkMode ? 'text-white hover:bg-white/10' : ''}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>

            <div>
              <h1 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'ai-text-gradient' : 'text-foreground'}`}>
                Challenge Complete!
              </h1>
              <Badge 
                variant="secondary" 
                className={`text-xl px-6 py-3 ${isDarkMode ? 'ai-gradient text-white' : ''}`}
              >
                {results.badge}
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`${isDarkMode ? 'ai-gradient-subtle ai-border-glow' : 'bg-secondary/50'} p-8 rounded-lg`}>
                <div className={`text-4xl font-bold ${isDarkMode ? 'text-ai-primary' : 'text-primary'}`}>{results.score}</div>
                <div className={`text-lg ${isDarkMode ? 'text-ai-text-secondary' : 'text-muted-foreground'}`}>Final Score</div>
              </div>
              <div className={`${isDarkMode ? 'ai-gradient-subtle ai-border-glow' : 'bg-secondary/50'} p-8 rounded-lg`}>
                <div className={`text-4xl font-bold ${isDarkMode ? 'text-ai-text-primary' : 'text-foreground'}`}>{results.correctAnswers}/{results.totalQuestions}</div>
                <div className={`text-lg ${isDarkMode ? 'text-ai-text-secondary' : 'text-muted-foreground'}`}>Correct Answers</div>
              </div>
              <div className={`${isDarkMode ? 'ai-gradient-subtle ai-border-glow' : 'bg-secondary/50'} p-8 rounded-lg`}>
                <div className={`text-4xl font-bold ${isDarkMode ? 'text-ai-accent' : 'text-foreground'}`}>{Math.round(results.totalTime / 60)}m</div>
                <div className={`text-lg ${isDarkMode ? 'text-ai-text-secondary' : 'text-muted-foreground'}`}>Total Time</div>
              </div>
            </div>

            <div className={`${isDarkMode ? 'ai-gradient-subtle ai-border-glow' : 'bg-secondary/30'} p-6 rounded-lg`}>
              <div className={`text-2xl font-semibold mb-2 ${isDarkMode ? 'text-ai-text-primary' : 'text-foreground'}`}>
                🏆 Your Rank: {results.rank}
              </div>
              <div className={`text-lg ${isDarkMode ? 'text-ai-text-secondary' : 'text-muted-foreground'}`}>
                You've mastered the fundamentals of AI! Ready for advanced challenges?
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={resetGame} 
                variant="outline" 
                size="lg"
                className={`flex-1 ${isDarkMode ? 'border-ai-border text-ai-text-primary hover:bg-ai-surface-elevated' : ''}`}
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Try Again
              </Button>
              <Button 
                size="lg"
                className={`flex-1 ${isDarkMode ? 'ai-gradient ai-glow' : ''}`}
              >
                <Target className="w-5 h-5 mr-2" />
                Next Challenge
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'ai-surface' : 'bg-gradient-to-br from-background via-background to-primary/5'} p-4`}>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card className={`${isDarkMode ? 'ai-surface-elevated ai-border-glow' : ''}`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 ${isDarkMode ? 'ai-gradient' : 'bg-primary/10'} rounded-full flex items-center justify-center`}>
                  <Brain className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-primary'}`} />
                </div>
                <div>
                  <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-ai-text-primary' : 'text-foreground'}`}>
                    AI Mastery Challenge
                  </h1>
                  <p className={`${isDarkMode ? 'text-ai-text-secondary' : 'text-muted-foreground'}`}>
                    Question {currentQuestion + 1} of {questions.length}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={getAIHelp}
                  className={`${isDarkMode ? 'text-ai-text-primary hover:bg-ai-surface border-ai-border' : ''}`}
                >
                  <Bot className="w-4 h-4 mr-2" />
                  AI Help
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleDarkMode}
                  className={isDarkMode ? 'text-white hover:bg-white/10' : ''}
                >
                  {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className={`w-4 h-4 ${timeLeft <= 10 ? 'text-destructive' : isDarkMode ? 'text-ai-text-secondary' : 'text-muted-foreground'}`} />
                  <span className={`font-mono ${timeLeft <= 10 ? 'text-destructive' : isDarkMode ? 'text-ai-text-secondary' : 'text-muted-foreground'}`}>
                    {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
                  </span>
                </div>
                <Badge variant={timeLeft <= 10 ? "destructive" : "secondary"}>
                  {timeLeft <= 10 ? "Hurry up!" : "Good pace"}
                </Badge>
              </div>
              <Progress 
                value={((60 - timeLeft) / 60) * 100} 
                className={`h-2 ${isDarkMode ? 'bg-ai-surface' : ''}`}
              />
              <Progress 
                value={((currentQuestion + 1) / questions.length) * 100} 
                className={`h-1 ${isDarkMode ? 'bg-ai-surface' : ''}`}
              />
            </div>
          </CardContent>
        </Card>

        {/* Question Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Content & Image */}
          <Card className={`${isDarkMode ? 'ai-surface-elevated ai-border-glow' : ''}`}>
            <CardHeader>
              <CardTitle className={`text-xl ${isDarkMode ? 'text-ai-text-primary' : ''}`}>
                {question.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative overflow-hidden rounded-lg">
                <img 
                  src={question.image} 
                  alt={question.title}
                  className="w-full h-48 object-cover transition-transform hover:scale-105"
                />
                <div className={`absolute inset-0 ${isDarkMode ? 'bg-ai-gradient opacity-20' : 'bg-gradient-to-t from-black/20 to-transparent'}`} />
              </div>
              
              <div className="space-y-3">
                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-ai-text-secondary' : 'text-muted-foreground'}`}>
                  {question.content}
                </p>
                
                <div className={`${isDarkMode ? 'ai-gradient-subtle ai-border-glow' : 'bg-blue-50 border border-blue-200'} p-4 rounded-lg`}>
                  <div className="flex items-start space-x-2">
                    <Lightbulb className={`w-5 h-5 mt-0.5 ${isDarkMode ? 'text-ai-warning' : 'text-blue-600'} flex-shrink-0`} />
                    <p className={`text-sm ${isDarkMode ? 'text-ai-text-primary' : 'text-blue-800'}`}>
                      {question.example}
                    </p>
                  </div>
                </div>
              </div>

              {showAIHelp && (
                <div className={`${isDarkMode ? 'ai-gradient-subtle ai-border-glow' : 'bg-green-50 border border-green-200'} p-4 rounded-lg`}>
                  <div className="flex items-start space-x-2">
                    <Bot className={`w-5 h-5 mt-0.5 ${isDarkMode ? 'text-ai-success' : 'text-green-600'} flex-shrink-0`} />
                    <div className={`text-sm ${isDarkMode ? 'text-ai-text-primary' : 'text-green-800'}`}>
                      <strong>AI Hint:</strong> Think about the core purpose or main characteristic mentioned in the content. 
                      The example should give you a clue about the practical application!
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Right Column - Question & Options */}
          <Card className={`${isDarkMode ? 'ai-surface-elevated ai-border-glow' : ''}`}>
            <CardHeader>
              <CardTitle className={`text-lg ${isDarkMode ? 'text-ai-text-primary' : ''}`}>
                {question.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => selectAnswer(index)}
                    disabled={showAnswer}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      showAnswer
                        ? index === question.correctAnswer
                          ? isDarkMode ? 'border-ai-success bg-ai-success/20 text-ai-text-primary' : 'border-green-500 bg-green-50 text-green-800'
                          : selectedAnswer === index
                          ? isDarkMode ? 'border-destructive bg-destructive/20 text-ai-text-primary' : 'border-red-500 bg-red-50 text-red-800'
                          : isDarkMode ? 'border-ai-border bg-ai-surface text-ai-text-secondary' : 'border-gray-200 bg-gray-50 text-gray-600'
                        : selectedAnswer === index
                        ? isDarkMode ? 'border-ai-primary bg-ai-primary/20 text-ai-text-primary' : 'border-blue-500 bg-blue-50 text-blue-800'
                        : isDarkMode ? 'border-ai-border bg-ai-surface hover:bg-ai-surface-elevated text-ai-text-primary hover:border-ai-primary/50' : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-800 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option}</span>
                      {showAnswer && (
                        <div className="flex-shrink-0">
                          {index === question.correctAnswer ? (
                            <CheckCircle className={`w-5 h-5 ${isDarkMode ? 'text-ai-success' : 'text-green-500'}`} />
                          ) : selectedAnswer === index ? (
                            <XCircle className="w-5 h-5 text-destructive" />
                          ) : null}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {!showAnswer && (
                <Button
                  onClick={submitAnswer}
                  disabled={selectedAnswer === null}
                  className={`w-full ${isDarkMode ? 'ai-gradient ai-glow disabled:opacity-50' : ''}`}
                >
                  Submit Answer
                </Button>
              )}

              {showAnswer && (
                <div className="space-y-4">
                  <div className={`${isDarkMode ? 'ai-gradient-subtle ai-border-glow' : 'bg-gray-50 border border-gray-200'} p-4 rounded-lg`}>
                    <h4 className={`font-semibold mb-2 ${isDarkMode ? 'text-ai-text-primary' : 'text-gray-800'}`}>
                      Explanation:
                    </h4>
                    <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-ai-text-secondary' : 'text-gray-700'}`}>
                      {question.explanation}
                    </p>
                  </div>
                  
                  <Button
                    onClick={nextQuestion}
                    className={`w-full ${isDarkMode ? 'ai-gradient ai-glow' : ''}`}
                  >
                    {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Results'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AITutorialGame;