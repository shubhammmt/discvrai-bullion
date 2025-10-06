import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Award, Share2, TrendingDown, TrendingUp, ChevronDown } from "lucide-react";

const GoldPrices = () => {
  const [selectedCarat, setSelectedCarat] = useState<"24" | "22">("24");
  const [selectedMonth, setSelectedMonth] = useState("oct-2025");

  // Mock data - will be replaced with API
  const currentPrice = {
    price: 11956.30,
    change: -1.00,
    changePercent: -0.01,
    lastUpdated: "6 Oct, 2025"
  };

  const pricesByWeight = [
    { weight: "1 Gram", today: "₹11,956.30", yesterday: "₹11,957.30", change: -1.00, changePercent: -0.01 },
    { weight: "10 Gram", today: "₹1,19,563.00", yesterday: "₹1,19,573.00", change: -10.00, changePercent: -0.01 },
    { weight: "100 Gram", today: "₹11,95,630.00", yesterday: "₹11,95,730.00", change: -100.00, changePercent: -0.01 }
  ];

  const recentRates = [
    { date: "5 Oct 2025", gold24k: "₹1,19,573.00", change24k: 0.74, gold22k: "₹1,09,623.00", change22k: 0.74 },
    { date: "4 Oct 2025", gold24k: "₹1,18,693.00", change24k: -0.13, gold22k: "₹1,08,813.00", change22k: -0.14 },
    { date: "3 Oct 2025", gold24k: "₹1,18,853.00", change24k: -0.48, gold22k: "₹1,08,963.00", change22k: -0.47 },
    { date: "2 Oct 2025", gold24k: "₹1,19,423.00", change24k: 1.53, gold22k: "₹1,09,483.00", change22k: 1.53 }
  ];

  const majorCities = [
    { city: "Bangalore", gold24k: "₹1,19,572.00", gold22k: "₹1,09,622.00" },
    { city: "Bhubaneswar", gold24k: "₹1,19,410.00", gold22k: "₹1,09,460.00" },
    { city: "Chennai", gold24k: "₹1,19,556.00", gold22k: "₹1,09,606.00" },
    { city: "Coimbatore", gold24k: "₹1,19,556.00", gold22k: "₹1,09,606.00" },
    { city: "Delhi", gold24k: "₹1,19,563.00", gold22k: "₹1,09,613.00" },
    { city: "Hyderabad", gold24k: "₹1,19,419.00", gold22k: "₹1,09,469.00" }
  ];

  const citySidebarLinks = [
    "Gold Rates in Ahmedabad", "Gold Rates in Amritsar", "Gold Rates in Nagpur",
    "Gold Rates in Patna", "Gold Rates in Rajkot", "Gold Rates in Jaipur",
    "Gold Rates in Meerut", "Gold Rates in Chandigarh", "Gold Rates in Jalgaon"
  ];

  const newsItems = [
    {
      source: "Upstox",
      time: "17d",
      headline: "Commodity Market Updates, September 19: Crude oil declines; Silver, Gold futures rebound"
    },
    {
      source: "Upstox",
      time: "19d",
      headline: "MCX Gold and silver see profit booking ahead of US Fed policy decision; check today's trade setup"
    },
    {
      source: "Upstox",
      time: "19d",
      headline: "Commodity Market Updates, September 17: Crude oil, Aluminium decline; Gold futures fall"
    }
  ];

  const faqs = [
    {
      question: "How many grams of gold are present in one 'tola' of gold?",
      answer: "One tola of gold equals 11.66 grams. This traditional unit of measurement is still commonly used in India."
    },
    {
      question: "What is the difference between 22k and 24k gold?",
      answer: "24K gold is 99.9% pure gold, which is softer and used mainly for investment. 22K gold contains 91.6% pure gold mixed with other metals for durability, making it ideal for jewelry."
    },
    {
      question: "How is the gold rate in India determined?",
      answer: "Gold rates in India are influenced by international gold prices, currency exchange rates (USD to INR), import duties, local demand and supply, and making charges."
    },
    {
      question: "What do the terms hallmark, 916, and KDM in gold jewelry mean?",
      answer: "Hallmark certifies purity. 916 indicates 22K gold (91.6% purity). KDM is a soldering technique using cadmium, now banned in India."
    },
    {
      question: "What should I look out for when buying gold in India?",
      answer: "Check for BIS hallmark certification, verify purity, get proper bills, compare making charges, and buy from reputable jewelers."
    },
    {
      question: "How can I check the purity of gold in India",
      answer: "Look for BIS hallmark, use a gold testing kit, get it tested at a certified assaying center, or use electronic gold testers."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="text-sm text-muted-foreground mb-6">
            <a href="/" className="hover:text-foreground">Home</a>
            <span className="mx-2">›</span>
            <span className="text-foreground">Gold Rates</span>
          </div>

          <div className="grid lg:grid-cols-[1fr,350px] gap-8">
            {/* Main Content */}
            <div className="space-y-8">
              {/* Hero Section */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl md:text-4xl font-bold">Gold Rate Today in</h1>
                      <Select defaultValue="india">
                        <SelectTrigger className="w-32 border-b-2 border-primary">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="india">India</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <p className="text-sm text-muted-foreground">Last updated on {currentPrice.lastUpdated}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                </div>

                <div className="flex items-baseline gap-6 mb-4">
                  <div className="text-4xl font-bold">₹{currentPrice.price.toFixed(2)}/GM</div>
                  <div className={`flex items-center gap-1 text-lg font-semibold ${currentPrice.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {currentPrice.change >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                    {currentPrice.change} ({currentPrice.changePercent}%)
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant={selectedCarat === "24" ? "default" : "outline"}
                    onClick={() => setSelectedCarat("24")}
                    className="rounded-full"
                  >
                    24 Carat
                  </Button>
                  <Button
                    variant={selectedCarat === "22" ? "default" : "outline"}
                    onClick={() => setSelectedCarat("22")}
                    className="rounded-full"
                  >
                    22 Carat
                  </Button>
                </div>
              </div>

              {/* 24K Gold Rate Table */}
              <Card>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-4">24K Gold Rate in India</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-semibold">Gram</th>
                          <th className="text-left py-3 px-4 font-semibold">Today</th>
                          <th className="text-left py-3 px-4 font-semibold">Yesterday</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pricesByWeight.map((row, idx) => (
                          <tr key={idx} className={idx % 2 === 0 ? 'bg-muted/30' : ''}>
                            <td className="py-3 px-4">{row.weight}</td>
                            <td className="py-3 px-4">
                              <div>{row.today}</div>
                              <div className="text-sm text-red-600">
                                {row.change.toFixed(2)} ({row.changePercent}%)
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div>{row.yesterday}</div>
                              <div className="text-sm text-green-600">88.00 (0.74%)</div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Card>

              {/* Gold Investment Section */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Gold Investment in India</h2>
                <div className="flex gap-6 mb-4">
                  <div>
                    <div className="text-sm text-muted-foreground">24K Gold / 10 Grams</div>
                    <div className="text-2xl font-bold">₹1,19,563.00</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">22K Gold / 10 Grams</div>
                    <div className="text-2xl font-bold">₹1,09,613.00</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Difference in Physical Gold, Gold ETFs and Sovereign Gold Bonds</h3>
                  <p className="text-muted-foreground">
                    Investors can choose between physical gold, Gold Exchange Traded Funds (ETFs), and Sovereign Gold Bonds (SGBs). 
                    Each has its advantages concerning liquidity, safety, and ease of investment. Physical gold involves owning tangible 
                    gold in the form of bars, coins, or jewellery, allowing direct possession...
                  </p>
                  <Button variant="link" className="p-0 h-auto text-primary">Read More</Button>
                </div>
              </div>

              {/* Gold Rate Analysis */}
              <Card>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">Gold Rate Analysis</h2>
                    <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="oct-2025">Oct'25</SelectItem>
                        <SelectItem value="sep-2025">Sep'25</SelectItem>
                        <SelectItem value="aug-2025">Aug'25</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-semibold">Gold Rate</th>
                          <th className="text-left py-3 px-4 font-semibold">24K Gold</th>
                          <th className="text-left py-3 px-4 font-semibold">22K Gold</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentRates.map((row, idx) => (
                          <tr key={idx} className={idx % 2 === 0 ? 'bg-muted/30' : ''}>
                            <td className="py-3 px-4">{row.date}</td>
                            <td className="py-3 px-4">
                              <div>{row.gold24k}</div>
                              <div className={`text-sm ${row.change24k >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {row.change24k}%
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div>{row.gold22k}</div>
                              <div className={`text-sm ${row.change22k >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {row.change22k}%
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Card>

              {/* Month Wise Gold Rate */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Month Wise Gold Rate</h2>
                <Accordion type="single" collapsible defaultValue="oct-2025">
                  <AccordionItem value="oct-2025">
                    <AccordionTrigger className="text-lg font-semibold">
                      Gold Price in India, Oct 2025
                    </AccordionTrigger>
                    <AccordionContent>
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2 px-4">Rate</th>
                            <th className="text-left py-2 px-4">24K Gold / (10GM)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-2 px-4">Oct 1</td>
                            <td className="py-2 px-4">₹1,17,623.00</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 px-4">Oct 6</td>
                            <td className="py-2 px-4">₹1,19,563.00</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 px-4">Highest in Oct</td>
                            <td className="py-2 px-4">₹1,19,573.00</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2 px-4">Lowest in Oct</td>
                            <td className="py-2 px-4">₹1,17,623.00</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-4">Overall performance</td>
                            <td className="py-2 px-4 font-semibold">Rising</td>
                          </tr>
                        </tbody>
                      </table>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="sep-2025">
                    <AccordionTrigger className="text-lg font-semibold">
                      Gold Price in India, Sep 2025
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">September data will be loaded here...</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="aug-2025">
                    <AccordionTrigger className="text-lg font-semibold">
                      Gold Price in India, Aug 2025
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">August data will be loaded here...</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* Gold Rates Over Last 10 Days */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Gold Rates Over Last 10 Days</h2>
                <Card>
                  <div className="p-6">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 font-semibold">Date</th>
                            <th className="text-left py-3 px-4 font-semibold">24K Gold</th>
                            <th className="text-left py-3 px-4 font-semibold">22K Gold</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentRates.map((row, idx) => (
                            <tr key={idx} className={idx % 2 === 0 ? 'bg-muted/30' : ''}>
                              <td className="py-3 px-4">{row.date}</td>
                              <td className="py-3 px-4">
                                <div>{row.gold24k}</div>
                                <div className={`text-sm ${row.change24k >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {row.change24k}%
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <div>{row.gold22k}</div>
                                <div className={`text-sm ${row.change22k >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {row.change22k}%
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <Button variant="link" className="mt-4 p-0 text-primary">View More</Button>
                  </div>
                </Card>
              </div>

              {/* Gold Rates in Major Cities */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Gold Rates in Major Cities</h2>
                <Card>
                  <div className="p-6">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="text-left py-3 px-4 font-semibold">City</th>
                            <th className="text-left py-3 px-4 font-semibold">24K Gold</th>
                            <th className="text-left py-3 px-4 font-semibold">22K Gold</th>
                          </tr>
                        </thead>
                        <tbody>
                          {majorCities.map((city, idx) => (
                            <tr key={idx} className="border-b hover:bg-muted/30 cursor-pointer">
                              <td className="py-3 px-4">{city.city}</td>
                              <td className="py-3 px-4">{city.gold24k}</td>
                              <td className="py-3 px-4">{city.gold22k}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Card>
              </div>

              {/* FAQs */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible>
                  {faqs.map((faq, idx) => (
                    <AccordionItem key={idx} value={`faq-${idx}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              {/* What's in News */}
              <div>
                <Accordion type="single" collapsible defaultValue="news">
                  <AccordionItem value="news">
                    <AccordionTrigger className="text-2xl font-bold">
                      What's in news?
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid md:grid-cols-3 gap-4">
                        {newsItems.map((news, idx) => (
                          <Card key={idx} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-bold">
                                UP
                              </div>
                              <div className="text-sm">
                                <span className="font-medium">{news.source}</span>
                                <span className="text-muted-foreground"> • {news.time}</span>
                              </div>
                            </div>
                            <p className="text-sm">{news.headline}</p>
                          </Card>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Invest in Gold Funds */}
              <Card className="bg-gradient-to-br from-purple-600 to-purple-800 text-white">
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold">Invest in Gold Funds</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Award className="w-5 h-5 mt-1" />
                      <div>
                        <div className="font-semibold">Gold ETFs</div>
                        <div className="text-sm text-purple-100">No entry or exit loads</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Award className="w-5 h-5 mt-1" />
                      <div>
                        <div className="font-semibold">Gold Mutual Funds</div>
                        <div className="text-sm text-purple-100">0% commission on direct funds</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm">Enter your mobile number to continue</div>
                    <Input 
                      placeholder="+91" 
                      className="bg-white text-gray-900"
                    />
                    <p className="text-xs text-purple-200">Enter a 10-digit valid mobile number.</p>
                  </div>

                  <Button className="w-full bg-purple-500 hover:bg-purple-400">
                    Invest in Gold ETF
                  </Button>

                  <p className="text-xs text-center text-purple-200">
                    By signing up you agree to our{" "}
                    <a href="#" className="underline">Terms and Conditions</a>
                  </p>
                </div>
              </Card>

              {/* Quick Links */}
              <Card>
                <div className="p-6">
                  <h3 className="font-semibold mb-4">Quick links</h3>
                  <div className="space-y-2">
                    {citySidebarLinks.map((link, idx) => (
                      <a 
                        key={idx}
                        href="#" 
                        className="block text-sm text-primary hover:underline"
                      >
                        {link}
                      </a>
                    ))}
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

export default GoldPrices;
