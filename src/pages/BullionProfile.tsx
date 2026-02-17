import { useState, useEffect } from "react";
import { ArrowLeft, User, Mail, Phone, MapPin, CreditCard, Shield, Users, ChevronRight, Check, AlertCircle, CalendarIcon, Copy, Gift, Share2 } from "lucide-react";
import { KycProfileSection } from "@/components/kyc/KycProfileSection";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Profile section types
interface ProfileData {
  mobile: string;
  email: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    pincode: string;
  };
  kyc: {
    name: string;
    dob: string;
    pan: string;
    verified: boolean;
    anniversary?: string;
  };
  upiAccounts: {
    id: string;
    upiId: string;
    isPrimary: boolean;
  }[];
  nominee: {
    name: string;
    relation: string;
  } | null;
}

// Generate a unique referral code
const generateReferralCode = (name: string): string => {
  const prefix = name.split(' ')[0].toUpperCase().slice(0, 4);
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}${random}`;
};

export default function BullionProfile() {
  const navigate = useNavigate();
  
  // Referral state
  const [referralCode, setReferralCode] = useState<string>("");
  const [referralCount, setReferralCount] = useState<number>(0);
  
  // Mock profile data - in production, this would come from API/context
  const [profile, setProfile] = useState<ProfileData>({
    mobile: "+91 9873961591",
    email: "shubham@discvr.ai",
    address: {
      line1: "123 Tech Park",
      line2: "Sector 62",
      city: "Noida",
      state: "Uttar Pradesh",
      pincode: "201301",
    },
    kyc: {
      name: "Shubham Srivastava",
      dob: "1990-01-15",
      pan: "ABCDE1234F",
      verified: true,
      anniversary: "",
    },
    upiAccounts: [
      { id: "1", upiId: "shubham@okaxis", isPrimary: true },
      { id: "2", upiId: "shubham@paytm", isPrimary: false },
    ],
    nominee: {
      name: "Priya Srivastava",
      relation: "Spouse",
    },
  });

  // Initialize referral code on mount
  useEffect(() => {
    const storedCode = localStorage.getItem("bullion_referral_code");
    const storedCount = localStorage.getItem("bullion_referral_count");
    
    if (storedCode) {
      setReferralCode(storedCode);
    } else {
      const newCode = generateReferralCode(profile.kyc.name);
      setReferralCode(newCode);
      localStorage.setItem("bullion_referral_code", newCode);
    }
    
    if (storedCount) {
      setReferralCount(parseInt(storedCount, 10));
    } else {
      // Mock: Set a random count for demo (0-15)
      const mockCount = Math.floor(Math.random() * 16);
      setReferralCount(mockCount);
      localStorage.setItem("bullion_referral_count", mockCount.toString());
    }
  }, [profile.kyc.name]);

  const [editingSection, setEditingSection] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const getInviteLink = () => {
    return `${window.location.origin}/bullion?ref=${referralCode}`;
  };

  // Calculate profile completion
  const getProfileCompletion = () => {
    let completed = 0;
    let total = 5;
    
    if (profile.mobile && profile.email) completed++;
    if (profile.address.line1 && profile.address.pincode) completed++;
    if (profile.kyc.verified) completed++;
    if (profile.upiAccounts.length > 0) completed++;
    if (profile.nominee) completed++;
    
    return Math.round((completed / total) * 100);
  };

  const completion = getProfileCompletion();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/bullion")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="font-bold text-lg">Profile & Settings</h1>
            <p className="text-xs text-muted-foreground">Manage your account details</p>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Profile Completion Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border-amber-500/20">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-black font-bold text-2xl">
                {profile.kyc.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h2 className="font-bold text-lg">{profile.kyc.name || "Complete Your Profile"}</h2>
                <p className="text-sm text-muted-foreground">{profile.email}</p>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Profile Completion</span>
                <span className="font-semibold text-amber-500">{completion}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${completion}%` }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </div>
              {completion < 100 && (
                <p className="text-xs text-muted-foreground">
                  Complete your profile to unlock all features
                </p>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Referral Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                  <Share2 className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-semibold">Refer & Earn</h3>
                  <p className="text-xs text-muted-foreground">Share with friends, earn rewards</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-purple-500">{referralCount}</p>
                <p className="text-xs text-muted-foreground">Referrals</p>
              </div>
            </div>

            {/* Referral Code */}
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Your Referral Code</Label>
              <div className="flex gap-2">
                <div className="flex-1 bg-muted/50 rounded-lg px-4 py-2.5 font-mono font-semibold tracking-wider text-center">
                  {referralCode}
                </div>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => copyToClipboard(referralCode, "Referral code")}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Copy Invite Link */}
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => copyToClipboard(getInviteLink(), "Invite link")}
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Invite Link
            </Button>

            {/* Reward Progress */}
            <div className="pt-2 border-t border-border/50">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Progress to ₹50 reward</span>
                <span className="font-semibold">{Math.min(referralCount, 10)}/10</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((referralCount / 10) * 100, 100)}%` }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </div>
            </div>

            {/* Reward Claim - Only show if 10+ referrals */}
            {referralCount >= 10 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-xl bg-gradient-to-br from-amber-500/20 via-amber-500/10 to-transparent border border-amber-500/30"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <Gift className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-amber-400">🎉 Congratulations!</p>
                    <p className="text-xs text-muted-foreground">You've unlocked a special reward</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Get <span className="font-bold text-amber-400">₹50 worth of Gold or Silver</span> as a thank you for your referrals!
                </p>
                <Button 
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold"
                  onClick={() => navigate("/bullion?reward=referral50")}
                >
                  Claim ₹50 Reward
                </Button>
              </motion.div>
            )}
          </Card>
        </motion.div>

        {/* Profile Sections */}
        <Accordion type="single" collapsible className="space-y-3">
          {/* Contact Information */}
          <AccordionItem value="contact" className="border rounded-xl px-4 bg-card">
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-blue-500" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">Contact Information</p>
                  <p className="text-xs text-muted-foreground">Mobile & Email</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="mobile" 
                      value={profile.mobile} 
                      readOnly 
                      className="bg-muted/50"
                    />
                    <Badge variant="secondary" className="whitespace-nowrap">
                      <Check className="w-3 h-3 mr-1" /> Verified
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="email" 
                      value={profile.email} 
                      readOnly
                      className="bg-muted/50"
                    />
                    <Badge variant="secondary" className="whitespace-nowrap">
                      <Check className="w-3 h-3 mr-1" /> Verified
                    </Badge>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Address */}
          <AccordionItem value="address" className="border rounded-xl px-4 bg-card">
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">Address</p>
                  <p className="text-xs text-muted-foreground">Delivery & Billing</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label>Address Line 1</Label>
                  <Input value={profile.address.line1} readOnly className="bg-muted/50" />
                </div>
                <div className="space-y-2">
                  <Label>Address Line 2</Label>
                  <Input value={profile.address.line2} readOnly className="bg-muted/50" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Input value={profile.address.city} readOnly className="bg-muted/50" />
                  </div>
                  <div className="space-y-2">
                    <Label>State</Label>
                    <Input value={profile.address.state} readOnly className="bg-muted/50" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Pincode</Label>
                  <Input value={profile.address.pincode} readOnly className="bg-muted/50" />
                </div>
                <Button variant="outline" className="w-full">
                  Edit Address
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* KYC */}
          <AccordionItem value="kyc" className="border rounded-xl px-4 bg-card">
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-amber-500" />
                </div>
                <div className="text-left flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">KYC Verification</p>
                  </div>
                  <p className="text-xs text-muted-foreground">PAN & DOB</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <KycProfileSection />

              {/* Anniversary Date - Optional */}
              <div className="space-y-2 mt-4 pt-4 border-t border-border/50">
                <Label className="flex items-center gap-2">
                  Anniversary Date
                  <span className="text-xs text-muted-foreground font-normal">(Optional)</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !profile.kyc.anniversary && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {profile.kyc.anniversary ? (
                        format(new Date(profile.kyc.anniversary), "PPP")
                      ) : (
                        <span>Select your anniversary date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={profile.kyc.anniversary ? new Date(profile.kyc.anniversary) : undefined}
                      onSelect={(date) => {
                        setProfile(prev => ({
                          ...prev,
                          kyc: {
                            ...prev.kyc,
                            anniversary: date ? date.toISOString() : ""
                          }
                        }));
                      }}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                <p className="text-xs text-muted-foreground">
                  Get special offers & reminders on your anniversary
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Payment Methods */}
          <AccordionItem value="payment" className="border rounded-xl px-4 bg-card">
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-purple-500" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">Payment Methods</p>
                  <p className="text-xs text-muted-foreground">{profile.upiAccounts.length} UPI accounts linked</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="space-y-3 pt-2">
                {profile.upiAccounts.map((upi) => (
                  <div 
                    key={upi.id}
                    className="flex items-center justify-between p-3 rounded-lg border bg-muted/30"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-xs font-bold text-purple-400">
                        UPI
                      </div>
                      <span className="font-medium">{upi.upiId}</span>
                    </div>
                    {upi.isPrimary && (
                      <Badge variant="secondary">Primary</Badge>
                    )}
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  + Add UPI Account
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Nominee */}
          <AccordionItem value="nominee" className="border rounded-xl px-4 bg-card">
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-rose-500" />
                </div>
                <div className="text-left flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">Nominee Details</p>
                    {!profile.nominee && (
                      <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                        <AlertCircle className="w-3 h-3 mr-1" /> Required
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {profile.nominee ? `${profile.nominee.name} (${profile.nominee.relation})` : "Not added yet"}
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="space-y-4 pt-2">
                {profile.nominee ? (
                  <>
                    <div className="space-y-2">
                      <Label>Nominee Name</Label>
                      <Input value={profile.nominee.name} readOnly className="bg-muted/50" />
                    </div>
                    <div className="space-y-2">
                      <Label>Relationship</Label>
                      <Input value={profile.nominee.relation} readOnly className="bg-muted/50" />
                    </div>
                    <Button variant="outline" className="w-full">
                      Edit Nominee
                    </Button>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground mb-4">
                      Adding a nominee ensures your gold holdings can be transferred to your loved ones
                    </p>
                    <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black">
                      Add Nominee
                    </Button>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Quick Links */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide px-1">
            More Options
          </h3>
          <Card className="divide-y divide-border">
            <QuickLinkItem icon={Shield} label="Privacy & Security" onClick={() => navigate("/terms-and-conditions")} />
            <QuickLinkItem icon={CreditCard} label="Transaction History" onClick={() => navigate("/bullion/portfolio")} />
          </Card>
        </div>

        {/* Logout Button */}
        <Button variant="outline" className="w-full text-destructive border-destructive/30 hover:bg-destructive/10">
          Log Out
        </Button>
      </main>
    </div>
  );
}

function QuickLinkItem({ icon: Icon, label, onClick }: { icon: React.ElementType; label: string; onClick?: () => void }) {
  return (
    <button 
      className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-muted-foreground" />
        <span className="font-medium">{label}</span>
      </div>
      <ChevronRight className="w-4 h-4 text-muted-foreground" />
    </button>
  );
}
