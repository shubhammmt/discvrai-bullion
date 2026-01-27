import { Check, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const comparisons = [
  {
    aspect: "Making Charges",
    physical: "18-25% extra",
    digital: "0%",
    physicalBad: true,
  },
  {
    aspect: "Storage",
    physical: "Risk of theft, locker fees",
    digital: "Free insured vault",
    physicalBad: true,
  },
  {
    aspect: "Minimum Investment",
    physical: "₹5,000+",
    digital: "₹10",
    physicalBad: true,
  },
  {
    aspect: "Purity Guarantee",
    physical: "Trust jeweler",
    digital: "24K certified",
    physicalBad: true,
  },
  {
    aspect: "Selling",
    physical: "Visit jeweler, haggle",
    digital: "Instant, online",
    physicalBad: true,
  },
  {
    aspect: "Resale Value",
    physical: "Deduction on melting",
    digital: "Full market price",
    physicalBad: true,
  },
];

interface PhysicalVsDigitalProps {
  variant?: "table" | "cards";
}

export function PhysicalVsDigital({ variant = "table" }: PhysicalVsDigitalProps) {
  if (variant === "cards") {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Physical vs Digital Gold</h2>
        <div className="grid grid-cols-1 gap-3">
          {comparisons.map((item, index) => (
            <motion.div
              key={item.aspect}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-4">
                <p className="text-sm font-medium text-muted-foreground mb-2">{item.aspect}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-2">
                    {item.physicalBad ? (
                      <X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    ) : (
                      <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    )}
                    <div>
                      <p className="text-xs text-muted-foreground">Physical</p>
                      <p className="text-sm">{item.physical}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    {!item.physicalBad ? (
                      <X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    ) : (
                      <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    )}
                    <div>
                      <p className="text-xs text-muted-foreground">Digital</p>
                      <p className="text-sm">{item.digital}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // Table variant
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Physical vs Digital Gold</h2>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Aspect</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Physical Gold</th>
                <th className="text-left p-4 text-sm font-medium text-amber-500">Digital Gold ✨</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((item, index) => (
                <motion.tr
                  key={item.aspect}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-border/30 last:border-0"
                >
                  <td className="p-4 text-sm font-medium">{item.aspect}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {item.physicalBad ? (
                        <X className="w-4 h-4 text-red-400" />
                      ) : (
                        <Check className="w-4 h-4 text-emerald-400" />
                      )}
                      <span className="text-sm">{item.physical}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {item.physicalBad ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <span className="w-4 h-4 text-muted-foreground">—</span>
                      )}
                      <span className="text-sm">{item.digital}</span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
