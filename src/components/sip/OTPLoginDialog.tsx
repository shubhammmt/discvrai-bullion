import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Phone, ArrowRight, Loader2, CheckCircle2, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const API_BASE = 'https://api.discvr.ai/api/auth/phone';

export interface AuthUser {
  id: string;
  phone: string;
  name: string;
  email?: string;
  picture?: string;
}

interface OTPLoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoginSuccess: (user: AuthUser, sessionId: string) => void;
}

type Step = 'phone' | 'otp' | 'success';

export function OTPLoginDialog({ open, onOpenChange, onLoginSuccess }: OTPLoginDialogProps) {
  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [requestId, setRequestId] = useState('');
  const [maskedPhone, setMaskedPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [retryAfter, setRetryAfter] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const resetState = () => {
    setStep('phone');
    setPhone('');
    setName('');
    setOtp('');
    setRequestId('');
    setMaskedPhone('');
    setLoading(false);
    setRetryAfter(0);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleClose = (val: boolean) => {
    if (!val) resetState();
    onOpenChange(val);
  };

  const fullPhone = phone.startsWith('+91') ? phone : `+91${phone.replace(/\D/g, '')}`;

  const requestOtp = async () => {
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10) {
      toast.error('Enter a valid 10-digit phone number');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/request-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: fullPhone, customer_name: name || 'User' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to send OTP');
      setRequestId(data.request_id);
      setMaskedPhone(data.phone || fullPhone);
      setStep('otp');
      toast.success('OTP sent successfully');

      // Start retry countdown
      setRetryAfter(data.retry_after || 30);
      timerRef.current = setInterval(() => {
        setRetryAfter(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err: any) {
      toast.error(err.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (otp.length < 6) {
      toast.error('Enter the 6-digit OTP');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: fullPhone,
          otp,
          request_id: requestId,
          name: name || 'User',
          platform: 'web',
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Verification failed');

      setStep('success');
      toast.success(`Welcome, ${data.user?.name || 'User'}!`);

      // Store session
      localStorage.setItem('discvr_session', JSON.stringify(data.session));
      localStorage.setItem('discvr_user', JSON.stringify(data.user));

      setTimeout(() => {
        onLoginSuccess(data.user, data.session.session_id);
        handleClose(false);
      }, 1200);
    } catch (err: any) {
      toast.error(err.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-primary" />
            {step === 'phone' && 'Sign In'}
            {step === 'otp' && 'Verify OTP'}
            {step === 'success' && 'Welcome!'}
          </DialogTitle>
          <DialogDescription>
            {step === 'phone' && 'Enter your mobile number to get started'}
            {step === 'otp' && `Enter the 6-digit OTP sent to ${maskedPhone}`}
            {step === 'success' && 'You are now signed in'}
          </DialogDescription>
        </DialogHeader>

        {step === 'phone' && (
          <div className="space-y-4 mt-2">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Name (optional)</label>
              <Input
                placeholder="Your name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="h-9"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Phone Number</label>
              <div className="flex gap-2">
                <div className="flex items-center px-3 border border-input rounded-md bg-muted text-sm text-muted-foreground">+91</div>
                <Input
                  placeholder="10-digit mobile number"
                  value={phone}
                  onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="h-10"
                  type="tel"
                  maxLength={10}
                />
              </div>
            </div>
            <Button onClick={requestOtp} disabled={loading || phone.replace(/\D/g, '').length < 10} className="w-full gap-2">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
              Get OTP
            </Button>
          </div>
        )}

        {step === 'otp' && (
          <div className="space-y-4 mt-2">
            <div className="flex justify-center">
              <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <Button onClick={verifyOtp} disabled={loading || otp.length < 6} className="w-full gap-2">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
              Verify & Sign In
            </Button>
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm" className="text-xs gap-1" onClick={() => { setStep('phone'); setOtp(''); }}>
                <ArrowLeft className="w-3 h-3" /> Change number
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs"
                disabled={retryAfter > 0}
                onClick={requestOtp}
              >
                {retryAfter > 0 ? `Resend in ${retryAfter}s` : 'Resend OTP'}
              </Button>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="flex flex-col items-center py-6 gap-3">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
            <p className="text-sm text-muted-foreground">Signing you in...</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
