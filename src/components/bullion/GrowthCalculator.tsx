import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Calculator, TrendingUp } from "lucide-react";

interface GrowthCalculatorProps {
  variant?: "default" | "compact";
}

export function GrowthCalculator({ variant = "default" }: GrowthCalculatorProps) {
  const [monthlyInvestment, setMonthlyInvestment] = useState(1000);
  
  // Historical average gold returns ~10% per year
  const annualReturn = 0.10;
  
  const calculateFutureValue = (years: number) => {
    const monthlyRate = annualReturn / 12;
    const months = years * 12;
    // Future Value of Annuity formula
    const fv = monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    return fv;
  };

  const totalInvested = (years: number) => monthlyInvestment * years * 12;

  const projections = [
    { years: 1, value: calculateFutureValue(1), invested: totalInvested(1) },
    { years: 3, value: calculateFutureValue(3), invested: totalInvested(3) },
    { years: 5, value: calculateFutureValue(5), invested: totalInvested(5) },
  ];

  if (variant === "compact") {
    return (
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Calculator className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Growth Calculator</span>
        </div>
        
        <div className="mb-3">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Monthly SIP</span>
            <span className="font-bold">₹{monthlyInvestment.toLocaleString()}</span>
          </div>
          <Slider
            value={[monthlyInvestment]}
            onValueChange={(v) => setMonthlyInvestment(v[0])}
            min={100}
            max={10000}
            step={100}
            className="cursor-pointer"
          />
        </div>

        <div className="text-center p-3 rounded-lg bg-primary/10">
          <p className="text-xs text-muted-foreground">In 5 years</p>
          <p className="text-lg font-bold text-primary">
            ₹{Math.round(calculateFutureValue(5)).toLocaleString()}
          </p>
          <p className="text-xs text-emerald-400">
            +₹{Math.round(calculateFutureValue(5) - totalInvested(5)).toLocaleString()} gains
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
          <Calculator className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold">Gold SIP Calculator</h3>
          <p className="text-sm text-muted-foreground">See your potential returns</p>
        </div>
      </div>

      {/* Slider */}
      <div className="mb-6">
        <div className="flex justify-between mb-3">
          <span className="text-sm text-muted-foreground">Monthly Investment</span>
          <span className="text-lg font-bold">₹{monthlyInvestment.toLocaleString()}</span>
        </div>
        <Slider
          value={[monthlyInvestment]}
          onValueChange={(v) => setMonthlyInvestment(v[0])}
          min={100}
          max={10000}
          step={100}
          className="cursor-pointer"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>₹100</span>
          <span>₹10,000</span>
        </div>
      </div>

      {/* Projections */}
      <div className="grid grid-cols-3 gap-3">
        {projections.map((proj) => (
          <div
            key={proj.years}
            className="p-4 rounded-xl bg-muted/50 text-center"
          >
            <p className="text-xs text-muted-foreground mb-1">{proj.years} Year{proj.years > 1 ? "s" : ""}</p>
            <p className="text-lg font-bold text-primary">
              ₹{Math.round(proj.value).toLocaleString()}
            </p>
            <div className="flex items-center justify-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3 text-emerald-400" />
              <span className="text-xs text-emerald-400">
                +₹{Math.round(proj.value - proj.invested).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-center text-muted-foreground mt-4">
        *Based on historical average gold returns of ~10% p.a. Actual returns may vary.
      </p>
    </Card>
  );
}
