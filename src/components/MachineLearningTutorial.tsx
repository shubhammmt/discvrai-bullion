import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Timer, Cpu, BarChart3, CheckCircle, XCircle, Trophy, Play, Terminal, Loader2, RefreshCw, TrendingUp } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { Textarea } from './ui/textarea';

interface Question {
  id: number;
  title: string;
  theory: string;
  example: string;
  pythonCode: string;
  codeExplanation: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  image: string;
}

const machineLearningQuestions: Question[] = [
  {
    id: 1,
    title: "Supervised vs Unsupervised Learning",
    theory: "Machine Learning is divided into supervised learning (with labeled data) and unsupervised learning (finding patterns in unlabeled data). Supervised learning predicts outcomes, while unsupervised learning discovers hidden structures.",
    example: "Supervised: Predicting house prices based on size, location (you have actual sale prices to learn from). Unsupervised: Grouping customers by shopping behavior without knowing the 'correct' groups beforehand.",
    pythonCode: `import numpy as np
# Simulating ML concepts for demo

# Create sample classification data
X_supervised = np.random.randn(100, 2)
y_supervised = (X_supervised[:, 0] + X_supervised[:, 1] > 0).astype(int)

# Simple accuracy calculation
correct_predictions = np.sum(y_supervised == y_supervised)  # Always correct for demo
accuracy = correct_predictions / len(y_supervised)

# Train a supervised model
supervised_model = LogisticRegression()
supervised_model.fit(X_supervised, y_supervised)
accuracy = supervised_model.score(X_supervised, y_supervised)

# Unsupervised Learning Example - Clustering
X_unsupervised, _ = make_blobs(n_samples=100, centers=3, n_features=2, 
                              random_state=42)

# Train an unsupervised model
unsupervised_model = KMeans(n_clusters=3, random_state=42)
clusters = unsupervised_model.fit_predict(X_unsupervised)

print(f"Supervised Learning Accuracy: {accuracy:.3f}")
print(f"Unsupervised Learning found {len(set(clusters))} clusters")
print(f"Sample cluster assignments: {clusters[:10]}")`,
    codeExplanation: "This demonstrates both paradigms: supervised learning uses labeled data to predict outcomes, while unsupervised learning finds hidden patterns like clusters without labels.",
    question: "What is the main difference between supervised and unsupervised learning?",
    options: [
      "Supervised learning is faster than unsupervised learning",
      "Supervised learning uses labeled data, unsupervised doesn't",
      "Unsupervised learning is more accurate",
      "Supervised learning only works with numbers"
    ],
    correctAnswer: 1,
    explanation: "Supervised learning requires labeled training data (input-output pairs), while unsupervised learning finds patterns in data without labels.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    title: "Linear & Logistic Regression",
    theory: "Linear regression predicts continuous values by finding the best line through data points. Logistic regression predicts probabilities for classification by using a sigmoid function to map any real number to a value between 0 and 1.",
    example: "Linear: Predicting house prices based on square footage (continuous output). Logistic: Predicting if an email is spam or not spam (binary classification with probability output).",
    pythonCode: `import numpy as np
from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, accuracy_score
import matplotlib.pyplot as plt

# Linear Regression Example
# Generate sample house data
np.random.seed(42)
house_sizes = np.random.normal(1500, 500, 100).reshape(-1, 1)
house_prices = house_sizes.flatten() * 100 + np.random.normal(0, 10000, 100)

# Train linear regression
linear_model = LinearRegression()
linear_model.fit(house_sizes, house_prices)
price_predictions = linear_model.predict(house_sizes)
mse = mean_squared_error(house_prices, price_predictions)

# Logistic Regression Example
# Generate classification data
X_class = np.random.randn(100, 2)
y_class = (X_class[:, 0] + X_class[:, 1] > 0).astype(int)

# Train logistic regression
logistic_model = LogisticRegression()
logistic_model.fit(X_class, y_class)
class_predictions = logistic_model.predict(X_class)
accuracy = accuracy_score(y_class, class_predictions)

print(f"Linear Regression MSE: {mse:.0f}")
print(f"House price prediction for 2000 sq ft: ${linear_model.predict([[2000]])[0]:.0f}")
print(f"Logistic Regression Accuracy: {accuracy:.3f}")
print(f"Sample probabilities: {logistic_model.predict_proba(X_class[:3])}")`,
    codeExplanation: "Linear regression finds the best-fit line for continuous predictions. Logistic regression uses the sigmoid function to output probabilities for classification tasks.",
    question: "When would you use logistic regression instead of linear regression?",
    options: [
      "When you want to predict continuous values",
      "When you need to classify data into categories",
      "When you have very large datasets",
      "When you want faster training"
    ],
    correctAnswer: 1,
    explanation: "Logistic regression is used for classification tasks where you need to predict categories or probabilities, not continuous values.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    title: "Decision Trees & Random Forest",
    theory: "Decision trees make predictions by asking a series of yes/no questions about the data features. Random Forest combines many decision trees to make more robust predictions and reduce overfitting.",
    example: "A decision tree for loan approval might ask: 'Income > $50k?' → 'Credit score > 700?' → 'Approve/Deny'. Random Forest asks multiple different trees and votes on the final decision.",
    pythonCode: `import numpy as np
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report

# Generate sample dataset
X, y = make_classification(n_samples=1000, n_features=4, n_informative=3,
                         n_redundant=1, n_clusters_per_class=1, random_state=42)

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Single Decision Tree
tree_model = DecisionTreeClassifier(max_depth=5, random_state=42)
tree_model.fit(X_train, y_train)
tree_pred = tree_model.predict(X_test)
tree_accuracy = accuracy_score(y_test, tree_pred)

# Random Forest (multiple trees)
forest_model = RandomForestClassifier(n_estimators=100, max_depth=5, random_state=42)
forest_model.fit(X_train, y_train)
forest_pred = forest_model.predict(X_test)
forest_accuracy = accuracy_score(y_test, forest_pred)

# Feature importance
feature_importance = forest_model.feature_importances_

print(f"Single Decision Tree Accuracy: {tree_accuracy:.3f}")
print(f"Random Forest Accuracy: {forest_accuracy:.3f}")
print(f"Feature Importances: {feature_importance}")
print(f"Most important feature: Feature {np.argmax(feature_importance)}")`,
    codeExplanation: "Decision trees create interpretable models with clear decision paths. Random Forest improves accuracy by combining many trees and reduces overfitting through ensemble learning.",
    question: "What is the main advantage of Random Forest over a single Decision Tree?",
    options: [
      "Random Forest is always faster to train",
      "Random Forest reduces overfitting and improves accuracy",
      "Random Forest uses less memory",
      "Random Forest only works with numerical data"
    ],
    correctAnswer: 1,
    explanation: "Random Forest combines multiple decision trees, which reduces overfitting and typically provides better generalization and accuracy than a single tree.",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    title: "Model Evaluation & Metrics",
    theory: "Evaluation metrics help us understand how well our model performs. Accuracy measures overall correctness, precision measures how many predicted positives are actually positive, and recall measures how many actual positives we found.",
    example: "Medical diagnosis: High precision means fewer false alarms (healthy patients diagnosed as sick). High recall means catching most actual diseases (fewer missed diagnoses).",
    pythonCode: `import numpy as np
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix
from sklearn.datasets import make_classification

# Generate imbalanced dataset (more common in real world)
X, y = make_classification(n_samples=1000, n_features=10, n_informative=5,
                         n_redundant=2, weights=[0.9, 0.1], random_state=42)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)
predictions = model.predict(X_test)

# Calculate metrics
accuracy = accuracy_score(y_test, predictions)
precision = precision_score(y_test, predictions)
recall = recall_score(y_test, predictions)
f1 = f1_score(y_test, predictions)

# Confusion Matrix
cm = confusion_matrix(y_test, predictions)

# Cross-validation for robust evaluation
cv_scores = cross_val_score(model, X, y, cv=5, scoring='accuracy')

print(f"Accuracy: {accuracy:.3f}")
print(f"Precision: {precision:.3f}")
print(f"Recall: {recall:.3f}")
print(f"F1-Score: {f1:.3f}")
print(f"Confusion Matrix:\\n{cm}")
print(f"Cross-validation scores: {cv_scores}")
print(f"CV Mean ± Std: {cv_scores.mean():.3f} ± {cv_scores.std():.3f}")`,
    codeExplanation: "Different metrics serve different purposes: accuracy for overall performance, precision for minimizing false positives, recall for catching all positives, and F1-score for balanced performance.",
    question: "In a cancer detection model, which metric would be most important to optimize?",
    options: [
      "Accuracy - to get the most predictions right",
      "Precision - to avoid false alarms",
      "Recall - to catch all actual cancer cases",
      "F1-score - for balanced performance"
    ],
    correctAnswer: 2,
    explanation: "For cancer detection, recall is crucial because missing actual cancer cases (false negatives) can be life-threatening. It's better to have some false alarms than miss real cases.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop"
  },
  {
    id: 5,
    title: "Data Preprocessing & Feature Engineering",
    theory: "Raw data often needs cleaning and transformation before machine learning. This includes handling missing values, scaling features, encoding categorical variables, and creating new features that help the model learn better patterns.",
    example: "Converting 'Date' into 'Day of Week' and 'Month', scaling income from $20k-$200k to 0-1 range, filling missing ages with median values, and encoding 'Color' as numbers (Red=0, Blue=1, Green=2).",
    pythonCode: `import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler, LabelEncoder, OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Create sample dataset with common data issues
np.random.seed(42)
data = {
    'age': np.random.normal(35, 10, 1000),
    'income': np.random.normal(50000, 20000, 1000),
    'education': np.random.choice(['High School', 'Bachelor', 'Master', 'PhD'], 1000),
    'city': np.random.choice(['NYC', 'LA', 'Chicago', 'Houston'], 1000),
    'target': np.random.choice([0, 1], 1000)
}

# Introduce missing values
data['age'][np.random.choice(1000, 50, replace=False)] = np.nan
data['income'][np.random.choice(1000, 30, replace=False)] = np.nan

df = pd.DataFrame(data)

# 1. Handle missing values
imputer = SimpleImputer(strategy='median')
df[['age', 'income']] = imputer.fit_transform(df[['age', 'income']])

# 2. Scale numerical features
scaler = StandardScaler()
df[['age', 'income']] = scaler.fit_transform(df[['age', 'income']])

# 3. Encode categorical variables
# Label encoding for ordinal data
education_encoder = LabelEncoder()
df['education_encoded'] = education_encoder.fit_transform(df['education'])

# One-hot encoding for nominal data
city_encoded = pd.get_dummies(df['city'], prefix='city')
df = pd.concat([df, city_encoded], axis=1)

# 4. Feature engineering - create new features
df['age_income_interaction'] = df['age'] * df['income']
df['high_education'] = (df['education_encoded'] >= 2).astype(int)

# Prepare for modeling
feature_columns = ['age', 'income', 'education_encoded', 'age_income_interaction', 'high_education'] + list(city_encoded.columns)
X = df[feature_columns]
y = df['target']

# Test the preprocessed data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = RandomForestClassifier(random_state=42)
model.fit(X_train, y_train)
accuracy = accuracy_score(y_test, model.predict(X_test))

print(f"Dataset shape after preprocessing: {X.shape}")
print(f"Missing values handled: {df.isnull().sum().sum()} remaining")
print(f"Features created: {len(feature_columns)}")
print(f"Model accuracy with preprocessed data: {accuracy:.3f}")
print(f"Sample of processed data:\\n{X.head()}")`,
    codeExplanation: "Preprocessing transforms raw data into a format suitable for machine learning: filling missing values, scaling features to similar ranges, encoding categories as numbers, and creating meaningful new features.",
    question: "Why is feature scaling important in machine learning?",
    options: [
      "It makes the model train faster",
      "It ensures all features contribute equally to distance calculations",
      "It reduces the size of the dataset",
      "It automatically improves accuracy"
    ],
    correctAnswer: 1,
    explanation: "Feature scaling ensures that features with larger scales (like income in thousands) don't dominate features with smaller scales (like age), allowing all features to contribute fairly to the model.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
  }
];

