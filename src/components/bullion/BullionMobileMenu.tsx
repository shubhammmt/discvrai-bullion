import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Menu, 
  TrendingUp, 
  Wallet, 
  Newspaper, 
  Trophy, 
  Target, 
  Crown,
  Settings,
  ChevronRight,
  Gem,
  Banknote,
  Calculator,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

interface NavItem {
  id: string;
  label: string;
  route: string;
  icon: React.ElementType;
  badge?: string;
  section?: "main" | "more";
}

const navItems: NavItem[] = [
  { id: "bullion", label: "Bullion", route: "/bullion", icon: TrendingUp, section: "main" },
  { id: "portfolio", label: "Portfolio", route: "/bullion/portfolio", icon: Wallet, section: "main" },
  { id: "loans", label: "Loans", route: "/bullion/loans", icon: Banknote, section: "main" },
  { id: "news", label: "News", route: "/bullion/news", icon: Newspaper, section: "main" },
  { id: "contests", label: "Contests", route: "/bullion/contests", icon: Trophy, section: "main" },
  { id: "premium", label: "Premium", route: "/bullion/premium", icon: Crown, badge: "PRO", section: "main" },
  { id: "calculators", label: "Calculators", route: "/bullion/calculators", icon: Calculator, section: "main" },
  { id: "goals", label: "Goals", route: "/bullion/goals", icon: Target, section: "main" },
  { id: "trends", label: "Jewellery Trends", route: "/bullion/trends", icon: Gem, section: "main" },
];

export function BullionMobileMenu() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (route: string) => {
    return location.pathname === route || location.pathname.startsWith(route + "/");
  };

  const handleNavigate = (route: string) => {
    navigate(route);
    setOpen(false);
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
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.route)}
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
                    <ChevronRight className={cn("w-4 h-4", active ? "text-primary-foreground/70" : "text-muted-foreground")} />
                  </button>
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
