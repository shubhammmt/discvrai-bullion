// Enterprise Use Cases - McKinsey/BCG Style
// Based on large-scale transformation at leading consumer durables enterprise

export interface EnterpriseUseCaseNew {
  id: number;
  type: 'mfg-enterprise-usecase';
  headline: string;
  subheadline: string;
  useCaseId: string;
  executiveContext: string;
  coreChallenge: {
    title: string;
    points: string[];
  };
  transformationDelivered: {
    title: string;
    scope?: string[];
    keyCapabilities: Array<{
      name: string;
      points: string[];
    }>;
  };
  scaleComplexity: string[];
  businessImpact: string[];
  relevance: string;
  visualType: 'flow' | 'architecture' | 'comparison' | 'hub';
}

export const enterpriseUseCasesNew: EnterpriseUseCaseNew[] = [
  // Use Case 1: Enterprise Data Lake
  {
    id: 100,
    type: 'mfg-enterprise-usecase',
    headline: 'Built an Enterprise Data Lake for End-to-End Sales & Service Visibility',
    subheadline: 'National Scale Integration — 10,000+ Technicians, Millions of Transactions',
    useCaseId: 'data-lake',
    executiveContext: 'A leading consumer durables enterprise operates a large, asset-heavy service network alongside multi-channel product sales. Business outcomes were increasingly constrained by fragmented operational data spread across ERP, CRM, service, and digital platforms.',
    coreChallenge: {
      title: 'Core Business Challenge',
      points: [
        'No integrated view of sales, service, and customer lifecycle',
        'Service backlog & SLA adherence blind spots',
        'Technician productivity not measurable in real-time',
        'AMC attach, renewal, and churn data fragmented',
        'Decision-making relied on manual, lagging reports'
      ]
    },
    transformationDelivered: {
      title: 'Transformation Delivered',
      scope: ['SAP', 'Dynamics 365', 'Service Systems', 'D2C Channels', 'Distributor Systems'],
      keyCapabilities: [
        {
          name: 'Centralized Enterprise Data Lake',
          points: ['Integrated ERP (SAP), CRM (Dynamics 365), service platforms', 'Digital channels (web, mobile, D2C) unified', 'Channel sales systems (GT, MT, distributors) connected']
        },
        {
          name: 'Decision Intelligence Layer',
          points: ['Power BI deployed as enterprise-wide analytics interface', 'Role-based dashboards for CXOs, service leaders, sales heads', 'Near real-time analytics without impacting core systems']
        },
        {
          name: 'Operational Scale',
          points: ['10,000+ service technicians enabled', 'Millions of annual service transactions processed', 'Pan-India footprint with regional visibility']
        }
      ]
    },
    scaleComplexity: [
      '10,000+ service technicians',
      'Millions of annual transactions',
      'Pan-India multi-region operations'
    ],
    businessImpact: [
      'Single source of truth for sales & service',
      'Faster SLA breach identification',
      'Proactive operational interventions',
      'Foundation for AI-driven optimization'
    ],
    relevance: 'This model directly addresses the sales–service data fragmentation common across consumer durables, capital goods, and industrial equipment manufacturers.',
    visualType: 'architecture'
  },

  // Use Case 2: Customer MDM
  {
    id: 101,
    type: 'mfg-enterprise-usecase',
    headline: 'Established a Customer Master Data Platform — Single Trusted Identity',
    subheadline: '2.08+ Crore Customer Records Unified — Enterprise-Grade MDM',
    useCaseId: 'customer-mdm',
    executiveContext: 'Decades of system evolution resulted in 2.08+ crore customer records spread across multiple legacy and active platforms, leading to inconsistent customer experiences and poor commercial effectiveness.',
    coreChallenge: {
      title: 'Core Business Challenge',
      points: [
        'High duplication and inconsistent customer records',
        'No unified customer identity across channels',
        'Degraded CX across app, web, and call center',
        'Limited effectiveness of marketing and renewal campaigns'
      ]
    },
    transformationDelivered: {
      title: 'Transformation Delivered',
      scope: ['Data Profiling', 'Rule-Based Dedup', 'UUID Generation', 'Data Governance'],
      keyCapabilities: [
        {
          name: 'Enterprise-Grade Customer MDM',
          points: ['Enterprise-scale customer data profiling and cleansing', 'Rule-based de-duplication using mobile number and identity logic', 'Unique customer UUID generation for every record']
        },
        {
          name: 'Data Governance Framework',
          points: ['Parent–child customer relationships mapped', 'Centralized, governed customer creation process', 'Structural prevention of future data quality degradation']
        },
        {
          name: 'Cross-System Integration',
          points: ['Integration across ERP, CRM, digital platforms', 'Campaign systems connected for personalization', 'High data governance and privacy compliance']
        }
      ]
    },
    scaleComplexity: [
      '2.08 crore+ customer records',
      '10+ systems integrated',
      'High privacy & governance requirements'
    ],
    businessImpact: [
      'Single, trusted customer identity',
      'Seamless cross-channel experience',
      'Improved campaign targeting & upsell',
      'Zero future data quality degradation'
    ],
    relevance: 'MDM is foundational for after-sales service excellence, contract/AMC renewals, and dealer/distributor ecosystem alignment.',
    visualType: 'hub'
  },

  // Use Case 3: Automated Service Scheduling
  {
    id: 102,
    type: 'mfg-enterprise-usecase',
    headline: 'Automated Service Scheduling to Improve SLA Adherence',
    subheadline: 'From Manual Call-Center Dependency to SLA-Driven Automation',
    useCaseId: 'service-scheduling',
    executiveContext: 'Service operations were heavily dependent on manual coordination, limiting scalability and increasing service delivery risk across a national network.',
    coreChallenge: {
      title: 'Core Business Challenge',
      points: [
        'High call-center dependency for scheduling',
        'Inconsistent first-visit resolution rates',
        'SLA breaches driven by manual processes',
        'No proactive technician journey management'
      ]
    },
    transformationDelivered: {
      title: 'Transformation Delivered',
      scope: ['Auto-Scheduling', 'Multi-Channel Slots', 'SLA Monitoring', 'Journey Nudges'],
      keyCapabilities: [
        {
          name: 'Automated SLA-Driven Engine',
          points: ['Automated scheduling for complaints, installations, mandatory services', 'AMC leads processed automatically', 'Rule-based priority and escalation']
        },
        {
          name: 'Multi-Channel Slot Visibility',
          points: ['Slot visibility across app, web, WhatsApp, call center', 'Customer self-service scheduling enabled', 'Real-time availability updates']
        },
        {
          name: 'Technician Journey Management',
          points: ['Technician journey nudges and SLA monitoring', 'Route optimization suggestions', 'Performance tracking dashboards']
        }
      ]
    },
    scaleComplexity: [
      'Thousands of daily service requests',
      'Multi-channel booking integration',
      'National technician network'
    ],
    businessImpact: [
      'Reduced call-center load significantly',
      'Improved customer satisfaction scores',
      'Predictable & scalable operations',
      'Higher technician utilization'
    ],
    relevance: 'Directly applicable to field-service-intensive industries seeking cost reduction and CX improvement.',
    visualType: 'flow'
  },

  // Use Case 4: ERP Optimization
  {
    id: 103,
    type: 'mfg-enterprise-usecase',
    headline: 'Stabilized ERP Platforms — Reduced Cost and Operational Risk',
    subheadline: 'ERP Optimization & Governance Program — ₹1 Cr Annual Savings',
    useCaseId: 'erp-optimization',
    executiveContext: 'ERP systems faced increasing performance and cost pressures due to data growth and unmanaged change, threatening business-critical operations.',
    coreChallenge: {
      title: 'Core Business Challenge',
      points: [
        'ERP slowness affecting daily operations',
        'Rising storage and licensing costs',
        'Risk of downtime in business-critical systems',
        'Unmanaged change creating system instability'
      ]
    },
    transformationDelivered: {
      title: 'Transformation Delivered',
      scope: ['Data Archival', 'Performance Tuning', 'Change Governance', 'License Optimization'],
      keyCapabilities: [
        {
          name: 'Data Archival & Storage Optimization',
          points: ['Historical data archived to reduce active database load', 'Storage tiering implemented for cost optimization', 'Compliance-ready archival with audit trails']
        },
        {
          name: 'Performance Tuning',
          points: ['Async job optimization for batch processes', 'Query performance improvements', 'Infrastructure right-sizing']
        },
        {
          name: 'Governance Framework',
          points: ['Change governance and release discipline established', 'License utilization optimization', 'Proactive monitoring and alerting']
        }
      ]
    },
    scaleComplexity: [
      'Enterprise-scale ERP (SAP)',
      'Multi-module, multi-location',
      'Business-critical 24/7 operations'
    ],
    businessImpact: [
      'Predictable ERP performance',
      'Zero-downtime periods achieved',
      '~₹1 Cr annual cost savings',
      'Reduced support incidents'
    ],
    relevance: 'Critical for any large manufacturer running SAP S/4HANA, Oracle, or similar enterprise ERP platforms.',
    visualType: 'comparison'
  },

  // Use Case 5: D2C & Subscription
  {
    id: 104,
    type: 'mfg-enterprise-usecase',
    headline: 'Enabled D2C, Subscription, and Rental Models',
    subheadline: 'Unlocking Recurring Revenue — Product to Service Transformation',
    useCaseId: 'd2c-subscription',
    executiveContext: 'Traditional sales-led growth limited customer lifetime value and direct customer engagement. The enterprise needed new revenue models beyond one-time product sales.',
    coreChallenge: {
      title: 'Core Business Challenge',
      points: [
        'Low digital conversion from product to service',
        'Limited recurring revenue models',
        'Weak post-sale customer engagement',
        'No subscription or rental infrastructure'
      ]
    },
    transformationDelivered: {
      title: 'Transformation Delivered',
      scope: ['D2C Platform', 'Subscription Engine', 'Rental Management', 'Digital Payments'],
      keyCapabilities: [
        {
          name: 'D2C Platform',
          points: ['D2C web and mobile platforms launched', 'End-to-end digital purchase journey', 'Integrated with existing fulfillment systems']
        },
        {
          name: 'Subscription & Rental Engine',
          points: ['Rental and subscription lifecycle management', 'Automated billing and renewals', 'Usage-based pricing models enabled']
        },
        {
          name: 'Revenue Analytics',
          points: ['Digital payments and renewals tracking', 'Funnel analytics and retargeting', 'Customer lifetime value modeling']
        }
      ]
    },
    scaleComplexity: [
      'Multi-product subscription support',
      'Integrated with ERP & fulfillment',
      'Pan-India digital presence'
    ],
    businessImpact: [
      'New recurring revenue streams',
      'Improved customer lifetime value',
      'Stronger direct customer relationships',
      'Data-driven product decisions'
    ],
    relevance: 'Essential for manufacturers transitioning from product-only to product-as-a-service business models.',
    visualType: 'flow'
  },

  // Use Case 6: Supply Chain Visibility
  {
    id: 105,
    type: 'mfg-enterprise-usecase',
    headline: 'Enabled End-to-End Supply Chain Visibility',
    subheadline: 'Factory to Distributor — Single View of Product Movement',
    useCaseId: 'supply-chain-visibility',
    executiveContext: 'The manufacturing and distribution network spanned multiple factories, warehouses, distributors, and channels, but visibility across the movement of goods was fragmented and delayed.',
    coreChallenge: {
      title: 'Core Business Challenge',
      points: [
        'Limited real-time visibility beyond factory dispatch',
        'Where is inventory currently? → Unanswerable',
        'What is in transit vs delivered? → Unknown',
        'High manual reconciliation between teams'
      ]
    },
    transformationDelivered: {
      title: 'Transformation Delivered',
      scope: ['Factory Dispatch', 'Warehouse', 'Transport', 'Distributor', 'Acknowledgment'],
      keyCapabilities: [
        {
          name: 'Integrated Supply Chain Data Layer',
          points: ['Factory dispatch data integrated', 'Warehouse outward & inward movements tracked', 'Transporter milestones (in-transit, delayed, delivered)']
        },
        {
          name: 'Control & Visibility Layer',
          points: ['Near real-time dashboards for in-transit inventory', 'Distributor-wise stock positions visible', 'Delay and exception tracking automated']
        },
        {
          name: 'Exception Alerts',
          points: ['Transit delay alerts triggered automatically', 'Route deviation notifications', 'Distributor non-acknowledgment flagging']
        }
      ]
    },
    scaleComplexity: [
      'Multi-factory environment',
      'Nationwide distributor network',
      'High SKU count & transaction velocity'
    ],
    businessImpact: [
      'Single source of truth for supply chain',
      'Reduced manual follow-ups',
      'Faster issue identification',
      'Improved distributor trust'
    ],
    relevance: 'Critical for FMCG, consumer durables, capital goods, and any manufacturer with distributed sales networks. Foundation for a Supply Chain Control Tower.',
    visualType: 'flow'
  },

  // Use Case 7: Product Authentication
  {
    id: 106,
    type: 'mfg-enterprise-usecase',
    headline: 'QR Code–Based Product Authentication',
    subheadline: 'Preventing Counterfeits and Ensuring Product Integrity at Scale',
    useCaseId: 'product-authentication',
    executiveContext: 'Ensuring product authenticity and quality assurance is mission-critical, especially for consumables, spares, and replacement components distributed at scale.',
    coreChallenge: {
      title: 'Core Business Challenge',
      points: [
        'Risk of counterfeit or compromised products',
        'Inability to validate authenticity at any point',
        'Manual checks prone to error and manipulation',
        'Brand risk and potential customer safety concerns'
      ]
    },
    transformationDelivered: {
      title: 'Transformation Delivered',
      scope: ['QR Generation', 'Scan Validation', 'Control Logic', 'Alert System'],
      keyCapabilities: [
        {
          name: 'Unique Product Identity',
          points: ['QR code generated at manufacturing/packaging stage', 'Each QR mapped to Product SKU, Batch, Manufacturing metadata', 'Tamper-evident digital identity']
        },
        {
          name: 'Authentication Platform',
          points: ['QR scan via internal service apps and partner systems', 'Customer-facing platform validation', 'Real-time validation against central system']
        },
        {
          name: 'Control Mechanisms',
          points: ['One-time / controlled scan logic', 'Alerts for duplicate scans or invalid products', 'Geographic anomaly detection']
        }
      ]
    },
    scaleComplexity: [
      'High-volume SKU movement',
      'Nationwide distribution network',
      'Millions of products in circulation'
    ],
    businessImpact: [
      'Strong counterfeit prevention',
      'Improved partner trust',
      'Enhanced customer confidence',
      'Data insights into product movement'
    ],
    relevance: 'Highly relevant for consumables (filters, cartridges, spares), safety-critical components, and warranty-driven product ecosystems. Creates a digital trust layer across the supply chain.',
    visualType: 'hub'
  }
];