const MachineLearningTutorial: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  const [isActive, setIsActive] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [showCode, setShowCode] = useState(false);
  const [pythonCode, setPythonCode] = useState('');
  const [pythonOutput, setPythonOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [pyodide, setPyodide] = useState<any>(null);
  const pyodideRef = useRef<any>(null);

  // Initialize Pyodide
  useEffect(() => {
    const initPyodide = async () => {
      try {
        const { loadPyodide } = await import('pyodide');
        const pyodideInstance = await loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.28.2/full/"
        });
        await pyodideInstance.loadPackage(['numpy', 'pandas', 'scikit-learn', 'matplotlib']);
        pyodideRef.current = pyodideInstance;
        setPyodide(pyodideInstance);
      } catch (error) {
        console.error('Failed to load Pyodide:', error);
      }
    };
    initPyodide();
  }, []);

  // Set initial Python code when question changes
  useEffect(() => {
    if (machineLearningQuestions[currentQuestion]) {
      setPythonCode(machineLearningQuestions[currentQuestion].pythonCode);
      setPythonOutput('');
    }
  }, [currentQuestion]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
        setTotalTime(prevTime => prevTime + 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimeUp();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const handleTimeUp = () => {
    if (!showExplanation) {
      setShowExplanation(true);
      setIsActive(false);
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setIsActive(true);
    setCurrentQuestion(0);
    setScore(0);
    setCorrectAnswers(0);
    setTotalTime(0);
    setTimeLeft(900);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    setIsActive(false);
    
    if (answerIndex === machineLearningQuestions[currentQuestion].correctAnswer) {
      setScore(score + 20);
      setCorrectAnswers(correctAnswers + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < machineLearningQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setShowCode(false);
      setTimeLeft(180); // 3 minutes per question
      setIsActive(true);
    } else {
      setGameCompleted(true);
      setIsActive(false);
    }
  };

  const runPythonCode = async () => {
    if (!pyodideRef.current) {
      setPythonOutput('Python environment not ready. Please wait...');
      return;
    }

    setIsRunning(true);
    try {
      pyodideRef.current.runPython(`
import sys
import io
old_stdout = sys.stdout
sys.stdout = io.StringIO()
      `);

      pyodideRef.current.runPython(pythonCode);
      const output = pyodideRef.current.runPython('sys.stdout.getvalue()');
      pyodideRef.current.runPython('sys.stdout = old_stdout');
      
      setPythonOutput(output || 'Code executed successfully (no output)');
    } catch (error: any) {
      setPythonOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setCorrectAnswers(0);
    setTimeLeft(900);
    setIsActive(false);
    setGameStarted(false);
    setGameCompleted(false);
    setTotalTime(0);
    setShowCode(false);
    setPythonCode('');
    setPythonOutput('');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPerformanceBadge = () => {
    const accuracy = (correctAnswers / machineLearningQuestions.length) * 100;
    const avgTimePerQuestion = totalTime / machineLearningQuestions.length;
    
    if (accuracy >= 90 && avgTimePerQuestion < 150) return { name: "ML Engineering Expert", color: "bg-gradient-to-r from-yellow-400 to-yellow-600" };
    if (accuracy >= 80 && avgTimePerQuestion < 180) return { name: "Data Science Specialist", color: "bg-gradient-to-r from-blue-400 to-blue-600" };
    if (accuracy >= 70) return { name: "ML Practitioner", color: "bg-gradient-to-r from-green-400 to-green-600" };
    return { name: "Future Data Scientist", color: "bg-gradient-to-r from-purple-400 to-purple-600" };
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-slate-800/90 border-slate-700 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <TrendingUp className="h-16 w-16 text-green-400" />
            </div>
            <CardTitle className="text-3xl font-bold text-white mb-2">
              Machine Learning Fundamentals
            </CardTitle>
            <p className="text-slate-300 text-lg">
              Master practical ML concepts with hands-on Python implementation
            </p>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-300">
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-400">{machineLearningQuestions.length}</div>
                <div className="text-sm">Core Concepts</div>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">15 min</div>
                <div className="text-sm">Total Duration</div>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-400">Sklearn</div>
                <div className="text-sm">Real Tools</div>
              </div>
            </div>
            
            <div className="bg-slate-700/30 p-4 rounded-lg text-left">
              <h3 className="font-semibold text-white mb-2">What you'll learn:</h3>
              <ul className="text-slate-300 space-y-1 text-sm">
                <li>• Supervised vs Unsupervised Learning paradigms</li>
                <li>• Linear & Logistic Regression implementation</li>
                <li>• Decision Trees and Random Forest ensemble methods</li>
                <li>• Model evaluation metrics and cross-validation</li>
                <li>• Data preprocessing and feature engineering</li>
              </ul>
            </div>
            
            <Button 
              onClick={startGame}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 text-lg"
            >
              <Play className="mr-2 h-5 w-5" />
              Start ML Workshop
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (gameCompleted) {
    const badge = getPerformanceBadge();
    const accuracy = (correctAnswers / machineLearningQuestions.length) * 100;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-slate-800/90 border-slate-700 backdrop-blur-sm">
          <CardHeader className="text-center">
            <Trophy className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
            <CardTitle className="text-3xl font-bold text-white mb-2">
              Workshop Complete!
            </CardTitle>
            <div className={`inline-block px-4 py-2 rounded-full text-white font-semibold ${badge.color}`}>
              {badge.name}
            </div>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="grid grid-cols-2 gap-4 text-slate-300">
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-400">{correctAnswers}/{machineLearningQuestions.length}</div>
                <div className="text-sm">Correct Answers</div>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">{accuracy.toFixed(0)}%</div>
                <div className="text-sm">Accuracy</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Button 
                onClick={resetGame}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQ = machineLearningQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / machineLearningQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-slate-800/90 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-xl font-bold text-white">Machine Learning Workshop</h1>
              <p className="text-slate-300 text-sm">Question {currentQuestion + 1} of {machineLearningQuestions.length}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-green-400">
                <Timer className="h-4 w-4" />
                <span className="font-mono">{formatTime(timeLeft)}</span>
              </div>
              <Badge variant="secondary" className="bg-slate-700 text-slate-300">
                Score: {score}
              </Badge>
            </div>
          </div>
          <Progress value={progress} className="mt-3 h-2" />
        </div>

        {/* Question Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Theory & Code Section */}
          <div className="space-y-4">
            <Card className="bg-slate-800/90 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-green-400" />
                  {currentQ.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-green-400 mb-2">Theory:</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">{currentQ.theory}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-400 mb-2">Real-world Example:</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">{currentQ.example}</p>
                </div>
                
                <img 
                  src={currentQ.image} 
                  alt={currentQ.title}
                  className="w-full h-32 object-cover rounded-lg"
                />
              </CardContent>
            </Card>

            {/* Interactive Code Section */}
            <Card className="bg-slate-800/90 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-purple-400" />
                  Interactive Python Code
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={pythonCode}
                  onChange={(e) => setPythonCode(e.target.value)}
                  className="font-mono text-sm bg-slate-900 border-slate-600 text-green-400 min-h-[200px]"
                  placeholder="Python code will appear here..."
                />
                <Button 
                  onClick={runPythonCode}
                  disabled={isRunning || !pyodide}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  {isRunning ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Running...
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Run Code
                    </>
                  )}
                </Button>
                {pythonOutput && (
                  <div className="bg-slate-900 p-3 rounded border border-slate-600">
                    <pre className="text-green-400 text-sm whitespace-pre-wrap">{pythonOutput}</pre>
                  </div>
                )}
                <div className="text-xs text-slate-400">
                  <p><strong>Code Explanation:</strong> {currentQ.codeExplanation}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Question Section */}
          <div className="space-y-4">
            <Card className="bg-slate-800/90 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-yellow-400" />
                  Question
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-white font-medium">{currentQ.question}</p>
                
                <div className="space-y-2">
                  {currentQ.options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showExplanation}
                      variant={
                        showExplanation
                          ? index === currentQ.correctAnswer
                            ? "default"
                            : selectedAnswer === index
                            ? "destructive"
                            : "outline"
                          : selectedAnswer === index
                          ? "secondary"
                          : "outline"
                      }
                      className={`w-full text-left justify-start h-auto p-3 ${
                        showExplanation && index === currentQ.correctAnswer
                          ? "bg-green-600 hover:bg-green-600 text-white border-green-500"
                          : showExplanation && selectedAnswer === index && index !== currentQ.correctAnswer
                          ? "bg-red-600 hover:bg-red-600 text-white border-red-500"
                          : "bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {showExplanation && index === currentQ.correctAnswer && (
                          <CheckCircle className="h-4 w-4 text-white" />
                        )}
                        {showExplanation && selectedAnswer === index && index !== currentQ.correctAnswer && (
                          <XCircle className="h-4 w-4 text-white" />
                        )}
                        <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                        <span className="text-sm">{option}</span>
                      </div>
                    </Button>
                  ))}
                </div>

                {showExplanation && (
                  <Alert className="bg-blue-900/20 border-blue-700">
                    <AlertDescription className="text-blue-200">
                      <strong>Explanation:</strong> {currentQ.explanation}
                    </AlertDescription>
                  </Alert>
                )}

                {showExplanation && (
                  <Button 
                    onClick={nextQuestion}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  >
                    {currentQuestion === machineLearningQuestions.length - 1 ? 'Complete Workshop' : 'Next Question'}
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MachineLearningTutorial;