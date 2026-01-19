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
    question: "Is digital gold regulated by SEBI?",
    answer: "Digital gold is not regulated by SEBI or RBI. However, it is backed by physical 24K gold stored in insured vaults. We partner with Augmont, India's largest digital gold platform, which undergoes regular audits. We recommend investing only what you can afford and diversifying your investments.",
    hasWarning: true,
  },
  {
    question: "How is my gold stored?",
    answer: "Your gold is stored in bank-grade vaults operated by Brinks and Sequel Logistics. The storage is 100% insured against theft, damage, and natural disasters. You can track your holdings 24/7 in your vault.",
  },
  {
    question: "What are the charges?",
    answer: "You pay the live gold rate + 3% GST on every purchase. There are no making charges, storage fees, or hidden costs. When selling, you receive the live sell rate directly in your bank account.",
  },
  {
    question: "Can I convert digital gold to physical gold?",
    answer: "Yes! You can redeem your digital gold as coins (1g, 2g, 5g, 10g) or convert to jewelry through our partner jewelers like CaratLane, Kalyan, and Malabar Gold. Delivery charges apply.",
  },
  {
    question: "Is there a lock-in period?",
    answer: "New purchases have a 48-hour lock-in period before they become sellable. This is a standard practice across all digital gold platforms to prevent fraud and ensure transaction settlement.",
  },
  {
    question: "How do I sell my gold?",
    answer: "Simply go to your vault, select the amount you want to sell, and confirm. The sale proceeds (minus applicable taxes) are transferred to your bank account within T+3 business days. Instant withdrawal is also available for a small fee.",
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
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
    </div>
  );
}
