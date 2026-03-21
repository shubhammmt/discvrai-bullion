import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Maximize2, Minimize2, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SIPBrandLogo } from './SIPBrandLogo';
import { SIP_BRAND } from '@/config/sipBrandConfig';
import { AgenticChatHome } from './AgenticChatHome';
import { AuthUser } from './OTPLoginDialog';
import { SIPUserState } from './SIPUserStateSwitcher';

interface HomeChatViewProps {
  hasHoldings: boolean;
  totalInvested: number;
  totalValue: number;
  overallReturn: string;
  userState: SIPUserState;
  authUser: AuthUser | null;
  onNavigateTab: (tab: string) => void;
}

export function HomeChatView({
  hasHoldings,
  totalInvested,
  totalValue,
  overallReturn,
  userState,
  authUser,
  onNavigateTab,
}: HomeChatViewProps) {
  const [portfolioOpen, setPortfolioOpen] = useState(true);
  const [chatFullscreen, setChatFullscreen] = useState(false);

  // After first collapse, keep it collapsed
  const handleCollapsePortfolio = () => {
    setPortfolioOpen((prev) => !prev);
  };

  return (
    <div className="space-y-4">
      {/* Portfolio snapshot — collapsible */}
      {hasHoldings && !chatFullscreen && (
        <Card className="border-sip-border overflow-hidden">
          <button
            onClick={handleCollapsePortfolio}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-center gap-2">
              <SIPBrandLogo size="sm" />
              <span className="text-sm font-bold text-sip-text-primary">{SIP_BRAND.name}</span>
              <span className="text-[10px] text-sip-text-muted">/ Portfolio Snapshot</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 text-[10px] gap-1 text-sip-brand px-2"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigateTab('portfolio');
                }}
              >
                View Full Portfolio <ExternalLink className="w-3 h-3" />
              </Button>
              {portfolioOpen ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
          </button>

          {portfolioOpen && (
            <CardContent className="px-4 pb-4 pt-0">
              <div className="grid grid-cols-3 gap-0 divide-x divide-sip-border">
                <div className="pr-4">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Invested Value</p>
                  <p className="text-lg font-bold text-foreground mt-1">₹{totalInvested.toLocaleString()}</p>
                </div>
                <div className="px-4">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Current Value</p>
                  <p className="text-lg font-bold text-sip-brand mt-1">₹{totalValue.toLocaleString()}</p>
                </div>
                <div className="pl-4">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Total Returns</p>
                  <p className={cn('text-lg font-bold mt-1', Number(overallReturn) >= 0 ? 'text-sip-success' : 'text-sip-error')}>
                    {Number(overallReturn) >= 0 ? '+' : ''}{overallReturn}%
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    ₹{Math.abs(totalValue - totalInvested).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      )}

      {/* Chat — with fullscreen toggle */}
      <Card className={cn(
        'transition-all',
        chatFullscreen && 'fixed inset-0 z-50 rounded-none border-none m-0'
      )}>
        <CardContent className={cn('p-4', chatFullscreen && 'h-full flex flex-col')}>
          {/* Fullscreen toggle */}
          <div className="flex justify-end mb-1 shrink-0">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
              onClick={() => setChatFullscreen((p) => !p)}
              title={chatFullscreen ? 'Exit fullscreen' : 'Fullscreen chat'}
            >
              {chatFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
          </div>
          <div className={cn(chatFullscreen && 'flex-1 min-h-0 flex flex-col')}>
            <AgenticChatHome
              userState={userState}
              onNavigateTab={onNavigateTab}
              authUser={authUser}
              userName={authUser?.name}
              fullscreen={chatFullscreen}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
