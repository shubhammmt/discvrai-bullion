import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				bullion: {
					gold: {
						DEFAULT: 'hsl(var(--bullion-gold))',
						dark: 'hsl(var(--bullion-gold-dark))',
						light: 'hsl(var(--bullion-gold-light))',
						muted: 'hsl(var(--bullion-gold-muted))'
					},
					silver: {
						DEFAULT: 'hsl(var(--bullion-silver))',
						dark: 'hsl(var(--bullion-silver-dark))',
						light: 'hsl(var(--bullion-silver-light))',
						muted: 'hsl(var(--bullion-silver-muted))'
					},
					success: {
						DEFAULT: 'hsl(var(--bullion-success))',
						light: 'hsl(var(--bullion-success-light))'
					},
					warning: {
						DEFAULT: 'hsl(var(--bullion-warning))',
						light: 'hsl(var(--bullion-warning-light))'
					},
					error: {
						DEFAULT: 'hsl(var(--bullion-error))',
						light: 'hsl(var(--bullion-error-light))'
					},
					surface: {
						DEFAULT: 'hsl(var(--bullion-surface))',
						elevated: 'hsl(var(--bullion-surface-elevated))'
					},
					text: {
						primary: 'hsl(var(--bullion-text-primary))',
						secondary: 'hsl(var(--bullion-text-secondary))'
				},
				border: 'hsl(var(--bullion-border))'
			},
			enterprise: {
				navy: {
					DEFAULT: 'hsl(var(--enterprise-navy))',
					dark: 'hsl(var(--enterprise-navy-dark))',
					light: 'hsl(var(--enterprise-navy-light))'
				},
				blue: {
					DEFAULT: 'hsl(var(--enterprise-blue))',
					light: 'hsl(var(--enterprise-blue-light))'
				},
				gold: {
					DEFAULT: 'hsl(var(--enterprise-gold))',
					dark: 'hsl(var(--enterprise-gold-dark))',
					light: 'hsl(var(--enterprise-gold-light))'
				},
				text: {
					primary: 'hsl(var(--enterprise-text-primary))',
					secondary: 'hsl(var(--enterprise-text-secondary))',
					muted: 'hsl(var(--enterprise-text-muted))'
				},
				surface: {
					DEFAULT: 'hsl(var(--enterprise-surface))',
					elevated: 'hsl(var(--enterprise-surface-elevated))'
				},
				border: 'hsl(var(--enterprise-border))',
				success: 'hsl(var(--enterprise-success))',
				danger: 'hsl(var(--enterprise-danger))'
			},
			adani: {
				green: 'hsl(var(--adani-green))',
				navy: 'hsl(var(--adani-navy))',
				amber: 'hsl(var(--adani-amber))',
				red: 'hsl(var(--adani-red))',
				surface: {
					DEFAULT: 'hsl(var(--adani-surface))',
					elevated: 'hsl(var(--adani-surface-elevated))'
				},
				border: 'hsl(var(--adani-border))',
				text: {
					primary: 'hsl(var(--adani-text-primary))',
					secondary: 'hsl(var(--adani-text-secondary))'
				}
			},
			bajaj: {
				blue: 'hsl(var(--bajaj-blue))',
				navy: 'hsl(var(--bajaj-navy))',
				amber: 'hsl(var(--bajaj-amber))',
				red: 'hsl(var(--bajaj-red))',
				green: 'hsl(var(--bajaj-green))',
				surface: {
					DEFAULT: 'hsl(var(--bajaj-surface))',
					elevated: 'hsl(var(--bajaj-surface-elevated))'
				},
				border: 'hsl(var(--bajaj-border))',
				text: {
					primary: 'hsl(var(--bajaj-text-primary))',
					secondary: 'hsl(var(--bajaj-text-secondary))'
				}
			},
			sip: {
				brand: {
					DEFAULT: 'hsl(var(--sip-brand-primary))',
					foreground: 'hsl(var(--sip-brand-primary-foreground))',
					accent: 'hsl(var(--sip-brand-accent))',
					'accent-foreground': 'hsl(var(--sip-brand-accent-foreground))'
				},
				success: {
					DEFAULT: 'hsl(var(--sip-success))',
					light: 'hsl(var(--sip-success-light))',
					foreground: 'hsl(var(--sip-success-foreground))'
				},
				warning: {
					DEFAULT: 'hsl(var(--sip-warning))',
					light: 'hsl(var(--sip-warning-light))',
					foreground: 'hsl(var(--sip-warning-foreground))'
				},
				error: {
					DEFAULT: 'hsl(var(--sip-error))',
					light: 'hsl(var(--sip-error-light))',
					foreground: 'hsl(var(--sip-error-foreground))'
				},
				info: {
					DEFAULT: 'hsl(var(--sip-info))',
					light: 'hsl(var(--sip-info-light))',
					foreground: 'hsl(var(--sip-info-foreground))'
				},
				surface: {
					DEFAULT: 'hsl(var(--sip-surface))',
					elevated: 'hsl(var(--sip-surface-elevated))'
				},
				text: {
					primary: 'hsl(var(--sip-text-primary))',
					secondary: 'hsl(var(--sip-text-secondary))',
					muted: 'hsl(var(--sip-text-muted))'
				},
				border: {
					DEFAULT: 'hsl(var(--sip-border))',
					active: 'hsl(var(--sip-border-active))'
				},
				sidebar: {
					bg: 'hsl(var(--sip-sidebar-bg))',
					active: 'hsl(var(--sip-sidebar-active))',
					hover: 'hsl(var(--sip-sidebar-hover))'
				},
				action: {
					success: {
						DEFAULT: 'hsl(var(--sip-action-success))',
						light: 'hsl(var(--sip-action-success-light))',
						border: 'hsl(var(--sip-action-success-border))',
						foreground: 'hsl(var(--sip-action-success-foreground))'
					},
					warning: {
						DEFAULT: 'hsl(var(--sip-action-warning))',
						light: 'hsl(var(--sip-action-warning-light))',
						border: 'hsl(var(--sip-action-warning-border))',
						foreground: 'hsl(var(--sip-action-warning-foreground))'
					},
					danger: {
						DEFAULT: 'hsl(var(--sip-action-danger))',
						light: 'hsl(var(--sip-action-danger-light))',
						border: 'hsl(var(--sip-action-danger-border))',
						foreground: 'hsl(var(--sip-action-danger-foreground))'
					},
					info: {
						DEFAULT: 'hsl(var(--sip-action-info))',
						light: 'hsl(var(--sip-action-info-light))',
						border: 'hsl(var(--sip-action-info-border))',
						foreground: 'hsl(var(--sip-action-info-foreground))'
					},
					confirm: {
						DEFAULT: 'hsl(var(--sip-action-confirm))',
						foreground: 'hsl(var(--sip-action-confirm-foreground))'
					}
				},
				category: {
					1: 'hsl(var(--sip-category-1))',
					2: 'hsl(var(--sip-category-2))',
					3: 'hsl(var(--sip-category-3))',
					4: 'hsl(var(--sip-category-4))',
					5: 'hsl(var(--sip-category-5))'
				},
				alloc: {
					equity: 'hsl(var(--sip-alloc-equity))',
					debt: 'hsl(var(--sip-alloc-debt))',
					hybrid: 'hsl(var(--sip-alloc-hybrid))',
					other: 'hsl(var(--sip-alloc-other))',
					solution: 'hsl(var(--sip-alloc-solution))'
				},
				rating: 'hsl(var(--sip-rating))',
				returns: 'hsl(var(--sip-returns))'
			}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-20px)' }
				},
				'fade-in-up': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.9)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'fade-in-up': 'fade-in-up 0.6s ease-out',
				'scale-in': 'scale-in 0.3s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
