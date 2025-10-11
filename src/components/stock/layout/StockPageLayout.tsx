import React, { useState, useRef, useEffect } from 'react';
import { StockData } from '@/data/stockMockData';
import StockHeader from './StockHeader';
import StockTabNavigation from './StockTabNavigation';
import StockSections from './StockSections';

interface StockPageLayoutProps {
  symbol: string;
  stockData: StockData;
}

export type TabType = 'overview' | 'technicals' | 'forecast' | 'peers' | 'financials' | 'shareholdings' | 'news';

const StockPageLayout: React.FC<StockPageLayoutProps> = ({ symbol, stockData }) => {
  const [activeSection, setActiveSection] = useState<TabType>('overview');
  
  // Create refs for each section
  const sectionRefs = {
    overview: useRef<HTMLDivElement>(null),
    technicals: useRef<HTMLDivElement>(null),
    forecast: useRef<HTMLDivElement>(null),
    peers: useRef<HTMLDivElement>(null),
    financials: useRef<HTMLDivElement>(null),
    shareholdings: useRef<HTMLDivElement>(null),
    news: useRef<HTMLDivElement>(null)
  };

  // Intersection Observer to track which section is in view
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50px 0px -50px 0px', // Small margin to avoid rapid switching
      threshold: 0.1
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const intersectingEntries = entries.filter(entry => entry.isIntersecting);
      
      if (intersectingEntries.length > 0) {
        // Find the section that's most prominently visible
        let mostVisible = intersectingEntries[0];
        let maxVisibility = 0;
        
        intersectingEntries.forEach(entry => {
          const rect = entry.boundingClientRect;
          const viewportHeight = window.innerHeight;
          
          // Calculate how much of the section is visible in the viewport
          const visibleTop = Math.max(0, rect.top);
          const visibleBottom = Math.min(viewportHeight, rect.bottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          const visibilityRatio = visibleHeight / viewportHeight;
          
          if (visibilityRatio > maxVisibility) {
            maxVisibility = visibilityRatio;
            mostVisible = entry;
          }
        });
        
        const sectionId = mostVisible.target.id as TabType;
        console.log('Setting active section to:', sectionId, 'visibility:', maxVisibility);
        setActiveSection(sectionId);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (section: TabType) => {
    const element = sectionRefs[section].current;
    if (element) {
      const headerOffset = 140; // Account for sticky tab navigation only
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Stock Price Header */}
      <StockHeader stockData={stockData} />
      
      {/* Section Navigation */}
      <StockTabNavigation activeTab={activeSection} onTabChange={scrollToSection} />
      
      {/* Main Content - All Sections */}
      <StockSections symbol={symbol} sectionRefs={sectionRefs} />
    </div>
  );
};

export default StockPageLayout;
