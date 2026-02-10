import { coursePrograms, objectionResponses, centerLocations, type CourseProgram } from '@/data/aptechCourseData';

export type ConversationPhase =
  | 'greeting'
  | 'discovery'
  | 'course_matching'
  | 'qualification'
  | 'objection_handling'
  | 'data_collection'
  | 'close';

export interface LeadData {
  name?: string;
  mobile?: string;
  email?: string;
  city?: string;
  preferredCenter?: string;
  courseInterest?: string;
  specificProgram?: string;
  budgetRange?: string;
  paymentPlan?: string;
  startDate?: string;
  currentStatus?: string;
  educationalBackground?: string;
  careerGoals?: string;
  leadId?: string;
}

export interface IntentScore {
  total: number;
  budgetMatch: number;
  urgency: number;
  engagement: number;
  courseFit: number;
}

export interface ConversationState {
  phase: ConversationPhase;
  messageCount: number;
  userMessageCount: number;
  matchedCourses: CourseProgram[];
  leadData: LeadData;
  intentScore: IntentScore;
  formRequested: boolean;
  formCompleted: boolean;
  courseCardShown: boolean;
  detectedInterests: string[];
  detectedObjections: string[];
}

export function createInitialState(): ConversationState {
  return {
    phase: 'greeting',
    messageCount: 0,
    userMessageCount: 0,
    matchedCourses: [],
    leadData: {},
    intentScore: { total: 0, budgetMatch: 0, urgency: 0, engagement: 0, courseFit: 0 },
    formRequested: false,
    formCompleted: false,
    courseCardShown: false,
    detectedInterests: [],
    detectedObjections: [],
  };
}

export function generateLeadId(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `APT-${y}-${m}-${d}-${rand}`;
}

// Keyword detection helpers
const interestKeywords: Record<string, string[]> = {
  'Animation & VFX': ['animation', 'animate', 'vfx', 'visual effects', 'motion graphics', '3d', '2d', 'character animation'],
  'Gaming': ['gaming', 'game', 'game design', 'game development', 'unreal', 'unity', 'game art'],
  'Web & Graphics': ['web', 'graphic', 'ui', 'ux', 'design', 'figma', 'photoshop', 'logo'],
  'Digital Marketing': ['digital marketing', 'seo', 'social media', 'marketing', 'ads', 'content'],
  'Filmmaking': ['film', 'filmmaking', 'video', 'cinematography', 'editing', 'director', 'movie'],
  'IT & Software': ['it', 'software', 'coding', 'programming', 'developer', 'full stack', 'data science', 'python', 'react'],
};

const objectionKeywords: Record<string, string[]> = {
  expensive: ['expensive', 'costly', 'afford', 'budget', 'money', 'price', 'fee', 'emi', 'loan', 'cheap'],
  not_good_enough: ['not good enough', 'capable', 'beginner', 'no experience', 'can i', 'able to', 'difficult', 'hard'],
  placement: ['placement', 'job', 'placed', 'hire', 'salary', 'package', 'guarantee'],
  think_about_it: ['think about', 'decide later', 'not sure', 'confused', 'later', 'consider'],
  online_vs_offline: ['online', 'offline', 'center', 'remote', 'from home', 'hybrid'],
};

function detectInterests(text: string): string[] {
  const lower = text.toLowerCase();
  const found: string[] = [];
  for (const [category, keywords] of Object.entries(interestKeywords)) {
    if (keywords.some(k => lower.includes(k))) found.push(category);
  }
  return found;
}

function detectObjections(text: string): string[] {
  const lower = text.toLowerCase();
  const found: string[] = [];
  for (const [objection, keywords] of Object.entries(objectionKeywords)) {
    if (keywords.some(k => lower.includes(k))) found.push(objection);
  }
  return found;
}

function matchCourses(interests: string[]): CourseProgram[] {
  if (interests.length === 0) return coursePrograms.slice(0, 3);
  return coursePrograms.filter(c => interests.includes(c.category));
}

function computeIntentScore(state: ConversationState): IntentScore {
  let budgetMatch = 0;
  let urgency = 0;
  let engagement = 0;
  let courseFit = 0;

  // Budget
  if (state.leadData.budgetRange) budgetMatch = 20;
  if (state.leadData.budgetRange?.includes('Flexible')) budgetMatch = 25;

  // Urgency
  if (state.leadData.startDate) {
    if (['immediately', 'asap', 'this month', 'next month'].some(k => (state.leadData.startDate || '').toLowerCase().includes(k))) urgency = 25;
    else urgency = 15;
  }

  // Engagement
  engagement = Math.min(25, state.userMessageCount * 4);

  // Course fit
  if (state.matchedCourses.length > 0) courseFit = 15;
  if (state.leadData.specificProgram) courseFit = 25;

  const total = budgetMatch + urgency + engagement + courseFit;
  return { total, budgetMatch, urgency, engagement, courseFit };
}

function nextPhase(state: ConversationState): ConversationPhase {
  if (state.formCompleted) return 'close';
  if (state.formRequested) return 'data_collection';
  if (state.detectedObjections.length > 0 && state.phase !== 'objection_handling') return 'objection_handling';
  if (state.userMessageCount >= 6 && !state.formRequested) return 'data_collection';
  if (state.matchedCourses.length > 0 && state.userMessageCount >= 3) return 'qualification';
  if (state.detectedInterests.length > 0) return 'course_matching';
  if (state.userMessageCount >= 1) return 'discovery';
  return 'greeting';
}

