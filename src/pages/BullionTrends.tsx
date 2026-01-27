import { useState } from "react";
import { ArrowLeft, Gem, Scale, TrendingUp, Heart, Share2, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BullionNavTabs, BullionMobileMenu } from "@/components/bullion";

// Mock jewellery designs data
const jewelleryDesigns = [
  {
    id: 1,
    name: "Kundan Bridal Set",
    category: "Bridal",
    weight: 45.5,
    makingChargePercent: 18,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
    trending: true,
    likes: 1240,
  },
  {
    id: 2,
    name: "Temple Gold Necklace",
    category: "Traditional",
    weight: 32.0,
    makingChargePercent: 14,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop",
    trending: true,
    likes: 890,
  },
  {
    id: 3,
    name: "Diamond Mangalsutra",
    category: "Modern",
    weight: 8.5,
    makingChargePercent: 25,
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400&h=400&fit=crop",
    trending: false,
    likes: 654,
  },
  {
    id: 4,
    name: "Antique Gold Bangles",
    category: "Traditional",
    weight: 28.0,
    makingChargePercent: 12,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop",
    trending: true,
    likes: 1102,
  },
  {
    id: 5,
    name: "Rose Gold Ring Set",
    category: "Modern",
    weight: 6.2,
    makingChargePercent: 20,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
    trending: false,
    likes: 432,
  },
  {
    id: 6,
    name: "Polki Choker",
    category: "Bridal",
    weight: 52.0,
    makingChargePercent: 22,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
    trending: true,
    likes: 1567,
  },
];

const categories = ["All", "Bridal", "Traditional", "Modern", "Daily Wear"];

