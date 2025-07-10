
import { useState, useEffect } from 'react';

export const useStockData = (symbol: string | undefined) => {
  const [stockData, setStockData] = useState(null);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [personalizedInsights, setPersonalizedInsights] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!symbol) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Enhanced mock data with all required fields
        const mockStockData = {
          symbol: symbol.toUpperCase(),
          companyName: `${symbol.toUpperCase()} Limited`,
          sector: 'Technology',
          exchange: 'NSE',
          isin: 'INE002A01018',
          listingDate: '1995-11-03',
          currentPrice: 2845.75,
          change: +67.25,
          changePercent: +2.42,
          volume: 8547234,
          avgVolume: 6234567,
          marketCap: '19,22,847 Cr',
          weekHigh52: 3024.90,
          weekLow52: 2220.30,
          pe: 28.4,
          pb: 2.8,
          eps: 100.15,
          roe: 15.2,
          roa: 8.7,
          dividendYield: 0.35,
          debtToEquity: 0.42,
          currentRatio: 1.8,
          quickRatio: 1.5,
          interestCoverage: 12.5,
          bookValuePerShare: 687,
          priceToSales: 4.2,
          enterpriseValue: '21,45,678 Cr',
          evToEbitda: 18.5,
          grossMargin: 65.2,
          operatingMargin: 22.8,
          netMargin: 18.4,
          returnOnAssets: 8.7,
          returnOnEquity: 15.2,
          revenueGrowth: 15.0,
          earningsGrowth: 12.3,
          logo: '/placeholder.svg',
          description: 'A leading technology company with diverse business interests across digital services, retail, and telecommunications. The company has established itself as a market leader in the Indian digital ecosystem.',
          businessSegments: [
            { segment: 'Digital Services', revenue: '45%', growth: '+18%' },
            { segment: 'Retail', revenue: '35%', growth: '+12%' },
            { segment: 'Telecommunications', revenue: '20%', growth: '+8%' }
          ],
          keyProducts: ['Digital Payment Platform', 'E-commerce Marketplace', '4G/5G Services'],
          competitors: ['PEER1', 'PEER2', 'PEER3'],
          managementTeam: [
            { name: 'CEO Name', position: 'Chief Executive Officer', experience: '15 years' },
            { name: 'CFO Name', position: 'Chief Financial Officer', experience: '12 years' }
          ]
        };

        const mockAiAnalysis = {
          sentiment: 'bullish',
          priceMovementExplanation: `Stock up 2.42% today following strong Q3 results announcement. Revenue grew 15% YoY driven by digital expansion and increased market share in key segments.`,
          technicalInsights: `Stock showing upward trend with RSI at 58 (neutral zone). Recently broke above resistance at ₹2,800. Support at ₹2,750, next resistance at ₹2,950. Volume above average indicating institutional interest.`,
          keyMetricsAnalysis: `P/E of 28.4x is above sector average but justified by superior growth profile (15% revenue growth vs sector 9%) and diversified business model. ROE of 15.2% indicates efficient capital utilization.`,
          riskFactors: [
            'Market volatility impact on tech valuations',
            'Regulatory changes in digital services sector', 
            'High capex requirements for 5G expansion',
            'Competitive pressure from global tech giants',
            'Currency fluctuation impact on international operations'
          ],
          opportunities: [
            'Growing digital adoption in India',
            'Expansion into new geographic markets',
            'AI and data analytics monetization',
            'Green energy transition initiatives'
          ],
          financialStrengths: [
            'Strong cash position of ₹1.2L Cr',
            'Consistent revenue growth over 5 years',
            'Diversified revenue streams',
            'Strong brand recognition and customer loyalty'
          ],
          managementQuality: 'Experienced leadership team with proven track record in scaling technology businesses. Strong corporate governance practices.',
          industryPosition: 'Market leader in digital services with #1 position in mobile subscribers and #2 in e-commerce GMV.',
          futureOutlook: 'Positive outlook driven by digital transformation trends, 5G rollout opportunities, and expanding retail footprint.'
        };

        const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
        const userRiskProfile = userProfile.riskTolerance || 'moderate';

        const mockPersonalizedInsights = {
          matchScore: userRiskProfile === 'conservative' ? 65 : userRiskProfile === 'moderate' ? 85 : 75,
          aiConfidence: 78,
          riskAssessment: 'Medium',
          suitabilityReason: userRiskProfile === 'conservative' 
            ? 'Moderate fit for conservative investors. Strong fundamentals but higher volatility than bonds. Consider for small allocation in growth portfolio.'
            : userRiskProfile === 'moderate'
            ? 'Excellent match! Quality growth stock with reasonable valuation for moderate risk profile. Strong market position and diversified revenue streams align well with your investment style.'
            : 'Good quality pick but may be less exciting for aggressive growth seekers. Consider for core holding with higher growth potential in emerging tech segments.',
          recommendation: `Suitable for ${userRiskProfile} risk investors seeking quality growth. Best for 3-5 year investment horizon based on your profile. Consider systematic investment approach.`,
          keyDrivers: [
            'Strong fundamentals with robust cash reserves of ₹1.2L Cr',
            'Growing market segment with 15% revenue CAGR',
            'Digital transformation driving operational efficiency',
            'Stable business model providing predictable cash flows',
            'Market leadership position in key segments'
          ],
          portfolioFit: userRiskProfile === 'conservative' 
            ? 'Can form 5-10% of equity allocation' 
            : userRiskProfile === 'moderate' 
            ? 'Can form 15-20% of equity portfolio' 
            : 'Can form 10-15% as core holding',
          investmentHorizon: '3-5 years recommended for optimal returns',
          entryStrategy: 'Consider systematic investment on market dips. Current levels offer reasonable entry point.',
          monitoringPoints: [
            'Quarterly revenue growth sustainability',
            'Market share trends in digital services',
            'Regulatory developments in telecom sector',
            'Competitive landscape changes'
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
