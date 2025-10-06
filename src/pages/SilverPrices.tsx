import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield } from "lucide-react";

const SilverPrices = () => {
  const [selectedState, setSelectedState] = useState("delhi");

  const states = [
    { value: "andhra-pradesh", label: "Andhra Pradesh" },
    { value: "bihar", label: "Bihar" },
    { value: "chandigarh", label: "Chandigarh" },
    { value: "delhi", label: "Delhi" },
    { value: "gujarat", label: "Gujarat" },
    { value: "haryana", label: "Haryana" },
    { value: "karnataka", label: "Karnataka" },
    { value: "kerala", label: "Kerala" },
    { value: "maharashtra", label: "Maharashtra" },
    { value: "madhya-pradesh", label: "Madhya Pradesh" },
    { value: "odisha", label: "Odisha" },
    { value: "punjab", label: "Punjab" },
    { value: "rajasthan", label: "Rajasthan" },
    { value: "tamil-nadu", label: "Tamil Nadu" },
    { value: "telangana", label: "Telangana" },
    { value: "uttar-pradesh", label: "Uttar Pradesh" },
    { value: "west-bengal", label: "West Bengal" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Silver Prices in India</h1>
              <p className="text-muted-foreground">Live rates for 10g, 100g, and 1kg</p>
            </div>
          </div>

          <Card className="p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">Select State</label>
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a state" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state.value} value={state.value}>
                        {state.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button>Set Price Alert</Button>
              </div>
            </div>

            <div className="text-center py-8 text-muted-foreground">
              API Integration in progress - Silver prices will be displayed here
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Historical Price Chart</h3>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                Chart will be displayed here
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Latest Silver News</h3>
              <div className="space-y-4 text-muted-foreground">
                News cards will be displayed here
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SilverPrices;
