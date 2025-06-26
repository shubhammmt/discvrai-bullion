# Financial Scoring API Documentation

## Overview

This document outlines the API requirements for the financial scoring system. The scoring functionality allows users to complete financial assessments, calculate health scores, and receive personalized recommendations.

## Core Scoring System Architecture

### Data Flow
1. **User Assessment** → User completes financial profile through forms or AI copilot
2. **Data Processing** → System processes user input and calculates financial health score
3. **Score Generation** → API returns comprehensive score with breakdown and recommendations
4. **Storage & Retrieval** → System stores and retrieves scores for future reference

## Required APIs for Scoring System

### 1. Financial Profile Creation
**Endpoint**: `POST /api/financial-profile`
**Purpose**: Creates a new financial profile and calculates initial score

#### Request Payload
```typescript
{
  personalDetails: {
    age: number;                    // User's age
    monthlyIncome: number;          // Monthly income in rupees
    monthlySavings: number;         // Monthly savings amount
  };
  assets: Array<{
    type: string;                   // 'equity', 'debt', 'cash', 'real_estate', etc.
    amount: number;                 // Current value in rupees
  }>;
  expenses: Array<{
    category: string;               // 'housing', 'transport', 'food', etc.
    amount: number;                 // Monthly expense amount
  }>;
  goals: Array<{
    type: string;                   // 'retirement', 'home', 'emergency', etc.
    targetAmount: number;           // Target amount in rupees
    timeframe: number;              // Years to achieve goal
  }>;
}
```

#### Response Format
```typescript
{
  success: boolean;
  data: {
    profileId: string;
    score: {
      overall: number;              // 0-100 score
      grade: string;                // A+, A, B+, B, C, D
      summary: string;              // Human-readable summary
      categories: {
        assetAllocation: number;    // 0-100 score
        emergencyFund: number;      // 0-100 score
        debtManagement: number;     // 0-100 score
        savingsRate: number;        // 0-100 score
      };
      actionPlan: Array<{
        priority: number;           // 1-5 priority ranking
        title: string;              // Action item title
        description: string;        // Detailed description
        impact: string;             // Expected point improvement
        timeframe: string;          // "1 month", "3 months", etc.
        category: string;           // Which score category this affects
      }>;
      recommendations: string[];    // Array of recommendation strings
      benchmarks: {
        percentile: number;         // User's percentile ranking
        peerGroup: string;          // Comparison group description
      };
    };
  };
  message?: string;
}
```

### 2. Profile Update
**Endpoint**: `PUT /api/financial-profile/{profileId}`
**Purpose**: Updates existing profile and recalculates score

#### Request Payload
```typescript
{
  // Same structure as creation, but all fields are optional
  personalDetails?: Partial<{
    age: number;
    monthlyIncome: number;
    monthlySavings: number;
  }>;
  assets?: Array<{
    type: string;
    amount: number;
  }>;
  expenses?: Array<{
    category: string;
    amount: number;
  }>;
  goals?: Array<{
    type: string;
    targetAmount: number;
    timeframe: number;
  }>;
}
```

#### Response Format
Same as creation response with updated score data.

### 3. Score Retrieval
**Endpoint**: `GET /api/financial-score/{profileId}`
**Purpose**: Retrieves existing financial score without recalculation

#### Response Format
```typescript
{
  success: boolean;
  data: {
    profileId: string;
    score: {
      overall: number;              // 0-100 score
      grade: string;                // A+, A, B+, B, C, D
      summary: string;              // Human-readable summary
      categories: {
        assetAllocation: number;    // 0-100 score
        emergencyFund: number;      // 0-100 score
        debtManagement: number;     // 0-100 score
        savingsRate: number;        // 0-100 score
      };
      actionPlan: Array<{
        priority: number;           // 1-5 priority ranking
        title: string;              // Action item title
        description: string;        // Detailed description
        impact: string;             // Expected point improvement
        timeframe: string;          // "1 month", "3 months", etc.
        category: string;           // Which score category this affects
      }>;
      recommendations: string[];    // Array of recommendation strings
      benchmarks: {
        percentile: number;         // User's percentile ranking
        peerGroup: string;          // Comparison group description
      };
    };
    lastUpdated: string;           // ISO timestamp
    calculationVersion: string;    // Algorithm version used
  };
  message?: string;
}
```

### 4. Partial Profile Save (Optional)
**Endpoint**: `POST /api/financial-profile/partial`
**Purpose**: Saves partial data during progressive form completion (non-blocking)

#### Request Payload
```typescript
{
  sessionId: string;               // Unique session identifier
  data: {
    // Any subset of the full profile data
    personalDetails?: Partial<{
      age: number;
      monthlyIncome: number;
      monthlySavings: number;
    }>;
    assets?: Array<{
      type: string;
      amount: number;
    }>;
    expenses?: Array<{
      category: string;
      amount: number;
    }>;
    goals?: Array<{
      type: string;
      targetAmount: number;
      timeframe: number;
    }>;
  };
}
```

#### Response Format
```typescript
{
  success: boolean;
  sessionId: string;               // Echo back session ID
  message?: string;
}
```

## Score Calculation Requirements

### Input Data Categories

