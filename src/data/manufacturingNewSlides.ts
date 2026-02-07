import { LucideIcon, Factory, AlertTriangle, Layers, Zap, Settings, Users, Package, TrendingUp, BarChart3, Brain, Cloud, Truck, DollarSign, Target, Shield, Clock, CheckCircle, Building2, Phone, Mail, ArrowRight, Cpu, Database, Network, FileText, UserCheck, MapPin, QrCode, LineChart, Calendar, Workflow, Award, Handshake } from 'lucide-react';
import { enterpriseUseCasesNew } from './enterpriseUseCasesNew';

export interface ManufacturingNewSlide {
  id: number;
  type: string;
  [key: string]: any;
}

// Base slides (1-5: Title, Challenge, Gap, Platform, Capabilities)
const baseSlides: ManufacturingNewSlide[] = [
  // Slide 1: Title
  {
    id: 1,
    type: 'mfg-title',
    headline: 'Transforming Business @Manufacturing Enterprises',
    subheadline: 'From Reactive Firefighting to Proactive Intelligence',
    tagline: 'Enabling Your Existing Systems (SAP S/4HANA, Anaplan, WMS, TMS, CRM, HRIS) to Work Together in Real-Time',
    keyMessage: 'Systems Integration. Real-Time Intelligence. Proactive Operations.',
    note: "We don't replace your systems. We make them smarter together."
  },

  // Slide 2: The Challenge - Enhanced with Manufacturing Vertical
  {
    id: 2,
    type: 'mfg-challenge',
    headline: 'The Real Problem',
    subheadline: "Systems Exist, But They Don't Talk to Each Other",
    systemLandscape: {
      title: 'Typical System Architecture',
      systems: [
        { category: 'ERP', examples: 'SAP S/4HANA, Oracle ERP' },
        { category: 'Manufacturing', examples: 'MES, PLM, Quality Systems, SCADA' },
        { category: 'Planning', examples: 'Anaplan, Kinaxis, Blue Yonder, o9 Solutions' },
        { category: 'Warehouse', examples: 'SAP EWM, Manhattan, Blue Yonder' },
        { category: 'Transport', examples: 'SAP TM, Oracle OTM, FarEye, Shipsy' },
        { category: 'CRM', examples: 'Salesforce, Microsoft Dynamics, SAP CRM' },
        { category: 'HRIS', examples: 'SAP SuccessFactors, Workday, Oracle HCM' }
      ],
      totalSystems: '10-15+ systems operating in silos'
    },
    challenges: [
      { function: 'Manufacturing', challenge: 'OEE visibility gaps, quality data fragmentation', impact: 'Yield loss, rework, production delays' },
      { function: 'Supply Chain', challenge: 'Dynamic demand variability, siloed systems', impact: 'Stockouts, missed opportunities, excess inventory' },
      { function: 'Finance', challenge: 'Manual reconciliation, payment leakage', impact: 'Revenue leakage, delayed payments, audit risks' },
      { function: 'Sales & Distribution', challenge: 'Field force operations, channel control', impact: 'Delayed fulfillment, revenue leakage' },
      { function: 'Operations', challenge: 'Manual planning cycles, commodity costing', impact: 'Suboptimal capacity, margin erosion' },
      { function: 'Customer Engagement', challenge: 'Fragmented customer data', impact: 'Missed cross-sell, poor personalization' },
      { function: 'HR & Talent', challenge: 'Manual hiring, CV screening', impact: 'Slow hiring, missed talent' }
    ],
    coreIssue: 'Manufacturing enterprises operate complex, multi-function operations across production, supply chain, finance, sales, HR, and customer engagement. While organizations use SAP S/4HANA, MES, PLM, WMS, TMS, Anaplan, CRM, HRIS, and analytics tools, these systems operate largely in silos — especially at the shop floor.'
  },

  // Slide 3: Where Systems Stop - Enhanced with Manufacturing Vertical
  {
    id: 3,
    type: 'mfg-gap',
    headline: 'Bridging the Gap Across Functions',
    subheadline: 'From Siloed Systems to Unified Operations — Including the Shop Floor',
    positioning: 'You already have systems. We help them work together in real time across all functions — from production floor to customer doorstep.',
    comparisons: [
      { function: 'Manufacturing', current: 'OEE tracked manually, quality data in Excel, no real-time visibility', solution: 'Real-time OEE dashboards, automated quality alerts, predictive maintenance signals' },
      { function: 'Supply Chain', current: 'Demand spikes detected late, manual capacity adjustments', solution: 'Early stress signals, predictive alerts, dynamic capacity allocation' },
      { function: 'Finance', current: 'Manual reconciliation, payment leakage, delayed processing', solution: 'Automated 4-way matching, intelligent exception handling' },
      { function: 'Sales & Distribution', current: 'Manual field force operations, gray market sales', solution: 'Complete digital enablement, product authentication' },
      { function: 'Operations', current: 'Monthly/weekly planning cycles, manual commodity costing', solution: 'Rolling micro-adjustments, automated impact analysis' },
      { function: 'Customer Engagement', current: 'Fragmented customer data, no single view', solution: 'Unified customer view, personalized engagement' },
      { function: 'HR & Talent', current: 'Manual CV screening, time-consuming hiring', solution: 'Automated CV parsing, intelligent screening' }
    ],
    capabilities: [
      'Pull data from SAP, MES, PLM, WMS, TMS, Anaplan, CRM, HRIS → Unified data layer',
      'Detect stress early → Production, capacity, finance, sales, operations alerts',
      'Generate actionable insights → Recommendations across functions including shop floor',
      'Push actions back → Into systems or to humans via automated workflows'
    ]
  },

  // Slide 4: Platform Approach
  {
    id: 4,
    type: 'mfg-platform',
    headline: 'Day-0 Digitalization + AI Enablement',
    subheadline: 'Two-Tier Architecture: Foundation First, Intelligence Second',
    corePrinciple: 'AI cannot enable what isn\'t digital. Day-0 digitalization creates the foundation. AI enablement follows when ready.',
    tier1: {
      name: 'Day-0 Digitalization',
      label: 'Non-AI Enabled — Standalone Value',
      timeline: '2-8 weeks',
      features: [
        'System Integration Layer: Connect SAP, WMS, TMS, Anaplan, CRM, HRIS seamlessly',
        'Unified Data Platform: Single source of truth across 10-15+ systems',
        'Real-Time Data Sync: Automated data flows, no manual feeds',
        'Workflow Automation: System-driven actions, not phone/Excel',
        'Complete Digitization: Field force, channel, supply chain, finance, HR operations'
      ],
      value: [
        'Zero manual data reconciliation across functions',
        'Real-time visibility across all systems',
        'Automated exception detection',
        'Proactive alerts and notifications',
        'System-driven workflows'
      ]
    },
    tier2: {
      name: 'Intelligence Layer',
      label: 'AI-Enabled — After Day-0',
      timeline: '4-12 weeks after Day-0',
      features: [
        'Conversational Analytics: Natural language queries across all functions',
        'Predictive Insights: Demand forecasting, churn prediction, capacity optimization',
        'Intelligent Recommendations: Capacity rebalancing, pricing decisions',
        'Automated Decision Support: Commodity cost impact, financial reconciliation',
        'AI-Powered Operations: Intelligent routing, predictive maintenance'
      ],
      value: [
        'Days of analysis → Seconds of queries',
        'Predictive vs. reactive operations',
        'Intelligent optimization across functions',
        'Automated impact analysis',
        'Conversational interfaces for all operations'
      ]
    }
  },

  // Slide 5: Capabilities Overview
  {
    id: 5,
    type: 'mfg-capabilities',
    headline: 'End-to-End Transformation',
    subheadline: 'From Supply Chain to Finance to Sales to HR',
    categories: [
      {
        name: 'Supply Chain & Logistics',
        icon: 'Truck',
        capabilities: ['Dynamic capacity management', 'Proactive transport lane management', 'End-to-end supply chain visibility', 'Weather/season-driven demand forecasting', 'Commodity costing & impact analysis']
      },
      {
        name: 'Finance & Operations',
        icon: 'DollarSign',
        capabilities: ['Automated financial reconciliation (4-way matching)', 'Payment leakage reduction', 'Expense optimization & analytics', 'Commodity cost impact analysis', 'Audit readiness & compliance']
      },
      {
        name: 'Sales & Distribution',
        icon: 'Target',
        capabilities: ['Field force enablement (10,000+ agents)', 'Product authentication & channel control', 'Dealer/distributor engagement', 'Real-time sales performance tracking', 'Channel integrity management']
      },
      {
        name: 'Customer Engagement',
        icon: 'Users',
        capabilities: ['Customer data consolidation (20M+ records)', 'Unified customer view', 'Personalized engagement', 'Cross-sell opportunities', 'Customer lifecycle management']
      },
      {
        name: 'HR & Talent',
        icon: 'UserCheck',
        capabilities: ['Automated CV screening', 'Intelligent candidate matching', 'Voice interviews & multilingual support', 'Hiring workflow automation', 'Talent analytics']
      },
      {
        name: 'Cross-Function Intelligence',
        icon: 'Brain',
        capabilities: ['Unified data platform', 'Real-time dashboards & analytics', 'Conversational AI for all operations', 'Automated exception management', 'System-driven workflows']
      }
    ],
    keyMessage: 'Start where you need it most, expand as you grow.'
  },

  // Slide 6: Use Case - Field Force
  {
    id: 6,
    type: 'mfg-usecase',
    headline: 'Field Force Enablement at Scale',
    subheadline: 'Transforming 10,000+ Field Force Operations — Proven at Leading Consumer Durables Company',
    aiEnabled: false,
    problem: {
      title: 'The Problem',
      points: [
        'Large field force (thousands of agents) managing orders, service, customer engagement',
        'Manual order placement, service scheduling, payment collection',
        'Paper-based processes, delayed fulfillment',
        'No real-time visibility into field force performance'
      ]
    },
    solution: {
      title: 'What We Enabled',
      categories: [
        {
          name: 'Complete Digital Enablement',
          points: ['Order Placement: Field agents place orders digitally via mobile app', 'Service Scheduling: Automated service appointment booking', 'Customer Management: Complete customer history, interaction tracking', 'Payment Collection: Digital payment processing, instant reconciliation']
        },
        {
          name: 'Real-Time Visibility',
          points: ['Field Force Performance: Real-time tracking of orders, services, revenue', 'Customer Engagement: Customer interaction history, satisfaction metrics', 'Revenue Analytics: Territory-wise performance, conversion tracking']
        },
        {
          name: 'System Integration',
          points: ['SAP Integration: Orders flow directly into SAP, inventory updates in real-time', 'CRM Integration: Customer data synchronized across systems', 'Payment Gateway: Instant payment processing and reconciliation']
        }
      ]
    },
    impact: [
      { metric: 'Order Processing', before: 'Days', after: 'Minutes' },
      { metric: 'Visibility', before: 'Siloed', after: 'Real-time unified view' },
      { metric: 'Customer Experience', before: 'Delayed', after: 'Instant fulfillment' },
      { metric: 'Operations', before: 'Manual paperwork', after: '100% digital journey' }
    ],
    scale: ['10,000+ field agents enabled digitally', 'Millions of customer interactions/month', 'Complete digital transformation of field operations']
  },

  // Slide 7: Use Case - Product Authentication
  {
    id: 7,
    type: 'mfg-usecase',
    headline: 'Product Authentication & Channel Control',
    subheadline: 'Eliminating Gray Market & Proxy Sales — Proven at Leading Consumer Durables Company',
    aiEnabled: false,
    problem: {
      title: 'The Problem',
      points: [
        'Gray market sales, proxy filters, unauthorized channels',
        'No visibility into product movement from factory to end customer',
        'Revenue leakage, brand dilution',
        'Inability to track authentic vs. counterfeit products'
      ]
    },
    solution: {
      title: 'What We Enabled',
      categories: [
        {
          name: 'QR Code-Based Authentication',
          points: ['Unique Product Codes: Every product gets unique QR code at manufacturing', 'Real-Time Verification: Scan QR code at point of sale to verify authenticity', 'Channel Tracking: Track product movement from factory → warehouse → distributor → retailer → customer']
        },
        {
          name: 'Channel Integrity Management',
          points: ['Authorized Channel Tracking: Only authorized distributors/retailers can sell', 'Proxy Detection: Flag unauthorized sales channels automatically', 'Complete Visibility: End-to-end product tracking across supply chain']
        },
        {
          name: 'Real-Time Monitoring',
          points: ['Product Movement Dashboard: Real-time view of product location, channel', 'Alert System: Notify when products enter unauthorized channels', 'Analytics: Channel performance, authentication rates, gray market detection']
        }
      ]
    },
    impact: [
      { metric: 'Product Authentication', before: 'Unknown', after: '100% authenticated' },
      { metric: 'Channel Visibility', before: 'Blind spots', after: 'Complete transparency' },
      { metric: 'Gray Market Detection', before: 'Manual', after: 'Automated real-time' },
      { metric: 'Revenue Protection', before: 'Proxy sales', after: 'Zero proxy sales' }
    ],
    scale: ['Millions of products authenticated', 'Thousands of distributors tracked', 'Complete supply chain visibility']
  },

  // Slide 8: Use Case - Customer Data
  {
    id: 8,
    type: 'mfg-usecase',
    headline: 'Customer Data Consolidation at Scale',
    subheadline: 'Unified 20M+ Customer Records — Single Source of Truth',
    aiEnabled: false,
    problem: {
      title: 'The Problem',
      points: [
        'Customer data fragmented across multiple systems (SAP, CRM, service systems)',
        'Duplicate customer records, inconsistent data',
        'No single customer view',
        'Missed cross-sell opportunities, poor engagement'
      ]
    },
    solution: {
      title: 'What We Enabled',
      categories: [
        {
          name: 'Master Data Management (MDM)',
          points: ['Data Consolidation: Unified customer records across 10+ systems', 'Deduplication Engine: Automated identification and merging of duplicate records', 'Data Quality: Standardization, validation, governance at enterprise scale']
        },
        {
          name: 'Data Lake Architecture',
          points: ['Unified Data Platform: Single source of truth for all customer data', 'Real-Time Sync: Automated data synchronization across systems', 'Analytics Ready: Data lake architecture enabling real-time analytics']
        },
        {
          name: 'Single Customer View',
          points: ['360-Degree Customer Profile: Complete customer history, interactions, transactions', 'Cross-System Visibility: View customer data from SAP, CRM, service, sales systems', 'Personalized Engagement: Enable personalized marketing, service, sales']
        }
      ]
    },
    impact: [
      { metric: 'Data Quality', before: 'Fragmented', after: 'Unified single source of truth' },
      { metric: 'Deduplication', before: 'Manual', after: 'Automated (millions of records)' },
      { metric: 'Visibility', before: 'Siloed', after: '360-degree customer view' },
      { metric: 'Engagement', before: 'Generic', after: 'Personalized' }
    ],
    scale: ['20M+ customer records unified', 'Petabytes of data processed', '10+ systems integrated']
  },

  // Slide 9: Use Case - Supply Chain Visibility
  {
    id: 9,
    type: 'mfg-usecase',
    headline: 'End-to-End Supply Chain Visibility',
    subheadline: 'Complete Multi-Tier Supply Chain Tracking — Zero Blind Spots',
    aiEnabled: false,
    problem: {
      title: 'The Problem',
      points: [
        'Limited visibility beyond first-tier distribution',
        'No tracking from shipment → warehouse → distributor → tertiary → end customer',
        'Manual inventory reconciliation',
        'Reactive inventory management, stockouts or excess'
      ]
    },
    solution: {
      title: 'What We Enabled',
      categories: [
        {
          name: 'Multi-Tier Tracking',
          points: ['End-to-End Visibility: Shipment → Warehouse → Distributor → Tertiary → End Customer', 'Real-Time Tracking: Product movement tracked at every stage', 'Complete Chain: No blind spots in supply chain']
        },
        {
          name: 'Real-Time Analytics',
          points: ['Inventory Levels: Real-time inventory across all tiers', 'Movement Patterns: Product movement trends, velocity analysis', 'Demand Forecasting: Predictive inventory management based on movement patterns']
        },
        {
          name: 'Tech-Enabled Platform',
          points: ['Complete Digitization: Tech-enabled platform for entire supply chain', 'Automated Reconciliation: Automated inventory reconciliation across tiers', 'Exception Management: Automated alerts for stockouts, delays, anomalies']
        }
      ]
    },
    impact: [
      { metric: 'Visibility', before: 'Limited', after: 'Complete multi-tier tracking' },
      { metric: 'Reconciliation', before: 'Manual', after: 'Automated real-time' },
      { metric: 'Inventory Management', before: 'Reactive', after: 'Predictive' },
      { metric: 'Blind Spots', before: 'Multiple', after: 'Zero' }
    ],
    scale: ['Thousands of SKUs tracked', 'Hundreds of warehouses monitored', 'Complete distribution network visibility']
  },

  // Slide 10: Use Case - Dynamic Capacity
  {
    id: 10,
    type: 'mfg-usecase',
    headline: 'Dynamic Capacity Management',
    subheadline: 'Solving Demand Variability Through Real-Time Capacity Optimization',
    aiEnabled: false,
    problem: {
      title: 'The Problem',
      points: [
        'Demand spikes detected late (e.g., 70% of sales in last 2 weeks of month)',
        'Manual capacity adjustments, often too late',
        'Stockouts during demand spikes, excess inventory during low demand',
        'Reactive firefighting instead of proactive management'
      ]
    },
    solution: {
      title: 'What We Enable',
      categories: [
        {
          name: 'Real-Time Demand Monitoring',
          points: ['Pull sales data from SAP S/4HANA in real-time', 'Track demand patterns across warehouses, SKUs, channels', 'Compare actual vs. planned (from Anaplan)']
        },
        {
          name: 'Early Warning System',
          points: ['Alert when demand trajectory exceeds thresholds', 'Flag capacity constraints before they become bottlenecks', 'Notify logistics team when transport capacity needs scaling']
        },
        {
          name: 'Automated Capacity Rebalancing',
          points: ['Suggest warehouse-to-warehouse transfers', 'Recommend transport route adjustments', 'Trigger TMS optimization when demand spikes']
        },
        {
          name: 'Workflow-Driven Actions',
          points: ['System generates capacity adjustment recommendations', 'Push notifications to logistics/supply chain teams', 'Track actions taken, measure impact']
        }
      ]
    },
    impact: [
      { metric: 'Time to Detect', before: 'Days', after: 'Hours' },
      { metric: 'Visibility', before: 'Siloed', after: 'Unified real-time view' },
      { metric: 'Response Time', before: 'Reactive', after: 'Proactive' },
      { metric: 'Inventory', before: 'Stockouts/Excess', after: 'Optimized' }
    ],
    scale: ['Integration: SAP S/4HANA + Anaplan + WMS + TMS', 'Real-time sync, automated reconciliation', 'Automated alerts, approval workflows, action tracking']
  },

  // Slide 11: Use Case - Transport Lane Management
  {
    id: 11,
    type: 'mfg-usecase',
    headline: 'Proactive Transport Lane Management',
    subheadline: 'Eliminating High-Delay Lanes Through Early Detection',
    aiEnabled: false,
    problem: {
      title: 'The Problem',
      points: [
        'Certain transport lanes show high delay rates (e.g., 90% delays)',
        'Delays detected only after shipments are stuck',
        'No proactive alternative routing',
        'Customer dissatisfaction and increased costs'
      ]
    },
    solution: {
      title: 'What We Enable',
      categories: [
        {
          name: 'Real-Time Lane Performance Monitoring',
          points: ['Pull shipment data from TMS continuously', 'Track on-time performance by lane, carrier, route', 'Identify delay patterns before they become critical']
        },
        {
          name: 'Exception Detection & Alerting',
          points: ['Flag lanes with delay rates > threshold (e.g., 50%)', 'Alert logistics team when delays detected', 'Escalate critical delays automatically']
        },
        {
          name: 'Alternative Route Recommendations',
          points: ['Suggest alternative routes when delays detected', 'Compare route options (cost, time, reliability)', 'Enable quick decision-making with data']
        },
        {
          name: 'Carrier Performance Analytics',
          points: ['Track carrier performance by lane', 'Identify reliable vs. unreliable carriers', 'Support carrier selection decisions']
        }
      ]
    },
    impact: [
      { metric: 'Delay Detection', before: 'Post-facto', after: 'Real-time' },
      { metric: 'Lane Visibility', before: 'Unknown', after: 'Complete transparency' },
      { metric: 'Response Time', before: 'Hours/Days', after: 'Minutes' },
      { metric: 'Customer Satisfaction', before: 'Impacted', after: 'Improved' }
    ],
    scale: ['Integration: TMS + SAP + WMS', 'Real-time shipment status, delay calculation', 'Automated alerts, route optimization suggestions']
  },

  // Slide 12: Use Case - Commodity Costing (AI)
  {
    id: 12,
    type: 'mfg-usecase',
    headline: 'Automated Commodity Costing & Impact Analysis',
    subheadline: 'From Manual Raw Material Costing to Automated Impact Analysis',
    aiEnabled: true,
    problem: {
      title: 'The Problem',
      points: [
        'Commodity costing (copper, aluminum, steel, cement, chemicals) done manually',
        'Consumption or impact analysis difficult and reactive',
        'No real-time visibility into commodity price impact',
        'Delayed decision-making on pricing/procurement, margin erosion'
      ]
    },
    solution: {
      title: 'What We Enable',
      categories: [
        {
          name: 'Automated Commodity Price Tracking',
          points: ['Pull commodity prices from external sources (LME, commodity exchanges)', 'Track price movements in real-time', 'Alert when prices exceed thresholds']
        },
        {
          name: 'Consumption Analysis',
          points: ['Track commodity consumption by product, SKU, production line', 'Calculate cost impact of price changes', 'Forecast consumption based on production plans']
        },
        {
          name: 'Impact Analysis (AI-Powered)',
          points: ['Conversational Query: "What\'s the impact of 10% copper price increase on Q2 margins?"', 'Automated Calculation: Product-level cost impact, margin analysis', 'Scenario Planning: "What if aluminum prices drop 5%?"']
        },
        {
          name: 'Procurement Recommendations',
          points: ['Suggest optimal procurement timing based on price trends', 'Recommend hedging strategies', 'Alert when to lock in prices']
        }
      ]
    },
    impact: [
      { metric: 'Analysis Time', before: 'Days', after: 'Seconds (conversational)' },
      { metric: 'Visibility', before: 'Manual', after: 'Automated real-time' },
      { metric: 'Decision Speed', before: 'Reactive', after: 'Proactive' },
      { metric: 'Margin Protection', before: 'Delayed', after: 'Optimized' }
    ],
    scale: ['Integration: External commodity APIs + SAP (BOM) + Anaplan', 'GPT-powered conversational analytics', 'Price alerts, impact reports, procurement recommendations']
  },

  // Slide 13: Use Case - Weather Demand (AI)
  {
    id: 13,
    type: 'mfg-usecase',
    headline: 'Weather/Season-Driven Demand Forecasting',
    subheadline: 'Predicting Demand Spikes Before They Happen',
    aiEnabled: true,
    problem: {
      title: 'The Problem',
      points: [
        'Weather impacts product sales unpredictably (coolers, ACs, heaters, construction materials)',
        'No proactive demand forecasting based on weather patterns',
        'Stockouts during demand spikes (heatwaves, monsoons, winters)',
        'Excess inventory during low demand periods'
      ]
    },
    solution: {
      title: 'What We Enable',
      categories: [
        {
          name: 'Weather Data Integration',
          points: ['Pull weather forecasts from external APIs', 'Track historical weather vs. sales patterns', 'Build correlation models (temperature → cooler demand, rainfall → construction)']
        },
        {
          name: 'Predictive Demand Forecasting',
          points: ['Forecast product demand based on weather predictions', 'Adjust inventory plans proactively', 'Alert when demand spike expected']
        },
        {
          name: 'Automated Inventory Rebalancing',
          points: ['Suggest inventory transfers based on weather forecasts', 'Recommend production adjustments', 'Optimize warehouse allocation']
        },
        {
          name: 'Conversational Analytics',
          points: ['Query: "What\'s the expected cooler demand in North India next week?"', 'Response: Forecast with confidence intervals, recommended actions', 'Scenario Planning: "What if temperature is 2°C higher than forecast?"']
        }
      ]
    },
    impact: [
      { metric: 'Forecast Accuracy', before: 'Reactive', after: 'Predictive (weather-based)' },
      { metric: 'Inventory', before: 'Stockouts/Excess', after: 'Balanced' },
      { metric: 'Response Time', before: 'After spike', after: 'Before spike' },
      { metric: 'Sales Performance', before: 'Missed opportunities', after: 'Captured demand' }
    ],
    scale: ['Integration: Weather APIs + SAP + Anaplan + WMS', 'ML models for weather-demand correlation', 'Demand alerts, inventory recommendations']
  },

  // Slide 14: Use Case - Financial Reconciliation (AI)
  {
    id: 14,
    type: 'mfg-usecase',
    headline: 'Financial Reconciliation at Enterprise Scale',
    subheadline: 'Automated 4-Way Matching — 10,000+ Invoices/Month',
    aiEnabled: true,
    problem: {
      title: 'The Problem',
      points: [
        'Manual invoice validation and payment processing',
        '4-way matching (PO + Invoice + GRN + Contract) done manually',
        'Payment leakage, delayed processing',
        'Exception handling requires manual investigation, audit risks'
      ]
    },
    solution: {
      title: 'What We Enabled',
      categories: [
        {
          name: 'Automated 4-Way Matching',
          points: ['PO + Invoice + GRN + Contract: Automated matching at scale', 'Exception Detection: Intelligent flagging of discrepancies with context', 'Approval Workflows: Automated routing based on business rules']
        },
        {
          name: 'Intelligent Exception Handling',
          points: ['AI-Powered Analysis: Understand why exceptions occurred', 'Contextual Recommendations: Suggest resolution actions', 'Learning System: Improve matching accuracy over time']
        },
        {
          name: 'Audit Readiness',
          points: ['Complete Transaction History: One-click access to all transaction details', 'Regulatory Reports: Automated generation of audit reports', 'Compliance Tracking: Track all approvals, exceptions, resolutions']
        }
      ]
    },
    impact: [
      { metric: 'Processing Time', before: 'Days', after: 'Hours (80% faster)' },
      { metric: 'Leakage Reduction', before: 'High', after: '30% reduction' },
      { metric: 'Accuracy', before: 'Manual errors', after: 'Automated validation' },
      { metric: 'Audit Readiness', before: 'Manual prep', after: 'Automated reports' }
    ],
    scale: ['10,000+ invoices/month processed', '500+ vendors managed', '₹2,000+ Cr revenue operations']
  },

  // Slide 15: Case Study - Consumer Durables Enterprise
  {
    id: 15,
    type: 'mfg-casestudy',
    headline: 'Consumer Durables Enterprise Transformation',
    subheadline: 'Large-Scale Manufacturing Transformation: ₹2,000+ Cr Revenue, 10,000+ Field Force',
    clientProfile: {
      industry: 'Consumer Durables (Water Purifiers, Vacuum Cleaners)',
      revenue: '₹2,000+ Cr',
      scale: '10,000+ field force, 20M+ customers, multi-tier supply chain',
      systems: 'SAP S/4HANA, multiple WMS, TMS, planning tools, CRM'
    },
    challenges: [
      'Large field force operations (manual processes)',
      'Customer data fragmentation (20M+ records across systems)',
      'Supply chain visibility gaps (multi-tier distribution)',
      'Channel control issues (gray market, proxy sales)',
      'Financial reconciliation at scale (10,000+ invoices/month)'
    ],
    deliverables: [
      { name: 'Field Force Enablement', description: 'Enabled 10,000+ field force with complete digital enablement', impact: 'Zero manual paperwork, instant order-to-fulfillment' },
      { name: 'Customer Data Consolidation', description: 'Unified 20M+ customer records across 10+ systems', impact: 'Single customer view, personalized engagement' },
      { name: 'Supply Chain Visibility', description: 'Multi-tier tracking: Shipment → Warehouse → Distributor → End Customer', impact: 'Zero blind spots, predictive inventory' },
      { name: 'Product Authentication', description: 'QR code-based authentication system', impact: '100% authentication, zero proxy sales' },
      { name: 'Financial Reconciliation', description: 'Automated 4-way matching', impact: '30% leakage reduction, 80% faster processing' }
    ],
    overallImpact: [
      'Zero manual processes in field force operations',
      '100% digital customer journey',
      'Single customer view across 20M+ customers',
      'Complete supply chain visibility (zero blind spots)',
      '30-50% operational efficiency gains'
    ]
  },

  // Slide 16: Case Study - Manufacturing Enterprise
  {
    id: 16,
    type: 'mfg-casestudy',
    headline: 'Manufacturing-Led Organization',
    subheadline: 'Dynamic Capacity Allocation & Proactive Exception Management',
    clientProfile: {
      industry: 'Cement/Heavy Industry',
      scale: 'Large-scale operations, multi-location manufacturing',
      systems: 'ERP, WMS, TMS, planning tools'
    },
    challenges: [
      'Demand variability and logistics constraints',
      'Planning-to-execution gaps',
      'Dynamic capacity allocation needs',
      'Proactive exception management requirements',
      'Multi-location operations complexity'
    ],
    deliverables: [
      { name: 'Dynamic Capacity Management', description: 'Real-time demand monitoring across locations, automated capacity rebalancing', impact: 'Reduced stockouts, optimized inventory' },
      { name: 'Proactive Exception Management', description: 'Early detection of bottlenecks, automated exception handling workflows', impact: 'Reduced manual intervention, faster resolution' },
      { name: 'Cross-System Intelligence', description: 'Unified view across ERP, WMS, TMS, real-time data synchronization', impact: 'Zero data silos, unified operations' },
      { name: 'Multi-Location Operations', description: 'Centralized visibility, location-specific optimization, cross-location rebalancing', impact: 'Optimized operations across locations' }
    ],
    overallImpact: [
      'Proactive vs. reactive operations',
      'Dynamic capacity optimization across locations',
      '30-40% reduction in manual intervention',
      '25-35% improvement in operational efficiency'
    ]
  },

  // Slide 17: Case Study - Distribution Analytics
  {
    id: 17,
    type: 'mfg-casestudy',
    headline: 'Distribution Analytics Platform',
    subheadline: 'Real-Time Visibility Across Multi-Tier Networks',
    clientProfile: {
      industry: 'FMCG / Consumer Goods Distribution',
      scale: '39+ distributors, complete distribution network',
      systems: 'Commission systems, expense management, analytics tools'
    },
    challenges: [
      'Multi-tier distribution complexity',
      'Limited visibility into distributor performance',
      'Manual expense analysis and reconciliation',
      'Reactive decision-making'
    ],
    deliverables: [
      { name: 'Distributor Data Consolidation', description: 'Unified distributor data across multiple systems, integrated commission systems', impact: 'Real-time distributor performance tracking' },
      { name: 'Expense Analytics Platform', description: 'Automated expense data collection, multi-period analysis, anomaly detection', impact: 'Proactive expense management' },
      { name: 'GPT-Powered Analytics', description: 'Query: "Which distributors have highest expense ratios?" Instant analysis with recommendations', impact: 'Days → Seconds for analysis' }
    ],
    overallImpact: [
      '100% distributor visibility',
      'Automated expense analysis (days → seconds)',
      'Anomaly detection (proactive flagging)',
      'Data-driven distributor management'
    ]
  },

  // Slide 18: Technical Overview
  {
    id: 18,
    type: 'mfg-technical',
    headline: 'Platform Capabilities',
    subheadline: 'Flexible Platform: From Hours to Weeks to Transformations',
    components: [
      {
        name: 'Integration Layer',
        items: ['SAP S/4HANA: Real-time data pull, transaction updates', 'Anaplan/Kinaxis/Blue Yonder: Plan synchronization, data feeds', 'WMS: Inventory levels, movement tracking', 'TMS: Shipment status, lane performance', 'CRM Systems: Customer data synchronization', 'External APIs: Weather, commodity prices']
      },
      {
        name: 'Data Platform',
        items: ['Unified data model across systems', 'Real-time data synchronization', 'Data quality engine (deduplication, standardization)', 'Data lake architecture for analytics']
      },
      {
        name: 'Intelligence Layer',
        items: ['GPT-powered conversational analytics', 'Predictive models (demand, anomaly)', 'Automated recommendations', 'Multi-modal interfaces (voice, chat, UI)']
      },
      {
        name: 'Workflow Engine',
        items: ['Automated alerts and notifications', 'Approval workflows', 'Action tracking and impact measurement', 'System-driven processes']
      }
    ],
    deploymentTimelines: [
      { complexity: 'Basic Use Cases', timeline: 'Hours', example: 'Single integration, simple alert' },
      { complexity: 'Standard Workflows', timeline: '2-8 weeks', example: 'Multi-system integration, automated workflows' },
      { complexity: 'Complex Transformations', timeline: '8+ weeks', example: 'Full platform deployment, AI enablement' }
    ]
  },

  // Slide 19: Implementation Approach
  {
    id: 19,
    type: 'mfg-implementation',
    headline: 'Implementation Approach',
    subheadline: 'Start with Quick Wins, Scale to Full Transformation',
    phases: [
      {
        name: 'Phase 1: Foundation',
        timeline: 'Weeks 1-4',
        label: 'Day-0 Digitalization',
        deliverables: ['System Integration: Connect SAP S/4HANA, Anaplan, WMS, TMS', 'Real-time data sync setup, Data quality and reconciliation', 'Quick Win Use Case: Dynamic Capacity OR Field Force OR Supply Chain Visibility', 'Automated monitoring and workflows'],
        metrics: ['Real-time data visibility across systems', 'Automated monitoring operational', 'Reduced manual reconciliation time']
      },
      {
        name: 'Phase 2: Expansion',
        timeline: 'Weeks 5-8',
        label: 'Additional Use Cases',
        deliverables: ['Product Authentication & Channel Control', 'Customer Data Consolidation', 'Proactive Transport Lane Management', 'Financial Reconciliation', 'Cross-system dashboards, automated reporting'],
        metrics: ['Multiple use cases operational', 'Improved visibility and decision-making', 'Measurable efficiency gains']
      },
      {
        name: 'Phase 3: Intelligence',
        timeline: 'Weeks 9-16',
        label: 'AI Enablement',
        deliverables: ['Automated Commodity Costing & Impact Analysis', 'Weather/Season-Driven Demand Forecasting', 'GPT-Powered Conversational Analytics', 'Intelligent Exception Handling'],
        metrics: ['AI-powered analytics operational', 'Predictive capabilities enabled', 'Days of analysis → Seconds']
      },
      {
        name: 'Phase 4: Scale',
        timeline: 'Weeks 17+',
        label: 'Continuous Improvement',
        deliverables: ['Additional use cases based on priorities', 'Performance optimization', 'Self-service capabilities', 'Team training and capability transfer'],
        metrics: ['Expanded coverage', 'Self-sufficiency enabled', 'Continuous optimization']
      }
    ]
  },

  // Slide 20: Business Impact
  {
    id: 20,
    type: 'mfg-impact',
    headline: 'Expected Business Impact',
    subheadline: 'Measurable Business Outcomes',
    operationalMetrics: [
      { metric: 'Demand Detection Time', current: 'Days (reactive)', target: 'Hours (proactive)', impact: '80% reduction' },
      { metric: 'Transport Delay Response', current: 'Post-facto', target: 'Real-time alerts', impact: '90% faster' },
      { metric: 'Commodity Cost Analysis', current: 'Days (manual)', target: 'Seconds (automated)', impact: '99% faster' },
      { metric: 'Data Reconciliation', current: 'Days (manual)', target: 'Real-time (automated)', impact: '100% automation' },
      { metric: 'Planning Cycle', current: 'Weekly/Monthly', target: 'Daily micro-adjustments', impact: '10x frequency' },
      { metric: 'Field Force Operations', current: 'Manual/Paper', target: 'Digital', impact: '100% digitization' }
    ],
    businessValue: {
      revenue: [
        'Reduced Stockouts → Improved sales',
        'Optimized Pricing → Better margin management',
        'Customer Satisfaction → Improved retention',
        'Channel Revenue → Revenue protection'
      ],
      cost: [
        'Reduced Manual Work → 30-50% efficiency gains',
        'Optimized Inventory → 15-20% lower carrying costs',
        'Transport Optimization → 10-15% reduced logistics costs',
        'Payment Leakage → 30% leakage reduction'
      ],
      risk: [
        'Proactive Exception Management → Reduced disruptions',
        'Data Quality → Better decision-making',
        'Compliance → Audit readiness',
        'Channel Integrity → Brand protection'
      ]
    },
    roiTimeline: [
      { period: 'Month 1-2', milestone: 'Foundation setup, quick wins' },
      { period: 'Month 3-4', milestone: 'Measurable efficiency gains (20-30%)' },
      { period: 'Month 6+', milestone: 'Full transformation impact (30-50%)' }
    ]
  },

  // Slide 21: Why DiscvrAI
  {
    id: 21,
    type: 'mfg-credibility',
    headline: 'Why DiscvrAI?',
    subheadline: 'Built by Leaders Who Understand Enterprise Transformation',
    founderProfile: {
      name: 'Shubham Srivastava',
      title: 'Founder & CEO',
      experience: [
        '20 years of technology leadership experience',
        '10 years as CXO of listed companies',
        'CIO Experience: Led transformation at ₹2,000+ Cr consumer durables enterprise',
        'Deep understanding of capital allocation, P&L pressure, operational risk'
      ]
    },
    trackRecord: [
      { client: 'Consumer Durables Enterprise', detail: '₹2,000+ Cr revenue, 10,000+ field force, 20M+ customers' },
      { client: 'Manufacturing Enterprise', detail: '₹2,000+ Cr revenue, complete digital transformation' },
      { client: 'Distribution Networks', detail: '39+ distributors, complete multi-tier visibility' }
    ],
    scaleMetrics: [
      '10,000+ field force enabled',
      '20M+ customer records unified',
      '₹2,000+ Cr revenue operations',
      'Thousands of SKUs, hundreds of warehouses'
    ],
    platformCapabilities: [
      'Enterprise-Grade: Security, compliance, governance',
      'Scalable: Proven at 10,000+ user scale',
      'Flexible: Hours to weeks to transformations',
      'Integration-Ready: SAP, Anaplan, WMS, TMS, and more'
    ],
    cxoPromise: "I understand your board's priorities because I've lived them. I've led transformations at the scale you operate. I know the headcount trap. I've managed the tension between innovation and operational stability. DiscvrAI bridges that gap."
  },

  // Slide 22: Next Steps
  {
    id: 22,
    type: 'mfg-nextsteps',
    headline: 'Next Steps',
    subheadline: "Let's Start with a Proof of Concept",
    steps: [
      {
        title: 'Discovery Session',
        details: ['Deep dive into specific pain points', 'Define detailed use case priorities', 'Technical discovery (SAP integration, system access)']
      },
      {
        title: 'Proof of Concept (PoC) Proposal',
        details: ['Scope: 1-2 quick win use cases', 'Timeline: 4-6 weeks', 'Deliverable: Working solution, measurable outcomes', 'Investment: Minimal, focused on demonstrating value']
      },
      {
        title: 'Case Studies & Materials',
        details: ['Detailed case studies (consumer durables, manufacturing enterprises)', 'Use case deep-dives', 'Technical architecture overview']
      }
    ],
    pocCriteria: [
      'Real-time data integration operational',
      'At least one use case delivering measurable value',
      'Team trained on platform capabilities',
      'Clear path to full transformation'
    ],
    postPocPath: [
      'Pilot Deployment: Expand to additional use cases',
      'Full Transformation: Complete platform deployment',
      'AI Enablement: Add intelligence layer when ready',
      'Continuous Improvement: Scale and optimize'
    ]
  },

  // Slide 23: Contact
  {
    id: 23,
    type: 'mfg-contact',
    headline: "Let's Transform Your Manufacturing Operations",
    contact: {
      name: 'Shubham Srivastava',
      title: 'Founder & CEO',
      email: 'shubham@discvr.ai',
      phone: '+91-9873961591',
      company: 'DiscvrAI'
    },
    resources: [
      'Detailed case studies (consumer durables, manufacturing enterprises)',
      'Use case deep-dives and technical specifications',
      'Platform capabilities documentation',
      'PoC proposal (upon request)'
    ],
    actions: [
      'Schedule Discovery Session',
      'Review Case Studies',
      'Define PoC Scope',
      'Technical Discovery'
    ]
  }
];

// Combine base slides with enterprise use cases inserted after capabilities (slide 5)
// Structure: 1-5 (base), 6-12 (enterprise use cases), 13+ (existing use cases renumbered)
export const manufacturingNewSlides: ManufacturingNewSlide[] = [
  ...baseSlides.slice(0, 5), // Title, Challenge, Gap, Platform, Capabilities
  ...enterpriseUseCasesNew.map((uc, index) => ({ ...uc, id: 6 + index })), // Enterprise Use Cases (7 slides)
  ...baseSlides.slice(5).map((slide, index) => ({ ...slide, id: 13 + index })) // Remaining slides renumbered
];

export const totalMfgNewSlides = manufacturingNewSlides.length;
