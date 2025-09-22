import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Timer, Eye, MessageSquare, CheckCircle, XCircle, Trophy, Play, Terminal, Loader2, RefreshCw, Camera, Type } from 'lucide-react';
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
  category: 'cv' | 'nlp';
}

const cvNlpQuestions: Question[] = [
  {
    id: 1,
    title: "Computer Vision Fundamentals",
    category: 'cv',
    theory: "Computer Vision enables machines to interpret and understand visual information from images and videos. It involves processing pixel data to extract meaningful features, detect objects, and understand spatial relationships.",
    example: "A self-driving car uses computer vision to detect pedestrians, read traffic signs, and navigate lanes. Medical imaging uses CV to detect tumors in X-rays or MRI scans.",
    pythonCode: `import numpy as np
# Simulating basic image processing concepts

# Create a simple 8x8 grayscale image (values 0-255)
image = np.array([
    [100, 120, 140, 160, 180, 200, 220, 240],
    [110, 130, 150, 170, 190, 210, 230, 250],
    [120, 140, 160, 180, 200, 220, 240, 255],
    [130, 150, 170, 190, 210, 230, 250, 255],
    [140, 160, 180, 200, 220, 240, 255, 255],
    [150, 170, 190, 210, 230, 250, 255, 255],
    [160, 180, 200, 220, 240, 255, 255, 255],
    [170, 190, 210, 230, 250, 255, 255, 255]
])

print("Original image shape:", image.shape)
print("Pixel value range:", image.min(), "to", image.max())

# Basic image operations
# 1. Edge detection (simple gradient)
def simple_edge_detection(img):
    edges = np.zeros_like(img)
    for i in range(1, img.shape[0]-1):
        for j in range(1, img.shape[1]-1):
            # Calculate gradient magnitude
            dx = img[i+1, j] - img[i-1, j]
            dy = img[i, j+1] - img[i, j-1]
            edges[i, j] = min(255, abs(dx) + abs(dy))
    return edges

# 2. Image filtering (blur)
def simple_blur(img):
    blurred = np.zeros_like(img)
    for i in range(1, img.shape[0]-1):
        for j in range(1, img.shape[1]-1):
            # 3x3 average filter
            neighborhood = img[i-1:i+2, j-1:j+2]
            blurred[i, j] = int(neighborhood.mean())
    return blurred

edges = simple_edge_detection(image)
blurred = simple_blur(image)

print("\\nEdge detection result (first row):", edges[0])
print("Blurred image (first row):", blurred[0])
print("\\nCV Operations completed successfully!")`,
    codeExplanation: "This demonstrates core CV concepts: images as numerical arrays, edge detection to find boundaries, and filtering for noise reduction. These are building blocks for more complex CV tasks.",
    question: "What is the primary representation of an image in computer vision?",
    options: [
      "A collection of text descriptions",
      "A multidimensional array of pixel values",
      "A series of audio signals",
      "A database of object names"
    ],
    correctAnswer: 1,
    explanation: "Images are represented as multidimensional arrays where each element contains pixel intensity values. Grayscale images are 2D arrays, while color images are 3D arrays (height × width × color channels).",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    title: "Object Detection & Classification",
    category: 'cv',
    theory: "Object detection locates and classifies objects within images. Classification answers 'what is this?', while detection answers 'what is this and where is it?'. Modern approaches use Convolutional Neural Networks (CNNs) to learn hierarchical features.",
    example: "Facebook automatically tags friends in photos (face detection + recognition), Google Photos organizes pictures by content (object classification), security cameras detect intruders (object detection).",
    pythonCode: `import numpy as np

# Simulating a simple object detection system
class SimpleObjectDetector:
    def __init__(self):
        # Simple feature templates for different objects
        self.templates = {
            'circle': np.array([[0, 1, 1, 1, 0],
                              [1, 1, 1, 1, 1],
                              [1, 1, 1, 1, 1],
                              [1, 1, 1, 1, 1],
                              [0, 1, 1, 1, 0]]),
            'square': np.array([[1, 1, 1, 1, 1],
                              [1, 0, 0, 0, 1],
                              [1, 0, 0, 0, 1],
                              [1, 0, 0, 0, 1],
                              [1, 1, 1, 1, 1]]),
            'cross': np.array([[0, 0, 1, 0, 0],
                             [0, 0, 1, 0, 0],
                             [1, 1, 1, 1, 1],
                             [0, 0, 1, 0, 0],
                             [0, 0, 1, 0, 0]])
        }
    
    def template_match(self, image, template):
        """Simple template matching"""
        h, w = template.shape
        matches = []
        
        for i in range(image.shape[0] - h + 1):
            for j in range(image.shape[1] - w + 1):
                patch = image[i:i+h, j:j+w]
                # Calculate similarity (normalized cross-correlation)
                similarity = np.sum(patch * template) / (np.linalg.norm(patch) * np.linalg.norm(template) + 1e-8)
                if similarity > 0.7:  # Threshold for detection
                    matches.append((i, j, similarity))
        
        return matches
    
    def detect_objects(self, image):
        """Detect all object types in the image"""
        detections = {}
        for obj_name, template in self.templates.items():
            matches = self.template_match(image, template)
            detections[obj_name] = len(matches)
            if matches:
                print(f"Found {len(matches)} {obj_name}(s) at positions: {[(m[0], m[1]) for m in matches[:3]]}")
        
        return detections

# Create a test image with objects
test_image = np.zeros((15, 15))
# Add a circle-like pattern
test_image[2:7, 2:7] = np.array([[0, 1, 1, 1, 0],
                                [1, 1, 1, 1, 1],
                                [1, 1, 1, 1, 1],
                                [1, 1, 1, 1, 1],
                                [0, 1, 1, 1, 0]])

# Add a square pattern
test_image[8:13, 8:13] = np.array([[1, 1, 1, 1, 1],
                                  [1, 0, 0, 0, 1],
                                  [1, 0, 0, 0, 1],
                                  [1, 0, 0, 0, 1],
                                  [1, 1, 1, 1, 1]])

# Test the detector
detector = SimpleObjectDetector()
print("Object Detection Results:")
print("========================")
detections = detector.detect_objects(test_image)
print(f"\\nSummary: {detections}")
print("\\nThis simulates how real CV systems identify and locate objects!")`,
    codeExplanation: "Template matching is a basic object detection method that slides patterns across images to find matches. Modern systems use deep learning to automatically learn these patterns from data.",
    question: "What is the difference between image classification and object detection?",
    options: [
      "Classification is faster than detection",
      "Classification identifies what's in an image, detection also locates where objects are",
      "Detection only works with color images",
      "Classification requires more computational power"
    ],
    correctAnswer: 1,
    explanation: "Classification determines what object(s) are present in an image, while object detection not only identifies objects but also provides their precise locations (bounding boxes) within the image.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    title: "Natural Language Processing Basics",
    category: 'nlp',
    theory: "Natural Language Processing (NLP) enables computers to understand, interpret, and generate human language. It involves converting text into numerical representations that machines can process, then applying statistical and deep learning methods to extract meaning.",
    example: "Google Translate converts languages, Siri understands voice commands, Gmail filters spam emails, chatbots provide customer support, and recommendation systems analyze reviews to suggest products.",
    pythonCode: `import re
from collections import Counter
import numpy as np

# Sample text corpus for NLP demonstration
documents = [
    "I love machine learning and artificial intelligence",
    "Natural language processing is fascinating and powerful",
    "Deep learning models can understand human language",
    "AI technology is revolutionizing how we process text",
    "Machine learning algorithms analyze text data efficiently"
]

class SimpleNLPProcessor:
    def __init__(self):
        self.vocabulary = {}
        self.word_frequencies = {}
    
    def preprocess_text(self, text):
        """Basic text preprocessing"""
        # Convert to lowercase
        text = text.lower()
        # Remove punctuation and split into words
        words = re.findall(r'\\b\\w+\\b', text)
        return words
    
    def build_vocabulary(self, documents):
        """Build vocabulary from all documents"""
        all_words = []
        for doc in documents:
            words = self.preprocess_text(doc)
            all_words.extend(words)
        
        # Count word frequencies
        self.word_frequencies = Counter(all_words)
        
        # Create vocabulary (word to index mapping)
        unique_words = list(set(all_words))
        self.vocabulary = {word: idx for idx, word in enumerate(unique_words)}
        
        print(f"Vocabulary size: {len(self.vocabulary)}")
        print(f"Most common words: {self.word_frequencies.most_common(5)}")
        return self.vocabulary
    
    def text_to_vector(self, text):
        """Convert text to numerical vector (Bag of Words)"""
        words = self.preprocess_text(text)
        vector = np.zeros(len(self.vocabulary))
        
        for word in words:
            if word in self.vocabulary:
                vector[self.vocabulary[word]] += 1
        
        return vector
    
    def calculate_similarity(self, text1, text2):
        """Calculate cosine similarity between two texts"""
        vec1 = self.text_to_vector(text1)
        vec2 = self.text_to_vector(text2)
        
        # Cosine similarity
        dot_product = np.dot(vec1, vec2)
        magnitude1 = np.linalg.norm(vec1)
        magnitude2 = np.linalg.norm(vec2)
        
        if magnitude1 == 0 or magnitude2 == 0:
            return 0
        
        similarity = dot_product / (magnitude1 * magnitude2)
        return similarity

# Initialize NLP processor
nlp = SimpleNLPProcessor()

# Build vocabulary from documents
print("Building vocabulary...")
vocabulary = nlp.build_vocabulary(documents)

# Test text similarity
test_text1 = "I enjoy machine learning"
test_text2 = "Machine learning is amazing"
test_text3 = "The weather is nice today"

similarity1 = nlp.calculate_similarity(test_text1, test_text2)
similarity2 = nlp.calculate_similarity(test_text1, test_text3)

print(f"\\nText Similarity Analysis:")
print(f"'{test_text1}' vs '{test_text2}': {similarity1:.3f}")
print(f"'{test_text1}' vs '{test_text3}': {similarity2:.3f}")

# Demonstrate text vectorization
print(f"\\nText vectorization example:")
vector = nlp.text_to_vector(test_text1)
print(f"'{test_text1}' -> Vector length: {len(vector)}, Non-zero elements: {np.count_nonzero(vector)}")`,
    codeExplanation: "This shows core NLP concepts: text preprocessing (cleaning, tokenization), vocabulary building, and vectorization (converting text to numbers). Cosine similarity measures how similar two texts are based on their word content.",
    question: "Why do we need to convert text into numerical vectors in NLP?",
    options: [
      "To save storage space",
      "Because computers can only process numbers, not text directly",
      "To make text processing faster",
      "To reduce the amount of text data"
    ],
    correctAnswer: 1,
    explanation: "Computers fundamentally operate on numbers, not text. Converting text to numerical vectors allows machine learning algorithms to process, analyze, and learn patterns from textual data.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    title: "Sentiment Analysis & Text Classification",
    category: 'nlp',
    theory: "Sentiment analysis determines the emotional tone of text (positive, negative, neutral). Text classification categorizes documents into predefined categories. Both tasks use features like word frequency, n-grams, and contextual embeddings.",
    example: "Amazon analyzes product reviews to show overall sentiment, Twitter monitors brand mentions for reputation management, news sites categorize articles by topic, and email systems classify messages as spam/not spam.",
    pythonCode: `import re
from collections import defaultdict
import numpy as np

class SentimentAnalyzer:
    def __init__(self):
        # Simple sentiment lexicon (in practice, would use larger dictionaries)
        self.positive_words = {
            'good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic',
            'love', 'like', 'enjoy', 'happy', 'pleased', 'satisfied', 'awesome',
            'brilliant', 'perfect', 'outstanding', 'superb', 'marvelous'
        }
        
        self.negative_words = {
            'bad', 'terrible', 'awful', 'horrible', 'hate', 'dislike',
            'angry', 'frustrated', 'disappointed', 'sad', 'upset', 'annoyed',
            'poor', 'worst', 'disgusting', 'pathetic', 'useless', 'broken'
        }
        
        self.intensifiers = {
            'very': 2.0, 'extremely': 2.5, 'incredibly': 2.3, 'really': 1.8,
            'quite': 1.5, 'somewhat': 0.8, 'slightly': 0.6, 'not': -1.0
        }
    
    def preprocess_text(self, text):
        """Clean and tokenize text"""
        text = text.lower()
        words = re.findall(r'\\b\\w+\\b', text)
        return words
    
    def analyze_sentiment(self, text):
        """Analyze sentiment of given text"""
        words = self.preprocess_text(text)
        
        positive_score = 0
        negative_score = 0
        word_count = len(words)
        
        # Process each word with context
        for i, word in enumerate(words):
            # Check for intensifiers
            intensifier = 1.0
            if i > 0 and words[i-1] in self.intensifiers:
                intensifier = self.intensifiers[words[i-1]]
            
            # Score sentiment words
            if word in self.positive_words:
                positive_score += intensifier
            elif word in self.negative_words:
                negative_score += abs(intensifier)  # Negative intensifier still increases negative score
        
        # Calculate overall sentiment
        if positive_score > negative_score:
            sentiment = 'positive'
            confidence = (positive_score - negative_score) / max(word_count, 1)
        elif negative_score > positive_score:
            sentiment = 'negative'
            confidence = (negative_score - positive_score) / max(word_count, 1)
        else:
            sentiment = 'neutral'
            confidence = 0.0
        
        return {
            'sentiment': sentiment,
            'confidence': min(confidence, 1.0),
            'positive_score': positive_score,
            'negative_score': negative_score,
            'word_count': word_count
        }

# Text Classification Example
class SimpleTextClassifier:
    def __init__(self):
        self.categories = {
            'technology': ['computer', 'software', 'programming', 'AI', 'machine', 'algorithm', 'data', 'digital'],
            'sports': ['football', 'basketball', 'game', 'player', 'team', 'match', 'score', 'championship'],
            'food': ['restaurant', 'cooking', 'recipe', 'delicious', 'taste', 'meal', 'kitchen', 'chef'],
            'travel': ['vacation', 'hotel', 'flight', 'destination', 'journey', 'tourism', 'adventure', 'explore']
        }
    
    def classify_text(self, text):
        """Classify text into categories"""
        words = re.findall(r'\\b\\w+\\b', text.lower())
        category_scores = defaultdict(int)
        
        for word in words:
            for category, keywords in self.categories.items():
                if word in keywords:
                    category_scores[category] += 1
        
        if not category_scores:
            return 'other', 0.0
        
        best_category = max(category_scores, key=category_scores.get)
        confidence = category_scores[best_category] / len(words)
        
        return best_category, confidence

# Test sentiment analysis
analyzer = SentimentAnalyzer()
classifier = SimpleTextClassifier()

test_reviews = [
    "This product is absolutely amazing! I love it!",
    "Terrible quality, very disappointed with my purchase",
    "It's okay, not great but not bad either",
    "The new AI algorithm processes data incredibly fast",
    "Our team won the championship game last night!"
]

print("Sentiment Analysis Results:")
print("=" * 40)
for i, review in enumerate(test_reviews):
    result = analyzer.analyze_sentiment(review)
    category, cat_confidence = classifier.classify_text(review)
    
    print(f"Review {i+1}: {review}")
    print(f"Sentiment: {result['sentiment']} (confidence: {result['confidence']:.3f})")
    print(f"Category: {category} (confidence: {cat_confidence:.3f})")
    print("-" * 40)`,
    codeExplanation: "This demonstrates rule-based sentiment analysis using word dictionaries and simple text classification using keyword matching. Real systems use machine learning models trained on large datasets for better accuracy.",
    question: "What is the main challenge in sentiment analysis?",
    options: [
      "Processing speed of algorithms",
      "Understanding context, sarcasm, and implicit meanings",
      "Storage requirements for text data",
      "Converting text to numbers"
    ],
    correctAnswer: 1,
    explanation: "The biggest challenge in sentiment analysis is understanding context, sarcasm, implied meanings, and cultural nuances. For example, 'This is just great!' could be positive or sarcastic depending on context.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
  },
  {
    id: 5,
    title: "Modern CV & NLP Applications",
    category: 'cv',
    theory: "Modern CV and NLP applications combine multiple technologies to solve complex real-world problems. Computer Vision uses CNNs for image recognition, object detection, and scene understanding. NLP employs transformers and attention mechanisms for language understanding, translation, and generation.",
    example: "Tesla's Autopilot (CV for navigation), GPT models (NLP for text generation), Instagram filters (CV for face detection), Google Photos search (CV + NLP), medical diagnosis from radiology (CV), and virtual assistants (NLP + speech processing).",
    pythonCode: `import numpy as np
import re
from collections import defaultdict

# Simulating a multi-modal AI system (CV + NLP)
class MultiModalAI:
    def __init__(self):
        self.image_features = {
            'face': ['eyes', 'nose', 'mouth', 'symmetry'],
            'car': ['wheels', 'windows', 'rectangular', 'metallic'],
            'cat': ['whiskers', 'pointed_ears', 'fur', 'tail'],
            'building': ['rectangular', 'windows', 'geometric', 'large']
        }
        
        self.text_keywords = {
            'positive': ['love', 'great', 'amazing', 'wonderful', 'excellent'],
            'negative': ['hate', 'terrible', 'awful', 'bad', 'horrible'],
            'question': ['what', 'how', 'when', 'where', 'why', 'which'],
            'action': ['buy', 'get', 'find', 'search', 'show', 'tell']
        }
    
    def simulate_image_analysis(self, image_description):
        """Simulate computer vision analysis"""
        features_found = []
        confidence_scores = {}
        
        for obj_type, features in self.image_features.items():
            matches = sum(1 for feature in features if feature in image_description.lower())
            if matches > 0:
                confidence = matches / len(features)
                confidence_scores[obj_type] = confidence
                if confidence > 0.3:
                    features_found.append(obj_type)
        
        # Return most likely object
        if confidence_scores:
            best_match = max(confidence_scores, key=confidence_scores.get)
            return {
                'detected_object': best_match,
                'confidence': confidence_scores[best_match],
                'all_detections': confidence_scores
            }
        return {'detected_object': 'unknown', 'confidence': 0.0, 'all_detections': {}}
    
    def analyze_text_intent(self, text):
        """Analyze user intent from text"""
        words = re.findall(r'\\b\\w+\\b', text.lower())
        intent_scores = defaultdict(int)
        
        for word in words:
            for intent, keywords in self.text_keywords.items():
                if word in keywords:
                    intent_scores[intent] += 1
        
        if intent_scores:
            primary_intent = max(intent_scores, key=intent_scores.get)
            return primary_intent, dict(intent_scores)
        return 'neutral', {}
    
    def process_multimodal_input(self, image_desc, user_text):
        """Process both image and text together"""
        # Analyze image
        image_result = self.simulate_image_analysis(image_desc)
        
        # Analyze text
        text_intent, intent_scores = self.analyze_text_intent(user_text)
        
        # Combine insights for response
        response = self.generate_response(image_result, text_intent, user_text)
        
        return {
            'image_analysis': image_result,
            'text_intent': text_intent,
            'intent_scores': intent_scores,
            'generated_response': response
        }
    
    def generate_response(self, image_result, text_intent, user_text):
        """Generate contextual response based on multimodal analysis"""
        detected_obj = image_result['detected_object']
        confidence = image_result['confidence']
        
        if text_intent == 'question':
            if 'what' in user_text.lower():
                return f"I can see a {detected_obj} in the image with {confidence:.1%} confidence."
            elif 'how' in user_text.lower():
                return f"The {detected_obj} appears to have typical characteristics I'd expect."
        
        elif text_intent == 'positive':
            return f"I'm glad you like the {detected_obj}! It looks great in this image."
        
        elif text_intent == 'negative':
            return f"I understand your concern about the {detected_obj}. Let me analyze it more carefully."
        
        elif text_intent == 'action':
            return f"I can help you with information about {detected_obj}. What would you like to know?"
        
        else:
            return f"I see a {detected_obj} in the image. How can I help you with it?"

# Test the multimodal AI system
ai_system = MultiModalAI()

test_cases = [
    {
        'image': "A furry animal with pointed ears, whiskers, and a long tail sitting on a mat",
        'text': "What is this cute animal in the picture?"
    },
    {
        'image': "A metallic vehicle with four wheels and multiple windows parked outside",
        'text': "I love this car! Can you tell me more about it?"
    },
    {
        'image': "A person with symmetric facial features, eyes, nose, and mouth smiling",
        'text': "How does the face detection work?"
    },
    {
        'image': "A large geometric structure with many windows and rectangular shape",
        'text': "Find information about this building"
    }
]

print("Multimodal AI System Results:")
print("=" * 50)

for i, case in enumerate(test_cases):
    print(f"\\nTest Case {i+1}:")
    print(f"Image: {case['image']}")
    print(f"User: {case['text']}")
    
    result = ai_system.process_multimodal_input(case['image'], case['text'])
    
    print(f"Vision: Detected '{result['image_analysis']['detected_object']}' "
          f"({result['image_analysis']['confidence']:.1%} confidence)")
    print(f"Language: Intent '{result['text_intent']}'")
    print(f"Response: {result['generated_response']}")
    print("-" * 30)

print("\\nThis demonstrates how modern AI combines CV and NLP for intelligent interaction!")`,
    codeExplanation: "This simulates how modern AI systems combine computer vision and natural language processing to understand both visual and textual input, then generate contextually appropriate responses based on the multimodal analysis.",
    question: "What is the advantage of combining Computer Vision and NLP in AI applications?",
    options: [
      "It reduces computational requirements",
      "It enables richer understanding by processing multiple types of data",
      "It makes the system work faster",
      "It reduces the need for training data"
    ],
    correctAnswer: 1,
    explanation: "Combining CV and NLP allows AI systems to understand both visual and textual information simultaneously, enabling richer context understanding and more intelligent responses than either modality alone.",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop"
  }
];

