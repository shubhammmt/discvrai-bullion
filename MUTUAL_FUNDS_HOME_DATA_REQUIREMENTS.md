# Mutual Funds Home Page - Data Requirements Documentation

This document outlines all the data pointers and structures required to meaningfully render the Mutual Funds Home page (`/mutual-funds-home`).

## Overview
The Mutual Funds Home page displays a comprehensive portfolio analysis with multiple components that require various data structures. This page serves as a dashboard for users to view their mutual fund portfolio performance, composition, and recommendations.

## Data Structures Required

### 1. Portfolio Summary Data (`summary`)

```typescript
interface PortfolioSummary {
  totalValue: number;           // Current total portfolio value
  totalInvestment: number;      // Total amount invested
  totalGains: number;           // Absolute gains/losses
  totalGainsPercentage: number; // Percentage gains/losses
  xirr: number;                // Extended Internal Rate of Return
  currentNAV: number;          // Current Net Asset Value
  riskRating: string;          // Risk category (e.g., "Moderate", "High", "Low")
  riskScore: number;           // Risk score out of 100
}
```

**Example:**
```json
{
  "totalValue": 1250000,
  "totalInvestment": 1000000,
  "totalGains": 250000,
  "totalGainsPercentage": 25.0,
  "xirr": 18.5,
  "currentNAV": 1.25,
  "riskRating": "Moderate",
  "riskScore": 65
}
```

### 2. Performance Analysis Data

#### Benchmark Comparison (`benchmarkComparison`)
```typescript
interface BenchmarkComparison {
  [period: string]: {
    portfolio: number;    // Portfolio return for the period
    benchmark: number;    // Benchmark return for the period
    nifty50: number;     // Nifty 50 return for the period
  }
}
```

**Example:**
```json
{
  "1Y": { "portfolio": 15.2, "benchmark": 12.8, "nifty50": 14.5 },
  "3Y": { "portfolio": 18.5, "benchmark": 14.2, "nifty50": 16.8 },
  "5Y": { "portfolio": 16.8, "benchmark": 13.5, "nifty50": 15.2 }
}
```

#### Financial Metrics (`metrics`)
```typescript
interface FinancialMetrics {
  sharpeRatio: number;      // Risk-adjusted return measure
  beta: number;             // Market sensitivity
  alpha: number;            // Excess return over benchmark
  standardDeviation: number; // Volatility measure
  maxDrawdown: number;      // Maximum portfolio decline
  informationRatio: number; // Active return vs tracking error
}
```

**Example:**
```json
{
  "sharpeRatio": 1.25,
  "beta": 0.95,
  "alpha": 2.3,
  "standardDeviation": 18.5,
  "maxDrawdown": -15.2,
  "informationRatio": 0.85
}
```

### 3. Portfolio Composition Data

#### Asset Allocation (`allocation`)
```typescript
interface AllocationData {
  assetClass: {
    [category: string]: {
      current: number;    // Current allocation percentage
      target: number;     // Target allocation percentage
      value: number;      // Absolute value
      color: string;      // Chart color (HSL format)
    }
  };
  sectors: {
    [sector: string]: {
      value: number;      // Sector value
      percentage: number; // Sector percentage
      color: string;      // Chart color (HSL format)
    }
  };
  marketCap: {
    [cap: string]: {
      value: number;      // Market cap value
      percentage: number; // Market cap percentage
      color: string;      // Chart color (HSL format)
    }
  };
}
```

**Example:**
```json
{
  "assetClass": {
    "Equity": { "current": 70, "target": 65, "value": 875000, "color": "hsl(220, 70%, 50%)" },
    "Debt": { "current": 25, "target": 30, "value": 312500, "color": "hsl(150, 60%, 45%)" },
    "Hybrid": { "current": 5, "target": 5, "value": 62500, "color": "hsl(280, 65%, 55%)" }
  },
  "sectors": {
    "Technology": { "value": 262500, "percentage": 21, "color": "hsl(220, 70%, 50%)" },
    "Banking": { "value": 200000, "percentage": 16, "color": "hsl(150, 60%, 45%)" },
    "Healthcare": { "value": 150000, "percentage": 12, "color": "hsl(280, 65%, 55%)" }
  },
  "marketCap": {
    "Large Cap": { "value": 750000, "percentage": 60, "color": "hsl(220, 70%, 50%)" },
    "Mid Cap": { "value": 375000, "percentage": 30, "color": "hsl(150, 60%, 45%)" },
    "Small Cap": { "value": 125000, "percentage": 10, "color": "hsl(280, 65%, 55%)" }
  }
}
```

