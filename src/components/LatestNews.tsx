
import React from 'react';
import { ExternalLink, Clock } from 'lucide-react';

interface NewsItem {
  title: string;
  source: string;
  time: string;
  summary: string;
  sentiment: 'positive' | 'negative' | 'neutral';
}

const LatestNews = () => {
  const newsItems: NewsItem[] = [
    {
      title: "Apple Reports Strong Q4 Earnings Beat",
      source: "Reuters",
      time: "2 hours ago",
      summary: "Revenue up 8% YoY driven by services growth and iPhone sales recovery",
      sentiment: "positive"
    },
    {
      title: "Analyst Upgrades AAPL to Buy Rating",
      source: "Morgan Stanley",
      time: "4 hours ago", 
      summary: "Citing strong fundamentals and AI integration opportunities",
      sentiment: "positive"
    },
    {
      title: "Supply Chain Concerns in China",
      source: "Bloomberg",
      time: "6 hours ago",
      summary: "Potential disruptions could impact manufacturing timelines",
      sentiment: "negative"
    }
  ];

  const sentimentColor = {
    positive: 'border-l-green-500 bg-green-50',
    negative: 'border-l-red-500 bg-red-50',
    neutral: 'border-l-gray-500 bg-gray-50'
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Latest News & Analysis</h2>
      <div className="space-y-3 sm:space-y-4">
        {newsItems.map((item, index) => (
          <div key={index} className={`border-l-4 p-3 sm:p-4 rounded-r-lg ${sentimentColor[item.sentiment]}`}>
            <div className="flex items-start justify-between mb-2 gap-2">
              <h3 className="font-semibold text-gray-900 text-sm leading-tight flex-1">{item.title}</h3>
              <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0 cursor-pointer hover:text-gray-600" />
            </div>
            <p className="text-gray-700 text-xs sm:text-sm mb-2 leading-relaxed">{item.summary}</p>
            <div className="flex items-center text-xs text-gray-500 flex-wrap gap-1">
              <span className="font-medium">{item.source}</span>
              <span className="hidden sm:inline">•</span>
              <div className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                <span>{item.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestNews;
