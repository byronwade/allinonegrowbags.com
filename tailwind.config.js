module.exports = {
	darkMode: ["class"],
	content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				purple: {
					DEFAULT: "#8B5CF6",
					dark: "#7C3AED",
				},
			},
			borderRadius: {
				lg: "0.75rem",
				md: "0.5rem",
				sm: "0.25rem",
				xl: "1rem",
			},
			keyframes: {
				"accordion-down": {
					from: { height: 0 },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: 0 },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
			typography: {
				DEFAULT: {
					css: {
						maxWidth: "65ch",
						color: "hsl(var(--foreground))",
						'[class~="lead"]': {
							color: "hsl(var(--foreground))",
						},
						a: {
							color: "hsl(var(--primary))",
							"&:hover": {
								color: "hsl(var(--primary))",
							},
						},
						strong: {
							color: "hsl(var(--foreground))",
						},
						"ol > li::marker": {
							color: "hsl(var(--foreground))",
						},
						"ul > li::marker": {
							color: "hsl(var(--foreground))",
						},
						hr: {
							borderColor: "hsl(var(--border))",
						},
						blockquote: {
							borderLeftColor: "hsl(var(--border))",
							color: "hsl(var(--foreground))",
						},
						h1: {
							color: "hsl(var(--foreground))",
						},
						h2: {
							color: "hsl(var(--foreground))",
						},
						h3: {
							color: "hsl(var(--foreground))",
						},
						h4: {
							color: "hsl(var(--foreground))",
						},
						"figure figcaption": {
							color: "hsl(var(--muted-foreground))",
						},
						code: {
							color: "hsl(var(--foreground))",
						},
						"a code": {
							color: "hsl(var(--primary))",
						},
						pre: {
							backgroundColor: "hsl(var(--secondary))",
							color: "hsl(var(--foreground))",
						},
						thead: {
							borderBottomColor: "hsl(var(--border))",
						},
						"tbody tr": {
							borderBottomColor: "hsl(var(--border))",
						},
					},
				},
			},
		},
	},
	plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
