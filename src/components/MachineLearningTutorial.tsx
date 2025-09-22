import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, Brain, Trophy, Play, RotateCcw, CheckCircle, XCircle } from 'lucide-react';

interface Question {
  id: number;
  title: string;
  theory: string;
  example: string;
  pythonCode: string;
  explanation: string;
  options: string[];
  correctAnswer: number;
  imageUrl: string;
}

const machineLearningQuestions: Question[] = [
  {
    id: 1,
    title: "Linear Regression Fundamentals",
    theory: "Linear regression is a fundamental algorithm that models the relationship between a dependent variable and independent variables by fitting a linear equation. It assumes a linear relationship and uses least squares to minimize prediction errors.",
    example: "Predicting house prices based on size, location, and age. If size increases by 100 sq ft, price might increase by $15,000 (linear relationship).",
    pythonCode: "import numpy as np\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.metrics import r2_score\n\n# Sample data: house sizes vs prices\nsizes = np.array([1000, 1200, 1400, 1600, 1800, 2000]).reshape(-1, 1)\nprices = np.array([150000, 180000, 210000, 240000, 270000, 300000])\n\n# Create and train model\nmodel = LinearRegression()\nmodel.fit(sizes, prices)\n\n# Make predictions\npredicted_prices = model.predict(sizes)\n\n# Calculate R² score\nr2 = r2_score(prices, predicted_prices)\n\nprint(f'Model equation: Price = {model.coef_[0]:.2f} * Size + {model.intercept_:.2f}')\nprint(f'R² Score: {r2:.4f}')\nprint(f'Prediction for 1500 sq ft: ${model.predict([[1500]])[0]:,.2f}')",
    explanation: "Linear regression finds the best-fit line through data points. The R² score measures how well the model explains the data variance (1.0 = perfect fit). The equation shows the relationship: for every additional sq ft, price increases by the coefficient amount.",
    options: [
      "Linear regression can only work with one input variable",
      "Linear regression assumes a linear relationship between variables",
      "Linear regression always produces 100% accurate predictions",
      "Linear regression cannot handle continuous target variables"
    ],
    correctAnswer: 1,
    imageUrl: "/src/assets/machine-learning-tutorial.jpg"
  },
  {
    id: 2,
    title: "Decision Trees & Classification",
    theory: "Decision trees create a tree-like model of decisions by splitting data based on feature values that best separate classes. Each internal node represents a feature test, branches represent outcomes, and leaves represent class predictions.",
    example: "Email spam detection: The tree might first check if 'urgent' appears > 3 times, then check sender domain, then check for suspicious links to classify as spam/not spam.",
    pythonCode: "from sklearn.tree import DecisionTreeClassifier\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import accuracy_score, classification_report\nimport numpy as np\n\n# Sample email features: [urgent_count, suspicious_links, unknown_sender]\nX = np.array([\n    [0, 0, 0], [1, 0, 0], [3, 1, 1], [5, 2, 1], [0, 0, 1],\n    [2, 1, 0], [4, 3, 1], [1, 0, 0], [6, 2, 1], [0, 1, 0]\n])\n# Labels: 0 = not spam, 1 = spam\ny = np.array([0, 0, 1, 1, 0, 1, 1, 0, 1, 0])\n\n# Split data\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)\n\n# Train decision tree\ndt = DecisionTreeClassifier(max_depth=3, random_state=42)\ndt.fit(X_train, y_train)\n\n# Make predictions\ny_pred = dt.predict(X_test)\naccuracy = accuracy_score(y_test, y_pred)\n\nprint(f'Accuracy: {accuracy:.2f}')\nprint('Feature importance:')\nfeature_names = ['urgent_count', 'suspicious_links', 'unknown_sender']\nimportances = dt.feature_importances_\nfor name, importance in zip(feature_names, importances):\n    print(f'{name}: {importance:.3f}')",
    explanation: "Decision trees make predictions by following a series of if-else conditions. They're interpretable and show which features are most important for decisions. The tree visualization shows the decision path and class probabilities at each node.",
    options: [
      "Decision trees can only handle numerical features",
      "Decision trees are prone to overfitting with deep trees",
      "Decision trees cannot provide feature importance scores",
      "Decision trees always produce the same result regardless of data"
    ],
    correctAnswer: 1,
    imageUrl: "/src/assets/machine-learning-tutorial.jpg"
  },
  {
    id: 3,
    title: "Model Evaluation & Cross-Validation",
    theory: "Model evaluation assesses how well a model generalizes to unseen data. Cross-validation splits data into multiple folds, training on some and testing on others repeatedly. This provides more robust performance estimates than single train-test splits.",
    example: "5-fold CV divides data into 5 parts: trains on 4 parts, tests on 1, repeats 5 times. Final score is the average. This helps detect if a model is overfitting or if performance varies significantly.",
    pythonCode: "from sklearn.model_selection import cross_val_score, StratifiedKFold\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.svm import SVC\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.datasets import make_classification\nimport numpy as np\n\n# Generate sample dataset\nX, y = make_classification(n_samples=1000, n_features=10, n_classes=2, n_informative=5, random_state=42)\n\n# Define models to compare\nmodels = {\n    'Random Forest': RandomForestClassifier(n_estimators=100, random_state=42),\n    'SVM': SVC(kernel='rbf', random_state=42),\n    'Logistic Regression': LogisticRegression(random_state=42)\n}\n\n# Perform 5-fold cross-validation\ncv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)\nresults = {}\n\nprint('Cross-Validation Results (5-fold):')\nprint('-' * 50)\n\nfor name, model in models.items():\n    cv_scores = cross_val_score(model, X, y, cv=cv, scoring='accuracy')\n    results[name] = cv_scores\n    print(f'{name}: Mean={cv_scores.mean():.4f} (+/- {cv_scores.std() * 2:.4f})')",
    explanation: "Cross-validation provides a more reliable estimate of model performance by testing on multiple data splits. The box plot shows performance distribution across folds. Confusion matrix shows prediction accuracy for each class.",
    options: [
      "Cross-validation always improves model accuracy",
      "Cross-validation helps assess model generalization ability",
      "Cross-validation can only be used with classification problems",
      "Cross-validation eliminates the need for a separate test set"
    ],
    correctAnswer: 1,
    imageUrl: "/src/assets/machine-learning-tutorial.jpg"
  },
  {
    id: 4,
    title: "Feature Engineering & Selection",
    theory: "Feature engineering creates new features from existing data to improve model performance. Feature selection identifies the most relevant features, reducing dimensionality and overfitting while maintaining or improving accuracy.",
    example: "For customer data: engineer features like 'days_since_last_purchase', 'purchase_frequency', then select top features using correlation analysis or feature importance scores.",
    pythonCode: "from sklearn.feature_selection import SelectKBest, f_classif\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.datasets import make_classification\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import accuracy_score\nimport pandas as pd\nimport numpy as np\n\n# Generate sample dataset\nX, y = make_classification(n_samples=1000, n_features=20, n_informative=5, n_redundant=5, random_state=42)\n\n# Create feature names\nfeature_names = [f'feature_{i}' for i in range(X.shape[1])]\ndf = pd.DataFrame(X, columns=feature_names)\ndf['target'] = y\n\nprint('Original dataset shape:', X.shape)\nprint('Feature Engineering:')\n\n# 1. Create interaction features\ndf['interaction_0_1'] = df['feature_0'] * df['feature_1']\ndf['ratio_2_3'] = df['feature_2'] / (df['feature_3'] + 1e-8)\ndf['sum_4_5'] = df['feature_4'] + df['feature_5']\n\n# 2. Polynomial features for first 3 features\nfor i in range(3):\n    df[f'feature_{i}_squared'] = df[f'feature_{i}']**2\n\n# Update feature matrix\nfeature_cols = [col for col in df.columns if col != 'target']\nX_engineered = df[feature_cols].values\n\nprint(f'After feature engineering: {X_engineered.shape}')\n\n# 3. Feature Selection\nX_train, X_test, y_train, y_test = train_test_split(X_engineered, y, test_size=0.3, random_state=42)\n\n# SelectKBest with ANOVA F-test\nselector_f = SelectKBest(score_func=f_classif, k=10)\nX_train_f = selector_f.fit_transform(X_train, y_train)\nX_test_f = selector_f.transform(X_test)\n\n# Compare performance\nrf_orig = RandomForestClassifier(n_estimators=100, random_state=42)\nrf_orig.fit(X_train, y_train)\npred_orig = rf_orig.predict(X_test)\n\nrf_f = RandomForestClassifier(n_estimators=100, random_state=42)\nrf_f.fit(X_train_f, y_train)\npred_f = rf_f.predict(X_test_f)\n\nprint(f'Original features accuracy: {accuracy_score(y_test, pred_orig):.4f}')\nprint(f'Selected features accuracy: {accuracy_score(y_test, pred_f):.4f}')",
    explanation: "Feature engineering creates new meaningful features that can improve model performance. Feature selection helps identify the most important features, reducing noise and computational cost while often maintaining or improving accuracy.",
    options: [
      "More features always lead to better model performance",
      "Feature selection can help reduce overfitting and improve generalization",
      "Feature engineering is only useful for deep learning models",
      "Feature selection always reduces model accuracy"
    ],
    correctAnswer: 1,
    imageUrl: "/src/assets/machine-learning-tutorial.jpg"
  },
  {
    id: 5,
    title: "Ensemble Methods & Model Optimization",
    theory: "Ensemble methods combine multiple models to create a stronger predictor. Random Forest uses multiple decision trees, while boosting sequentially improves weak learners. Hyperparameter tuning optimizes model parameters for best performance.",
    example: "Netflix recommendation: combines collaborative filtering + content-based + popularity models. Each contributes different insights, and ensemble weighs their predictions for final recommendation.",
    pythonCode: "from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier, VotingClassifier\nfrom sklearn.svm import SVC\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.model_selection import GridSearchCV, cross_val_score\nfrom sklearn.datasets import make_classification\nimport numpy as np\n\n# Generate sample dataset\nX, y = make_classification(n_samples=1000, n_features=20, n_informative=10, n_redundant=5, random_state=42)\n\nprint('Ensemble Methods & Hyperparameter Tuning')\nprint('=' * 50)\n\n# 1. Individual Models\nmodels = {\n    'Random Forest': RandomForestClassifier(random_state=42),\n    'Gradient Boosting': GradientBoostingClassifier(random_state=42),\n    'SVM': SVC(probability=True, random_state=42),\n    'Logistic Regression': LogisticRegression(random_state=42)\n}\n\n# Evaluate individual models\nindividual_scores = {}\nfor name, model in models.items():\n    scores = cross_val_score(model, X, y, cv=5)\n    individual_scores[name] = scores.mean()\n    print(f'{name}: {scores.mean():.4f} (+/- {scores.std() * 2:.4f})')\n\nprint('\\n' + '='*50)\n\n# 2. Ensemble - Voting Classifier\nvoting_clf = VotingClassifier(\n    estimators=[\n        ('rf', RandomForestClassifier(random_state=42)),\n        ('gb', GradientBoostingClassifier(random_state=42)),\n        ('svm', SVC(probability=True, random_state=42))\n    ],\n    voting='soft'  # Use probability-based voting\n)\n\nensemble_scores = cross_val_score(voting_clf, X, y, cv=5)\nprint(f'Ensemble (Voting): {ensemble_scores.mean():.4f} (+/- {ensemble_scores.std() * 2:.4f})')\n\nprint(f'Best performing method: {max(individual_scores, key=individual_scores.get)}')",
    explanation: "Ensemble methods often outperform individual models by combining their strengths. Hyperparameter tuning finds optimal settings for better performance. The key is balancing model complexity with generalization ability.",
    options: [
      "Ensemble methods always require more computational resources than individual models",
      "Ensemble methods can improve prediction accuracy by combining multiple models",
      "Hyperparameter tuning is only necessary for deep learning models",
      "Voting classifiers can only use hard voting (majority vote)"
    ],
    correctAnswer: 1,
    imageUrl: "/src/assets/machine-learning-tutorial.jpg"
  }
];

