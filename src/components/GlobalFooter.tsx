import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

const GlobalFooter = () => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  // Mock data for latest news by category
  const latestNewsByCategory = {
    finance: [
      { title: "Financial Market Turbulence Amid U.S. Trade War...", date: "10/16/2025", emoji: "📊" },
      { title: "Global Economic Challenges: Trade Tensions and Risks...", date: "10/16/2025", emoji: "📈" },
      { title: "Analyzing the Impact of U.S. Trade War on Financial...", date: "10/16/2025", emoji: "💹" },
      { title: "Global Trade Tensions: Impact on Economy and Stability", date: "10/16/2025", emoji: "💼" },
    ],
    technology: [
      { title: "The Economic Impact of AI Innovations on Markets...", date: "10/16/2025", emoji: "🤖" },
      { title: "AI Innovations Transforming Education and Economy...", date: "10/16/2025", emoji: "💡" },
      { title: "How AI Innovations Drive Economic Growth and...", date: "10/16/2025", emoji: "🔬" },
      { title: "Advancements in AI Transforming Education Sector...", date: "10/16/2025", emoji: "🎓" },
    ],
    ipo: [
      { title: "New Tech IPO Raises $500M in Oversubscribed Offering", date: "10/15/2025", emoji: "🚀" },
      { title: "Healthcare Startup Files for IPO Next Quarter", date: "10/15/2025", emoji: "🏥" },
      { title: "Analyzing Recent IPO Performance in 2025", date: "10/14/2025", emoji: "📊" },
      { title: "Top IPO Prospects for Q4 2025", date: "10/14/2025", emoji: "⭐" },
    ],
    ai: [
      { title: "AI Revolutionizing Financial Planning Services", date: "10/16/2025", emoji: "🧠" },
      { title: "Machine Learning Models Predict Market Trends", date: "10/16/2025", emoji: "🔮" },
      { title: "AI-Powered Trading Platforms Gain Popularity", date: "10/15/2025", emoji: "🤖" },
      { title: "ChatGPT Integration in Financial Advisory Tools", date: "10/15/2025", emoji: "💬" },
    ],
    sports: [
      { title: "Enhancing Sports Management with Data Analytics...", date: "10/16/2025", emoji: "⚽" },
      { title: "Data Analytics Transforming Sports Management...", date: "10/16/2025", emoji: "🏀" },
      { title: "Transforming Sports: Data Analytics Shaping Player...", date: "10/16/2025", emoji: "🏈" },
      { title: "How Data Analytics is Transforming Sports...", date: "10/15/2025", emoji: "📊" },
    ],
    entertainment: [
      { title: "Cultural Crossroads in 'Param Sundan': A Festive Film...", date: "8/29/2025", emoji: "🎬" },
      { title: "Maha Kumbh 2025: A Historic Gathering of Faith...", date: "4/30/2025", emoji: "🎭" },
      { title: "Discover the Bhagavad Gita: A Guide to Purposeful...", date: "4/29/2025", emoji: "📚" },
      { title: "How Streaming Revolutionizes Storytelling Today", date: "4/29/2025", emoji: "📺" },
    ],
  };

  return (
    <footer className="bg-[#0A0F1E] text-gray-300 border-t border-white/10">
      {/* Category-wise Latest News Sections */}
      <div className="border-b border-white/10">
        {Object.entries(latestNewsByCategory).map(([category, articles]) => (
          <div key={category} className="border-b border-white/5 last:border-b-0">
            <div className="container mx-auto px-4 py-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-emerald-400">
                  Latest in {category.toUpperCase()}
                </h3>
                <Link to={`/news/${category}`} className="text-cyan-400 hover:text-cyan-300 text-sm transition-colors">
                  View all →
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {articles.map((article, idx) => (
                  <Link 
                    key={idx} 
                    to={`/news/${category}`}
                    className="group bg-[#0F1624] rounded-lg p-4 hover:bg-[#141B2D] transition-all border border-white/5 hover:border-emerald-400/30"
                  >
                    <div className="flex gap-3">
                      <div className="w-16 h-16 bg-[#141B2D] rounded flex items-center justify-center text-2xl flex-shrink-0 group-hover:bg-[#1A2336]">
                        {article.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-200 font-medium text-sm line-clamp-2 group-hover:text-emerald-400 transition-colors">
                          {article.title}
                        </p>
                        <p className="text-gray-500 text-xs mt-2">{article.date}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Explore News Archive Section */}
      <div className="border-b border-white/10 bg-[#0F1624]">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-200 mb-2">Explore the News Archive</h3>
            <p className="text-gray-400">Browse by month or jump to categories.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Months */}
            <div>
              <h4 className="text-gray-300 font-medium mb-4">Recent months</h4>
              <div className="flex flex-wrap gap-3">
                <Link to="/news/archive/oct-25" className="px-4 py-2 bg-[#141B2D] hover:bg-[#1A2336] rounded-lg text-gray-300 text-sm transition-colors">
                  Oct 25 <span className="text-gray-500">(390)</span>
                </Link>
                <Link to="/news/archive/sep-25" className="px-4 py-2 bg-[#141B2D] hover:bg-[#1A2336] rounded-lg text-gray-300 text-sm transition-colors">
                  Sep 25 <span className="text-gray-500">(75)</span>
                </Link>
                <Link to="/news/archive/aug-25" className="px-4 py-2 bg-[#141B2D] hover:bg-[#1A2336] rounded-lg text-gray-300 text-sm transition-colors">
                  Aug 25 <span className="text-gray-500">(115)</span>
                </Link>
                <Link to="/news/archive/may-25" className="px-4 py-2 bg-[#141B2D] hover:bg-[#1A2336] rounded-lg text-gray-300 text-sm transition-colors">
                  May 25 <span className="text-gray-500">(36)</span>
                </Link>
                <Link to="/news/archive/apr-25" className="px-4 py-2 bg-[#141B2D] hover:bg-[#1A2336] rounded-lg text-gray-300 text-sm transition-colors">
                  Apr 25 <span className="text-gray-500">(65)</span>
                </Link>
                <Link to="/news/archive/mar-25" className="px-4 py-2 bg-[#141B2D] hover:bg-[#1A2336] rounded-lg text-gray-300 text-sm transition-colors">
                  Mar 25 <span className="text-gray-500">(150)</span>
                </Link>
              </div>
              <Link to="/news/archive" className="inline-block mt-4 text-cyan-400 hover:text-cyan-300 text-sm transition-colors">
                View all months →
              </Link>
            </div>

            {/* Quick Categories */}
            <div>
              <h4 className="text-gray-300 font-medium mb-4">Quick categories</h4>
              <div className="flex flex-wrap gap-3">
                <Link to="/news/finance" className="px-4 py-2 bg-blue-900/20 hover:bg-blue-900/30 rounded-lg text-blue-400 text-sm transition-colors border border-blue-800/30">
                  Finance
                </Link>
                <Link to="/news/technology" className="px-4 py-2 bg-purple-900/20 hover:bg-purple-900/30 rounded-lg text-purple-400 text-sm transition-colors border border-purple-800/30">
                  Technology
                </Link>
                <Link to="/news/politics" className="px-4 py-2 bg-emerald-900/20 hover:bg-emerald-900/30 rounded-lg text-emerald-400 text-sm transition-colors border border-emerald-800/30">
                  Politics
                </Link>
                <Link to="/news/sports" className="px-4 py-2 bg-orange-900/20 hover:bg-orange-900/30 rounded-lg text-orange-400 text-sm transition-colors border border-orange-800/30">
                  Sports
                </Link>
                <Link to="/news/entertainment" className="px-4 py-2 bg-pink-900/20 hover:bg-pink-900/30 rounded-lg text-pink-400 text-sm transition-colors border border-pink-800/30">
                  Entertainment
                </Link>
              </div>
            </div>

            {/* More Links */}
            <div>
              <h4 className="text-gray-300 font-medium mb-4">More</h4>
              <div className="space-y-2">
                <Link to="/news" className="block px-4 py-2 bg-[#141B2D] hover:bg-[#1A2336] rounded-lg text-gray-300 text-sm transition-colors">
                  Latest News
                </Link>
                <Link to="/news-hub" className="block px-4 py-2 bg-[#141B2D] hover:bg-[#1A2336] rounded-lg text-gray-300 text-sm transition-colors">
                  News hub
                </Link>
                <Link to="/news/archive" className="block px-4 py-2 bg-[#141B2D] hover:bg-[#1A2336] rounded-lg text-gray-300 text-sm transition-colors">
                  Full archive
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex gap-4 mt-8">
            <Link to="/news" className="px-6 py-2 bg-white hover:bg-gray-100 text-[#0A0F1E] rounded-lg font-medium transition-colors">
              Latest News
            </Link>
            <Link to="/news/archive" className="px-6 py-2 bg-[#141B2D] hover:bg-[#1A2336] text-gray-200 rounded-lg font-medium transition-colors border border-white/10">
              Browse all
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Navigation */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Mutual Funds */}
          <div>
            <h3 className="text-cyan-400 font-semibold text-lg mb-4 border-b border-cyan-400/30 pb-2">
              Mutual Funds
            </h3>
            <ul className="space-y-2">
              <li><Link to="/mutual-funds-landing" className="hover:text-cyan-400 transition-colors">All Mutual Funds</Link></li>
              <li><Link to="/mutual-fund-feed" className="hover:text-cyan-400 transition-colors">Fund Screener</Link></li>
              <li><Link to="/mutual-funds-landing" className="hover:text-cyan-400 transition-colors">Thematic Funds</Link></li>
              <li><Link to="/mutual-funds-portfolio" className="hover:text-cyan-400 transition-colors">Portfolio Tracker</Link></li>
            </ul>
          </div>

          {/* Alphabetical */}
          <div>
            <h3 className="text-purple-400 font-semibold text-lg mb-4 border-b border-purple-400/30 pb-2">
              Alphabetical
            </h3>
            <ul className="space-y-2">
              <li><Link to="/mutual-funds/browse" className="hover:text-purple-400 transition-colors">Browse A-Z</Link></li>
              <li><Link to="/mutual-funds/browse/a" className="hover:text-purple-400 transition-colors">A Mutual Funds</Link></li>
              <li><Link to="/mutual-funds/browse/s" className="hover:text-purple-400 transition-colors">S Mutual Funds</Link></li>
              <li><Link to="/mutual-funds/browse/i" className="hover:text-purple-400 transition-colors">I Mutual Funds</Link></li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-1">
              {alphabet.slice(0, 13).map((letter) => (
                <Link
                  key={letter}
                  to={`/mutual-funds/browse/${letter.toLowerCase()}`}
                  className="w-6 h-6 flex items-center justify-center text-xs hover:text-purple-400 transition-colors"
                >
                  {letter}
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap gap-1">
              {alphabet.slice(13).map((letter) => (
                <Link
                  key={letter}
                  to={`/mutual-funds/browse/${letter.toLowerCase()}`}
                  className="w-6 h-6 flex items-center justify-center text-xs hover:text-purple-400 transition-colors"
                >
                  {letter}
                </Link>
              ))}
            </div>
          </div>

          {/* Fund House Wise */}
          <div>
            <h3 className="text-purple-400 font-semibold text-lg mb-4 border-b border-purple-400/30 pb-2">
              Fund House Wise
            </h3>
            <ul className="space-y-2">
              <li><Link to="/mutual-funds/houses" className="hover:text-purple-400 transition-colors">All Fund Houses</Link></li>
              <li><Link to="/mutual-funds/houses/sbi" className="hover:text-purple-400 transition-colors">SBI Funds</Link></li>
              <li><Link to="/mutual-funds/houses/hdfc" className="hover:text-purple-400 transition-colors">HDFC Funds</Link></li>
              <li><Link to="/mutual-funds/houses/icici" className="hover:text-purple-400 transition-colors">ICICI Funds</Link></li>
              <li><Link to="/mutual-funds/houses/nippon" className="hover:text-purple-400 transition-colors">Nippon Funds</Link></li>
              <li><Link to="/mutual-funds/houses/aditya-birla" className="hover:text-purple-400 transition-colors">Aditya Birla Funds</Link></li>
            </ul>
          </div>

          {/* Popular Themes */}
          <div>
            <h3 className="text-blue-400 font-semibold text-lg mb-4 border-b border-blue-400/30 pb-2">
              Popular Themes
            </h3>
            <ul className="space-y-2">
              <li><Link to="/themes" className="hover:text-blue-400 transition-colors">All Themes</Link></li>
              <li><Link to="/themes/monsoon-momentum" className="hover:text-blue-400 transition-colors">Monsoon Momentum Fund</Link></li>
              <li><Link to="/themes/tariff-resilient" className="hover:text-blue-400 transition-colors">Tariff Resilient India</Link></li>
              <li><Link to="/themes/us-vulnerable" className="hover:text-blue-400 transition-colors">US Tariff Vulnerable</Link></li>
              <li><Link to="/themes/uk-trade" className="hover:text-blue-400 transition-colors">India UK Trade Winners</Link></li>
              <li><Link to="/themes/cost-cutters" className="hover:text-blue-400 transition-colors">Cost Cutters</Link></li>
            </ul>
          </div>

          {/* Latest News */}
          <div>
            <h3 className="text-emerald-400 font-semibold text-lg mb-4 border-b border-emerald-400/30 pb-2">
              Latest News
            </h3>
            <ul className="space-y-2">
              <li><Link to="/news" className="hover:text-emerald-400 transition-colors">All News</Link></li>
              <li><Link to="/news/mutual-funds" className="hover:text-emerald-400 transition-colors">Mutual Fund News</Link></li>
              <li><Link to="/news/markets" className="hover:text-emerald-400 transition-colors">Market News</Link></li>
              <li><Link to="/news/economy" className="hover:text-emerald-400 transition-colors">Economy News</Link></li>
              <li><Link to="/news/stocks" className="hover:text-emerald-400 transition-colors">Stock News</Link></li>
            </ul>
          </div>
        </div>

        {/* Crypto Section */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Top Cryptocurrencies */}
            <div>
              <h3 className="text-amber-400 font-semibold text-lg mb-4 border-b border-amber-400/30 pb-2">
                Top Cryptocurrencies
              </h3>
              <ul className="space-y-2">
                <li><Link to="/crypto/bitcoin" className="hover:text-amber-400 transition-colors flex items-center gap-2">
                  <span className="text-orange-400">₿</span> Bitcoin (BTC)
                </Link></li>
                <li><Link to="/crypto/ethereum" className="hover:text-amber-400 transition-colors flex items-center gap-2">
                  <span className="text-blue-400">⟠</span> Ethereum (ETH)
                </Link></li>
                <li><Link to="/crypto/binance-coin" className="hover:text-amber-400 transition-colors">Binance Coin (BNB)</Link></li>
                <li><Link to="/crypto/solana" className="hover:text-amber-400 transition-colors">Solana (SOL)</Link></li>
                <li><Link to="/crypto/xrp" className="hover:text-amber-400 transition-colors">XRP (XRP)</Link></li>
                <li><Link to="/crypto/cardano" className="hover:text-amber-400 transition-colors">Cardano (ADA)</Link></li>
                <li><Link to="/crypto/dogecoin" className="hover:text-amber-400 transition-colors">Dogecoin (DOGE)</Link></li>
                <li><Link to="/crypto/polkadot" className="hover:text-amber-400 transition-colors">Polkadot (DOT)</Link></li>
                <li><Link to="/crypto/avalanche" className="hover:text-amber-400 transition-colors">Avalanche (AVAX)</Link></li>
                <li><Link to="/crypto/polygon" className="hover:text-amber-400 transition-colors">Polygon (MATIC)</Link></li>
                <li><Link to="/crypto/chainlink" className="hover:text-amber-400 transition-colors">Chainlink (LINK)</Link></li>
                <li><Link to="/crypto/litecoin" className="hover:text-amber-400 transition-colors">Litecoin (LTC)</Link></li>
                <li><Link to="/crypto-hub" className="text-cyan-400 hover:text-cyan-300 transition-colors mt-2 inline-flex items-center gap-1">
                  View All Cryptocurrencies →
                </Link></li>
              </ul>
            </div>

            {/* Crypto News */}
            <div>
              <h3 className="text-amber-400 font-semibold text-lg mb-4 border-b border-amber-400/30 pb-2">
                Crypto News
              </h3>
              <ul className="space-y-2">
                <li><Link to="/news/crypto/bitcoin" className="hover:text-amber-400 transition-colors">Bitcoin News</Link></li>
                <li><Link to="/news/crypto/ethereum" className="hover:text-amber-400 transition-colors">Ethereum News</Link></li>
                <li><Link to="/news/crypto/altcoin" className="hover:text-amber-400 transition-colors">Altcoin News</Link></li>
                <li><Link to="/news/crypto/defi" className="hover:text-amber-400 transition-colors">DeFi News</Link></li>
                <li><Link to="/news/crypto/archive" className="hover:text-amber-400 transition-colors">News Archives</Link></li>
                <li><Link to="/news/crypto/weekly" className="hover:text-amber-400 transition-colors">Weekly Roundup</Link></li>
                <li><Link to="/news/crypto/analysis" className="hover:text-amber-400 transition-colors">Monthly Analysis</Link></li>
              </ul>
            </div>

            {/* Market Tools */}
            <div>
              <h3 className="text-amber-400 font-semibold text-lg mb-4 border-b border-amber-400/30 pb-2">
                Market Tools
              </h3>
              <ul className="space-y-2">
                <li><Link to="/crypto/gainers" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-green-400" /> Top Gainers
                </Link></li>
                <li><Link to="/crypto/losers" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <TrendingDown className="w-4 h-4 text-red-400" /> Top Losers
                </Link></li>
                <li><Link to="/crypto/active" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <Activity className="w-4 h-4 text-blue-400" /> Most Active
                </Link></li>
                <li><Link to="/crypto/prices" className="hover:text-amber-400 transition-colors">Historical Prices</Link></li>
                <li><Link to="/crypto/alerts" className="text-cyan-400 hover:text-cyan-300 transition-colors">Price Alerts</Link></li>
                <li><Link to="/crypto/watchlist" className="hover:text-amber-400 transition-colors">My Watchlist</Link></li>
              </ul>
            </div>

            {/* Historical Archive */}
            <div>
              <h3 className="text-amber-400 font-semibold text-lg mb-4 border-b border-amber-400/30 pb-2">
                Historical Archive
              </h3>
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Quick search any cryptocurrency..."
                    className="w-full px-4 py-2 bg-[#141B2D] border border-white/10 rounded-lg text-sm focus:outline-none focus:border-amber-400/50 transition-colors"
                  />
                  <span className="absolute left-3 top-2.5 text-gray-500">🔍</span>
                </div>
              </div>
              <ul className="space-y-2">
                <li><Link to="/crypto/archive/2025" className="hover:text-amber-400 transition-colors">2025 Data</Link></li>
                <li><Link to="/crypto/archive/2024" className="hover:text-amber-400 transition-colors">2024 Data</Link></li>
                <li><Link to="/crypto/archive/2023" className="hover:text-amber-400 transition-colors">2023 Data</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-4">
            <Link to="/terms-and-conditions" className="text-sm hover:text-gray-400 transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/privacy-policy" className="text-sm hover:text-gray-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/data-deletion-policy" className="text-sm hover:text-gray-400 transition-colors">
              Data Deletion Policy
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-gray-400">
            <p>
              © 2025 Discvr.ai. All rights reserved. | Powered by{' '}
              <a 
                href="https://servurance.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Servurance Technology Private Limited
              </a>
            </p>
            <p className="mt-2 text-xs">
              Stay informed with real-time financial news, market analysis, and investment insights.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default GlobalFooter;
