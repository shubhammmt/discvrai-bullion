# 🎯 Polls & Quizzes Implementation Documentation

## Overview
Interactive engagement system for byte-sized financial news with polls, quizzes, leaderboards, and gamification.

## URL Structure

### Polls
- **Hub**: `/polls` - All polls browsable by category
- **Single Poll**: `/polls/:slug` - Individual poll with SEO optimization
- **Category**: `/polls/category/:category` - Polls filtered by category
- **Trending**: `/polls/trending` - Most voted polls

### Quizzes
- **Hub**: `/quizzes` - All quizzes browsable
- **Single Quiz**: `/quizzes/:slug` - Individual quiz with results
- **Category**: `/quizzes/category/:category` - Category-filtered quizzes
- **Leaderboard**: `/leaderboard` - Global and category leaderboards

### Contest Pages
- **Weekly Contest**: `/contests/weekly` - Current week's challenge
- **Monthly Contest**: `/contests/monthly` - Monthly competition
- **Past Contests**: `/contests/archive` - Historical contests

## Data Models

### Poll Type
```typescript
interface Poll {
  id: string;
  slug: string;
  question: string;
  options: PollOption[];
  category: string;
  tags: string[];
  relatedArticles?: string[];
  relatedProducts?: {
    type: 'stock' | 'mutualfund' | 'crypto';
    id: string;
    name: string;
  }[];
  cta?: {
    text: string;
    link: string;
    type: 'internal' | 'external' | 'partner';
  };
  totalVotes: number;
  createdAt: string;
  expiresAt?: string;
  sponsored?: {
    by: string;
    logo: string;
  };
}

interface PollOption {
  id: string;
  text: string;
  votes: number;
  percentage: number;
}
```

### Quiz Type
```typescript
interface Quiz {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  questions: QuizQuestion[];
  difficulty: 'beginner' | 'intermediate' | 'expert';
  pointsReward: number;
  relatedArticles?: string[];
  relatedProducts?: {
    type: 'stock' | 'mutualfund' | 'crypto';
    id: string;
    name: string;
  }[];
  cta?: {
    text: string;
    link: string;
  };
  completionCount: number;
  averageScore: number;
  createdAt: string;
  sponsored?: {
    by: string;
    logo: string;
  };
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number | number[]; // index or indices
  explanation: string;
  points: number;
}
```

### User Progress
```typescript
interface UserProgress {
  userId: string;
  totalPoints: number;
  level: 'Beginner' | 'Analyst' | 'Expert' | 'Market Guru';
  badges: Badge[];
  pollsVoted: string[];
  quizzesCompleted: string[];
  currentStreak: number;
  longestStreak: number;
  accuracy: number; // percentage
  rank: number;
  weeklyPoints: number;
  monthlyPoints: number;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
}
```

## SEO Schemas

### Poll Schema (Opinion/AggregateRating)
```json
{
  "@context": "https://schema.org",
  "@type": "Question",
  "name": "Poll question",
  "text": "Full poll question text",
  "suggestedAnswer": [
    {
      "@type": "Answer",
      "text": "Option 1",
      "upvoteCount": 1250
    }
  ],
  "answerCount": 2500,
  "datePublished": "2025-10-21",
  "author": {
    "@type": "Organization",
    "name": "DISCVR"
  }
}
```

### Quiz Schema (Quiz/LearningResource)
```json
{
  "@context": "https://schema.org",
  "@type": "Quiz",
  "name": "Quiz title",
  "description": "Quiz description",
  "educationalLevel": "Beginner/Intermediate/Expert",
  "about": {
    "@type": "Thing",
    "name": "Finance"
  },
  "hasPart": [
    {
      "@type": "Question",
      "eduQuestionType": "Multiple choice",
      "text": "Question text",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Correct answer"
      }
    }
  ],
  "datePublished": "2025-10-21",
  "author": {
    "@type": "Organization",
    "name": "DISCVR"
  }
}
```

