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
  awaitingCenterSelection: boolean;
  awaitingBudget: boolean;
  awaitingTimeline: boolean;
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
    awaitingCenterSelection: false,
    awaitingBudget: false,
    awaitingTimeline: false,
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

// Extract budget info from free-text
function extractBudget(text: string): string | null {
  const lower = text.toLowerCase();
  // Check for exact budget range mentions
  if (lower.includes('50k') || lower.includes('50,000') || lower.includes('50000')) {
    if (lower.includes('1l') || lower.includes('1 l') || lower.includes('100000') || lower.includes('1,00,000')) {
      return '₹50k - ₹1L';
    }
    return '₹50k - ₹1L';
  }
  if (lower.includes('1l') || lower.includes('1 lakh') || lower.includes('100000') || lower.includes('1,00,000')) {
    if (lower.includes('2l') || lower.includes('2 l')) return '₹1L - ₹2L';
    return '₹1L - ₹2L';
  }
  if (lower.includes('2l') || lower.includes('2 lakh') || lower.includes('200000') || lower.includes('2,00,000')) return '₹2L - ₹3L';
  if (lower.includes('flexible') || lower.includes('emi')) return 'Flexible / EMI';
  // Detect amounts like "10k", "15k" etc. as monthly EMI range
  const monthlyMatch = lower.match(/(\d+)\s*k/);
  if (monthlyMatch) {
    const amount = parseInt(monthlyMatch[1]) * 1000;
    if (amount <= 15000) return 'Flexible / EMI';
    if (amount <= 100000) return '₹50k - ₹1L';
    if (amount <= 200000) return '₹1L - ₹2L';
  }
  return null;
}

// Extract center selection from text
function extractCenter(text: string, city: string): string | null {
  const loc = centerLocations.find(c => c.city.toLowerCase() === city.toLowerCase());
  if (!loc) return null;
  const lower = text.toLowerCase();
  for (const center of loc.centers) {
    if (lower.includes(center.toLowerCase()) || lower.replace(/[.\s]/g, '').includes(center.toLowerCase().replace(/[.\s]/g, ''))) {
      return center;
    }
  }
  return null;
}

// Extract timeline from text
function extractTimeline(text: string): string | null {
  const lower = text.toLowerCase();
  if (['immediately', 'asap', 'right away', 'now', 'today'].some(k => lower.includes(k))) return 'Immediately';
  if (['this month', 'this week'].some(k => lower.includes(k))) return 'This month';
  if (['next month'].some(k => lower.includes(k))) return 'Next month';
  if (['3 month', '3months', 'three month'].some(k => lower.includes(k))) return 'In 3 months';
  if (['6 month', '6months', 'six month'].some(k => lower.includes(k))) return 'In 6 months';
  return null;
}

function computeIntentScore(state: ConversationState): IntentScore {
  let budgetMatch = 0;
  let urgency = 0;
  let engagement = 0;
  let courseFit = 0;

  if (state.leadData.budgetRange) budgetMatch = 20;
  if (state.leadData.budgetRange?.includes('Flexible')) budgetMatch = 25;

  if (state.leadData.startDate) {
    if (['Immediately', 'This month', 'Next month'].includes(state.leadData.startDate)) urgency = 25;
    else urgency = 15;
  }

  engagement = Math.min(25, state.userMessageCount * 4);

  if (state.matchedCourses.length > 0) courseFit = 15;
  if (state.leadData.specificProgram) courseFit = 25;
  if (state.leadData.preferredCenter) courseFit = Math.min(25, courseFit + 5);

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
  options?: string[]; // Inline selectable option chips
}

