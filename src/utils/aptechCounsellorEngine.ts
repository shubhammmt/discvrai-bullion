import { coursePrograms, objectionResponses, subTopicResponses, centerLocations, type CourseProgram } from '@/data/aptechCourseData';

export type ConversationPhase =
  | 'greeting'
  | 'discovery'
  | 'course_matching'
  | 'qualification'
  | 'objection_handling'
  | 'sub_topic'
  | 'nurture'
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
  resolvedObjections: string[];
  awaitingCenterSelection: boolean;
  awaitingBudget: boolean;
  awaitingTimeline: boolean;
  discoveryAnswered: number; // tracks how many discovery Qs answered
  qualificationComplete: boolean;
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
    resolvedObjections: [],
    awaitingCenterSelection: false,
    awaitingBudget: false,
    awaitingTimeline: false,
    discoveryAnswered: 0,
    qualificationComplete: false,
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

// ─── Keyword detection ────────────────────────────────────────────

const interestKeywords: Record<string, string[]> = {
  'Animation & VFX': ['animation', 'animate', 'vfx', 'visual effects', 'motion graphics', '3d', '2d', 'character animation'],
  'Gaming': ['gaming', 'game', 'game design', 'game development', 'unreal', 'unity', 'game art'],
  'Web & Graphics': ['web', 'graphic', 'ui', 'ux', 'design', 'figma', 'photoshop', 'logo'],
  'Digital Marketing': ['digital marketing', 'seo', 'social media', 'marketing', 'ads', 'content marketing'],
  'Filmmaking': ['film', 'filmmaking', 'video', 'cinematography', 'editing', 'director', 'movie'],
  'IT & Software': ['it', 'software', 'coding', 'programming', 'developer', 'full stack', 'data science', 'python', 'react'],
};

const objectionKeywords: Record<string, string[]> = {
  expensive: ['expensive', 'costly', 'afford', 'money', 'price', 'fee', 'cheap', 'cost'],
  not_good_enough: ['not good enough', 'capable', 'beginner', 'no experience', 'can i', 'able to', 'difficult', 'hard'],
  placement: ['placement', 'job', 'placed', 'hire', 'salary', 'package', 'guarantee'],
  think_about_it: ['think about', 'decide later', 'not sure', 'confused', 'later', 'consider'],
  online_vs_offline: ['online', 'offline', 'center', 'remote', 'from home', 'hybrid'],
};

const statusKeywords: Record<string, string[]> = {
  'Student': ['student', 'studying', 'college', 'school', '12th', 'graduation'],
  'Working Professional': ['working', 'professional', 'job', 'employed', 'office', 'work'],
  'Career Switcher': ['switch', 'career change', 'new career', 'different field', 'transition'],
};

