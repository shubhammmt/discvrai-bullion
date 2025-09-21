import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Timer, Brain, Code, CheckCircle, XCircle, HelpCircle, Trophy, Play, Pause, Terminal, Loader2, RefreshCw } from 'lucide-react';
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

const deepLearningQuestions: Question[] = [
  {
    id: 1,
    title: "Neural Network Fundamentals",
    theory: "A neural network is inspired by how our brain processes information. It consists of interconnected nodes (neurons) that process and transmit information through weighted connections.",
    example: "Think of recognizing a handwritten digit: each pixel is an input, hidden layers detect patterns like curves and lines, and the output layer classifies the digit (0-9).",
    pythonCode: `import numpy as np

# Simple neuron with 3 inputs
def simple_neuron(inputs, weights, bias):
    # Weighted sum + bias
    weighted_sum = np.dot(inputs, weights) + bias
    
    # Activation function (sigmoid)
    output = 1 / (1 + np.exp(-weighted_sum))
    return output

# Example usage
inputs = [0.5, 0.8, 0.2]
weights = [0.4, 0.7, 0.9]
bias = 0.1

result = simple_neuron(inputs, weights, bias)
print(f"Neuron output: {result:.3f}")`,
    codeExplanation: "This code shows a basic neuron: it takes inputs, multiplies by weights, adds bias, and applies sigmoid activation function to produce output between 0 and 1.",
    question: "What is the primary function of weights in a neural network?",
    options: [
      "To store the training data",
      "To determine the strength of connections between neurons",
      "To count the number of neurons",
      "To measure the network's accuracy"
    ],
    correctAnswer: 1,
    explanation: "Weights determine how strongly one neuron influences another. During training, these weights are adjusted to learn patterns in the data.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    title: "Activation Functions & Non-linearity",
    theory: "Activation functions introduce non-linearity into neural networks, allowing them to learn complex patterns. Without activation functions, multiple layers would just be linear transformations.",
    example: "ReLU (Rectified Linear Unit) is like a one-way valve: it passes positive values unchanged but blocks negative values by setting them to zero.",
    pythonCode: `import numpy as np
import matplotlib.pyplot as plt

def relu(x):
    return np.maximum(0, x)

def sigmoid(x):
    return 1 / (1 + np.exp(-np.clip(x, -500, 500)))

def tanh(x):
    return np.tanh(x)

# Test different activation functions
x = np.linspace(-5, 5, 100)

print("Testing activation functions:")
print(f"ReLU(-2) = {relu(-2)}, ReLU(3) = {relu(3)}")
print(f"Sigmoid(0) = {sigmoid(0):.3f}")
print(f"Tanh(0) = {tanh(0):.3f}")`,
    codeExplanation: "This demonstrates three common activation functions: ReLU (most popular), Sigmoid (outputs 0-1), and Tanh (outputs -1 to 1). Each serves different purposes.",
    question: "Why is ReLU preferred over sigmoid in deep networks?",
    options: [
      "ReLU is more complex to compute",
      "ReLU helps avoid vanishing gradient problem",
      "ReLU always outputs values between 0 and 1",
      "ReLU requires more memory"
    ],
    correctAnswer: 1,
    explanation: "ReLU helps avoid vanishing gradients because its derivative is either 0 or 1, preventing gradients from becoming too small in deep networks.",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    title: "Forward Propagation Flow",
    theory: "Forward propagation is how data flows through the network from input to output. Each layer transforms the data using weights, biases, and activation functions.",
    example: "Like an assembly line: raw materials (input) pass through various stations (layers), each adding value (transformation) until you get the final product (output).",
    pythonCode: `import numpy as np

class SimpleNetwork:
    def __init__(self):
        # Initialize weights and biases randomly
        self.W1 = np.random.randn(3, 4) * 0.1  # 3 inputs, 4 hidden
        self.b1 = np.zeros((1, 4))
        self.W2 = np.random.randn(4, 2) * 0.1  # 4 hidden, 2 outputs
        self.b2 = np.zeros((1, 2))
    
    def relu(self, x):
        return np.maximum(0, x)
    
    def forward(self, X):
        # Layer 1: input -> hidden
        self.z1 = np.dot(X, self.W1) + self.b1
        self.a1 = self.relu(self.z1)
        
        # Layer 2: hidden -> output
        self.z2 = np.dot(self.a1, self.W2) + self.b2
        self.a2 = self.relu(self.z2)
        
        return self.a2

# Test the network
network = SimpleNetwork()
input_data = np.array([[1, 0.5, -0.2]])
output = network.forward(input_data)
print(f"Network output: {output}")`,
    codeExplanation: "This shows forward propagation: data flows from input through hidden layer to output. Each layer applies linear transformation (weights + bias) then activation function.",
    question: "What happens during forward propagation?",
    options: [
      "Weights are updated based on errors",
      "Data flows from input to output through layers",
      "The learning rate is adjusted",
      "Training data is shuffled"
    ],
    correctAnswer: 1,
    explanation: "Forward propagation is the process where input data flows through the network layers to produce an output prediction.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    title: "Loss Functions & Optimization",
    theory: "Loss functions measure how far off our predictions are from the actual targets. The goal of training is to minimize this loss by adjusting weights and biases.",
    example: "Like a GPS calculating how far you are from your destination. Mean Squared Error measures the average squared difference between predicted and actual values.",
    pythonCode: `import numpy as np

def mean_squared_error(y_true, y_pred):
    """MSE for regression problems"""
    return np.mean((y_true - y_pred) ** 2)

def binary_crossentropy(y_true, y_pred):
    """Binary crossentropy for binary classification"""
    # Clip predictions to prevent log(0)
    y_pred = np.clip(y_pred, 1e-7, 1 - 1e-7)
    return -np.mean(y_true * np.log(y_pred) + (1 - y_true) * np.log(1 - y_pred))

# Example: comparing predictions with actual values
actual = np.array([1, 0, 1, 1, 0])
predicted = np.array([0.9, 0.1, 0.8, 0.7, 0.2])

mse = mean_squared_error(actual, predicted)
bce = binary_crossentropy(actual, predicted)

print(f"Mean Squared Error: {mse:.4f}")
print(f"Binary Crossentropy: {bce:.4f}")`,
    codeExplanation: "MSE penalizes large errors more than small ones (squared term). Binary crossentropy is perfect for binary classification as it measures probability distribution differences.",
    question: "When would you use Mean Squared Error as a loss function?",
    options: [
      "For binary classification problems",
      "For regression problems with continuous outputs",
      "For multi-class classification",
      "Only for image recognition"
    ],
    correctAnswer: 1,
    explanation: "MSE is ideal for regression problems where you predict continuous values, as it measures the average squared difference between predictions and targets.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
  },
  {
    id: 5,
    title: "Backpropagation & Learning",
    theory: "Backpropagation is how neural networks learn. It calculates gradients (how much each weight contributes to the error) and updates weights to reduce the loss.",
    example: "Like getting feedback on a test: you see which answers were wrong, understand why, and adjust your study strategy for next time.",
    pythonCode: `import numpy as np

class TrainableNetwork:
    def __init__(self, learning_rate=0.01):
        self.lr = learning_rate
        self.W1 = np.random.randn(2, 3) * 0.1
        self.b1 = np.zeros((1, 3))
        self.W2 = np.random.randn(3, 1) * 0.1
        self.b2 = np.zeros((1, 1))
    
    def sigmoid(self, x):
        return 1 / (1 + np.exp(-np.clip(x, -500, 500)))
    
    def sigmoid_derivative(self, x):
        return x * (1 - x)
    
    def forward(self, X):
        self.z1 = np.dot(X, self.W1) + self.b1
        self.a1 = self.sigmoid(self.z1)
        self.z2 = np.dot(self.a1, self.W2) + self.b2
        self.a2 = self.sigmoid(self.z2)
        return self.a2
    
    def backward(self, X, y, output):
        # Calculate gradients
        m = X.shape[0]
        
        # Output layer gradients
        dZ2 = output - y
        dW2 = (1/m) * np.dot(self.a1.T, dZ2)
        db2 = (1/m) * np.sum(dZ2, axis=0, keepdims=True)
        
        # Hidden layer gradients
        dZ1 = np.dot(dZ2, self.W2.T) * self.sigmoid_derivative(self.a1)
        dW1 = (1/m) * np.dot(X.T, dZ1)
        db1 = (1/m) * np.sum(dZ1, axis=0, keepdims=True)
        
        # Update weights
        self.W2 -= self.lr * dW2
        self.b2 -= self.lr * db2
        self.W1 -= self.lr * dW1
        self.b1 -= self.lr * db1

# Example training step
network = TrainableNetwork()
X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])
y = np.array([[0], [1], [1], [0]])  # XOR problem

output = network.forward(X)
network.backward(X, y, output)
print("Weights updated through backpropagation!")`,
    codeExplanation: "Backpropagation calculates how much each weight contributed to the error and updates them proportionally. The chain rule helps compute gradients layer by layer.",
    question: "What is the main purpose of backpropagation?",
    options: [
      "To increase the network size",
      "To calculate and update weights based on errors",
      "To add more layers to the network",
      "To speed up forward propagation"
    ],
    correctAnswer: 1,
    explanation: "Backpropagation calculates gradients that show how to adjust each weight to reduce the loss, enabling the network to learn from its mistakes.",
    image: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=400&h=300&fit=crop"
  }
];

