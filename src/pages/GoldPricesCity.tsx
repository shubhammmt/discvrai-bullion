import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Share2, ChevronRight } from "lucide-react";

const GoldPricesCity = () => {
  const { city } = useParams();
  const [selectedCarat, setSelectedCarat] = useState<"24k" | "22k">("24k");
  const [selectedCity, setSelectedCity] = useState(city || "delhi");

  const cities = [
    { value: "delhi", label: "Delhi" },
    { value: "mumbai", label: "Mumbai" },
    { value: "bangalore", label: "Bangalore" },
    { value: "chennai", label: "Chennai" },
    { value: "hyderabad", label: "Hyderabad" },
    { value: "kolkata", label: "Kolkata" },
    { value: "pune", label: "Pune" },
    { value: "ahmedabad", label: "Ahmedabad" },
    { value: "jaipur", label: "Jaipur" },
    { value: "lucknow", label: "Lucknow" },
    { value: "nagpur", label: "Nagpur" },
    { value: "surat", label: "Surat" },
    { value: "chandigarh", label: "Chandigarh" },
    { value: "indore", label: "Indore" },
    { value: "bhopal", label: "Bhopal" }
  ];

  const cityName = cities.find(c => c.value === selectedCity)?.label || "Delhi";

  // Mock data - will be replaced with API
  const currentRate24k = 11941.70;
  const currentRate22k = 10946.70;
  const yesterdayRate24k = 11942.70;
  const yesterdayRate22k = 10947.70;

  const priceData24k = [
    { gram: "1 Gram", today: currentRate24k, yesterday: yesterdayRate24k },
    { gram: "10 Gram", today: currentRate24k * 10, yesterday: yesterdayRate24k * 10 },
    { gram: "100 Gram", today: currentRate24k * 100, yesterday: yesterdayRate24k * 100 }
  ];

  const priceData22k = [
    { gram: "1 Gram", today: currentRate22k, yesterday: yesterdayRate22k },
    { gram: "10 Gram", today: currentRate22k * 10, yesterday: yesterdayRate22k * 10 },
    { gram: "100 Gram", today: currentRate22k * 100, yesterday: yesterdayRate22k * 100 }
  ];

  const monthlyData = [
    "Sep 2025", "Aug 2025", "Jul 2025", "Jun 2025", "May 2025", "Apr 2025"
  ];

  const last10DaysData = [
    { date: "6 Oct 2025", rate24k: 11941.70, change24k: -0.01, rate22k: 10946.70, change22k: -0.01 },
    { date: "5 Oct 2025", rate24k: 11942.70, change24k: 0.74, rate22k: 10947.70, change22k: 0.75 },
    { date: "4 Oct 2025", rate24k: 11854.70, change24k: 1.23, rate22k: 10866.70, change22k: 1.25 },
    { date: "3 Oct 2025", rate24k: 11709.70, change24k: -0.45, rate22k: 10733.70, change22k: -0.44 },
    { date: "2 Oct 2025", rate24k: 11762.70, change24k: 0.89, rate22k: 10782.70, change22k: 0.91 }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(price);
  };

  const calculateChange = (today: number, yesterday: number) => {
    const change = today - yesterday;
    const percentChange = ((change / yesterday) * 100).toFixed(2);
    return { change, percentChange };
  };

  const renderPriceChange = (today: number, yesterday: number) => {
    const { change, percentChange } = calculateChange(today, yesterday);
    const isPositive = change >= 0;
    return (
      <div className={isPositive ? "text-green-600" : "text-red-600"}>
        {isPositive ? "+" : ""}{change.toFixed(2)} ({isPositive ? "+" : ""}{percentChange}%)
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 md:py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/metals/gold" className="hover:text-foreground">Gold Rate Today</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">{cityName}</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Section */}
            <Card className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    Gold Rate Today in{" "}
                    <Select value={selectedCity} onValueChange={setSelectedCity}>
                      <SelectTrigger className="inline-flex w-auto border-b-2 border-t-0 border-x-0 rounded-none px-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city.value} value={city.value}>
                            {city.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </h1>
                  <p className="text-muted-foreground text-sm">Last updated on 6 Oct, 2025</p>
                </div>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div>
                  <div className="text-4xl md:text-5xl font-bold">
                    {formatPrice(selectedCarat === "24k" ? currentRate24k : currentRate22k)}/GM
                  </div>
                  <div className={`text-lg ${(selectedCarat === "24k" ? currentRate24k - yesterdayRate24k : currentRate22k - yesterdayRate22k) < 0 ? "text-red-600" : "text-green-600"}`}>
                    {(selectedCarat === "24k" ? currentRate24k - yesterdayRate24k : currentRate22k - yesterdayRate22k).toFixed(2)} 
                    ({(((selectedCarat === "24k" ? currentRate24k - yesterdayRate24k : currentRate22k - yesterdayRate22k) / (selectedCarat === "24k" ? yesterdayRate24k : yesterdayRate22k)) * 100).toFixed(2)}%)
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={selectedCarat === "24k" ? "default" : "outline"}
                    onClick={() => setSelectedCarat("24k")}
                  >
                    24 Carat
                  </Button>
                  <Button
                    variant={selectedCarat === "22k" ? "default" : "outline"}
                    onClick={() => setSelectedCarat("22k")}
                  >
                    22 Carat
                  </Button>
                </div>
              </div>

              <p className="text-muted-foreground">
                Gold has long been considered a reliable hedge against inflation, gaining favour among investors as a crucial investment. 
                At Discvr, we provide gold prices in {cityName} for informational purposes, updated regularly from reputable jewellers in the country. 
                Presently, the gold price in {cityName} stands at {formatPrice(currentRate24k)} per gram for 24 karat gold and {formatPrice(currentRate22k)} 
                for 22 karat gold, also known as hallmarked gold.
              </p>
            </Card>

            {/* 24K Gold Rate Table */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">24K Gold Rate in {cityName}</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 font-semibold">Gram</th>
                      <th className="text-right py-3 font-semibold">Today</th>
                      <th className="text-right py-3 font-semibold">Yesterday</th>
                    </tr>
                  </thead>
                  <tbody>
                    {priceData24k.map((row, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="py-4 font-medium">{row.gram}</td>
                        <td className="text-right py-4">
                          <div className="font-semibold">{formatPrice(row.today)}</div>
                          {renderPriceChange(row.today, row.yesterday)}
                        </td>
                        <td className="text-right py-4">
                          <div className="font-semibold">{formatPrice(row.yesterday)}</div>
                          {renderPriceChange(row.yesterday, row.yesterday - (row.today - row.yesterday))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* 22K Gold Rate Table */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">22K Gold Rate in {cityName}</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 font-semibold">Gram</th>
                      <th className="text-right py-3 font-semibold">Today</th>
                      <th className="text-right py-3 font-semibold">Yesterday</th>
                    </tr>
                  </thead>
                  <tbody>
                    {priceData22k.map((row, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="py-4 font-medium">{row.gram}</td>
                        <td className="text-right py-4">
                          <div className="font-semibold">{formatPrice(row.today)}</div>
                          {renderPriceChange(row.today, row.yesterday)}
                        </td>
                        <td className="text-right py-4">
                          <div className="font-semibold">{formatPrice(row.yesterday)}</div>
                          {renderPriceChange(row.yesterday, row.yesterday - (row.today - row.yesterday))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Gold Rate Analysis */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Gold Rate Analysis</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Highest in Oct</div>
                  <div className="text-2xl font-bold">{formatPrice(11942.70)}</div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Lowest in Oct</div>
                  <div className="text-2xl font-bold">{formatPrice(11709.70)}</div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Overall performance</div>
                  <div className="text-2xl font-bold text-green-600">Rising</div>
                </div>
              </div>
            </Card>

            {/* Monthly Historical Data */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Historical Gold Prices</h2>
              <Accordion type="single" collapsible className="w-full">
                {monthlyData.map((month, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`}>
                    <AccordionTrigger className="text-left">
                      Gold Price in {cityName}, {month}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="text-muted-foreground p-4">
                        Detailed day-by-day data for {month} will be displayed here
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <Button variant="link" className="mt-4">View More</Button>
            </Card>

            {/* Last 10 Days */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Gold Rates Over Last 10 Days</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 font-semibold">Date</th>
                      <th className="text-right py-3 font-semibold">24K Gold</th>
                      <th className="text-right py-3 font-semibold">22K Gold</th>
                    </tr>
                  </thead>
                  <tbody>
                    {last10DaysData.map((row, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="py-4 font-medium">{row.date}</td>
                        <td className="text-right py-4">
                          <div className="font-semibold">{formatPrice(row.rate24k)}</div>
                          <div className={row.change24k >= 0 ? "text-green-600" : "text-red-600"}>
                            {row.change24k >= 0 ? "+" : ""}{row.change24k}%
                          </div>
                        </td>
                        <td className="text-right py-4">
                          <div className="font-semibold">{formatPrice(row.rate22k)}</div>
                          <div className={row.change22k >= 0 ? "text-green-600" : "text-red-600"}>
                            {row.change22k >= 0 ? "+" : ""}{row.change22k}%
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* Invest in Gold Funds */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Invest in Gold Funds</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                    <TrendingUp className="w-8 h-8 text-primary" />
                    <div>
                      <div className="font-semibold">Gold ETFs</div>
                      <Badge variant="secondary" className="text-xs">No entry or exit loads</Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                    <TrendingUp className="w-8 h-8 text-primary" />
                    <div>
                      <div className="font-semibold">Gold Mutual Funds</div>
                      <Badge variant="secondary" className="text-xs">0% commission on direct funds</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium">Enter your mobile number to continue</label>
                  <Input placeholder="+91" className="mb-2" />
                  <p className="text-xs text-red-500">Enter a 10-digit valid mobile number.</p>
                  <Button className="w-full">Invest in Gold ETF</Button>
                  <p className="text-xs text-muted-foreground text-center">
                    By signing up you agree to our Terms and Conditions
                  </p>
                </div>
              </Card>

              {/* Quick Links */}
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Quick links</h3>
                <div className="space-y-2">
                  <Link to="#" className="block text-primary hover:underline">Invest in Gold Mutual Funds</Link>
                  <Link to="#" className="block text-primary hover:underline">Invest in Gold ETFs</Link>
                  <Link to="/metals/gold" className="block text-primary hover:underline">Gold Rates in India</Link>
                  
                  <div className="pt-4 border-t mt-4">
                    <h4 className="font-semibold mb-2">Gold Rates in Other Cities</h4>
                    <div className="space-y-1">
                      {cities.filter(c => c.value !== selectedCity).slice(0, 5).map(city => (
                        <Link 
                          key={city.value} 
                          to={`/metals/gold/${city.value}`} 
                          className="block text-sm text-primary hover:underline"
                        >
                          Gold Rates in {city.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoldPricesCity;
