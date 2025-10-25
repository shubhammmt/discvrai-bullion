import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

interface Headline {
  id: string;
  text: string;
  category: string;
  time: string;
}

const mockHeadlines: Headline[] = [
  { id: '1', text: 'Nifty 50 surges past 19,800 as IT stocks rally on strong Q3 earnings, banking sector shows mixed signals amid RBI policy expectations', category: 'Markets', time: '2h ago' },
  { id: '2', text: 'FII inflows hit $2.3B this week as India GDP growth outlook remains strong, rupee strengthens against dollar basket', category: 'Economy', time: '3h ago' },
  { id: '3', text: 'Top 10 mutual funds deliver 15%+ returns YTD, small-cap funds lead the charge with technology and pharma sectors outperforming', category: 'Mutual Funds', time: '4h ago' },
  { id: '4', text: 'Gold prices touch new highs at Rs 62,500 per 10g amid global uncertainties, silver gains 3% as precious metals shine in volatile markets', category: 'Commodities', time: '5h ago' },
  { id: '5', text: 'RBI maintains repo rate at 6.5%, signals data-dependent approach for future policy decisions as inflation remains within target range', category: 'Policy', time: '6h ago' },
];

const HeadlineScroller = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mockHeadlines.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const currentHeadline = mockHeadlines[currentIndex];

  return (
    <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-accent/20 border border-primary/30 rounded-lg p-6 shadow-lg">
      <div className="flex items-start gap-4">
        <div className="flex-1 min-h-[60px]">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold px-2 py-1 bg-primary/20 text-primary rounded-full">
              {currentHeadline.category}
            </span>
            <span className="text-xs text-muted-foreground">{currentHeadline.time}</span>
          </div>
          <p className="text-base font-medium leading-relaxed line-clamp-2">
            {currentHeadline.text}
          </p>
        </div>
        <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-1 animate-pulse" />
      </div>
      <div className="flex gap-1 mt-3">
        {mockHeadlines.map((_, idx) => (
          <div
            key={idx}
            className={`h-1 flex-1 rounded-full transition-all ${
              idx === currentIndex ? 'bg-primary' : 'bg-primary/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeadlineScroller;