const DeepLearningTutorial: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [isActive, setIsActive] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
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
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/"
        });
        await pyodideInstance.loadPackage(['numpy']);
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
    if (deepLearningQuestions[currentQuestion]) {
      setPythonCode(deepLearningQuestions[currentQuestion].pythonCode);
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
    setTimeLeft(120);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    setIsActive(false);
    
    if (answerIndex === deepLearningQuestions[currentQuestion].correctAnswer) {
      setScore(score + 10);
      setCorrectAnswers(correctAnswers + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < deepLearningQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setShowCode(false);
      setTimeLeft(120);
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
      // Capture stdout
      pyodideRef.current.runPython(`
import sys
import io
old_stdout = sys.stdout
sys.stdout = io.StringIO()
      `);

      // Run the user's code
      pyodideRef.current.runPython(pythonCode);

      // Get the output
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
    setTimeLeft(120);
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
    const accuracy = (correctAnswers / deepLearningQuestions.length) * 100;
    const avgTimePerQuestion = totalTime / deepLearningQuestions.length;
    
    if (accuracy >= 90 && avgTimePerQuestion < 90) return { name: "Deep Learning Master", color: "bg-gradient-to-r from-yellow-400 to-yellow-600" };
    if (accuracy >= 80 && avgTimePerQuestion < 100) return { name: "Neural Network Expert", color: "bg-gradient-to-r from-blue-400 to-blue-600" };
    if (accuracy >= 70) return { name: "AI Enthusiast", color: "bg-gradient-to-r from-green-400 to-green-600" };
    return { name: "Future AI Engineer", color: "bg-gradient-to-r from-purple-400 to-purple-600" };
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-slate-800/90 border-slate-700 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Brain className="h-16 w-16 text-blue-400" />
            </div>
            <CardTitle className="text-3xl font-bold text-white mb-2">
              Deep Learning Fundamentals
            </CardTitle>
            <p className="text-slate-300 text-lg">
              Master core deep learning concepts with interactive Python coding exercises
            </p>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-300">
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">{deepLearningQuestions.length}</div>
                <div className="text-sm">Advanced Topics</div>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-400">2 min</div>
                <div className="text-sm">Per Question</div>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-400">Python</div>
                <div className="text-sm">Code Examples</div>
              </div>
            </div>
            
            <div className="bg-slate-700/30 p-4 rounded-lg text-left">
              <h3 className="font-semibold text-white mb-2">What you'll learn:</h3>
              <ul className="text-slate-300 space-y-1 text-sm">
                <li>• Neural network architecture and components</li>
                <li>• Activation functions and their purposes</li>
                <li>• Forward and backward propagation</li>
                <li>• Loss functions and optimization</li>
                <li>• Hands-on Python implementations</li>
              </ul>
            </div>
            
            <Button 
              onClick={startGame}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 text-lg"
            >
              Begin Deep Learning Mastery
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (gameCompleted) {
    const badge = getPerformanceBadge();
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-slate-800/90 border-slate-700 backdrop-blur-sm">
          <CardHeader className="text-center">
            <Trophy className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
            <CardTitle className="text-3xl font-bold text-white mb-2">
              Course Completed! 🎉
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className={`${badge.color} text-white px-6 py-3 rounded-full text-lg font-semibold inline-block`}>
              {badge.name}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-400">{correctAnswers}/{deepLearningQuestions.length}</div>
                <div className="text-slate-300">Correct Answers</div>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">{score}</div>
                <div className="text-slate-300">Total Score</div>
              </div>
            </div>
            
            <div className="bg-slate-700/30 p-4 rounded-lg">
              <h3 className="font-semibold text-white mb-2">🎯 Next Steps:</h3>
              <ul className="text-slate-300 space-y-1 text-sm text-left">
                <li>• Try implementing a full neural network from scratch</li>
                <li>• Explore TensorFlow or PyTorch frameworks</li>
                <li>• Work on a computer vision project</li>
                <li>• Learn about Convolutional Neural Networks</li>
              </ul>
            </div>
            
            <div className="flex gap-3 justify-center">
              <Button 
                onClick={resetGame}
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Retake Course
              </Button>
              <Button 
                className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white"
              >
                Continue to Advanced AI
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const question = deepLearningQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / deepLearningQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-white">Deep Learning Fundamentals</h1>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-slate-700 text-slate-200">
                {currentQuestion + 1} / {deepLearningQuestions.length}
              </Badge>
              <div className="flex items-center gap-2 text-slate-300">
                <Timer className="h-4 w-4" />
                <span className={`font-mono ${timeLeft < 30 ? 'text-red-400' : 'text-slate-300'}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
              <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                Score: {score}
              </Badge>
            </div>
          </div>
          
          <Progress 
            value={progress} 
            className="h-3 bg-slate-700"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Theory Section */}
          <Card className="bg-slate-800/90 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Brain className="h-5 w-5" />
                {question.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video bg-slate-700/30 rounded-lg overflow-hidden">
                <img 
                  src={question.image} 
                  alt={question.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div>
                <h4 className="font-semibold text-slate-200 mb-2">Theory:</h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {question.theory}
                </p>
              </div>
              
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                <h4 className="font-semibold text-blue-300 mb-1">💡 Real-world Example:</h4>
                <p className="text-blue-200 text-sm">
                  {question.example}
                </p>
              </div>

              <Button
                onClick={() => setShowCode(!showCode)}
                variant="outline"
                className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                <Terminal className="h-4 w-4 mr-2" />
                {showCode ? 'Hide' : 'Show'} Interactive Python Code
              </Button>

              {showCode && (
                <Card className="bg-slate-800/90 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-lg text-white flex items-center gap-2">
                      <Terminal className="h-5 w-5" />
                      Interactive Python Code
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">Edit and run the code:</label>
                      <Textarea
                        value={pythonCode}
                        onChange={(e) => setPythonCode(e.target.value)}
                        className="min-h-[200px] bg-slate-900 border-slate-700 text-green-400 font-mono text-sm"
                        placeholder="Enter your Python code here..."
                      />
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        onClick={runPythonCode}
                        disabled={isRunning || !pyodide}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        {isRunning ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Running...
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Run Code
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setPythonCode(question.pythonCode)}
                        className="border-slate-600 text-slate-300 hover:bg-slate-700"
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Reset
                      </Button>
                    </div>

                    {pythonOutput && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Output:</label>
                        <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                          <pre className="text-sm text-blue-400 whitespace-pre-wrap">{pythonOutput}</pre>
                        </div>
                      </div>
                    )}
                    
                    <div className="bg-slate-700/30 p-3 rounded-lg">
                      <h4 className="text-sm font-medium text-slate-200 mb-1">Code Explanation:</h4>
                      <p className="text-slate-300 text-sm">{question.codeExplanation}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          {/* Question Section */}
          <Card className="bg-slate-800/90 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Test Your Knowledge</CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowHelp(!showHelp)}
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  <HelpCircle className="h-4 w-4" />
                  AI Help
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsActive(!isActive)}
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {isActive ? 'Pause' : 'Resume'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {showHelp && (
                <Alert className="bg-blue-500/10 border-blue-500/20">
                  <HelpCircle className="h-4 w-4" />
                  <AlertDescription className="text-blue-300">
                    💡 <strong>AI Hint:</strong> Think about the core purpose of this concept. 
                    How does it contribute to the network's ability to learn and make predictions?
                    Review the code example to see how it's implemented in practice.
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <h3 className="font-semibold text-white text-lg">
                  {question.question}
                </h3>
                
                <div className="space-y-2">
                  {question.options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showExplanation}
                      className={`w-full text-left justify-start h-auto p-4 ${
                        showExplanation
                          ? index === question.correctAnswer
                            ? 'bg-green-600/20 border-green-500 text-green-300 hover:bg-green-600/20'
                            : selectedAnswer === index
                            ? 'bg-red-600/20 border-red-500 text-red-300 hover:bg-red-600/20'
                            : 'bg-slate-700/50 border-slate-600 text-slate-300 opacity-50'
                          : selectedAnswer === index
                          ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                          : 'bg-slate-700/80 border-slate-600 text-slate-200 hover:bg-slate-600/80'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center text-xs font-semibold">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="flex-1">{option}</span>
                        {showExplanation && index === question.correctAnswer && (
                          <CheckCircle className="h-5 w-5 text-green-400" />
                        )}
                        {showExplanation && selectedAnswer === index && index !== question.correctAnswer && (
                          <XCircle className="h-5 w-5 text-red-400" />
                        )}
                      </div>
                    </Button>
                  ))}
                </div>

                {showExplanation && (
                  <div className="space-y-4">
                    <Alert className="bg-slate-700/50 border-slate-600">
                      <AlertDescription className="text-slate-300">
                        <strong>Explanation:</strong> {question.explanation}
                      </AlertDescription>
                    </Alert>
                    
                    <Button 
                      onClick={nextQuestion}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                    >
                      {currentQuestion < deepLearningQuestions.length - 1 ? 'Next Concept' : 'Complete Course'}
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DeepLearningTutorial;