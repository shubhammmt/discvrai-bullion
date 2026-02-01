import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  TrendingUp, 
  Wallet, 
  Newspaper, 
  Trophy, 
  Target, 
  Crown,
  Gem,
  Banknote,
  PieChart,
  Calculator,
  Home,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface NavTab {
  id: string;
  label: string;
  route: string;
  icon: React.ElementType | null;
  badge?: string;
}

const navTabs: NavTab[] = [
  { id: "home", label: "Home", route: "/bullion", icon: Home },
  { id: "trade", label: "Trade", route: "/bullion/trade", icon: TrendingUp },
  { id: "portfolio", label: "Portfolio", route: "/bullion/portfolio", icon: Wallet },
  { id: "loans", label: "Loans", route: "/bullion/loans", icon: Banknote },
  { id: "calculators", label: "Calculators", route: "/bullion/calculators", icon: Calculator },
  { id: "news", label: "News", route: "/bullion/news", icon: Newspaper },
  { id: "trends", label: "Jewellery Trends", route: "/bullion/trends", icon: Gem },
  { id: "contests", label: "Contests", route: "/bullion/contests", icon: Trophy },
  { id: "goals", label: "Goals", route: "/bullion/goals", icon: Target },
  { id: "premium", label: "Premium", route: "/bullion/premium", icon: Crown, badge: "PRO" },
];

export function BullionNavTabs() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (route: string) => {
    if (route === "/bullion") {
      return location.pathname === "/bullion";
    }
    return location.pathname.startsWith(route);
  };

  return (
    <nav className="hidden lg:block border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-[57px] z-30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-1 overflow-x-auto scrollbar-hide py-1">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const active = isActive(tab.route);
            
            return (
              <button
                key={tab.id}
                onClick={() => navigate(tab.route)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
                  active 
                    ? "bg-primary text-primary-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span>{tab.label}</span>
                {tab.badge && (
                  <Badge 
                    variant="secondary" 
                    className={cn(
                      "text-[10px] px-1.5 py-0 h-4",
                      active ? "bg-primary-foreground/20 text-primary-foreground" : ""
                    )}
                  >
                    {tab.badge}
                  </Badge>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
