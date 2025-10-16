import { Link } from 'react-router-dom';

const GlobalFooter = () => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <footer className="bg-[#0A0F1E] text-gray-300 border-t border-white/10">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Latest News */}
          <div>
            <h3 className="text-emerald-400 font-semibold text-lg mb-4 border-b border-emerald-400/30 pb-2">
              Latest News
            </h3>
            <ul className="space-y-2">
              <li><Link to="/news" className="hover:text-emerald-400 transition-colors">All News</Link></li>
              <li><Link to="/news/markets" className="hover:text-emerald-400 transition-colors">Markets</Link></li>
              <li><Link to="/news/stocks" className="hover:text-emerald-400 transition-colors">Stocks</Link></li>
              <li><Link to="/news/economy" className="hover:text-emerald-400 transition-colors">Economy</Link></li>
              <li><Link to="/crypto" className="hover:text-emerald-400 transition-colors">Crypto</Link></li>
              <li><Link to="/news/mutual-funds" className="hover:text-emerald-400 transition-colors">Mutual Funds</Link></li>
              <li><Link to="/news/videos" className="hover:text-emerald-400 transition-colors">Videos</Link></li>
            </ul>
          </div>

          {/* News Archives */}
          <div>
            <h3 className="text-purple-400 font-semibold text-lg mb-4 border-b border-purple-400/30 pb-2">
              News Archives
            </h3>
            <ul className="space-y-2">
              <li><Link to="/news/archive" className="hover:text-purple-400 transition-colors">Browse Archives</Link></li>
              <li><Link to="/news/archive/2025-10" className="hover:text-purple-400 transition-colors">Oct 15 <span className="text-xs">(Yesterday)</span></Link></li>
              <li><Link to="/news/archive/2025-10-14" className="hover:text-purple-400 transition-colors">Oct 14</Link></li>
              <li><Link to="/news/archive/2025-10-13" className="hover:text-purple-400 transition-colors">Oct 13</Link></li>
              <li><Link to="/news/archive/2025-10-12" className="hover:text-purple-400 transition-colors">Oct 12</Link></li>
              <li><Link to="/news/archive/2025-10-11" className="hover:text-purple-400 transition-colors">Oct 11</Link></li>
              <li><Link to="/news/archive/2025-10-10" className="hover:text-purple-400 transition-colors">Oct 10</Link></li>
              <li><Link to="/news/archive/2025-10-09" className="hover:text-purple-400 transition-colors">Oct 9</Link></li>
              <li className="pt-2">
                <Link to="/news/calendar" className="text-sm hover:text-purple-400 transition-colors inline-flex items-center gap-1">
                  📅 View Calendar Archive
                </Link>
              </li>
            </ul>
          </div>

          {/* Exclusive News */}
          <div>
            <h3 className="text-purple-400 font-semibold text-lg mb-4 border-b border-purple-400/30 pb-2">
              Exclusive News
            </h3>
            <ul className="space-y-2">
              <li><Link to="/news/hub" className="hover:text-purple-400 transition-colors">News Hub</Link></li>
              <li><Link to="/news/finance" className="hover:text-purple-400 transition-colors">Finance</Link></li>
              <li><Link to="/news/technology" className="hover:text-purple-400 transition-colors">Technology</Link></li>
              <li><Link to="/news/entertainment" className="hover:text-purple-400 transition-colors">Entertainment</Link></li>
              <li><Link to="/news/sports" className="hover:text-purple-400 transition-colors">Sports</Link></li>
              <li><Link to="/news/politics" className="hover:text-purple-400 transition-colors">Politics</Link></li>
            </ul>
          </div>

          {/* Mutual Funds */}
          <div>
            <h3 className="text-cyan-400 font-semibold text-lg mb-4 border-b border-cyan-400/30 pb-2">
              Mutual Funds
            </h3>
            <ul className="space-y-2">
              <li><Link to="/mutual-funds" className="hover:text-cyan-400 transition-colors">All Mutual Funds</Link></li>
              <li><Link to="/mutual-funds/screener" className="hover:text-cyan-400 transition-colors">Fund Screener</Link></li>
              <li><Link to="/mutual-funds/themes" className="hover:text-cyan-400 transition-colors">Thematic Funds</Link></li>
              <li><Link to="/portfolio" className="hover:text-cyan-400 transition-colors">Portfolio Tracker</Link></li>
              <li><Link to="/mutual-funds/browse" className="hover:text-cyan-400 transition-colors">Browse A-Z</Link></li>
              <li><Link to="/mutual-funds/fund-houses" className="hover:text-cyan-400 transition-colors">Fund Houses</Link></li>
            </ul>
          </div>

          {/* Investment Tools */}
          <div>
            <h3 className="text-blue-400 font-semibold text-lg mb-4 border-b border-blue-400/30 pb-2">
              Investment Tools
            </h3>
            <ul className="space-y-2">
              <li><Link to="/portfolio/analysis" className="hover:text-blue-400 transition-colors">Portfolio Analysis</Link></li>
              <li><Link to="/mutual-funds/screener" className="hover:text-blue-400 transition-colors">MF Screener</Link></li>
              <li><Link to="/watchlist" className="hover:text-blue-400 transition-colors">Watchlist</Link></li>
              <li><Link to="/ai-screening" className="hover:text-blue-400 transition-colors">AI Screening</Link></li>
            </ul>
            <div className="mt-6">
              <p className="text-xs text-gray-400 mb-2">Quick Access:</p>
              <div className="flex flex-wrap gap-2">
                <Link to="/market" className="px-3 py-1 text-xs border border-gray-600 rounded hover:border-blue-400 hover:text-blue-400 transition-colors">
                  Markets
                </Link>
                <Link to="/stocks" className="px-3 py-1 text-xs border border-gray-600 rounded hover:border-blue-400 hover:text-blue-400 transition-colors">
                  Stocks
                </Link>
                <Link to="/news/economy" className="px-3 py-1 text-xs border border-gray-600 rounded hover:border-blue-400 hover:text-blue-400 transition-colors">
                  Economy
                </Link>
                <Link to="/crypto" className="px-3 py-1 text-xs border border-gray-600 rounded hover:border-blue-400 hover:text-blue-400 transition-colors">
                  Crypto
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Alphabetical Browse Section */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <h3 className="text-purple-400 font-semibold text-lg mb-4">
            Browse Alphabetically
          </h3>
          <div className="flex flex-wrap gap-2">
            {alphabet.map((letter) => (
              <Link
                key={letter}
                to={`/mutual-funds/browse/${letter}`}
                className="w-8 h-8 flex items-center justify-center border border-gray-600 rounded hover:border-purple-400 hover:text-purple-400 transition-colors text-sm"
              >
                {letter}
              </Link>
            ))}
          </div>
        </div>

        {/* Popular Fund Houses */}
        <div className="mt-8">
          <h3 className="text-cyan-400 font-semibold text-lg mb-4">
            Fund House Wise
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <Link to="/mutual-funds/houses/sbi" className="hover:text-cyan-400 transition-colors">SBI Funds</Link>
            <Link to="/mutual-funds/houses/hdfc" className="hover:text-cyan-400 transition-colors">HDFC Funds</Link>
            <Link to="/mutual-funds/houses/icici" className="hover:text-cyan-400 transition-colors">ICICI Funds</Link>
            <Link to="/mutual-funds/houses/nippon" className="hover:text-cyan-400 transition-colors">Nippon Funds</Link>
            <Link to="/mutual-funds/houses/aditya-birla" className="hover:text-cyan-400 transition-colors">Aditya Birla Funds</Link>
            <Link to="/mutual-funds/houses/all" className="hover:text-cyan-400 transition-colors">All Fund Houses</Link>
          </div>
        </div>

        {/* Popular Themes */}
        <div className="mt-8">
          <h3 className="text-cyan-400 font-semibold text-lg mb-4">
            Popular Themes
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <Link to="/themes/monsoon-momentum" className="hover:text-cyan-400 transition-colors">Monsoon Momentum Fund</Link>
            <Link to="/themes/tariff-resilient" className="hover:text-cyan-400 transition-colors">Tariff Resilient India</Link>
            <Link to="/themes/us-vulnerable" className="hover:text-cyan-400 transition-colors">US Tariff Vulnerable</Link>
            <Link to="/themes/uk-trade" className="hover:text-cyan-400 transition-colors">India UK Trade Winners</Link>
            <Link to="/themes/cost-cutters" className="hover:text-cyan-400 transition-colors">Cost Cutters</Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-4">
            <Link to="/terms" className="text-sm hover:text-gray-400 transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/privacy" className="text-sm hover:text-gray-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/data-deletion" className="text-sm hover:text-gray-400 transition-colors">
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