### 4. Individual Funds Data (`funds`)
```typescript
interface FundData {
  id: string;
  name: string;
  category: string;
  scheme: "Direct" | "Regular";
  currentValue: number;
  returns: {
    "1Y": number;
    "3Y": number;
    "5Y": number;
  };
  expenseRatio: number;
  recommendation: "Buy" | "Hold" | "Sell" | "Switch";
  suitabilityScore: number;
  suitabilityBreakdown: {
    performance: number;
    cost: number;
    experience: number;
    scale: number;
  };
  insights: Array<{
    type: "warning" | "info" | "success";
    message: string;
  }>;
  amc: string;              // Asset Management Company
  planType: "Direct" | "Regular";
  trend: "up" | "down" | "neutral";
}
```

**Example:**
```json
[
  {
    "id": "fund_001",
    "name": "SBI Blue Chip Fund",
    "category": "Large Cap",
    "scheme": "Direct",
    "currentValue": 350000,
    "returns": { "1Y": 16.5, "3Y": 18.2, "5Y": 15.8 },
    "expenseRatio": 0.65,
    "recommendation": "Hold",
    "suitabilityScore": 85,
    "suitabilityBreakdown": {
      "performance": 90,
      "cost": 85,
      "experience": 80,
      "scale": 85
    },
    "insights": [
      { "type": "success", "message": "Consistently outperforming benchmark" },
      { "type": "info", "message": "Low expense ratio for category" }
    ],
    "amc": "SBI Mutual Fund",
    "planType": "Direct",
    "trend": "up"
  }
]
```

## API Endpoints Required

### 1. Portfolio Summary API
```
GET /api/portfolio/summary?profileId={profileId}
Response: PortfolioSummary
```

### 2. Performance Analysis API
```
GET /api/portfolio/performance?profileId={profileId}
Response: {
  benchmarkComparison: BenchmarkComparison,
  metrics: FinancialMetrics
}
```

### 3. Portfolio Composition API
```
GET /api/portfolio/composition?profileId={profileId}
Response: {
  allocation: AllocationData,
  funds: FundData[]
}
```

### 4. Funds Analysis API
```
GET /api/portfolio/funds?profileId={profileId}
Response: FundData[]
```

## Data Validation Rules

### Required Fields
- All monetary values must be positive numbers
- Percentages should be between 0-100
- Colors must be in HSL format
- Fund recommendations must be one of: "Buy", "Hold", "Sell", "Switch"
- Scheme types must be either "Direct" or "Regular"

### Business Logic Constraints
- Asset allocation percentages should sum to 100%
- Sector allocation percentages should sum to 100%
- Market cap allocation percentages should sum to 100%
- XIRR should be calculated based on actual cash flows
- Risk scores should be between 0-100

## Error Handling

### Missing Data Scenarios
1. **No Portfolio Data**: Show empty state with onboarding prompt
2. **Partial Data**: Display available components, show placeholders for missing data
3. **Stale Data**: Show last updated timestamp and refresh option
4. **API Errors**: Display error message with retry option

### Data Refresh Strategy
- Real-time updates for critical metrics (NAV, current value)
- Daily refresh for performance metrics
- Weekly refresh for portfolio composition
- On-demand refresh for rebalancing recommendations

## Performance Considerations

### Data Caching
- Cache portfolio summary for 15 minutes
- Cache performance data for 1 hour
- Cache composition data for 4 hours
- Implement progressive loading for heavy calculations

### Loading States
- Show skeleton loaders for each component
- Implement lazy loading for non-critical sections
- Provide fallback data for offline scenarios

## Security & Privacy

### Data Protection
- All financial data must be encrypted at rest
- API calls must include proper authentication
- Sensitive data should not be logged
- Implement data retention policies

### User Permissions
- Verify user owns the portfolio data
- Implement role-based access for shared portfolios
- Audit trail for data access and modifications