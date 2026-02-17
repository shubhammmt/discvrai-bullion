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
  emiOptions?: string;
  modules?: string[];
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
    emiOptions: 'EMI starts at ₹8,500/month for 24 months. Zero-cost EMI available on select banks.',
    modules: ['Fundamentals of Art & Design', '2D Animation & Storyboarding', '3D Modeling & Texturing', 'Character Animation', 'VFX & Compositing', 'Motion Graphics', 'Showreel & Portfolio'],
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
    emiOptions: 'EMI starts at ₹7,500/month for 18 months. No-cost EMI on HDFC & ICICI cards.',
    modules: ['Game Design Fundamentals', 'Game Art & 3D Modeling', 'Unity Development', 'Unreal Engine', 'Level Design & Scripting', 'Game Publishing'],
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
    emiOptions: 'EMI starts at ₹5,500/month for 12 months.',
    modules: ['Visual Design Principles', 'Graphic Design & Branding', 'UI/UX Design', 'Web Development Basics', 'Portfolio & Freelancing'],
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
    emiOptions: 'EMI starts at ₹9,000/month for 6 months. One-time payment discount available.',
    modules: ['SEO & SEM', 'Social Media Marketing', 'Content Marketing', 'Email Marketing', 'Analytics & Reporting', 'Paid Advertising'],
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
    emiOptions: 'EMI starts at ₹12,000/month for 18 months. Education loan assistance available.',
    modules: ['Advanced 3D Modeling', 'Character Rigging & Animation', 'VFX Simulation (Houdini)', 'Compositing & Color Grading', 'Showreel Production'],
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
    emiOptions: 'EMI starts at ₹7,500/month for 12 months.',
    modules: ['Screenwriting & Storytelling', 'Cinematography', 'Direction & Production', 'Editing & Post-Production', 'Sound Design', 'Short Film Project'],
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
    emiOptions: 'EMI starts at ₹9,000/month for 12 months.',
    modules: ['Concept Art & Illustration', '3D Character Modeling', 'Environment Art', 'Texturing & Shading', 'Game Engine Integration'],
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
    emiOptions: 'EMI starts at ₹7,500/month for 12 months.',
    modules: ['HTML/CSS/JS Fundamentals', 'React & Frontend Frameworks', 'Node.js & Express', 'Databases (SQL & NoSQL)', 'Cloud & DevOps', 'Capstone Project'],
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
    emiOptions: 'EMI starts at ₹9,000/month for 12 months.',
    modules: ['Python Programming', 'Statistics & Probability', 'Machine Learning', 'Deep Learning', 'Data Visualization', 'Capstone Project'],
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
  expensive: `I completely understand budget is important. Let me break down the value:\n\n💰 **Investment vs Return:**\n• Average starting salary: ₹3-5 LPA\n• Course investment: ₹1-2L (recoverable in 6-12 months)\n• EMI options available starting ₹7,500/month\n\nWould you like to see detailed EMI options or explore shorter/more affordable courses?`,
  
  not_good_enough: `That's actually very common — and honestly a sign that you care about doing this right! 💪\n\nOur programs are specifically designed for ALL levels:\n• **Beginners:** Start from absolute zero, no prior experience needed\n• **Intermediate:** Build on existing skills with advanced modules\n• **Career switchers:** Structured path from your current field\n\nMany of our top alumni started exactly where you are. Want to see the curriculum breakdown?`,
  
  placement: `Placement is our strongest suit! Here are the numbers 📊:\n\n• **80-85%+ placement assistance rate**\n• Partner studios: Red Chillies, Prime Focus, Technicolor, DNEG\n• Average starting package: ₹3-5 LPA\n• Top performers earn: ₹8-12 LPA within 2 years\n• Career counseling + mock interviews + portfolio reviews\n\nWant to hear some real alumni success stories?`,
  
  think_about_it: `Absolutely, take your time! This is an important decision. 🤔\n\nWhile you're thinking, I can help you with:\n• 📄 Detailed course brochure\n• 📅 Upcoming batch dates (new batches start every month)\n• 💰 Payment plan comparison\n• 🎓 Free demo class invitation\n\nAlso, we sometimes have limited early-bird discounts. Should I check what's available?`,
  
  online_vs_offline: `Great question! We offer flexible learning modes:\n\n🏢 **In-Center:** Hands-on labs, instructor-led, peer collaboration, studio-grade equipment\n📱 **Online:** Flexible timing, learn from anywhere, recorded sessions for revision\n🔄 **Hybrid:** Online theory + center practicals (most popular!)\n\nWhich format fits your schedule better?`,
};

