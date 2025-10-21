export interface PollOption {
  id: string;
  text: string;
  votes: number;
  percentage: number;
}

export interface Poll {
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

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number | number[]; // index or indices
  explanation: string;
  points: number;
}

export interface Quiz {
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

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
  category: 'participation' | 'accuracy' | 'streak' | 'category-expert' | 'special';
}

export interface UserProgress {
  userId: string;
  totalPoints: number;
  level: 'Beginner' | 'Analyst' | 'Expert' | 'Market Guru';
  badges: Badge[];
  pollsVoted: string[];
  quizzesCompleted: string[];
  currentStreak: number;
  longestStreak: number;
  accuracy: number;
  rank: number;
  weeklyPoints: number;
  monthlyPoints: number;
  lastActivityDate: string;
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  avatar?: string;
  points: number;
  level: string;
  accuracy: number;
  rank: number;
  badge?: string;
}
