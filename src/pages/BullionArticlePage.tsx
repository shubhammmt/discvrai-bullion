import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, Share2, Bookmark, ChevronRight, Crown, BadgeIndianRupee, Coins, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { BullionNavTabs, BullionMobileMenu } from "@/components/bullion";
import silverInvestment1 from "@/assets/silver-investment-1.jpg";
import silverInvestment2 from "@/assets/silver-investment-2.jpg";
import goldInvestment1 from "@/assets/gold-investment-1.jpg";
import goldInvestment2 from "@/assets/gold-investment-2.jpg";

// Full article data with content
const articlesData = [
  {
    id: "1",
    slug: "understanding-digital-gold",
    title: "Understanding Digital Gold: A Complete Beginner's Guide",
    summary: "Learn everything about digital gold investment, from basics to advanced strategies. Discover how digital gold works, its benefits, and how to start investing.",
    category: "gold",
    readTime: 8,
    date: "2024-01-15",
    author: "Ayush Samantaray",
    image: goldInvestment1,
    content: [
      "Digital gold has revolutionized the way Indians invest in the precious metal. Gone are the days when you needed to visit a jeweller or worry about storage and purity. Today, you can buy 99.99% pure gold starting from just ₹1, anytime, anywhere.",
      "Digital gold is essentially gold that you purchase online. When you buy digital gold, the equivalent amount of physical gold is stored in secure, insured vaults on your behalf. You own real gold — it's just stored digitally. Major providers like Augmont ensure that every gram is backed by physical gold stored in SEBI-regulated vaults.",
      "One of the biggest advantages of digital gold is its accessibility. Unlike physical gold, where you need to worry about making charges, purity verification, and safe storage, digital gold eliminates all these concerns. You get 24K pure gold at live market prices with zero making charges.",
      "For investors looking to build wealth systematically, Gold SIP (Systematic Investment Plan) is a game-changer. You can set up automatic monthly investments starting from as low as ₹100. This approach leverages rupee cost averaging, helping you buy more gold when prices are low and less when prices are high.",
      "The resale process is equally seamless. You can sell your digital gold at any time at live market prices. The amount is credited to your bank account within minutes. There are no deductions for melting or impurity — you get the full market value.",
      "Digital gold also offers the unique advantage of conversion to physical gold. If you've accumulated enough, you can request delivery of physical gold coins or bars to your doorstep. This flexibility makes digital gold the perfect bridge between convenience and tradition.",
    ],
  },
  {
    id: "2",
    slug: "silver-investment-poor-mans-gold",
    title: "Silver Investment: Why It's Called 'Poor Man's Gold'",
    summary: "Explore the unique characteristics of silver as an investment. Understand the gold-silver ratio and when to invest in silver for maximum returns.",
    category: "silver",
    readTime: 6,
    date: "2024-01-14",
    author: "Priya Sharma",
    image: silverInvestment1,
    content: [
      "Silver has long been referred to as 'poor man's gold,' but this moniker belies the incredible investment potential of this versatile metal. With industrial demand surging and investment interest growing, silver offers unique opportunities that gold simply cannot match.",
      "The gold-silver ratio — the number of ounces of silver needed to buy one ounce of gold — is a critical metric for precious metal investors. Historically, this ratio averages around 60:1, but it has ranged from 15:1 to over 100:1. When the ratio is high, silver is considered undervalued relative to gold, presenting a buying opportunity.",
      "Unlike gold, which is primarily a monetary metal, silver has significant industrial applications. It's essential in electronics, solar panels, medical devices, and water purification. As the world transitions to green energy, silver demand is expected to surge dramatically.",
      "Digital silver works just like digital gold — you buy 99.99% pure silver stored in secure vaults, with the ability to sell at live market prices or convert to physical silver. The entry point is even lower than gold, making it perfect for new investors.",
      "For portfolio diversification, financial advisors typically recommend allocating 5-10% of your portfolio to precious metals, with a mix of both gold and silver. Silver's higher volatility means it can deliver outsized returns during bull markets.",
    ],
  },
  {
    id: "3",
    slug: "loan-against-mutual-funds",
    title: "Loan Against Mutual Funds: Unlock Your Investment's Potential",
    summary: "Discover how LAMF works, eligibility criteria, interest rates, and why it's a smarter alternative to selling your investments during emergencies.",
    category: "lamf",
    readTime: 10,
    date: "2024-01-13",
    author: "Rahul Mehta",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800",
    content: [
      "A Loan Against Mutual Funds (LAMF) is one of the smartest financial tools available to Indian investors today. Instead of breaking your investments during an emergency, you can pledge your mutual fund units as collateral and get instant liquidity at interest rates as low as 9-10.5% per annum.",
      "The process is remarkably simple. You pledge your mutual fund units through a digital process — no physical paperwork required. The lender marks a lien on your units, and the loan amount (typically 50-80% of your portfolio value) is disbursed to your account within hours.",
      "What makes LAMF superior to a personal loan? First, the interest rate is significantly lower — personal loans charge 12-24%, while LAMF typically costs 9-10.5%. Second, your investments continue to grow. Your mutual fund units remain invested, earning returns even while pledged.",
      "Eligibility is straightforward: you need mutual fund investments worth at least ₹50,000. Most equity and debt mutual funds are accepted as collateral. The loan can be used for any purpose — medical emergencies, business needs, education, or even short-term trading opportunities.",
      "The repayment is flexible too. You can choose to pay only the interest monthly and repay the principal whenever convenient. There's no prepayment penalty. Once repaid, the lien is removed and your full portfolio is back in your control.",
      "Consider this scenario: You have ₹10 lakh in mutual funds and need ₹5 lakh urgently. If you redeem, you lose future returns and may trigger capital gains tax. With LAMF, you get ₹5 lakh at ~10% interest while your ₹10 lakh portfolio continues growing at 12-15%. The math clearly favors LAMF.",
    ],
  },
  {
    id: "5",
    slug: "building-emergency-fund",
    title: "Building an Emergency Fund: Step-by-Step Guide",
    summary: "Learn how to build and maintain an emergency fund that protects your financial future. Includes practical tips and goal-setting strategies.",
    category: "personal",
    readTime: 7,
    date: "2024-01-11",
    author: "Sneha Gupta",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800",
    content: [
      "An emergency fund is the foundation of any solid financial plan. It's the money you set aside for life's unexpected events — job loss, medical emergencies, urgent home repairs, or any situation that requires immediate funds.",
      "Financial experts recommend keeping 3-6 months of essential expenses in your emergency fund. For someone spending ₹50,000 per month on necessities, that means building a corpus of ₹1.5 to ₹3 lakh.",
      "Start small and be consistent. Even ₹2,000 per month adds up to ₹24,000 in a year. The key is to automate your savings — set up a standing instruction to transfer a fixed amount to your emergency fund on salary day.",
      "Where should you keep your emergency fund? Accessibility is paramount. A high-yield savings account or a liquid mutual fund works best. Avoid locking it in fixed deposits or equity investments where accessing it quickly could be difficult or costly.",
      "Once your emergency fund is in place, you can invest more aggressively in other instruments knowing you have a safety net. This psychological comfort often leads to better investment decisions overall.",
    ],
  },
  {
    id: "6",
    slug: "gold-sip-vs-lump-sum",
    title: "Gold SIP vs Lump Sum: Which Strategy Works Best?",
    summary: "A detailed comparison of systematic investment plans versus lump sum investments in gold. Find out which approach suits your financial goals.",
    category: "gold",
    readTime: 9,
    date: "2024-01-10",
    author: "Ayush Samantaray",
    image: goldInvestment2,
    content: [
      "The age-old debate of SIP versus lump sum investment takes an interesting turn when applied to gold. Both strategies have their merits, and the right choice depends on your financial situation, risk appetite, and market outlook.",
      "Gold SIP allows you to invest a fixed amount regularly — daily, weekly, or monthly. This approach benefits from rupee cost averaging. When gold prices drop, your fixed amount buys more grams; when prices rise, you buy fewer. Over time, this averages out your purchase price.",
      "Historical data shows that Gold SIP has delivered competitive returns with lower volatility compared to lump sum investments. An investor doing a monthly SIP of ₹5,000 in gold over the last 5 years would have accumulated significantly more gold than someone who invested ₹3 lakh lump sum at the wrong time.",
      "Lump sum investment works better when you have a large amount available and gold prices are at a perceived low. If you can time the market well, lump sum can outperform SIP. However, timing precious metal markets is notoriously difficult even for experts.",
      "Our recommendation: Use SIP as your core gold accumulation strategy and keep some capital ready for opportunistic lump sum purchases during significant dips. This hybrid approach gives you the best of both worlds.",
      "Starting a Gold SIP on DiscvrAI Bullion is simple — choose your amount (minimum ₹100/month), pick your date, and let automation do the rest. You can pause, modify, or cancel anytime with zero penalties.",
    ],
  },
  {
    id: "7",
    slug: "silver-etfs-vs-physical",
    title: "Silver ETFs vs Physical Silver: Pros and Cons",
    summary: "Compare different ways to invest in silver - from physical coins to ETFs and digital silver. Make an informed decision for your portfolio.",
    category: "silver",
    readTime: 8,
    date: "2024-01-09",
    author: "Priya Sharma",
    image: silverInvestment2,
    content: [
      "The silver investment landscape offers multiple avenues — physical silver, Silver ETFs, and digital silver. Each comes with its own set of advantages and trade-offs that investors must understand before committing capital.",
      "Physical silver (coins, bars, jewelry) gives you tangible ownership but comes with storage concerns, making charges (8-25% for jewelry), and liquidity issues. Selling physical silver often involves deductions for testing and melting.",
      "Silver ETFs track silver prices and trade on stock exchanges like regular stocks. They offer excellent liquidity and eliminate storage concerns. However, you need a demat account, and the expense ratio (0.5-1%) eats into returns over time.",
      "Digital silver represents the best of both worlds. You get ownership of real, vaulted silver at live spot prices with zero making charges. You can buy from ₹1, sell instantly at market price, and even convert to physical silver if desired.",
      "For most retail investors, digital silver offers the optimal combination of low entry barrier, zero storage hassle, full market price on resale, and the option to convert to physical. It's the modern way to own silver.",
    ],
  },
  {
    id: "8",
    slug: "lamf-vs-personal-loan",
    title: "LAMF vs Personal Loan: Interest Rate Comparison 2024",
    summary: "A comprehensive comparison of loan against mutual funds versus personal loans. See how much you can save with LAMF's lower interest rates.",
    category: "lamf",
    readTime: 6,
    date: "2024-01-08",
    author: "Rahul Mehta",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800",
    content: [
      "When you need funds urgently, two popular options are a Personal Loan and a Loan Against Mutual Funds (LAMF). While both serve the same purpose, the cost difference is staggering.",
      "Personal loans in India typically charge 12-24% annual interest depending on your credit score and income. LAMF, on the other hand, starts at just 9% and rarely exceeds 10.5%. That's a potential savings of 3-14% annually on your borrowed amount.",
      "Let's do the math: On a ₹5 lakh loan for 12 months, a personal loan at 16% costs you ₹44,000 in interest. The same amount via LAMF at 10% costs only ₹27,500 — saving you ₹16,500. Scale this up and the savings become transformational.",
      "Beyond interest rates, LAMF wins on processing time (hours vs days), documentation (minimal vs extensive), prepayment penalties (none vs often applicable), and the fact that your investments keep growing.",
      "The only scenario where a personal loan might be preferable is if you don't have mutual fund investments to pledge. For everyone else, LAMF is the clear winner in the secured vs unsecured lending battle.",
      "Ready to unlock your mutual fund's potential? Check your LAMF eligibility instantly on DiscvrAI and get funds in your account within hours.",
    ],
  },
  {
    id: "10",
    slug: "tax-planning-gold-investments",
    title: "Tax Planning with Gold Investments: A Complete Guide",
    summary: "Understand the tax implications of gold investments in India. Learn about LTCG, STCG, and strategies to minimize your tax burden.",
    category: "personal",
    readTime: 12,
    date: "2024-01-06",
    author: "Sneha Gupta",
    image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800",
    content: [
      "Gold investments in India carry specific tax implications that every investor must understand. The tax treatment varies based on the holding period and the form of gold investment.",
      "For physical gold and digital gold, gains are classified based on holding period. If held for more than 36 months (3 years), gains qualify as Long-Term Capital Gains (LTCG) and are taxed at 20% with indexation benefit. Short-term gains (held less than 36 months) are added to your income and taxed at your slab rate.",
      "Indexation is a powerful benefit for long-term gold investors. It adjusts your purchase price for inflation, significantly reducing the taxable gain. For example, if you bought gold for ₹5 lakh in 2020 and the indexed cost in 2024 is ₹6.2 lakh, only the gain above ₹6.2 lakh is taxed.",
      "Gold Sovereign Bonds (SGBs) offer the most tax-efficient way to invest in gold. If held until maturity (8 years), the capital gains are completely tax-free. Even the annual interest of 2.5% is taxed only at your slab rate.",
      "Smart tax planning strategies include: holding gold investments for more than 3 years to get indexation benefit, using LAMF instead of selling gold when you need liquidity (avoiding capital gains altogether), and utilizing the ₹1 lakh LTCG exemption across your portfolio.",
    ],
  },
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case "gold":
      return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
    case "silver":
      return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
    case "lamf":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
    case "personal":
      return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getCTAConfig = (category: string) => {
  switch (category) {
    case "lamf":
      return {
        title: "Need Funds Without Selling Investments?",
        description: "Get a loan against your mutual funds at interest rates as low as 9%. Your investments keep growing while you access instant liquidity.",
        highlight: "Interest rates from 9% p.a.",
        buttonText: "Check LAMF Eligibility →",
        route: "/bullion/loans",
        icon: BadgeIndianRupee,
        gradient: "from-blue-500/10 via-indigo-500/5 to-blue-500/10",
        borderColor: "border-blue-200 dark:border-blue-800/30",
        buttonClass: "bg-blue-600 hover:bg-blue-700 text-white",
      };
    case "gold":
      return {
        title: "Start Investing in Digital Gold",
        description: "Buy 24K pure digital gold starting from just ₹1. Set up Gold SIP for systematic wealth building with zero making charges.",
        highlight: "Start from ₹1 • 99.99% Pure",
        buttonText: "Buy Digital Gold →",
        route: "/bullion",
        icon: Coins,
        gradient: "from-amber-500/10 via-yellow-500/5 to-amber-500/10",
        borderColor: "border-amber-200 dark:border-amber-800/30",
        buttonClass: "bg-amber-500 hover:bg-amber-600 text-black",
      };
    case "silver":
      return {
        title: "Start Investing in Digital Silver",
        description: "Buy 99.99% pure digital silver at live market prices. Diversify your precious metals portfolio with silver's growth potential.",
        highlight: "Start from ₹1 • Live Prices",
        buttonText: "Buy Digital Silver →",
        route: "/bullion",
        icon: Coins,
        gradient: "from-slate-500/10 via-gray-500/5 to-slate-500/10",
        borderColor: "border-slate-200 dark:border-slate-800/30",
        buttonClass: "bg-slate-600 hover:bg-slate-700 text-white",
      };
    default:
      return {
        title: "Explore DiscvrAI Bullion",
        description: "Buy digital gold & silver, set up SIPs, and access loans against mutual funds — all in one platform.",
        highlight: "Your complete bullion platform",
        buttonText: "Explore Bullion →",
        route: "/bullion",
        icon: Sparkles,
        gradient: "from-emerald-500/10 via-green-500/5 to-emerald-500/10",
        borderColor: "border-emerald-200 dark:border-emerald-800/30",
        buttonClass: "bg-emerald-600 hover:bg-emerald-700 text-white",
      };
  }
};

// Sidebar CTA Component
function ArticleCTA({ category }: { category: string }) {
  const navigate = useNavigate();
  const cta = getCTAConfig(category);
  const Icon = cta.icon;

  return (
    <Card className={`p-6 bg-gradient-to-br ${cta.gradient} ${cta.borderColor} sticky top-24`}>
      <div className="flex items-center gap-2 mb-1">
        <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
          <Sparkles className="w-3 h-3 mr-1" />
          Product Feature
        </Badge>
      </div>
      <div className="flex items-center gap-3 mb-3 mt-3">
        <div className="w-10 h-10 rounded-xl bg-background/80 flex items-center justify-center">
          <Icon className="w-5 h-5 text-foreground" />
        </div>
        <h3 className="font-bold text-lg">{cta.title}</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">{cta.description}</p>
      <Card className="p-3 mb-4 bg-background/60 border-dashed">
        <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{cta.highlight}</p>
      </Card>
      <Button 
        className={`w-full ${cta.buttonClass}`}
        onClick={() => navigate(cta.route)}
      >
        {cta.buttonText}
      </Button>
    </Card>
  );
}

export default function BullionArticlePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const article = articlesData.find(a => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <Button onClick={() => navigate("/bullion/premium")}>Back to Premium</Button>
        </div>
      </div>
    );
  }

  const relatedArticles = articlesData
    .filter(a => a.id !== article.id && a.category === article.category)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BullionMobileMenu />
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="lg:flex hidden">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="font-bold text-lg">Discvr Bullion</h1>
              <p className="text-xs text-muted-foreground">Digital Gold & Silver</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                toast.success("Article bookmarked!", {
                  description: "View in Alerts & Bookmarks",
                  action: { label: "View", onClick: () => navigate("/bullion/notifications?tab=bookmarks") },
                });
              }}
            >
              <Bookmark className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => toast.info("Share link copied!")}>
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <BullionNavTabs />

      {/* Breadcrumb */}
      <nav className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/bullion" className="hover:text-foreground transition-colors">Bullion</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/bullion/premium" className="hover:text-foreground transition-colors">Premium</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground truncate max-w-[200px] md:max-w-none">{article.title}</span>
          </div>
        </div>
      </nav>

      {/* Article Content with Sidebar */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[1fr_340px] gap-8">
          {/* Main Content */}
          <article>
            {/* Category & Meta */}
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className={getCategoryColor(article.category)}>
                {article.category.toUpperCase()}
              </Badge>
              <Badge variant="outline">Long Read</Badge>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              {article.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
              <span>By: {article.author}</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(article.date).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}
              </span>
            </div>

            {/* Summary box */}
            <Card className="p-4 mb-6 bg-muted/30 border-l-4 border-l-amber-500">
              <p className="text-muted-foreground">{article.summary}</p>
            </Card>

            {/* Featured Image */}
            <div className="mb-8 rounded-lg overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-auto max-h-[400px] object-cover"
              />
            </div>

            {/* Article Body */}
            <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
              {article.content.map((paragraph, index) => (
                <p key={index} className="mb-5 leading-relaxed text-foreground/90">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Inline CTA for mobile (shown below article on mobile) */}
            <div className="lg:hidden mb-8">
              <ArticleCTA category={article.category} />
            </div>

            {/* Read Time */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Clock className="w-4 h-4" />
              <span>{article.readTime} min read</span>
            </div>

            <Separator className="my-8" />

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-4">More in {article.category.toUpperCase()}</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {relatedArticles.map((rel) => (
                    <Card
                      key={rel.id}
                      className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
                      onClick={() => navigate(`/bullion/premium/article/${rel.slug}`)}
                    >
                      <div className="relative h-36 overflow-hidden">
                        <img
                          src={rel.image}
                          alt={rel.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <Badge variant="secondary" className={`text-xs mb-2 ${getCategoryColor(rel.category)}`}>
                          {rel.category.toUpperCase()}
                        </Badge>
                        <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-amber-500 transition-colors">
                          {rel.title}
                        </h3>
                        <span className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
                          <Clock className="w-3 h-3" /> {rel.readTime} min read
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* Sidebar - Desktop only */}
          <aside className="hidden lg:block space-y-6">
            <ArticleCTA category={article.category} />

            {/* Second CTA if applicable */}
            {article.category !== "lamf" && (
              <Card className="p-5 bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-blue-500/10 border-blue-200 dark:border-blue-800/30">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Product Feature
                  </Badge>
                </div>
                <h3 className="font-bold mt-3 mb-2">Loan Against Mutual Funds</h3>
                <p className="text-sm text-muted-foreground mb-3">Need liquidity? Get a loan against your MF portfolio at just 9% p.a. without selling.</p>
                <Button
                  variant="outline"
                  className="w-full border-blue-300 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  onClick={() => navigate("/bullion/loans")}
                >
                  Check Eligibility →
                </Button>
              </Card>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

export { articlesData };
