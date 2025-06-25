
// API Integration for Financial Profile Flow
// Update these URLs when your backend APIs are ready

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://your-api-domain.com/api';

export interface FinancialProfilePayload {
  personalDetails: {
    age: number;
    monthlyIncome: number;
    monthlySavings: number;
  };
  assets: Array<{
    type: string;
    amount: number;
  }>;
  expenses: Array<{
    category: string;
    amount: number;
  }>;
  goals: Array<{
    type: string;
    targetAmount: number;
    timeframe: number;
  }>;
}

export interface FinancialScoreResponse {
  success: boolean;
  data: {
    profileId: string;
    score: {
      overall: number;
      grade: string;
      summary: string;
      categories: {
        assetAllocation: number;
        emergencyFund: number;
        debtManagement: number;
        savingsRate: number;
      };
      actionPlan: Array<{
        priority: number;
        title: string;
        description: string;
        impact: string;
        timeframe: string;
        category: string;
      }>;
      recommendations: string[];
      benchmarks: {
        percentile: number;
        peerGroup: string;
      };
    };
  };
  message?: string;
}

// API Functions
export const createFinancialProfile = async (profileData: FinancialProfilePayload): Promise<FinancialScoreResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/financial-profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add authentication headers if needed
        // 'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify(profileData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating financial profile:', error);
    throw error;
  }
};

export const updateFinancialProfile = async (profileId: string, updateData: Partial<FinancialProfilePayload>): Promise<FinancialScoreResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/financial-profile/${profileId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify(updateData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating financial profile:', error);
    throw error;
  }
};

export const getFinancialScore = async (profileId: string): Promise<FinancialScoreResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/financial-score/${profileId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${getAuthToken()}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching financial score:', error);
    throw error;
  }
};

// Utility function to get auth token (implement based on your auth system)
// const getAuthToken = (): string => {
//   return localStorage.getItem('authToken') || '';
// };

/* 
API ENDPOINTS YOU NEED TO CREATE:

1. POST /api/financial-profile
   - Creates a new financial profile and calculates score
   - Request Body: FinancialProfilePayload
   - Response: FinancialScoreResponse

2. PUT /api/financial-profile/{profileId}
   - Updates existing profile and recalculates score
   - Request Body: Partial<FinancialProfilePayload>
   - Response: FinancialScoreResponse

3. GET /api/financial-score/{profileId}
   - Retrieves existing financial score
   - Response: FinancialScoreResponse

EXAMPLE REQUEST PAYLOADS:

POST /api/financial-profile
{
  "personalDetails": {
    "age": 28,
    "monthlyIncome": 75000,
    "monthlySavings": 15000
  },
  "assets": [
    {
      "type": "Savings Account",
      "amount": 200000
    },
    {
      "type": "Mutual Funds",
      "amount": 150000
    }
  ],
  "expenses": [
    {
      "category": "Housing (Rent/EMI)",
      "amount": 20000
    },
    {
      "category": "Food & Groceries",
      "amount": 8000
    }
  ],
  "goals": [
    {
      "type": "Emergency Fund",
      "targetAmount": 300000,
      "timeframe": 1
    },
    {
      "type": "House Purchase",
      "targetAmount": 2500000,
      "timeframe": 5
    }
  ]
}

EXAMPLE RESPONSE:
{
  "success": true,
  "data": {
    "profileId": "profile_123456",
    "score": {
      "overall": 72,
      "grade": "B+",
      "summary": "Good foundation! Focus on optimization.",
      "categories": {
        "assetAllocation": 65,
        "emergencyFund": 80,
        "debtManagement": 75,
        "savingsRate": 70
      },
      "actionPlan": [
        {
          "priority": 1,
          "title": "Increase Emergency Fund",
          "description": "Save ₹100K more for 6 months expenses",
          "impact": "+10 points",
          "timeframe": "3 months",
          "category": "safety"
        }
      ],
      "recommendations": [
        "Consider increasing equity allocation",
        "Build emergency fund to 6 months expenses"
      ],
      "benchmarks": {
        "percentile": 75,
        "peerGroup": "Urban professionals, 25-30 age"
      }
    }
  }
}
*/
