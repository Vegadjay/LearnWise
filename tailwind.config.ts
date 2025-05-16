
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
			fontFamily: {
				poppins: ['Poppins', 'sans-serif'],
				inter: ['Inter', 'sans-serif'],
				fira: ['Fira Code', 'monospace'],
			},
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
				// Custom educational app colors
				"edu-blue": {
					50: "#EEF2FF",
					100: "#E0E7FF",
					200: "#C7D2FE",
					300: "#A5B4FC",
					400: "#818CF8",
					500: "#6366F1",
					600: "#4F46E5",
					700: "#4338CA",
					800: "#3730A3",
					900: "#312E81",
				},
				"edu-indigo": {
					50: "#F5F3FF",
					100: "#EDE9FE",
					200: "#DDD6FE",
					300: "#C4B5FD",
					400: "#A78BFA",
					500: "#8B5CF6",
					600: "#7C3AED",
					700: "#6D28D9",
					800: "#5B21B6",
					900: "#4C1D95",
				},
				"edu-teal": {
					50: "#F0FDFA",
					100: "#CCFBF1",
					200: "#99F6E4",
					300: "#5EEAD4",
					400: "#2DD4BF",
					500: "#14B8A6",
					600: "#0D9488",
					700: "#0F766E",
					800: "#115E59",
					900: "#134E4A",
				},
				"edu-purple": {
					50: "#FAF5FF",
					100: "#F3E8FF",
					200: "#E9D5FF",
					300: "#D8B4FE",
					400: "#C084FC",
					500: "#A855F7",
					600: "#9333EA",
					700: "#7E22CE",
					800: "#6B21A8",
					900: "#581C87",
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'flip': {
					'0%, 100%': { 
						transform: 'rotateY(0deg)',
						transformStyle: 'preserve-3d'
					},
					'50%': { 
						transform: 'rotateY(180deg)',
						transformStyle: 'preserve-3d'
					}
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'bounce-soft': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				},
				'spin-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'gradient-shift': {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' }
				},
				'badge-pulse': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.08)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'flip': 'flip 0.6s ease-in-out',
				'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'bounce-soft': 'bounce-soft 2s ease-in-out infinite',
				'spin-slow': 'spin-slow 6s linear infinite',
				'gradient-shift': 'gradient-shift 15s ease infinite',
				'badge-pulse': 'badge-pulse 1.5s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
