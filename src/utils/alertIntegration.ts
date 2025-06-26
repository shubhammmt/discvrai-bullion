
interface CreateAlertRequest {
  user_id: string;
  symbol: string;
  asset_type: 'stock' | 'mutual_fund' | 'ipo';
  alert_type: 'price';
  condition: 'above' | 'below';
  target_value: number;
}

interface AlertResponse {
  success: boolean;
  alert_id?: string;
  alert?: {
    id: string;
    alert_type: string;
    condition: string;
    target_value: number;
    symbol: string;
    asset_type: string;
    created_at: string;
    updated_at: string;
    triggered: boolean;
    status: string;
  };
  message: string;
  journey_stage: string;
  error?: string;
}

export const createAlert = async (alertData: CreateAlertRequest): Promise<AlertResponse> => {
  try {
    const response = await fetch('/api/financial-assistant/alert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...alertData,
        action: 'create'
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating alert:', error);
    return {
      success: false,
      message: 'Failed to create alert',
      journey_stage: 'research',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

export const createPriceAlert = async (
  userId: string,
  symbol: string,
  assetType: 'stock' | 'mutual_fund' | 'ipo',
  condition: 'above' | 'below',
  targetPrice: number
): Promise<AlertResponse> => {
  return createAlert({
    user_id: userId,
    symbol,
    asset_type: assetType,
    alert_type: 'price',
    condition,
    target_value: targetPrice
  });
};