const educationKeywords: Record<string, string[]> = {
  '12th Pass': ['12th', 'hsc', 'intermediate', 'plus two', '+2'],
  'Undergraduate': ['undergraduate', 'btech', 'bsc', 'bca', 'bcom', 'ba', 'pursuing'],
  'Graduate': ['graduate', 'graduated', 'degree', 'bachelor'],
  'Post Graduate': ['post graduate', 'masters', 'mba', 'mtech', 'msc', 'mca', 'phd'],
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

function detectStatus(text: string): string | null {
  const lower = text.toLowerCase();
  for (const [status, keywords] of Object.entries(statusKeywords)) {
    if (keywords.some(k => lower.includes(k))) return status;
  }
  return null;
}

function detectEducation(text: string): string | null {
  const lower = text.toLowerCase();
  for (const [level, keywords] of Object.entries(educationKeywords)) {
    if (keywords.some(k => lower.includes(k))) return level;
  }
  return null;
}

function matchCourses(interests: string[]): CourseProgram[] {
  if (interests.length === 0) return coursePrograms.slice(0, 3);
  return coursePrograms.filter(c => interests.includes(c.category));
}

// ─── Sub-topic matching ───────────────────────────────────────────

function findSubTopicResponse(text: string): { text: string; options?: string[] } | null {
  const lower = text.toLowerCase().trim();

  // Direct match on sub-topic keys
  for (const [key, response] of Object.entries(subTopicResponses)) {
    if (lower === key || lower.includes(key)) return response;
  }

  // Fuzzy matches for common follow-up intents
  const fuzzyMap: Record<string, string> = {
    'emi': 'show emi options',
    'installment': 'show emi options',
    'monthly payment': 'show emi options',
    'scholarship': 'check scholarships',
    'discount': 'check scholarships',
    'concession': 'check scholarships',
    'placement stat': 'view placement stats',
    'placement rate': 'view placement stats',
    'placement data': 'view placement stats',
    'alumni': 'see alumni stories',
    'success stor': 'see alumni stories',
    'student stor': 'see alumni stories',
    'curriculum': 'tell me more about the curriculum',
    'syllabus': 'tell me more about the curriculum',
    'module': 'tell me more about the curriculum',
    'what will i learn': 'tell me more about the curriculum',
    'beginner': 'can beginners join',
    'zero experience': 'can beginners join',
    'no experience': 'can beginners join',
    'support': 'what support do you offer',
    'help during': 'what support do you offer',
    'mentorship': 'what support do you offer',
    'brochure': 'send me a brochure',
    'pdf': 'send me a brochure',
    'batch date': 'check next batch dates',
    'next batch': 'check next batch dates',
    'when does it start': 'check next batch dates',
    'start date': 'check next batch dates',
    'talk to': 'talk to a counselor',
    'call me': 'talk to a counselor',
    'counselor': 'talk to a counselor',
    'advisor': 'talk to an advisor',
    'in-center': 'in-center learning',
    'classroom': 'in-center learning',
    'online class': 'online learning',
    'online mode': 'online learning',
    'hybrid': 'hybrid mode',
    'best placement': 'which program has best placement',
    'highest placement': 'which program has best placement',
    'shorter course': 'explore shorter courses',
    'affordable': 'explore shorter courses',
  };

  for (const [fuzzyKey, subTopicKey] of Object.entries(fuzzyMap)) {
    if (lower.includes(fuzzyKey)) {
      return subTopicResponses[subTopicKey] || null;
    }
  }

  // Module breakdown request for specific programs
  if (lower.includes('module') || lower.includes('breakdown') || lower.includes('syllabus')) {
    const courses = matchCourses(detectInterests(text));
    if (courses.length > 0 && courses[0].modules) {
      const c = courses[0];
      const moduleList = c.modules.map((m, i) => `${i + 1}. ${m}`).join('\n');
      return {
        text: `Here's the module breakdown for **${c.name}** (${c.duration}):\n\n${moduleList}\n\nEach module includes hands-on projects and assessments. The final capstone project ties everything together into your portfolio.\n\nWant to know more about fees or enrollment?`,
        options: ['What are the fees?', 'Show EMI options', 'Continue to enrollment'],
      };
    }
  }

  // EMI calculation for specific course
  if (lower.includes('calculate for') || lower.includes('emi for')) {
    const courses = matchCourses(detectInterests(text));
    if (courses.length > 0) {
      const c = courses[0];
      const avgPrice = Math.round((c.priceMin + c.priceMax) / 2);
      const emi12 = Math.round(avgPrice / 12);
      const emi18 = Math.round(avgPrice / 18);
      const emi24 = Math.round(avgPrice / 24);
      return {
        text: `💳 **EMI Calculator: ${c.name}**\n\nCourse fee: ${c.priceRange}\nAverage: ₹${(avgPrice / 1000).toFixed(0)}K\n\n| Tenure | Monthly EMI | Total |\n|--------|------------|-------|\n| 12 months | ₹${emi12.toLocaleString()} | ₹${avgPrice.toLocaleString()} |\n| 18 months | ₹${emi18.toLocaleString()} | ₹${avgPrice.toLocaleString()} |\n| 24 months | ₹${emi24.toLocaleString()} | ₹${avgPrice.toLocaleString()} |\n\n*Zero-cost EMI on select bank cards. Education loan rates may vary.*\n\n${c.emiOptions || ''}\n\nReady to take the next step?`,
        options: ['Continue to enrollment', 'Check scholarships', 'Explore other programs'],
      };
    }
  }

  return null;
}

// ─── Data extraction ──────────────────────────────────────────────

function extractBudget(text: string): string | null {
  const lower = text.toLowerCase();
  if (lower.includes('50k') || lower.includes('50,000') || lower.includes('50000')) return '₹50k - ₹1L';
  if (lower.includes('2l') || lower.includes('2 lakh') || lower.includes('200000') || lower.includes('2,00,000')) return '₹2L - ₹3L';
  if (lower.includes('1l') || lower.includes('1 lakh') || lower.includes('100000') || lower.includes('1,00,000')) return '₹1L - ₹2L';
  if (lower.includes('flexible') || lower.includes('emi')) return 'Flexible / EMI';
  // Budget chip exact matches
  if (lower === '₹50k - ₹1l') return '₹50k - ₹1L';
  if (lower === '₹1l - ₹2l') return '₹1L - ₹2L';
  if (lower === '₹2l - ₹3l') return '₹2L - ₹3L';
  if (lower === 'flexible / emi') return 'Flexible / EMI';
  const monthlyMatch = lower.match(/(\d+)\s*k/);
  if (monthlyMatch) {
    const amount = parseInt(monthlyMatch[1]) * 1000;
    if (amount <= 15000) return 'Flexible / EMI';
    if (amount <= 100000) return '₹50k - ₹1L';
    if (amount <= 200000) return '₹1L - ₹2L';
  }
  return null;
}

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

function extractTimeline(text: string): string | null {
  const lower = text.toLowerCase();
  if (['immediately', 'asap', 'right away', 'now', 'today'].some(k => lower.includes(k))) return 'Immediately';
  if (['this month', 'this week'].some(k => lower.includes(k))) return 'This month';
  if (['next month'].some(k => lower.includes(k))) return 'Next month';
  if (['february', 'feb batch'].some(k => lower.includes(k))) return 'February 2026';
  if (['march', 'mar batch'].some(k => lower.includes(k))) return 'March 2026';
  if (['3 month', '3months', 'three month'].some(k => lower.includes(k))) return 'In 3 months';
  if (['6 month', '6months', 'six month'].some(k => lower.includes(k))) return 'In 6 months';
  return null;
}

// ─── Intent Scoring (improved) ────────────────────────────────────

function computeIntentScore(state: ConversationState): IntentScore {
  let budgetMatch = 0;
  let urgency = 0;
  let engagement = 0;
  let courseFit = 0;

  // Budget (0-25)
  if (state.leadData.budgetRange) {
    budgetMatch = 15;
    if (state.leadData.budgetRange.includes('Flexible')) budgetMatch = 25;
    else if (state.leadData.budgetRange.includes('₹2L')) budgetMatch = 22;
    else if (state.leadData.budgetRange.includes('₹1L')) budgetMatch = 20;
  }

  // Urgency (0-25)
  if (state.leadData.startDate) {
    if (['Immediately', 'This month'].includes(state.leadData.startDate)) urgency = 25;
    else if (['Next month', 'February 2026'].includes(state.leadData.startDate)) urgency = 20;
    else if (state.leadData.startDate.includes('March')) urgency = 15;
    else urgency = 10;
  }

  // Engagement (0-25) — quality-based, not just message count
  const engagementFactors = [
    state.leadData.currentStatus ? 3 : 0,
    state.leadData.educationalBackground ? 3 : 0,
    state.leadData.careerGoals ? 3 : 0,
    state.leadData.city ? 3 : 0,
    state.leadData.preferredCenter ? 3 : 0,
    state.courseCardShown ? 2 : 0,
    state.resolvedObjections.length > 0 ? 3 : 0,
    Math.min(5, state.userMessageCount), // capped at 5
  ];
  engagement = Math.min(25, engagementFactors.reduce((a, b) => a + b, 0));

  // Course Fit (0-25)
  if (state.matchedCourses.length > 0) courseFit = 10;
  if (state.detectedInterests.length >= 1) courseFit = 15;
  if (state.leadData.specificProgram) courseFit = 22;
  if (state.leadData.preferredCenter && state.leadData.specificProgram) courseFit = 25;

  const total = budgetMatch + urgency + engagement + courseFit;
  return { total, budgetMatch, urgency, engagement, courseFit };
}

// ─── Phase decision ───────────────────────────────────────────────

function nextPhase(state: ConversationState): ConversationPhase {
  if (state.formCompleted) return 'close';
  if (state.formRequested) return 'data_collection';
  if (state.qualificationComplete && !state.formRequested) return 'data_collection';
  if (state.leadData.city && (!state.leadData.preferredCenter || !state.leadData.budgetRange || !state.leadData.startDate)) return 'qualification';
  if (state.detectedObjections.length > 0 && state.phase !== 'objection_handling') return 'objection_handling';
  if (state.userMessageCount >= 8 && !state.formRequested) return 'data_collection';
  if (state.matchedCourses.length > 0 && state.userMessageCount >= 3) return 'qualification';
  if (state.detectedInterests.length > 0) return 'course_matching';
  if (state.userMessageCount >= 1) return 'discovery';
  return 'greeting';
}

// ─── Main engine ──────────────────────────────────────────────────

export interface EngineResponse {
  text: string;
  showCourseCards: boolean;
  showLeadForm: boolean;
  showIntentScore: boolean;
  showSummary: boolean;
  matchedCourses: CourseProgram[];
  updatedState: ConversationState;
  options?: string[];
}

export function processUserMessage(userText: string, state: ConversationState): EngineResponse {
  const newState: ConversationState = { ...state };
  newState.userMessageCount += 1;
  newState.messageCount += 1;

  const lower = userText.toLowerCase().trim();

  // ── Extract all data from user text ──
  const newInterests = detectInterests(userText);
  const newObjections = detectObjections(userText);
  newState.detectedInterests = [...new Set([...state.detectedInterests, ...newInterests])];

  // Only add objections that aren't already resolved
  const freshObjections = newObjections.filter(o => !state.resolvedObjections.includes(o));
  newState.detectedObjections = [...new Set([...state.detectedObjections, ...freshObjections])];

  // Extract user status & education
  const status = detectStatus(userText);
  if (status && !newState.leadData.currentStatus) newState.leadData.currentStatus = status;
  const education = detectEducation(userText);
  if (education && !newState.leadData.educationalBackground) newState.leadData.educationalBackground = education;

  // Extract career goals from dream role responses
  const goalKeywords = ['animator', 'game designer', 'vfx artist', 'web designer', 'it professional', 'developer', 'filmmaker', 'marketer'];
  const detectedGoal = goalKeywords.find(g => lower.includes(g));
  if (detectedGoal && !newState.leadData.careerGoals) newState.leadData.careerGoals = detectedGoal;

  // Match courses
  if (newState.detectedInterests.length > 0) {
    newState.matchedCourses = matchCourses(newState.detectedInterests);
  }

  // Extract city
  const cityMatch = centerLocations.find(c => lower.includes(c.city.toLowerCase()));
  if (cityMatch && !newState.leadData.city) newState.leadData.city = cityMatch.city;

  // Extract center
  if (newState.leadData.city) {
    const center = extractCenter(userText, newState.leadData.city);
    if (center) {
      newState.leadData.preferredCenter = center;
      newState.awaitingCenterSelection = false;
    }
  }

  // Extract budget
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

  // ── Check for sub-topic follow-ups FIRST ──
  // This catches chips like "Show EMI options", "See alumni stories", etc.
  const subTopic = findSubTopicResponse(userText);
  if (subTopic) {
    // Check if this sub-topic leads to enrollment
    if (lower.includes('continue to enrollment') || lower.includes('share my details') || lower.includes('yes, share')) {
      newState.formRequested = true;
      newState.phase = 'data_collection';
      newState.intentScore = computeIntentScore(newState);
      return {
        text: `Great! Let me collect your details so our counseling team can assist you further. 🚀`,
        showCourseCards: false,
        showLeadForm: true,
        showIntentScore: false,
        showSummary: false,
        matchedCourses: newState.matchedCourses,
        updatedState: newState,
      };
    }

    newState.phase = 'sub_topic';
    newState.intentScore = computeIntentScore(newState);
    return {
      text: subTopic.text,
      showCourseCards: false,
      showLeadForm: false,
      showIntentScore: false,
      showSummary: false,
      matchedCourses: newState.matchedCourses,
      updatedState: newState,
      options: subTopic.options,
    };
  }

  // ── Handle "continue to enrollment" / "share my details" ──
  if (lower.includes('continue to enrollment') || lower.includes('share my details') || lower.includes('yes, share')) {
    newState.formRequested = true;
    newState.phase = 'data_collection';
    newState.intentScore = computeIntentScore(newState);
    return {
      text: `Awesome! Let me collect your details so our team can set everything up for you. 🚀`,
      showCourseCards: false,
      showLeadForm: true,
      showIntentScore: false,
      showSummary: false,
      matchedCourses: newState.matchedCourses,
      updatedState: newState,
    };
  }

  // ── Handle "tell me more first" (nurture) ──
  if (lower.includes('tell me more first') || lower.includes('continue chatting') || lower.includes('more info')) {
    newState.phase = 'nurture';
    newState.intentScore = computeIntentScore(newState);
    const hasInterests = newState.detectedInterests.length > 0;
    return {
      text: hasInterests
        ? `Of course! I'm happy to answer any questions. What would you like to know more about? 😊`
        : `Sure! Let me help you explore. What field interests you most?`,
      showCourseCards: false,
      showLeadForm: false,
      showIntentScore: false,
      showSummary: false,
      matchedCourses: newState.matchedCourses,
      updatedState: newState,
      options: hasInterests
        ? ['Show EMI options', 'View placement stats', 'Tell me more about the curriculum', 'Check next batch dates']
        : ['Animation & VFX', 'Gaming', 'IT & Software', 'Digital Marketing'],
    };
  }

  // ── Handle "explore other programs" ──
  if (lower.includes('explore other') || lower.includes('other programs') || lower.includes('what else')) {
    newState.courseCardShown = false;
    newState.intentScore = computeIntentScore(newState);
    return {
      text: `Let me show you all our program categories! Which area excites you? 🎯`,
      showCourseCards: false,
      showLeadForm: false,
      showIntentScore: false,
      showSummary: false,
      matchedCourses: newState.matchedCourses,
      updatedState: newState,
      options: ['Animation & VFX', 'Gaming', 'Web & Graphic Design', 'Digital Marketing', 'IT & Software', 'Filmmaking'],
    };
  }

  // ── Determine phase ──
  newState.phase = nextPhase(newState);
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
          { text: "What's your current educational background?", options: ['12th Pass', 'Undergraduate', 'Graduate', 'Post Graduate'] },
          { text: "What challenges are you facing right now that made you explore new learning options?", options: ['Job Search', 'Skill Gap', 'Career Change', 'Better Salary'] },
          { text: "Where do you see yourself in 2-3 years? What's your dream role?", options: ['Animator', 'Game Designer', 'VFX Artist', 'Web Designer', 'IT Professional'] },
          { text: "What industry excites you most? Let's find the perfect program for you! 🎯", options: ['Animation & VFX', 'Gaming', 'IT & Software', 'Digital Marketing'] },
        ];
        const idx = Math.min(newState.discoveryAnswered, discoveryQuestions.length - 1);
        text = discoveryQuestions[idx].text;
        options = discoveryQuestions[idx].options;
        newState.discoveryAnswered += 1;
      }
      break;
    }

    case 'course_matching': {
      const courses = newState.matchedCourses;
      if (courses.length > 0 && !newState.courseCardShown) {
        newState.courseCardShown = true;
        showCourseCards = true;
        text = `Based on what you've shared, I think you'd be a great fit for these programs! Here are my top recommendations:\n\nTake a look and let me know which one excites you the most. I can help with fees, EMI options, placements, and center locations. 😊`;
        options = ['Tell me about placements', 'Show EMI options', 'Check next batch dates', 'Which city centers?'];
      } else {
        text = `These programs are designed to take you from fundamentals to industry-ready. Our alumni are working at top studios and companies.\n\nWhat would you like to know more about?`;
        options = ['View placement stats', 'Show EMI options', 'Tell me more about the curriculum', 'Continue to enrollment'];
      }
      break;
    }

    case 'qualification': {
      // Center selection response
      if (newState.awaitingCenterSelection && newState.leadData.preferredCenter) {
        newState.awaitingCenterSelection = false;
        if (!newState.leadData.budgetRange) {
          newState.awaitingBudget = true;
          text = `Great choice! ${newState.leadData.preferredCenter} is one of our popular centers. 🏢\n\nNow, what's your budget range? We have flexible EMI options starting from ₹7,500/month.`;
          options = ['₹50k - ₹1L', '₹1L - ₹2L', '₹2L - ₹3L', 'Flexible / EMI'];
          break;
        }
      }

      // City detected, show centers
      if (newState.leadData.city && !newState.leadData.preferredCenter) {
        const loc = centerLocations.find(c => c.city === newState.leadData.city);
        if (loc) {
          newState.awaitingCenterSelection = true;
          text = `Great, we have centers in ${loc.city}: ${loc.centers.join(', ')}. Which area would be most convenient for you?`;
          options = [...loc.centers];
          break;
        }
      }

      // Ask for city
      if (!newState.leadData.city) {
        const cities = centerLocations.map(c => c.city);
        text = `Which city are you based in? We have centers across India.`;
        options = cities.slice(0, 6);
        break;
      }

      // Ask for budget
      if (!newState.leadData.budgetRange) {
        newState.awaitingBudget = true;
        text = `What's your budget range for the program? We offer flexible EMI options too.`;
        options = ['₹50k - ₹1L', '₹1L - ₹2L', '₹2L - ₹3L', 'Flexible / EMI'];
        break;
      }

      // Ask for timeline
      if (!newState.leadData.startDate) {
        newState.awaitingTimeline = true;
        text = `When are you looking to start? We have new batches coming up! 📅`;
        options = ['Immediately', 'This month', 'Next month', 'In 3 months'];
        break;
      }

      // All qualification data collected
      newState.qualificationComplete = true;
      newState.phase = 'data_collection';
      newState.formRequested = true;
      showLeadForm = true;
      text = `Excellent! Here's what I have so far:\n• 📍 City: ${newState.leadData.city}${newState.leadData.preferredCenter ? ` (${newState.leadData.preferredCenter})` : ''}\n• 💰 Budget: ${newState.leadData.budgetRange}\n• 📅 Timeline: ${newState.leadData.startDate}\n${newState.leadData.currentStatus ? `• 👤 Status: ${newState.leadData.currentStatus}` : ''}\n${newState.leadData.educationalBackground ? `• 🎓 Education: ${newState.leadData.educationalBackground}` : ''}\n\nLet me get your contact details so our counseling team can set everything up! 🚀`;
      break;
    }

    case 'objection_handling': {
      const currentObjection = freshObjections[0] || newState.detectedObjections[newState.detectedObjections.length - 1];
      text = objectionResponses[currentObjection] || objectionResponses['think_about_it'];
      
      // Mark objection as resolved
      newState.resolvedObjections = [...new Set([...state.resolvedObjections, currentObjection])];
      newState.detectedObjections = newState.detectedObjections.filter(o => o !== currentObjection);

      // Context-specific follow-up options
      if (currentObjection === 'expensive') {
        options = ['Show EMI options', 'Check scholarships', 'Explore shorter courses'];
      } else if (currentObjection === 'placement') {
        options = ['View placement stats', 'See alumni stories', 'Which program has best placement?'];
      } else if (currentObjection === 'not_good_enough') {
        options = ['Can beginners join?', 'Tell me more about the curriculum', 'What support do you offer?'];
      } else if (currentObjection === 'online_vs_offline') {
        options = ['In-Center learning', 'Online learning', 'Hybrid mode'];
      } else {
        options = ['Send me a brochure', 'Check next batch dates', 'Talk to a counselor'];
      }
      break;
    }

    case 'data_collection': {
      if (!newState.formRequested) {
        newState.formRequested = true;
        showLeadForm = true;
        text = `I'd love to help you take the next step! 🚀\n\nCould you share your details below? Our counseling team will reach out with:\n• 📄 Detailed course brochure\n• 💳 Payment plan options\n• 📅 Next batch schedule\n• 🏢 Free center visit invitation`;
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
