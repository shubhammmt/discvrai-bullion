
import { useState, useEffect } from 'react';

export const useStockData = (symbol: string | undefined) => {
  const [stockData, setStockData] = useState(null);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [personalizedInsights, setPersonalizedInsights] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!symbol) return;

    // Simulate API call delay
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - in real implementation, this would come from APIs
        const mockStockData = {
          symbol: symbol.toUpperCase(),
          companyName: `${symbol.toUpperCase()} Limited`,
          sector: 'Technology',
          exchange: 'NSE',
          isin: 'INE002A01018',
          currentPrice: 2845.75,
          change: +67.25,
          changePercent: +2.42,
          volume: 8547234,
          marketCap: '19,22,847 Cr',
          weekHigh52: 3024.90,
          weekLow52: 2220.30,
          pe: 28.4,
          pb: 2.8,
          eps: 100.15,
          roe: 15.2,
          dividendYield: 0.35,
          debtToEquity: 0.42,
          logo: '/placeholder.svg',
          description: 'A leading technology company with diverse business interests across digital services, retail, and telecommunications.'
        };

        const mockAiAnalysis = {
          sentiment: 'bullish',
          priceMovementExplanation: `Stock up 2.42% today following strong Q3 results announcement. Revenue grew 15% YoY driven by digital expansion.`,
          technicalInsights: `Stock showing upward trend with RSI at 58 (neutral zone). Support at ₹2750, resistance at ₹2950.`,
          keyMetricsAnalysis: `P/E of 28.4x is above sector average but justified by superior growth profile and diversified business model.`,
          riskFactors: ['Market volatility impact', 'Regulatory changes in sector', 'High capex requirements for expansion']
        };

        const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
        const userRiskProfile = userProfile.riskTolerance || 'moderate';

        const mockPersonalizedInsights = {
          matchScore: userRiskProfile === 'conservative' ? 65 : userRiskProfile === 'moderate' ? 85 : 75,
          aiConfidence: 78,
          riskAssessment: 'Medium',
          suitabilityReason: userRiskProfile === 'conservative' 
            ? 'Moderate fit for conservative investors. Strong fundamentals but higher volatility than bonds.'
            : userRiskProfile === 'moderate'
            ? 'Excellent match! Quality growth stock with reasonable valuation for moderate risk profile.'
            : 'Good quality pick but may be less exciting for aggressive growth seekers.',
          recommendation: `Suitable for ${userRiskProfile} risk investors seeking quality growth. Best for 3-5 year investment horizon based on your profile.`,
          keyDrivers: [
            'Strong fundamentals with robust cash reserves',
            'Growing market segment with expansion opportunities',
            'Digital transformation driving efficiency',
            'Stable business model providing predictable cash flows'
          ]
        };

        setStockData(mockStockData);
        setAiAnalysis(mockAiAnalysis);
        setPersonalizedInsights(mockPersonalizedInsights);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [symbol]);

  return { stockData, aiAnalysis, personalizedInsights, isLoading, error };
};