#### 1. Personal Details
- **Age**: Used for age-appropriate asset allocation recommendations
- **Income**: Base for calculating savings rates and expense ratios
- **Savings**: Direct input to savings rate calculation

#### 2. Assets
- **Equity Holdings**: Stocks, equity mutual funds, ELSS
- **Debt Instruments**: FDs, debt funds, bonds, PPF
- **Cash & Equivalents**: Savings account, current account
- **Real Estate**: Property investments
- **Other**: Gold, crypto, etc.

#### 3. Expenses
- **Fixed Expenses**: Rent, EMIs, insurance premiums
- **Variable Expenses**: Food, transport, entertainment
- **Goal-based**: SIPs, recurring deposits

#### 4. Financial Goals
- **Emergency Fund**: 6-month expense coverage
- **Retirement**: Long-term wealth building
- **Short-term**: Home, car, vacation, etc.

### Scoring Algorithm Components

#### 1. Asset Allocation Score (40% weight)
- Age-appropriate equity allocation
- Diversification across asset classes
- Risk-adjusted returns

#### 2. Emergency Fund Score (30% weight)
- Coverage ratio (current fund / 6-month expenses)
- Liquidity of emergency funds

#### 3. Debt Management Score (20% weight)
- Debt-to-income ratio
- EMI burden assessment
- Credit utilization

#### 4. Savings Rate Score (10% weight)
- Monthly savings / monthly income ratio
- Consistency of savings

### Benchmark Data Requirements

#### Peer Group Comparisons
- Age-based cohorts (25-30, 31-35, 36-40, etc.)
- Income-based segments
- City type (metro, tier-1, tier-2)
- Professional categories

## API Error Handling

### Error Response Format
```typescript
{
  success: false;
  error: {
    code: string;                  // "INVALID_DATA", "CALCULATION_ERROR", etc.
    message: string;               // Human-readable error message
    details?: any;                 // Additional error context
  };
}
```

### Common Error Codes
- `INVALID_DATA`: Input validation failed
- `PROFILE_NOT_FOUND`: ProfileId doesn't exist
- `CALCULATION_ERROR`: Score calculation failed
- `INSUFFICIENT_DATA`: Not enough data for accurate scoring

## Implementation Notes

### Fallback Strategy
The frontend implements graceful degradation:
1. **API Available**: Use real-time calculation
2. **API Unavailable**: Fall back to client-side calculation using `calculateHealthScore`
3. **No Data**: Redirect to assessment flow

### Data Storage
- **Primary**: API database for persistent storage
- **Fallback**: localStorage for offline capability
- **Session**: Temporary storage during form progression

### Security Considerations
- All endpoints require authentication (Bearer token)
- Profile data is user-specific and secured
- No sensitive financial account details stored

## Testing Endpoints

### Sample Request (Profile Creation)
```bash
POST /api/financial-profile
Content-Type: application/json
Authorization: Bearer <token>

{
  "personalDetails": {
    "age": 28,
    "monthlyIncome": 75000,
    "monthlySavings": 15000
  },
  "assets": [
    { "type": "equity", "amount": 200000 },
    { "type": "debt", "amount": 100000 },
    { "type": "cash", "amount": 50000 }
  ],
  "expenses": [
    { "category": "housing", "amount": 25000 },
    { "category": "transport", "amount": 8000 },
    { "category": "food", "amount": 12000 }
  ],
  "goals": [
    { "type": "emergency", "targetAmount": 300000, "timeframe": 1 },
    { "type": "retirement", "targetAmount": 10000000, "timeframe": 30 }
  ]
}
```

### Expected Response
```json
{
  "success": true,
  "data": {
    "profileId": "prof_abc123xyz",
    "score": {
      "overall": 72,
      "grade": "B+",
      "summary": "Good foundation! Focus on optimization.",
      "categories": {
        "assetAllocation": 68,
        "emergencyFund": 85,
        "debtManagement": 90,
        "savingsRate": 75
      },
      "actionPlan": [
        {
          "priority": 1,
          "title": "Optimize Asset Allocation",
          "description": "Consider increasing equity allocation to 70% for your age group",
          "impact": "+8 points",
          "timeframe": "1 month",
          "category": "asset_allocation"
        }
      ],
      "recommendations": [
        "Increase equity allocation for better long-term returns",
        "Consider starting SIP for retirement goal"
      ],
      "benchmarks": {
        "percentile": 78,
        "peerGroup": "Urban professionals, 25-30 age"
      }
    }
  }
}
```

## Current Integration Status

### Implemented
- Frontend scoring UI (`FinancialScore.tsx`)
- Client-side fallback calculation (`healthScore.ts`)
- Local storage persistence
- API hook infrastructure (`useFinancialProfile.ts`)

### Required for Full Functionality
- Backend API endpoints as documented above
- Database schema for profile and score storage
- Score calculation algorithm implementation
- Benchmark data collection and maintenance

## Next Steps

1. **Backend Development**: Implement the 4 core API endpoints
2. **Database Design**: Create tables for profiles, scores, and benchmarks
3. **Algorithm Implementation**: Port the client-side calculation logic to backend
4. **Testing**: Validate API responses match frontend expectations
5. **Monitoring**: Add logging and analytics for score calculations
