export interface MasterTrustSlide {
  id: number;
  type: 'cover' | 'executive' | 'opportunity' | 'horizons-overview' | 'horizon-1' | 'horizon-2' | 'horizon-3' | 'horizon-4' | 'parallel-execution' | 'pillars' | 'impact' | 'aum-trajectory' | 'competitive' | 'next-steps';
  title: string;
  subtitle?: string;
  content?: any;
}

export const masterTrustProposalSlides: MasterTrustSlide[] = [
  // Slide 1: Cover
  {
    id: 1,
    type: 'cover',
    title: 'AI-Powered Digital Transformation for Master Trust',
    subtitle: 'Driving Acquisition, Engagement & ARPU Growth Across Trading & Mutual Funds',
    content: {
      tagline: 'Transform from Transaction-Led Broker to AI-First Vertically Integrated AMC',
      date: 'January 2025',
      preparedFor: 'Puneet Singhania, CFA, Whole-time Director - Master Capital Services Limited',
      preparedBy: 'Shubham Srivastava, Discvr AI',
      metrics: [
        { value: '₹950+ Cr', label: 'Year 1 AUM Target' },
        { value: '₹7+ Cr', label: 'New Annual ARR' },
        { value: '30-40%', label: 'ARPU Expansion' },
        { value: '4.26L+', label: 'Existing Customers' }
      ]
    }
  },

  // Slide 2: Executive Summary (The Answer)
  {
    id: 2,
    type: 'executive',
    title: 'Strategic Recommendation',
    subtitle: 'The "Vertical Wealth" Pivot',
    content: {
      recommendation: 'With the new SEBI in-principle MF license, Master Trust should transform from a transaction-led broker to an AI-first vertically integrated AMC to capture ₹950+ Cr AUM in Year 1 (scaling to ₹5,000-10,000 Cr in 4-5 years), generate ₹7+ Cr in new ARR from Year 1, and expand ARPU by 30-40%.',
      imperatives: [
        {
          title: 'Defend Core Trading Revenue',
          description: 'Convert transactional relationships into daily engagement habits'
        },
        {
          title: 'Scale New MF Business',
          description: 'Leverage AI-powered distribution to cross-sell your own schemes to 4.26L+ trading customers'
        }
      ],
      levers: [
        { 
          priority: '1', 
          name: 'Brokerage Velocity', 
          impact: '15-20% trading frequency increase',
          rationale: 'Zero incremental CAC, immediate revenue',
          timeline: 'Months 1-12'
        },
        { 
          priority: '2', 
          name: 'MF Distribution', 
          impact: '₹950+ Cr AUM, ₹7+ Cr ARR',
          rationale: '2x margin via own AMC fees',
          timeline: 'Months 1-12'
        },
        { 
          priority: '3', 
          name: 'Organic Traffic Engine', 
          impact: '50-70% CAC reduction',
          rationale: 'Content-driven acquisition',
          timeline: 'Months 1-12'
        },
        { 
          priority: '4', 
          name: 'Adjacency Products', 
          impact: '₹25+ Cr lending book',
          rationale: 'Ecosystem monetization',
          timeline: 'Months 12-18'
        }
      ]
    }
  },

  // Slide 3: Four Revenue Levers Overview
  {
    id: 3,
    type: 'opportunity',
    title: 'Four Revenue Levers',
    subtitle: 'Prioritized by ROI & Speed-to-Value',
    content: {
      levers: [
        {
          priority: 'LEVER 1',
          name: 'Brokerage Velocity',
          description: 'Maximize ARPU from Existing 4.26L+ Users',
          points: [
            'AI nudges (earnings alerts, sector risks) → 15-20% higher trading frequency',
            'Zero incremental CAC - leveraging existing relationships',
            'Fastest ROI - immediate brokerage revenue impact'
          ],
          timeline: 'Months 1-12',
          color: 'blue'
        },
        {
          priority: 'LEVER 2',
          name: 'MF Lead Distribution',
          description: 'Dual Strategy: All MFs + Own Schemes',
          points: [
            'Strategy A: Commission (0.5-0.75% AUM) from third-party MF distribution',
            'Strategy B: Migrate 15% of base into own schemes → ₹950+ Cr AUM',
            '2x margin expansion: AMC fees (1-1.5%) vs distribution (0.5-0.75%)'
          ],
          timeline: 'Months 1-12',
          color: 'emerald'
        },
        {
          priority: 'LEVER 3',
          name: 'Organic Traffic Engine',
          description: 'Content-Driven Acquisition at Scale',
          points: [
            'AI chatbot + discvr.ai news + YouTube academy + blog content',
            '40-50% higher organic traffic, 50-70% CAC reduction',
            '20-30% of new users from organic discovery'
          ],
          timeline: 'Months 1-12',
          color: 'amber'
        },
        {
          priority: 'LEVER 4',
          name: 'Ecosystem Expansion',
          description: 'Adjacency Products & Wallet Share',
          points: [
            'LAMF/LAS: ₹25+ Cr lending book → ₹25-75L annual revenue',
            'Family Wealth Platform: 2-3x AUM per household',
            'Enable after core levers (1,2,3) are firing'
          ],
          timeline: 'Months 12-18',
          color: 'purple'
        }
      ]
    }
  },

  // Slide 4: Parallel Execution Framework
  {
    id: 4,
    type: 'parallel-execution',
    title: 'Parallel Execution Framework',
    subtitle: 'All Core Levers Fire in 6-12 Months',
    content: {
      principle: 'Enable Lever 1, Lever 2, and Lever 3 in parallel so all core revenue streams start firing within initial 6-12 months, creating compound growth effects.',
      timeline: [
        {
          phase: 'Months 1-3',
          title: 'Foundation + All Levers Start',
          items: [
            'Platform assessment & optimization',
            'AI stock research chatbot & portfolio alerts (Lever 1)',
            'Start third-party MF distribution (Lever 2A)',
            'Launch content engine & discvr.ai integration (Lever 3)'
          ]
        },
        {
          phase: 'Months 4-6',
          title: 'All Three Levers Active',
          items: [
            'Brokerage velocity improvements compound',
            'MF distribution active, own schemes preparation',
            'Content engine scales (daily news, articles, YouTube)',
            'Cross-lever synergies emerge'
          ]
        },
        {
          phase: 'Months 7-12',
          title: 'Full Scale - All Core Levers Firing',
          items: [
            'Trading frequency improvements compound',
            'Launch own MF schemes with AI distribution',
            'Organic traffic engine matures, CAC compounds',
            'Flywheel: Organic → Trading → MF conversion'
          ]
        },
        {
          phase: 'Months 12-18',
          title: 'Lever 4: Ecosystem Expansion',
          items: [
            'LAMF/LAS products activated',
            'Family Wealth Platform launch',
            'Premium research subscriptions',
            '40%+ total ARPU expansion achieved'
          ]
        }
      ],
      benefits: [
        'Faster time-to-market: All revenue streams start earlier',
        'Compound growth: Three streams grow simultaneously',
        'Lower overall risk: Multiple revenue streams reduce dependency'
      ]
    }
  },

  // Slide 5: Horizon 1 - Brokerage Velocity
  {
    id: 5,
    type: 'horizon-1',
    title: 'Lever 1: Brokerage Velocity',
    subtitle: 'Months 1-12 | Maximize ARPU from Existing Users',
    content: {
      objective: 'Activate existing 4.26L+ customers to increase trading frequency and brokerage revenue with zero incremental CAC',
      enablers: [
        { 
          name: 'AI Stock Research Chatbot', 
          description: 'Answers queries, explains market movements, SEO-optimized content'
        },
        { 
          name: 'Portfolio Intelligence Alerts', 
          description: 'Real-time earnings, price movements, sector risks drive decisions'
        },
        { 
          name: 'Daily Trading Brief', 
          description: 'Personalized 2-minute digest creates daily return habit'
        },
        { 
          name: 'Latest News Integration', 
          description: 'Byte-sized market news via discvr.ai drives daily engagement'
        },
        { 
          name: 'Conversational Onboarding', 
          description: 'AI-guided KYC recovery → 30% reduction in drop-offs'
        }
      ],
      outcomes: [
        '15-20% increase in trading frequency via AI nudges',
        '20% increase in app sessions via Portfolio Intelligence',
        '30% reduction in KYC drop-offs via AI agents',
        'Foundation for MF cross-sell (Lever 2)'
      ],
      impact: 'If average customer trades 10x/year, 15-20% increase = 1.5-2 additional trades × 4.26L customers = significant incremental brokerage revenue with zero acquisition cost'
    }
  },

  // Slide 6: Horizon 2 - MF Distribution
  {
    id: 6,
    type: 'horizon-2',
    title: 'Lever 2: MF Lead Distribution',
    subtitle: 'Months 1-12 | Dual Strategy for MF Revenue',
    content: {
      objective: 'Build MF revenue stream through distribution of all MFs + launch own schemes with 2x margin expansion',
      strategies: [
        {
          name: 'Strategy A: All MF Distribution',
          type: 'Quick Revenue',
          points: [
            'AI-powered recommendations for all MF schemes',
            'Commission revenue (~0.5-0.75% AUM)',
            'Builds MF investing habit in customer base'
          ]
        },
        {
          name: 'Strategy B: Own MF Schemes',
          type: 'Strategic Long-term',
          points: [
            'Enterprise-grade AMC distribution platform',
            'AI recommendations convert traders to your MF schemes',
            'NFO launch with 100% automated distribution'
          ]
        }
      ],
      outcomes: [
        '₹950+ Cr captive AUM (Year 1)',
        '₹7+ Cr ARR from management fees',
        '2x margin: Own schemes vs distribution',
        '+15% ARPU from MF conversion'
      ],
      marginExplanation: 'AMC management fees (1-1.5% AUM) vs third-party distribution (0.5-0.75% commission) = 2x margin expansion'
    }
  },

  // Slide 7: Horizon 3 - Organic Traffic Engine
  {
    id: 7,
    type: 'horizon-3',
    title: 'Lever 3: Organic Traffic Engine',
    subtitle: 'Months 1-12 | Content-Driven Acquisition at Scale',
    content: {
      objective: 'Build organic traffic through high-volume content across multiple mediums for sustainable, low-CAC acquisition',
      channels: [
        {
          name: 'AI Research Chatbot',
          description: 'SEO-optimized answers to trading/MF queries',
          volume: 'Continuous (indexed by Google)',
          impact: '40-50% higher organic traffic'
        },
        {
          name: 'discvr.ai News Integration',
          description: 'Daily byte-sized market news & updates',
          volume: 'Daily updates',
          impact: '20-30% new users from organic'
        },
        {
          name: 'YouTube Investor Academy',
          description: 'Educational content: "How to start trading", "MF basics"',
          volume: '2-3 videos/week',
          impact: '10-15% new users from YouTube'
        },
        {
          name: 'Blog/Article Content',
          description: 'AI-generated market trends, investment strategies',
          volume: '5-10 articles/week',
          impact: '50-70% CAC reduction vs paid'
        }
      ],
      newUserTargets: {
        year1: '50,000-75,000 new users (12-18% growth)',
        year23: '1,00,000-1,50,000 new users/year',
        year45: '2,00,000+ new users/year'
      }
    }
  },

  // Slide 8: Horizon 4 - Ecosystem Expansion
  {
    id: 8,
    type: 'horizon-4',
    title: 'Lever 4: Ecosystem Expansion',
    subtitle: 'Months 12-18 | Adjacency Products & Wallet Share',
    content: {
      objective: 'Expand wallet share through adjacency products and create ecosystem stickiness after core levers are firing',
      products: [
        {
          name: 'Credit Monetization (LAMF/LAS)',
          description: 'AI-driven identification of eligible borrowers',
          impact: '₹25+ Cr lending book → ₹25-75L annual revenue',
          model: '1-3% margin from NBFC partner'
        },
        {
          name: 'Family Wealth Platform',
          description: 'Household-level dashboard (parents + children)',
          impact: '2-3x increase in AUM per customer',
          model: 'Multi-account aggregation'
        },
        {
          name: 'CIBIL-Powered Personalization',
          description: 'Right product at right time based on financial health',
          impact: 'Higher conversion through personalized recommendations',
          model: 'Credit score insights drive matching'
        },
        {
          name: 'Premium Research',
          description: 'AI Research subscription for HNI-level insights',
          impact: '+10% ARPU from premium tier',
          model: 'Subscription-based recurring revenue'
        }
      ],
      totalImpact: 'Base ARPU → +15% (Velocity) → +15% (MF) → +10% (Premium) = 40%+ ARPU increase'
    }
  },

  // Slide 9: AUM Growth Trajectory
  {
    id: 9,
    type: 'aum-trajectory',
    title: 'AUM Growth Trajectory',
    subtitle: 'Scaling to ₹5,000-10,000 Cr in 4-5 Years',
    content: {
      trajectory: [
        {
          period: 'Year 1',
          aum: '₹950 Cr',
          description: '15% of existing 4.26L base migrates',
          calculation: 'Avg ₹1.5L AUM/user × 63K users',
          highlight: true
        },
        {
          period: 'Year 2-3',
          aum: '₹3,000-5,000 Cr',
          description: 'Expanded base + new acquisitions via organic',
          calculation: 'AI distribution + content engine scaling'
        },
        {
          period: 'Year 4-5',
          aum: '₹5,000-10,000 Cr',
          description: 'Established AMC scale',
          calculation: 'Multiple schemes, NFOs, institutional investors'
        }
      ],
      comparison: {
        benchmark: 'Zerodha AMC achieved ₹10,000 Cr AUM in 2 years',
        advantage: 'Master Trust has 4.26L+ existing trading customers for cross-sell'
      },
      revenue: [
        { label: 'Year 1 ARR', value: '₹7+ Cr', calculation: '₹950 Cr × 0.75% net management fee' },
        { label: 'Year 4-5 ARR', value: '₹37-75 Cr', calculation: '₹5K-10K Cr × 0.75% net management fee' }
      ]
    }
  },

  // Slide 10: Strategic Pillars
  {
    id: 10,
    type: 'pillars',
    title: 'Strategic Pillars',
    subtitle: 'How We Create Value',
    content: {
      pillars: [
        {
          name: 'Hyper-Personalized Engagement',
          objective: 'Transform transactional relationships into daily engagement habits',
          enablers: [
            'AI Stock Research Chatbot',
            'Portfolio Intelligence Alerts',
            'Daily Trading Brief',
            'Latest News Integration (discvr.ai)',
            'Conversational Trading',
            'OpenAI App Distribution'
          ],
          value: 'Higher trading frequency → Increased brokerage revenue'
        },
        {
          name: 'Vertical Integration (AMC Launch)',
          objective: 'Enable launch of your own MF business with AI-powered distribution',
          enablers: [
            'End-to-end AMC distribution platform',
            'AI-powered fund recommendations',
            'Conversational onboarding (KYC → Investment)',
            'Transaction execution (SIP, lumpsum)',
            'Business intelligence & attribution',
            'NFO launch support (AI campaign agent)'
          ],
          value: '2x margin expansion + Cross-sell to 4.26L+ customers'
        },
        {
          name: 'Ecosystem Monetization',
          objective: 'Build daily habits and unlock new revenue streams',
          enablers: [
            'Family Wealth Monitor (household dashboard)',
            'CIBIL Integration (financial health)',
            'Adjacency Products (LAMF, LAS)',
            'Gamification (streaks, health scores)',
            'AI Service Bot (70-80% deflection)'
          ],
          value: 'Loan commission + 2-3x AUM per household + Reduced support costs'
        }
      ]
    }
  },

  // Slide 11: Competitive Positioning
  {
    id: 11,
    type: 'competitive',
    title: 'Competitive Positioning',
    subtitle: 'Why Not Generic Marketing Platforms?',
    content: {
      generic: {
        title: 'CleverTap, MoEngage',
        capabilities: ['Send push notifications, emails, SMS'],
        limitations: [
          'Cannot provide financial advice',
          'Cannot execute transactions',
          'No regulatory compliance',
          'No domain knowledge (stocks, MF)'
        ]
      },
      ourPlatform: {
        title: 'Discvr AI Platform',
        capabilities: [
          'Complete financial advisory (stocks + MF recommendations)',
          'End-to-end transaction execution (KYC → Investment → Portfolio)',
          'Built-in SEBI compliance (suitability checks, disclosures)',
          'Domain-specific AI (RAG for financial products)',
          'Business outcome tracking (AUM, conversions, ARPU)',
          'OpenAI App Distribution for broader reach'
        ]
      },
      recommendation: 'Use our platform for financial advisory + transaction execution, integrate with CleverTap for generic marketing campaigns.'
    }
  },

  // Slide 12: Expected Business Impact
  {
    id: 12,
    type: 'impact',
    title: 'Expected Business Impact',
    subtitle: 'Revenue Bridge & Unit Economics',
    content: {
      bridge: [
        { stage: 'Current State', description: 'Transaction-Led Broker', impact: '' },
        { stage: 'Lever 1', description: '15-20% trading frequency increase', impact: 'Zero incremental CAC' },
        { stage: 'Lever 2', description: '₹950+ Cr AUM → ₹7+ Cr ARR', impact: '2x margin expansion' },
        { stage: 'Lever 3', description: '40-50% higher organic traffic', impact: '50-70% CAC reduction' },
        { stage: 'Lever 4', description: '₹25+ Cr lending book', impact: '₹25-75L annual revenue' },
        { stage: 'Target State', description: 'AI-First Integrated AMC', impact: '40%+ ARPU expansion' }
      ],
      unitEconomics: [
        { metric: 'LTV/CAC Ratio', current: '2-3x (Trading-only)', target: '4-5x (Trading + MF)', driver: 'Cross-sell increases LTV' },
        { metric: 'MF Margin', current: '0.5-0.75% (Distribution)', target: '1-1.5% (AMC)', driver: 'Vertical integration' },
        { metric: 'AUM per Customer', current: '₹2-3L (Single)', target: '₹8-12L (Household)', driver: 'Family Wealth Platform' },
        { metric: 'CAC', current: 'High (Physical + Digital)', target: '50-70% reduction', driver: 'Content-driven acquisition' }
      ]
    }
  },

  // Slide 13: Next Steps
  {
    id: 13,
    type: 'next-steps',
    title: 'Recommended Next Steps',
    subtitle: 'Path to Implementation',
    content: {
      phases: [
        {
          name: 'Phase 1: Strategic Alignment',
          timeline: 'Week 1-2',
          items: [
            'Review and prioritize interventions',
            'Select initial focus areas',
            'Define success metrics'
          ]
        },
        {
          name: 'Phase 2: Detailed Planning',
          timeline: 'Week 3-4',
          items: [
            'Execution plan with costs & resources',
            'Technical integration requirements',
            'Risk mitigation & compliance framework'
          ]
        },
        {
          name: 'Phase 3: Technical Kickoff',
          timeline: 'Month 2',
          items: [
            'Portfolio Sync: Connect to Agnik/MasterSwift',
            'KYC API: Plug into onboarding flow',
            'Content Feed: Connect discvr.ai news',
            'CIBIL Bridge: Enable credit-score pull'
          ]
        }
      ],
      horizonTimeline: [
        { horizon: 'Lever 1-3 (Months 1-12)', outcome: 'All core levers firing in parallel' },
        { horizon: 'Lever 4 (Months 12-18)', outcome: '₹25+ Cr lending, 40%+ ARPU expansion' }
      ],
      guardrails: [
        'Suitability Checks: AI matches recommendations to user risk profile',
        'No "Buy/Sell" Calls: Research-backed data, not direct investment advice',
        'SEBI Compliance: Built-in guardrails, audit trails, disclosures',
        'Success KPI Scorecard: Daily CEO dashboard (AUM, conversions, ARPU, CAC)'
      ],
      cta: 'We\'re ready to transform Master Trust into India\'s AI-first vertically integrated AMC.',
      contact: {
        name: 'Shubham Srivastava',
        company: 'Discvr AI',
        email: 'shubham@discvr.ai'
      }
    }
  }
];