export function processUserMessage(userText: string, state: ConversationState): EngineResponse {
  const newState = { ...state };
  newState.userMessageCount += 1;
  newState.messageCount += 1;

  const lower = userText.toLowerCase();

  // Detect interests and objections
  const newInterests = detectInterests(userText);
  const newObjections = detectObjections(userText);
  newState.detectedInterests = [...new Set([...state.detectedInterests, ...newInterests])];
  newState.detectedObjections = [...new Set([...state.detectedObjections, ...newObjections])];

  // Match courses
  if (newState.detectedInterests.length > 0) {
    newState.matchedCourses = matchCourses(newState.detectedInterests);
  }

  // Extract city from text
  const cityMatch = centerLocations.find(c => lower.includes(c.city.toLowerCase()));
  if (cityMatch && !newState.leadData.city) {
    newState.leadData.city = cityMatch.city;
  }

  // Extract center if we have a city and are awaiting center selection
  if (newState.leadData.city) {
    const center = extractCenter(userText, newState.leadData.city);
    if (center) {
      newState.leadData.preferredCenter = center;
      newState.awaitingCenterSelection = false;
    }
  }

  // Extract budget from free text
  const budgetFromText = extractBudget(userText);
  if (budgetFromText) {
    newState.leadData.budgetRange = budgetFromText;
    newState.awaitingBudget = false;
  }

  // Extract timeline
  const timelineFromText = extractTimeline(userText);
  if (timelineFromText) {
    newState.leadData.startDate = timelineFromText;
    newState.awaitingTimeline = false;
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
  let options: string[] | undefined;

  switch (newState.phase) {
    case 'discovery': {
      if (newInterests.length > 0) {
        text = `Great choice! ${newInterests.join(' and ')} is a fantastic field with amazing career opportunities. 🎯\n\nTell me a bit about yourself — are you a student, working professional, or looking to switch careers? And what's your educational background?`;
        options = ['Student', 'Working Professional', 'Career Switcher'];
      } else {
        const discoveryQuestions = [
          { text: "That's interesting! Tell me more about yourself — are you a student, working professional, or looking to switch careers?", options: ['Student', 'Working Professional', 'Career Switcher'] },
          { text: "What's your current educational background? (12th, graduation, etc.)", options: ['12th Pass', 'Undergraduate', 'Graduate', 'Post Graduate'] },
          { text: "What challenges are you facing right now that made you explore new learning options?", options: ['Job Search', 'Skill Gap', 'Career Change', 'Better Salary'] },
          { text: "Where do you see yourself in 2-3 years? What's your dream role?", options: ['Animator', 'Game Designer', 'VFX Artist', 'Web Designer', 'IT Professional'] },
        ];
        const idx = Math.min(newState.userMessageCount - 1, discoveryQuestions.length - 1);
        text = discoveryQuestions[idx].text;
        options = discoveryQuestions[idx].options;
      }
      break;
    }

    case 'course_matching': {
      const courses = newState.matchedCourses;
      if (courses.length > 0 && !newState.courseCardShown) {
        newState.courseCardShown = true;
        showCourseCards = true;
        text = `Based on what you've shared, I think you'd be a great fit for these programs! Here are my top recommendations:\n\nTake a look and let me know which one excites you the most. I can also help with budget, EMI options, and center locations. 😊`;
        options = ['Tell me about placements', 'What are the fees?', 'Flexible timing options?', 'Which city centers?'];
      } else {
        text = `These programs are designed to take you from fundamentals to industry-ready. Our alumni are working at studios like Red Chillies, Prime Focus, and top gaming companies.\n\nWhat matters most to you?`;
        options = ['Placement support', 'Flexible timing', 'Budget-friendly options', 'Online learning'];
      }
      break;
    }

    case 'qualification': {
      // Handle center selection response
      if (newState.awaitingCenterSelection && newState.leadData.preferredCenter) {
        // Center was just selected in this turn
        newState.awaitingCenterSelection = false;
        if (!newState.leadData.budgetRange) {
          newState.awaitingBudget = true;
          text = `Great choice! ${newState.leadData.preferredCenter} is one of our popular centers. 🏢\n\nNow, what's your budget range? We have flexible EMI options starting from ₹8-10k/month.`;
          options = ['₹50k - ₹1L', '₹1L - ₹2L', '₹2L - ₹3L', 'Flexible / EMI'];
          break;
        }
      }

      // If city just detected, show centers
      if (newState.leadData.city && !newState.leadData.preferredCenter) {
        const loc = centerLocations.find(c => c.city === newState.leadData.city);
        if (loc) {
          newState.awaitingCenterSelection = true;
          const needsBudget = !newState.leadData.budgetRange;
          const needsTimeline = !newState.leadData.startDate;
          text = `Great, we have centers in ${loc.city}: ${loc.centers.join(', ')}. Which area would be most convenient for you?`;
          if (needsBudget) {
            text += `\n\nAlso, what's your budget range? We have flexible EMI options starting from ₹8-10k/month.`;
          }
          options = [...loc.centers];
          break;
        }
      }

      // Ask for city if not set
      if (!newState.leadData.city) {
        const cities = centerLocations.map(c => c.city);
        text = `Which city are you based in? We have centers across India.`;
        options = cities.slice(0, 6);
        
        if (!newState.leadData.startDate) {
          newState.awaitingTimeline = true;
          text += `\n\nAnd when are you looking to start? We have new batches coming up soon! 📅`;
        }
        break;
      }

      // Ask for budget if not set
      if (!newState.leadData.budgetRange) {
        newState.awaitingBudget = true;
        text = `What's your budget range for the program? We offer flexible EMI options too.`;
        options = ['₹50k - ₹1L', '₹1L - ₹2L', '₹2L - ₹3L', 'Flexible / EMI'];
        break;
      }

      // Ask for timeline if not set
      if (!newState.leadData.startDate) {
        newState.awaitingTimeline = true;
        text = `When are you looking to start? We have new batches coming up! 📅`;
        options = ['Immediately', 'This month', 'Next month', 'In 3 months'];
        break;
      }

      // Everything collected, move to data collection
      newState.phase = 'data_collection';
      newState.formRequested = true;
      showLeadForm = true;
      text = `Excellent! Based on what you've told me:\n• City: ${newState.leadData.city}${newState.leadData.preferredCenter ? ` (${newState.leadData.preferredCenter})` : ''}\n• Budget: ${newState.leadData.budgetRange}\n• Timeline: ${newState.leadData.startDate}\n\nLet me get your contact details so our counseling team can set everything up! 🚀`;
      break;
    }

    case 'objection_handling': {
      const lastObjection = newObjections[0] || newState.detectedObjections[newState.detectedObjections.length - 1];
      text = objectionResponses[lastObjection] || objectionResponses['think_about_it'];
      newState.detectedObjections = newState.detectedObjections.filter(o => o !== lastObjection);
      
      // Add contextual options based on objection type
      if (lastObjection === 'expensive') {
        options = ['Show EMI options', 'Explore shorter courses', 'Check scholarships'];
      } else if (lastObjection === 'placement') {
        options = ['View placement stats', 'See alumni stories', 'Talk to a counselor'];
      } else if (lastObjection === 'not_good_enough') {
        options = ['Tell me more about the curriculum', 'Can beginners join?', 'What support do you offer?'];
      } else if (lastObjection === 'online_vs_offline') {
        options = ['In-Center learning', 'Online learning', 'Hybrid mode'];
      } else {
        options = ['Send me a brochure', 'Check next batch dates', 'Talk to an advisor'];
      }
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
      options = ['Explore Animation & VFX', 'Career in Gaming', 'Upgrade My Skills', 'Check Course Fees'];
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
    options,
  };
}
