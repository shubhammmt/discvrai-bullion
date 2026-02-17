import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Check, Pencil, Trash2 } from "lucide-react";
import { useKyc } from "@/hooks/useKyc";
import { maskPAN } from "@/lib/kycStorage";
import { KycModal } from "./KycModal";
import { parse, format, isValid } from "date-fns";

export function KycProfileSection() {
  const { kyc, isKycDone, removeKyc } = useKyc();
  const [showKycModal, setShowKycModal] = useState(false);

  const displayDob = (() => {
    if (!kyc?.dob) return "";
    const parsed = parse(kyc.dob, "dd-MM-yyyy", new Date());
    return isValid(parsed) ? format(parsed, "dd/MM/yyyy") : kyc.dob;
  })();

  const displayUpdatedAt = (() => {
    if (!kyc?.updatedAt) return "";
    const d = new Date(kyc.updatedAt);
    return format(d, "dd MMM yyyy, hh:mm a");
  })();

  return (
    <>
      <div className="space-y-4 pt-2">
        {!isKycDone ? (
          /* KYC Not Submitted */
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-3">
              <Shield className="w-7 h-7 text-amber-500" />
            </div>
            <p className="font-semibold mb-1">KYC Not Submitted</p>
            <p className="text-sm text-muted-foreground mb-4">
              Complete KYC to enable buying and selling
            </p>
            <Button onClick={() => setShowKycModal(true)} className="w-full">
              Add KYC
            </Button>
          </div>
        ) : (
          /* KYC Submitted */
          <>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                <Check className="w-3 h-3 mr-1" /> Submitted
              </Badge>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">PAN</span>
                <span className="font-semibold font-mono">{maskPAN(kyc!.pan)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Date of Birth</span>
                <span className="font-semibold">{displayDob}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Last Updated</span>
                <span className="text-xs text-muted-foreground">{displayUpdatedAt}</span>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <Button variant="outline" onClick={() => setShowKycModal(true)} className="flex-1">
                <Pencil className="w-4 h-4 mr-2" />
                Edit KYC
              </Button>
              <Button
                variant="outline"
                onClick={removeKyc}
                className="text-destructive hover:text-destructive"
                size="icon"
                title="Remove KYC (dev only)"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </>
        )}
      </div>

      <KycModal
        open={showKycModal}
        onOpenChange={setShowKycModal}
        onSuccess={() => {
          setShowKycModal(false);
          // Force re-render to pick up new KYC data
          window.dispatchEvent(new Event("storage"));
        }}
        onCancel={() => setShowKycModal(false)}
      />
    </>
  );
}
