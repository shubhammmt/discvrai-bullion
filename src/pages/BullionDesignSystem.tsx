import { useState } from "react";
import { ArrowLeft, Copy, Check, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Color definitions matching index.css
const colorPalette = {
  gold: [
    { name: "bullion-gold", hsl: "43 96% 56%", usage: "Primary gold accent, CTAs, highlights", preview: "hsl(43, 96%, 56%)" },
    { name: "bullion-gold-dark", hsl: "43 96% 46%", usage: "Hover states, emphasis", preview: "hsl(43, 96%, 46%)" },
    { name: "bullion-gold-light", hsl: "43 96% 70%", usage: "Backgrounds, subtle accents", preview: "hsl(43, 96%, 70%)" },
    { name: "bullion-gold-muted", hsl: "43 40% 85%", usage: "Disabled states, borders", preview: "hsl(43, 40%, 85%)" },
  ],
  silver: [
    { name: "bullion-silver", hsl: "220 14% 70%", usage: "Primary silver accent", preview: "hsl(220, 14%, 70%)" },
    { name: "bullion-silver-dark", hsl: "220 14% 50%", usage: "Hover states, emphasis", preview: "hsl(220, 14%, 50%)" },
    { name: "bullion-silver-light", hsl: "220 14% 85%", usage: "Backgrounds, subtle accents", preview: "hsl(220, 14%, 85%)" },
    { name: "bullion-silver-muted", hsl: "220 10% 92%", usage: "Disabled states, borders", preview: "hsl(220, 10%, 92%)" },
  ],
  semantic: [
    { name: "bullion-success", hsl: "152 76% 40%", usage: "Positive changes, confirmations", preview: "hsl(152, 76%, 40%)" },
    { name: "bullion-success-light", hsl: "152 76% 90%", usage: "Success backgrounds", preview: "hsl(152, 76%, 90%)" },
    { name: "bullion-warning", hsl: "38 92% 50%", usage: "Warnings, pending states", preview: "hsl(38, 92%, 50%)" },
    { name: "bullion-warning-light", hsl: "38 92% 90%", usage: "Warning backgrounds", preview: "hsl(38, 92%, 90%)" },
    { name: "bullion-error", hsl: "0 84% 60%", usage: "Errors, negative changes", preview: "hsl(0, 84%, 60%)" },
    { name: "bullion-error-light", hsl: "0 84% 95%", usage: "Error backgrounds", preview: "hsl(0, 84%, 95%)" },
  ],
  surface: [
    { name: "bullion-surface", hsl: "220 20% 97%", usage: "Page backgrounds", preview: "hsl(220, 20%, 97%)" },
    { name: "bullion-surface-elevated", hsl: "0 0% 100%", usage: "Cards, modals", preview: "hsl(0, 0%, 100%)" },
    { name: "bullion-text-primary", hsl: "220 20% 10%", usage: "Primary text, headings", preview: "hsl(220, 20%, 10%)" },
    { name: "bullion-text-secondary", hsl: "220 10% 45%", usage: "Secondary text, descriptions", preview: "hsl(220, 10%, 45%)" },
    { name: "bullion-border", hsl: "220 15% 90%", usage: "Borders, dividers", preview: "hsl(220, 15%, 90%)" },
  ],
};

const typographyScale = [
  { name: "Display", class: "text-4xl font-bold", example: "₹16,778.25", usage: "Portfolio totals, hero numbers" },
  { name: "Heading 1", class: "text-2xl font-bold", example: "Your Portfolio", usage: "Page titles, section headers" },
  { name: "Heading 2", class: "text-xl font-semibold", example: "Gold Holdings", usage: "Card titles, subsections" },
  { name: "Heading 3", class: "text-lg font-semibold", example: "Live Prices", usage: "Widget titles" },
  { name: "Body Large", class: "text-base", example: "Start investing in digital gold today.", usage: "Primary content" },
  { name: "Body", class: "text-sm", example: "Gold has preserved wealth for 5000+ years.", usage: "Descriptions, paragraphs" },
  { name: "Caption", class: "text-xs", example: "Last updated 2 min ago", usage: "Meta info, timestamps" },
  { name: "Overline", class: "text-xs font-semibold uppercase tracking-wide", example: "LEARN & GROW", usage: "Section labels" },
];

const buttonExamples = [
  { label: "Primary Gold", class: "bg-amber-500 hover:bg-amber-600 text-black", usage: "Buy gold actions" },
  { label: "Primary Silver", class: "bg-slate-400 hover:bg-slate-500 text-black", usage: "Buy silver actions" },
  { label: "Secondary Gold", class: "bg-amber-700 hover:bg-amber-800 text-white", usage: "Sell gold actions" },
  { label: "Secondary Silver", class: "bg-slate-600 hover:bg-slate-700 text-white", usage: "Sell silver actions" },
  { label: "Success", class: "bg-emerald-600 hover:bg-emerald-700 text-white", usage: "Confirm, proceed" },
  { label: "Outline", class: "border border-border bg-transparent hover:bg-muted", usage: "Secondary actions" },
  { label: "Ghost", class: "bg-transparent hover:bg-muted", usage: "Tertiary actions" },
];

const spacingScale = [
  { name: "xs", value: "4px", class: "gap-1 p-1", usage: "Tight grouping" },
  { name: "sm", value: "8px", class: "gap-2 p-2", usage: "Related elements" },
  { name: "md", value: "12px", class: "gap-3 p-3", usage: "Component padding" },
  { name: "lg", value: "16px", class: "gap-4 p-4", usage: "Card padding" },
  { name: "xl", value: "24px", class: "gap-6 p-6", usage: "Section spacing" },
  { name: "2xl", value: "32px", class: "gap-8 p-8", usage: "Major sections" },
];

function ColorSwatch({ color, isDark }: { color: typeof colorPalette.gold[0]; isDark: boolean }) {
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
        style={{ backgroundColor: color.preview }}
        onClick={() => copyToClipboard(`var(--${color.name})`)}
      >
        {copied ? (
          <Check className="w-5 h-5 text-white drop-shadow-md" />
        ) : (
          <Copy className="w-4 h-4 text-white/0 group-hover:text-white/80 drop-shadow-md transition-colors" />
        )}
      </div>
      <p className={`text-xs font-mono font-medium ${isDark ? 'text-foreground' : 'text-bullion-text-primary'}`}>
        --{color.name}
      </p>
      <p className={`text-xs font-mono ${isDark ? 'text-muted-foreground' : 'text-bullion-text-secondary'}`}>
        {color.hsl}
      </p>
      <p className={`text-xs mt-1 ${isDark ? 'text-muted-foreground' : 'text-bullion-text-secondary'}`}>
        {color.usage}
      </p>
    </div>
  );
}

