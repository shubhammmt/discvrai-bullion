
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

export interface PartialProfileData {
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

// NEW: Partial profile save for progressive data collection
export const savePartialProfile = async (sessionId: string, partialData: PartialProfileData): Promise<{success: boolean, sessionId: string}> => {
  try {
    const response = await fetch(`${API_BASE_URL}/financial-profile/partial`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify({
        sessionId,
        data: partialData
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error saving partial profile:', error);
    // Non-blocking error - continue with local storage
    return { success: false, sessionId };
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

/* 
UPDATED API ENDPOINTS YOU NEED TO CREATE:

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

4. POST /api/financial-profile/partial (NEW)
   - Saves partial profile data during form progression
   - Request Body: { sessionId: string, data: PartialProfileData }
   - Response: { success: boolean, sessionId: string }
   - Non-blocking: Should not fail the user flow if API is down

EXAMPLE PARTIAL SAVE REQUEST:
POST /api/financial-profile/partial
{
  "sessionId": "session_abc123",
  "data": {
    "personalDetails": {
      "age": 28,
      "monthlyIncome": 75000
    }
  }
}

RESPONSE:
{
  "success": true,
  "sessionId": "session_abc123"
}
*/