### Leaderboard Schema (ItemList)
```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Financial News Leaderboard",
  "description": "Top predictors and quiz champions",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Person",
        "name": "User name",
        "description": "2,500 points - Expert level"
      }
    }
  ]
}
```

## Gamification System

### Point Distribution
- **Poll Participation**: +5 points
- **Quiz Correct Answer**: +10 points per question
- **Quiz Completion**: +5 bonus points
- **Daily Streak**: +10 points per day
- **Share Poll/Quiz**: +3 points
- **Refer Friend**: +50 points (when friend completes 3 activities)

### Level Thresholds
- **Beginner**: 0-200 points
- **Analyst**: 201-500 points
- **Expert**: 501-1000 points
- **Market Guru**: 1001+ points

### Badge Types
1. **Participation**: First Vote, First Quiz, 10 Polls, 10 Quizzes
2. **Accuracy**: 80% Accuracy, 90% Accuracy, Perfect Score
3. **Streak**: 3-Day Streak, 7-Day Streak, 30-Day Streak
4. **Category Expert**: Stock Expert, Crypto Expert, IPO Expert
5. **Special**: Top 10 Weekly, Top 10 Monthly, Contest Winner

## Feed Integration Pattern

### News Feed Structure
```
[News Card 1]
[News Card 2]
[Poll Component] ← Every 2 news cards
[News Card 3]
[News Card 4]
[Quiz Component] ← Every alternate set (every ~4 cards)
[News Card 5]
[News Card 6]
[Poll Component]
...
```

### Component Placement Logic
```typescript
const renderFeedItem = (index: number) => {
  const isPollPosition = (index + 1) % 3 === 0; // After every 2 cards
  const isQuizPosition = (index + 1) % 5 === 0; // Every 5th position
  
  if (isQuizPosition) return <QuizCard />;
  if (isPollPosition) return <PollCard />;
  return <NewsCard />;
};
```

## SEO Best Practices

### Meta Tags for Polls
```html
<title>Poll: [Question] | DISCVR Financial Polls</title>
<meta name="description" content="Vote on [question]. See what the community thinks about [topic]." />
<meta property="og:type" content="article" />
<meta property="og:title" content="[Question]" />
<meta property="og:description" content="[X]% voted Yes. What's your take?" />
```

### Meta Tags for Quizzes
```html
<title>[Quiz Title] | Test Your Financial Knowledge | DISCVR</title>
<meta name="description" content="Take this [difficulty] quiz on [category]. [X] users have taken this quiz with [Y]% average score." />
<meta property="og:type" content="article" />
```

### Internal Linking Strategy
1. **Polls → Articles**: Link to 2-3 related articles in post-vote view
2. **Polls → Products**: Link to related stocks/funds/crypto
3. **Quizzes → Articles**: Link in explanations and final results
4. **News → Polls/Quizzes**: "Vote in related poll" CTA in news cards
5. **Category Pages → Polls/Quizzes**: Dedicated sections
6. **Author Pages → Polls/Quizzes**: "Polls by this topic"

## Distribution Mechanisms

### Internal Distribution
1. **Homepage Widgets**: "Poll of the Day", "Featured Quiz"
2. **Category Pages**: Top polls/quizzes per category
3. **Article Pages**: Related polls/quizzes section
4. **User Dashboard**: Personalized recommendations
5. **Notifications**: "New poll on [topic you follow]"

### External Distribution
1. **Deep Links**: `discvr.app/polls/[slug]?ref=social`
2. **Share Templates**: "I just voted in [poll] on @DISCVR - [X]% agree!"
3. **Embeddable Widgets**: `<iframe>` for partner sites
4. **WhatsApp Share**: Pre-filled message with poll results
5. **Email Digest**: Weekly top polls/quizzes

### Viral Mechanics
1. **Results Reveal**: "Vote to see what others think"
2. **Leaderboard Position**: "You're #42! Can you reach top 10?"
3. **Streak Protection**: "Don't break your 5-day streak!"
4. **Friend Comparison**: "Your friend scored 90% - can you beat them?"
5. **Limited Time**: "Poll closes in 2 hours!"