export default function BullionDesignSystem() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-900 text-white' : 'bg-bullion-surface text-bullion-text-primary'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 ${isDark ? 'bg-slate-900/95' : 'bg-white/95'} backdrop-blur-md border-b border-border`}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/bullion")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">Bullion Design System</h1>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-bullion-text-secondary'}`}>
                Color palette, typography, and component guidelines
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsDark(!isDark)}
            className="gap-2"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            {isDark ? "Light" : "Dark"}
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        {/* Color Palette */}
        <section>
          <h2 className="text-2xl font-bold mb-2">Color Palette</h2>
          <p className={`mb-6 ${isDark ? 'text-slate-400' : 'text-bullion-text-secondary'}`}>
            All colors are defined as CSS custom properties in <code className="px-1.5 py-0.5 bg-muted rounded text-xs">index.css</code>. 
            Click any swatch to copy the variable name.
          </p>

          {/* Gold */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-amber-500"></span>
              Gold Palette
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {colorPalette.gold.map((color) => (
                <ColorSwatch key={color.name} color={color} isDark={isDark} />
              ))}
            </div>
          </div>

          {/* Silver */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-slate-400"></span>
              Silver Palette
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {colorPalette.silver.map((color) => (
                <ColorSwatch key={color.name} color={color} isDark={isDark} />
              ))}
            </div>
          </div>

          {/* Semantic */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Semantic Colors</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {colorPalette.semantic.map((color) => (
                <ColorSwatch key={color.name} color={color} isDark={isDark} />
              ))}
            </div>
          </div>

          {/* Surface */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Surface & Text</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {colorPalette.surface.map((color) => (
                <ColorSwatch key={color.name} color={color} isDark={isDark} />
              ))}
            </div>
          </div>
        </section>

        {/* Typography */}
        <section>
          <h2 className="text-2xl font-bold mb-2">Typography</h2>
          <p className={`mb-6 ${isDark ? 'text-slate-400' : 'text-bullion-text-secondary'}`}>
            Font family: Inter. Use Tailwind classes for consistent sizing.
          </p>

          <Card className={`overflow-hidden ${isDark ? 'bg-slate-800 border-slate-700' : ''}`}>
            <div className="divide-y divide-border">
              {typographyScale.map((type) => (
                <div key={type.name} className="p-4 flex flex-col md:flex-row md:items-center gap-4">
                  <div className="w-32 flex-shrink-0">
                    <p className="font-medium text-sm">{type.name}</p>
                    <code className={`text-xs ${isDark ? 'text-slate-400' : 'text-bullion-text-secondary'}`}>
                      {type.class}
                    </code>
                  </div>
                  <div className="flex-1">
                    <p className={type.class}>{type.example}</p>
                  </div>
                  <div className="w-48 flex-shrink-0">
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-bullion-text-secondary'}`}>
                      {type.usage}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Buttons */}
        <section>
          <h2 className="text-2xl font-bold mb-2">Buttons</h2>
          <p className={`mb-6 ${isDark ? 'text-slate-400' : 'text-bullion-text-secondary'}`}>
            Button variants for different actions. Gold/Silver variants for metal-specific CTAs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {buttonExamples.map((btn) => (
              <Card key={btn.label} className={`p-4 ${isDark ? 'bg-slate-800 border-slate-700' : ''}`}>
                <Button className={`w-full mb-3 ${btn.class}`}>
                  {btn.label}
                </Button>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-bullion-text-secondary'}`}>
                  {btn.usage}
                </p>
                <code className={`text-xs block mt-1 ${isDark ? 'text-slate-500' : 'text-muted-foreground'}`}>
                  {btn.class}
                </code>
              </Card>
            ))}
          </div>
        </section>

        {/* Spacing */}
        <section>
          <h2 className="text-2xl font-bold mb-2">Spacing</h2>
          <p className={`mb-6 ${isDark ? 'text-slate-400' : 'text-bullion-text-secondary'}`}>
            Consistent spacing using Tailwind's scale.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {spacingScale.map((space) => (
              <Card key={space.name} className={`p-4 ${isDark ? 'bg-slate-800 border-slate-700' : ''}`}>
                <div
                  className="bg-amber-500/20 border border-amber-500/40 rounded mb-2"
                  style={{ height: space.value, width: "100%" }}
                />
                <p className="font-semibold text-sm">{space.name}</p>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-bullion-text-secondary'}`}>
                  {space.value}
                </p>
                <code className={`text-xs ${isDark ? 'text-slate-500' : 'text-muted-foreground'}`}>
                  {space.class}
                </code>
              </Card>
            ))}
          </div>
        </section>

        {/* Card Examples */}
        <section>
          <h2 className="text-2xl font-bold mb-2">Card Patterns</h2>
          <p className={`mb-6 ${isDark ? 'text-slate-400' : 'text-bullion-text-secondary'}`}>
            Standard card patterns for the bullion platform.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gold Card */}
            <Card className="p-4 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">🪙</span>
                    <span className="text-amber-700 dark:text-amber-400 text-sm font-medium">Gold</span>
                  </div>
                  <p className="text-xl font-bold text-amber-900 dark:text-white">2.50g</p>
                  <p className="text-xs text-amber-600 dark:text-amber-400">₹15,626.25</p>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Button size="sm" className="h-7 px-3 bg-amber-500 hover:bg-amber-600 text-black font-semibold text-xs">
                    Buy
                  </Button>
                  <Button size="sm" className="h-7 px-3 bg-amber-700 hover:bg-amber-800 text-white font-medium text-xs">
                    Sell
                  </Button>
                </div>
              </div>
            </Card>

            {/* Silver Card */}
            <Card className="p-4 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">🥈</span>
                    <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">Silver</span>
                  </div>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">15g</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">₹1,152</p>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Button size="sm" className="h-7 px-3 bg-slate-400 hover:bg-slate-500 text-black font-semibold text-xs">
                    Buy
                  </Button>
                  <Button size="sm" className="h-7 px-3 bg-slate-600 hover:bg-slate-700 text-white font-medium text-xs">
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
          <p className={`mb-6 ${isDark ? 'text-slate-400' : 'text-bullion-text-secondary'}`}>
            Best practices for consistent design.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Do's */}
            <Card className={`p-6 border-emerald-200 dark:border-emerald-800 ${isDark ? 'bg-emerald-950/20' : 'bg-emerald-50'}`}>
              <h3 className="font-semibold text-emerald-700 dark:text-emerald-400 mb-4 flex items-center gap-2">
                ✓ Do
              </h3>
              <ul className={`space-y-2 text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <li>• Use <code className="px-1 bg-muted rounded">--bullion-*</code> tokens for colors</li>
                <li>• Ensure 4.5:1 contrast ratio for text</li>
                <li>• Use amber shades for gold, slate for silver</li>
                <li>• Dark text on light backgrounds (light mode)</li>
                <li>• Light text on dark backgrounds (dark mode)</li>
                <li>• Solid backgrounds for CTAs, not transparent</li>
              </ul>
            </Card>

            {/* Don'ts */}
            <Card className={`p-6 border-red-200 dark:border-red-800 ${isDark ? 'bg-red-950/20' : 'bg-red-50'}`}>
              <h3 className="font-semibold text-red-700 dark:text-red-400 mb-4 flex items-center gap-2">
                ✗ Don't
              </h3>
              <ul className={`space-y-2 text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <li>• Use <code className="px-1 bg-muted rounded">text-amber-400</code> on light backgrounds</li>
                <li>• Mix random Tailwind colors inconsistently</li>
                <li>• Use transparent buttons for primary CTAs</li>
                <li>• Forget dark mode variants</li>
                <li>• Hard-code hex/rgb values in components</li>
                <li>• Skip hover/focus states</li>
              </ul>
            </Card>
          </div>
        </section>

        {/* CSS Variables Reference */}
        <section>
          <h2 className="text-2xl font-bold mb-2">CSS Variables Reference</h2>
          <p className={`mb-6 ${isDark ? 'text-slate-400' : 'text-bullion-text-secondary'}`}>
            Copy these for use in custom styles.
          </p>

          <Card className={`p-4 font-mono text-xs overflow-x-auto ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50'}`}>
            <pre className={isDark ? 'text-slate-300' : 'text-slate-700'}>
{`/* Gold */
--bullion-gold: 43 96% 56%;
--bullion-gold-dark: 43 96% 46%;
--bullion-gold-light: 43 96% 70%;

/* Silver */
--bullion-silver: 220 14% 70%;
--bullion-silver-dark: 220 14% 50%;
--bullion-silver-light: 220 14% 85%;

/* Semantic */
--bullion-success: 152 76% 40%;
--bullion-warning: 38 92% 50%;
--bullion-error: 0 84% 60%;

/* Usage in Tailwind */
bg-[hsl(var(--bullion-gold))]
text-[hsl(var(--bullion-text-primary))]`}
            </pre>
          </Card>
        </section>
      </main>
    </div>
  );
}
