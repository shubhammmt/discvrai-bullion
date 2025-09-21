import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import {
  Code,
  Brain,
  Trophy,
  Clock,
  Users,
  Target,
  Zap,
  TrendingUp,
  Laptop,
  BookOpen,
  Award,
  ArrowRight,
  Play,
  CheckCircle,
  Lightbulb,
  DollarSign,
  Building2,
  ChevronRight,
  Monitor,
  FileCode,
  BarChart3,
  Rocket
} from 'lucide-react';

const AIMasteryWorkshop = () => {
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState(0);
  const [expandedCareer, setExpandedCareer] = useState(null);

  const workshopPhases = [
    {
      phase: "AI Theory + Instant Practice",
      duration: "30 minutes",
      icon: BookOpen,
      color: "bg-blue-500",
      modules: [
        {
          title: "What is AI?",
          duration: "10 min",
          question: "How does Netflix know what you want to watch next?",
          concepts: ["Pattern recognition", "Recommendation systems", "Machine learning"],
          codeExample: `user_ratings = [5, 3, 4, 2, 5]
similar_users = find_similar_users(user_ratings)
recommendations = get_recommendations(similar_users)
print(f"Netflix recommends: {recommendations}")
# Output: ['Stranger Things', 'Dark', 'Black Mirror']`
        },
        {
          title: "Machine Learning Basics",
          duration: "10 min",
          question: "How does your iPhone recognize your face instantly?",
          concepts: ["Training data", "Neural networks", "Feature extraction"],
          codeExample: `from ai_tools import FaceRecognizer

recognizer = FaceRecognizer()
recognizer.train(["smiling_faces.jpg", "serious_faces.jpg"])
result = recognizer.predict("new_face.jpg")
confidence = recognizer.confidence_score()

print(f"This person is: {result} (confidence: {confidence}%)")
# Output: This person is: smiling (confidence: 94%)`
        },
        {
          title: "AI in Finance",
          duration: "10 min",
          question: "How do trading algorithms make millions in milliseconds?",
          concepts: ["Predictive modeling", "Pattern recognition", "Automated decisions"],
          codeExample: `stock_prices = get_stock_data("RELIANCE", days=30)
prediction = ai_predict_price(stock_prices)
actual_price = get_current_price("RELIANCE")
profit = calculate_profit(prediction, actual_price, shares=100)

print(f"AI predicted: ₹{prediction}")
print(f"Actual price: ₹{actual_price}")
print(f"AI made ₹{profit} profit!")
# Output: AI made ₹2,450 profit!`
        }
      ]
    },
    {
      phase: "Hands-On AI Building",
      duration: "90 minutes",
      icon: Code,
      color: "bg-green-500",
      project: "Build Your Personal AI Assistant",
      steps: [
        {
          title: "Data Understanding",
          duration: "20 min",
          description: "Explore real market datasets and identify patterns",
          tools: ["Pandas", "Real-time data", "Interactive analysis"]
        },
        {
          title: "AI Model Training",
          duration: "30 min",
          description: "Train your first predictive model using platform tools",
          tools: ["SimplePredictor", "Feature engineering", "Model validation"]
        },
        {
          title: "Real-World Application",
          duration: "25 min",
          description: "Deploy AI for actual stock portfolio analysis",
          tools: ["Live data feeds", "Trading decisions", "Risk assessment"]
        },
        {
          title: "AI Competition",
          duration: "15 min",
          description: "Submit your model to live leaderboard contest",
          tools: ["Real-time ranking", "Performance tracking", "Prize eligibility"]
        }
      ]
    },
    {
      phase: "Career Pathways & Platform Engagement",
      duration: "30 minutes",
      icon: Rocket,
      color: "bg-purple-500",
      focus: "Real-world AI career opportunities and platform progression"
    }
  ];

  const careerPaths = [
    {
      title: "AI/ML Engineer",
      salary: "₹15-50 LPA",
      companies: ["Google", "Microsoft", "Amazon"],
      description: "Build and deploy machine learning systems at scale",
      skills: ["Python", "TensorFlow", "Cloud platforms", "MLOps"],
      demand: "Very High"
    },
    {
      title: "Quantitative Analyst",
      salary: "₹20-60 LPA",
      companies: ["Goldman Sachs", "JP Morgan", "Citadel"],
      description: "Use AI for financial modeling and algorithmic trading",
      skills: ["Statistics", "Financial modeling", "Python/R", "Risk analysis"],
      demand: "High"
    },
    {
      title: "Data Scientist",
      salary: "₹12-40 LPA",
      companies: ["Flipkart", "Ola", "Paytm"],
      description: "Extract insights from data to drive business decisions",
      skills: ["Machine learning", "Statistics", "SQL", "Business acumen"],
      demand: "Very High"
    },
    {
      title: "AI Research Engineer",
      salary: "₹25-70 LPA",
      companies: ["OpenAI", "Anthropic", "Startups"],
      description: "Push the boundaries of AI technology and research",
      skills: ["Deep learning", "Research", "Mathematics", "Innovation"],
      demand: "Ultra High"
    }
  ];

  const platformFeatures = [
    {
      title: "Code IDE Integration",
      icon: Monitor,
      features: [
        "Browser-based development environment",
        "Real-time code execution (Python/JavaScript)",
        "Syntax highlighting and error detection",
        "Auto-complete for AI libraries"
      ]
    },
    {
      title: "Pre-loaded AI Libraries",
      icon: FileCode,
      features: [
        "Pandas, NumPy for data manipulation",
        "Scikit-learn for machine learning",
        "Custom AI framework for beginners",
        "Live financial data APIs"
      ]
    },
    {
      title: "Contest System",
      icon: Trophy,
      features: [
        "Real-time leaderboards",
        "Model accuracy tracking",
        "Peer comparison tools",
        "Achievement badges and rewards"
      ]
    },
    {
      title: "Performance Analytics",
      icon: BarChart3,
      features: [
        "Learning progress tracking",
        "Code quality assessment",
        "Career fit analysis",
        "Personalized recommendations"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              3-Hour Interactive AI Workshop
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              AI Mastery Through Code
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Build AI Models, See Immediate Results, Launch Your Tech Career
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <Users className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">1st-Final Year</div>
              <div className="text-blue-100">All Engineering Branches</div>
            </div>
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <Clock className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">15-30 Min</div>
              <div className="text-blue-100">Bite-sized Sessions</div>
            </div>
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <Code className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">Live Code</div>
              <div className="text-blue-100">Embedded IDE</div>
            </div>
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <DollarSign className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">₹15-70 LPA</div>
              <div className="text-blue-100">Career Outcomes</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Workshop Structure */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-3xl text-center text-slate-800 mb-6">
              3-Phase Learning Journey
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {workshopPhases.map((phase, index) => {
                const IconComponent = phase.icon;
                return (
                  <div key={index} className="border rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className={`${phase.color} p-3 rounded-lg mr-4`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-slate-800">
                          Phase {index + 1}: {phase.phase}
                        </h3>
                        <Badge variant="outline" className="mt-1">
                          {phase.duration}
                        </Badge>
                      </div>
                    </div>

                    {/* Phase 1 - Modules */}
                    {phase.modules && (
                      <div className="grid md:grid-cols-3 gap-4">
                        {phase.modules.map((module, idx) => (
                          <div key={idx} className="bg-slate-50 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-slate-800">{module.title}</h4>
                              <Badge variant="secondary">{module.duration}</Badge>
                            </div>
                            <p className="text-sm text-blue-600 mb-3 italic">"{module.question}"</p>
                            <div className="space-y-2 mb-3">
                              {module.concepts.map((concept, i) => (
                                <div key={i} className="flex items-center text-sm text-slate-600">
                                  <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                                  {concept}
                                </div>
                              ))}
                            </div>
                            <div className="bg-slate-900 rounded p-2">
                              <pre className="text-xs text-green-400 overflow-x-auto">
                                {module.codeExample}
                              </pre>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Phase 2 - Project Steps */}
                    {phase.steps && (
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-4">
                          Project: {phase.project}
                        </h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          {phase.steps.map((step, idx) => (
                            <div key={idx} className="bg-slate-50 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="font-semibold text-slate-800">{step.title}</h5>
                                <Badge variant="outline">{step.duration}</Badge>
                              </div>
                              <p className="text-sm text-slate-600 mb-3">{step.description}</p>
                              <div className="flex flex-wrap gap-1">
                                {step.tools.map((tool, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs">
                                    {tool}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Phase 3 - Career Focus */}
                    {phase.focus && (
                      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4">
                        <p className="text-slate-700 font-medium">{phase.focus}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Platform Features */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-800">Platform Technical Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {platformFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="border rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <IconComponent className="h-6 w-6 text-blue-600 mr-3" />
                      <h4 className="font-semibold text-slate-800">{feature.title}</h4>
                    </div>
                    <ul className="space-y-2">
                      {feature.features.map((item, idx) => (
                        <li key={idx} className="text-sm text-slate-600 flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Career Pathways */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-800">High-Paying AI Career Paths</CardTitle>
            <p className="text-slate-600">Real opportunities awaiting skilled AI engineers</p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {careerPaths.map((career, index) => (
                <div key={index} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-slate-800">{career.title}</h4>
                    <Badge variant={career.demand === 'Ultra High' ? 'default' : 'secondary'}>
                      {career.demand} Demand
                    </Badge>
                  </div>
                  
                  <div className="text-2xl font-bold text-green-600 mb-2">{career.salary}</div>
                  
                  <p className="text-sm text-slate-600 mb-3">{career.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="text-sm font-medium text-slate-700">Top Companies:</div>
                    <div className="flex flex-wrap gap-1">
                      {career.companies.map((company, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {company}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-slate-700">Key Skills:</div>
                    <div className="flex flex-wrap gap-1">
                      {career.skills.map((skill, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sample Code Environment */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-800">Interactive Code Environment</CardTitle>
            <p className="text-slate-600">Experience the platform's embedded IDE</p>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-900 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <Badge className="bg-green-600 text-white">Live Code Editor</Badge>
              </div>
              
              <pre className="text-green-400 text-sm overflow-x-auto">
{`# AI Portfolio Analysis - Live Workshop Example
import pandas as pd
from platform_ai import SimplePredictor

# Load real market data
stock_data = platform.load_dataset('indian_stocks_2024')
print(f"Loaded {len(stock_data)} stocks")

# Train AI model
predictor = SimplePredictor(model_type="stock_prediction")
predictor.add_feature("moving_average_5", stock_data['ma_5'])
predictor.add_feature("volume", stock_data['volume'])
predictor.set_target(stock_data['next_day_direction'])

# Train and get results
result = predictor.train()
print(f"Model trained! Accuracy: {result.accuracy}%")

# Analyze portfolio
portfolio = ["RELIANCE", "TCS", "INFY", "HDFC"]
for stock in portfolio:
    prediction = predictor.predict(platform.get_live_data(stock))
    print(f"{stock}: {prediction.direction} (confidence: {prediction.confidence}%)")

# Submit to contest
contest_result = platform.submit_ai_model(predictor, "ai_mastery_2024")
print(f"Submitted! Current rank: #{contest_result.rank}")
`}
              </pre>
              
              <div className="mt-4 flex items-center justify-between">
                <div className="text-green-400 text-sm">
                  Output: Model accuracy: 87% | Contest rank: #23 | Prize eligible: ✓
                </div>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <Play className="h-4 w-4 mr-2" />
                  Run Code
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card>
          <CardContent className="text-center py-12">
            <Brain className="h-16 w-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Start Your AI Engineering Journey Today
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Join thousands of engineering students building AI models, competing in real-time, 
              and launching careers with India's top tech companies.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-blue-50 rounded-lg p-4">
                <Lightbulb className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="font-semibold text-slate-800">Learn by Doing</div>
                <div className="text-sm text-slate-600">Build real AI models from day one</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <Trophy className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="font-semibold text-slate-800">Compete & Win</div>
                <div className="text-sm text-slate-600">Real-time leaderboards and prizes</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <Building2 className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="font-semibold text-slate-800">Career Ready</div>
                <div className="text-sm text-slate-600">Direct pathway to top companies</div>
              </div>
            </div>
            
            <div className="flex justify-center gap-4">
              <Button 
                size="lg" 
                className="px-8 py-4 text-lg"
                onClick={() => navigate('/engineer-showcase')}
              >
                Start Workshop
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-4 text-lg"
              >
                View Demo
                <Monitor className="h-5 w-5 ml-2" />
              </Button>
            </div>
            
            <div className="mt-6 text-sm text-slate-500">
              Next workshop starts in <span className="font-semibold text-slate-700">2 days, 6 hours</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIMasteryWorkshop;