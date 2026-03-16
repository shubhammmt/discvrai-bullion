import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SmartFundSearch } from '@/components/sip/SmartFundSearch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from 'lucide-react';

/**
 * Embeddable Screener Page
 * 
 * Usage (iframe):
 *   <iframe src="https://yourdomain.com/embed/screener" width="100%" height="700" frameborder="0"></iframe>
 * 
 * URL Parameters:
 *   - query        : Pre-fill AI screener query (e.g. ?query=best+midcap+funds)
 *   - mode         : 'ai' | 'conventional' (default: 'conventional')
 *   - theme        : 'light' | 'dark' (default: follows system)
 *   - session_id   : Pass session context for personalised results
 *   - hide_header  : '1' to hide the card header
 */
const EmbedScreener = () => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const mode = (searchParams.get('mode') as 'ai' | 'conventional') || (query ? 'ai' : 'conventional');
  const theme = searchParams.get('theme');
  const hideHeader = searchParams.get('hide_header') === '1';
  const sessionId = searchParams.get('session_id') || '';

  // Apply theme class to root
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Store session_id for API calls
  useEffect(() => {
    if (sessionId) {
      localStorage.setItem('embed_session_id', sessionId);
    }
  }, [sessionId]);

  // Send postMessage to parent when navigating to fund detail
  useEffect(() => {
    const handleNavigation = (e: MessageEvent) => {
      // Forward any internal navigation events to parent
      if (e.data?.type === 'fund_selected') {
        window.parent.postMessage(e.data, '*');
      }
    };
    window.addEventListener('message', handleNavigation);
    return () => window.removeEventListener('message', handleNavigation);
  }, []);

  return (
    <div className="min-h-screen bg-background p-3 md:p-4">
      <Card className="border shadow-sm">
        {!hideHeader && (
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Search className="w-4 h-4 text-primary" />
              Mutual Fund Screener
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Search, filter, or use AI to discover mutual funds
            </p>
          </CardHeader>
        )}
        <CardContent className={hideHeader ? 'pt-4' : ''}>
          <SmartFundSearch
            standalone
            initialMode={mode}
            initialAIQuery={query}
          />
        </CardContent>
      </Card>

      {/* Embed info footer */}
      <p className="text-[10px] text-muted-foreground text-center mt-3 opacity-60">
        Powered by Discvr AI
      </p>
    </div>
  );
};

export default EmbedScreener;
