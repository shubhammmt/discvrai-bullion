
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const StockQA = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const qaData = [
    {
      question: "Is AAPL a good long-term investment?",
      answer: "AAPL shows strong fundamentals with consistent cash generation, growing services revenue, and innovation in AI. However, consider market saturation and China dependency for long-term outlook."
    },
    {
      question: "Why is AAPL trading at a premium valuation?",
      answer: "AAPL's P/E of 28.5x reflects premium brand strength, ecosystem lock-in, high margins (25% net margin), and $162B cash position providing investment flexibility."
    },
    {
      question: "What are the main risks for AAPL investors?",
      answer: "Key risks include: China market dependency (19% of revenue), iPhone market saturation, regulatory pressures, and increased competition in services."
    },
    {
      question: "How does AAPL's dividend compare to peers?",
      answer: "AAPL yields 0.43% ($0.70 annual), lower than peers but growing consistently. Focus is on capital appreciation and buybacks rather than high dividend yield."
    },
    {
      question: "What's driving AAPL's services growth?",
      answer: "Services growing 16.9% YoY driven by App Store, iCloud, Apple Music, and Apple Pay adoption. Higher margins (70%+) make this the most profitable segment."
    }
  ];

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <HelpCircle className="w-5 h-5 text-purple-600" />
          Top Questions About AAPL
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {qaData.map((qa, index) => (
            <div key={index} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => toggleExpand(index)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900 text-sm">{qa.question}</span>
                {expandedIndex === index ? 
                  <ChevronUp className="w-4 h-4 text-gray-500" /> : 
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                }
              </button>
              {expandedIndex === index && (
                <div className="px-4 pb-4">
                  <p className="text-sm text-gray-700 leading-relaxed">{qa.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StockQA;
