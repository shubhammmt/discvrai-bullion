import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Articles data
const articles = [
  {
    id: "1",
    title: "Understanding Digital Gold: A Complete Beginner's Guide",
    category: "gold",
    readTime: 8,
  },
  {
    id: "2",
    title: "Silver Investment: Why It's Called 'Poor Man's Gold'",
    category: "silver",
    readTime: 6,
  },
  {
    id: "3",
    title: "Loan Against Mutual Funds: Unlock Your Investment's Potential",
    category: "lamf",
    readTime: 10,
  },
  {
    id: "6",
    title: "Gold SIP vs Lump Sum: Which Strategy Works Best?",
    category: "gold",
    readTime: 9,
  },
  {
    id: "10",
    title: "Tax Planning with Gold Investments: A Complete Guide",
    category: "personal",
    readTime: 12,
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

export function LearnGrowCarousel() {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 280;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <Card className="p-4 bg-card border-border overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-primary" />
          </div>
          <h3 className="font-semibold text-sm">Learn & Grow</h3>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide pb-1 -mx-1 px-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {articles.map((article) => (
          <Card
            key={article.id}
            className="flex-shrink-0 w-[240px] p-3 bg-muted/50 hover:bg-muted/80 cursor-pointer transition-colors border-border/50"
            onClick={() => navigate("/bullion/premium")}
          >
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className={`text-[10px] px-1.5 py-0.5 ${getCategoryColor(article.category)}`}>
                {article.category.toUpperCase()}
              </Badge>
              <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                <Clock className="w-2.5 h-2.5" />
                {article.readTime}m
              </span>
            </div>
            <h4 className="text-xs font-medium leading-tight line-clamp-2">
              {article.title}
            </h4>
          </Card>
        ))}
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="w-full mt-3 text-xs text-primary hover:text-primary/80 h-8"
        onClick={() => navigate("/bullion/premium")}
      >
        View All Articles →
      </Button>
    </Card>
  );
}
