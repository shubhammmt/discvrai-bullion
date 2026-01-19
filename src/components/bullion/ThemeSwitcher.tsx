import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Check, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ThemeOption {
  id: string;
  name: string;
  colors: {
    gold: string;
    silver: string;
    surface: string;
    accent: string;
  };
}

const themes: ThemeOption[] = [
  {
    id: "classic",
    name: "Classic Gold",
    colors: {
      gold: "#F2C94C",
      silver: "#A0AEC0",
      surface: "#1A1A2E",
      accent: "#4A90D9",
    },
  },
  {
    id: "premium",
    name: "Premium Dark",
    colors: {
      gold: "#FFD700",
      silver: "#C0C0C0",
      surface: "#0D0D0D",
      accent: "#8B5CF6",
    },
  },
  {
    id: "royal",
    name: "Royal Purple",
    colors: {
      gold: "#E5B849",
      silver: "#B8C4CE",
      surface: "#1E1B4B",
      accent: "#A78BFA",
    },
  },
  {
    id: "emerald",
    name: "Emerald Vault",
    colors: {
      gold: "#F5C842",
      silver: "#94A3B8",
      surface: "#052E16",
      accent: "#10B981",
    },
  },
  {
    id: "minimal",
    name: "Minimal Light",
    colors: {
      gold: "#D4A017",
      silver: "#64748B",
      surface: "#FAFAFA",
      accent: "#3B82F6",
    },
  },
];

interface ThemeSwitcherProps {
  onThemeChange?: (themeId: string) => void;
}

export function ThemeSwitcher({ onThemeChange }: ThemeSwitcherProps) {
  const [activeTheme, setActiveTheme] = useState("classic");
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Convert hex to HSL
  const hexToHsl = (hex: string): string => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
  };

  const handleThemeSelect = (themeId: string) => {
    setActiveTheme(themeId);
    onThemeChange?.(themeId);
    
    const theme = themes.find(t => t.id === themeId);
    if (theme) {
      const root = document.documentElement;
      
      // Apply gold colors
      root.style.setProperty('--bullion-gold', hexToHsl(theme.colors.gold));
      root.style.setProperty('--bullion-gold-light', hexToHsl(theme.colors.gold));
      
      // Apply silver colors
      root.style.setProperty('--bullion-silver', hexToHsl(theme.colors.silver));
      
      // Apply surface/background
      const surfaceHsl = hexToHsl(theme.colors.surface);
      root.style.setProperty('--background', surfaceHsl);
      root.style.setProperty('--card', surfaceHsl);
      
      // Apply accent
      root.style.setProperty('--bullion-accent', hexToHsl(theme.colors.accent));
      root.style.setProperty('--primary', hexToHsl(theme.colors.accent));
      
      // Adjust foreground based on surface lightness
      const isLight = theme.id === 'minimal';
      root.style.setProperty('--foreground', isLight ? '222 47% 11%' : '210 40% 98%');
      root.style.setProperty('--card-foreground', isLight ? '222 47% 11%' : '210 40% 98%');
      root.style.setProperty('--muted', isLight ? '210 40% 96%' : '217 33% 17%');
      root.style.setProperty('--muted-foreground', isLight ? '215 16% 47%' : '215 20% 65%');
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-32 right-4 z-50 h-12 w-12 rounded-full shadow-xl bg-gradient-to-br from-bullion-gold to-bullion-gold-dark border-2 border-bullion-gold hover:scale-110 transition-transform"
        >
          <Palette className="h-5 w-5 text-black" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        align="end" 
        className="w-72 p-4 bg-background/95 backdrop-blur-xl border-border/50"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-sm">Theme</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="h-8 px-2"
            >
              {isDarkMode ? (
                <Sun className="h-4 w-4 mr-1" />
              ) : (
                <Moon className="h-4 w-4 mr-1" />
              )}
              <span className="text-xs">{isDarkMode ? "Light" : "Dark"}</span>
            </Button>
          </div>

          <div className="grid gap-2">
            {themes.map((theme) => (
              <motion.button
                key={theme.id}
                onClick={() => handleThemeSelect(theme.id)}
                className={`
                  relative flex items-center gap-3 p-3 rounded-lg border transition-all
                  ${activeTheme === theme.id 
                    ? "border-bullion-gold bg-bullion-gold/10" 
                    : "border-border/50 hover:border-border"
                  }
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex gap-1">
                  <div
                    className="w-5 h-5 rounded-full border border-white/20"
                    style={{ backgroundColor: theme.colors.gold }}
                  />
                  <div
                    className="w-5 h-5 rounded-full border border-white/20"
                    style={{ backgroundColor: theme.colors.silver }}
                  />
                  <div
                    className="w-5 h-5 rounded-full border border-white/20"
                    style={{ backgroundColor: theme.colors.surface }}
                  />
                  <div
                    className="w-5 h-5 rounded-full border border-white/20"
                    style={{ backgroundColor: theme.colors.accent }}
                  />
                </div>
                <span className="text-sm font-medium flex-1 text-left">
                  {theme.name}
                </span>
                <AnimatePresence>
                  {activeTheme === theme.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Check className="w-4 h-4 text-bullion-gold" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Theme preview • Changes are visual only
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
