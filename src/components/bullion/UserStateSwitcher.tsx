import { useState } from "react";
import { Settings, ChevronDown, ChevronUp, User, UserCheck, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type UserState = "new" | "logged_in_no_holdings" | "investor";

interface UserStateSwitcherProps {
  userState: UserState;
  onUserStateChange: (state: UserState) => void;
  goldHoldings: number;
  silverHoldings: number;
  onGoldHoldingsChange: (value: number) => void;
  onSilverHoldingsChange: (value: number) => void;
}

export function UserStateSwitcher({
  userState,
  onUserStateChange,
  goldHoldings,
  silverHoldings,
  onGoldHoldingsChange,
  onSilverHoldingsChange,
}: UserStateSwitcherProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const stateConfig = {
    new: { label: "New User", icon: User, description: "First-time visitor, no account" },
    logged_in_no_holdings: { label: "Logged In (No Holdings)", icon: UserCheck, description: "Has account, 0g gold/silver" },
    investor: { label: "Investor", icon: Briefcase, description: "Has holdings > 0" },
  };

  return (
    <div className="fixed bottom-20 lg:bottom-4 right-4 z-50">
      <div className="bg-background/95 backdrop-blur-xl border border-border rounded-xl shadow-2xl overflow-hidden max-w-xs">
        {/* Toggle Header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-3 hover:bg-muted/50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Settings className="w-4 h-4 text-primary" />
            </div>
            <div className="text-left">
              <p className="text-xs font-medium text-muted-foreground">DEV MODE</p>
              <p className="text-sm font-semibold">{stateConfig[userState].label}</p>
            </div>
          </div>
          {isExpanded ? (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronUp className="w-5 h-5 text-muted-foreground" />
          )}
        </button>

        {/* Expanded Panel */}
        {isExpanded && (
          <div className="p-4 border-t border-border space-y-4">
            {/* User State Selection */}
            <div>
              <Label className="text-xs font-medium text-muted-foreground mb-2 block">User State</Label>
              <RadioGroup value={userState} onValueChange={(v) => onUserStateChange(v as UserState)}>
                {Object.entries(stateConfig).map(([key, config]) => {
                  const Icon = config.icon;
                  return (
                    <div key={key} className="flex items-center space-x-2">
                      <RadioGroupItem value={key} id={key} />
                      <Label htmlFor={key} className="flex items-center gap-2 cursor-pointer text-sm">
                        <Icon className="w-4 h-4 text-muted-foreground" />
                        <span>{config.label}</span>
                      </Label>
                    </div>
                  );
                })}
              </RadioGroup>
            </div>

            {/* Holdings Input (only for investor) */}
            {userState === "investor" && (
              <div className="space-y-3 pt-2 border-t border-border">
                <Label className="text-xs font-medium text-muted-foreground">Simulated Holdings</Label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="gold" className="text-xs text-muted-foreground">Gold (g)</Label>
                    <Input
                      id="gold"
                      type="number"
                      value={goldHoldings}
                      onChange={(e) => onGoldHoldingsChange(parseFloat(e.target.value) || 0)}
                      step="0.1"
                      min="0"
                      className="h-8 text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="silver" className="text-xs text-muted-foreground">Silver (g)</Label>
                    <Input
                      id="silver"
                      type="number"
                      value={silverHoldings}
                      onChange={(e) => onSilverHoldingsChange(parseFloat(e.target.value) || 0)}
                      step="1"
                      min="0"
                      className="h-8 text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Quick Presets */}
            <div className="space-y-2 pt-2">
              <Label className="text-xs font-medium text-muted-foreground">Quick Presets</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => {
                    onUserStateChange("investor");
                    onGoldHoldingsChange(2.5);
                    onSilverHoldingsChange(15);
                  }}
                >
                  Both Holdings
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => {
                    onUserStateChange("investor");
                    onGoldHoldingsChange(2.5);
                    onSilverHoldingsChange(0);
                  }}
                >
                  Gold Only
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => {
                    onUserStateChange("investor");
                    onGoldHoldingsChange(0);
                    onSilverHoldingsChange(15);
                  }}
                >
                  Silver Only
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => {
                    onUserStateChange("investor");
                    onGoldHoldingsChange(0);
                    onSilverHoldingsChange(0);
                  }}
                >
                  No Holdings
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-xs text-muted-foreground"
                onClick={() => {
                  onUserStateChange("new");
                  onGoldHoldingsChange(0);
                  onSilverHoldingsChange(0);
                }}
              >
                Reset to New User
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