const MachineLearningTutorial: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(900); // 15 minutes
  const [pyodideReady, setPyodideReady] = useState(false);
  const [pythonOutput, setPythonOutput] = useState('');
  const [pyodide, setPyodide] = useState<any>(null);

  // Lazy-load Pyodide only when needed
  const ensurePyodide = useCallback(async () => {
    if (pyodide) return;
    try {
      const { loadPyodide } = await import('pyodide');
      const instance = await loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.28.2/full/' });
      setPyodide(instance);
      setPyodideReady(true);
    } catch (error) {
      console.error('Failed to load Pyodide:', error);
    }
  }, [pyodide]);

  // Preload Pyodide in background so the first run is fast
  useEffect(() => {
    ensurePyodide();
  }, [ensurePyodide]);

  // Timer effect
  useEffect(() => {
    if (gameStarted && !gameCompleted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeRemaining === 0) {
      setGameCompleted(true);
    }
  }, [gameStarted, gameCompleted, timeRemaining]);

  const startGame = () => {
    setGameStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setGameCompleted(false);
    setTimeRemaining(900);
    setPythonOutput('');
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === machineLearningQuestions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < machineLearningQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setPythonOutput('');
    } else {
      setGameCompleted(true);
    }
  };

  const runPythonCode = useCallback(async () => {
    try {
      await ensurePyodide();
      if (!pyodide) {
        setPythonOutput('Python environment not ready. Please try again.');
        return;
      }
      // Load required packages for this question
      const pkgsMap: Record<number, string[]> = {
        0: ['numpy', 'scikit-learn'],
        1: ['numpy', 'scikit-learn'],
        2: ['numpy', 'scikit-learn'],
        3: ['numpy', 'pandas', 'scikit-learn'],
        4: ['numpy', 'scikit-learn'],
      };
      const required = pkgsMap[currentQuestion] || ['numpy'];
      if ((pyodide as any).loadPackage) {
        await (pyodide as any).loadPackage(required);
      }
      setPyodideReady(true);

      pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
sys.stderr = StringIO()
      `);

      pyodide.runPython(machineLearningQuestions[currentQuestion].pythonCode);

      const stdout = pyodide.runPython("sys.stdout.getvalue()");
      const stderr = pyodide.runPython("sys.stderr.getvalue()");

      setPythonOutput(stdout || stderr || 'Code executed successfully!');
    } catch (error) {
      setPythonOutput(`Error: ${error}`);
    }
  }, [ensurePyodide, pyodide, currentQuestion]);

  const resetGame = () => {
    setGameStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setGameCompleted(false);
    setTimeRemaining(900);
    setPythonOutput('');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPerformanceBadge = () => {
    const percentage = (score / machineLearningQuestions.length) * 100;
    const timeUsed = 900 - timeRemaining;
    
    if (percentage >= 80 && timeUsed <= 600) return { text: "ML Expert", color: "bg-yellow-500" };
    if (percentage >= 60) return { text: "ML Practitioner", color: "bg-blue-500" };
    if (percentage >= 40) return { text: "ML Learner", color: "bg-green-500" };
    return { text: "Keep Learning", color: "bg-gray-500" };
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Brain className="h-16 w-16 text-purple-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-800">
              Machine Learning Fundamentals
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Master practical ML concepts with hands-on Python coding
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-blue-50 rounded-lg">
                <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="font-semibold">15 Minutes</div>
                <div className="text-sm text-gray-600">Duration</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <Brain className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="font-semibold">5 Topics</div>
                <div className="text-sm text-gray-600">ML Concepts</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <Trophy className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="font-semibold">Interactive</div>
                <div className="text-sm text-gray-600">Python Code</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">What you'll learn:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Linear Regression & Model Training
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Decision Trees & Classification
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Model Evaluation & Cross-Validation
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Feature Engineering & Selection
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Ensemble Methods & Optimization
                </li>
              </ul>
            </div>

            <Button onClick={startGame} className="w-full" size="lg">
              <Play className="mr-2 h-5 w-5" />
              Start ML Tutorial
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (gameCompleted) {
    const badge = getPerformanceBadge();
    const percentage = (score / machineLearningQuestions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Trophy className="h-16 w-16 text-yellow-500" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-800">
              Tutorial Completed!
            </CardTitle>
            <Badge className={`${badge.color} text-white mt-4`} variant="secondary">
              {badge.text}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {score}/{machineLearningQuestions.length}
                </div>
                <div className="text-sm text-gray-600">Correct Answers</div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{percentage.toFixed(0)}%</div>
                <div className="text-sm text-gray-600">Accuracy</div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button onClick={resetGame} variant="outline" className="flex-1">
                <RotateCcw className="mr-2 h-4 w-4" />
                Retry Tutorial
              </Button>
              <Button onClick={() => window.location.href = '/ai-workshop'} className="flex-1">
                Continue Learning
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const question = machineLearningQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / machineLearningQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Machine Learning Tutorial</h1>
            <p className="text-gray-600">Question {currentQuestion + 1} of {machineLearningQuestions.length}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <span className="font-mono text-lg">{formatTime(timeRemaining)}</span>
            </div>
            <Badge variant="outline">Score: {score}/{machineLearningQuestions.length}</Badge>
          </div>
        </div>

        <Progress value={progress} className="mb-6" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Theory and Questions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  {question.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Theory:</h4>
                  <p className="text-gray-700 text-sm">{question.theory}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Real-world Example:</h4>
                  <p className="text-gray-700 text-sm">{question.example}</p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Which statement is correct?</h4>
                  {question.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showExplanation}
                      className={`w-full p-3 text-left rounded-lg border transition-colors ${
                        selectedAnswer === index
                          ? index === question.correctAnswer
                            ? 'bg-green-100 border-green-500 text-green-700'
                            : 'bg-red-100 border-red-500 text-red-700'
                          : showExplanation && index === question.correctAnswer
                          ? 'bg-green-100 border-green-500 text-green-700'
                          : 'bg-white border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {showExplanation && (
                          selectedAnswer === index ? (
                            index === question.correctAnswer ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-600" />
                            )
                          ) : index === question.correctAnswer ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : null
                        )}
                        <span className="text-sm">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {showExplanation && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold mb-2 text-blue-800">Explanation:</h4>
                    <p className="text-blue-700 text-sm">{question.explanation}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {showExplanation && (
              <div className="flex justify-center">
                <Button onClick={nextQuestion} size="lg">
                  {currentQuestion === machineLearningQuestions.length - 1 ? 'Complete Tutorial' : 'Next Question'}
                </Button>
              </div>
            )}
          </div>

          {/* Right Column - Python Code */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5 text-green-600" />
                  Interactive Python Demo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-green-400 text-xs font-mono whitespace-pre-wrap">
                    {question.pythonCode}
                  </pre>
                </div>

                <Button 
                  onClick={runPythonCode} 
                  disabled={!pyodideReady}
                  className="w-full"
                >
                  <Play className="mr-2 h-4 w-4" />
                  {pyodideReady ? 'Run Python Code' : 'Loading Python Environment...'}
                </Button>

                {pythonOutput && (
                  <div className="bg-black rounded-lg p-4">
                    <pre className="text-green-400 text-xs font-mono whitespace-pre-wrap">
                      {pythonOutput}
                    </pre>
                  </div>
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