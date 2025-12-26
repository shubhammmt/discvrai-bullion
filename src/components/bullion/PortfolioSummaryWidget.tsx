import { Wallet, TrendingUp, TrendingDown, Clock, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Transaction {
  id: string;
  type: "buy" | "sell";
  metal: "gold" | "silver";
  grams: number;
  amount: number;
  date: string;
}

interface PortfolioSummaryWidgetProps {
  goldHoldings: number;
  silverHoldings: number;
  goldPrice: number;
  silverPrice: number;
  transactions: Transaction[];
  onViewVault: () => void;
}

export function PortfolioSummaryWidget({
  goldHoldings,
  silverHoldings,
  goldPrice,
  silverPrice,
  transactions,
  onViewVault,
}: PortfolioSummaryWidgetProps) {
  const goldValue = goldHoldings * goldPrice;
  const silverValue = silverHoldings * silverPrice;
  const totalValue = goldValue + silverValue;
  
  // Mock P&L for demo
  const todayPnL = 234.50;
  const todayPnLPercent = 1.2;
  const isPositive = todayPnL >= 0;

  const recentTransactions = transactions.slice(0, 3);

  return (
    <div className="space-y-4">
      {/* Portfolio Value */}
      <Card className="p-4 bg-gradient-to-br from-primary/5 to-transparent">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Wallet className="w-4 h-4 text-primary" />
            </div>
            <span className="text-sm font-medium">Your Portfolio</span>
          </div>
          <Button variant="ghost" size="sm" onClick={onViewVault} className="text-xs">
            View All <ChevronRight className="w-3 h-3 ml-1" />
          </Button>
        </div>

        <div className="text-2xl font-bold mb-1">
          ₹{totalValue.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
        </div>

        <div className={`flex items-center gap-1 text-sm ${isPositive ? "text-emerald-400" : "text-red-400"}`}>
          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {isPositive ? "+" : ""}₹{Math.abs(todayPnL).toFixed(2)} ({todayPnLPercent.toFixed(2)}%) today
        </div>
      </Card>

      {/* Holdings Breakdown */}
      <Card className="p-4">
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wide">Holdings</h4>
        
        <div className="space-y-3">
          {/* Gold */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">🪙</span>
              <div>
                <div className="text-sm font-medium">Gold</div>
                <div className="text-xs text-muted-foreground">{goldHoldings}g</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">₹{goldValue.toLocaleString("en-IN", { minimumFractionDigits: 0 })}</div>
              <div className="text-xs text-emerald-400">+0.72%</div>
            </div>
          </div>

          {/* Silver */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">🥈</span>
              <div>
                <div className="text-sm font-medium">Silver</div>
                <div className="text-xs text-muted-foreground">{silverHoldings}g</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">₹{silverValue.toLocaleString("en-IN", { minimumFractionDigits: 0 })}</div>
              <div className="text-xs text-red-400">-1.63%</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Recent Transactions */}
      <Card className="p-4">
        <h4 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wide flex items-center gap-1">
          <Clock className="w-3 h-3" /> Recent Activity
        </h4>
        
        {recentTransactions.length > 0 ? (
          <div className="space-y-2">
            {recentTransactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    tx.type === "buy" ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                  }`}>
                    {tx.type === "buy" ? "+" : "-"}
                  </div>
                  <div>
                    <div className="text-sm font-medium capitalize">{tx.type} {tx.metal}</div>
                    <div className="text-xs text-muted-foreground">{tx.date}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm">{tx.grams}g</div>
                  <div className="text-xs text-muted-foreground">₹{tx.amount.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-sm text-muted-foreground">
            No transactions yet. Start investing!
          </div>
        )}
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-2">
        <Card className="p-3 text-center">
          <div className="text-lg font-bold">{goldHoldings + silverHoldings}g</div>
          <div className="text-xs text-muted-foreground">Total Holdings</div>
        </Card>
        <Card className="p-3 text-center">
          <div className="text-lg font-bold">{transactions.length}</div>
          <div className="text-xs text-muted-foreground">Transactions</div>
        </Card>
      </div>
    </div>
  );
}
