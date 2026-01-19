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

  const handleThemeSelect = (themeId: string) => {
    setActiveTheme(themeId);
    onThemeChange?.(themeId);
    
    // Apply theme colors to CSS variables
    const theme = themes.find(t => t.id === themeId);
    if (theme) {
      const root = document.documentElement;
      // Convert hex to HSL for CSS variables would be done here
      // For now, we'll just show the visual change
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
          className="fixed bottom-20 right-4 z-50 h-10 w-10 rounded-full shadow-lg bg-background/80 backdrop-blur-sm border-bullion-gold/30 hover:border-bullion-gold"
        >
          <Palette className="h-4 w-4 text-bullion-gold" />
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
