export interface CourseProgram {
  id: string;
  brand: 'Arena Animation' | 'MAAC' | 'Aptech IT' | 'Aptech Other';
  name: string;
  category: string;
  duration: string;
  priceRange: string;
  priceMin: number;
  priceMax: number;
  careerOutcomes: string[];
  placementRate: string;
  highlights: string[];
  tools: string[];
}

export interface CenterLocation {
  city: string;
  centers: string[];
}

export const coursePrograms: CourseProgram[] = [
  // Arena Animation
  {
    id: 'arena-anim-vfx',
    brand: 'Arena Animation',
    name: 'Animation & VFX Pro',
    category: 'Animation & VFX',
    duration: '24 months',
    priceRange: '₹1,50,000 - ₹2,50,000',
    priceMin: 150000,
    priceMax: 250000,
    careerOutcomes: ['3D Animator', 'VFX Artist', 'Motion Graphics Designer', 'Compositing Artist'],
    placementRate: '80%+',
    highlights: ['Industry-standard curriculum', 'Portfolio of 5+ projects', 'Placement assistance', 'Studio visits'],
    tools: ['Maya', 'After Effects', 'Nuke', 'Blender', 'Premiere Pro'],
  },
  {
    id: 'arena-gaming',
    brand: 'Arena Animation',
    name: 'Game Design & Development',
    category: 'Gaming',
    duration: '18 months',
    priceRange: '₹1,20,000 - ₹2,00,000',
    priceMin: 120000,
    priceMax: 200000,
    careerOutcomes: ['Game Designer', 'Game Developer', 'Game Artist', 'Level Designer'],
    placementRate: '78%+',
    highlights: ['Unreal Engine & Unity training', 'Build 3 playable games', 'Game jam participation', 'Industry mentors'],
    tools: ['Unity', 'Unreal Engine', 'Blender', 'Photoshop', 'C#'],
  },
  {
    id: 'arena-web-graphics',
    brand: 'Arena Animation',
    name: 'Web & Graphic Design',
    category: 'Web & Graphics',
    duration: '12 months',
    priceRange: '₹60,000 - ₹1,20,000',
    priceMin: 60000,
    priceMax: 120000,
    careerOutcomes: ['Web Designer', 'UI/UX Designer', 'Graphic Designer', 'Brand Designer'],
    placementRate: '82%+',
    highlights: ['Live client projects', 'Portfolio website', 'UI/UX specialization', 'Freelance readiness'],
    tools: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'HTML/CSS/JS'],
  },
  {
    id: 'arena-digital-marketing',
    brand: 'Arena Animation',
    name: 'Digital Marketing Pro',
    category: 'Digital Marketing',
    duration: '6 months',
    priceRange: '₹50,000 - ₹80,000',
    priceMin: 50000,
    priceMax: 80000,
    careerOutcomes: ['Digital Marketing Manager', 'SEO Specialist', 'Social Media Manager', 'Content Strategist'],
    placementRate: '85%+',
    highlights: ['Google & Meta certifications', 'Live campaign management', 'Analytics mastery', 'Freelance-ready'],
    tools: ['Google Ads', 'Meta Business Suite', 'Google Analytics', 'SEMrush', 'Canva'],
  },
  // MAAC
  {
    id: 'maac-adv-vfx',
    brand: 'MAAC',
    name: 'Advanced VFX & Animation',
    category: 'Animation & VFX',
    duration: '18 months',
    priceRange: '₹1,80,000 - ₹3,00,000',
    priceMin: 180000,
    priceMax: 300000,
    careerOutcomes: ['VFX Supervisor', 'Senior 3D Animator', 'Character Animator', 'Look Dev Artist'],
    placementRate: '85%+',
    highlights: ['Studio-grade training', 'Red Chillies & Prime Focus connections', 'Showreel creation', 'International exposure'],
    tools: ['Maya', 'Houdini', 'Nuke', 'ZBrush', 'Substance Painter'],
  },
  {
    id: 'maac-filmmaking',
    brand: 'MAAC',
    name: 'Filmmaking & Video Production',
    category: 'Filmmaking',
    duration: '12 months',
    priceRange: '₹80,000 - ₹1,50,000',
    priceMin: 80000,
    priceMax: 150000,
    careerOutcomes: ['Film Editor', 'Cinematographer', 'Video Producer', 'Documentary Filmmaker'],
    placementRate: '80%+',
    highlights: ['Short film production', 'Industry-grade equipment access', 'Festival submissions', 'Director mentorship'],
    tools: ['Premiere Pro', 'DaVinci Resolve', 'After Effects', 'Cinema cameras'],
  },
  {
    id: 'maac-game-art',
    brand: 'MAAC',
    name: 'Game Art & Design',
    category: 'Gaming',
    duration: '12 months',
    priceRange: '₹1,00,000 - ₹1,80,000',
    priceMin: 100000,
    priceMax: 180000,
    careerOutcomes: ['Game Artist', 'Concept Artist', 'Environment Artist', '3D Modeler'],
    placementRate: '82%+',
    highlights: ['AAA-quality art pipeline', 'Character & environment design', 'Industry portfolio', 'Studio internships'],
    tools: ['ZBrush', 'Substance Painter', 'Maya', 'Photoshop', 'Unreal Engine'],
  },
  // Other Programs
  {
    id: 'aptech-fullstack',
    brand: 'Aptech IT',
    name: 'Full Stack Development',
    category: 'IT & Software',
    duration: '12 months',
    priceRange: '₹80,000 - ₹1,50,000',
    priceMin: 80000,
    priceMax: 150000,
    careerOutcomes: ['Full Stack Developer', 'Frontend Developer', 'Backend Developer', 'Software Engineer'],
    placementRate: '88%+',
    highlights: ['MERN/MEAN stack', 'Cloud deployment', '5+ live projects', 'Interview prep'],
    tools: ['React', 'Node.js', 'MongoDB', 'AWS', 'Git'],
  },
  {
    id: 'aptech-data-science',
    brand: 'Aptech IT',
    name: 'Data Science & AI',
    category: 'IT & Software',
    duration: '12 months',
    priceRange: '₹1,00,000 - ₹1,80,000',
    priceMin: 100000,
    priceMax: 180000,
    careerOutcomes: ['Data Scientist', 'ML Engineer', 'Data Analyst', 'AI Developer'],
    placementRate: '85%+',
    highlights: ['Python & R mastery', 'Real datasets', 'Kaggle competitions', 'Capstone project'],
    tools: ['Python', 'TensorFlow', 'Pandas', 'Tableau', 'SQL'],
  },
];

