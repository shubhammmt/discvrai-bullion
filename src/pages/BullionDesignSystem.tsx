import { useState, useEffect } from "react";
import { ArrowLeft, Copy, Check, Sun, Moon, Coins, Medal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Centralized color definitions - LIGHT mode
const lightColors = {
  gold: [
    { name: "bullion-gold", hsl: "43 96% 56%", hex: "#F2B705", usage: "Primary gold accent, Buy CTAs" },
    { name: "bullion-gold-dark", hsl: "43 96% 46%", hex: "#C89604", usage: "Sell CTAs, hover states" },
    { name: "bullion-gold-light", hsl: "43 96% 70%", hex: "#F7D166", usage: "Backgrounds, subtle accents" },
    { name: "bullion-gold-muted", hsl: "43 40% 85%", hex: "#E3DBCA", usage: "Disabled states, card tints" },
  ],
  silver: [
    { name: "bullion-silver", hsl: "215 25% 75%", hex: "#A9B4C4", usage: "Primary silver accent, Buy CTAs" },
    { name: "bullion-silver-dark", hsl: "215 20% 52%", hex: "#6B7D94", usage: "Sell CTAs, hover states" },
    { name: "bullion-silver-light", hsl: "215 22% 88%", hex: "#D6DBE3", usage: "Backgrounds, subtle accents" },
    { name: "bullion-silver-muted", hsl: "215 15% 93%", hex: "#ECEEF1", usage: "Disabled states, card tints" },
  ],
  semantic: [
    { name: "bullion-success", hsl: "152 76% 40%", hex: "#18B868", usage: "Positive changes, confirmations" },
    { name: "bullion-success-light", hsl: "152 76% 90%", hex: "#D4F5E5", usage: "Success backgrounds" },
    { name: "bullion-warning", hsl: "38 92% 50%", hex: "#F5A508", usage: "Warnings, pending states" },
    { name: "bullion-warning-light", hsl: "38 92% 90%", hex: "#FEF0D4", usage: "Warning backgrounds" },
    { name: "bullion-error", hsl: "0 84% 60%", hex: "#EF4444", usage: "Errors, negative changes" },
    { name: "bullion-error-light", hsl: "0 84% 95%", hex: "#FEE2E2", usage: "Error backgrounds" },
  ],
  surface: [
    { name: "bullion-surface", hsl: "220 20% 97%", hex: "#F5F6F8", usage: "Page backgrounds" },
    { name: "bullion-surface-elevated", hsl: "0 0% 100%", hex: "#FFFFFF", usage: "Cards, modals" },
    { name: "bullion-text-primary", hsl: "220 20% 10%", hex: "#151821", usage: "Primary text, headings" },
    { name: "bullion-text-secondary", hsl: "220 10% 45%", hex: "#686E7D", usage: "Secondary text" },
    { name: "bullion-border", hsl: "220 15% 90%", hex: "#E2E4E9", usage: "Borders, dividers" },
  ],
};

// DARK mode colors
const darkColors = {
  gold: [
    { name: "bullion-gold", hsl: "43 96% 56%", hex: "#F2B705", usage: "Primary gold accent (same)" },
    { name: "bullion-gold-dark", hsl: "43 96% 66%", hex: "#F5C842", usage: "Lighter for dark bg contrast" },
    { name: "bullion-gold-light", hsl: "43 96% 40%", hex: "#B38504", usage: "Muted gold for dark mode" },
    { name: "bullion-gold-muted", hsl: "43 30% 20%", hex: "#3D3522", usage: "Subtle tinted backgrounds" },
  ],
  silver: [
    { name: "bullion-silver", hsl: "215 30% 80%", hex: "#B8C4D4", usage: "Brighter silver for dark bg" },
    { name: "bullion-silver-dark", hsl: "215 25% 85%", hex: "#CBD3DE", usage: "Lighter variant (text: black)" },
    { name: "bullion-silver-light", hsl: "215 20% 35%", hex: "#47556A", usage: "Muted silver for dark mode" },
    { name: "bullion-silver-muted", hsl: "215 15% 18%", hex: "#282D35", usage: "Subtle tinted backgrounds" },
  ],
  semantic: [
    { name: "bullion-success", hsl: "152 76% 45%", hex: "#1CC872", usage: "Positive (brighter)" },
    { name: "bullion-success-light", hsl: "152 50% 15%", hex: "#132B1E", usage: "Success tinted bg" },
    { name: "bullion-warning", hsl: "38 92% 55%", hex: "#F7B21A", usage: "Warning (brighter)" },
    { name: "bullion-warning-light", hsl: "38 50% 15%", hex: "#362D13", usage: "Warning tinted bg" },
    { name: "bullion-error", hsl: "0 84% 60%", hex: "#EF4444", usage: "Error (same)" },
    { name: "bullion-error-light", hsl: "0 50% 15%", hex: "#391313", usage: "Error tinted bg" },
  ],
  surface: [
    { name: "bullion-surface", hsl: "220 15% 8%", hex: "#121418", usage: "Dark page background" },
    { name: "bullion-surface-elevated", hsl: "220 15% 12%", hex: "#1A1D24", usage: "Dark cards, modals" },
    { name: "bullion-text-primary", hsl: "0 0% 98%", hex: "#FAFAFA", usage: "Light text on dark" },
    { name: "bullion-text-secondary", hsl: "220 10% 65%", hex: "#9AA0AD", usage: "Muted text on dark" },
    { name: "bullion-border", hsl: "220 15% 20%", hex: "#2D3240", usage: "Dark mode borders" },
  ],
};

const typographyScale = [
  { name: "Display", class: "text-4xl font-bold", example: "₹16,778.25", usage: "Portfolio totals, hero numbers" },
  { name: "Heading 1", class: "text-2xl font-bold", example: "Your Portfolio", usage: "Page titles, section headers" },
  { name: "Heading 2", class: "text-xl font-semibold", example: "Gold Holdings", usage: "Card titles, subsections" },
  { name: "Heading 3", class: "text-lg font-semibold", example: "Live Prices", usage: "Widget titles" },
  { name: "Body Large", class: "text-base", example: "Start investing in digital gold today.", usage: "Primary content" },
  { name: "Body", class: "text-sm", example: "Gold has preserved wealth for 5000+ years.", usage: "Descriptions" },
  { name: "Caption", class: "text-xs", example: "Last updated 2 min ago", usage: "Meta info, timestamps" },
  { name: "Overline", class: "text-xs font-semibold uppercase tracking-wide", example: "LEARN & GROW", usage: "Section labels" },
];

const buttonExamples = [
  { label: "Buy Gold", class: "bg-bullion-gold hover:bg-bullion-gold-dark text-black", usage: "Primary gold Buy CTA" },
  { label: "Buy Silver", class: "bg-bullion-silver hover:bg-bullion-silver-dark text-black", usage: "Primary silver Buy CTA" },
  { label: "Sell Gold", class: "bg-bullion-gold-dark hover:bg-bullion-gold-dark/90 text-white border border-border", usage: "Gold Sell CTA" },
  { label: "Sell Silver", class: "bg-bullion-silver-dark hover:bg-bullion-silver-dark/90 text-black border border-border", usage: "Silver Sell CTA (text: black)" },
  { label: "Success", class: "bg-bullion-success hover:bg-bullion-success/90 text-white", usage: "Confirm, proceed" },
  { label: "Done", class: "bg-bullion-gold-dark hover:bg-bullion-gold-dark/90 text-white border border-border", usage: "Done/Close actions (with border)" },
  { label: "Outline", class: "border border-border bg-transparent hover:bg-muted text-foreground", usage: "Secondary actions" },
];

const spacingScale = [
  { name: "xs", value: "4px", class: "gap-1 p-1", usage: "Tight grouping" },
  { name: "sm", value: "8px", class: "gap-2 p-2", usage: "Related elements" },
  { name: "md", value: "12px", class: "gap-3 p-3", usage: "Component padding" },
  { name: "lg", value: "16px", class: "gap-4 p-4", usage: "Card padding" },
  { name: "xl", value: "24px", class: "gap-6 p-6", usage: "Section spacing" },
  { name: "2xl", value: "32px", class: "gap-8 p-8", usage: "Major sections" },
];

function ColorSwatch({ color }: { color: { name: string; hsl: string; hex: string; usage: string } }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success(`Copied: ${text}`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group">
      <div
        className="h-16 rounded-lg mb-2 border border-border flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
        style={{ backgroundColor: `hsl(${color.hsl})` }}
        onClick={() => copyToClipboard(`var(--${color.name})`)}
      >
        {copied ? (
          <Check className="w-5 h-5 text-white drop-shadow-md" />
        ) : (
          <Copy className="w-4 h-4 text-white/0 group-hover:text-white/80 drop-shadow-md transition-colors" />
        )}
      </div>
      <p className="text-xs font-mono font-medium text-foreground">--{color.name}</p>
      <p className="text-xs font-mono text-muted-foreground">{color.hsl}</p>
      <p className="text-xs font-mono text-muted-foreground">{color.hex}</p>
      <p className="text-xs mt-1 text-muted-foreground">{color.usage}</p>
    </div>
  );
}

export default function BullionDesignSystem() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"));

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark(!isDark);
  };

  const activeColors = isDark ? darkColors : lightColors;

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      {/* Header with Theme Toggle */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="hover:bg-muted" onClick={() => navigate("/bullion")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">Bullion Design System</h1>
              <p className="text-sm text-muted-foreground">
                Centralized color palette, icons, typography & components
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            className="gap-2 border-border hover:bg-muted"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            {isDark ? "Light Mode" : "Dark Mode"}
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        {/* Theme Indicator */}
        <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
          <div className={`w-3 h-3 rounded-full ${isDark ? "bg-bullion-gold" : "bg-bullion-gold-dark"}`} />
          <p className="text-sm font-medium">
            Currently viewing: <span className="text-bullion-gold font-bold">{isDark ? "Dark" : "Light"} Mode</span> palette
          </p>
          <p className="text-xs text-muted-foreground ml-auto">File: src/index.css</p>
        </div>

        {/* Color Palette */}
        <section>
          <h2 className="text-2xl font-bold mb-2">Color Palette ({isDark ? "Dark" : "Light"} Mode)</h2>
          <p className="mb-6 text-muted-foreground">
            All colors are CSS custom properties in <code className="px-1.5 py-0.5 bg-muted rounded text-xs font-mono">src/index.css</code>. 
            Toggle theme above to see {isDark ? "light" : "dark"} mode values. Click any swatch to copy.
          </p>

          {/* Gold */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Coins className="w-5 h-5 text-bullion-gold" />
              Gold Palette
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {activeColors.gold.map((color) => (
                <ColorSwatch key={color.name} color={color} />
              ))}
            </div>
          </div>

          {/* Silver */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Medal className="w-5 h-5 text-bullion-silver" />
              Silver Palette
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {activeColors.silver.map((color) => (
                <ColorSwatch key={color.name} color={color} />
              ))}
            </div>
          </div>

          {/* Semantic */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Semantic Colors</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {activeColors.semantic.map((color) => (
                <ColorSwatch key={color.name} color={color} />
              ))}
            </div>
          </div>

          {/* Surface */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Surface & Text</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {activeColors.surface.map((color) => (
                <ColorSwatch key={color.name} color={color} />
              ))}
            </div>
          </div>
        </section>

        {/* Icon Standards */}
        <section>
          <h2 className="text-2xl font-bold mb-2">Icon Standards</h2>
          <p className="mb-6 text-muted-foreground">
            Use consistent Lucide icons across all bullion pages. Never use emoji for metal representation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-bullion-gold/15 border border-bullion-gold/30 flex items-center justify-center">
                  <Coins className="w-7 h-7 text-bullion-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Gold Icon</h3>
                  <code className="text-xs text-muted-foreground font-mono">{'<Coins className="text-bullion-gold" />'}</code>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Use the <code className="px-1 bg-muted rounded text-xs">Coins</code> icon from lucide-react for all Gold references. 
                Color with <code className="px-1 bg-muted rounded text-xs">text-bullion-gold</code>.
              </p>
            </Card>

            <Card className="p-6 bg-card border-border">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-bullion-silver/15 border border-bullion-silver/30 flex items-center justify-center">
                  <Medal className="w-7 h-7 text-bullion-silver" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Silver Icon</h3>
                  <code className="text-xs text-muted-foreground font-mono">{'<Medal className="text-bullion-silver" />'}</code>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Use the <code className="px-1 bg-muted rounded text-xs">Medal</code> icon from lucide-react for all Silver references. 
                Color with <code className="px-1 bg-muted rounded text-xs">text-bullion-silver</code>.
              </p>
            </Card>
          </div>
        </section>

        {/* Typography */}
        <section>
          <h2 className="text-2xl font-bold mb-2">Typography</h2>
          <p className="mb-6 text-muted-foreground">Font family: Inter. Use Tailwind classes for consistent sizing.</p>

          <Card className="overflow-hidden bg-card border-border">
            <div className="divide-y divide-border">
              {typographyScale.map((type) => (
                <div key={type.name} className="p-4 flex flex-col md:flex-row md:items-center gap-4">
                  <div className="w-32 flex-shrink-0">
                    <p className="font-medium text-sm">{type.name}</p>
                    <code className="text-xs text-muted-foreground">{type.class}</code>
                  </div>
                  <div className="flex-1">
                    <p className={type.class}>{type.example}</p>
                  </div>
                  <div className="w-48 flex-shrink-0">
                    <p className="text-xs text-muted-foreground">{type.usage}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Buttons */}
        <section>
          <h2 className="text-2xl font-bold mb-2">Buttons</h2>
          <p className="mb-4 text-muted-foreground">
            Button variants for metal-specific CTAs. Key rules:
          </p>
          <ul className="mb-6 space-y-1 text-sm text-muted-foreground list-disc list-inside">
            <li>Gold Buy: <code className="px-1 bg-muted rounded text-xs">bg-bullion-gold text-black</code></li>
            <li>Silver Buy: <code className="px-1 bg-muted rounded text-xs">bg-bullion-silver text-black</code></li>
            <li>Gold Sell/Secondary: <code className="px-1 bg-muted rounded text-xs">bg-bullion-gold-dark text-white</code></li>
            <li>Silver Sell/Secondary: <code className="px-1 bg-muted rounded text-xs">bg-bullion-silver-dark text-black</code> (always black text)</li>
            <li>Done buttons: Always include <code className="px-1 bg-muted rounded text-xs">border border-border</code></li>
            <li>Hover on ghost buttons: Use <code className="px-1 bg-muted rounded text-xs">hover:bg-muted</code> (never purple accent)</li>
          </ul>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {buttonExamples.map((btn) => (
              <Card key={btn.label} className="p-4 bg-card border-border">
                <Button className={`w-full mb-3 ${btn.class}`}>
                  {btn.label}
                </Button>
                <p className="text-xs text-muted-foreground">{btn.usage}</p>
                <code className="text-xs block mt-1 text-muted-foreground font-mono">{btn.class}</code>
              </Card>
            ))}
          </div>
        </section>

        {/* Spacing */}
        <section>
          <h2 className="text-2xl font-bold mb-2">Spacing</h2>
          <p className="mb-6 text-muted-foreground">Consistent spacing using Tailwind's scale.</p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {spacingScale.map((space) => (
              <Card key={space.name} className="p-4 bg-card border-border">
                <div
                  className="bg-bullion-gold/20 border border-bullion-gold/40 rounded mb-2"
                  style={{ height: space.value, width: "100%" }}
                />
                <p className="font-semibold text-sm">{space.name}</p>
                <p className="text-xs text-muted-foreground">{space.value}</p>
                <code className="text-xs text-muted-foreground font-mono">{space.class}</code>
              </Card>
            ))}
          </div>
        </section>

        {/* Card Examples */}
        <section>
          <h2 className="text-2xl font-bold mb-2">Card Patterns</h2>
          <p className="mb-6 text-muted-foreground">Standard card patterns with correct icon and color usage.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gold Card */}
            <Card className="p-4 bg-bullion-gold-muted border-bullion-gold/30">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Coins className="w-5 h-5 text-bullion-gold" />
                    <span className="text-bullion-gold text-sm font-medium">Gold</span>
                  </div>
                  <p className="text-xl font-bold text-foreground">2.50g</p>
                  <p className="text-xs text-muted-foreground">₹15,626.25</p>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Button size="sm" className="h-7 px-3 bg-bullion-gold hover:bg-bullion-gold-dark text-black font-semibold text-xs">
                    Buy
                  </Button>
                  <Button size="sm" className="h-7 px-3 bg-bullion-gold-dark hover:bg-bullion-gold-dark/90 text-white font-medium text-xs border border-border">
                    Sell
                  </Button>
                </div>
              </div>
            </Card>

            {/* Silver Card */}
            <Card className="p-4 bg-bullion-silver-muted border-bullion-silver/30">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Medal className="w-5 h-5 text-bullion-silver" />
                    <span className="text-bullion-silver text-sm font-medium">Silver</span>
                  </div>
                  <p className="text-xl font-bold text-foreground">15g</p>
                  <p className="text-xs text-muted-foreground">₹1,152</p>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Button size="sm" className="h-7 px-3 bg-bullion-silver hover:bg-bullion-silver-dark text-black font-semibold text-xs">
                    Buy
                  </Button>
                  <Button size="sm" className="h-7 px-3 bg-bullion-silver-dark hover:bg-bullion-silver-dark/90 text-black font-medium text-xs border border-border">
                    Sell
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Do's and Don'ts */}
        <section>
          <h2 className="text-2xl font-bold mb-2">Guidelines</h2>
          <p className="mb-6 text-muted-foreground">Best practices for consistent design.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 border-bullion-success/30 bg-bullion-success/5">
              <h3 className="font-semibold text-bullion-success mb-4 flex items-center gap-2">✓ Do</h3>
              <ul className="space-y-2 text-sm text-foreground">
                <li>• Use <code className="px-1 bg-muted rounded text-xs">--bullion-*</code> CSS tokens for all colors</li>
                <li>• Use <code className="px-1 bg-muted rounded text-xs">Coins</code> icon for Gold, <code className="px-1 bg-muted rounded text-xs">Medal</code> for Silver</li>
                <li>• Ensure 4.5:1 contrast ratio for text</li>
                <li>• Silver secondary buttons always use <strong>black text</strong></li>
                <li>• Add <code className="px-1 bg-muted rounded text-xs">border border-border</code> on Done buttons</li>
                <li>• Use <code className="px-1 bg-muted rounded text-xs">hover:bg-muted</code> for ghost button hover</li>
                <li>• Test both light and dark themes</li>
              </ul>
            </Card>

            <Card className="p-6 border-bullion-error/30 bg-bullion-error/5">
              <h3 className="font-semibold text-bullion-error mb-4 flex items-center gap-2">✗ Don't</h3>
              <ul className="space-y-2 text-sm text-foreground">
                <li>• Use emojis (🪙 🥈) instead of Lucide icons</li>
                <li>• Hard-code hex/rgb values in components</li>
                <li>• Use <code className="px-1 bg-muted rounded text-xs">hover:bg-accent</code> (purple) in bullion pages</li>
                <li>• Use white text on silver secondary buttons</li>
                <li>• Use <code className="px-1 bg-muted rounded text-xs">bg-white</code> or <code className="px-1 bg-muted rounded text-xs">text-black</code> directly (use tokens)</li>
                <li>• Skip dark mode variants</li>
                <li>• Forget border on Done/close buttons</li>
              </ul>
            </Card>
          </div>
        </section>

        {/* CSS Variables Reference */}
        <section>
          <h2 className="text-2xl font-bold mb-2">CSS Variables Reference</h2>
          <p className="mb-6 text-muted-foreground">
            Complete reference for both themes. Defined in <code className="px-1.5 py-0.5 bg-muted rounded text-xs font-mono">src/index.css</code>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4 font-mono text-xs overflow-x-auto bg-card border-border">
              <p className="text-sm font-sans font-semibold mb-3 text-foreground">:root (Light Mode)</p>
              <pre className="text-muted-foreground whitespace-pre-wrap">
{`/* Gold */
--bullion-gold: 43 96% 56%;
--bullion-gold-dark: 43 96% 46%;
--bullion-gold-light: 43 96% 70%;
--bullion-gold-muted: 43 40% 85%;

/* Silver (brighter) */
--bullion-silver: 215 25% 75%;
--bullion-silver-dark: 215 20% 52%;
--bullion-silver-light: 215 22% 88%;
--bullion-silver-muted: 215 15% 93%;

/* Semantic */
--bullion-success: 152 76% 40%;
--bullion-warning: 38 92% 50%;
--bullion-error: 0 84% 60%;`}
              </pre>
            </Card>

            <Card className="p-4 font-mono text-xs overflow-x-auto bg-card border-border">
              <p className="text-sm font-sans font-semibold mb-3 text-foreground">.dark (Dark Mode)</p>
              <pre className="text-muted-foreground whitespace-pre-wrap">
{`/* Gold */
--bullion-gold: 43 96% 56%;
--bullion-gold-dark: 43 96% 66%;
--bullion-gold-light: 43 96% 40%;
--bullion-gold-muted: 43 30% 20%;

/* Silver (brighter for dark bg) */
--bullion-silver: 215 30% 80%;
--bullion-silver-dark: 215 25% 85%;
--bullion-silver-light: 215 20% 35%;
--bullion-silver-muted: 215 15% 18%;

/* Semantic */
--bullion-success: 152 76% 45%;
--bullion-warning: 38 92% 55%;
--bullion-error: 0 84% 60%;`}
              </pre>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
