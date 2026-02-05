import { useState } from "react";
import { ArrowLeft, User, Mail, Phone, MapPin, CreditCard, Shield, Users, ChevronRight, Check, AlertCircle, CalendarIcon } from "lucide-react";
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

export default function BullionProfile() {
  const navigate = useNavigate();
  
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

  const [editingSection, setEditingSection] = useState<string | null>(null);

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
                    {profile.kyc.verified ? (
                      <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                        Verified
                      </Badge>
                    ) : (
                      <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                        Pending
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">Name, DOB & PAN</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label>Full Name (as per PAN)</Label>
                  <Input value={profile.kyc.name} readOnly className="bg-muted/50" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Date of Birth</Label>
                    <Input 
                      value={new Date(profile.kyc.dob).toLocaleDateString("en-IN")} 
                      readOnly 
                      className="bg-muted/50" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>PAN Number</Label>
                    <Input 
                      value={profile.kyc.pan.replace(/(.{5})(.{4})(.)/g, "$1****$3")} 
                      readOnly 
                      className="bg-muted/50" 
                    />
                  </div>
                </div>
                
                {/* Anniversary Date - Optional */}
                <div className="space-y-2">
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
                
                {profile.kyc.verified && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm text-emerald-400">Your KYC has been verified</span>
                  </div>
                )}
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
            <QuickLinkItem icon={Users} label="Refer & Earn" />
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
