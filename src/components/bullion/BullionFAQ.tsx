import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { AlertCircle, TrendingUp, Receipt, Shield } from "lucide-react";

// General FAQs for new users / getting started
const generalFaqs = [
  {
    question: "What is digital gold & how is it stored?",
    answer: "Digital gold is 24K pure gold that you buy online. It is stored in bank-grade vaults operated by Brinks and Sequel Logistics. The storage is 100% insured against theft, damage, and natural disasters. You can track your holdings 24/7 in your vault.",
  },
  {
    question: "Is digital gold safer than physical gold?",
    answer: "Yes, in many ways. Digital gold eliminates risks of theft, storage hassle, and purity concerns. Your gold is stored in insured vaults with 24/7 security, and every gram is certified 24K pure. You also get full market value when selling, unlike physical gold which incurs melting deductions.",
  },
  {
    question: "Can I convert digital gold into coins or jewellery?",
    answer: "Yes! You can redeem your digital gold as coins (1g, 2g, 5g, 10g) or convert to jewelry through our partner jewelers like CaratLane, Kalyan, and Malabar Gold. Delivery charges apply.",
  },
  {
    question: "Is digital gold regulated by SEBI?",
    answer: "Digital gold is not regulated by SEBI or RBI. However, it is backed by physical 24K gold stored in insured vaults. We partner with Augmont, India's largest digital gold platform, which undergoes regular audits. We recommend investing only what you can afford and diversifying your investments.",
    hasWarning: true,
  },
  {
    question: "Why does gold price move daily?",
    answer: "Gold prices are determined by international markets and fluctuate based on global demand, currency movements (especially USD), inflation expectations, geopolitical events, and central bank policies. In India, import duties and GST also affect the final price.",
  },
  {
    question: "Why is silver more volatile than gold?",
    answer: "Silver has a smaller market compared to gold, making it more susceptible to price swings. Additionally, silver has significant industrial demand (electronics, solar panels), so economic cycles impact its price more. This volatility can mean higher gains but also higher risks.",
  },
  {
    question: "What affects gold prices in India?",
    answer: "Gold prices in India are influenced by international gold rates, USD/INR exchange rate, import duties (currently 15%), GST (3%), and local demand especially during wedding and festival seasons.",
  },
  {
    question: "What are the charges?",
    answer: "You pay the live gold rate + 3% GST on every purchase. There are no making charges, storage fees, or hidden costs. When selling, you receive the live sell rate directly in your bank account.",
  },
  {
    question: "Is there a lock-in period?",
    answer: "New purchases have a 48-hour lock-in period before they become sellable. This is a standard practice across all digital gold platforms to prevent fraud and ensure transaction settlement.",
  },
  {
    question: "How do I sell my gold?",
    answer: "Simply go to your vault, select the amount you want to sell, and confirm. The sale proceeds (minus applicable taxes) are transferred to your bank account within T+3 business days. Instant withdrawal is also available for a small fee.",
  },
  {
    question: "Myth: Gold only rises in Diwali season",
    answer: "This is a common misconception. While demand increases during festivals and wedding seasons, gold prices are primarily driven by global factors. Historical data shows gold has given consistent returns across all months, not just during Diwali. Smart investors use SIP to average out seasonal variations.",
    isMyth: true,
  },
  {
    question: "Myth: Digital gold is risky",
    answer: "Digital gold is actually safer than keeping physical gold at home. It's stored in insured bank-grade vaults, backed by real 24K gold, and you get the full market price when selling. The platform is audited regularly, and your holdings are tracked transparently. The only risk is market price fluctuation, which applies to all gold investments.",
    isMyth: true,
  },
];