const ComputerVisionNLPTutorial: React.FC = () => {
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

  // Initialize Pyodide only when needed
  const initPyodide = useCallback(async () => {
    if (pyodideRef.current) return pyodideRef.current;
    
    try {
      setPythonOutput('Loading Python environment...');
      const { loadPyodide } = await import('pyodide');
      const pyodideInstance = await loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.28.2/full/"
      });
      await pyodideInstance.loadPackage(['numpy']);
      pyodideRef.current = pyodideInstance;
      setPyodide(pyodideInstance);
      setPythonOutput('Python environment ready!');
      return pyodideInstance;
    } catch (error) {
      console.error('Failed to load Pyodide:', error);
      setPythonOutput('Failed to load Python environment. Please try again.');
      return null;
    }
  }, []);

  // Set initial Python code when question changes
  useEffect(() => {
    if (cvNlpQuestions[currentQuestion]) {
      setPythonCode(cvNlpQuestions[currentQuestion].pythonCode);
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
    
    if (answerIndex === cvNlpQuestions[currentQuestion].correctAnswer) {
      setScore(score + 20);
      setCorrectAnswers(correctAnswers + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < cvNlpQuestions.length - 1) {
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
    setIsRunning(true);
    try {
      const pyodideInstance = await initPyodide();
      if (!pyodideInstance) {
        setPythonOutput('Failed to initialize Python environment.');
        return;
      }

      pyodideInstance.runPython(`
import sys
import io
old_stdout = sys.stdout
sys.stdout = io.StringIO()
      `);

      pyodideInstance.runPython(pythonCode);
      const output = pyodideInstance.runPython('sys.stdout.getvalue()');
      pyodideInstance.runPython('sys.stdout = old_stdout');
      
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
    const accuracy = (correctAnswers / cvNlpQuestions.length) * 100;
    const avgTimePerQuestion = totalTime / cvNlpQuestions.length;
    
    if (accuracy >= 90 && avgTimePerQuestion < 150) return { name: "AI Applications Expert", color: "bg-gradient-to-r from-yellow-400 to-yellow-600" };
    if (accuracy >= 80 && avgTimePerQuestion < 180) return { name: "CV & NLP Specialist", color: "bg-gradient-to-r from-blue-400 to-blue-600" };
    if (accuracy >= 70) return { name: "AI Practitioner", color: "bg-gradient-to-r from-green-400 to-green-600" };
    return { name: "Future AI Engineer", color: "bg-gradient-to-r from-purple-400 to-purple-600" };
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-slate-800/90 border-slate-700 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="flex justify-center gap-4 mb-4">
              <Eye className="h-12 w-12 text-blue-400" />
              <MessageSquare className="h-12 w-12 text-green-400" />
            </div>
            <CardTitle className="text-3xl font-bold text-white mb-2">
              Computer Vision & NLP Essentials
            </CardTitle>
            <p className="text-slate-300 text-lg">
              Explore practical applications of CV and NLP with interactive coding
            </p>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-300">
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">{cvNlpQuestions.length}</div>
                <div className="text-sm">Applied Topics</div>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-400">15 min</div>
                <div className="text-sm">Total Duration</div>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-400">Real-world</div>
                <div className="text-sm">Examples</div>
              </div>
            </div>
            
            <div className="bg-slate-700/30 p-4 rounded-lg text-left">
              <h3 className="font-semibold text-white mb-2">What you'll explore:</h3>
              <ul className="text-slate-300 space-y-1 text-sm">
                <li>• Computer Vision: Image processing, object detection</li>
                <li>• Natural Language Processing: Text analysis, sentiment detection</li>
                <li>• Modern applications: Multimodal AI systems</li>
                <li>• Practical implementations with Python coding</li>
                <li>• Real-world use cases and industry applications</li>
              </ul>
            </div>
            
            <Button 
              onClick={startGame}
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold py-3 text-lg"
            >
              <Play className="mr-2 h-5 w-5" />
              Start Applied AI Workshop
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (gameCompleted) {
    const badge = getPerformanceBadge();
    const accuracy = (correctAnswers / cvNlpQuestions.length) * 100;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-slate-800/90 border-slate-700 backdrop-blur-sm">
          <CardHeader className="text-center">
            <Trophy className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
            <CardTitle className="text-3xl font-bold text-white mb-2">
              Applied AI Workshop Complete!
            </CardTitle>
            <div className={`inline-block px-4 py-2 rounded-full text-white font-semibold ${badge.color}`}>
              {badge.name}
            </div>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="grid grid-cols-2 gap-4 text-slate-300">
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-400">{correctAnswers}/{cvNlpQuestions.length}</div>
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
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
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

  const currentQ = cvNlpQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / cvNlpQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6 pb-8">
        {/* Header */}
        <div className="bg-slate-800/90 backdrop-blur-sm rounded-lg p-4 border border-slate-700">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-xl font-bold text-white flex items-center gap-2">
                {currentQ.category === 'cv' ? <Camera className="h-5 w-5 text-blue-400" /> : <Type className="h-5 w-5 text-green-400" />}
                {currentQ.category === 'cv' ? 'Computer Vision' : 'Natural Language Processing'} Workshop
              </h1>
              <p className="text-slate-300 text-sm">Question {currentQuestion + 1} of {cvNlpQuestions.length}</p>
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
                  {currentQ.category === 'cv' ? <Eye className="h-5 w-5 text-blue-400" /> : <MessageSquare className="h-5 w-5 text-green-400" />}
                  {currentQ.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-blue-400 mb-2">Theory:</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">{currentQ.theory}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-400 mb-2">Real-world Applications:</h4>
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
                  Interactive Python Implementation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={pythonCode}
                  onChange={(e) => setPythonCode(e.target.value)}
                  className="font-mono text-sm bg-slate-900 border-slate-600 text-green-400 h-48 overflow-auto"
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
                  <div className="bg-slate-900 p-3 rounded border border-slate-600 max-h-40 overflow-auto">
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
                  {currentQ.category === 'cv' ? <Camera className="h-5 w-5 text-yellow-400" /> : <Type className="h-5 w-5 text-yellow-400" />}
                  Knowledge Check
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
                    className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                  >
                    {currentQuestion === cvNlpQuestions.length - 1 ? 'Complete Workshop' : 'Next Question'}
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

export default ComputerVisionNLPTutorial;