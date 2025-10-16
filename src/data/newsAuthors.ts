import { NewsAuthor } from '@/types/news';

export const newsAuthors: Record<string, NewsAuthor> = {
  'financial-research-team': {
    id: 'financial-research-team',
    name: 'Financial Research Team',
    avatar: '/authors/research-team.jpg',
    jobTitle: 'Senior Financial Analysts',
    bio: 'Our financial research team consists of seasoned analysts with over 50 combined years of experience in Indian financial markets. We specialize in equity research, mutual fund analysis, and macroeconomic trends.',
    credentials: 'CFA, FRM, MBA Finance',
    expertise: ['Equity Markets', 'Mutual Funds', 'IPO Analysis', 'Technical Analysis', 'Fundamental Research'],
    education: 'IIM Ahmedabad, CFA Institute',
    yearsOfExperience: 15,
    socialLinks: {
      twitter: 'https://twitter.com/discvr_research',
      linkedin: 'https://linkedin.com/company/discvr'
    },
    awards: ['Best Financial Research Platform 2024', 'Excellence in Market Analysis'],
    articleCount: 234
  },
  'crypto-analyst': {
    id: 'crypto-analyst',
    name: 'Rahul Sharma',
    avatar: '/authors/crypto-analyst.jpg',
    jobTitle: 'Cryptocurrency Analyst',
    bio: 'Rahul Sharma is a cryptocurrency expert with 8 years of experience in blockchain technology and digital asset markets. He specializes in on-chain analysis, DeFi protocols, and regulatory developments in the crypto space.',
    credentials: 'Certified Blockchain Professional',
    expertise: ['Cryptocurrency', 'Blockchain Technology', 'DeFi', 'NFTs', 'Crypto Regulations'],
    education: 'IIT Delhi, Blockchain Council',
    yearsOfExperience: 8,
    socialLinks: {
      twitter: 'https://twitter.com/rahul_crypto',
      linkedin: 'https://linkedin.com/in/rahulsharma-crypto'
    },
    articleCount: 156
  },
  'ipo-specialist': {
    id: 'ipo-specialist',
    name: 'Priya Mehta',
    avatar: '/authors/ipo-specialist.jpg',
    jobTitle: 'IPO Research Specialist',
    bio: 'Priya Mehta has been analyzing IPOs and primary markets for over 12 years. She has successfully evaluated 200+ IPOs and provides in-depth analysis on listing performance, valuation metrics, and investment opportunities.',
    credentials: 'CFA, MBA (Finance)',
    expertise: ['IPO Analysis', 'Primary Markets', 'Valuation', 'Company Fundamentals', 'Listing Performance'],
    education: 'XLRI Jamshedpur, CFA Institute',
    yearsOfExperience: 12,
    socialLinks: {
      linkedin: 'https://linkedin.com/in/priyamehta-ipo'
    },
    awards: ['Top IPO Analyst 2023'],
    articleCount: 189
  }
};
