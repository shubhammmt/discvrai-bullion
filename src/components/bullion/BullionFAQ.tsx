import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

const faqs = [
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

interface BullionFAQProps {
  showAll?: boolean;
}

export function BullionFAQ({ showAll = false }: BullionFAQProps) {
  const displayFaqs = showAll ? faqs : faqs.slice(0, 4);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Frequently Asked Questions</h2>
      
      <Card className="overflow-hidden">
        <Accordion type="single" collapsible className="w-full">
          {displayFaqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-border/50">
              <AccordionTrigger className="px-4 text-left text-sm hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                {faq.hasWarning && (
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
          ))}
        </Accordion>
      </Card>
    </div>
  );
}
