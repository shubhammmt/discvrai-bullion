export interface MasterTrustSlide {
  id: number;
  type: 'cover' | 'executive' | 'opportunity' | 'horizons-overview' | 'horizon-1' | 'horizon-2' | 'horizon-3' | 'pillars' | 'impact' | 'next-steps';
  title: string;
  subtitle?: string;
  content?: any;
}

export const masterTrustProposalSlides: MasterTrustSlide[] = [
  // Slide 1: Cover
  {
    id: 1,
    type: 'cover',
    title: 'Master Trust',
    subtitle: 'AI-Powered Digital Transformation',
    content: {
      tagline: 'Driving Acquisition, Engagement & ARPU Growth Across Trading & Mutual Funds',
      date: 'January 2025',
      preparedFor: 'Puneet Singhania, CEO',
      preparedBy: 'Discvr AI'
    }
  },

  // Slide 2: Executive Summary (The Answer)
  {
    id: 2,
    type: 'executive',
    title: 'The Strategic Recommendation',
    subtitle: 'Transform from Transaction-Led Broker to AI-First Vertically Integrated AMC',
    content: {
      recommendation: 'With the new SEBI in-principle MF license, Master Trust should pivot to capture ₹950+ Cr in captive AUM, generate ₹7+ Cr in new ARR, and expand ARPU by 30-40% through product density.',
      imperatives: [
        {
          title: 'Defend Core Trading',
          description: 'Convert transactional relationships into daily engagement habits'
        },
        {
          title: 'Scale MF Business',
          description: 'Leverage AI-powered distribution to cross-sell your own schemes to 4.26L+ trading customers'
        }
      ],
      levers: [
        { 
          priority: '1', 
          name: 'Brokerage Velocity', 
          impact: '15-20% increase in trading frequency',
          rationale: 'Zero incremental CAC, immediate revenue impact'
        },
        { 
          priority: '2', 
          name: 'MF Distribution', 
          impact: '₹950+ Cr AUM, ₹7+ Cr ARR',
          rationale: '2x margin expansion via own AMC management fees'
        },
        { 
          priority: '3', 
          name: 'Adjacency Products', 
          impact: '₹25+ Cr lending book',
          rationale: 'Expand wallet share through LAMF/LAS'
        }
      ]
    }
  },

  // Slide 3: The Opportunity (Revenue Levers Detail)
  {
    id: 3,
    type: 'opportunity',
    title: 'Three Revenue Levers',
    subtitle: 'Prioritized by ROI & Speed-to-Value',
    content: {
      levers: [
        {
          priority: 'HIGHEST PRIORITY',
          name: 'Brokerage Velocity',
          description: 'Maximize ARPU from Existing Users',
          points: [
            'AI "Nudges" (earnings alerts, sector risks, portfolio intelligence) increase trading frequency by 15-20%',
            'Zero incremental CAC - leveraging existing 4.26L+ customer relationships',
            'If average customer trades 10x/year, 15-20% increase = 1.5-2 additional trades per customer'
          ],
          timeline: 'Months 1-6',
          color: 'blue'
        },
        {
          priority: 'SECOND PRIORITY',
          name: 'MF Lead Distribution',
          description: 'Dual Strategy: Distribution + Own Schemes',
          points: [
            'Strategy A: Commission-based revenue (~0.5-0.75% AUM) from third-party MF distribution',
            'Strategy B: Migrate 15% of trading base into internal MF schemes → ₹950+ Cr captive AUM',
            '2x margin expansion: AMC management fees (1-1.5%) vs distribution commission (0.5-0.75%)'
          ],
          timeline: 'Months 7-12',
          color: 'emerald'
        },
        {
          priority: 'THIRD PRIORITY',
          name: 'Adjacency Expansion',
          description: 'Credit Monetization & Family Wealth',
          points: [
            'LAMF/LAS: AI-driven identification of eligible borrowers via NBFC partnership',
            '5% penetration in base → ₹25+ Cr lending book → ₹25-75L annual revenue',
            'Family Wealth Platform increases AUM per household by 2-3x'
          ],
          timeline: 'Months 13-18',
          color: 'purple'
        }
      ]
    }
  },

  // Slide 4: Three-Horizon Framework Overview
  {
    id: 4,
    type: 'horizons-overview',
    title: 'Three-Horizon Growth Framework',
    subtitle: '18-Month Transformation Roadmap',
    content: {
      horizons: [
        {
          name: 'Horizon 1',
          title: 'Defend & Extend Core',
          timeline: 'Months 1-6',
          focus: 'Brokerage Velocity',
          outcome: '15-20% increase in trading frequency',
          color: 'blue'
        },
        {
          name: 'Horizon 2',
          title: 'Scale MF Business',
          timeline: 'Months 7-12',
          focus: 'MF Distribution + AMC Launch',
          outcome: '₹950+ Cr AUM, ₹7+ Cr ARR',
          color: 'emerald'
        },
        {
          name: 'Horizon 3',
          title: 'Ecosystem Expansion',
          timeline: 'Months 13-18',
          focus: 'Adjacency Products',
          outcome: '30-40% ARPU expansion',
          color: 'purple'
        }
      ],
      unitEconomics: [
        { metric: 'LTV/CAC Ratio', current: '2-3x', target: '4-5x', driver: 'Cross-sell increases lifetime value' },
        { metric: 'MF Margin', current: '0.5-0.75%', target: '1-1.5%', driver: 'Vertical integration (2x expansion)' },
        { metric: 'AUM per Customer', current: '₹2-3L', target: '₹8-12L', driver: 'Family Wealth aggregation' }
      ]
    }
  },

  // Slide 5: Horizon 1 Detail
  {
    id: 5,
    type: 'horizon-1',
    title: 'Horizon 1: Brokerage Velocity',
    subtitle: 'Months 1-6 | Maximize ARPU from Existing Users',
    content: {
      objective: 'Activate existing 4.26L+ customers to increase trading frequency and brokerage revenue',
      enablers: [
        { 
          name: 'Hyper-Personalized Engagement', 
          description: 'AI-powered research chatbot and portfolio alerts transform transactional relationships into daily habits'
        },
        { 
          name: 'Portfolio Intelligence', 
          description: 'Real-time earnings alerts, price movements, sector risks drive trading decisions'
        },
        { 
          name: 'Daily Trading Brief', 
          description: 'Personalized 2-minute digest creates daily return habit'
        },
        { 
          name: 'Conversational Trading', 
          description: 'Lower friction order placement via chatbot'
        },
        { 
          name: 'Conversational Onboarding', 
          description: 'Reduce 30-40% drop-off through AI-guided KYC recovery'
        }
      ],
      outcomes: [
        '15-20% increase in trading frequency via AI nudges',
        '20% increase in app sessions via Portfolio Intelligence',
        '30% reduction in KYC drop-offs via AI agents',
        'Foundation established for MF cross-sell in Horizon 2'
      ],
      impact: 'If average customer trades 10x/year, 15-20% increase = 1.5-2 additional trades × 4.26L customers = significant incremental brokerage revenue with zero acquisition cost'
    }
  },

  // Slide 6: Horizon 2 Detail
  {
    id: 6,
    type: 'horizon-2',
    title: 'Horizon 2: MF Lead Distribution',
    subtitle: 'Months 7-12 | Dual Strategy for MF Revenue',
    content: {
      objective: 'Build MF revenue stream through distribution of all MFs + launch own schemes',
      strategies: [
        {
          name: 'Strategy A: All MF Distribution',
          type: 'Quick Revenue',
          points: [
            'AI-powered recommendations for all MF schemes (not just own)',
            'Commission-based revenue (~0.5-0.75% AUM) from third-party MF distribution',
            'Builds MF investing habit in customer base, making cross-sell easier'
          ]
        },
        {
          name: 'Strategy B: Own MF Schemes',
          type: 'Strategic Long-term',
          points: [
            'Deploy enterprise-grade AMC distribution platform',
            'AI-powered recommendations convert trading customers to your MF schemes → 15% migration target',
            'NFO launch support via AI-powered campaign agent → 100% automated distribution'
          ]
        }
      ],
      outcomes: [
        '₹950+ Cr captive AUM from own schemes',
        '₹7+ Cr ARR from management fees (0.75% net)',
        '2x margin expansion: Own schemes vs distribution commission',
        '+15% ARPU from MF conversion'
      ],
      marginExplanation: 'AMC management fees (1-1.5% AUM) vs distributing third-party MFs (0.5-0.75% commission) = 2x margin expansion'
    }
  },

  // Slide 7: Horizon 3 Detail
  {
    id: 7,
    type: 'horizon-3',
    title: 'Horizon 3: Ecosystem Expansion',
    subtitle: 'Months 13-18 | Adjacency Products & Wallet Share',
    content: {
      objective: 'Expand wallet share through adjacency products and create ecosystem stickiness',
      products: [
        {
          name: 'Credit Monetization (LAMF/LAS)',
          description: 'AI-driven identification of eligible borrowers',
          impact: '5% penetration → ₹25+ Cr lending book → ₹25-75L annual revenue',
          model: 'Master Trust earns 1-3% margin from NBFC partner'
        },
        {
          name: 'Family Wealth Platform',
          description: 'Household-level engagement via multi-account aggregation',
          impact: '2-3x increase in AUM per customer',
          model: 'Parents + children portfolios under single view'
        },
        {
          name: 'CIBIL-Powered Personalization',
          description: 'Right product at right time based on financial health',
          impact: 'Higher conversion through personalized recommendations',
          model: 'Credit score insights drive product matching'
        },
        {
          name: 'Premium Research',
          description: 'AI Research subscription for HNI-level insights',
          impact: '+10% ARPU from premium tier',
          model: 'Subscription-based recurring revenue'
        }
      ],
      totalImpact: 'Base ARPU → +15% (Brokerage Velocity) → +15% (MF) → +10% (Premium) = 40%+ ARPU increase'
    }
  },

  // Slide 8: Strategic Pillars
  {
    id: 8,
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
            'Portfolio Intelligence Alerts (real-time earnings, price movements)',
            'Daily Trading Brief (personalized 2-min digest)',
            'Latest News Integration (byte-sized market news)',
            'Conversational Trading (place orders via chatbot)',
            'OpenAI App Distribution for broader reach'
          ],
          value: 'Higher trading frequency → Increased brokerage revenue'
        },
        {
          name: 'Vertical Integration (AMC Launch)',
          objective: 'Enable launch of your own MF business with AI-powered distribution from Day 1',
          enablers: [
            'End-to-end AMC distribution platform',
            'AI-powered fund recommendations (goal-based, risk-profiled)',
            'Conversational onboarding (KYC → Investment → Portfolio)',
            'Transaction execution (SIP, lumpsum)',
            'Business intelligence (AUM, conversion, attribution)',
            'NFO launch support (AI-powered campaign agent)'
          ],
          value: '2x margin expansion + Cross-sell to 4.26L+ trading customers'
        },
        {
          name: 'Ecosystem Monetization',
          objective: 'Build daily engagement habits and unlock new revenue streams',
          enablers: [
            'Family Wealth Monitor (household dashboard)',
            'CIBIL Integration (financial health insights)',
            'Adjacency Products (LAMF, LAS)',
            'Gamification (trading streaks, portfolio health)',
            'AI Service Bot (24/7 support, 70-80% deflection)'
          ],
          value: 'Loan commission income + 2-3x AUM per household + Reduced support costs'
        }
      ]
    }
  },

  // Slide 9: Expected Business Impact
  {
    id: 9,
    type: 'impact',
    title: 'Expected Business Impact',
    subtitle: 'Revenue Bridge & Unit Economics',
    content: {
      bridge: [
        { stage: 'Current State', description: 'Transaction-Led Broker', impact: '' },
        { stage: 'Brokerage Velocity', description: '15-20% increase in trading frequency via AI nudges', impact: 'Zero incremental CAC' },
        { stage: 'MF Distribution', description: 'Distribution of all MFs (0.5-0.75% commission)', impact: 'Quick revenue' },
        { stage: 'MF Management', description: '₹950+ Cr AUM × 0.75% = ₹7+ Cr ARR', impact: '2x margin expansion' },
        { stage: 'Loan Commission', description: '₹25+ Cr lending book → ₹25-75L annual', impact: '1-3% NBFC margin' },
        { stage: 'Premium Subscriptions', description: 'AI research subscription', impact: '+10% ARPU' },
        { stage: 'Target State', description: 'AI-First Vertically Integrated AMC', impact: '40%+ ARPU expansion' }
      ],
      unitEconomics: [
        { metric: 'LTV/CAC Ratio', current: '~2-3x (Trading-only)', target: '4-5x (Hybrid: Trading + MF)', driver: 'Cross-sell increases lifetime value' },
        { metric: 'MF Margin', current: '0.5-0.75% (Distribution)', target: '1-1.5% (AMC Management)', driver: 'Vertical integration (2x expansion)' },
        { metric: 'AUM per Customer', current: '₹2-3L (Single user)', target: '₹8-12L (Household)', driver: 'Family Wealth Monitor aggregates accounts' },
        { metric: 'Support Cost', current: 'Baseline', target: '70-80% deflection', driver: 'AI Service Bot handles majority queries' }
      ],
      competitive: {
        generic: ['Send push notifications, emails, SMS', 'Cannot provide financial advice', 'Cannot execute transactions', 'No regulatory compliance'],
        ourPlatform: ['Complete financial advisory (stocks + MF)', 'End-to-end transaction execution', 'Built-in SEBI compliance', 'Domain-specific AI (RAG for financial products)', 'OpenAI App Distribution']
      }
    }
  },

  // Slide 10: Next Steps
  {
    id: 10,
    type: 'next-steps',
    title: 'Recommended Next Steps',
    subtitle: 'Path to Implementation',
    content: {
      phases: [
        {
          name: 'Phase 1: Strategic Alignment',
          timeline: 'Week 1-2',
          items: [
            'Review and prioritize interventions based on business objectives',
            'Select initial focus (Horizon 1: Trading, Horizon 2: MF Launch, or Balanced)',
            'Define success metrics and measurement framework'
          ]
        },
        {
          name: 'Phase 2: Detailed Planning',
          timeline: 'Week 3-4',
          items: [
            'Detailed execution plan with timeline, costs, resource requirements',
            'Technical integration requirements and dependencies',
            'Risk mitigation and compliance framework'
          ]
        },
        {
          name: 'Phase 3: Technical Kickoff',
          timeline: 'Month 2',
          items: [
            'Read-Only Portfolio Sync: Connect AI to back-office (Agnik/MasterSwift)',
            'KYC API Integration: Plug AI Agent into onboarding flow',
            'Content Feed: Connect discvr.ai news engine for Daily Brief',
            'CIBIL Bridge: Enable credit-score pull for LAMF/LAS products'
          ]
        }
      ],
      horizonTimeline: [
        { horizon: 'Horizon 1 (Months 1-6)', outcome: '30% reduction in KYC drop-offs, 15-20% trading frequency increase' },
        { horizon: 'Horizon 2 (Months 7-12)', outcome: '100% automated MF distribution, ₹950+ Cr AUM target' },
        { horizon: 'Horizon 3 (Months 13-18)', outcome: '₹25+ Cr lending book, 30-40% ARPU expansion' }
      ],
      guardrails: [
        'Suitability Checks: AI ensures MF recommendations match user risk profile',
        'No "Buy/Sell" Calls: Agent provides research-backed data, not direct investment advice',
        'SEBI Compliance: Built-in regulatory guardrails, audit trails, disclosure management',
        'Success KPI Scorecard: Daily dashboard for CEO tracking (AUM, conversions, ARPU, CAC)'
      ],
      cta: 'We\'re ready to transform Master Trust into India\'s AI-first vertically integrated AMC.'
    }
  }
];
