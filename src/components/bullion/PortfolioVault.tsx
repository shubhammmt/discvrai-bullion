import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Download, TrendingUp, TrendingDown, Clock, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

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

  const handleDownloadInvoice = (transactionId: string) => {
    toast.success("Invoice download started");
  };

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

      {/* Transaction History */}
      <Card className="border-border/50">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="p-4 border-b border-border/50">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="holdings">Passbook</TabsTrigger>
              <TabsTrigger value="sips">Active SIPs</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="holdings" className="p-4 space-y-3">
            {transactions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No transactions yet</p>
                <p className="text-sm">Your transaction history will appear here</p>
              </div>
            ) : (
              transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      tx.type === "buy" 
                        ? "bg-emerald-500/20" 
                        : "bg-red-500/20"
                    }`}>
                      {tx.type === "buy" ? (
                        <TrendingUp className={`w-5 h-5 ${tx.type === "buy" ? "text-emerald-400" : "text-red-400"}`} />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-red-400" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium capitalize">{tx.type} {tx.metal}</p>
                      <p className="text-sm text-muted-foreground">{tx.date}</p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <div>
                      <p className="font-semibold">{tx.grams.toFixed(4)}g</p>
                      <p className={`text-sm ${tx.type === "buy" ? "text-red-400" : "text-emerald-400"}`}>
                        {tx.type === "buy" ? "-" : "+"}₹{tx.amount.toLocaleString("en-IN")}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {tx.status === "success" ? (
                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Success
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/30">
                          <Clock className="w-3 h-3 mr-1" />
                          Pending
                        </Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDownloadInvoice(tx.id)}
                        className="h-8 w-8"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="sips" className="p-4">
            <div className="text-center py-8 text-muted-foreground">
              <p>No active SIPs</p>
              <p className="text-sm">Start a SIP to see it here</p>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
