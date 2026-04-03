import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import {
  User, Phone, Mail, Shield, CreditCard, Fingerprint,
  Eye, EyeOff, CheckCircle2, LogOut, Loader2, Sun, Moon,
  Pencil, Check, X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AuthUser } from './OTPLoginDialog';
import { API_CONFIG } from '@/config/api';
import { toast } from 'sonner';

interface ProfileTabProps {
  authUser: AuthUser | null;
  onLogout: () => void;
}

interface UserProfile {
  user_id: string;
  name: string | null;
  phone: string | null;
  email: string | null;
  pan: string | null;
  aadhaar: string | null;
  kyc_status: string | null;
  created_at: string | null;
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
  if (aadhaar.length < 4) return aadhaar;
  return '•••• •••• ' + aadhaar.slice(-4);
}

function maskPAN(pan: string): string {
  if (pan.length < 4) return pan;
  return pan.slice(0, 2) + '••••••' + pan.slice(-2);
}

const HARDCODED_USER_ID = 'a7ca0dcf-3c88-45c6-b4ac-e40fde319956';

export function ProfileTab({ authUser, onLogout }: ProfileTabProps) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [saving, setSaving] = useState(false);

  const userId = authUser?.id || HARDCODED_USER_ID;

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`https://agentapi.discvr.ai/webhook/get-user-profile?user_id=${userId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.profile) {
          setProfile(data.profile);
        } else {
          setError('Failed to load profile');
        }
      })
      .catch(() => setError('Network error'))
      .finally(() => setLoading(false));
  }, [userId]);

  const toggleReveal = (key: string) => {
    setRevealed(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const startEdit = (field: string, currentValue: string) => {
    setEditingField(field);
    setEditValue(currentValue);
  };

  const cancelEdit = () => {
    setEditingField(null);
    setEditValue('');
  };

  const saveEdit = async () => {
    if (!editingField || !editValue.trim()) return;
    setSaving(true);
    try {
      const payload: Record<string, string> = {
        user_id: userId,
        [editingField]: editValue.trim(),
      };
      const res = await fetch('https://agentapi.discvr.ai/webhook/update-user-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        setProfile(prev => prev ? { ...prev, [editingField]: editValue.trim() } : prev);
        toast.success(`${editingField === 'name' ? 'Name' : 'Email'} updated successfully`);
        cancelEdit();
      } else {
        toast.error(data?.message || 'Failed to update');
      }
    } catch {
      toast.error('Network error while updating');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-sip-brand" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        <p>{error || 'Could not load profile'}</p>
      </div>
    );
  }

  const userName = profile.name || authUser?.name || 'Guest User';
  const userPhone = profile.phone || '';
  const userEmail = profile.email || '';
  const pan = profile.pan || '';
  const aadhaar = profile.aadhaar || '';
  const profileUserId = profile.user_id;
  const isKycDone = profile.kyc_status === 'kycRestrictedComplete';
  const initials = userName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  const editable = new Set(['name', 'email']);

  const detailRows = [
    { key: 'name', icon: User, label: 'FULL NAME', value: userName, maskable: false },
    ...(userPhone ? [{
      key: 'phone', icon: Phone, label: 'PHONE', value: userPhone,
      maskedValue: maskPhone(userPhone), maskable: true,
    }] : []),
    {
      key: 'email', icon: Mail, label: 'EMAIL', value: userEmail || '',
      maskedValue: userEmail ? maskEmail(userEmail) : '', maskable: !!userEmail,
    },
    ...(pan ? [{
      key: 'pan', icon: CreditCard, label: 'PAN NUMBER', value: pan,
      maskedValue: maskPAN(pan), maskable: true,
    }] : []),
    ...(aadhaar ? [{
      key: 'aadhaar', icon: Fingerprint, label: 'AADHAAR NUMBER', value: aadhaar,
      maskedValue: maskAadhaar(aadhaar), maskable: true,
    }] : []),
    { key: 'userId', icon: Shield, label: 'USER ID', value: profileUserId, maskable: false },
  ];

  return (
    <div className="space-y-5 max-w-lg mx-auto">
      {/* Profile Header */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-sip-brand via-sip-brand/80 to-sip-brand/60 p-6 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
        <div className="relative flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl font-bold">
            {initials}
          </div>
          <div>
            <h2 className="text-xl font-bold">{userName}</h2>
            {userPhone && (
              <p className="text-white/80 text-sm">
                {revealed.phone ? userPhone : maskPhone(userPhone)}
              </p>
            )}
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
              <div className="flex items-center justify-between py-3 gap-2">
                <div className="flex items-center gap-3 shrink-0">
                  <row.icon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {row.label}
                  </span>
                </div>
                <div className="flex items-center gap-2 min-w-0">
                  {editingField === row.key ? (
                    <div className="flex items-center gap-1.5">
                      <Input
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="h-8 text-sm w-40"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') saveEdit();
                          if (e.key === 'Escape') cancelEdit();
                        }}
                      />
                      <button
                        onClick={saveEdit}
                        disabled={saving}
                        className="p-1 rounded-md hover:bg-muted transition-colors text-sip-brand"
                      >
                        {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="p-1 rounded-md hover:bg-muted transition-colors text-muted-foreground"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className={cn(
                        'text-sm font-medium text-foreground truncate',
                        row.key === 'userId' && 'text-xs font-mono'
                      )}>
                        {row.maskable
                          ? (revealed[row.key] ? row.value : (row as any).maskedValue)
                          : (row.value || '—')}
                      </span>
                      {row.maskable && (
                        <button
                          onClick={() => toggleReveal(row.key)}
                          className="p-1 rounded-md hover:bg-muted transition-colors"
                        >
                          {revealed[row.key]
                            ? <EyeOff className="w-3.5 h-3.5 text-muted-foreground" />
                            : <Eye className="w-3.5 h-3.5 text-muted-foreground" />}
                        </button>
                      )}
                      {editable.has(row.key) && (
                        <button
                          onClick={() => startEdit(row.key, row.value)}
                          className="p-1 rounded-md hover:bg-muted transition-colors"
                          title={`Edit ${row.label.toLowerCase()}`}
                        >
                          <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
              {i < detailRows.length - 1 && <Separator />}
            </div>
          ))}
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
                  ? 'text-sip-action-success-foreground border-sip-action-success-border bg-sip-action-success-light'
                  : 'text-sip-action-warning-foreground border-sip-action-warning-border bg-sip-action-warning-light'
              )}
            >
              {isKycDone ? '✅ Complete' : '⏳ Incomplete'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Theme Toggle */}
      <Card className="border-border">
        <CardContent className="p-5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-sip-brand mb-3">
            Appearance
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {document.documentElement.classList.contains('dark') ? (
                <Moon className="w-4 h-4 text-muted-foreground" />
              ) : (
                <Sun className="w-4 h-4 text-muted-foreground" />
              )}
              <span className="text-sm font-medium text-foreground">Color Theme</span>
            </div>
            <div className="flex gap-1 rounded-lg border border-border p-0.5">
              <button
                onClick={() => { document.documentElement.classList.remove('dark'); localStorage.setItem('theme', 'light'); }}
                className={cn(
                  'px-3 py-1 rounded-md text-xs font-medium transition-colors',
                  !document.documentElement.classList.contains('dark')
                    ? 'bg-sip-brand text-sip-brand-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                Light
              </button>
              <button
                onClick={() => { document.documentElement.classList.add('dark'); localStorage.setItem('theme', 'dark'); }}
                className={cn(
                  'px-3 py-1 rounded-md text-xs font-medium transition-colors',
                  document.documentElement.classList.contains('dark')
                    ? 'bg-sip-brand text-sip-brand-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                Dark
              </button>
            </div>
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