export default function BullionTrends() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  const [calcGoldRate] = useState(6250); // Current gold rate per gram
  
  // Filter designs
  const filteredDesigns = jewelleryDesigns.filter(design => {
    const matchesCategory = selectedCategory === "All" || design.category === selectedCategory;
    const matchesSearch = design.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BullionMobileMenu />
            <Button variant="ghost" size="icon" onClick={() => navigate("/bullion")} className="lg:flex hidden">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="font-bold text-lg flex items-center gap-2">
                <Gem className="w-5 h-5 text-amber-500" />
                Jewellery Trends
              </h1>
              <p className="text-xs text-muted-foreground">Latest designs & price comparison</p>
            </div>
          </div>
        </div>
      </header>

      {/* Desktop Navigation */}
      <BullionNavTabs />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <Tabs defaultValue="designs" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="designs" className="flex items-center gap-2">
              <Gem className="w-4 h-4" />
              Designs
            </TabsTrigger>
            <TabsTrigger value="compare" className="flex items-center gap-2">
              <Scale className="w-4 h-4" />
              Compare
            </TabsTrigger>
          </TabsList>

          {/* Latest Designs Tab */}
          <TabsContent value="designs" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search designs..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(cat)}
                    className="whitespace-nowrap"
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>

            {/* Trending Banner */}
            <Card className="p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Trending This Week</h3>
                  <p className="text-xs text-muted-foreground">Temple jewellery & Polki designs are most searched</p>
                </div>
              </div>
            </Card>

            {/* Designs Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredDesigns.map((design, index) => (
                <motion.div
                  key={design.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                    <div className="relative aspect-square">
                      <img 
                        src={design.image} 
                        alt={design.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {design.trending && (
                        <Badge className="absolute top-2 left-2 bg-amber-500 text-black text-[10px]">
                          Trending
                        </Badge>
                      )}
                      <div className="absolute top-2 right-2 flex gap-1">
                        <Button size="icon" variant="secondary" className="w-7 h-7 bg-background/80 backdrop-blur-sm">
                          <Heart className="w-3.5 h-3.5" />
                        </Button>
                        <Button size="icon" variant="secondary" className="w-7 h-7 bg-background/80 backdrop-blur-sm">
                          <Share2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-sm truncate">{design.name}</h3>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-muted-foreground">{design.weight}g</span>
                        <span className="text-xs text-amber-500">{design.makingChargePercent}% making</span>
                      </div>
                      <div className="mt-2 pt-2 border-t border-border/50">
                        <p className="text-sm font-bold text-amber-500">
                          ₹{((design.weight * calcGoldRate) * (1 + design.makingChargePercent/100) * 1.03).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                        </p>
                        <p className="text-[10px] text-muted-foreground">Estimated price incl. GST</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Price Comparison Tab */}
          <TabsContent value="compare" className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Digital vs Physical Gold Price Comparison</h3>
              
              <div className="space-y-4">
                {/* Comparison Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="text-left py-3 text-sm font-medium text-muted-foreground">Component</th>
                        <th className="text-right py-3 text-sm font-medium text-muted-foreground">Digital Gold</th>
                        <th className="text-right py-3 text-sm font-medium text-muted-foreground">Physical Jewellery</th>
                        <th className="text-right py-3 text-sm font-medium text-amber-500">You Save</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border/30">
                        <td className="py-3 text-sm">Gold Rate (10g)</td>
                        <td className="py-3 text-sm text-right">₹62,505</td>
                        <td className="py-3 text-sm text-right">₹62,505</td>
                        <td className="py-3 text-sm text-right text-muted-foreground">—</td>
                      </tr>
                      <tr className="border-b border-border/30">
                        <td className="py-3 text-sm">Making Charges</td>
                        <td className="py-3 text-sm text-right text-emerald-500">₹0</td>
                        <td className="py-3 text-sm text-right">₹9,376 (15%)</td>
                        <td className="py-3 text-sm text-right text-emerald-500 font-medium">₹9,376</td>
                      </tr>
                      <tr className="border-b border-border/30">
                        <td className="py-3 text-sm">GST (3%)</td>
                        <td className="py-3 text-sm text-right">₹1,875</td>
                        <td className="py-3 text-sm text-right">₹2,156</td>
                        <td className="py-3 text-sm text-right text-emerald-500 font-medium">₹281</td>
                      </tr>
                      <tr className="border-b border-border/30">
                        <td className="py-3 text-sm">Storage Cost (Annual)</td>
                        <td className="py-3 text-sm text-right text-emerald-500">₹0</td>
                        <td className="py-3 text-sm text-right">₹2,000+</td>
                        <td className="py-3 text-sm text-right text-emerald-500 font-medium">₹2,000</td>
                      </tr>
                      <tr className="bg-muted/30">
                        <td className="py-3 text-sm font-semibold">Total for 10g</td>
                        <td className="py-3 text-sm text-right font-bold text-amber-500">₹64,380</td>
                        <td className="py-3 text-sm text-right font-bold">₹76,037</td>
                        <td className="py-3 text-sm text-right font-bold text-emerald-500">₹11,657</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Savings Highlight */}
                <Card className="p-4 bg-emerald-500/10 border-emerald-500/30">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <span className="text-lg">💰</span>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-emerald-500">15.3% Savings</p>
                      <p className="text-sm text-muted-foreground">By choosing digital gold over physical jewellery</p>
                    </div>
                  </div>
                </Card>

                {/* Making Charges by Category */}
                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Typical Making Charges by Category</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { category: "Plain Gold", range: "8-12%", color: "emerald" },
                      { category: "Temple", range: "12-16%", color: "blue" },
                      { category: "Kundan/Polki", range: "18-25%", color: "amber" },
                      { category: "Diamond", range: "20-30%", color: "purple" },
                    ].map((item) => (
                      <Card key={item.category} className="p-3 text-center">
                        <p className="text-xs text-muted-foreground">{item.category}</p>
                        <p className={`text-lg font-bold text-${item.color}-500`}>{item.range}</p>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

        </Tabs>
      </main>
    </div>
  );
}
