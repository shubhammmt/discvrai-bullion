import { useQuery } from "@tanstack/react-query";
import { API_CONFIG, getApiToken } from "@/config/api";

interface BullionPrices {
  goldPrice: number;
  silverPrice: number;
  goldChange: number;
  silverChange: number;
  goldChangePercent: number;
  silverChangePercent: number;
  lastUpdated: string | null;
  isLoading: boolean;
  isError: boolean;
}

const FALLBACK_GOLD_PRICE = 6250;
const FALLBACK_SILVER_PRICE = 75;

async function fetchLivePrices(): Promise<{
  goldPrice: number;
  silverPrice: number;
  goldChange: number;
  silverChange: number;
  goldChangePercent: number;
  silverChangePercent: number;
  lastUpdated: string;
}> {
  const token = getApiToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_CONFIG.BASE_URL}/v1/bullion/prices`, {
    headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch prices: ${response.status}`);
  }

  const data = await response.json();

  return {
    goldPrice: data.gold?.price ?? FALLBACK_GOLD_PRICE,
    silverPrice: data.silver?.price ?? FALLBACK_SILVER_PRICE,
    goldChange: data.gold?.change ?? 0,
    silverChange: data.silver?.change ?? 0,
    goldChangePercent: data.gold?.changePercent ?? 0,
    silverChangePercent: data.silver?.changePercent ?? 0,
    lastUpdated: data.lastUpdated ?? new Date().toISOString(),
  };
}

export function useBullionPrices(): BullionPrices {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["bullion-prices"],
    queryFn: fetchLivePrices,
    refetchInterval: 60_000, // Refresh every 60 seconds
    staleTime: 30_000,
    retry: 2,
  });

  return {
    goldPrice: data?.goldPrice ?? FALLBACK_GOLD_PRICE,
    silverPrice: data?.silverPrice ?? FALLBACK_SILVER_PRICE,
    goldChange: data?.goldChange ?? 0,
    silverChange: data?.silverChange ?? 0,
    goldChangePercent: data?.goldChangePercent ?? 0,
    silverChangePercent: data?.silverChangePercent ?? 0,
    lastUpdated: data?.lastUpdated ?? null,
    isLoading,
    isError,
  };
}
