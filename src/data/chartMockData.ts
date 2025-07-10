// Chart Mock Data for Price History and Technical Analysis

export interface PriceDataPoint {
  date: string;
  price: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  close: number;
}

export interface TimeframeData {
  period: string;
  return: string;
  data: PriceDataPoint[];
}

// Generate realistic price data for different timeframes
const generatePriceData = (basePrice: number, days: number, volatility: number = 0.02): PriceDataPoint[] => {
  const data: PriceDataPoint[] = [];
  let currentPrice = basePrice;
  const now = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Random price movement with slight upward bias for LODHA
    const change = (Math.random() - 0.45) * volatility * currentPrice;
    currentPrice = Math.max(currentPrice + change, currentPrice * 0.95);
    
    const high = currentPrice * (1 + Math.random() * 0.015);
    const low = currentPrice * (1 - Math.random() * 0.015);
    const open = currentPrice * (1 + (Math.random() - 0.5) * 0.01);
    const volume = Math.floor(Math.random() * 500000 + 100000);
    
    data.push({
      date: date.toISOString().split('T')[0],
      price: Math.round(currentPrice * 100) / 100,
      high: Math.round(high * 100) / 100,
      low: Math.round(low * 100) / 100,
      open: Math.round(open * 100) / 100,
      close: Math.round(currentPrice * 100) / 100,
      volume
    });
  }
  
  return data;
};

// Different timeframe datasets
export const CHART_DATA: Record<string, TimeframeData> = {
  "1D": {
    period: "1D",
    return: "+1.53%",
    data: generatePriceData(1412.60, 1, 0.005)
  },
  "1M": {
    period: "1M", 
    return: "-3.71%",
    data: generatePriceData(1412.60 / 1.037, 30, 0.015)
  },
  "3M": {
    period: "3M",
    return: "+25.88%",
    data: generatePriceData(1412.60 / 1.258, 90, 0.02)
  },
  "1Y": {
    period: "1Y",
    return: "+7.33%", 
    data: generatePriceData(1412.60 / 1.073, 365, 0.025)
  },
  "3Y": {
    period: "3Y",
    return: "+159.41%",
    data: generatePriceData(1412.60 / 2.594, 365 * 3, 0.03)
  },
  "5Y": {
    period: "5Y",
    return: "+509.98%",
    data: generatePriceData(1412.60 / 6.099, 365 * 5, 0.035)
  },
  "10Y": {
    period: "10Y", 
    return: "+509.98%",
    data: generatePriceData(1412.60 / 6.099, 365 * 10, 0.04)
  }
};

// Peer comparison chart data
export const PEER_CHART_DATA = {
  LODHA: generatePriceData(1412.60 / 1.258, 90, 0.02).map(d => ({ date: d.date, value: d.price })),
  DLF: generatePriceData(829.80 / 1.1, 90, 0.018).map(d => ({ date: d.date, value: d.price })),
  PRESTIGE: generatePriceData(1695.95 / 0.95, 90, 0.025).map(d => ({ date: d.date, value: d.price })),
  OBEROI: generatePriceData(1840.20 / 1.15, 90, 0.02).map(d => ({ date: d.date, value: d.price })),
  SOBHA: generatePriceData(1518.40 / 0.92, 90, 0.022).map(d => ({ date: d.date, value: d.price })),
  ARKADE: generatePriceData(204.05 / 1.18, 90, 0.03).map(d => ({ date: d.date, value: d.price }))
};

// Volume data for charts
export const VOLUME_DATA = CHART_DATA["3M"].data.map(point => ({
  date: point.date,
  volume: point.volume
}));

// Technical indicator overlays
export const TECHNICAL_OVERLAYS = {
  sma50: CHART_DATA["1Y"].data.map((point, index, arr) => {
    if (index < 49) return { date: point.date, value: null };
    const sum = arr.slice(index - 49, index + 1).reduce((acc, p) => acc + p.price, 0);
    return { date: point.date, value: Math.round(sum / 50 * 100) / 100 };
  }),
  sma200: CHART_DATA["1Y"].data.map((point, index, arr) => {
    if (index < 199) return { date: point.date, value: null };
    const sum = arr.slice(index - 199, index + 1).reduce((acc, p) => acc + p.price, 0);
    return { date: point.date, value: Math.round(sum / 200 * 100) / 100 };
  }),
  rsi: CHART_DATA["1Y"].data.map((point, index) => ({
    date: point.date,
    value: 30 + Math.sin(index * 0.1) * 20 + Math.random() * 10
  }))
};

export default {
  CHART_DATA,
  PEER_CHART_DATA,
  VOLUME_DATA,
  TECHNICAL_OVERLAYS
};