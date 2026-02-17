import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, ShieldCheck, Loader2 } from "lucide-react";
import { format, parse, isValid, isBefore } from "date-fns";
import { cn } from "@/lib/utils";
import { isValidPAN } from "@/lib/kycStorage";

interface KycEntryProps {
  initialPan?: string;
  initialDob?: string; // DD-MM-YYYY
  onSubmit: (pan: string, dob: string) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function KycEntry({ initialPan = "", initialDob = "", onSubmit, onCancel, isSubmitting }: KycEntryProps) {
  const [pan, setPan] = useState(initialPan);
  const [dobDate, setDobDate] = useState<Date | undefined>(() => {
    if (initialDob) {
      const parsed = parse(initialDob, "dd-MM-yyyy", new Date());
      return isValid(parsed) ? parsed : undefined;
    }
    return undefined;
  });
  const [panError, setPanError] = useState("");
  const [dobError, setDobError] = useState("");

  const handlePanChange = (value: string) => {
    const upper = value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10);
    setPan(upper);
    if (upper.length === 10 && !isValidPAN(upper)) {
      setPanError("Invalid PAN format (e.g. ABCDE1234F)");
    } else {
      setPanError("");
    }
  };

  const handleDobSelect = (date: Date | undefined) => {
    setDobDate(date);
    if (date && !isBefore(date, new Date())) {
      setDobError("Date of birth must be in the past");
    } else {
      setDobError("");
    }
  };

  const isFormValid = pan.length === 10 && isValidPAN(pan) && dobDate && isBefore(dobDate, new Date());

  const handleSubmit = () => {
    if (!isFormValid || !dobDate) return;
    const dobStr = format(dobDate, "dd-MM-yyyy");
    onSubmit(pan, dobStr);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <ShieldCheck className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-xl font-bold">KYC Verification</h2>
        <p className="text-sm text-muted-foreground mt-1">Enter PAN and Date of Birth to continue</p>
      </div>

      {/* PAN Input */}
      <div className="space-y-2">
        <Label htmlFor="pan">PAN Number</Label>
        <Input
          id="pan"
          value={pan}
          onChange={(e) => handlePanChange(e.target.value)}
          placeholder="ABCDE1234F"
          className={cn("h-12 text-lg font-mono tracking-wider uppercase", panError && "border-destructive")}
          maxLength={10}
          disabled={isSubmitting}
        />
        {panError && <p className="text-xs text-destructive">{panError}</p>}
        {pan.length > 0 && pan.length < 10 && (
          <p className="text-xs text-muted-foreground">{10 - pan.length} characters remaining</p>
        )}
      </div>

      {/* DOB Picker */}
      <div className="space-y-2">
        <Label>Date of Birth</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              disabled={isSubmitting}
              className={cn(
                "w-full h-12 justify-start text-left font-normal",
                !dobDate && "text-muted-foreground",
                dobError && "border-destructive"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dobDate ? format(dobDate, "dd/MM/yyyy") : "Select your date of birth"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
            <Calendar
              mode="single"
              selected={dobDate}
              onSelect={handleDobSelect}
              disabled={(date) => date > new Date()}
              defaultMonth={dobDate || new Date(1990, 0)}
              captionLayout="dropdown-buttons"
              fromYear={1940}
              toYear={new Date().getFullYear()}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {dobError && <p className="text-xs text-destructive">{dobError}</p>}
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Button variant="outline" onClick={onCancel} disabled={isSubmitting} className="flex-1">
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={!isFormValid || isSubmitting} className="flex-1">
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Verifying...
            </>
          ) : (
            "Submit & Continue"
          )}
        </Button>
      </div>
    </div>
  );
}
