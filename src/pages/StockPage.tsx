import React from 'react';
import { useParams } from 'react-router-dom';
import StockPageLayout from '@/components/stock/layout/StockPageLayout';
import { LODHA_STOCK_DATA } from '@/data/stockMockData';

const StockPage: React.FC = () => {
  const { symbol } = useParams<{ symbol: string }>();
  
  // For now, we'll use LODHA data regardless of symbol
  // In a real app, this would fetch data based on the symbol
  const stockData = LODHA_STOCK_DATA;

  return (
    <div className="min-h-screen bg-background">
      <StockPageLayout symbol={symbol || 'LODHA'} stockData={stockData} />
    </div>
  );
};

export default StockPage;