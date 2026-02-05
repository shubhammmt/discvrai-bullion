import { useState } from "react";
import { ArrowLeft, Bell, User, TrendingDown, Calendar, Gift, Cake, Heart, Sparkles, Star, PartyPopper, AlertCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";

const BullionNotifications = () => {
  const navigate = useNavigate();
  
  // Price Alert Settings
  const [priceAlertEnabled, setPriceAlertEnabled] = useState(true);
  
  // Gold Alerts
  const [goldDropAlert, setGoldDropAlert] = useState(true);
  const [goldJumpAlert, setGoldJumpAlert] = useState(true);
  const [goldPercentHighAlert, setGoldPercentHighAlert] = useState(false);
  const [goldPercentHighValue, setGoldPercentHighValue] = useState("5");
  const [goldPercentDropAlert, setGoldPercentDropAlert] = useState(false);
  const [goldPercentDropValue, setGoldPercentDropValue] = useState("5");
  
  // Silver Alerts
  const [silverDropAlert, setSilverDropAlert] = useState(true);
  const [silverJumpAlert, setSilverJumpAlert] = useState(true);
  const [silverPercentHighAlert, setSilverPercentHighAlert] = useState(false);
  const [silverPercentHighValue, setSilverPercentHighValue] = useState("5");
  const [silverPercentDropAlert, setSilverPercentDropAlert] = useState(false);
  const [silverPercentDropValue, setSilverPercentDropValue] = useState("5");
  
  // Auspicious Day Alerts
  const [birthdayAlert, setBirthdayAlert] = useState(true);
  const [anniversaryAlert, setAnniversaryAlert] = useState(true);
  const [akshayaTritiyaAlert, setAkshayaTritiyaAlert] = useState(true);
  const [dhanterasAlert, setDhanterasAlert] = useState(true);
  const [hinduNewYearAlert, setHinduNewYearAlert] = useState(true);
  
  // Offers
  const [offersEnabled, setOffersEnabled] = useState(true);
  
  // Mock check - in production, this would come from user profile context/API
  // For now, we'll simulate that anniversary is not filled
  const [hasAnniversaryDate, setHasAnniversaryDate] = useState(false);
  const [hasBirthdayDate, setHasBirthdayDate] = useState(true); // Assuming birthday is filled

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
              <span className="font-semibold text-lg">Notification Settings</span>
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
      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Price Alerts Section */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">Automatic Price Alerts</h2>
                <p className="text-sm text-muted-foreground">Get notified on price drops & targets</p>
              </div>
            </div>
            <Switch checked={priceAlertEnabled} onCheckedChange={setPriceAlertEnabled} />
          </div>
          
          {priceAlertEnabled && (
            <div className="space-y-4 pt-4 border-t">
              {/* Gold Alerts */}
              <div className="space-y-3">
                <h3 className="font-medium text-amber-600 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  Gold Alerts
                </h3>
                
                {/* Price Drop Alert */}
                <div className="flex items-center justify-between pl-5">
                  <div>
                    <p className="font-medium text-sm">Price Drop Alert</p>
                    <p className="text-xs text-muted-foreground">Notify when gold price drops significantly</p>
                  </div>
                  <Switch checked={goldDropAlert} onCheckedChange={setGoldDropAlert} />
                </div>
                
                {/* Price Jump Alert */}
                <div className="flex items-center justify-between pl-5">
                  <div>
                    <p className="font-medium text-sm">Price Jump Alert</p>
                    <p className="text-xs text-muted-foreground">Notify when gold price rises sharply</p>
                  </div>
                  <Switch checked={goldJumpAlert} onCheckedChange={setGoldJumpAlert} />
                </div>
                
                {/* X% High Alert */}
                <div className="flex items-center justify-between pl-5">
                  <div className="flex-1">
                    <p className="font-medium text-sm">Percentage High Alert</p>
                    <p className="text-xs text-muted-foreground">Notify when gold rises by X%</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input 
                      type="number" 
                      placeholder="5" 
                      value={goldPercentHighValue}
                      onChange={(e) => setGoldPercentHighValue(e.target.value)}
                      className="w-16 h-8 text-center"
                      disabled={!goldPercentHighAlert}
                    />
                    <span className="text-sm text-muted-foreground">%</span>
                    <Switch checked={goldPercentHighAlert} onCheckedChange={setGoldPercentHighAlert} />
                  </div>
                </div>
                
                {/* X% Drop Alert */}
                <div className="flex items-center justify-between pl-5">
                  <div className="flex-1">
                    <p className="font-medium text-sm">Percentage Drop Alert</p>
                    <p className="text-xs text-muted-foreground">Notify when gold drops by X%</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input 
                      type="number" 
                      placeholder="5" 
                      value={goldPercentDropValue}
                      onChange={(e) => setGoldPercentDropValue(e.target.value)}
                      className="w-16 h-8 text-center"
                      disabled={!goldPercentDropAlert}
                    />
                    <span className="text-sm text-muted-foreground">%</span>
                    <Switch checked={goldPercentDropAlert} onCheckedChange={setGoldPercentDropAlert} />
                  </div>
                </div>
              </div>
              
              {/* Silver Alerts */}
              <div className="space-y-3 pt-3">
                <h3 className="font-medium text-slate-500 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-400" />
                  Silver Alerts
                </h3>
                
                {/* Price Drop Alert */}
                <div className="flex items-center justify-between pl-5">
                  <div>
                    <p className="font-medium text-sm">Price Drop Alert</p>
                    <p className="text-xs text-muted-foreground">Notify when silver price drops significantly</p>
                  </div>
                  <Switch checked={silverDropAlert} onCheckedChange={setSilverDropAlert} />
                </div>
                
                {/* Price Jump Alert */}
                <div className="flex items-center justify-between pl-5">
                  <div>
                    <p className="font-medium text-sm">Price Jump Alert</p>
                    <p className="text-xs text-muted-foreground">Notify when silver price rises sharply</p>
                  </div>
                  <Switch checked={silverJumpAlert} onCheckedChange={setSilverJumpAlert} />
                </div>
                
                {/* X% High Alert */}
                <div className="flex items-center justify-between pl-5">
                  <div className="flex-1">
                    <p className="font-medium text-sm">Percentage High Alert</p>
                    <p className="text-xs text-muted-foreground">Notify when silver rises by X%</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input 
                      type="number" 
                      placeholder="5" 
                      value={silverPercentHighValue}
                      onChange={(e) => setSilverPercentHighValue(e.target.value)}
                      className="w-16 h-8 text-center"
                      disabled={!silverPercentHighAlert}
                    />
                    <span className="text-sm text-muted-foreground">%</span>
                    <Switch checked={silverPercentHighAlert} onCheckedChange={setSilverPercentHighAlert} />
                  </div>
                </div>
                
                {/* X% Drop Alert */}
                <div className="flex items-center justify-between pl-5">
                  <div className="flex-1">
                    <p className="font-medium text-sm">Percentage Drop Alert</p>
                    <p className="text-xs text-muted-foreground">Notify when silver drops by X%</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input 
                      type="number" 
                      placeholder="5" 
                      value={silverPercentDropValue}
                      onChange={(e) => setSilverPercentDropValue(e.target.value)}
                      className="w-16 h-8 text-center"
                      disabled={!silverPercentDropAlert}
                    />
                    <span className="text-sm text-muted-foreground">%</span>
                    <Switch checked={silverPercentDropAlert} onCheckedChange={setSilverPercentDropAlert} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Auspicious Day Alerts Section */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">Auspicious Day Alerts</h2>
                <p className="text-sm text-muted-foreground">Reminders for special occasions</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3 pt-4 border-t">
            {/* Birthday */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <Cake className="w-5 h-5 text-pink-500" />
                <div>
                  <p className="font-medium text-sm">Birthday</p>
                  <p className="text-xs text-muted-foreground">Special gold offers on your birthday</p>
                </div>
              </div>
              <Switch checked={birthdayAlert} onCheckedChange={setBirthdayAlert} />
            </div>
            
            {/* Anniversary */}
            <div className="space-y-2">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="font-medium text-sm">Anniversary</p>
                    <p className="text-xs text-muted-foreground">Gift gold/silver on your anniversary</p>
                  </div>
                </div>
                <Switch checked={anniversaryAlert} onCheckedChange={setAnniversaryAlert} />
              </div>
              
              {/* Show prompt if anniversary toggle is ON but date not set */}
              {anniversaryAlert && !hasAnniversaryDate && (
                <Alert className="ml-8 bg-amber-500/10 border-amber-500/30">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  <AlertDescription className="flex items-center justify-between">
                    <span className="text-sm text-amber-600">
                      Add your anniversary date to receive alerts
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-amber-600 hover:text-amber-700 hover:bg-amber-500/20 gap-1 h-7 px-2"
                      onClick={() => navigate("/bullion/profile")}
                    >
                      Add Now
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </AlertDescription>
                </Alert>
              )}
            </div>
            
            {/* Akshaya Tritiya */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <div>
                  <p className="font-medium text-sm">Akshaya Tritiya</p>
                  <p className="text-xs text-muted-foreground">Most auspicious day to buy gold</p>
                </div>
              </div>
              <Switch checked={akshayaTritiyaAlert} onCheckedChange={setAkshayaTritiyaAlert} />
            </div>
            
            {/* Dhanteras */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="font-medium text-sm">Dhanteras</p>
                  <p className="text-xs text-muted-foreground">Festival of wealth & prosperity</p>
                </div>
              </div>
              <Switch checked={dhanterasAlert} onCheckedChange={setDhanterasAlert} />
            </div>
            
            {/* Hindu New Year */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <PartyPopper className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="font-medium text-sm">Hindu New Year</p>
                  <p className="text-xs text-muted-foreground">Celebrate with precious metals</p>
                </div>
              </div>
              <Switch checked={hinduNewYearAlert} onCheckedChange={setHinduNewYearAlert} />
            </div>
          </div>
        </Card>

        {/* Special Offers Section */}
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                <Gift className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">Special Offers</h2>
                <p className="text-sm text-muted-foreground">Exclusive deals & bonus gold offers</p>
              </div>
            </div>
            <Switch checked={offersEnabled} onCheckedChange={setOffersEnabled} />
          </div>
        </Card>

        {/* Save Button */}
        <Button 
          className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
          size="lg"
        >
          Save Preferences
        </Button>
      </main>
    </div>
  );
};

export default BullionNotifications;
