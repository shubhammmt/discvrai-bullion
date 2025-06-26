
interface AddToWatchlistRequest {
  user_id: string;
  symbol: string;
  name: string;
  asset_type: 'stock' | 'mutual_fund' | 'ipo';
  notes?: string;
  watchlists?: string[];
}

interface WatchlistResponse {
  success: boolean;
  item?: {
    userId: string;
    symbol: string;
    name: string;
    assetType: string;
    notes?: string;
    watchlists: string[];
    addedAt: string;
    updatedAt: string;
  };
  message: string;
  journey_stage: string;
  error?: string;
}

export const addToWatchlist = async (watchlistData: AddToWatchlistRequest): Promise<WatchlistResponse> => {
  try {
    const response = await fetch('/api/financial-assistant/watchlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...watchlistData,
        action: 'add'
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding to watchlist:', error);
    return {
      success: false,
      message: 'Failed to add to watchlist',
      journey_stage: 'research',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

export const addToDefaultWatchlist = async (
  userId: string,
  symbol: string,
  name: string,
  assetType: 'stock' | 'mutual_fund' | 'ipo',
  notes?: string
): Promise<WatchlistResponse> => {
  return addToWatchlist({
    user_id: userId,
    symbol,
    name,
    asset_type: assetType,
    notes,
    watchlists: ['Default']
  });
};

interface RemoveFromWatchlistRequest {
  user_id: string;
  symbol: string;
  watchlist_name?: string;
}

export const removeFromWatchlist = async (removeData: RemoveFromWatchlistRequest): Promise<WatchlistResponse> => {
  try {
    const response = await fetch('/api/financial-assistant/watchlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...removeData,
        action: 'remove'
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error removing from watchlist:', error);
    return {
      success: false,
      message: 'Failed to remove from watchlist',
      journey_stage: 'research',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};
