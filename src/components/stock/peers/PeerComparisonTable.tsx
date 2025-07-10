import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PEER_COMPANIES } from '@/data/stockMockData';
import { PEER_CHART_DATA } from '@/data/chartMockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus, Minus, ArrowUpDown } from 'lucide-react';
import TrendIndicator from '../shared/TrendIndicator';
import { cn } from '@/lib/utils';

type SortField = 'symbol' | 'price' | 'marketCap' | 'pe' | 'pb' | 'roe' | 'roce';
type SortDirection = 'asc' | 'desc';

const PeerComparisonTable: React.FC = () => {
  const [selectedPeers, setSelectedPeers] = useState<string[]>(['LODHA', 'DLF', 'PRESTIGE']);
  const [sortField, setSortField] = useState<SortField>('marketCap');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const togglePeerSelection = (symbol: string) => {
    setSelectedPeers(prev => 
      prev.includes(symbol) 
        ? prev.filter(s => s !== symbol)
        : [...prev, symbol]
    );
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedPeers = [...PEER_COMPANIES].sort((a, b) => {
    let aValue: number | string;
    let bValue: number | string;

    switch (sortField) {
      case 'marketCap':
        aValue = parseFloat(a.marketCap.replace(/[^\d.]/g, ''));
        bValue = parseFloat(b.marketCap.replace(/[^\d.]/g, ''));
        break;
      default:
        aValue = a[sortField];
        bValue = b[sortField];
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
    
    return sortDirection === 'asc' ? Number(aValue) - Number(bValue) : Number(bValue) - Number(aValue);
  });

  // Prepare chart data
  const chartData = PEER_CHART_DATA.LODHA.map((point, index) => {
    const dataPoint: any = { date: point.date };
    selectedPeers.forEach(symbol => {
      if (PEER_CHART_DATA[symbol as keyof typeof PEER_CHART_DATA]) {
        dataPoint[symbol] = PEER_CHART_DATA[symbol as keyof typeof PEER_CHART_DATA][index]?.value;
      }
    });
    return dataPoint;
  });

  const getLineColor = (symbol: string, index: number) => {
    const colors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4'];
    return colors[index % colors.length];
  };

  const SortableHeader: React.FC<{ field: SortField; children: React.ReactNode }> = ({ field, children }) => (
    <th 
      className="text-left p-3 cursor-pointer hover:bg-muted/50 transition-colors group"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center gap-2">
        {children}
        <ArrowUpDown className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
        {sortField === field && (
          <span className="text-xs text-primary">
            {sortDirection === 'asc' ? '↑' : '↓'}
          </span>
        )}
      </div>
    </th>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-bold">Peers</h2>
        <Badge variant="outline">Real Estate Sector</Badge>
      </div>

      {/* Peer Comparison Table */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Peer Comparison</h3>
          <Button variant="outline" size="sm">
            Edit Fields
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3">Action</th>
                <SortableHeader field="symbol">Symbol</SortableHeader>
                <SortableHeader field="price">Price</SortableHeader>
                <SortableHeader field="marketCap">Market Cap</SortableHeader>
                <SortableHeader field="pe">P/E</SortableHeader>
                <SortableHeader field="pb">P/B</SortableHeader>
                <th className="text-left p-3">Div Yield (%)</th>
                <SortableHeader field="roe">ROE (%)</SortableHeader>
                <SortableHeader field="roce">ROCE (%)</SortableHeader>
                <th className="text-left p-3">ROA (%)</th>
              </tr>
            </thead>
            <tbody>
              {sortedPeers.map((peer, index) => (
                <tr 
                  key={peer.symbol} 
                  className={cn(
                    "border-b border-border hover:bg-muted/50 transition-colors",
                    peer.symbol === 'LODHA' && "bg-blue-50/50 dark:bg-blue-950/20"
                  )}
                >
                  <td className="p-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => togglePeerSelection(peer.symbol)}
                      className={cn(
                        "h-8 w-8 p-0",
                        selectedPeers.includes(peer.symbol) 
                          ? "bg-primary text-primary-foreground" 
                          : ""
                      )}
                    >
                      {selectedPeers.includes(peer.symbol) ? 
                        <Minus className="h-3 w-3" /> : 
                        <Plus className="h-3 w-3" />
                      }
                    </Button>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                        {peer.symbol.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{peer.symbol}</div>
                        <div className="text-xs text-muted-foreground truncate max-w-[100px]">
                          {peer.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div>
                      <div className="font-medium">₹{peer.price.toLocaleString('en-IN')}</div>
                      <TrendIndicator 
                        value={peer.changePercent} 
                        showIcon={true}
                        size="sm"
                        className="text-xs"
                      />
                    </div>
                  </td>
                  <td className="p-3 font-medium">{peer.marketCap}</td>
                  <td className="p-3">{peer.pe.toFixed(2)}</td>
                  <td className="p-3">{peer.pb.toFixed(2)}</td>
                  <td className="p-3">{peer.divYield.toFixed(2)}</td>
                  <td className="p-3">{peer.roe.toFixed(2)}</td>
                  <td className="p-3">{peer.roce.toFixed(2)}</td>
                  <td className="p-3">{peer.roa.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Price Chart Comparison */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Price Chart Comparison</h3>
          <div className="flex flex-wrap gap-2">
            {selectedPeers.map((symbol, index) => (
              <div key={symbol} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: getLineColor(symbol, index) }}
                />
                <span className="text-sm font-medium">{symbol}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                labelFormatter={(value) => new Date(value).toLocaleDateString('en-IN')}
                formatter={(value: number, name: string) => [
                  `₹${value?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, 
                  name
                ]}
              />
              {selectedPeers.map((symbol, index) => (
                <Line
                  key={symbol}
                  type="monotone"
                  dataKey={symbol}
                  stroke={getLineColor(symbol, index)}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default PeerComparisonTable;