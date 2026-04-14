import { useState, useMemo, useCallback } from "react";
import { ArrowLeft, Bell, User, TrendingDown, TrendingUp, Calendar as CalendarIcon, Gift, Cake, Heart, Sparkles, Star, PartyPopper, ChevronRight, Plus, Bookmark, Target, Send, MessageCircle, Coins, Medal, Clock, Eye, X, Pencil, Trash2, BookOpen, Users, CheckCircle2, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { CreatePriceAlertDialog } from "@/components/bullion/CreatePriceAlertDialog";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { format } from "date-fns";
import { getMonthlySIPEvents } from "@/data/bullionSIPData";

// Types
interface BullionAlert {
  id: string;
  type: 'price_drop' | 'price_jump' | 'sip_due' | 'festival' | 'target_reached';
  metal: 'gold' | 'silver';
  message: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
}

interface PriceAlert {
  id: string;
  metal: "gold" | "silver";
  condition: "above" | "below";
  targetPrice: number;
  channels: { push: boolean; telegram: boolean; whatsapp: boolean };
}

interface BullionCalendarEvent {
  date: string;
  event: string;
  type: 'festival' | 'personal' | 'sip' | 'target';
  metal?: 'gold' | 'silver';
}

interface BookmarkedArticle {
  id: string;
  title: string;
  image: string;
  category: string;
  readTime: number;
  source: string;
  date: string;
  tags: string[];
}

const CURRENT_PRICES = { gold: 7245, silver: 89 };

const BullionNotifications = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') === 'notifications' ? 'alerts' : 'alerts';
  
  // New alert dialog state
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [editingAlert, setEditingAlert] = useState<PriceAlert | null>(null);
  
  // Active price alerts
  const [priceAlerts, setPriceAlerts] = useState<PriceAlert[]>([
    { id: "pa1", metal: "gold", condition: "below", targetPrice: 7000, channels: { push: true, telegram: false, whatsapp: false } },
    { id: "pa2", metal: "gold", condition: "above", targetPrice: 7500, channels: { push: true, telegram: true, whatsapp: false } },
    { id: "pa3", metal: "silver", condition: "below", targetPrice: 85, channels: { push: true, telegram: false, whatsapp: true } },
  ]);

  // Bookmarked articles state
  const [bookmarkedArticles, setBookmarkedArticles] = useState<BookmarkedArticle[]>([
    { id: '1', title: "Understanding Digital Gold: A Complete Beginner's Guide", image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=400", category: "gold", readTime: 8, source: "Discvr Premium", date: '2 days ago', tags: ['Gold', 'Beginner'] },
    { id: '2', title: "Silver Investment: Why It's Called 'Poor Man's Gold'", image: "https://images.unsplash.com/photo-1589787168422-b48f4f40dd5c?w=400", category: "silver", readTime: 6, source: "Discvr Premium", date: '1 week ago', tags: ['Silver', 'Investment'] },
    { id: '3', title: "Gold SIP vs Lump Sum: Which Strategy Works Best?", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400", category: "gold", readTime: 9, source: "Discvr Premium", date: '3 days ago', tags: ['SIP', 'Strategy'] },
    { id: '4', title: "Tax Planning with Gold Investments: A Complete Guide", image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=400", category: "personal", readTime: 12, source: "Discvr Premium", date: '1 week ago', tags: ['Tax', 'Planning'] },
  ]);

  // Mock data
  const alerts: BullionAlert[] = [
    { id: '1', type: 'price_drop', metal: 'gold', message: 'Gold dropped 2.3% today - Good buying opportunity', time: '2 hours ago', priority: 'high' },
    { id: '2', type: 'sip_due', metal: 'gold', message: 'Your monthly Gold SIP is due tomorrow', time: '1 day ago', priority: 'medium' },
    { id: '3', type: 'festival', metal: 'gold', message: 'Dhanteras is in 15 days - Plan your purchase', time: '2 days ago', priority: 'low' },
    { id: '4', type: 'target_reached', metal: 'silver', message: 'Silver reached your target price of ₹85/gm', time: '3 hours ago', priority: 'high' }
  ];

  // Build upcoming events: active monthly SIPs from portfolio + personal reminders
  const sipEvents = getMonthlySIPEvents();
  const [upcomingEvents, setUpcomingEvents] = useState<BullionCalendarEvent[]>([
    ...sipEvents,
    { date: 'Mar 28', event: 'Birthday Reminder', type: 'personal' },
    { date: 'Jun 15', event: 'Anniversary Reminder', type: 'personal' },
  ]);

  // Toggle states for upcoming events — auto-populate keys from SIP events
  const [eventToggles, setEventToggles] = useState<Record<string, boolean>>(() => {
    const toggles: Record<string, boolean> = {
      'Birthday Reminder': true,
      'Anniversary Reminder': true,
    };
    sipEvents.forEach(e => { toggles[e.event] = true; });
    return toggles;
  });

  // Auspicious days data with toggles
  const [auspiciousDays, setAuspiciousDays] = useState([
    { name: 'Akshaya Tritiya', date: 'April 20, 2026', badge: 'Most Auspicious', color: 'amber', enabled: true },
    { name: 'Dhanteras', date: 'October 29, 2026', badge: 'Festival', color: 'yellow', enabled: true },
    { name: 'Hindu New Year', date: 'March 14, 2026', badge: 'Festival', color: 'orange', enabled: true },
    { name: 'Eid', date: 'March 31, 2026', badge: 'Festival', color: 'green', enabled: true },
    { name: 'Christmas', date: 'December 25, 2026', badge: 'Festival', color: 'red', enabled: true },
    { name: 'Gurupurab', date: 'November 8, 2026', badge: 'Festival', color: 'blue', enabled: true },
    { name: 'Diwali', date: 'October 28, 2026', badge: 'Festival', color: 'purple', enabled: true },
    { name: 'Holi', date: 'March 17, 2026', badge: 'Festival', color: 'pink', enabled: true },
  ]);

  const toggleEvent = useCallback((eventName: string) => {
    setEventToggles(prev => ({ ...prev, [eventName]: !prev[eventName] }));
    toast.success(`${eventName} ${eventToggles[eventName] ? 'disabled' : 'enabled'}`);
  }, [eventToggles]);

  const toggleAuspiciousDay = useCallback((index: number) => {
    setAuspiciousDays(prev => prev.map((d, i) => i === index ? { ...d, enabled: !d.enabled } : d));
    toast.success(`${auspiciousDays[index].name} reminder ${auspiciousDays[index].enabled ? 'disabled' : 'enabled'}`);
  }, [auspiciousDays]);

  // Add Event dialog state
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEventName, setNewEventName] = useState('');
  const [newEventDate, setNewEventDate] = useState<Date | undefined>(undefined);
  const [newEventType, setNewEventType] = useState<'festival' | 'personal' | 'sip' | 'target'>('personal');
  const [newEventMetal, setNewEventMetal] = useState<'gold' | 'silver' | 'none'>('none');
  const [calendarSearch, setCalendarSearch] = useState('');

  const getMetalIcon = (metal?: 'gold' | 'silver') => {
    if (metal === 'gold') return <Coins size={16} className="text-amber-500" />;
    if (metal === 'silver') return <Medal size={16} className="text-slate-500" />;
    return <Sparkles size={16} className="text-purple-500" />;
  };

  const getMetalColor = (metal?: 'gold' | 'silver') => {
    if (metal === 'gold') return 'border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-950/30';
    if (metal === 'silver') return 'border-slate-200 bg-slate-50 dark:border-slate-700/50 dark:bg-slate-900/30';
    return 'border-purple-200 bg-purple-50 dark:border-purple-900/50 dark:bg-purple-950/30';
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'festival': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300';
      case 'personal': return 'bg-pink-100 text-pink-700 dark:bg-pink-900/50 dark:text-pink-300';
      case 'sip': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300';
      case 'target': return 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'festival': return <Sparkles size={14} />;
      case 'personal': return <Heart size={14} />;
      case 'sip': return <Clock size={14} />;
      case 'target': return <Target size={14} />;
      default: return <CalendarIcon size={14} />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "gold": return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
      case "silver": return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
      case "lamf": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "personal": return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleTelegramSubscribe = () => {
    window.open('https://t.me/discvrai_bullion', '_blank');
  };

  const handleWhatsAppSubscribe = () => {
    window.open('https://wa.me/919999999999?text=Subscribe%20to%20Bullion%20Alerts', '_blank');
  };

  const handleRemoveBookmark = (id: string) => {
    setBookmarkedArticles(prev => prev.filter(a => a.id !== id));
    toast.success("Bookmark removed");
  };

  const handleAddEvent = () => {
    if (!newEventName.trim() || !newEventDate) {
      toast.error("Please enter event name and select a date");
      return;
    }
    const dateStr = format(newEventDate, 'MMM dd');
    const newEvent: BullionCalendarEvent = {
      date: dateStr,
      event: newEventName.trim(),
      type: newEventType,
      metal: newEventMetal === 'none' ? undefined : newEventMetal,
    };
    setUpcomingEvents(prev => [...prev, newEvent].sort((a, b) => a.date.localeCompare(b.date)));
    setNewEventName('');
    setNewEventDate(undefined);
    setNewEventType('personal');
    setNewEventMetal('none');
    setShowAddEvent(false);
    toast.success("Event added to calendar!");
  };

  const filteredEvents = useMemo(() => {
    if (!calendarSearch.trim()) return upcomingEvents;
    const q = calendarSearch.toLowerCase();
    return upcomingEvents.filter(e => 
      e.event.toLowerCase().includes(q) || 
      e.date.toLowerCase().includes(q) || 
      e.type.toLowerCase().includes(q)
    );
  }, [upcomingEvents, calendarSearch]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/bullion")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                <Bell className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-lg">Alerts & Bookmarks</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Subscription CTA */}
        <Card className="mb-6 bg-gradient-to-r from-amber-50 to-slate-50 dark:from-amber-950/30 dark:to-slate-950/30 border-amber-200 dark:border-amber-900/50">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-foreground mb-1">Stay Updated with Price Alerts</h3>
                <p className="text-sm text-muted-foreground">Get instant notifications for price movements and auspicious days</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm"
                  onClick={handleTelegramSubscribe}
                  className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-2"
                >
                  <Send size={14} className="mr-1.5" />
                  Telegram
                </Button>
                <Button 
                  size="sm"
                  onClick={handleWhatsAppSubscribe}
                  className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-2"
                >
                  <MessageCircle size={14} className="mr-1.5" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue={defaultTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>

          {/* Alerts Tab */}
          <TabsContent value="alerts" className="space-y-6">
            {/* Create New Alert Button */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Price Alerts</h2>
              <Button 
                size="sm"
                onClick={() => { setEditingAlert(null); setShowAlertDialog(true); }}
                className="bg-amber-500 hover:bg-amber-600 text-black"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Alert
              </Button>
            </div>

            {/* Active Price Alerts List */}
            {priceAlerts.length === 0 ? (
              <Card className="p-8 text-center">
                <Bell className="w-12 h-12 mx-auto text-muted-foreground/40 mb-3" />
                <h3 className="font-semibold text-lg mb-1">No Price Alerts Yet</h3>
                <p className="text-sm text-muted-foreground mb-4">Create your first alert to get notified when prices hit your target</p>
                <Button onClick={() => { setEditingAlert(null); setShowAlertDialog(true); }} className="bg-amber-500 hover:bg-amber-600 text-black">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Alert
                </Button>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {priceAlerts.map((alert) => {
                  const currentPrice = CURRENT_PRICES[alert.metal];
                  const isGold = alert.metal === "gold";
                  const diff = alert.condition === "above" 
                    ? ((currentPrice / alert.targetPrice) * 100)
                    : ((alert.targetPrice > 0 ? (1 - (currentPrice - alert.targetPrice) / currentPrice) * 100 : 0));
                  const progress = Math.min(Math.max(diff, 0), 100);
                  
                  return (
                    <Card key={alert.id} className={getMetalColor(alert.metal)}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {getMetalIcon(alert.metal)}
                            <span className="font-semibold text-sm">{isGold ? "Gold" : "Silver"}</span>
                            <Badge variant="secondary" className="text-xs">
                              {alert.condition === "above" ? "↑ Above" : "↓ Below"}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Current</span>
                            <span className="font-medium">₹{currentPrice.toLocaleString("en-IN")}/gm</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Target</span>
                            <span className="font-bold">₹{alert.targetPrice.toLocaleString("en-IN")}/gm</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>

                        <div className="flex items-center gap-1 mb-3">
                          {alert.channels.push && <Badge variant="outline" className="text-xs px-1.5">Push</Badge>}
                          {alert.channels.telegram && <Badge variant="outline" className="text-xs px-1.5">TG</Badge>}
                          {alert.channels.whatsapp && <Badge variant="outline" className="text-xs px-1.5">WA</Badge>}
                        </div>

                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => { setEditingAlert(alert); setShowAlertDialog(true); }}
                          >
                            <Pencil className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-destructive hover:text-destructive"
                            onClick={() => {
                              setPriceAlerts(prev => prev.filter(a => a.id !== alert.id));
                              toast.success("Alert deleted");
                            }}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}

            {/* Recent Notifications */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Recent Notifications</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {alerts.map((alert) => (
                  <Card key={alert.id} className={getMetalColor(alert.metal)}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {getMetalIcon(alert.metal)}
                          <Badge variant={alert.priority === 'high' ? 'destructive' : alert.priority === 'medium' ? 'default' : 'secondary'}>
                            {alert.priority}
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">{alert.time}</span>
                      </div>
                      <p className="text-sm text-foreground mb-3">{alert.message}</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <X className="w-3 h-3 mr-1" />
                          Dismiss
                        </Button>
                        <Button size="sm" className="flex-1">
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Offers for You */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Gift className="w-5 h-5 text-amber-500" />
                  Offers for You
                </h2>
              </div>

              {/* Welcome Offer Card */}
              <Card className="border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40 overflow-hidden">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Gift className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wide">Welcome Offer</span>
                        <Badge variant="secondary" className="text-xs bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800">First Purchase</Badge>
                      </div>
                      <p className="font-bold text-xl text-foreground">₹10 Free Gold</p>
                      <p className="text-sm text-muted-foreground mt-0.5 mb-3">On your first gold purchase of ₹500 or more</p>

                      {/* How it works */}
                      <div className="space-y-1.5 mb-4">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                          <span>Minimum transaction value: ₹500</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                          <span>₹10 gold auto-credited to your Bullion wallet</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                          <span>"Welcome Reward Applied" banner shown at checkout</span>
                        </div>
                      </div>

                      <Button
                        size="sm"
                        className="bg-amber-500 hover:bg-amber-600 text-white"
                        onClick={() => { navigate('/bullion'); toast.success("Welcome offer applied! Buy gold worth ₹500+ to claim."); }}
                      >
                        Claim Now
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Refer & Earn Card */}
              <Card className="border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-950/40 overflow-hidden">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">Refer &amp; Earn</span>
                        <Badge variant="secondary" className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800">Milestone Program</Badge>
                      </div>
                      <p className="font-bold text-xl text-foreground">₹5 Gold per Referral</p>
                      <p className="text-sm text-muted-foreground mt-0.5 mb-3">Earn ₹5 in free gold for every friend who completes their first ₹500 purchase</p>



                      {/* Conditions */}
                      <div className="space-y-1.5 mb-4">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                          <span>Referee must complete first transaction of ₹500+</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                          <span>₹5 gold credited per successful referral, instantly</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                          onClick={() => {
                            const referralLink = `https://discvrai-bullion.lovable.app/bullion?ref=USER123`;
                            navigator.clipboard.writeText(referralLink);
                            toast.success("Referral link copied!", { description: "Share with friends and earn ₹5 gold per referral!" });
                          }}
                        >
                          Copy Referral Link
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-blue-300 dark:border-blue-700 text-blue-600 dark:text-blue-400"
                          onClick={() => navigate('/bullion/profile')}
                        >
                          View in Profile
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Create Price Alert Dialog */}
            <CreatePriceAlertDialog
              open={showAlertDialog}
              onOpenChange={setShowAlertDialog}
              editAlert={editingAlert}
              onAlertCreated={(alert) => setPriceAlerts(prev => [...prev, alert])}
              onAlertUpdated={(updated) => setPriceAlerts(prev => prev.map(a => a.id === updated.id ? updated : a))}
            />
          </TabsContent>

          {/* Bookmarks Tab */}
          <TabsContent value="bookmarks" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Bookmarked Articles</h2>
              <Button variant="outline" size="sm" onClick={() => navigate('/bullion/premium')}>
                <BookOpen className="w-4 h-4 mr-2" />
                Browse Premium
              </Button>
            </div>

            {bookmarkedArticles.length === 0 ? (
              <Card className="p-8 text-center">
                <Bookmark className="w-12 h-12 mx-auto text-muted-foreground/40 mb-3" />
                <h3 className="font-semibold text-lg mb-1">No Bookmarks Yet</h3>
                <p className="text-sm text-muted-foreground mb-4">Save articles from Premium to read them later</p>
                <Button onClick={() => navigate('/bullion/premium')} className="bg-amber-500 hover:bg-amber-600 text-black">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Browse Premium Articles
                </Button>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {bookmarkedArticles.map((article) => (
                  <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-all group">
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-2 right-2 bg-background/80 backdrop-blur hover:bg-destructive hover:text-white h-8 w-8"
                        onClick={() => handleRemoveBookmark(article.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className={getCategoryColor(article.category)}>
                          {article.category.toUpperCase()}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.readTime} min
                        </span>
                      </div>
                      <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-amber-500 transition-colors">
                        {article.title}
                      </h3>
                      <div className="flex gap-1 mb-3 flex-wrap">
                        {article.tags.map((tag, i) => (
                          <Badge key={i} variant="outline" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{article.date}</span>
                        <Button size="sm" onClick={() => navigate('/bullion/premium')} className="bg-amber-500 hover:bg-amber-600 text-black text-xs">
                          Read Now <ChevronRight className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Calendar Tab */}
          <TabsContent value="calendar" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <h2 className="text-xl font-semibold">Bullion Calendar</h2>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search festivals, events..."
                    value={calendarSearch}
                    onChange={e => setCalendarSearch(e.target.value)}
                    className="pl-9 h-9 text-sm sm:w-64"
                  />
                  {calendarSearch && (
                    <button onClick={() => setCalendarSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2">
                      <X className="w-3.5 h-3.5 text-muted-foreground" />
                    </button>
                  )}
                </div>
                <Button size="sm" onClick={() => setShowAddEvent(true)} className="bg-amber-500 hover:bg-amber-600 text-black">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Event
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Upcoming Events */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5" />
                    {calendarSearch ? `Results for "${calendarSearch}"` : 'Upcoming Events'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {filteredEvents.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">No events found</p>
                    ) : (
                      filteredEvents.map((event, index) => (
                         <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getEventColor(event.type)}`}>
                              {getEventIcon(event.type)}
                            </div>
                            <div>
                              <p className="font-medium text-sm">{event.event}</p>
                              <p className="text-xs text-muted-foreground">{event.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {event.metal && getMetalIcon(event.metal)}
                            <Badge variant="outline" className="text-xs capitalize">{event.type}</Badge>
                            <Switch
                              checked={eventToggles[event.event] ?? true}
                              onCheckedChange={() => toggleEvent(event.event)}
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    Auspicious Days 2026
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {auspiciousDays.map((day, index) => {
                      const bgColors: Record<string, string> = {
                        amber: 'bg-amber-50 dark:bg-amber-950/30',
                        yellow: 'bg-yellow-50 dark:bg-yellow-950/30',
                        orange: 'bg-orange-50 dark:bg-orange-950/30',
                        green: 'bg-green-50 dark:bg-green-950/30',
                        red: 'bg-red-50 dark:bg-red-950/30',
                        blue: 'bg-blue-50 dark:bg-blue-950/30',
                        purple: 'bg-purple-50 dark:bg-purple-950/30',
                        pink: 'bg-pink-50 dark:bg-pink-950/30',
                      };
                      const iconColors: Record<string, string> = {
                        amber: 'text-amber-500',
                        yellow: 'text-yellow-500',
                        orange: 'text-orange-500',
                        green: 'text-green-500',
                        red: 'text-red-500',
                        blue: 'text-blue-500',
                        purple: 'text-purple-500',
                        pink: 'text-pink-500',
                      };
                      return (
                        <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${bgColors[day.color] || 'bg-muted/50'} ${!day.enabled ? 'opacity-50' : ''}`}>
                          <div className="flex items-center gap-3">
                            <Sparkles className={`w-5 h-5 ${iconColors[day.color] || 'text-amber-500'}`} />
                            <div>
                              <p className="font-medium text-sm">{day.name}</p>
                              <p className="text-xs text-muted-foreground">{day.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={day.badge === 'Most Auspicious' ? 'bg-amber-500 text-white' : ''} variant={day.badge === 'Most Auspicious' ? 'default' : 'secondary'}>
                              {day.badge}
                            </Badge>
                            <Switch
                              checked={day.enabled}
                              onCheckedChange={() => toggleAuspiciousDay(index)}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Add Event Dialog */}
        <Dialog open={showAddEvent} onOpenChange={setShowAddEvent}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                Add New Event
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Event Name</label>
                <Input
                  placeholder="e.g. Diwali Gold Purchase, SIP Due..."
                  value={newEventName}
                  onChange={e => setNewEventName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newEventDate ? format(newEventDate, 'PPP') : <span className="text-muted-foreground">Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={newEventDate}
                      onSelect={setNewEventDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Event Type</label>
                <Select value={newEventType} onValueChange={(v) => setNewEventType(v as any)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="festival">Festival</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="sip">SIP Reminder</SelectItem>
                    <SelectItem value="target">Price Target</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Metal (Optional)</label>
                <Select value={newEventMetal} onValueChange={(v) => setNewEventMetal(v as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="None" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="gold">Gold</SelectItem>
                    <SelectItem value="silver">Silver</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddEvent(false)}>Cancel</Button>
              <Button onClick={handleAddEvent} className="bg-amber-500 hover:bg-amber-600 text-black">
                <Plus className="w-4 h-4 mr-1" />
                Add Event
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default BullionNotifications;
