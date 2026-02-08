import { useState } from "react";
import { ArrowLeft, Bell, User, TrendingDown, TrendingUp, Calendar, Gift, Cake, Heart, Sparkles, Star, PartyPopper, ChevronRight, Plus, BookOpen, Target, Send, MessageCircle, Coins, Medal, Clock, Eye, X, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { CreatePriceAlertDialog } from "@/components/bullion/CreatePriceAlertDialog";
import { toast } from "sonner";

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

interface BullionWatchItem {
  id: string;
  metal: 'gold' | 'silver';
  name: string;
  currentPrice: string;
  change: number;
  targetPrice?: string;
  alert?: string;
}

interface BullionCalendarEvent {
  date: string;
  event: string;
  type: 'festival' | 'personal' | 'sip' | 'target';
  metal?: 'gold' | 'silver';
}

interface SavedResearch {
  id: string;
  title: string;
  type: string;
  date: string;
  tags: string[];
  metal?: 'gold' | 'silver';
}

const CURRENT_PRICES = { gold: 7245, silver: 89 };

const BullionNotifications = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') === 'notifications' ? 'alerts' : 'watchlists';
  
  // Watchlist state
  const [activeWatchlist, setActiveWatchlist] = useState<'all' | 'gold' | 'silver'>('all');
  
  // New alert dialog state
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [editingAlert, setEditingAlert] = useState<PriceAlert | null>(null);
  
  // Active price alerts (replaces 16 individual state variables)
  const [priceAlerts, setPriceAlerts] = useState<PriceAlert[]>([
    { id: "pa1", metal: "gold", condition: "below", targetPrice: 7000, channels: { push: true, telegram: false, whatsapp: false } },
    { id: "pa2", metal: "gold", condition: "above", targetPrice: 7500, channels: { push: true, telegram: true, whatsapp: false } },
    { id: "pa3", metal: "silver", condition: "below", targetPrice: 85, channels: { push: true, telegram: false, whatsapp: true } },
  ]);

  // Mock data
  const watchlists = [
    { id: 'all', name: 'All Metals', count: 2, color: 'bg-gradient-to-r from-amber-500 to-slate-400' },
    { id: 'gold', name: 'Gold', count: 1, color: 'bg-amber-500' },
    { id: 'silver', name: 'Silver', count: 1, color: 'bg-slate-400' }
  ];

  const watchlistItems: BullionWatchItem[] = [
    { 
      id: '1',
      metal: 'gold', 
      name: '24K Digital Gold', 
      currentPrice: '₹7,245/gm', 
      change: 1.2, 
      targetPrice: '₹7,500',
      alert: 'Near target' 
    },
    { 
      id: '2',
      metal: 'silver', 
      name: 'Digital Silver', 
      currentPrice: '₹89/gm', 
      change: -0.8, 
      targetPrice: '₹85',
      alert: undefined 
    }
  ];

  const alerts: BullionAlert[] = [
    { id: '1', type: 'price_drop', metal: 'gold', message: 'Gold dropped 2.3% today - Good buying opportunity', time: '2 hours ago', priority: 'high' },
    { id: '2', type: 'sip_due', metal: 'gold', message: 'Your monthly Gold SIP is due tomorrow', time: '1 day ago', priority: 'medium' },
    { id: '3', type: 'festival', metal: 'gold', message: 'Dhanteras is in 15 days - Plan your purchase', time: '2 days ago', priority: 'low' },
    { id: '4', type: 'target_reached', metal: 'silver', message: 'Silver reached your target price of ₹85/gm', time: '3 hours ago', priority: 'high' }
  ];

  const savedResearch: SavedResearch[] = [
    { id: '1', title: 'Gold Price Outlook Q1 2026', type: 'Market Analysis', date: '2 days ago', tags: ['Gold', 'Forecast'], metal: 'gold' },
    { id: '2', title: 'Silver Industrial Demand Report', type: 'Research Report', date: '1 week ago', tags: ['Silver', 'Industrial'], metal: 'silver' },
    { id: '3', title: 'Digital vs Physical Gold Comparison', type: 'Guide', date: '3 days ago', tags: ['Investment', 'Comparison'] },
    { id: '4', title: 'Auspicious Days for Gold Buying 2026', type: 'Calendar Guide', date: '1 week ago', tags: ['Festival', 'Muhurat'] }
  ];

  const upcomingEvents: BullionCalendarEvent[] = [
    { date: 'Feb 12', event: 'Monthly Gold SIP', type: 'sip', metal: 'gold' },
    { date: 'Feb 14', event: "Valentine's Day - Gift Gold", type: 'personal' },
    { date: 'Mar 14', event: 'Hindu New Year', type: 'festival' },
    { date: 'Mar 28', event: 'Birthday Reminder', type: 'personal' },
    { date: 'Apr 20', event: 'Akshaya Tritiya', type: 'festival', metal: 'gold' },
    { date: 'Oct 29', event: 'Dhanteras 2026', type: 'festival', metal: 'gold' }
  ];

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
      default: return <Calendar size={14} />;
    }
  };

  const handleTelegramSubscribe = () => {
    window.open('https://t.me/discvrai_bullion', '_blank');
  };

  const handleWhatsAppSubscribe = () => {
    window.open('https://wa.me/919999999999?text=Subscribe%20to%20Bullion%20Alerts', '_blank');
  };

  const filteredWatchlistItems = activeWatchlist === 'all' 
    ? watchlistItems 
    : watchlistItems.filter(item => item.metal === activeWatchlist);

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
              <span className="font-semibold text-lg">Watchlist & Notifications</span>
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="watchlists">Watchlists</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="research">Research</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>

          {/* Watchlists Tab */}
          <TabsContent value="watchlists" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">My Watchlists</h2>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Target
              </Button>
            </div>

            <div className="grid lg:grid-cols-4 gap-6">
              {/* Watchlist Sidebar */}
              <div className="space-y-3">
                {watchlists.map((list) => (
                  <Card 
                    key={list.id} 
                    className={`cursor-pointer transition-colors ${activeWatchlist === list.id ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/30' : ''}`}
                    onClick={() => setActiveWatchlist(list.id as 'all' | 'gold' | 'silver')}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${list.color}`}></div>
                        <div className="flex-1">
                          <p className="font-medium">{list.name}</p>
                          <p className="text-sm text-muted-foreground">{list.count} items</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Watchlist Content */}
              <div className="lg:col-span-3">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>
                        {watchlists.find(w => w.id === activeWatchlist)?.name || 'All Metals'}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredWatchlistItems.map((item) => (
                        <div key={item.id} className={`flex items-center justify-between p-4 border rounded-lg ${getMetalColor(item.metal)}`}>
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              {getMetalIcon(item.metal)}
                              <h3 className="font-semibold">{item.name}</h3>
                              {item.alert && (
                                <Badge variant="secondary" className="text-xs">
                                  <Target className="w-3 h-3 mr-1" />
                                  {item.alert}
                                </Badge>
                              )}
                            </div>
                            {item.targetPrice && (
                              <p className="text-xs text-muted-foreground mt-1 ml-7">
                                Target: {item.targetPrice}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <p className="font-bold">{item.currentPrice}</p>
                              <p className={`text-sm ${item.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {item.change > 0 ? '+' : ''}{item.change}%
                              </p>
                            </div>
                            <Button size="sm" variant="outline">
                              <Eye size={14} className="mr-1" />
                              View
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

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

            {/* Offers for You - Redirect Card */}
            <Card 
              className="p-5 cursor-pointer hover:border-amber-400 transition-colors" 
              onClick={() => navigate('/bullion', { state: { scrollTo: 'offers' } })}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                    <Gift className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg">Offers for You</h2>
                    <p className="text-sm text-muted-foreground">View exclusive deals & bonus gold offers</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </Card>

            {/* Create Price Alert Dialog */}
            <CreatePriceAlertDialog
              open={showAlertDialog}
              onOpenChange={setShowAlertDialog}
              editAlert={editingAlert}
              onAlertCreated={(alert) => setPriceAlerts(prev => [...prev, alert])}
              onAlertUpdated={(updated) => setPriceAlerts(prev => prev.map(a => a.id === updated.id ? updated : a))}
            />
          </TabsContent>

          {/* Research Tab */}
          <TabsContent value="research" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Saved Research</h2>
              <Button variant="outline" size="sm">
                <BookOpen className="w-4 h-4 mr-2" />
                Browse All
              </Button>
            </div>

            <div className="space-y-4">
              {savedResearch.map((item) => (
                <Card key={item.id} className={getMetalColor(item.metal)}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getMetalIcon(item.metal)}
                          <h3 className="font-semibold">{item.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{item.type}</p>
                        <div className="flex gap-2 mb-2 flex-wrap">
                          {item.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground">{item.date}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Star className="w-4 h-4" />
                        </Button>
                        <Button size="sm">Open</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Calendar Tab */}
          <TabsContent value="calendar" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Bullion Calendar</h2>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Event
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Upcoming Events */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingEvents.map((event, index) => (
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
                        {event.metal && getMetalIcon(event.metal)}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Auspicious Days */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    Auspicious Days 2026
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30">
                      <div className="flex items-center gap-3">
                        <Sparkles className="w-5 h-5 text-amber-500" />
                        <div>
                          <p className="font-medium text-sm">Akshaya Tritiya</p>
                          <p className="text-xs text-muted-foreground">April 20, 2026</p>
                        </div>
                      </div>
                      <Badge className="bg-amber-500 text-white">Most Auspicious</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950/30">
                      <div className="flex items-center gap-3">
                        <Star className="w-5 h-5 text-yellow-500" />
                        <div>
                          <p className="font-medium text-sm">Dhanteras</p>
                          <p className="text-xs text-muted-foreground">October 29, 2026</p>
                        </div>
                      </div>
                      <Badge variant="secondary">Festival</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 rounded-lg bg-orange-50 dark:bg-orange-950/30">
                      <div className="flex items-center gap-3">
                        <PartyPopper className="w-5 h-5 text-orange-500" />
                        <div>
                          <p className="font-medium text-sm">Hindu New Year</p>
                          <p className="text-xs text-muted-foreground">March 14, 2026</p>
                        </div>
                      </div>
                      <Badge variant="secondary">Festival</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 rounded-lg bg-pink-50 dark:bg-pink-950/30">
                      <div className="flex items-center gap-3">
                        <Cake className="w-5 h-5 text-pink-500" />
                        <div>
                          <p className="font-medium text-sm">Your Birthday</p>
                          <p className="text-xs text-muted-foreground">March 28, 2026</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => navigate('/bullion/profile')}>
                        Edit Date
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 rounded-lg bg-red-50 dark:bg-red-950/30">
                      <div className="flex items-center gap-3">
                        <Heart className="w-5 h-5 text-red-500" />
                        <div>
                          <p className="font-medium text-sm">Anniversary</p>
                          <p className="text-xs text-muted-foreground">Not set</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => navigate('/bullion/profile')}>
                        Add Date
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default BullionNotifications;