export interface EngineResponse {
  text: string;
  showCourseCards: boolean;
  showLeadForm: boolean;
  showIntentScore: boolean;
  showSummary: boolean;
  matchedCourses: CourseProgram[];
  updatedState: ConversationState;
}

export function processUserMessage(userText: string, state: ConversationState): EngineResponse {
  const newState = { ...state };
  newState.userMessageCount += 1;
  newState.messageCount += 1;

  // Detect interests and objections
  const newInterests = detectInterests(userText);
  const newObjections = detectObjections(userText);
  newState.detectedInterests = [...new Set([...state.detectedInterests, ...newInterests])];
  newState.detectedObjections = [...new Set([...state.detectedObjections, ...newObjections])];

  // Match courses
  if (newState.detectedInterests.length > 0) {
    newState.matchedCourses = matchCourses(newState.detectedInterests);
  }

  // Determine phase
  newState.phase = nextPhase(newState);

  // Compute intent score
  newState.intentScore = computeIntentScore(newState);

  let text = '';
  let showCourseCards = false;
  let showLeadForm = false;
  let showIntentScore = false;
  let showSummary = false;

  switch (newState.phase) {
    case 'discovery': {
      if (newInterests.length > 0) {
        text = `Great choice! ${newInterests.join(' and ')} is a fantastic field with amazing career opportunities. 🎯\n\nTell me a bit about yourself — are you a student, working professional, or looking to switch careers? And what's your educational background?`;
      } else {
        const discoveryQuestions = [
          "That's interesting! Tell me more about yourself — are you a student, working professional, or looking to switch careers?",
          "What's your current educational background? (12th, graduation, etc.)",
          "What challenges are you facing right now that made you explore new learning options?",
          "Where do you see yourself in 2-3 years? What's your dream role?",
        ];
        const idx = Math.min(newState.userMessageCount - 1, discoveryQuestions.length - 1);
        text = discoveryQuestions[idx];
      }
      break;
    }

    case 'course_matching': {
      const courses = newState.matchedCourses;
      if (courses.length > 0 && !newState.courseCardShown) {
        newState.courseCardShown = true;
        showCourseCards = true;
        text = `Based on what you've shared, I think you'd be a great fit for these programs! Here are my top recommendations:\n\nTake a look and let me know which one excites you the most. I can also help with budget, EMI options, and center locations. 😊`;
      } else {
        text = `These programs are designed to take you from fundamentals to industry-ready. Our alumni are working at studios like Red Chillies, Prime Focus, and top gaming companies.\n\nWhat matters most to you — placement support, flexible timing, or budget-friendly options?`;
      }
      break;
    }

    case 'qualification': {
      const lower = userText.toLowerCase();
      // Try to extract city
      const cityMatch = centerLocations.find(c => lower.includes(c.city.toLowerCase()));
      if (cityMatch) {
        newState.leadData.city = cityMatch.city;
        text = `Great, we have centers in ${cityMatch.city}: ${cityMatch.centers.join(', ')}. Which area would be most convenient for you?\n\nAlso, what's your budget range? We have flexible EMI options starting from ₹8-10k/month.`;
      } else if (!newState.leadData.city) {
        text = `Which city are you based in? We have centers across India — Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Pune, Kolkata, and more.\n\nAnd when are you looking to start? We have new batches coming up soon! 📅`;
      } else {
        text = `Perfect! And what's your budget range for the program? We offer:\n• ₹50k - ₹1L (short-term certifications)\n• ₹1L - ₹2L (comprehensive programs)\n• ₹2L+ (advanced/premium tracks)\n• Flexible EMI options available\n\nDon't worry about the exact amount — we can always work something out! 😊`;
      }
      break;
    }

    case 'objection_handling': {
      const lastObjection = newObjections[0] || newState.detectedObjections[newState.detectedObjections.length - 1];
      text = objectionResponses[lastObjection] || objectionResponses['think_about_it'];
      // Clear handled objections for phase transition
      newState.detectedObjections = newState.detectedObjections.filter(o => o !== lastObjection);
      break;
    }

    case 'data_collection': {
      if (!newState.formRequested) {
        newState.formRequested = true;
        showLeadForm = true;
        text = `I'd love to help you take the next step! 🚀\n\nCould you share your details below? Our counseling team will reach out with:\n• Detailed course brochure\n• Payment plan options\n• Next batch schedule\n• A free center visit invitation`;
      } else {
        text = `Please fill in your details above and I'll get everything set up for you!`;
      }
      break;
    }

    case 'close': {
      showSummary = true;
      showIntentScore = true;
      text = `Thank you for your interest! 🎉 Here's a summary of our conversation. Our admissions team will contact you within 2 hours.\n\nYour Lead ID: **${newState.leadData.leadId}**`;
      break;
    }

    default: {
      text = `Hi! 👋 Welcome to Aptech. I'm your AI career counsellor, and I'm here to help you find the perfect program for your career goals.\n\nWhat brings you here today?`;
    }
  }

  return {
    text,
    showCourseCards,
    showLeadForm,
    showIntentScore,
    showSummary,
    matchedCourses: newState.matchedCourses,
    updatedState: newState,
  };
}
