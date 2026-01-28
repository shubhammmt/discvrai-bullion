import { jsPDF } from "jspdf";
import { format } from "date-fns";

interface Transaction {
  id: string;
  type: "buy" | "sell" | "sip";
  metal: "gold" | "silver";
  grams: number;
  amount: number;
  date: string;
  status: "success" | "pending" | "failed";
}

export function generateInvoicePDF(
  transaction: Transaction,
  goldPrice: number,
  silverPrice: number
) {
  const doc = new jsPDF();
  const isGold = transaction.metal === "gold";
  const ratePerGram = isGold ? goldPrice : silverPrice;
  
  // Header
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("Invoice", 105, 30, { align: "center" });
  
  // Invoice details
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Invoice No: INV-${transaction.id.toUpperCase()}`, 20, 50);
  doc.text(`Date: ${transaction.date}`, 20, 58);
  doc.text(`Transaction Type: ${transaction.type.toUpperCase()}`, 20, 66);
  
  // Horizontal line
  doc.setDrawColor(200);
  doc.line(20, 75, 190, 75);
  
  // Transaction Details Header
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Transaction Details", 20, 90);
  
  // Table header
  doc.setFontSize(10);
  doc.setFillColor(245, 245, 245);
  doc.rect(20, 100, 170, 10, "F");
  doc.text("Description", 25, 107);
  doc.text("Quantity", 90, 107);
  doc.text("Rate", 125, 107);
  doc.text("Amount", 160, 107);
  
  // Table row
  doc.setFont("helvetica", "normal");
  const metalName = isGold ? "Digital Gold (24K)" : "Digital Silver (999)";
  doc.text(metalName, 25, 120);
  doc.text(`${transaction.grams.toFixed(4)} grams`, 90, 120);
  doc.text(`₹${ratePerGram.toLocaleString("en-IN", { minimumFractionDigits: 2 })}/g`, 125, 120);
  doc.text(`₹${transaction.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`, 160, 120);
  
  // Line under table
  doc.line(20, 130, 190, 130);
  
  // Total section
  doc.setFont("helvetica", "bold");
  doc.text("Total Amount:", 125, 145);
  doc.setFontSize(12);
  doc.text(`₹${transaction.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`, 160, 145);
  
  // Summary box
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setFillColor(250, 250, 250);
  doc.rect(20, 160, 170, 50, "F");
  doc.setDrawColor(220);
  doc.rect(20, 160, 170, 50, "S");
  
  doc.setFont("helvetica", "bold");
  doc.text("Summary", 25, 175);
  doc.setFont("helvetica", "normal");
  
  const summaryItems = [
    { label: "Metal Type:", value: isGold ? "Gold (24K Purity)" : "Silver (999 Purity)" },
    { label: "Weight Purchased:", value: `${transaction.grams.toFixed(4)} grams` },
    { label: "Rate per Gram:", value: `₹${ratePerGram.toLocaleString("en-IN", { minimumFractionDigits: 2 })}` },
    { label: "Total Amount:", value: `₹${transaction.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}` },
  ];
  
  summaryItems.forEach((item, index) => {
    doc.text(item.label, 25, 185 + (index * 8));
    doc.text(item.value, 100, 185 + (index * 8));
  });
  
  // Status badge
  doc.setFontSize(10);
  if (transaction.status === "success") {
    doc.setTextColor(34, 197, 94);
    doc.text("✓ Transaction Successful", 105, 230, { align: "center" });
  } else if (transaction.status === "pending") {
    doc.setTextColor(234, 179, 8);
    doc.text("⏳ Transaction Pending", 105, 230, { align: "center" });
  }
  doc.setTextColor(0, 0, 0);
  
  // Footer
  doc.setFontSize(8);
  doc.setTextColor(128);
  doc.text("This is a computer-generated invoice and does not require a signature.", 105, 270, { align: "center" });
  doc.text(`Generated on ${format(new Date(), "PPP 'at' p")}`, 105, 278, { align: "center" });
  
  // Download
  doc.save(`Invoice-${transaction.id}-${transaction.metal}.pdf`);
}
