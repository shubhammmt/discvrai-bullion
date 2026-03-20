import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  User, Phone, Mail, Shield, CreditCard, Fingerprint,
  Eye, EyeOff, CheckCircle2, LogOut, Sun, Moon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AuthUser } from './OTPLoginDialog';
import { useKyc } from '@/hooks/useKyc';
import { maskPAN } from '@/lib/kycStorage';

interface ProfileTabProps {
  authUser: AuthUser | null;
  onLogout: () => void;
}

function maskPhone(phone: string): string {
  if (phone.length < 6) return phone;
  return phone.slice(0, 4) + '••••' + phone.slice(-2);
}

function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!domain) return email;
  return local.slice(0, 2) + '••••@' + domain;
}

function maskAadhaar(aadhaar: string): string {
  return '•••• •••• ' + aadhaar.slice(-4);
}

const MOCK_PROFILE = {
  email: 'shubham.shri@gmail.com',
  aadhaar: '923456781234',
  pan: 'ABCPD1234F',
  joinedDate: 'August 2025',
  accountStatus: 'Verified' as const,
};

export function ProfileTab({ authUser, onLogout }: ProfileTabProps) {
  const { kyc, isKycDone } = useKyc();
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const toggleReveal = (key: string) => {
    setRevealed(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const userName = authUser?.name || 'Guest User';
  const userPhone = authUser?.phone || '+91••••••••••';
  const userEmail = authUser?.email || MOCK_PROFILE.email;
  const userId = authUser?.id || '455ea473-ae87-4e6e-9b3a-ec52e749082c';
  const pan = kyc?.pan || MOCK_PROFILE.pan;
  const aadhaar = MOCK_PROFILE.aadhaar;
  const initials = userName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  const detailRows = [
    {
      key: 'name',
      icon: User,
      label: 'FULL NAME',
      value: userName,
      maskable: false,
    },
    {
      key: 'phone',
      icon: Phone,
      label: 'PHONE',
      value: userPhone,
      maskedValue: maskPhone(userPhone),
      maskable: true,
    },
    {
      key: 'email',
      icon: Mail,
      label: 'EMAIL',
      value: userEmail,
      maskedValue: maskEmail(userEmail),
      maskable: true,
    },
    {
      key: 'pan',
      icon: CreditCard,
      label: 'PAN NUMBER',
      value: pan,
      maskedValue: maskPAN(pan),
      maskable: true,
    },
    {
      key: 'aadhaar',
      icon: Fingerprint,
      label: 'AADHAAR NUMBER',
      value: aadhaar,
      maskedValue: maskAadhaar(aadhaar),
      maskable: true,
    },
    {
      key: 'userId',
      icon: Shield,
      label: 'USER ID',
      value: userId,
      maskable: false,
    },
  ];

  return (
    <div className="space-y-5 max-w-lg mx-auto">
      {/* Profile Header Card */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-sip-brand via-purple-500 to-indigo-600 p-6 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
        <div className="relative flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl font-bold">
            {initials}
          </div>
          <div>
            <h2 className="text-xl font-bold">{userName}</h2>
            <p className="text-white/80 text-sm">{revealed.phone ? userPhone : maskPhone(userPhone)}</p>
            <Badge className="mt-1.5 bg-white/20 text-white border-white/30 text-[10px]">
              {MOCK_PROFILE.joinedDate}
            </Badge>
          </div>
        </div>
      </div>

      {/* Account Details */}
      <Card className="border-border">
        <CardContent className="p-5 space-y-0">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-sip-brand mb-4">
            Account Details
          </p>
          {detailRows.map((row, i) => (
            <div key={row.key}>
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <row.icon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {row.label}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    'text-sm font-medium text-foreground',
                    row.key === 'userId' && 'text-xs font-mono'
                  )}>
                    {row.maskable
                      ? (revealed[row.key] ? row.value : row.maskedValue)
                      : row.value}
                  </span>
                  {row.maskable && (
                    <button
                      onClick={() => toggleReveal(row.key)}
                      className="p-1 rounded-md hover:bg-muted transition-colors"
                      title={revealed[row.key] ? 'Hide' : 'Show'}
                    >
                      {revealed[row.key]
                        ? <EyeOff className="w-3.5 h-3.5 text-muted-foreground" />
                        : <Eye className="w-3.5 h-3.5 text-muted-foreground" />}
                    </button>
                  )}
                </div>
              </div>
              {i < detailRows.length - 1 && <Separator />}
            </div>
          ))}

          {/* Account Status */}
          <Separator />
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                ACCOUNT STATUS
              </span>
            </div>
            <Badge variant="outline" className="text-emerald-500 border-emerald-500/30 bg-emerald-500/10 text-xs">
              {MOCK_PROFILE.accountStatus}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* KYC Status */}
      <Card className="border-border">
        <CardContent className="p-5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-sip-brand mb-3">
            KYC Status
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                {isKycDone ? 'KYC Verified' : 'KYC Pending'}
              </span>
            </div>
            <Badge
              variant="outline"
              className={cn(
                'text-xs',
                isKycDone
                  ? 'text-emerald-500 border-emerald-500/30 bg-emerald-500/10'
                  : 'text-amber-500 border-amber-500/30 bg-amber-500/10'
              )}
            >
              {isKycDone ? '✅ Complete' : '⏳ Incomplete'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/20">
        <CardContent className="p-5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-destructive mb-3">
            Danger Zone
          </p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Sign Out</p>
              <p className="text-xs text-muted-foreground">End your current session</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-destructive border-destructive/30 hover:bg-destructive/10"
              onClick={onLogout}
            >
              <LogOut className="w-3.5 h-3.5 mr-1.5" />
              LOGOUT
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
