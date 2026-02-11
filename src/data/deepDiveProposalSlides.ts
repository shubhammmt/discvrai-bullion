export type DeepDiveSlideType = 
  | 'cover'
  | 'architecture-flow'
  | 'context-intelligence'
  | 'timing-prediction'
  | 'multi-signal-fusion'
  | 'learning-optimization'
  | 'personalization-architecture'
  | 'progressive-profiling'
  | 'dynamic-segmentation'
  | 'multi-factor-scoring'
  | 'predictive-models'
  | 'distributor-architecture'
  | 'ai-research-assistant'
  | 'predictive-analytics'
  | 'cross-sell-opportunity'
  | 'automated-communication'
  | 'synergy-architecture';

export interface DeepDiveSlide {
  id: number;
  type: DeepDiveSlideType;
  section: 'cover' | 'nudges' | 'personalization' | 'distributor' | 'summary';
  title: string;
  subtitle?: string;
  content?: any;
}

export const deepDiveSlides: DeepDiveSlide[] = [
  // COVER
  {
    id: 1,
    type: 'cover',
    section: 'cover',
    title: 'Deep Dive: How It Works',
    subtitle: 'Technical Architecture & Examples',
    content: {
      sections: [
        { number: '01', title: 'AI Nudges System', slides: 'Slides 2-6' },
        { number: '02', title: 'Personalization Engine', slides: 'Slides 7-11' },
        { number: '03', title: 'Distributor Tech Enablement', slides: 'Slides 12-16' },
        { number: '04', title: 'Integration & Compound Effects', slides: 'Slide 17' },
      ],
      founder: 'Shubham Srivastava',
      founderTitle: 'Founder & CEO',
      brand: 'DiscvrAI',
    }
  },

  // DEEP DIVE 1: AI NUDGES
  {
    id: 2,
    type: 'architecture-flow',
    section: 'nudges',
    title: 'AI Nudges System Architecture',
    subtitle: 'The Complete System Flow',
    content: {
      layers: [
        {
          name: 'Data Collection Layer',
          color: 'blue',
          columns: [
            { label: 'Portfolio Data', items: ['Holdings', 'Entry prices', 'P&L', 'Goals'] },
            { label: 'Market Data', items: ['Prices', 'Volumes', 'News', 'Events'] },
            { label: 'Behavioral Data', items: ['Login times', 'Click paths', 'Engagement', 'Preferences'] },
            { label: 'Temporal Data', items: ['Day/Time', 'Calendar', 'Events', 'Holidays'] },
          ]
        },
        {
          name: 'Intelligence Layer',
          color: 'purple',
          columns: [
            { label: 'Context Engine', items: ['Portfolio analysis', 'Risk calc', 'Opportunity detection'] },
            { label: 'Intent Engine', items: ['User intent prediction', 'Behavior patterns'] },
            { label: 'Timing Engine', items: ['Optimal timing prediction', 'Active windows'] },
            { label: 'Message Engine', items: ['Tone/style', 'Channel selection', 'Length optimization'] },
          ]
        },
        {
          name: 'Decision Layer',
          color: 'amber',
          columns: [
            { label: 'Nudge Scoring', items: ['Relevance', 'Urgency', 'Probability'] },
            { label: 'Priority Ranking', items: ['Business value', 'User value', 'Timing fit'] },
            { label: 'A/B Testing', items: ['Variants', 'Testing', 'Selection'] },
            { label: 'Learning Loop', items: ['Performance tracking', 'Optimization'] },
          ]
        },
        {
          name: 'Execution Layer',
          color: 'emerald',
          columns: [
            { label: 'Channel Selection', items: ['WhatsApp', 'Push', 'Email', 'In-app'] },
            { label: 'Message Delivery', items: ['Real-time', 'Batch', 'Scheduled'] },
            { label: 'Response Tracking', items: ['Open rates', 'Click rates', 'Conversion', 'Revenue'] },
          ]
        },
      ]
    }
  },
  {
    id: 3,
    type: 'context-intelligence',
    section: 'nudges',
    title: 'Context-Aware Intelligence',
    subtitle: 'How It Works — Step-by-Step Process',
    content: {
      example: 'Earnings Season Nudge',
      steps: [
        {
          step: 1,
          title: 'Data Collection',
          details: [
            'User portfolio: Reliance (₹2L), TCS (₹1.5L), Infosys (₹1L)',
            'Market data: Reliance earnings in 2 days, TCS in 5, Infosys in 7',
            'Behavioral: User typically trades during earnings season',
            'Temporal: Current time 2 PM (user\'s active window)',
          ]
        },
        {
          step: 2,
          title: 'Context Analysis',
          details: [
            'Total exposure: ₹4.5L across 3 earnings stocks',
            'Unrealized gain: +8% avg',
            'Historical earnings volatility: 12% avg post-earnings',
            'Concentration risk: 60% in earnings stocks',
            'Trading intent probability: 75%',
          ]
        },
        {
          step: 3,
          title: 'Message Generation',
          message: '"Earnings week ahead! Your holdings worth ₹4.5L announce results starting in 2 days. Historical pattern shows 12% volatility. You\'re currently up 8%. Want to see analyst consensus and set price alerts?"',
          channel: 'WhatsApp',
          timing: '2:00 PM',
          cta: ['View Analyst Reports', 'Set Price Alerts'],
        },
        {
          step: 4,
          title: 'Outcome Tracking',
          metrics: [
            { label: 'Opened', value: '2:05 PM (5 min)' },
            { label: 'Clicked', value: 'Viewed analyst reports' },
            { label: 'Action', value: '₹50K trade on Reliance' },
            { label: 'Revenue', value: '₹500 brokerage' },
          ]
        },
      ]
    }
  },
  {
    id: 4,
    type: 'timing-prediction',
    section: 'nudges',
    title: 'Intent-Driven Timing',
    subtitle: 'Timing Prediction Model',
    content: {
      dataSources: [
        { category: 'Historical Activity', items: ['Login: 9:30 AM (30%), 1:45 PM (40%), 3 PM (20%)', 'Trading peak: 1:45 PM – 2:15 PM', 'Avg response: 5 min during active window'] },
        { category: 'Real-Time Signals', items: ['Current app session: Active/Inactive', 'Recent activity: Last action 15 min ago', 'Device: Mobile app open'] },
        { category: 'Contextual Factors', items: ['Day: Tuesday (typically more active)', 'Market hours: Trading session active', 'News: Earnings announcements today'] },
      ],
      comparison: {
        traditional: { sendTime: '9:30 AM (market open) to all', openRate: '5-10%', tradingAction: '0.5-1%' },
        aiEnabled: { sendTime: '1:45 PM (15 min before trading window)', openRate: '60%', tradingAction: '20%' },
      },
      example: {
        title: 'Sector Rotation Nudge',
        profile: 'Tech sector investor, dip buyer',
        pattern: 'Most active 1:45-2:15 PM (60% of trades)',
        result: { sent: '1:45 PM', opened: '1:47 PM (2 min)', trade: '1:52 PM (₹75K)', totalTime: '7 min send-to-trade' },
        impact: [
          { label: 'Open rate', before: '5-10%', after: '60%' },
          { label: 'Trading action', before: '0.5-1%', after: '20%' },
          { label: 'Time to action', before: 'Hours/days', after: '7 minutes' },
        ]
      }
    }
  },
  {
    id: 5,
    type: 'multi-signal-fusion',
    section: 'nudges',
    title: 'Multi-Signal Fusion',
    subtitle: 'Signal Combination Process',
    content: {
      example: 'Portfolio Rebalancing Nudge',
      signals: [
        { name: 'Portfolio Signal', weight: '40%', score: 85, details: ['Current: 85% equity, 15% debt', 'Target: 80/20', 'Deviation: +5% equity', 'Action: Rebalance ₹25K'] },
        { name: 'Market Signal', weight: '25%', score: 70, details: ['Equity: +15% this quarter', 'Debt: Flat', 'VIX up 20%', 'Potential correction risk'] },
        { name: 'Behavioral Signal', weight: '20%', score: 90, details: ['Reviews portfolio at 3 PM', 'Last review: 2 days ago', 'Opens 80% of portfolio nudges', 'Risk profile: Moderate'] },
        { name: 'Temporal Signal', weight: '15%', score: 95, details: ['Time: 3 PM (review time)', 'Day: Wednesday (mid-week review)', 'Quarter end in 5 days', 'Active trading session'] },
      ],
      fusedScore: 84.25,
      threshold: 75,
      decision: 'Send nudge — Priority: High',
      generatedMessage: '"Your portfolio is up 15% this quarter! 🎉 Equity allocation increased from 80% to 85%. With equity rally and increasing volatility, consider rebalancing ₹25K from equity to debt. Want to see rebalancing options?"',
      outcome: { openRate: '75%', conversion: '12%', revenue: '₹250 per conversion' },
    }
  },
  {
    id: 6,
    type: 'learning-optimization',
    section: 'nudges',
    title: 'Learning & Optimization',
    subtitle: 'Continuous Improvement Loop',
    content: {
      phases: [
        {
          phase: 'Phase 1: Baseline',
          period: 'Week 1-2',
          variants: [
            { name: 'Variant A', desc: 'Short message, direct CTA', open: '45%', click: '8%', conversion: '2%' },
            { name: 'Variant B', desc: 'Detailed, educational tone', open: '60%', click: '12%', conversion: '3%' },
            { name: 'Variant C', desc: 'Question format, conversational', open: '55%', click: '15%', conversion: '4%' },
          ],
          winner: 'Variant C (conversational format)',
        },
        {
          phase: 'Phase 2: Optimization',
          period: 'Week 3-4',
          improvements: ['Refined timing: 15 min before trading window', 'Added personalization: specific portfolio amounts', 'Improved CTA: "Want to see options?"'],
          results: [
            { metric: 'Open rate', before: '55%', after: '65%', change: '+18%' },
            { metric: 'Click rate', before: '15%', after: '22%', change: '+47%' },
            { metric: 'Conversion', before: '4%', after: '6%', change: '+50%' },
          ]
        },
        {
          phase: 'Phase 3: Advanced Learning',
          period: 'Week 5-8',
          details: 'ML model trained on 10,000+ nudge interactions',
          patterns: ['Specific numbers > vague amounts', 'Contextual comparisons > generic', 'Question format with options > directives'],
          results: [
            { metric: 'Open rate', before: '65%', after: '70%', change: '+8%' },
            { metric: 'Click rate', before: '22%', after: '28%', change: '+27%' },
            { metric: 'Conversion', before: '6%', after: '10%', change: '+67%' },
          ],
          overall: '3x higher engagement vs. baseline',
        },
      ],
      sipExample: {
        baseline: { message: '"Your SIP is due in 2 days. Please ensure sufficient balance."', openRate: '30%', actionRate: '5%' },
        optimized: { message: '"Your ₹10K SIP in HDFC Top 100 is due in 2 days. Your bank balance (₹8K) is insufficient by ₹2K. Want to add funds or skip this month?"', openRate: '75%', actionRate: '25%', sipSuccess: '95% (vs 90% baseline)' },
        improvements: ['+150% open rate', '+400% action rate'],
      }
    }
  },

  // DEEP DIVE 2: PERSONALIZATION
  {
    id: 7,
    type: 'personalization-architecture',
    section: 'personalization',
    title: 'Personalization Engine Architecture',
    subtitle: 'Five-Layer Intelligence System',
    content: {
      layers: [
        {
          name: 'Layer 1: Progressive User Profiling',
          color: 'blue',
          items: [
            { label: 'Explicit', items: ['Age', 'Income', 'Goals', 'Risk'] },
            { label: 'Behavioral', items: ['Login freq', 'Click path', 'Time spent', 'Features'] },
            { label: 'Portfolio', items: ['Holdings', 'AUM', 'Risk score', 'Returns'] },
            { label: 'Engagement', items: ['Opens', 'Clicks', 'Conversions'] },
            { label: 'External', items: ['Market', 'News', 'Events'] },
          ]
        },
        {
          name: 'Layer 2: Dynamic Segmentation',
          color: 'purple',
          items: ['Engagement Level: High/Medium/Low', 'Conversion Probability: 0-100%', 'Churn Risk: Low/Medium/High', 'Trading Pattern: Active/Moderate/Passive', 'Lifecycle Stage: New/Active/At-Risk/Churned']
        },
        {
          name: 'Layer 3: Multi-Factor Scoring',
          color: 'amber',
          items: ['Profile Fit: Risk, goals, horizon match', 'Segment Fit: Engagement, conversion probability', 'Portfolio Fit: Diversification, allocation needs', 'Performance: Historical returns, ratings', 'Timing: Lifecycle stage, market conditions']
        },
        {
          name: 'Layer 4: Predictive Models',
          color: 'teal',
          items: ['Conversion Probability Model', 'Churn Risk Model', 'Lifetime Value Model', 'Next Best Action Model']
        },
        {
          name: 'Layer 5: Real-Time Personalization',
          color: 'emerald',
          items: ['Homepage customization', 'Product recommendations', 'Content personalization', 'Nudge personalization']
        },
      ]
    }
  },
  {
    id: 8,
    type: 'progressive-profiling',
    section: 'personalization',
    title: 'Progressive User Profiling',
    subtitle: 'Building 360-Degree User View',
    content: {
      example: 'Retirement Planning User',
      timeline: [
        { period: 'Day 1: Onboarding', completeness: 30, data: ['Age: 35', 'Income: ₹15L/year', 'Goals: Retirement (₹5 Cr in 25 years)', 'Risk: Moderate', 'Experience: 3 years', 'Current: ₹10L (equity funds)'] },
        { period: 'Week 1: Behavioral', completeness: 50, data: ['Login: Daily (7/week)', 'Time spent: 45 min/day', 'Features: Portfolio (100%), Research (60%)', 'Content: Retirement articles (5), Equity research (8)'] },
        { period: 'Month 1: Portfolio', completeness: 70, data: ['AUM: ₹25L (up from ₹10L)', 'Allocation: 60% equity, 40% debt', 'Holdings: 8 equity, 3 debt', 'Returns: +12% YTD', 'SIP: ₹5K/month'] },
        { period: 'Month 2: Engagement', completeness: 85, data: ['Email opens: 80%', 'Nudge clicks: 65%', 'App sessions: 25/month', 'Feature adoption: Goals (100%), Calculator (80%)', 'Content: 90% retirement-focused'] },
        { period: 'Month 3: External', completeness: 95, data: ['Market: Bull market, equity rally', 'Trends: Increasing retirement focus', 'Products: New retirement-focused funds'] },
      ],
      completeProfile: {
        conversionProb: '75%',
        churnRisk: '5% (Low)',
        ltv: '₹2.5L',
        nextAction: 'Recommend retirement-focused equity fund SIP',
      }
    }
  },
  {
    id: 9,
    type: 'dynamic-segmentation',
    section: 'personalization',
    title: 'Dynamic Segmentation',
    subtitle: 'Real-Time User Classification',
    content: {
      example: 'Tax-Saving Cross-Sell User',
      userProfile: { age: 28, aum: '₹5L (all equity)', risk: 'Aggressive', taxBracket: '30%', elss: 'None', deadline: '90 days', engagement: 'High (daily logins)' },
      scoring: [
        { dimension: 'Engagement Level', score: 88.75, classification: 'HIGH ENGAGER', factors: ['Login: Daily (7/week) → 100', 'Time: 30 min/day → 80', 'Features → 90', 'Content → 85'] },
        { dimension: 'Conversion Probability', score: 81.25, classification: 'HIGH INTENT', factors: ['Profile fit → 90 (30%)', 'Engagement → 85 (25%)', 'Timing → 80 (20%)', 'Content → 75 (15%)', 'Portfolio → 70 (10%)'] },
        { dimension: 'Churn Risk', score: 0, classification: 'LOW RISK', factors: ['Last login: Today → 0', 'Trend: Increasing → 0', 'Performance: +15% → 0', 'Satisfaction: High → 0'] },
      ],
      compositeSegment: 'High Engager, Tax Saver, Aggressive Risk Investor',
      personalization: {
        homepage: 'Tax-saving section prominent (top 20%)',
        products: ['Axis Long Term Equity (ELSS) — 95/100', 'DSP Tax Saver Fund — 90/100'],
        content: ['"Last 3 months to save tax: ELSS vs PPF"', '"How to maximize ₹1.5L deduction"'],
        nudge: '"Only 90 days left for tax-saving. Your current investments don\'t qualify. Want to see ELSS options?"',
      },
      outcome: { homepageEngagement: '85% (vs 40%)', productViews: '60% (vs 15%)', conversion: '15% (vs 3%)', revenue: '₹1,125/conversion' },
    }
  },
  {
    id: 10,
    type: 'multi-factor-scoring',
    section: 'personalization',
    title: 'Multi-Factor Scoring',
    subtitle: 'Product Recommendation Scoring',
    content: {
      example: 'Retirement Fund Recommendation',
      product: 'HDFC Retirement Fund (Equity)',
      factors: [
        { name: 'Profile Fit', weight: '30%', score: 97.5, weighted: 29.25, details: ['Risk Match: Moderate → 100', 'Goal Match: Retirement → 100', 'Horizon: 25 years → 100', 'Age: Suitable → 90'] },
        { name: 'Segment Fit', weight: '25%', score: 95, weighted: 23.75, details: ['Engagement: High → 90', 'Intent: Retirement → 100', 'Lifecycle: Active → 95'] },
        { name: 'Portfolio Fit', weight: '25%', score: 93.75, weighted: 23.44, details: ['Diversification: Adds retirement → 100', 'Allocation: Fits equity → 90', 'Overlap: Low → 85', 'Gap: Addresses goal → 100'] },
        { name: 'Performance', weight: '15%', score: 87.5, weighted: 13.13, details: ['Returns: Top quartile (15% CAGR) → 90', 'Sharpe: 1.2 → 85', 'Consistency → 90', 'Rating: 4-star → 85'] },
        { name: 'Timing', weight: '5%', score: 88.33, weighted: 4.42, details: ['Market: Favorable → 80', 'Lifecycle: Good → 90', 'Readiness: High → 95'] },
      ],
      totalScore: 93.99,
      rank: '#1 Top recommendation',
      message: '"Based on your retirement goal of ₹5 Cr in 25 years, we recommend HDFC Retirement Fund. It matches your moderate risk profile and is designed specifically for retirement planning."',
      conversionRate: '20% (vs 3% generic)',
    }
  },
  {
    id: 11,
    type: 'predictive-models',
    section: 'personalization',
    title: 'Predictive Models',
    subtitle: 'Churn Risk Prediction Example',
    content: {
      userProfile: { age: 40, aum: '₹15L', risk: 'Moderate', lastLogin: '30 days ago', portfolio: 'Down 5% (market down 8%)', engagement: 'Declining (was high, now low)' },
      features: [
        { name: 'Engagement Decline', weight: '30%', score: 16.3, riskLevel: 'High', details: ['Logins: 2 vs 25 avg → 20', 'Email opens: 10% vs 80% → 12.5', 'Nudge clicks: 5% vs 65% → 7.7', 'Feature usage: 20% vs 80% → 25'] },
        { name: 'Portfolio Performance', weight: '25%', score: 37.5, riskLevel: 'Medium', details: ['Return: -5% → 40', 'vs Market: -8% (outperforming) → 60', 'Volatility: High → 30', 'No positive return: 45 days → 20'] },
        { name: 'Communication Response', weight: '20%', score: 25, riskLevel: 'High', details: ['Email: None in 30 days → 0', 'Nudge: None in 30 days → 0', 'Support: None → 50 (neutral)', 'Feedback: None → 50 (neutral)'] },
        { name: 'Lifecycle Stage', weight: '15%', score: 55, riskLevel: 'Medium', details: ['Account age: 3 years → 70', 'Last transaction: 60 days → 30', 'SIP: Active → 80', 'Goal progress: Stalled → 40'] },
        { name: 'External Factors', weight: '10%', score: 40, riskLevel: 'Low', details: ['Market sentiment: Negative → 30', 'Competitor activity: High → 40', 'Seasonal: Tax season → 50'] },
      ],
      churnScore: 31.52,
      churnProbability: '60% (High Risk)',
      interventions: [
        'Personal call from relationship manager',
        'Portfolio review meeting (show outperformance)',
        'Educational content: "Market corrections are normal"',
        'Defensive fund recommendations',
        'Re-engagement: "Your portfolio is outperforming!"',
      ],
      expectedOutcome: { churnPrevented: '40% probability', aumRetained: '₹15L', commissionRetained: '₹1.12L/year' },
    }
  },

  // DEEP DIVE 3: DISTRIBUTOR TECH ENABLEMENT
  {
    id: 12,
    type: 'distributor-architecture',
    section: 'distributor',
    title: 'Distributor Platform Architecture',
    subtitle: 'Complete System Overview',
    content: {
      layers: [
        { name: 'Distributor Dashboard & Analytics', color: 'blue', columns: [
          { label: '360° Client View', items: ['Client profiles', 'Portfolio data', 'Engagement'] },
          { label: 'Real-Time AUM', items: ['Tracking', 'Growth', 'Projections'] },
          { label: 'Business Intelligence', items: ['Performance metrics', 'Revenue analytics', 'Client analytics'] },
        ]},
        { name: 'AI Research Assistant', color: 'purple', columns: [
          { label: 'Natural Language', items: ['Query engine', 'Research gen', 'Recommendations'] },
          { label: 'Fund Comparison', items: ['Multi-fund', 'Performance', 'Risk analysis'] },
          { label: 'Auto Reports', items: ['Portfolio', 'Performance', 'Custom'] },
          { label: 'Analysis', items: ['Insights', 'Trends', 'Patterns'] },
        ]},
        { name: 'Client Communication Tools', color: 'amber', columns: [
          { label: 'White-Label Portal', items: ['Client portal', 'Branding', 'Customization'] },
          { label: 'Automated Comm', items: ['Portfolio updates', 'Market updates', 'SIP reminders'] },
          { label: 'Campaign Mgmt', items: ['Targeted', 'A/B testing', 'Scheduling'] },
          { label: 'Tracking', items: ['Opens', 'Clicks', 'Response'] },
        ]},
        { name: 'AI Distributor Assistant', color: 'teal', columns: [
          { label: 'Research Co-Pilot', items: ['Query help', 'Analysis', 'Recommendations'] },
          { label: 'Client Insights', items: ['Risk alerts', 'Opportunities', 'Churn predict'] },
          { label: 'Sales Support', items: ['Proposals', 'Presentations', 'Scripts'] },
          { label: 'Automation', items: ['Workflows', 'Tasks', 'Reports'] },
        ]},
        { name: 'Transaction & Lifecycle Mgmt', color: 'emerald', columns: [
          { label: 'SIP Management', items: ['Tracking', 'Alerts', 'Automation'] },
          { label: 'Commission Tracking', items: ['Real-time calc', 'Projections', 'Reports'] },
          { label: 'Digital Onboarding', items: ['KYC automation', 'Suitability', 'Recommendations'] },
        ]},
      ]
    }
  },
  {
    id: 13,
    type: 'ai-research-assistant',
    section: 'distributor',
    title: 'AI Research Assistant',
    subtitle: 'Step-by-Step Research Process',
    content: {
      example: 'Small-Cap Fund Research',
      traditional: { time: '2 hours', quality: 'Moderate (20 funds)', steps: ['Search: 50+ funds', 'Filter: Review 20', 'Compare returns', 'Analyze risk', 'Review portfolio', 'Check ratings', 'Compare costs', 'Create recommendation'] },
      aiEnabled: {
        query: '"Best small-cap funds with low volatility for ₹10L, 5-year horizon"',
        scoring: ['Performance (30%)', 'Risk (25%)', 'Consistency (20%)', 'Portfolio Quality (15%)', 'Cost (10%)'],
        topResults: [
          { rank: 1, name: 'HDFC Small Cap Fund', score: 92, cagr: '18.5%', volatility: 'Low (15%)', sharpe: '1.4', rating: '5-star', expense: '1.2%' },
          { rank: 2, name: 'Axis Small Cap Fund', score: 88, cagr: '17.8%', volatility: 'Low (16%)', sharpe: '1.3', rating: '4-star', expense: '1.15%' },
          { rank: 3, name: 'DSP Small Cap Fund', score: 85, cagr: '17.2%', volatility: 'Low (17%)', sharpe: '1.2', rating: '4-star', expense: '1.25%' },
        ],
        time: '30 seconds',
        quality: 'High (all 50+ analyzed)',
      },
      timeSaved: '1 hour 30 min (62.5% savings)',
      totalProcess: '45 min (vs 2 hours traditional)',
    }
  },
  {
    id: 14,
    type: 'predictive-analytics',
    section: 'distributor',
    title: 'Predictive Analytics',
    subtitle: 'Churn Prediction & Prevention',
    content: {
      distributor: '₹5 Cr AUM, 100 clients',
      clients: [
        { name: 'Client A', risk: 'High', probability: '70%', aum: '₹5L', lastLogin: '45 days ago', portfolio: 'Down 8%', emailOpens: '5% (was 80%)', action: 'Personal call + portfolio review', outcome: 'Retained' },
        { name: 'Client B', risk: 'Medium', probability: '45%', aum: '₹3L', lastLogin: '20 days ago', portfolio: 'Down 3% (outperforming)', emailOpens: '40% (was 70%)', action: 'Email + performance update', outcome: 'Retained' },
        { name: 'Client C', risk: 'Low', probability: '5%', aum: '₹8L', lastLogin: '2 days ago', portfolio: 'Up 5%', emailOpens: '85% (was 80%)', action: 'Regular communication', outcome: 'Stable' },
      ],
      totalImpact: { clientsAtRisk: 5, retained: 3, retentionRate: '60%', aumRetained: '₹8L', commissionRetained: '₹60K/year' },
    }
  },
  {
    id: 15,
    type: 'cross-sell-opportunity',
    section: 'distributor',
    title: 'Cross-Sell Opportunity Identification',
    subtitle: 'Automated Opportunity Detection',
    content: {
      distributor: '₹3 Cr AUM, 80 clients',
      opportunities: [
        { name: 'ELSS Tax-Saving', clients: 10, potential: '₹15L', urgency: 'Critical', score: 91.25, conversion: '80%', deadline: '90 days' },
        { name: 'Retirement Funds', clients: 15, potential: '₹45L', urgency: 'High', score: 86.25, conversion: '75%' },
        { name: 'Debt Diversification', clients: 20, potential: '₹40L', urgency: 'Medium', score: 78.75, conversion: '60%' },
      ],
      totalOpportunity: '₹1 Cr additional AUM',
      results: { elss: { converted: 8, aum: '₹12L' }, retirement: { converted: 11, aum: '₹33L' }, debt: { converted: 12, aum: '₹24L' }, total: '₹69L additional AUM → ₹5.17L commission/year' },
    }
  },
  {
    id: 16,
    type: 'automated-communication',
    section: 'distributor',
    title: 'Automated Client Communication',
    subtitle: 'Communication Automation System',
    content: {
      traditional: { task: 'Monthly reports for 100 clients', time: '6 hours/week', quality: 'Variable' },
      aiEnabled: { time: '45 minutes (monitoring + follow-up)', steps: ['Data collection (automated)', 'Report generation (2 min for 100)', 'Message personalization (1 min)', 'Delivery (automated)', 'Response tracking (automated)'] },
      timeSavings: [
        { task: 'Portfolio Reports', traditional: '6 hrs/week', ai: '45 min', savings: '87.5%' },
        { task: 'SIP Reminders', traditional: '2 hrs/week', ai: '0 min', savings: '100%' },
        { task: 'Market Updates', traditional: '3 hrs/week', ai: '0 min', savings: '100%' },
        { task: 'Goal Updates', traditional: '1 hr/week', ai: '0 min', savings: '100%' },
      ],
      totalSavings: { traditional: '12 hrs/week', ai: '1.5 hrs/week', saved: '10.5 hrs/week (87.5%)', additionalClients: '25-30', scalability: '+25-30%' },
    }
  },

  // SUMMARY: SYNERGY
  {
    id: 17,
    type: 'synergy-architecture',
    section: 'summary',
    title: 'How The Three Systems Work Together',
    subtitle: 'Integration & Compound Effects',
    content: {
      flow: [
        { system: 'AI Nudges System', feeds: 'Personalization Engine', data: 'Behavioral data, engagement signals, action triggers' },
        { system: 'Personalization Engine', feeds: 'Distributor Platform', data: 'User profiles, conversion probabilities, recommendations' },
        { system: 'Distributor Platform', feeds: 'AI Nudges System', data: 'Client insights, strategy signals, success patterns' },
      ],
      compoundEffect: {
        baseline: { conversion: '3%', label: 'Baseline' },
        withNudges: { conversion: '4.5%', improvement: '+50%' },
        withPersonalization: { conversion: '6.75%', improvement: '+50%' },
        withDistributor: { conversion: '8.44%', improvement: '+25%' },
        withCompound: { conversion: '12-15%', improvement: '3-4x overall' },
      },
      revenueImpact: { baseline: '₹10 Cr/year', withAllSystems: '₹30-40 Cr/year (3-4x)' },
    }
  },
];