export const centerLocations: CenterLocation[] = [
  { city: 'Mumbai', centers: ['Andheri West', 'Thane', 'Borivali', 'Dadar'] },
  { city: 'Delhi', centers: ['Connaught Place', 'Dwarka', 'Rohini', 'Laxmi Nagar'] },
  { city: 'Bangalore', centers: ['Koramangala', 'Whitefield', 'Jayanagar', 'Electronic City'] },
  { city: 'Chennai', centers: ['T. Nagar', 'Anna Nagar', 'Velachery'] },
  { city: 'Hyderabad', centers: ['Ameerpet', 'KPHB', 'Kukatpally'] },
  { city: 'Pune', centers: ['Shivaji Nagar', 'Kothrud', 'Hadapsar'] },
  { city: 'Kolkata', centers: ['Park Street', 'Salt Lake', 'Howrah'] },
  { city: 'Ahmedabad', centers: ['CG Road', 'Satellite', 'Vastrapur'] },
];

export const objectionResponses: Record<string, string> = {
  expensive: `I completely understand. Let me break down the ROI:\\n• Average starting salary: ₹3-5 LPA\\n• Investment: ₹1-2L (with EMI options as low as ₹8-10k/month)\\n• Payback period: 6-12 months\\n• Plus, we offer flexible payment plans and scholarships.\\n\\nWould you like to explore EMI options?`,
  
  not_good_enough: `That's a common concern, and honestly, it's a good sign — it shows you care about quality. Our programs are designed for ALL levels, from complete beginners to advanced learners. Many of our most successful alumni started with zero experience.\\n\\nWe start with fundamentals and build up step by step. Would you like to hear about our learning approach?`,
  
  placement: `Placement is important, and we take it seriously:\\n• 80-85%+ placement assistance rate\\n• Industry partnerships with studios like Red Chillies, Prime Focus\\n• Career counseling and interview preparation\\n• Portfolio building and showreel creation\\n• Alumni network across top studios\\n\\nHowever, success also depends on your effort and commitment. Are you ready to put in the work?`,
  
  think_about_it: `Absolutely, this is a big decision and you should take your time. While you think, I can:\\n• Send you a detailed course brochure\\n• Share alumni success stories\\n• Provide payment plan options\\n• Share next batch schedule\\n\\nAlso, we sometimes have early-bird offers. Would you like me to check availability?`,
  
  online_vs_offline: `Great question! We offer both options:\\n• **In-Center:** Hands-on learning, instructor-led, peer collaboration, studio access\\n• **Online:** Flexible timing, learn from anywhere, recorded sessions\\n• **Hybrid:** Best of both — online theory + center-based practicals\\n\\nWhich format works better for your schedule?`,
};

export const quickPrompts = [
  'Explore Animation & VFX',
  'Career in Gaming',
  'Upgrade My Skills',
  'Check Course Fees',
];

export const budgetRanges = [
  '₹50k - ₹1L',
  '₹1L - ₹2L',
  '₹2L - ₹3L',
  'Flexible / EMI',
];
