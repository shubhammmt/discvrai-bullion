import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield } from "lucide-react";
import { TransactionCard } from "./TransactionCard";

interface Transaction {
  id: string;
  type: "buy" | "sell";
  metal: "gold" | "silver";
  grams: number;
  amount: number;
  date: string;
  status: "success" | "pending";
}

interface PortfolioVaultProps {
  goldHoldings: number;
  silverHoldings: number;
  goldPrice: number;
  silverPrice: number;
  transactions: Transaction[];
}

export function PortfolioVault({
  goldHoldings,
  silverHoldings,
  goldPrice,
  silverPrice,
  transactions,
}: PortfolioVaultProps) {
  const [activeTab, setActiveTab] = useState("holdings");

  const goldValue = goldHoldings * goldPrice;
  const silverValue = silverHoldings * silverPrice;
  const totalValue = goldValue + silverValue;

  return (
    <div className="space-y-6">
      {/* Vault Visual */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700/50">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        
        <div className="relative p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Your Vault</h2>
              <p className="text-sm text-slate-400">Secure digital storage</p>
            </div>
          </div>

          {/* Total Value */}
          <div className="mb-6">
            <p className="text-sm text-slate-400 mb-1">Total Portfolio Value</p>
            <p className="text-4xl font-bold text-white">
              ₹{totalValue.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </p>
          </div>

          {/* Holdings Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">🪙</span>
                <span className="text-amber-400 font-medium">Gold</span>
              </div>
              <p className="text-2xl font-bold text-white">{goldHoldings.toFixed(4)}g</p>
              <p className="text-sm text-slate-400">₹{goldValue.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</p>
            </div>
            
            <div className="p-4 rounded-xl bg-slate-400/10 border border-slate-400/30">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">🥈</span>
                <span className="text-slate-300 font-medium">Silver</span>
              </div>
              <p className="text-2xl font-bold text-white">{silverHoldings.toFixed(4)}g</p>
              <p className="text-sm text-slate-400">₹{silverValue.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Transaction Details */}
      <div className="bg-white rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-black mb-6">Transaction Details</h2>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="holdings">Passbook</TabsTrigger>
            <TabsTrigger value="sips">Active SIPs</TabsTrigger>
          </TabsList>

          <TabsContent value="holdings" className="mt-0">
            {transactions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No transactions yet</p>
                <p className="text-sm">Your transaction history will appear here</p>
              </div>
            ) : (
              <div className="space-y-2">
                {transactions.map((tx) => (
                  <TransactionCard
                    key={tx.id}
                    transaction={tx}
                    goldPrice={goldPrice}
                    silverPrice={silverPrice}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="sips" className="mt-0">
            <div className="text-center py-8 text-muted-foreground">
              <p>No active SIPs</p>
              <p className="text-sm">Start a SIP to see it here</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