// Sub-topic detailed responses for follow-up questions
export const subTopicResponses: Record<string, { text: string; options?: string[] }> = {
  // EMI details
  'show emi options': {
    text: `Here's a detailed breakdown of our EMI options 💳:\n\n**Zero-cost EMI (0% interest):**\n• Available on HDFC, ICICI, SBI, Axis Bank credit cards\n• 3, 6, 9, 12 month tenures\n\n**Low-cost EMI (education loan):**\n• Partner banks: HDFC Credila, Avanse, InCred\n• Interest: 10-12% p.a.\n• Tenure: up to 36 months\n• No collateral needed for loans under ₹4L\n\n**Example for ₹1.5L course:**\n• 12-month EMI: ~₹12,500/month (0% on select cards)\n• 18-month EMI: ~₹9,200/month\n• 24-month EMI: ~₹7,500/month\n\nShall I calculate EMI for a specific course?`,
    options: ['Calculate for Animation & VFX', 'Calculate for Gaming', 'Explore shorter courses', 'Continue to enrollment'],
  },
  'explore shorter courses': {
    text: `If budget is a concern, here are our shorter, more affordable programs:\n\n📱 **Digital Marketing Pro** — 6 months, ₹50-80K\n🎨 **Web & Graphic Design** — 12 months, ₹60K-1.2L\n🎬 **Filmmaking** — 12 months, ₹80K-1.5L\n\nThese still include placement assistance and industry certifications. Which one interests you?`,
    options: ['Digital Marketing details', 'Web & Graphic Design details', 'Filmmaking details'],
  },
  'check scholarships': {
    text: `We offer several scholarship & discount programs 🎓:\n\n🏆 **Merit Scholarship:** Up to 20% off for academic toppers (75%+ in last exam)\n👩 **Women in Tech:** 10% discount for female students in IT/Animation\n🎖️ **Defense/Govt Employee Ward:** 10% concession\n⏰ **Early Bird Discount:** 5-15% off when you enroll 30 days before batch start\n💡 **Referral Bonus:** ₹5,000 off when referred by an Aptech alumnus\n\nDo any of these apply to you?`,
    options: ['I qualify for merit scholarship', 'Tell me about early bird discount', 'Continue to enrollment'],
  },
  
  // Placement details
  'view placement stats': {
    text: `Here are our latest placement statistics 📊:\n\n**Overall Numbers (2023-24):**\n• 12,000+ students placed across India\n• 80-88% placement rate (varies by program)\n• 500+ hiring partners\n\n**Salary Ranges:**\n• Animation & VFX: ₹3-6 LPA (freshers), ₹8-15 LPA (3+ years)\n• Gaming: ₹3.5-7 LPA (freshers), ₹10-18 LPA (3+ years)\n• IT/Software: ₹4-8 LPA (freshers), ₹12-25 LPA (3+ years)\n• Digital Marketing: ₹2.5-5 LPA (freshers), ₹6-12 LPA (3+ years)\n\n**Top Recruiters:** Red Chillies, Prime Focus, DNEG, Technicolor, TCS, Infosys, Wipro`,
    options: ['See alumni stories', 'Which program has best placement?', 'Continue to enrollment'],
  },
  'see alumni stories': {
    text: `Here are some inspiring alumni stories 🌟:\n\n**Rohit Sharma** (Animation & VFX, 2021)\n• Started: 12th pass, zero experience\n• Now: VFX Artist at Prime Focus, ₹6.5 LPA\n• _"MAAC changed my life. I went from knowing nothing to working on Bollywood films."_\n\n**Priya Deshmukh** (Game Design, 2022)\n• Started: BSc graduate, career switcher\n• Now: Game Designer at Ubisoft Pune, ₹8 LPA\n• _"The hands-on projects and industry mentors made all the difference."_\n\n**Arjun Patel** (Digital Marketing, 2023)\n• Started: BCA graduate, couldn't find a job\n• Now: Digital Marketing Manager, ₹5.2 LPA + freelance income\n• _"Within 2 months of completing, I had 3 job offers."_\n\nWant to hear more, or shall we find the right program for you?`,
    options: ['Find the right program for me', 'More success stories', 'Continue to enrollment'],
  },
  'which program has best placement': {
    text: `Great question! Here's the placement ranking by rate:\n\n1. 🥇 **Full Stack Development** — 88%+ placement rate, highest demand\n2. 🥈 **Digital Marketing** — 85%+, fastest growing field\n3. 🥉 **Advanced VFX (MAAC)** — 85%+, premium studio placements\n4. **Web & Graphic Design** — 82%+, freelance + job options\n5. **Game Art & Design** — 82%+, niche but growing\n\nThe best choice really depends on YOUR interests and goals. Which field excites you most?`,
    options: ['IT & Software', 'Animation & VFX', 'Gaming', 'Digital Marketing'],
  },
  
  // Curriculum & learning
  'tell me more about the curriculum': {
    text: `Our curriculum is designed in partnership with industry leaders 📚:\n\n**How we design courses:**\n• Updated every 6 months based on industry trends\n• Advisory board includes professionals from studios & tech companies\n• Focus on tools actually used in the industry\n\n**Learning approach:**\n• 30% Theory + 70% Practical (hands-on projects)\n• Real client/studio briefs for practice\n• Industry mentors conduct masterclasses\n• Portfolio/showreel building throughout\n\n**Assessments:**\n• Module-wise assignments\n• Mid-term project reviews\n• Final capstone project\n• Industry-evaluated showreel/portfolio\n\nWant to see the module breakdown for a specific program?`,
    options: ['Animation & VFX modules', 'Gaming modules', 'IT modules', 'Design modules'],
  },
  'can beginners join': {
    text: `Absolutely, yes! 🙌 In fact, most of our students start as complete beginners.\n\n**Here's how we make it work:**\n• First 2-3 months: Foundation modules (basics of art, design, or coding)\n• Gradual progression from simple to complex\n• Small batch sizes (15-20 students) for personal attention\n• Doubt-clearing sessions and mentorship\n• Practice labs with extended hours\n\n**Real stat:** 70% of our animation alumni had zero prior experience before joining.\n\nThe only thing you need is curiosity and commitment. Ready to explore programs?`,
    options: ['Explore Animation & VFX', 'Career in Gaming', 'Explore IT programs', 'Continue to enrollment'],
  },
  'what support do you offer': {
    text: `We provide comprehensive support throughout your journey 🤝:\n\n**During the program:**\n• Dedicated mentor assigned to each student\n• Extra practice lab hours (including weekends)\n• Doubt-clearing sessions\n• Peer study groups\n• Online resources & recorded sessions for revision\n\n**Career support:**\n• Resume building & LinkedIn optimization\n• Mock interviews with industry professionals\n• Portfolio/showreel review sessions\n• Job referrals through alumni network\n• Lifetime access to placement portal\n\n**Post-course:**\n• Alumni community access\n• Industry networking events\n• Advanced certification pathways\n\nAnything specific you'd like to know more about?`,
    options: ['Tell me about placements', 'What are the fees?', 'Continue to enrollment'],
  },
  
  // Learning modes
  'in-center learning': {
    text: `Great choice! **In-Center learning** offers the full immersive experience 🏢:\n\n• State-of-the-art computer labs with high-end workstations\n• Studio-grade equipment (for filmmaking/animation)\n• Face-to-face instructor interaction\n• Peer collaboration and group projects\n• Regular industry visits and guest lectures\n\n**Timings available:**\n• Morning batch: 9 AM - 12 PM\n• Afternoon batch: 2 PM - 5 PM\n• Evening batch: 6 PM - 9 PM (ideal for working professionals)\n• Weekend batch: Sat-Sun (6 hours/day)\n\nWhich timing works for you?`,
    options: ['Morning batch', 'Evening batch', 'Weekend batch', 'Check center locations'],
  },
  'online learning': {
    text: `**Online learning** gives you maximum flexibility 📱:\n\n• Live instructor-led classes via Zoom/Teams\n• Recorded sessions for revision (lifetime access)\n• Cloud-based lab access for software practice\n• Same curriculum and certification as in-center\n• Regular doubt-clearing sessions\n• Digital portfolio building\n\n**Note:** For programs requiring specialized hardware (filmmaking, animation), we provide center access for practical sessions.\n\nWould you like to explore online program options?`,
    options: ['Online program fees', 'Can I switch to center later?', 'Continue to enrollment'],
  },
  'hybrid mode': {
    text: `**Hybrid mode** is our most popular option! 🔄\n\n• Theory sessions: Online (flexible timing)\n• Practical sessions: In-center (scheduled slots)\n• Best of both worlds!\n\n**Typical schedule:**\n• 2 days/week online theory (evenings)\n• 1-2 days/week center practicals (your chosen slot)\n• Weekend workshops (monthly)\n\nThis mode is especially popular with working professionals. Shall I check availability at your nearest center?`,
    options: ['Check center locations', 'What are the fees?', 'Continue to enrollment'],
  },
  
  // Nurture-path responses
  'send me a brochure': {
    text: `I'd love to send you a detailed brochure! 📄\n\nTo email it to you, I'll need your contact details. The brochure includes:\n• Complete course curriculum\n• Fee structure with EMI options\n• Placement statistics\n• Alumni testimonials\n• Center photos and facilities\n• Upcoming batch schedule\n\nShall I collect your details to send the brochure?`,
    options: ['Yes, share my details', 'Tell me more first', 'Check next batch dates'],
  },
  'check next batch dates': {
    text: `Here are the upcoming batch schedules 📅:\n\n**February 2026:**\n• Animation & VFX Pro — Starts Feb 20\n• Full Stack Development — Starts Feb 25\n\n**March 2026:**\n• Game Design — Starts Mar 5\n• Digital Marketing — Starts Mar 10\n• Advanced VFX (MAAC) — Starts Mar 15\n• Web & Graphic Design — Starts Mar 20\n\n⚡ **Early bird discount:** Enroll 15+ days before batch start and get up to 10% off!\n\nWhich batch interests you?`,
    options: ['February batch', 'March batch', 'Continue to enrollment'],
  },
  'talk to a counselor': {
    text: `Absolutely! Our counselors can give you personalized guidance. 🗣️\n\nYou can:\n• 📞 **Call:** 1800-XXX-XXXX (toll-free, 9 AM - 8 PM)\n• 💬 **WhatsApp:** +91-XXXXX-XXXXX\n• 🏢 **Visit:** Walk into any center for a free counseling session\n• 📹 **Video Call:** Schedule a 1-on-1 session\n\nOr, share your details here and a counselor will call you within 2 hours!`,
    options: ['Share my details', 'Continue chatting', 'Check center locations'],
  },
  'talk to an advisor': {
    text: `Our academic advisors are available to help! 🗣️\n\nTo connect you with the right advisor, let me capture your details. They'll help with:\n• Personalized course recommendation\n• Career path planning\n• Fee negotiation & scholarship eligibility\n• Center tour scheduling\n\nShall I collect your details?`,
    options: ['Yes, share my details', 'Tell me more first'],
  },
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

// Status labels used for discovery tracking
export const userStatuses = ['Student', 'Working Professional', 'Career Switcher', 'Freelancer'] as const;
export const educationLevels = ['12th Pass', 'Undergraduate', 'Graduate', 'Post Graduate'] as const;
