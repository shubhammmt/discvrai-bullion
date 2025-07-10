import React from 'react';
import { cn } from '@/lib/utils';
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Users, 
  FileText, 
  PieChart, 
  Presentation, 
  Newspaper 
} from 'lucide-react';
import { TabType } from './StockPageLayout';

interface StockTabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

interface TabItem {
  id: TabType;
  label: string;
  icon: React.ReactNode;
}

const tabs: TabItem[] = [
  { id: 'overview', label: 'Overview', icon: <BarChart3 className="h-4 w-4" /> },
  { id: 'technicals', label: 'Technicals', icon: <TrendingUp className="h-4 w-4" /> },
  { id: 'forecast', label: 'Forecast', icon: <Target className="h-4 w-4" /> },
  { id: 'peers', label: 'Peers', icon: <Users className="h-4 w-4" /> },
  { id: 'financials', label: 'Financials', icon: <FileText className="h-4 w-4" /> },
  { id: 'shareholdings', label: 'Shareholdings', icon: <PieChart className="h-4 w-4" /> },
  { id: 'projection', label: 'Projection', icon: <Presentation className="h-4 w-4" /> },
  { id: 'news', label: 'News', icon: <Newspaper className="h-4 w-4" /> }
];

const StockTabNavigation: React.FC<StockTabNavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden lg:block border-b border-border bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <nav className="flex space-x-8" aria-label="Stock sections">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "relative flex items-center gap-2 px-1 py-4 text-sm font-medium transition-colors",
                  "border-b-2 border-transparent",
                  "hover:text-foreground hover:border-border",
                  activeTab === tab.id
                    ? "text-primary border-primary"
                    : "text-muted-foreground"
                )}
              >
                {tab.icon}
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden border-b border-border bg-background">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-hide py-2">
            <nav className="flex space-x-6 min-w-max" aria-label="Stock sections">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={cn(
                    "flex flex-col items-center gap-1 px-3 py-2 text-xs font-medium transition-colors",
                    "rounded-lg min-w-[70px]",
                    activeTab === tab.id
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {tab.icon}
                  <span className="whitespace-nowrap">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default StockTabNavigation;