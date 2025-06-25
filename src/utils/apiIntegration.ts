// API Integration for Financial Profile Flow
// Update these URLs when your backend APIs are ready

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://your-api-domain.com/api';

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

// NEW: Detailed Portfolio Interfaces
export interface DetailedInstrument {
  id?: string;
  category: string; // 'equity', 'debt', 'insurance', 'realEstate', etc.
  type: string;
  name: string;
  currentValue: number;
  details: Record<string, any>;
  createdAt?: string;
  updatedAt?: string;
}

export interface PortfolioReconciliationResponse {
  success: boolean;
  data: {
    hasConflicts: boolean;
    conflicts: Array<{
      category: string;
      profileTotal: number;
      calculatedTotal: number;
      difference: number;
      instruments: DetailedInstrument[];
    }>;
    recommendedTotals: Record<string, number>;
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

// NEW: Detailed Portfolio Management APIs
export const addPortfolioInstrument = async (profileId: string, instrument: Omit<DetailedInstrument, 'id'>): Promise<{success: boolean, instrumentId: string}> => {
  try {
    const response = await fetch(`${API_BASE_URL}/portfolio/instruments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify({
        profileId,
        instrument
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding portfolio instrument:', error);
    throw error;
  }
};

export const updatePortfolioInstrument = async (instrumentId: string, updates: Partial<DetailedInstrument>): Promise<{success: boolean}> => {
  try {
    const response = await fetch(`${API_BASE_URL}/portfolio/instruments/${instrumentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify(updates)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating portfolio instrument:', error);
    throw error;
  }
};

export const getPortfolioInstruments = async (profileId: string): Promise<{success: boolean, instruments: DetailedInstrument[]}> => {
  try {
    const response = await fetch(`${API_BASE_URL}/portfolio/instruments?profileId=${profileId}`, {
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
    console.error('Error fetching portfolio instruments:', error);
    return { success: false, instruments: [] };
  }
};

export const reconcilePortfolioData = async (profileId: string): Promise<PortfolioReconciliationResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/portfolio/reconcile/${profileId}`, {
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
    console.error('Error reconciling portfolio data:', error);
    throw error;
  }
};

export const resolvePortfolioConflicts = async (profileId: string, resolution: 'useDetailed' | 'useProfile' | 'manual', manualTotals?: Record<string, number>): Promise<{success: boolean}> => {
  try {
    const response = await fetch(`${API_BASE_URL}/portfolio/reconcile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify({
        profileId,
        resolution,
        manualTotals
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error resolving portfolio conflicts:', error);
    throw error;
  }
};

export const recalculateFinancialScore = async (profileId: string): Promise<FinancialScoreResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/calculations/score`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify({ profileId })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error recalculating financial score:', error);
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

/* 
ENHANCED API ENDPOINTS FOR DETAILED PORTFOLIO MANAGEMENT:

1. POST /api/portfolio/instruments
   - Adds detailed instrument to portfolio
   - Request: { profileId: string, instrument: DetailedInstrument }
   - Response: { success: boolean, instrumentId: string }

2. PUT /api/portfolio/instruments/{instrumentId}
   - Updates specific instrument details
   - Request: Partial<DetailedInstrument>
   - Response: { success: boolean }

3. GET /api/portfolio/instruments?profileId={profileId}
   - Retrieves all detailed instruments for profile
   - Response: { success: boolean, instruments: DetailedInstrument[] }

4. GET /api/portfolio/reconcile/{profileId}
   - Checks for conflicts between profile totals and detailed entries
   - Response: PortfolioReconciliationResponse

5. POST /api/portfolio/reconcile
   - Resolves conflicts with chosen strategy
   - Request: { profileId: string, resolution: string, manualTotals?: object }
   - Response: { success: boolean }

6. POST /api/calculations/score
   - Recalculates financial score with latest data
   - Request: { profileId: string }
   - Response: FinancialScoreResponse

EXAMPLE INSTRUMENT ENTRY:
{
  "category": "equity",
  "type": "mutual_fund",
  "name": "HDFC Equity Growth Fund",
  "currentValue": 150000,
  "details": {
    "sip_amount": 5000,
    "start_date": "2023-01-01",
    "folio_number": "12345678",
    "nav": 45.67,
    "units": 3289.45
  }
}
*/