## Monetization Integration

### CTA Types
1. **Affiliate CTAs**: "Invest via Groww", "Trade on Upstox"
2. **Product CTAs**: "Track this stock", "Add to watchlist"
3. **Premium CTAs**: "Unlock expert analysis"
4. **Sponsored CTAs**: "Explore [Partner] mutual funds"

### Sponsored Content
1. **Sponsored Polls**: "Powered by [Brand]"
2. **Sponsored Quizzes**: "[Brand] Financial Knowledge Quiz"
3. **Leaderboard Sponsorship**: "Finance Friday Challenge by [Bank]"
4. **Badge Sponsorship**: "Crypto Expert badge powered by CoinDCX"

### Data Monetization
1. **Sentiment Reports**: Aggregated poll data for institutions
2. **Market Insights**: "78% predict rate cut" → Media outlets
3. **User Segments**: Target users based on poll responses
4. **Partner Analytics**: Quiz performance for sponsored content

## Technical Implementation

### State Management
```typescript
// User progress stored in localStorage + backend sync
const userProgress = {
  points: 0,
  level: 'Beginner',
  pollsVoted: [],
  quizzesCompleted: [],
  streak: 0
};

// Poll state
const [hasVoted, setHasVoted] = useState(false);
const [selectedOption, setSelectedOption] = useState<string | null>(null);
const [pollResults, setPollResults] = useState<PollOption[]>([]);

// Quiz state
const [currentQuestion, setCurrentQuestion] = useState(0);
const [answers, setAnswers] = useState<number[]>([]);
const [showResults, setShowResults] = useState(false);
const [score, setScore] = useState(0);
```

### Analytics Tracking
```typescript
// Track poll vote
analytics.track('poll_voted', {
  pollId: poll.id,
  option: selectedOption,
  category: poll.category,
  userId: user.id
});

// Track quiz completion
analytics.track('quiz_completed', {
  quizId: quiz.id,
  score: score,
  accuracy: (score / totalQuestions) * 100,
  timeSpent: duration,
  category: quiz.category
});

// Track leaderboard view
analytics.track('leaderboard_viewed', {
  type: 'weekly' | 'monthly',
  category: category,
  userRank: userRank
});
```

## Mobile Optimization

### Responsive Design
- Single-column layout on mobile
- Large touch targets (min 44px)
- Swipeable quiz questions
- Pull-to-refresh for leaderboard
- Sticky poll/quiz progress bar

### Performance
- Lazy load poll/quiz components
- Prefetch next question on quiz
- Optimize animations (CSS transforms)
- Cache poll results locally
- Debounce vote submissions

## Success Metrics

### Engagement Metrics
- Poll CTR: ≥25%
- Quiz Completion Rate: ≥60%
- Average Session Duration: +30% from baseline
- Share Rate: 5-10%
- Returning Users: +15-20% MoM

### SEO Metrics
- Poll/Quiz page impressions
- Click-through rate from search
- Average time on page
- Backlinks from shares
- Featured snippet appearances

### Monetization Metrics
- CTA click-through rate: ≥15%
- Affiliate conversion rate: ≥2%
- Sponsored content engagement
- Premium upgrade rate

## Future Enhancements

### Phase 2 Features
1. **AI-Generated Polls**: Auto-create polls from news articles
2. **Predictive Polls**: "Will Sensex hit 75K?" with time-based results
3. **Multiplayer Quizzes**: Live quiz battles with friends
4. **Voice Polls**: Audio-based poll participation
5. **AR Badges**: 3D animated badges for achievements

### Advanced Gamification
1. **Teams/Clubs**: Join "Stock Bulls" or "Crypto Whales" teams
2. **Tournaments**: Weekly bracket-style quiz competitions
3. **Betting with Points**: Wager points on poll outcomes
4. **NFT Badges**: Blockchain-verified achievement badges
5. **Seasonal Themes**: Diwali special, Budget special quizzes
