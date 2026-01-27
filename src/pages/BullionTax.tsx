import { useState } from "react";
import { ArrowLeft, Bell, User, FileText, Download, Calculator, Calendar, TrendingUp, AlertCircle, CheckCircle2, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { BullionNavTabs, BullionMobileMenu } from "@/components/bullion";

// Mock tax data
const gstSummary = {
  totalPurchases: 125000,
  totalGST: 3750,
  cgst: 1875,
  sgst: 1875,
  transactions: 12,
};

const capitalGains = {
  shortTerm: {
    gains: 2500,
    tax: 750,
    holdingPeriod: "< 3 years",
    taxRate: "30%",
  },
  longTerm: {
    gains: 8500,
    tax: 1700,
    holdingPeriod: "> 3 years",
    taxRate: "20% with indexation",
  },
};

const taxTransactions = [
  {
    id: "1",
    date: "Jan 15, 2025",
    type: "Buy",
    metal: "Gold",
    amount: 25000,
    gst: 750,
    status: "paid",
  },
  {
    id: "2",
    date: "Jan 10, 2025",
    type: "Sell",
    metal: "Gold",
    amount: 30000,
    capitalGain: 2500,
    gainType: "STCG",
    status: "taxable",
  },
  {
    id: "3",
    date: "Dec 28, 2024",
    type: "Buy",
    metal: "Silver",
    amount: 15000,
    gst: 450,
    status: "paid",
  },
];

export default function BullionTax() {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState("2024-25");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BullionMobileMenu />
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="lg:flex hidden">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="font-bold text-lg">Discvr Bullion</h1>
              <p className="text-xs text-muted-foreground">Digital Gold & Silver</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate("/bullion/profile")}>
              <User className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Desktop Navigation Tabs */}
      <BullionNavTabs />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Tax & Compliance</h1>
              <p className="text-muted-foreground">GST tracking and capital gains reports</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024-25">FY 2024-25</SelectItem>
                <SelectItem value="2023-24">FY 2023-24</SelectItem>
                <SelectItem value="2022-23">FY 2022-23</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <IndianRupee className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total GST Paid</p>
                <p className="text-2xl font-bold">₹{gstSummary.totalGST.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">On ₹{gstSummary.totalPurchases.toLocaleString()} purchases</span>
              <Badge variant="outline">{gstSummary.transactions} txns</Badge>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Short-Term Gains</p>
                <p className="text-2xl font-bold">₹{capitalGains.shortTerm.gains.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax @ {capitalGains.shortTerm.taxRate}</span>
              <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                ₹{capitalGains.shortTerm.tax} due
              </Badge>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Long-Term Gains</p>
                <p className="text-2xl font-bold">₹{capitalGains.longTerm.gains.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{capitalGains.longTerm.taxRate}</span>
              <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                ₹{capitalGains.longTerm.tax} due
              </Badge>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="gst" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="gst">GST Details</TabsTrigger>
            <TabsTrigger value="capital">Capital Gains</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>

          <TabsContent value="gst" className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">GST Breakdown</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted/30">
                    <p className="text-sm text-muted-foreground mb-1">CGST (1.5%)</p>
                    <p className="text-2xl font-bold">₹{gstSummary.cgst.toLocaleString()}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30">
                    <p className="text-sm text-muted-foreground mb-1">SGST (1.5%)</p>
                    <p className="text-2xl font-bold">₹{gstSummary.sgst.toLocaleString()}</p>
                  </div>
                </div>
                <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">Total GST for FY {selectedYear}</p>
                    <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">₹{gstSummary.totalGST.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground mt-2">3% on all purchases</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-medium mb-1">GST on Digital Gold/Silver</h4>
                  <p className="text-sm text-muted-foreground">
                    GST at 3% is charged on all gold and silver purchases. This includes 1.5% CGST and 1.5% SGST/UTGST. 
                    The GST is included in the purchase price and is automatically calculated and collected.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="capital" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Badge className="bg-amber-100 text-amber-700">STCG</Badge>
                  Short-Term Capital Gains
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Applicable when gold/silver is sold within 3 years of purchase. Taxed at your income tax slab rate.
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total STCG</span>
                    <span className="font-semibold">₹{capitalGains.shortTerm.gains.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax Rate</span>
                    <span className="font-semibold">{capitalGains.shortTerm.taxRate}</span>
                  </div>
                  <div className="flex justify-between border-t pt-3">
                    <span className="text-muted-foreground">Estimated Tax</span>
                    <span className="font-bold text-amber-600">₹{capitalGains.shortTerm.tax.toLocaleString()}</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Badge className="bg-emerald-100 text-emerald-700">LTCG</Badge>
                  Long-Term Capital Gains
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Applicable when gold/silver is sold after 3 years. Taxed at 20% with indexation benefit.
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total LTCG</span>
                    <span className="font-semibold">₹{capitalGains.longTerm.gains.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax Rate</span>
                    <span className="font-semibold">{capitalGains.longTerm.taxRate}</span>
                  </div>
                  <div className="flex justify-between border-t pt-3">
                    <span className="text-muted-foreground">Estimated Tax</span>
                    <span className="font-bold text-emerald-600">₹{capitalGains.longTerm.tax.toLocaleString()}</span>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <div className="flex items-start gap-3">
                <Calculator className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium mb-1">Indexation Benefit</h4>
                  <p className="text-sm text-muted-foreground">
                    For long-term gains, you can use the Cost Inflation Index (CII) to adjust your purchase price for inflation, 
                    effectively reducing your taxable gains. This benefit is automatically applied in our calculations.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4">
            {taxTransactions.map((tx) => (
              <Card key={tx.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{tx.type} {tx.metal}</span>
                        {tx.gainType && (
                          <Badge variant="outline" className="text-xs">{tx.gainType}</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{tx.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{tx.amount.toLocaleString()}</p>
                    {tx.gst && (
                      <p className="text-sm text-muted-foreground">GST: ₹{tx.gst}</p>
                    )}
                    {tx.capitalGain && (
                      <p className="text-sm text-amber-600">Gain: ₹{tx.capitalGain}</p>
                    )}
                  </div>
                  <div>
                    {tx.status === "paid" ? (
                      <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Paid
                      </Badge>
                    ) : (
                      <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Taxable
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            ))}

            <div className="text-center pt-4">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download Full Statement
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