// Investor-specific FAQs for portfolio management, tax, and selling
const investorFaqs = [
  {
    question: "How is capital gains tax calculated on digital gold?",
    answer: "Digital gold is treated as a capital asset. Short-term gains (held < 3 years) are taxed at your income slab rate. Long-term gains (> 3 years) are taxed at 20% with indexation benefit. GST paid during purchase cannot be claimed as input credit.",
    category: "tax",
  },
  {
    question: "Do I need to report digital gold in my ITR?",
    answer: "Yes, you must report digital gold holdings under 'Schedule AL' (Assets & Liabilities) if your total income exceeds ₹50 lakhs. Capital gains from selling must be reported under 'Capital Gains' schedule.",
    category: "tax",
  },
  {
    question: "Why is there a 48-hour lock-in on new purchases?",
    answer: "The 48-hour lock-in ensures payment settlement is complete before gold becomes sellable. This protects against payment failures, fraud, and ensures atomic transactions. Your locked gold is fully yours - it just can't be sold until the period ends.",
    category: "selling",
  },
  {
    question: "How do I get an invoice for my purchases?",
    answer: "Every purchase generates an invoice automatically. Go to Portfolio → Transaction History and click the download icon on any transaction to get your PDF invoice. Invoices include purchase weight, rate per gram, total amount, and GST details.",
    category: "portfolio",
  },
  {
    question: "Can I transfer my digital gold to someone else?",
    answer: "Yes, you can gift digital gold to friends and family. Go to the Gift option, enter the recipient's mobile number (they need a Discvr account), and specify the amount. A small convenience fee may apply for gifting.",
    category: "portfolio",
  },
  {
    question: "What happens if the platform shuts down?",
    answer: "Your gold is physically stored and backed 1:1 with custodians (Brinks, Sequel). Even if Discvr or Augmont shuts down, the physical gold remains yours. You can claim delivery or the gold will be liquidated and proceeds returned to you.",
    category: "safety",
  },
  {
    question: "How is my gold insured?",
    answer: "Your gold is 100% insured against theft, fire, natural disasters, and other risks by the vault custodians. The insurance covers the full market value of your holdings, not just the purchase price.",
    category: "safety",
  },
  {
    question: "Why is the sell rate lower than the buy rate?",
    answer: "The difference (called spread) covers operational costs - vault storage, insurance, payment processing, and platform fees. Typical spread is 2-4%. Unlike physical gold, there are no melting deductions or purity penalties.",
    category: "selling",
  },
  {
    question: "How long does it take to receive money after selling?",
    answer: "Sell proceeds are credited within T+3 business days to your linked bank account. Instant withdrawal is available for a small fee (₹5-25 depending on amount). Bank transfers are free but take longer.",
    category: "selling",
  },
  {
    question: "Can I use my gold as collateral for a loan?",
    answer: "Yes! You can pledge your digital gold to get instant loans at competitive rates (9-14% p.a.). Visit the Loans section to check your eligibility and get funds in minutes. Your gold continues to grow in value while pledged.",
    category: "portfolio",
  },
  {
    question: "What is SIP and should I use it?",
    answer: "Systematic Investment Plan (SIP) lets you invest a fixed amount daily, weekly, or monthly. It averages out price volatility (rupee cost averaging) and builds discipline. Recommended for long-term wealth building rather than timing the market.",
    category: "portfolio",
  },
  {
    question: "How do I track my gold's performance?",
    answer: "Your Portfolio dashboard shows total holdings, current value, invested amount, and P&L (profit/loss). You can also see detailed charts showing performance over time and compare with benchmark indices.",
    category: "portfolio",
  },
];

interface BullionFAQProps {
  showAll?: boolean;
  variant?: "general" | "investor" | "combined";
}

export function BullionFAQ({ showAll = false, variant = "general" }: BullionFAQProps) {
  // Select FAQs based on variant
  let faqs = generalFaqs;
  let title = "Frequently Asked Questions";
  
  if (variant === "investor") {
    faqs = investorFaqs;
    title = "Investor FAQs";
  } else if (variant === "combined") {
    // Show top general FAQs + investor FAQs
    faqs = [...generalFaqs.slice(0, 4), ...investorFaqs];
    title = "Frequently Asked Questions";
  }
  
  const displayFaqs = showAll ? faqs : faqs.slice(0, 6);

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case "tax":
        return <Receipt className="w-3 h-3 text-amber-500" />;
      case "portfolio":
        return <TrendingUp className="w-3 h-3 text-green-500" />;
      case "safety":
        return <Shield className="w-3 h-3 text-blue-500" />;
      default:
        return null;
    }
  };

  const getCategoryLabel = (category?: string) => {
    switch (category) {
      case "tax":
        return "Tax & Compliance";
      case "portfolio":
        return "Portfolio";
      case "selling":
        return "Selling";
      case "safety":
        return "Safety";
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      
      <Card className="overflow-hidden">
        <Accordion type="single" collapsible className="w-full">
          {displayFaqs.map((faq, index) => {
            const category = (faq as any).category;
            const categoryLabel = getCategoryLabel(category);
            
            return (
              <AccordionItem key={index} value={`item-${index}`} className="border-border/50">
                <AccordionTrigger className="px-4 text-left text-sm hover:no-underline">
                  <div className="flex items-center gap-2 flex-1">
                    <span>{faq.question}</span>
                    {categoryLabel && (
                      <span className="ml-auto mr-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted text-[10px] font-medium text-muted-foreground">
                        {getCategoryIcon(category)}
                        {categoryLabel}
                      </span>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  {(faq as any).hasWarning && (
                    <div className="flex items-start gap-2 p-3 mb-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
                      <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-200/80">
                        Important: Digital gold is not a SEBI-regulated product. Please invest responsibly.
                      </p>
                    </div>
                  )}
                  {(faq as any).isMyth && (
                    <div className="flex items-start gap-2 p-3 mb-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
                      <AlertCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-blue-200/80">
                        Myth Busted!
                      </p>
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </Card>
    </div>
  );
}
