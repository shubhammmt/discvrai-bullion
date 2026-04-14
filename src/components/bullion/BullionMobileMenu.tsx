import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Menu, 
  TrendingUp, 
  Wallet, 
  Newspaper, 
  Gamepad2,
  Target, 
  Crown,
  Settings,
  ChevronRight,
  ChevronDown,
  Gem,
  Banknote,
  Calculator,
  User,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

interface SubItem {
  id: string;
  label: string;
  route: string;
  icon: React.ElementType;
}

interface NavItem {
  id: string;
  label: string;
  route: string;
  icon: React.ElementType;
  badge?: string;
  section?: "main" | "more";
  subItems?: SubItem[];
}

const navItems: NavItem[] = [
  { 
    id: "bullion", label: "Bullion", route: "/bullion", icon: TrendingUp, section: "main",
    subItems: [
      { id: "bullion-portfolio", label: "Portfolio", route: "/bullion/portfolio", icon: Wallet },
      { id: "bullion-faqs", label: "FAQs", route: "/bullion/calculators", icon: HelpCircle },
    ],
  },
  { 
    id: "loans", label: "Loans", route: "/bullion/loans", icon: Banknote, section: "main",
    subItems: [
      { id: "loans-lamf", label: "LAMF", route: "/bullion/loans", icon: Banknote },
      { id: "loans-faqs", label: "FAQs", route: "/bullion/loans", icon: HelpCircle },
    ],
  },
  { id: "news", label: "Quick Insights", route: "/bullion/news", icon: Newspaper, section: "main" },
  { id: "premium", label: "Premium", route: "/bullion/premium", icon: Crown, badge: "PRO", section: "main" },
  { id: "games", label: "Games", route: "/bullion/games", icon: Gamepad2, section: "main" },
  { id: "calculators", label: "Calculators", route: "/bullion/calculators", icon: Calculator, section: "main" },
  { id: "goals", label: "Goals", route: "/bullion/goals", icon: Target, section: "main" },
  { id: "trends", label: "Jewellery Trends", route: "/bullion/trends", icon: Gem, section: "main" },
];

export function BullionMobileMenu() {
  const [open, setOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (route: string) => {
    return location.pathname === route || location.pathname.startsWith(route + "/");
  };

  const handleNavigate = (route: string) => {
    navigate(route);
    setOpen(false);
  };

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const mainItems = navItems;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        <SheetHeader className="p-4 border-b border-border/50">
          <SheetTitle className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
              <span className="text-white text-sm font-bold">D</span>
            </div>
            <div className="text-left cursor-pointer" onClick={() => { navigate('/discvr'); setOpen(false); }}>
              <p className="font-bold text-base">Discvr Bullion</p>
              <p className="text-xs text-muted-foreground font-normal">Digital Gold & Silver</p>
            </div>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-[calc(100vh-80px)]">
          {/* Main Navigation */}
          <div className="flex-1 overflow-y-auto py-4">
            <div className="px-3 mb-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3">
                Main Menu
              </p>
            </div>
            <nav className="space-y-1 px-3">
              {mainItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.route);
                const hasSubItems = item.subItems && item.subItems.length > 0;
                const isExpanded = expandedItems.includes(item.id);
                
                return (
                  <div key={item.id}>
                    <button
                      onClick={() => {
                        if (hasSubItems) {
                          toggleExpand(item.id);
                        } else {
                          handleNavigate(item.route);
                        }
                      }}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium transition-all",
                        active 
                          ? "bg-primary text-primary-foreground shadow-sm" 
                          : "text-foreground hover:bg-muted/50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5" />
                        <span>{item.label}</span>
                        {item.badge && (
                          <Badge 
                            variant="secondary" 
                            className={cn(
                              "text-[10px] px-1.5 py-0 h-4",
                              active ? "bg-primary-foreground/20 text-primary-foreground" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                            )}
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                      {hasSubItems ? (
                        <ChevronDown className={cn("w-4 h-4 transition-transform", isExpanded && "rotate-180", active ? "text-primary-foreground/70" : "text-muted-foreground")} />
                      ) : (
                        <ChevronRight className={cn("w-4 h-4", active ? "text-primary-foreground/70" : "text-muted-foreground")} />
                      )}
                    </button>
                    {/* Sub-items */}
                    {hasSubItems && isExpanded && (
                      <div className="ml-6 mt-1 space-y-1 border-l-2 border-border/50 pl-3">
                        {item.subItems!.map((sub) => {
                          const SubIcon = sub.icon;
                          return (
                            <button
                              key={sub.id}
                              onClick={() => handleNavigate(sub.route)}
                              className={cn(
                                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all",
                                isActive(sub.route) ? "text-primary font-medium bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                              )}
                            >
                              <SubIcon className="w-4 h-4" />
                              <span>{sub.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Footer */}
          <div className="border-t border-border/50 p-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Demo Mode</p>
                <p className="text-xs text-muted-foreground">Switch user state to test</p>
              </div>
              <Settings className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
