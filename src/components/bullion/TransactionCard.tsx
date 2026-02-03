import { useState } from "react";
import { FileDown, ChevronDown, ChevronUp } from "lucide-react";
import { generateInvoicePDF } from "./InvoiceGenerator";
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

interface TransactionCardProps {
  transaction: Transaction;
  goldPrice: number;
  silverPrice: number;
}

export function TransactionCard({ transaction, goldPrice, silverPrice }: TransactionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isGold = transaction.metal === "gold";
  const ratePerGram = isGold ? goldPrice : silverPrice;

  // Tax calculations (assuming 3% GST for gold/silver)
  const taxRate = 3;
  const basePrice = transaction.amount / (1 + taxRate / 100);
  const taxAmount = transaction.amount - basePrice;

  const handleDownloadInvoice = (e: React.MouseEvent) => {
    e.stopPropagation();
    const txForPDF = {
      ...transaction,
      type: transaction.type as "buy" | "sell" | "sip",
      status: transaction.status as "success" | "pending" | "failed",
    };
    generateInvoicePDF(txForPDF, goldPrice, silverPrice);
    toast.success("Invoice downloaded successfully!");
  };

  return (
    <div className="relative pt-3 mb-6">
      {/* Floating Date Badge */}
      <div 
        className="absolute top-0 left-6 z-10 px-4 py-1.5 rounded-full text-white text-sm font-medium"
        style={{ backgroundColor: '#A89F73' }}
      >
        {transaction.date}
      </div>

      {/* Card Container */}
      <div 
        className="bg-black rounded-2xl p-6 pt-8 cursor-pointer transition-all duration-200 hover:bg-black/90"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* 3-Column Grid */}
        <div className="grid grid-cols-3 gap-4">
          {/* Column 1 - Left Aligned */}
          <div className="text-left">
            <p className="text-white text-sm mb-1">
              {transaction.type === "buy" ? "Purchased" : "Sold"} {isGold ? "Gold" : "Silver"}
            </p>
            <p className="text-2xl font-semibold" style={{ color: '#F4CE14' }}>
              {transaction.grams.toFixed(4)} g
            </p>
            {transaction.status === "success" && (
              <button
                onClick={handleDownloadInvoice}
                className="flex items-center gap-1.5 mt-2 group"
              >
                <FileDown className="w-4 h-4" style={{ color: '#F4CE14' }} />
                <span className="text-white text-sm group-hover:underline">
                  Download Invoice
                </span>
              </button>
            )}
          </div>

          {/* Column 2 - Center Aligned */}
          <div className="text-center">
            <p className="text-white text-sm mb-1">Total amount</p>
            <p className="text-2xl font-semibold" style={{ color: '#F4CE14' }}>
              ₹{transaction.amount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>

          {/* Column 3 - Right Aligned */}
          <div className="text-right">
            <p className="text-white text-sm mb-1">{isGold ? "Gold" : "Silver"} rate/g</p>
            <p className="text-2xl font-semibold" style={{ color: '#F4CE14' }}>
              ₹{ratePerGram.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* Expand/Collapse Indicator */}
        <div className="flex justify-center mt-4">
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-white/60" />
          ) : (
            <ChevronDown className="w-5 h-5 text-white/60" />
          )}
        </div>

        {/* Expanded Tax Details */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-white/20 grid grid-cols-2 gap-4">
            <div>
              <p className="text-white/60 text-xs mb-1">Base Price (excl. tax)</p>
              <p className="text-white font-medium">
                ₹{basePrice.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-white/60 text-xs mb-1">Tax Rate</p>
              <p className="text-white font-medium">{taxRate}% GST</p>
            </div>
            <div>
              <p className="text-white/60 text-xs mb-1">Tax Amount</p>
              <p className="text-white font-medium">
                ₹{taxAmount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-white/60 text-xs mb-1">Total Amount</p>
              <p className="font-semibold" style={{ color: '#F4CE14' }}>
                ₹{transaction.amount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}